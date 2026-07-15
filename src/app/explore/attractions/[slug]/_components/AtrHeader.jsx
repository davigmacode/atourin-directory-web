"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { Pin } from "./Shared";

export default function AtrHeader({ attraction }) {
  const primaryCat = (attraction.categories && attraction.categories.length > 0)
    ? attraction.categories[0].name
    : "Wisata";

  const region = attraction.destination
    ? `${attraction.destination.name}, ${attraction.destination.province?.name || ""}`
    : attraction.region || "Indonesia";

  const tags = attraction.tags || [
    primaryCat,
    "Populer",
    "Destinasi",
    "Liburan",
  ];
  const shortDesc =
    attraction.description ||
    attraction.shortDesc ||
    attraction.desc ||
    `Wisata populer ${attraction.name} yang berada di kawasan ${region}.`;

  return (
    <section style={ds.section}>
      <div style={ds.hdrBadgeRow}>
        <span
          style={{
            ...ds.catBadge,
            background: attraction.catBg || "#D9F2DA",
            color: attraction.catFg || "#2D8838",
          }}
        >
          {"\uD83E\uDEA8"} {primaryCat}
        </span>
        <span
          style={{
            ...ds.catBadge,
            background: "#FFF4D9",
            color: "#B47A00",
          }}
        >
          {"\u26F0"} Destinasi Pilihan
        </span>
      </div>
      <h1 style={ds.hdrTitle}>{attraction.name}</h1>
      <div style={ds.hdrMetaRow}>
        <span style={ds.hdrMetaItem}>
          <Pin /> {region}
        </span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            attraction.name + " " + region,
          )}`}
          target="_blank"
          rel="noreferrer"
          style={ds.hdrMetaLink}
        >
          Lihat di Google Maps {"\u2192"}
        </a>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <a
          href="#reviews"
          style={{
            ...ds.hdrMetaItem,
            color: "var(--atr-text)",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "var(--atr-yellow)" }}>{"\u2B50"}</span>{" "}
          <strong>{attraction.ratingAverage || 4.5}</strong>
          <span style={{ color: "var(--atr-text-muted)" }}>
            {" "}
            dari {(attraction.reviewsCount || 0).toLocaleString("id-ID")} ulasan
          </span>
        </a>
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
