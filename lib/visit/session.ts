import { createHash, randomUUID } from "node:crypto";

import {
  deleteKvKey,
  getKvJson,
  getKvString,
  isKvConfigured,
  kvKeyExists,
  setKvJson,
  setKvString,
  zaddKv,
  zrangeByScoreKv,
  zremKv,
} from "@/lib/visit/kv";
import type { ActiveSessionRecord, SessionConfig, SessionEventInput, SessionSummary, SessionSummaryPage } from "@/lib/visit/types";

const ACTIVE_FINGERPRINT_KEY_PREFIX = "visit:active:fingerprint:";
const SESSION_KEY_PREFIX = "visit:session:";
const SESSION_CLOSED_KEY_PREFIX = "visit:session:closed:";
const SESSION_LAST_SEEN_ZSET_KEY = "visit:sessions:last_seen";

const DEFAULT_IDLE_MINUTES = 20;
const DEFAULT_TTL_DAYS = 7;
const DEFAULT_HEARTBEAT_SECONDS = 15;

const MAX_PAGE_SEQUENCE_LENGTH = 100;

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value ?? "");
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
}

export function getSessionConfigFromEnv(): SessionConfig {
  const idleMinutes = parsePositiveInt(process.env.VISIT_NOTIFY_SESSION_IDLE_MINUTES, DEFAULT_IDLE_MINUTES);
  const ttlDays = parsePositiveInt(process.env.VISIT_NOTIFY_SESSION_TTL_DAYS, DEFAULT_TTL_DAYS);
  const heartbeatSeconds = parsePositiveInt(process.env.VISIT_NOTIFY_HEARTBEAT_SECONDS, DEFAULT_HEARTBEAT_SECONDS);

  return {
    idleMs: idleMinutes * 60_000,
    ttlSeconds: ttlDays * 24 * 60 * 60,
    heartbeatSeconds,
  };
}

function toIso(ms: number): string {
  return new Date(ms).toISOString();
}

function toMs(iso: string): number {
  const parsed = Date.parse(iso);
  return Number.isFinite(parsed) ? parsed : Date.now();
}

function activeFingerprintKey(fingerprint: string): string {
  return `${ACTIVE_FINGERPRINT_KEY_PREFIX}${fingerprint}`;
}

function sessionKey(sessionId: string): string {
  return `${SESSION_KEY_PREFIX}${sessionId}`;
}

function closedKey(sessionId: string): string {
  return `${SESSION_CLOSED_KEY_PREFIX}${sessionId}`;
}

function clampActiveDelta(value: number | undefined, heartbeatSeconds: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  const bounded = Math.floor(Number(value));
  if (bounded <= 0) {
    return 0;
  }

  const maxDelta = Math.max(heartbeatSeconds * 4_000, 120_000);
  return Math.min(bounded, maxDelta);
}

function clampScroll(value: number | undefined): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(Number(value))));
}

function buildTopPages(session: ActiveSessionRecord): SessionSummaryPage[] {
  return Object.values(session.pages)
    .sort((a, b) => {
      if (b.engagedMs !== a.engagedMs) {
        return b.engagedMs - a.engagedMs;
      }
      return b.viewCount - a.viewCount;
    })
    .slice(0, 3)
    .map((page) => ({
      path: page.path,
      engagedMs: page.engagedMs,
      maxScrollPct: page.maxScrollPct,
      viewCount: page.viewCount,
    }));
}

export function buildSessionSummary(session: ActiveSessionRecord, endedAtMs: number): SessionSummary {
  const startedAtMs = toMs(session.startedAtIso);
  const durationMs = Math.max(0, endedAtMs - startedAtMs);
  const endedAtIso = toIso(endedAtMs);

  return {
    sessionId: session.sessionId,
    host: session.host,
    startedAtIso: session.startedAtIso,
    endedAtIso,
    durationMs,
    engagedMs: session.totalEngagedMs,
    pageViewCount: session.pageViewCount,
    distinctPageCount: Object.keys(session.pages).length,
    entryPath: session.entryPath,
    exitPath: session.exitPath,
    referrerHost: session.referrerHost,
    language: session.language,
    timezone: session.timezone,
    maskedIp: session.maskedIp,
    userAgent: session.userAgent,
    geo: session.geo,
    ipinfo: session.ipinfo,
    topPages: buildTopPages(session),
    fullUrl: `https://${session.host}${session.exitPath}`,
  };
}

