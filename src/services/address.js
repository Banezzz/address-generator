import { getSeedCoordinates } from "../config/seeds.js"
import { getRegionConfig, getSubregionOptions, US_STATE_MAP } from "../config/regions.js"
import { rateLimitedFetch } from "./rateLimiter.js"
import {
  formatCoordinates,
  formatStreet,
  getDistrict,
  getLocality,
  getShortLabel,
  maybePostal,
  pickFirst,
  joinNonEmpty
} from "./formatters.js"

const MAX_RETRIES = 3
const ATTEMPTS_PER_RETRY = 20
const VALIDATION_STAGES = ["strict", "relaxed"]
const ADDRESS_GENERATION_TIMEOUT_MS = 15000
const REVERSE_GEOCODE_HTTP_RETRIES = 3
const REVERSE_GEOCODE_RETRY_DELAY_MS = 1200
const REVERSE_GEOCODE_REQUEST_TIMEOUT_MS = 5000
const REGION_ADDRESS_TIMEOUT_MS = {
  US_TAX_FREE: 22000,
  HK: 32000
}

const REGION_JITTER = {
  US: 0.085,
  US_TAX_FREE: 0.085,
  HK: 0.006,
  SG: 0.006,
  JP: 0.01,
  TW: 0.008,
  TH: 0.012,
  VN: 0.012
}

const HK_ZONE_KEYWORDS = {
  HKI: [
    "central",
    "central and western",
    "admiralty",
    "sheung wan",
    "wan chai",
    "wan chai district",
    "causeway bay",
    "north point",
    "quarry bay",
    "eastern district",
    "chai wan",
    "aberdeen",
    "southern district",
    "kennedy town",
    "happy valley",
    "mid-levels",
    "pok fu lam",
    "stanley",
    "sai ying pun",
    "shau kei wan",
    "tin hau"
  ],
  KLN: [
    "kowloon",
    "yau tsim mong",
    "yau tsim mong district",
    "tsim sha tsui",
    "jordan",
    "yau ma tei",
    "mong kok",
    "sham shui po",
    "sham shui po district",
    "kowloon city",
    "kowloon city district",
    "hung hom",
    "kwun tong",
    "kwun tong district",
    "wong tai sin",
    "wong tai sin district",
    "san po kong",
    "diamond hill",
    "to kwa wan",
    "kai tak",
    "cheung sha wan",
    "lai chi kok",
    "ngau tau kok",
    "kowloon bay"
  ],
  NT: [
    "new territories",
    "sha tin",
    "sha tin district",
    "tsuen wan",
    "tsuen wan district",
    "tuen mun",
    "tuen mun district",
    "yuen long",
    "yuen long district",
    "tai po",
    "tai po district",
    "sai kung",
    "sai kung district",
    "tseung kwan o",
    "fanling",
    "sheung shui",
    "ma on shan",
    "tin shui wai",
    "kwai chung",
    "kwai tsing",
    "kwai tsing district",
    "tung chung",
    "lantau",
    "islands district"
  ]
}

