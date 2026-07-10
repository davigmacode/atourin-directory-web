"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard } from "./Shared";

const gpkgStyles = {
  list: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 18,
    display: "grid",
    gridTemplateColumns: "1fr 220px",
    gap: 18,
    alignItems: "center",
  },
  cardBest: {
    border: "1px solid var(--atr-yellow)",
    boxShadow: "0 4px 14px rgba(255,196,66,0.15)",
  },
  badgeRow: { display: "flex", gap: 6, marginBottom: 8 },
  bestBadge: {
    background: "linear-gradient(135deg, #FFC442 0%, #FF8A00 100%)",
    color: "#3D2900",
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 6,
    letterSpacing: "0.04em",
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
    marginBottom: 6,
  },
  meta: {
    display: "flex",
    gap: 14,
    fontSize: 12,
    color: "var(--atr-text-muted)",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 5 },
  spotRow: { display: "flex", gap: 5, flexWrap: "wrap" },
  spotChip: {
    fontSize: 11,
    color: "var(--atr-text)",
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    padding: "3px 8px",
    borderRadius: 999,
  },
  spotMore: {
    fontSize: 11,
    color: "var(--atr-purple)",
    fontWeight: 700,
    padding: "3px 6px",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 8,
    paddingLeft: 18,
    borderLeft: "1px dashed var(--atr-outline)",
  },
  rightLabel: {
    fontSize: 10,
    color: "var(--atr-text-muted)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  rightPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--atr-purple)",
    letterSpacing: "-0.01em",
  },
  rightUnit: { fontSize: 11, color: "var(--atr-text-muted)" },
};

const DEFAULT_PACKAGES = [
  {
    name: "Full Day Local Discovery Tour",
    duration: "1 hari (08.00–17.00)",
    pax: "1–6 orang",
    spots: ["Spot Utama 1", "Spot Utama 2", "Pusat Kuliner"],
    price: 850000,
    unit: "/pemandu",
    bestseller: true,
    boat: "Transport darat",
  },
  {
    name: "Half Day Photography Walking Tour",
    duration: "4 jam (07.00–11.00)",
    pax: "1–4 orang",
    spots: ["Heritage Spot", "Sudut Instagramable"],
    price: 450000,
    unit: "/pemandu",
    bestseller: false,
    boat: "Walking tour",
  },
];

export default function GuidePackages({ guide }) {
  const isLabuanBajo =
    guide.region?.toLowerCase().includes("bajo") ||
    guide.region?.toLowerCase().includes("ntt");

  const packages = isLabuanBajo
    ? [
        {
          name: "Komodo Sailing 1 Day, Padar & Pink Beach",
          duration: "1 hari (07.00–18.00)",
          pax: "1–8 orang",
          spots: ["Pulau Padar", "Pink Beach", "Manta Point", "Kanawa"],
          price: 1850000,
          unit: "/orang (min 2 pax)",
          bestseller: true,
          boat: "Speedboat (8 pax)",
        },
        {
          name: "Komodo Sailing 3D2N, Phinisi Live On Board",
          duration: "3 hari · 2 malam",
          pax: "2–12 orang",
          spots: ["Padar", "Pink Beach", "Komodo", "Manta", "Kelor", "Tatawa", "Kanawa"],
          price: 6850000,
          unit: "/orang (kabin AC)",
          bestseller: false,
          boat: "Phinisi 18m (4 kabin)",
        },
        {
          name: "Diving Trip 2D, Manta Point & Castle Rock",
          duration: "2 hari (4 dives)",
          pax: "2–6 orang",
          spots: ["Manta Point", "Castle Rock", "Crystal Rock", "Batu Bolong"],
          price: 4200000,
          unit: "/orang (gear inc.)",
          bestseller: false,
          boat: "Speedboat dive (6 pax)",
        },
      ]
    : DEFAULT_PACKAGES;

  return (
    <SectionCard
      title="Paket Trip Pemandu"
      icon={"\uD83E\uDEB3"}
      eyebrow={`${packages.length} paket aktif · semua bisa di-custom`}
    >
      <div style={gpkgStyles.list}>
        {packages.map((p, i) => (
          <div
            key={i}
            style={{
              ...gpkgStyles.card,
              ...(p.bestseller ? gpkgStyles.cardBest : {}),
            }}
          >
            <div>
              <div style={gpkgStyles.badgeRow}>
                {p.bestseller && (
                  <span style={gpkgStyles.bestBadge}>
                    {"\u2605"} BESTSELLER
                  </span>
                )}
              </div>
              <div style={gpkgStyles.name}>{p.name}</div>
              <div style={gpkgStyles.meta}>
                <span style={gpkgStyles.metaItem}>
                  {"\u23F1"} {p.duration}
                </span>
                <span>{"\u00B7"}</span>
                <span style={gpkgStyles.metaItem}>
                  {"\uD83D\uDC65"} {p.pax}
                </span>
                <span>{"\u00B7"}</span>
                <span style={gpkgStyles.metaItem}>
                  {"\u26F5"} {p.boat}
                </span>
              </div>
              <div style={gpkgStyles.spotRow}>
                {p.spots.slice(0, 4).map((s) => (
                  <span key={s} style={gpkgStyles.spotChip}>
                    {"\uD83D\uDCCD"} {s}
                  </span>
                ))}
                {p.spots.length > 4 && (
                  <span style={gpkgStyles.spotMore}>
                    +{p.spots.length - 4} lagi
                  </span>
                )}
              </div>
            </div>
            <div style={gpkgStyles.right}>
              <span style={gpkgStyles.rightLabel}>Mulai dari</span>
              <div>
                <span style={gpkgStyles.rightPrice}>
                  Rp {(p.price / 1000000).toFixed(2)}jt
                </span>
                <span style={gpkgStyles.rightUnit}> {p.unit}</span>
              </div>
              <button
                style={{ ...ds.primaryCta }}
                onClick={() => alert(`Mengajukan pemesanan untuk: ${p.name}`)}
              >
                Pesan Paket
              </button>
              <button style={{ ...ds.iconBtnGhost, justifyContent: "center" }}>
                Detail itinerary
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
