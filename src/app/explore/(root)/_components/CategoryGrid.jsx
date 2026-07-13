"use client";

import React from "react";
import Link from "next/link";
import ex from "@/styles/explore-styles";

export default function CategoryGrid({ categories = [], isLoading = false }) {
  const getCategoryRoute = (c) => {
    if (c.id === "desa-wisata") return "/explore/tourism-villages";
    if (c.id === "itinerary") return "/explore/itinerary";
    if (c.id === "tour-guide") return "/explore/tour-guides";
    if (c.id === "destinasi") return "/explore/destinations";
    if (c.id === "atraksi") return "/explore/attractions";
    // Otherwise, filter attractions by category
    return `/explore/attractions?category=${encodeURIComponent(c.name)}`;
  };

  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{"\uD83C\uDFAF"} Berdasarkan kategori</div>
          <h2 style={ex.secTitle}>Apa yang kamu cari?</h2>
        </div>
      </div>
      <div style={ex.catGrid}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={ex.catCard}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    background: "var(--atr-outline)",
                  }}
                />
                <div
                  style={{
                    height: 13,
                    background: "var(--atr-outline)",
                    borderRadius: 6,
                    width: "60%",
                  }}
                />
              </div>
            ))
          : categories.map((c) => (
              <Link key={c.name} href={getCategoryRoute(c)} style={{ ...ex.catCard, textDecoration: "none" }}>
                <div style={{ ...ex.catIcon, background: c.color }}>
                  {c.icon}
                </div>
                <div style={ex.catName}>{c.name}</div>
              </Link>
            ))}
      </div>
    </section>
  );
}
