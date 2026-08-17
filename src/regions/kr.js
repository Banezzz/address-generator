import { joinNonEmpty, pickFirst } from '../services/formatters.js'
import { matchesKeywords, randomDigits, resolveDefaultStreet } from './helpers.js'

export const KR_AREAS = [
  { id: 'SEOUL', label: 'Seoul / 서울' },
  { id: 'BUSAN', label: 'Busan / 부산' },
  { id: 'INCHEON', label: 'Incheon / 인천' },
  { id: 'DAEGU', label: 'Daegu / 대구' }
]

export const region = {
  id: 'KR',
  label: 'South Korea',
  nativeLabel: '韩国',
  countryCode: 'kr',
  languageHeader: 'ko,en;q=0.8',
  subregionLabel: 'Area',
  subregionLabelNative: '区域',
  adminLabel: 'City',
  adminLabelNative: '市',
  postalLabel: 'Postal code',
  postalLabelNative: '邮编',
  subregions: KR_AREAS,
  keywords: {
    SEOUL: ['seoul', '서울', '서울특별시', 'gangnam', '강남', 'jongno', '종로', 'mapo', 'yongsan', 'songpa', 'yeongdeungpo', 'kr-11'],
    BUSAN: ['busan', '부산', '부산광역시', 'haeundae', '해운대', 'seomyeon', '서면', 'dongnae', 'sasang', 'kr-26'],
    INCHEON: ['incheon', '인천', '인천광역시', 'songdo', '송도', 'yeonsu', '연수', 'bupyeong', '부평', 'namdong', 'kr-28'],
    DAEGU: ['daegu', '대구', '대구광역시', 'suseong', '수성', 'dalseo', 'jung-gu', 'dong-gu', 'kr-27']
  },
  seeds: {
    SEOUL: [
      { lat: 37.4979, lng: 127.0276 },
      { lat: 37.5665, lng: 126.978 },
      { lat: 37.5704, lng: 126.992 },
      { lat: 37.5443, lng: 127.0557 },
      { lat: 37.5219, lng: 126.9245 },
      { lat: 37.5572, lng: 126.9254 },
      { lat: 37.5133, lng: 127.1028 },
      { lat: 37.534, lng: 126.9946 }
    ],
    BUSAN: [
      { lat: 35.1587, lng: 129.1604 },
      { lat: 35.1576, lng: 129.059 },
      { lat: 35.1028, lng: 129.0324 },
      { lat: 35.1796, lng: 129.0756 },
      { lat: 35.1681, lng: 129.0578 },
      { lat: 35.1631, lng: 129.1635 }
    ],
    INCHEON: [
      { lat: 37.3891, lng: 126.6435 },
      { lat: 37.4563, lng: 126.7052 },
      { lat: 37.4647, lng: 126.6942 },
      { lat: 37.489, lng: 126.7245 },
      { lat: 37.4483, lng: 126.701 },
      { lat: 37.4738, lng: 126.621 }
    ],
    DAEGU: [
      { lat: 35.8714, lng: 128.6014 },
      { lat: 35.8583, lng: 128.6306 },
      { lat: 35.885, lng: 128.585 },
      { lat: 35.8294, lng: 128.5329 },
      { lat: 35.8756, lng: 128.595 },
      { lat: 35.8668, lng: 128.5936 }
    ]
  },
  names: [
    { nativeFamily: '김', nativeGiven: '민준', latinGiven: 'Min-Jun', latinFamily: 'Kim', gender: 'Male' },
    { nativeFamily: '이', nativeGiven: '서연', latinGiven: 'Seo-Yeon', latinFamily: 'Lee', gender: 'Female' },
    { nativeFamily: '박', nativeGiven: '지훈', latinGiven: 'Ji-Hoon', latinFamily: 'Park', gender: 'Male' },
    { nativeFamily: '최', nativeGiven: '수아', latinGiven: 'Su-A', latinFamily: 'Choi', gender: 'Female' }
  ],
  phonePrefixes: {
    SEOUL: ['2'],
    BUSAN: ['51'],
    INCHEON: ['32'],
    DAEGU: ['53']
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
    return pickFirst(address.suburb, address.quarter, address.neighbourhood, address.city)
  },

  resolveDistrict (address) {
    return pickFirst(address.borough, address.city_district, address.suburb, address.quarter)
  },

  resolveAdmin (address) {
    return pickFirst(address.city, address.state, address.province)
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
    return joinNonEmpty([street, district, admin, postalCode !== 'N/A' ? postalCode : '', country])
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
      ? `+82 ${prefix}-${randomDigits(4)}-${randomDigits(4)}`
      : `+82 ${prefix}-${randomDigits(3)}-${randomDigits(4)}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
    }
  }
}
