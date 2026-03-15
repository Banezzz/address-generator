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

It pairs each address with region-matched synthetic identity details, bilingual name output, map preview, a live disposable inbox powered by `mail.tm`, and locally plausible phone prefixes for sign-up form testing.

## Features

- Real address lookup using OpenStreetMap Nominatim reverse geocoding
- Google Maps embed and external map link
- Region and subregion selection
- Bilingual name presentation where applicable
- Region-matched phone prefix explanation
- Live temporary inbox creation, refresh, and message viewing via same-origin Worker endpoints
- Copy-to-clipboard interactions
- Local save, note, delete, and CSV export
- Modern black-orange dark UI
- Automatic fallback validation for harder geocoding regions
- Retry/backoff handling for transient Nominatim `429` rate limits

## Project Structure

- `src/index.js` - Worker entry
- `src/config/regions.js` - region and subregion metadata
- `src/config/seeds.js` - coordinate seeds
- `src/services/address.js` - reverse geocoding and validation
- `src/services/profile.js` - names and phone generation
- `src/services/email.js` - suggested email alias shown before a live inbox is created
- `src/services/tempInbox.js` - `mail.tm` integration for inbox creation and message retrieval
- `src/services/formatters.js` - shared helpers
- `src/ui/template.js` - HTML, CSS, and client-side interactions

## Development

Install dependencies:

```bash
npm install
```

Run the Worker locally:

```bash
npm run dev
```

The Wrangler dev server runs on:

```text
http://127.0.0.1:8787
```

If you want to force host and port explicitly, you can also use:

```bash
npm run dev -- --ip 127.0.0.1 --port 8787
```

The app uses same-origin inbox API routes exposed by the Worker:

```text
POST /api/inbox/create
GET  /api/inbox/messages?token=...
GET  /api/inbox/message?token=...&id=...
```

Current dependency health:

```bash
npm audit
```

At the moment, this reports:

```text
found 0 vulnerabilities
```

Deploy:

```bash
npm run deploy
```

## Notes

- Addresses are intended for testing, design, and educational use.
- Identity details are synthetic and only region-matched, not real individuals.
- Geocoding coverage varies by region; retrying another subregion may produce better results.
- Temporary inbox functionality depends on `mail.tm` availability and rate limits.
- Reverse geocoding depends on OpenStreetMap Nominatim coverage and upstream response limits.
