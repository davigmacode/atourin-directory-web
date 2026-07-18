"use client";

import React from "react";
import tc from "../tab-card-styles";
import CardImageWithBadge from "../molecules/CardImageWithBadge";
import StatusDot from "../atoms/StatusDot";

const DESA_STATUS_COLOR = {
  Rintisan: { bg: "#F0F0F0", fg: "#5C5C5C" },
  Berkembang: { bg: "#FFF4D9", fg: "#B47A00" },
  Maju: { bg: "#D4ECF4", fg: "#1F6FB0" },
  Mandiri: { bg: "#D9F2DA", fg: "#2D8838" },
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function DesaCard({ d }) {
  const sc = DESA_STATUS_COLOR[d.adwi] || DESA_STATUS_COLOR.Rintisan;
  const badges = [
    {
      style: { ...tc.desaStatus, background: sc.bg, color: sc.fg },
      node: (
        <>
          <StatusDot color={sc.fg} /> {d.adwi}
        </>
      ),
    },
  ];

  return (
    <a
      href={`/explore/tourism-villages/${slugify(d.name)}`}
      style={{ ...tc.desaCard, textDecoration: "none", color: "inherit" }}
    >
      <CardImageWithBadge src={d.img} alt={d.name} badges={badges} />
      <div style={tc.cardBody}>
        <h3 style={tc.cardName}>{d.name}</h3>
        <div style={tc.cardLoc}>📍 {d.region}</div>
        {d.signature && <p style={tc.cardDesc}>{`Dikenal dengan ${d.signature}.`}</p>}
        {d.theme && (
          <div style={tc.desaTagRow}>
            <span style={tc.desaTag}>{d.theme}</span>
          </div>
        )}
        <div style={tc.desaHighlight}>
          🌿 <strong>{d.activities?.length || 0}</strong> aktivitas
          {d.featured && " · 🏡 Homestay tersedia"}
        </div>
        <div style={tc.cardFooter}>
          <span style={tc.cardRating}>★ <strong>{d.rating}</strong></span>
          <button style={tc.cardCta}>Lihat profil →</button>
        </div>
      </div>
    </a>
  );
}
