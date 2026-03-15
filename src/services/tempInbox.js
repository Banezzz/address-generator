import { slugify } from './formatters.js'
import { createMailTmClient } from './mailTmClient.js'

export async function createTempInbox ({
  fetchFn,
  hint = 'address-user',
  requestId,
  randomFn = Math.random
}) {
  const client = createMailTmClient({ fetchFn, requestId })
  const domain = await client.getActiveDomain()
  let lastError = null

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const localPart = `${slugify(hint) || 'address-user'}-${randomToken(6, randomFn)}${attempt ? `-${attempt}` : ''}`
    const address = `${localPart}@${domain}`
    const password = `${randomToken(10, randomFn)}!Aa9`

    try {
      await client.createAccount({
        address,
        password
      })

      const tokenResponse = await client.createToken({
        address,
        password
      })

      return {
        provider: 'mail.tm',
        providerUrl: 'https://mail.tm',
        attributionUrl: 'https://mail.tm',
        address,
        password,
        token: tokenResponse.token,
        createdAt: new Date().toISOString()
      }
    } catch (error) {
      lastError = error
      if (!String(error.message || error).toLowerCase().includes('address')) {
        break
      }
    }
  }

  throw lastError || new Error('Unable to create disposable inbox')
}

export async function listTempInboxMessages ({
  fetchFn,
  token,
  requestId
}) {
  const client = createMailTmClient({ fetchFn, requestId })
  return client.listMessages(token)
}

export async function getTempInboxMessage ({
  fetchFn,
  token,
  messageId,
  requestId
}) {
  const client = createMailTmClient({ fetchFn, requestId })
  return client.getMessage(token, messageId)
}

function randomToken (length, randomFn = Math.random) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => alphabet[Math.floor(randomFn() * alphabet.length)]).join('')
}
