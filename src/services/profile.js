import { getRegion } from '../regions/index.js'
import { stripDiacritics } from './formatters.js'

export function buildProfile ({ regionId, subregionId }) {
  const region = getRegion(regionId)
  if (!region) {
    throw new Error(`Unknown region: ${regionId}`)
  }

  const person = pickPerson(region)
  const phoneDetails = region.buildPhone(subregionId)

  return {
    regionId,
    regionLabel: region.label,
    familyNameNative: person.nativeFamily || person.family || person.latinFamily,
    givenNameNative: person.nativeGiven || person.given || person.latinGiven,
    familyNameLatin: person.latinFamily || person.family || stripDiacritics(person.nativeFamily || ''),
    givenNameLatin: person.latinGiven || person.given || stripDiacritics(person.nativeGiven || ''),
    fullNameNative: region.buildFullName(person, true),
    fullNameLatin: region.buildFullName(person, false),
    gender: person.gender,
    phone: phoneDetails.phone,
    phonePrefix: phoneDetails.prefix,
    phoneExplanation: phoneDetails.explanation,
    phoneCopyValue: phoneDetails.phone
  }
}

function pickPerson (region) {
  const bucket = region.names
  if (!bucket?.length) {
    throw new Error(`No name bucket configured for region ${region.id}`)
  }
  return bucket[Math.floor(Math.random() * bucket.length)]
}
