"use client";

import React from "react";

const gsStyles = {
  twoBlock: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22, marginTop: 24 },
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

export default function BiographyTab({ guide }) {
  const specs = guide.spec || ["Bahari", "Petualangan"];
  const certs = guide.certs || ["HPI", "BNSP"];
  const langs = guide.langs || ["ID", "EN"];

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Narrative Bio */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--atr-text)",
            marginBottom: 14,
          }}
        >
          Tentang Pemandu
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--atr-text-muted)",
            whiteSpace: "pre-wrap",
            maxWidth: 800,
          }}
        >
          {guide.about ||
            `Halo! Saya ${guide.name}, pemandu wisata lokal berlisensi resmi di ${guide.region}. Berpengalaman memandu wisatawan menjelajahi spot-spot ikonik dan tersembunyi. Saya berkomitmen memberikan pelayanan trip yang aman, nyaman, menyenangkan, dan berkesan untuk Anda.`}
        </p>
      </div>

      {/* Specialties & Languages block */}
      <div style={gsStyles.twoBlock}>
        <div style={gsStyles.block}>
          <div style={gsStyles.blockTitle}>Spesialisasi Wisata</div>
          <div style={gsStyles.specGrid}>
            {specs.map((s) => {
              const meta = SPEC_META[s] || { icon: "\u2728", desc: "Local Expert" };
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
          <div style={gsStyles.blockTitle}>Bahasa yang Dikuasai</div>
          <div style={gsStyles.langList}>
            {langs.map((l, i) => {
              const native = l === "ID";
              return (
                <div key={l} style={gsStyles.langItem}>
                  <span style={gsStyles.langFlagLg}>
                    {l === "ID" ? "🇮🇩" : l === "EN" ? "🇬🇧" : l === "JP" ? "🇯🇵" : "🌐"}
                  </span>
                  <div>
                    <div style={gsStyles.langName}>
                      {l === "ID" ? "Indonesia" : l === "EN" ? "English" : l === "JP" ? "Japan" : l}
                    </div>
                    <div style={gsStyles.langLevel}>
                      {native ? "Bahasa Ibu (Native)" : "Fasih (Fluent)"}
                    </div>
                  </div>
                  <div style={gsStyles.levelBar}>
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const active = native ? idx < 5 : idx < 4;
                      return (
                        <div
                          key={idx}
                          style={
                            active ? gsStyles.levelDot : gsStyles.levelDotEmpty
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certifications Timeline */}
      <div style={{ marginTop: 40 }}>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 16,
          }}
        >
          Sertifikasi & Lisensi Resmi
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {certs.map((c, i) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                background: "#E4F4E4",
                borderRadius: 12,
                border: "1px solid rgba(81,176,84,0.2)",
              }}
            >
              <span style={{ fontSize: 24 }}>{"\uD83C\uDF93"}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1E5A26" }}>
                  {c === "HPI"
                    ? "Anggota Himpunan Pramuwisata Indonesia"
                    : c === "BNSP"
                      ? "Pemandu Bersertifikat BNSP RI"
                      : c}
                </div>
                <div style={{ fontSize: 11, color: "#2D8838", marginTop: 2 }}>
                  Tervalidasi Aktif
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
