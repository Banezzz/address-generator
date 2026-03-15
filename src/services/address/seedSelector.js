import { getSeedCoordinates } from '../../config/seeds.js'
import { ATTEMPTS_PER_RETRY, MAX_RETRIES, REGION_JITTER } from './constants.js'

export function getRandomLocation ({
  regionId,
  subregionId,
  scope = 'subregion',
  stage = 'strict',
  attempt = 0,
  retry = 0,
  randomFn = Math.random
}) {
  const seeds = getSeedCoordinates(regionId, subregionId, scope)
  if (!seeds.length) {
    return null
  }

  const seedIndex = shouldCycleSeeds(regionId)
    ? (retry * ATTEMPTS_PER_RETRY + attempt) % seeds.length
    : Math.floor(randomFn() * seeds.length)
  const seed = seeds[seedIndex]

  if (regionId === 'HK' && scope === 'subregion' && stage === 'strict' && attempt < seeds.length) {
    return {
      lat: seed.lat,
      lng: seed.lng
    }
  }

  const jitter = getJitter(regionId, scope, stage)

  return {
    lat: seed.lat + (randomFn() - 0.5) * jitter,
    lng: seed.lng + (randomFn() - 0.5) * jitter
  }
}

export function getSeedScopes (regionId, stage, retry) {
  if (regionId === 'US_TAX_FREE') {
    return ['subregion']
  }

  if (regionId === 'HK' && stage === 'relaxed' && retry === MAX_RETRIES - 1) {
    return ['subregion', 'region']
  }

  return ['subregion']
}

function shouldCycleSeeds (regionId) {
  return regionId === 'US_TAX_FREE' || regionId === 'HK'
}

function getJitter (regionId, scope, stage) {
  if (regionId === 'US_TAX_FREE') {
    if (scope === 'region') {
      return 0.035
    }

    return stage === 'strict' ? 0.055 : 0.075
  }

  if (regionId === 'HK') {
    if (scope === 'region') {
      return 0.0018
    }

    return stage === 'strict' ? 0.0012 : 0.0024
  }

  return REGION_JITTER[regionId] ?? 0.01
}
