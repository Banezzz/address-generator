import { describe, expect, it } from 'vitest'
import { matchesSelectedSubregion } from '../src/services/address/regionMatchers.js'

describe('matchesSelectedSubregion', () => {
  it('matches US states explicitly instead of relying on seeds', () => {
    expect(matchesSelectedSubregion({
      regionId: 'US',
      subregionId: 'CA',
      address: {
        state: 'California'
      },
      data: {
        display_name: 'Los Angeles, California, United States'
      }
    })).toBe(true)

    expect(matchesSelectedSubregion({
      regionId: 'US',
      subregionId: 'NV',
      address: {
        state: 'California'
      },
      data: {
        display_name: 'Los Angeles, California, United States'
      }
    })).toBe(false)
  })

  it('uses explicit keyword rules for Japan areas', () => {
    expect(matchesSelectedSubregion({
      regionId: 'JP',
      subregionId: 'TOKYO',
      address: {
        city: 'Shibuya',
        state: 'Tokyo'
      },
      data: {
        display_name: 'Shibuya, Tokyo, Japan'
      }
    })).toBe(true)

    expect(matchesSelectedSubregion({
      regionId: 'JP',
      subregionId: 'OSAKA',
      address: {
        city: 'Shibuya',
        state: 'Tokyo'
      },
      data: {
        display_name: 'Shibuya, Tokyo, Japan'
      }
    })).toBe(false)
  })

  it('normalizes accented text when matching Vietnam areas', () => {
    expect(matchesSelectedSubregion({
      regionId: 'VN',
      subregionId: 'DANANG',
      address: {
        city: 'Đà Nẵng'
      },
      data: {
        display_name: 'Hải Châu, Đà Nẵng, Việt Nam'
      }
    })).toBe(true)
  })
})
