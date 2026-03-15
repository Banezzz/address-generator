const requestQueue = []
let activeRequests = 0
let lastRequestTime = 0

const MAX_CONCURRENT = 2
const MIN_INTERVAL_MS = 1100

export async function rateLimitedFetch (fetchFn, url, options) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fetchFn, url, options, resolve, reject })
    processQueue()
  })
}

async function processQueue () {
  if (activeRequests >= MAX_CONCURRENT || requestQueue.length === 0) return

  const now = Date.now()
  const elapsed = now - lastRequestTime
  if (elapsed < MIN_INTERVAL_MS) {
    setTimeout(processQueue, MIN_INTERVAL_MS - elapsed)
    return
  }

  activeRequests++
  lastRequestTime = Date.now()
  const { fetchFn, url, options, resolve, reject } = requestQueue.shift()

  try {
    const result = await fetchFn(url, options)
    resolve(result)
  } catch (error) {
    reject(error)
  } finally {
    activeRequests--
    if (requestQueue.length > 0) {
      setTimeout(processQueue, MIN_INTERVAL_MS)
    }
  }
}

export function getQueueStats () {
  return {
    pending: requestQueue.length,
    active: activeRequests
  }
}
