import { getRegion } from '../../regions/index.js'
import { getSeedCoordinates } from '../../config/seeds.js'
import { ATTEMPTS_PER_RETRY } from './constants.js'

export function getRandomLocation ({
  regionId,
  subregionId,
  scope = 'subregion',
  stage = 'strict',
  attempt = 0,
  retry = 0,
  randomFn = Math.random
}) {
  const region = getRegion(regionId)
  const seeds = getSeedCoordinates(regionId, subregionId, scope)
  if (!seeds.length) {
    return null
  }

  const seedIndex = region?.shouldCycleSeeds()
    ? (retry * ATTEMPTS_PER_RETRY + attempt) % seeds.length
    : Math.floor(randomFn() * seeds.length)
  const seed = seeds[seedIndex]

  if (region?.preferExactSeed({ scope, stage, attempt, seedCount: seeds.length })) {
    return {
      lat: seed.lat,
      lng: seed.lng
    }
  }

  const jitter = region?.getJitter(scope, stage) ?? 0.01

  return {
    lat: seed.lat + (randomFn() - 0.5) * jitter,
    lng: seed.lng + (randomFn() - 0.5) * jitter
  }
}

export function getSeedScopes (regionId, stage, retry) {
  const region = getRegion(regionId)
  return region?.getSeedScopes(stage, retry) || ['subregion']
}
