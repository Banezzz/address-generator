import { resolveSubregion, getRegionConfig } from './config/regions.js'
import { generateAddress } from './services/address.js'
import { buildEmailEntry } from './services/email.js'
import { buildProfile } from './services/profile.js'
import { createTempInbox, getTempInboxMessage, listTempInboxMessages } from './services/tempInbox.js'
import { renderApp } from './ui/template.js'

export default {
  async fetch (request) {
    return handleRequest(request)
  }
}

async function handleRequest (request) {
  const url = new URL(request.url)

  if (url.pathname === '/api/inbox/create' && request.method === 'POST') {
    const body = await readJsonBody(request)
    const inbox = await createTempInbox(fetch, body.hint || 'address-user')
    return jsonResponse(inbox)
  }

  if (url.pathname === '/api/inbox/messages' && request.method === 'GET') {
    const token = url.searchParams.get('token') || ''
    if (!token) {
      return jsonResponse({ error: 'Missing token' }, 400)
    }

    const messages = await listTempInboxMessages(fetch, token)
    return jsonResponse({ messages })
  }

  if (url.pathname === '/api/inbox/message' && request.method === 'GET') {
    const token = url.searchParams.get('token') || ''
    const id = url.searchParams.get('id') || ''

    if (!token || !id) {
      return jsonResponse({ error: 'Missing token or id' }, 400)
    }

    const message = await getTempInboxMessage(fetch, token, id)
    return jsonResponse({ message })
  }

  const regionId = url.searchParams.get('region') || 'US'
  const requestedSubregion = url.searchParams.get('subregion') || ''
  const regionConfig = getRegionConfig(regionId)
  const subregionId = resolveSubregion(regionConfig.id, requestedSubregion)

  try {
    const address = await generateAddress({
      fetchFn: fetch,
      regionId: regionConfig.id,
      subregionId
    })

    const profile = buildProfile({
      regionId: regionConfig.id,
      subregionId
    })

    const emailEntry = buildEmailEntry(profile, regionConfig)
    const html = renderApp({
      regionConfig,
      regionId: regionConfig.id,
      subregionId,
      address,
      profile,
      emailEntry
    })

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com; connect-src 'self' https://nominatim.openstreetmap.org https://api.mail.tm"
      }
    })
  } catch (error) {
    console.error('Address generation failed:', error)
    const message = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Address Generator Error</title>
          <style>
            body { font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0b0d12; color: #f7f8fb; padding: 24px; }
            .card { max-width: 720px; background: #12161d; border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.35); }
            h1 { margin: 0 0 12px; font-size: 2rem; }
            p { color: #a8b0bd; line-height: 1.7; }
            a { display: inline-flex; margin-top: 16px; color: #111; background: linear-gradient(135deg, #ff8a1f, #ff6a00); border-radius: 999px; padding: 12px 16px; font-weight: 700; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Unable to generate an address</h1>
            <p>Something went wrong while generating the address. Please try again or switch regions.</p>
            <p>Try reloading or switching to a different region/subregion. Some geocoding areas are denser than others.</p>
            <a href="/">Back to generator</a>
          </div>
        </body>
      </html>`

    return new Response(message, {
      status: 500,
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com; connect-src 'self' https://nominatim.openstreetmap.org https://api.mail.tm"
      }
    })
  }
}

async function readJsonBody (request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

function jsonResponse (data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'cache-control': 'no-store'
    }
  })
}
