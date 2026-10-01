import { beforeEach, describe, expect, it, vi } from 'vitest'
import { handleRequest } from '../src/index.js'
import { isValidCachedHit, resetAddressCacheForTests, writeCachedHit } from '../src/services/address/addressCache.js'
import { classifyGenerateFailure } from '../src/services/address/errors.js'
import { HttpError } from '../src/services/httpClient.js'
import { resetRateLimitForTests } from '../src/server/rateLimit.js'

const CA_NOMINATIM = {
  lat: '37.7749',
  lon: '-122.4194',
  display_name: '1 Market St, San Francisco, California, United States',
  address: {
    country_code: 'us',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    road: 'Market St',
    house_number: '1',
    postcode: '94105'
  }
}

function nominatimFetch (payload = CA_NOMINATIM) {
  return vi.fn().mockImplementation(() => Promise.resolve(
    new Response(JSON.stringify(payload), { status: 200 })
  ))
}

describe('generate cache and error classification', () => {
  beforeEach(() => {
    resetAddressCacheForTests()
    resetRateLimitForTests()
  })

  it('serves a validated cached address without calling Nominatim again', async () => {
    const fetchFn = nominatimFetch()

    const first = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const firstBody = await first.json()
    expect(first.status).toBe(200)
    expect(firstBody.fromCache).toBe(false)
    expect(fetchFn).toHaveBeenCalled()

    const second = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const secondBody = await second.json()
    expect(second.status).toBe(200)
    expect(secondBody.fromCache).toBe(true)
    expect(secondBody.address.fullAddress).toBe(firstBody.address.fullAddress)
    expect(fetchFn).toHaveBeenCalledTimes(1)
  })

  it('bypasses cached coordinates when refresh is requested', async () => {
    const fetchFn = nominatimFetch()

    await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const refreshed = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA&refresh=1'),
      { fetchFn }
    )
    const body = await refreshed.json()

    expect(refreshed.status).toBe(200)
    expect(body.fromCache).toBe(false)
    expect(fetchFn.mock.calls.length).toBeGreaterThan(1)
  })

  it('ignores cache entries from another region', async () => {
    await writeCachedHit({}, 'US', 'CA', {
      regionId: 'HK',
      subregionId: 'HKI',
      fullAddress: '遮打道, 中環, 香港',
      lat: 22.2819,
      lng: 114.1586
    })

    const fetchFn = nominatimFetch()
    const response = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.fromCache).toBe(false)
    expect(body.address.fullAddress).toContain('Market St')
    expect(fetchFn).toHaveBeenCalled()
  })

  it('rejects stale or incomplete cache entries', () => {
    expect(isValidCachedHit({
      lat: 37.7,
      lng: -122.4,
      address: { regionId: 'US', subregionId: 'CA', fullAddress: '1 Market St' },
      storedAt: Date.now() - (8 * 24 * 60 * 60 * 1000)
    }, 'US', 'CA')).toBe(false)

    expect(isValidCachedHit({
      lat: 37.7,
      lng: -122.4,
      address: { regionId: 'US', subregionId: 'CA' }
    }, 'US', 'CA')).toBe(false)
  })

  it('classifies Nominatim 429 as nominatim instead of the local limiter', () => {
    const classified = classifyGenerateFailure(new HttpError('Too many requests', {
      service: 'nominatim',
      status: 429,
      code: 'upstream_error'
    }), 'United States')

    expect(classified.code).toBe('nominatim')
    expect(classified.status).toBe(429)
  })

  it('rate-limits both the generate API and the HTML page', async () => {
    const fetchFn = nominatimFetch()

    for (let index = 0; index < 8; index += 1) {
      const response = await handleRequest(
        new Request('https://example.com/api/generate?region=US&subregion=CA'),
        { fetchFn }
      )
      expect(response.status).toBe(200)
    }

    const apiBlocked = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const apiBody = await apiBlocked.json()
    expect(apiBlocked.status).toBe(429)
    expect(apiBody.error.code).toBe('rate_limit')

    const pageBlocked = await handleRequest(
      new Request('https://example.com/?region=US&subregion=CA'),
      { fetchFn }
    )
    expect(pageBlocked.status).toBe(429)
    expect(await pageBlocked.text()).toContain('请求太频繁')
  })
})
