import { getRegion } from '../../regions/index.js'
import { formatCoordinates, pickFirst } from '../formatters.js'
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
  const region = getRegion(regionId)
  if (!address || !region) {
    return null
  }

  if (!region.matchCountry(address, regionConfig)) {
    return null
  }

  if (!matchesSelectedSubregion({ regionId, subregionId, address, data })) {
    return null
  }

  if (!isValidAddress(region, address, stage)) {
    return null
  }

  const street = region.resolveStreet(address, stage, data)
  const locality = region.resolveLocality(address)
  const district = region.resolveDistrict(address)
  const admin = region.resolveAdmin(address, subregionId)
  const postalCode = region.resolvePostalCode(address)
  const country = pickFirst(address.country, regionConfig.label)
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

function isValidAddress (region, address, stage) {
  const street = region.resolveStreet(address, stage)
  const locality = region.resolveLocality(address)
  const district = region.resolveDistrict(address)
  const admin = region.resolveAdmin(address)
  const postal = region.resolvePostalCode(address)

  return region.isValid({
    street,
    locality,
    district,
    admin,
    postal,
    address,
    stage
  })
}
