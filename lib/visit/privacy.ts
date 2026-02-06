import { createHash } from "node:crypto";

const MAX_UTM_KEY_LENGTH = 64;
const MAX_UTM_VALUE_LENGTH = 256;

function sanitizeText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.slice(0, maxLength);
}

export function sanitizeUtmParams(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") {
    return {};
  }

  const entries = Object.entries(input as Record<string, unknown>);
  const cleaned: Record<string, string> = {};

  for (const [key, value] of entries) {
    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey.startsWith("utm_")) {
      continue;
    }

    const safeKey = sanitizeText(normalizedKey, MAX_UTM_KEY_LENGTH);
    const safeValue = sanitizeText(value, MAX_UTM_VALUE_LENGTH);

    if (!safeKey || !safeValue) {
      continue;
    }

    cleaned[safeKey] = safeValue;
  }

  return cleaned;
}

export function maskIp(ip: string | undefined | null): string {
  if (!ip) {
    return "unknown";
  }

  const normalized = ip.trim();
  if (!normalized) {
    return "unknown";
  }

  if (normalized.includes(".")) {
    const parts = normalized.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
    }
  }

  if (normalized.includes(":")) {
    const compact = normalized.toLowerCase().split("%")[0];
    const sections = compact.split(":").filter(Boolean).slice(0, 4);
    if (sections.length > 0) {
      return `${sections.join(":")}:*`;
    }
    return "*";
  }

  return "unknown";
}

export function hashIp(ip: string | undefined | null, salt: string | undefined): string | undefined {
  if (!ip || !salt) {
    return undefined;
  }

  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 20);
}
