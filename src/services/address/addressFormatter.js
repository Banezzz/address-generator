import { getRegion } from '../../regions/index.js'
import { getSubregionOptions } from '../../config/regions.js'
import { joinNonEmpty } from '../formatters.js'

export function formatAddressByRegion (regionId, fields) {
  const region = getRegion(regionId)
  if (region?.format) {
    return region.format(fields)
  }

  return joinNonEmpty([
    fields.street,
    fields.locality,
    fields.admin,
    fields.postalCode !== 'N/A' ? fields.postalCode : '',
    fields.country
  ])
}

export function getSubregionLabel (regionId, subregionId) {
  const option = getSubregionOptions(regionId).find(item => item.id === subregionId)
  return option?.label || subregionId || ''
}
