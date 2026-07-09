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
 * Expected data shape (from VIL_DATA):
 * { img, name, region, adwi, adwiBg, adwiFg, theme, activities,
 *   price, rating, families, signature, featured }
 */
export default function VillageCard({ d }) {
  const sColor = DESA_STATUS_COLOR[d.adwi] || {
    bg: "#F0F0F0",
    fg: "#5C5C5C",
  };

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
          <span
            style={{ ...dh.statusDot, background: sColor.fg }}
          />
          {" "}{d.adwi}
        </span>
      </div>
      <div style={dh.atrBody}>
        <h3 style={dh.atrName}>{d.name}</h3>
        <div style={dh.atrLoc}>📍 {d.region}</div>
        <div style={dh.desaTagRow}>
          {(d.activities || []).slice(0, 3).map((act) => (
            <span key={act} style={dh.desaTag}>
              {act}
            </span>
          ))}
        </div>
        <div style={dh.desaHighlight}>
          🌿{" "}
          <strong>{d.activities?.length || 0}</strong> aktivitas
          {d.price > 0 &&
            ` · 🏡 Homestay mulai ${formatPrice(d.price)}`}
        </div>
        <div style={dh.atrFooter}>
          <span style={dh.atrRating}>
            ★ <strong>{d.rating}</strong>
          </span>
          <button style={dh.atrCta}>Lihat profil →</button>
        </div>
      </div>
    </article>
  );
}
