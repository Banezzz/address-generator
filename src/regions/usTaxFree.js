import { pickFirst } from '../services/formatters.js'
import { TAX_FREE_STATE_CODES, US_STATE_COORDINATES, region as usRegion } from './us.js'

export const region = {
  ...usRegion,
  id: 'US_TAX_FREE',
  label: 'United States Tax-Free States',
  nativeLabel: '美国免税州',
  subregionLabel: 'Tax-free state',
  subregionLabelNative: '免税州',
  subregions: usRegion.subregions.filter(option => TAX_FREE_STATE_CODES.includes(option.id)),
  timeoutMs: 22000,

  isValid ({ street, locality, district, admin, address, stage }) {
    const hasNumberedStreet = Boolean(address.house_number && pickFirst(
      address.road,
      address.street,
      address.residential,
      address.pedestrian,
      address.footway
    ))

    return stage === 'relaxed'
      ? Boolean((street || hasNumberedStreet) && (locality || district) && admin)
      : Boolean(hasNumberedStreet && locality && admin)
  },

  getSeedCoordinates (subregionId, scope = 'subregion') {
    if (scope === 'region') {
      return TAX_FREE_STATE_CODES.flatMap(code => US_STATE_COORDINATES[code] || [])
    }

    return US_STATE_COORDINATES[subregionId] ||
      TAX_FREE_STATE_CODES.flatMap(code => US_STATE_COORDINATES[code] || [])
  },

  shouldCycleSeeds () {
    return true
  },

  getJitter (scope, stage) {
    if (scope === 'region') {
      return 0.035
    }

    return stage === 'strict' ? 0.055 : 0.075
  }
}
