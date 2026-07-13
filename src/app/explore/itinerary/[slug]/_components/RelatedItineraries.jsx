"use client";

import React from "react";
import { useRouter } from "next/navigation";
import detailStyles from "@/styles/itinerary-detail-styles";

const IMG = {
  lombok: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=70",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
  bromo: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  raja: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
};

export default function RelatedItineraries() {
  const router = useRouter();
  const items = [
    {
      img: IMG.bali,
      meta: "Bali",
      title: "Liburan Seru di Bali — Ubud & Kuta",
      rating: "4.8",
      price: "Rp 2.500.000",
    },
    {
      img: IMG.bromo,
      meta: "Jawa Timur",
      title: "Petualangan Bromo Midnight",
      rating: "4.7",
      price: "Rp 1.750.000",
    },
    {
      img: IMG.raja,
      meta: "Papua",
      title: "Ekspedisi Raja Ampat 5 Hari",
      rating: "4.9",
      price: "Rp 8.900.000",
    },
    {
      img: IMG.lombok,
      meta: "NTB",
      title: "Trekking Rinjani 3D2N",
      rating: "4.8",
      price: "Rp 3.200.000",
    },
  ];

  return (
    <div style={detailStyles.relatedWrap}>
      <div style={detailStyles.relatedHeader}>
        <div>
          <div style={detailStyles.aboutEyebrow}>Jelajahi Lainnya</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--atr-text)",
              letterSpacing: "-0.01em",
            }}
          >
            Itinerary Terkait
          </div>
        </div>
        <button
          onClick={() => router.push("/explore/itinerary")}
          style={detailStyles.relatedLink}
        >
          Lihat Semua
        </button>
      </div>
      <div style={detailStyles.relatedGrid}>
        {items.map((item, i) => (
          <div key={i} style={{...detailStyles.relCard, cursor: "pointer"}} onClick={() => router.push(`/explore/itinerary/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`)} >
            <img src={item.img} alt={item.title} style={detailStyles.relImg} />
            <div style={detailStyles.relBody}>
              <div style={detailStyles.relMeta}>{item.meta}</div>
              <div style={detailStyles.relTitle}>{item.title}</div>
              <div style={detailStyles.relFooter}>
                <span style={detailStyles.relRating}>
                  {"\u2B50"} {item.rating}
                </span>
                <span style={detailStyles.relPrice}>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
