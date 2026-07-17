"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function Pin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function VillageHeader({ village }) {
  const adwiLevel = village.adwiLevel || village.adwi_level;
  const statusBg = adwiLevel?.metadata?.color || village.adwiBg || "rgba(81,176,84,0.16)";
  const statusFg = adwiLevel?.metadata?.fg || village.adwiFg || "#2D8838";
  const statusName = adwiLevel?.name || village.adwi || "Mandiri";

  const dest = village.destination;
  const kota = dest?.name || (village.region ? village.region.split(",")[0]?.trim() : "Manggarai");
  const provinsi = dest?.province?.name || (village.region ? village.region.split(",")[1]?.trim() : "Nusa Tenggara Timur");

  const foundedYear = village.founded || 2012;
  const ratingValue = village.ratingAverage ?? village.rating_average ?? village.rating ?? 4.8;
  const reviewsCount = village.reviewsCount ?? village.reviews_count ?? village.reviews ?? 124;

  const shortDesc =
    village.shortDesc ||
    village.description ||
    `${village.name} merupakan destinasi Desa Wisata unggulan yang menyuguhkan keunikan adat, kelestarian alam, serta kebudayaan yang kental khas ${provinsi}.`;

  const themeName = village.villageTheme?.name || village.village_theme?.name || village.theme || "Desa Wisata";
  const tags = village.tags || [themeName, "Wisata", "PesonaIndonesia"].filter(Boolean);

  return (
    <section style={ds.section}>
      <div style={ds.hdrBadgeRow}>
        <span
          style={{
            ...ds.catBadge,
            background: statusBg,
            color: statusFg,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: statusFg,
              marginRight: 2,
            }}
          />
          Desa {statusName}
        </span>
        <span
          style={{
            ...ds.certBadge,
            color: "#7E1D1D",
            background: "#FFF5F5",
            borderColor: "rgba(126,29,29,0.3)",
          }}
        >
          {"\uD83C\uDF1C"} UNESCO Heritage Heritage Award
        </span>
        <span
          style={{
            ...ds.certBadge,
            color: "var(--atr-arti)",
            background: "rgba(81,176,84,0.08)",
            borderColor: "rgba(81,176,84,0.3)",
          }}
        >
          {"\uD83C\uDF3F"} GSTC Certified
        </span>
      </div>
      <h1 style={ds.hdrTitle}>{village.name}</h1>
      <div style={ds.hdrMetaRow}>
        <span style={ds.hdrMetaItem}>
          <Pin /> {kota}, {provinsi}
        </span>
      <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(village.name + " " + (kota + ", " + provinsi))}`}
          target="_blank"
          rel="noopener noreferrer"
          style={ds.hdrMetaLink}
        >
          Google Maps {"\u2192"}
        </a>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <span style={ds.hdrMetaItem}>
          {"\uD83D\uDCD3"} Desa Wisata sejak <strong>{foundedYear}</strong>
        </span>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <span style={ds.hdrMetaItem}>
          <span style={{ color: "var(--atr-yellow)" }}>{"\u2605"}</span>{" "}
          <strong>{ratingValue}</strong>{" "}
          <span style={{ color: "var(--atr-text-muted)" }}>
            ({reviewsCount} ulasan)
          </span>
        </span>
      </div>
      <div style={ds.hdrTagRow}>
        {tags.map((t) => (
          <span key={t} style={ds.hdrTag}>
            #{t.toLowerCase().replace(/\s+/g, "")}
          </span>
        ))}
      </div>
      <p style={ds.hdrShortDesc}>{shortDesc}</p>
    </section>
  );
}
