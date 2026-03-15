export function getClientScript () {
  return String.raw`
const SAVED_ADDRESSES_KEY = 'saved-addresses-v2';
const LIVE_INBOX_KEY = 'live-temp-inbox-v2';
const payload = readPayload();
const regionConfigMap = Object.fromEntries((payload.regionConfigs || []).map(function (region) {
  return [region.id, region];
}));

const state = {
  inboxBusy: false,
  volatileInboxPassword: '',
  copyToastTimerId: null
};

init();

function init() {
  hideLoading();
  syncSelectionControlsWithPayload();
  bindSelectionControls();
  bindFormSubmit();
  bindDocumentActions();
  bindDialog();
  bindMapFrame();
  bindNoteInput();
  renderSavedAddresses();
  renderInbox();

  window.addEventListener('pageshow', function () {
    hideLoading();
    syncSelectionControlsWithPayload();
  });
}

function readPayload() {
  var node = document.getElementById('appPayload');
  if (!node) {
    return {};
  }

  try {
    var source = node.textContent || node.innerHTML || '{}';
    return JSON.parse(source);
  } catch (error) {
    return {};
  }
}

function bindDocumentActions() {
  document.addEventListener('click', function (event) {
    var actionTarget = event.target.closest('[data-action]');
    if (actionTarget) {
      handleAction(event, actionTarget);
      return;
    }

    var copyTarget = event.target.closest('[data-copy-value]');
    if (copyTarget && !event.target.closest('a, button, input, select, textarea')) {
      copyToClipboard(copyTarget.getAttribute('data-copy-value') || '');
    }
  });

  document.addEventListener('keydown', function (event) {
    var copyTarget = event.target.closest('.copy-card[data-copy-value]');
    if (copyTarget && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      copyToClipboard(copyTarget.getAttribute('data-copy-value') || '');
      return;
    }

    if (event.key === 'Escape') {
      closeSaveDialog();
    }
  });
}

function bindDialog() {
  var dialog = document.getElementById('saveDialog');
  if (!dialog) {
    return;
  }

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) {
      closeSaveDialog();
    }
  });
}

function bindNoteInput() {
  var noteInput = document.getElementById('noteInput');
  if (!noteInput) {
    return;
  }

  noteInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveAddress();
    }
  });
}

function bindMapFrame() {
  var mapFrame = document.querySelector('.map-frame');
  if (!mapFrame) {
    handleMapError();
    return;
  }

  mapFrame.addEventListener('load', handleMapLoad);
  mapFrame.addEventListener('error', handleMapError);
  setTimeout(function () {
    var loadingNode = document.getElementById('mapLoading');
    if (loadingNode && !loadingNode.hasAttribute('hidden')) {
      handleMapError();
    }
  }, 8000);
}

function bindSelectionControls() {
  var regionSelect = document.getElementById('region');
  var subregionSelect = document.getElementById('subregion');

  if (regionSelect) {
    regionSelect.addEventListener('input', function (event) {
      changeRegion(event.target.value);
    });
    regionSelect.addEventListener('change', function (event) {
      changeRegion(event.target.value);
    });
  }

  if (subregionSelect) {
    subregionSelect.addEventListener('focus', function () {
      ensureSubregionSync();
    });
    subregionSelect.addEventListener('pointerdown', function () {
      ensureSubregionSync();
    });
    subregionSelect.addEventListener('mousedown', function () {
      ensureSubregionSync();
    });
    subregionSelect.addEventListener('input', function (event) {
      changeSubregion(event.target.value);
    });
    subregionSelect.addEventListener('change', function (event) {
      changeSubregion(event.target.value);
    });
  }
}

function bindFormSubmit() {
  var form = document.getElementById('generatorForm');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function () {
    showLoading();
  });
}

function handleAction(event, target) {
  var action = target.getAttribute('data-action');

  if (action === 'share') {
    event.preventDefault();
    shareResult();
    return;
  }

  if (action === 'open-save-dialog') {
    event.preventDefault();
    showSaveDialog();
    return;
  }

  if (action === 'close-save-dialog') {
    event.preventDefault();
    closeSaveDialog();
    return;
  }

  if (action === 'confirm-save') {
    event.preventDefault();
    saveAddress();
    return;
  }

  if (action === 'delete-saved') {
    event.preventDefault();
    deleteAddress(Number(target.getAttribute('data-index')));
    return;
  }

  if (action === 'export-csv') {
    event.preventDefault();
    exportToCSV();
    return;
  }

  if (action === 'create-inbox') {
    event.preventDefault();
    createLiveInbox();
    return;
  }

  if (action === 'refresh-inbox') {
    event.preventDefault();
    refreshInboxMessages();
    return;
  }

  if (action === 'clear-inbox') {
    event.preventDefault();
    clearLiveInbox();
    return;
  }

  if (action === 'open-message') {
    event.preventDefault();
    openInboxMessage(target.getAttribute('data-message-id') || '');
    return;
  }
}

function showLoading() {
  var overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.add('visible');
  }
}

function hideLoading() {
  var overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.classList.remove('visible');
  }
}

function getSavedAddresses() {
  try {
    var raw = localStorage.getItem(SAVED_ADDRESSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function setSavedAddresses(addresses) {
  try {
    localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(addresses));
  } catch (error) {}
}

function getLiveInbox() {
  try {
    var raw = sessionStorage.getItem(LIVE_INBOX_KEY);
    if (!raw) {
      return null;
    }

    var inbox = JSON.parse(raw);
    if (!inbox) {
      return null;
    }

    return {
      address: inbox.address || '',
      createdAt: inbox.createdAt || '',
      provider: inbox.provider || 'mail.tm',
      providerUrl: inbox.providerUrl || 'https://mail.tm',
      attributionUrl: inbox.attributionUrl || 'https://mail.tm',
      token: inbox.token || '',
      refreshedAt: inbox.refreshedAt || '',
      messages: Array.isArray(inbox.messages) ? inbox.messages : [],
      selectedMessage: inbox.selectedMessage || null,
      password: state.volatileInboxPassword || ''
    };
  } catch (error) {
    return null;
  }
}

function setLiveInbox(inbox) {
  if (!inbox) {
    state.volatileInboxPassword = '';
    try {
      sessionStorage.removeItem(LIVE_INBOX_KEY);
    } catch (error) {}
    return;
  }

  if (Object.prototype.hasOwnProperty.call(inbox, 'password')) {
    state.volatileInboxPassword = inbox.password || '';
  }

  try {
    sessionStorage.setItem(LIVE_INBOX_KEY, JSON.stringify({
      address: inbox.address || '',
      createdAt: inbox.createdAt || '',
      provider: inbox.provider || 'mail.tm',
      providerUrl: inbox.providerUrl || 'https://mail.tm',
      attributionUrl: inbox.attributionUrl || 'https://mail.tm',
      token: inbox.token || '',
      refreshedAt: inbox.refreshedAt || '',
      messages: Array.isArray(inbox.messages) ? inbox.messages : [],
      selectedMessage: inbox.selectedMessage || null
    }));
  } catch (error) {}
}

function buildQuery(regionId, subregionId, forceRefresh) {
  var url = new URL(window.location.href);
  url.searchParams.set('region', regionId);

  if (subregionId) {
    url.searchParams.set('subregion', subregionId);
  } else {
    url.searchParams.delete('subregion');
  }

  if (forceRefresh) {
    url.searchParams.set('refresh', String(Date.now()));
  } else {
    url.searchParams.delete('refresh');
  }

  return url.toString();
}

function getCurrentSelection() {
  var regionSelect = document.getElementById('region');
  var subregionSelect = document.getElementById('subregion');

  return {
    regionId: regionSelect && regionSelect.value ? regionSelect.value : payload.regionId,
    subregionId: subregionSelect && subregionSelect.value ? subregionSelect.value : payload.subregionId
  };
}

function getSubregionOptionsForRegion(regionId) {
  return payload.subregionOptionsByRegion && payload.subregionOptionsByRegion[regionId]
    ? payload.subregionOptionsByRegion[regionId]
    : [];
}

function areSubregionOptionsInSync(regionId) {
  var subregionSelect = document.getElementById('subregion');
  var expectedOptions = getSubregionOptionsForRegion(regionId);

  if (!subregionSelect) {
    return true;
  }

  if (subregionSelect.options.length !== expectedOptions.length) {
    return false;
  }

  return expectedOptions.every(function (option, index) {
    var renderedOption = subregionSelect.options[index];
    return renderedOption && renderedOption.value === option.id && renderedOption.textContent === option.label;
  });
}

function renderSubregionOptions(regionId, preferredSubregion) {
  var subregionSelect = document.getElementById('subregion');
  var subregionLabel = document.getElementById('subregionLabel');
  var regionConfig = regionConfigMap[regionId] || regionConfigMap[payload.regionId];
  var options = getSubregionOptionsForRegion(regionId);

  if (subregionLabel && regionConfig) {
    subregionLabel.textContent = regionConfig.subregionLabelNative + ' / ' + regionConfig.subregionLabel;
  }

  if (!subregionSelect) {
    return preferredSubregion || '';
  }

  subregionSelect.innerHTML = options.map(function (option) {
    return '<option value="' + escapeForHtml(option.id) + '">' + escapeForHtml(option.label) + '</option>';
  }).join('');

  var hasPreferred = preferredSubregion && options.some(function (option) {
    return option.id === preferredSubregion;
  });
  var nextSubregion = hasPreferred ? preferredSubregion : (options[0] ? options[0].id : '');
  subregionSelect.value = nextSubregion;
  return nextSubregion;
}

function applySelection(regionId, preferredSubregion) {
  var regionSelect = document.getElementById('region');
  if (regionSelect) {
    regionSelect.value = regionId;
  }

  return renderSubregionOptions(regionId, preferredSubregion || '');
}

function syncSelectionControlsWithPayload() {
  applySelection(payload.regionId, payload.subregionId);
}

function ensureSubregionSync(preferredSubregion) {
  var selection = getCurrentSelection();
  var options = getSubregionOptionsForRegion(selection.regionId);
  var candidateSubregion = preferredSubregion || selection.subregionId;
  var hasCandidate = candidateSubregion && options.some(function (option) {
    return option.id === candidateSubregion;
  });

  if (areSubregionOptionsInSync(selection.regionId) && hasCandidate) {
    return candidateSubregion;
  }

  var nextSubregion = renderSubregionOptions(selection.regionId, candidateSubregion);
  syncSelectionUrl(selection.regionId, nextSubregion);
  return nextSubregion;
}

function refreshCurrent(forceRefresh) {
  ensureSubregionSync('');
  showLoading();
  var selection = getCurrentSelection();
  window.location.href = buildQuery(selection.regionId, selection.subregionId, forceRefresh !== false);
}

function syncSelectionUrl(regionId, subregionId) {
  window.history.replaceState({}, '', buildQuery(regionId, subregionId, false));
}

function changeRegion(regionId) {
  var nextSubregion = renderSubregionOptions(regionId, '');
  syncSelectionUrl(regionId, nextSubregion);
}

function changeSubregion(subregionId) {
  var selection = getCurrentSelection();
  syncSelectionUrl(selection.regionId, subregionId || selection.subregionId);
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    showCopyToast();
  } catch (error) {
    showMessage('复制失败 / Copy failed', 'error');
  }
}

function fallbackCopy(text) {
  var input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'absolute';
  input.style.left = '-9999px';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

function showCopyToast() {
  var toast = document.getElementById('copyToast');
  if (!toast) {
    return;
  }

  toast.classList.add('visible');
  if (state.copyToastTimerId) {
    clearTimeout(state.copyToastTimerId);
  }

  state.copyToastTimerId = setTimeout(function () {
    toast.classList.remove('visible');
  }, 1200);
}

function getInboxHint() {
  var fullName = payload.profile && payload.profile.fullNameLatin ? payload.profile.fullNameLatin : 'address-user';
  return (fullName + '-' + payload.regionId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function withInboxBusy(task) {
  if (state.inboxBusy) {
    return;
  }

  state.inboxBusy = true;
  renderInbox();

  try {
    return await task();
  } finally {
    state.inboxBusy = false;
    renderInbox();
  }
}

async function createLiveInbox() {
  return withInboxBusy(async function () {
    showMessage('正在创建真实邮箱 / Creating inbox');
    var data = await fetchJson('/api/inbox/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ hint: getInboxHint() })
    });

    setLiveInbox({
      provider: data.provider,
      providerUrl: data.providerUrl,
      attributionUrl: data.attributionUrl,
      address: data.address,
      password: data.password,
      token: data.token,
      createdAt: data.createdAt,
      messages: [],
      selectedMessage: null
    });
    renderInbox();
    showMessage('邮箱已创建 / Inbox created');
    await refreshInboxMessages();
  }).catch(function (error) {
    showMessage('创建邮箱失败 / ' + error.message, 'error');
  });
}

function clearLiveInbox() {
  setLiveInbox(null);
  renderInbox();
  showMessage('已清除当前标签页的邮箱会话 / Inbox session cleared', 'warning');
}

async function refreshInboxMessages() {
  var inbox = getLiveInbox();
  if (!inbox || !inbox.token) {
    renderInbox();
    return;
  }

  return withInboxBusy(async function () {
    var data = await fetchJson('/api/inbox/messages', {
      headers: {
        Authorization: 'Bearer ' + inbox.token
      }
    });

    setLiveInbox({
      address: inbox.address,
      password: inbox.password,
      token: inbox.token,
      provider: inbox.provider,
      providerUrl: inbox.providerUrl,
      attributionUrl: inbox.attributionUrl,
      createdAt: inbox.createdAt,
      refreshedAt: new Date().toISOString(),
      messages: data.messages || [],
      selectedMessage: null
    });
  }).catch(function (error) {
    showMessage('收件箱刷新失败 / ' + error.message, 'error');
  });
}

async function openInboxMessage(messageId) {
  var inbox = getLiveInbox();
  if (!inbox || !inbox.token || !messageId) {
    return;
  }

  return withInboxBusy(async function () {
    var data = await fetchJson('/api/inbox/message?id=' + encodeURIComponent(messageId), {
      headers: {
        Authorization: 'Bearer ' + inbox.token
      }
    });

    setLiveInbox({
      address: inbox.address,
      password: inbox.password,
      token: inbox.token,
      provider: inbox.provider,
      providerUrl: inbox.providerUrl,
      attributionUrl: inbox.attributionUrl,
      createdAt: inbox.createdAt,
      refreshedAt: inbox.refreshedAt,
      messages: inbox.messages,
      selectedMessage: data.message || null
    });
  }).catch(function (error) {
    showMessage('读取邮件失败 / ' + error.message, 'error');
  });
}

function renderInbox() {
  var inboxMeta = document.getElementById('inboxMeta');
  var inboxActions = document.getElementById('inboxActions');
  var inboxList = document.getElementById('inboxList');
  var inboxDetail = document.getElementById('inboxDetail');
  var inbox = getLiveInbox();
  var emailEntry = payload.emailEntry || {
    address: '',
    helperText: 'Suggested alias unavailable'
  };

  if (!inboxMeta || !inboxActions || !inboxList || !inboxDetail) {
    return;
  }

  if (!inbox || !inbox.address) {
    inboxMeta.innerHTML =
      '<div class="inbox-empty">' +
        '<strong>Suggested:</strong> ' + escapeForHtml(emailEntry.address) + '<br />' +
        '<span>' + escapeForHtml(emailEntry.helperText) + '</span>' +
      '</div>';
    inboxActions.innerHTML =
      '<button class="primary-btn full-width" type="button" data-action="create-inbox"' + disabledAttr(state.inboxBusy) + '>' +
        (state.inboxBusy ? '创建中 / Creating...' : '创建真实临时邮箱 / Create live inbox') +
      '</button>';
    inboxList.innerHTML = '';
    inboxDetail.innerHTML = '';
    return;
  }

  var refreshedText = inbox.refreshedAt ? new Date(inbox.refreshedAt).toLocaleString() : 'Not refreshed yet';
  var passwordMarkup = inbox.password
    ? '<div class="cred-row"><span>Password</span><button class="tiny-copy" type="button" data-copy-value="' + escapeForHtml(inbox.password) + '">复制</button></div><strong>' + escapeForHtml(inbox.password) + '</strong>'
    : '<div class="inbox-footnote">Password was only shown when the inbox was created in this tab.</div>';

  inboxMeta.innerHTML =
    '<div class="inbox-credentials">' +
      '<div><span>Address</span><button class="tiny-copy" type="button" data-copy-value="' + escapeForHtml(inbox.address) + '">复制</button></div>' +
      '<strong>' + escapeForHtml(inbox.address) + '</strong>' +
      passwordMarkup +
      '<div class="inbox-footnote">Refreshed: ' + escapeForHtml(refreshedText) + '</div>' +
      '<div class="inbox-footnote">Token stays in session storage until this tab closes.</div>' +
    '</div>';

  inboxActions.innerHTML =
    '<button class="ghost-btn small" type="button" data-action="refresh-inbox"' + disabledAttr(state.inboxBusy) + '>' + (state.inboxBusy ? '刷新中...' : '刷新邮件') + '</button>' +
    '<button class="ghost-btn small" type="button" data-action="clear-inbox"' + disabledAttr(state.inboxBusy) + '>清除会话</button>';

  if (!inbox.messages || inbox.messages.length === 0) {
    inboxList.innerHTML = '<div class="inbox-empty">No messages yet. Use this address in a sign-up flow and click refresh.</div>';
  } else {
    inboxList.innerHTML = inbox.messages.map(function (message) {
      return '<button class="mail-item" type="button" data-action="open-message" data-message-id="' + escapeForHtml(message.id) + '"' + disabledAttr(state.inboxBusy) + '>' +
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
  var dialog = document.getElementById('saveDialog');
  var noteInput = document.getElementById('noteInput');
  if (!dialog) {
    return;
  }

  dialog.hidden = false;
  dialog.setAttribute('aria-hidden', 'false');
  if (noteInput) {
    noteInput.value = '';
    noteInput.focus();
  }
}

function closeSaveDialog() {
  var dialog = document.getElementById('saveDialog');
  if (!dialog) {
    return;
  }

  dialog.hidden = true;
  dialog.setAttribute('aria-hidden', 'true');
}

function showMessage(text, tone) {
  var host = document.getElementById('messageHost');
  if (!host) {
    return;
  }

  var node = document.createElement('div');
  node.className = 'flash-message ' + (tone || 'success');
  node.textContent = text;
  node.setAttribute('role', tone === 'error' ? 'alert' : 'status');
  host.appendChild(node);
  setTimeout(function () {
    node.remove();
  }, 2200);
}

function saveAddress() {
  var noteInput = document.getElementById('noteInput');
  var note = noteInput && noteInput.value.trim() ? noteInput.value.trim() : '无备注';
  var addresses = getSavedAddresses();
  var exists = addresses.some(function (entry) {
    return entry.fullAddress === payload.address.fullAddress;
  });

  if (exists) {
    showMessage('已存在相同地址 / Duplicate address', 'warning');
    return;
  }

  addresses.unshift({
    note: note,
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
  var addresses = getSavedAddresses();
  if (!Number.isInteger(index) || index < 0 || index >= addresses.length) {
    return;
  }

  addresses.splice(index, 1);
  setSavedAddresses(addresses);
  renderSavedAddresses();
}

function renderSavedAddresses() {
  var rows = getSavedAddresses();
  var body = document.getElementById('savedAddressesBody');
  if (!body) {
    return;
  }

  if (!rows.length) {
    body.innerHTML = '<tr><td colspan="6" class="empty-cell">暂无保存的地址 / No saved entries</td></tr>';
    return;
  }

  body.innerHTML = rows.map(function (row, index) {
    return '<tr>' +
      '<td data-label="备注">' + escapeForHtml(row.note) + '</td>' +
      '<td data-label="地区">' + escapeForHtml(row.region) + '</td>' +
      '<td data-label="姓名">' + escapeForHtml(row.name) + '</td>' +
      '<td data-label="电话">' + escapeForHtml(row.phone) + '</td>' +
      '<td data-label="地址">' + escapeForHtml(row.fullAddress) + '</td>' +
      '<td data-label="操作"><button class="danger-btn" type="button" data-action="delete-saved" data-index="' + String(index) + '">删除</button></td>' +
    '</tr>';
  }).join('');
}

function exportToCSV() {
  var rows = getSavedAddresses();
  if (!rows.length) {
    showMessage('没有可导出的地址 / Nothing to export', 'warning');
    return;
  }

  var headers = ['备注', '地区', '姓名', '电话', '地址'];
  var content = [headers.join(',')].concat(rows.map(function (row) {
    return [row.note, row.region, row.name, row.phone, row.fullAddress]
      .map(function (field) {
        return '"' + String(field).replace(/"/g, '""') + '"';
      })
      .join(',');
  })).join('\n');

  var blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), content], { type: 'text/csv;charset=utf-8;' });
  var link = document.createElement('a');
  var objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = 'saved-addresses.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

function handleMapLoad() {
  var loadingNode = document.getElementById('mapLoading');
  if (loadingNode) {
    loadingNode.hidden = true;
  }
}

function handleMapError() {
  var loadingNode = document.getElementById('mapLoading');
  if (loadingNode) {
    loadingNode.hidden = false;
    loadingNode.textContent = '地图加载失败 / Map failed to load';
  }
}

async function shareResult() {
  var shareData = {
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

  await copyToClipboard(window.location.href);
  showMessage('链接已复制 / Link copied');
}

async function fetchJson(url, init) {
  var response = await fetch(url, init);
  var data = {};

  try {
    data = await response.json();
  } catch (error) {}

  if (!response.ok) {
    var message = data && data.error && data.error.message
      ? data.error.message
      : data.message || data.detail || 'Request failed';
    throw new Error(message);
  }

  return data;
}

function escapeForHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function disabledAttr(disabled) {
  return disabled ? ' disabled aria-disabled="true"' : '';
}
`
}
