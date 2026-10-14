import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const config = { idleMs: 1_200_000, ttlSeconds: 604800, heartbeatSeconds: 15 };

function harness() {
  let now = Date.parse('2026-10-13T12:00:00Z');
  const values = new Map();
  const scores = new Map();
  const env = { ...process.env, VERCEL_ENV: 'production', VISIT_NOTIFY_SESSIONS_ENABLED: 'true' };
  const requests = [];
  const clone = (value) => value === undefined ? undefined : structuredClone(value);
  const kv = {
    isKvConfigured: () => true,
    getKvJson: async (key) => clone(values.get(key)),
    getKvString: async (key) => values.get(key),
    setKvJson: async (key, value) => { values.set(key, clone(value)); return true; },
    setKvString: async (key, value) => { values.set(key, value); return true; },
    deleteKvKey: async (key) => values.delete(key),
    kvKeyExists: async (key) => values.has(key),
    zaddKv: async (_key, score, member) => { scores.set(member, score); return true; },
    zremKv: async (_key, member) => scores.delete(member),
    zrangeByScoreKv: async (_key, min, max, limit) => [...scores].filter(([, score]) => score >= min && score <= max).slice(0, limit).map(([id]) => id),
    runKvCommand: async ([command, key, value, nx]) => {
      assert.equal(command, 'SET');
      assert.equal(nx, 'NX');
      if (values.has(key)) return null;
      values.set(key, value);
      return 'OK';
    },
  };
  const modules = new Map();
  function load(path) {
    if (modules.has(path)) return modules.get(path);
    const exports = {};
    modules.set(path, exports);
    const code = ts.transpileModule(readFileSync(new URL(`../${path}.ts`, import.meta.url), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    vm.runInNewContext(code, {
      exports, process: { env }, console, Response, URL, Headers, URLSearchParams,
      fetch: async (...args) => { requests.push(args); return new Response('{"status":1}', { status: 200 }); },
      Date: class extends Date { static now() { return now; } },
      require: (name) => name === '@/lib/visit/kv' ? kv : name.startsWith('@/') ? load(name.slice(2)) : require(name),
    });
    return exports;
  }
  const session = load('lib/visit/session');
  const input = {
    host: 'marktornga.com', path: '/blog/zissou-fawcett', fullUrl: 'https://marktornga.com/blog/zissou-fawcett',
    maskedIp: '192.0.2.x', userAgent: { raw: 'test', deviceClass: 'desktop', browser: 'test', os: 'test' },
    geo: {}, eventType: 'page_view', pageId: 'first', clientTs: now,
  };
  return {
    ...session, values, load, modules, env, requests,
    advance: (ms) => { now += ms; },
    record: async (changes = {}) => (await session.recordSessionEvent({ ...input, ...changes }, 'fixture', config)).session,
    flush: () => session.flushIdleSessions(config),
  };
}

test('page load and a short interaction stay silent; reason survives closure', async () => {
  const h = harness();
  let s = await h.record();
  h.advance(14_999);
  s = await h.record({ eventType: 'page_hide', activeMsDelta: 14_999, hasInteraction: true });
  assert.equal(s.notificationDecision.reason, 'brief_visit');
  h.advance(config.idleMs + 1);
  assert.equal((await h.flush()).length, 0);
  const stored = h.values.get(`visit:session:${s.sessionId}`);
  assert.equal(stored.notificationDecision.reason, 'brief_visit');
  assert.ok(stored.endedAtIso);
});

test('visible time and scripted/restored scroll alone do not qualify', async () => {
  const h = harness();
  await h.record({ scrollMaxPct: 80 });
  h.advance(30_000);
  const s = await h.record({ eventType: 'heartbeat', activeMsDelta: 30_000, scrollMaxPct: 100 });
  assert.equal(s.notificationDecision.reason, 'no_interaction');
  h.advance(config.idleMs + 1);
  assert.equal((await h.flush()).length, 0);
  assert.equal(h.values.get(`visit:session:${s.sessionId}`).notificationDecision.reason, 'no_interaction');
});

test('qualified visits produce one after-visit summary even when schedulers overlap', async () => {
  const h = harness();
  await h.record();
  h.advance(5_000);
  await h.record({ eventType: 'heartbeat', activeMsDelta: 5_000, hasInteraction: true });
  h.advance(10_000);
  const s = await h.record({ eventType: 'heartbeat', activeMsDelta: 10_000, hasInteraction: false });
  assert.equal(s.notificationDecision.reason, 'qualified_engagement');
  h.advance(config.idleMs + 1);
  const results = await Promise.all([h.flush(), h.flush()]);
  const summaries = results.flat();
  assert.equal(summaries.length, 1);
  assert.equal(summaries[0].durationMs, 15_000);
  assert.equal((await h.flush()).length, 0);
});

test('navigation to another path still requires 15 seconds', async () => {
  const h = harness();
  await h.record();
  h.advance(5_000);
  await h.record({ eventType: 'page_hide', activeMsDelta: 5_000 });
  let s = await h.record({ path: '/about', pageId: 'second' });
  assert.equal(s.notificationDecision.reason, 'brief_visit');
  h.advance(10_000);
  s = await h.record({ path: '/about', pageId: 'second', eventType: 'heartbeat', activeMsDelta: 10_000 });
  assert.equal(s.notificationDecision.qualified, true);
});

test('reloading the same path and legacy input-free clients do not qualify', async () => {
  const h = harness();
  await h.record();
  h.advance(15_000);
  await h.record({ eventType: 'page_hide', activeMsDelta: 15_000 });
  const s = await h.record({ pageId: 'reload' });
  assert.equal(s.pageViewCount, 2);
  assert.equal(s.notificationDecision.reason, 'no_interaction');
});

test('the visit endpoint never sends an arrival or qualification push', async () => {
  const h = harness();
  h.modules.set('lib/visit/pushover', {
    sendPushoverVisitNotification: async () => { throw new Error('unexpected push'); },
  });
  const route = h.load('app/api/visit/route');
  const post = async (eventType, activeMsDelta, hasInteraction) => route.POST(new Request('https://marktornga.com/api/visit', {
    method: 'POST', headers: { host: 'marktornga.com', 'user-agent': 'Mozilla/5.0 Chrome/130.0', 'content-type': 'application/json' },
    body: JSON.stringify({ path: '/blog/zissou-fawcett', title: 'Essay', pageId: 'fixture', eventType, activeMsDelta, hasInteraction }),
  }));
  assert.equal((await post('page_view', 0, false)).status, 204);
  h.advance(15_000);
  assert.equal((await post('heartbeat', 15_000, true)).status, 204);
  const stored = [...h.values.values()].find(v => v?.notificationDecision?.qualified);
  assert.ok(stored);
  assert.equal((await h.flush()).length, 0);
  h.advance(config.idleMs + 1);
  assert.equal((await h.flush()).length, 1);
});

test('client reports trusted input but ignores synthetic input, scroll restoration and hidden input', async () => {
  let now = Date.parse('2026-10-13T12:00:00Z');
  const effects = [];
  const listeners = new Map();
  const sent = [];
  let heartbeat;
  const document = {
    hidden: false, referrer: '', title: 'Essay',
    documentElement: { scrollTop: 0, scrollHeight: 5000, clientHeight: 844 },
    body: { scrollHeight: 5000 },
    addEventListener() {}, removeEventListener() {},
  };
  const react = {
    useRef: (current) => ({ current }),
    useMemo: (fn) => fn(),
    useEffect: (fn) => effects.push(fn),
  };
  const exports = {};
  const code = ts.transpileModule(readFileSync(new URL('../components/analytics/VisitTracker.tsx', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, {
    exports, document, URLSearchParams, Blob, Intl,
    Date: class extends Date { static now() { return now; } },
    process: { env: { NEXT_PUBLIC_VISIT_NOTIFY_ENABLED: 'true' } },
    crypto: { randomUUID: () => 'client-fixture' },
    navigator: { language: 'en-US', sendBeacon: (_url, blob) => { sent.push(blob); return true; } },
    window: {
      location: { hostname: 'marktornga.com' }, scrollY: 0, innerWidth: 390, innerHeight: 844,
      addEventListener: (type, fn) => listeners.set(type, fn),
      removeEventListener: (type) => listeners.delete(type),
      setInterval: (fn) => { heartbeat = fn; return 1; }, clearInterval() {},
    },
    require: (name) => name === 'react' ? react : name === 'next/navigation' ? {
      usePathname: () => '/blog/zissou-fawcett', useSearchParams: () => new URLSearchParams(),
    } : require(name),
  });
  exports.default();
  const cleanups = effects.map((effect) => effect());
  listeners.get('wheel')({ isTrusted: false });
  listeners.get('scroll')({ isTrusted: true });
  now += 15_000;
  heartbeat();
  assert.equal(JSON.parse(await sent.at(-1).text()).hasInteraction, false);
  document.hidden = true;
  listeners.get('pointerdown')({ isTrusted: true });
  document.hidden = false;
  now += 15_000;
  heartbeat();
  assert.equal(JSON.parse(await sent.at(-1).text()).hasInteraction, false);
  listeners.get('touchstart')({ isTrusted: true });
  now += 15_000;
  heartbeat();
  assert.equal(JSON.parse(await sent.at(-1).text()).hasInteraction, true);
  for (const cleanup of cleanups) cleanup?.();
  assert.equal(listeners.size, 0);
});

function reportFixture() {
  return {
    sessionId: 'fixture', host: 'marktornga.com', startedAtIso: '2026-10-13T15:00:00Z', endedAtIso: '2026-10-13T15:02:00Z',
    durationMs: 120000, engagedMs: 65000, pageViewCount: 1, distinctPageCount: 1,
    entryPath: '/blog/zissou-fawcett', exitPath: '/blog/zissou-fawcett', referrerHost: 'www.reddit.com',
    maskedIp: '192.0.2.x', language: 'en-US', timezone: 'Europe/Berlin',
    userAgent: { deviceClass: 'mobile', browser: 'Safari', os: 'iOS' },
    geo: { city: 'Chicago', region: 'IL', country: 'US' }, ipinfo: { asName: 'Example Network', asn: 'AS123' },
    topPages: [{ path: '/blog/zissou-fawcett', title: 'Is Steve Zissou Based on an Amazon Explorer? | Mark Tornga', engagedMs: 65000, maxScrollPct: 18, viewCount: 1 }],
    journey: ['Is Steve Zissou Based on an Amazon Explorer? | Mark Tornga'],
    fullUrl: 'https://marktornga.com/blog/zissou-fawcett',
  };
}

test('report leads with reading metrics, readable title, source and device; keeps diagnostics out', () => {
  const h = harness();
  const report = h.load('lib/visit/report').buildSessionReport(reportFixture());
  assert.equal(report.title, 'Visit ended: Is Steve Zissou Based on an Amazon Explorer?');
  assert.match(report.message, /^<b>1m 5s visible<\/b> · 1 page/);
  assert.match(report.message, /18% max page scroll/);
  assert.match(report.message, /From: reddit.com/);
  assert.match(report.message, /mobile · Safari · iOS/);
  assert.match(report.message, /10:02 AM CDT/);
  assert.doesNotMatch(report.message, /192\.0\.2|Europe\/Berlin|AS123|Journey:/);
  assert.equal(report.url, 'https://marktornga.com/blog/zissou-fawcett');
});

test('report links to the page with most visible time and shows navigation and repeat views', () => {
  const h = harness();
  const fixture = reportFixture();
  fixture.distinctPageCount = 3;
  fixture.pageViewCount = 4;
  fixture.exitPath = '/contact';
  fixture.topPages[0].viewCount = 2;
  fixture.journey = ['Home', 'Home', fixture.topPages[0].title, 'Contact'];
  const report = h.load('lib/visit/report').buildSessionReport(fixture);
  assert.match(report.message, /3 pages · 4 views/);
  assert.match(report.message, /18% max page scroll · 2 views/);
  assert.match(report.message, /Journey: Home → Is Steve/);
  assert.match(report.message, /→ Contact/);
  assert.equal(report.url, fixture.fullUrl);
});

test('long/untrusted labels fit Pushover limits without broken HTML; absent referrer stays unknown', () => {
  const h = harness();
  const fixture = reportFixture();
  fixture.referrerHost = undefined;
  fixture.topPages = Array.from({ length: 3 }, () => ({ ...fixture.topPages[0], title: '<script>&'.repeat(50) }));
  fixture.geo.city = '<b>'.repeat(50);
  const report = h.load('lib/visit/report').buildSessionReport(fixture);
  assert.ok(report.message.length <= 1024);
  assert.ok(report.title.length <= 250);
  assert.doesNotMatch(report.message, /<script>/);
  assert.match(report.message, /&lt;script&gt;/);
  assert.equal((report.message.match(/<b>/g) || []).length, (report.message.match(/<\/b>/g) || []).length);
  assert.match(report.message, /Direct \/ unknown/);
});

test('Pushover sends formatted summaries using dedicated application token with legacy fallback', async () => {
  const h = harness();
  h.env.PUSHOVER_ENABLED = 'true';
  h.env.PUSHOVER_USER_KEY = 'test-user';
  h.env.PUSHOVER_API_TOKEN = 'legacy-token';
  h.env.VISIT_PUSHOVER_API_TOKEN = 'website-token';
  const push = h.load('lib/visit/pushover');
  assert.equal(await push.sendPushoverSessionSummaryNotification(reportFixture()), true);
  let body = new URLSearchParams(h.requests[0][1].body);
  assert.equal(body.get('token'), 'website-token');
  assert.equal(body.get('html'), '1');
  assert.match(body.get('title'), /^Visit ended:/);
  assert.equal(body.get('url'), reportFixture().fullUrl);
  delete h.env.VISIT_PUSHOVER_API_TOKEN;
  assert.equal(await push.sendPushoverSessionSummaryNotification(reportFixture()), true);
  body = new URLSearchParams(h.requests[1][1].body);
  assert.equal(body.get('token'), 'legacy-token');
});
