import { createHttpClient } from './httpClient.js'
import { mapMailboxDetail, mapMailboxSummary } from './mailboxMapper.js'

const MAIL_TM_API = 'https://api.mail.tm'
const DOMAIN_CACHE_TTL_MS = 5 * 60 * 1000
const MAIL_TM_POLICY = {
  key: 'mail.tm',
  maxConcurrent: 2,
  minIntervalMs: 250,
  maxQueueSize: 80
}

let cachedDomain = null
let cachedDomainExpiresAt = 0

export function clearMailTmDomainCache () {
  cachedDomain = null
  cachedDomainExpiresAt = 0
}

export function createMailTmClient ({
  fetchFn,
  requestId,
  now = () => Date.now(),
  httpClient = createHttpClient({ fetchFn })
} = {}) {
  return {
    createAccount,
    createToken,
    getActiveDomain,
    listMessages,
    getMessage
  }

  async function createAccount ({ address, password }) {
    return requestJson('/accounts', {
      method: 'POST',
      body: { address, password }
    })
  }

  async function createToken ({ address, password }) {
    return requestJson('/token', {
      method: 'POST',
      body: { address, password }
    })
  }

  async function getActiveDomain () {
    if (cachedDomain && now() < cachedDomainExpiresAt) {
      return cachedDomain
    }

    const data = await requestJson('/domains')
    const domains = data['hydra:member'] || []
    const domain = domains.find(item => item.isActive && !item.isPrivate)?.domain || domains.find(item => item.isActive)?.domain

    if (!domain) {
      throw new Error('No active mail.tm domain available')
    }

    cachedDomain = domain
    cachedDomainExpiresAt = now() + DOMAIN_CACHE_TTL_MS
    return domain
  }

  async function listMessages (token) {
    const data = await requestJson('/messages', {
      token
    })

    return (data['hydra:member'] || []).map(mapMailboxSummary)
  }

  async function getMessage (token, messageId) {
    const message = await requestJson(`/messages/${messageId}`, {
      token
    })

    return mapMailboxDetail(message)
  }

  async function requestJson (path, { method = 'GET', body, token } = {}) {
    return httpClient.requestJson(`${MAIL_TM_API}${path}`, {
      service: 'mail.tm',
      timeoutMs: 7000,
      retries: 2,
      backoffMs: 800,
      retryOnStatuses: [429, 500, 502, 503, 504],
      policy: MAIL_TM_POLICY,
      init: {
        method,
        headers: {
          ...(body ? { 'content-type': 'application/json' } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: body ? JSON.stringify(body) : undefined
      },
      context: {
        requestId,
        upstream: 'mail.tm',
        path
      }
    })
  }
}
