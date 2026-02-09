import { isIP } from "node:net";

import {
  isAsnExcluded,
  isHighConfidenceAnonymizedTraffic,
  isIpExcluded,
  isLikelyBot,
  isLikelyPrefetch,
  matchesNetworkPattern,
  normalizeHost,
  parseCommaList,
  parseUserAgent,
} from "@/lib/visit/filters";
import { lookupIpinfo } from "@/lib/visit/ipinfo";
import { hashIp, maskIp, sanitizeUtmParams } from "@/lib/visit/privacy";
import { sendPushoverVisitNotification } from "@/lib/visit/pushover";
import type { GeoInfo, ViewportInfo, VisitPayload } from "@/lib/visit/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_ALLOWED_HOSTS = ["marktornga.com", "www.marktornga.com"];
const MAX_PATH_LENGTH = 512;
const MAX_REFERRER_LENGTH = 1024;
const MAX_TITLE_LENGTH = 200;
const MAX_TZ_LENGTH = 64;
const MAX_LANG_LENGTH = 32;

const configuredHosts = parseCommaList(process.env.VISIT_NOTIFY_ALLOWED_HOSTS);
const allowedHosts = new Set(
  (configuredHosts.length > 0 ? configuredHosts : DEFAULT_ALLOWED_HOSTS)
    .map((value) => normalizeHost(value))
    .filter((value): value is string => Boolean(value)),
);
const excludedIpPatterns = parseCommaList(process.env.VISIT_NOTIFY_EXCLUDE_IPS);
const excludedAsns = parseCommaList(process.env.VISIT_NOTIFY_EXCLUDE_ASNS);
const excludedNetworkPatterns = parseCommaList(process.env.VISIT_NOTIFY_EXCLUDE_NETWORK_PATTERNS);

function safeString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed.slice(0, maxLength);
}

function parsePath(raw: unknown): string | undefined {
  const input = safeString(raw, MAX_PATH_LENGTH);
  if (!input) {
    return undefined;
  }

  try {
    const url = input.startsWith("http://") || input.startsWith("https://") ? new URL(input) : new URL(input, "https://example.com");
    if (!url.pathname.startsWith("/")) {
      return undefined;
    }

    if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api/visit")) {
      return undefined;
    }

    return url.pathname;
  } catch {
    return undefined;
  }
}

function parseViewport(raw: unknown): ViewportInfo | undefined {
  if (!raw || typeof raw !== "object") {
    return undefined;
  }

  const candidate = raw as Record<string, unknown>;
  const width = Number(candidate.width);
  const height = Number(candidate.height);

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return undefined;
  }

  if (width <= 0 || height <= 0 || width > 10000 || height > 10000) {
    return undefined;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

function parseOptionalUrl(raw: unknown): string | undefined {
  const value = safeString(raw, MAX_REFERRER_LENGTH);
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

async function parsePayload(request: Request): Promise<VisitPayload | undefined> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return undefined;
  }

  if (!body || typeof body !== "object") {
    return undefined;
  }

  const value = body as Record<string, unknown>;
  const path = parsePath(value.path);
  if (!path) {
    return undefined;
  }

  return {
    path,
    utm: sanitizeUtmParams(value.utm),
    referrer: parseOptionalUrl(value.referrer),
    title: safeString(value.title, MAX_TITLE_LENGTH),
    tz: safeString(value.tz, MAX_TZ_LENGTH),
    lang: safeString(value.lang, MAX_LANG_LENGTH),
    viewport: parseViewport(value.viewport),
  };
}

function parseReferrerHost(referrer: string | undefined): string | undefined {
  if (!referrer) {
    return undefined;
  }

  try {
    return new URL(referrer).host.toLowerCase();
  } catch {
    return undefined;
  }
}

function normalizeClientIp(raw: string | undefined): string | undefined {
  if (!raw) {
    return undefined;
  }

  let candidate = raw.trim();
  if (!candidate) {
    return undefined;
  }

  if (candidate.startsWith("[")) {
    const endIndex = candidate.indexOf("]");
    if (endIndex > 1) {
      candidate = candidate.slice(1, endIndex);
    }
  } else if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(candidate)) {
    candidate = candidate.replace(/:\d+$/, "");
  } else if (candidate.includes("%")) {
    candidate = candidate.split("%")[0];
  }

  return isIP(candidate) ? candidate : undefined;
}

