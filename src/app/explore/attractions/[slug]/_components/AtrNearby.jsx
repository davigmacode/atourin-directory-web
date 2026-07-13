"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard, MiniAttractionCard } from "./Shared";

const NEARBY = [
  {
    name: "Pink Beach",
    cat: "Pantai",
    catFg: "#C44949",
    rating: 4.85,
    price: 50000,
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Manta Point",
    cat: "Bahari",
    catFg: "#1F6FB0",
    rating: 4.95,
    price: 200000,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Pulau Komodo",
    cat: "Alam",
    catFg: "#2D8838",
    rating: 4.92,
    price: 150000,
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
  },
];

export default function AtrNearby({ attraction }) {
  const regionParts = attraction.region ? attraction.region.split(",") : [];
  const kota = regionParts[0] ? regionParts[0].trim() : "Sekitar";

  return (
    <SectionCard
      title={"Atraksi Lain di " + kota}
      icon={"🗺️"}
      link="/explore/attractions"
      linkLabel={"Lihat semua atraksi di " + kota}
    >
      <div style={ds.hScroll}>
        {NEARBY.map((a, i) => (
          <MiniAttractionCard key={i} a={a} />
        ))}
      </div>
    </SectionCard>
  );
}
