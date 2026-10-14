import type { SessionSummary } from "@/lib/visit/types";

function shortText(value: string, max: number): string {
  const clean = value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

function html(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function label(value: string): string {
  return shortText(value.replace(/\s*\|\s*Mark Tornga\s*$/i, ""), 64);
}

function duration(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

function endedAt(iso: string): string {
  const date = new Date(iso);
  if (!Number.isFinite(date.getTime())) return "unknown";
  const options: Intl.DateTimeFormatOptions = {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short",
  };
  try {
    return date.toLocaleString("en-US", { ...options, timeZone: process.env.VISIT_NOTIFY_REPORT_TIMEZONE || "America/Chicago" });
  } catch {
    return date.toLocaleString("en-US", { ...options, timeZone: "America/Chicago" });
  }
}

export function buildSessionReport(summary: SessionSummary) {
  const primary = summary.topPages[0];
  const primaryLabel = label(primary?.title || primary?.path || summary.entryPath);
  const pageCount = `${summary.distinctPageCount} ${summary.distinctPageCount === 1 ? "page" : "pages"}`;
  const views = summary.pageViewCount > summary.distinctPageCount ? ` · ${summary.pageViewCount} views` : "";
  const source = summary.referrerHost ? shortText(summary.referrerHost.replace(/^www\./, ""), 70) : "Direct / unknown";
  const device = [summary.userAgent.deviceClass, summary.userAgent.browser, summary.userAgent.os]
    .map((value) => shortText(value, 30)).join(" · ");
  const blocks = [
    `<b>${duration(summary.engagedMs)} visible</b> · ${pageCount}${views}\nVisit span: ${duration(summary.durationMs)}`,
    `From: ${html(source)}\nDevice: ${html(device)}`,
  ];

  for (const page of summary.topPages) {
    const repeat = page.viewCount > 1 ? ` · ${page.viewCount} views` : "";
    blocks.push(`<b>${html(label(page.title || page.path))}</b>\n${duration(page.engagedMs)} visible · ${page.maxScrollPct}% max page scroll${repeat}`);
  }
  if (summary.distinctPageCount > summary.topPages.length) {
    blocks.push(`+ ${summary.distinctPageCount - summary.topPages.length} other pages`);
  }
  if (summary.distinctPageCount > 1 && summary.journey?.length) {
    const stops = summary.journey.filter((stop, i, all) => i === 0 || stop !== all[i - 1]);
    const journey = stops.length > 4 ? [...stops.slice(0, 3), "…", stops.at(-1)!] : stops;
    blocks.push(`Journey: ${html(shortText(journey.map(label).join(" → "), 120))}`);
  }
  const location = [summary.geo.city, summary.geo.region, summary.geo.country].filter(Boolean).join(", ");
  const network = summary.ipinfo?.asName || summary.ipinfo?.org;
  if (location) blocks.push(`Location: ${html(shortText(location, 70))}`);
  if (network) blocks.push(`Network: ${html(shortText(network, 70))}`);
  blocks.push(`Ended: ${html(endedAt(summary.endedAtIso))}`);

  // Keep complete HTML blocks; cutting raw HTML at 1024 can break tags/entities.
  const included: string[] = [];
  for (const block of blocks) {
    if ([...included, block].join("\n\n").length <= 1024) included.push(block);
  }
  return {
    title: `Visit ended: ${primaryLabel}`,
    message: included.join("\n\n"),
    html: true,
    url: primary ? `https://${summary.host}${primary.path}` : summary.fullUrl,
    urlTitle: "Open main page",
  };
}
