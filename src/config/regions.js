import {
  getRegion,
  hasRegion,
  HK_ZONES,
  IN_AREAS,
  JP_AREAS,
  KR_AREAS,
  listRegions,
  SG_AREAS,
  TAX_FREE_STATE_CODES,
  TH_AREAS,
  toPublicConfig,
  TW_AREAS,
  US_STATE_MAP,
  US_STATES,
  VN_AREAS
} from '../regions/index.js'

export {
  HK_ZONES,
  IN_AREAS,
  JP_AREAS,
  KR_AREAS,
  SG_AREAS,
  TAX_FREE_STATE_CODES,
  TH_AREAS,
  TW_AREAS,
  US_STATE_MAP,
  US_STATES,
  VN_AREAS
}

export const REGION_CONFIGS = listRegions().map(toPublicConfig)
export const REGION_MAP = new Map(REGION_CONFIGS.map(region => [region.id, region]))

export function getRegionConfig (regionId = 'US') {
  if (regionId == null || regionId === '') {
    return REGION_MAP.get('US')
  }

  return REGION_MAP.get(regionId) || null
}

export function getRegionOptions () {
  return REGION_CONFIGS
}

export function getSubregionOptions (regionId) {
  return getRegion(regionId)?.subregions || []
}

export function resolveSubregion (regionId, subregionId) {
  const options = getSubregionOptions(regionId)
  if (options.length === 0) return null
  if (subregionId && options.some(option => option.id === subregionId)) {
    return subregionId
  }
  return options[Math.floor(Math.random() * options.length)].id
}

export { getRegion, hasRegion }
