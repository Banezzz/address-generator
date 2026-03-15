import { getSubregionOptions, US_STATE_MAP } from '../../config/regions.js'
import { joinNonEmpty } from '../formatters.js'

export function formatAddressByRegion (regionId, {
  street,
  locality,
  district,
  admin,
  postalCode,
  country,
  subregionLabel,
  subregionId
}) {
  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    const stateCode = US_STATE_MAP.get(subregionId)?.abbr || US_STATE_MAP.get(admin)?.abbr || ''
    const stateLine = postalCode !== 'N/A' ? `${stateCode || admin} ${postalCode}` : `${stateCode || admin}`
    return joinNonEmpty([
      street,
      joinNonEmpty([locality || district, stateLine], ', '),
      country
    ])
  }

  if (regionId === 'HK') {
    return joinNonEmpty([street, district || locality, admin || subregionLabel, country])
  }

  if (regionId === 'SG') {
    return joinNonEmpty([street, district || locality, `${country} ${postalCode !== 'N/A' ? postalCode : ''}`.trim()])
  }

  if (regionId === 'JP') {
    return joinNonEmpty([postalCode !== 'N/A' ? `〒${postalCode}` : '', admin, locality, district, street, country], ' ')
  }

  if (regionId === 'TW') {
    return joinNonEmpty([postalCode !== 'N/A' ? postalCode : '', admin, district, street, country], ' ')
  }

  if (regionId === 'TH') {
    return joinNonEmpty([street, district, admin, postalCode !== 'N/A' ? postalCode : '', country], ' ')
  }

  if (regionId === 'VN') {
    return joinNonEmpty([street, district, locality, admin, postalCode !== 'N/A' ? postalCode : '', country], ', ')
  }

  return joinNonEmpty([street, locality, admin, postalCode !== 'N/A' ? postalCode : '', country])
}

export function getSubregionLabel (regionId, subregionId) {
  const option = getSubregionOptions(regionId).find(item => item.id === subregionId)
  return option?.label || subregionId || ''
}
