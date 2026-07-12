export const hp = {
  page: { background: "var(--atr-bg-soft)" },
  containerWide: { maxWidth: 1376, margin: "0 auto", padding: "0 32px" },
  crumbBar: { maxWidth: 1376, margin: "0 auto", padding: "16px 32px 12px" },

  /* ----- Gallery 1+4 ----- */
  gallery: { maxWidth: 1376, margin: "0 auto", padding: "0 32px" },
  galleryRow: { display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 8, height: 460, borderRadius: 16, overflow: "hidden", position: "relative" },
  galleryMain: { position: "relative", overflow: "hidden", cursor: "zoom-in" },
  galleryMainImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  galleryThumbCol: { display: "grid", gridTemplateRows: "1fr 1fr", gap: 8 },
  galleryThumbRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  galleryThumb: { position: "relative", overflow: "hidden", cursor: "zoom-in" },
  galleryThumbImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  galleryMoreOverlay: { position: "absolute", inset: 0, background: "rgba(31,27,51,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", cursor: "pointer", fontFamily: "var(--atr-font-sans)" },
  galleryMoreNum: { fontSize: 28, fontWeight: 700 },
  galleryMoreLabel: { fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 },
  galleryFloatBtn: { position: "absolute", bottom: 16, right: 16, background: "#fff", color: "var(--atr-text)", border: "none", borderRadius: 999, padding: "9px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.18)", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 6, zIndex: 10 },

  /* ----- Header card ----- */
  headerCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "24px 28px", marginTop: 18, display: "flex", flexDirection: "column", gap: 16 },
  badgeRow: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  badge: { fontSize: 11, fontWeight: 700, padding: "5px 11px", borderRadius: 999, letterSpacing: "0.04em", display: "inline-flex", alignItems: "center", gap: 5 },
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" },
  titleCol: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0, flex: 1 },
  title: { fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--atr-text)", lineHeight: 1.1, margin: 0 },
  titleAction: { display: "flex", gap: 8 },
  actionBtn: { background: "#fff", color: "var(--atr-text)", border: "1px solid var(--atr-outline)", borderRadius: 10, padding: "9px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 6 },
  actionBtnOn: { background: "var(--atr-purple)", color: "#fff", border: "1px solid var(--atr-purple)" },

  metaRow: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", fontSize: 13.5, color: "var(--atr-text)" },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  metaDot: { color: "var(--atr-outline)" },
  metaLink: { color: "var(--atr-purple)", textDecoration: "none", fontWeight: 600 },
  metaStar: { color: "var(--atr-yellow)", fontWeight: 700 },

  hostPreview: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px",
    background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 999,
    cursor: "pointer", textDecoration: "none", color: "inherit",
  },
  hostPreviewAv: { width: 32, height: 32, borderRadius: 999, objectFit: "cover" },
  hostPreviewText: { display: "flex", flexDirection: "column", gap: 0 },
  hostPreviewLabel: { fontSize: 10, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 },
  hostPreviewName: { fontSize: 12.5, fontWeight: 700, color: "var(--atr-text)" },

  /* Quick info chips */
  quickRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 },
  quickCell: { background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 12, padding: "12px 14px", display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center" },
  quickIcon: { width: 32, height: 32, borderRadius: 8, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  quickLabel: { fontSize: 10.5, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 },
  quickVal: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)", marginTop: 2 },

  tagRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  tag: { fontSize: 11.5, fontWeight: 600, color: "var(--atr-text)", background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", padding: "5px 10px", borderRadius: 999 },
  shortDesc: { fontSize: 15, lineHeight: 1.6, color: "var(--atr-text)", margin: 0, maxWidth: 760 },

  /* ----- Subnav ----- */
  subnavWrap: { position: "sticky", top: 76, zIndex: 30, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid var(--atr-outline)", borderBottom: "1px solid var(--atr-outline)", marginTop: 18 },
  subnavInner: { maxWidth: 1376, margin: "0 auto", padding: "10px 32px", display: "flex", gap: 4, alignItems: "center", overflowX: "auto" },
  subnavLink: { fontSize: 13, fontWeight: 600, color: "var(--atr-text-muted)", textDecoration: "none", padding: "8px 14px", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer", border: "none", fontFamily: "var(--atr-font-sans)", background: "transparent", outline: "none", WebkitTapHighlightColor: "transparent" },
  subnavLinkActive: { background: "var(--atr-purple)", color: "#fff" },

  /* ----- Two-column ----- */
  mainGrid: { maxWidth: 1376, margin: "0 auto", padding: "24px 32px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 380px", gap: 24, alignItems: "flex-start" },
  mainCol: { display: "flex", flexDirection: "column", gap: 18, minWidth: 0 },
  sideCol: { display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 130 },

  /* ----- Cinematic hero ----- */
  cineWrap: { maxWidth: 1376, margin: "0 auto", padding: "0 32px" },
  cineHero: { position: "relative", height: 540, borderRadius: 18, overflow: "hidden" },
  cineImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cineGrad: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)" },
  cineContent: { position: "absolute", left: 32, bottom: 32, right: 32, color: "#fff", display: "flex", flexDirection: "column", gap: 12 },
  cineTitle: { fontSize: 52, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0, textShadow: "0 2px 16px rgba(0,0,0,0.4)" },
  cineMeta: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", fontSize: 14, color: "rgba(255,255,255,0.95)" },
  cineActions: { position: "absolute", top: 20, right: 20, display: "flex", gap: 8 },
  cineActionBtn: { width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.95)", border: "none", color: "var(--atr-text)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },
  cineThumbRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 10 },
  cineThumb: { aspectRatio: "4 / 3", borderRadius: 12, overflow: "hidden", cursor: "zoom-in" },
  cineThumbImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  /* ----- Bottom dock ----- */
  dock: { position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px solid var(--atr-outline)", boxShadow: "0 -8px 28px rgba(31,27,51,0.08)" },
  dockInner: { maxWidth: 1376, margin: "0 auto", padding: "14px 32px", display: "grid", gridTemplateColumns: "60px 1fr auto auto", gap: 18, alignItems: "center" },
  dockImg: { width: 60, height: 60, borderRadius: 10, objectFit: "cover" },
  dockName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  dockMeta: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 4 },
  dockTotal: { textAlign: "right" },
  dockTotalLabel: { fontSize: 11, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 },
  dockTotalVal: { fontSize: 22, fontWeight: 700, color: "var(--atr-purple)", letterSpacing: "-0.01em" },
  dockCta: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 18px rgba(112,104,213,0.4)", fontFamily: "var(--atr-font-sans)" },
};

