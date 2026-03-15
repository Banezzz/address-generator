import { HttpError } from '../services/httpClient.js'
import { getApiSecurityHeaders, getAssetSecurityHeaders, getHtmlSecurityHeaders } from './security.js'

export function htmlResponse (markup, status = 200, extraHeaders = {}) {
  return new Response(markup, {
    status,
    headers: {
      ...getHtmlSecurityHeaders(),
      'content-type': 'text/html;charset=UTF-8',
      ...extraHeaders
    }
  })
}

export function jsonResponse (payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...getApiSecurityHeaders(),
      'content-type': 'application/json;charset=UTF-8',
      ...extraHeaders
    }
  })
}

export function javascriptResponse (source) {
  return new Response(source, {
    headers: {
      ...getAssetSecurityHeaders(),
      'content-type': 'application/javascript;charset=UTF-8'
    }
  })
}

export function cssResponse (source) {
  return new Response(source, {
    headers: {
      ...getAssetSecurityHeaders(),
      'content-type': 'text/css;charset=UTF-8'
    }
  })
}

export function methodNotAllowed (requestId, allowed) {
  return apiErrorResponse({
    requestId,
    status: 405,
    code: 'method_not_allowed',
    message: 'Method not allowed',
    details: {
      allowed
    }
  }, {
    Allow: allowed.join(', ')
  })
}

export function notFound (requestId) {
  return apiErrorResponse({
    requestId,
    status: 404,
    code: 'not_found',
    message: 'Route not found'
  })
}

export function badRequest (requestId, message, details) {
  return apiErrorResponse({
    requestId,
    status: 400,
    code: 'bad_request',
    message,
    details
  })
}

export function unauthorized (requestId, message = 'Missing or invalid Authorization header') {
  return apiErrorResponse({
    requestId,
    status: 401,
    code: 'unauthorized',
    message
  })
}

export function handleApiError (error, requestId) {
  if (error instanceof HttpError) {
    return apiErrorResponse({
      requestId,
      status: clampStatus(error.status),
      code: error.code || 'upstream_error',
      message: error.message,
      details: error.details
    })
  }

  return apiErrorResponse({
    requestId,
    status: 500,
    code: 'internal_error',
    message: error?.message || 'Internal server error'
  })
}

export async function readJsonBody (request) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

export function readBearerToken (request) {
  const header = request.headers.get('authorization') || request.headers.get('Authorization') || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match ? match[1].trim() : ''
}

function apiErrorResponse ({ requestId, status, code, message, details }, extraHeaders = {}) {
  return jsonResponse({
    requestId,
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  }, status, extraHeaders)
}

function clampStatus (status) {
  const value = Number(status) || 500
  if (value < 400 || value > 599) {
    return 502
  }

  return value
}
