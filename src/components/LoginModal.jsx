'use client';

import React from 'react';

export default function LoginModal({ onClose, onLogin }) {
  const lm = {
    scrim: { position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(31,27,51,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
    modal: { background: '#fff', borderRadius: 22, width: 'min(420px, 100%)', boxShadow: '0 30px 70px rgba(31,27,51,0.4)', overflow: 'hidden' },
    head: { padding: '26px 28px 6px', textAlign: 'center', position: 'relative' },
    close: { position: 'absolute', top: 16, right: 16, width: 34, height: 34, borderRadius: 999, background: 'var(--atr-bg-soft)', border: 'none', cursor: 'pointer', color: 'var(--atr-text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
    logo: { height: 30, marginBottom: 14 },
    title: { fontSize: 21, fontWeight: 700, color: 'var(--atr-text)', letterSpacing: '-0.01em' },
    sub: { fontSize: 13.5, color: 'var(--atr-text-muted)', marginTop: 5 },
    body: { padding: '18px 28px 26px', display: 'flex', flexDirection: 'column', gap: 12 },
    label: { fontSize: 13, fontWeight: 600, color: 'var(--atr-text)', marginBottom: 6, display: 'block' },
    input: { width: '100%', border: '1px solid var(--atr-outline)', borderRadius: 11, padding: '12px 14px', fontSize: 14, color: 'var(--atr-text)', fontFamily: 'var(--atr-font-sans)', background: 'var(--atr-bg-soft)', outline: 'none', boxSizing: 'border-box' },
    forgot: { fontSize: 12.5, fontWeight: 600, color: 'var(--atr-purple)', textAlign: 'right', marginTop: 6, cursor: 'pointer' },
    btn: { background: 'var(--atr-purple)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 15.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)', boxShadow: '0 8px 20px rgba(112,104,213,0.32)', marginTop: 6 },
    divider: { display: 'flex', alignItems: 'center', gap: 12, color: 'var(--atr-text-muted)', fontSize: 12, margin: '6px 0' },
    line: { flex: 1, height: 1, background: 'var(--atr-outline)' },
    social: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: '1px solid var(--atr-outline)', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 700, color: 'var(--atr-text)', cursor: 'pointer', background: '#fff', fontFamily: 'var(--atr-font-sans)' },
    foot: { textAlign: 'center', fontSize: 13.5, color: 'var(--atr-text-muted)', marginTop: 4 },
    footLink: { color: 'var(--atr-purple)', fontWeight: 700, cursor: 'pointer' },
  };
  return (
    <div style={lm.scrim} onClick={onClose}>
      <div style={lm.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={lm.head}>
          <button style={lm.close} onClick={onClose} aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
          <img src="/assets/atr/logo/atourin-logo-purple.png" alt="Atourin" style={lm.logo} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div style={lm.title}>Masuk ke Atourin</div>
          <div style={lm.sub}>Lanjutkan petualanganmu menjelajah Nusantara</div>
        </div>
        <form style={lm.body} onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label style={lm.label}>Email atau nomor telepon</label>
            <input style={lm.input} type="text" defaultValue="widiapriyono@gmail.com" placeholder="nama@email.com" />
          </div>
          <div>
            <label style={lm.label}>Kata sandi</label>
            <input style={lm.input} type="password" defaultValue="••••••••" placeholder="Masukkan kata sandi" />
            <div style={lm.forgot}>Lupa kata sandi?</div>
          </div>
          <button type="submit" style={lm.btn} onClick={(e) => { e.preventDefault(); onLogin(); }}>Masuk</button>
          <div style={lm.divider}><span style={lm.line} /> atau <span style={lm.line} /></div>
          <button type="button" style={lm.social} onClick={onLogin}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.6-.1-1.2-.2-1.8H12v3.4h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.1z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0012 22z"/><path fill="#FBBC04" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 002 12c0 1.6.4 3.1 1.1 4.6L6.4 14z"/><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 003.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z"/></svg>
            Masuk dengan Google
          </button>
          <div style={lm.foot}>Belum punya akun? <span style={lm.footLink} onClick={onLogin}>Daftar sekarang</span></div>
        </form>
      </div>
    </div>
  );
}
