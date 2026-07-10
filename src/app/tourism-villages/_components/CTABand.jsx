"use client";

import React from "react";
import { cardStyles } from "@/styles/attraction-styles";

export default function CTABand() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #6F66D5 0%, #524BAA 100%)",
        marginTop: 80,
        borderRadius: 24,
        maxWidth: 1376,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          padding: "56px",
        }}
      >
        <div style={{ color: "#fff" }}>
          <div style={cardStyles.eyebrow}>{"\uD83D\uDEE0"} Bikin sendiri</div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginTop: 8,
              marginBottom: 14,
              color: "#fff",
            }}
          >
            Tidak nemu yang pas?
            <br />
            Susun itinerary kamu sendiri.
          </h2>
          <p
            style={{
              fontSize: 15,
              opacity: 0.85,
              lineHeight: 1.55,
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            Drag & drop aktivitas dari direktori Atourin, atau biarkan asisten
            AI menyusun draft awal untukmu dalam 30 detik.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: "var(--atr-purple)",
                border: "none",
                borderRadius: 10,
                padding: "14px 22px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="var(--atr-purple)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Mulai dari nol
            </button>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                padding: "14px 22px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Coba dengan AI
            </button>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}
