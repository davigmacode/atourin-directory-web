"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  name,
  region,
  adwi,
  adwiBg,
  adwiFg,
  theme,
  activities = [],
  price,
  rating,
  families,
  signature,
  featured,
}) {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  return (
    <article
      style={{
        ...cardStyles.card,
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
      onClick={() => router.push(`/explore/tourism-villages/${slug}`)}
    >
      <div style={cardStyles.cardImgWrap}>
        <SafeImage src={img} alt="" style={cardStyles.cardImg} />
        <span
          style={{ ...cardStyles.cardTag, background: adwiBg, color: adwiFg }}
        >
          ADWI {adwi}
        </span>
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
            <PinSm /> {region}
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
            {theme}
          </span>
          {activities.slice(0, 2).map((a) => (
            <span
              key={a}
              style={{
                background: "#fff",
                border: "1px solid var(--atr-outline)",
                color: "var(--atr-text-muted)",
                padding: "4px 9px",
                borderRadius: 999,
              }}
            >
              {a}
            </span>
          ))}
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
              <StarFill /> <strong>{rating}</strong>
            </div>
            <div style={{ fontSize: 11, color: "var(--atr-text-muted)" }}>
              {"\uD83C\uDFE0"} {families} KK homestay
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {price === 0 ? (
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
                  Rp {(price / 1000).toLocaleString("id-ID")}rb
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
    </article>
  );
}
