"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cat } from "@/lib/i18n";
import dh from "@/styles/destination-detail";

export const WEATHER_ICONS = ["☀️", "⛅", "🌤️", "🌦️", "☁️"];
export const WEATHER_COND = [
  "Cerah",
  "Cerah berawan",
  "Berawan",
  "Hujan ringan",
  "Mendung",
];

export default function DestHero({ dest, covers }) {
  const [slide, setSlide] = useState(0);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % covers.length), 5000);
    return () => clearInterval(t);
  }, [covers.length]);

  const weatherIcon =
    WEATHER_ICONS[Math.floor(Math.random() * WEATHER_ICONS.length)];
  const weatherTemp = Math.floor(Math.random() * 8) + 26;
  const weatherCond =
    WEATHER_COND[Math.floor(Math.random() * WEATHER_COND.length)];

  return (
    <section style={dh.hero}>
      {covers.map((c, i) => (
        <div
          key={i}
          style={{
            ...dh.heroBg,
            backgroundImage: `url(${c})`,
            opacity: i === slide ? 1 : 0,
          }}
        />
      ))}
      <div style={dh.heroOverlay} />
      <div style={dh.heroDots}>
        {covers.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{ ...dh.heroDot, ...(i === slide ? dh.heroDotActive : {}) }}
          />
        ))}
      </div>
      <div style={dh.heroContent}>
        <div style={dh.heroCrumb}>
          <a
            href="/explore-hub"
            style={dh.heroCrumbLink}
            onClick={(e) => {
              e.preventDefault();
              router.push("/explore-hub");
            }}
          >
            Jelajahi
          </a>
          <span style={dh.heroCrumbSep}>›</span>
          <span style={dh.heroCrumbCurrent}>{dest.name}</span>
        </div>
        <div style={dh.heroBadgeRow}>
          <span style={dh.heroTypeBadge}>{dest.type}</span>
          <span style={dh.heroProvBadge}>{dest.province}</span>
          <span style={dh.heroIslandBadge}>{dest.island}</span>
        </div>
        <h1 style={dh.heroTitle}>{dest.name}</h1>
        <div style={dh.heroQuickStats}>
          <span style={dh.heroQsPill}>
            📍 <strong>{dest.attr}</strong> {cat("attraction", "Atraksi")}
          </span>
          <span style={dh.heroQsPill}>
            🌾 <strong>{dest.desa}</strong> {cat("village", "Desa Wisata")}
          </span>
          <span style={dh.heroQsPill}>
            🗺️ <strong>{dest.itin}</strong> {cat("itinerary", "Itinerary")}
          </span>
          <span style={dh.heroQsPill}>
            👤 <strong>{dest.guide}</strong> {cat("guide", "Pemandu")}
          </span>
        </div>
        <div style={dh.heroTagRow}>
          {(dest.tags || []).map((t) => (
            <span key={t} style={dh.heroTag}>
              {t}
            </span>
          ))}
        </div>
        <div style={dh.heroActions}>
          <div style={dh.heroWeather}>
            <span style={dh.heroWeatherIcon}>{weatherIcon}</span>
            <div>
              <div style={dh.heroWeatherTemp}>{weatherTemp}°C</div>
              <div style={dh.heroWeatherCond}>
                {weatherCond} · {dest.name}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            style={{ ...dh.heroIconBtn, ...(saved ? dh.heroIconBtnOn : {}) }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={saved ? "var(--atr-yellow)" : "none"}
            >
              <path
                d="M6 3h12v18l-6-4-6 4V3z"
                stroke={saved ? "var(--atr-yellow)" : "#fff"}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span>{saved ? "Tersimpan" : "Simpan"}</span>
          </button>
          <button
            style={dh.heroIconBtn}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: dest.name,
                  url: window.location.href,
                });
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="3" stroke="#fff" strokeWidth="1.8" />
              <circle cx="18" cy="6" r="3" stroke="#fff" strokeWidth="1.8" />
              <circle cx="18" cy="18" r="3" stroke="#fff" strokeWidth="1.8" />
              <path
                d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17"
                stroke="#fff"
                strokeWidth="1.8"
              />
            </svg>
            <span>Bagikan</span>
          </button>
        </div>
      </div>
    </section>
  );
}
