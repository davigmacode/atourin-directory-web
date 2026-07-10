"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function FacilityItem({ icon, label, available = true }) {
  return (
    <div style={{ ...ds.facItem, ...(available ? {} : ds.facItemOff) }}>
      <span style={ds.facIcon}>{icon}</span>
      <span style={{ ...ds.facLabel, ...(available ? {} : ds.facStrike) }}>
        {label}
      </span>
    </div>
  );
}

export default function VillageFacilities({ village }) {
  const families = village.families || 12;
  const basePrice = village.price || 150000;
  const quota = families * 5 > 200 ? 200 : families * 5;

  const facilities = [
    { icon: "\uD83D\uDEBB", label: "Toilet Bersama", on: true },
    { icon: "\uD83C\uDF7D\uFE0F", label: "Konsumsi / Restoran Lokal", on: true },
    { icon: "\uD83D\uDEF5\uFE0F", label: "Area Parkir Kendaraan", on: true },
    { icon: "\uD83D\uDEE1", label: "Pemandu Lokal Berlisensi", on: true },
    { icon: "\uD83C\uDFE1", label: "Homestay Warga", on: basePrice > 0 },
    { icon: "\uD83D\uDD4C", label: "Tempat Ibadah / Mushola", on: true },
    { icon: "\uD83D\uDD0C", label: "Stasiun Pengisian Daya", on: true },
    { icon: "\uD83D\uDCF6", label: "Koneksi Internet / WiFi", on: false },
  ];

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>
          <span>{"\uD83C\uDFA8"}</span> Fasilitas & Akomodasi
        </h2>
      </div>
      <div style={ds.facGrid}>
        {facilities.map((f) => (
          <FacilityItem
            key={f.label}
            icon={f.icon}
            label={f.label}
            available={f.on}
          />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 16,
        }}
      >
        <div
          style={{
            background: "var(--atr-bg-soft)",
            border: "1px solid var(--atr-outline)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {"\uD83C\uDFE1"}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              {families} Unit Homestay Aktif
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              Tinggal bersama warga lokal {"\u00B7"} Mulai{" "}
              <strong style={{ color: "var(--atr-purple)" }}>
                Rp {(basePrice / 1000).toFixed(0)}rb/malam
              </strong>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "var(--atr-bg-soft)",
            border: "1px solid var(--atr-outline)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {"\uD83D\uDC65"}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              Kuota Harian: {quota} Tamu
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              Demi kenyamanan ekologis dan menjaga adat istiadat desa setempat.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
