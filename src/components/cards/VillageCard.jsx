"use client";

import React from "react";
import SafeImage from "./SafeImage";
import dh from "@/styles/destination-detail";

const DESA_STATUS_COLOR = {
  Rintisan: { bg: "#F0F0F0", fg: "#5C5C5C" },
  Berkembang: { bg: "#FFF4D9", fg: "#B47A00" },
  Maju: { bg: "#D4ECF4", fg: "#1F6FB0" },
  Mandiri: { bg: "#D9F2DA", fg: "#2D8838" },
};

function formatPrice(price) {
  if (price === 0 || price == null) return "Gratis";
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}jt`;
  if (price >= 1000) return `Rp ${(price / 1000).toFixed(0)}rb`;
  return `Rp ${price}`;
}

/**
 * VillageCard — card for desa wisata.
 *
 * Supports two data shapes:
 *   Prototype: { img, name, status, kecamatan, desc, tags, rating,
 *                reviews, activities, homestay }
 *   VIL_DATA: { img, name, adwi, region, activities, price, rating,
 *               families, signature, theme }
 */
export default function VillageCard({ d }) {
  const statusKey = d.adwi || d.status || "";
  const sColor = DESA_STATUS_COLOR[statusKey] || {
    bg: "#F0F0F0",
    fg: "#5C5C5C",
  };

  const desc = d.desc || d.description || "";
  const chips = d.tags || d.activities || [];
  const activityCount =
    typeof d.activities === "number"
      ? d.activities
      : Array.isArray(d.activities)
        ? d.activities.length
        : 0;
  const hasHomestay = d.homestay != null ? d.homestay : d.price > 0;
  const reviews = d.reviews || 0;

  return (
    <article
      style={{
        ...dh.desaCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div style={dh.atrImgWrap}>
        <SafeImage src={d.img} alt="" />
        <span
          style={{
            ...dh.desaStatus,
            background: sColor.bg,
            color: sColor.fg,
          }}
        >
          <span style={{ ...dh.statusDot, background: sColor.fg }} />{" "}
          {statusKey}
        </span>
      </div>
      <div style={dh.atrBody}>
        <h3 style={dh.atrName}>{d.name}</h3>
        <div style={dh.atrLoc}>📍 {d.kecamatan || d.region || ""}</div>
        {desc && <p style={dh.atrDesc}>{desc}</p>}
        <div style={dh.desaTagRow}>
          {chips.slice(0, 3).map((t) => (
            <span key={t} style={dh.desaTag}>
              {t}
            </span>
          ))}
        </div>
        <div style={dh.desaHighlight}>
          🌿 <strong>{activityCount}</strong> aktivitas
          {hasHomestay && " · 🏡 Homestay tersedia"}
          {!hasHomestay && d.price > 0 && ` · Mulai ${formatPrice(d.price)}`}
        </div>
        <div style={dh.atrFooter}>
          <span style={dh.atrRating}>
            ★ <strong>{d.rating}</strong>
            {reviews > 0 && <span style={dh.atrReviews}> ({reviews})</span>}
          </span>
          <button style={dh.atrCta}>Lihat profil →</button>
        </div>
      </div>
    </article>
  );
}
