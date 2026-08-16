import { describe, expect, it } from 'vitest'
import { REGION_CONFIGS, getSubregionOptions } from '../src/config/regions.js'
import { getSeedCoordinates } from '../src/config/seeds.js'
import { REGION_ADDRESS_TIMEOUT_MS, REGION_JITTER } from '../src/services/address/constants.js'
import { formatAddressByRegion } from '../src/services/address/addressFormatter.js'
import { buildProfile } from '../src/services/profile.js'

describe('region coverage', () => {
  it('wires every published region with subregions, seeds, profile, and formatting', () => {
    expect(REGION_CONFIGS.map(region => region.id)).toEqual([
      'US',
      'US_TAX_FREE',
      'HK',
      'SG',
      'JP',
      'TW',
      'TH',
      'VN',
      'KR'
    ])

    for (const region of REGION_CONFIGS) {
      const subregions = getSubregionOptions(region.id)
      expect(subregions.length, `${region.id} should have subregions`).toBeGreaterThan(0)

      for (const subregion of subregions) {
        const seeds = getSeedCoordinates(region.id, subregion.id)
        expect(seeds.length, `${region.id}/${subregion.id} should have seeds`).toBeGreaterThan(0)
        expect(seeds[0]).toEqual(expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number)
        }))
      }

      const profile = buildProfile({
        regionId: region.id,
        subregionId: subregions[0].id
      })
      expect(profile.phone).toMatch(/^\+/)
      expect(profile.fullNameLatin).toBeTruthy()
      expect(profile.fullNameNative).toBeTruthy()

      const formatted = formatAddressByRegion(region.id, {
        street: '1 Example Street',
        locality: 'Example Locality',
        district: 'Example District',
        admin: 'Example Admin',
        postalCode: '12345',
        country: region.label,
        subregionLabel: subregions[0].label,
        subregionId: subregions[0].id
      })
      expect(formatted).toContain('1 Example Street')
    }
  })

  it('gives Korea a timeout and jitter like the other dense Asian cities', () => {
    expect(REGION_ADDRESS_TIMEOUT_MS.KR).toBe(25000)
    expect(REGION_JITTER.KR).toBe(0.015)
  })
})
