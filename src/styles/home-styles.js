export const hm = {
  page: { background: "#fff", fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)" },
  section: { maxWidth: 1376, margin: "0 auto", padding: "0 32px" },
  sectionPad: { paddingTop: 56, paddingBottom: 56 },

  /* section heading */
  secHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 24, flexWrap: "wrap" },
  secKicker: { fontSize: 12.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--atr-purple)", marginBottom: 8 },
  secTitle: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--atr-text)", lineHeight: 1.15, textWrap: "balance" },
  secSub: { fontSize: 15, color: "var(--atr-text-muted)", marginTop: 8, maxWidth: 560, lineHeight: 1.5 },
  secLink: { fontSize: 14, fontWeight: 700, color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", cursor: "pointer" },

  /* ---------- HERO ---------- */
  hero: { position: "relative", background: "#1F1B33" },
  heroImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, borderRadius: 0 },
  heroScrim: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,27,51,0.55) 0%, rgba(31,27,51,0.35) 40%, rgba(31,27,51,0.75) 100%)" },
  heroInner: { position: "relative", maxWidth: 1376, margin: "0 auto", padding: "72px 32px 88px", color: "#fff" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 600, marginBottom: 20, whiteSpace: "nowrap" },
  heroTitle: { fontSize: 52, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 760, textWrap: "balance" },
  heroSub: { fontSize: 18, opacity: 0.92, marginTop: 18, maxWidth: 560, lineHeight: 1.5 },

  searchCard: { position: "relative", zIndex: 20, background: "#fff", borderRadius: 18, boxShadow: "0 24px 60px rgba(0,0,0,0.28)", padding: 10, marginTop: 30, maxWidth: 720 },
  searchTabs: { display: "flex", gap: 4, padding: "0 6px 8px", flexWrap: "wrap" },
  searchTab: { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10, border: "none", background: "transparent", fontSize: 13.5, fontWeight: 700, color: "var(--atr-text-muted)", cursor: "pointer", fontFamily: "var(--atr-font-sans)" },
  searchTabOn: { background: "var(--atr-purple-50)", color: "var(--atr-purple)" },
  searchRow: { display: "flex", gap: 10, alignItems: "center", background: "var(--atr-bg-soft)", borderRadius: 12, padding: "6px 6px 6px 16px" },
  searchInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 15, color: "var(--atr-text)", fontFamily: "var(--atr-font-sans)", padding: "12px 0" },
  searchBtn: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 10, padding: "0 26px", height: 48, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 },
  heroChips: { display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", alignItems: "center" },
  heroChipLabel: { fontSize: 13, opacity: 0.85 },
  heroChip: { fontSize: 13, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 999, padding: "5px 14px", cursor: "pointer", fontFamily: "var(--atr-font-sans)" },

  /* stats strip */
  statsBar: { position: "relative", zIndex: 2, maxWidth: 1376, margin: "32px auto 0", padding: "0 32px" },
  statsCard: { background: "#fff", borderRadius: 18, boxShadow: "var(--atr-shadow-2)", border: "1px solid var(--atr-outline)", display: "grid", gridTemplateColumns: "repeat(4,1fr)", overflow: "hidden" },
  statCell: { padding: "22px 20px", textAlign: "center", borderLeft: "1px solid var(--atr-outline)" },
  statVal: { fontSize: 26, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "-0.01em" },
  statLabel: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 4, fontWeight: 600 },

  /* ---------- CATEGORY TILES ---------- */
  /* ---------- DIRECTORY LAUNCHER (floating) ---------- */
  launcherWrap: { position: "relative", zIndex: 3, maxWidth: 1376, margin: "-56px auto 0", padding: "0 32px" },
  launcherCard: { background: "#fff", borderRadius: 22, boxShadow: "0 24px 60px rgba(31,27,51,0.16)", border: "1px solid var(--atr-outline)", padding: "22px 24px 24px" },
  launcherHead: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" },
  launcherTitle: { fontSize: 18, fontWeight: 800, color: "var(--atr-text)", letterSpacing: "-0.01em" },
  launcherSub: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 3 },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(10,1fr)", gap: 10 },
  catTile: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "14px 8px", borderRadius: 16, border: "1px solid transparent", background: "transparent", cursor: "pointer", textDecoration: "none", transition: "transform .15s, box-shadow .15s, border-color .15s, background .15s" },
  catIcon: { width: 50, height: 50, borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" },
  catLabel: { fontSize: 12.5, fontWeight: 700, color: "var(--atr-text)", textAlign: "center", lineHeight: 1.2 },

  /* ---------- filter chips ---------- */
  chipRow: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 },
  chip: { padding: "9px 18px", borderRadius: 999, fontSize: 13.5, fontWeight: 600, cursor: "pointer", border: "1.5px solid var(--atr-outline)", background: "#fff", color: "var(--atr-text)", fontFamily: "var(--atr-font-sans)", transition: "all .12s" },
  chipOn: { border: "1.5px solid var(--atr-purple)", background: "var(--atr-purple-50)", color: "var(--atr-purple)" },

  /* ---------- voucher coupon card ---------- */
  voucherCard: { flex: "0 0 320px", scrollSnapAlign: "start", position: "relative", background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, boxShadow: "var(--atr-shadow-1)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 },
  voucherTop: { display: "flex", alignItems: "center", gap: 14 },
  voucherTicket: { width: 52, height: 52, borderRadius: 14, background: "var(--atr-purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  voucherVal: { fontSize: 26, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "-0.02em", lineHeight: 1 },
  voucherKind: { fontSize: 11, fontWeight: 800, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 },
  voucherTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em" },
  voucherPartner: { fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 2, display: "inline-flex", alignItems: "center", gap: 6 },
  voucherDash: { borderTop: "1.5px dashed var(--atr-outline)", margin: "2px 0", position: "relative" },
  voucherNotchL: { position: "absolute", left: -33, top: -11, width: 22, height: 22, borderRadius: 999, background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)" },
  voucherNotchR: { position: "absolute", right: -33, top: -11, width: 22, height: 22, borderRadius: 999, background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)" },
  voucherCodeRow: { display: "flex", alignItems: "center", gap: 8, border: "1.5px dashed var(--atr-purple-light)", background: "var(--atr-purple-50)", borderRadius: 10, padding: "11px 8px 11px 14px" },
  voucherCode: { flex: 1, fontSize: 14.5, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "0.06em", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  voucherCopy: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 },
  voucherFoot: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  voucherMin: { fontSize: 11.5, color: "var(--atr-text-muted)" },
  voucherTnc: { fontSize: 12.5, fontWeight: 700, color: "var(--atr-purple)", cursor: "pointer" },

  /* ---------- carousel ---------- */
  carouselWrap: { position: "relative" },
  carousel: { display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingBottom: 4 },
  arrowBtn: { position: "absolute", top: 64, width: 40, height: 40, borderRadius: 999, background: "#fff", border: "1px solid var(--atr-outline)", boxShadow: "var(--atr-shadow-2)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--atr-text)", zIndex: 5 },

  /* product card */
  prodCard: { flex: "0 0 274px", scrollSnapAlign: "start", background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--atr-shadow-1)", display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform .15s, box-shadow .15s" },
  prodMedia: { position: "relative", height: 168 },
  prodImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  prodCatTag: { position: "absolute", top: 12, left: 12, background: "rgba(255,255,255,0.94)", color: "var(--atr-text)", fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.04em" },
  prodHeart: { position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 999, background: "rgba(255,255,255,0.92)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--atr-text)" },
  prodBody: { padding: 16, display: "flex", flexDirection: "column", gap: 7, flex: 1 },
  prodCity: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--atr-text-muted)", fontWeight: 600 },
  prodTitle: { fontSize: 15.5, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3, letterSpacing: "-0.01em" },
  prodDiscTag: { position: "absolute", top: 44, left: 12, background: "var(--atr-red)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 9px", borderRadius: 8, boxShadow: "0 4px 12px rgba(244,98,99,0.4)" },
  prodRateChip: { position: "absolute", left: 12, bottom: 12, background: "rgba(255,255,255,0.96)", color: "var(--atr-text)", fontSize: 12.5, fontWeight: 800, padding: "5px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5, boxShadow: "0 3px 10px rgba(0,0,0,0.15)" },
  prodRateRev: { fontWeight: 500, color: "var(--atr-text-muted)", fontSize: 11.5 },
  prodPriceBlock: { display: "flex", flexDirection: "column", gap: 2, marginTop: 2 },
  prodPriceWasRow: { display: "flex", alignItems: "center", gap: 8 },
  prodPriceWas: { fontSize: 12.5, color: "var(--atr-text-muted)", textDecoration: "line-through" },
  prodOffBadge: { background: "#FDECEC", color: "var(--atr-red)", fontSize: 11, fontWeight: 800, padding: "2px 7px", borderRadius: 6 },
  prodPriceNowRow: { display: "flex", alignItems: "baseline", gap: 6 },
  prodPrice: { fontSize: 18, fontWeight: 800, color: "var(--atr-red)", letterSpacing: "-0.01em" },
  prodPer: { fontSize: 11, color: "var(--atr-text-muted)", fontWeight: 500 },
  prodDivider: { height: 1, background: "var(--atr-outline)", marginTop: "auto" },
  prodOp: { fontSize: 12, color: "var(--atr-text-muted)", display: "flex", alignItems: "center", gap: 8, minWidth: 0, paddingTop: 10 },
  prodOpDot: { width: 22, height: 22, borderRadius: 999, background: "var(--atr-bg-cool)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 },

  /* ---------- promo strip ---------- */
  promoGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 },
  promoCard: { position: "relative", borderRadius: 18, overflow: "hidden", height: 180, cursor: "pointer", boxShadow: "var(--atr-shadow-1)" },
  promoImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  promoScrim: { position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(31,27,51,0.78) 0%, rgba(31,27,51,0.35) 70%)" },
  promoContent: { position: "relative", zIndex: 1, padding: 20, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" },
  promoBadge: { alignSelf: "flex-start", fontSize: 12, fontWeight: 800, padding: "5px 12px", borderRadius: 999, color: "#fff" },
  promoTitle: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.2, maxWidth: 220 },
  promoMeta: { fontSize: 12.5, opacity: 0.9, marginTop: 6 },
  promoCode: { display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12.5, fontWeight: 700, background: "rgba(255,255,255,0.18)", border: "1px dashed rgba(255,255,255,0.5)", borderRadius: 8, padding: "5px 12px", alignSelf: "flex-start" },

  /* ---------- jelajahi tabs ---------- */
  jelTabs: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },

  /* ---------- village card ---------- */
  villageGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  villageCard: { position: "relative", borderRadius: 18, overflow: "hidden", height: 280, cursor: "pointer", boxShadow: "var(--atr-shadow-1)" },
  villageImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" },
  villageScrim: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%)" },
  villageBody: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, color: "#fff", zIndex: 1 },
  villageBadge: { position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.92)", color: "var(--atr-purple)", fontSize: 11.5, fontWeight: 800, padding: "5px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5 },
  villageName: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" },
  villageRegion: { fontSize: 12.5, opacity: 0.9, marginTop: 3, display: "inline-flex", alignItems: "center", gap: 5 },
  villageCount: { fontSize: 12, opacity: 0.85, marginTop: 8 },

  /* ---------- why band ---------- */
  whyBand: { background: "linear-gradient(135deg, #F6F4FF 0%, #FBFAFF 100%)" },
  whyGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 },
  whyCard: { background: "#fff", borderRadius: 16, border: "1px solid var(--atr-outline)", padding: 24, boxShadow: "var(--atr-shadow-1)" },
  whyIcon: { width: 50, height: 50, borderRadius: 14, background: "var(--atr-purple-50)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  whyTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3 },
  whyText: { fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 8, lineHeight: 1.55 },

  /* ---------- article card ---------- */
  articleGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  artCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--atr-shadow-1)", cursor: "pointer", display: "flex", flexDirection: "column", transition: "transform .15s, box-shadow .15s" },
  artImg: { width: "100%", height: 150, objectFit: "cover", display: "block" },
  artBody: { padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 },
  artMeta: { display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, fontWeight: 600 },
  artCat: { color: "var(--atr-purple)", background: "var(--atr-purple-50)", padding: "3px 10px", borderRadius: 999, fontWeight: 700 },
  artDate: { color: "var(--atr-text-muted)" },
  artTitle: { fontSize: 15.5, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3, letterSpacing: "-0.01em" },
  artExcerpt: { fontSize: 13, color: "var(--atr-text-muted)", lineHeight: 1.5, flex: 1 },

  /* ---------- testimonials ---------- */
  testiGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 },
  testiCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, padding: 24, boxShadow: "var(--atr-shadow-1)" },
  testiStars: { display: "flex", gap: 2, marginBottom: 12 },
  testiText: { fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.6 },
  testiUser: { display: "flex", alignItems: "center", gap: 12, marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--atr-outline)" },
  testiAvatar: { width: 42, height: 42, borderRadius: 999, objectFit: "cover" },
  testiName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  testiTrip: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 1 },

  /* ---------- app band ---------- */
  appBand: { background: "linear-gradient(135deg, #6E62D8 0%, #8B6FD0 50%, #9B6AAB 100%)", borderRadius: 28, overflow: "hidden", position: "relative", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", alignItems: "center", color: "#fff" },
  appLeft: { padding: "48px 48px 48px 52px" },
  appTitle: { fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 },
  appText: { fontSize: 15.5, opacity: 0.92, marginTop: 14, lineHeight: 1.5, maxWidth: 400 },
  appBtns: { display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" },
  storeBtn: { display: "inline-flex", alignItems: "center", gap: 10, background: "#1F1B33", color: "#fff", borderRadius: 12, padding: "10px 18px", textDecoration: "none", cursor: "pointer" },
  storeSm: { fontSize: 10, fontWeight: 400, opacity: 0.85, lineHeight: 1.2 },
  storeLg: { fontSize: 15, fontWeight: 700, lineHeight: 1.2 },
  appRight: { position: "relative", height: "100%", minHeight: 280 },
  appPhone: { position: "absolute", right: 36, bottom: -10, width: 230, borderRadius: 28, boxShadow: "0 30px 60px rgba(0,0,0,0.3)", border: "6px solid rgba(255,255,255,0.9)" },
  appBlob: { position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.12)" },

  /* ---------- SEO links ---------- */
  seoBand: { background: "var(--atr-bg-soft)" },
  seoTabs: { display: "flex", gap: 4, borderBottom: "1px solid var(--atr-outline)", marginBottom: 20, flexWrap: "wrap" },
  seoTab: { padding: "10px 16px", border: "none", background: "transparent", fontSize: 14, fontWeight: 700, color: "var(--atr-text-muted)", cursor: "pointer", fontFamily: "var(--atr-font-sans)", borderBottom: "2px solid transparent" },
  seoTabOn: { color: "var(--atr-purple)", borderBottom: "2px solid var(--atr-purple)" },
  seoGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px 32px" },
  seoLink: { fontSize: 13.5, color: "var(--atr-text)", textDecoration: "none", padding: "5px 0", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" },

  /* ---------- newsletter ---------- */
  news: { background: "linear-gradient(135deg, #2A2640 0%, #3C3760 100%)", borderRadius: 24, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", color: "#fff" },
  newsTitle: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" },
  newsSub: { fontSize: 14.5, opacity: 0.85, marginTop: 6 },
  newsForm: { display: "flex", gap: 10, background: "#fff", borderRadius: 12, padding: 6, minWidth: 360, flex: "0 1 420px" },
  newsInput: { flex: 1, border: "none", outline: "none", background: "transparent", padding: "10px 14px", fontSize: 14, color: "var(--atr-text)", fontFamily: "var(--atr-font-sans)" },
  newsBtn: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 9, padding: "0 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" },
};
