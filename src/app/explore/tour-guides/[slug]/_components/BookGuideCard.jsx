"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";

const bgStyles = {
  card: { ...ds.bookCard, padding: 22 },
  fromRow: { display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 },
  fromVal: {
    fontSize: 28,
    fontWeight: 700,
    color: "var(--atr-purple)",
    letterSpacing: "-0.01em",
  },
  fromUnit: { fontSize: 13, color: "var(--atr-text-muted)" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "14px 0",
    borderTop: "1px dashed var(--atr-outline)",
    borderBottom: "1px dashed var(--atr-outline)",
  },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--atr-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  input: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13,
    color: "var(--atr-text)",
    fontFamily: "var(--atr-font-sans)",
    outline: "none",
  },
  twoFields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  estBox: {
    background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
    border: "1px solid #D8D0FF",
    borderRadius: 10,
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  estLabel: { fontSize: 12, color: "var(--atr-text)" },
  estVal: { fontSize: 18, fontWeight: 700, color: "var(--atr-purple)" },
};

function GuideMiniCalendar({ selected, onPick }) {
  // June 2026 availability
  const statusFor = (d) => {
    if (d < 4) return "past";
    if ([8, 15, 22].includes(d)) return "full";
    if (new Date(2026, 5, d).getDay() === 0) return "unavailable";
    return "available";
  };
  const startDow = (new Date(2026, 5, 1).getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= 30; d++) cells.push(d);
  const dow = ["S", "S", "R", "K", "J", "S", "M"];
  return (
    <div style={{ borderTop: "1px dashed var(--atr-outline)", paddingTop: 14 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        Ketersediaan · Juni 2026
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 4,
        }}
      >
        {dow.map((d, i) => (
          <div
            key={"h" + i}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "var(--atr-text-faint)",
            }}
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={"e" + i} />;
          const st = statusFor(d);
          const sel = selected === d;
          const avail = st === "available";
          const bg = sel
            ? "var(--atr-purple)"
            : avail
              ? "rgba(81,176,84,0.14)"
              : "#fff";
          const fg = sel
            ? "#fff"
            : avail
              ? "#2A8A3B"
              : st === "past"
                ? "var(--atr-outline)"
                : "var(--atr-text-faint)";
          return (
            <button
              key={i}
              disabled={!avail}
              onClick={() => onPick(d)}
              style={{
                aspectRatio: "1",
                borderRadius: 7,
                border: `1px solid ${sel ? "var(--atr-purple)" : avail ? "transparent" : "var(--atr-outline)"}`,
                background: bg,
                color: fg,
                fontSize: 12,
                fontWeight: 700,
                cursor: avail ? "pointer" : "default",
                textDecoration: st === "full" ? "line-through" : "none",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 8,
          fontSize: 10.5,
          color: "var(--atr-text-muted)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "rgba(81,176,84,0.4)",
            }}
          />
          Tersedia
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              border: "1px solid var(--atr-outline)",
            }}
          />
          Penuh / libur
        </span>
      </div>
    </div>
  );
}

export default function BookGuideCard({ guide }) {
  const [sel, setSel] = useState(null);
  const dailyPrice = guide.price || 850000;

  return (
    <div style={bgStyles.card}>
      <div>
        <div style={ds.bookEyebrow}>Tarif Pemandu</div>
        <div style={bgStyles.fromRow}>
          <span style={bgStyles.fromVal}>Rp {(dailyPrice / 1000).toLocaleString("id-ID")}rb</span>
          <span style={bgStyles.fromUnit}>/hari</span>
        </div>
        <div
          style={{ fontSize: 11, color: "var(--atr-text-muted)", marginTop: 2 }}
        >
          Tarif pemandu saja (excl. transport & paket)
        </div>
      </div>

      <div style={{ ...ds.statusChip, ...ds.statusOpen, width: "fit-content" }}>
        <span style={{ ...ds.statusDot, background: "#1F7A21" }} />
        Tersedia minggu ini
      </div>

      <div style={bgStyles.form}>
        <div style={bgStyles.field}>
          <span style={bgStyles.label}>Tipe trip</span>
          <select style={bgStyles.input} defaultValue="sailing">
            <option value="sailing">Sailing 1 Day, Padar & Pink Beach</option>
            <option value="phinisi">Phinisi 3D2N</option>
            <option value="diving">Diving Trip 2D</option>
            <option value="custom">Custom request</option>
          </select>
        </div>

        <GuideMiniCalendar selected={sel} onPick={setSel} />

        <div style={bgStyles.twoFields}>
          <div style={bgStyles.field}>
            <span style={bgStyles.label}>Tanggal dipilih</span>
            <input
              readOnly
              style={bgStyles.input}
              value={sel ? `${sel} Juni 2026` : "Pilih di kalender"}
            />
          </div>
          <div style={bgStyles.field}>
            <span style={bgStyles.label}>Peserta</span>
            <select style={bgStyles.input} defaultValue="2">
              <option>1 orang</option>
              <option>2 orang</option>
              <option>3 orang</option>
              <option>4 orang</option>
              <option>5+ orang</option>
            </select>
          </div>
        </div>
        <div style={bgStyles.estBox}>
          <span style={bgStyles.estLabel}>Estimasi total</span>
          <span style={bgStyles.estVal}>Rp {(dailyPrice * 4 + 300000).toLocaleString("id-ID")}</span>
        </div>
      </div>

      <button
        style={{
          ...ds.primaryCta,
          opacity: sel ? 1 : 0.55,
          cursor: sel ? "pointer" : "not-allowed",
        }}
        disabled={!sel}
        onClick={() => alert(`Melanjutkan pemesanan untuk tanggal ${sel} Juni 2026`)}
      >
        {sel ? `Lanjut Pesan \u00B7 ${sel} Juni` : "Pilih tanggal dulu"}
      </button>
      <button
        style={ds.secondaryCta}
        onClick={() => alert("Menghubungi pemandu untuk konsultasi...")}
      >
        💬 Konsultasi Gratis dulu
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          color: "var(--atr-text-muted)",
          lineHeight: 1.4,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          Booking aman lewat Atourin Escrow. Refund 100% jika cancel H-3.
        </span>
      </div>
    </div>
  );
}