export function deriveCookielessFingerprint(input: {
  hashedIp?: string;
  maskedIp: string;
  userAgentRaw: string;
  language?: string;
  timezone?: string;
}): string {
  const source = [
    input.hashedIp ?? `masked:${input.maskedIp}`,
    input.userAgentRaw.trim().toLowerCase(),
    (input.language ?? "").trim().toLowerCase(),
    (input.timezone ?? "").trim().toLowerCase(),
  ].join("|");

  return createHash("sha256").update(source).digest("hex").slice(0, 24);
}

function createSessionRecord(input: SessionEventInput, fingerprint: string, nowMs: number): ActiveSessionRecord {
  const nowIso = toIso(nowMs);
  return {
    sessionId: randomUUID(),
    fingerprint,
    host: input.host,
    startedAtIso: nowIso,
    lastSeenAtIso: nowIso,
    entryPath: input.path,
    exitPath: input.path,
    referrerHost: input.referrerHost,
    language: input.language,
    timezone: input.timezone,
    maskedIp: input.maskedIp,
    userAgent: input.userAgent,
    geo: input.geo,
    ipinfo: input.ipinfo,
    pageSequence: [],
    pages: {},
    pageViewCount: 0,
    heartbeatCount: 0,
    pageHideCount: 0,
    totalEngagedMs: 0,
    lastEventType: input.eventType,
  };
}

function isSessionStale(session: ActiveSessionRecord, config: SessionConfig, nowMs: number): boolean {
  const lastSeenMs = toMs(session.lastSeenAtIso);
  return nowMs - lastSeenMs > config.idleMs;
}

function applySessionEvent(
  session: ActiveSessionRecord,
  input: SessionEventInput,
  config: SessionConfig,
  nowMs: number,
): ActiveSessionRecord {
  const nowIso = toIso(nowMs);

  session.lastSeenAtIso = nowIso;
  session.exitPath = input.path;
  session.lastEventType = input.eventType;

  if (!session.referrerHost && input.referrerHost) {
    session.referrerHost = input.referrerHost;
  }
  if (!session.language && input.language) {
    session.language = input.language;
  }
  if (!session.timezone && input.timezone) {
    session.timezone = input.timezone;
  }

  const existing = session.pages[input.path];
  const page = existing ?? {
    path: input.path,
    title: input.title,
    firstSeenAtIso: nowIso,
    lastSeenAtIso: nowIso,
    viewCount: 0,
    engagedMs: 0,
    maxScrollPct: 0,
    lastPageId: input.pageId,
  };

  if (input.title) {
    page.title = input.title;
  }

  const activeDelta = clampActiveDelta(input.activeMsDelta, config.heartbeatSeconds);
  if (activeDelta > 0) {
    page.engagedMs += activeDelta;
    session.totalEngagedMs += activeDelta;
  }

  const scroll = clampScroll(input.scrollMaxPct);
  if (scroll > page.maxScrollPct) {
    page.maxScrollPct = scroll;
  }

  page.lastSeenAtIso = nowIso;
  page.lastPageId = input.pageId;

  if (input.eventType === "page_view") {
    page.viewCount += 1;
    session.pageViewCount += 1;
    session.pageSequence.push(input.path);
    if (session.pageSequence.length > MAX_PAGE_SEQUENCE_LENGTH) {
      session.pageSequence = session.pageSequence.slice(-MAX_PAGE_SEQUENCE_LENGTH);
    }
  } else if (input.eventType === "heartbeat") {
    session.heartbeatCount += 1;
  } else if (input.eventType === "page_hide") {
    session.pageHideCount += 1;
  }

  session.pages[input.path] = page;
  return session;
}

async function saveSession(session: ActiveSessionRecord, config: SessionConfig, lastSeenMs: number): Promise<void> {
  await setKvJson(sessionKey(session.sessionId), session, config.ttlSeconds);
  await setKvString(activeFingerprintKey(session.fingerprint), session.sessionId, config.ttlSeconds);
  await zaddKv(SESSION_LAST_SEEN_ZSET_KEY, lastSeenMs, session.sessionId);
}

