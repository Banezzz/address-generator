import { getShortLabel, joinNonEmpty, pickFirst } from '../services/formatters.js'
import { amenityName, matchCountryCode, matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const HK_ZONES = [
  { id: 'HKI', label: 'Hong Kong Island / 香港島' },
  { id: 'KLN', label: 'Kowloon / 九龍' },
  { id: 'NT', label: 'New Territories / 新界' }
]

const KEYWORDS = {
  HKI: ['hong kong island', '香港島', '香港岛', 'central', '中環', '中环', 'wan chai', '灣仔', '湾仔', 'causeway bay', '銅鑼灣', '铜锣湾', 'north point', '北角', 'quarry bay', '鰂魚涌', '鲗鱼涌', 'eastern district', '東區', '东区', 'aberdeen', '香港仔', 'southern district', '南區', '南区', 'stanley', '赤柱', '中西區', '中西区'],
  KLN: ['kowloon', '九龍', '九龙', 'yau tsim mong', '油尖旺', 'tsim sha tsui', '尖沙咀', 'mong kok', '旺角', 'sham shui po', '深水埗', 'kowloon city', '九龍城', 'hung hom', '紅磡', '红磡', 'kwun tong', '觀塘', '观塘', 'wong tai sin', '黃大仙', '黄大仙', 'kowloon bay', '九龍灣', '九龙湾'],
  NT: ['new territories', '新界', 'sha tin', '沙田', 'tsuen wan', '荃灣', '荃湾', 'tuen mun', '屯門', '屯门', 'yuen long', '元朗', 'tai po', '大埔', 'sai kung', '西貢', '西贡', 'fanling', '粉嶺', '粉岭', 'sheung shui', '上水', 'tung chung', '東涌', '东涌', 'lantau', '大嶼山', '大屿山', 'islands district', '離島', '离岛']
}

export const region = {
  id: 'HK',
  label: 'Hong Kong',
  nativeLabel: '香港',
  countryCode: 'hk',
  languageHeader: 'zh-HK,en;q=0.9',
  subregionLabel: 'Zone',
  subregionLabelNative: '区域',
  adminLabel: 'Zone',
  adminLabelNative: '区域',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: HK_ZONES,
  keywords: KEYWORDS,
  seeds: {
    HKI: [
      { lat: 22.2819, lng: 114.1586 },
      { lat: 22.2783, lng: 114.1747 },
      { lat: 22.2798, lng: 114.1839 },
      { lat: 22.2772, lng: 114.1717 },
      { lat: 22.2839, lng: 114.1548 },
      { lat: 22.2871, lng: 114.1912 },
      { lat: 22.2908, lng: 114.2003 },
      { lat: 22.248, lng: 114.1595 },
      { lat: 22.2642, lng: 114.2361 },
      { lat: 22.2488, lng: 114.1541 }
    ],
    KLN: [
      { lat: 22.2963, lng: 114.1722 },
      { lat: 22.3186, lng: 114.1684 },
      { lat: 22.3307, lng: 114.188 },
      { lat: 22.3027, lng: 114.1772 },
      { lat: 22.3121, lng: 114.1707 },
      { lat: 22.3193, lng: 114.2086 },
      { lat: 22.3369, lng: 114.1946 },
      { lat: 22.3273, lng: 114.1599 },
      { lat: 22.3236, lng: 114.1887 },
      { lat: 22.308, lng: 114.2242 }
    ],
    NT: [
      { lat: 22.3833, lng: 114.188 },
      { lat: 22.3712, lng: 114.1131 },
      { lat: 22.4445, lng: 114.0222 },
      { lat: 22.3949, lng: 113.9731 },
      { lat: 22.4467, lng: 114.1694 },
      { lat: 22.4523, lng: 114.1645 },
      { lat: 22.4919, lng: 114.1388 },
      { lat: 22.5037, lng: 114.1287 },
      { lat: 22.4572, lng: 114.0012 },
      { lat: 22.3154, lng: 113.9345 },
      { lat: 22.2879, lng: 113.9441 }
    ]
  },
  names: [
    { nativeFamily: '陳', nativeGiven: '嘉欣', latinGiven: 'Carmen', latinFamily: 'Chan', gender: 'Female' },
    { nativeFamily: '黃', nativeGiven: '子軒', latinGiven: 'Ryan', latinFamily: 'Wong', gender: 'Male' },
    { nativeFamily: '李', nativeGiven: '詠恩', latinGiven: 'Eunice', latinFamily: 'Lee', gender: 'Female' },
    { nativeFamily: '林', nativeGiven: '俊熙', latinGiven: 'Jason', latinFamily: 'Lam', gender: 'Male' }
  ],
  phonePrefixes: {
    HKI: ['5', '6', '9'],
    KLN: ['5', '6', '9'],
    NT: ['5', '6', '9']
  },
  jitter: 0.006,
  timeoutMs: 32000,
  nameStyle: 'family-given',
  nativeJoiner: '',

  matchCountry (address) {
    if (matchCountryCode(address, this.countryCode)) {
      return true
    }

    const haystack = [
      address.country,
      address.region,
      address.state,
      address.city,
      address.city_district
    ].join(' ').toLowerCase()

    return matchCountryCode(address, this.countryCode, ['cn']) &&
      (haystack.includes('hong kong') || haystack.includes('香港'))
  },

  matchesSubregion (subregionId, address, data) {
    return matchesKeywords(this.keywords[subregionId], address, data)
  },

  resolveStreet (address, stage, data = {}) {
    return resolveDefaultStreet(address, stage, { allowAmenityInStrict: true }) ||
      pickFirst(data.name, data.namedetails?.name)
  },

  resolveLocality (address) {
    return pickFirst(address.suburb, address.city_district, address.neighbourhood, address.town, address.city)
  },

  resolveDistrict (address) {
    return pickFirst(address.city_district, address.suburb, address.borough, address.neighbourhood, address.state_district)
  },

  resolveAdmin (address, subregionId = '') {
    const option = this.subregions.find(item => item.id === subregionId)
    return getShortLabel(option?.label) || 'Hong Kong'
  },

  resolvePostalCode () {
    return 'N/A'
  },

  isValid ({ street, locality, district, admin, address, stage }) {
    return stage === 'relaxed'
      ? Boolean(street && (district || locality || admin))
      : Boolean((street || amenityName(address)) && (district || locality || admin))
  },

  format ({ street, locality, district, admin, country, subregionLabel }) {
    return joinNonEmpty([street, district || locality, admin || subregionLabel, country])
  },

  getSeedCoordinates (subregionId, scope = 'subregion') {
    if (scope === 'region') {
      return Object.values(this.seeds).flat()
    }

    return this.seeds[subregionId] || Object.values(this.seeds).flat()
  },

  getSeedScopes (stage, retry) {
    if (stage === 'relaxed' && retry === 2) {
      return ['subregion', 'region']
    }

    return ['subregion']
  },

  shouldCycleSeeds () {
    return true
  },

  getJitter (scope, stage) {
    if (scope === 'region') {
      return 0.0018
    }

    return stage === 'strict' ? 0.0012 : 0.0024
  },

  preferExactSeed ({ scope, stage, attempt, seedCount }) {
    return scope === 'subregion' && stage === 'strict' && attempt < seedCount
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
    const phone = `+852 ${prefix}${randomDigits(3)} ${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
