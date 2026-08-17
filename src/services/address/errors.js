export class GenerateError extends Error {
  constructor (code, message, { status = 500, details } = {}) {
    super(message)
    this.name = 'GenerateError'
    this.code = code
    this.status = status
    this.details = details
  }
}

export function classifyGenerateFailure (error, regionLabel = 'this region') {
  if (error instanceof GenerateError) {
    return error
  }

  const message = error?.message || `Unable to generate an address for ${regionLabel}`
  const lowered = message.toLowerCase()
  const isNominatim = error?.service === 'nominatim' ||
    error?.context?.upstream === 'nominatim' ||
    error?.code === 'upstream_error'

  if (error?.code === 'timeout' || lowered.includes('timed out') || lowered.includes('timeout')) {
    return new GenerateError('timeout', message, { status: 504, details: error?.details })
  }

  if (isNominatim) {
    return new GenerateError('nominatim', message, {
      status: error.status && error.status >= 400 ? error.status : 502,
      details: error?.details
    })
  }

  if (error?.status === 429 || error?.code === 'rate_limit' || lowered.includes('rate limit')) {
    return new GenerateError('rate_limit', message, { status: 429, details: error?.details })
  }

  if (lowered.includes('unable to find') || lowered.includes('no valid address')) {
    return new GenerateError('sparse', message, { status: 422, details: error?.details })
  }

  return new GenerateError('unknown', message, { status: 500, details: error?.details })
}
