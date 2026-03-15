import { describe, expect, it, vi } from 'vitest'
import { handleRequest } from '../src/index.js'

describe('handleRequest', () => {
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
    expect(html).toContain('/assets/app.js')
    expect(html).toContain('/assets/app.css')
    expect(csp).not.toContain("'unsafe-inline'")
  })
})
