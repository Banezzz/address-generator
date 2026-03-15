import { handleCreateInbox, handleGetInboxMessage, handleListInboxMessages } from './api/inbox.js'
import { handleApiError, methodNotAllowed, notFound } from './response.js'

const ROUTES = {
  '/api/inbox/create': {
    POST: handleCreateInbox
  },
  '/api/inbox/messages': {
    GET: handleListInboxMessages
  },
  '/api/inbox/message': {
    GET: handleGetInboxMessage
  }
}

export async function handleApiRequest (context) {
  const route = ROUTES[context.url.pathname]
  if (!route) {
    return notFound(context.requestId)
  }

  const handler = route[context.request.method]
  if (!handler) {
    return methodNotAllowed(context.requestId, Object.keys(route))
  }

  try {
    return await handler(context)
  } catch (error) {
    context.log?.('error', 'API request failed', {
      requestId: context.requestId,
      path: context.url.pathname,
      error
    })
    return handleApiError(error, context.requestId)
  }
}
