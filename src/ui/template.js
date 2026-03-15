import { getRegionOptions, getSubregionOptions } from "../config/regions.js"
import { escapeHtml } from "../services/formatters.js"

export function renderApp({ regionConfig, regionId, subregionId, address, profile, emailEntry }) {
  const regionOptions = getRegionOptions()
  const subregionOptions = getSubregionOptions(regionId)
  const safePayload = serializeForScript({
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
  })

  const infoRows = [
    { label: "姓 / Family", value: profile.familyNameNative, secondary: profile.familyNameLatin, span: "compact" },
    { label: "名 / Given", value: profile.givenNameNative, secondary: profile.givenNameLatin, span: "compact" },
    { label: "本地姓名 / Native", value: profile.fullNameNative, secondary: null, span: "compact" },
    { label: "Latin / Romanized", value: profile.fullNameLatin, secondary: null, span: "compact" },
    { label: "性别 / Gender", value: profile.gender, secondary: null, span: "compact" },
    { label: "电话 / Phone", value: profile.phone, secondary: `Prefix ${profile.phonePrefix}`, span: "compact" },
    { label: "电子邮件 / Email", value: emailEntry.address, secondary: emailEntry.helperText, span: "wide" },
    { label: "街道 / Street", value: address.street, secondary: null, span: "wide" },
    { label: "城市 / City", value: address.city, secondary: address.district !== "N/A" ? address.district : null, span: "compact" },
    { label: `${regionConfig.adminLabelNative} / ${regionConfig.adminLabel}`, value: address.admin, secondary: null, span: "compact" },
    { label: `${regionConfig.postalLabelNative} / ${regionConfig.postalLabel}`, value: address.postalCode, secondary: null, span: "compact" },
    { label: "国家 / Region", value: `${regionConfig.nativeLabel} / ${regionConfig.label}`, secondary: null, span: "compact" },
    { label: "完整地址 / Full", value: address.fullAddress, secondary: null, span: "full" },
    { label: "经纬度 / Coordinates", value: address.coordinates, secondary: address.sourceLabel, span: "full" }
  ]

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Multi-Region Address Generator</title>
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff8a1f'/%3E%3Cstop offset='100%25' style='stop-color:%23ff6a00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M16 2C10.5 2 6 6.5 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10zm0 13.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z'/%3E%3C/svg%3E" />
      <style>${getStyles()}</style>
    </head>
    <body>
      <div class="loading-overlay" id="loadingOverlay">
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
            <button class="ghost-btn" onclick="shareResult()">分享 / Share</button>
            <button class="primary-btn" onclick="showSaveDialog()">保存 / Save</button>
          </div>
        </section>

        <section class="layout-grid">
          <div class="result-panel">
            <form id="generatorForm" class="toolbar" method="GET" action="/">
              <div class="toolbar-group">
                <label for="region">地区 / Region</label>
                <select id="region" name="region" autocomplete="off">
                  ${regionOptions.map(option => `<option value="${option.id}" ${option.id === regionId ? "selected" : ""}>${escapeHtml(option.nativeLabel)} / ${escapeHtml(option.label)}</option>`).join("")}
                </select>
              </div>
              <div class="toolbar-group">
                <label id="subregionLabel" for="subregion">${escapeHtml(regionConfig.subregionLabelNative)} / ${escapeHtml(regionConfig.subregionLabel)}</label>
                <select id="subregion" name="subregion" autocomplete="off">
                  ${subregionOptions.map(option => `<option value="${option.id}" ${option.id === subregionId ? "selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
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
                  <button type="submit" form="generatorForm" class="ghost-btn small" name="refresh" value="1">刷新 / Refresh</button>
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
                ${infoRows.map(renderInfoRow).join("")}
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
                <div id="map-loading" class="map-loading">地图加载中 / Loading map...</div>
                <iframe
                  class="map-frame"
                  src="${escapeHtml(address.mapEmbedUrl)}"
                ></iframe>
              </div>
            </div>
          </div>

          <aside class="side-panel">
            <div class="inbox-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">临时收件箱 / Live Inbox</span>
                  <h3>Disposable mailbox</h3>
                </div>
                <button class="ghost-btn small" onclick="refreshInboxMessages()">刷新 / Refresh</button>
              </div>
              <div class="inbox-meta" id="inboxMeta"></div>
              <div class="inbox-actions" id="inboxActions"></div>
              <div class="inbox-list" id="inboxList"></div>
              <div class="inbox-detail" id="inboxDetail"></div>
              <div class="inbox-attribution">Inbox provider: <a href="https://mail.tm" target="_blank" rel="noreferrer">mail.tm</a></div>
            </div>

            <div class="save-card">
              <div class="card-heading compact">
                <div>
                  <span class="section-kicker">本地保存 / Local Vault</span>
                  <h3>Saved addresses</h3>
                </div>
                <button class="ghost-btn small" onclick="exportToCSV()">导出 CSV</button>
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
            </div>

            <div class="about-card">
              <span class="section-kicker">说明 / Notes</span>
              <ul>
                <li>Addresses are selected via OpenStreetMap reverse geocoding.</li>
                <li>Personal information is region-matched synthetic data.</li>
                <li>Phone prefixes are chosen to look locally authentic in sign-up forms.</li>
                <li>This tool is intended for learning, testing, and UI prototyping only.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <div class="copy-toast" id="copyToast">Copied</div>
      <div class="message-host" id="messageHost"></div>
      <div class="modal" id="saveDialog">
        <div class="modal-card">
          <h3>保存地址 / Save address</h3>
          <input id="noteInput" type="text" placeholder="添加备注 / Optional note" />
          <div class="modal-actions">
            <button class="ghost-btn" onclick="closeSaveDialog()">取消</button>
            <button class="primary-btn" onclick="saveAddress()">确认</button>
          </div>
        </div>
      </div>

      <script>${getClientScript(safePayload)}</script>
    </body>
  </html>`
}

function renderInfoRow(row) {
  const displayValue = escapeHtml(row.value || "")
  const copyValue = JSON.stringify(String(row.value || ""))
  const secondary = row.secondary ? `<div class="info-secondary">${escapeHtml(row.secondary)}</div>` : ""
  const spanClass = row.span ? ` ${escapeHtml(row.span)}` : ""

  return `<article class="info-row copy-card${spanClass}" role="button" tabindex="0" onclick='copyToClipboard(${copyValue})' onkeydown='handleCopyKeydown(event, ${copyValue})'>
    <div class="info-meta">
      <span class="info-label">${escapeHtml(row.label)}</span>
    </div>
    <div class="info-value">
      <span>${displayValue}</span>
      ${secondary}
    </div>
  </article>`
}

function getClientScript(payload) {
  return `
    const payload = ${payload};
    const LIVE_INBOX_KEY = 'live-temp-inbox-v1';
    const regionConfigMap = Object.fromEntries(payload.regionConfigs.map(region => [region.id, region]));

    function showLoading() {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) overlay.classList.add('visible');
    }

    function hideLoading() {
      const overlay = document.getElementById('loadingOverlay');
      if (overlay) overlay.classList.remove('visible');
    }

    function getSavedAddresses() {
      try {
        const raw = localStorage.getItem('saved-addresses-v2');
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    }

    function setSavedAddresses(addresses) {
      localStorage.setItem('saved-addresses-v2', JSON.stringify(addresses));
    }

    function getLiveInbox() {
      try {
        const raw = localStorage.getItem(LIVE_INBOX_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        return null;
      }
    }

    function setLiveInbox(inbox) {
      if (!inbox) {
        localStorage.removeItem(LIVE_INBOX_KEY);
        return;
      }

      localStorage.setItem(LIVE_INBOX_KEY, JSON.stringify(inbox));
    }

    function buildQuery(region, subregion, forceRefresh = false) {
      const url = new URL(window.location.href);
      url.searchParams.set('region', region);
      if (subregion) {
        url.searchParams.set('subregion', subregion);
      } else {
        url.searchParams.delete('subregion');
      }
      if (forceRefresh) {
        url.searchParams.set('refresh', Date.now().toString());
      } else {
        url.searchParams.delete('refresh');
      }
      return url.toString();
    }

    function getCurrentSelection() {
      const regionSelect = document.getElementById('region');
      const subregionSelect = document.getElementById('subregion');

      return {
        regionId: regionSelect?.value || payload.regionId,
        subregionId: subregionSelect?.value || payload.subregionId
      };
    }

    function getSubregionOptionsForRegion(regionId) {
      return payload.subregionOptionsByRegion[regionId] || [];
    }

    function areSubregionOptionsInSync(regionId) {
      const subregionSelect = document.getElementById('subregion');
      const expectedOptions = getSubregionOptionsForRegion(regionId);

      if (!subregionSelect) {
        return true;
      }

      if (subregionSelect.options.length !== expectedOptions.length) {
        return false;
      }

      return expectedOptions.every((option, index) => {
        const renderedOption = subregionSelect.options[index];
        return renderedOption && renderedOption.value === option.id && renderedOption.textContent === option.label;
      });
    }

    function renderSubregionOptions(regionId, preferredSubregion = '') {
      const subregionSelect = document.getElementById('subregion');
      const subregionLabel = document.getElementById('subregionLabel');
      const regionConfig = regionConfigMap[regionId] || regionConfigMap[payload.regionId];
      const options = getSubregionOptionsForRegion(regionId);

      if (subregionLabel && regionConfig) {
        subregionLabel.textContent = regionConfig.subregionLabelNative + ' / ' + regionConfig.subregionLabel;
      }

      if (!subregionSelect) {
        return preferredSubregion;
      }

      subregionSelect.innerHTML = options.map(option => {
        return '<option value="' + escapeForHtml(option.id) + '">' + escapeForHtml(option.label) + '</option>';
      }).join('');

      const hasPreferred = preferredSubregion && options.some(option => option.id === preferredSubregion);
      const nextSubregion = hasPreferred ? preferredSubregion : (options[0]?.id || '');
      subregionSelect.value = nextSubregion;
      return nextSubregion;
    }

    function applySelection(regionId, preferredSubregion = '') {
      const regionSelect = document.getElementById('region');

      if (regionSelect) {
        regionSelect.value = regionId;
      }

      return renderSubregionOptions(regionId, preferredSubregion);
    }

    function syncSelectionControlsWithPayload() {
      applySelection(payload.regionId, payload.subregionId);
    }

    function ensureSubregionSync(preferredSubregion = '') {
      const selection = getCurrentSelection();
      const options = getSubregionOptionsForRegion(selection.regionId);
      const candidateSubregion = preferredSubregion || selection.subregionId;
      const hasCandidate = candidateSubregion && options.some(option => option.id === candidateSubregion);

      if (areSubregionOptionsInSync(selection.regionId) && hasCandidate) {
        return candidateSubregion;
      }

      const nextSubregion = renderSubregionOptions(selection.regionId, candidateSubregion);
      syncSelectionUrl(selection.regionId, nextSubregion);
      return nextSubregion;
    }

    function refreshCurrent(forceRefresh = true) {
      ensureSubregionSync();
      showLoading();
      const selection = getCurrentSelection();
      window.location.href = buildQuery(selection.regionId, selection.subregionId, forceRefresh);
    }

    function syncSelectionUrl(region, subregion) {
      window.history.replaceState({}, '', buildQuery(region, subregion, false));
    }

    function changeRegion(region) {
      const nextSubregion = renderSubregionOptions(region);
      syncSelectionUrl(region, nextSubregion);
    }

    function changeSubregion(subregion) {
      const selection = getCurrentSelection();
      syncSelectionUrl(selection.regionId, subregion || selection.subregionId);
    }

    function bindSelectionControls() {
      const regionSelect = document.getElementById('region');
      const subregionSelect = document.getElementById('subregion');

      if (regionSelect) {
        regionSelect.addEventListener('input', event => changeRegion(event.target.value));
        regionSelect.addEventListener('change', event => changeRegion(event.target.value));
      }

      if (subregionSelect) {
        subregionSelect.addEventListener('focus', () => ensureSubregionSync());
        subregionSelect.addEventListener('pointerdown', () => ensureSubregionSync());
        subregionSelect.addEventListener('mousedown', () => ensureSubregionSync());
        subregionSelect.addEventListener('input', event => changeSubregion(event.target.value));
        subregionSelect.addEventListener('change', event => changeSubregion(event.target.value));
      }
    }

    function bindFormSubmit() {
      const form = document.getElementById('generatorForm');
      if (form) {
        form.addEventListener('submit', () => showLoading());
      }
    }

    async function copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        const toast = document.getElementById('copyToast');
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 1200);
      } catch (error) {
        showMessage('复制失败 / Copy failed', 'error');
      }
    }

    function handleCopyKeydown(event, text) {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      copyToClipboard(text);
    }

    function getInboxHint() {
      return (payload.profile.fullNameLatin + '-' + payload.regionId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    async function createLiveInbox() {
      showMessage('正在创建真实邮箱 / Creating inbox');

      try {
        const response = await fetch('/api/inbox/create', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ hint: getInboxHint() })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || data.detail || 'Unable to create inbox');
        }

        const inbox = {
          ...data,
          messages: [],
          selectedMessage: null
        };

        setLiveInbox(inbox);
        renderInbox();
        showMessage('邮箱已创建 / Inbox created');
        await refreshInboxMessages();
      } catch (error) {
        showMessage('创建邮箱失败 / ' + error.message, 'error');
      }
    }

    function clearLiveInbox() {
      setLiveInbox(null);
      renderInbox();
      showMessage('已清除本地邮箱会话 / Inbox session cleared', 'warning');
    }

    async function refreshInboxMessages() {
      const inbox = getLiveInbox();
      if (!inbox?.token) {
        renderInbox();
        return;
      }

      try {
        const response = await fetch('/api/inbox/messages?token=' + encodeURIComponent(inbox.token));
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load messages');
        }

        const nextInbox = {
          ...inbox,
          messages: data.messages || [],
          refreshedAt: new Date().toISOString()
        };
        setLiveInbox(nextInbox);
        renderInbox();
      } catch (error) {
        showMessage('收件箱刷新失败 / ' + error.message, 'error');
      }
    }

    async function openInboxMessage(messageId) {
      const inbox = getLiveInbox();
      if (!inbox?.token) {
        return;
      }

      try {
        const response = await fetch('/api/inbox/message?token=' + encodeURIComponent(inbox.token) + '&id=' + encodeURIComponent(messageId));
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Unable to load message');
        }

        const nextInbox = {
          ...inbox,
          selectedMessage: data.message
        };
        setLiveInbox(nextInbox);
        renderInbox();
      } catch (error) {
        showMessage('读取邮件失败 / ' + error.message, 'error');
      }
    }

    function renderInbox() {
      const inboxMeta = document.getElementById('inboxMeta');
      const inboxActions = document.getElementById('inboxActions');
      const inboxList = document.getElementById('inboxList');
      const inboxDetail = document.getElementById('inboxDetail');
      const inbox = getLiveInbox();

      if (!inbox?.address) {
        inboxMeta.innerHTML =
          '<div class="inbox-empty">' +
            '<strong>Suggested:</strong> ' + escapeForHtml(payload.emailEntry.address) + '<br />' +
            '<span>' + escapeForHtml(payload.emailEntry.helperText) + '</span>' +
          '</div>';
        inboxActions.innerHTML = '<button class="primary-btn full-width" onclick="createLiveInbox()">创建真实临时邮箱 / Create live inbox</button>';
        inboxList.innerHTML = '';
        inboxDetail.innerHTML = '';
        return;
      }

      const refreshedText = inbox.refreshedAt ? new Date(inbox.refreshedAt).toLocaleString() : 'Not refreshed yet';

      inboxMeta.innerHTML =
        '<div class="inbox-credentials">' +
          '<div><span>Address</span><button class="tiny-copy" onclick="copyToClipboard(' + JSON.stringify(inbox.address) + ')">复制</button></div>' +
          '<strong>' + escapeForHtml(inbox.address) + '</strong>' +
          '<div class="cred-row"><span>Password</span><button class="tiny-copy" onclick="copyToClipboard(' + JSON.stringify(inbox.password) + ')">复制</button></div>' +
          '<strong>' + escapeForHtml(inbox.password) + '</strong>' +
          '<div class="inbox-footnote">Refreshed: ' + escapeForHtml(refreshedText) + '</div>' +
        '</div>';

      inboxActions.innerHTML =
        '<button class="ghost-btn small" onclick="refreshInboxMessages()">刷新邮件</button>' +
        '<button class="ghost-btn small" onclick="clearLiveInbox()">清除会话</button>';

      if (!inbox.messages || inbox.messages.length === 0) {
        inboxList.innerHTML = '<div class="inbox-empty">No messages yet. Use this address in a sign-up flow and click refresh.</div>';
      } else {
        inboxList.innerHTML = inbox.messages.map(message => {
          return '<button class="mail-item" onclick="openInboxMessage(' + JSON.stringify(message.id) + ')">' +
            '<span class="mail-subject">' + escapeForHtml(message.subject) + '</span>' +
            '<span class="mail-from">' + escapeForHtml(message.from) + '</span>' +
            '<span class="mail-intro">' + escapeForHtml(message.intro || '') + '</span>' +
          '</button>';
        }).join('');
      }

      if (!inbox.selectedMessage) {
        inboxDetail.innerHTML = '<div class="inbox-empty">Select a message to read it here.</div>';
        return;
      }

      inboxDetail.innerHTML =
        '<div class="mail-detail-card">' +
          '<div class="mail-detail-meta"><strong>' + escapeForHtml(inbox.selectedMessage.subject) + '</strong></div>' +
          '<div class="mail-detail-submeta">From: ' + escapeForHtml(inbox.selectedMessage.from) + '</div>' +
          '<div class="mail-detail-submeta">To: ' + escapeForHtml(inbox.selectedMessage.to || inbox.address) + '</div>' +
          '<pre class="mail-body">' + escapeForHtml(inbox.selectedMessage.body || inbox.selectedMessage.intro || '') + '</pre>' +
        '</div>';
    }

    function showSaveDialog() {
      document.getElementById('saveDialog').style.display = 'flex';
      document.getElementById('noteInput').value = '';
      document.getElementById('noteInput').focus();
    }

    function closeSaveDialog() {
      document.getElementById('saveDialog').style.display = 'none';
    }

    function showMessage(text, tone = 'success') {
      const host = document.getElementById('messageHost');
      const node = document.createElement('div');
      node.className = 'flash-message ' + tone;
      node.textContent = text;
      host.appendChild(node);
      setTimeout(() => node.remove(), 2200);
    }

    function saveAddress() {
      const note = document.getElementById('noteInput').value.trim() || '无备注';
      const addresses = getSavedAddresses();
      const exists = addresses.some(entry => entry.fullAddress === payload.address.fullAddress);
      if (exists) {
        showMessage('已存在相同地址 / Duplicate address', 'warning');
        return;
      }

      addresses.unshift({
        note,
        region: payload.regionLabel,
        name: payload.profile.fullNameLatin,
        phone: payload.profile.phone,
        fullAddress: payload.address.fullAddress
      });
      setSavedAddresses(addresses);
      renderSavedAddresses();
      closeSaveDialog();
      showMessage('保存成功 / Saved');
    }

    function deleteAddress(index) {
      const addresses = getSavedAddresses();
      addresses.splice(index, 1);
      setSavedAddresses(addresses);
      renderSavedAddresses();
    }

    function renderSavedAddresses() {
      const rows = getSavedAddresses();
      const body = document.getElementById('savedAddressesBody');
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="6" class="empty-cell">暂无保存的地址 / No saved entries</td></tr>';
        return;
      }

      body.innerHTML = rows.map((row, index) => {
        return '<tr>' +
          '<td data-label="备注">' + escapeForHtml(row.note) + '</td>' +
          '<td data-label="地区">' + escapeForHtml(row.region) + '</td>' +
          '<td data-label="姓名">' + escapeForHtml(row.name) + '</td>' +
          '<td data-label="电话">' + escapeForHtml(row.phone) + '</td>' +
          '<td data-label="地址">' + escapeForHtml(row.fullAddress) + '</td>' +
          '<td data-label="操作"><button class="danger-btn" onclick="deleteAddress(' + index + ')">删除</button></td>' +
          '</tr>';
      }).join('');
    }

    function exportToCSV() {
      const rows = getSavedAddresses();
      if (!rows.length) {
        showMessage('没有可导出的地址 / Nothing to export', 'warning');
        return;
      }

      const headers = ['备注', '地区', '姓名', '电话', '地址'];
      const content = [
        headers.join(','),
        ...rows.map(row => [row.note, row.region, row.name, row.phone, row.fullAddress]
          .map(field => '"' + String(field).replace(/"/g, '""') + '"')
          .join(','))
      ].join('\\n');

      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'saved-addresses.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function escapeForHtml(text) {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function handleMapLoad() {
      const loading = document.getElementById('map-loading');
      if (loading) loading.style.display = 'none';
    }

    function handleMapError() {
      const loading = document.getElementById('map-loading');
      if (loading) loading.textContent = '地图加载失败 / Map failed to load';
    }

    async function shareResult() {
      const shareData = {
        title: 'Multi-Region Address Generator',
        text: payload.address.fullAddress,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {}
      }

      copyToClipboard(window.location.href);
      showMessage('链接已复制 / Link copied');
    }

    document.getElementById('noteInput').addEventListener('keyup', event => {
      if (event.key === 'Enter') saveAddress();
    });

    window.onclick = event => {
      if (event.target === document.getElementById('saveDialog')) {
        closeSaveDialog();
      }
    };

    window.copyToClipboard = copyToClipboard;
    window.showSaveDialog = showSaveDialog;
    window.closeSaveDialog = closeSaveDialog;
    window.saveAddress = saveAddress;
    window.deleteAddress = deleteAddress;
    window.exportToCSV = exportToCSV;
    window.changeRegion = changeRegion;
    window.changeSubregion = changeSubregion;
    window.refreshCurrent = refreshCurrent;
    window.handleMapLoad = handleMapLoad;
    window.handleMapError = handleMapError;
    window.shareResult = shareResult;
    window.createLiveInbox = createLiveInbox;
    window.refreshInboxMessages = refreshInboxMessages;
    window.openInboxMessage = openInboxMessage;
    window.clearLiveInbox = clearLiveInbox;
    window.handleCopyKeydown = handleCopyKeydown;

    hideLoading();
    syncSelectionControlsWithPayload();
    bindSelectionControls();
    bindFormSubmit();
    window.addEventListener('pageshow', () => {
      hideLoading();
      syncSelectionControlsWithPayload();
    });
    renderSavedAddresses();
    renderInbox();
    const mapFrame = document.querySelector('.map-frame');
    if (mapFrame) {
      mapFrame.addEventListener('load', handleMapLoad);
      mapFrame.addEventListener('error', handleMapError);
      setTimeout(() => {
        if (document.getElementById('map-loading').style.display !== 'none') {
          handleMapError();
        }
      }, 8000);
    } else {
      handleMapError();
    }
  `
}

function serializeForScript(value) {
  let json = JSON.stringify(value)
    .replace(/[<>]/g, c => c === '<' ? '\\u003c' : '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  
  let result = ''
  let lastCut = 0
  let inString = false
  for (let i = 0; i < json.length; i++) {
    const char = json[i]
    if (char === '"' && json[i - 1] !== '\\') {
      inString = !inString
    }
    if (!inString && i - lastCut > 400 && (char === ',' || char === '}' || char === ']')) {
      result += json.slice(lastCut, i + 1) + '\n'
      lastCut = i + 1
    }
  }
  result += json.slice(lastCut)
  return result
}

function getStyles() {
  return `
    :root {
      color-scheme: dark;
      --bg: #0a0c10;
      --bg-elevated: rgba(18, 20, 27, 0.84);
      --surface: rgba(20, 24, 31, 0.86);
      --surface-strong: rgba(26, 31, 40, 0.96);
      --surface-soft: rgba(255, 255, 255, 0.03);
      --text: #f7f8fb;
      --muted: #9aa4b2;
      --line: rgba(255, 255, 255, 0.08);
      --orange: #ff8a1f;
      --orange-strong: #ff6a00;
      --orange-soft: rgba(255, 138, 31, 0.15);
      --green: #22c55e;
      --danger: #ef4444;
      --shadow: 0 22px 80px rgba(0, 0, 0, 0.45);
      --radius-xl: 28px;
      --radius-lg: 20px;
      --radius-md: 14px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
      min-height: 100vh;
      background:
        radial-gradient(circle at top left, rgba(255, 106, 0, 0.18), transparent 22%),
        radial-gradient(circle at top right, rgba(255, 138, 31, 0.12), transparent 18%),
        linear-gradient(180deg, #090b0f 0%, #0c1016 100%);
      color: var(--text);
      padding: 32px;
      overflow-x: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button, select, input {
      font: inherit;
    }

    .ambient {
      position: fixed;
      width: 320px;
      height: 320px;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      opacity: 0.45;
      z-index: 0;
    }

    .ambient-left {
      left: -120px;
      top: -80px;
      background: rgba(255, 106, 0, 0.28);
    }

    .ambient-right {
      right: -120px;
      top: 140px;
      background: rgba(255, 138, 31, 0.16);
    }

    .app-shell {
      position: relative;
      z-index: 1;
      max-width: 1520px;
      margin: 0 auto;
      display: grid;
      gap: 18px;
    }

    .hero-card,
    .results-card,
    .map-card,
    .save-card,
    .about-card {
      border: 1px solid var(--line);
      background: var(--surface);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
    }

    .hero-card {
      border-radius: var(--radius-xl);
      padding: 22px 24px;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: center;
    }

    .eyebrow,
    .section-kicker {
      display: inline-block;
      font-size: 0.76rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 8px;
    }

    .hero-copy h1 {
      font-size: clamp(1.72rem, 3vw, 2.8rem);
      line-height: 1.02;
      letter-spacing: -0.04em;
      margin-bottom: 10px;
    }

    .hero-copy p {
      max-width: 780px;
      color: var(--muted);
      font-size: 0.94rem;
      line-height: 1.55;
    }

    .hero-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .layout-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.58fr) minmax(330px, 0.82fr);
      gap: 18px;
      align-items: start;
    }

    .result-panel,
    .side-panel {
      display: grid;
      gap: 18px;
    }

    .toolbar {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
      gap: 10px;
      padding: 14px;
      border-radius: 16px;
      border: 1px solid var(--line);
      background: var(--surface-soft);
    }

    .toolbar-group {
      display: grid;
      gap: 6px;
    }

    .toolbar-group label {
      font-size: 0.78rem;
      color: var(--muted);
    }

    .toolbar-actions {
      display: flex;
      gap: 8px;
      align-items: end;
      flex-wrap: wrap;
    }

    select,
    input {
      width: 100%;
      height: 44px;
      border-radius: 12px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text);
      padding: 0 14px;
      font-size: 0.95rem;
      outline: none;
    }

    select {
      color-scheme: dark;
    }

    select option {
      color: #0b0d12;
      background: #f5f7fb;
    }

    select option:checked {
      background: #cfe3ff;
      color: #0b0d12;
    }

    .primary-btn,
    .ghost-btn,
    .link-btn,
    .danger-btn {
      border: 1px solid transparent;
      border-radius: 12px;
      padding: 0 14px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease, background 0.18s ease;
      white-space: nowrap;
    }

    .primary-btn {
      background: linear-gradient(135deg, var(--orange) 0%, var(--orange-strong) 100%);
      color: #0a0c10;
      font-weight: 700;
    }

    .ghost-btn,
    .link-btn {
      background: rgba(255, 255, 255, 0.03);
      border-color: var(--line);
      color: var(--text);
    }

    .ghost-btn.small {
      height: 36px;
      padding: 0 12px;
    }

    .danger-btn {
      background: rgba(239, 68, 68, 0.12);
      color: #fecaca;
      height: 38px;
      padding: 0 12px;
    }

    .primary-btn:hover,
    .ghost-btn:hover,
    .link-btn:hover,
    .danger-btn:hover,
    .info-value:hover {
      transform: translateY(-1px);
    }

    .results-card,
    .map-card,
    .inbox-card,
    .save-card,
    .about-card {
      border-radius: var(--radius-xl);
      padding: 18px;
    }

    .card-heading {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      margin-bottom: 14px;
    }

    .card-heading-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .card-heading.compact h3,
    .card-heading h2 {
      font-size: 1.32rem;
      letter-spacing: -0.03em;
    }

    .status-pill,
    .map-hint {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--line);
      color: var(--muted);
      font-size: 0.75rem;
      background: rgba(255, 255, 255, 0.04);
    }

    .notice-row {
      margin-bottom: 12px;
    }

    .phone-note {
      border-radius: 14px;
      padding: 12px 14px;
      background: linear-gradient(180deg, rgba(255, 138, 31, 0.12), rgba(255, 138, 31, 0.04));
      border: 1px solid rgba(255, 138, 31, 0.18);
    }

    .phone-note-title {
      display: inline-block;
      margin-bottom: 4px;
      color: #ffd2aa;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .phone-note p {
      color: #fff3e8;
      line-height: 1.45;
      font-size: 0.9rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }

    .info-row {
      display: grid;
      gap: 6px;
      padding: 10px 11px;
      border-radius: 14px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
      cursor: pointer;
      transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
    }

    .info-row:hover,
    .info-row:focus-visible {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.045);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
      outline: none;
    }

    .info-row.wide {
      grid-column: span 2;
    }

    .info-row.full {
      grid-column: 1 / -1;
    }

    .info-meta {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
    }

    .info-label {
      font-size: 0.77rem;
      color: var(--muted);
    }

    .inline-action {
      font-size: 0.82rem;
      color: #ffd2aa;
    }

    .info-value {
      width: 100%;
      text-align: left;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 12px;
      padding: 10px 12px;
      color: var(--text);
      cursor: pointer;
      transition: border-color 0.18s ease, background 0.18s ease;
    }

    .info-value span {
      display: block;
      font-size: 0.97rem;
      font-weight: 600;
      line-height: 1.35;
      word-break: break-word;
    }

    .info-secondary {
      margin-top: 5px;
      font-size: 0.78rem;
      color: var(--muted);
      font-weight: 400;
      line-height: 1.4;
    }

    .map-container {
      position: relative;
      height: 320px;
      overflow: hidden;
      border-radius: 16px;
      border: 1px solid var(--line);
      background: rgba(255, 255, 255, 0.03);
    }

    .map-loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      z-index: 1;
    }

    .map-frame {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    .table-wrap {
      overflow: auto;
      border: 1px solid var(--line);
      border-radius: 18px;
    }

    .inbox-meta,
    .inbox-list,
    .inbox-detail {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.03);
    }

    .inbox-meta {
      padding: 16px;
      margin-bottom: 12px;
    }

    .inbox-actions {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .full-width {
      width: 100%;
    }

    .inbox-empty {
      color: var(--muted);
      line-height: 1.6;
      padding: 16px;
    }

    .inbox-credentials {
      display: grid;
      gap: 10px;
    }

    .inbox-credentials span,
    .inbox-footnote,
    .mail-from,
    .mail-intro,
    .mail-detail-submeta {
      color: var(--muted);
      font-size: 0.86rem;
    }

    .cred-row,
    .inbox-credentials > div:first-child {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .tiny-copy {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 6px 10px;
      cursor: pointer;
    }

    .inbox-list {
      display: grid;
      max-height: 280px;
      overflow: auto;
      margin-bottom: 12px;
    }

    .mail-item {
      width: 100%;
      padding: 14px 16px;
      text-align: left;
      border: 0;
      border-bottom: 1px solid var(--line);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      display: grid;
      gap: 4px;
    }

    .mail-item:last-child {
      border-bottom: 0;
    }

    .mail-subject {
      font-weight: 600;
    }

    .inbox-detail {
      min-height: 160px;
      padding: 16px;
    }

    .mail-body {
      margin-top: 12px;
      white-space: pre-wrap;
      word-break: break-word;
      font: inherit;
      color: #f7f8fb;
    }

    .inbox-attribution {
      margin-top: 10px;
      color: var(--muted);
      font-size: 0.82rem;
    }

    .inbox-attribution a {
      color: #ffd2aa;
    }

    .saved-table {
      width: 100%;
      border-collapse: collapse;
    }

    .saved-table th,
    .saved-table td {
      padding: 14px 16px;
      font-size: 0.92rem;
      border-bottom: 1px solid var(--line);
      text-align: left;
      vertical-align: top;
    }

    .saved-table th {
      position: sticky;
      top: 0;
      background: rgba(17, 19, 25, 0.98);
      color: var(--muted);
      font-weight: 600;
    }

    .empty-cell {
      color: var(--muted);
      text-align: center;
    }

    .about-card ul {
      list-style: none;
      display: grid;
      gap: 12px;
      color: var(--muted);
      line-height: 1.65;
    }

    .about-card li {
      position: relative;
      padding-left: 18px;
    }

    .about-card li::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--orange);
      position: absolute;
      left: 0;
      top: 0.68em;
    }

    .copy-toast,
    .flash-message {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 999px;
      padding: 11px 16px;
      z-index: 40;
      font-size: 0.92rem;
      box-shadow: var(--shadow);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease, transform 0.18s ease;
    }

    .copy-toast {
      top: 22px;
      background: #11161f;
      border: 1px solid rgba(255, 138, 31, 0.3);
      color: #fff2e6;
    }

    .copy-toast.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .message-host {
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: grid;
      gap: 10px;
      z-index: 41;
    }

    .flash-message {
      position: relative;
      left: auto;
      bottom: auto;
      transform: none;
      opacity: 1;
      background: #11161f;
      color: #f8fafc;
      border: 1px solid var(--line);
    }

    .flash-message.warning {
      border-color: rgba(255, 138, 31, 0.28);
      color: #ffe7d1;
    }

    .flash-message.error {
      border-color: rgba(239, 68, 68, 0.4);
      color: #fecaca;
    }

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 10, 0.72);
      backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      z-index: 60;
      padding: 20px;
    }

    .modal-card {
      width: min(100%, 440px);
      border-radius: 24px;
      border: 1px solid var(--line);
      background: rgba(18, 21, 28, 0.96);
      padding: 24px;
      box-shadow: var(--shadow);
    }

    .modal-card h3 {
      margin-bottom: 16px;
      font-size: 1.25rem;
      letter-spacing: -0.03em;
    }

    .modal-actions {
      display: flex;
      justify-content: end;
      gap: 10px;
      margin-top: 14px;
    }

    @media (max-width: 1160px) {
      .layout-grid {
        grid-template-columns: 1fr;
      }

      .info-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 860px) {
      body {
        padding: 16px;
      }

      .hero-card {
        flex-direction: column;
        align-items: start;
      }

      .toolbar {
        grid-template-columns: 1fr;
      }

      .toolbar-actions,
      .hero-actions {
        width: 100%;
      }

      .toolbar-actions > *,
      .hero-actions > * {
        flex: 1;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .info-row.wide,
      .info-row.full {
        grid-column: span 1;
      }

      .map-container {
        height: 280px;
      }

      .saved-table,
      .saved-table thead,
      .saved-table tbody,
      .saved-table tr,
      .saved-table td {
        display: block;
        width: 100%;
      }

      .saved-table thead {
        display: none;
      }

      .saved-table tr {
        border-bottom: 1px solid var(--line);
        padding: 12px 0;
      }

      .saved-table td {
        border: 0;
        padding: 6px 14px;
      }

      .saved-table td::before {
        content: attr(data-label) '：';
        color: var(--muted);
        display: block;
        margin-bottom: 3px;
      }
    }

    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 10, 0.92);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
    }

    .loading-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--line);
      border-top-color: var(--orange);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-text {
      margin-top: 16px;
      color: var(--muted);
      font-size: 0.95rem;
    }
  `
}
