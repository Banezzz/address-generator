import { beforeEach, describe, expect, it, vi } from 'vitest'
import { handleRequest } from '../src/index.js'
import { resetAddressCacheForTests } from '../src/services/address/addressCache.js'
import { resetRateLimitForTests } from '../src/server/rateLimit.js'

describe('handleRequest', () => {
  beforeEach(() => {
    resetAddressCacheForTests()
    resetRateLimitForTests()
  })

  it('returns structured auth errors for inbox APIs', async () => {
    const response = await handleRequest(new Request('https://example.com/api/inbox/messages'))
    const body = await response.json()

    expect(response.status).toBe(401)
    expect(body.error.code).toBe('unauthorized')
    expect(body.error.message).toContain('Authorization')
    expect(typeof body.requestId).toBe('string')
  })

  it('keeps inbox tokens out of the URL and forwards them via headers', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      'hydra:member': []
    }), { status: 200 }))
    const response = await handleRequest(new Request('https://example.com/api/inbox/messages', {
      headers: {
        Authorization: 'Bearer inbox-token'
      }
    }), { fetchFn })
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(fetchFn).toHaveBeenCalledWith('https://api.mail.tm/messages', expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: 'Bearer inbox-token'
      })
    }))
    expect(fetchFn.mock.calls[0][0]).not.toContain('token=')
    expect(body.messages).toEqual([])
  })

  it('serves HTML with a strict CSP and external assets', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(JSON.stringify({
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
    }), { status: 200 }))

    const response = await handleRequest(new Request('https://example.com/?region=US&subregion=CA'), { fetchFn })
    const html = await response.text()
    const csp = response.headers.get('content-security-policy') || ''

    expect(response.status).toBe(200)
    expect(html).toMatch(/\/assets\/app\.[a-z0-9]+\.js/)
    expect(html).toMatch(/\/assets\/app\.[a-z0-9]+\.css/)
    expect(csp).not.toContain("'unsafe-inline'")
  })

  it('returns JSON from /api/generate with a mocked Nominatim response', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(JSON.stringify({
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
    }), { status: 200 }))

    const response = await handleRequest(
      new Request('https://example.com/api/generate?region=US&subregion=CA'),
      { fetchFn }
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.regionId).toBe('US')
    expect(body.subregionId).toBe('CA')
    expect(body.address.fullAddress).toContain('Market St')
    expect(body.profile.phone).toMatch(/^\+1/)
    expect(body.emailEntry.address).toContain('@placeholder.invalid')
    expect(fetchFn).toHaveBeenCalled()
  })

  it('rejects unknown regions instead of falling back to the United States', async () => {
    const pageResponse = await handleRequest(new Request('https://example.com/?region=ZZ'))
    const pageHtml = await pageResponse.text()
    expect(pageResponse.status).toBe(400)
    expect(pageHtml).toContain('未知地区')

    const apiResponse = await handleRequest(new Request('https://example.com/api/generate?region=ZZ'))
    const body = await apiResponse.json()
    expect(apiResponse.status).toBe(400)
    expect(body.error.code).toBe('unknown_region')
  })

  it('serves hashed asset paths and keeps unhashed aliases', async () => {
    const hashedJs = await handleRequest(new Request('https://example.com/assets/app.js'))
    const htmlResponse = await handleRequest(new Request('https://example.com/?region=ZZ'))
    const html = await htmlResponse.text()
    const hashedPath = html.match(/\/assets\/app\.[a-z0-9]+\.css/)?.[0]

    expect(hashedJs.status).toBe(200)
    expect(hashedJs.headers.get('content-type')).toContain('javascript')
    expect(hashedPath).toBeTruthy()

    const hashedCss = await handleRequest(new Request(`https://example.com${hashedPath}`))
    expect(hashedCss.status).toBe(200)
    expect(hashedCss.headers.get('cache-control')).toContain('immutable')
  })
})
