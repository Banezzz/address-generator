import { createHttpClient } from './httpClient.js'

const NOMINATIM_API = 'https://nominatim.openstreetmap.org/reverse'
const NOMINATIM_POLICY = {
  key: 'nominatim',
  maxConcurrent: 1,
  minIntervalMs: 1100,
  maxQueueSize: 60
}

export async function reverseGeocode ({
  fetchFn,
  regionConfig,
  location,
  requestId,
  subregionId,
  httpClient = createHttpClient({ fetchFn })
}) {
  const url = new URL(NOMINATIM_API)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('lat', String(location.lat))
  url.searchParams.set('lon', String(location.lng))
  url.searchParams.set('zoom', '18')
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('namedetails', '1')

  const timeoutMs = regionConfig.countryCode === 'hk' ? 8000 : 5000

  return httpClient.requestJson(url.toString(), {
    service: 'nominatim',
    timeoutMs,
    retries: 2,
    backoffMs: 1200,
    retryOnStatuses: [429],
    policy: NOMINATIM_POLICY,
    init: {
      headers: {
        'User-Agent': 'Addy Generator Worker',
        'Accept-Language': regionConfig.languageHeader
      },
      cf: {
        cacheEverything: true,
        cacheTtl: 300
      }
    },
    context: {
      requestId,
      regionId: regionConfig.id,
      subregionId,
      upstream: 'nominatim'
    }
  })
}
