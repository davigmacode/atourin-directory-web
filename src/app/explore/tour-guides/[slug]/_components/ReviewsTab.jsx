"use client";

import React from "react";
import { StarIcon } from "./Shared";

const revStyles = {
  header: { display: "grid", gridTemplateColumns: "200px 1fr", gap: 36, marginBottom: 32 },
  scoreBox: {
    background: "var(--atr-bg-soft)",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
    border: "1px solid var(--atr-outline)",
  },
  scoreVal: { fontSize: 48, fontWeight: 700, color: "var(--atr-text)" },
  scoreLabel: { fontSize: 13, color: "var(--atr-text-muted)", marginTop: 6, fontWeight: 600 },
  starsRow: { display: "flex", gap: 3, justifyContent: "center", marginTop: 8 },
  
  bars: { display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" },
  barRow: { display: "flex", alignItems: "center", gap: 12, fontSize: 13 },
  barNum: { width: 14, color: "var(--atr-text-muted)", fontWeight: 700 },
  barTrack: { flex: 1, height: 6, background: "var(--atr-outline)", borderRadius: 99 },
  barFill: { height: "100%", background: "var(--atr-yellow)", borderRadius: 99 },
  barCount: { width: 30, color: "var(--atr-text-muted)", textAlign: "right" },

  list: { display: "flex", flexDirection: "column", gap: 20 },
  card: {
    borderBottom: "1px solid var(--atr-outline)",
    paddingBottom: 24,
  },
  cardHead: { display: "flex", gap: 12, alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 999, objectFit: "cover" },
  cardName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  cardMeta: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 2 },
  cardText: { fontSize: 14, lineHeight: 1.6, color: "var(--atr-text-muted)", marginTop: 12 },
  verifiedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: "#2D8838",
    background: "rgba(81,176,84,0.12)",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 4,
    marginLeft: 8,
  },
  photos: { display: "flex", gap: 8, marginTop: 12 },
  photoImg: { width: 80, height: 80, borderRadius: 8, objectFit: "cover" },
};

const DEFAULT_REVIEWS = [
  {
    name: "Anastasia Wijaya",
    av: "https://i.pravatar.cc/100?img=44",
    rating: 5,
    date: "10 Mei 2026",
    trip: "Sailing & Hiking Trip",
    verified: true,
    text: "Pemandu sangat menyenangkan, komunikatif dan tahu setiap sudut rahasia. Perjalanan kami terasa aman dan seru dari awal hingga akhir. Rekomendasi sekali!",
  },
  {
    name: "Lukas Sebastian",
    av: "https://i.pravatar.cc/100?img=58",
    rating: 5,
    date: "2 Mei 2026",
    trip: "Adventure Trip",
    verified: true,
    text: "Sangat memerhatikan keselamatan. Briefing sebelum naik bukit sangat jelas. Pemandu lokal terbaik!",
  },
];

export default function ReviewsTab({ guide }) {
  const reviews = guide.reviewsList || DEFAULT_REVIEWS;
  const rating = guide.rating || 4.95;

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Review averages header */}
      <div style={revStyles.header}>
        <div style={revStyles.scoreBox}>
          <div style={revStyles.scoreVal}>{rating}</div>
          <div style={revStyles.starsRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(rating)} />
            ))}
          </div>
          <div style={revStyles.scoreLabel}>
            Ulasan dari {guide.reviews || "12"} traveler
          </div>
        </div>
        <div style={revStyles.bars}>
          {[
            { stars: 5, pct: 90, count: 10 },
            { stars: 4, pct: 10, count: 2 },
            { stars: 3, pct: 0, count: 0 },
            { stars: 2, pct: 0, count: 0 },
            { stars: 1, pct: 0, count: 0 },
          ].map((bar) => (
            <div key={bar.stars} style={revStyles.barRow}>
              <span style={revStyles.barNum}>{bar.stars}</span>
              <div style={revStyles.barTrack}>
                <div style={{ ...revStyles.barFill, width: `${bar.pct}%` }} />
              </div>
              <span style={revStyles.barCount}>{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div style={revStyles.list}>
        {reviews.map((rev, i) => (
          <div key={i} style={revStyles.card}>
            <div style={revStyles.cardHead}>
              <img src={rev.av} alt={rev.name} style={revStyles.avatar} />
              <div>
                <div>
                  <span style={revStyles.cardName}>{rev.name}</span>
                  {rev.verified && (
                    <span style={revStyles.verifiedBadge}>
                      {"\u2713"} VERIFIED
                    </span>
                  )}
                </div>
                <div style={revStyles.cardMeta}>
                  {rev.date} {"\u00B7"} {rev.trip}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon key={idx} filled={idx < rev.rating} />
                ))}
              </div>
            </div>
            <p style={revStyles.cardText}>{rev.text}</p>
            {rev.photos && rev.photos.length > 0 && (
              <div style={revStyles.photos}>
                {rev.photos.map((p, idx) => (
                  <img key={idx} src={p} alt="" style={revStyles.photoImg} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
