import { describe, expect, it } from 'vitest'
import { getRegionConfig } from '../src/config/regions.js'
import { renderApp, renderErrorPage } from '../src/ui/template.js'

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
    expect(html).toMatch(/\/assets\/app\.[a-z0-9]+\.js/)
    expect(html).toMatch(/\/assets\/app\.[a-z0-9]+\.css/)
    expect(html).toContain('id="appPayload"')
    expect(html).toContain('type="application/json"')
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('title="Generated location preview map"')
    expect(html).toContain('class="skip-link"')
    expect(html).toContain('data-action="copy-identity"')
    expect(html).toContain('data-action="copy-address"')
    expect(html).toContain('id="identityHeading"')
    expect(html).toContain('id="addressHeading"')
    expect(html).toContain('id="savedAddressesList"')
    expect(html).not.toContain('onclick=')
    expect(html).not.toContain('<style>')
    expect(html).not.toContain('<template id="appPayload">')
    expect(html).not.toContain('Cascade Geo Identity Lab')
  })

  it('renders a bilingual error page with a retry link', () => {
    const html = renderErrorPage({ regionId: 'KR', subregionId: 'SEOUL' })

    expect(html).toContain('这次没生成出地址')
    expect(html).toContain('Try again')
    expect(html).toContain('/?region=KR&amp;subregion=SEOUL')
  })

  it('distinguishes timeout, rate limit, and unknown-region errors', () => {
    expect(renderErrorPage({ code: 'timeout' })).toContain('地理编码超时了')
    expect(renderErrorPage({ code: 'rate_limit' })).toContain('请求太频繁')
    expect(renderErrorPage({ code: 'sparse' })).toContain('这个区域结果太少')
    expect(renderErrorPage({ code: 'nominatim' })).toContain('上游地理编码失败')
    expect(renderErrorPage({ regionId: 'ZZ', code: 'unknown_region' })).toContain('未知地区')
    expect(renderErrorPage({ regionId: 'ZZ', code: 'unknown_region' })).toContain('/?region=US')
  })
})
