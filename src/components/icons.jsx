'use client';

/* SVG icon components used across the site */

export function ReceiptIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

export function HandshakeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M8 11l-3 3M16 11l3 3M8 11l4-3 4 3M8 11v5l3 2 1-1 1 1 3-2v-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function NotifBell() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 1112 0c0 4 1.2 5.5 2 6.5H4c.8-1 2-2.5 2-6.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M9.5 19a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

export function UmProfil() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

export function UmPesanan() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  );
}

export function UmWishlist() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M12 20s-7-4.3-9.2-8.5C1.3 8.3 2.8 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.2 0 4.7 3.3 3.2 6.5C19 15.7 12 20 12 20z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  );
}

export function UmSettings() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4L5.6 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

export function UmLogout() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M15 12H5m0 0l3.5-3.5M5 12l3.5 3.5M14 5h3a2 2 0 012 2v10a2 2 0 01-2 2h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function WaIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 19l1.5-4A8 8 0 1 1 9 19l-4 0z" stroke="var(--atr-purple)" strokeWidth="1.8" strokeLinejoin="round"/></svg>;
}

export function MailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="var(--atr-purple)" strokeWidth="1.8"/><path d="M3 7l9 7 9-7" stroke="var(--atr-purple)" strokeWidth="1.8"/></svg>;
}

export function PlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 24 24">
      <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1 9.4-9.4v-.2L3.7 2.2z" fill="#00C3FF"/>
      <path d="M16.8 15.4l-3.2-3.2v-.2l3.2-3.2.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.7 2.1z" fill="#FFCE00"/>
      <path d="M16.9 15.3L13.6 12 3.6 21.9c.4.4.9.4 1.6.1l11.7-6.7z" fill="#00DE76"/>
      <path d="M16.9 8.7L5.2 2.1c-.7-.4-1.2-.4-1.6 0L13.6 12z" fill="#FF3A44"/>
    </svg>
  );
}

export function AppleIcon() {
  return <svg width="20" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M16 1c-1.5.1-3 1-3.8 2.2-.7 1-1.3 2.5-1.1 4 1.7.1 3.2-.9 4-2 .9-1.2 1.5-2.7.9-4.2zM20 17c-.5 1.2-1.1 2.4-2 3.5-1.2 1.4-2.5 2.5-4.2 2.5-1.6 0-2.1-1-4-1-1.9 0-2.5 1-4 1-1.7 0-3-1.3-4.2-2.7C-.7 17.4-1.5 11.6 2.5 8.6 4 7.5 5.7 7 7.4 7c1.6 0 3 1 4 1 .9 0 3-1.2 5.2-1 1 0 3.5.4 5.2 2.7-.1.1-3 1.8-3 5.4 0 4.2 3.7 5.6 3.8 5.7-.1.1-.6 2.1-1.6 3.2z"/></svg>;
}

export function IgIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>; }

export function FbIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1 .5-2 2-2h2V2h-3.5C11 2 9 4 9 7v3H6v4h3v8h4z"/></svg>; }

export function InIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="9" width="4" height="13"/><circle cx="4" cy="4" r="2"/><path d="M9 9h4v2c.7-1.3 2.5-2.5 4.5-2.5 3 0 4.5 2 4.5 5.5V22h-4v-7c0-2-.7-3-2.3-3S13 13 13 15v7H9V9z"/></svg>; }

export function YtIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 8c0-2-1.5-3.5-3.5-3.5h-13C3.5 4.5 2 6 2 8v8c0 2 1.5 3.5 3.5 3.5h13c2 0 3.5-1.5 3.5-3.5V8zm-12 8V8l6 4-6 4z"/></svg>; }

export function TtIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2c.6 2.5 2.5 4.4 5 5v3.5c-1.7 0-3.4-.5-4.8-1.5v6.5c0 4-3.2 7.5-7 7.5s-7-3.2-7-7 3.2-7 7-7c.5 0 1 .1 1.5.2v3.7c-.5-.2-1-.3-1.5-.3-1.7 0-3.2 1.5-3.2 3.5s1.5 3.5 3.2 3.5 3.3-1.5 3.3-3.5V2h3.5z"/></svg>; }

export function NavGlyph({ kind, active }) {
  const color = active ? 'var(--atr-purple)' : 'var(--atr-text)';
  if (kind === 'store') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 5l1.5-2h13L20 5v2H4V5z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M4 7h16v2a3 3 0 01-3 3H7a3 3 0 01-3-3V7z" stroke={color} strokeWidth="1.6"/>
        <path d="M10 12v4h4v-4" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M6 12v7h12v-7" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'compass') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.6"/>
        <path d="M10 10l5-2-2 5-5 2z" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    );
  }
  return null;
}

export function PartnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3" stroke="#fff" strokeWidth="1.8"/>
      <circle cx="17" cy="10" r="2.4" stroke="#fff" strokeWidth="1.8"/>
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function PlayBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1 9.4-9.4v-.2L3.7 2.2z" fill="#00C3FF"/>
      <path d="M16.8 15.4l-3.2-3.2v-.2l3.2-3.2.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.7 2.1z" fill="#FFCE00"/>
      <path d="M16.9 15.3L13.6 12 3.6 21.9c.4.4.9.4 1.6.1l11.7-6.7z" fill="#00DE76"/>
      <path d="M16.9 8.7L5.2 2.1c-.7-.4-1.2-.4-1.6 0L13.6 12z" fill="#FF3A44"/>
    </svg>
  );
}

export function AppleBadge() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M16 1c-1.5.1-3 1-3.8 2.2-.7 1-1.3 2.5-1.1 4 1.7.1 3.2-.9 4-2 .9-1.2 1.5-2.7.9-4.2zM20 17c-.5 1.2-1.1 2.4-2 3.5-1.2 1.4-2.5 2.5-4.2 2.5-1.6 0-2.1-1-4-1-1.9 0-2.5 1-4 1-1.7 0-3-1.3-4.2-2.7C-.7 17.4-1.5 11.6 2.5 8.6 4 7.5 5.7 7 7.4 7c1.6 0 3 1 4 1 .9 0 3-1.2 5.2-1 1 0 3.5.4 5.2 2.7-.1.1-3 1.8-3 5.4 0 4.2 3.7 5.6 3.8 5.7-.1.1-.6 2.1-1.6 3.2z"/></svg>;
}

export function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="13"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

