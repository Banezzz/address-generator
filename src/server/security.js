const HTML_CSP = [
  "default-src 'self'",
  "base-uri 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "connect-src 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  'frame-src https://www.google.com'
].join('; ')

const API_CSP = [
  "default-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "object-src 'none'"
].join('; ')

export function getHtmlSecurityHeaders () {
  return {
    'cache-control': 'no-store',
    'content-security-policy': HTML_CSP,
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY'
  }
}

export function getApiSecurityHeaders () {
  return {
    'cache-control': 'no-store',
    'content-security-policy': API_CSP,
    'referrer-policy': 'no-referrer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY'
  }
}

export function getAssetSecurityHeaders () {
  return {
    'cache-control': 'public, max-age=300',
    'x-content-type-options': 'nosniff'
  }
}
