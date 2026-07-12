"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import SectionCard from "./SectionCard";

const vdStyles = {
  pkgGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  pkgCard: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  pkgBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 6,
    letterSpacing: "0.04em",
    width: "fit-content",
    background: "#FFF4D9",
    color: "#B47A00",
  },
  pkgName: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
  },
  pkgMetaRow: {
    display: "flex",
    gap: 12,
    fontSize: 12,
    color: "var(--atr-text-muted)",
  },
  pkgIncList: {
    margin: 0,
    paddingLeft: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  pkgIncItem: {
    fontSize: 13,
    color: "var(--atr-text)",
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
  },
  pkgFoot: {
    marginTop: "auto",
    paddingTop: 12,
    borderTop: "1px dashed var(--atr-outline)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pkgPrice: { fontSize: 22, fontWeight: 700, color: "var(--atr-purple)" },
  pkgPriceUnit: {
    fontSize: 12,
    color: "var(--atr-text-muted)",
    fontWeight: 500,
  },
  customBanner: {
    background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
    border: "1px solid #D8D0FF",
    borderRadius: 12,
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },
};

export default function VillagePackages({ village }) {
  const basePrice = village.price || 0;
  const acts = village.activities || ["Homestay", "Tarian"];

  // Generate dynamic package prices and listings
  const package1Price = basePrice > 0 ? basePrice * 5 : 150000;
  const package2Price = basePrice > 0 ? basePrice * 8 : 350000;

  const packages = [
    {
      name: `${village.name} 2D1N Heritage Tour`,
      duration: "2 Hari \u00B7 1 Malam",
      minPax: 2,
      maxPax: 8,
      price: package1Price,
      popular: true,
      includes: [
        "Transportasi PP dari titik kumpul",
        "Pemandu lokal berlisensi",
        basePrice > 0 ? "Menginap di Homestay Desa" : "Akses area adat utama",
        "Makan pagi & malam kuliner tradisional",
        acts[0] ? `Pengalaman ${acts[0]}` : "Upacara penyambutan adat",
      ],
    },
    {
      name: `${village.name} + ${village.theme || "Eksplorasi"} Tour 3D2N`,
      duration: "3 Hari \u00B7 2 Malam",
      minPax: 2,
      maxPax: 6,
      price: package2Price,
      popular: false,
      includes: [
        "Semua layanan di paket 2D1N",
        acts[1] ? `Workshop & demo ${acts[1]}` : "Kunjungan pengrajin lokal",
        "Dokumentasi foto & cinderamata kaos desa",
        "Tambahan 1 malam penginapan",
        "Sertifikat kenangan dari Pokdarwis",
      ],
    },
  ];

  return (
    <SectionCard
      title="Paket Wisata Resmi"
      icon={"\uD83D\uDCE6"}
      eyebrow="Paket terdaftar resmi di Marketplace Atourin"
      link="/"
      linkLabel="Pesan custom"
    >
      <div style={vdStyles.pkgGrid}>
        {packages.map((p, i) => (
          <article key={i} style={vdStyles.pkgCard}>
            {p.popular && (
              <span style={vdStyles.pkgBadge}>{"\u2B50"} TERPOPULER</span>
            )}
            <div style={vdStyles.pkgName}>{p.name}</div>
            <div style={vdStyles.pkgMetaRow}>
              <span>
                {"\u23F1"} {p.duration}
              </span>
              <span>{"\u00B7"}</span>
              <span>
                {"\uD83D\uDC65"} {p.minPax}
                {"\u2013"}
                {p.maxPax} orang
              </span>
            </div>
            <ul style={vdStyles.pkgIncList}>
              {p.includes.map((inc, j) => (
                <li key={j} style={vdStyles.pkgIncItem}>
                  <span
                    style={{
                      color: "var(--atr-purple)",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {"\u2713"}
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
            <div style={vdStyles.pkgFoot}>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--atr-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Mulai dari
                </div>
                <span style={vdStyles.pkgPrice}>
                  Rp {p.price === 0 ? "Gratis" : (p.price / 1000).toLocaleString("id-ID") + "rb"}
                </span>
                <span style={vdStyles.pkgPriceUnit}>/orang</span>
              </div>
              <button
                style={{
                  ...ds.primaryCta,
                  width: "auto",
                  padding: "12px 22px",
                }}
                onClick={() => alert(`Memproses pemesanan ${p.name}...`)}
              >
                Pesan
              </button>
            </div>
          </article>
        ))}
      </div>
      <div style={{ ...vdStyles.customBanner, marginTop: 14 }}>
        <div>
          <div
            style={{ fontSize: 14, fontWeight: 700, color: "var(--atr-text)" }}
          >
            Ingin paket custom?
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--atr-text-muted)",
              marginTop: 2,
            }}
          >
            Itinerary fleksibel, durasi & aktivitas bisa disesuaikan kebutuhan
            grup Anda.
          </div>
        </div>
        <button
          style={{ ...ds.secondaryCta, width: "auto", padding: "10px 20px" }}
          onClick={() => alert("Menghubungi pengelola desa wisata via chat...")}
        >
          {"\uD83D\uDCAC"} Hubungi Pengelola
        </button>
      </div>
    </SectionCard>
  );
}
