import { sendPushoverSessionSummaryNotification } from "@/lib/visit/pushover";
import { getSessionConfigFromEnv, flushIdleSessions } from "@/lib/visit/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SESSIONS_ENABLED = (process.env.VISIT_NOTIFY_SESSIONS_ENABLED ?? "false").toLowerCase() === "true";
const SESSION_CONFIG = getSessionConfigFromEnv();

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value ?? "");
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
}

function isAuthorized(request: Request): boolean {
  const configuredSecret = process.env.VISIT_NOTIFY_CRON_SECRET?.trim() || process.env.CRON_SECRET?.trim();
  if (!configuredSecret) {
    console.warn("[visit-notify] flush requested but VISIT_NOTIFY_CRON_SECRET is not configured");
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";
  return token === configuredSecret;
}

async function handleFlush(request: Request): Promise<Response> {
  if (!SESSIONS_ENABLED) {
    return new Response(JSON.stringify({ ok: true, skipped: "sessions_disabled" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const configuredSecret = process.env.VISIT_NOTIFY_CRON_SECRET?.trim() || process.env.CRON_SECRET?.trim();
  if (!configuredSecret) {
    return new Response(JSON.stringify({ ok: true, skipped: "missing_secret" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const limit = parsePositiveInt(process.env.VISIT_NOTIFY_FLUSH_LIMIT, 200);
  const summaries = await flushIdleSessions(SESSION_CONFIG, limit);

  let pushed = 0;
  let failed = 0;
  for (const summary of summaries) {
    const sent = await sendPushoverSessionSummaryNotification(summary);
    if (sent) {
      pushed += 1;
    } else {
      failed += 1;
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      closedSessions: summaries.length,
      pushed,
      failed,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function GET(request: Request): Promise<Response> {
  return handleFlush(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleFlush(request);
}
