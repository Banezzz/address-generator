import { escapeHtml } from '../services/formatters.js'

export function renderInfoRow (row) {
  const secondary = row.secondary ? `<div class="info-secondary">${escapeHtml(row.secondary)}</div>` : ''
  const spanClass = row.span ? ` ${escapeHtml(row.span)}` : ''
  const label = row.label || ''

  return `<article class="info-row copy-card${spanClass}" role="button" tabindex="0" aria-label="Copy ${escapeHtml(label)}" data-copy-value="${escapeHtml(row.value || '')}" data-copy-label="${escapeHtml(label)}">
    <div class="info-meta">
      <span class="info-label">${escapeHtml(label)}</span>
    </div>
    <div class="info-value">
      <span>${escapeHtml(row.value || '')}</span>
      ${secondary}
    </div>
  </article>`
}

export function renderInboxPanel () {
  return `<div class="inbox-card">
    <div class="card-heading compact">
      <div>
        <span class="section-kicker">临时收件箱 / Live Inbox</span>
        <h3>Disposable mailbox</h3>
      </div>
      <button class="ghost-btn small" type="button" data-action="refresh-inbox">刷新 / Refresh</button>
    </div>
    <div class="inbox-meta" id="inboxMeta" aria-live="polite"></div>
    <div class="inbox-actions" id="inboxActions"></div>
    <div class="inbox-list" id="inboxList"></div>
    <div class="inbox-detail" id="inboxDetail"></div>
    <div class="inbox-attribution">Inbox provider: <a href="https://mail.tm" target="_blank" rel="noreferrer">mail.tm</a></div>
  </div>`
}

export function renderSavedPanel () {
  return `<div class="save-card">
    <div class="card-heading compact">
      <div>
        <span class="section-kicker">本地保存 / Local Vault</span>
        <h3>Saved addresses</h3>
      </div>
      <button class="ghost-btn small" type="button" data-action="export-csv">导出 CSV</button>
    </div>
    <div class="saved-list" id="savedAddressesList"></div>
  </div>`
}

export function renderNotesPanel () {
  return `<div class="about-card">
    <span class="section-kicker">说明 / Notes</span>
    <ul>
      <li>Addresses come from OpenStreetMap reverse geocoding and are meant for form testing.</li>
      <li>Names and phone numbers are synthetic and only region-matched, not real people.</li>
      <li>Click any result field to copy it. Use Copy ID for a ready-to-paste identity block.</li>
      <li>Live inbox sessions stay in this browser tab and use same-origin Worker APIs.</li>
    </ul>
  </div>`
}
