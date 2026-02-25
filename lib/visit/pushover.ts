import type { ActiveSessionRecord, SessionSummary, VisitEvent } from "@/lib/visit/types";

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

function formatLocationFromSession(session: ActiveSessionRecord | SessionSummary): string {
  const parts = [session.geo.city, session.geo.region, session.geo.country].filter(Boolean);
  const base = parts.join(", ") || "unknown";
  if (session.geo.edgeRegion) {
    return `${base} (edge ${session.geo.edgeRegion})`;
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

function formatNetworkFromSession(session: ActiveSessionRecord | SessionSummary): string {
  if (!session.ipinfo) {
    return "unknown";
  }

  const parts = [
    session.ipinfo.asn,
    session.ipinfo.asName,
    session.ipinfo.asDomain,
    session.ipinfo.org,
    session.ipinfo.company,
  ].filter(Boolean);

  if (parts.length === 0) {
    return "unknown";
  }
  return parts.join(" | ");
}

function formatDuration(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  const remSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remSeconds}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (hours === 0) {
    return `${minutes}m ${remSeconds}s`;
  }
  return `${hours}h ${remMinutes}m`;
}

async function sendPushoverMessage(params: {
  title: string;
  message: string;
  url?: string;
  urlTitle?: string;
}): Promise<boolean> {
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

  const body = new URLSearchParams();
  body.set("token", token);
  body.set("user", user);
  body.set("title", truncate(params.title, PUSHOVER_TITLE_MAX));
  body.set("message", truncate(params.message, PUSHOVER_MESSAGE_MAX));
  body.set("priority", priority);

  if (params.url) {
    body.set("url", params.url);
    body.set("url_title", params.urlTitle ?? "Open page");
  }

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
  return sendPushoverMessage({
    title: `Website Visit: ${event.path}`,
    message: buildMessage(event),
    url: event.fullUrl,
    urlTitle: "Open page",
  });
}

export async function sendPushoverSessionStartNotification(session: ActiveSessionRecord): Promise<boolean> {
  const lines = [
    `Entry: ${session.entryPath}`,
    `Referrer: ${session.referrerHost ?? "direct"}`,
    `Device: ${session.userAgent.deviceClass} (${session.userAgent.browser} on ${session.userAgent.os})`,
    `Language: ${session.language ?? "unknown"}`,
    `Timezone: ${session.timezone ?? "unknown"}`,
    `Location: ${formatLocationFromSession(session)}`,
    `Network: ${formatNetworkFromSession(session)}`,
    `IP: ${session.maskedIp}`,
    `Start: ${session.startedAtIso}`,
  ];

  return sendPushoverMessage({
    title: `Session Start: ${session.entryPath}`,
    message: lines.join("\n"),
    url: `https://${session.host}${session.entryPath}`,
    urlTitle: "Open entry page",
  });
}

export async function sendPushoverSessionSummaryNotification(summary: SessionSummary): Promise<boolean> {
  const topPagesText =
    summary.topPages.length === 0
      ? "none"
      : summary.topPages
          .map((page, index) => {
            const rank = index + 1;
            return `${rank}) ${page.path} (${formatDuration(page.engagedMs)}, scroll ${page.maxScrollPct}%, views ${page.viewCount})`;
          })
          .join("; ");

  const lines = [
    `Duration: ${formatDuration(summary.durationMs)}`,
    `Engaged: ${formatDuration(summary.engagedMs)}`,
    `Pages: ${summary.pageViewCount} views across ${summary.distinctPageCount} paths`,
    `Entry -> Exit: ${summary.entryPath} -> ${summary.exitPath}`,
    `Referrer: ${summary.referrerHost ?? "direct"}`,
    `Top pages: ${topPagesText}`,
    `Device: ${summary.userAgent.deviceClass} (${summary.userAgent.browser} on ${summary.userAgent.os})`,
    `Location: ${formatLocationFromSession(summary)}`,
    `Network: ${formatNetworkFromSession(summary)}`,
    `End: ${summary.endedAtIso}`,
  ];

  return sendPushoverMessage({
    title: `Session Summary: ${summary.pageViewCount} pages`,
    message: lines.join("\n"),
    url: summary.fullUrl,
    urlTitle: "Open exit page",
  });
}
