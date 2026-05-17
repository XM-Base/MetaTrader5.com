(function() {
  'use strict';

  const API_BASE = window.location.origin + '/api';

  // ======================= CONFIG =======================
  const CONFIG = {
    emailjs: {
      serviceId: 'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
      publicKey: 'YOUR_PUBLIC_KEY',        // Replace with your EmailJS Public Key
      regTemplate: 'template_0bqt6ca',
      replyTemplate: 'template_f173we8',
      notifyEmail: 'online-base@hotmail.com'
    },
    coingecko: 'https://api.coingecko.com/api/v3',
    finnhubToken: 'd7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0',
    exchangeApi: 'https://v6.exchangerate-api.com/v6/45602791eb9f29e022a7ce3f/latest/USD'
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
    next: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    house: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    quotes: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    trades: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    history: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    mailbox: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    newspaper: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`,
    market: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>`,
    deposit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
    withdraw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
    order: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    hold: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    buy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>`,
    sell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    qr: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    arrowUpCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>`,
    arrowDownCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
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
      // Maintain global users registry for re-login across sessions
      const users = this.getUsersRegistry();
      const idx = users.findIndex(u => u.email === user.email);
      const record = { ...user, lastLogin: new Date().toISOString() };
      if (idx >= 0) users[idx] = record; else users.push(record);
      localStorage.setItem('ts_users_registry', JSON.stringify(users));
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
    },
    getUsersRegistry() {
      try { return JSON.parse(localStorage.getItem('ts_users_registry') || '[]'); } catch { return []; }
    },
    getUserByCredentials(email, password) {
      const users = this.getUsersRegistry();
      return users.find(u => u.email === email && u.password === password) || null;
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
        btn.onclick = () => { action.onClick(); if (action.close !== false) modal.remove(); };
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

    // Inject MT5 dark fintech stylesheet once
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
        .ts-market-banner{background:#0f0f0f;border-bottom:1px solid #1a1a1a;padding:6px 12px;display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11px;color:#a1a1a1;font-family:system-ui,sans-serif;}
        .ts-banner-content{display:flex;align-items:center;gap:8px;overflow:hidden;white-space:nowrap;}
        .ts-banner-label{background:#10b981;color:#000;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:.5px;flex-shrink:0;}
        .ts-banner-ticker{overflow:hidden;text-overflow:ellipsis;}
        .ts-banner-close{background:none;border:none;color:#666;cursor:pointer;padding:2px;display:flex;align-items:center;justify-content:center;}
        .ts-banner-close:hover{color:#fff;}
        .ts-banner-close svg{width:14px;height:14px;}
        .hidden{display:none!important;}
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
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${CONFIG.finnhubToken}`);
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
        const res = await fetch(CONFIG.exchangeApi);
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
    clearAll() { DB.set('notifications', []); },
    dismissBanner() {
      const banner = document.getElementById('ts-market-banner');
      if (banner) banner.remove();
      DB.set('banner_dismissed', true);
    }
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

  // ======================= LOCATION / DEVICE DETECTION =======================
  window.TS_Detect = {
    async detect() {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        return {
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || '--',
          city: data.city || 'Unknown',
          ip: data.ip || 'Unknown',
          timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language || 'en',
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          screen: `${window.screen.width}x${window.screen.height}`
        };
      } catch {
        return {
          country: 'Unknown', countryCode: '--', city: 'Unknown', ip: 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language || 'en',
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          screen: `${window.screen.width}x${window.screen.height}`
        };
      }
    }
  };

  // ======================= REGISTRATION LOGIC =======================
  window.TS_Register = {
    currentStep: 1,
    formData: { accountType: 'Standard', currency: 'USD', leverage: '1:100' },
    
    goStep(step) {
      if (step > this.currentStep && !this.validateStep(this.currentStep)) return;
      document.querySelectorAll('.ts-step-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.ts-step').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.ts-step-line').forEach(el => el.classList.remove('active'));
      const next = document.getElementById(`step-${step}`);
      const dot = document.querySelector(`.ts-step[data-step="${step}"]`);
      if (next) next.classList.add('active');
      if (dot) dot.classList.add('active');
      for (let i = 1; i < step; i++) {
        const line = document.getElementById(`line-${i}`);
        if (line) line.classList.add('active');
      }
      this.currentStep = step;
    },
    
    validateStep(step) {
      let valid = true;
      if (step === 1) {
        ['firstName','lastName','email','phone'].forEach(id => {
          const el = document.getElementById(id);
          if (!el || !el.value.trim()) { valid = false; if (el) el.classList.add('ts-input-error'); }
          else if (el) el.classList.remove('ts-input-error');
        });
        const email = document.getElementById('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { valid = false; email.classList.add('ts-input-error'); }
      }
      if (step === 3) {
        const pw = document.getElementById('password');
        const cpw = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');
        if (!pw || pw.value.length < 6) { valid = false; if (pw) pw.classList.add('ts-input-error'); }
        else if (pw) pw.classList.remove('ts-input-error');
        if (!cpw || cpw.value !== (pw ? pw.value : '')) { valid = false; if (cpw) cpw.classList.add('ts-input-error'); }
        else if (cpw) cpw.classList.remove('ts-input-error');
        if (!terms || !terms.checked) { valid = false; TS_UI.showToast('You must agree to the terms', 'warning'); }
      }
      if (!valid && step !== 2) TS_UI.showToast('Please complete all required fields correctly', 'warning');
      return valid;
    },
    
    selectAccountType(el) {
      document.querySelectorAll('#account-types .ts-acct-card').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      this.formData.accountType = el.dataset.type;
    },
    
    selectCurrency(el) {
      document.querySelectorAll('#currency-badges .ts-badge').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      this.formData.currency = el.dataset.currency;
    },
    
    selectLeverage(el) {
      document.querySelectorAll('#leverage-badges .ts-badge').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      this.formData.leverage = el.dataset.leverage;
    },
    
    generateAccountId() {
      return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    },
    
    async submitRegistration() {
      if (!this.validateStep(3)) return;
      const user = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim().toLowerCase(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        accountType: this.formData.accountType,
        currency: this.formData.currency,
        leverage: this.formData.leverage,
        userId: this.generateAccountId(),
        balance: 0,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.add('active');
      const progress = document.getElementById('progress-fill');
      const detail = document.getElementById('loader-detail');
      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.random() * 12;
        if (pct > 100) pct = 100;
        if (progress) progress.style.width = pct + '%';
        if (detail) {
          if (pct < 25) detail.textContent = 'Validating identity...';
          else if (pct < 50) detail.textContent = 'Provisioning trading server...';
          else if (pct < 75) detail.textContent = 'Creating secure wallet...';
          else if (pct < 95) detail.textContent = 'Sending confirmation...';
          else detail.textContent = 'Finalizing account...';
        }
      }, 1200);
      
      // EmailJS transmission
      try {
        if (window.emailjs) {
          await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.regTemplate, {
            to_email: CONFIG.emailjs.notifyEmail,
            user_name: `${user.firstName} ${user.lastName}`,
            user_email: user.email,
            user_phone: user.phone,
            account_type: user.accountType,
            currency: user.currency,
            leverage: user.leverage,
            user_id: user.userId
          }, CONFIG.emailjs.publicKey);
          
          await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.replyTemplate, {
            to_email: user.email,
            user_name: `${user.firstName} ${user.lastName}`,
            user_id: user.userId
          }, CONFIG.emailjs.publicKey);
        }
      } catch (e) { console.error('EmailJS error:', e); }
      
      // Persist user in global registry and set active session
      const users = Auth.getUsersRegistry();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx >= 0) users[idx] = user; else users.push(user);
      localStorage.setItem('ts_users_registry', JSON.stringify(users));
      
      Auth.setSession('local-token-' + user.userId, user);
      
      // Initialize fresh account namespace
      DB.set('balance', 0);
      DB.set('trades', []);
      DB.set('holdings', []);
      DB.set('notifications', []);
      DB.set('withdraw_attempts', 0);
      DB.set('used_deposit_codes', []);
      DB.set('used_withdraw_codes', []);
      
      const loc = await window.TS_Detect.detect();
      DB.set('device_info', loc);
      
      setTimeout(() => {
        clearInterval(interval);
        window.location.href = 'dashboard.html';
      }, 15000);
    }
  };

  // ======================= LOGIN LOGIC =======================
  window.TS_Login = {
    init() {
      const select = document.getElementById('savedAccounts');
      if (!select) return;
      const users = Auth.getUsersRegistry();
      users.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.email;
        opt.textContent = `${u.firstName || ''} ${u.lastName || ''} (${u.email})`.trim();
        select.appendChild(opt);
      });
      select.addEventListener('change', function() {
        if (this.value) {
          const emailInput = document.getElementById('email');
          if (emailInput) emailInput.value = this.value;
        }
      });
    },
    
    async handleSubmit(e) {
      e.preventDefault();
      const emailInput = document.getElementById('email');
      const pwInput = document.getElementById('password');
      const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
      const password = pwInput ? pwInput.value : '';
      const overlay = document.getElementById('loading-overlay');
      if (overlay) overlay.classList.remove('hidden');
      
      // Backend attempt
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.token) {
          Auth.setSession(data.token, data.user);
          setTimeout(() => location.href = 'dashboard.html', 15000);
          return;
        }
      } catch {}
      
      // Local registry fallback
      const user = Auth.getUserByCredentials(email, password);
      if (user) {
        Auth.setSession('local-token-' + user.userId, user);
        // Ensure namespace data exists
        if (DB.get('balance', null) === null) DB.set('balance', user.balance || 0);
        if (DB.get('trades', null) === null) DB.set('trades', []);
        if (DB.get('holdings', null) === null) DB.set('holdings', []);
        if (DB.get('notifications', null) === null) DB.set('notifications', []);
        setTimeout(() => location.href = 'dashboard.html', 15000);
      } else {
        if (overlay) overlay.classList.add('hidden');
        TS_UI.showToast('Invalid email or password', 'error');
      }
    }
  };

  // ======================= PROFILE LOGIC =======================
  window.TS_Profile = {
    async load() {
      const user = Auth.getUser();
      if (!user) return;
      
      const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt || '--'; };
      setText('profile-name', `${user.firstName || ''} ${user.lastName || ''}`.trim());
      setText('profile-email', user.email);
      setText('profile-email2', user.email);
      setText('profile-id', user.userId);
      setText('profile-phone', user.phone);
      setText('profile-regdate', user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '--');
      setText('profile-lastlogin', user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '--');
      
      const initialsEl = document.getElementById('profile-initials');
      if (initialsEl) {
        const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase();
        initialsEl.textContent = initials || 'U';
      }
      
      // Avatar
      const avatar = DB.get('avatar', null);
      const imgEl = document.getElementById('profile-avatar-img');
      if (imgEl && avatar) { imgEl.src = avatar; imgEl.style.display = 'block'; if (initialsEl) initialsEl.style.display = 'none'; }
      
      // Location
      const loc = DB.get('device_info', null) || await window.TS_Detect.detect();
      setText('profile-country', loc.country);
      
      // Stats
      const trades = TS_Invest.getTrades();
      const holdings = TS_Invest.getHoldings();
      const balance = TS_Balance.get();
      const deposits = trades.filter(t => t.type === 'deposit').reduce((a, b) => a + (b.amount || 0), 0);
      const withdrawals = trades.filter(t => t.type === 'withdrawal').reduce((a, b) => a + (b.amount || 0), 0);
      const profit = holdings.reduce((a, h) => a + (h.profit || 0), 0) + trades.reduce((a, t) => a + (t.profit || 0), 0);
      
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = '$' + (val || 0).toFixed(2); };
      setVal('total-balance', balance);
      setVal('total-deposits', deposits);
      setVal('total-withdrawals', withdrawals);
      setVal('net-profit', profit);
      
      const totalTrades = trades.length;
      const winTrades = trades.filter(t => (t.profit || 0) > 0).length;
      const winRate = totalTrades ? Math.round((winTrades / totalTrades) * 100) : 0;
      
      const ttEl = document.getElementById('total-trades');
      const wrEl = document.getElementById('win-rate');
      const opEl = document.getElementById('open-positions');
      const tvEl = document.getElementById('total-volume');
      if (ttEl) ttEl.textContent = totalTrades;
      if (wrEl) wrEl.textContent = winRate + '%';
      if (opEl) opEl.textContent = holdings.filter(h => h.status === 'active').length;
      if (tvEl) tvEl.textContent = trades.reduce((a, t) => a + (t.volume || 0), 0).toFixed(2);
      
      this.loadActivity();
    },
    
    loadActivity() {
      const timeline = document.getElementById('activity-timeline');
      if (!timeline) return;
      const trades = TS_Invest.getTrades().slice(0, 10);
      const notifs = TS_Notifications.getAll().slice(0, 5);
      const events = [
        ...trades.map(t => ({ type: 'trade', time: t.startDate || t.createdAt, text: `${(t.type || 'TRADE').toUpperCase()} ${t.symbol || ''} $${t.amount || 0}` })),
        ...notifs.map(n => ({ type: 'notif', time: n.createdAt, text: n.message || 'Notification' }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
      
      timeline.innerHTML = events.length ? events.map(e => `
        <div class="timeline-item">
          <div class="timeline-dot ${e.type}"></div>
          <div class="timeline-content">
            <div class="timeline-text">${e.text}</div>
            <div class="timeline-time">${new Date(e.time).toLocaleString()}</div>
          </div>
        </div>
      `).join('') : '<div class="timeline-empty">No recent activity</div>';
    },
    
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.getElementById('profile-avatar-img');
        const initials = document.getElementById('profile-initials');
        if (img) { img.src = e.target.result; img.style.display = 'block'; }
        if (initials) initials.style.display = 'none';
        DB.set('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    },
    
    saveAccountData() {
      const user = Auth.getUser();
      if (!user) return;
      const users = Auth.getUsersRegistry();
      const idx = users.findIndex(u => u.email === user.email);
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...user, balance: TS_Balance.get(), lastSaved: new Date().toISOString() };
        localStorage.setItem('ts_users_registry', JSON.stringify(users));
      }
      TS_UI.showToast('Account data saved successfully', 'success');
    },
    
    logoutUser() { Auth.logout(); }
  };

  // ======================= SETTINGS LOGIC =======================
  window.TS_Settings = {
    pages: ['server','charts','trade','expert','events','notifications','community','account'],
    
    init() {
      this.loadSettings();
      this.showPage('server');
      this.detectLocation();
    },
    
    showPage(page) {
      this.pages.forEach(p => {
        const tab = document.getElementById(`tab-${p}`);
        const section = document.getElementById(`page-${p}`);
        if (tab) tab.classList.toggle('active', p === page);
        if (section) section.classList.toggle('active', p === page);
      });
    },
    
    toggleSetting(key) {
      const current = DB.get('setting_' + key, false);
      DB.set('setting_' + key, !current);
      this.loadSettings();
    },
    
    saveSetting(key, value) {
      DB.set('setting_' + key, value);
      TS_UI.showToast('Setting saved', 'success');
    },
    
    loadSettings() {
      const map = {
        proxyEnabled:'proxy-toggle', keepSettings:'keep-settings-toggle', newsEnabled:'news-toggle',
        colorPrint:'color-print-toggle', showTradeHistory:'trade-history-toggle', showTradeLevels:'trade-levels-toggle',
        preloadChartData:'preload-toggle', showObjectProps:'obj-props-toggle', selectAfterCreation:'select-after-toggle',
        singleClickSelect:'single-click-toggle', preciseTimeScale:'precise-time-toggle', oneClickTrading:'oneclick-toggle',
        eaAllowLive:'ea-live-toggle', eaAllowDLL:'ea-dll-toggle', eaAllowExternal:'ea-external-toggle',
        eaConfirmDLL:'ea-confirm-dll-toggle', eaConfirmExternal:'ea-confirm-external-toggle', eaAllowWeb:'ea-web-toggle',
        openclEnabled:'opencl-toggle', eventConnectionLoss:'event-connect-toggle', eventTrade:'event-trade-toggle',
        eventNews:'event-news-toggle', eventMail:'event-mail-toggle', eventCalendar:'event-calendar-toggle',
        eventUpdate:'event-update-toggle', soundEnabled:'sound-toggle', notifications:'notif-toggle',
        marketAlerts:'alerts-toggle', tradeNotifications:'trade-notif-toggle', journalNotifications:'journal-notif-toggle',
        emailEnabled:'email-toggle', ftpEnabled:'ftp-toggle', communityAutoLogin:'community-auto-toggle'
      };
      Object.entries(map).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) {
          const val = DB.get('setting_' + key, el.dataset.default === 'true');
          el.classList.toggle('active', val);
          el.classList.toggle('inactive', !val);
        }
      });
      const pc = document.getElementById('proxy-config');
      if (pc) pc.style.display = DB.get('setting_proxyEnabled', false) ? 'block' : 'none';
      const ec = document.getElementById('email-config');
      if (ec) ec.style.display = DB.get('setting_emailEnabled', false) ? 'block' : 'none';
      const fc = document.getElementById('ftp-config');
      if (fc) fc.style.display = DB.get('setting_ftpEnabled', false) ? 'block' : 'none';
    },
    
    async detectLocation() {
      const loc = await window.TS_Detect.detect();
      const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
      set('setting-country', loc.country);
      set('setting-ip', loc.ip);
      set('setting-timezone', loc.timezone);
      set('setting-language', loc.language);
      set('setting-platform', loc.platform);
    },
    
    testProxyConnection() { TS_UI.showToast('Proxy test initiated', 'info'); },
    testEmailConnection() { TS_UI.showToast('SMTP test initiated', 'info'); },
    loginMQL5() { TS_UI.showToast('MQL5 community login processed', 'success'); }
  };

  // ======================= NOTIFICATION BANNER =======================
  async function injectNotificationBanner() {
    const header = document.getElementById('ts-global-header');
    if (!header || !Auth.isLoggedIn()) return;
    if (DB.get('banner_dismissed', false)) return;
    
    const banner = document.createElement('div');
    banner.id = 'ts-market-banner';
    banner.className = 'ts-market-banner';
    banner.innerHTML = `
      <div class="ts-banner-content">
        <span class="ts-banner-label">Live</span>
        <span class="ts-banner-ticker" id="banner-ticker">Loading market data...</span>
      </div>
      <button class="ts-banner-close" onclick="TS_Notifications.dismissBanner()" title="Dismiss">${ICONS.close}</button>
    `;
    header.insertAdjacentElement('afterend', banner);
    
    try {
      const [coins, news] = await Promise.all([TS_Market.getCoins(), TS_Market.getNews().catch(() => [])]);
      const top = coins.slice(0, 5).map(c => `${c.symbol.toUpperCase()} $${c.current_price?.toFixed(2)} (${c.price_change_percentage_24h?.toFixed(1)}%)`).join(' • ');
      const headline = (news[0]?.headline || 'Markets are open');
      const ticker = document.getElementById('banner-ticker');
      if (ticker) ticker.textContent = `${headline} | ${top}`;
    } catch {
      const ticker = document.getElementById('banner-ticker');
      if (ticker) ticker.textContent = 'Connection established • Markets active';
    }
  }

  // ======================= INIT =======================
  document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUI();
    injectNotificationBanner();
    
    setInterval(() => {
      if (Auth.isLoggedIn()) {
        window.TS_Invest.updateAll();
      }
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
    
    // Page-specific initializers
    const page = window.location.pathname.split('/').pop();
    if (page === 'login.html' || page === 'login') TS_Login.init();
    if (page === 'profile.html' || page === 'profile') TS_Profile.load();
    if (page === 'settings.html' || page === 'settings') TS_Settings.init();
    if (page === 'notifications.html' || page === 'notifications') {
      const list = document.getElementById('notifications-list');
      if (list) {
        const notifs = TS_Notifications.getAll();
        list.innerHTML = notifs.length ? notifs.map(n => `
          <div class="notif-card ${n.read ? 'read' : 'unread'}">
            <div class="notif-msg">${n.message}</div>
            <div class="notif-time">${new Date(n.createdAt).toLocaleString()}</div>
          </div>
        `).join('') : '<div class="notif-empty">No notifications</div>';
      }
    }
  });
  
  // Global aliases for inline HTML handlers
  window.goStep = (s) => window.TS_Register.goStep(s);
  window.selectAccountType = (el) => window.TS_Register.selectAccountType(el);
  window.selectCurrency = (el) => window.TS_Register.selectCurrency(el);
  window.selectLeverage = (el) => window.TS_Register.selectLeverage(el);
  window.submitRegistration = () => window.TS_Register.submitRegistration();
  window.saveAccountData = () => window.TS_Profile.saveAccountData();
  window.logoutUser = () => window.TS_Profile.logoutUser();
  window.handleAvatarUpload = (e) => window.TS_Profile.handleAvatarUpload(e);
  window.refreshAccountData = () => window.TS_Profile.load();
  window.loadActivityHistory = () => window.TS_Profile.loadActivity();
  window.showSettingsPage = (p) => window.TS_Settings.showPage(p);
  window.toggleSetting = (k) => window.TS_Settings.toggleSetting(k);
  window.saveSetting = (k, v) => window.TS_Settings.saveSetting(k, v);
  window.testProxyConnection = () => window.TS_Settings.testProxyConnection();
  window.testEmailConnection = () => window.TS_Settings.testEmailConnection();
  window.loginMQL5 = () => window.TS_Settings.loginMQL5();
  window.openAddAccountModal = () => document.getElementById('add-account-modal')?.classList.add('active');
  window.closeAddAccountModal = () => document.getElementById('add-account-modal')?.classList.remove('active');
  window.closeAccountSwitcher = () => document.getElementById('account-switcher-modal')?.classList.remove('active');
  window.togglePasswordVisibility = () => {
    const pw = document.getElementById('password-masked');
    if (pw) pw.textContent = pw.textContent === '••••••••' ? (Auth.getUser()?.password || '••••••••') : '••••••••';
  };
})();
