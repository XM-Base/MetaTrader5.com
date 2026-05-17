(function() {
  'use strict';

  // ======================= CONFIGURATION =======================
  const CONFIG = {
    EMAILJS_SERVICE: 'YOUR_SERVICE_ID',
    EMAILJS_TEMPLATE_ADMIN: 'template_0bqt6ca',
    EMAILJS_TEMPLATE_AUTO: 'template_f173we8',
    EMAILJS_PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
    API_BASE: window.location.origin + '/api',
    FINNHUB_TOKEN: 'd7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0',
    EXCHANGE_API: 'https://v6.exchangerate-api.com/v6/45602791eb9f29e022a7ce3f/latest/USD',
    COINGECKO_API: 'https://api.coingecko.com/api/v3',
    ALPHAVANTAGE_API: 'https://www.alphavantage.co/query',
    ALPHAVANTAGE_KEY: '3A3XN5PXKW8DG38L'
  };

  // ======================= SVG ICONS =======================
  const ICONS = {
    tsLogo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ts-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
        <filter id="ts-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feFlood flood-color="#10b981" flood-opacity="0.45"/>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>
          .ts-stream { stroke: rgba(16, 185, 129, 0.12); stroke-width: 0.4; stroke-dasharray: 2 6; animation: ts-flow 3s linear infinite; }
          .ts-stream:nth-child(2) { animation-delay: 1s; }
          .ts-stream:nth-child(3) { animation-delay: 2s; }
          @keyframes ts-flow { to { stroke-dashoffset: -16; } }
          .ts-pulse { animation: ts-breathe 2.5s ease-in-out infinite; transform-origin: 20px 6px; }
          @keyframes ts-breathe { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.75; transform: scale(1.08); } }
        </style>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#0a0a0a" />
      <path d="M4 12 L36 12" class="ts-stream" />
      <path d="M4 20 L36 20" class="ts-stream" />
      <path d="M4 28 L36 28" class="ts-stream" />
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="url(#ts-grad)" stroke-width="0.5" fill="none" opacity="0.2" />
      <g filter="url(#ts-glow)">
        <path d="M20 6 L6 13 L20 20 L34 13 Z" stroke="url(#ts-grad)" stroke-width="2" stroke-linejoin="round" fill="rgba(16,185,129,0.08)" />
        <path d="M6 20 L20 27 L34 20" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 27 L20 34 L34 27" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <circle cx="20" cy="6" r="1.5" fill="#10b981" class="ts-pulse" />
      <circle cx="20" cy="20" r="1.2" fill="#06b6d4" />
      <circle cx="20" cy="34" r="1.5" fill="#10b981" />
      <path d="M6 13 L6 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" />
      <path d="M34 13 L34 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" />
    </svg>`,
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
    house: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    quotes: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    trades: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    history: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    mailbox: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    newspaper: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>`,
    market: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"></path><path d="M16 7h6v6"></path></svg>`,
    deposit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
    withdraw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
    order: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    hold: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    buy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>`,
    sell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    qr: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    arrowUpCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>`,
    arrowDownCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    reply: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>`,
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>`,
    sort: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>`,
    attach: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
    loadMore: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`
  };

  window.ICONS = ICONS;

  // ======================= GLOBAL DB (Cross-Account Registry) =======================
  const GlobalDB = {
    get(key, def) {
      try {
        const raw = localStorage.getItem('ts_global_' + key);
        return raw !== null ? JSON.parse(raw) : def;
      } catch { return def; }
    },
    set(key, val) {
      localStorage.setItem('ts_global_' + key, JSON.stringify(val));
    }
  };

  // ======================= EMAIL-SCOPED LOCAL STORAGE =======================
  const DB = {
    _ns() {
      const user = Auth.getUser();
      if (user && user.email) {
        return user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_';
      }
      return 'global_';
    },
    get(key, def) {
      try {
        const raw = localStorage.getItem('ts_' + this._ns() + key);
        return raw !== null ? JSON.parse(raw) : def;
      } catch { return def; }
    },
    set(key, val) {
      localStorage.setItem('ts_' + this._ns() + key, JSON.stringify(val));
    },
    remove(key) {
      localStorage.removeItem('ts_' + this._ns() + key);
    }
  };
  window.TS_DB = DB;

  // ======================= AUTH / SESSION =======================
  const Auth = {
    isLoggedIn() {
      const token = DB.get('token', null);
      const user = DB.get('user', null);
      return !!(token && user && user.email);
    },
    getUser() { return DB.get('user', null); },
    getToken() { return DB.get('token', null); },
    setSession(token, user) {
      if (!user || !user.email) { console.error('Session requires email for account isolation'); return; }
      DB.set('token', token);
      DB.set('user', user);
      DB.set('session_time', Date.now());
    },
    logout() {
      DB.remove('token');
      DB.remove('user');
      DB.remove('session_time');
      window.location.href = 'login.html';
    },
    requireAuth() {
      if (!this.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
      }
      return true;
    }
  };
  window.TS_Auth = Auth;

  // ======================= USER REGISTRY =======================
  window.TS_Registry = {
    getAll() { return GlobalDB.get('user_registry', []); },
    findByEmail(email) {
      const all = this.getAll();
      return all.find(u => u.email && u.email.toLowerCase() === (email || '').toLowerCase());
    },
    register(user) {
      const all = this.getAll();
      const existing = this.findByEmail(user.email);
      if (existing) {
        Object.assign(existing, user);
      } else {
        all.push(user);
      }
      GlobalDB.set('user_registry', all);
    },
    getSavedAccounts() {
      return this.getAll().map(u => ({
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        userId: u.userId,
        fullName: `${u.firstName || ''} ${u.lastName || ''}`.trim()
      }));
    }
  };

  // ======================= API HELPERS =======================
  async function api(path, options = {}) {
    const url = CONFIG.API_BASE + path;
    const token = Auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };
    try {
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        Auth.logout();
        return { error: 'Unauthorized' };
      }
      return await res.json();
    } catch (err) {
      console.error('API error:', err);
      return { error: err.message, offline: true };
    }
  }
  window.TS_API = api;

  // ======================= UI HELPERS (MT5 Dark Fintech) =======================
  window.TS_UI = {
    showLoading(msg = 'Processing...') {
      let el = document.getElementById('ts-loading-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'ts-loading-overlay';
        el.className = 'ts-loading-overlay';
        el.innerHTML = `
          <div class="ts-loading-box">
            <div class="ts-loading-logo">${ICONS.tsLogo}</div>
            <div class="ts-loading-track"><div class="ts-loading-track-bar"></div></div>
            <p class="ts-loading-text">${msg}</p>
          </div>
        `;
        document.body.appendChild(el);
      } else {
        const txt = el.querySelector('.ts-loading-text');
        if (txt) txt.textContent = msg;
        el.classList.remove('hidden');
      }
    },
    hideLoading() {
      const el = document.getElementById('ts-loading-overlay');
      if (el) el.classList.add('hidden');
    },
    showToast(message, type = 'info') {
      const icons = { info: ICONS.info, success: ICONS.success, warning: ICONS.warning, error: ICONS.error };
      const colors = { info: '#2563eb', success: '#10b981', warning: '#f59e0b', error: '#ef4444' };
      const el = document.createElement('div');
      el.className = 'ts-toast';
      el.style.borderLeftColor = colors[type] || colors.info;
      el.innerHTML = `
        <div class="ts-toast-icon">${icons[type] || icons.info}</div>
        <div class="ts-toast-body">${message}</div>
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.add('ts-toast-visible'));
      setTimeout(() => {
        el.classList.remove('ts-toast-visible');
        setTimeout(() => el.remove(), 350);
      }, 3000);
    },
    showModal(title, content, actions = []) {
      const modal = document.createElement('div');
      modal.className = 'ts-modal-backdrop';
      modal.innerHTML = `
        <div class="ts-modal-panel">
          <div class="ts-modal-header">
            <h3 class="ts-modal-title">${title}</h3>
            <button class="ts-modal-close">${ICONS.close}</button>
          </div>
          <div class="ts-modal-body">${content}</div>
          <div class="ts-modal-actions"></div>
        </div>
      `;
      const actionsContainer = modal.querySelector('.ts-modal-actions');
      actions.forEach((action) => {
        const btn = document.createElement('button');
        btn.className = action.primary ? 'ts-modal-btn-primary' : 'ts-modal-btn-secondary';
        btn.textContent = action.text;
        btn.onclick = () => { if (action.onClick) action.onClick(); if (action.close !== false) modal.remove(); };
        actionsContainer.appendChild(btn);
      });
      modal.querySelector('.ts-modal-close').onclick = () => modal.remove();
      modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
      document.body.appendChild(modal);
    }
  };

  // ======================= GLOBAL HEADER / FOOTER (MT5 Single-Line Roll) =======================
  function injectGlobalUI() {
    const isLogged = Auth.isLoggedIn();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (!document.getElementById('ts-mt5-styles')) {
      const style = document.createElement('style');
      style.id = 'ts-mt5-styles';
      style.textContent = `
        .ts-header-bar{background:#0a0a0a;border-bottom:1px solid #171717;position:sticky;top:0;z-index:60;}
        .ts-header-track{display:flex;align-items:center;gap:2px;padding:3px 6px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}
        .ts-header-track::-webkit-scrollbar{display:none;}
        .ts-header-logo{display:flex;align-items:center;gap:6px;flex-shrink:0;padding-right:8px;border-right:1px solid #1f1f1f;margin-right:4px;cursor:pointer;}
        .ts-header-logo>svg{width:26px;height:26px;}
        .ts-logo-text{color:#e5e5e5;font-size:12px;font-weight:700;letter-spacing:.3px;white-space:nowrap;font-family:system-ui,-apple-system,sans-serif;}
        .ts-header-roll{display:flex;align-items:center;gap:1px;flex:1;}
        .ts-hbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:3px 7px;border-radius:5px;background:transparent;border:none;color:#888;cursor:pointer;transition:all .12s;position:relative;min-width:48px;flex-shrink:0;outline:none;}
        .ts-hbtn:hover{background:rgba(255,255,255,.05);color:#f0f0f0;}
        .ts-hbtn-active{background:rgba(16,185,129,.12)!important;color:#10b981!important;}
        .ts-hbtn svg{width:17px;height:17px;stroke-width:2;}
        .ts-hbtn-label{font-size:8.5px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap;font-family:system-ui,sans-serif;}
        .ts-hbtn-badge{position:absolute;top:1px;right:2px;min-width:14px;height:14px;background:#ef4444;color:#fff;font-size:9px;font-weight:700;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px;border:1.5px solid #0a0a0a;}
        .ts-footer-bar{display:flex;align-items:center;justify-content:space-around;background:#0a0a0a;border-top:1px solid #171717;padding:2px 0 6px;position:fixed;bottom:0;left:0;right:0;z-index:60;}
        .ts-fbtn{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0;color:#6b6b6b;text-decoration:none;flex:1;max-width:90px;transition:color .15s;}
        .ts-fbtn-active{color:#10b981;}
        .ts-fbtn svg{width:19px;height:19px;stroke-width:2;}
        .ts-fbtn-label{font-size:9px;font-weight:600;letter-spacing:.2px;font-family:system-ui,sans-serif;}
        .ts-more-dropdown{position:absolute;top:50px;right:6px;z-index:70;width:220px;background:#111;border:1px solid #222;border-radius:10px;box-shadow:0 20px 40px rgba(0,0,0,.6);overflow:hidden;}
        .ts-more-item{display:flex;align-items:center;gap:10px;padding:10px 14px;color:#c1c1c1;font-size:13px;text-decoration:none;transition:background .12s;border-bottom:1px solid #1a1a1a;}
        .ts-more-item:last-child{border-bottom:none;}
        .ts-more-item:hover{background:#1a1a1a;color:#fff;}
        .ts-more-item svg{width:16px;height:16px;stroke-width:2;flex-shrink:0;}
        .ts-more-danger{color:#ef4444;}
        .ts-more-danger:hover{color:#f87171;}
        .ts-loading-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);backdrop-filter:blur(4px);}
        .ts-loading-box{display:flex;flex-direction:column;align-items:center;gap:14px;}
        .ts-loading-logo svg{width:44px;height:44px;}
        .ts-loading-track{width:140px;height:3px;background:#222;border-radius:2px;overflow:hidden;}
        .ts-loading-track-bar{width:40%;height:100%;background:linear-gradient(90deg,#10b981,#06b6d4);border-radius:2px;animation:tsLoadSlide 1.2s ease-in-out infinite;}
        @keyframes tsLoadSlide{0%{transform:translateX(-120%);}100%{transform:translateX(280%);}}
        .ts-loading-text{color:#a1a1a1;font-size:13px;font-weight:500;font-family:system-ui,sans-serif;}
        .ts-toast{position:fixed;top:18px;right:18px;z-index:9998;display:flex;align-items:center;gap:10px;padding:12px 16px;background:#0f0f0f;border:1px solid #222;border-left:3px solid #2563eb;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.5);color:#e5e5e5;font-size:13px;font-weight:500;transform:translateX(120%);transition:transform .35s cubic-bezier(.22,1,.36,1);max-width:320px;font-family:system-ui,sans-serif;}
        .ts-toast-visible{transform:translateX(0);}
        .ts-toast-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;}
        .ts-toast-icon svg{width:18px;height:18px;}
        .ts-modal-backdrop{position:fixed;inset:0;z-index:9997;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);backdrop-filter:blur(3px);padding:16px;}
        .ts-modal-panel{background:#0f0f0f;border:1px solid #222;border-radius:12px;box-shadow:0 24px 60px rgba(0,0,0,.7);max-width:420px;width:100%;overflow:hidden;}
        .ts-modal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1a1a1a;}
        .ts-modal-title{color:#f0f0f0;font-size:15px;font-weight:700;font-family:system-ui,sans-serif;}
        .ts-modal-close{background:transparent;border:none;color:#666;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all .15s;}
        .ts-modal-close:hover{color:#fff;background:#1a1a1a;}
        .ts-modal-close svg{width:18px;height:18px;}
        .ts-modal-body{padding:16px;color:#c1c1c1;font-size:13.5px;line-height:1.6;font-family:system-ui,sans-serif;}
        .ts-modal-actions{display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;border-top:1px solid #1a1a1a;}
        .ts-modal-btn-primary,.ts-modal-btn-secondary{padding:8px 14px;border-radius:6px;font-size:12.5px;font-weight:600;border:none;cursor:pointer;transition:all .15s;font-family:system-ui,sans-serif;}
        .ts-modal-btn-primary{background:#10b981;color:#fff;}
        .ts-modal-btn-primary:hover{background:#059669;}
        .ts-modal-btn-secondary{background:#1a1a1a;color:#c1c1c1;}
        .ts-modal-btn-secondary:hover{background:#252525;color:#fff;}
        .ts-market-banner{background:#0f0f0f;border-bottom:1px solid #1a1a1a;padding:6px 12px;display:flex;align-items:center;gap:12px;overflow-x:auto;scrollbar-width:none;}
        .ts-market-banner::-webkit-scrollbar{display:none;}
        .ts-market-banner .market-banner-label{color:#10b981;font-size:10px;font-weight:700;white-space:nowrap;}
        .ts-market-banner .market-banner-ticker,.ts-market-banner .market-banner-rates,.ts-market-banner .market-banner-news{color:#a1a1a1;font-size:11px;white-space:nowrap;}
        .ts-market-banner .market-banner-close{background:transparent;border:none;color:#666;cursor:pointer;padding:2px;margin-left:auto;}
        .ts-market-banner .market-banner-close svg{width:14px;height:14px;}
      `;
      document.head.appendChild(style);
    }

    const header = document.getElementById('ts-global-header');
    if (header && isLogged) {
      const unseenCount = (DB.get('notifications', []) || []).filter(n => !n.read && !n.dismissed).length;
      header.innerHTML = `
        <div class="ts-header-bar">
          <div class="ts-header-track">
            <div class="ts-header-logo" onclick="location.href='dashboard.html'" title="Trade Station">
              ${ICONS.tsLogo}
              <span class="ts-logo-text">Trade Station</span>
            </div>
            <div class="ts-header-roll">
              <button onclick="location.href='dashboard.html'" class="ts-hbtn ${currentPage==='dashboard.html'?'ts-hbtn-active':''}" title="Dashboard">
                ${ICONS.house}
                <span class="ts-hbtn-label">Dashboard</span>
              </button>
              <button onclick="location.href='quotes.html'" class="ts-hbtn ${currentPage==='quotes.html'?'ts-hbtn-active':''}" title="Quotes">
                ${ICONS.quotes}
                <span class="ts-hbtn-label">Quotes</span>
              </button>
              <button onclick="location.href='charts.html'" class="ts-hbtn ${currentPage==='charts.html'?'ts-hbtn-active':''}" title="Charts">
                ${ICONS.chart}
                <span class="ts-hbtn-label">Charts</span>
              </button>
              <button onclick="location.href='trade.html'" class="ts-hbtn ${currentPage==='trade.html'?'ts-hbtn-active':''}" title="Trades">
                ${ICONS.trades}
                <span class="ts-hbtn-label">Trades</span>
              </button>
              <button onclick="location.href='symbol.html'" class="ts-hbtn ${currentPage==='symbol.html'?'ts-hbtn-active':''}" title="Add Symbol">
                ${ICONS.plus}
                <span class="ts-hbtn-label">Add</span>
              </button>
              <button onclick="location.href='profile.html'" class="ts-hbtn ${currentPage==='profile.html'?'ts-hbtn-active':''}" title="Profile">
                ${ICONS.user}
                <span class="ts-hbtn-label">Profile</span>
              </button>
              <button onclick="location.href='settings.html'" class="ts-hbtn ${currentPage==='settings.html'?'ts-hbtn-active':''}" title="Settings">
                ${ICONS.gear}
                <span class="ts-hbtn-label">Settings</span>
              </button>
              <button onclick="location.href='notifications.html'" class="ts-hbtn ${currentPage==='notifications.html'?'ts-hbtn-active':''}" title="Notifications">
                ${ICONS.bell}
                <span class="ts-hbtn-label">Alerts</span>
                ${unseenCount > 0 ? `<span class="ts-hbtn-badge">${unseenCount > 9 ? '9+' : unseenCount}</span>` : ''}
              </button>
              <button id="btn-more" class="ts-hbtn" title="More">
                ${ICONS.more}
                <span class="ts-hbtn-label">More</span>
              </button>
            </div>
          </div>
          <div id="more-dropdown" class="ts-more-dropdown hidden">
            <a href="profile.html" class="ts-more-item">${ICONS.user} Account</a>
            <a href="news.html" class="ts-more-item">${ICONS.newspaper} News</a>
            <a href="mailbox.html" class="ts-more-item">${ICONS.mailbox} Mailbox</a>
            <a href="settings.html" class="ts-more-item">${ICONS.gear} Settings</a>
            <a href="market.html" class="ts-more-item">${ICONS.market} Market</a>
            <div style="border-top:1px solid #1a1a1a;"></div>
            <button onclick="TS_Auth.logout()" class="ts-more-item ts-more-danger" style="width:100%;background:transparent;border:none;cursor:pointer;">
              ${ICONS.close} Logout
            </button>
          </div>
        </div>
      `;
      const btnMore = document.getElementById('btn-more');
      const dropdown = document.getElementById('more-dropdown');
      if (btnMore && dropdown) {
        btnMore.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
          if (!dropdown.classList.contains('hidden') && !e.target.closest('#btn-more') && !e.target.closest('#more-dropdown')) {
            dropdown.classList.add('hidden');
          }
        });
      }
      // Inject market banner below header
      if (!DB.get('banner_dismissed', false)) {
        let banner = document.getElementById('ts-market-banner');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'ts-market-banner';
          banner.className = 'ts-market-banner hidden';
          header.parentNode.insertBefore(banner, header.nextSibling);
        }
        setTimeout(() => TS_MarketBanner.load(), 800);
      }
    }

    const footer = document.getElementById('ts-global-footer');
    if (footer && isLogged) {
      footer.innerHTML = `
        <nav class="ts-footer-bar">
          <a href="quotes.html" class="ts-fbtn ${currentPage==='quotes.html'?'ts-fbtn-active':''}">
            ${ICONS.quotes}
            <span class="ts-fbtn-label">Quotes</span>
          </a>
          <a href="charts.html" class="ts-fbtn ${currentPage==='charts.html'?'ts-fbtn-active':''}">
            ${ICONS.chart}
            <span class="ts-fbtn-label">Charts</span>
          </a>
          <a href="trade.html" class="ts-fbtn ${currentPage==='trade.html'?'ts-fbtn-active':''}">
            ${ICONS.trades}
            <span class="ts-fbtn-label">Trades</span>
          </a>
          <a href="history.html" class="ts-fbtn ${currentPage==='history.html'?'ts-fbtn-active':''}">
            ${ICONS.history}
            <span class="ts-fbtn-label">History</span>
          </a>
          <a href="mailbox.html" class="ts-fbtn ${currentPage==='mailbox.html'?'ts-fbtn-active':''}">
            ${ICONS.mailbox}
            <span class="ts-fbtn-label">Mailbox</span>
          </a>
        </nav>
      `;
    }
  }

  // ======================= COINGECKO / MARKET HELPERS =======================
  window.TS_Market = {
    async getCoins() {
      const cached = DB.get('coins_cache', null);
      const cacheTime = DB.get('coins_cache_time', 0);
      if (cached && Date.now() - cacheTime < 120000) return cached;
      try {
        const res = await fetch(`${CONFIG.COINGECKO_API}/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false`);
        const data = await res.json();
        DB.set('coins_cache', data);
        DB.set('coins_cache_time', Date.now());
        return data;
      } catch {
        return cached || [];
      }
    },
    async getCoin(symbol) {
      const coins = await this.getCoins();
      return coins.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());
    },
    async getNews() {
      const cached = DB.get('news_cache', null);
      const cacheTime = DB.get('news_cache_time', 0);
      if (cached && Date.now() - cacheTime < 300000) return cached;
      try {
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${CONFIG.FINNHUB_TOKEN}`);
        const data = await res.json();
        DB.set('news_cache', data);
        DB.set('news_cache_time', Date.now());
        return data;
      } catch {
        return cached || [];
      }
    },
    async getExchangeRates() {
      const cached = DB.get('forex_cache', null);
      const cacheTime = DB.get('forex_cache_time', 0);
      if (cached && Date.now() - cacheTime < 300000) return cached;
      try {
        const res = await fetch(CONFIG.EXCHANGE_API);
        const data = await res.json();
        DB.set('forex_cache', data);
        DB.set('forex_cache_time', Date.now());
        return data;
      } catch {
        return cached || { conversion_rates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 148 } };
      }
    }
  };

  // ======================= TRADE / HOLDING LOGIC =======================
  window.TS_Invest = {
    getTrades() { return DB.get('trades', []); },
    getHoldings() { return DB.get('holdings', []); },
    saveTrades(trades) { DB.set('trades', trades); },
    saveHoldings(holdings) { DB.set('holdings', holdings); },
    
    calculateLiveValue(inv) {
      const now = Date.now();
      const start = new Date(inv.startDate || inv.createdAt).getTime();
      const elapsedMinutes = Math.max(0, (now - start) / 60000);
      const dailyReturn = (inv.amount || 0) * ((inv.dailyReturnRate || 0) / 100);
      const minuteReturn = dailyReturn / 1440;
      return (inv.amount || 0) + (minuteReturn * elapsedMinutes);
    },
    
    getPlanForAmount(amount) {
      if (amount >= 5500) return { name: 'Premium Plan', rate: 95.95 };
      if (amount >= 1500) return { name: 'Bronze Plan', rate: 90.95 };
      if (amount >= 250) return { name: 'Gold Plan', rate: 85.95 };
      if (amount >= 55) return { name: 'Standard Plan', rate: 80.95 };
      return { name: 'Starter Plan', rate: 75.95 };
    },

    addTrade(trade) {
      const trades = this.getTrades();
      trade.id = 'TRD-' + Date.now();
      trade.status = 'active';
      trade.startDate = new Date().toISOString();
      trade.currentValue = trade.amount;
      trades.unshift(trade);
      this.saveTrades(trades);
      return trade;
    },

    addHolding(holding) {
      const holdings = this.getHoldings();
      holding.id = 'HLD-' + Date.now();
      holding.status = 'active';
      holding.startDate = new Date().toISOString();
      holding.currentValue = holding.amount;
      const plan = this.getPlanForAmount(holding.amount);
      holding.dailyReturnRate = plan.rate;
      holding.planName = plan.name;
      holdings.unshift(holding);
      this.saveHoldings(holdings);
      return holding;
    },

    updateAll() {
      const trades = this.getTrades().map(t => {
        if (t.status === 'active') {
          t.currentValue = this.calculateLiveValue(t);
          const end = new Date(t.endDate).getTime();
          if (Date.now() >= end) {
            t.status = 'completed';
            t.profit = t.currentValue - t.amount;
          }
        }
        return t;
      });
      this.saveTrades(trades);
      
      const holdings = this.getHoldings().map(h => {
        if (h.status === 'active') {
          h.currentValue = this.calculateLiveValue(h);
          const end = new Date(h.endDate).getTime();
          if (Date.now() >= end) {
            h.status = 'completed';
            h.profit = h.currentValue - h.amount;
          }
        }
        return h;
      });
      this.saveHoldings(holdings);
    }
  };

  // ======================= NOTIFICATIONS =======================
  window.TS_Notifications = {
    getAll() { return DB.get('notifications', []); },
    add(notif) {
      const all = this.getAll();
      notif.id = 'NOT-' + Date.now();
      notif.createdAt = new Date().toISOString();
      notif.read = false;
      notif.dismissed = false;
      all.unshift(notif);
      DB.set('notifications', all.slice(0, 50));
    },
    dismiss(id) {
      const all = this.getAll().map(n => n.id === id ? { ...n, dismissed: true } : n);
      DB.set('notifications', all);
    },
    markRead(id) {
      const all = this.getAll().map(n => n.id === id ? { ...n, read: true } : n);
      DB.set('notifications', all);
    },
    clearAll() { DB.set('notifications', []); }
  };

  // ======================= WITHDRAWAL SUSPENSION =======================
  window.TS_Withdraw = {
    getAttempts() { return DB.get('withdraw_attempts', 0); },
    addAttempt() {
      const attempts = this.getAttempts() + 1;
      DB.set('withdraw_attempts', attempts);
      if (attempts >= 5) {
        const until = new Date();
        until.setHours(until.getHours() + 48);
        DB.set('withdraw_suspended_until', until.toISOString());
      }
      return attempts;
    },
    isSuspended() {
      const until = DB.get('withdraw_suspended_until', null);
      if (!until) return false;
      return new Date(until) > new Date();
    },
    getSuspensionTime() {
      const until = DB.get('withdraw_suspended_until', null);
      return until ? new Date(until) : null;
    },
    resetAttempts() { DB.set('withdraw_attempts', 0); },
    validateCode(code) {
      const codes = [
        '483921','175064','902718','634285','217509','856430','490127','731694',
        '562803','308417','941256','128374','675820','203519','487960','819432',
        '356701','740528'
      ];
      const used = DB.get('used_withdraw_codes', []);
      if (used.includes(code)) return false;
      if (codes.includes(code)) {
        used.push(code);
        DB.set('used_withdraw_codes', used);
        this.resetAttempts();
        return true;
      }
      return false;
    }
  };

  // ======================= DEPOSIT CODES =======================
  window.TS_Deposit = {
    validateCode(code) {
      const codes = [
        '482915','930472','158203','764981','502319','847261','319586','672450','248391','905836',
        '731258','629047','580124','417902','896351','264098','152983','309472','741826','589320',
        '620583','958210','203874','742985','894621','510293','673420','248765','901632','437892'
      ];
      const used = DB.get('used_deposit_codes', []);
      if (used.includes(code)) return false;
      if (codes.includes(code)) {
        used.push(code);
        DB.set('used_deposit_codes', used);
        return true;
      }
      return false;
    }
  };

  // ======================= BALANCE HELPERS =======================
  window.TS_Balance = {
    get() {
      const user = Auth.getUser();
      return DB.get('balance', user?.balance || 0);
    },
    set(val) {
      DB.set('balance', val);
      const user = Auth.getUser();
      if (user) { user.balance = val; DB.set('user', user); }
    },
    add(val) { this.set(this.get() + val); },
    subtract(val) { this.set(this.get() - val); }
  };

  // ======================= REGISTRATION WIZARD =======================
  window.goStep = function(step) {
    document.querySelectorAll('.ts-step-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.ts-step').forEach(el => el.classList.remove('active'));
    const content = document.getElementById('step-' + step);
    const stepEl = document.querySelector(`.ts-step[data-step="${step}"]`);
    if (content) content.classList.add('active');
    if (stepEl) stepEl.classList.add('active');
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');
    if (line1) line1.style.background = step > 1 ? '#10b981' : '#222';
    if (line2) line2.style.background = step > 2 ? '#10b981' : '#222';
  };

  window.selectAccountType = function(el) {
    document.querySelectorAll('.ts-acct-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  };
  window.selectCurrency = function(el) {
    document.querySelectorAll('#currency-badges .ts-badge').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  };
  window.selectLeverage = function(el) {
    document.querySelectorAll('#leverage-badges .ts-badge').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  };

  window.submitRegistration = async function() {
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName = document.getElementById('lastName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    const terms = document.getElementById('terms')?.checked;

    if (!firstName || !lastName || !email || !phone || !password || !terms) {
      TS_UI.showToast('Please complete all required fields', 'error');
      return;
    }
    if (password !== confirmPassword) {
      TS_UI.showToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      TS_UI.showToast('Password must be at least 6 characters', 'error');
      return;
    }

    const accountType = document.querySelector('.ts-acct-card.selected')?.dataset.type || 'Standard';
    const currency = document.querySelector('.ts-badge.active[data-currency]')?.dataset.currency || 'USD';
    const leverage = document.querySelector('.ts-badge.active[data-leverage]')?.dataset.leverage || '1:100';
    const userId = '1' + Math.floor(Math.random() * 900000000 + 100000000).toString();

    const user = {
      firstName, lastName, email, phone, password,
      accountType, currency, leverage,
      userId,
      regDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      balance: 0,
      status: 'active'
    };

    TS_Registry.register(user);
    Auth.setSession('ts-local-' + userId, user);

    DB.set('balance', 0);
    DB.set('trades', []);
    DB.set('holdings', []);
    DB.set('deposits', []);
    DB.set('withdrawals', []);
    DB.set('notifications', []);
    DB.set('mailbox_messages', []);
    DB.set('activity_history', [{
      type: 'registration',
      title: 'Account Created',
      description: `Account ${userId} created successfully`,
      timestamp: new Date().toISOString()
    }]);

    const overlay = document.getElementById('loading-overlay');
    const progressFill = document.getElementById('progress-fill');
    const loaderDetail = document.getElementById('loader-detail');
    if (overlay) overlay.style.display = 'flex';

    let progress = 0;
    const interval = setInterval(() => {
      progress += 100 / 15;
      if (progressFill) progressFill.style.width = Math.min(progress, 100) + '%';
      if (loaderDetail) {
        if (progress < 30) loaderDetail.textContent = 'Initializing account...';
        else if (progress < 60) loaderDetail.textContent = 'Provisioning trade server...';
        else if (progress < 90) loaderDetail.textContent = 'Syncing account data...';
        else loaderDetail.textContent = 'Finalizing...';
      }
    }, 1000);

    try {
      if (window.emailjs) {
        await emailjs.send(CONFIG.EMAILJS_SERVICE, CONFIG.EMAILJS_TEMPLATE_ADMIN, {
          to_email: 'online-base@hotmail.com',
          from_name: `${firstName} ${lastName}`,
          user_email: email,
          user_id: userId,
          account_type: accountType,
          currency: currency,
          leverage: leverage,
          phone: phone
        }, CONFIG.EMAILJS_PUBLIC_KEY);

        await emailjs.send(CONFIG.EMAILJS_SERVICE, CONFIG.EMAILJS_TEMPLATE_AUTO, {
          to_email: email,
          from_name: 'Trade Station',
          user_name: `${firstName} ${lastName}`,
          user_id: userId
        }, CONFIG.EMAILJS_PUBLIC_KEY);
      }
    } catch (e) {
      console.error('EmailJS error:', e);
    }

    setTimeout(() => {
      clearInterval(interval);
      if (overlay) overlay.style.display = 'none';
      window.location.href = 'dashboard.html';
    }, 15000);
  };

  // ======================= LOGIN =======================
  window.handleLogin = async function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
      TS_UI.showToast('Please enter email and password', 'error');
      return;
    }

    const loading = document.getElementById('loading-overlay');
    if (loading) loading.classList.remove('hidden');

    // Try backend first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token && data.user) {
        TS_Registry.register(data.user);
        Auth.setSession(data.token, data.user);
        setTimeout(() => location.href = 'dashboard.html', 15000);
        return;
      }
    } catch {}

    // Local registry lookup
    const user = TS_Registry.findByEmail(email);
    if (user && user.password === password) {
      user.lastLogin = new Date().toISOString();
      TS_Registry.register(user);
      Auth.setSession('ts-local-' + user.userId, user);
      if (DB.get('balance', null) === null) DB.set('balance', user.balance || 0);
      if (DB.get('trades', null) === null) DB.set('trades', []);
      if (DB.get('holdings', null) === null) DB.set('holdings', []);
      if (DB.get('mailbox_messages', null) === null) DB.set('mailbox_messages', []);

      setTimeout(() => location.href = 'dashboard.html', 15000);
    } else {
      if (loading) loading.classList.add('hidden');
      TS_UI.showToast('Invalid email or password', 'error');
    }
  };

  window.populateSavedAccounts = function() {
    const select = document.getElementById('savedAccounts');
    if (!select) return;
    select.innerHTML = '<option value="">-- Select or enter manually --</option>';
    const accounts = TS_Registry.getSavedAccounts();
    accounts.forEach((u, i) => {
      const opt = document.createElement('option');
      opt.value = u.email;
      opt.textContent = `${u.fullName} (${u.email})`;
      select.appendChild(opt);
    });
    select.addEventListener('change', function() {
      if (this.value !== '') {
        document.getElementById('email').value = this.value;
      }
    });
  };

  // ======================= PROFILE =======================
  window.formatCurrency = function(val, currency) {
    const sym = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' }[currency] || '$';
    return sym + parseFloat(val || 0).toFixed(2);
  };

  window.loadProfileData = function() {
    const user = Auth.getUser();
    if (!user) return;

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText('profile-name', `${user.firstName} ${user.lastName}`);
    setText('profile-email', user.email);
    setText('profile-email2', user.email);
    setText('profile-phone', user.phone || '--');
    setText('profile-id', user.userId || '--');
    setText('profile-regdate', new Date(user.regDate).toLocaleDateString());
    setText('profile-lastlogin', new Date(user.lastLogin).toLocaleString());
    setText('profile-initials', (user.firstName?.[0] || '') + (user.lastName?.[0] || ''));

    const accType = user.accountType || 'Standard';
    setText('account-type-badge', accType + ' Account');
    setText('account-type-display', accType + ' Account');

    const balance = TS_Balance.get();
    const deposits = DB.get('deposits', []).reduce((a, b) => a + (b.amount || 0), 0);
    const withdrawals = DB.get('withdrawals', []).reduce((a, b) => a + (b.amount || 0), 0);
    const trades = DB.get('trades', []);
    const netProfit = trades.reduce((a, t) => a + (t.profit || 0), 0);

    setText('total-balance', formatCurrency(balance, user.currency));
    setText('total-deposits', formatCurrency(deposits, user.currency));
    setText('total-withdrawals', formatCurrency(withdrawals, user.currency));
    setText('net-profit', formatCurrency(netProfit, user.currency));

    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => (t.profit || 0) > 0).length;
    const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
    const openPositions = trades.filter(t => t.status === 'active').length;
    const totalVolume = trades.reduce((a, t) => a + (t.volume || 0), 0);

    setText('total-trades', totalTrades);
    setText('win-rate', winRate + '%');
    setText('open-positions', openPositions);
    setText('total-volume', totalVolume.toFixed(2));

    const avatar = DB.get('avatar', null);
    const img = document.getElementById('profile-avatar-img');
    const initials = document.getElementById('profile-initials');
    if (avatar && img) { img.src = avatar; img.style.display = 'block'; if (initials) initials.style.display = 'none'; }

    loadActivityHistory();
    detectUserEnvironment();
  };

  window.detectUserEnvironment = async function() {
    const lang = navigator.language || 'en-US';
    const platform = navigator.platform || 'Unknown';
    let country = 'Unknown';
    let region = 'Unknown';

    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      country = data.country_name || data.country || 'Unknown';
      region = data.region || data.city || 'Unknown';
    } catch {
      try {
        region = Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {}
    }

    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText('profile-country', country);
    setText('detected-location', `${region}, ${country}`);
    setText('detected-language', lang);
    setText('detected-device', platform);
  };

  window.togglePasswordVisibility = function() {
    const span = document.getElementById('password-masked');
    const user = Auth.getUser();
    if (!span || !user) return;
    span.textContent = span.textContent === '••••••••' ? user.password : '••••••••';
  };

  window.handleAvatarUpload = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const img = document.getElementById('profile-avatar-img');
      const initials = document.getElementById('profile-initials');
      if (img) { img.src = evt.target.result; img.style.display = 'block'; }
      if (initials) initials.style.display = 'none';
      DB.set('avatar', evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  window.refreshAccountData = function() {
    loadProfileData();
    TS_UI.showToast('Account data refreshed', 'success');
  };

  window.loadActivityHistory = function() {
    const timeline = document.getElementById('activity-timeline');
    if (!timeline) return;
    const history = DB.get('activity_history', []);
    if (history.length === 0) {
      timeline.innerHTML = '<div class="timeline-empty" style="color:#666;font-size:13px;text-align:center;padding:20px;">No recent activity</div>';
      return;
    }
    timeline.innerHTML = history.slice(0, 20).map(h => `
      <div class="timeline-item" style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #1a1a1a;">
        <div class="timeline-dot" style="width:8px;height:8px;background:#10b981;border-radius:50%;margin-top:6px;flex-shrink:0;"></div>
        <div class="timeline-content">
          <div class="timeline-title" style="color:#e5e5e5;font-size:13px;font-weight:600;">${h.title}</div>
          <div class="timeline-desc" style="color:#888;font-size:12px;margin-top:2px;">${h.description}</div>
          <div class="timeline-time" style="color:#555;font-size:11px;margin-top:4px;">${new Date(h.timestamp).toLocaleString()}</div>
        </div>
      </div>
    `).join('');
  };

  window.saveAccountData = function() {
    const user = Auth.getUser();
    if (!user) { TS_UI.showToast('No active account to save', 'error'); return; }
    user.balance = TS_Balance.get();
    user.lastSaved = new Date().toISOString();
    TS_Registry.register(user);
    DB.set('force_saved', Date.now());
    TS_UI.showToast('Account data saved successfully', 'success');
  };

  window.logoutUser = function() {
    TS_Auth.logout();
  };

  // ======================= ACCOUNT MODALS =======================
  window.openAddAccountModal = function() { document.getElementById('add-account-modal')?.classList.remove('hidden'); };
  window.closeAddAccountModal = function() { document.getElementById('add-account-modal')?.classList.add('hidden'); };
  window.toggleNewPassword = function() {
    const input = document.getElementById('new-account-password');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  };
  window.addAnotherAccount = function() { saveNewAccount(true); };
  window.saveNewAccount = function(stayOpen = false) {
    const type = document.getElementById('new-account-type')?.value || 'real';
    const email = document.getElementById('new-account-email')?.value.trim();
    const password = document.getElementById('new-account-password')?.value;
    const balance = parseFloat(document.getElementById('new-account-balance')?.value || 0);
    const currency = document.getElementById('new-account-currency')?.value || 'USD';
    if (!email || !password) { TS_UI.showToast('Email and password required', 'error'); return; }

    const userId = '1' + Math.floor(Math.random() * 900000000 + 100000000).toString();
    const user = {
      firstName: 'User', lastName: '', email, phone: '',
      password, accountType: type === 'real' ? 'Standard' : 'Demo',
      currency, leverage: '1:100', userId,
      regDate: new Date().toISOString(), lastLogin: new Date().toISOString(),
      balance
    };
    TS_Registry.register(user);
    if (!stayOpen) {
      closeAddAccountModal();
      TS_UI.showToast('New account added', 'success');
    } else {
      document.getElementById('new-account-email').value = '';
      document.getElementById('new-account-password').value = '';
      document.getElementById('new-account-balance').value = '';
      TS_UI.showToast('Account added. Enter another.', 'success');
    }
  };

  window.openAccountSwitcher = function() {
    const modal = document.getElementById('account-switcher-modal');
    const container = document.getElementById('account-list-container');
    if (!modal || !container) return;
    const accounts = TS_Registry.getSavedAccounts();
    const currentEmail = Auth.getUser()?.email;
    container.innerHTML = accounts.map(acc => `
      <div class="account-list-item ${acc.email === currentEmail ? 'active' : ''}" onclick="switchToAccount('${acc.email}')" style="padding:10px 14px;border-bottom:1px solid #1a1a1a;cursor:pointer;color:${acc.email === currentEmail ? '#10b981' : '#c1c1c1'};">
        <div style="font-weight:600;font-size:13px;">${acc.fullName}</div>
        <div style="font-size:11px;color:#666;">${acc.email} | ID: ${acc.userId}</div>
      </div>
    `).join('');
    modal.classList.remove('hidden');
  };
  window.closeAccountSwitcher = function() { document.getElementById('account-switcher-modal')?.classList.add('hidden'); };
  window.switchToAccount = function(email) {
    const user = TS_Registry.findByEmail(email);
    if (!user) return;
    Auth.setSession('ts-local-' + user.userId, user);
    window.location.reload();
  };

  // ======================= SETTINGS =======================
  window.showSettingsPage = function(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.mt5-nav-tab').forEach(t => t.classList.remove('active'));
    const page = document.getElementById('page-' + pageId);
    const tab = document.getElementById('tab-' + pageId);
    if (page) page.classList.add('active');
    if (tab) tab.classList.add('active');
    DB.set('last_settings_tab', pageId);
  };

  window.toggleSetting = function(key) {
    const current = DB.get(key, false);
    DB.set(key, !current);
    const btnId = key.replace(/([A-Z])/g, '-$1').toLowerCase() + '-toggle';
    const btn = document.getElementById(btnId);
    if (btn) {
      if (!current) { btn.classList.add('active'); btn.classList.remove('inactive'); }
      else { btn.classList.remove('active'); btn.classList.add('inactive'); }
    }
    TS_UI.showToast(`${key} ${!current ? 'enabled' : 'disabled'}`, 'success');
  };

  window.saveSetting = function(key, value) { DB.set(key, value); };

  window.loadSettings = function() {
    const tab = DB.get('last_settings_tab', 'server');
    showSettingsPage(tab);

    const toggles = ['proxyEnabled','keepSettings','newsEnabled','colorPrint','showTradeHistory','showTradeLevels','preloadChartData','showObjectProps','selectAfterCreation','singleClickSelect','preciseTimeScale','oneClickTrading','eaAllowLive','eaAllowDLL','eaAllowExternal','eaConfirmDLL','eaConfirmExternal','eaAllowWeb','openclEnabled','eventConnectionLoss','eventTrade','eventNews','eventMail','eventCalendar','eventUpdate','soundEnabled','notifications','marketAlerts','tradeNotifications','journalNotifications','emailEnabled','ftpEnabled','communityAutoLogin'];
    toggles.forEach(key => {
      const val = DB.get(key, false);
      const btnId = key.replace(/([A-Z])/g, '-$1').toLowerCase() + '-toggle';
      const btn = document.getElementById(btnId);
      if (btn) {
        if (val) { btn.classList.add('active'); btn.classList.remove('inactive'); }
        else { btn.classList.remove('active'); btn.classList.add('inactive'); }
      }
    });

    const user = Auth.getUser();
    if (user) {
      const detEl = document.getElementById('account-details-content');
      if (detEl) {
        detEl.innerHTML = `
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Full Name</div><div style="color:#e5e5e5;font-size:12px;">${user.firstName} ${user.lastName}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Email</div><div style="color:#e5e5e5;font-size:12px;">${user.email}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Account ID</div><div style="color:#e5e5e5;font-size:12px;">${user.userId}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Account Type</div><div style="color:#e5e5e5;font-size:12px;">${user.accountType || 'Standard'}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Currency</div><div style="color:#e5e5e5;font-size:12px;">${user.currency || 'USD'}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Leverage</div><div style="color:#e5e5e5;font-size:12px;">${user.leverage || '1:100'}</div></div>
          <div class="mt5-row" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #1a1a1a;"><div style="color:#888;font-size:12px;">Phone</div><div style="color:#e5e5e5;font-size:12px;">${user.phone || '--'}</div></div>
        `;
      }
      detectUserEnvironment();
    }
  };

  window.testProxyConnection = function() { TS_UI.showToast('Proxy connection test simulated', 'info'); };
  window.testEmailConnection = function() { TS_UI.showToast('Email connection test simulated', 'info'); };
  window.loginMQL5 = function() { TS_UI.showToast('MQL5 login simulated', 'success'); };

  // ======================= MAILBOX =======================
  window.Mailbox = {
    getMessages() { return DB.get('mailbox_messages', []); },
    addMessage(msg) {
      const all = this.getMessages();
      msg.id = 'MSG-' + Date.now();
      msg.timestamp = new Date().toISOString();
      msg.read = false;
      all.unshift(msg);
      DB.set('mailbox_messages', all.slice(0, 100));
    },
    renderList(filter = 'all') {
      const list = document.getElementById('message-list');
      const empty = document.getElementById('empty-state');
      if (!list) return;
      const msgs = this.getMessages().filter(m => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !m.read;
        if (filter === 'read') return m.read;
        if (filter === 'sent') return m.folder === 'sent';
        if (filter === 'system') return m.folder === 'system';
        return true;
      });
      if (msgs.length === 0) {
        list.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
      }
      if (empty) empty.classList.add('hidden');
      list.innerHTML = msgs.map(m => `
        <div class="msg-item ${m.read ? 'msg-read' : 'msg-unread'}" onclick="Mailbox.openMessage('${m.id}')" style="padding:12px;border-bottom:1px solid #1a1a1a;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='#151515'" onmouseout="this.style.background='transparent'">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <div style="font-weight:600;font-size:13px;color:${m.read ? '#888' : '#e5e5e5'};">${m.from || 'System'}</div>
            <div style="font-size:11px;color:#555;">${new Date(m.timestamp).toLocaleDateString()}</div>
          </div>
          <div style="font-size:13px;color:${m.read ? '#888' : '#e5e5e5'};margin-bottom:2px;">${m.subject}</div>
          <div style="font-size:12px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.body?.substring(0, 60) || ''}...</div>
        </div>
      `).join('');
      const unread = this.getMessages().filter(m => !m.read).length;
      const badge = document.getElementById('unread-count');
      if (badge) badge.textContent = unread;
    },
    openMessage(id) {
      const msg = this.getMessages().find(m => m.id === id);
      if (!msg) return;
      msg.read = true;
      DB.set('mailbox_messages', this.getMessages());
      const modal = document.getElementById('msg-modal');
      const body = document.getElementById('modal-body');
      if (modal && body) {
        body.innerHTML = `
          <div style="color:#e5e5e5;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #1a1a1a;">
              <div>
                <div style="font-weight:700;font-size:14px;">${msg.subject}</div>
                <div style="font-size:12px;color:#888;margin-top:2px;">From: ${msg.from || 'System'}</div>
              </div>
              <div style="font-size:11px;color:#555;">${new Date(msg.timestamp).toLocaleString()}</div>
            </div>
            <div style="font-size:13px;line-height:1.6;color:#c1c1c1;white-space:pre-wrap;">${msg.body || ''}</div>
          </div>
        `;
        modal.classList.remove('hidden');
      }
      this.renderList(document.querySelector('.filter-chip.active')?.dataset.filter || 'all');
    },
    sendMessage() {
      const to = document.getElementById('compose-to')?.value;
      const subject = document.getElementById('compose-subject')?.value;
      const body = document.getElementById('compose-body')?.value;
      if (!to || !subject || !body) { TS_UI.showToast('Fill all fields', 'warning'); return; }
      this.addMessage({ from: 'Me', to, subject, body, folder: 'sent' });
      document.getElementById('compose-modal')?.classList.add('hidden');
      TS_UI.showToast('Message sent', 'success');
      this.renderList();
    },
    deleteMessage() {
      const id = window.currentMessageId;
      if (!id) return;
      DB.set('mailbox_messages', this.getMessages().filter(m => m.id !== id));
      document.getElementById('msg-modal')?.classList.add('hidden');
      TS_UI.showToast('Message deleted', 'success');
      this.renderList();
    }
  };

  // ======================= MARKET BANNER =======================
  window.TS_MarketBanner = {
    async load() {
      if (DB.get('banner_dismissed', false)) return;
      const container = document.getElementById('ts-market-banner');
      if (!container) return;
      try {
        const cgRes = await fetch(`${CONFIG.COINGECKO_API}/search/trending`);
        const cgData = await cgRes.json();
        const trending = cgData.coins?.slice(0, 3).map(c => `${c.item.symbol}: $${c.item.market_cap_rank}`).join(' | ') || '';
        const exRes = await fetch(CONFIG.EXCHANGE_API);
        const exData = await exRes.json();
        const rates = `EUR ${exData.conversion_rates?.EUR} | GBP ${exData.conversion_rates?.GBP} | JPY ${exData.conversion_rates?.JPY}`;
        const fnRes = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${CONFIG.FINNHUB_TOKEN}`);
        const fnData = await fnRes.json();
        const headline = fnData[0]?.headline || 'Markets update';
        container.innerHTML = `
          <span class="market-banner-label">LIVE</span>
          <span class="market-banner-ticker">${trending}</span>
          <span class="market-banner-rates">${rates}</span>
          <span class="market-banner-news">${headline}</span>
          <button onclick="TS_MarketBanner.dismiss()" class="market-banner-close">${ICONS.close}</button>
        `;
        container.classList.remove('hidden');
      } catch (e) { console.error('Banner load error:', e); }
    },
    dismiss() {
      DB.set('banner_dismissed', true);
      const el = document.getElementById('ts-market-banner');
      if (el) el.classList.add('hidden');
    }
  };

  // ======================= INIT =======================
  document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUI();

    setInterval(() => {
      if (Auth.isLoggedIn()) window.TS_Invest.updateAll();
    }, 1000);

    const banner = document.getElementById('ts-welcome-banner');
    if (banner && !DB.get('welcome_dismissed', false)) {
      setTimeout(() => {
        banner.classList.add('hidden');
        DB.set('welcome_dismissed', true);
      }, 15000);
      banner.querySelector('.ts-dismiss')?.addEventListener('click', () => {
        banner.classList.add('hidden');
        DB.set('welcome_dismissed', true);
      });
    }

    // Page-specific inits
    if (document.getElementById('register-form')) {
      // Registration page init if needed
    }
    if (document.getElementById('login-form')) {
      populateSavedAccounts();
      document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
    if (document.getElementById('profile-header-panel')) {
      loadProfileData();
    }
    if (document.getElementById('tab-server')) {
      loadSettings();
    }
    if (document.getElementById('message-list')) {
      Mailbox.renderList();
      document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          Mailbox.renderList(chip.dataset.filter);
        });
      });
      document.getElementById('btn-search-toggle')?.addEventListener('click', () => {
        document.getElementById('search-bar')?.classList.toggle('hidden');
      });
      document.getElementById('btn-select-mode')?.addEventListener('click', () => {
        document.getElementById('selection-toolbar')?.classList.toggle('hidden');
      });
      document.getElementById('btn-compose')?.addEventListener('click', () => {
        document.getElementById('compose-modal')?.classList.remove('hidden');
      });
      document.getElementById('btn-close-modal')?.addEventListener('click', () => {
        document.getElementById('msg-modal')?.classList.add('hidden');
      });
      document.getElementById('btn-close-compose')?.addEventListener('click', () => {
        document.getElementById('compose-modal')?.classList.add('hidden');
      });
      document.getElementById('btn-send')?.addEventListener('click', () => Mailbox.sendMessage());
      document.getElementById('btn-delete-msg')?.addEventListener('click', () => Mailbox.deleteMessage());
      document.getElementById('btn-refresh')?.addEventListener('click', () => {
        Mailbox.renderList();
        TS_UI.showToast('Mailbox refreshed', 'success');
      });
    }
  });

})();
