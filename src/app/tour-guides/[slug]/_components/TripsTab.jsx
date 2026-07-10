"use client";

import React from "react";

const expStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 14 },
  card: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: "4 / 3",
    cursor: "pointer",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, transparent 40%, rgba(31,27,51,0.85) 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 14,
  },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#fff" },
  cardVisits: { fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 },
};

const pkgStyles = {
  list: { display: "flex", flexDirection: "column", gap: 14, marginTop: 14 },
  card: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  cardLeft: { flex: 1, minWidth: 0 },
  pkgTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)" },
  bestseller: {
    display: "inline-block",
    background: "linear-gradient(135deg, #FFC442 0%, #FF8A00 100%)",
    color: "#3D2900",
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 4,
    marginBottom: 8,
    letterSpacing: "0.04em",
  },
  metaRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 8,
    fontSize: 12,
    color: "var(--atr-text-muted)",
  },
  spotsRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 12,
  },
  spotPill: {
    fontSize: 11,
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 6,
    padding: "4px 8px",
    color: "var(--atr-text)",
  },
  cardRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", flexShrink: 0 },
  priceVal: { fontSize: 20, fontWeight: 700, color: "var(--atr-purple)" },
  priceUnit: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 },
  bookBtn: {
    background: "var(--atr-purple)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    marginTop: 12,
  },
};

const DEFAULT_EXPERIENCES = [
  {
    name: "Pantai Eksotis",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=70",
    visits: 92,
  },
  {
    name: "Bukit Menawan",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=70",
    visits: 84,
  },
  {
    name: "Wisata Bahari",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70",
    visits: 73,
  },
];

const DEFAULT_PACKAGES = [
  {
    name: "Full Day Local Discovery Tour",
    duration: "1 hari (08.00–17.00)",
    pax: "1–6 orang",
    spots: ["Spot Utama 1", "Spot Utama 2", "Pusat Kuliner"],
    price: 850000,
    unit: "/pemandu",
    bestseller: true,
  },
  {
    name: "Half Day Photography Walking Tour",
    duration: "4 jam (07.00–11.00)",
    pax: "1–4 orang",
    spots: ["Heritage Spot", "Sudut Instagramable"],
    price: 450000,
    unit: "/pemandu",
    bestseller: false,
  },
];

export default function TripsTab({ guide }) {
  const isLabuanBajo = guide.region?.toLowerCase().includes("bajo") || guide.region?.toLowerCase().includes("ntt");
  
  const experiences = isLabuanBajo ? [
    {
      name: "Pulau Padar",
      img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&auto=format&fit=crop&q=70",
      visits: 87,
    },
    {
      name: "Manta Point",
      img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70",
      visits: 84,
    },
    {
      name: "Pink Beach",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=70",
      visits: 79,
    },
  ] : DEFAULT_EXPERIENCES;

  const packages = isLabuanBajo ? [
    {
      name: "Komodo Sailing 1 Day, Padar & Pink Beach",
      duration: "1 hari (07.00–18.00)",
      pax: "1–8 orang",
      spots: ["Pulau Padar", "Pink Beach", "Manta Point", "Kanawa"],
      price: 1850000,
      unit: "/orang (min 2 pax)",
      bestseller: true,
    },
    {
      name: "Komodo Sailing 3D2N, Phinisi Live On Board",
      duration: "3 hari · 2 malam",
      pax: "2–12 orang",
      spots: ["Padar", "Pink Beach", "Komodo", "Manta", "Kelor"],
      price: 6850000,
      unit: "/orang (kabin AC)",
      bestseller: false,
    },
  ] : DEFAULT_PACKAGES;

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Experience Areas */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Destinasi Terpopuler yang Sering Dikunjungi
        </h3>
        <div style={expStyles.grid}>
          {experiences.map((exp) => (
            <div key={exp.name} style={expStyles.card}>
              <img src={exp.img} alt={exp.name} style={expStyles.img} />
              <div style={expStyles.overlay}>
                <div style={expStyles.cardTitle}>{exp.name}</div>
                <div style={expStyles.cardVisits}>
                  {"\u2705"} {exp.visits} trip bersama tamu
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Packages */}
      <div>
        <h3
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Paket Pemanduan yang Tersedia
        </h3>
        <div style={pkgStyles.list}>
          {packages.map((pkg) => (
            <div key={pkg.name} style={pkgStyles.card}>
              <div style={pkgStyles.cardLeft}>
                {pkg.bestseller && (
                  <span style={pkgStyles.bestseller}>BEST SELLER</span>
                )}
                <h4 style={pkgStyles.pkgTitle}>{pkg.name}</h4>
                <div style={pkgStyles.metaRow}>
                  <span>{"\u23F1"} Durasi: {pkg.duration}</span>
                  <span>{"\uD83D\uDC65"} Kapasitas: {pkg.pax}</span>
                </div>
                <div style={pkgStyles.spotsRow}>
                  {pkg.spots.map((spot) => (
                    <span key={spot} style={pkgStyles.spotPill}>
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
              <div style={pkgStyles.cardRight}>
                <span style={pkgStyles.priceVal}>
                  Rp {pkg.price.toLocaleString("id-ID")}
                </span>
                <span style={pkgStyles.priceUnit}>{pkg.unit}</span>
                <button
                  style={pkgStyles.bookBtn}
                  onClick={() =>
                    alert(`Mengajukan pemesanan untuk: ${pkg.name}`)
                  }
                >
                  Pesan Paket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
