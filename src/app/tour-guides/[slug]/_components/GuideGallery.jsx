"use client";

import React from "react";
import { SectionCard } from "./Shared";

const GUIDE_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
];

export default function GuideGallery({ guide }) {
  return (
    <SectionCard
      title="Galeri Trip"
      icon={"\uD83D\uDCF8"}
      eyebrow="Dokumentasi trip bersama tamu"
      link="#"
      linkLabel="Lihat semua 124 foto"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: 130,
          gap: 8,
        }}
      >
        {GUIDE_GALLERY.map((g, i) => (
          <div
            key={i}
            style={{
              gridRow: g.h ? "span 2" : "span 1",
              borderRadius: 10,
              overflow: "hidden",
              cursor: "zoom-in",
            }}
          >
            <img
              src={g.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
