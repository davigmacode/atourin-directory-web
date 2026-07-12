export const NOTIF_CAT = {
  pesanan:   { bg: "rgba(112,104,213,0.12)", fg: "#5B53C0", label: "Pesanan" },
  pengingat: { bg: "rgba(255,196,66,0.18)",  fg: "#9A6A00", label: "Pengingat" },
  promosi:   { bg: "rgba(81,176,84,0.15)",   fg: "#2F8A3B", label: "Promosi" },
  arti:      { bg: "rgba(81,176,84,0.16)",   fg: "#2A8A3B", label: "ARTI" },
  info:      { bg: "rgba(47,128,181,0.13)",  fg: "#2F6FA5", label: "Info" },
};

export const no = {
  page: { background: "var(--atr-bg-soft)", minHeight: "100vh", fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)" },
  wrap: { maxWidth: 820, margin: "0 auto", padding: "28px 20px 64px" },

  /* header */
  head: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20, flexWrap: "wrap" },
  title: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--atr-text)" },
  sub: { fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 4 },
  markAll: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 999,
    padding: "9px 16px", fontSize: 13, fontWeight: 700, color: "var(--atr-purple)",
    cursor: "pointer", fontFamily: "var(--atr-font-sans)", transition: "background .12s",
  },
  markAllDisabled: { color: "var(--atr-text-muted)", cursor: "default", opacity: 0.6 },

  /* tabs */
  tabsCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, boxShadow: "var(--atr-shadow-2)", overflow: "hidden" },
  tabsRow: { display: "flex", gap: 4, padding: "6px 8px", borderBottom: "1px solid var(--atr-outline)", overflowX: "auto" },
  tab: {
    display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
    padding: "9px 14px", borderRadius: 10, border: "none", background: "transparent",
    fontSize: 13.5, fontWeight: 600, color: "var(--atr-text-muted)", cursor: "pointer",
    fontFamily: "var(--atr-font-sans)", transition: "background .12s, color .12s",
  },
  tabActive: { background: "var(--atr-purple-50)", color: "var(--atr-purple)" },
  tabCount: {
    minWidth: 20, height: 18, padding: "0 6px", borderRadius: 999,
    background: "var(--atr-bg-soft)", color: "var(--atr-text-muted)",
    fontSize: 11, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center",
  },
  tabCountActive: { background: "var(--atr-purple)", color: "#fff" },

  /* group label */
  groupLabel: { fontSize: 11.5, fontWeight: 800, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", padding: "16px 20px 6px" },

  /* notif row */
  row: {
    display: "flex", gap: 14, alignItems: "flex-start",
    padding: "16px 20px", borderTop: "1px solid var(--atr-outline)",
    cursor: "pointer", textDecoration: "none", color: "inherit",
    transition: "background .12s", position: "relative",
  },
  rowUnread: { background: "rgba(112,104,213,0.045)" },
  rowIcon: {
    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
  },
  rowBody: { flex: 1, minWidth: 0 },
  rowMeta: { display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" },
  catChip: { fontSize: 10.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", padding: "2px 8px", borderRadius: 999 },
  importantChip: {
    fontSize: 10.5, fontWeight: 800, color: "var(--atr-red)", background: "rgba(244,98,99,0.12)",
    padding: "2px 8px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4,
  },
  rowTime: { fontSize: 11.5, color: "var(--atr-text-muted)", marginLeft: "auto", fontWeight: 600, whiteSpace: "nowrap" },
  rowTitle: { fontSize: 14.5, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.35 },
  rowText: { fontSize: 13, color: "var(--atr-text-muted)", lineHeight: 1.5, marginTop: 3 },
  rowCta: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700, color: "var(--atr-purple)", marginTop: 9 },
  unreadDot: { width: 9, height: 9, borderRadius: 999, background: "var(--atr-purple)", flexShrink: 0, marginTop: 6 },
  unreadSpacer: { width: 9, flexShrink: 0 },

  /* empty state */
  empty: { padding: "56px 20px", textAlign: "center" },
  emptyIcon: { width: 64, height: 64, borderRadius: 999, background: "var(--atr-bg-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  emptyTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)" },
  emptySub: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 5 },

  /* footer / pagination */
  pageFoot: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderTop: "1px solid var(--atr-outline)", flexWrap: "wrap", gap: 12 },
  pageInfo: { fontSize: 12.5, color: "var(--atr-text-muted)" },
  pager: { display: "inline-flex", gap: 6 },
  pageBtn: {
    minWidth: 34, height: 34, borderRadius: 9, border: "1px solid var(--atr-outline)", background: "#fff",
    fontSize: 13, fontWeight: 700, color: "var(--atr-text)", cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 8px",
  },
  pageBtnActive: { background: "var(--atr-purple)", color: "#fff", border: "1px solid var(--atr-purple)" },
  pageBtnGhost: { color: "var(--atr-text-muted)" },

  /* ===== DETAIL MODAL ===== */
  scrim: {
    position: "fixed", inset: 0, zIndex: 1000,
    background: "rgba(31,27,51,0.5)", backdropFilter: "blur(3px)",
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
  },
  modal: {
    background: "#fff", borderRadius: 20, width: "min(520px, 100%)",
    maxHeight: "calc(100vh - 40px)", overflow: "hidden",
    display: "flex", flexDirection: "column", boxShadow: "0 30px 70px rgba(31,27,51,0.4)",
  },
  modalTop: { padding: "22px 24px 18px", display: "flex", gap: 14, alignItems: "flex-start", position: "relative" },
  modalIcon: { width: 48, height: 48, borderRadius: 14, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" },
  modalClose: {
    position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 999,
    background: "var(--atr-bg-soft)", border: "none", color: "var(--atr-text-muted)",
    cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
  },
  modalMeta: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 },
  modalTitle: { fontSize: 18, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em", lineHeight: 1.25, paddingRight: 28 },
  modalTime: { fontSize: 12, color: "var(--atr-text-muted)", fontWeight: 600, marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6 },

  modalBody: { padding: "0 24px 22px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 },
  modalDivider: { borderTop: "1px solid var(--atr-outline)", margin: "0 24px" },
  modalMsg: { fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.6, paddingTop: 18 },

  metaCard: { background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "6px 16px" },
  metaRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--atr-outline)" },
  metaRowLast: { borderBottom: "none" },
  metaLabel: { fontSize: 12.5, color: "var(--atr-text-muted)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7 },
  metaVal: { fontSize: 13.5, fontWeight: 700, color: "var(--atr-text)", textAlign: "right" },
  metaValGreen: { color: "#2F8A3B" },

  modalFoot: { padding: "16px 24px", borderTop: "1px solid var(--atr-outline)", display: "flex", gap: 10, flexShrink: 0 },
  footPrimary: {
    flex: 1, background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 12,
    padding: "13px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "0 6px 16px rgba(112,104,213,0.3)", textDecoration: "none",
  },
  footGhost: {
    background: "#fff", color: "var(--atr-text)", border: "1px solid var(--atr-outline)", borderRadius: 12,
    padding: "13px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
};
