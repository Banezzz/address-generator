import { getRegion } from '../../regions/index.js'

export function matchesSelectedSubregion ({ regionId, subregionId, address, data }) {
  if (!subregionId) {
    return true
  }

  const region = getRegion(regionId)
  if (!region) {
    return false
  }

  return region.matchesSubregion(subregionId, address, data)
}
