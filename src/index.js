import { handleApiRequest } from './server/apiRouter.js'
import { handlePageRequest } from './server/pageHandler.js'
import { cssResponse, javascriptResponse } from './server/response.js'
import { getClientScript } from './ui/assets/app.js'
import { getStyles } from './ui/assets/styles.js'

export default {
  async fetch (request, env, ctx) {
    return handleRequest(request, { env, ctx })
  }
}

export async function handleRequest (request, { env = {}, ctx = {}, fetchFn = fetch } = {}) {
  const url = new URL(request.url)
  const requestId = createRequestId()
  const context = {
    request,
    env,
    ctx,
    url,
    fetchFn,
    requestId,
    log: logWithRequestId.bind(null, requestId)
  }

  if (url.pathname === '/assets/app.js') {
    return javascriptResponse(getClientScript())
  }

  if (url.pathname === '/assets/app.css') {
    return cssResponse(getStyles())
  }

  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(context)
  }

  return handlePageRequest(context)
}

function createRequestId () {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function logWithRequestId (requestId, level, message, details = {}) {
  const method = console[level] || console.log
  method(message, {
    requestId,
    ...details
  })
}
