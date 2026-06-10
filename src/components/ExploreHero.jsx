'use client';

import React, { useState, useEffect } from 'react';
import ex from '@/styles/explore-styles';
import { HERO_BGS } from '@/data/explore-data';

export default function ExploreHero() {
  const [bgIdx, setBgIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setBgIdx((i) => (i + 1) % HERO_BGS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const chips = ['Alam', 'Budaya', 'Petualangan', 'Kuliner', 'Religi', 'Heritage', 'Bahari'];
  return (
    <section style={ex.hero}>
      {HERO_BGS.map((b, i) => (
        <div key={i} style={{ ...ex.heroBg, backgroundImage: `url(${b})`, opacity: i === bgIdx ? 1 : 0 }} />
      ))}
      <div style={ex.heroOverlay} />
      <div style={ex.heroDots}>
        {HERO_BGS.map((_, i) => (
          <button key={i} onClick={() => setBgIdx(i)} style={{ ...ex.heroDot, ...(i === bgIdx ? ex.heroDotActive : {}) }} />
        ))}
      </div>
      <div style={ex.heroContent}>
        <h1 style={ex.heroTitle}>Jelajahi Wisata Nusantara</h1>
        <p style={ex.heroSub}>Temukan destinasi, desa wisata, atraksi, dan pemandu terbaik di seluruh Indonesia</p>
        <div style={ex.searchWrap}>
          <div style={ex.searchInner}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" /></svg>
            <input
              style={ex.searchInput}
              placeholder="Cari destinasi, atraksi, desa wisata..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
            />
            <button style={ex.searchBtn} onClick={() => alert(`Cari: ${query}`)}>Cari</button>
          </div>
          {focused && query && (
            <div style={ex.autocomplete}>
              {[
                { cat: 'Destinasi', items: ['Bali', 'Yogyakarta', 'Lombok Tengah'] },
                { cat: 'Desa Wisata', items: ['Penglipuran', 'Pentingsari'] },
                { cat: 'Itinerary', items: ['Lombok Lengkap 3D2N', 'Bali Slow Travel'] },
              ].map((g) => (
                <div key={g.cat}>
                  <div style={ex.acGroup}>{g.cat}</div>
                  {g.items.filter(x => x.toLowerCase().includes(query.toLowerCase())).map((it) => (
                    <a key={it} href="/" style={ex.acItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z" stroke="var(--atr-purple)" strokeWidth="1.8" /></svg>
                      {it}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={ex.heroChips}>
          {chips.map((c) => (
            <a key={c} href="/" style={ex.heroChip}>{c}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
