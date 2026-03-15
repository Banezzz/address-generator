const DEFAULT_RETRY_STATUSES = new Set([429, 500, 502, 503, 504])
const policyStateMap = new Map()

export class HttpError extends Error {
  constructor (message, {
    code = 'upstream_error',
    service = 'upstream',
    status = 502,
    retryable = false,
    cause,
    context = {},
    details
  } = {}) {
    super(message)
    this.name = 'HttpError'
    this.code = code
    this.service = service
    this.status = status
    this.retryable = retryable
    this.context = context
    this.details = details

    if (cause) {
      this.cause = cause
    }
  }
}

export function createHttpClient ({
  fetchFn = fetch,
  logger = console,
  now = () => Date.now(),
  wait = defaultWait
} = {}) {
  return {
    request,
    requestJson
  }

  async function request (url, {
    service = 'upstream',
    init = {},
    timeoutMs = 10000,
    retries = 0,
    backoffMs = 500,
    retryOnStatuses = DEFAULT_RETRY_STATUSES,
    policy = null,
    signal,
    context = {}
  } = {}) {
    const retryStatuses = normalizeRetryStatuses(retryOnStatuses)
    let lastError = null

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await scheduleRequest(policy, () => runFetch({
          fetchFn,
          url,
          init,
          timeoutMs,
          signal,
          service,
          context
        }), { now, wait })

        if (response.ok) {
          return response
        }

        const hasNextAttempt = attempt < retries
        if (hasNextAttempt && retryStatuses.has(response.status)) {
          const delayMs = getRetryDelayMs({ response, attempt, backoffMs })
          logRetry(logger, {
            service,
            context,
            reason: `status ${response.status}`,
            attempt,
            retries,
            delayMs
          })
          await wait(delayMs)
          continue
        }

        throw await buildResponseError(response, { service, context })
      } catch (error) {
        const normalizedError = normalizeThrownError(error, { service, context })
        lastError = normalizedError

        if (normalizedError.retryable && attempt < retries) {
          const delayMs = getRetryDelayMs({ attempt, backoffMs })
          logRetry(logger, {
            service,
            context,
            reason: normalizedError.code,
            attempt,
            retries,
            delayMs
          })
          await wait(delayMs)
          continue
        }

        throw normalizedError
      }
    }

    throw lastError || new HttpError(`${service} request failed`, { service, context })
  }

  async function requestJson (url, options = {}) {
    const response = await request(url, options)
    const text = await response.text()

    if (!text.trim()) {
      return {}
    }

    const parsed = tryParseJson(text)
    if (parsed === undefined) {
      throw new HttpError(`${options.service || 'upstream'} returned invalid JSON`, {
        code: 'invalid_json',
        service: options.service || 'upstream',
        status: 502,
        context: options.context,
        details: {
          bodyPreview: text.slice(0, 200)
        }
      })
    }

    return parsed
  }
}

async function buildResponseError (response, { service, context }) {
  const text = await response.text()
  const parsed = text ? tryParseJson(text) : undefined
  const message = parsed?.detail || parsed?.message || text || `${service} request failed with ${response.status}`

  return new HttpError(message, {
    code: 'upstream_error',
    service,
    status: response.status,
    context,
    details: {
      body: parsed ?? text
    }
  })
}

function normalizeThrownError (error, { service, context }) {
  if (error instanceof HttpError) {
    return error
  }

  return new HttpError(`${service} request failed`, {
    code: 'network_error',
    service,
    status: 502,
    retryable: true,
    context,
    cause: error
  })
}