function extractClientIp(headers: Headers): string | undefined {
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const first = xForwardedFor.split(",")[0];
    const normalized = normalizeClientIp(first);
    if (normalized) {
      return normalized;
    }
  }

  const directHeaders = ["x-real-ip", "x-vercel-forwarded-for", "cf-connecting-ip"];
  for (const name of directHeaders) {
    const normalized = normalizeClientIp(headers.get(name) ?? undefined);
    if (normalized) {
      return normalized;
    }
  }

  return undefined;
}

function cleanHeader(headers: Headers, name: string): string | undefined {
  const value = headers.get(name);
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function parseEdgeRegion(headers: Headers): string | undefined {
  const explicit = cleanHeader(headers, "x-vercel-edge-region");
  if (explicit) {
    return explicit;
  }

  const vercelId = cleanHeader(headers, "x-vercel-id");
  if (!vercelId) {
    return undefined;
  }

  const region = vercelId.split("::")[0]?.trim();
  return region || undefined;
}

function extractGeo(headers: Headers): GeoInfo {
  return {
    city: cleanHeader(headers, "x-vercel-ip-city"),
    region: cleanHeader(headers, "x-vercel-ip-country-region"),
    country: cleanHeader(headers, "x-vercel-ip-country"),
    edgeRegion: parseEdgeRegion(headers),
  };
}

function buildFullUrl(host: string, path: string, utm: Record<string, string>): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(utm).sort()) {
    params.set(key, utm[key]);
  }

  const query = params.toString();
  return query ? `https://${host}${path}?${query}` : `https://${host}${path}`;
}

export async function POST(request: Request): Promise<Response> {
  if (process.env.VERCEL_ENV !== "production") {
    return new Response(null, { status: 204 });
  }

  const host = normalizeHost(request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  if (!host || !allowedHosts.has(host)) {
    return new Response(null, { status: 204 });
  }

  const userAgentRaw = request.headers.get("user-agent") ?? "";
  if (isLikelyBot(userAgentRaw) || isLikelyPrefetch(request.headers)) {
    return new Response(null, { status: 204 });
  }

  const payload = await parsePayload(request);
  if (!payload) {
    return new Response(null, { status: 204 });
  }

  const clientIp = extractClientIp(request.headers);
  if (isIpExcluded(clientIp, excludedIpPatterns)) {
    return new Response(null, { status: 204 });
  }

  const geo = extractGeo(request.headers);
  const ipinfo = clientIp ? await lookupIpinfo(clientIp, process.env.IPINFO_TOKEN) : undefined;

  if (isHighConfidenceAnonymizedTraffic(ipinfo)) {
    console.info("[visit-notify] dropped high-confidence anonymized traffic", {
      host,
      path: payload.path,
      asn: ipinfo?.asn,
      asDomain: ipinfo?.asDomain,
      org: ipinfo?.org,
    });
    return new Response(null, { status: 204 });
  }

  if (isAsnExcluded(ipinfo?.asn, excludedAsns)) {
    console.info("[visit-notify] dropped excluded ASN", {
      host,
      path: payload.path,
      asn: ipinfo?.asn,
    });
    return new Response(null, { status: 204 });
  }

  if (matchesNetworkPattern(ipinfo, excludedNetworkPatterns)) {
    console.info("[visit-notify] dropped excluded network pattern", {
      host,
      path: payload.path,
      asn: ipinfo?.asn,
      asDomain: ipinfo?.asDomain,
      org: ipinfo?.org,
    });
    return new Response(null, { status: 204 });
  }

  const maskedIp = maskIp(clientIp);
  const hashedIp = hashIp(clientIp, process.env.VISIT_NOTIFY_HASH_SALT);
  const safeUtm = payload.utm ?? {};
  const event = {
    timestampIso: new Date().toISOString(),
    host,
    fullUrl: buildFullUrl(host, payload.path, safeUtm),
    path: payload.path,
    utm: safeUtm,
    referrerHost: parseReferrerHost(payload.referrer),
    pageTitle: payload.title,
    timezone: payload.tz,
    language: payload.lang,
    viewport: payload.viewport,
    maskedIp,
    hashedIp,
    userAgent: parseUserAgent(userAgentRaw),
    geo,
    ipinfo,
  };

  const pushed = await sendPushoverVisitNotification(event);
  console.info("[visit-notify] visit processed", {
    path: event.path,
    host: event.host,
    maskedIp: event.maskedIp,
    hashedIp: event.hashedIp,
    deviceClass: event.userAgent.deviceClass,
    country: event.geo.country,
    pushed,
  });

  return new Response(null, { status: 204 });
}
