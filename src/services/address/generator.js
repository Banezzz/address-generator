import { getRegionConfig } from '../../config/regions.js'
import { reverseGeocode } from '../geocodeClient.js'
import { createHttpClient } from '../httpClient.js'
import {
  ADDRESS_GENERATION_TIMEOUT_MS,
  ATTEMPTS_PER_RETRY,
  MAX_RETRIES,
  REGION_ADDRESS_TIMEOUT_MS,
  VALIDATION_STAGES
} from './constants.js'
import { normalizeGeocodeResult } from './addressNormalizer.js'
import {
  pickCachedHit,
  readCachedHits,
  shouldServeCachedResult,
  writeCachedHit
} from './addressCache.js'
import { GenerateError, classifyGenerateFailure } from './errors.js'
import { getRandomLocation, getSeedScopes } from './seedSelector.js'

export async function generateAddress ({
  fetchFn,
  regionId,
  subregionId,
  requestId,
  env = {},
  forceRefresh = false,
  randomFn = Math.random,
  logger = console
}) {
  const regionConfig = getRegionConfig(regionId)
  if (!regionConfig) {
    throw new GenerateError('unknown_region', `Unknown region: ${regionId}`, { status: 400 })
  }

  const timeoutMs = REGION_ADDRESS_TIMEOUT_MS[regionId] || ADDRESS_GENERATION_TIMEOUT_MS
  const startedAt = Date.now()
  const httpClient = createHttpClient({ fetchFn, logger })
  const cachedHits = await readCachedHits(env, regionId, subregionId)

  if (shouldServeCachedResult(cachedHits, forceRefresh, randomFn)) {
    const hit = pickCachedHit(cachedHits, randomFn)
    if (hit?.address) {
      return {
        ...hit.address,
        fromCache: true
      }
    }
  }

  try {
    const generated = await searchAddress({
      regionId,
      regionConfig,
      subregionId,
      requestId,
      randomFn,
      logger,
      httpClient,
      timeoutMs,
      startedAt,
      cachedHits
    })

    await writeCachedHit(env, regionId, subregionId, generated)
    return {
      ...generated,
      fromCache: false
    }
  } catch (error) {
    throw classifyGenerateFailure(error, regionConfig.label)
  }
}

async function searchAddress ({
  regionId,
  regionConfig,
  subregionId,
  requestId,
  randomFn,
  logger,
  httpClient,
  timeoutMs,
  startedAt,
  cachedHits
}) {
  const cachedLocations = cachedHits
    .filter(hit => Number.isFinite(hit.lat) && Number.isFinite(hit.lng))
    .map(hit => ({ lat: hit.lat, lng: hit.lng, fromCache: true }))

  for (const stage of VALIDATION_STAGES) {
    for (let retry = 0; retry < MAX_RETRIES; retry += 1) {
      const scopes = getSeedScopes(regionId, stage, retry)

      for (let attempt = 0; attempt < ATTEMPTS_PER_RETRY; attempt += 1) {
        if (Date.now() - startedAt > timeoutMs) {
          throw new GenerateError(
            'timeout',
            `Timed out while searching for a valid address for ${regionConfig.label}`,
            { status: 504 }
          )
        }

        const locations = []
        if (attempt === 0 && cachedLocations.length) {
          locations.push(cachedLocations[attempt % cachedLocations.length])
        }

        for (const scope of scopes) {
          const location = getRandomLocation({
            regionId,
            subregionId,
            scope,
            stage,
            attempt,
            retry,
            randomFn
          })
          if (location) {
            locations.push(location)
          }
        }

        for (const location of locations) {
          if (!location) {
            continue
          }

          try {
            const data = await reverseGeocode({
              regionConfig,
              location,
              subregionId,
              requestId,
              httpClient
            })

            const normalized = normalizeGeocodeResult({
              regionId,
              regionConfig,
              subregionId,
              data,
              location,
              stage
            })

            if (normalized) {
              return normalized
            }
          } catch (error) {
            const isLastAttempt = stage === VALIDATION_STAGES[VALIDATION_STAGES.length - 1] &&
              retry === MAX_RETRIES - 1 &&
              attempt === ATTEMPTS_PER_RETRY - 1

            if (isLastAttempt) {
              logger?.error?.('Address generation exhausted all attempts', {
                requestId,
                regionId,
                subregionId,
                stage,
                retry,
                attempt,
                error
              })
              throw error
            }
          }
        }
      }
    }
  }

  throw new GenerateError(
    'sparse',
    `Unable to find a valid address for ${regionConfig.label}`,
    { status: 422 }
  )
}