async function findActiveSession(
  fingerprint: string,
  config: SessionConfig,
  nowMs: number,
): Promise<ActiveSessionRecord | undefined> {
  const mappedSessionId = await getKvString(activeFingerprintKey(fingerprint));
  if (!mappedSessionId) {
    return undefined;
  }

  const session = await getKvJson<ActiveSessionRecord>(sessionKey(mappedSessionId));
  if (!session) {
    await deleteKvKey(activeFingerprintKey(fingerprint));
    await zremKv(SESSION_LAST_SEEN_ZSET_KEY, mappedSessionId);
    return undefined;
  }

  if (isSessionStale(session, config, nowMs)) {
    return undefined;
  }

  return session;
}

export type RecordSessionEventResult =
  | {
      ignored: true;
      reason: "kv_unavailable" | "orphan_non_page_view";
      startedNewSession: false;
    }
  | {
      ignored: false;
      session: ActiveSessionRecord;
      startedNewSession: boolean;
    };

export async function recordSessionEvent(
  input: SessionEventInput,
  fingerprint: string,
  config: SessionConfig,
): Promise<RecordSessionEventResult> {
  if (!isKvConfigured()) {
    return {
      ignored: true,
      reason: "kv_unavailable",
      startedNewSession: false,
    };
  }

  const nowMs = Date.now();
  const activeSession = await findActiveSession(fingerprint, config, nowMs);
  if (!activeSession && input.eventType !== "page_view") {
    return {
      ignored: true,
      reason: "orphan_non_page_view",
      startedNewSession: false,
    };
  }

  const startedNewSession = !activeSession;
  const session = applySessionEvent(activeSession ?? createSessionRecord(input, fingerprint, nowMs), input, config, nowMs);

  await saveSession(session, config, nowMs);

  return {
    ignored: false,
    session,
    startedNewSession,
  };
}

async function closeSession(session: ActiveSessionRecord, config: SessionConfig, nowMs: number): Promise<void> {
  session.endedAtIso = toIso(nowMs);

  await setKvJson(sessionKey(session.sessionId), session, config.ttlSeconds);
  await setKvString(closedKey(session.sessionId), "1", config.ttlSeconds);
  await zremKv(SESSION_LAST_SEEN_ZSET_KEY, session.sessionId);

  const activeKey = activeFingerprintKey(session.fingerprint);
  const mappedSessionId = await getKvString(activeKey);
  if (mappedSessionId === session.sessionId) {
    await deleteKvKey(activeKey);
  }
}

async function finalizeSession(
  sessionId: string,
  config: SessionConfig,
  nowMs: number,
): Promise<SessionSummary | undefined> {
  const closed = await kvKeyExists(closedKey(sessionId));
  if (closed) {
    await zremKv(SESSION_LAST_SEEN_ZSET_KEY, sessionId);
    return undefined;
  }

  const session = await getKvJson<ActiveSessionRecord>(sessionKey(sessionId));
  if (!session) {
    await zremKv(SESSION_LAST_SEEN_ZSET_KEY, sessionId);
    return undefined;
  }

  if (!isSessionStale(session, config, nowMs)) {
    return undefined;
  }

  // Ignore orphan sessions that never captured a page_view.
  if (session.pageViewCount <= 0) {
    await closeSession(session, config, nowMs);
    return undefined;
  }

  const summary = buildSessionSummary(session, nowMs);

  await closeSession(session, config, nowMs);

  return summary;
}

export async function flushIdleSessions(
  config: SessionConfig,
  limit: number = 200,
): Promise<SessionSummary[]> {
  if (!isKvConfigured()) {
    return [];
  }

  const nowMs = Date.now();
  const cutoff = nowMs - config.idleMs;
  const candidates = await zrangeByScoreKv(SESSION_LAST_SEEN_ZSET_KEY, 0, cutoff, limit);
  if (candidates.length === 0) {
    return [];
  }

  const summaries: SessionSummary[] = [];
  for (const sessionId of candidates) {
    const summary = await finalizeSession(sessionId, config, nowMs);
    if (summary) {
      summaries.push(summary);
    }
  }

  return summaries;
}
