"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";
import { StatusChip } from "./Shared";

/* ── AtrWeatherStrip (weather forecast) ── */
export function AtrWeatherStrip({ location, days, advisory }) {
  const list = days || [
    { day: "Kamis", icon: "\u2600\uFE0F", hi: 32, lo: 26, label: "Cerah" },
    { day: "Jumat", icon: "\u2600\uFE0F", hi: 32, lo: 26, label: "Cerah" },
    { day: "Sabtu", icon: "\u26C5", hi: 31, lo: 25, label: "Berawan" },
  ];
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#EEF0FB,#F7F7FC)",
        border: "1px solid var(--atr-outline)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        Cuaca Saat Kunjungan
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${list.length},1fr)`,
          gap: 8,
        }}
      >
        {list.map((d, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,.75)",
              borderRadius: 12,
              padding: "11px 6px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                color: "var(--atr-text-muted)",
                fontWeight: 700,
              }}
            >
              {d.day}
            </div>
            <div style={{ fontSize: 26, margin: "5px 0" }}>{d.icon}</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "var(--atr-text)",
              }}
            >
              {d.hi}
              {"\u00B7"}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--atr-text-muted)",
                }}
              >
                {" "}
                / {d.lo}
                {"\u00B7"}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              {d.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: "var(--atr-text)",
          lineHeight: 1.5,
          background: "rgba(255,196,66,.16)",
          borderRadius: 10,
          padding: "9px 12px",
        }}
      >
        {"\uD83D\uDCA1"}{" "}
        {advisory ||
          "Kunjungan paling nyaman dilakukan pagi atau sore hari. Pastikan membawa persediaan air minum secukupnya."}
      </div>
    </div>
  );
}

export default function BookingBox({ attraction }) {
  const [save, setSave] = useState(false);
  const price = attraction.price || 0;

  return (
    <div style={ds.bookCard}>
      <div style={ds.bookHead}>
        <span style={ds.bookEyebrow}>Tiket Masuk</span>
        <div style={ds.bookFromRow}>
          <span style={ds.bookFromVal}>
            {price === 0 ? "Gratis" : `Mulai Rp ${(price / 1000).toLocaleString("id-ID")}rb`}
          </span>
          {price > 0 && <span style={ds.bookFromUnit}>/orang</span>}
        </div>
      </div>

      <div style={ds.priceTable}>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"👤"} Pengunjung (WNI)</span>
          <span style={ds.priceVal}>
            {price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")}`}
          </span>
        </div>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"👶"} Anak (&lt; 12 thn)</span>
          <span style={ds.priceVal}>
            {price === 0 ? "Gratis" : `Rp ${(price * 0.5).toLocaleString("id-ID")}`}
          </span>
        </div>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"🌐"} Wisatawan Asing (WNA)</span>
          <span style={ds.priceVal}>
            {price === 0 ? "Gratis" : `Rp ${(price * 3).toLocaleString("id-ID")}`}
          </span>
        </div>
      </div>

      <AtrWeatherStrip location={attraction.region} />

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Jam Operasional
        </div>
        <div style={ds.opRow}>
          <span style={ds.opDay}>Setiap hari</span>
          <span style={ds.opHours}>{attraction.hours || "08.00 - 17.00"}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <StatusChip open={true} />
        </div>
      </div>

      <button style={ds.primaryCta}>{"🎫"} Pesan Tiket Masuk</button>
      <button style={ds.secondaryCta}>{"🧭"} Cari Pemandu Lokal</button>

      <div style={ds.iconRow}>
        <button
          style={{ ...ds.iconBtnGhost, ...(save ? ds.iconBtnOn : {}) }}
          onClick={() => setSave(!save)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "currentColor" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          {save ? "Tersimpan" : "Simpan"}
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Tautan disalin ke clipboard")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Bagikan
        </button>
        <button
          style={{
            ...ds.iconBtnGhost,
            color: "var(--atr-purple)",
            borderColor: "var(--atr-purple-light)",
            background: "var(--atr-purple-50)",
          }}
          title="Dapat komisi jika ada yang booking via link-mu"
          onClick={() => alert("Link affiliate disalin")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M9 15l6-6" />
            <path d="M11 6l1-1a4 4 0 015.7 5.7l-1 1" />
            <path d="M13 18l-1 1A4 4 0 016.3 13.3l1-1" />
          </svg>{" "}
          Komisi
        </button>
      </div>
    </div>
  );
}
