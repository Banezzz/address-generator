import { describe, expect, it } from 'vitest'
import { getRegionConfig } from '../src/config/regions.js'
import { renderApp } from '../src/ui/template.js'

describe('renderApp', () => {
  it('renders external assets and accessible UI hooks', () => {
    const html = renderApp({
      regionConfig: getRegionConfig('US'),
      regionId: 'US',
      subregionId: 'CA',
      address: {
        street: '1 Market St',
        city: 'San Francisco',
        district: 'Financial District',
        admin: 'California',
        postalCode: '94105',
        country: 'United States',
        fullAddress: '1 Market St, San Francisco, CA 94105, United States',
        coordinates: '37.774900, -122.419400',
        mapEmbedUrl: 'https://www.google.com/maps?q=1%20Market%20St&output=embed',
        mapExternalUrl: 'https://www.google.com/maps/search/?api=1&query=1%20Market%20St',
        sourceLabel: 'OpenStreetMap reverse geocoding'
      },
      profile: {
        familyNameNative: '王',
        familyNameLatin: 'Wang',
        givenNameNative: '小明',
        givenNameLatin: 'Xiaoming',
        fullNameNative: '王小明',
        fullNameLatin: 'Xiaoming Wang',
        gender: 'Male',
        phone: '+1 415 555 0101',
        phonePrefix: '+1 415',
        phoneExplanation: 'Uses a California-style area code.'
      },
      emailEntry: {
        address: 'xiaoming.wang@example.com',
        helperText: 'Suggested alias'
      }
    })

    expect(html).toContain('lang="zh-CN"')
    expect(html).toContain('/assets/app.js')
    expect(html).toContain('/assets/app.css')
    expect(html).toContain('id="appPayload"')
    expect(html).toContain('type="application/json"')
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('title="Generated location preview map"')
    expect(html).not.toContain('onclick=')
    expect(html).not.toContain('<style>')
    expect(html).not.toContain('<template id="appPayload">')
  })
})
