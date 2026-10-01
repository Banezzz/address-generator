import { slugify } from './formatters.js'

export function buildEmailEntry (profile, regionConfig) {
  const baseName = slugify(profile.fullNameLatin || profile.fullNameNative || 'address-user') || 'address-user'
  const nonce = Math.floor(100 + Math.random() * 900)
  const alias = `${baseName}.${nonce}@placeholder.invalid`

  return {
    address: alias,
    copyValue: alias,
    actionUrl: 'https://mail.tm/en/',
    actionText: 'Create a live inbox',
    helperText: `Placeholder only — this address cannot receive mail. Use Create live inbox to get a real mail.tm mailbox for ${regionConfig.label} sign-up testing.`
  }
}
