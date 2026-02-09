import type { IpinfoEnrichment } from "@/lib/visit/types";

const IPINFO_BASE_URL = "https://api.ipinfo.io/lite";
const DEFAULT_TIMEOUT_MS = 1800;

function pickString(source: Record<string, unknown>, key: string): string | undefined {
  const value = source[key];
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

function pickNestedString(source: Record<string, unknown>, parentKey: string, childKey: string): string | undefined {
  const parent = source[parentKey];
  if (!parent || typeof parent !== "object") {
    return undefined;
  }
  return pickString(parent as Record<string, unknown>, childKey);
}

function pickBoolean(source: Record<string, unknown>, key: string): boolean | undefined {
  const value = source[key];
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      return undefined;
    }
    if (normalized === "true" || normalized === "1" || normalized === "yes") {
      return true;
    }
    if (normalized === "false" || normalized === "0" || normalized === "no") {
      return false;
    }
  }
  return undefined;
}

function normalizeIpinfo(data: Record<string, unknown>): IpinfoEnrichment {
  const asn = pickString(data, "asn") ?? pickString(data, "as_number");
  const asName = pickString(data, "as_name") ?? pickString(data, "asname");
  const asDomain = pickString(data, "as_domain") ?? pickString(data, "domain");
  const org = pickString(data, "org") ?? pickString(data, "organization");
  const timezone = pickString(data, "timezone");
  const company = pickNestedString(data, "company", "name") ?? pickString(data, "company_name");
  const isTor = pickBoolean(data, "is_tor");
  const isProxy = pickBoolean(data, "is_proxy");
  const isVpn = pickBoolean(data, "is_vpn");
  const isHosting = pickBoolean(data, "is_hosting");

  return {
    asn,
    asName,
    asDomain,
    org,
    timezone,
    company,
    isTor,
    isProxy,
    isVpn,
    isHosting,
  };
}

export async function lookupIpinfo(
  ip: string,
  token: string | undefined,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<IpinfoEnrichment | undefined> {
  if (!ip || !token) {
    return undefined;
  }

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `${IPINFO_BASE_URL}/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("[visit-notify] IPinfo lookup failed", { status: response.status });
      return undefined;
    }

    const json = (await response.json()) as Record<string, unknown>;
    return normalizeIpinfo(json);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.warn("[visit-notify] IPinfo lookup error", { message });
    return undefined;
  } finally {
    clearTimeout(timeoutHandle);
  }
}
