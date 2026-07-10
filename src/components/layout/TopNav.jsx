'use client';

import React, { useState, useEffect } from 'react';
import { NavGlyph, NotifBell } from '@/components/icons';
import layoutStyles from '@/styles/layout-styles';
import utilStyles from '@/styles/util-styles';
import { t } from '@/lib/i18n';
import LoginModal from './LoginModal';

export default function TopNav({ active = 'Jelajahi', isLoggedIn = false }) {
  const [showUser, setShowUser] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return isLoggedIn;
    try { const v = localStorage.getItem('atr_auth'); return v === null ? isLoggedIn : v === '1'; } catch { return isLoggedIn; }
  });
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    const open = () => setShowLogin(true);
    window.addEventListener('atr-open-login', open);
    return () => window.removeEventListener('atr-open-login', open);
  }, []);
  function doLogin() { try { localStorage.setItem('atr_auth', '1'); } catch {} setLoggedIn(true); setShowLogin(false); }
  function doLogout() { try { localStorage.setItem('atr_auth', '0'); } catch {} setLoggedIn(false); setShowUser(false); }
  const navItems = [
    { key: 'Pesan', label: t('nav.pesan'), icon: 'store', href: '/', aliases: ['Experience', 'Attraction', 'Homestay', 'Product', 'Marketplace', 'Homestay'] },
    { key: 'Jelajahi', label: t('nav.jelajahi'), icon: 'compass', href: '/explore-hub', aliases: ['Explore', 'Itinerary', 'Destinasi', 'Atraksi', 'Tour Guide', 'Desa Wisata'] },
  ];
  return (
    <header style={layoutStyles.header}>
      <style>{`.atr-bell:hover{background:var(--atr-purple-50);border-color:var(--atr-purple-light);color:var(--atr-purple)}
        .atr-burger{display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:11px;border:1px solid var(--atr-outline);background:#fff;color:var(--atr-text);cursor:pointer;flex-shrink:0}
        .atr-drawer-scrim{position:fixed;inset:0;background:rgba(31,27,51,0.5);z-index:120;opacity:0;pointer-events:none;transition:opacity .25s}
        .atr-drawer-scrim.open{opacity:1;pointer-events:auto}
        .atr-drawer{position:fixed;top:0;right:0;bottom:0;width:min(330px,86vw);background:#fff;z-index:121;transform:translateX(100%);transition:transform .28s cubic-bezier(.4,0,.2,1);box-shadow:-12px 0 40px rgba(31,27,51,0.2);display:flex;flex-direction:column;overflow-y:auto}
        .atr-drawer.open{transform:none}
        @media (max-width:920px){
          .atr-hinner{grid-template-columns:auto 1fr auto auto !important;gap:10px !important;padding:12px 18px !important}
          .atr-hnav,.atr-hplanner{display:none !important}
          .atr-burger{display:inline-flex}
          .atr-hsearch{max-width:none !important}
          .atr-username{display:none !important}
        }
        @media (max-width:520px){
          .atr-hsearch{display:none !important}
        }`}</style>
      <div style={layoutStyles.headerInner} className="atr-hinner">
        <a href="/" style={layoutStyles.logo}>
          <img src="/assets/atr/logo/atourin-wordmark.png" alt="Atourin" style={layoutStyles.logoImg} />
        </a>

        <div style={layoutStyles.searchWrap} className="atr-hsearch">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <input style={layoutStyles.searchInput} placeholder="Cari rencana perjalanan, destinasi, atau tempat wisata" defaultValue="" />
        </div>

        <a href="/" title="Tanya AI Asisten" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 42, padding: '0 14px', borderRadius: 9999, background: 'linear-gradient(135deg,#7068D5,#A49EE4)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13.5, flexShrink: 0, boxShadow: '0 2px 8px rgba(112,104,213,.32)' }} className="atr-ai-btn">
          <img src="/assets/atr/assistant.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
          <span className="atr-ai-label">Tanya AI</span>
        </a>

        <nav style={layoutStyles.nav} className="atr-hnav">
          {navItems.map((n) => {
            const isActive = n.key === active || (n.aliases && n.aliases.includes(active));
            return (
              <a key={n.key} href={n.href} style={{ ...layoutStyles.navItem, ...(isActive ? layoutStyles.navItemActive : {}), gap: 4 }}>
                <NavGlyph kind={n.icon} active={isActive} />
                <span>{n.label}</span>
              </a>
            );
          })}
        </nav>

        {loggedIn ? (
          <div style={{ position: 'relative' }}>
            <a href="/" style={utilStyles.bellBtn} className="atr-bell">
              <NotifBell />
            </a>
          </div>
        ) : (
          <button style={layoutStyles.signInBtn} onClick={() => setShowLogin(true)}>
            {t('nav.masuk')}
          </button>
        )}

        <button className="atr-burger" aria-label="Menu" onClick={() => setMobileMenu(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      <div className={'atr-drawer-scrim' + (mobileMenu ? ' open' : '')} onClick={() => setMobileMenu(false)} />
      <div className={'atr-drawer' + (mobileMenu ? ' open' : '')} role="dialog" aria-label="Menu navigasi">
        <div style={layoutStyles.drawerHead}>
          <img src="/assets/atr/logo/atourin-wordmark.png" alt="Atourin" style={{ height: 26 }} />
          <button style={layoutStyles.drawerClose} aria-label="Tutup" onClick={() => setMobileMenu(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <nav style={layoutStyles.drawerNav}>
          {navItems.map((n) => (
            <a key={n.key} href={n.href} style={layoutStyles.drawerLink}>
              <NavGlyph kind={n.icon} active={false} /> {n.label}
            </a>
          ))}
        </nav>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={doLogin} />}
    </header>
  );
}
