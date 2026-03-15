import { createTempInbox, getTempInboxMessage, listTempInboxMessages } from '../../services/tempInbox.js'
import { badRequest, jsonResponse, readBearerToken, readJsonBody, unauthorized } from '../response.js'

export async function handleCreateInbox (context) {
  const body = await readJsonBody(context.request)
  const inbox = await createTempInbox({
    fetchFn: context.fetchFn,
    hint: body.hint || 'address-user',
    requestId: context.requestId
  })

  return jsonResponse({
    ...inbox,
    requestId: context.requestId
  })
}

export async function handleListInboxMessages (context) {
  const token = readBearerToken(context.request)
  if (!token) {
    return unauthorized(context.requestId)
  }

  const messages = await listTempInboxMessages({
    fetchFn: context.fetchFn,
    token,
    requestId: context.requestId
  })

  return jsonResponse({
    requestId: context.requestId,
    messages
  })
}

export async function handleGetInboxMessage (context) {
  const token = readBearerToken(context.request)
  const id = context.url.searchParams.get('id') || ''

  if (!token) {
    return unauthorized(context.requestId)
  }

  if (!id) {
    return badRequest(context.requestId, 'Missing message id')
  }

  const message = await getTempInboxMessage({
    fetchFn: context.fetchFn,
    token,
    messageId: id,
    requestId: context.requestId
  })

  return jsonResponse({
    requestId: context.requestId,
    message
  })
}
