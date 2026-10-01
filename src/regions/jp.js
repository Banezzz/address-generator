import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const JP_AREAS = [
  { id: 'TOKYO', label: 'Tokyo / 東京' },
  { id: 'OSAKA', label: 'Osaka / 大阪' },
  { id: 'YOKOHAMA', label: 'Yokohama / 横浜' },
  { id: 'FUKUOKA', label: 'Fukuoka / 福岡' }
]

const JP_ISO_ADMIN = {
  'JP-13': '東京都',
  'JP-27': '大阪府',
  'JP-14': '神奈川県',
  'JP-40': '福岡県'
}

export const region = {
  id: 'JP',
  label: 'Japan',
  nativeLabel: '日本',
  countryCode: 'jp',
  languageHeader: 'ja,en;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'Prefecture',
  adminLabelNative: '都道府县',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: JP_AREAS,
  keywords: {
    TOKYO: ['tokyo', '東京都', 'shibuya', 'shinjuku', 'chiyoda', 'minato'],
    OSAKA: ['osaka', '大阪', '大阪府', 'kita', 'naniwa', 'chuo ward'],
    YOKOHAMA: ['yokohama', '横浜', 'kanagawa', 'nishi ward', 'naka ward'],
    FUKUOKA: ['fukuoka', '福岡', 'hakata', 'tenjin', 'chuo ward']
  },
  seeds: {
    TOKYO: [
      { lat: 35.6595, lng: 139.7005 },
      { lat: 35.6938, lng: 139.7034 },
      { lat: 35.6717, lng: 139.765 },
      { lat: 35.6814, lng: 139.7654 },
      { lat: 35.7012, lng: 139.6842 },
      { lat: 35.6587, lng: 139.7415 }
    ],
    OSAKA: [
      { lat: 34.7025, lng: 135.4959 },
      { lat: 34.6687, lng: 135.5019 },
      { lat: 34.6937, lng: 135.5023 },
      { lat: 34.6814, lng: 135.4887 },
      { lat: 34.7123, lng: 135.4934 }
    ],
    YOKOHAMA: [
      { lat: 35.4662, lng: 139.6227 },
      { lat: 35.4437, lng: 139.638 },
      { lat: 35.454, lng: 139.6316 },
      { lat: 35.4789, lng: 139.6145 },
      { lat: 35.4321, lng: 139.6489 }
    ],
    FUKUOKA: [
      { lat: 33.5892, lng: 130.4017 },
      { lat: 33.5931, lng: 130.4205 },
      { lat: 33.5795, lng: 130.3831 },
      { lat: 33.6012, lng: 130.3923 },
      { lat: 33.5687, lng: 130.4156 }
    ]
  },
  names: [
    { nativeFamily: '佐藤', nativeGiven: '美咲', latinGiven: 'Misaki', latinFamily: 'Sato', gender: 'Female' },
    { nativeFamily: '高橋', nativeGiven: '蓮', latinGiven: 'Ren', latinFamily: 'Takahashi', gender: 'Male' },
    { nativeFamily: '山田', nativeGiven: '陽菜', latinGiven: 'Hina', latinFamily: 'Yamada', gender: 'Female' },
    { nativeFamily: '伊藤', nativeGiven: '大翔', latinGiven: 'Haruto', latinFamily: 'Ito', gender: 'Male' }
  ],
  phonePrefixes: {
    TOKYO: ['3'],
    OSAKA: ['6'],
    YOKOHAMA: ['45'],
    FUKUOKA: ['92']
  },
  jitter: 0.015,
  timeoutMs: 15000,
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
    return pickFirst(address.city, address.town, address.village, address.county, address.city_district)
  },

  resolveDistrict (address) {
    return pickFirst(address.city_district, address.suburb, address.quarter, address.neighbourhood)
  },

  resolveAdmin (address) {
    return pickFirst(
      address.state,
      address.province,
      address.region,
      JP_ISO_ADMIN[address['ISO3166-2-lvl4']]
    )
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, district, admin, postal, stage }) {
    return stage === 'relaxed'
      ? Boolean(admin && (locality || district) && street)
      : Boolean(admin && locality && (street || district) && postal !== 'N/A')
  },

  format ({ street, locality, district, admin, postalCode, country }) {
    return joinNonEmpty([postalCode !== 'N/A' ? `〒${postalCode}` : '', admin, locality, district, street, country], ' ')
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
    const phone = prefix.length === 1
      ? `+81 ${prefix}-${randomDigits(4)}-${randomDigits(4)}`
      : `+81 ${prefix}-${randomDigits(3)}-${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
