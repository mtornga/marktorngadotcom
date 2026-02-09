# marktorngadotcom

Personal site for [marktornga.com](https://marktornga.com).

## Visit Notifications

This project includes first-party visit tracking that posts pageview events to `POST /api/visit` and sends mobile notifications through Pushover.

### What is captured

- Pathname and safe `utm_*` params only.
- Referrer host.
- Device class, browser, and OS.
- Geo from Vercel request headers (city/region/country + edge region).
- ASN/network enrichment from IPinfo Lite.
- Masked IP in notification; optional hashed IP in logs.

### Behavior defaults

- Every page view is eligible.
- Human-biased filtering (bots + prefetch skipped).
- High-confidence anonymized traffic filtering (Tor/proxy signatures).
- Production only (`VERCEL_ENV=production`).
- Self-traffic exclusion via `VISIT_NOTIFY_EXCLUDE_IPS`.

### Environment variables

Copy `.env.example` and set values in Vercel **Production** environment:

- `NEXT_PUBLIC_VISIT_NOTIFY_ENABLED=true`
- `NEXT_PUBLIC_VISIT_NOTIFY_ALLOWED_HOSTS=marktornga.com,www.marktornga.com` (optional override)
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

### Local smoke test

Local requests will return `204` and skip push notifications unless `VERCEL_ENV=production`.

```bash
curl -i -X POST http://localhost:3000/api/visit \
  -H "content-type: application/json" \
  -H "host: marktornga.com" \
  -H "user-agent: Mozilla/5.0" \
  -d '{"path":"/","utm":{"utm_source":"test"},"referrer":"https://google.com","title":"Home","tz":"America/Chicago","lang":"en-US","viewport":{"width":1440,"height":900}}'
```

### Production verification

1. Deploy to Vercel production with vars above.
2. Visit `https://marktornga.com` from a non-excluded IP.
3. Confirm a Pushover notification appears with path/device/location/network details.
