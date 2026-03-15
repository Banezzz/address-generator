export function mapMailboxSummary (message) {
  return {
    id: message.id,
    from: message.from?.address || message.from?.name || 'Unknown sender',
    subject: message.subject || '(No subject)',
    intro: message.intro || '',
    seen: Boolean(message.seen),
    hasAttachments: Boolean(message.hasAttachments),
    createdAt: message.createdAt || ''
  }
}

export function mapMailboxDetail (message) {
  return {
    id: message.id,
    from: message.from?.address || message.from?.name || 'Unknown sender',
    to: Array.isArray(message.to) ? message.to.map(item => item.address).join(', ') : '',
    subject: message.subject || '(No subject)',
    intro: message.intro || '',
    createdAt: message.createdAt || '',
    body: resolveMessageBody(message),
    hasAttachments: Boolean(message.hasAttachments)
  }
}

function resolveMessageBody (message) {
  if (Array.isArray(message.text)) {
    return message.text.join('\n\n')
  }

  if (Array.isArray(message.html)) {
    return message.html.join('\n\n')
  }

  return message.text || message.html || message.intro || ''
}
