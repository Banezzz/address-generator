import { escapeHtml } from '../services/formatters.js'

export function renderInfoRow (row) {
  const secondary = row.secondary ? `<div class="info-secondary">${escapeHtml(row.secondary)}</div>` : ''
  const spanClass = row.span ? ` ${escapeHtml(row.span)}` : ''

  return `<article class="info-row copy-card${spanClass}" role="button" tabindex="0" data-copy-value="${escapeHtml(row.value || '')}">
    <div class="info-meta">
      <span class="info-label">${escapeHtml(row.label)}</span>
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
    <div class="table-wrap">
      <table class="saved-table">
        <thead>
          <tr>
            <th>备注</th>
            <th>地区</th>
            <th>姓名</th>
            <th>电话</th>
            <th>地址</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="savedAddressesBody"></tbody>
      </table>
    </div>
  </div>`
}

export function renderNotesPanel () {
  return `<div class="about-card">
    <span class="section-kicker">说明 / Notes</span>
    <ul>
      <li>Addresses are selected via OpenStreetMap reverse geocoding.</li>
      <li>Identity details are synthetic and region-matched, not real people.</li>
      <li>Live inbox sessions stay in this browser tab and use same-origin Worker APIs.</li>
      <li>This tool is intended for testing, learning, and UI prototyping only.</li>
    </ul>
  </div>`
}
