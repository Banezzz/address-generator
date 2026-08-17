import { formatStreet, pickFirst, stripDiacritics } from '../services/formatters.js'

export function normalizeText (value) {
  return stripDiacritics(String(value ?? ''))
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function collectParts (address = {}, data = {}) {
  return [
    data.display_name,
    data.name,
    data.namedetails?.name,
    address.country,
    address.state,
    address.region,
    address.province,
    address.city,
    address.town,
    address.county,
    address.city_district,
    address.state_district,
    address.suburb,
    address.borough,
    address.neighbourhood,
    address.quarter,
    address.village,
    address.road,
    address.amenity,
    address.building,
    address['ISO3166-2-lvl4'],
    address['ISO3166-2-lvl3']
  ]
}

export function matchesKeywords (keywords, address, data) {
  if (!keywords?.length) {
    return true
  }

  const haystack = collectParts(address, data)
    .map(normalizeText)
    .filter(Boolean)
    .join(' ')

  return keywords.some(keyword => haystack.includes(normalizeText(keyword)))
}

export function amenityName (address) {
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

export function resolveDefaultStreet (address, stage, {
  allowAmenityInStrict = false,
  allowAmenityInRelaxed = true
} = {}) {
  const strictStreet = formatStreet(address)
  if (strictStreet) {
    return strictStreet
  }

  if (allowAmenityInStrict) {
    return amenityName(address)
  }

  if (stage !== 'relaxed' || !allowAmenityInRelaxed) {
    return ''
  }

  return amenityName(address)
}

export function matchCountryCode (address, countryCode, extraCodes = []) {
  const code = (address.country_code || '').toLowerCase()
  return code === countryCode || extraCodes.includes(code)
}

export function randomDigits (length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}

export function pick (values) {
  return values[Math.floor(Math.random() * values.length)]
}

export function toPublicConfig (region) {
  return {
    id: region.id,
    label: region.label,
    nativeLabel: region.nativeLabel,
    countryCode: region.countryCode,
    languageHeader: region.languageHeader,
    subregionLabel: region.subregionLabel,
    subregionLabelNative: region.subregionLabelNative,
    adminLabel: region.adminLabel,
    adminLabelNative: region.adminLabelNative,
    postalLabel: region.postalLabel,
    postalLabelNative: region.postalLabelNative
  }
}
