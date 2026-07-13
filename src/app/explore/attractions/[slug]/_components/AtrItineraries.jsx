"use client";

import React from "react";
import Link from "next/link";
import { adStyles } from "@/styles/detail-styles";
import { SectionCard } from "./Shared";

const RELATED_ITIN = [
  {
    title: "Labuan Bajo Sailing 4D3N, Padar, Pink Beach & Komodo",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    days: "4H 3M",
    theme: "Adventure",
    themeFg: "#B85C00",
    themeBg: "#FFE9D6",
    stops: 9,
    budget: 5800000,
    rating: 4.95,
    creator: "Welli Wilyanto",
    creatorAv: "https://i.pravatar.cc/60?img=15",
  },
  {
    title: "Komodo One Day Tour, Padar & Pink Beach",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    days: "1H",
    theme: "Nature",
    themeFg: "#2D8838",
    themeBg: "#D9F2DA",
    stops: 4,
    budget: 1200000,
    rating: 4.88,
    creator: "Atourin Official",
    creatorAv: "https://i.pravatar.cc/60?img=32",
  },
];

export default function AtrItineraries({ attraction }) {
  return (
    <SectionCard
      title="Itinerary yang Melewati Sini"
      icon={"📓"}
      eyebrow={`Itinerary mencakup ${attraction.name}`}
      link="/explore/itinerary"
      linkLabel="Lihat semua itinerary"
    >
      <div style={adStyles.itinList}>
        {RELATED_ITIN.map((it, i) => {
          const slug = it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return (
            <Link key={i} href={`/explore/itinerary/${slug}`} style={{ ...adStyles.itinRow, textDecoration: "none", color: "inherit" }}>
              <img src={it.img} alt="" style={adStyles.itinImg} />
              <div style={adStyles.itinBody}>
                <div style={adStyles.itinBadgeRow}>
                  <span style={adStyles.itinDayBadge}>{it.days}</span>
                  <span
                    style={{
                      ...adStyles.itinThemeBadge,
                      background: it.themeBg,
                      color: it.themeFg,
                    }}
                  >
                    {it.theme}
                  </span>
                </div>
                <div style={adStyles.itinTitle}>{it.title}</div>
                <div style={adStyles.itinMetaRow}>
                  <span>{"📍"} {it.stops} tempat</span>
                  <span>{"\u00B7"}</span>
                  <span style={{ color: "var(--atr-text)" }}>
                    {"\u2B50"} <strong>{it.rating}</strong>
                  </span>
                  <span>{"\u00B7"}</span>
                  <span style={adStyles.itinCreator}>
                    <img
                      src={it.creatorAv}
                      alt=""
                      style={adStyles.itinCreatorAv}
                    />{" "}
                    {it.creator}
                  </span>
                </div>
              </div>
              <div style={adStyles.itinRight}>
                <span style={adStyles.itinPriceLabel}>Mulai dari</span>
                <span style={adStyles.itinPrice}>
                  Rp {(it.budget / 1000000).toFixed(1)}jt
                </span>
                <span style={{ fontSize: 11, color: "var(--atr-text-muted)" }}>
                  /orang
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}
