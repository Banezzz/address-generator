import { US_STATE_MAP } from '../../config/regions.js'
import { stripDiacritics } from '../formatters.js'

const REGION_KEYWORDS = {
  HK: {
    HKI: ['hong kong island', '香港島', '香港岛', 'central', '中環', '中环', 'wan chai', '灣仔', '湾仔', 'causeway bay', '銅鑼灣', '铜锣湾', 'north point', '北角', 'quarry bay', '鰂魚涌', '鲗鱼涌', 'eastern district', '東區', '东区', 'aberdeen', '香港仔', 'southern district', '南區', '南区', 'stanley', '赤柱', '中西區', '中西区'],
    KLN: ['kowloon', '九龍', '九龙', 'yau tsim mong', '油尖旺', 'tsim sha tsui', '尖沙咀', 'mong kok', '旺角', 'sham shui po', '深水埗', 'kowloon city', '九龍城', 'hung hom', '紅磡', '红磡', 'kwun tong', '觀塘', '观塘', 'wong tai sin', '黃大仙', '黄大仙', 'kowloon bay', '九龍灣', '九龙湾'],
    NT: ['new territories', '新界', 'sha tin', '沙田', 'tsuen wan', '荃灣', '荃湾', 'tuen mun', '屯門', '屯门', 'yuen long', '元朗', 'tai po', '大埔', 'sai kung', '西貢', '西贡', 'fanling', '粉嶺', '粉岭', 'sheung shui', '上水', 'tung chung', '東涌', '东涌', 'lantau', '大嶼山', '大屿山', 'islands district', '離島', '离岛']
  },
  SG: {
    CENTRAL: ['downtown core', 'singapore river', 'orchard', 'museum', 'river valley', 'rochor', 'outram', 'marina centre', 'cbd', 'clarke quay', 'boat quay', 'raffles place', 'central region', 'downtown', '市中心', '市政区'],
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
  },
  KR: {
    SEOUL: ['seoul', '서울', '서울특별시', 'gangnam', '강남', 'jongno', '종로', 'mapo', 'yongsan', 'songpa', 'yeongdeungpo', 'kr-11'],
    BUSAN: ['busan', '부산', '부산광역시', 'haeundae', '해운대', 'seomyeon', '서면', 'dongnae', 'sasang', 'kr-26'],
    INCHEON: ['incheon', '인천', '인천광역시', 'songdo', '송도', 'yeonsu', '연수', 'bupyeong', '부평', 'namdong', 'kr-28'],
    DAEGU: ['daegu', '대구', '대구광역시', 'suseong', '수성', 'dalseo', 'jung-gu', 'dong-gu', 'kr-27']
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
    .replace(/[^a-z0-9\u3400-\u9fff\u0e00-\u0e7f\uac00-\ud7a3]+/g, ' ')
    .trim()
}
