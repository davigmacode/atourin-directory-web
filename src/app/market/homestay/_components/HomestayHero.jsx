"use client";

import React from "react";
import { pesanStyles } from "@/styles/pesan-styles";

const ID_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function fmtDate(d) {
  if (!d) return "Pilih";
  return `${d.getDate()} ${ID_MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function diffNights(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

const homestayStyles = {
  hero: {
    position: "relative",
    minHeight: 420,
    overflow: "hidden",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, rgba(31,27,51,0.66) 0%, rgba(31,27,51,0.36) 50%, rgba(112,104,213,0.3) 100%)",
  },
  heroInner: {
    position: "relative",
    maxWidth: 1376,
    margin: "0 auto",
    padding: "60px 32px 56px",
    display: "grid",
    gridTemplateColumns: "1.1fr 460px",
    gap: 48,
    alignItems: "center",
    minHeight: 420,
  },
  heroCopy: { color: "#fff" },
  heroTitle: {
    fontSize: 52,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: 17,
    color: "rgba(255,255,255,0.86)",
    margin: "16px 0 0",
    maxWidth: 480,
    lineHeight: 1.5,
  },
  bookingCard: {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 24px 56px rgba(31,27,51,0.28)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  dateRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "var(--atr-bg-soft)",
    borderRadius: 12,
    padding: "12px 16px",
    border: "1.5px solid var(--atr-purple)",
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    width: "100%",
  },
  dateIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    background: "rgba(112,104,213,0.12)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "var(--atr-text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  dateVal: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)", marginTop: 2 },
  guestBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "var(--atr-bg-soft)",
    borderRadius: 12,
    padding: "12px 14px",
    border: "1px solid var(--atr-outline)",
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    textAlign: "left",
  },
  searchSubmit: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "var(--atr-purple)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 22px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    boxShadow: "0 6px 16px rgba(112,104,213,0.34)",
  },
};

function Stat({ label, n }) {
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{n}</div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.78)",
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function HomestayBookingCard({ state }) {
  const nights = diffNights(state.checkIn, state.checkOut);
  return (
    <div style={homestayStyles.bookingCard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--atr-bg-soft)",
          borderRadius: 12,
          padding: "12px 16px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          placeholder="Cari homestay atau lokasi…"
          value={state.query}
          onChange={(e) => state.setQuery(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            flex: 1,
            fontSize: 14,
            fontFamily: "var(--atr-font-sans)",
          }}
        />
      </div>

      <button style={homestayStyles.dateRow} onClick={() => state.setOpenDate(true)}>
        <span style={homestayStyles.dateIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="var(--atr-purple)" strokeWidth="1.6" />
            <path d="M3.5 10h17M8 3v4M16 3v4" stroke="var(--atr-purple)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div style={homestayStyles.dateLabel}>Check-in</div>
            <div style={homestayStyles.dateVal}>{state.checkIn ? fmtDate(state.checkIn) : "Pilih"}</div>
          </div>
          <svg width="20" height="14" viewBox="0 0 24 14" fill="none">
            <path
              d="M2 7h18m0 0l-5-5m5 5l-5 5"
              stroke="var(--atr-purple)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ textAlign: "left" }}>
            <div style={homestayStyles.dateLabel}>Check-out</div>
            <div style={homestayStyles.dateVal}>{state.checkOut ? fmtDate(state.checkOut) : "Pilih"}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={homestayStyles.dateLabel}>Durasi</div>
            <div style={{ ...homestayStyles.dateVal, color: "var(--atr-purple)" }}>
              {nights > 0 ? `${nights} malam` : ", "}
            </div>
          </div>
        </div>
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12 }}>
        <button style={homestayStyles.guestBtn} onClick={() => state.setOpenGuests(true)}>
          <span style={homestayStyles.dateIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="8" r="3" stroke="var(--atr-purple)" strokeWidth="1.6" />
              <circle cx="17" cy="9" r="2.4" stroke="var(--atr-purple)" strokeWidth="1.6" />
              <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4" stroke="var(--atr-purple)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--atr-text)" }}>
            {state.rooms} Kamar, {state.guests} Tamu
          </span>
        </button>
        <button style={homestayStyles.searchSubmit} onClick={() => state.setQuery(state.query)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Cari Homestay
        </button>
      </div>
    </div>
  );
}

export default function HomestayHero({ state, heroBg }) {
  return (
    <section style={homestayStyles.hero}>
      <img src={heroBg} alt="" style={homestayStyles.heroImg} />
      <div style={homestayStyles.heroOverlay} />
      <div style={homestayStyles.heroInner}>
        <div style={homestayStyles.heroCopy}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "6px 14px",
              borderRadius: 999,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              backdropFilter: "blur(8px)",
              marginBottom: 18,
            }}
          >
            🏠 1.840+ homestay terverifikasi
          </div>
          <h1 style={homestayStyles.heroTitle}>
            Temukan Homestay <br />
            Impianmu
          </h1>
          <p style={homestayStyles.heroSubtitle}>
            Ribuan pilihan akomodasi nyaman dengan harga terbaik di seluruh Indonesia
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
            <Stat label="Provinsi" n="34" />
            <Stat label="Desa Wisata" n="320+" />
            <Stat label="Rating ⭐" n="4.8" />
          </div>
        </div>

        <HomestayBookingCard state={state} />
      </div>
    </section>
  );
}