export const hb = {
  /* ===== Top booking shell ===== */
  bookSection: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  bookHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" },
  bookEyebrow: { fontSize: 11, fontWeight: 700, color: "var(--atr-purple)", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 6 },
  bookTitle: { fontSize: 22, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em", margin: "4px 0 0" },
  bookSub: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 4 },
  bookKicker: { fontSize: 13, color: "var(--atr-text-muted)", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 11 },

  /* ===== Date range chip ===== */
  rangeChip: {
    border: "1.5px solid var(--atr-purple)",
    background: "linear-gradient(180deg, #F6F4FF 0%, #fff 100%)",
    borderRadius: 12,
    padding: "14px 18px",
    display: "grid",
    gridTemplateColumns: "32px 1fr 1fr auto auto",
    gap: 14,
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    fontFamily: "var(--atr-font-sans)",
  },
  rangeIcon: { width: 32, height: 32, borderRadius: 8, background: "rgba(112,104,213,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" },
  rangeLabel: { fontSize: 10, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 },
  rangeVal: { fontSize: 14, color: "var(--atr-text)", fontWeight: 700, marginTop: 2 },
  rangeNightsBadge: { background: "var(--atr-purple)", color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: "0.02em" },
  rangeArrow: { color: "var(--atr-text-muted)", fontSize: 18 },

  /* ===== Room cards ===== */
  roomList: { display: "flex", flexDirection: "column", gap: 12 },
  roomCard: {
    border: "1.5px solid var(--atr-outline)",
    borderRadius: 14,
    background: "#fff",
    display: "grid",
    gridTemplateColumns: "200px 1fr auto",
    gap: 0,
    overflow: "hidden",
    transition: "all 0.18s",
  },
  roomCardActive: {
    border: "1.5px solid var(--atr-purple)",
    background: "linear-gradient(180deg, #F6F4FF 0%, #fff 100%)",
    boxShadow: "0 6px 18px rgba(112,104,213,0.14)",
  },
  roomImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  roomBody: { padding: 18, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 },
  roomTopRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  roomName: { fontSize: 17, fontWeight: 700, color: "var(--atr-text)" },
  roomStockBadge: {
    fontSize: 10, fontWeight: 700, color: "#8C2A2B",
    background: "rgba(244,98,99,0.12)", border: "1px solid rgba(244,98,99,0.3)",
    padding: "3px 9px", borderRadius: 6, letterSpacing: "0.04em",
    display: "inline-flex", alignItems: "center", gap: 4,
  },
  roomSpecs: { display: "flex", gap: 14, fontSize: 12.5, color: "var(--atr-text-muted)", flexWrap: "wrap" },
  roomSpec: { display: "inline-flex", alignItems: "center", gap: 4 },
  roomAmen: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 },
  roomAmenChip: {
    fontSize: 11, fontWeight: 600, color: "var(--atr-text)",
    background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)",
    padding: "4px 9px", borderRadius: 999,
  },
  roomRight: {
    padding: "18px 20px",
    borderLeft: "1px dashed var(--atr-outline)",
    background: "var(--atr-bg-soft)",
    display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end",
    gap: 16, minWidth: 200,
  },
  roomPriceRow: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  roomPrice: { fontSize: 20, fontWeight: 700, color: "var(--atr-purple)", letterSpacing: "-0.01em" },
  roomPriceUnit: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 },

  /* ===== Stepper ===== */
  stepperWrap: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 999, padding: "5px 7px",
  },
  stepBtn: {
    width: 30, height: 30, borderRadius: 999, border: "1px solid var(--atr-outline)",
    background: "#fff", color: "var(--atr-purple)", fontSize: 18, fontWeight: 700,
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--atr-font-sans)",
  },
  stepBtnDisabled: { color: "var(--atr-outline)", cursor: "not-allowed" },
  stepVal: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)", minWidth: 18, textAlign: "center" },

  /* ===== Booking foot strip ===== */
  bookFootnote: {
    display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
    padding: "12px 14px", background: "var(--atr-bg-soft)", borderRadius: 10,
    fontSize: 12, color: "var(--atr-text-muted)",
  },
  footChip: { display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, color: "var(--atr-text)" },

  /* ===== Summary sidebar ===== */
  sumCard: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 10px 28px rgba(31,27,51,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  sumHead: { display: "flex", alignItems: "center", gap: 10 },
  sumHeadIcon: { width: 32, height: 32, borderRadius: 8, background: "rgba(112,104,213,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" },
  sumTitle: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)" },
  sumSub: { fontSize: 11, color: "var(--atr-text-muted)" },

  sumProd: { display: "grid", gridTemplateColumns: "60px 1fr", gap: 12, padding: "12px 0", borderTop: "1px solid var(--atr-outline)", borderBottom: "1px solid var(--atr-outline)" },
  sumProdImg: { width: 60, height: 60, borderRadius: 8, objectFit: "cover" },
  sumProdName: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3 },
  sumProdMeta: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 4 },

  sumStay: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "var(--atr-bg-soft)", borderRadius: 10, padding: 10 },
  sumStayCell: { display: "flex", flexDirection: "column", gap: 2 },
  sumStayLabel: { fontSize: 10, fontWeight: 700, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" },
  sumStayVal: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },

  sumLine: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 },
  sumLineMuted: { color: "var(--atr-text-muted)" },
  sumLineStrong: { fontWeight: 700, color: "var(--atr-text)" },
  sumDashed: { height: 1, borderTop: "1px dashed var(--atr-outline)", margin: "4px 0" },

  artiRow: {
    background: "linear-gradient(135deg, #DDF3DA 0%, #C6EDB8 100%)",
    border: "1px solid rgba(81,176,84,0.32)",
    borderRadius: 10, padding: "10px 12px",
    display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 10, alignItems: "center",
  },
  artiIcon: { width: 32, height: 32, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  artiTitle: { fontSize: 12, fontWeight: 700, color: "#1F5E2A" },
  artiSub: { fontSize: 10.5, color: "#2F7A2F" },
  artiPill: { fontSize: 10, fontWeight: 700, color: "#1F5E2A", background: "#fff", padding: "3px 8px", borderRadius: 999, letterSpacing: "0.04em" },

  sumTotalRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline" },
  sumTotalLabel: { fontSize: 13, color: "var(--atr-text-muted)", fontWeight: 600 },
  sumTotalVal: { fontSize: 22, fontWeight: 700, color: "var(--atr-purple)", letterSpacing: "-0.01em" },

  sumCta: {
    background: "var(--atr-purple)", color: "#fff", border: "none",
    borderRadius: 10, padding: "14px 18px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", boxShadow: "0 8px 20px rgba(112,104,213,0.35)",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    width: "100%",
  },
  sumCtaDisabled: { background: "#C8C5E8", boxShadow: "none", cursor: "not-allowed" },
  sumHelp: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, color: "var(--atr-text-muted)" },

  /* Help mini-card */
  helpCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 10 },
  helpTitle: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)", display: "flex", alignItems: "center", gap: 6 },
  helpRow: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--atr-text)" },
};

