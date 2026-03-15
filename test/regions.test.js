import { describe, it, expect } from 'vitest'
import {
  US_STATES,
  TAX_FREE_STATE_CODES,
  HK_ZONES,
  SG_AREAS,
  JP_AREAS,
  TW_AREAS,
  TH_AREAS,
  VN_AREAS,
  REGION_CONFIGS,
  REGION_MAP,
  US_STATE_MAP,
  getRegionConfig,
  getRegionOptions,
  getSubregionOptions,
  resolveSubregion
} from '../src/config/regions.js'

describe('US_STATES', () => {
  it('should have 50 states', () => {
    expect(US_STATES).toHaveLength(50)
  })

  it('should have full name and abbreviation', () => {
    expect(US_STATES[0]).toHaveProperty('full')
    expect(US_STATES[0]).toHaveProperty('abbr')
  })
})

describe('TAX_FREE_STATE_CODES', () => {
  it('should have 5 tax-free states', () => {
    expect(TAX_FREE_STATE_CODES).toHaveLength(5)
  })

  it('should include known tax-free states', () => {
    expect(TAX_FREE_STATE_CODES).toContain('DE')
    expect(TAX_FREE_STATE_CODES).toContain('MT')
    expect(TAX_FREE_STATE_CODES).toContain('OR')
    expect(TAX_FREE_STATE_CODES).toContain('NH')
    expect(TAX_FREE_STATE_CODES).toContain('AK')
  })
})

describe('Region configs', () => {
  it('HK_ZONES should have 3 zones', () => {
    expect(HK_ZONES).toHaveLength(3)
  })

  it('SG_AREAS should have 4 areas', () => {
    expect(SG_AREAS).toHaveLength(4)
  })

  it('JP_AREAS should have 4 areas', () => {
    expect(JP_AREAS).toHaveLength(4)
  })

  it('TW_AREAS should have 4 areas', () => {
    expect(TW_AREAS).toHaveLength(4)
  })

  it('TH_AREAS should have 4 areas', () => {
    expect(TH_AREAS).toHaveLength(4)
  })

  it('VN_AREAS should have 4 areas', () => {
    expect(VN_AREAS).toHaveLength(4)
  })
})

describe('REGION_CONFIGS', () => {
  it('should have 8 regions', () => {
    expect(REGION_CONFIGS).toHaveLength(8)
  })

  it('should have required properties', () => {
    for (const config of REGION_CONFIGS) {
      expect(config).toHaveProperty('id')
      expect(config).toHaveProperty('label')
      expect(config).toHaveProperty('nativeLabel')
      expect(config).toHaveProperty('countryCode')
    }
  })
})

describe('REGION_MAP', () => {
  it('should be a Map with 8 entries', () => {
    expect(REGION_MAP).toBeInstanceOf(Map)
    expect(REGION_MAP.size).toBe(8)
  })

  it('should contain US config', () => {
    expect(REGION_MAP.has('US')).toBe(true)
    expect(REGION_MAP.get('US').label).toBe('United States')
  })
})

describe('US_STATE_MAP', () => {
  it('should be a Map with 50 entries', () => {
    expect(US_STATE_MAP).toBeInstanceOf(Map)
    expect(US_STATE_MAP.size).toBe(50)
  })
})

describe('getRegionConfig', () => {
  it('should return config for valid region', () => {
    const config = getRegionConfig('JP')
    expect(config.id).toBe('JP')
    expect(config.label).toBe('Japan')
  })

  it('should return US config for unknown region', () => {
    const config = getRegionConfig('UNKNOWN')
    expect(config.id).toBe('US')
  })

  it('should return US config for undefined', () => {
    const config = getRegionConfig()
    expect(config.id).toBe('US')
  })
})

describe('getRegionOptions', () => {
  it('should return all region configs', () => {
    const options = getRegionOptions()
    expect(options).toHaveLength(8)
  })
})

describe('getSubregionOptions', () => {
  it('should return 50 states for US', () => {
    const options = getSubregionOptions('US')
    expect(options).toHaveLength(50)
  })

  it('should return 5 states for US_TAX_FREE', () => {
    const options = getSubregionOptions('US_TAX_FREE')
    expect(options).toHaveLength(5)
    const ids = options.map(o => o.id)
    expect(ids).toEqual(expect.arrayContaining(['AK', 'DE', 'MT', 'NH', 'OR']))
  })

  it('should return HK zones for HK', () => {
    const options = getSubregionOptions('HK')
    expect(options).toEqual(HK_ZONES)
  })

  it('should return SG areas for SG', () => {
    const options = getSubregionOptions('SG')
    expect(options).toEqual(SG_AREAS)
  })

  it('should return empty array for unknown region', () => {
    const options = getSubregionOptions('UNKNOWN')
    expect(options).toEqual([])
  })
})

describe('resolveSubregion', () => {
  it('should return valid subregion if provided', () => {
    const result = resolveSubregion('US', 'CA')
    expect(result).toBe('CA')
  })

  it('should return random subregion if invalid provided', () => {
    const result = resolveSubregion('US', 'INVALID')
    expect(US_STATE_MAP.has(result)).toBe(true)
  })

  it('should return random subregion if none provided', () => {
    const result = resolveSubregion('US')
    expect(US_STATE_MAP.has(result)).toBe(true)
  })

  it('should return null for unknown region', () => {
    const result = resolveSubregion('UNKNOWN')
    expect(result).toBeNull()
  })

  it('should return tax-free state for US_TAX_FREE', () => {
    const result = resolveSubregion('US_TAX_FREE', 'DE')
    expect(result).toBe('DE')
  })
})
