export const US_STATES = [
  { full: "Alabama", abbr: "AL" },
  { full: "Alaska", abbr: "AK" },
  { full: "Arizona", abbr: "AZ" },
  { full: "Arkansas", abbr: "AR" },
  { full: "California", abbr: "CA" },
  { full: "Colorado", abbr: "CO" },
  { full: "Connecticut", abbr: "CT" },
  { full: "Delaware", abbr: "DE" },
  { full: "Florida", abbr: "FL" },
  { full: "Georgia", abbr: "GA" },
  { full: "Hawaii", abbr: "HI" },
  { full: "Idaho", abbr: "ID" },
  { full: "Illinois", abbr: "IL" },
  { full: "Indiana", abbr: "IN" },
  { full: "Iowa", abbr: "IA" },
  { full: "Kansas", abbr: "KS" },
  { full: "Kentucky", abbr: "KY" },
  { full: "Louisiana", abbr: "LA" },
  { full: "Maine", abbr: "ME" },
  { full: "Maryland", abbr: "MD" },
  { full: "Massachusetts", abbr: "MA" },
  { full: "Michigan", abbr: "MI" },
  { full: "Minnesota", abbr: "MN" },
  { full: "Mississippi", abbr: "MS" },
  { full: "Missouri", abbr: "MO" },
  { full: "Montana", abbr: "MT" },
  { full: "Nebraska", abbr: "NE" },
  { full: "Nevada", abbr: "NV" },
  { full: "New Hampshire", abbr: "NH" },
  { full: "New Jersey", abbr: "NJ" },
  { full: "New Mexico", abbr: "NM" },
  { full: "New York", abbr: "NY" },
  { full: "North Carolina", abbr: "NC" },
  { full: "North Dakota", abbr: "ND" },
  { full: "Ohio", abbr: "OH" },
  { full: "Oklahoma", abbr: "OK" },
  { full: "Oregon", abbr: "OR" },
  { full: "Pennsylvania", abbr: "PA" },
  { full: "Rhode Island", abbr: "RI" },
  { full: "South Carolina", abbr: "SC" },
  { full: "South Dakota", abbr: "SD" },
  { full: "Tennessee", abbr: "TN" },
  { full: "Texas", abbr: "TX" },
  { full: "Utah", abbr: "UT" },
  { full: "Vermont", abbr: "VT" },
  { full: "Virginia", abbr: "VA" },
  { full: "Washington", abbr: "WA" },
  { full: "West Virginia", abbr: "WV" },
  { full: "Wisconsin", abbr: "WI" },
  { full: "Wyoming", abbr: "WY" }
]

export const TAX_FREE_STATE_CODES = ["AK", "DE", "MT", "NH", "OR"]

export const HK_ZONES = [
  { id: "HKI", label: "Hong Kong Island / 香港島" },
  { id: "KLN", label: "Kowloon / 九龍" },
  { id: "NT", label: "New Territories / 新界" }
]

export const SG_AREAS = [
  { id: "CENTRAL", label: "Central Area / 中央區" },
  { id: "QUEENSTOWN", label: "Queenstown / 女皇鎮" },
  { id: "JURONG_EAST", label: "Jurong East / 裕廊東" },
  { id: "TAMPINES", label: "Tampines / 淡濱尼" }
]

export const JP_AREAS = [
  { id: "TOKYO", label: "Tokyo / 東京" },
  { id: "OSAKA", label: "Osaka / 大阪" },
  { id: "YOKOHAMA", label: "Yokohama / 横浜" },
  { id: "FUKUOKA", label: "Fukuoka / 福岡" }
]

export const TW_AREAS = [
  { id: "TAIPEI", label: "Taipei / 台北" },
  { id: "TAICHUNG", label: "Taichung / 台中" },
  { id: "TAINAN", label: "Tainan / 台南" },
  { id: "KAOHSIUNG", label: "Kaohsiung / 高雄" }
]

export const TH_AREAS = [
  { id: "BANGKOK", label: "Bangkok / กรุงเทพมหานคร" },
  { id: "CHIANG_MAI", label: "Chiang Mai / เชียงใหม่" },
  { id: "PHUKET", label: "Phuket / ภูเก็ต" },
  { id: "CHONBURI", label: "Chonburi / ชลบุรี" }
]

