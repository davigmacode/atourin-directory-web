/* Tab Card Styles — destination detail page only.
   These styles are specific to the cards rendered inside
   /explore/destinations/*?tab=* and are intentionally separate
   from the shared card-styles.js (used by /explore/* listings). */

/* ── Shared primitives ── */
const imageBase = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/* ── DESA WISATA CARD ── */
const desaGrid = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 };
const desaCard = {
  background: "#fff",
  border: "1px solid var(--atr-outline)",
  borderRadius: 12,
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "inherit",
};
const desaStatus = {
  position: "absolute",
  top: 12,
  left: 12,
  fontSize: 11,
  fontWeight: 700,
  padding: "5px 10px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};
const desaTagRow = { display: "flex", gap: 5, flexWrap: "wrap" };
const desaTag = {
  fontSize: 10,
  fontWeight: 600,
  color: "var(--atr-text-muted)",
  background: "var(--atr-bg-soft)",
  border: "1px solid var(--atr-outline)",
  padding: "3px 8px",
  borderRadius: 999,
};
const desaHighlight = {
  background: "rgba(81,176,84,0.08)",
  border: "1px solid rgba(81,176,84,0.2)",
  color: "var(--atr-text)",
  fontSize: 12,
  padding: "8px 12px",
  borderRadius: 8,
  marginTop: 4,
};

/* ── ITINERARY CARD ── */
const itinDestGrid = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 };
const itinCard = {
  background: "#fff",
  border: "1px solid var(--atr-outline)",
  borderRadius: 12,
  overflow: "hidden",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
};
const itinDaysBadge = {
  position: "absolute",
  top: 12,
  left: 12,
  background: "#2A9D8F",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  padding: "5px 10px",
  borderRadius: 6,
  letterSpacing: "0.04em",
};
const itinThemeBadge = {
  position: "absolute",
  top: 12,
  right: 12,
  fontSize: 10,
  fontWeight: 700,
  padding: "5px 10px",
  borderRadius: 999,
  letterSpacing: "0.04em",
};
const itinInfoRow = {
  display: "flex",
  gap: 4,
  fontSize: 12,
  color: "var(--atr-text-muted)",
};
const itinDot = { color: "var(--atr-outline)" };
const itinBudget = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "var(--atr-bg-soft)",
  borderRadius: 8,
  padding: "8px 12px",
};
const itinBudgetLabel = { fontSize: 10, color: "var(--atr-text-muted)", fontWeight: 500 };
const itinBudgetVal = { fontSize: 16, fontWeight: 700, color: "var(--atr-purple)" };
const itinBudgetUnit = { fontSize: 10, fontWeight: 500, color: "var(--atr-text-muted)", marginLeft: 2 };
const itinFooter = {
  marginTop: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 10,
  borderTop: "1px dashed var(--atr-outline)",
};
const itinCreator = { display: "flex", alignItems: "center", gap: 8 };
const itinCreatorAv = { width: 28, height: 28, borderRadius: 999 };
const itinCreatorName = { fontSize: 12, fontWeight: 700, color: "var(--atr-text)" };
const itinCreatorRole = { fontSize: 10, color: "var(--atr-text-muted)" };
const itinRatingBlock = { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 };
const itinSaves = { fontSize: 10, color: "var(--atr-text-muted)" };

