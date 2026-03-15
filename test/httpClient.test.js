import { describe, expect, it, vi } from 'vitest'
import { createHttpClient } from '../src/services/httpClient.js'

describe('httpClient', () => {
  it('enforces real request timeouts', async () => {
    const fetchFn = vi.fn((_url, init) => {
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(new Error('aborted')))
      })
    })
    const client = createHttpClient({ fetchFn })

    await expect(client.request('https://example.com/slow', {
      service: 'slow-service',
      timeoutMs: 10
    })).rejects.toMatchObject({
      code: 'timeout',
      status: 504
    })
  })

  it('retries retryable upstream statuses and returns parsed JSON', async () => {
    const fetchFn = vi.fn()
      .mockResolvedValueOnce(new Response('rate limited', { status: 429 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      }))
    const client = createHttpClient({
      fetchFn,
      wait: async () => {}
    })

    const data = await client.requestJson('https://example.com/retry', {
      service: 'retry-service',
      retries: 1,
      retryOnStatuses: [429]
    })

    expect(data).toEqual({ ok: true })
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })
})
