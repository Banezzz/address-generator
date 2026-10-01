import { buildGeneratedResult } from '../../services/generateResult.js'
import { GenerateError } from '../../services/address/errors.js'
import { readClientIp } from '../clientIp.js'
import { jsonResponse } from '../response.js'
import { consumeGenerateRateLimit } from '../rateLimit.js'

export async function handleGenerate (context) {
  const rate = await consumeGenerateRateLimit(context.env, readClientIp(context.request))
  if (!rate.allowed) {
    throw new GenerateError('rate_limit', 'Too many generate requests. Try again in a minute.', {
      status: 429,
      details: {
        retryAfterSeconds: rate.retryAfterSeconds
      }
    })
  }

  const regionId = context.url.searchParams.get('region') || 'US'
  const requestedSubregion = context.url.searchParams.get('subregion') || ''
  const forceRefresh = context.url.searchParams.has('refresh')
  const result = await buildGeneratedResult({
    regionId,
    subregionId: requestedSubregion,
    fetchFn: context.fetchFn,
    requestId: context.requestId,
    env: context.env,
    forceRefresh,
    logger: console
  })

  return jsonResponse({
    requestId: context.requestId,
    ok: true,
    fromCache: result.fromCache,
    regionId: result.regionId,
    subregionId: result.subregionId,
    regionLabel: result.regionConfig.label,
    regionNativeLabel: result.regionConfig.nativeLabel,
    adminLabel: result.regionConfig.adminLabel,
    adminLabelNative: result.regionConfig.adminLabelNative,
    postalLabel: result.regionConfig.postalLabel,
    postalLabelNative: result.regionConfig.postalLabelNative,
    address: result.address,
    profile: result.profile,
    emailEntry: result.emailEntry
  }, 200, {
    'x-ratelimit-remaining': String(rate.remaining)
  })
}
