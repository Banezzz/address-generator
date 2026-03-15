import { US_STATE_MAP } from '../../config/regions.js'
import {
  formatCoordinates,
  formatStreet,
  getDistrict,
  getLocality,
  getShortLabel,
  maybePostal,
  pickFirst
} from '../formatters.js'
import { formatAddressByRegion, getSubregionLabel } from './addressFormatter.js'
import { matchesSelectedSubregion } from './regionMatchers.js'

export function normalizeGeocodeResult ({
  regionId,
  regionConfig,
  subregionId,
  data,
  location,
  stage
}) {
  const address = data?.address
  if (!address) {
    return null
  }

  if ((address.country_code || '').toLowerCase() !== regionConfig.countryCode) {
    return null
  }

  if (!matchesSelectedSubregion({ regionId, subregionId, address, data })) {
    return null
  }

  if (!isValidAddress(regionId, address, stage)) {
    return null
  }

  const street = resolveStreet(regionId, address, stage) || (regionId === 'HK' ? pickFirst(data?.name, data?.namedetails?.name) : '')
  const locality = resolveLocality(regionId, address)
  const district = resolveDistrict(regionId, address)
  const admin = resolveAdmin(regionId, address, subregionId)
  const postalCode = resolvePostalCode(regionId, address)
  const country = resolveCountry(regionConfig, address)
  const subregionLabel = getSubregionLabel(regionId, subregionId)
  const fullAddress = formatAddressByRegion(regionId, {
    street,
    locality,
    district,
    admin,
    postalCode,
    country,
    subregionLabel,
    subregionId
  })

  if (!fullAddress) {
    return null
  }

  const resolvedLat = Number(data.lat || location.lat)
  const resolvedLng = Number(data.lon || location.lng)
  const coordinates = formatCoordinates(resolvedLat, resolvedLng)

  return {
    regionId,
    subregionId,
    street: street || 'N/A',
    city: locality || district || subregionLabel || 'N/A',
    district: district || 'N/A',
    admin: admin || subregionLabel || 'N/A',
    postalCode,
    country,
    fullAddress,
    rawDisplayName: data.display_name || fullAddress,
    coordinates,
    lat: resolvedLat,
    lng: resolvedLng,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`,
    mapExternalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    sourceLabel: 'OpenStreetMap reverse geocoding'
  }
}

function resolveStreet (regionId, address, stage) {
  const strictStreet = formatStreet(address)
  if (strictStreet) {
    return strictStreet
  }

  if (regionId === 'HK') {
    return pickFirst(address.building, address.amenity, address.shop, address.office, address.tourism, address.leisure, address.attraction)
  }

  if (stage !== 'relaxed') {
    return ''
  }

  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    return ''
  }

  return pickFirst(
    address.building,
    address.amenity,
    address.shop,
    address.office,
    address.tourism,
    address.leisure,
    address.attraction
  )
}

function isValidAddress (regionId, address, stage) {
  const street = resolveStreet(regionId, address, stage)
  const locality = resolveLocality(regionId, address)
  const district = resolveDistrict(regionId, address)
  const admin = resolveAdmin(regionId, address)
  const postal = resolvePostalCode(regionId, address)
  const relaxed = stage === 'relaxed'

  if (regionId === 'US') {
    return Boolean(street && locality && admin && postal !== 'N/A')
  }

  if (regionId === 'US_TAX_FREE') {
    const hasNumberedStreet = Boolean(address.house_number && pickFirst(address.road, address.street, address.residential, address.pedestrian, address.footway))
    return relaxed
      ? Boolean((street || hasNumberedStreet) && (locality || district) && admin)
      : Boolean(hasNumberedStreet && locality && admin)
  }

  if (regionId === 'HK') {
    return relaxed
      ? Boolean(street && (district || locality || admin))
      : Boolean((street || pickFirst(address.building, address.amenity, address.shop)) && (district || locality || admin))
  }

  if (regionId === 'SG') {
    return relaxed ? Boolean(street && (locality || district) && postal !== 'N/A') : Boolean(street && locality && postal !== 'N/A')
  }

  if (regionId === 'JP') {
    return relaxed ? Boolean(admin && (locality || district) && street) : Boolean(admin && locality && (street || district) && postal !== 'N/A')
  }

  if (regionId === 'TW') {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street)
  }

  if (regionId === 'TH') {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street && postal !== 'N/A')
  }

  if (regionId === 'VN') {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street)
  }

  return false
}

function resolveLocality (regionId, address) {
  if (regionId === 'HK') {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.town, address.city)
  }

  if (regionId === 'JP') {
    return pickFirst(address.city, address.town, address.village, address.county, address.city_district)
  }

  return getLocality(address)
}

function resolveDistrict (regionId, address) {
  if (regionId === 'HK') {
    return pickFirst(address.city_district, address.suburb, address.borough, address.neighbourhood, address.state_district)
  }

  if (regionId === 'SG') {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.quarter)
  }

  if (regionId === 'JP') {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.neighbourhood)
  }

  if (regionId === 'TW') {
    return pickFirst(address.city_district, address.town, address.suburb, address.district)
  }

  if (regionId === 'TH') {
    return pickFirst(address.county, address.city_district, address.suburb, address.borough)
  }

  if (regionId === 'VN') {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.county)
  }

  return getDistrict(address)
}

function resolveAdmin (regionId, address, subregionId = '') {
  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    return US_STATE_MAP.get(subregionId)?.full || pickFirst(address.state, address.region)
  }

  if (regionId === 'HK') {
    return getShortLabel(getSubregionLabel(regionId, subregionId)) || 'Hong Kong'
  }

  if (regionId === 'SG') {
    return pickFirst(address.city, address.state_district, getShortLabel(getSubregionLabel(regionId, subregionId)), 'Singapore')
  }

  if (regionId === 'JP') {
    return pickFirst(address.state, address.province, address.region)
  }

  if (regionId === 'TW') {
    return pickFirst(address.state, address.city, address.county)
  }

  if (regionId === 'TH') {
    return pickFirst(address.state, address.province, address.region)
  }

  if (regionId === 'VN') {
    return pickFirst(address.state, address.city, address.province)
  }

  return pickFirst(address.state, address.region)
}

function resolvePostalCode (regionId, address) {
  if (regionId === 'HK') {
    return 'N/A'
  }

  return maybePostal(address.postcode)
}

function resolveCountry (regionConfig, address) {
  return pickFirst(address.country, regionConfig.label)
}
