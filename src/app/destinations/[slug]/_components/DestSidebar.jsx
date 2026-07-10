"use client";

import React, { useState, useCallback } from "react";
import dh from "@/styles/destination-detail";
import { WEATHER_ICONS, WEATHER_COND } from "./DestHero";

export default function DestSidebar({ dest }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <aside style={dh.sidebar}>
      <a href="#" style={dh.sbCtaCard}>
        <div style={dh.sbCtaIcon}>🛒</div>
        <div>
          <div style={dh.sbCtaTitle}>Lihat semua produk di {dest.name}</div>
          <div style={dh.sbCtaSub}>
            {dest.marketProducts || 0} paket aktif di Marketplace
          </div>
        </div>
      </a>
      <a
        href="#"
        style={{
          ...dh.sbCtaCard,
          background: "#FFF9E9",
          borderColor: "#FFE9A8",
        }}
      >
        <div style={{ ...dh.sbCtaIcon, background: "#fff" }}>👤</div>
        <div>
          <div style={dh.sbCtaTitle}>Cari pemandu di {dest.name}</div>
          <div style={dh.sbCtaSub}>{dest.guide} pemandu terverifikasi</div>
        </div>
      </a>

      <div style={dh.sbCard}>
        <div style={dh.sbCardTitle}>Cuaca minggu ini</div>
        <div style={dh.sbWeatherMain}>
          <span style={dh.sbWeatherIcon}>
            {WEATHER_ICONS[Math.floor(Math.random() * WEATHER_ICONS.length)]}
          </span>
          <div>
            <div style={dh.sbWeatherTemp}>
              {Math.floor(Math.random() * 8) + 26}°C
            </div>
            <div style={dh.sbWeatherCond}>
              {WEATHER_COND[Math.floor(Math.random() * WEATHER_COND.length)]}
            </div>
          </div>
        </div>
        <div style={dh.sbForecastRow}>
          {[
            { d: "Sel", t: 30, i: "☀️" },
            { d: "Rab", t: 29, i: "⛅" },
            { d: "Kam", t: 28, i: "🌦️" },
          ].map((f) => (
            <div key={f.d} style={dh.sbForecast}>
              <div style={dh.sbForecastDay}>{f.d}</div>
              <div style={dh.sbForecastIcon}>{f.i}</div>
              <div style={dh.sbForecastTemp}>{f.t}°</div>
            </div>
          ))}
        </div>
      </div>

      <div style={dh.sbCard}>
        <div style={dh.sbCardTitle}>Bagikan destinasi ini</div>
        <div style={dh.sbShareRow}>
          <button
            style={{ ...dh.sbShareBtn, color: "#25D366" }}
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(dest.name + " " + window.location.href)}`,
              )
            }
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 19l1.5-4A8 8 0 1 1 9 19l-4 0z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            WhatsApp
          </button>
          <button
            style={{ ...dh.sbShareBtn, color: "var(--atr-text)" }}
            onClick={handleCopyLink}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            {copied ? "Tersalin!" : "Salin link"}
          </button>
        </div>
      </div>
    </aside>
  );
}
