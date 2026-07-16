"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";

/* ── SVG icons ── */
export function Pin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ── Shared components ── */
export function StatusChip({ open }) {
  return (
    <span
      style={{ ...ds.statusChip, ...(open ? ds.statusOpen : ds.statusClosed) }}
    >
      <span
        style={{ ...ds.statusDot, background: open ? "#1F7A21" : "#8C2A2B" }}
      />
      {open ? "Buka Sekarang" : "Tutup"}
    </span>
  );
}

export function ReadMore({ text, clamp = 4 }) {
  const [open, setOpen] = useState(false);
  const clamped = { ...ds.longTextClamped, WebkitLineClamp: clamp };
  return (
    <div>
      <p style={open ? ds.longText : clamped}>{text}</p>
      <button style={ds.readMoreBtn} onClick={() => setOpen(!open)}>
        {open ? "Sembunyikan \u2191" : "Baca selengkapnya \u2193"}
      </button>
    </div>
  );
}

export function SectionCard({
  title,
  eyebrow,
  icon,
  link,
  linkLabel,
  children,
  style = {},
}) {
  return (
    <section style={{ ...ds.section, ...style }}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            {icon && <span>{icon}</span>}
            {title}
          </h2>
          {eyebrow && <div style={ds.sectionSub}>{eyebrow}</div>}
        </div>
        {link && (
          <a href={link} style={ds.sectionLink}>
            {linkLabel || "Lihat semua"} <span>{"\u2192"}</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

export function FacilityItem({ icon, label, available = true }) {
  const isEnglish = typeof window !== "undefined" && window.localStorage?.getItem("atr.lang") === "en";
  const notAvailableText = isEnglish ? "not available" : "tidak tersedia";

  return (
    <div style={{ ...ds.facItem, ...(available ? {} : ds.facItemOff) }}>
      <span style={ds.facIcon}>{icon}</span>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{ ...ds.facLabel, ...(available ? {} : ds.facStrike) }}>
          {label}
        </span>
        {!available && (
          <span style={{ fontSize: 10, color: "var(--atr-text-muted)", marginTop: 2, fontWeight: 500 }}>
            {notAvailableText}
          </span>
        )}
      </div>
    </div>
  );
}

export function RatingBreakdown({
  avg = 4.8,
  count = 0,
  dist = [78, 15, 4, 2, 1],
}) {
  return (
    <div style={ds.reviewTop}>
      <div style={ds.ratingSummary}>
        <div style={ds.ratingBig}>{avg.toFixed(1)}</div>
        <div style={ds.ratingStars}>{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <div style={ds.ratingCount}>
          dari {count.toLocaleString("id-ID")} ulasan
        </div>
      </div>
      <div style={ds.breakdownCol}>
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} style={ds.breakdownRow}>
            <span style={ds.breakdownStar}>
              {s} {"\u2605"}
            </span>
            <div style={ds.breakdownTrack}>
              <div style={{ ...ds.breakdownFill, width: `${dist[i]}%` }} />
            </div>
            <span style={ds.breakdownPct}>{dist[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewCard({ r }) {
  return (
    <div style={ds.reviewCard}>
      <img src={r.av} alt="" style={ds.reviewAv} />
      <div>
        <div style={ds.reviewHeader}>
          <div>
            <div style={ds.reviewName}>{r.name}</div>
            <div style={ds.reviewMeta}>
              <span style={ds.reviewStarRow}>{"\u2605".repeat(r.rating)}</span>
              <span>{" \u00B7 "}</span>
              <span>{r.date}</span>
              {r.trip && (
                <>
                  <span>{" \u00B7 "}</span>
                  <span>{r.trip}</span>
                </>
              )}
            </div>
          </div>
          {r.verified && (
            <span style={ds.reviewVerified}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Pembelian Terverifikasi
            </span>
          )}
        </div>
        <p style={ds.reviewText}>{r.text}</p>
        {r.photos && (
          <div style={ds.reviewPhotos}>
            {r.photos.map((p, i) => (
              <img key={i} src={p} alt="" style={ds.reviewPhoto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MiniAttractionCard({ a }) {
  return (
    <a href="/" style={ds.miniCard}>
      <img src={a.img} alt="" style={ds.miniImg} />
      <div style={ds.miniBody}>
        <span style={{ ...ds.miniCat, color: a.catFg }}>{a.cat}</span>
        <span style={ds.miniName}>{a.name}</span>
        <div style={ds.miniMeta}>
          <span style={ds.miniRating}>
            {"\u2605"} <strong>{a.rating}</strong>
          </span>
          <span style={ds.miniPrice}>
            {a.minPrice === 0 ? "Gratis" : `Mulai Rp ${(a.minPrice / 1000).toFixed(0)}rb`}
          </span>
        </div>
      </div>
    </a>
  );
}

export function InfoLine({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          color: "var(--atr-text-muted)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{icon}</span>
        {label}
      </span>
      <span
        style={{
          color: "var(--atr-text)",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}
