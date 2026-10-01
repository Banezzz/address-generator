const regions = new Map()

export function registerRegions (modules) {
  regions.clear()
  for (const region of modules) {
    regions.set(region.id, region)
  }
}

export function getRegion (regionId) {
  return regions.get(regionId) || null
}

export function hasRegion (regionId) {
  return regions.has(regionId)
}

export function listRegions () {
  return Array.from(regions.values())
}
