# Multi-Region Address Generator

A Cloudflare Worker that generates real, geocodable addresses for:

- United States
- United States tax-free states
- Hong Kong
- Singapore
- Japan
- Taiwan
- Thailand
- Vietnam
- South Korea
- India

It pairs each address with region-matched synthetic identity details, bilingual name output, map preview, a same-origin disposable inbox powered by `mail.tm`, and locally plausible phone prefixes for sign-up form testing.

## Features

- Real address lookup using OpenStreetMap Nominatim reverse geocoding
- Explicit subregion validation rules instead of seed-only matching
- Shared upstream HTTP client with real timeout, retry, backoff, abort, and per-service rate policy support
- Google Maps embed and external map link
- Region and subregion selection
- Bilingual name presentation where applicable
- Same-origin inbox API routes with bearer tokens in request headers instead of URL query strings
- Session-scoped live inbox storage in the browser
- Copy-to-clipboard interactions, local save, note, delete, and CSV export
- Externalized client assets with a stricter CSP that no longer relies on inline script/style

## Architecture

### Request flow

- `src/index.js` routes page requests, API requests, and hashed UI asset requests
- `src/server/pageHandler.js` generates the first page response
- `src/server/apiRouter.js` applies method checks and stable JSON error envelopes
- `src/server/security.js` owns CSP and other security headers

### Regions

- `src/regions/` is the source of truth for each country: subregions, seeds, OSM field mapping, format, names, and phones
- `src/config/regions.js` stays a thin facade so existing imports and tests keep working

### Services

- `src/services/httpClient.js` provides shared timeout/retry/rate-limited upstream fetch logic
- `src/services/geocodeClient.js` talks to Nominatim
- `src/services/mailTmClient.js` talks to `mail.tm` and caches active domains
- `src/services/address/*` contains address generation, caching, normalization, formatting, and subregion matchers
- `src/services/tempInbox.js` is the app-facing inbox service wrapper

### UI

- `src/ui/template.js` renders the page shell
- `src/ui/renderers.js` contains reusable HTML fragments
- `src/ui/assets/app.js` contains the browser client bundle served by the Worker
- `src/ui/assets/styles.js` contains the stylesheet served by the Worker

## API

The Worker exposes same-origin APIs:

```text
GET  /api/generate?region=&subregion=
POST /api/inbox/create
GET  /api/inbox/messages
GET  /api/inbox/message?id=...
```

`/api/generate` is rate-limited per client IP. Unknown `region` values return `400` with `unknown_region` instead of falling back to the United States. The browser generate button uses this API so the page does not fully reload.

`/api/inbox/messages` and `/api/inbox/message` require:

```text
Authorization: Bearer <mail.tm token>
```

Errors return a stable JSON shape:

```json
{
  "requestId": "uuid",
  "error": {
    "code": "bad_request",
    "message": "Missing message id"
  }
}
```

## Development

Install dependencies:

```bash
npm install
```

Run the Worker locally:

```bash
npm run dev
```

Default local URL:

```text
http://127.0.0.1:8787
```

Verification commands:

```bash
npm run lint
npm test
```

Or run both:

```bash
npm run check
```

## Repository Conventions

- `package-lock.json` is tracked and should stay committed.
- `.wrangler/` is ignored and should not appear in `git status` after normal local development.
- CI runs `npm run lint` and `npm test` on pushes to `main` and on pull requests.
- Pushes to `main` also deploy the Worker when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are configured.

## Security Notes

- Inbox provider tokens are no longer placed in browser URLs.
- Live inbox state uses `sessionStorage`, so it clears when the tab/session ends.
- Inbox passwords are only kept in memory for the current tab session and are not persisted.
- The page CSP uses external script and style assets and removes `'unsafe-inline'`.

## Deployment

This Worker deploys with the repo-local Wrangler CLI (`npm run deploy`). You do not need a global install.

Interactive login on your own machine:

```bash
npx wrangler login
npm run deploy
```

Non-interactive deploy from CI or a Cloud Agent needs a Cloudflare API token with Workers edit permission, plus the account id:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npm run deploy
```

`workers_dev` is disabled. The public hostname is the custom domain in `wrangler.toml`. A deploy from this repo will keep `*.workers.dev` off.

## Notes

- Addresses are intended for testing, design, and educational use.
- Identity details are synthetic and only region-matched, not real individuals.
- Reverse geocoding quality still depends on upstream OpenStreetMap coverage.
- Temporary inbox functionality still depends on `mail.tm` availability and rate limits.
