import { getSubregionOptions, REGION_MAP, US_STATE_MAP } from '../config/regions.js'
import { stripDiacritics } from './formatters.js'

const US_NAMES = [
  { given: 'Seth', family: 'Kling', gender: 'Male' },
  { given: 'Avery', family: 'Monroe', gender: 'Female' },
  { given: 'Jordan', family: 'Parker', gender: 'Male' },
  { given: 'Natalie', family: 'Brooks', gender: 'Female' },
  { given: 'Miles', family: 'Bennett', gender: 'Male' },
  { given: 'Claire', family: 'Dawson', gender: 'Female' }
]

const HK_NAMES = [
  { nativeFamily: '陳', nativeGiven: '嘉欣', latinGiven: 'Carmen', latinFamily: 'Chan', gender: 'Female' },
  { nativeFamily: '黃', nativeGiven: '子軒', latinGiven: 'Ryan', latinFamily: 'Wong', gender: 'Male' },
  { nativeFamily: '李', nativeGiven: '詠恩', latinGiven: 'Eunice', latinFamily: 'Lee', gender: 'Female' },
  { nativeFamily: '林', nativeGiven: '俊熙', latinGiven: 'Jason', latinFamily: 'Lam', gender: 'Male' }
]

const SG_NAMES = [
  { nativeFamily: '陈', nativeGiven: '芷晴', latinGiven: 'Ashley', latinFamily: 'Tan', gender: 'Female' },
  { nativeFamily: '林', nativeGiven: '伟杰', latinGiven: 'Ethan', latinFamily: 'Lim', gender: 'Male' },
  { nativeFamily: '王', nativeGiven: '欣怡', latinGiven: 'Chloe', latinFamily: 'Ong', gender: 'Female' },
  { nativeFamily: '许', nativeGiven: '俊豪', latinGiven: 'Marcus', latinFamily: 'Goh', gender: 'Male' }
]

const JP_NAMES = [
  { nativeFamily: '佐藤', nativeGiven: '美咲', latinGiven: 'Misaki', latinFamily: 'Sato', gender: 'Female' },
  { nativeFamily: '高橋', nativeGiven: '蓮', latinGiven: 'Ren', latinFamily: 'Takahashi', gender: 'Male' },
  { nativeFamily: '山田', nativeGiven: '陽菜', latinGiven: 'Hina', latinFamily: 'Yamada', gender: 'Female' },
  { nativeFamily: '伊藤', nativeGiven: '大翔', latinGiven: 'Haruto', latinFamily: 'Ito', gender: 'Male' }
]

const TW_NAMES = [
  { nativeFamily: '林', nativeGiven: '語彤', latinGiven: 'Yu-Tung', latinFamily: 'Lin', gender: 'Female' },
  { nativeFamily: '陳', nativeGiven: '冠廷', latinGiven: 'Kuan-Ting', latinFamily: 'Chen', gender: 'Male' },
  { nativeFamily: '張', nativeGiven: '宥晴', latinGiven: 'Yu-Ching', latinFamily: 'Chang', gender: 'Female' },
  { nativeFamily: '王', nativeGiven: '柏翰', latinGiven: 'Po-Han', latinFamily: 'Wang', gender: 'Male' }
]

const TH_NAMES = [
  { nativeFamily: 'ชัยวัฒน์', nativeGiven: 'นรินทร์', latinGiven: 'Narin', latinFamily: 'Chaiwat', gender: 'Male' },
  { nativeFamily: 'ศรีสุข', nativeGiven: 'พิมพ์ชนก', latinGiven: 'Pimchanok', latinFamily: 'Srisuk', gender: 'Female' },
  { nativeFamily: 'บุญมี', nativeGiven: 'ธีรภัทร', latinGiven: 'Teerapat', latinFamily: 'Boonmee', gender: 'Male' },
  { nativeFamily: 'อินทร์แก้ว', nativeGiven: 'กมลชนก', latinGiven: 'Kamonchanok', latinFamily: 'Intakaew', gender: 'Female' }
]

const VN_NAMES = [
  { nativeFamily: 'Nguyễn', nativeGiven: 'Minh Anh', latinGiven: 'Minh Anh', latinFamily: 'Nguyen', gender: 'Female' },
  { nativeFamily: 'Trần', nativeGiven: 'Quốc Bảo', latinGiven: 'Quoc Bao', latinFamily: 'Tran', gender: 'Male' },
  { nativeFamily: 'Lê', nativeGiven: 'Khánh Linh', latinGiven: 'Khanh Linh', latinFamily: 'Le', gender: 'Female' },
  { nativeFamily: 'Phạm', nativeGiven: 'Gia Huy', latinGiven: 'Gia Huy', latinFamily: 'Pham', gender: 'Male' }
]

