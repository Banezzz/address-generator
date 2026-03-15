import { slugify } from "./formatters.js"

export function buildEmailEntry(profile, regionConfig) {
  const baseName = slugify(profile.fullNameLatin || profile.fullNameNative || "address-user") || "address-user"
  const nonce = Math.floor(100 + Math.random() * 900)
  const alias = `${baseName}.${nonce}@instant-inbox.test`

  return {
    address: alias,
    copyValue: alias,
    actionUrl: "https://mail.tm/en/",
    actionText: "Open disposable inbox",
    helperText: `Suggested alias for ${regionConfig.label} sign-up testing. Open the external inbox provider to create a live receiving address.`
  }
}
