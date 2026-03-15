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
import { getRandomLocation, getSeedScopes } from './seedSelector.js'

export async function generateAddress ({
  fetchFn,
  regionId,
  subregionId,
  requestId,
  randomFn = Math.random,
  logger = console
}) {
  const regionConfig = getRegionConfig(regionId)
  const timeoutMs = REGION_ADDRESS_TIMEOUT_MS[regionId] || ADDRESS_GENERATION_TIMEOUT_MS
  const startedAt = Date.now()
  const httpClient = createHttpClient({ fetchFn, logger })

  for (const stage of VALIDATION_STAGES) {
    for (let retry = 0; retry < MAX_RETRIES; retry += 1) {
      const scopes = getSeedScopes(regionId, stage, retry)

      for (let attempt = 0; attempt < ATTEMPTS_PER_RETRY; attempt += 1) {
        if (Date.now() - startedAt > timeoutMs) {
          throw new Error(`Timed out while searching for a valid address for ${regionConfig.label}`)
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
          if (!location) {
            continue
          }

          try {
            const data = await reverseGeocode({
              fetchFn,
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
              attempt === ATTEMPTS_PER_RETRY - 1 &&
              scope === scopes[scopes.length - 1]

            if (isLastAttempt) {
              logger?.error?.('Address generation exhausted all attempts', {
                requestId,
                regionId,
                subregionId,
                stage,
                retry,
                attempt,
                scope,
                error
              })
              throw error
            }
          }
        }
      }
    }
  }

  throw new Error(`Unable to find a valid address for ${regionConfig.label}`)
}