const NAME_BUCKET_MAP = new Map([
  ['US', US_NAMES],
  ['US_TAX_FREE', US_NAMES],
  ['HK', HK_NAMES],
  ['SG', SG_NAMES],
  ['JP', JP_NAMES],
  ['TW', TW_NAMES],
  ['TH', TH_NAMES],
  ['VN', VN_NAMES]
])

const US_AREA_CODES = {
  AL: ['205', '251', '256', '334', '938'],
  AK: ['907'],
  AZ: ['480', '520', '602', '623', '928'],
  AR: ['479', '501', '870'],
  CA: ['209', '213', '310', '323', '408', '415', '424', '510', '530', '559', '562', '619', '626', '650', '661', '707', '714', '760', '805', '818', '831', '858', '909', '916', '925', '949'],
  CO: ['303', '719', '720', '970'],
  CT: ['203', '475', '860', '959'],
  DE: ['302'],
  FL: ['239', '305', '321', '352', '386', '407', '561', '727', '754', '772', '786', '813', '850', '863', '904', '941', '954'],
  GA: ['229', '404', '470', '478', '678', '706', '762', '770', '912'],
  HI: ['808'],
  ID: ['208', '986'],
  IL: ['217', '224', '309', '312', '331', '618', '630', '708', '773', '779', '815', '847', '872'],
  IN: ['219', '260', '317', '463', '574', '765', '812', '930'],
  IA: ['319', '515', '563', '641', '712'],
  KS: ['316', '620', '785', '913'],
  KY: ['270', '364', '502', '606', '859'],
  LA: ['225', '318', '337', '504', '985'],
  ME: ['207'],
  MD: ['240', '301', '410', '443', '667'],
  MA: ['339', '351', '413', '508', '617', '774', '781', '857', '978'],
  MI: ['231', '248', '269', '313', '517', '586', '616', '734', '810', '906', '947', '989'],
  MN: ['218', '320', '507', '612', '651', '763', '952'],
  MS: ['228', '601', '662', '769'],
  MO: ['314', '417', '573', '636', '660', '816', '975'],
  MT: ['406'],
  NE: ['308', '402', '531'],
  NV: ['702', '725', '775'],
  NH: ['603'],
  NJ: ['201', '551', '609', '732', '848', '856', '862', '908', '973'],
  NM: ['505', '575'],
  NY: ['212', '315', '332', '347', '516', '518', '585', '607', '631', '646', '680', '716', '718', '838', '845', '914', '917', '929', '934'],
  NC: ['252', '336', '704', '743', '828', '910', '919', '980', '984'],
  ND: ['701'],
  OH: ['216', '234', '283', '330', '380', '419', '440', '513', '567', '614', '740', '937'],
  OK: ['405', '539', '580', '918'],
  OR: ['458', '503', '541', '971'],
  PA: ['215', '267', '272', '412', '484', '570', '610', '717', '724', '814', '835', '878'],
  RI: ['401'],
  SC: ['803', '839', '843', '854', '864'],
  SD: ['605'],
  TN: ['423', '615', '629', '731', '865', '901', '931'],
  TX: ['210', '214', '254', '281', '325', '346', '409', '430', '432', '469', '512', '682', '713', '737', '806', '817', '830', '832', '903', '915', '936', '940', '956', '972', '979'],
  UT: ['385', '435', '801'],
  VT: ['802'],
  VA: ['276', '434', '540', '571', '703', '757', '804'],
  WA: ['206', '253', '360', '425', '509'],
  WV: ['304', '681'],
  WI: ['262', '414', '534', '608', '715', '920'],
  WY: ['307']
}

