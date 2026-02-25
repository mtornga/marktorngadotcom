# marktorngadotcom

Personal site for [marktornga.com](https://marktornga.com).

## Visit Notifications

This project includes first-party tracking that posts visit/session events to `POST /api/visit` and sends mobile notifications through Pushover.

### What is captured

- Pathname and safe `utm_*` params only.
- Referrer host.
- Device class, browser, and OS.
- Geo from Vercel request headers (city/region/country + edge region).
- ASN/network enrichment from IPinfo Lite.
- Masked IP in notification; optional hashed IP in logs.
- Session events (`page_view`, `heartbeat`, `page_hide`) when session mode is enabled.
- Session summary metrics: duration, engaged time, page count, top pages, max scroll.

### Behavior defaults

- Human-biased filtering (bots + prefetch skipped).
- High-confidence anonymized traffic filtering (Tor/proxy signatures).
- Production only (`VERCEL_ENV=production`).
- Self-traffic exclusion via `VISIT_NOTIFY_EXCLUDE_IPS`.
- Session tracking defaults to off (`VISIT_NOTIFY_SESSIONS_ENABLED=false`).

### Notification modes

- Sessions disabled: page-view notifications (existing behavior).
- Sessions enabled: one `Session Start` push when a new session begins and one `Session Summary` push after inactivity timeout.

### Environment variables

Copy `.env.example` and set values in Vercel **Production** environment:

- `NEXT_PUBLIC_VISIT_NOTIFY_ENABLED=true`
- `NEXT_PUBLIC_VISIT_NOTIFY_ALLOWED_HOSTS=marktornga.com,www.marktornga.com` (optional override)
- `NEXT_PUBLIC_VISIT_NOTIFY_HEARTBEAT_SECONDS=15` (optional override for client heartbeat cadence)
- `PUSHOVER_USER_KEY`
- `PUSHOVER_API_TOKEN`
- `PUSHOVER_ENABLED=true`
- `PUSHOVER_PRIORITY=0`
- `IPINFO_TOKEN`
- `VISIT_NOTIFY_ALLOWED_HOSTS=marktornga.com,www.marktornga.com`
- `VISIT_NOTIFY_EXCLUDE_IPS` (comma-separated IP/CIDR, for example `73.1.2.3,192.168.0.0/16`)
- `VISIT_NOTIFY_EXCLUDE_ASNS` (comma-separated, for example `AS214503`)
- `VISIT_NOTIFY_EXCLUDE_NETWORK_PATTERNS` (comma-separated lowercase match terms, for example `r0cket.cloud`)
- `VISIT_NOTIFY_HASH_SALT` (recommended)
- `VISIT_NOTIFY_SESSIONS_ENABLED=false` (set to `true` after KV + cron are configured)
- `VISIT_NOTIFY_SESSION_IDLE_MINUTES=20`
- `VISIT_NOTIFY_HEARTBEAT_SECONDS=15`
- `VISIT_NOTIFY_SESSION_TTL_DAYS=7`
- `VISIT_NOTIFY_CRON_SECRET=<random secret>`
- `CRON_SECRET=<same as VISIT_NOTIFY_CRON_SECRET>` (for Vercel-managed cron auth header)
- `VISIT_NOTIFY_FLUSH_LIMIT=200`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

### Session flush scheduling

`/api/visit/flush` should run every 5 minutes to finalize idle sessions and send end summaries.

The endpoint requires:

- `Authorization: Bearer <VISIT_NOTIFY_CRON_SECRET>`
- `VISIT_NOTIFY_SESSIONS_ENABLED=true`

Notes:

- Vercel Hobby plan does not support sub-daily cron schedules.
- If you need 5-minute cadence on Hobby, use an external scheduler (for example GitHub Actions or cron-job.org) to call `GET https://marktornga.com/api/visit/flush` with the bearer token.

### Current production scheduler topology

The current production setup uses AWS as primary scheduler and GitHub Actions as fallback:

- Primary scheduler: EventBridge rule `marktornga-visit-flush-5min` (`rate(5 minutes)`).
- Primary executor: Lambda `marktornga-visit-flush`.
- Fallback scheduler: GitHub Actions workflow `.github/workflows/visit-flush-fallback.yml` (`*/15` + manual dispatch).
- Flush URL: `https://marktornga.com/api/visit/flush`.
- Auth: `Authorization: Bearer <VISIT_NOTIFY_CRON_SECRET>`.

### AWS operational checks (for future agents)

Use AWS CLI (`us-east-1`) to verify scheduler and alarms:

```bash
aws events describe-rule \
  --region us-east-1 \
  --name marktornga-visit-flush-5min

aws events list-targets-by-rule \
  --region us-east-1 \
  --rule marktornga-visit-flush-5min

aws lambda get-function \
  --region us-east-1 \
  --function-name marktornga-visit-flush
```

CloudWatch alarms currently configured:

- `marktornga-visit-flush-errors` (Lambda errors in 5-minute window).
- `marktornga-visit-flush-missing-invocations` (no invocations detected in 15 minutes).

Check alarm state:

```bash
aws cloudwatch describe-alarms \
  --region us-east-1 \
  --alarm-name-prefix marktornga-visit-flush \
  --query 'MetricAlarms[].{name:AlarmName,state:StateValue,reason:StateReason}' \
  --output table
```

Inspect recent Lambda logs when alarmed:

```bash
aws logs tail /aws/lambda/marktornga-visit-flush \
  --region us-east-1 \
  --since 1h
```

### Local smoke test

Local requests will return `204` and skip push notifications unless `VERCEL_ENV=production`.

```bash
curl -i -X POST http://localhost:3000/api/visit \
  -H "content-type: application/json" \
  -H "host: marktornga.com" \
  -H "user-agent: Mozilla/5.0" \
  -d '{"eventType":"page_view","pageId":"local-test-1","clientTs":1730000000000,"activeMsDelta":0,"scrollMaxPct":0,"path":"/","utm":{"utm_source":"test"},"referrer":"https://google.com","title":"Home","tz":"America/Chicago","lang":"en-US","viewport":{"width":1440,"height":900}}'
```

### Production verification

1. Deploy to Vercel production with vars above.
2. Validate page-view mode first (`VISIT_NOTIFY_SESSIONS_ENABLED=false`) and confirm visit pushes work.
3. Configure KV + cron secret, then set `VISIT_NOTIFY_SESSIONS_ENABLED=true`.
4. Visit `https://marktornga.com` from a non-excluded IP and confirm `Session Start` push.
5. Wait past idle timeout and confirm `Session Summary` push.
