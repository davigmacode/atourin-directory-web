"use client";

import React, { useState } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

/* ── Hash Helpers for deterministic values ── */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function cardMeta(d) {
  const h = hashStr(d.name);
  const ratings = [4.65, 4.72, 4.78, 4.82, 4.85, 4.88, 4.9, 4.92, 4.95, 4.98];
  const reviews = 120 + (h % 1400);
  const bookedToday = 6 + (h % 38);
  return {
    rating: ratings[h % ratings.length],
    reviews,
    bookedToday,
    hot: bookedToday > 25,
    instantBook: h % 3 !== 0,
    freeCancel: h % 5 !== 0,
    durationLabel: d.priceUnit
      ? null
      : h % 4 === 0
      ? "Sehari penuh"
      : h % 4 === 1
      ? "2 jam"
      : h % 4 === 2
      ? "Setengah hari"
      : "Multi-hari",
  };
}

/* ── SVGs ── */
function HeartSvg({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "var(--atr-red)" : "none"}>
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke={filled ? "var(--atr-red)" : "var(--atr-text)"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}

function PurplePin({ size = 14, color = "var(--atr-purple)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        fill={color}
      />
      <circle cx="12" cy="9.5" r="2.5" fill="#fff" />
    </svg>
  );
}

export default function HomestayCard({ d, onClick }) {
  const [save, setSave] = useState(d.save || false);
  const [hover, setHover] = useState(false);
  const m = cardMeta(d);

  return (
    <article
      style={{ ...pesanStyles.card, ...(hover ? pesanStyles.cardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={pesanStyles.cardImgWrap}>
        <img src={d.img} alt="" style={pesanStyles.cardImg} />
        {d.tag && (
          <span style={{ ...pesanStyles.cardPill, ...(d.tag === "Best Seller" ? pesanStyles.cardPillBest : {}) }}>
            {d.tag === "Best Seller" && "⭐ "}
            {d.tag}
          </span>
        )}
        <button
          style={pesanStyles.cardSave}
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
        >
          <HeartSvg filled={save} />
        </button>
        {m.hot && (
          <div style={pesanStyles.cardHotPill}>
            <span>🔥</span> {m.bookedToday} dipesan minggu ini
          </div>
        )}
        <div style={{ ...pesanStyles.cardHoverCta, opacity: hover ? 1 : 0 }}>
          Lihat detail
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14m0 0l-5-5m5 5l-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div style={pesanStyles.cardBody}>
        <div style={pesanStyles.cardRegion}>
          <span style={pesanStyles.cardRegionPin}>
            <PurplePin size={10} color="#fff" />
          </span>
          {d.region}
          <span style={{ color: "var(--atr-outline)", margin: "0 2px" }}>·</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            {2 + (hashStr(d.name) % 4)} tamu
          </span>
        </div>
        <h3 style={pesanStyles.cardTitle}>{d.name}</h3>

        {/* Facilities chips */}
        {d.facilities && d.facilities.length > 0 && (
          <div style={pesanStyles.cardChips}>
            {d.facilities.slice(0, 3).map((f, i) => (
              <span key={i} style={pesanStyles.cardChipFacility}>
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        <div style={pesanStyles.cardRatingRow}>
          <span style={pesanStyles.cardRatingBox}>
            <StarSvg /> <strong>{m.rating}</strong>
          </span>
          <span style={pesanStyles.cardReviews}>({m.reviews.toLocaleString("id-ID")} ulasan)</span>
        </div>

        <div style={pesanStyles.cardPriceRow}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={pesanStyles.cardPriceLabel}>Mulai</span>
              <span style={pesanStyles.cardPrice}>Rp{d.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <span style={pesanStyles.cardPriceUnit}>/malam</span>
        </div>

        <div style={pesanStyles.cardDivider} />
        <div style={pesanStyles.cardOperator}>
          <img src={d.opAvatar} alt="" style={pesanStyles.cardOperatorAvatar} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
            {d.operator}
          </span>
          <span style={pesanStyles.cardOperatorVerify}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l2.4 2.2 3.2-.6.6 3.2 2.2 2.4-2.2 2.4-.6 3.2-3.2-.6L12 16l-2.4-2.2-3.2.6-.6-3.2L3.6 9l2.2-2.4.6-3.2 3.2.6L12 2z"
                fill="var(--atr-purple)"
              />
              <path
                d="M8.5 11.5l2.2 2.2L15 9.4"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
