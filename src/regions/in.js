import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const IN_AREAS = [
  { id: 'MUMBAI', label: 'Mumbai / मुंबई' },
  { id: 'DELHI', label: 'Delhi / दिल्ली' },
  { id: 'BENGALURU', label: 'Bengaluru / बेंगलुरु' },
  { id: 'HYDERABAD', label: 'Hyderabad / हैदराबाद' }
]

export const region = {
  id: 'IN',
  label: 'India',
  nativeLabel: '印度',
  countryCode: 'in',
  languageHeader: 'en-IN,hi;q=0.8',
  subregionLabel: 'City',
  subregionLabelNative: '城市',
  adminLabel: 'State',
  adminLabelNative: '邦',
  postalLabel: 'PIN code',
  postalLabelNative: '邮编',
  subregions: IN_AREAS,
  keywords: {
    MUMBAI: ['mumbai', 'मुंबई', 'maharashtra', 'महाराष्ट्र', 'in-mh', 'bandra', 'andheri', 'worli', 'colaba', 'kurla', 'dadar'],
    DELHI: ['delhi', 'new delhi', 'दिल्ली', 'in-dl', 'connaught', 'raisina', 'नयी दिल्ली'],
    BENGALURU: ['bengaluru', 'bangalore', 'बेंगलुरु', 'karnataka', 'in-ka', 'koramangala', 'indiranagar'],
    HYDERABAD: ['hyderabad', 'हैदराबाद', 'telangana', 'in-ts', 'banjara', 'gachibowli', 'nampally']
  },
  seeds: {
    MUMBAI: [
      { lat: 19.0596, lng: 72.8295 },
      { lat: 18.9388, lng: 72.8354 },
      { lat: 18.922, lng: 72.8347 },
      { lat: 19.0176, lng: 72.8562 },
      { lat: 19.1197, lng: 72.8464 },
      { lat: 19.0607, lng: 72.8362 },
      { lat: 19.0728, lng: 72.8826 },
      { lat: 19.0022, lng: 72.8416 }
    ],
    DELHI: [
      { lat: 28.6328, lng: 77.2197 },
      { lat: 28.6139, lng: 77.209 },
      { lat: 28.5245, lng: 77.1855 },
      { lat: 28.5672, lng: 77.21 },
      { lat: 28.6507, lng: 77.2303 },
      { lat: 28.5355, lng: 77.241 }
    ],
    BENGALURU: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9352, lng: 77.6245 },
      { lat: 12.9784, lng: 77.6408 },
      { lat: 12.9279, lng: 77.6271 },
      { lat: 13.0068, lng: 77.5696 },
      { lat: 12.9592, lng: 77.6974 }
    ],
    HYDERABAD: [
      { lat: 17.385, lng: 78.4867 },
      { lat: 17.4065, lng: 78.4772 },
      { lat: 17.4448, lng: 78.3498 },
      { lat: 17.3616, lng: 78.4747 },
      { lat: 17.4375, lng: 78.4483 },
      { lat: 17.4504, lng: 78.3811 }
    ]
  },
  names: [
    { nativeFamily: 'शर्मा', nativeGiven: 'आरव', latinGiven: 'Aarav', latinFamily: 'Sharma', gender: 'Male' },
    { nativeFamily: 'पटेल', nativeGiven: 'अनन्या', latinGiven: 'Ananya', latinFamily: 'Patel', gender: 'Female' },
    { nativeFamily: 'रेड्डी', nativeGiven: 'रोहन', latinGiven: 'Rohan', latinFamily: 'Reddy', gender: 'Male' },
    { nativeFamily: 'इयेर', nativeGiven: 'मेधा', latinGiven: 'Medha', latinFamily: 'Iyer', gender: 'Female' }
  ],
  phonePrefixes: {
    MUMBAI: ['22'],
    DELHI: ['11'],
    BENGALURU: ['80'],
    HYDERABAD: ['40']
  },
  jitter: 0.02,
  timeoutMs: 25000,
  nameStyle: 'given-family',
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
    return pickFirst(address.city, address.town, address.municipality)
  },

  resolveDistrict (address) {
    return pickFirst(address.suburb, address.neighbourhood, address.quarter, address.city_district)
  },

  resolveAdmin (address) {
    return pickFirst(address.state, address.province, address.region)
  },

  resolvePostalCode (address) {
    const text = String(address.postcode ?? '').trim()
    return text || 'N/A'
  },

  isValid ({ street, locality, district, admin, postal, stage }) {
    return stage === 'relaxed'
      ? Boolean(admin && (locality || district) && street)
      : Boolean(admin && locality && street && postal !== 'N/A')
  },

  format ({ street, locality, district, admin, postalCode, country }) {
    return joinNonEmpty([
      street,
      locality,
      district,
      admin,
      postalCode !== 'N/A' ? postalCode : '',
      country
    ])
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
      return `${person.nativeGiven} ${person.nativeFamily}`.trim()
    }

    return `${person.latinGiven} ${person.latinFamily}`.trim()
  },

  buildPhone (subregionId) {
    const prefixes = this.phonePrefixes[subregionId] || Object.values(this.phonePrefixes).flat()
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const areaLabel = this.subregions.find(option => option.id === subregionId)?.label?.split('/')[0]?.trim() || subregionId
    const phone = `+91 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
