"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

const vdStyles = {
  heroCover: {
    position: "relative",
    height: 440,
    overflow: "hidden",
    borderRadius: 16,
    marginBottom: 12,
    background: "#1F1B33",
  },
  heroCoverImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroPlay: {
    position: "absolute",
    bottom: 20,
    left: 24,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "var(--atr-text)",
  },
  heroSeeAll: {
    position: "absolute",
    bottom: 20,
    right: 24,
    background: "rgba(31,27,51,0.7)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  heroBadgeCorner: {
    position: "absolute",
    top: 24,
    left: 24,
    background: "rgba(255,255,255,0.95)",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
  },
  galleryItem: {
    aspectRatio: "1 / 1",
    borderRadius: 10,
    overflow: "hidden",
    cursor: "zoom-in",
  },
  galleryItemImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

export default function DetailHero({ village }) {
  const coverUrl =
    village.coverImage?.url ||
    village.cover ||
    village.img ||
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1800&auto=format&fit=crop&q=80";

  const statusName = village.adwi || "Mandiri";
  const statusFg = village.adwiFg || "#2D8838";

  const galleryImages = [
    coverUrl,
    ...(village.media ? village.media.map((m) => m.url) : []),
    "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=80",
  ].filter(Boolean);

  const uniqueGalleryImages = Array.from(new Set(galleryImages));

  return (
    <div>
      <div style={vdStyles.heroCover}>
        <img src={coverUrl} alt="Cover" style={vdStyles.heroCoverImg} />
        <div style={vdStyles.heroBadgeCorner}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: statusFg,
            }}
          />
          Desa <strong>{statusName}</strong>
        </div>
        <button
          style={vdStyles.heroPlay}
          onClick={() => alert("Menampilkan video promosi desa wisata...")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-purple)">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Tonton video pendek (28 dtk)
        </button>
        <button
          style={vdStyles.heroSeeAll}
          onClick={() => alert("Membuka galeri foto desa wisata...")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle
              cx="9"
              cy="11"
              r="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3 17l5-5 4 4 3-3 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          Lihat semua {uniqueGalleryImages.length} foto
        </button>
      </div>
      <div style={vdStyles.galleryGrid}>
        {uniqueGalleryImages.slice(0, 4).map((src, i) => (
          <div key={i} style={vdStyles.galleryItem}>
            <img src={src} alt="Gallery item" style={vdStyles.galleryItemImg} />
          </div>
        ))}
      </div>
    </div>
  );
}
