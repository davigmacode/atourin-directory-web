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

function ClockSvg() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

const ATTR_CAT_STYLE = {
  "Pantai": { icon: "🏖️", bg: "#CFE7F8", fg: "#1F6FB0" },
  "Gunung": { icon: "⛰️", bg: "#D9F2DA", fg: "#1F5E2A" },
  "Air Terjun": { icon: "💦", bg: "#CFE7F8", fg: "#1F6FB0" },
  "Sejarah": { icon: "🏛️", bg: "#FFF0BD", fg: "#7C5A00" },
  "Museum": { icon: "🖼️", bg: "#F0D9F4", fg: "#7C2F8C" },
  "Religi": { icon: "🕌", bg: "#FFE5C8", fg: "#7C4400" },
  "Taman": { icon: "🌳", bg: "#D9F2DA", fg: "#1F5E2A" },
  "Alam": { icon: "🌿", bg: "#D9F2DA", fg: "#1F5E2A" },
  "Edukasi": { icon: "📚", bg: "#E9E4FF", fg: "#3A2F8C" },
  "Seni & Budaya": { icon: "🎭", bg: "#F0D9F4", fg: "#7C2F8C" },
  "Bahari": { icon: "🐠", bg: "#CFE7F8", fg: "#1F6FB0" },
  default: { icon: "📍", bg: "#EDE9FF", fg: "var(--atr-purple)" },
};

export default function AttractionCard({ d, onClick }) {
  const [save, setSave] = useState(d.save || false);
  const [hover, setHover] = useState(false);
  const m = cardMeta(d);
  const cat = ATTR_CAT_STYLE[d.category] || ATTR_CAT_STYLE.default;
  const hasDiscount = !!d.strike;
  const savedAmt = hasDiscount ? d.strike - d.price : 0;

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
          <span
            style={{
              ...pesanStyles.cardPill,
              ...(d.tag === "Best Seller"
                ? pesanStyles.cardPillBest
                : d.tag === "Baru"
                ? pesanStyles.cardPillNew
                : {}),
            }}
          >
            {d.tag === "Best Seller" && "⭐ "}
            {d.tag}
          </span>
        )}

        {d.discount && <div style={pesanStyles.cardDiscountBadge}>-{d.discount}%</div>}

        <button
          style={pesanStyles.cardSave}
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
        >
          <HeartSvg filled={save} />
        </button>

        {/* Category chip at bottom-left */}
        {d.category && (
          <div style={{ ...pesanStyles.cardCatChip, background: cat.bg, color: cat.fg }}>
            <span>{cat.icon}</span> {d.category}
          </div>
        )}

        <div style={{ ...pesanStyles.cardHoverCta, opacity: hover ? 1 : 0 }}>
          Beli tiket
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

      <div style={{ ...pesanStyles.cardBody, padding: "12px 12px 12px" }}>
        <div style={pesanStyles.cardRegion}>
          <span style={pesanStyles.cardRegionPin}>
            <PurplePin size={10} color="#fff" />
          </span>
          {d.region}
        </div>
        <h3 style={{ ...pesanStyles.cardTitle, fontSize: 14, minHeight: 36 }}>{d.name}</h3>

        {/* Compact feature row, open hours + instant QR */}
        <div style={pesanStyles.cardChips}>
          {d.hours && (
            <span style={pesanStyles.cardChipFeature}>
              <ClockSvg /> {d.hours}
            </span>
          )}
          <span
            style={{
              ...pesanStyles.cardChipFeature,
              background: "rgba(112,104,213,0.12)",
              color: "var(--atr-purple)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
            </svg>
            Instant QR
          </span>
        </div>

        <div style={pesanStyles.cardRatingRow}>
          <span style={pesanStyles.cardRatingBox}>
            <StarSvg /> <strong>{m.rating}</strong>
          </span>
          <span style={pesanStyles.cardReviews}>({m.reviews.toLocaleString("id-ID")})</span>
        </div>

        {/* Compact attraction price, no "Mulai dari", strike highlighted */}
        <div style={pesanStyles.attrPriceBlock}>
          {hasDiscount && (
            <div style={pesanStyles.attrStrikeRow}>
              <span style={pesanStyles.cardPriceStrike}>Rp {d.strike.toLocaleString("id-ID")}</span>
              <span style={pesanStyles.attrSavedPill}>Hemat Rp {savedAmt.toLocaleString("id-ID")}</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={pesanStyles.cardPrice}>Rp{d.price.toLocaleString("id-ID")}</span>
            <span style={pesanStyles.cardPriceUnit}>/tiket</span>
          </div>
        </div>
      </div>
    </article>
  );
}