export const hsx = {
  /* ============ ARTI BANNER ============ */
  artiCard: {
    background: "linear-gradient(135deg, #DDF3DA 0%, #C6EDB8 100%)",
    border: "1px solid rgba(81,176,84,0.32)",
    borderRadius: 14,
    padding: 22,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 24,
    alignItems: "center",
  },
  artiLeft: { display: "flex", gap: 18, alignItems: "flex-start" },
  artiIllu: {
    width: 72, height: 72, borderRadius: 16, background: "#fff",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: 36, flexShrink: 0, boxShadow: "0 4px 12px rgba(81,176,84,0.18)",
  },
  artiKicker: { fontSize: 11, fontWeight: 700, color: "#1F5E2A", textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 6 },
  artiHead: { fontSize: 20, fontWeight: 700, color: "#1F5E2A", marginTop: 6, letterSpacing: "-0.01em" },
  artiSubhead: { fontSize: 13, color: "#2F7A2F", marginTop: 8, lineHeight: 1.5, maxWidth: 520 },
  artiPills: { display: "flex", flexDirection: "column", gap: 8, minWidth: 200 },
  artiPill: {
    background: "#fff", borderRadius: 10, padding: "10px 14px",
    border: "1px solid rgba(81,176,84,0.32)",
    display: "grid", gridTemplateColumns: "28px 1fr", gap: 10, alignItems: "center",
  },
  artiPillIcon: { width: 28, height: 28, borderRadius: 999, background: "rgba(81,176,84,0.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 },
  artiPillLabel: { fontSize: 10, fontWeight: 700, color: "#2F7A2F", textTransform: "uppercase", letterSpacing: "0.06em" },
  artiPillVal: { fontSize: 14, fontWeight: 700, color: "#1F5E2A", marginTop: 1 },
  artiCtaRow: { display: "flex", gap: 8, marginTop: 14 },
  artiLearnBtn: {
    background: "transparent", border: "1.5px solid #1F5E2A", color: "#1F5E2A",
    borderRadius: 10, padding: "9px 16px", fontSize: 12.5, fontWeight: 700,
    cursor: "pointer", fontFamily: "var(--atr-font-sans)",
  },
  artiIncludeChip: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "rgba(81,176,84,0.18)", color: "#1F5E2A",
    fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 999,
    letterSpacing: "0.04em",
  },

  /* ============ HOST CARD ============ */
  hostCard: {
    background: "linear-gradient(135deg, #FFFFFF 0%, #F6F4FF 100%)",
    border: "1px solid var(--atr-purple-light)",
    borderRadius: 14,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  hostTopRow: { display: "flex", alignItems: "center", gap: 18 },
  hostAvWrap: { position: "relative", width: 88, height: 88, flexShrink: 0 },
  hostAv: { width: 88, height: 88, borderRadius: 999, objectFit: "cover", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(112,104,213,0.18)" },
  hostVerif: { position: "absolute", right: -2, bottom: 2, background: "var(--atr-purple)", color: "#fff", width: 26, height: 26, borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff" },
  hostKicker: { fontSize: 11, fontWeight: 700, color: "var(--atr-purple)", textTransform: "uppercase", letterSpacing: "0.08em" },
  hostName: { fontSize: 22, fontWeight: 700, color: "var(--atr-text)", marginTop: 4, letterSpacing: "-0.01em" },
  hostRole: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 4 },
  hostBlurb: { fontSize: 14, color: "var(--atr-text)", lineHeight: 1.6, margin: 0, fontStyle: "italic", padding: "14px 16px", background: "#fff", borderRadius: 10, borderLeft: "3px solid var(--atr-purple)" },
  hostStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 },
  hostStat: { display: "grid", gridTemplateColumns: "32px 1fr", gap: 10, alignItems: "center", padding: "12px 14px", background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 10 },
  hostStatIcon: { width: 32, height: 32, borderRadius: 8, background: "var(--atr-bg-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  hostStatVal: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em" },
  hostStatLabel: { fontSize: 10.5, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginTop: 2 },

  /* ============ HOUSE RULES ============ */
  rulesGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  ruleItem: {
    display: "grid", gridTemplateColumns: "40px 1fr", gap: 12,
    background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)",
    borderRadius: 12, padding: 14, alignItems: "center",
  },
  ruleIcon: { width: 40, height: 40, borderRadius: 8, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  ruleTitle: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },
  ruleBody: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2, lineHeight: 1.4 },

  /* ============ LOCATION ============ */
  locWrap: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, alignItems: "stretch" },
  locMap: { position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid var(--atr-outline)", height: 340, background: "var(--atr-bg-soft)" },
  locImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  locPin: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -100%)", fontSize: 38, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" },
  locChip: { position: "absolute", top: 12, left: 12, background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 8, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2, maxWidth: 240 },
  locChipTitle: { fontSize: 12, fontWeight: 700, color: "var(--atr-text)" },
  locChipSub: { fontSize: 10.5, color: "var(--atr-text-muted)", lineHeight: 1.4 },
  locDir: { position: "absolute", bottom: 12, right: 12, background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(112,104,213,0.35)", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--atr-font-sans)" },

  landmarksCol: { display: "flex", flexDirection: "column", gap: 10 },
  landmarkRow: { background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 12, padding: 14, display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, alignItems: "center" },
  landmarkIcon: { width: 36, height: 36, borderRadius: 8, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  landmarkTitle: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },
  landmarkSub: { fontSize: 11.5, color: "var(--atr-text-muted)", marginTop: 2 },
  landmarkDist: { fontSize: 12, fontWeight: 700, color: "var(--atr-purple)", textAlign: "right" },

  /* ============ EMPTY REVIEWS ============ */
  emptyReviews: {
    background: "linear-gradient(180deg, #F6F4FF 0%, #fff 100%)",
    border: "1px dashed var(--atr-purple-light)",
    borderRadius: 14, padding: "40px 24px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
    textAlign: "center",
  },
  emptyIllu: { width: 76, height: 76, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 6px 18px rgba(112,104,213,0.18)" },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: "var(--atr-text)" },
  emptyBody: { fontSize: 13, color: "var(--atr-text-muted)", maxWidth: 360, lineHeight: 1.5 },
  emptyCta: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", boxShadow: "0 6px 16px rgba(112,104,213,0.3)" },

  /* ============ TERMS ============ */
  termsList: { margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10 },
  termItem: { fontSize: 13.5, color: "var(--atr-text)", lineHeight: 1.6 },

  /* ============ MITRA ============ */
  mitraCard: {
    background: "linear-gradient(135deg, #FFFFFF 0%, #F6F4FF 100%)",
    border: "1px solid var(--atr-purple-light)",
    borderRadius: 14,
    padding: 24,
    display: "flex", flexDirection: "column", gap: 14,
  },
  mitraHead: { display: "flex", alignItems: "center", gap: 12 },
  mitraAv: { width: 50, height: 50, borderRadius: 999, border: "2px solid var(--atr-purple)", objectFit: "cover" },
  mitraName: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)" },
  mitraType: { fontSize: 11, fontWeight: 700, color: "var(--atr-purple)", textTransform: "uppercase", letterSpacing: "0.06em" },
  mitraLoc: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 4 },
  mitraStats: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 },
  mitraStat: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2 },
  mitraStatVal: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em" },
  mitraStatLabel: { fontSize: 10.5, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 },
  mitraBlurb: { fontSize: 13, color: "var(--atr-text)", lineHeight: 1.55 },
  mitraCtaRow: { display: "flex", gap: 8 },

  /* ============ RELATED ============ */
  relWrap: { display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(220px, 240px)", gap: 14, overflowX: "auto", paddingBottom: 8 },
  relCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 12, overflow: "hidden", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", cursor: "pointer" },
  relImgWrap: { position: "relative" },
  relImg: { width: "100%", aspectRatio: "5 / 4", objectFit: "cover", display: "block" },
  relTag: { position: "absolute", top: 10, left: 10, background: "var(--atr-yellow)", color: "#5C4200", fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 6, letterSpacing: "0.04em" },
  relBody: { padding: 12, display: "flex", flexDirection: "column", gap: 6 },
  relRegion: { fontSize: 11, color: "var(--atr-text-muted)", display: "inline-flex", alignItems: "center", gap: 4 },
  relName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3, minHeight: 36, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  relPrice: { fontSize: 16, fontWeight: 700, color: "var(--atr-purple)", marginTop: 4 },
  relOp: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--atr-text-muted)", paddingTop: 8, borderTop: "1px solid var(--atr-outline)" },
  relOpAv: { width: 18, height: 18, borderRadius: 999, objectFit: "cover" },
};
