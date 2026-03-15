export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export function pickFirst(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim()
    }
  }
  return ""
}

export function joinNonEmpty(parts, separator = ", ") {
  return parts.filter(part => typeof part === "string" && part.trim()).join(separator)
}

export function getLocality(address) {
  return pickFirst(
    address.city,
    address.town,
    address.village,
    address.municipality,
    address.city_district,
    address.suburb,
    address.hamlet
  )
}

export function getDistrict(address) {
  return pickFirst(
    address.city_district,
    address.suburb,
    address.borough,
    address.quarter,
    address.neighbourhood,
    address.county,
    address.district
  )
}

export function getRoad(address) {
  return pickFirst(
    address.road,
    address.pedestrian,
    address.footway,
    address.street,
    address.residential,
    address.path
  )
}

export function getHouseNumber(address) {
  return pickFirst(address.house_number, address.block, address.building)
}

export function formatStreet(address) {
  const house = getHouseNumber(address)
  const road = getRoad(address)
  if (house && road) return `${house} ${road}`
  return pickFirst(road, house, address.building)
}

export function formatCoordinates(lat, lng) {
  return `${Number(lat).toFixed(6)}, ${Number(lng).toFixed(6)}`
}

export function stripDiacritics(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function slugify(value) {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getShortLabel(text) {
  return String(text ?? "").split("/")[0].trim()
}

export function maybePostal(value) {
  const text = String(value ?? "").trim()
  return text || "N/A"
}
