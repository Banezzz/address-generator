import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createMailTmClient, clearMailTmDomainCache } from '../src/services/mailTmClient.js'
import { listTempInboxMessages } from '../src/services/tempInbox.js'

describe('tempInbox', () => {
  beforeEach(() => {
    clearMailTmDomainCache()
  })

  it('caches active domains for mail.tm', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      'hydra:member': [
        { domain: 'active.mail.tm', isActive: true, isPrivate: false }
      ]
    }), { status: 200 }))
    const client = createMailTmClient({
      fetchFn,
      now: () => 0
    })

    expect(await client.getActiveDomain()).toBe('active.mail.tm')
    expect(await client.getActiveDomain()).toBe('active.mail.tm')
    expect(fetchFn).toHaveBeenCalledTimes(1)
  })

  it('sends inbox tokens through the Authorization header', async () => {
    const fetchFn = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      'hydra:member': [
        {
          id: 'msg_1',
          from: { address: 'sender@example.com' },
          subject: 'Hello',
          intro: 'Preview',
          seen: false,
          hasAttachments: false,
          createdAt: '2026-03-15T00:00:00.000Z'
        }
      ]
    }), { status: 200 }))

    const messages = await listTempInboxMessages({
      fetchFn,
      token: 'secret-token',
      requestId: 'req_1'
    })

    expect(fetchFn).toHaveBeenCalledWith('https://api.mail.tm/messages', expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: 'Bearer secret-token'
      })
    }))
    expect(messages).toEqual([
      {
        id: 'msg_1',
        from: 'sender@example.com',
        subject: 'Hello',
        intro: 'Preview',
        seen: false,
        hasAttachments: false,
        createdAt: '2026-03-15T00:00:00.000Z'
      }
    ])
  })
})
