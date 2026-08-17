import { getShortLabel, joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const SG_AREAS = [
  { id: 'CENTRAL', label: 'Central Area / 中央區' },
  { id: 'QUEENSTOWN', label: 'Queenstown / 女皇鎮' },
  { id: 'JURONG_EAST', label: 'Jurong East / 裕廊東' },
  { id: 'TAMPINES', label: 'Tampines / 淡濱尼' }
]

export const region = {
  id: 'SG',
  label: 'Singapore',
  nativeLabel: '新加坡',
  countryCode: 'sg',
  languageHeader: 'en-SG,zh-Hans;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'Area',
  adminLabelNative: '区域',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: SG_AREAS,
  keywords: {
    CENTRAL: ['downtown core', 'singapore river', 'orchard', 'museum', 'river valley', 'rochor', 'outram', 'marina centre', 'cbd', 'clarke quay', 'boat quay', 'raffles place', 'central region', 'downtown', '市中心', '市政区'],
    QUEENSTOWN: ['queenstown', 'commonwealth', 'redhill', 'buona vista', 'one-north', 'holland village', 'dawson'],
    JURONG_EAST: ['jurong east', 'yuhua', 'teban gardens', 'international business park', 'toh guan'],
    TAMPINES: ['tampines', 'simei', 'tampines west', 'tampines east']
  },
  seeds: {
    CENTRAL: [
      { lat: 1.2857, lng: 103.8516 },
      { lat: 1.2966, lng: 103.8501 },
      { lat: 1.3048, lng: 103.8318 },
      { lat: 1.2827, lng: 103.8436 },
      { lat: 1.2999, lng: 103.8385 },
      { lat: 1.2914, lng: 103.8589 }
    ],
    QUEENSTOWN: [
      { lat: 1.2942, lng: 103.7869 },
      { lat: 1.3067, lng: 103.7984 },
      { lat: 1.2893, lng: 103.803 },
      { lat: 1.3012, lng: 103.7921 },
      { lat: 1.2956, lng: 103.8114 },
      { lat: 1.2834, lng: 103.7956 }
    ],
    JURONG_EAST: [
      { lat: 1.3331, lng: 103.7422 },
      { lat: 1.3269, lng: 103.7388 },
      { lat: 1.3398, lng: 103.7392 },
      { lat: 1.3412, lng: 103.7314 },
      { lat: 1.3288, lng: 103.7256 }
    ],
    TAMPINES: [
      { lat: 1.3521, lng: 103.9448 },
      { lat: 1.3483, lng: 103.9385 },
      { lat: 1.3576, lng: 103.9455 },
      { lat: 1.3612, lng: 103.9512 },
      { lat: 1.3445, lng: 103.9328 },
      { lat: 1.3534, lng: 103.9589 }
    ]
  },
  names: [
    { nativeFamily: '陈', nativeGiven: '芷晴', latinGiven: 'Ashley', latinFamily: 'Tan', gender: 'Female' },
    { nativeFamily: '林', nativeGiven: '伟杰', latinGiven: 'Ethan', latinFamily: 'Lim', gender: 'Male' },
    { nativeFamily: '王', nativeGiven: '欣怡', latinGiven: 'Chloe', latinFamily: 'Ong', gender: 'Female' },
    { nativeFamily: '许', nativeGiven: '俊豪', latinGiven: 'Marcus', latinFamily: 'Goh', gender: 'Male' }
  ],
  phonePrefixes: {
    CENTRAL: ['8', '9'],
    QUEENSTOWN: ['8', '9'],
    JURONG_EAST: ['8', '9'],
    TAMPINES: ['8', '9']
  },
  jitter: 0.012,
  timeoutMs: 25000,
  nameStyle: 'family-given',
  nativeJoiner: '',

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
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.quarter)
  },

  resolveAdmin (address, subregionId = '') {
    const option = this.subregions.find(item => item.id === subregionId)
    return pickFirst(address.city, address.state_district, getShortLabel(option?.label), 'Singapore')
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, district, postal, stage }) {
    return stage === 'relaxed'
      ? Boolean(street && (locality || district) && postal !== 'N/A')
      : Boolean(street && locality && postal !== 'N/A')
  },

  format ({ street, locality, district, postalCode, country }) {
    return joinNonEmpty([street, district || locality, `${country} ${postalCode !== 'N/A' ? postalCode : ''}`.trim()])
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
      return `${person.nativeFamily}${person.nativeGiven}`
    }

    return `${person.latinGiven} ${person.latinFamily}`
  },

  buildPhone (subregionId) {
    const prefixes = this.phonePrefixes[subregionId] || Object.values(this.phonePrefixes).flat()
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const areaLabel = this.subregions.find(option => option.id === subregionId)?.label?.split('/')[0]?.trim() || subregionId
    const phone = `+65 ${prefix}${randomDigits(3)} ${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
