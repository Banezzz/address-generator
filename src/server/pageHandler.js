import { hasRegion } from '../regions/index.js'
import { GenerateError } from '../services/address/errors.js'
import { buildGeneratedResult } from '../services/generateResult.js'
import { readClientIp } from './clientIp.js'
import { consumeGenerateRateLimit } from './rateLimit.js'
import { htmlResponse } from './response.js'
import { renderApp, renderErrorPage } from '../ui/template.js'

export async function handlePageRequest (context) {
  const requestedRegion = context.url.searchParams.get('region') || ''
  const requestedSubregion = context.url.searchParams.get('subregion') || ''
  const forceRefresh = context.url.searchParams.has('refresh')

  if (requestedRegion && !hasRegion(requestedRegion)) {
    return htmlResponse(renderErrorPage({
      regionId: requestedRegion,
      subregionId: requestedSubregion,
      code: 'unknown_region'
    }), 400)
  }

  const rate = await consumeGenerateRateLimit(context.env, readClientIp(context.request))
  if (!rate.allowed) {
    return htmlResponse(renderErrorPage({
      regionId: requestedRegion || 'US',
      subregionId: requestedSubregion,
      code: 'rate_limit'
    }), 429)
  }

  const regionId = requestedRegion || 'US'

  try {
    const result = await buildGeneratedResult({
      regionId,
      subregionId: requestedSubregion,
      fetchFn: context.fetchFn,
      requestId: context.requestId,
      env: context.env,
      forceRefresh,
      logger: console
    })

    return htmlResponse(renderApp(result))
  } catch (error) {
    const classified = error instanceof GenerateError
      ? error
      : new GenerateError('unknown', error?.message || 'Address generation failed', { status: 500 })

    context.log?.('error', 'Address generation failed', {
      requestId: context.requestId,
      regionId,
      subregionId: requestedSubregion,
      code: classified.code,
      error
    })

    return htmlResponse(renderErrorPage({
      regionId,
      subregionId: requestedSubregion,
      code: classified.code
    }), classified.status || 500)
  }
}
