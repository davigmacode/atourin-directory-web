export const ab = {
  page: { background: "#fff", fontFamily: "var(--atr-font-sans)", color: "var(--atr-text)" },
  body: { maxWidth: 1140, margin: "0 auto", padding: "0 24px" },
  kicker: { fontSize: 12.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--atr-purple)", marginBottom: 10 },
  secHead: { textAlign: "center", marginTop: 64, marginBottom: 30 },
  secTitle: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--atr-text)", lineHeight: 1.15, textWrap: "balance" },
  secSub: { fontSize: 15.5, color: "var(--atr-text-muted)", marginTop: 10, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 },
  subhead: { fontSize: 13, fontWeight: 800, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", margin: "0 0 20px" },

  /* hero */
  hero: { position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#15122B 0%,#2A2350 60%,#3A2D5E 100%)", color: "#fff" },
  heroBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 },
  heroBlob: { position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "rgba(112,104,213,0.4)", filter: "blur(50px)", top: -120, right: -60 },
  heroInner: { position: "relative", maxWidth: 900, margin: "0 auto", padding: "72px 24px 64px", textAlign: "center" },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 700, marginBottom: 26, whiteSpace: "nowrap" },
  heroPre: { fontSize: 15, opacity: 0.75, fontWeight: 600, letterSpacing: "0.02em" },
  greet: { fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, margin: "10px 0 6px", minHeight: 68, color: "#EDEAFF", textWrap: "balance" },
  caret: { display: "inline-block", width: 4, height: 50, background: "#C9C3FF", marginLeft: 6, verticalAlign: "-8px", animation: "abBlink 1s step-end infinite" },
  greetFrom: { fontSize: 14.5, opacity: 0.8 },
  greetChips: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 26 },
  gChip: { fontSize: 12.5, fontWeight: 600, padding: "6px 13px", borderRadius: 999, transition: "all .3s", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.18)" },
  gChipOn: { background: "#fff", color: "var(--atr-purple)", border: "1px solid #fff" },
  heroLead: { fontSize: 16.5, opacity: 0.92, marginTop: 30, maxWidth: 620, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 },

  /* story */
  story: { display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 44, alignItems: "center", marginTop: 64 },
  storyArtWrap: { minWidth: 0 },
  storyArt: { borderRadius: 24, overflow: "hidden", background: "var(--atr-bg-cool)", boxShadow: "var(--atr-shadow-2)" },
  storyImg: { width: "100%", display: "block" },
  storyTitle: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.18, marginTop: 4, textWrap: "balance" },
  storyText: { fontSize: 15.5, color: "var(--atr-text)", marginTop: 16, lineHeight: 1.65 },
  storyQuote: { fontSize: 19, fontWeight: 800, color: "var(--atr-purple)", marginTop: 24, paddingLeft: 18, borderLeft: "4px solid var(--atr-purple)", letterSpacing: "-0.01em", lineHeight: 1.4 },

  /* impact */
  impactBand: { background: "linear-gradient(135deg, var(--atr-purple) 0%, #6C559C 55%, #9B6AAB 100%)", color: "#fff", padding: "56px 0", marginTop: 64 },
  impactGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  impactCard: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 18, padding: "24px 20px", textAlign: "center", backdropFilter: "blur(4px)" },
  impactIcon: { width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.16)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  impactV: { fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" },
  impactL: { fontSize: 13.5, opacity: 0.9, marginTop: 6, lineHeight: 1.4 },

  /* values */
  valGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 },
  valCard: { background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 20, padding: 26, boxShadow: "var(--atr-shadow-1)" },
  valTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  valIcon: { width: 52, height: 52, borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center" },
  valNum: { fontSize: 30, fontWeight: 800, color: "var(--atr-outline)", letterSpacing: "-0.02em" },
  valTitle: { fontSize: 19, fontWeight: 800, marginTop: 18 },
  valDesc: { fontSize: 14.5, color: "var(--atr-text-muted)", marginTop: 8, lineHeight: 1.6 },

  /* timeline */
  timeline: { position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 },
  timeLineBar: { position: "absolute", top: 11, left: "10%", right: "10%", height: 2, background: "var(--atr-outline)" },
  timeStep: { position: "relative", textAlign: "center", paddingTop: 38 },
  timeDot: { position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 22, height: 22, borderRadius: 999, background: "var(--atr-purple)", border: "4px solid #fff", boxShadow: "0 0 0 2px var(--atr-purple-light)" },
  timeYear: { fontSize: 22, fontWeight: 800, color: "var(--atr-purple)", letterSpacing: "-0.01em" },
  timeT: { fontSize: 15, fontWeight: 700, marginTop: 6 },
  timeD: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 5, lineHeight: 1.5 },

  /* recognition */
  recBand: { background: "var(--atr-bg-soft)", padding: "56px 0", marginTop: 64 },
  recGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 },
  recCard: { display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "16px 16px" },
  recIcon: { width: 40, height: 40, borderRadius: 11, background: "rgba(255,196,66,0.18)", color: "#B8860B", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  recT: { fontSize: 13.5, fontWeight: 700, color: "var(--atr-text)", lineHeight: 1.35 },
  recY: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 3, fontWeight: 600 },

  /* team */
  leadGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 820, margin: "0 auto" },
  teamGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 },
  teamCard: { border: "1px solid var(--atr-outline)", borderRadius: 18, overflow: "hidden", background: "#fff", boxShadow: "var(--atr-shadow-1)" },
  teamImgWrap: { overflow: "hidden", aspectRatio: "1/1", background: "var(--atr-bg-cool)" },
  teamImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .25s" },
  teamBody: { padding: "16px", textAlign: "center" },
  teamN: { fontSize: 15.5, fontWeight: 800, color: "var(--atr-text)" },
  teamR: { fontSize: 12.5, color: "var(--atr-purple)", marginTop: 3, fontWeight: 700 },

  /* cta */
  cta: { position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #2A2350, #4B3F8F)", borderRadius: 26, padding: "52px 40px", textAlign: "center", color: "#fff", marginTop: 70, marginBottom: 70 },
  ctaGlow: { position: "absolute", top: -90, right: "16%", width: 320, height: 320, borderRadius: 999, background: "radial-gradient(circle, rgba(255,196,66,0.25), transparent 65%)" },
  ctaContent: { position: "relative" },
  ctaTitle: { fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", textWrap: "balance" },
  ctaDesc: { fontSize: 15.5, opacity: 0.9, marginTop: 12, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55 },
  ctaBtns: { display: "flex", gap: 12, justifyContent: "center", marginTop: 26, flexWrap: "wrap" },
  ctaPrimary: { background: "var(--atr-yellow)", color: "#5A4300", borderRadius: 13, padding: "14px 28px", fontSize: 15.5, fontWeight: 800, textDecoration: "none", boxShadow: "0 12px 28px rgba(0,0,0,0.2)" },
  ctaGhost: { background: "rgba(255,255,255,0.14)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.45)", borderRadius: 13, padding: "14px 26px", fontSize: 15.5, fontWeight: 700, textDecoration: "none" },
};
