export function getStyles () {
  return String.raw`
    :root {
      color-scheme: dark;

      /* Apple System Dark — background layers */
      --bg:               #000000;
      --surface:          #1c1c1e;
      --surface-elevated: #2c2c2e;
      --surface-tertiary: #3a3a3c;
      --surface-soft:     rgba(118, 118, 128, 0.08);

      /* Text hierarchy — Apple HIG ratios */
      --text:          #ffffff;
      --text-secondary: rgba(235, 235, 245, 0.6);
      --text-tertiary:  rgba(235, 235, 245, 0.3);

      /* Separators */
      --separator:        rgba(84, 84, 88, 0.55);
      --separator-opaque: #38383a;

      /* Accent — Apple Blue (dark) */
      --accent:       #0a84ff;
      --accent-hover: #409cff;
      --accent-soft:  rgba(10, 132, 255, 0.14);

      /* Semantic colours */
      --danger:       #ff453a;
      --danger-soft:  rgba(255, 69, 58, 0.12);
      --warning:      #ff9f0a;
      --warning-soft: rgba(255, 159, 10, 0.1);

      /* Geometry */
      --radius-xl: 16px;
      --radius-lg: 12px;
      --radius-md: 10px;
      --radius-sm:  6px;

      /* Elevation */
      --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.45);
      --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.55);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    [hidden] {
      display: none !important;
    }

    body {
      font-family: -apple-system, "SF Pro Text", "SF Pro Display",
        BlinkMacSystemFont, "Helvetica Neue",
        "PingFang SC", "Hiragino Sans GB",
        "Noto Sans SC", sans-serif;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text);
      padding: 20px;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    button,
    select,
    input,
    textarea {
      font: inherit;
    }

    button:disabled,
    [aria-disabled="true"] {
      cursor: not-allowed;
      opacity: 0.32;
      transform: none !important;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    /* Ambient blobs removed — content is the design */
    .ambient {
      display: none;
    }

    /* ─── Shell ──────────────────────────────────────────────── */

    .app-shell {
      position: relative;
      z-index: 1;
      max-width: 1480px;
      margin: 0 auto;
      display: grid;
      gap: 10px;
    }

    /* ─── Card base ──────────────────────────────────────────── */

    .hero-card,
    .results-card,
    .map-card,
    .inbox-card,
    .save-card,
    .about-card,
    .error-card {
      background: var(--surface);
      border: 1px solid var(--separator);
      border-radius: var(--radius-xl);
    }

    /* ─── Hero ───────────────────────────────────────────────── */

    .hero-card {
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      align-items: center;
    }

    .eyebrow,
    .section-kicker {
      display: block;
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--text-tertiary);
      letter-spacing: 0.01em;
      margin-bottom: 5px;
    }

    .hero-copy h1,
    .error-card h1 {
      font-size: clamp(1.3rem, 2.4vw, 1.85rem);
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 7px;
    }

    .hero-copy p,
    .error-card p {
      max-width: 620px;
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.55;
    }

    .hero-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      flex-shrink: 0;
    }

    /* ─── Layout grid ────────────────────────────────────────── */

    .layout-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(300px, 0.8fr);
      gap: 10px;
      align-items: start;
    }

    .result-panel,
    .side-panel,
    .error-shell {
      display: grid;
      gap: 10px;
    }

    .error-shell {
      max-width: 720px;
      margin: 8vh auto 0;
    }

    .error-card {
      padding: 32px;
    }

    /* ─── Toolbar ────────────────────────────────────────────── */

    .toolbar {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
      gap: 8px;
      padding: 12px;
      border-radius: var(--radius-lg);
      background: var(--surface);
      border: 1px solid var(--separator);
    }

    .toolbar-group {
      display: grid;
      gap: 5px;
    }

    .toolbar-group label {
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--text-secondary);
      padding-left: 3px;
    }

    .toolbar-actions {
      display: flex;
      gap: 6px;
      align-items: end;
      flex-wrap: wrap;
    }

    /* ─── Form controls ──────────────────────────────────────── */

    select,
    input {
      width: 100%;
      height: 36px;
      border-radius: var(--radius-md);
      border: 1px solid var(--separator);
      background: var(--surface-elevated);
      color: var(--text);
      padding: 0 11px;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    select:focus,
    input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }

    select {
      color-scheme: dark;
      cursor: pointer;
    }

    select option {
      background: #2c2c2e;
      color: #ffffff;
    }

    /* ─── Buttons ────────────────────────────────────────────── */

    .primary-btn,
    .ghost-btn,
    .link-btn,
    .danger-btn {
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      padding: 0 14px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      transition: background 0.14s, opacity 0.14s;
    }

    .primary-btn {
      background: var(--accent);
      color: #ffffff;
      font-weight: 600;
    }

    .primary-btn:hover {
      background: var(--accent-hover);
    }

    .ghost-btn,
    .link-btn {
      background: var(--surface-elevated);
      border-color: var(--separator);
      color: var(--text);
    }

    .ghost-btn:hover,
    .link-btn:hover {
      background: var(--surface-tertiary);
    }

    .ghost-btn.small {
      height: 28px;
      padding: 0 10px;
      font-size: 0.78rem;
    }

    .danger-btn {
      background: var(--danger-soft);
      color: var(--danger);
      border-color: rgba(255, 69, 58, 0.2);
      height: 30px;
      padding: 0 12px;
      font-size: 0.8rem;
    }

    /* ─── Card content ───────────────────────────────────────── */

    .results-card,
    .map-card,
    .inbox-card,
    .save-card,
    .about-card {
      padding: 16px 20px;
    }

    .card-heading {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--separator);
    }

    .card-heading-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .card-heading.compact h3,
    .card-heading h2 {
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .status-pill,
    .map-hint {
      padding: 2px 9px;
      border-radius: 999px;
      border: 1px solid var(--separator);
      color: var(--text-secondary);
      font-size: 0.7rem;
      font-weight: 500;
      background: var(--surface-elevated);
    }

    /* ─── Notice ─────────────────────────────────────────────── */

    .notice-row {
      margin-bottom: 12px;
    }

    .phone-note {
      border-radius: var(--radius-md);
      padding: 10px 14px;
      background: var(--warning-soft);
      border: 1px solid rgba(255, 159, 10, 0.18);
    }

    .phone-note-title {
      display: block;
      margin-bottom: 3px;
      color: var(--warning);
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .phone-note p {
      color: rgba(255, 230, 180, 0.85);
      font-size: 0.83rem;
      line-height: 1.5;
    }

    /* ─── Info grid ──────────────────────────────────────────── */

    .info-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
    }

    .info-row {
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 10px 12px;
      border-radius: var(--radius-md);
      background: var(--surface-elevated);
      cursor: pointer;
      transition: background 0.12s;
      position: relative;
    }

    .info-row:hover {
      background: var(--surface-tertiary);
    }

    .info-row:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 1px;
    }

    .info-row.wide {
      grid-column: span 2;
    }

    .info-row.full {
      grid-column: 1 / -1;
    }

    .info-label {
      font-size: 0.68rem;
      font-weight: 500;
      color: var(--text-secondary);
      line-height: 1;
      user-select: none;
    }

    /* Strip the nested rounded box — value lives directly in the row */
    .info-value {
      width: 100%;
      text-align: left;
      background: transparent;
      border: none;
      padding: 0;
      color: var(--text);
      cursor: pointer;
    }

    .info-value span {
      display: block;
      font-size: 0.9rem;
      font-weight: 400;
      line-height: 1.4;
      word-break: break-word;
      font-variant-numeric: tabular-nums;
    }

    .info-secondary {
      font-size: 0.7rem;
      color: var(--text-secondary);
      font-weight: 400;
      line-height: 1.35;
    }

    /* Copy affordance — appears on hover */
    .info-row::after {
      content: '';
      position: absolute;
      top: 9px;
      right: 9px;
      width: 13px;
      height: 13px;
      opacity: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='rgba(235%2C235%2C245%2C0.38)' d='M4 2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4zM6 0h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z'/%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
      transition: opacity 0.12s;
      pointer-events: none;
    }

    .info-row:hover::after {
      opacity: 1;
    }

    /* ─── Map ────────────────────────────────────────────────── */

    .map-container {
      position: relative;
      height: 280px;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--surface-elevated);
    }

    .map-loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      z-index: 1;
      text-align: center;
      padding: 24px;
      font-size: 0.875rem;
    }

    .map-frame {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }

    /* ─── Table ──────────────────────────────────────────────── */

    .table-wrap {
      overflow: auto;
      border: 1px solid var(--separator);
      border-radius: var(--radius-md);
    }

    /* ─── Inbox ──────────────────────────────────────────────── */

    .inbox-meta,
    .inbox-list,
    .inbox-detail {
      border: 1px solid var(--separator);
      border-radius: var(--radius-md);
      background: var(--surface-elevated);
    }

    .inbox-meta {
      padding: 13px 14px;
      margin-bottom: 8px;
    }

    .inbox-actions {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .full-width {
      width: 100%;
    }

    .inbox-empty {
      color: var(--text-secondary);
      line-height: 1.6;
      padding: 14px;
      font-size: 0.875rem;
    }

    .inbox-credentials {
      display: grid;
      gap: 8px;
    }

    .inbox-credentials span,
    .inbox-footnote,
    .mail-from,
    .mail-intro,
    .mail-detail-submeta {
      color: var(--text-secondary);
      font-size: 0.83rem;
    }

    .cred-row,
    .inbox-credentials > div:first-child {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .tiny-copy {
      background: var(--surface-tertiary);
      color: var(--text);
      border: 1px solid var(--separator);
      border-radius: var(--radius-sm);
      padding: 4px 10px;
      cursor: pointer;
      font-size: 0.78rem;
      transition: background 0.12s;
    }

    .tiny-copy:hover {
      background: #48484a;
    }

    .inbox-list {
      display: grid;
      max-height: 240px;
      overflow: auto;
      margin-bottom: 8px;
    }

    .mail-item {
      width: 100%;
      padding: 11px 14px;
      text-align: left;
      border: 0;
      border-bottom: 1px solid var(--separator);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      display: grid;
      gap: 3px;
      font-size: 0.875rem;
      transition: background 0.12s;
    }

    .mail-item:last-child {
      border-bottom: 0;
    }

    .mail-item:hover {
      background: var(--surface-tertiary);
    }

    .mail-subject {
      font-weight: 600;
    }

    .inbox-detail {
      min-height: 120px;
      padding: 14px;
    }

    .mail-body {
      margin-top: 10px;
      white-space: pre-wrap;
      word-break: break-word;
      font: inherit;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .inbox-attribution {
      margin-top: 8px;
      color: var(--text-tertiary);
      font-size: 0.75rem;
    }

    .inbox-attribution a {
      color: var(--accent);
    }

    /* ─── Saved table ────────────────────────────────────────── */

    .saved-table {
      width: 100%;
      border-collapse: collapse;
    }

    .saved-table th,
    .saved-table td {
      padding: 10px 14px;
      font-size: 0.83rem;
      border-bottom: 1px solid var(--separator);
      text-align: left;
      vertical-align: top;
    }

    .saved-table th {
      position: sticky;
      top: 0;
      background: var(--surface-elevated);
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .empty-cell {
      color: var(--text-secondary);
      text-align: center;
      font-size: 0.875rem;
    }

    /* ─── Notes ──────────────────────────────────────────────── */

    .about-card ul {
      list-style: none;
      display: grid;
      gap: 8px;
      color: var(--text-secondary);
      line-height: 1.6;
      font-size: 0.83rem;
    }

    .about-card li {
      position: relative;
      padding-left: 16px;
    }

    .about-card li::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent);
      position: absolute;
      left: 0;
      top: 0.58em;
    }

    /* ─── Toast / Flash ──────────────────────────────────────── */

    .copy-toast,
    .flash-message {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 999px;
      padding: 9px 16px;
      z-index: 40;
      font-size: 0.83rem;
      font-weight: 500;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.18s ease;
    }

    .copy-toast {
      top: 16px;
      background: rgba(44, 44, 46, 0.96);
      border: 1px solid var(--separator);
      color: var(--text);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .copy-toast.visible {
      opacity: 1;
    }

    .message-host {
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: grid;
      gap: 8px;
      z-index: 41;
    }

    .flash-message {
      position: relative;
      left: auto;
      bottom: auto;
      transform: none;
      opacity: 1;
      background: rgba(44, 44, 46, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      color: var(--text);
      border: 1px solid var(--separator);
      padding: 10px 18px;
    }

    .flash-message.warning {
      border-color: rgba(255, 159, 10, 0.3);
      color: #ffd180;
    }

    .flash-message.error {
      border-color: rgba(255, 69, 58, 0.35);
      color: #ff9c95;
    }

    /* ─── Modal ──────────────────────────────────────────────── */

    .modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.62);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      align-items: center;
      justify-content: center;
      z-index: 60;
      padding: 20px;
      display: flex;
    }

    .modal-card {
      width: min(100%, 400px);
      border-radius: 20px;
      border: 1px solid var(--separator);
      background: #2c2c2e;
      padding: 24px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
    }

    .modal-card h3 {
      margin-bottom: 14px;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .modal-actions {
      display: flex;
      justify-content: end;
      gap: 8px;
      margin-top: 14px;
    }

    /* ─── Loading overlay ────────────────────────────────────── */

    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 100;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    .loading-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    /* System-style activity indicator */
    .loading-spinner {
      width: 28px;
      height: 28px;
      border: 2.5px solid rgba(255, 255, 255, 0.14);
      border-top-color: rgba(255, 255, 255, 0.88);
      border-radius: 50%;
      animation: spin 0.65s linear infinite;
    }

    .loading-text {
      margin-top: 14px;
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* ─── Responsive ─────────────────────────────────────────── */

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
        padding: 12px;
      }

      .hero-card {
        flex-direction: column;
        align-items: start;
        padding: 20px;
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
        height: 220px;
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
        border-bottom: 1px solid var(--separator);
        padding: 10px 0;
      }

      .saved-table td {
        border: 0;
        padding: 4px 14px;
      }

      .saved-table td::before {
        content: attr(data-label) '：';
        color: var(--text-secondary);
        display: block;
        margin-bottom: 2px;
        font-size: 0.7rem;
        font-weight: 500;
      }
    }
  `
}
