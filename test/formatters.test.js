import { describe, it, expect } from 'vitest'
import {
  escapeHtml,
  pickFirst,
  joinNonEmpty,
  getLocality,
  getDistrict,
  getRoad,
  getHouseNumber,
  formatStreet,
  formatCoordinates,
  stripDiacritics,
  slugify,
  getShortLabel,
  maybePostal
} from '../src/services/formatters.js'

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>'))
      .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;')
  })

  it('should escape ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
  })

  it('should escape single quotes', () => {
    expect(escapeHtml("It's fine")).toBe('It&#039;s fine')
  })

  it('should handle null and undefined', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })

  it('should handle numbers', () => {
    expect(escapeHtml(123)).toBe('123')
  })
})

describe('pickFirst', () => {
  it('should return first non-empty string', () => {
    expect(pickFirst('', 'hello', 'world')).toBe('hello')
  })

  it('should trim whitespace', () => {
    expect(pickFirst('  ', '  trimmed  ')).toBe('trimmed')
  })

  it('should return empty string if all empty', () => {
    expect(pickFirst('', null, undefined, '   ')).toBe('')
  })

  it('should handle no arguments', () => {
    expect(pickFirst()).toBe('')
  })
})

describe('joinNonEmpty', () => {
  it('should join non-empty strings', () => {
    expect(joinNonEmpty(['a', '', 'b', null, 'c'])).toBe('a, b, c')
  })

  it('should use custom separator', () => {
    expect(joinNonEmpty(['a', 'b'], ' | ')).toBe('a | b')
  })

  it('should return empty string for all empty', () => {
    expect(joinNonEmpty(['', null, undefined])).toBe('')
  })
})

describe('getLocality', () => {
  it('should return city if present', () => {
    expect(getLocality({ city: 'Tokyo', town: 'Shibuya' })).toBe('Tokyo')
  })

  it('should fall back to town', () => {
    expect(getLocality({ town: 'Shibuya' })).toBe('Shibuya')
  })

  it('should fall back to village', () => {
    expect(getLocality({ village: 'Rural Area' })).toBe('Rural Area')
  })
})

describe('getDistrict', () => {
  it('should return city_district if present', () => {
    expect(getDistrict({ city_district: 'Central', suburb: 'West' })).toBe('Central')
  })

  it('should fall back to borough', () => {
    expect(getDistrict({ borough: 'Manhattan' })).toBe('Manhattan')
  })
})

describe('getRoad', () => {
  it('should return road if present', () => {
    expect(getRoad({ road: 'Main Street', pedestrian: 'Walkway' })).toBe('Main Street')
  })

  it('should fall back to pedestrian', () => {
    expect(getRoad({ pedestrian: 'Walking Path' })).toBe('Walking Path')
  })
})

describe('getHouseNumber', () => {
  it('should return house_number if present', () => {
    expect(getHouseNumber({ house_number: '123', block: 'A' })).toBe('123')
  })

  it('should fall back to block', () => {
    expect(getHouseNumber({ block: 'Block B' })).toBe('Block B')
  })
})

describe('formatStreet', () => {
  it('should format house number and road', () => {
    expect(formatStreet({ house_number: '123', road: 'Main St' })).toBe('123 Main St')
  })

  it('should return road only if no house number', () => {
    expect(formatStreet({ road: 'Main St' })).toBe('Main St')
  })
})

describe('formatCoordinates', () => {
  it('should format coordinates to 6 decimal places', () => {
    expect(formatCoordinates(35.6762, 139.6503)).toBe('35.676200, 139.650300')
  })

  it('should handle string inputs', () => {
    expect(formatCoordinates('35.6762', '139.6503')).toBe('35.676200, 139.650300')
  })
})

describe('stripDiacritics', () => {
  it('should strip diacritics from strings', () => {
    expect(stripDiacritics('café')).toBe('cafe')
    expect(stripDiacritics('naïve')).toBe('naive')
    expect(stripDiacritics('東京')).toBe('東京')
  })
})

describe('slugify', () => {
  it('should convert to lowercase and replace spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('should remove special characters', () => {
    expect(slugify('Test@123!')).toBe('test-123')
  })

  it('should strip leading and trailing dashes', () => {
    expect(slugify('---test---')).toBe('test')
  })
})

describe('getShortLabel', () => {
  it('should return text before first slash', () => {
    expect(getShortLabel('Tokyo / 東京')).toBe('Tokyo')
  })

  it('should trim whitespace', () => {
    expect(getShortLabel('  hello / world  ')).toBe('hello')
  })

  it('should handle text without slash', () => {
    expect(getShortLabel('hello')).toBe('hello')
  })
})

describe('maybePostal', () => {
  it('should return value if not empty', () => {
    expect(maybePostal('12345')).toBe('12345')
  })

  it('should return N/A for empty string', () => {
    expect(maybePostal('')).toBe('N/A')
  })

  it('should return N/A for whitespace', () => {
    expect(maybePostal('   ')).toBe('N/A')
  })
})
