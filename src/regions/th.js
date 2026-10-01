import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const TH_AREAS = [
  { id: 'BANGKOK', label: 'Bangkok / กรุงเทพมหานคร' },
  { id: 'CHIANG_MAI', label: 'Chiang Mai / เชียงใหม่' },
  { id: 'PHUKET', label: 'Phuket / ภูเก็ต' },
  { id: 'CHONBURI', label: 'Chonburi / ชลบุรี' }
]

export const region = {
  id: 'TH',
  label: 'Thailand',
  nativeLabel: '泰国',
  countryCode: 'th',
  languageHeader: 'th,en;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'Province',
  adminLabelNative: '府',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: TH_AREAS,
  keywords: {
    BANGKOK: ['bangkok', 'กรุงเทพ', 'krung thep'],
    CHIANG_MAI: ['chiang mai', 'เชียงใหม่'],
    PHUKET: ['phuket', 'ภูเก็ต'],
    CHONBURI: ['chonburi', 'ชลบุรี', 'pattaya', 'si racha']
  },
  seeds: {
    BANGKOK: [
      { lat: 13.7308, lng: 100.5418 },
      { lat: 13.7234, lng: 100.5293 },
      { lat: 13.7466, lng: 100.5347 },
      { lat: 13.7567, lng: 100.5012 },
      { lat: 13.7123, lng: 100.5189 },
      { lat: 13.7389, lng: 100.5623 },
      { lat: 13.7456, lng: 100.5234 },
      { lat: 13.7287, lng: 100.5578 }
    ],
    CHIANG_MAI: [
      { lat: 18.7883, lng: 98.9853 },
      { lat: 18.7953, lng: 98.9986 },
      { lat: 18.7838, lng: 98.9806 },
      { lat: 18.7712, lng: 98.9723 },
      { lat: 18.8012, lng: 98.9923 },
      { lat: 18.7789, lng: 99.0123 }
    ],
    PHUKET: [
      { lat: 7.8804, lng: 98.3923 },
      { lat: 7.8899, lng: 98.3856 },
      { lat: 7.901, lng: 98.3742 },
      { lat: 7.8712, lng: 98.3989 },
      { lat: 7.9123, lng: 98.3623 },
      { lat: 7.8956, lng: 98.4089 }
    ],
    CHONBURI: [
      { lat: 13.3611, lng: 100.9847 },
      { lat: 13.3404, lng: 100.9713 },
      { lat: 13.1642, lng: 100.9317 },
      { lat: 13.3789, lng: 100.9923 },
      { lat: 13.3512, lng: 100.9612 },
      { lat: 12.9123, lng: 100.8789 }
    ]
  },
  names: [
    { nativeFamily: 'ชัยวัฒน์', nativeGiven: 'นรินทร์', latinGiven: 'Narin', latinFamily: 'Chaiwat', gender: 'Male' },
    { nativeFamily: 'ศรีสุข', nativeGiven: 'พิมพ์ชนก', latinGiven: 'Pimchanok', latinFamily: 'Srisuk', gender: 'Female' },
    { nativeFamily: 'บุญมี', nativeGiven: 'ธีรภัทร', latinGiven: 'Teerapat', latinFamily: 'Boonmee', gender: 'Male' },
    { nativeFamily: 'อินทร์แก้ว', nativeGiven: 'กมลชนก', latinGiven: 'Kamonchanok', latinFamily: 'Intakaew', gender: 'Female' }
  ],
  phonePrefixes: {
    BANGKOK: ['2'],
    CHIANG_MAI: ['53'],
    PHUKET: ['76'],
    CHONBURI: ['38']
  },
  jitter: 0.018,
  timeoutMs: 25000,
  nameStyle: 'family-given',
  nativeJoiner: ' ',

  matchCountry (address) {
    return (address.country_code || '').toLowerCase() === this.countryCode
  },

  matchesSubregion (subregionId, address, data) {
    return matchesKeywords(this.keywords[subregionId], address, data)
  },

  resolveStreet (address, stage) {
    return resolveDefaultStreet(address, stage)
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
    return pickFirst(address.county, address.city_district, address.suburb, address.borough)
  },

  resolveAdmin (address) {
    return pickFirst(address.state, address.province, address.region, address.city)
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, district, admin, postal, stage }) {
    return stage === 'relaxed'
      ? Boolean(admin && (district || locality) && street)
      : Boolean(admin && district && street && postal !== 'N/A')
  },

  format ({ street, district, admin, postalCode, country }) {
    return joinNonEmpty([street, district, admin, postalCode !== 'N/A' ? postalCode : '', country], ' ')
  },

  getSeedCoordinates (subregionId, scope = 'subregion') {
    if (scope === 'region') {
      return Object.values(this.seeds).flat()
    }

    return this.seeds[subregionId] || Object.values(this.seeds).flat()
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

  buildFullName (person, native) {
    if (native) {
      return `${person.nativeFamily} ${person.nativeGiven}`.trim()
    }

    return `${person.latinGiven} ${person.latinFamily}`
  },

  buildPhone (subregionId) {
    const prefixes = this.phonePrefixes[subregionId] || Object.values(this.phonePrefixes).flat()
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const areaLabel = this.subregions.find(option => option.id === subregionId)?.label?.split('/')[0]?.trim() || subregionId
    const phone = prefix.length === 1
      ? `+66 ${prefix} ${randomDigits(3)} ${randomDigits(4)}`
      : `+66 ${prefix} ${randomDigits(3)} ${randomDigits(3)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