const REGION_PHONE_RULES = {
  HK: {
    prefixes: {
      HKI: ['5', '6', '9'],
      KLN: ['5', '6', '9'],
      NT: ['5', '6', '9']
    },
    build (prefix) {
      return `+852 ${prefix}${randomDigits(3)} ${randomDigits(4)}`
    }
  },
  SG: {
    prefixes: {
      CENTRAL: ['8', '9'],
      QUEENSTOWN: ['8', '9'],
      JURONG_EAST: ['8', '9'],
      TAMPINES: ['8', '9']
    },
    build (prefix) {
      return `+65 ${prefix}${randomDigits(3)} ${randomDigits(4)}`
    }
  },
  JP: {
    prefixes: {
      TOKYO: ['3'],
      OSAKA: ['6'],
      YOKOHAMA: ['45'],
      FUKUOKA: ['92']
    },
    build (prefix) {
      return prefix.length === 1
        ? `+81 ${prefix}-${randomDigits(4)}-${randomDigits(4)}`
        : `+81 ${prefix}-${randomDigits(3)}-${randomDigits(4)}`
    }
  },
  TW: {
    prefixes: {
      TAIPEI: ['2'],
      TAICHUNG: ['4'],
      TAINAN: ['6'],
      KAOHSIUNG: ['7']
    },
    build (prefix) {
      return `+886 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`
    }
  },
  TH: {
    prefixes: {
      BANGKOK: ['2'],
      CHIANG_MAI: ['53'],
      PHUKET: ['76'],
      CHONBURI: ['38']
    },
    build (prefix) {
      return prefix.length === 1
        ? `+66 ${prefix} ${randomDigits(3)} ${randomDigits(4)}`
        : `+66 ${prefix} ${randomDigits(3)} ${randomDigits(3)}`
    }
  },
  VN: {
    prefixes: {
      HCMC: ['28'],
      HANOI: ['24'],
      DANANG: ['236'],
      CANTHO: ['292']
    },
    build (prefix) {
      return prefix.length === 2
        ? `+84 ${prefix} ${randomDigits(4)} ${randomDigits(4)}`
        : `+84 ${prefix} ${randomDigits(3)} ${randomDigits(4)}`
    }
  }
}

export function buildProfile ({ regionId, subregionId }) {
  const regionConfig = REGION_MAP.get(regionId)
  const person = pickPerson(regionId)
  const phoneDetails = buildPhone(regionId, subregionId)

  return {
    regionId,
    regionLabel: regionConfig?.label || regionId,
    familyNameNative: person.nativeFamily || person.family || person.latinFamily,
    givenNameNative: person.nativeGiven || person.given || person.latinGiven,
    familyNameLatin: person.latinFamily || person.family || stripDiacritics(person.nativeFamily || ''),
    givenNameLatin: person.latinGiven || person.given || stripDiacritics(person.nativeGiven || ''),
    fullNameNative: buildFullName(regionId, person, true),
    fullNameLatin: buildFullName(regionId, person, false),
    gender: person.gender,
    phone: phoneDetails.phone,
    phonePrefix: phoneDetails.prefix,
    phoneExplanation: phoneDetails.explanation,
    phoneCopyValue: phoneDetails.phone
  }
}

function pickPerson (regionId) {
  const bucket = NAME_BUCKET_MAP.get(regionId) || VN_NAMES
  return bucket[Math.floor(Math.random() * bucket.length)]
}

function buildFullName (regionId, person, native) {
  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    return `${person.given} ${person.family}`
  }

  if (native) {
    return `${person.nativeFamily}${regionId === 'JP' || regionId === 'HK' || regionId === 'TW' || regionId === 'SG' ? '' : ' '}${person.nativeGiven}`.trim()
  }

  return `${person.latinGiven} ${person.latinFamily}`.trim()
}

function buildPhone (regionId, subregionId) {
  if (regionId === 'US' || regionId === 'US_TAX_FREE') {
    const prefixes = US_AREA_CODES[subregionId] || ['202']
    const prefix = pick(prefixes)
    const stateName = US_STATE_MAP.get(subregionId)?.full || subregionId
    const exchange = String(Math.floor(200 + Math.random() * 700)).padStart(3, '0')
    const line = randomDigits(4)
    const phone = `+1 (${prefix}) ${exchange}-${line}`

    return {
      prefix,
      phone,
      explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${stateName} so phone numbers look authentic in sign-up forms.`
    }
  }

  const rule = REGION_PHONE_RULES[regionId]
  const prefixes = rule.prefixes[subregionId] || Object.values(rule.prefixes).flat()
  const prefix = pick(prefixes)
  const areaLabel = getSubregionOptions(regionId).find(option => option.id === subregionId)?.label?.split('/')[0]?.trim() || subregionId
  const phone = rule.build(prefix)

  return {
    prefix,
    phone,
    explanation: `Do the phone numbers match the region? Yes. We choose prefixes from ${areaLabel} so phone numbers look authentic in sign-up forms.`
  }
}

function pick (values) {
  return values[Math.floor(Math.random() * values.length)]
}

function randomDigits (length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}
