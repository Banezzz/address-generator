import { US_STATE_MAP } from '../../config/regions.js'
import { stripDiacritics } from '../formatters.js'

const REGION_KEYWORDS = {
  HK: {
    HKI: ['hong kong island', 'central', 'wan chai', 'causeway bay', 'north point', 'quarry bay', 'eastern district', 'aberdeen', 'southern district', 'stanley'],
    KLN: ['kowloon', 'yau tsim mong', 'tsim sha tsui', 'mong kok', 'sham shui po', 'kowloon city', 'hung hom', 'kwun tong', 'wong tai sin', 'kowloon bay'],
    NT: ['new territories', 'sha tin', 'tsuen wan', 'tuen mun', 'yuen long', 'tai po', 'sai kung', 'fanling', 'sheung shui', 'tung chung', 'lantau', 'islands district']
  },
  SG: {
    CENTRAL: ['downtown core', 'singapore river', 'orchard', 'museum', 'river valley', 'rochor', 'outram', 'marina centre', 'cbd', 'clarke quay'],
    QUEENSTOWN: ['queenstown', 'commonwealth', 'redhill', 'buona vista', 'one-north', 'holland village', 'dawson'],
    JURONG_EAST: ['jurong east', 'yuhua', 'teban gardens', 'international business park', 'toh guan'],
    TAMPINES: ['tampines', 'simei', 'tampines west', 'tampines east']
  },
  JP: {
    TOKYO: ['tokyo', '東京都', 'shibuya', 'shinjuku', 'chiyoda', 'minato'],
    OSAKA: ['osaka', '大阪', '大阪府', 'kita', 'naniwa', 'chuo ward'],
    YOKOHAMA: ['yokohama', '横浜', 'kanagawa', 'nishi ward', 'naka ward'],
    FUKUOKA: ['fukuoka', '福岡', 'hakata', 'tenjin', 'chuo ward']
  },
  TW: {
    TAIPEI: ['taipei', '台北', 'taipei city', '臺北'],
    TAICHUNG: ['taichung', '台中', '臺中'],
    TAINAN: ['tainan', '台南', '臺南'],
    KAOHSIUNG: ['kaohsiung', '高雄']
  },
  TH: {
    BANGKOK: ['bangkok', 'กรุงเทพ', 'krung thep'],
    CHIANG_MAI: ['chiang mai', 'เชียงใหม่'],
    PHUKET: ['phuket', 'ภูเก็ต'],
    CHONBURI: ['chonburi', 'ชลบุรี', 'pattaya', 'si racha']
  },
  VN: {
    HCMC: ['ho chi minh', 'thanh pho ho chi minh', 'sai gon', 'hồ chí minh'],
    HANOI: ['hanoi', 'ha noi', 'hà nội'],
    DANANG: ['da nang', 'đà nẵng'],
    CANTHO: ['can tho', 'cần thơ']
  }
}

export function matchesSelectedSubregion ({ regionId, subregionId, address, data }) {
  if (!subregionId) {
    return true
  }

  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    return matchesUsState(subregionId, address, data)
  }

  const keywords = REGION_KEYWORDS[regionId]?.[subregionId]
  if (!keywords?.length) {
    return true
  }

  const haystack = buildHaystack(address, data)
  return keywords.some(keyword => haystack.includes(normalizeText(keyword)))
}

function matchesUsState (subregionId, address, data) {
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
}

function buildHaystack (address, data) {
  return collectParts(address, data)
    .map(normalizeText)
    .filter(Boolean)
    .join(' ')
}

function collectParts (address = {}, data = {}) {
  return [
    data.display_name,
    data.name,
    data.namedetails?.name,
    address.country,
    address.state,
    address.region,
    address.province,
    address.city,
    address.town,
    address.county,
    address.city_district,
    address.state_district,
    address.suburb,
    address.borough,
    address.neighbourhood,
    address.quarter,
    address.village,
    address.road,
    address.amenity,
    address.building,
    address['ISO3166-2-lvl4'],
    address['ISO3166-2-lvl3']
  ]
}

function normalizeText (value) {
  return stripDiacritics(String(value ?? ''))
    .toLowerCase()
    .replace(/[^a-z0-9\u3400-\u9fff\u0e00-\u0e7f]+/g, ' ')
    .trim()
}
