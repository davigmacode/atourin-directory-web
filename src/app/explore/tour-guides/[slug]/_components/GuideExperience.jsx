"use client";

import React from "react";
import { SectionCard } from "./Shared";

const expStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
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
  name: { color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1.2 },
  visits: { color: "rgba(255,255,255,0.85)", fontSize: 11, marginTop: 2 },
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

export default function GuideExperience({ guide }) {
  const isLabuanBajo =
    guide.region?.toLowerCase().includes("bajo") ||
    guide.region?.toLowerCase().includes("ntt");

  const experiences = isLabuanBajo
    ? [
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
        {
          name: "Pulau Komodo",
          img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70",
          visits: 68,
        },
        {
          name: "Tatawa Besar",
          img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=70",
          visits: 42,
        },
        {
          name: "Kanawa Island",
          img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&auto=format&fit=crop&q=70",
          visits: 35,
        },
      ]
    : DEFAULT_EXPERIENCES;

  return (
    <SectionCard
      title="Wilayah Penguasaan"
      icon={"\uD83D\uDDFA"}
      eyebrow="Spot-spot yang sering ditangani"
      link="#"
      linkLabel="Lihat semua spot"
    >
      <div style={expStyles.grid}>
        {experiences.map((a, i) => (
          <div key={i} style={expStyles.card}>
            <img src={a.img} alt="" style={expStyles.img} />
            <div style={expStyles.overlay}>
              <div style={expStyles.name}>{a.name}</div>
              <div style={expStyles.visits}>
                {a.visits}
                {"\u00D7"} ditangani
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
