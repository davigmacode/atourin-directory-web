"use client";

import React, { useState } from "react";
import { pr, PROMO_TONE } from "@/styles/promo-styles";
import { PROMO_CATS } from "@/data/promo-data";

function IcClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IcTag() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M3 11.5V5a2 2 0 012-2h6.5L21 12.5 12.5 21 3 11.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IcCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}
function IcArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PromoCard({ p, onOpen }) {
  const tone = PROMO_TONE[p.badgeTone] || PROMO_TONE.purple;
  const [copied, setCopied] = useState(false);
  function copy(e) {
    e.stopPropagation();
    try {
      navigator.clipboard?.writeText(p.code);
    } catch (err) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <div className="atr-promo-card" style={pr.card}>
      <div style={pr.cardMedia}>
        <img
          src={p.image}
          alt=""
          style={pr.cardImg}
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
        <div style={pr.cardImgScrim} />
        <span style={{ ...pr.cardBadge, background: tone.bg }}>{p.badge}</span>
      </div>
      <div style={pr.cardBody}>
        <span style={pr.cardPeriod}>
          <IcClock /> {p.period}
        </span>
        <div style={pr.cardTitle}>{p.title}</div>
        <div style={pr.cardDesc}>{p.desc}</div>
        <span style={pr.cardMin}>
          <IcTag /> {p.min}
        </span>

        <div style={pr.codeRow}>
          <div style={{ minWidth: 0 }}>
            <div style={pr.codeLabel}>Kode promo</div>
            <div style={pr.codeVal}>{p.code}</div>
          </div>
          <button style={pr.codeCopy} onClick={copy}>
            <IcCopy /> {copied ? "Tersalin" : "Salin"}
          </button>
        </div>

        <button className="atr-promo-cta" style={pr.cardCta} onClick={() => onOpen(p)}>
          Lihat Promo <IcArrow />
        </button>
      </div>
    </div>
  );
}

export default function PromoGrid({ cat, filtered, onOpen }) {
  const catLabel = (PROMO_CATS.find((c) => c.id === cat) || {}).label;

  return (
    <div style={pr.gridWrap}>
      <div style={pr.resultHead}>
        <div style={pr.resultTitle}>{cat === "semua" ? "Semua Promo" : `Promo ${catLabel}`}</div>
        <div style={pr.resultCount}>{filtered.length} promo tersedia</div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--atr-text-muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--atr-text)" }}>Promo tidak ditemukan</div>
          <div style={{ fontSize: 13, marginTop: 5 }}>Coba kata kunci atau kategori lain.</div>
        </div>
      ) : (
        <div style={pr.grid}>
          {filtered.map((p) => (
            <PromoCard key={p.id} p={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
