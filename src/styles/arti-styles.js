export const G_COLOR = "#2A8A3B";

export const ar = {
  page: { fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)", background: "#F5FBF5" },
  hero: { position: "relative", background: "linear-gradient(160deg,#51B054 0%,#2A8A3B 100%)", color: "#fff", overflow: "hidden" },
  heroInner: { maxWidth: 1180, margin: "0 auto", padding: "48px 40px 92px", position: "relative", zIndex: 1 },
  crumb: { fontSize: 13, opacity: 0.85, marginBottom: 20, display: "flex", gap: 8, alignItems: "center" },
  crumbLink: { color: "#fff", textDecoration: "none", opacity: 0.85 },
  badge: { display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.16)", padding: "5px 13px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.02em" },
  h1: { fontSize: 42, fontWeight: 800, letterSpacing: "-0.025em", margin: "16px 0 10px", lineHeight: 1.08, maxWidth: 640 },
  lead: { fontSize: 16.5, opacity: 0.92, lineHeight: 1.6, maxWidth: 560 },
  bignum: { display: "flex", alignItems: "flex-end", gap: 14, marginTop: 26 },
  bignumV: { fontSize: 68, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.03em" },
  bignumL: { fontSize: 15, opacity: 0.9, paddingBottom: 8, lineHeight: 1.4 },
  treeRow: { display: "flex", gap: 2, alignItems: "flex-end", marginTop: 22, flexWrap: "wrap" },
  blob1: { position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.07)" },
  blob2: { position: "absolute", bottom: -120, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.05)" },

  body: { maxWidth: 1180, margin: "0 auto", padding: "0 40px 64px" },
  statsCard: { marginTop: -56, position: "relative", zIndex: 2, background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 18, boxShadow: "0 18px 44px rgba(31,27,51,0.10)", padding: "22px 10px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" },
  statCell: { textAlign: "center", padding: "0 16px" },
  statV: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" },
  statL: { fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 6, lineHeight: 1.35 },

  grid: { display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 28, marginTop: 36, alignItems: "start" },
  sectionH: { fontSize: 20, fontWeight: 800, letterSpacing: "-0.015em", marginBottom: 4 },
  sectionSub: { fontSize: 13.5, color: "var(--atr-text-muted)", marginBottom: 16 },
  card: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, overflow: "hidden" },

  levelCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, padding: 20, marginTop: 26 },
  bar: { height: 10, background: "var(--atr-bg-soft)", borderRadius: 99, overflow: "hidden", marginTop: 12 },
  barFill: { width: "76%", height: "100%", background: "linear-gradient(90deg,#51B054,#FFC442)", borderRadius: 99 },

  actRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" },
  actIcon: (g) => ({ width: 46, height: 46, borderRadius: 13, background: g ? "#E6F7E6" : "#FFF4D9", color: g ? G_COLOR : "#8B6500", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0 }),

  trackerHero: { position: "relative", height: 200, borderRadius: 16, overflow: "hidden" },
  growthRow: { display: "flex", gap: 6, alignItems: "flex-end", padding: "14px 0", borderTop: "1px dashed var(--atr-outline)", borderBottom: "1px dashed var(--atr-outline)", margin: "14px 0" },
  farmerCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, padding: 16, marginTop: 16, display: "flex", alignItems: "center", gap: 14 },
  sponsor: { marginTop: 28, borderRadius: 18, padding: "26px 28px", background: "linear-gradient(135deg,#FFC442 0%,#FF9A00 100%)", color: "#3D2900", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
  sponsorBtn: { background: "#1F1B33", color: "#fff", border: "none", borderRadius: 12, padding: "13px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", marginLeft: "auto" },
};
