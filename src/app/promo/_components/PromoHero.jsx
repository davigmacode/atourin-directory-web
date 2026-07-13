"use client";

import React from "react";
import { pr } from "@/styles/promo-styles";
import { PROMO_SEARCH_HINTS } from "@/data/promo-data";

function IcSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function PromoHero({ q, setQ }) {
  return (
    <section style={pr.hero}>
      <span style={{ ...pr.heroBlob, width: 280, height: 280, top: -90, right: -40 }} />
      <span style={{ ...pr.heroBlob, width: 180, height: 180, bottom: -70, left: "32%" }} />
      <div style={pr.heroInner}>
        <div style={pr.heroKicker}>🎟️ Promo &amp; Penawaran</div>
        <h1 style={pr.heroTitle}>Cari Promo untuk Liburan Kamu</h1>
        <p style={pr.heroSub}>Apa pun rencana jalan-jalanmu, temukan penawaran terbaik dari Atourin di sini.</p>

        <div style={pr.searchWrap}>
          <span style={pr.searchIcon}>
            <IcSearch />
          </span>
          <input
            style={pr.searchInput}
            placeholder="Ketik promo yang kamu mau (cth. diskon tiket, hotel, dll)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            style={pr.searchBtn}
            onClick={() =>
              alert(q ? "Mencari promo: " + q : "Menampilkan semua promo")
            }
          >
            <IcSearch /> Cari
          </button>
        </div>

        <div style={pr.hintRow}>
          <span style={pr.hintLabel}>Coba cari:</span>
          {PROMO_SEARCH_HINTS.map((h) => (
            <button key={h} className="atr-hint" style={pr.hintChip} onClick={() => setQ(h)}>
              {h}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
