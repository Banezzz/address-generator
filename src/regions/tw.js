import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const TW_AREAS = [
  { id: 'TAIPEI', label: 'Taipei / 台北' },
  { id: 'TAICHUNG', label: 'Taichung / 台中' },
  { id: 'TAINAN', label: 'Tainan / 台南' },
  { id: 'KAOHSIUNG', label: 'Kaohsiung / 高雄' }
]

export const region = {
  id: 'TW',
  label: 'Taiwan',
  nativeLabel: '台湾',
  countryCode: 'tw',
  languageHeader: 'zh-TW,en;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'County / City',
  adminLabelNative: '县市',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: TW_AREAS,
  keywords: {
    TAIPEI: ['taipei', '台北', 'taipei city', '臺北'],
    TAICHUNG: ['taichung', '台中', '臺中'],
    TAINAN: ['tainan', '台南', '臺南'],
    KAOHSIUNG: ['kaohsiung', '高雄']
  },
  seeds: {
    TAIPEI: [
      { lat: 25.033, lng: 121.5654 },
      { lat: 25.0478, lng: 121.5319 },
      { lat: 25.0418, lng: 121.5445 },
      { lat: 25.0221, lng: 121.5487 },
      { lat: 25.0567, lng: 121.5234 },
      { lat: 25.0389, lng: 121.5512 },
      { lat: 25.0287, lng: 121.5678 },
      { lat: 25.0456, lng: 121.5412 }
    ],
    TAICHUNG: [
      { lat: 24.1477, lng: 120.6736 },
      { lat: 24.1631, lng: 120.6476 },
      { lat: 24.1711, lng: 120.6424 },
      { lat: 24.1345, lng: 120.6892 },
      { lat: 24.1523, lng: 120.6587 },
      { lat: 24.1789, lng: 120.6345 }
    ],
    TAINAN: [
      { lat: 22.9999, lng: 120.227 },
      { lat: 22.9925, lng: 120.2059 },
      { lat: 22.9814, lng: 120.2187 },
      { lat: 23.0123, lng: 120.2156 },
      { lat: 22.9789, lng: 120.2345 },
      { lat: 22.9878, lng: 120.1923 }
    ],
    KAOHSIUNG: [
      { lat: 22.6273, lng: 120.3014 },
      { lat: 22.6871, lng: 120.3087 },
      { lat: 22.6309, lng: 120.3413 },
      { lat: 22.6412, lng: 120.3125 },
      { lat: 22.6234, lng: 120.2856 },
      { lat: 22.6789, lng: 120.2978 }
    ]
  },
  names: [
    { nativeFamily: '林', nativeGiven: '語彤', latinGiven: 'Yu-Tung', latinFamily: 'Lin', gender: 'Female' },
    { nativeFamily: '陳', nativeGiven: '冠廷', latinGiven: 'Kuan-Ting', latinFamily: 'Chen', gender: 'Male' },
    { nativeFamily: '張', nativeGiven: '宥晴', latinGiven: 'Yu-Ching', latinFamily: 'Chang', gender: 'Female' },
    { nativeFamily: '王', nativeGiven: '柏翰', latinGiven: 'Po-Han', latinFamily: 'Wang', gender: 'Male' }
  ],
  phonePrefixes: {
    TAIPEI: ['2'],
    TAICHUNG: ['4'],
    TAINAN: ['6'],
    KAOHSIUNG: ['7']
  },
  jitter: 0.015,
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
    return pickFirst(address.city_district, address.town, address.suburb, address.district)
  },

  resolveAdmin (address) {
    return pickFirst(address.state, address.city, address.county)
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

  format ({ street, district, admin, postalCode, country }) {
    return joinNonEmpty([postalCode !== 'N/A' ? postalCode : '', admin, district, street, country], ' ')
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
    const phone = `+886 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
