"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/cards";
import { cardStyles } from "@/styles/attraction-styles";

function PinSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function StarFill() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}

export default function VillageCard({
  img,
  coverImage,
  name,
  region,
  destination,
  adwi,
  adwiBg,
  adwiFg,
  adwi_level,
  adwiLevel,
  theme,
  villageTheme,
  activities = [],
  price,
  homestay_min_price,
  homestayMinPrice,
  rating,
  ratingAverage,
  families,
  homestay_count,
  homestayCount,
  signature,
  featured,
  slug,
  id,
}) {
  const [hover, setHover] = useState(false);

  // Resolve mapping variations
  const displayImg = coverImage?.url || img;
  const displayRegion = destination
    ? `${destination.name}, ${destination.province?.name || ""}`
    : region;
  const displayAdwiName = adwiLevel?.name || adwi_level?.name || adwi;
  const displayAdwiBg = adwiLevel?.metadata?.color || adwi_level?.metadata?.color || adwiBg;
  const displayAdwiFg = adwiLevel?.metadata?.fg || adwi_level?.metadata?.fg || adwiFg;
  const displayPrice = typeof homestayMinPrice === "number" ? homestayMinPrice : (typeof homestay_min_price === "number" ? homestay_min_price : price);
  const displayFamilies = typeof homestayCount === "number" ? homestayCount : (typeof homestay_count === "number" ? homestay_count : families);
  const displayTheme = villageTheme?.name || theme;
  const displayRating = typeof ratingAverage === "number" ? ratingAverage : rating;

  const finalSlug = slug || id || name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  return (
    <Link
      href={`/explore/tourism-villages/${finalSlug}`}
      style={{
        ...cardStyles.card,
        textDecoration: "none",
        color: "inherit",
        display: "block",
        ...(hover
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 24px rgba(31,27,51,0.08)",
            }
          : {}),
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={cardStyles.cardImgWrap}>
        <SafeImage src={displayImg} alt="" style={cardStyles.cardImg} />
        {displayAdwiName && (
          <span
            style={{ ...cardStyles.cardTag, background: displayAdwiBg, color: displayAdwiFg }}
          >
            ADWI {displayAdwiName}
          </span>
        )}
        {featured && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "var(--atr-yellow)",
              color: "#3D2900",
              fontSize: 10,
              fontWeight: 800,
              padding: "4px 9px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}
          >
            UNGGULAN
          </div>
        )}
        <div style={cardStyles.cardImgBottom}>
          <span style={cardStyles.cardCityPill}>
            <PinSm /> {displayRegion}
          </span>
        </div>
      </div>
      <div style={cardStyles.cardBody}>
        <div>
          <h3 style={cardStyles.cardTitle}>{name}</h3>
          <div
            style={{
              fontSize: 12,
              color: "var(--atr-text-muted)",
              marginTop: 4,
            }}
          >
            {"\u2728"} <em>{signature}</em>
          </div>
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 4, fontSize: 11 }}
        >
          <span
            style={{
              background: "var(--atr-bg-soft)",
              color: "var(--atr-text)",
              padding: "4px 9px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            {displayTheme}
          </span>
          {activities.slice(0, 2).map((a, idx) => {
            const actName = typeof a === "object" ? (a.name || "") : a;
            const actKey = typeof a === "object" ? (a.slug || a.id || idx) : a;
            return (
              <span
                key={actKey}
                style={{
                  background: "#fff",
                  border: "1px solid var(--atr-outline)",
                  color: "var(--atr-text-muted)",
                  padding: "4px 9px",
                  borderRadius: 999,
                }}
              >
                {actName}
              </span>
            );
          })}
          {activities.length > 2 && (
            <span
              style={{ color: "var(--atr-text-muted)", padding: "4px 4px" }}
            >
              +{activities.length - 2}
            </span>
          )}
        </div>

        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={cardStyles.ratingRow}>
              <StarFill /> <strong>{displayRating}</strong>
            </div>
            <div style={{ fontSize: 11, color: "var(--atr-text-muted)" }}>
              {"\uD83C\uDFE0"} {displayFamilies} KK homestay
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {displayPrice === 0 ? (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2D8838" }}>
                Gratis
              </span>
            ) : (
              <>
                <div style={{ fontSize: 10, color: "var(--atr-text-muted)" }}>
                  mulai
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--atr-purple)",
                  }}
                >
                  Rp {(displayPrice / 1000).toLocaleString("id-ID")}rb
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 10,
                      color: "var(--atr-text-muted)",
                    }}
                  >
                    {" "}
                    /malam
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
