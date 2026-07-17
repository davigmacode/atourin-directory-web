"use client";

import React from "react";
import cs from "@/styles/card-styles";
import CardCover from "../molecules/CardCover";
import CardBody from "../molecules/CardBody";
import Rating from "../atoms/Rating";

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
 * VillageCard — card for desa wisata listings.
 *
 * Supports two data shapes:
 *   Prototype: { img, name, status, kecamatan, desc, tags, rating,
 *                reviews, activities, homestay }
 *   VIL_DATA:  { img, name, adwi, region, activities, price, rating,
 *                families, signature, theme }
 */
export default function VillageCard({ d }) {
  const statusKey = d.adwiLevel?.name || d.adwi_level?.name || d.adwi || d.status || "";
  const sColor = DESA_STATUS_COLOR[statusKey] || {
    bg: "#F0F0F0",
    fg: "#5C5C5C",
  };

  const desc = d.desc || d.description || "";
  const chips = d.tags || (Array.isArray(d.activities) ? d.activities.map(a => typeof a === 'object' ? a.name : a) : []);
  const activityCount =
    typeof d.activities === "number"
      ? d.activities
      : Array.isArray(d.activities)
        ? d.activities.length
        : 0;
  const hasHomestay = d.homestay != null ? d.homestay : (d.homestayCount > 0 || d.homestay_count > 0 || d.price > 0 || d.homestayMinPrice > 0);
  const reviews = d.reviewsCount || d.reviews_count || d.reviews || 0;
  const rating = d.ratingAverage || d.rating_average || d.rating || 0;
  const price = d.homestayMinPrice || d.homestay_min_price || d.price || 0;
  const imgUrl = d.coverImage?.url || d.img || "";

  const badges = [
    {
      content: (
        <>
          <span style={{ ...cs.statusDot, background: sColor.fg }} /> {statusKey}
        </>
      ),
      style: {
        ...cs.desaStatus,
        background: sColor.bg,
        color: sColor.fg,
      },
    },
  ];

  return (
    <article
      style={{
        ...cs.desaCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <CardCover src={imgUrl} alt="" badges={badges} />
      <CardBody
        name={d.name}
        desc={desc}
        meta={
          <span style={cs.atrLoc}>
            📍 {d.kecamatan || d.destination?.name || d.region || ""}
          </span>
        }
      >
        {chips.length > 0 && (
          <div style={cs.desaTagRow}>
            {chips.slice(0, 3).map((t, idx) => (
              <span key={typeof t === 'string' ? t : idx} style={cs.desaTag}>
                {t}
              </span>
            ))}
          </div>
        )}
        <div style={cs.desaHighlight}>
          🌿 <strong>{activityCount}</strong> aktivitas
          {hasHomestay && " · 🏡 Homestay tersedia"}
          {!hasHomestay &&
            price > 0 &&
            ` · Mulai ${formatPrice(price)}`}
        </div>
        <div style={cs.atrFooter}>
          <Rating rating={rating} reviews={reviews} />
          <button style={cs.atrCta}>Lihat profil →</button>
        </div>
      </CardBody>
    </article>
  );
}
