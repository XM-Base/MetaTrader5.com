(function() {
  'use strict';

  const API_BASE = window.location.origin + '/api';

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
    backArrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
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
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    dollar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    server: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    attach: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
    reply: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    sort: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>`,
    grid: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    save: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    activity: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    barChart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    liveDot: `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="#10b981"/><circle cx="4" cy="4" r="3" fill="#10b981" opacity="0.4"><animate attributeName="r" from="3" to="6" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite"/></circle></svg>`
  };

  window.ICONS = ICONS;

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
    },
    // Global storage (not scoped to email)
    getGlobal(key, def) {
      try {
        const raw = localStorage.getItem('ts_global_' + key);
        return raw !== null ? JSON.parse(raw) : def;
      } catch { return def; }
    },
    setGlobal(key, val) {
      localStorage.setItem('ts_global_' + key, JSON.stringify(val));
    },
    removeGlobal(key) {
      localStorage.removeItem('ts_global_' + key);
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
      // Update last login
      DB.set('lastLogin', new Date().toISOString());
      // Detect location for the user
      this.detectUserLocation();
    },
    logout() {
      // Save current state before logout
      this.saveCurrentState();
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
    },
    saveCurrentState() {
      const user = this.getUser();
      if (user) {
        const allUsers = DB.getGlobal('all_users', []);
        const idx = allUsers.findIndex(u => u.email === user.email);
        if (idx >= 0) {
          allUsers[idx] = { ...allUsers[idx], ...user, lastSaved: new Date().toISOString() };
        } else {
          allUsers.push({ ...user, lastSaved: new Date().toISOString() });
        }
        DB.setGlobal('all_users', allUsers);
      }
    },
    detectUserLocation() {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          const user = this.getUser();
          if (user) {
            user.location = {
              country: data.country_name || 'Unknown',
              countryCode: data.country_code || '--',
              city: data.city || 'Unknown',
              region: data.region || 'Unknown',
              ip: data.ip || '--',
              timezone: data.timezone || '--',
              languages: data.languages || '--',
              currency: data.currency || 'USD'
            };
            user.language = data.languages ? data.languages.split(',')[0] : 'en';
            DB.set('user', user);
          }
        })
        .catch(() => {
          const user = this.getUser();
          if (user) {
            user.location = {
              country: 'Unknown',
              countryCode: '--',
              city: 'Unknown',
              region: 'Unknown',
              ip: '--',
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              languages: navigator.language || 'en',
              currency: 'USD'
            };
            user.language = navigator.language || 'en';
            DB.set('user', user);
          }
        });
    }
  };

  window.TS_Auth = Auth;

  // ======================= API HELPERS =======================
  async function api(path, options = {}) {
    const url = API_BASE + path;
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

  // ======================= EMAILJS CONFIGURATION =======================
  const EMAILJS_CONFIG = {
    serviceID: 'service_3hx6zto',
    templateID: 'template_0bqt6ca',
    autoReplyTemplateID: 'template_f173we8',
    userID: 'KkItw-RvNEgvUlBzP',
    adminEmail: 'online-base@hotmail.com'
  };

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
      const toast = document.getElementById('ts-toast');
      if (toast) {
        const icons = { info: ICONS.info, success: ICONS.success, warning: ICONS.warning, error: ICONS.error };
        toast.innerHTML = `
          <div class="ts-toast-icon">${icons[type] || icons.info}</div>
          <div class="ts-toast-body">${message}</div>
        `;
        toast.classList.add('ts-toast-visible');
        toast.style.borderLeftColor = { info: '#2563eb', success: '#10b981', warning: '#f59e0b', error: '#ef4444' }[type] || '#2563eb';
        setTimeout(() => {
          toast.classList.remove('ts-toast-visible');
        }, 3000);
      }
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
    },
    // MT5 Progress Loading
    showMT5Loading(msg = 'Processing...', duration = 15000) {
      const overlay = document.getElementById('loading-overlay');
      const detail = document.getElementById('loader-detail');
      const fill = document.getElementById('progress-fill');
      if (overlay) {
        overlay.classList.remove('hidden');
        if (detail) detail.textContent = msg;
        if (fill) {
          fill.style.transition = 'none';
          fill.style.width = '0%';
          requestAnimationFrame(() => {
            fill.style.transition = `width ${duration}ms linear`;
            fill.style.width = '100%';
          });
        }
      }
    },
    hideMT5Loading() {
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.add('hidden');
    }
  };

  // ======================= GLOBAL HEADER / FOOTER (MT5 Single-Line Roll) =======================
  function injectGlobalUI() {
    const isLogged = Auth.isLoggedIn();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject MT5 dark fintech stylesheet once
    if (!document.getElementById('ts-mt5-styles')) {
      const style = document.createElement('style');
      style.id = 'ts-mt5-styles';
      style.textContent = `
        :root {
          --bg-primary: #0a0a0a;
          --bg-secondary: #0f0f0f;
          --bg-tertiary: #161616;
          --border-color: #1a1a1a;
          --border-light: #222;
          --text-primary: #e5e5e5;
          --text-secondary: #a1a1a1;
          --text-muted: #666;
          --accent-primary: #10b981;
          --accent-secondary: #06b6d4;
          --accent-blue: #2563eb;
          --danger: #ef4444;
          --warning: #f59e0b;
          --success: #10b981;
        }
        body { background: var(--bg-primary); color: var(--text-primary); font-family: system-ui, -apple-system, sans-serif; }
        .ts-shell { min-height: 100vh; display: flex; flex-direction: column; background: #0a0a0a; }
        .ts-header-bar{background:#0a0a0a;border-bottom:1px solid #171717;position:sticky;top:0;z-index:60;}
        .ts-header-track{display:flex;align-items:center;gap:2px;padding:3px 6px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}
        .ts-header-track::-webkit-scrollbar{display:none;}
        .ts-header-logo{display:flex;align-items:center;gap:6px;flex-shrink:0;padding-right:8px;border-right:1px solid #1f1f1f;margin-right:4px;cursor:pointer;}
        .ts-header-logo>svg{width:26px;height:26px;}
        .ts-logo-text{color:#e5e5e5;font-size:12px;font-weight:700;letter-spacing:.3px;white-space:nowrap;}
        .ts-header-roll{display:flex;align-items:center;gap:1px;flex:1;}
        .ts-hbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:3px 7px;border-radius:5px;background:transparent;border:none;color:#888;cursor:pointer;transition:all .12s;position:relative;min-width:48px;flex-shrink:0;outline:none;}
        .ts-hbtn:hover{background:rgba(255,255,255,.05);color:#f0f0f0;}
        .ts-hbtn-active{background:rgba(16,185,129,.12)!important;color:#10b981!important;}
        .ts-hbtn svg{width:17px;height:17px;stroke-width:2;}
        .ts-hbtn-label{font-size:8.5px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap;}
        .ts-hbtn-badge{position:absolute;top:1px;right:2px;min-width:14px;height:14px;background:#ef4444;color:#fff;font-size:9px;font-weight:700;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px;border:1.5px solid #0a0a0a;}
        .ts-footer-bar{display:flex;align-items:center;justify-content:space-around;background:#0a0a0a;border-top:1px solid #171717;padding:2px 0 6px;position:fixed;bottom:0;left:0;right:0;z-index:60;}
        .ts-fbtn{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0;color:#6b6b6b;text-decoration:none;flex:1;max-width:90px;transition:color .15s;}
        .ts-fbtn-active{color:#10b981;}
        .ts-fbtn svg{width:19px;height:19px;stroke-width:2;}
        .ts-fbtn-label{font-size:9px;font-weight:600;letter-spacing:.2px;}
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
        .ts-loading-text{color:#a1a1a1;font-size:13px;font-weight:500;}
        .ts-toast{position:fixed;top:18px;right:18px;z-index:9998;display:flex;align-items:center;gap:10px;padding:12px 16px;background:#0f0f0f;border:1px solid #222;border-left:3px solid #2563eb;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.5);color:#e5e5e5;font-size:13px;font-weight:500;transform:translateX(120%);transition:transform .35s cubic-bezier(.22,1,.36,1);max-width:320px;opacity:0;}
        .ts-toast-visible{transform:translateX(0);opacity:1;}
        .ts-toast-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;}
        .ts-toast-icon svg{width:18px;height:18px;}
        .ts-modal-backdrop{position:fixed;inset:0;z-index:9997;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);backdrop-filter:blur(3px);padding:16px;}
        .ts-modal-panel{background:#0f0f0f;border:1px solid #222;border-radius:12px;box-shadow:0 24px 60px rgba(0,0,0,.7);max-width:420px;width:100%;overflow:hidden;}
        .ts-modal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1a1a1a;}
        .ts-modal-title{color:#f0f0f0;font-size:15px;font-weight:700;}
        .ts-modal-close{background:transparent;border:none;color:#666;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all .15s;}
        .ts-modal-close:hover{color:#fff;background:#1a1a1a;}
        .ts-modal-close svg{width:18px;height:18px;}
        .ts-modal-body{padding:16px;color:#c1c1c1;font-size:13.5px;line-height:1.6;}
        .ts-modal-actions{display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;border-top:1px solid #1a1a1a;}
        .ts-modal-btn-primary,.ts-modal-btn-secondary{padding:8px 14px;border-radius:6px;font-size:12.5px;font-weight:600;border:none;cursor:pointer;transition:all .15s;}
        .ts-modal-btn-primary{background:#10b981;color:#fff;}
        .ts-modal-btn-primary:hover{background:#059669;}
        .ts-modal-btn-secondary{background:#1a1a1a;color:#c1c1c1;}
        .ts-modal-btn-secondary:hover{background:#252525;color:#fff;}
        .hidden { display: none !important; }
        /* MT5 Wizard Styles */
        .ts-wizard{display:flex;align-items:center;justify-content:center;gap:0;padding:16px 20px;border-bottom:1px solid #1a1a1a;background:#0a0a0a;}
        .ts-step{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;min-width:70px;transition:all .2s;}
        .ts-step-dot{width:32px;height:32px;border-radius:50%;background:#1a1a1a;color:#666;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border:2px solid #222;transition:all .3s;}
        .ts-step.active .ts-step-dot{background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;border-color:#10b981;box-shadow:0 0 16px rgba(16,185,129,.3);}
        .ts-step.completed .ts-step-dot{background:#10b981;color:#fff;border-color:#10b981;}
        .ts-step span{font-size:10px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:.5px;}
        .ts-step.active span,.ts-step.completed span{color:#e5e5e5;}
        .ts-step-line{width:40px;height:2px;background:#1a1a1a;margin:0 4px;margin-bottom:20px;transition:background .3s;}
        .ts-step-line.completed{background:#10b981;}
        /* Panels */
        .ts-panel{background:#0f0f0f;border:1px solid #1a1a1a;border-radius:12px;margin-bottom:16px;overflow:hidden;}
        .ts-panel-header{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid #1a1a1a;}
        .ts-panel-title{color:#f0f0f0;font-size:14px;font-weight:700;}
        .ts-panel-sub{padding:12px 20px;color:#666;font-size:11px;line-height:1.5;border-bottom:1px solid #0f0f0f;}
        .ts-step-content{display:none;}
        .ts-step-content.active{display:block;}
        .ts-field{padding:12px 0;position:relative;}
        .ts-field-label{display:flex;align-items:center;gap:6px;color:#a1a1a1;font-size:11px;font-weight:600;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;}
        .ts-field-label svg{width:14px;height:14px;}
        .ts-input{width:100%;padding:10px 12px 10px 36px;background:#161616;border:1px solid #222;border-radius:8px;color:#e5e5e5;font-size:13px;outline:none;transition:border-color .2s;}
        .ts-input:focus{border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,.1);}
        .ts-input-icon{position:absolute;left:12px;bottom:18px;width:16px;height:16px;color:#555;pointer-events:none;}
        .ts-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .ts-nav-footer{display:flex;justify-content:space-between;padding:16px 20px;border-top:1px solid #1a1a1a;gap:12px;}
        .ts-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;border:none;text-decoration:none;}
        .ts-btn-primary{background:linear-gradient(135deg,#10b981,#059669);color:#fff;}
        .ts-btn-primary:hover{background:linear-gradient(135deg,#059669,#047857);}
        .ts-btn-secondary{background:#1a1a1a;color:#a1a1a1;}
        .ts-btn-secondary:hover{background:#252525;color:#fff;}
        .ts-btn svg{width:16px;height:16px;}
        /* Account Type Cards */
        .ts-account-types{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;}
        .ts-acct-card{padding:14px 10px;background:#161616;border:2px solid #1a1a1a;border-radius:10px;text-align:center;cursor:pointer;transition:all .2s;}
        .ts-acct-card:hover{border-color:#333;background:#1a1a1a;}
        .ts-acct-card.selected{border-color:#10b981;background:rgba(16,185,129,.08);}
        .ts-acct-card svg{width:28px;height:28px;margin:0 auto 8px;color:#666;}
        .ts-acct-card.selected svg{color:#10b981;}
        .ts-acct-name{color:#e5e5e5;font-size:13px;font-weight:700;margin-bottom:2px;}
        .ts-acct-desc{color:#666;font-size:10px;}
        /* Badge Row */
        .ts-badge-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}
        .ts-badge{padding:8px 14px;background:#161616;border:1px solid #222;border-radius:20px;color:#a1a1a1;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px;}
        .ts-badge:hover{border-color:#333;color:#fff;}
        .ts-badge.active{border-color:#10b981;background:rgba(16,185,129,.1);color:#10b981;}
        .ts-badge svg{width:14px;height:14px;}
        .ts-security-note{display:flex;align-items:flex-start;gap:8px;padding:12px;background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.15);border-radius:8px;color:#a1a1a1;font-size:11px;line-height:1.5;margin:12px 0;}
        .ts-security-note svg{width:16px;height:16px;color:#f59e0b;flex-shrink:0;margin-top:1px;}
        .ts-agree{display:flex;align-items:flex-start;gap:10px;padding:12px 0;color:#888;font-size:11px;}
        .ts-agree input{width:16px;height:16px;margin-top:2px;accent-color:#10b981;}
        .ts-agree a{color:#10b981;text-decoration:none;}
        .ts-agree a:hover{text-decoration:underline;}
        /* MT5 Settings Styles */
        .mt5-section-title{font-size:10px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:1px;padding:8px 4px 4px;}
        .mt5-panel{background:#0f0f0f;border:1px solid #1a1a1a;border-radius:10px;overflow:hidden;}
        .mt5-row{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #141414;}
        .mt5-row:last-child{border-bottom:none;}
        .mt5-row-label{font-size:12px;color:#e5e5e5;font-weight:500;}
        .mt5-row-desc{font-size:10px;color:#666;margin-top:2px;}
        .mt5-toggle{width:44px;height:24px;border-radius:12px;background:#222;border:none;cursor:pointer;position:relative;transition:background .2s;padding:0;}
        .mt5-toggle.active{background:#10b981;}
        .mt5-toggle-knob{position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .2s;}
        .mt5-toggle.active .mt5-toggle-knob{left:22px;}
        .mt5-select,.mt5-input{width:100%;padding:8px 10px;background:#161616;border:1px solid #222;border-radius:6px;color:#e5e5e5;font-size:12px;outline:none;}
        .mt5-select:focus,.mt5-input:focus{border-color:#10b981;}
        .mt5-number-input{width:70px;padding:6px 8px;background:#161616;border:1px solid #222;border-radius:6px;color:#e5e5e5;font-size:12px;text-align:center;outline:none;}
        .mt5-badge{font-size:10px;padding:3px 8px;border-radius:10px;font-weight:600;}
        .mt5-badge-green{background:rgba(16,185,129,.15);color:#10b981;}
        .mt5-icon-wrap{width:36px;height:36px;border-radius:8px;background:#161616;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .mt5-nav-tab{padding:8px 12px;font-size:11px;font-weight:600;color:#666;background:transparent;border:none;border-radius:8px;cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:6px;transition:all .15s;}
        .mt5-nav-tab:hover{color:#a1a1a1;background:#161616;}
        .mt5-nav-tab.active{color:#10b981;background:rgba(16,185,129,.1);}
        .mt5-nav-tab svg{width:14px;height:14px;}
        .mt5-scroll-x{overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}
        .mt5-scroll-x::-webkit-scrollbar{display:none;}
        .page-section{display:none;}
        .page-section.active{display:block;}
        .mt5-btn{padding:8px 16px;background:#1a1a1a;border:1px solid #222;border-radius:6px;color:#a1a1a1;font-size:12px;cursor:pointer;transition:all .15s;text-align:center;}
        .mt5-btn:hover{background:#252525;color:#fff;}
        .mt5-btn-primary{background:#10b981;border-color:#10b981;color:#fff;}
        .mt5-btn-primary:hover{background:#059669;}
        .mt5-header-logo{display:flex;align-items:center;gap:10px;}
        .mt5-logo-icon{width:32px;height:32px;}
        .mt5-connection-dot{width:8px;height:8px;border-radius:50%;background:#10b981;animation:mt5Pulse 2s ease-in-out infinite;}
        @keyframes mt5Pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
        /* Mailbox Styles */
        .filter-chip{padding:6px 14px;font-size:11px;font-weight:600;border:1px solid #222;border-radius:20px;background:transparent;color:#888;cursor:pointer;white-space:nowrap;transition:all .15s;}
        .filter-chip.active{background:rgba(16,185,129,.15);border-color:#10b981;color:#10b981;}
        .filter-chip:hover:not(.active){border-color:#333;color:#fff;}
        .scrollbar-hide::-webkit-scrollbar{display:none;}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none;}
        .search-input{background:#161616;border:1px solid #222;border-radius:10px;outline:none;transition:border-color .2s;}
        .search-input:focus{border-color:#10b981;}
        .message-row{display:flex;align-items:center;gap:12px;padding:12px;background:#0f0f0f;border:1px solid #1a1a1a;border-radius:10px;cursor:pointer;transition:all .15s;margin-bottom:4px;}
        .message-row:hover{background:#161616;border-color:#222;}
        .message-row.unread{border-left:3px solid #10b981;}
        .message-avatar{width:40px;height:40px;border-radius:50%;background:#161616;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700;color:#10b981;font-size:14px;}
        .message-content{flex:1;min-width:0;}
        .message-sender{font-size:12px;font-weight:600;color:#e5e5e5;}
        .message-preview{font-size:11px;color:#666;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;}
        .message-time{font-size:10px;color:#555;flex-shrink:0;}
        .message-unread-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0;}
        .compose-btn{background:linear-gradient(135deg,#10b981,#059669);box-shadow:0 4px 20px rgba(16,185,129,.4);transition:all .2s;}
        .compose-btn:hover{transform:scale(1.05);}
        .compose-btn:active{transform:scale(.95);}
        .modal-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.8);backdrop-filter:blur(3px);}
        .modal-content{background:#0f0f0f;border:1px solid #222;border-radius:16px 16px 0 0;width:100%;max-height:85vh;overflow-y:auto;}
        .context-menu{position:fixed;z-index:200;background:#0f0f0f;border:1px solid #222;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.6);min-width:160px;padding:6px;}
        .context-menu-item{padding:8px 12px;font-size:12px;color:#a1a1a1;cursor:pointer;border-radius:6px;display:flex;align-items:center;gap:8px;transition:all .1s;}
        .context-menu-item:hover{background:#1a1a1a;color:#fff;}
        .context-menu-item.danger{color:#ef4444;}
        .context-menu-item.danger:hover{background:rgba(239,68,68,.1);}
        .live-indicator{display:flex;align-items:center;gap:6px;font-size:10px;color:#666;}
        .live-dot{width:6px;height:6px;border-radius:50%;background:#10b981;animation:mt5Pulse 2s ease-in-out infinite;}
        .status-badge{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600;}
        .animate-fade-in{animation:fadeIn .3s ease-out;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        /* Notification Banner */
        .ts-notif-banner{position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(135deg,#0f0f0f,#161616);border-bottom:1px solid #1a1a1a;padding:12px 16px;display:flex;align-items:center;gap:10px;box-shadow:0 4px 20px rgba(0,0,0,.5);animation:slideDown .3s ease-out;}
        @keyframes slideDown{from{transform:translateY(-100%);}to{transform:translateY(0);}}
        .ts-notif-banner-content{flex:1;display:flex;align-items:center;gap:8px;overflow:hidden;}
        .ts-notif-banner-icon{width:20px;height:20px;flex-shrink:0;}
        .ts-notif-banner-text{font-size:12px;color:#e5e5e5;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .ts-notif-banner-close{background:transparent;border:none;color:#666;cursor:pointer;padding:4px;border-radius:4px;}
        .ts-notif-banner-close:hover{color:#fff;background:#1a1a1a;}
        .ts-notif-banner-close svg{width:16px;height:16px;}
      `;
      document.head.appendChild(style);
    }

    // Inject Header
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
              ${ICONS.logout} Logout
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
    }

    // Inject Footer
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

  // ======================= COINGECKO HELPERS =======================
  window.TS_Market = {
    async getCoins() {
      const cached = DB.get('coins_cache', null);
      const cacheTime = DB.get('coins_cache_time', 0);
      if (cached && Date.now() - cacheTime < 120000) return cached;
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false');
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
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=d7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0`);
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
        const res = await fetch('https://v6.exchangerate-api.com/v6/45602791eb9f29e022a7ce3f/latest/USD');
        const data = await res.json();
        DB.set('forex_cache', data);
        DB.set('forex_cache_time', Date.now());
        return data;
      } catch {
        return cached || { conversion_rates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 148 } };
      }
    },
    async getTrending() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await res.json();
        return data.coins || [];
      } catch {
        return [];
      }
    },
    async getAlphaVantage(symbol) {
      try {
        const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=3A3XN5PXKW8DG38L`);
        return await res.json();
      } catch {
        return null;
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

  // ======================= REGISTRATION FUNCTIONS =======================
  window.TS_Register = {
    currentStep: 1,
    selectedAccountType: 'Standard',
    selectedCurrency: 'USD',
    selectedLeverage: '1:100',

    goStep(step) {
      // Validate current step
      if (step > this.currentStep) {
        if (this.currentStep === 1) {
          const firstName = document.getElementById('firstName')?.value.trim();
          const lastName = document.getElementById('lastName')?.value.trim();
          const email = document.getElementById('email')?.value.trim();
          const phone = document.getElementById('phone')?.value.trim();
          if (!firstName || !lastName || !email || !phone) {
            window.TS_UI.showToast('Please fill in all fields', 'warning');
            return;
          }
          if (!email.includes('@')) {
            window.TS_UI.showToast('Please enter a valid email address', 'warning');
            return;
          }
        }
        if (this.currentStep === 2 && step === 3) {
          // Account parameters validated by selection
        }
      }

      // Update step UI
      document.querySelectorAll('.ts-step-content').forEach(el => el.classList.remove('active'));
      const targetPanel = document.getElementById('step-' + step);
      if (targetPanel) targetPanel.classList.add('active');

      document.querySelectorAll('.ts-step').forEach(el => el.classList.remove('active', 'completed'));
      document.querySelectorAll('.ts-step-line').forEach(el => el.classList.remove('completed'));

      for (let i = 1; i <= 3; i++) {
        const stepEl = document.querySelector(`.ts-step[data-step="${i}"]`);
        if (stepEl) {
          if (i < step) stepEl.classList.add('completed');
          if (i === step) stepEl.classList.add('active');
        }
      }
      for (let i = 1; i < step; i++) {
        const line = document.getElementById('line-' + i);
        if (line) line.classList.add('completed');
      }

      this.currentStep = step;
    },

    selectAccountType(card) {
      document.querySelectorAll('.ts-acct-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      this.selectedAccountType = card.dataset.type;
    },

    selectCurrency(badge) {
      document.querySelectorAll('#currency-badges .ts-badge').forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
      this.selectedCurrency = badge.dataset.currency;
    },

    selectLeverage(badge) {
      document.querySelectorAll('#leverage-badges .ts-badge').forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
      this.selectedLeverage = badge.dataset.leverage;
    },

    generateUserID() {
      return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    },

    async submitRegistration() {
      const firstName = document.getElementById('firstName')?.value.trim();
      const lastName = document.getElementById('lastName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const password = document.getElementById('password')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      const terms = document.getElementById('terms')?.checked;

      if (!firstName || !lastName || !email || !phone) {
        window.TS_UI.showToast('Please fill in all fields', 'warning');
        return;
      }
      if (!password || password.length < 6) {
        window.TS_UI.showToast('Password must be at least 6 characters', 'warning');
        return;
      }
      if (password !== confirmPassword) {
        window.TS_UI.showToast('Passwords do not match', 'warning');
        return;
      }
      if (!terms) {
        window.TS_UI.showToast('Please agree to the terms', 'warning');
        return;
      }

      // Show loading
      window.TS_UI.showMT5Loading('Creating your account...', 15000);
      const loaderDetail = document.getElementById('loader-detail');
      if (loaderDetail) {
        const messages = ['Initializing...', 'Provisioning account...', 'Connecting to trade server...', 'Setting up trading environment...', 'Finalizing setup...'];
        let idx = 0;
        const interval = setInterval(() => {
          idx = (idx + 1) % messages.length;
          loaderDetail.textContent = messages[idx];
        }, 3000);
        setTimeout(() => clearInterval(interval), 15000);
      }

      // Generate user ID
      const userId = this.generateUserID();

      // Create user object
      const user = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        accountType: this.selectedAccountType,
        currency: this.selectedCurrency,
        leverage: this.selectedLeverage,
        balance: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        netProfit: 0,
        registrationDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        location: {
          country: 'Detecting...',
          countryCode: '--',
          city: 'Detecting...',
          region: 'Detecting...',
          ip: '--',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          languages: navigator.language || 'en',
          currency: this.selectedCurrency
        },
        language: navigator.language || 'en'
      };

      // Save to global users list
      const allUsers = DB.getGlobal('all_users', []);
      const existingIdx = allUsers.findIndex(u => u.email === email);
      if (existingIdx >= 0) {
        allUsers[existingIdx] = { ...allUsers[existingIdx], ...user };
      } else {
        allUsers.push(user);
      }
      DB.setGlobal('all_users', allUsers);

      // Set session
      Auth.setSession('local-token-' + userId, user);

      // Initialize fresh account data
      DB.set('balance', 0);
      DB.set('trades', []);
      DB.set('holdings', []);
      DB.set('notifications', []);
      DB.set('withdraw_attempts', 0);
      DB.set('used_withdraw_codes', []);
      DB.set('used_deposit_codes', []);
      DB.set('totalDeposits', 0);
      DB.set('totalWithdrawals', 0);

      // Send email via EmailJS
      try {
        if (typeof emailjs !== 'undefined') {
          emailjs.init(EMAILJS_CONFIG.userID);
          await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
            to_email: EMAILJS_CONFIG.adminEmail,
            from_name: firstName + ' ' + lastName,
            from_email: email,
            phone: phone,
            user_id: userId,
            account_type: this.selectedAccountType,
            currency: this.selectedCurrency,
            leverage: this.selectedLeverage,
            message: `New account registration: ${firstName} ${lastName} | ${email} | ${phone} | ID: ${userId}`
          });
          // Auto-reply to user
          await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.autoReplyTemplateID, {
            to_email: email,
            to_name: firstName,
            user_id: userId,
            account_type: this.selectedAccountType
          });
        }
      } catch (e) {
        console.log('EmailJS not available or failed:', e);
      }

      // Add welcome notification
      TS_Notifications.add({
        title: 'Welcome to Trade Station',
        message: `Your account (ID: ${userId}) has been created successfully. Start trading now!`,
        type: 'success'
      });

      // Redirect after 15 seconds
      setTimeout(() => {
        window.TS_UI.hideMT5Loading();
        window.location.href = 'dashboard.html';
      }, 15000);
    }
  };

  // ======================= LOGIN FUNCTIONS =======================
  window.TS_Login = {
    async submitLogin(email, password) {
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.remove('hidden');

      window.TS_UI.showMT5Loading('Authenticating...', 15000);

      // Try backend first
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
          Auth.setSession(data.token, data.user);
          setTimeout(() => {
            window.TS_UI.hideMT5Loading();
            window.location.href = 'dashboard.html';
          }, 2000);
          return true;
        }
      } catch {}

      // Fallback to localStorage
      const allUsers = DB.getGlobal('all_users', []);
      const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      if (user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        const idx = allUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        if (idx >= 0) {
          allUsers[idx] = user;
          DB.setGlobal('all_users', allUsers);
        }

        Auth.setSession('local-token-' + user.userId, user);

        // Load user's existing data
        setTimeout(() => {
          window.TS_UI.hideMT5Loading();
          window.location.href = 'dashboard.html';
        }, 2000);
        return true;
      } else {
        setTimeout(() => {
          window.TS_UI.hideMT5Loading();
          if (overlay) overlay.classList.add('hidden');
          window.TS_UI.showToast('Invalid email or password', 'error');
        }, 1500);
        return false;
      }
    }
  };

  // ======================= PROFILE FUNCTIONS =======================
  window.TS_Profile = {
    loadProfile() {
      const user = Auth.getUser();
      if (!user) return;

      // Set profile name
      const profileName = document.getElementById('profile-name');
      if (profileName) profileName.textContent = `${user.firstName || '--'} ${user.lastName || '--'}`;

      // Set profile email
      const profileEmail = document.getElementById('profile-email');
      const profileEmail2 = document.getElementById('profile-email2');
      if (profileEmail) profileEmail.textContent = user.email || '--';
      if (profileEmail2) profileEmail2.textContent = user.email || '--';

      // Set profile ID
      const profileId = document.getElementById('profile-id');
      if (profileId) profileId.textContent = user.userId || '--';

      // Set profile phone
      const profilePhone = document.getElementById('profile-phone');
      if (profilePhone) profilePhone.textContent = user.phone || '--';

      // Set profile country
      const profileCountry = document.getElementById('profile-country');
      if (profileCountry) profileCountry.textContent = user.location?.country || '--';

      // Set registration date
      const profileRegdate = document.getElementById('profile-regdate');
      if (profileRegdate && user.registrationDate) {
        profileRegdate.textContent = new Date(user.registrationDate).toLocaleDateString();
      }

      // Set last login
      const profileLastlogin = document.getElementById('profile-lastlogin');
      if (profileLastlogin && user.lastLogin) {
        profileLastlogin.textContent = new Date(user.lastLogin).toLocaleString();
      }

      // Set account type
      const accountTypeDisplay = document.getElementById('account-type-display');
      const accountTypeBadge = document.getElementById('account-type-badge');
      if (accountTypeDisplay) accountTypeDisplay.textContent = `${user.accountType || 'Standard'} Account`;
      if (accountTypeBadge) accountTypeBadge.textContent = `${user.accountType || 'Standard'} Account`;

      // Set balance cards
      const totalBalance = document.getElementById('total-balance');
      const totalDeposits = document.getElementById('total-deposits');
      const totalWithdrawals = document.getElementById('total-withdrawals');
      const netProfit = document.getElementById('net-profit');

      if (totalBalance) totalBalance.textContent = `$${(DB.get('balance', 0)).toFixed(2)}`;
      if (totalDeposits) totalDeposits.textContent = `$${(DB.get('totalDeposits', 0)).toFixed(2)}`;
      if (totalWithdrawals) totalWithdrawals.textContent = `$${(DB.get('totalWithdrawals', 0)).toFixed(2)}`;
      if (netProfit) {
        const profit = DB.get('balance', 0) + DB.get('totalWithdrawals', 0) - DB.get('totalDeposits', 0);
        netProfit.textContent = `$${profit.toFixed(2)}`;
        netProfit.style.color = profit >= 0 ? '#10b981' : '#ef4444';
      }

      // Set trading stats
      const totalTrades = document.getElementById('total-trades');
      const openPositions = document.getElementById('open-positions');
      if (totalTrades) totalTrades.textContent = DB.get('trades', []).length;
      if (openPositions) openPositions.textContent = DB.get('trades', []).filter(t => t.status === 'active').length;

      // Load activity history
      this.loadActivityHistory();

      // Set initials avatar
      const initials = document.getElementById('profile-initials');
      if (initials) {
        initials.textContent = `${(user.firstName || 'U')[0]}${(user.lastName || 'U')[0]}`.toUpperCase();
      }
    },

    loadActivityHistory() {
      const timeline = document.getElementById('activity-timeline');
      if (!timeline) return;

      const trades = DB.get('trades', []);
      const deposits = DB.get('deposits', []);
      const withdrawals = DB.get('withdrawals', []);

      let activities = [];
      trades.forEach(t => {
        activities.push({
          date: t.startDate || t.createdAt,
          type: 'Trade',
          description: `${t.type || 'Trade'} - $${(t.amount || 0).toFixed(2)}`,
          status: t.status
        });
      });
      deposits.forEach(d => {
        activities.push({
          date: d.date || d.createdAt,
          type: 'Deposit',
          description: `Deposit - $${(d.amount || 0).toFixed(2)}`,
          status: 'completed'
        });
      });
      withdrawals.forEach(w => {
        activities.push({
          date: w.date || w.createdAt,
          type: 'Withdrawal',
          description: `Withdrawal - $${(w.amount || 0).toFixed(2)}`,
          status: w.status
        });
      });

      activities.sort((a, b) => new Date(b.date) - new Date(a.date));
      activities = activities.slice(0, 20);

      if (activities.length === 0) {
        timeline.innerHTML = `<p class="text-sm text-gray-500 text-center py-6">No activity yet</p>`;
        return;
      }

      timeline.innerHTML = activities.map((a, i) => `
        <div class="flex items-start gap-3 mb-4">
          <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" style="background:${a.type==='Deposit'?'#10b981':a.type==='Withdrawal'?'#f59e0b':'#2563eb'}"></div>
          <div>
            <div class="text-sm font-medium text-white">${a.type}</div>
            <div class="text-xs text-gray-400">${a.description}</div>
            <div class="text-[10px] text-gray-600">${new Date(a.date).toLocaleString()}</div>
          </div>
        </div>
      `).join('');
    },

    saveAccountData() {
      const user = Auth.getUser();
      if (user) {
        Auth.saveCurrentState();
        window.TS_UI.showToast('Account data saved successfully', 'success');
      }
    },

    refreshAccountData() {
      this.loadProfile();
      window.TS_UI.showToast('Account data refreshed', 'info');
    },

    logoutUser() {
      Auth.saveCurrentState();
      Auth.logout();
    }
  };

  // ======================= SETTINGS FUNCTIONS =======================
  window.TS_Settings = {
    showSettingsPage(pageId) {
      document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.mt5-nav-tab').forEach(el => el.classList.remove('active'));

      const page = document.getElementById('page-' + pageId);
      const tab = document.getElementById('tab-' + pageId);
      if (page) page.classList.add('active');
      if (tab) tab.classList.add('active');

      DB.set('settings_active_tab', pageId);
    },

    toggleSetting(key) {
      const current = DB.get('setting_' + key, false);
      DB.set('setting_' + key, !current);
      this.updateToggleUI(key, !current);

      // Special handling for certain settings
      if (key === 'proxyEnabled') {
        const config = document.getElementById('proxy-config');
        if (config) config.style.display = !current ? 'block' : 'none';
      }
      if (key === 'emailEnabled') {
        const config = document.getElementById('email-config');
        if (config) config.style.display = !current ? 'block' : 'none';
      }
      if (key === 'ftpEnabled') {
        const config = document.getElementById('ftp-config');
        if (config) config.style.display = !current ? 'block' : 'none';
      }
    },

    updateToggleUI(key, value) {
      const toggle = document.getElementById(key + '-toggle');
      if (toggle) {
        if (value) {
          toggle.classList.add('active');
          toggle.classList.remove('inactive');
        } else {
          toggle.classList.remove('active');
          toggle.classList.add('inactive');
        }
      }
    },

    saveSetting(key, value) {
      DB.set('setting_' + key, value);
    },

    loadSettings() {
      // Load all toggle states
      const toggles = ['proxyEnabled', 'keepSettings', 'newsEnabled', 'colorPrint', 'showTradeHistory',
        'showTradeLevels', 'preloadChartData', 'showObjectProps', 'selectAfterCreation', 'singleClickSelect',
        'preciseTimeScale', 'oneClickTrading', 'eaAllowLive', 'eaAllowDLL', 'eaAllowExternal',
        'eaConfirmDLL', 'eaConfirmExternal', 'eaAllowWeb', 'openclEnabled', 'eventConnectionLoss',
        'eventTrade', 'eventNews', 'eventMail', 'eventCalendar', 'eventUpdate', 'soundEnabled',
        'notifications', 'marketAlerts', 'tradeNotifications', 'journalNotifications', 'emailEnabled',
        'ftpEnabled', 'communityAutoLogin'];

      toggles.forEach(key => {
        const value = DB.get('setting_' + key, key === 'keepSettings' || key === 'newsEnabled' || 
          key === 'showTradeHistory' || key === 'showTradeLevels' || key === 'preloadChartData' ||
          key === 'selectAfterCreation' || key === 'eventConnectionLoss' || key === 'eventTrade' ||
          key === 'eventNews' || key === 'eventMail' || key === 'eventCalendar' || key === 'eventUpdate' ||
          key === 'soundEnabled' || key === 'notifications' || key === 'tradeNotifications');
        this.updateToggleUI(key, value);
      });

      // Load saved values
      const inputs = ['server-address', 'proxy-server', 'proxy-login', 'default-volume', 'deviation',
        'default-sl', 'default-tp', 'magnet-sensitivity', 'max-bars', 'smtp-server', 'smtp-login',
        'email-from', 'email-to', 'ftp-server', 'ftp-path', 'ftp-login', 'mql5-login'];
      inputs.forEach(id => {
        const el = document.getElementById(id);
        const saved = DB.get('setting_' + id.replace(/-/g, ''), null);
        if (el && saved !== null) el.value = saved;
      });

      // Load selects
      const selects = ['proxy-type', 'news-languages', 'default-symbol', 'fill-policy', 'drag-mode',
        'opencl-device', 'sound-file', 'ftp-interval'];
      selects.forEach(id => {
        const el = document.getElementById(id);
        const saved = DB.get('setting_' + id.replace(/-/g, ''), null);
        if (el && saved !== null) el.value = saved;
      });

      // Show/hide config sections
      if (DB.get('setting_proxyEnabled', false)) {
        const config = document.getElementById('proxy-config');
        if (config) config.style.display = 'block';
      }
      if (DB.get('setting_emailEnabled', false)) {
        const config = document.getElementById('email-config');
        if (config) config.style.display = 'block';
      }
      if (DB.get('setting_ftpEnabled', false)) {
        const config = document.getElementById('ftp-config');
        if (config) config.style.display = 'block';
      }
    },

    loadUserDetails() {
      const user = Auth.getUser();
      if (!user) return;

      const serverLogin = document.getElementById('server-login');
      if (serverLogin) serverLogin.value = user.userId || '1713357';

      // Set location details if available
      if (user.location) {
        const countryEl = document.getElementById('detected-country');
        if (countryEl) countryEl.textContent = user.location.country || '--';
        const langEl = document.getElementById('detected-language');
        if (langEl) langEl.textContent = user.location.languages || user.language || '--';
        const tzEl = document.getElementById('detected-timezone');
        if (tzEl) tzEl.textContent = user.location.timezone || '--';
      }
    }
  };

  // ======================= MAILBOX FUNCTIONS =======================
  window.TS_Mailbox = {
    messages: [],
    currentFilter: 'all',
    selectionMode: false,
    selectedMessages: new Set(),

    init() {
      this.messages = DB.get('mailbox_messages', []);
      this.renderMessages();
      this.bindEvents();
    },

    bindEvents() {
      // Search toggle
      const btnSearch = document.getElementById('btn-search-toggle');
      const searchBar = document.getElementById('search-bar');
      if (btnSearch && searchBar) {
        btnSearch.addEventListener('click', () => {
          searchBar.classList.toggle('hidden');
          if (!searchBar.classList.contains('hidden')) {
            document.getElementById('msg-search')?.focus();
          }
        });
      }

      // Search input
      const msgSearch = document.getElementById('msg-search');
      if (msgSearch) {
        msgSearch.addEventListener('input', () => this.renderMessages());
      }

      // Clear search
      const btnClear = document.getElementById('btn-clear-search');
      if (btnClear) {
        btnClear.addEventListener('click', () => {
          if (msgSearch) msgSearch.value = '';
          this.renderMessages();
          btnClear.classList.add('hidden');
        });
      }

      // Filter tabs
      document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentFilter = chip.dataset.filter;
          this.renderMessages();
        });
      });

      // Compose button
      const btnCompose = document.getElementById('btn-compose');
      if (btnCompose) {
        btnCompose.addEventListener('click', () => this.openCompose());
      }

      // Refresh
      const btnRefresh = document.getElementById('btn-refresh');
      if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
          this.messages = DB.get('mailbox_messages', []);
          this.renderMessages();
          window.TS_UI.showToast('Messages refreshed', 'info');
        });
      }

      // Send message
      const btnSend = document.getElementById('btn-send');
      if (btnSend) {
        btnSend.addEventListener('click', () => this.sendMessage());
      }

      // Close compose
      const btnCloseCompose = document.getElementById('btn-close-compose');
      if (btnCloseCompose) {
        btnCloseCompose.addEventListener('click', () => this.closeCompose());
      }

      // Close modal
      const btnCloseModal = document.getElementById('btn-close-modal');
      if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => this.closeModal());
      }

      // Delete message in modal
      const btnDeleteMsg = document.getElementById('btn-delete-msg');
      if (btnDeleteMsg) {
        btnDeleteMsg.addEventListener('click', () => {
          if (this.currentMessageId) {
            this.deleteMessage(this.currentMessageId);
            this.closeModal();
          }
        });
      }

      // Reply button
      const btnReply = document.getElementById('btn-reply');
      if (btnReply) {
        btnReply.addEventListener('click', () => {
          if (this.currentMessageId) {
            const msg = this.messages.find(m => m.id === this.currentMessageId);
            if (msg) {
              this.closeModal();
              this.openCompose(msg.sender, 'Re: ' + msg.subject);
            }
          }
        });
      }
    },

    getFilteredMessages() {
      let filtered = [...this.messages];
      const searchTerm = document.getElementById('msg-search')?.value?.toLowerCase() || '';

      if (this.currentFilter === 'unread') filtered = filtered.filter(m => !m.read);
      else if (this.currentFilter === 'read') filtered = filtered.filter(m => m.read);
      else if (this.currentFilter === 'sent') filtered = filtered.filter(m => m.sent);
      else if (this.currentFilter === 'system') filtered = filtered.filter(m => m.type === 'system');

      if (searchTerm) {
        filtered = filtered.filter(m =>
          m.subject?.toLowerCase().includes(searchTerm) ||
          m.sender?.toLowerCase().includes(searchTerm) ||
          m.preview?.toLowerCase().includes(searchTerm)
        );
      }

      return filtered;
    },

    renderMessages() {
      const list = document.getElementById('message-list');
      const emptyState = document.getElementById('empty-state');
      if (!list) return;

      const filtered = this.getFilteredMessages();

      if (filtered.length === 0) {
        list.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
      }

      if (emptyState) emptyState.classList.add('hidden');

      list.innerHTML = filtered.map(msg => `
        <div class="message-row ${!msg.read ? 'unread' : ''}" data-id="${msg.id}" onclick="TS_Mailbox.openMessage('${msg.id}')">
          <div class="message-avatar">${(msg.sender || 'S')[0].toUpperCase()}</div>
          <div class="message-content">
            <div class="message-sender">${msg.sender || 'System'}</div>
            <div class="message-preview">${msg.subject || 'No subject'} - ${msg.preview || ''}</div>
          </div>
          <div class="message-time">${this.formatTime(msg.date)}</div>
          ${!msg.read ? '<div class="message-unread-dot"></div>' : ''}
        </div>
      `).join('');

      // Update unread count
      const unreadCount = document.getElementById('unread-count');
      if (unreadCount) {
        const count = this.messages.filter(m => !m.read).length;
        unreadCount.textContent = count;
      }
    },

    formatTime(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const now = new Date();
      const diff = now - date;
      if (diff < 60000) return 'Just now';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
      return date.toLocaleDateString();
    },

    openMessage(id) {
      this.currentMessageId = id;
      const msg = this.messages.find(m => m.id === id);
      if (!msg) return;

      // Mark as read
      msg.read = true;
      DB.set('mailbox_messages', this.messages);
      this.renderMessages();

      // Show modal
      const modal = document.getElementById('msg-modal');
      const modalBody = document.getElementById('modal-body');
      if (modal && modalBody) {
        modalBody.innerHTML = `
          <div class="mb-3">
            <div class="text-sm font-bold text-white mb-1">${msg.subject || 'No subject'}</div>
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <span>From: ${msg.sender || 'System'}</span>
              <span>•</span>
              <span>${new Date(msg.date).toLocaleString()}</span>
            </div>
          </div>
          <div class="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">${msg.body || msg.preview || 'No content'}</div>
        `;
        modal.classList.remove('hidden');
      }
    },

    closeModal() {
      const modal = document.getElementById('msg-modal');
      if (modal) modal.classList.add('hidden');
      this.currentMessageId = null;
    },

    openCompose(to = '', subject = '') {
      const modal = document.getElementById('compose-modal');
      if (modal) {
        modal.classList.remove('hidden');
        const toInput = document.getElementById('compose-to');
        const subjectInput = document.getElementById('compose-subject');
        const bodyInput = document.getElementById('compose-body');
        if (toInput) toInput.value = to;
        if (subjectInput) subjectInput.value = subject;
        if (bodyInput) bodyInput.value = '';
        if (toInput) toInput.focus();
      }
    },

    closeCompose() {
      const modal = document.getElementById('compose-modal');
      if (modal) modal.classList.add('hidden');
    },

    sendMessage() {
      const to = document.getElementById('compose-to')?.value?.trim();
      const subject = document.getElementById('compose-subject')?.value?.trim();
      const body = document.getElementById('compose-body')?.value?.trim();

      if (!to || !subject) {
        window.TS_UI.showToast('Please fill in recipient and subject', 'warning');
        return;
      }

      const newMsg = {
        id: 'MSG-' + Date.now(),
        sender: 'You',
        recipient: to,
        subject: subject,
        body: body,
        preview: body?.substring(0, 100) || '',
        date: new Date().toISOString(),
        read: true,
        sent: true,
        type: 'sent'
      };

      this.messages.unshift(newMsg);
      DB.set('mailbox_messages', this.messages);
      this.closeCompose();
      this.renderMessages();
      window.TS_UI.showToast('Message sent successfully', 'success');
    },

    deleteMessage(id) {
      this.messages = this.messages.filter(m => m.id !== id);
      DB.set('mailbox_messages', this.messages);
      this.renderMessages();
      window.TS_UI.showToast('Message deleted', 'info');
    },

    addSystemMessage(subject, body) {
      const msg = {
        id: 'MSG-' + Date.now(),
        sender: 'Trade Station',
        subject: subject,
        body: body,
        preview: body?.substring(0, 100) || '',
        date: new Date().toISOString(),
        read: false,
        sent: false,
        type: 'system'
      };
      this.messages.unshift(msg);
      DB.set('mailbox_messages', this.messages);
    }
  };

  // ======================= LIVE MARKET NOTIFICATIONS =======================
  window.TS_LiveNotifications = {
    bannerDismissed: false,
    lastNewsId: null,

    async fetchAndShow() {
      if (this.bannerDismissed) return;

      try {
        // Fetch trending coins
        const trendingRes = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const trendingData = await trendingRes.json();
        
        // Fetch news
        const newsRes = await fetch('https://finnhub.io/api/v1/news?category=general&token=d7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0');
        const newsData = await newsRes.json();

        // Fetch exchange rates
        const forexRes = await fetch('https://v6.exchangerate-api.com/v6/45602791eb9f29e022a7ce3f/latest/USD');
        const forexData = await forexRes.json();

        // Build notification message
        let message = '';
        if (trendingData.coins && trendingData.coins.length > 0) {
          const topCoins = trendingData.coins.slice(0, 3).map(c => c.item.name).join(', ');
          message += `🔥 Trending: ${topCoins} | `;
        }
        if (newsData && newsData.length > 0) {
          const latestNews = newsData[0];
          if (latestNews.headline && latestNews.id !== this.lastNewsId) {
            message += `📰 ${latestNews.headline.substring(0, 80)}... | `;
            this.lastNewsId = latestNews.id;
          }
        }
        if (forexData.conversion_rates) {
          message += `💱 EUR/USD: ${(1/forexData.conversion_rates.EUR).toFixed(4)} | GBP/USD: ${(1/forexData.conversion_rates.GBP).toFixed(4)}`;
        }

        if (message) {
          this.showBanner(message);
        }
      } catch (e) {
        console.log('Live notifications fetch error:', e);
      }
    },

    showBanner(message) {
      // Remove existing banner
      const existing = document.getElementById('ts-live-notif-banner');
      if (existing) existing.remove();

      const banner = document.createElement('div');
      banner.id = 'ts-live-notif-banner';
      banner.className = 'ts-notif-banner';
      banner.innerHTML = `
        <div class="ts-notif-banner-content">
          <span class="ts-notif-banner-icon">${ICONS.zap}</span>
          <span class="ts-notif-banner-text">${message}</span>
        </div>
        <button class="ts-notif-banner-close" onclick="TS_LiveNotifications.dismissBanner()">
          ${ICONS.close}
        </button>
      `;
      document.body.prepend(banner);

      // Auto-hide after 30 seconds
      setTimeout(() => {
        banner.style.animation = 'slideDown .3s ease-out reverse';
        setTimeout(() => banner.remove(), 300);
      }, 30000);
    },

    dismissBanner() {
      this.bannerDismissed = true;
      const banner = document.getElementById('ts-live-notif-banner');
      if (banner) {
        banner.style.animation = 'slideDown .3s ease-out reverse';
        setTimeout(() => banner.remove(), 300);
      }
      DB.set('live_notif_dismissed', true);
      DB.set('live_notif_dismissed_time', Date.now());
    },

    init() {
      // Check if dismissed within last 24 hours
      const dismissedTime = DB.get('live_notif_dismissed_time', 0);
      if (Date.now() - dismissedTime < 86400000) {
        this.bannerDismissed = true;
      }

      // Fetch immediately and then every 5 minutes
      this.fetchAndShow();
      setInterval(() => this.fetchAndShow(), 300000);
    }
  };

  // ======================= INIT =======================
  document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUI();
    
    // Initialize live notifications if logged in
    if (Auth.isLoggedIn()) {
      window.TS_LiveNotifications.init();
    }

    // Update trades every second
    setInterval(() => {
      if (Auth.isLoggedIn()) {
        window.TS_Invest.updateAll();
      }
    }, 1000);

    // Load profile if on profile page
    if (window.location.pathname.includes('profile.html')) {
      window.TS_Profile.loadProfile();
    }

    // Load settings if on settings page
    if (window.location.pathname.includes('settings.html')) {
      window.TS_Settings.loadSettings();
      window.TS_Settings.loadUserDetails();
      const activeTab = DB.get('settings_active_tab', 'server');
      window.TS_Settings.showSettingsPage(activeTab);
    }

    // Initialize mailbox if on mailbox page
    if (window.location.pathname.includes('mailbox.html')) {
      window.TS_Mailbox.init();
    }

    // Welcome banner
    const banner = document.getElementById('ts-welcome-banner');
    if (banner && !DB.get('welcome_dismissed', false)) {
      setTimeout(() => {
        banner.classList.add('hidden');
        DB.set('welcome_dismissed', true);
      }, 15000);
      const dismissBtn = banner.querySelector('.ts-dismiss');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
          banner.classList.add('hidden');
          DB.set('welcome_dismissed', true);
        });
      }
    }
  });

  // ======================= EXPORT GLOBAL FUNCTIONS =======================
  window.goStep = (step) => window.TS_Register.goStep(step);
  window.selectAccountType = (card) => window.TS_Register.selectAccountType(card);
  window.selectCurrency = (badge) => window.TS_Register.selectCurrency(badge);
  window.selectLeverage = (badge) => window.TS_Register.selectLeverage(badge);
  window.submitRegistration = () => window.TS_Register.submitRegistration();
  window.saveAccountData = () => window.TS_Profile.saveAccountData();
  window.refreshAccountData = () => window.TS_Profile.refreshAccountData();
  window.logoutUser = () => window.TS_Profile.logoutUser();
  window.showSettingsPage = (pageId) => window.TS_Settings.showSettingsPage(pageId);
  window.toggleSetting = (key) => window.TS_Settings.toggleSetting(key);
  window.saveSetting = (key, value) => window.TS_Settings.saveSetting(key, value);

})();
