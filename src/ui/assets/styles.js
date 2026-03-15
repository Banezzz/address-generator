export function getStyles () {
  return String.raw`
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

    [hidden] {
      display: none !important;
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

    button,
    select,
    input,
    textarea {
      font: inherit;
    }

    button:disabled,
    [aria-disabled="true"] {
      cursor: not-allowed;
      opacity: 0.65;
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
    .inbox-card,
    .save-card,
    .about-card,
    .error-card {
      border: 1px solid var(--line);
      background: var(--surface);
      backdrop-filter: blur(18px);
      box-shadow: var(--shadow);
      border-radius: var(--radius-xl);
    }

    .hero-card {
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

    .hero-copy h1,
    .error-card h1 {
      font-size: clamp(1.72rem, 3vw, 2.8rem);
      line-height: 1.02;
      letter-spacing: -0.04em;
      margin-bottom: 10px;
    }

    .hero-copy p,
    .error-card p {
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
    .side-panel,
    .error-shell {
      display: grid;
      gap: 18px;
    }

    .error-shell {
      max-width: 820px;
      margin: 8vh auto 0;
    }

    .error-card {
      padding: 32px;
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

    .info-label {
      font-size: 0.77rem;
      color: var(--muted);
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
      text-align: center;
      padding: 24px;
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
      position: fixed;
      inset: 0;
      background: rgba(5, 7, 10, 0.72);
      backdrop-filter: blur(8px);
      align-items: center;
      justify-content: center;
      z-index: 60;
      padding: 20px;
      display: flex;
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

    .loading-text {
      margin-top: 16px;
      color: var(--muted);
      font-size: 0.95rem;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
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
  `
}
