"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import SectionCard from "./SectionCard";

const REGIONAL_ATTRACTIONS = {
  NTT: [
    {
      name: "Air Terjun Cunca Wulang",
      cat: "Air Terjun",
      catFg: "#1F6FB0",
      rating: 4.7,
      price: 25000,
      img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Bukit Cinta Labuan Bajo",
      cat: "Viewpoint",
      catFg: "#B85C00",
      rating: 4.6,
      price: 0,
      img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Sawah Lingko Spiderweb",
      cat: "Heritage",
      catFg: "#7E1D1D",
      rating: 4.8,
      price: 15000,
      img: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Gua Batu Cermin",
      cat: "Petualangan",
      catFg: "#7068D5",
      rating: 4.5,
      price: 20000,
      img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    },
  ],
  Bali: [
    {
      name: "Pura Kehen Bangli",
      cat: "Kuil & Budaya",
      catFg: "#7E1D1D",
      rating: 4.8,
      price: 30000,
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Tukad Cepung Waterfall",
      cat: "Air Terjun",
      catFg: "#1F6FB0",
      rating: 4.7,
      price: 15000,
      img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Hutan Bambu Penglipuran",
      cat: "Ekowisata",
      catFg: "#2D8838",
      rating: 4.6,
      price: 10000,
      img: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Kintamani Viewpoint",
      cat: "Pemandangan",
      catFg: "#B85C00",
      rating: 4.9,
      price: 25000,
      img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    },
  ],
  DIY: [
    {
      name: "Gunung Nglanggeran",
      cat: "Trekking",
      catFg: "#B85C00",
      rating: 4.8,
      price: 20000,
      img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Danau Embung Nglanggeran",
      cat: "Danau Buatan",
      catFg: "#1F6FB0",
      rating: 4.6,
      price: 15000,
      img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    },
    {
      name: "Air Terjun Sri Gethuk",
      cat: "Air Terjun",
      catFg: "#1F6FB0",
      rating: 4.5,
      price: 25000,
      img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    },
  ],
};

const DEFAULT_ATTRACTIONS = [
  {
    name: "Bukit Pemandangan Alam",
    cat: "Viewpoint",
    catFg: "#B85C00",
    rating: 4.6,
    price: 0,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Air Terjun Jernih Lestari",
    cat: "Air Terjun",
    catFg: "#1F6FB0",
    rating: 4.7,
    price: 15000,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Sawah Hijau Terasering",
    cat: "Alam",
    catFg: "#2D8838",
    rating: 4.8,
    price: 10000,
    img: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
  },
];

function MiniAttractionCard({ a }) {
  return (
    <div style={ds.miniCard}>
      <img src={a.img} alt={a.name} style={ds.miniImg} />
      <div style={ds.miniBody}>
        <span style={{ ...ds.miniCat, color: a.catFg }}>{a.cat}</span>
        <span style={ds.miniName}>{a.name}</span>
        <div style={ds.miniMeta}>
          <span style={ds.miniRating}>
            {"\u2605"} <strong>{a.rating}</strong>
          </span>
          <span style={ds.miniPrice}>
            {a.price === 0 ? "Gratis" : `Rp ${(a.price / 1000).toFixed(0)}rb`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VillageAttractions({ village }) {
  // Determine list based on region
  const region = village.region || "";
  let list = DEFAULT_ATTRACTIONS;
  if (region.includes("NTT")) {
    list = REGIONAL_ATTRACTIONS.NTT;
  } else if (region.includes("Bali")) {
    list = REGIONAL_ATTRACTIONS.Bali;
  } else if (region.includes("DIY") || region.includes("Yogyakarta")) {
    list = REGIONAL_ATTRACTIONS.DIY;
  }

  return (
    <SectionCard
      title="Atraksi di Sekitar Desa"
      icon={"\uD83D\uDCCD"}
      eyebrow={`Atraksi yang bisa dikunjungi di sekitar area ${village.name}`}
      link="/"
    >
      <div style={ds.hScroll}>
        {list.map((a, i) => (
          <MiniAttractionCard key={i} a={a} />
        ))}
      </div>
    </SectionCard>
  );
}
