"use client";

import React from "react";
import Link from "next/link";
import tc from "../tab-card-styles";
import CardImageWithBadge from "../molecules/CardImageWithBadge";
import CardInfo from "../atoms/CardInfo";
import CardBudget from "../molecules/CardBudget";
import CardCreatorInfo from "../molecules/CardCreatorInfo";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ItineraryCard({ it }) {
  const themeColor = "#FFE9D6";
  const themeFg = "#B85C00";
  const badges = [
    { style: tc.itinDaysBadge, node: `${it.days} Hari` },
    {
      style: { ...tc.itinThemeBadge, background: themeColor, color: themeFg },
      node: it.tag,
    },
  ];

  return (
    <Link href={`/explore/itinerary/${it.slug || slugify(it.title)}`} style={{ ...tc.itinCard, textDecoration: "none", color: "inherit" }}>
      <CardImageWithBadge src={it.img} alt={it.title} badges={badges} />
      <div style={tc.cardBody}>
        <h3 style={tc.cardName}>{it.title}</h3>
        <p style={tc.cardDesc}>{it.desc || ""}</p>
        <CardInfo items={[it.city].filter(Boolean)} />
        <CardBudget
          value={`~Rp ${(it.budget / 1000000).toFixed(1)}jt`}
          suffix="orang"
        />
        <div style={tc.itinFooter}>
          <CardCreatorInfo
            src={it.avatar || "https://i.pravatar.cc/60?img=32"}
            name={it.author || "Atourin Official"}
            role={it.authorType || "Official"}
          />
          <div style={tc.itinRatingBlock}>★ <strong>{it.rating}</strong></div>
        </div>
      </div>
    </Link>
  );
}
