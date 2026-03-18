import { getRegionOptions, getSubregionOptions } from '../config/regions.js'
import { escapeHtml } from '../services/formatters.js'
import { renderInboxPanel, renderInfoRow, renderNotesPanel, renderSavedPanel } from './renderers.js'

export function renderApp ({ regionConfig, regionId, subregionId, address, profile, emailEntry }) {
  const regionOptions = getRegionOptions()
  const subregionOptions = getSubregionOptions(regionId)
  const payload = {
    regionId,
    subregionId,
    regionConfigs: regionOptions.map(option => ({
      id: option.id,
      label: option.label,
      nativeLabel: option.nativeLabel,
      subregionLabel: option.subregionLabel,
      subregionLabelNative: option.subregionLabelNative
    })),
    subregionOptionsByRegion: Object.fromEntries(regionOptions.map(option => [option.id, getSubregionOptions(option.id)])),
    address,
    profile,
    emailEntry,
    regionLabel: regionConfig.label
  }

  const infoRows = [
    { label: '姓 / Family', value: profile.familyNameNative, secondary: profile.familyNameLatin, span: 'compact' },
    { label: '名 / Given', value: profile.givenNameNative, secondary: profile.givenNameLatin, span: 'compact' },
    { label: '本地姓名 / Native', value: profile.fullNameNative, secondary: null, span: 'compact' },
    { label: 'Latin / Romanized', value: profile.fullNameLatin, secondary: null, span: 'compact' },
    { label: '性别 / Gender', value: profile.gender, secondary: null, span: 'compact' },
    { label: '电话 / Phone', value: profile.phone, secondary: `Prefix ${profile.phonePrefix}`, span: 'compact' },
    { label: '电子邮件 / Email', value: emailEntry.address, secondary: emailEntry.helperText, span: 'wide' },
    { label: '街道 / Street', value: address.street, secondary: null, span: 'wide' },
    { label: '城市 / City', value: address.city, secondary: address.district !== 'N/A' ? address.district : null, span: 'compact' },
    { label: `${regionConfig.adminLabelNative} / ${regionConfig.adminLabel}`, value: address.admin, secondary: null, span: 'compact' },
    { label: `${regionConfig.postalLabelNative} / ${regionConfig.postalLabel}`, value: address.postalCode, secondary: null, span: 'compact' },
    { label: '国家 / Region', value: `${regionConfig.nativeLabel} / ${regionConfig.label}`, secondary: null, span: 'compact' },
    { label: '完整地址 / Full', value: address.fullAddress, secondary: null, span: 'full' },
    { label: '经纬度 / Coordinates', value: address.coordinates, secondary: address.sourceLabel, span: 'full' }
  ]

  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Multi-Region Address Generator</title>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230a84ff'/%3E%3Cstop offset='100%25' style='stop-color:%23409cff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M16 2C10.5 2 6 6.5 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10zm0 13.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z'/%3E%3C/svg%3E" />
      <link rel="stylesheet" href="/assets/app.css" />
      <script type="module" src="/assets/app.js"></script>
    </head>
    <body>
      <script id="appPayload" type="application/json">${serializePayload(payload)}</script>

      <div class="loading-overlay" id="loadingOverlay" aria-hidden="true">
        <div class="loading-spinner"></div>
        <div class="loading-text">正在生成地址 / Generating address...</div>
      </div>
      <div class="ambient ambient-left"></div>
      <div class="ambient ambient-right"></div>
      <main class="app-shell">
        <section class="hero-card">
          <div class="hero-copy">
            <span class="eyebrow">Cascade Geo Identity Lab</span>
            <h1>真实多地区地址生成器</h1>
            <p>Generate real geocodable addresses with region-matched identity details, phone prefixes, map preview, disposable inbox, and one-click local save.</p>
          </div>
          <div class="hero-actions">
            <button class="ghost-btn" type="button" data-action="share">分享 / Share</button>
            <button class="primary-btn" type="button" data-action="open-save-dialog">保存 / Save</button>
          </div>
        </section>

        <section class="layout-grid">
          <div class="result-panel">
            <form id="generatorForm" class="toolbar" method="GET" action="/">
              <div class="toolbar-group">
                <label for="region">地区 / Region</label>
                <select id="region" name="region" autocomplete="off">
                  ${regionOptions.map(option => `<option value="${option.id}" ${option.id === regionId ? 'selected' : ''}>${escapeHtml(option.nativeLabel)} / ${escapeHtml(option.label)}</option>`).join('')}
                </select>
              </div>
              <div class="toolbar-group">
                <label id="subregionLabel" for="subregion">${escapeHtml(regionConfig.subregionLabelNative)} / ${escapeHtml(regionConfig.subregionLabel)}</label>
                <select id="subregion" name="subregion" autocomplete="off">
                  ${subregionOptions.map(option => `<option value="${option.id}" ${option.id === subregionId ? 'selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
                </select>
              </div>
              <div class="toolbar-actions">
                <button type="submit" class="primary-btn">生成新地址 / Generate</button>
                <button type="submit" class="ghost-btn" name="refresh" value="1">刷新同地区 / Refresh</button>
                <a class="link-btn" href="${escapeHtml(address.mapExternalUrl)}" target="_blank" rel="noreferrer">打开地图 / Open Map</a>
              </div>
            </form>

            <div class="results-card">
              <div class="card-heading">
                <div>
                  <span class="section-kicker">生成结果 / Generated Result</span>
                  <h2>${escapeHtml(regionConfig.nativeLabel)} / ${escapeHtml(regionConfig.label)}</h2>
                </div>
                <div class="card-heading-actions">
                  <button type="button" class="ghost-btn small" data-action="share">分享 / Share</button>
                  <span class="status-pill">Live geocode</span>
                </div>
              </div>

              <div class="notice-row">
                <div class="phone-note">
                  <span class="phone-note-title">Phone prefix check</span>
                  <p>${escapeHtml(profile.phoneExplanation)}</p>
                </div>
              </div>

              <div class="info-grid">
                ${infoRows.map(renderInfoRow).join('')}
              </div>
            </div>

            <div class="map-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">地理位置 / Map</span>
                  <h3>Location preview</h3>
                </div>
                <span class="map-hint">Google Maps embed</span>
              </div>
              <div class="map-container">
                <div id="mapLoading" class="map-loading">地图加载中 / Loading map...</div>
                <iframe
                  class="map-frame"
                  src="${escapeHtml(address.mapEmbedUrl)}"
                  title="Generated location preview map"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <aside class="side-panel">
            ${renderInboxPanel()}
            ${renderSavedPanel()}
            ${renderNotesPanel()}
          </aside>
        </section>
      </main>

      <div class="copy-toast" id="copyToast" role="status" aria-live="polite">Copied</div>
      <div class="message-host" id="messageHost" aria-live="polite" aria-atomic="false"></div>
      <div class="modal" id="saveDialog" hidden aria-hidden="true">
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="saveDialogTitle">
          <h3 id="saveDialogTitle">保存地址 / Save address</h3>
          <label class="sr-only" for="noteInput">Address note</label>
          <input id="noteInput" type="text" placeholder="添加备注 / Optional note" autocomplete="off" />
          <div class="modal-actions">
            <button class="ghost-btn" type="button" data-action="close-save-dialog">取消</button>
            <button class="primary-btn" type="button" data-action="confirm-save">确认</button>
          </div>
        </div>
      </div>
    </body>
  </html>`
}

export function renderErrorPage ({ regionId = 'US', subregionId = '' } = {}) {
  const backHref = `/?region=${encodeURIComponent(regionId)}${subregionId ? `&subregion=${encodeURIComponent(subregionId)}` : ''}`

  return `<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Address Generator Error</title>
      <link rel="stylesheet" href="/assets/app.css" />
    </head>
    <body>
      <div class="ambient ambient-left"></div>
      <div class="ambient ambient-right"></div>
      <main class="error-shell">
        <article class="error-card">
          <span class="eyebrow">Generator Error</span>
          <h1>Unable to generate an address</h1>
          <p>Something went wrong while generating the address. Try reloading or switching to a different region or subregion.</p>
          <div class="hero-actions">
            <a class="primary-btn" href="${escapeHtml(backHref)}">Back to generator</a>
          </div>
        </article>
      </main>
    </body>
  </html>`
}

function serializePayload (value) {
  return JSON.stringify(value)
    .replace(/[<>&]/g, char => {
      if (char === '<') return '\\u003c'
      if (char === '>') return '\\u003e'
      return '\\u0026'
    })
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
