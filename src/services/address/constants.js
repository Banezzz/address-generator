export const MAX_RETRIES = 3
export const ATTEMPTS_PER_RETRY = 20
export const VALIDATION_STAGES = ['strict', 'relaxed']
export const ADDRESS_GENERATION_TIMEOUT_MS = 15000

export const REGION_ADDRESS_TIMEOUT_MS = {
  US_TAX_FREE: 22000,
  HK: 32000,
  SG: 25000,
  TW: 25000,
  TH: 25000,
  VN: 25000
}

export const REGION_JITTER = {
  US: 0.085,
  US_TAX_FREE: 0.085,
  HK: 0.006,
  SG: 0.012,
  JP: 0.015,
  TW: 0.015,
  TH: 0.018,
  VN: 0.018
}
