"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ex from "@/styles/explore-styles";

export default function ExploreHero({ heroBgs = [], isLoading = false }) {
  const [bgIdx, setBgIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!isLoading && heroBgs.length > 0) {
      const t = setInterval(
        () => setBgIdx((i) => (i + 1) % heroBgs.length),
        6000,
      );
      return () => clearInterval(t);
    }
  }, [isLoading, heroBgs.length]);
  const chips = [
    "Alam",
    "Budaya",
    "Petualangan",
    "Kuliner",
    "Religi",
    "Heritage",
    "Bahari",
  ];

  const getItemRoute = (cat, item) => {
    const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (cat === "Destinasi") return `/explore/destinations/${slug}`;
    if (cat === "Desa Wisata") return `/explore/tourism-villages/${slug}`;
    if (cat === "Itinerary") return `/explore/itinerary/${slug}`;
    return "/explore";
  };

  const getChipRoute = (chip) => {
    return `/explore/attractions?category=${encodeURIComponent(chip)}`;
  };

  if (isLoading) {
    return (
      <section
        style={{
          position: "relative",
          minHeight: 580,
          overflow: "hidden",
          background: "#1F1B33",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--atr-outline)",
            animation: "atr-shimmer 2s ease-in-out infinite",
            opacity: 0.15,
          }}
        />
      </section>
    );
  }

  return (
    <section style={ex.hero}>
      {heroBgs.map((b, i) => (
        <div
          key={i}
          style={{
            ...ex.heroBg,
            backgroundImage: `url(${b})`,
            opacity: i === bgIdx ? 1 : 0,
          }}
        />
      ))}
      <div style={ex.heroOverlay} />
      <div style={ex.heroDots}>
        {heroBgs.map((_, i) => (
          <button
            key={i}
            onClick={() => setBgIdx(i)}
            style={{ ...ex.heroDot, ...(i === bgIdx ? ex.heroDotActive : {}) }}
          />
        ))}
      </div>
      <div style={ex.heroContent}>
        <h1 style={ex.heroTitle}>Jelajahi Wisata Nusantara</h1>
        <p style={ex.heroSub}>
          Temukan destinasi, desa wisata, atraksi, dan pemandu terbaik di
          seluruh Indonesia
        </p>
        <div style={ex.searchWrap}>
          <div style={ex.searchInner}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={ex.searchInput}
              placeholder="Cari destinasi, atraksi, desa wisata..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
            />
            <button
              style={ex.searchBtn}
              onClick={() => alert(`Cari: ${query}`)}
            >
              Cari
            </button>
          </div>
          {focused && query && (
            <div style={ex.autocomplete}>
              {[
                {
                  cat: "Destinasi",
                  items: ["Bali", "Yogyakarta", "Lombok Tengah"],
                },
                { cat: "Desa Wisata", items: ["Penglipuran", "Pentingsari"] },
                {
                  cat: "Itinerary",
                  items: ["Lombok Lengkap 3D2N", "Bali Slow Travel"],
                },
              ].map((g) => (
                <div key={g.cat}>
                  <div style={ex.acGroup}>{g.cat}</div>
                  {g.items
                    .filter((x) =>
                      x.toLowerCase().includes(query.toLowerCase()),
                    )
                    .map((it) => (
                      <Link key={it} href={getItemRoute(g.cat, it)} style={{ ...ex.acItem, textDecoration: "none" }}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
                            stroke="var(--atr-purple)"
                            strokeWidth="1.8"
                          />
                        </svg>
                        {it}
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={ex.heroChips}>
          {chips.map((c) => (
            <Link key={c} href={getChipRoute(c)} style={{ ...ex.heroChip, textDecoration: "none" }}>
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
