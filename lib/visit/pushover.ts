import type { VisitEvent } from "@/lib/visit/types";

const PUSHOVER_ENDPOINT = "https://api.pushover.net/1/messages.json";
const PUSHOVER_MESSAGE_MAX = 1024;
const PUSHOVER_TITLE_MAX = 250;

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}

function parsePriority(raw: string | undefined): string {
  const parsed = Number(raw ?? "0");
  if (!Number.isInteger(parsed)) {
    return "0";
  }
  return String(Math.max(-2, Math.min(2, parsed)));
}

function formatUtm(utm: Record<string, string>): string | undefined {
  const keys = Object.keys(utm);
  if (keys.length === 0) {
    return undefined;
  }

  const params = new URLSearchParams();
  for (const key of keys.sort()) {
    params.set(key, utm[key]);
  }
  return params.toString();
}

function formatLocation(event: VisitEvent): string {
  const parts = [event.geo.city, event.geo.region, event.geo.country].filter(Boolean);
  const base = parts.join(", ") || "unknown";
  if (event.geo.edgeRegion) {
    return `${base} (edge ${event.geo.edgeRegion})`;
  }
  return base;
}

function formatNetwork(event: VisitEvent): string {
  if (!event.ipinfo) {
    return "unknown";
  }

  const parts = [event.ipinfo.asn, event.ipinfo.asName, event.ipinfo.asDomain, event.ipinfo.org, event.ipinfo.company].filter(
    Boolean,
  );
  if (parts.length === 0) {
    return "unknown";
  }
  return parts.join(" | ");
}

function buildMessage(event: VisitEvent): string {
  const utm = formatUtm(event.utm);
  const pathWithQuery = utm ? `${event.path}?${utm}` : event.path;
  const viewport = event.viewport ? `${event.viewport.width}x${event.viewport.height}` : "unknown";

  const lines = [
    `Path: ${pathWithQuery}`,
    `Title: ${event.pageTitle ?? "unknown"}`,
    `Referrer: ${event.referrerHost ?? "direct"}`,
    `Device: ${event.userAgent.deviceClass} (${event.userAgent.browser} on ${event.userAgent.os})`,
    `Language: ${event.language ?? "unknown"}`,
    `Timezone: ${event.timezone ?? "unknown"}`,
    `Viewport: ${viewport}`,
    `Location: ${formatLocation(event)}`,
    `Network: ${formatNetwork(event)}`,
    `IP: ${event.maskedIp}`,
    `Time: ${event.timestampIso}`,
  ];

  return truncate(lines.join("\n"), PUSHOVER_MESSAGE_MAX);
}

export async function sendPushoverVisitNotification(event: VisitEvent): Promise<boolean> {
  const enabled = (process.env.PUSHOVER_ENABLED ?? "true").toLowerCase() === "true";
  const token = process.env.PUSHOVER_API_TOKEN;
  const user = process.env.PUSHOVER_USER_KEY;
  const priority = parsePriority(process.env.PUSHOVER_PRIORITY);

  if (!enabled) {
    return false;
  }

  if (!token || !user) {
    console.warn("[visit-notify] Pushover is missing PUSHOVER_API_TOKEN or PUSHOVER_USER_KEY");
    return false;
  }

  const title = truncate(`Website Visit: ${event.path}`, PUSHOVER_TITLE_MAX);
  const message = buildMessage(event);

  const body = new URLSearchParams();
  body.set("token", token);
  body.set("user", user);
  body.set("title", title);
  body.set("message", message);
  body.set("priority", priority);
  body.set("url", event.fullUrl);
  body.set("url_title", "Open page");

  try {
    const response = await fetch(PUSHOVER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.warn("[visit-notify] Pushover API error", {
        status: response.status,
        body: responseText.slice(0, 200),
      });
      return false;
    }

    return true;
  } catch (error) {
    const messageText = error instanceof Error ? error.message : "unknown error";
    console.warn("[visit-notify] Pushover request failed", { message: messageText });
    return false;
  }
}
