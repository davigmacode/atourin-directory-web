"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { hm } from "@/styles/home-styles";
import { HI } from "./HomeCards";

export default function Hero({ accent }) {
  const router = useRouter();
  const [tab, setTab] = useState("experience");
  const [query, setQuery] = useState("");

  const tabs = [
    { id: "experience", label: "Experience", icon: HI.sparkle, href: "/market/experience" },
    { id: "attraction", label: "Attraction", icon: HI.camera, href: "/market/attractions" },
    { id: "homestay", label: "Homestay", icon: HI.home, href: "/market/homestay" },
  ];

  const quick = ["Komodo Sailing", "Labuan Bajo", "Yogyakarta", "Desa Wisata", "Open Trip"];

  function handleSearch() {
    const selectedTab = tabs.find((t) => t.id === tab);
    if (query.trim()) {
      router.push(`${selectedTab.href}?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(selectedTab.href);
    }
  }

  return (
    <section style={hm.hero}>
      <img
        src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&auto=format&fit=crop&q=70"
        alt=""
        style={hm.heroImg}
      />
      <div style={hm.heroScrim} />
      <div style={hm.heroInner}>
        <span style={hm.heroBadge}>🇮🇩 #JelajahNusantara bareng Atourin</span>
        <h1 style={hm.heroTitle}>Temukan pengalaman wisata otentik di seluruh Indonesia</h1>
        <p style={hm.heroSub}>
          Pesan experience, tiket atraksi, homestay, dan desa wisata, ditemani pemandu lokal
          bersertifikat.
        </p>

        <div style={hm.searchCard}>
          <div style={hm.searchTabs}>
            {tabs.map((t) => (
              <button
                key={t.id}
                style={{ ...hm.searchTab, ...(tab === t.id ? hm.searchTabOn : {}) }}
                onClick={() => setTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <div style={hm.searchRow}>
            <span style={{ color: "var(--atr-text-muted)", display: "inline-flex" }}>{HI.search}</span>
            <input
              style={hm.searchInput}
              placeholder={`Cari ${tabs
                .find((t) => t.id === tab)
                .label.toLowerCase()}, destinasi, atau tempat wisata`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button style={{ ...hm.searchBtn, background: accent }} onClick={handleSearch}>
              {HI.search} Cari
            </button>
          </div>
        </div>

        <div style={hm.heroChips}>
          <span style={hm.heroChipLabel}>Populer:</span>
          {quick.map((q) => (
            <button
              key={q}
              style={hm.heroChip}
              className="hm-herochip"
              onClick={() => {
                setQuery(q);
                router.push(`/explore-hub?q=${encodeURIComponent(q)}`);
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
