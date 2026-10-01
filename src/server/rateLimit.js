const WINDOW_MS = 60_000
const DEFAULT_LIMIT = 8
const memoryHits = new Map()

export async function consumeGenerateRateLimit (env, ip, {
  limit = DEFAULT_LIMIT,
  now = Date.now()
} = {}) {
  const key = `rl:${ip || 'local'}`
  const memory = consumeMemory(key, now, limit)
  if (!memory.allowed) {
    return memory
  }

  const kvCount = await incrementKv(env, key, now)
  if (typeof kvCount === 'number' && kvCount > limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: 60
    }
  }

  return memory
}

export function resetRateLimitForTests () {
  memoryHits.clear()
}

function consumeMemory (key, now, limit) {
  const stamps = (memoryHits.get(key) || []).filter(stamp => now - stamp < WINDOW_MS)
  stamps.push(now)
  memoryHits.set(key, stamps)

  return {
    allowed: stamps.length <= limit,
    remaining: Math.max(0, limit - stamps.length),
    retryAfterSeconds: 60
  }
}

async function incrementKv (env, key, now) {
  if (!env?.ADDRESS_CACHE?.get || !env?.ADDRESS_CACHE?.put) {
    return null
  }

  try {
    const raw = await env.ADDRESS_CACHE.get(key, 'json')
    const stamps = (Array.isArray(raw) ? raw : [])
      .filter(stamp => Number.isFinite(stamp) && now - stamp < WINDOW_MS)
    stamps.push(now)
    await env.ADDRESS_CACHE.put(key, JSON.stringify(stamps), { expirationTtl: 60 })
    return stamps.length
  } catch {
    return null
  }
}
