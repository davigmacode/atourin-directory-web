"use client";

import React from "react";
import { Breadcrumb } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";

function PlusIcon({ color = "var(--atr-text)" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stat({ n, label }) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

export default function ItineraryHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Itinerary"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Rencana perjalanan,{" "}
            <span style={{ color: "var(--atr-purple)" }}>siap pakai.</span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Ribuan itinerary kurasi dari traveler & tour guide lokal di seluruh
            Indonesia. Salin, ubah, bagikan, atau bikin sendiri dari nol.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <button style={dirStyles.heroPrimary}>
              <PlusIcon color="#fff" /> Buat itinerary baru
            </button>
            <button style={dirStyles.heroSecondary}>Lihat tutorial</button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="2.4K+" label="Itinerary publik" />
            <Stat n="180+" label="Kota & destinasi" />
            <Stat n="850+" label="Kreator lokal" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={dirStyles.heroIllustrationCard}>
            <div style={dirStyles.dayPill}>Hari 2 / 5</div>
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={dirStyles.heroImg1}
            />
            <div style={dirStyles.heroFloatCard}>
              <div style={dirStyles.heroFloatTime}>09:30</div>
              <div>
                <div style={dirStyles.heroFloatTitle}>Pura Tirta Empul</div>
                <div style={dirStyles.heroFloatMeta}>
                  2 jam {"\u00B7"} Tampaksiring
                </div>
              </div>
              <div style={dirStyles.heroFloatTag}>Culture</div>
            </div>
            <div style={dirStyles.heroFloatCard2}>
              <div style={dirStyles.heroFloatTime}>13:00</div>
              <div>
                <div style={dirStyles.heroFloatTitle}>
                  Warung Babi Guling Pak Malen
                </div>
                <div style={dirStyles.heroFloatMeta}>
                  1 jam {"\u00B7"} Sunset Road
                </div>
              </div>
              <div
                style={{
                  ...dirStyles.heroFloatTag,
                  background: "#FFF4D9",
                  color: "#B47A00",
                }}
              >
                Food
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
