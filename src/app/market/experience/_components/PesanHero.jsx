"use client";

import React, { useRef, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

function SearchIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PurplePin({ size = 14, color = "var(--atr-purple)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        fill={color}
      />
      <circle cx="12" cy="9.5" r="2.5" fill="#fff" />
    </svg>
  );
}

function BlobDecor() {
  return (
    <svg style={pesanStyles.heroBlob} width="640" height="640" viewBox="0 0 640 640" fill="none">
      <circle cx="320" cy="320" r="240" fill="var(--atr-purple)" opacity="0.06" />
      <circle cx="450" cy="200" r="120" fill="var(--atr-yellow)" opacity="0.10" />
    </svg>
  );
}

function HeroCollage({ images = [] }) {
  return (
    <div style={pesanStyles.collage}>
      {images[0] && <img src={images[0]} alt="Collage 1" style={pesanStyles.collageImg1} />}
      {images[1] && <img src={images[1]} alt="Collage 2" style={pesanStyles.collageImg2} />}
      {images[2] && <img src={images[2]} alt="Collage 3" style={pesanStyles.collageImg3} />}
      <div style={pesanStyles.collageRatingPill}>
        <span style={{ fontSize: 24 }}>⭐</span>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--atr-text)", lineHeight: 1 }}>4.92</div>
          <div style={{ fontSize: 10, color: "var(--atr-text-muted)", marginTop: 2 }}>dari 28.4K ulasan</div>
        </div>
      </div>
      <div style={pesanStyles.collageDealPill}>
        <span
          style={{
            background: "var(--atr-yellow)",
            color: "#3D2900",
            fontSize: 10,
            fontWeight: 800,
            padding: "3px 8px",
            borderRadius: 4,
            letterSpacing: "0.04em",
          }}
        >
          HEMAT 30%
        </span>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--atr-text)", marginTop: 6 }}>
          Promo akhir tahun
        </div>
      </div>
    </div>
  );
}

function HeroSearch({ state, placeholder, suggestions }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        state.setShowSuggest(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [state]);

  const filteredSuggests = (suggestions || [])
    .filter((s) => s.title.toLowerCase().includes(state.query.toLowerCase()))
    .slice(0, 5);

  return (
    <div style={pesanStyles.heroSearchWrap} ref={wrapRef}>
      <SearchIconSvg />
      <input
        style={pesanStyles.searchInput}
        placeholder={placeholder}
        value={state.query}
        onChange={(e) => {
          state.setQuery(e.target.value);
          state.setShowSuggest(true);
        }}
        onFocus={() => state.query.length > 0 && state.setShowSuggest(true)}
      />
      {state.query.length > 0 && (
        <button
          style={pesanStyles.searchClear}
          onClick={() => {
            state.setQuery("");
            state.setShowSuggest(false);
          }}
        >
          <CloseIcon size={16} />
        </button>
      )}
      <button style={pesanStyles.searchBtn} onClick={() => state.setShowSuggest(false)}>
        Cari
      </button>
      {state.showSuggest && state.query.length > 0 && filteredSuggests.length > 0 && (
        <div style={pesanStyles.searchResults}>
          <div style={pesanStyles.searchHeader}>
            Hasil untuk "<strong style={{ color: "var(--atr-text)" }}>{state.query}</strong>"
          </div>
          {filteredSuggests.map((s, i) => (
            <button
              key={i}
              style={pesanStyles.searchResultItem}
              onClick={() => {
                state.setQuery(s.title);
                state.setShowSuggest(false);
              }}
            >
              <img src={s.img} alt="" style={pesanStyles.searchResultThumb} />
              <div>
                <div style={pesanStyles.searchResultTitle}>{s.title}</div>
                <div style={pesanStyles.searchResultMeta}>
                  <PurplePin size={12} /> {s.region}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PesanHero({
  title,
  subtitle,
  state,
  placeholder = "Cari pengalaman atau lokasi…",
  searchSuggestions = [],
  badge,
  heroImages = [],
  stats = [],
}) {
  return (
    <section style={pesanStyles.hero}>
      <div style={pesanStyles.heroInner}>
        <BlobDecor />
        <div style={pesanStyles.heroGrid}>
          <div style={pesanStyles.heroLeft}>
            {badge && (
              <div style={pesanStyles.heroBadge}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: "var(--atr-purple)",
                  }}
                />
                {badge}
              </div>
            )}
            <h1 style={pesanStyles.heroTitle}>{title}</h1>
            <p style={pesanStyles.heroSubtitle}>{subtitle}</p>
            <HeroSearch state={state} placeholder={placeholder} suggestions={searchSuggestions} />
            <div style={pesanStyles.heroStatRow}>
              {stats.map((s, i) => (
                <div key={i} style={pesanStyles.heroStatCard}>
                  <span style={pesanStyles.heroStatIcon}>{s.icon}</span>
                  <div>
                    <div style={pesanStyles.heroStatVal}>{s.value}</div>
                    <div style={pesanStyles.heroStatLabel}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={pesanStyles.heroRight}>
            <HeroCollage images={heroImages} />
          </div>
        </div>
      </div>
    </section>
  );
}
