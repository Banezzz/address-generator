const WINDOW_MS = 60_000
const DEFAULT_LIMIT = 8
const memoryHits = new Map()

export async function consumeGenerateRateLimit (env, ip, {
  limit = DEFAULT_LIMIT,
  now = Date.now()
} = {}) {
  const key = `rl:${ip || 'local'}`
  const kvCount = await incrementKv(env, key)
  if (typeof kvCount === 'number') {
    return {
      allowed: kvCount <= limit,
      remaining: Math.max(0, limit - kvCount),
      retryAfterSeconds: 60
    }
  }

  const stamps = (memoryHits.get(key) || []).filter(stamp => now - stamp < WINDOW_MS)
  stamps.push(now)
  memoryHits.set(key, stamps)

  return {
    allowed: stamps.length <= limit,
    remaining: Math.max(0, limit - stamps.length),
    retryAfterSeconds: 60
  }
}

export function resetRateLimitForTests () {
  memoryHits.clear()
}

async function incrementKv (env, key) {
  if (!env?.ADDRESS_CACHE?.get || !env?.ADDRESS_CACHE?.put) {
    return null
  }

  try {
    const current = Number(await env.ADDRESS_CACHE.get(key)) || 0
    const next = current + 1
    await env.ADDRESS_CACHE.put(key, String(next), { expirationTtl: 60 })
    return next
  } catch {
    return null
  }
}
