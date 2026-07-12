export const stp = {
  page: { background: "#fff", fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)" },
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "0 32px" },
  wrapWide: { maxWidth: 1376, margin: "0 auto", padding: "0 32px" },

  /* page hero header */
  hero: { background: "radial-gradient(900px 360px at 80% -20%, #EEEBFF 0%, rgba(238,235,255,0) 60%), linear-gradient(180deg, #FBFAFF 0%, #FFFFFF 100%)", padding: "56px 0 48px", textAlign: "center", borderBottom: "1px solid var(--atr-outline)" },
  heroIcon: { width: 60, height: 60, borderRadius: 18, background: "var(--atr-purple-50)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18, border: "1px solid var(--atr-purple-light)" },
  heroTitle: { fontSize: 42, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--atr-text)", lineHeight: 1.05, textWrap: "balance" },
  heroTitleHl: { color: "var(--atr-purple)" },
  heroSub: { fontSize: 16.5, color: "var(--atr-text-muted)", marginTop: 14, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 },
  crumb: { display: "flex", justifyContent: "center", gap: 8, fontSize: 13, color: "var(--atr-text-muted)", marginBottom: 22 },
  crumbLink: { color: "var(--atr-purple)", fontWeight: 600, textDecoration: "none" },

  /* generic section */
  section: { padding: "56px 0" },
  secHeadC: { textAlign: "center", marginBottom: 36 },
  kicker: { fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--atr-purple)", marginBottom: 10 },
  secTitle: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--atr-text)", lineHeight: 1.12, textWrap: "balance" },
  secSub: { fontSize: 15.5, color: "var(--atr-text-muted)", marginTop: 10, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 },

  /* buttons */
  btnPrimary: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 26px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 8px 20px rgba(112,104,213,0.3)", textDecoration: "none" },
  btnGhost: { background: "#fff", color: "var(--atr-text)", border: "1px solid var(--atr-outline)", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" },
};

export const sx = {
  card: { border: "1px solid var(--atr-outline)", borderRadius: 16, background: "#fff", boxShadow: "var(--atr-shadow-1)" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 },
  grid2: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 },
};
