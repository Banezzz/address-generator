import { getRegionConfig, resolveSubregion } from '../config/regions.js'
import { buildEmailEntry } from '../services/email.js'
import { buildProfile } from '../services/profile.js'
import { generateAddress } from '../services/address.js'
import { htmlResponse } from './response.js'
import { renderApp, renderErrorPage } from '../ui/template.js'

export async function handlePageRequest (context) {
  const regionId = context.url.searchParams.get('region') || 'US'
  const requestedSubregion = context.url.searchParams.get('subregion') || ''
  const regionConfig = getRegionConfig(regionId)
  const subregionId = resolveSubregion(regionConfig.id, requestedSubregion)

  try {
    const address = await generateAddress({
      fetchFn: context.fetchFn,
      regionId: regionConfig.id,
      subregionId,
      requestId: context.requestId,
      logger: console
    })

    const profile = buildProfile({
      regionId: regionConfig.id,
      subregionId
    })
    const emailEntry = buildEmailEntry(profile, regionConfig)

    return htmlResponse(renderApp({
      regionConfig,
      regionId: regionConfig.id,
      subregionId,
      address,
      profile,
      emailEntry
    }))
  } catch (error) {
    context.log?.('error', 'Address generation failed', {
      requestId: context.requestId,
      regionId: regionConfig.id,
      subregionId,
      error
    })

    return htmlResponse(renderErrorPage({
      regionId: regionConfig.id,
      subregionId
    }), 500)
  }
}