async function runFetch ({ fetchFn, url, init, timeoutMs, signal, service, context }) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const cleanup = []
  let timeoutId = null
  let timedOut = false

  if (controller && signal) {
    const forwardAbort = () => controller.abort(signal.reason)
    signal.addEventListener('abort', forwardAbort, { once: true })
    cleanup.push(() => signal.removeEventListener('abort', forwardAbort))
  }

  if (controller && timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      timedOut = true
      controller.abort(new Error(`Timed out after ${timeoutMs}ms`))
    }, timeoutMs)
    cleanup.push(() => clearTimeout(timeoutId))
  }

  try {
    return await fetchFn(url, {
      ...init,
      signal: controller?.signal || signal
    })
  } catch (error) {
    if (timedOut) {
      throw new HttpError(`${service} request timed out after ${timeoutMs}ms`, {
        code: 'timeout',
        service,
        status: 504,
        retryable: true,
        context,
        cause: error
      })
    }

    if (signal?.aborted) {
      throw new HttpError(`${service} request was aborted`, {
        code: 'aborted',
        service,
        status: 499,
        retryable: false,
        context,
        cause: error
      })
    }

    throw new HttpError(`${service} request failed`, {
      code: 'network_error',
      service,
      status: 502,
      retryable: true,
      context,
      cause: error
    })
  } finally {
    for (const teardown of cleanup) {
      teardown()
    }
  }
}

function scheduleRequest (policy, task, helpers) {
  const resolvedPolicy = normalizePolicy(policy)
  if (!resolvedPolicy) {
    return task()
  }

  const state = getPolicyState(resolvedPolicy.key)
  if (state.queue.length >= resolvedPolicy.maxQueueSize) {
    throw new HttpError(`${resolvedPolicy.key} queue is full`, {
      code: 'queue_overflow',
      service: resolvedPolicy.key,
      status: 503,
      retryable: true
    })
  }

  return new Promise((resolve, reject) => {
    state.queue.push({ task, resolve, reject })
    drainPolicyQueue(resolvedPolicy, state, helpers)
  })
}

function drainPolicyQueue (policy, state, helpers) {
  if (state.active >= policy.maxConcurrent || state.queue.length === 0) {
    trimPolicyState(policy, state)
    return
  }

  const elapsed = helpers.now() - state.lastStartedAt
  const waitMs = Math.max(policy.minIntervalMs - elapsed, 0)

  if (waitMs > 0) {
    if (!state.timerId) {
      state.timerId = setTimeout(() => {
        state.timerId = null
        drainPolicyQueue(policy, state, helpers)
      }, waitMs)
    }
    return
  }

  const job = state.queue.shift()
  state.active += 1
  state.lastStartedAt = helpers.now()

  Promise.resolve()
    .then(job.task)
    .then(job.resolve, job.reject)
    .finally(() => {
      state.active -= 1
      drainPolicyQueue(policy, state, helpers)
    })
}

function trimPolicyState (policy, state) {
  if (state.active === 0 && state.queue.length === 0 && !state.timerId) {
    policyStateMap.delete(policy.key)
  }
}

function getPolicyState (key) {
  if (!policyStateMap.has(key)) {
    policyStateMap.set(key, {
      queue: [],
      active: 0,
      lastStartedAt: 0,
      timerId: null
    })
  }

  return policyStateMap.get(key)
}

function normalizePolicy (policy) {
  if (!policy) {
    return null
  }

  return {
    key: policy.key || 'default',
    maxConcurrent: Math.max(1, Number(policy.maxConcurrent) || 1),
    minIntervalMs: Math.max(0, Number(policy.minIntervalMs) || 0),
    maxQueueSize: Math.max(1, Number(policy.maxQueueSize) || 50)
  }
}

function normalizeRetryStatuses (value) {
  if (value instanceof Set) {
    return value
  }

  return new Set(Array.isArray(value) ? value : [...DEFAULT_RETRY_STATUSES])
}

function getRetryDelayMs ({ response, attempt, backoffMs }) {
  const retryAfterHeader = Number(response?.headers?.get?.('Retry-After') || '0')
  if (retryAfterHeader > 0) {
    return retryAfterHeader * 1000
  }

  return backoffMs * (attempt + 1)
}

function logRetry (logger, { service, context, reason, attempt, retries, delayMs }) {
  logger?.warn?.(`${service} request retry scheduled`, {
    ...context,
    reason,
    retryAttempt: attempt + 1,
    maxRetries: retries,
    delayMs
  })
}

function tryParseJson (value) {
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

function defaultWait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
