"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SectionCard } from "./Shared";

const sgStyles = {
  hScroll: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(220px, 230px)",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 8,
  },
  card: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    textAlign: "center",
  },
  av: { width: 72, height: 72, borderRadius: 999, marginBottom: 4, objectFit: "cover" },
  name: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  specs: { fontSize: 11, color: "var(--atr-text-muted)" },
  meta: { fontSize: 12, color: "var(--atr-text)", marginTop: 4 },
  price: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--atr-purple)",
    marginTop: 6,
  },
  btn: {
    marginTop: 8,
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--atr-text)",
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    width: "100%",
  },
};

const SIMILAR_GUIDES = [
  {
    name: "Yosua Mbaha",
    av: "https://i.pravatar.cc/200?img=51",
    specs: ["Petualangan", "Trekking"],
    rating: 4.88,
    trips: 62,
    price: 750000,
  },
  {
    name: "Bagas Komodo",
    av: "https://i.pravatar.cc/200?img=8",
    specs: ["Diving"],
    rating: 5.0,
    trips: 156,
    price: 1200000,
  },
  {
    name: "Ferdy Sahara",
    av: "https://i.pravatar.cc/200?img=12",
    specs: ["Fotografi", "Bahari"],
    rating: 4.92,
    trips: 95,
    price: 950000,
  },
  {
    name: "Maria Santi",
    av: "https://i.pravatar.cc/200?img=47",
    specs: ["Budaya", "Sejarah"],
    rating: 4.9,
    trips: 124,
    price: 650000,
  },
];

export default function SimilarGuides({ guide }) {
  const router = useRouter();
  const regionName = guide.region ? guide.region.split(",")[0] : "Labuan Bajo";

  return (
    <SectionCard
      title={`Pemandu Serupa di ${regionName}`}
      icon={"\uD83D\uDC65"}
      link="/explore/tour-guides"
      linkLabel="Lihat semua pemandu"
    >
      <div style={sgStyles.hScroll}>
        {SIMILAR_GUIDES.map((g, i) => {
          const slug = g.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return (
            <div
              key={i}
              style={sgStyles.card}
              onClick={() => router.push(`/explore/tour-guides/${slug}`)}
            >
              <img src={g.av} alt="" style={sgStyles.av} />
              <div style={sgStyles.name}>{g.name}</div>
              <div style={sgStyles.specs}>{g.specs.join(" \u00B7 ")}</div>
              <div style={sgStyles.meta}>
                ★ <strong>{g.rating}</strong> {"\u00B7"} {g.trips} trip
              </div>
              <div style={sgStyles.price}>
                mulai Rp {(g.price / 1000).toFixed(0)}rb/hari
              </div>
              <button style={sgStyles.btn}>Lihat profil</button>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