export const VN_AREAS = [
  { id: "HCMC", label: "Ho Chi Minh City / Thành phố Hồ Chí Minh" },
  { id: "HANOI", label: "Hanoi / Hà Nội" },
  { id: "DANANG", label: "Da Nang / Đà Nẵng" },
  { id: "CANTHO", label: "Can Tho / Cần Thơ" }
]

export const REGION_CONFIGS = [
  {
    id: "US",
    label: "United States",
    nativeLabel: "美国",
    countryCode: "us",
    languageHeader: "en-US,en;q=0.9",
    subregionLabel: "State",
    subregionLabelNative: "州",
    adminLabel: "State",
    adminLabelNative: "州",
    postalLabel: "ZIP code",
    postalLabelNative: "邮编"
  },
  {
    id: "US_TAX_FREE",
    label: "United States Tax-Free States",
    nativeLabel: "美国免税州",
    countryCode: "us",
    languageHeader: "en-US,en;q=0.9",
    subregionLabel: "Tax-free state",
    subregionLabelNative: "免税州",
    adminLabel: "State",
    adminLabelNative: "州",
    postalLabel: "ZIP code",
    postalLabelNative: "邮编"
  },
  {
    id: "HK",
    label: "Hong Kong",
    nativeLabel: "香港",
    countryCode: "hk",
    languageHeader: "zh-HK,en;q=0.9",
    subregionLabel: "Zone",
    subregionLabelNative: "区域",
    adminLabel: "Zone",
    adminLabelNative: "区域",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  },
  {
    id: "SG",
    label: "Singapore",
    nativeLabel: "新加坡",
    countryCode: "sg",
    languageHeader: "en-SG,zh-Hans;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "区域",
    adminLabel: "Area",
    adminLabelNative: "区域",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  },
  {
    id: "JP",
    label: "Japan",
    nativeLabel: "日本",
    countryCode: "jp",
    languageHeader: "ja,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "区域",
    adminLabel: "Prefecture",
    adminLabelNative: "都道府县",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  },
  {
    id: "TW",
    label: "Taiwan",
    nativeLabel: "台湾",
    countryCode: "tw",
    languageHeader: "zh-TW,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "区域",
    adminLabel: "County / City",
    adminLabelNative: "县市",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  },
  {
    id: "TH",
    label: "Thailand",
    nativeLabel: "泰国",
    countryCode: "th",
    languageHeader: "th,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "区域",
    adminLabel: "Province",
    adminLabelNative: "府",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  },
  {
    id: "VN",
    label: "Vietnam",
    nativeLabel: "越南",
    countryCode: "vn",
    languageHeader: "vi,en;q=0.8",
    subregionLabel: "Area",
    subregionLabelNative: "区域",
    adminLabel: "Province / City",
    adminLabelNative: "省市",
    postalLabel: "Postal code",
    postalLabelNative: "邮编"
  }
]

export const REGION_MAP = new Map(REGION_CONFIGS.map(region => [region.id, region]))
export const US_STATE_MAP = new Map(US_STATES.map(state => [state.abbr, state]))

export function getRegionConfig(regionId = "US") {
  return REGION_MAP.get(regionId) || REGION_MAP.get("US")
}

export function getRegionOptions() {
  return REGION_CONFIGS
}

export function getSubregionOptions(regionId) {
  if (regionId === "US") {
    return US_STATES.map(state => ({ id: state.abbr, label: `${state.full} (${state.abbr})` }))
  }

  if (regionId === "US_TAX_FREE") {
    return US_STATES
      .filter(state => TAX_FREE_STATE_CODES.includes(state.abbr))
      .map(state => ({ id: state.abbr, label: `${state.full} (${state.abbr})` }))
  }

  if (regionId === "HK") return HK_ZONES
  if (regionId === "SG") return SG_AREAS
  if (regionId === "JP") return JP_AREAS
  if (regionId === "TW") return TW_AREAS
  if (regionId === "TH") return TH_AREAS
  if (regionId === "VN") return VN_AREAS

  return []
}

export function resolveSubregion(regionId, subregionId) {
  const options = getSubregionOptions(regionId)
  if (options.length === 0) return null
  if (subregionId && options.some(option => option.id === subregionId)) {
    return subregionId
  }
  return options[Math.floor(Math.random() * options.length)].id
}
