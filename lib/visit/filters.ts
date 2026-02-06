import { BlockList, isIP } from "node:net";

import type { UserAgentInfo } from "@/lib/visit/types";

const BOT_PATTERN =
  /(bot|crawler|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|headless|wget|curl|python-requests|postmanruntime|go-http-client|uptimerobot)/i;

function cleanHeader(value: string | null): string {
  return (value ?? "").trim();
}

export function isLikelyBot(userAgent: string): boolean {
  if (!userAgent) {
    return true;
  }
  return BOT_PATTERN.test(userAgent);
}

export function isLikelyPrefetch(headers: Headers): boolean {
  const purpose = cleanHeader(headers.get("purpose")).toLowerCase();
  const secPurpose = cleanHeader(headers.get("sec-purpose")).toLowerCase();
  const moz = cleanHeader(headers.get("x-moz")).toLowerCase();
  const nextPrefetch = cleanHeader(headers.get("next-router-prefetch"));
  const middlewarePrefetch = cleanHeader(headers.get("x-middleware-prefetch"));

  if (purpose.includes("prefetch") || secPurpose.includes("prefetch") || moz.includes("prefetch")) {
    return true;
  }

  if (nextPrefetch === "1" || middlewarePrefetch === "1") {
    return true;
  }

  return false;
}

export function parseCommaList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function sanitizeCidrPrefix(prefix: string): number | undefined {
  const value = Number(prefix.trim());
  if (!Number.isInteger(value)) {
    return undefined;
  }
  return value;
}

function addPattern(blockList: BlockList, pattern: string): void {
  const cidrSeparator = pattern.indexOf("/");

  if (cidrSeparator === -1) {
    const family = isIP(pattern);
    if (family === 4) {
      blockList.addAddress(pattern, "ipv4");
    } else if (family === 6) {
      blockList.addAddress(pattern, "ipv6");
    }
    return;
  }

  const address = pattern.slice(0, cidrSeparator).trim();
  const prefixRaw = pattern.slice(cidrSeparator + 1).trim();
  const family = isIP(address);
  const prefix = sanitizeCidrPrefix(prefixRaw);

  if (family === 4 && prefix !== undefined && prefix >= 0 && prefix <= 32) {
    blockList.addSubnet(address, prefix, "ipv4");
  } else if (family === 6 && prefix !== undefined && prefix >= 0 && prefix <= 128) {
    blockList.addSubnet(address, prefix, "ipv6");
  }
}

export function isIpExcluded(ip: string | undefined | null, patterns: string[]): boolean {
  if (!ip || patterns.length === 0) {
    return false;
  }

  const normalizedIp = ip.trim();
  const family = isIP(normalizedIp);
  if (family !== 4 && family !== 6) {
    return false;
  }

  const blockList = new BlockList();
  for (const pattern of patterns) {
    addPattern(blockList, pattern.trim());
  }

  return blockList.check(normalizedIp, family === 6 ? "ipv6" : "ipv4");
}

export function normalizeHost(hostHeader: string | undefined | null): string | undefined {
  if (!hostHeader) {
    return undefined;
  }

  const lower = hostHeader.trim().toLowerCase();
  if (!lower) {
    return undefined;
  }

  if (lower.startsWith("[")) {
    const end = lower.indexOf("]");
    if (end !== -1) {
      return lower.slice(0, end + 1);
    }
    return lower;
  }

  const parts = lower.split(":");
  if (parts.length > 1) {
    return parts[0];
  }

  return lower;
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) {
    return "Edge";
  }
  if (/opr\//i.test(ua)) {
    return "Opera";
  }
  if (/firefox\//i.test(ua)) {
    return "Firefox";
  }
  if (/chrome\//i.test(ua) && !/edg\//i.test(ua) && !/opr\//i.test(ua)) {
    return "Chrome";
  }
  if (/safari\//i.test(ua) && /version\//i.test(ua)) {
    return "Safari";
  }
  return "Unknown";
}

function detectOs(ua: string): string {
  if (/windows nt/i.test(ua)) {
    return "Windows";
  }
  if (/android/i.test(ua)) {
    return "Android";
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    return "iOS";
  }
  if (/mac os x/i.test(ua)) {
    return "macOS";
  }
  if (/linux/i.test(ua)) {
    return "Linux";
  }
  return "Unknown";
}

function detectDeviceClass(ua: string): UserAgentInfo["deviceClass"] {
  if (/ipad|tablet|kindle|silk|playbook|sm-t/i.test(ua)) {
    return "tablet";
  }
  if (/iphone|ipod|android|mobile|phone/i.test(ua)) {
    return "mobile";
  }
  if (ua) {
    return "desktop";
  }
  return "unknown";
}

export function parseUserAgent(userAgent: string): UserAgentInfo {
  const ua = userAgent.trim();
  return {
    deviceClass: detectDeviceClass(ua),
    browser: detectBrowser(ua),
    os: detectOs(ua),
    raw: ua,
  };
}
