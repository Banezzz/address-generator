import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { collectParts, matchCountryCode, normalizeText, pick, randomDigits, resolveDefaultStreet } from './helpers.js'
import { TAX_FREE_STATE_CODES, US_AREA_CODES, US_STATE_COORDINATES, US_STATES } from './usData.js'

export { TAX_FREE_STATE_CODES, US_AREA_CODES, US_STATE_COORDINATES, US_STATES }

export const US_STATE_MAP = new Map(US_STATES.map(state => [state.abbr, state]))

const US_NAMES = [
  { given: 'Seth', family: 'Kling', gender: 'Male' },
  { given: 'Avery', family: 'Monroe', gender: 'Female' },
  { given: 'Jordan', family: 'Parker', gender: 'Male' },
  { given: 'Natalie', family: 'Brooks', gender: 'Female' },
  { given: 'Miles', family: 'Bennett', gender: 'Male' },
  { given: 'Claire', family: 'Dawson', gender: 'Female' }
]

export const region = {
  id: 'US',
  label: 'United States',
  nativeLabel: '美国',
  countryCode: 'us',
  languageHeader: 'en-US,en;q=0.9',
  subregionLabel: 'State',
  subregionLabelNative: '州',
  adminLabel: 'State',
  adminLabelNative: '州',
  postalLabel: 'ZIP code',
  postalLabelNative: '邮编',
  subregions: US_STATES.map(state => ({
    id: state.abbr,
    label: `${state.full} (${state.abbr})`
  })),
  seeds: US_STATE_COORDINATES,
  names: US_NAMES,
  jitter: 0.085,
  timeoutMs: 15000,
  nameStyle: 'western',
  nativeJoiner: ' ',

  matchCountry (address) {
    return matchCountryCode(address, this.countryCode)
  },

  matchesSubregion (subregionId, address, data) {
    const state = US_STATE_MAP.get(subregionId)
    if (!state) {
      return false
    }

    const normalizedParts = collectParts(address, data).map(normalizeText).filter(Boolean)
    const stateName = normalizeText(state.full)
    const stateCode = normalizeText(state.abbr)

    return normalizedParts.some(part => {
      return part === stateName ||
        part === stateCode ||
        part.endsWith(`-${stateCode}`) ||
        part.includes(stateName)
    })
  },

  resolveStreet (address, stage) {
    return resolveDefaultStreet(address, stage, { allowAmenityInRelaxed: false })
  },

  resolveLocality (address) {
    return pickFirst(
      address.city,
      address.town,
      address.village,
      address.municipality,
      address.city_district,
      address.suburb,
      address.hamlet
    )
  },

  resolveDistrict (address) {
    return pickFirst(
      address.city_district,
      address.suburb,
      address.borough,
      address.quarter,
      address.neighbourhood,
      address.county,
      address.district
    )
  },

  resolveAdmin (address, subregionId = '') {
    return US_STATE_MAP.get(subregionId)?.full || pickFirst(address.state, address.region)
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, admin, postal }) {
    return Boolean(street && locality && admin && postal !== 'N/A')
  },

  format ({ street, locality, district, admin, postalCode, country, subregionId }) {
    const stateCode = US_STATE_MAP.get(subregionId)?.abbr || US_STATE_MAP.get(admin)?.abbr || ''
    const stateLine = postalCode !== 'N/A' ? `${stateCode || admin} ${postalCode}` : `${stateCode || admin}`
    return joinNonEmpty([
      street,
      joinNonEmpty([locality || district, stateLine], ', '),
      country
    ])
  },

  getSeedCoordinates (subregionId) {
    return US_STATE_COORDINATES[subregionId] || Object.values(US_STATE_COORDINATES).flat()
  },

  getSeedScopes () {
    return ['subregion']
  },

  shouldCycleSeeds () {
    return false
  },

  getJitter () {
    return this.jitter
  },

  preferExactSeed () {
    return false
  },

  buildFullName (person) {
    return `${person.given} ${person.family}`
  },

  buildPhone (subregionId) {
    const prefixes = US_AREA_CODES[subregionId] || ['202']
    const prefix = pick(prefixes)
    const stateName = US_STATE_MAP.get(subregionId)?.full || subregionId
    const exchange = String(Math.floor(200 + Math.random() * 700)).padStart(3, '0')
    const line = randomDigits(4)
    const phone = `+1 (${prefix}) ${exchange}-${line}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${stateName} so phone numbers look authentic in sign-up forms.`
    }
  }
}
