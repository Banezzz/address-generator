import { listRegions } from '../../regions/index.js'

export const MAX_RETRIES = 3
export const ATTEMPTS_PER_RETRY = 20
export const VALIDATION_STAGES = ['strict', 'relaxed']
export const ADDRESS_GENERATION_TIMEOUT_MS = 15000

export const REGION_ADDRESS_TIMEOUT_MS = Object.fromEntries(
  listRegions()
    .filter(region => region.timeoutMs && region.timeoutMs !== ADDRESS_GENERATION_TIMEOUT_MS)
    .map(region => [region.id, region.timeoutMs])
)

export const REGION_JITTER = Object.fromEntries(
  listRegions().map(region => [region.id, region.jitter])
)
