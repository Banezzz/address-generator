const CACHE_VERSION = 1
const CACHE_TTL_SECONDS = 7 * 24 * 60 * 60
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000
const MAX_HITS = 20
const memoryCache = new Map()

export async function readCachedHits (env, regionId, subregionId) {
  const key = cacheKey(regionId, subregionId)
  const fromKv = await readKvJson(env, key)
  const raw = Array.isArray(fromKv) ? fromKv : (memoryCache.get(key) || [])
  const valid = raw.filter(hit => isValidCachedHit(hit, regionId, subregionId))
  memoryCache.set(key, valid)
  return valid
}

export async function writeCachedHit (env, regionId, subregionId, address) {
  const key = cacheKey(regionId, subregionId)
  const hits = await readCachedHits(env, regionId, subregionId)
  const entry = {
    version: CACHE_VERSION,
    lat: address.lat,
    lng: address.lng,
    address,
    storedAt: Date.now()
  }

  if (!isValidCachedHit(entry, regionId, subregionId)) {
    return hits
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

export function shouldServeCachedResult (hits, forceRefresh) {
  return !forceRefresh && hits.length > 0
}

export function isValidCachedHit (hit, regionId, subregionId) {
  if (!hit || typeof hit !== 'object') {
    return false
  }

  if (hit.version && hit.version !== CACHE_VERSION) {
    return false
  }

  if (!Number.isFinite(hit.lat) || !Number.isFinite(hit.lng)) {
    return false
  }

  const address = hit.address
  if (!address || typeof address.fullAddress !== 'string' || !address.fullAddress.trim()) {
    return false
  }

  if (address.regionId && address.regionId !== regionId) {
    return false
  }

  if (subregionId && address.subregionId && address.subregionId !== subregionId) {
    return false
  }

  if (hit.storedAt && Date.now() - hit.storedAt > CACHE_TTL_MS) {
    return false
  }

  return true
}

export function resetAddressCacheForTests () {
  memoryCache.clear()
}

function cacheKey (regionId, subregionId) {
  return `hits:v${CACHE_VERSION}:${regionId}:${subregionId || 'any'}`
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
