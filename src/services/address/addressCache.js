const CACHE_TTL_SECONDS = 7 * 24 * 60 * 60
const MAX_HITS = 20
const memoryCache = new Map()

export async function readCachedHits (env, regionId, subregionId) {
  const key = cacheKey(regionId, subregionId)
  const fromKv = await readKvJson(env, key)
  if (Array.isArray(fromKv)) {
    return fromKv
  }

  return memoryCache.get(key) || []
}

export async function writeCachedHit (env, regionId, subregionId, address) {
  const key = cacheKey(regionId, subregionId)
  const hits = await readCachedHits(env, regionId, subregionId)
  const entry = {
    lat: address.lat,
    lng: address.lng,
    address,
    storedAt: Date.now()
  }
  const next = [
    entry,
    ...hits.filter(hit => hit.lat !== entry.lat || hit.lng !== entry.lng)
  ].slice(0, MAX_HITS)

  memoryCache.set(key, next)
  await writeKvJson(env, key, next, CACHE_TTL_SECONDS)
  return next
}

export function pickCachedHit (hits, randomFn = Math.random) {
  if (!hits.length) {
    return null
  }

  return hits[Math.floor(randomFn() * hits.length)]
}

export function shouldServeCachedResult (hits, forceRefresh, randomFn = Math.random) {
  if (forceRefresh || hits.length < 3) {
    return false
  }

  return randomFn() < 0.7
}

export function resetAddressCacheForTests () {
  memoryCache.clear()
}

function cacheKey (regionId, subregionId) {
  return `hits:${regionId}:${subregionId || 'any'}`
}

async function readKvJson (env, key) {
  if (!env?.ADDRESS_CACHE?.get) {
    return null
  }

  try {
    return await env.ADDRESS_CACHE.get(key, 'json')
  } catch {
    return null
  }
}

async function writeKvJson (env, key, value, expirationTtl) {
  if (!env?.ADDRESS_CACHE?.put) {
    return
  }

  try {
    await env.ADDRESS_CACHE.put(key, JSON.stringify(value), { expirationTtl })
  } catch {
    // Cache writes are best-effort and must not fail generation.
  }
}
