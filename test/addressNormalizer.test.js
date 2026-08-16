import { describe, expect, it } from 'vitest'
import { getRegionConfig } from '../src/config/regions.js'
import { normalizeGeocodeResult } from '../src/services/address/addressNormalizer.js'
import { formatAddressByRegion } from '../src/services/address/addressFormatter.js'

describe('normalizeGeocodeResult', () => {
  it('accepts Hong Kong results that OSM tags as China', () => {
    const result = normalizeGeocodeResult({
      regionId: 'HK',
      regionConfig: getRegionConfig('HK'),
      subregionId: 'HKI',
      location: { lat: 22.2819, lng: 114.1586 },
      stage: 'relaxed',
      data: {
        lat: '22.2819',
        lon: '114.1586',
        display_name: '中環, 遮打道, 中西區, 香港島, 香港, 中国',
        address: {
          country_code: 'cn',
          country: '中国',
          region: '香港',
          city: '香港',
          city_district: '香港島',
          suburb: '中環',
          road: '遮打道'
        }
      }
    })

    expect(result).not.toBeNull()
    expect(result.country).toBe('中国')
    expect(result.street).toBe('遮打道')
  })

  it('rejects a China result that is not Hong Kong', () => {
    const result = normalizeGeocodeResult({
      regionId: 'HK',
      regionConfig: getRegionConfig('HK'),
      subregionId: 'HKI',
      location: { lat: 31.23, lng: 121.47 },
      stage: 'relaxed',
      data: {
        lat: '31.23',
        lon: '121.47',
        display_name: 'Nanjing Road, Huangpu, Shanghai, China',
        address: {
          country_code: 'cn',
          country: 'China',
          city: 'Shanghai',
          road: 'Nanjing Road'
        }
      }
    })

    expect(result).toBeNull()
  })

  it('recovers Japanese prefecture from ISO3166 when state is missing', () => {
    const result = normalizeGeocodeResult({
      regionId: 'JP',
      regionConfig: getRegionConfig('JP'),
      subregionId: 'TOKYO',
      location: { lat: 35.6595, lng: 139.7005 },
      stage: 'strict',
      data: {
        lat: '35.6595',
        lon: '139.7005',
        display_name: '神宮通り, 渋谷区, 東京都, 150-0043, 日本',
        address: {
          country_code: 'jp',
          country: '日本',
          city: '渋谷区',
          road: '神宮通り',
          postcode: '150-0043',
          'ISO3166-2-lvl4': 'JP-13'
        }
      }
    })

    expect(result).not.toBeNull()
    expect(result.admin).toBe('東京都')
    expect(result.city).toBe('渋谷区')
  })

  it('uses city as Thai admin when province fields are absent', () => {
    const result = normalizeGeocodeResult({
      regionId: 'TH',
      regionConfig: getRegionConfig('TH'),
      subregionId: 'BANGKOK',
      location: { lat: 13.7308, lng: 100.5418 },
      stage: 'relaxed',
      data: {
        lat: '13.7308',
        lon: '100.5418',
        display_name: 'แขวงลุมพินี, เขตปทุมวัน, กรุงเทพมหานคร, 10330, ประเทศไทย',
        address: {
          country_code: 'th',
          country: 'ประเทศไทย',
          city: 'กรุงเทพมหานคร',
          suburb: 'เขตปทุมวัน',
          road: 'Wireless Road',
          postcode: '10330'
        }
      }
    })

    expect(result).not.toBeNull()
    expect(result.admin).toBe('กรุงเทพมหานคร')
    expect(result.district).toBe('เขตปทุมวัน')
  })

  it('normalizes Korean metro-city addresses from borough and city fields', () => {
    const result = normalizeGeocodeResult({
      regionId: 'KR',
      regionConfig: getRegionConfig('KR'),
      subregionId: 'SEOUL',
      location: { lat: 37.4979, lng: 127.0276 },
      stage: 'strict',
      data: {
        lat: '37.4979',
        lon: '127.0276',
        display_name: '서초대로, 역삼1동, 강남구, 서울특별시, 06620, 대한민국',
        address: {
          country_code: 'kr',
          country: '대한민국',
          city: '서울특별시',
          borough: '강남구',
          suburb: '역삼1동',
          road: '서초대로',
          postcode: '06620',
          'ISO3166-2-lvl4': 'KR-11'
        }
      }
    })

    expect(result).not.toBeNull()
    expect(result.admin).toBe('서울특별시')
    expect(result.district).toBe('강남구')
    expect(result.city).toBe('역삼1동')
    expect(result.postalCode).toBe('06620')
    expect(result.fullAddress).toContain('서초대로')
    expect(result.fullAddress).toContain('강남구')
    expect(result.fullAddress).toContain('서울특별시')
  })
})

describe('formatAddressByRegion', () => {
  it('formats Korean addresses as street, district, city, postal, country', () => {
    expect(formatAddressByRegion('KR', {
      street: '110 Sejong-daero',
      locality: 'Myeong-dong',
      district: 'Jung-gu',
      admin: 'Seoul',
      postalCode: '04520',
      country: 'South Korea'
    })).toBe('110 Sejong-daero, Jung-gu, Seoul, 04520, South Korea')
  })
})
