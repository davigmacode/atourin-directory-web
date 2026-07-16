"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function AccessStep({ n, title, sub }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: 14,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--atr-purple)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {n}
      </div>
      <div>
        <div
          style={{ fontSize: 14, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {title}
        </div>
        <div
          style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

const REGIONAL_STEPS = {
  NTT: [
    {
      title: "Labuan Bajo → Ruteng",
      sub: "Kendaraan roda empat / travel darat ~4 jam \u00B7 Rp 250.000/orang",
    },
    {
      title: "Ruteng → Desa Denge (titik awal trekking)",
      sub: "Kendaraan charter / mobil 4WD ~3 jam \u00B7 Rp 150.000/orang",
    },
    {
      title: "Trek Denge → Wae Rebo",
      sub: "Jalan kaki menanjak sejauh 9 km (~3-4 jam) \u00B7 Pemandu lokal wajib \u00B7 Porter Rp 100.000",
    },
  ],
  Bali: [
    {
      title: "Bandara I Gusti Ngurah Rai → Kota Bangli",
      sub: "Kendaraan charter / taksi online ~1.5 jam \u00B7 Rp 200.000/mobil",
    },
    {
      title: "Kota Bangli → Desa Wisata",
      sub: "Sepeda motor / taksi lokal ~15 menit \u00B7 Rp 25.000/orang",
    },
    {
      title: "Pintu Masuk Desa Wisata",
      sub: "Berjalan kaki menyusuri area desa adat yang asri dan pekarangan seragam.",
    },
  ],
  DIY: [
    {
      title: "Stasiun/Bandara Yogyakarta → Wonosari",
      sub: "Kendaraan pribadi / travel ~1.5 jam \u00B7 Rp 150.000/mobil",
    },
    {
      title: "Wonosari → Area Parkir Utama Desa",
      sub: "Sepeda motor / taksi lokal ~30 menit \u00B7 Rp 30.000/orang",
    },
    {
      title: "Area Parkir → Titik Aktivitas Desa Wisata",
      sub: "Berjalan kaki santai menikmati suasana pemukiman asri dan perbukitan purba.",
    },
  ],
};

const DEFAULT_STEPS = [
  {
    title: "Kota Utama terdekat → Kecamatan",
    sub: "Dapat menggunakan angkutan umum atau menyewa mobil / motor ~1-2 jam.",
  },
  {
    title: "Kecamatan → Titik Kumpul Pokdarwis Desa",
    sub: "Ikuti petunjuk arah jalan kabupaten atau hubungi pemandu lokal ~20 menit.",
  },
  {
    title: "Titik Kumpul → Homestay / Penginapan",
    sub: "Berjalan kaki didampingi pengelola desa wisata untuk check-in homestay.",
  },
];

export default function VillageAccess({ village }) {
  const region = village.region || "";
  let steps = DEFAULT_STEPS;

  const directions = village.location?.directions;
  if (directions && directions.length > 0) {
    steps = directions.map(d => ({ title: d.title, sub: d.detail }));
  } else if (region.includes("NTT")) {
    steps = REGIONAL_STEPS.NTT;
  } else if (region.includes("Bali")) {
    steps = REGIONAL_STEPS.Bali;
  } else if (region.includes("DIY") || region.includes("Yogyakarta")) {
    steps = REGIONAL_STEPS.DIY;
  }

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>
          <span>{"\uD83D\uDE97"}</span> Akses & Cara Menuju Lokasi
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map((s, idx) => (
          <AccessStep
            key={idx}
            n={(idx + 1).toString()}
            title={s.title}
            sub={s.sub}
          />
        ))}
      </div>
      <div style={{ ...ds.mapBox, marginTop: 16 }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
          alt="Map preview"
          style={ds.mapImg}
        />
        <span style={ds.mapPin}>{"\uD83D\uDCCD"}</span>
        <button
          style={ds.mapDirBtn}
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(village.name + " " + village.region)}`,
              "_blank"
            )
          }
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 12L12 2 2 12l10 10 10-10z"
              stroke="#fff"
              strokeWidth="1.6"
            />
          </svg>
          Buka di Maps
        </button>
      </div>
    </section>
  );
}
