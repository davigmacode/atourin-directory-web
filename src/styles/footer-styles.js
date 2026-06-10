/* SiteFooter styles — matching Destinations.html (site-chrome.jsx) */
const F = {
  wrap: { background: '#fff', color: 'var(--atr-text)', marginTop: 80, borderTop: '1px solid var(--atr-outline)', fontFamily: 'var(--atr-font-sans)' },
  news: {
    maxWidth: 1280, margin: '0 auto', padding: '30px 40px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
    borderBottom: '1px solid var(--atr-outline)',
  },
  newsT: { fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' },
  newsS: { fontSize: 13.5, color: 'var(--atr-text-muted)', marginTop: 5 },
  newsForm: { display: 'flex', gap: 8, flex: '0 1 420px', minWidth: 280 },
  newsInput: {
    flex: 1, border: '1.5px solid var(--atr-outline)', borderRadius: 12, padding: '13px 16px',
    fontSize: 14, fontFamily: 'var(--atr-font-sans)', outline: 'none',
  },
  newsBtn: {
    background: 'var(--atr-purple)', color: '#fff', border: 'none', borderRadius: 12,
    padding: '0 24px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)',
    whiteSpace: 'nowrap',
  },
  main: {
    maxWidth: 1280, margin: '0 auto', padding: '40px 40px 30px',
    display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.35fr', gap: 30, alignItems: 'start',
  },
  tagline: { fontSize: 14, color: 'var(--atr-text-muted)', lineHeight: 1.6, margin: '16px 0 18px', maxWidth: 340 },
  partnerBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'var(--atr-purple)', color: '#fff', borderRadius: 12,
    padding: '13px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none',
    boxShadow: '0 10px 24px rgba(112,104,213,0.32)', whiteSpace: 'nowrap', alignSelf: 'flex-start',
  },
  contactRow: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 },
  contactItem: { display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 700, color: 'var(--atr-text)', textDecoration: 'none' },
  contactIcon: {
    width: 32, height: 32, borderRadius: 9, background: 'var(--atr-purple-50)',
    color: 'var(--atr-purple)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  },
  colTitle: { fontSize: 13, fontWeight: 800, color: 'var(--atr-text)', marginBottom: 14, letterSpacing: '0' },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 },
  link: { fontSize: 13.5, color: 'var(--atr-text-muted)', textDecoration: 'none' },
  appCol: { display: 'flex', flexDirection: 'column', gap: 10 },
  appBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    border: '1.5px solid var(--atr-outline)', borderRadius: 11, padding: '8px 14px',
    textDecoration: 'none', color: 'var(--atr-text)',
  },
  appSm: { fontSize: 9, fontWeight: 600, opacity: 0.7, display: 'block', lineHeight: 1.2 },
  appLg: { fontSize: 13, fontWeight: 800, display: 'block', lineHeight: 1.2 },
  socialRow: { display: 'flex', gap: 9, marginTop: 12 },
  socialDot: {
    width: 38, height: 38, borderRadius: 999, border: '1px solid var(--atr-outline)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--atr-text)', textDecoration: 'none',
  },
  payRow: {
    maxWidth: 1280, margin: '0 auto', padding: '18px 40px',
    borderTop: '1px solid var(--atr-outline)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
  },
  trust: { display: 'flex', gap: 10, flexWrap: 'wrap', flexShrink: 0 },
  trustChip: { display: 'inline-flex', alignItems: 'center', border: '1px solid var(--atr-outline)', borderRadius: 12, padding: '8px 14px', background: '#fff' },
  marquee: {
    flex: '1 1 0', minWidth: 0, overflow: 'hidden',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)',
    maskImage: 'linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)',
  },
  track: { display: 'inline-flex', gap: 8, width: 'max-content', animation: 'atrFootMarquee 26s linear infinite' },
  payTile: {
    fontSize: 11.5, fontWeight: 700, color: 'var(--atr-text-muted)',
    background: 'var(--atr-bg-soft)', border: '1px solid var(--atr-outline)',
    borderRadius: 7, padding: '5px 10px', whiteSpace: 'nowrap',
  },
  bottom: {
    maxWidth: 1280, margin: '0 auto', padding: '18px 40px',
    borderTop: '1px solid var(--atr-outline)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
    fontSize: 12.5, color: 'var(--atr-text-muted)',
  },
  bottomLinks: { display: 'flex', alignItems: 'center', gap: 18 },
  bl: { color: 'var(--atr-text-muted)', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' },
};

export default F;
