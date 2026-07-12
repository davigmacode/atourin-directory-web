"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

const vdStyles = {
  actGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  actCard: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  actIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 4,
  },
  actName: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)" },
  actDur: {
    display: "inline-block",
    background: "#EDE9FF",
    color: "var(--atr-purple)",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 999,
    width: "fit-content",
  },
  actDesc: {
    fontSize: 13,
    lineHeight: 1.5,
    color: "var(--atr-text-muted)",
    margin: 0,
  },
};

const ACTIVITY_INFOS = {
  Homestay: {
    icon: "🏡",
    name: "Menginap di Homestay",
    dur: "1 Malam",
    desc: "Merasakan kehangatan tinggal bersama keluarga adat/warga lokal di rumah tradisional.",
  },
  Tarian: {
    icon: "💃",
    name: "Tarian Adat Tradisional",
    dur: "1 Jam",
    desc: "Menyaksikan keindahan gerak tarian penyambutan dan budaya leluhur desa adat.",
  },
  Trekking: {
    icon: "🥾",
    name: "Trekking & Wisata Alam",
    dur: "3-4 Jam",
    desc: "Menjelajahi keindahan panorama bentang alam pegunungan, sawah, atau hutan asri.",
  },
  Tenun: {
    icon: "🧵",
    name: "Workshop Tenun Songke",
    dur: "2 Jam",
    desc: "Belajar membuat kain tenun tradisional secara langsung dengan mama-mama setempat.",
  },
  Workshop: {
    icon: "🛠️",
    name: "Workshop Kerajinan",
    dur: "2 Jam",
    desc: "Belajar membuat anyaman bambu atau cinderamata khas buatan tangan seniman lokal.",
  },
  Kuliner: {
    icon: "🍲",
    name: "Kelas Memasak Tradisional",
    dur: "1.5 Jam",
    desc: "Menyajikan hidangan otentik khas desa dengan resep warisan leluhur menggunakan kayu bakar.",
  },
  Coklat: {
    icon: "🍫",
    name: "Proses Pengolahan Cokelat",
    dur: "2 Jam",
    desc: "Melihat langsung pembibitan kakao hingga pembuatan cokelat batangan khas desa.",
  },
  Snorkel: {
    icon: "🤿",
    name: "Snorkeling Terumbu Karang",
    dur: "2.5 Jam",
    desc: "Menikmati keindahan bawah laut dengan konservasi terumbu karang Bio-Rock.",
  },
  "Coral Garden": {
    icon: "🐠",
    name: "Edukasi Terumbu Karang",
    dur: "1.5 Jam",
    desc: "Mempelajari restorasi ekosistem laut bersama komunitas penyelam lokal.",
  },
  Bertani: {
    icon: "🌾",
    name: "Aktivitas Bertani di Sawah",
    dur: "2 Jam",
    desc: "Turun ke sawah membajak tanah, menanam padi, dan belajar irigasi tradisional.",
  },
  Memasak: {
    icon: "🧑‍🍳",
    name: "Memasak Makanan Khas",
    dur: "1.5 Jam",
    desc: "Membuat sajian panganan khas pedesaan dari bahan segar pertanian lokal.",
  },
  "Tari Peresean": {
    icon: "🛡️",
    name: "Pertunjukan Seni Peresean",
    dur: "1 Jam",
    desc: "Menyaksikan seni bela diri bertarung menggunakan rotan dan perisai kulit sapi.",
  },
  "Air terjun": {
    icon: "🌊",
    name: "Eksplorasi Air Terjun",
    dur: "2 Jam",
    desc: "Berjalan menyusuri lembah menuju air terjun jernih yang tersembunyi.",
  },
  Sawah: {
    icon: "🌄",
    name: "Jelajah Sawah Terasering",
    dur: "1.5 Jam",
    desc: "Berfoto di pematang sawah bertingkat yang membentang luas menyejukkan mata.",
  },
};

export default function VillageActivities({ village }) {
  const activities = village.activities || ["Homestay", "Tarian", "Trekking"];

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            <span>{"\uD83C\uDFAF"}</span> Aktivitas & Pengalaman
          </h2>
          <div style={ds.sectionSub}>
            {activities.length} aktivitas unggulan yang bisa dialami di {village.name}
          </div>
        </div>
      </div>
      <div style={vdStyles.actGrid}>
        {activities.map((act) => {
          const info = ACTIVITY_INFOS[act] || {
            icon: "✨",
            name: act,
            dur: "1.5 Jam",
            desc: `Nikmati petualangan seru dan edukatif bertema ${act.toLowerCase()} yang dibimbing langsung oleh warga lokal.`,
          };
          return (
            <div key={act} style={vdStyles.actCard}>
              <span style={vdStyles.actIcon}>{info.icon}</span>
              <div style={vdStyles.actName}>{info.name}</div>
              <span style={vdStyles.actDur}>
                {"\u23F1"} {info.dur}
              </span>
              <p style={vdStyles.actDesc}>{info.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