/* ── GUIDE (PEMANDU) CARD ── */
const guideGrid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 };
const guideCard = {
  background: "#fff",
  border: "1px solid var(--atr-outline)",
  borderRadius: 12,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "inherit",
};
const guideImgWrap = { position: "relative", aspectRatio: "4 / 3" };
const guideVerified = {
  position: "absolute",
  top: 10,
  right: 10,
  background: "var(--atr-purple)",
  color: "#fff",
  fontSize: 10,
  fontWeight: 700,
  padding: "4px 9px",
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  letterSpacing: "0.02em",
};
const guideBody = { padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 };
const guideName = { fontSize: 17, fontWeight: 700, color: "var(--atr-text)" };
const guideSpecRow = { display: "flex", gap: 5, flexWrap: "wrap" };
const guideSpec = {
  fontSize: 10,
  fontWeight: 700,
  color: "var(--atr-purple)",
  background: "#EDE9FF",
  padding: "3px 8px",
  borderRadius: 999,
  letterSpacing: "0.02em",
};
const guideLangRow = { display: "flex", gap: 5 };
const guideMeta = { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--atr-text)" };
const guideBio = {
  fontSize: 12,
  color: "var(--atr-text-muted)",
  fontStyle: "italic",
  lineHeight: 1.5,
  margin: 0,
  padding: "8px 0",
  borderTop: "1px dashed var(--atr-outline)",
  borderBottom: "1px dashed var(--atr-outline)",
};
const guidePriceRow = { display: "flex", justifyContent: "space-between", alignItems: "flex-end" };
const guidePrice = { fontSize: 16, fontWeight: 700, color: "var(--atr-purple)" };
const guideCerts = { display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" };
const guideCert = {
  fontSize: 9,
  fontWeight: 700,
  color: "var(--atr-arti)",
  background: "rgba(81,176,84,0.08)",
  border: "1px solid rgba(81,176,84,0.2)",
  padding: "2px 6px",
  borderRadius: 4,
  letterSpacing: "0.04em",
};
const guideCtas = { marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 8 };
const guideCtaSec = {
  background: "#fff",
  border: "1px solid var(--atr-outline)",
  color: "var(--atr-text)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "var(--atr-font-sans)",
  textAlign: "center",
};
const guideCtaPri = {
  background: "var(--atr-purple)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "var(--atr-font-sans)",
  textAlign: "center",
};

/* ── Image wrap (4:3) shared by desa and itinerary cards ── */
const imgWrap = { position: "relative", aspectRatio: "4 / 3", overflow: "hidden" };

/* ── Common card body primitives ── */
const cardName = { fontSize: 15, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.3 };
const cardDesc = {
  fontSize: 12,
  color: "var(--atr-text-muted)",
  lineHeight: 1.5,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};
const cardLoc = { fontSize: 12, color: "var(--atr-text-muted)" };
const cardBody = { padding: 14, display: "flex", flexDirection: "column", gap: 8, flex: 1 };
const cardFooter = {
  marginTop: "auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 10,
  borderTop: "1px dashed var(--atr-outline)",
};
const cardRating = { fontSize: 12, color: "var(--atr-text)" };
const cardCta = {
  background: "transparent",
  border: "none",
  color: "var(--atr-purple)",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "var(--atr-font-sans)",
};

const tc = {
  imageBase,
  imgWrap,

  /* DESA */
  desaGrid,
  desaCard,
  desaStatus,
  desaTagRow,
  desaTag,
  desaHighlight,

  /* ITINERARY */
  itinDestGrid,
  itinCard,
  itinDaysBadge,
  itinThemeBadge,
  itinInfoRow,
  itinDot,
  itinBudget,
  itinBudgetLabel,
  itinBudgetVal,
  itinBudgetUnit,
  itinFooter,
  itinCreator,
  itinCreatorAv,
  itinCreatorName,
  itinCreatorRole,
  itinRatingBlock,
  itinSaves,

  /* GUIDE */
  guideGrid,
  guideCard,
  guideImgWrap,
  guideVerified,
  guideBody,
  guideName,
  guideSpecRow,
  guideSpec,
  guideLangRow,
  guideMeta,
  guideBio,
  guidePriceRow,
  guidePrice,
  guideCerts,
  guideCert,
  guideCtas,
  guideCtaSec,
  guideCtaPri,

  /* COMMON */
  cardName,
  cardDesc,
  cardLoc,
  cardBody,
  cardFooter,
  cardRating,
  cardCta,
};

export default tc;
