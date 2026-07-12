export const AIW_PURPLE = "#7068D5";
export const AIW_SOFT = "#A49EE4";
export const AIW_LIGHT = "#CDCDED";
export const AIW_50 = "#F1F0FB";
export const AIW_YELLOW = "#FFC442";
export const AIW_RED = "#F46263";
export const AIW_GREEN = "#51B054";
export const AIW_TEXT = "#58595B";
export const AIW_DARK = "#2E2F31";
export const AIW_MUTED = "#8A8B8D";
export const AIW_OUTLINE = "#E6E6E6";
export const AIW_BG = "#F6F6FB";

export const aw = {
  page: { fontFamily: "var(--atr-font-sans)", color: AIW_TEXT, background: AIW_BG, minHeight: "100vh", display: "flex", flexDirection: "column" },
  shell: { flex: 1, maxWidth: 1180, width: "100%", margin: "0 auto", padding: "24px 40px 36px", display: "grid", gridTemplateColumns: "270px 1fr", gap: 24, alignItems: "start" },
  side: { background: "#fff", border: `1px solid ${AIW_OUTLINE}`, borderRadius: 18, padding: 20, position: "sticky", top: 24 },
  chat: { background: "#fff", border: `1px solid ${AIW_OUTLINE}`, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", height: "calc(100vh - 130px)", minHeight: 560 },
  headBold: { padding: "16px 20px", background: `linear-gradient(165deg, ${AIW_PURPLE} 0%, ${AIW_SOFT} 100%)`, color: "#fff", display: "flex", alignItems: "center", gap: 12 },
  thread: { flex: 1, overflowY: "auto", padding: "22px 24px", background: AIW_BG },
  composer: { borderTop: `1px solid ${AIW_OUTLINE}`, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", background: "#fff" },
  input: { flex: 1, background: AIW_BG, border: `1px solid ${AIW_OUTLINE}`, borderRadius: 24, padding: "13px 18px", fontSize: 14.5, outline: "none", fontFamily: "var(--atr-font-sans)", color: AIW_TEXT },
  sendBtn: { width: 46, height: 46, borderRadius: "50%", background: AIW_PURPLE, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
};
