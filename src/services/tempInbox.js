import { slugify } from "./formatters.js"
import { rateLimitedFetch } from "./rateLimiter.js"

const MAIL_TM_API = "https://api.mail.tm"

export async function createTempInbox(fetchFn, hint = "address-user") {
  const domain = await getActiveDomain(fetchFn)
  let lastError = null

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const localPart = `${slugify(hint) || "address-user"}-${randomToken(6)}${attempt ? `-${attempt}` : ""}`
    const address = `${localPart}@${domain}`
    const password = `${randomToken(10)}!Aa9`

    try {
      await request(fetchFn, "/accounts", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ address, password })
      })

      const tokenResponse = await request(fetchFn, "/token", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ address, password })
      })

      return {
        provider: "mail.tm",
        providerUrl: "https://mail.tm",
        attributionUrl: "https://mail.tm",
        address,
        password,
        token: tokenResponse.token,
        createdAt: new Date().toISOString()
      }
    } catch (error) {
      lastError = error
      if (!String(error.message || error).toLowerCase().includes("address")) {
        break
      }
    }
  }

  throw lastError || new Error("Unable to create disposable inbox")
}

export async function listTempInboxMessages(fetchFn, token) {
  const data = await request(fetchFn, "/messages", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const messages = data["hydra:member"] || []

  return messages.map(message => ({
    id: message.id,
    from: message.from?.address || message.from?.name || "Unknown sender",
    subject: message.subject || "(No subject)",
    intro: message.intro || "",
    seen: Boolean(message.seen),
    hasAttachments: Boolean(message.hasAttachments),
    createdAt: message.createdAt || ""
  }))
}

export async function getTempInboxMessage(fetchFn, token, messageId) {
  const message = await request(fetchFn, `/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const textBody = Array.isArray(message.text)
    ? message.text.join("\n\n")
    : Array.isArray(message.html)
      ? message.html.join("\n\n")
      : message.text || message.html || message.intro || ""

  return {
    id: message.id,
    from: message.from?.address || message.from?.name || "Unknown sender",
    to: Array.isArray(message.to) ? message.to.map(item => item.address).join(", ") : "",
    subject: message.subject || "(No subject)",
    intro: message.intro || "",
    createdAt: message.createdAt || "",
    body: textBody,
    hasAttachments: Boolean(message.hasAttachments)
  }
}

async function getActiveDomain(fetchFn) {
  const data = await request(fetchFn, "/domains")
  const domains = data["hydra:member"] || []
  const domain = domains.find(item => item.isActive && !item.isPrivate)?.domain || domains.find(item => item.isActive)?.domain

  if (!domain) {
    throw new Error("No active mail.tm domain available")
  }

  return domain
}

async function request(fetchFn, path, init = {}) {
  const response = await rateLimitedFetch(fetchFn, `${MAIL_TM_API}${path}`, init)
  const text = await response.text()
  const data = text ? tryParseJson(text) : {}

  if (!response.ok) {
    const errorMessage = data?.detail || data?.message || `mail.tm request failed with ${response.status}`
    throw new Error(errorMessage)
  }

  return data
}

function tryParseJson(value) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}

function randomToken(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("")
}
