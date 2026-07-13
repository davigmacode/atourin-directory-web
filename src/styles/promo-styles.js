export const PROMO_TONE = {
  purple: { bg: "var(--atr-purple)", soft: "var(--atr-purple-50)", fg: "var(--atr-purple)" },
  green:  { bg: "#2F8A3B", soft: "rgba(81,176,84,0.14)", fg: "#2F8A3B" },
  blue:   { bg: "#2F6FA5", soft: "rgba(47,128,181,0.13)", fg: "#2F6FA5" },
  red:    { bg: "var(--atr-red)", soft: "rgba(244,98,99,0.12)", fg: "#D6494A" },
};

export const pr = {
  page: { background: "var(--atr-bg-soft)", minHeight: "100vh", fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)" },

  /* hero */
  hero: {
    background: "linear-gradient(135deg, #6E62D8 0%, #8B6FD0 55%, #9B6AAB 100%)",
    color: "#fff", position: "relative", overflow: "hidden",
  },
  heroInner: { maxWidth: 1100, margin: "0 auto", padding: "52px 24px 56px", position: "relative", zIndex: 1 },
  heroKicker: { fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85 },
  heroTitle: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 8, lineHeight: 1.1, textWrap: "balance" },
  heroSub: { fontSize: 16, opacity: 0.92, marginTop: 12, maxWidth: 560, lineHeight: 1.5 },
  heroBlob: { position: "absolute", borderRadius: "50%", filter: "blur(2px)", opacity: 0.18, background: "#fff" },

  searchWrap: {
    marginTop: 26, display: "flex", gap: 10, maxWidth: 680,
    background: "#fff", borderRadius: 14, padding: 8, boxShadow: "0 12px 32px rgba(31,27,51,0.18)",
  },
  searchIcon: { display: "inline-flex", alignItems: "center", paddingLeft: 12, color: "var(--atr-text-muted)" },
  searchInput: {
    flex: 1, border: "none", outline: "none", fontSize: 15, color: "var(--atr-text)",
    fontFamily: "var(--atr-font-sans)", background: "transparent", padding: "8px 4px",
  },
  searchBtn: {
    background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 10,
    padding: "0 24px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", gap: 8,
  },
  hintRow: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  hintLabel: { fontSize: 13, opacity: 0.85 },
  hintChip: {
    fontSize: 12.5, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, padding: "5px 14px",
    cursor: "pointer", fontFamily: "var(--atr-font-sans)",
  },

  /* category bar */
  catBarOuter: { background: "#fff", borderBottom: "1px solid var(--atr-outline)", position: "sticky", top: 0, zIndex: 20 },
  catBar: { maxWidth: 1100, margin: "0 auto", padding: "10px 24px", display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" },
  catBtn: {
    display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6,
    padding: "10px 18px", borderRadius: 12, border: "1px solid transparent", background: "transparent",
    color: "var(--atr-text-muted)", cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    fontSize: 12.5, fontWeight: 600, minWidth: 84, transition: "background .12s, color .12s",
  },
  catBtnActive: { background: "var(--atr-purple-50)", color: "var(--atr-purple)", border: "1px solid var(--atr-purple-light)" },

  /* grid */
  gridWrap: { maxWidth: 1100, margin: "0 auto", padding: "28px 24px 64px" },
  resultHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18, flexWrap: "wrap", gap: 8 },
  resultTitle: { fontSize: 19, fontWeight: 700, color: "var(--atr-text)" },
  resultCount: { fontSize: 13.5, color: "var(--atr-text-muted)" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 20 },

  /* card */
  card: {
    background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, overflow: "hidden",
    boxShadow: "var(--atr-shadow-2)", display: "flex", flexDirection: "column",
    transition: "transform .15s, box-shadow .15s",
  },
  cardMedia: { position: "relative", height: 150, background: "var(--atr-bg-cool)" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardImgScrim: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,27,51,0) 40%, rgba(31,27,51,0.34) 100%)" },
  cardBadge: {
    position: "absolute", top: 12, left: 12, color: "#fff",
    fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 999,
    boxShadow: "0 4px 10px rgba(31,27,51,0.25)", letterSpacing: "0.01em",
  },
  cardCatTag: {
    position: "absolute", bottom: 12, left: 12, color: "#fff",
    fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
    display: "inline-flex", alignItems: "center", gap: 5,
  },
  cardBody: { padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  cardPeriod: { fontSize: 11.5, color: "var(--atr-text-muted)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em", lineHeight: 1.25 },
  cardDesc: { fontSize: 12.5, color: "var(--atr-text-muted)", lineHeight: 1.5, flex: 1 },
  cardMin: { fontSize: 11, color: "var(--atr-text-muted)", display: "inline-flex", alignItems: "center", gap: 5 },

  codeRow: {
    display: "flex", alignItems: "center", gap: 8, marginTop: 2,
    border: "1.5px dashed var(--atr-purple-light)", background: "var(--atr-purple-50)",
    borderRadius: 10, padding: "8px 8px 8px 12px",
  },
  codeLabel: { fontSize: 10.5, fontWeight: 700, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" },
  codeVal: { fontSize: 13.5, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "0.06em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", flex: 1 },
  codeCopy: {
    background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 8,
    padding: "7px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", gap: 5, flexShrink: 0,
  },
  cardCta: {
    marginTop: 4, background: "#fff", color: "var(--atr-purple)", border: "1.5px solid var(--atr-purple)",
    borderRadius: 10, padding: "10px 16px", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
    fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    width: "100%", transition: "background .12s, color .12s",
  },

  /* ===== MODAL ===== */
  scrim: {
    position: "fixed", inset: 0, zIndex: 1000,
    background: "rgba(31,27,51,0.5)", backdropFilter: "blur(3px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  },
  modal: {
    background: "#fff", borderRadius: 22, width: "min(560px, 100%)",
    maxHeight: "calc(100vh - 40px)", overflow: "hidden",
    display: "flex", flexDirection: "column", boxShadow: "0 30px 70px rgba(31,27,51,0.4)",
  },
  modalHero: { position: "relative", height: 188, background: "var(--atr-bg-cool)", flexShrink: 0 },
  modalHeroImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  modalHeroScrim: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,27,51,0.1) 0%, rgba(31,27,51,0.62) 100%)" },
  modalBadge: {
    position: "absolute", top: 16, left: 16, color: "#fff",
    fontSize: 12.5, fontWeight: 800, padding: "6px 14px", borderRadius: 999,
    boxShadow: "0 4px 10px rgba(31,27,51,0.3)",
  },
  modalClose: {
    position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: 999,
    background: "rgba(255,255,255,0.92)", border: "none", color: "var(--atr-text)",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(31,27,51,0.2)",
  },
  modalHeroText: { position: "absolute", left: 20, right: 20, bottom: 14, color: "#fff" },
  modalCat: { fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.9, display: "inline-flex", alignItems: "center", gap: 6 },
  modalTitle: { fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1.15, textShadow: "0 1px 8px rgba(0,0,0,0.25)" },

  modalBody: { padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 },
  modalDesc: { fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.55 },

  detailBox: { background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 14, padding: 18 },
  detailHead: { fontSize: 11.5, fontWeight: 800, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" },
  detailCell: { display: "flex", flexDirection: "column", gap: 4 },
  detailLabel: { fontSize: 12.5, color: "var(--atr-text-muted)", display: "inline-flex", alignItems: "center", gap: 6 },
  detailVal: { fontSize: 14.5, fontWeight: 700, color: "var(--atr-text)" },
  detailValGreen: { color: "#2F8A3B" },

  termsList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 },
  termItem: { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--atr-text)", lineHeight: 1.5 },
  termDot: { color: "var(--atr-purple)", flexShrink: 0, marginTop: 2 },
  termsHead: { fontSize: 13.5, fontWeight: 700, color: "var(--atr-text)", marginBottom: 10 },

  modalCodeLabel: { fontSize: 12.5, color: "var(--atr-text-muted)", textAlign: "center", fontWeight: 600 },
  modalCodeRow: {
    display: "flex", alignItems: "center", gap: 10, marginTop: 8,
    border: "1.5px dashed var(--atr-purple-light)", background: "var(--atr-purple-50)",
    borderRadius: 12, padding: "12px 12px 12px 18px",
  },
  modalCodeVal: { fontSize: 19, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "0.1em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", flex: 1 },
  modalCodeCopy: {
    background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 10,
    padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", gap: 7, flexShrink: 0,
  },
  modalFoot: { padding: "16px 24px 24px", borderTop: "1px solid var(--atr-outline)", flexShrink: 0 },
  modalUseBtn: {
    width: "100%", background: "var(--atr-purple)", color: "#fff", border: "none",
    borderRadius: 12, padding: "14px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer",
    fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "0 6px 16px rgba(112,104,213,0.34)",
  },
};
