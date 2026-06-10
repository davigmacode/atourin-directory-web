/* SiteFooter styles */
const F = {
  wrap: { background: '#FAFAFC', color: 'var(--atr-text)', paddingTop: 64, marginTop: 80, borderTop: '1px solid var(--atr-outline)' },
  news: {
    maxWidth: 1376, margin: '0 auto', padding: '0 32px 48px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap',
  },
  newsT: { fontSize: 18, fontWeight: 700, color: 'var(--atr-text)' },
  newsS: { fontSize: 13, color: 'var(--atr-text-muted)', marginTop: 4 },
  newsForm: { display: 'flex', gap: 8 },
  newsInput: {
    border: '1px solid var(--atr-outline)', borderRadius: 10, padding: '11px 16px',
    fontSize: 14, fontFamily: 'var(--atr-font-sans)', outline: 'none', minWidth: 260,
    color: 'var(--atr-text)',
  },
  newsBtn: {
    background: 'var(--atr-purple)', color: '#fff', border: 'none', borderRadius: 10,
    padding: '11px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)',
    whiteSpace: 'nowrap',
  },
  main: {
    maxWidth: 1376, margin: '0 auto', padding: '0 32px',
    display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 56,
  },
  tagline: { fontSize: 13, lineHeight: 1.55, color: 'var(--atr-text-muted)', maxWidth: 340, margin: '16px 0' },
  partnerBtn: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: 'var(--atr-purple)', color: '#fff', border: 'none', borderRadius: 10,
    padding: '12px 18px', fontSize: 14, fontWeight: 600, fontFamily: 'var(--atr-font-sans)',
    cursor: 'pointer', boxShadow: '0 4px 12px rgba(112,104,213,0.25)',
    textDecoration: 'none',
  },
  contactRow: { display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 },
  contactItem: { display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--atr-text)' },
  contactIcon: {
    width: 36, height: 36, borderRadius: 999, background: '#EDE9FF',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  colTitle: { fontSize: 13, fontWeight: 700, color: 'var(--atr-text)', marginBottom: 16, letterSpacing: '0' },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12 },
  link: { fontSize: 13, color: 'var(--atr-text-muted)', cursor: 'pointer', textDecoration: 'none' },
  appCol: { display: 'flex', flexDirection: 'column', gap: 8 },
  appBtn: {
    background: '#1F1B33', color: '#fff', borderRadius: 8,
    padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 10,
    textDecoration: 'none', fontFamily: 'var(--atr-font-sans)',
  },
  appSm: { fontSize: 9, fontWeight: 400, opacity: 0.85, lineHeight: 1.2 },
  appLg: { fontSize: 13, fontWeight: 700, lineHeight: 1.2 },
  socialRow: { display: 'flex', gap: 8 },
  socialDot: {
    width: 36, height: 36, borderRadius: 999, background: '#fff',
    border: '1px solid var(--atr-outline)', color: 'var(--atr-text-muted)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    textDecoration: 'none', transition: 'border-color .15s, color .15s',
  },
  payRow: {
    maxWidth: 1376, margin: '32px auto 0', padding: '0 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
  },
  trust: { display: 'flex', gap: 16, alignItems: 'center', flexShrink: 0 },
  trustChip: { border: '1px solid var(--atr-outline)', borderRadius: 8, padding: '6px 10px', display: 'inline-flex', alignItems: 'center', background: '#fff' },
  marquee: { overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(90deg,transparent 0,#000 30px,#000 calc(100% - 30px),transparent 100%)' },
  track: { display: 'flex', gap: 24, animation: 'atrFootMarquee 24s linear infinite', width: 'max-content' },
  payTile: { padding: '4px 0', fontSize: 13, fontWeight: 600, color: 'var(--atr-text-muted)', whiteSpace: 'nowrap' },
  bottom: {
    maxWidth: 1376, margin: '0 auto', padding: '20px 32px 28px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
    fontSize: 12, color: 'var(--atr-text-muted)', borderTop: '1px solid var(--atr-outline)', marginTop: 24,
  },
  bottomLinks: { display: 'flex', gap: 18, alignItems: 'center' },
  bl: { color: 'var(--atr-text-muted)', textDecoration: 'none', cursor: 'pointer' },
};

export default F;
