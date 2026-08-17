import { getRegion } from '../regions/index.js'
import { US_STATE_COORDINATES } from '../regions/usData.js'

export { US_STATE_COORDINATES }

export const REGION_SEEDS = Object.fromEntries(
  ['HK', 'SG', 'JP', 'TW', 'TH', 'VN', 'KR', 'IN']
    .map(id => [id, getRegion(id)?.seeds])
    .filter(([, seeds]) => seeds)
)

export function getSeedCoordinates (regionId, subregionId, scope = 'subregion') {
  return getRegion(regionId)?.getSeedCoordinates(subregionId, scope) || []
}
