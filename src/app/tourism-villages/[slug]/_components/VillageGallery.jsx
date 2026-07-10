"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import SectionCard from "./SectionCard";

const vdStyles = {
  galMason: { columnCount: 3, columnGap: 10 },
  galMasonItem: {
    breakInside: "avoid",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  galMasonImg: { width: "100%", display: "block" },
  galMasonCap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
    color: "#fff",
    padding: "20px 12px 10px",
    fontSize: 11,
    fontWeight: 600,
  },
};

const DEFAULT_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    cap: "Trekking pagi menikmati pemandangan alam",
  },
  {
    src: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    cap: "Mempelajari kerajinan tradisional khas desa",
  },
  {
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    cap: "Keindahan arsitektur pemukiman adat lokal",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    cap: "Sunset indah di atas puncak perbukitan desa",
  },
  {
    src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
    cap: "Proses pengolahan kuliner / kopi tradisional",
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    cap: "Upacara sambutan adat penuh kehangatan",
  },
];

export default function VillageGallery({ village }) {
  const images = DEFAULT_GALLERY;

  return (
    <SectionCard
      title="Galeri Kegiatan"
      icon={"\uD83D\uDCF8"}
      eyebrow={`Dokumentasi tamu ${village.name}`}
      link="/"
      linkLabel="Lihat semua 47 foto"
    >
      <div style={vdStyles.galMason}>
        {images.map((g, i) => (
          <div key={i} style={vdStyles.galMasonItem}>
            <img
              src={g.src}
              alt={g.cap}
              style={{
                ...vdStyles.galMasonImg,
                aspectRatio: i % 2 === 0 ? "4/3" : "3/4",
              }}
            />
            <div style={vdStyles.galMasonCap}>{g.cap}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