function resolveStreet(regionId, address, stage) {
  const strictStreet = formatStreet(address)
  if (strictStreet) {
    return strictStreet
  }

  if (regionId === "HK") {
    return pickFirst(address.building, address.amenity, address.shop, address.office, address.tourism, address.leisure, address.attraction)
  }

  if (stage !== "relaxed") {
    return ""
  }

  if (regionId === "US" || regionId === "US_TAX_FREE") {
    return ""
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

export async function generateAddress({ fetchFn, regionId, subregionId }) {
  const regionConfig = getRegionConfig(regionId)
  const startedAt = Date.now()
  const timeoutMs = REGION_ADDRESS_TIMEOUT_MS[regionId] || ADDRESS_GENERATION_TIMEOUT_MS

  for (const stage of VALIDATION_STAGES) {
    for (let retry = 0; retry < MAX_RETRIES; retry += 1) {
      const scopes = getSeedScopes(regionId, stage, retry)

      for (let attempt = 0; attempt < ATTEMPTS_PER_RETRY; attempt += 1) {
        if (Date.now() - startedAt > timeoutMs) {
          throw new Error(`Timed out while searching for a valid address for ${regionConfig.label}`)
        }

        for (const scope of scopes) {
          const location = getRandomLocation(regionId, subregionId, scope, stage, attempt, retry)
          if (!location) {
            continue
          }

          try {
            const data = await reverseGeocode(fetchFn, regionConfig, location)
            const normalized = normalizeGeocodeResult({
              regionId,
              regionConfig,
              subregionId,
              data,
              location,
              stage,
              scope
            })

            if (normalized) {
              return normalized
            }
          } catch (error) {
            if (
              stage === VALIDATION_STAGES[VALIDATION_STAGES.length - 1] &&
              retry === MAX_RETRIES - 1 &&
              attempt === ATTEMPTS_PER_RETRY - 1 &&
              scope === scopes[scopes.length - 1]
            ) {
              throw error
            }
          }
        }
      }
    }
  }

  throw new Error(`Unable to find a valid address for ${regionConfig.label}`)
}

async function reverseGeocode(fetchFn, regionConfig, location) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse")
  url.searchParams.set("format", "jsonv2")
  url.searchParams.set("lat", String(location.lat))
  url.searchParams.set("lon", String(location.lng))
  url.searchParams.set("zoom", "18")
  url.searchParams.set("addressdetails", "1")
  url.searchParams.set("namedetails", "1")
  const requestTimeoutMs = regionConfig.countryCode === "hk" ? 8000 : REVERSE_GEOCODE_REQUEST_TIMEOUT_MS

  for (let attempt = 0; attempt < REVERSE_GEOCODE_HTTP_RETRIES; attempt += 1) {
    const response = await rateLimitedFetch(
      fetchFn,
      url.toString(),
      {
        headers: {
          "User-Agent": "Cascade Multi Region Address Generator",
          "Accept-Language": regionConfig.languageHeader
        },
        cf: {
          cacheEverything: true,
          cacheTtl: 300
        }
      },
      requestTimeoutMs
    )

    if (response.ok) {
      return response.json()
    }

    if (response.status === 429 && attempt < REVERSE_GEOCODE_HTTP_RETRIES - 1) {
      const retryAfterHeader = Number(response.headers.get("Retry-After") || "0")
      const retryAfterMs = retryAfterHeader > 0 ? retryAfterHeader * 1000 : REVERSE_GEOCODE_RETRY_DELAY_MS * (attempt + 1)
      await wait(retryAfterMs)
      continue
    }

    throw new Error(`Reverse geocoding failed with ${response.status}`)
  }

  throw new Error("Reverse geocoding failed after retries")
}

function normalizeGeocodeResult({ regionId, regionConfig, subregionId, data, location, stage, scope }) {
  const address = data?.address
  if (!address) {
    return null
  }

  if ((address.country_code || "").toLowerCase() !== regionConfig.countryCode) {
    return null
  }

  if (!matchesSelectedSubregion({ regionId, subregionId, address, data, scope })) {
    return null
  }

  if (!isValidAddress(regionId, address, stage)) {
    return null
  }

  const street = resolveStreet(regionId, address, stage) || (regionId === "HK" ? pickFirst(data?.name, data?.namedetails?.name) : "")
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

  const mapQuery = fullAddress
  const resolvedLat = Number(data.lat || location.lat)
  const resolvedLng = Number(data.lon || location.lng)
  const coordinates = formatCoordinates(resolvedLat, resolvedLng)

  return {
    regionId,
    subregionId,
    street: street || "N/A",
    city: locality || district || subregionLabel || "N/A",
    district: district || "N/A",
    admin: admin || subregionLabel || "N/A",
    postalCode,
    country,
    fullAddress,
    rawDisplayName: data.display_name || fullAddress,
    coordinates,
    lat: resolvedLat,
    lng: resolvedLng,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`,
    mapExternalUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    sourceLabel: "OpenStreetMap reverse geocoding"
  }
}

function getRandomLocation(regionId, subregionId, scope = "subregion", stage = "strict", attempt = 0, retry = 0) {
  const seeds = getSeedCoordinates(regionId, subregionId, scope)
  if (!seeds.length) {
    return null
  }

  const seedIndex = shouldCycleSeeds(regionId)
    ? (retry * ATTEMPTS_PER_RETRY + attempt) % seeds.length
    : Math.floor(Math.random() * seeds.length)
  const seed = seeds[seedIndex]

  if (regionId === "HK" && scope === "subregion" && stage === "strict" && attempt < seeds.length) {
    return {
      lat: seed.lat,
      lng: seed.lng
    }
  }

  const jitter = getJitter(regionId, scope, stage)

  return {
    lat: seed.lat + (Math.random() - 0.5) * jitter,
    lng: seed.lng + (Math.random() - 0.5) * jitter
  }
}

function shouldCycleSeeds(regionId) {
  return regionId === "US_TAX_FREE" || regionId === "HK"
}

function getSeedScopes(regionId, stage, retry) {
  if (regionId === "US_TAX_FREE") {
    return ["subregion"]
  }

  if (regionId === "HK" && stage === "relaxed" && retry === MAX_RETRIES - 1) {
    return ["subregion", "region"]
  }

  return ["subregion"]
}

function getJitter(regionId, scope, stage) {
  if (regionId === "US_TAX_FREE") {
    if (scope === "region") return 0.035
    return stage === "strict" ? 0.055 : 0.075
  }

  if (regionId === "HK") {
    if (scope === "region") return 0.0018
    return stage === "strict" ? 0.0012 : 0.0024
  }

  return REGION_JITTER[regionId] ?? 0.01
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithTimeout(fetchFn, url, init, timeoutMs) {
  return rateLimitedFetch(fetchFn, url, init)
}

function isValidAddress(regionId, address, stage) {
  const street = resolveStreet(regionId, address, stage)
  const locality = resolveLocality(regionId, address)
  const district = resolveDistrict(regionId, address)
  const admin = resolveAdmin(regionId, address)
  const postal = resolvePostalCode(regionId, address)
  const relaxed = stage === "relaxed"

  if (regionId === "US") {
    return Boolean(street && locality && admin && postal !== "N/A")
  }

  if (regionId === "US_TAX_FREE") {
    const hasNumberedStreet = Boolean(address.house_number && pickFirst(address.road, address.street, address.residential, address.pedestrian, address.footway))
    return relaxed
      ? Boolean((street || hasNumberedStreet) && (locality || district) && admin)
      : Boolean(hasNumberedStreet && locality && admin)
  }

  if (regionId === "HK") {
    return relaxed
      ? Boolean(street && (district || locality || admin))
      : Boolean((street || pickFirst(address.building, address.amenity, address.shop)) && (district || locality || admin))
  }

  if (regionId === "SG") {
    return relaxed ? Boolean(street && (locality || district) && postal !== "N/A") : Boolean(street && locality && postal !== "N/A")
  }

  if (regionId === "JP") {
    return relaxed ? Boolean(admin && (locality || district) && street) : Boolean(admin && locality && (street || district) && postal !== "N/A")
  }

  if (regionId === "TW") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street)
  }

  if (regionId === "TH") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street && postal !== "N/A")
  }

  if (regionId === "VN") {
    return relaxed ? Boolean(admin && (district || locality) && street) : Boolean(admin && district && street)
  }

  return false
}

function resolveLocality(regionId, address) {
  if (regionId === "HK") {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.town, address.city)
  }

  if (regionId === "JP") {
    return pickFirst(address.city, address.town, address.village, address.county, address.city_district)
  }

  return getLocality(address)
}

function resolveDistrict(regionId, address) {
  if (regionId === "HK") {
    return pickFirst(address.city_district, address.suburb, address.borough, address.neighbourhood, address.state_district)
  }

  if (regionId === "SG") {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.quarter)
  }

  if (regionId === "JP") {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.neighbourhood)
  }

  if (regionId === "TW") {
    return pickFirst(address.city_district, address.town, address.suburb, address.district)
  }

  if (regionId === "TH") {
    return pickFirst(address.county, address.city_district, address.suburb, address.borough)
  }

  if (regionId === "VN") {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.county)
  }

  return getDistrict(address)
}

function resolveAdmin(regionId, address, subregionId = "") {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    return US_STATE_MAP.get(subregionId)?.full || pickFirst(address.state, address.region)
  }

  if (regionId === "HK") {
    return getShortLabel(getSubregionLabel(regionId, subregionId)) || "Hong Kong"
  }

  if (regionId === "SG") {
    return pickFirst(address.city, address.state_district, getShortLabel(getSubregionLabel(regionId, subregionId)), "Singapore")
  }

  if (regionId === "JP") {
    return pickFirst(address.state, address.province, address.region)
  }

  if (regionId === "TW") {
    return pickFirst(address.state, address.city, address.county)
  }

  if (regionId === "TH") {
    return pickFirst(address.state, address.province, address.region)
  }

  if (regionId === "VN") {
    return pickFirst(address.state, address.city, address.province)
  }

  return pickFirst(address.state, address.region)
}

function resolvePostalCode(regionId, address) {
  if (regionId === "HK") {
    return "N/A"
  }

  return maybePostal(address.postcode)
}

function resolveCountry(regionConfig, address) {
  return pickFirst(address.country, regionConfig.label)
}

function getSubregionLabel(regionId, subregionId) {
  const option = getSubregionOptions(regionId).find(item => item.id === subregionId)
  return option?.label || subregionId || ""
}

function matchesSelectedSubregion({ regionId, subregionId, address, data, scope }) {
  if (!subregionId) {
    return true
  }

  if (regionId === "US_TAX_FREE") {
    const expectedState = (US_STATE_MAP.get(subregionId)?.full || "").toLowerCase()
    const actualText = [address.state, address.region, data?.display_name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return Boolean(expectedState && actualText.includes(expectedState))
  }

  if (regionId === "HK") {
    if (scope !== "region") {
      return true
    }

    const haystack = [
      data?.display_name,
      address.city_district,
      address.suburb,
      address.borough,
      address.neighbourhood,
      address.town,
      address.village,
      address.county,
      address.state_district,
      address.state,
      address.quarter,
      address.road,
      address.amenity,
      address.building
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return (HK_ZONE_KEYWORDS[subregionId] || []).some(keyword => haystack.includes(keyword))
  }

  return true
}

function formatAddressByRegion(regionId, { street, locality, district, admin, postalCode, country, subregionLabel, subregionId }) {
  if (regionId === "US" || regionId === "US_TAX_FREE") {
    const stateCode = US_STATE_MAP.get(subregionId)?.abbr || US_STATE_MAP.get(admin)?.abbr || ""
    const stateLine = postalCode !== "N/A" ? `${stateCode || admin} ${postalCode}` : `${stateCode || admin}`
    return joinNonEmpty([
      street,
      joinNonEmpty([locality || district, stateLine], ", "),
      country
    ])
  }

  if (regionId === "HK") {
    return joinNonEmpty([street, district || locality, admin || subregionLabel, country])
  }

  if (regionId === "SG") {
    return joinNonEmpty([street, district || locality, `${country} ${postalCode !== "N/A" ? postalCode : ""}`.trim()])
  }

  if (regionId === "JP") {
    return joinNonEmpty([postalCode !== "N/A" ? `〒${postalCode}` : "", admin, locality, district, street, country], " ")
  }

  if (regionId === "TW") {
    return joinNonEmpty([postalCode !== "N/A" ? postalCode : "", admin, district, street, country], " ")
  }

  if (regionId === "TH") {
    return joinNonEmpty([street, district, admin, postalCode !== "N/A" ? postalCode : "", country], " ")
  }

  if (regionId === "VN") {
    return joinNonEmpty([street, district, locality, admin, postalCode !== "N/A" ? postalCode : "", country], ", ")
  }

  return joinNonEmpty([street, locality, admin, postalCode !== "N/A" ? postalCode : "", country])
}
