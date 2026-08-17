import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const VN_AREAS = [
  { id: 'HCMC', label: 'Ho Chi Minh City / Thành phố Hồ Chí Minh' },
  { id: 'HANOI', label: 'Hanoi / Hà Nội' },
  { id: 'DANANG', label: 'Da Nang / Đà Nẵng' },
  { id: 'CANTHO', label: 'Can Tho / Cần Thơ' }
]

export const region = {
  id: 'VN',
  label: 'Vietnam',
  nativeLabel: '越南',
  countryCode: 'vn',
  languageHeader: 'vi,en;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'Province / City',
  adminLabelNative: '省市',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: VN_AREAS,
  keywords: {
    HCMC: ['ho chi minh', 'thanh pho ho chi minh', 'sai gon', 'hồ chí minh'],
    HANOI: ['hanoi', 'ha noi', 'hà nội'],
    DANANG: ['da nang', 'đà nẵng'],
    CANTHO: ['can tho', 'cần thơ']
  },
  seeds: {
    HCMC: [
      { lat: 10.7769, lng: 106.7009 },
      { lat: 10.7869, lng: 106.6991 },
      { lat: 10.7984, lng: 106.6881 },
      { lat: 10.7623, lng: 106.6812 },
      { lat: 10.7812, lng: 106.7123 },
      { lat: 10.7712, lng: 106.7289 },
      { lat: 10.7923, lng: 106.6589 },
      { lat: 10.7589, lng: 106.7123 }
    ],
    HANOI: [
      { lat: 21.0285, lng: 105.8542 },
      { lat: 21.0323, lng: 105.8484 },
      { lat: 21.0177, lng: 105.8365 },
      { lat: 21.0412, lng: 105.8623 },
      { lat: 21.0123, lng: 105.8289 },
      { lat: 21.0389, lng: 105.8412 },
      { lat: 21.0212, lng: 105.8712 }
    ],
    DANANG: [
      { lat: 16.0544, lng: 108.2022 },
      { lat: 16.0678, lng: 108.2208 },
      { lat: 16.0603, lng: 108.2244 },
      { lat: 16.0412, lng: 108.1912 },
      { lat: 16.0789, lng: 108.2089 },
      { lat: 16.0523, lng: 108.2389 }
    ],
    CANTHO: [
      { lat: 10.0452, lng: 105.7469 },
      { lat: 10.0341, lng: 105.7845 },
      { lat: 10.0281, lng: 105.7682 },
      { lat: 10.0512, lng: 105.7289 },
      { lat: 10.0212, lng: 105.7612 },
      { lat: 10.0389, lng: 105.7989 }
    ]
  },
  names: [
    { nativeFamily: 'Nguyễn', nativeGiven: 'Minh Anh', latinGiven: 'Minh Anh', latinFamily: 'Nguyen', gender: 'Female' },
    { nativeFamily: 'Trần', nativeGiven: 'Quốc Bảo', latinGiven: 'Quoc Bao', latinFamily: 'Tran', gender: 'Male' },
    { nativeFamily: 'Lê', nativeGiven: 'Khánh Linh', latinGiven: 'Khanh Linh', latinFamily: 'Le', gender: 'Female' },
    { nativeFamily: 'Phạm', nativeGiven: 'Gia Huy', latinGiven: 'Gia Huy', latinFamily: 'Pham', gender: 'Male' }
  ],
  phonePrefixes: {
    HCMC: ['28'],
    HANOI: ['24'],
    DANANG: ['236'],
    CANTHO: ['292']
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
    return pickFirst(address.city_district, address.suburb, address.quarter, address.county)
  },

  resolveAdmin (address) {
    return pickFirst(address.state, address.city, address.province)
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, district, admin, stage }) {
    return stage === 'relaxed'
      ? Boolean(admin && (district || locality) && street)
      : Boolean(admin && district && street)
  },

  format ({ street, locality, district, admin, postalCode, country }) {
    return joinNonEmpty([street, district, locality, admin, postalCode !== 'N/A' ? postalCode : '', country], ', ')
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
    const phone = prefix.length === 2
      ? `+84 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`
      : `+84 ${prefix} ${randomDigits(3)} ${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
