"use client";

import React from "react";
import { SectionCard } from "./Shared";

const gsStyles = {
  twoBlock: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22 },
  block: { display: "flex", flexDirection: "column", gap: 12 },
  blockTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--atr-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  specGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  specChip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 10,
    padding: "12px 14px",
  },
  specChipIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "var(--atr-purple)",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  specChipName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  specChipDesc: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 },

  langList: { display: "flex", flexDirection: "column", gap: 10 },
  langItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: "var(--atr-bg-soft)",
    borderRadius: 10,
    border: "1px solid var(--atr-outline)",
  },
  langFlagLg: { fontSize: 26 },
  langName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  langLevel: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 },
  levelBar: { marginLeft: "auto", display: "flex", gap: 3 },
  levelDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "var(--atr-purple)",
  },
  levelDotEmpty: { background: "var(--atr-outline)" },
};

const SPEC_META = {
  Bahari: { icon: "\u26F5", desc: "Sailing & island hopping" },
  Petualangan: { icon: "\uD83C\uDF92", desc: "Exploration & trekking" },
  Diving: { icon: "\uD83E\uDDBF", desc: "PADI OW Instructor" },
  Snorkeling: { icon: "\uD83E\uDDA0", desc: "Spot rahasia bawah laut" },
  "Photography Trip": { icon: "\uD83D\uDCF8", desc: "Sunset & wildlife shoots" },
  Sailing: { icon: "\uD83D\uDEE5", desc: "Phinisi & speedboat" },
  Heritage: { icon: "\uD83D\uDED5", desc: "Sejarah & warisan budaya" },
  Kuliner: { icon: "\uD83C\uDF73", desc: "Makanan & kuliner otentik" },
  Spiritual: { icon: "\uD83E\uDDD8", desc: "Wellness & ritual adat" },
  Hiking: { icon: "\u26F0", desc: "Trekking gunung berapi" },
};

const LANG_DETAILS = {
  ID: { flag: "🇮🇩", name: "Indonesia", level: "Bahasa Ibu (Native)" },
  EN: { flag: "🇬🇧", name: "English", level: "Fasih (Fluent)" },
  JP: { flag: "🇯🇵", name: "Japan", level: "Cukup (Conversational)" },
  FR: { flag: "🇫🇷", name: "French", level: "Cukup (Conversational)" },
  DE: { flag: "🇩🇪", name: "German", level: "Cukup (Conversational)" },
  ZH: { flag: "🇨🇳", name: "Mandarin", level: "Cukup (Conversational)" },
};

export default function GuideSpecialties({ guide }) {
  const specs = guide.spec || ["Bahari", "Petualangan"];
  const langs = guide.langs || ["ID", "EN"];

  return (
    <SectionCard title="Spesialisasi & Bahasa" icon={"\uD83C\uDFAF"}>
      <div style={gsStyles.twoBlock}>
        <div style={gsStyles.block}>
          <div style={gsStyles.blockTitle}>Spesialisasi</div>
          <div style={gsStyles.specGrid}>
            {specs.map((s) => {
              const meta = SPEC_META[s] || { icon: "\u2726", desc: "Local Expert" };
              return (
                <div key={s} style={gsStyles.specChip}>
                  <span style={gsStyles.specChipIcon}>{meta.icon}</span>
                  <div>
                    <div style={gsStyles.specChipName}>{s}</div>
                    <div style={gsStyles.specChipDesc}>{meta.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={gsStyles.block}>
          <div style={gsStyles.blockTitle}>Bahasa yang dikuasai</div>
          <div style={gsStyles.langList}>
            {langs.map((l, i) => {
              const detail = LANG_DETAILS[l] || { flag: "🌐", name: l, level: "Conversational" };
              const isNative = detail.level.includes("Native");
              const filled = isNative ? 5 : detail.level.includes("Fluent") ? 4 : 3;

              return (
                <div key={i} style={gsStyles.langItem}>
                  <span style={gsStyles.langFlagLg}>{detail.flag}</span>
                  <div>
                    <div style={gsStyles.langName}>{detail.name}</div>
                    <div style={gsStyles.langLevel}>{detail.level}</div>
                  </div>
                  <div style={gsStyles.levelBar}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        style={{
                          ...gsStyles.levelDot,
                          ...(n > filled ? gsStyles.levelDotEmpty : {}),
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
