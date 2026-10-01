import { getRegionConfig, resolveSubregion } from '../config/regions.js'
import { hasRegion } from '../regions/index.js'
import { generateAddress } from './address.js'
import { buildEmailEntry } from './email.js'
import { GenerateError } from './address/errors.js'
import { buildProfile } from './profile.js'

export async function buildGeneratedResult ({
  regionId,
  subregionId,
  fetchFn,
  requestId,
  env,
  forceRefresh = false,
  logger = console
}) {
  if (regionId && !hasRegion(regionId)) {
    throw new GenerateError('unknown_region', `Unknown region: ${regionId}`, { status: 400 })
  }

  const resolvedRegionId = regionId || 'US'
  const regionConfig = getRegionConfig(resolvedRegionId)
  const resolvedSubregionId = resolveSubregion(regionConfig.id, subregionId)
  const address = await generateAddress({
    fetchFn,
    regionId: regionConfig.id,
    subregionId: resolvedSubregionId,
    requestId,
    env,
    forceRefresh,
    logger
  })
  const profile = buildProfile({
    regionId: regionConfig.id,
    subregionId: resolvedSubregionId
  })
  const emailEntry = buildEmailEntry(profile, regionConfig)

  return {
    regionConfig,
    regionId: regionConfig.id,
    subregionId: resolvedSubregionId,
    address,
    profile,
    emailEntry,
    fromCache: Boolean(address.fromCache)
  }
}
