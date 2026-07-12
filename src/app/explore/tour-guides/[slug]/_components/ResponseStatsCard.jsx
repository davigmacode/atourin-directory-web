"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function PerfRow({ icon, label, value, sub, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        ...(highlight
          ? {
              background: "rgba(255,196,66,0.1)",
              border: "1px solid rgba(255,196,66,0.3)",
              borderRadius: 10,
              padding: "10px 12px",
            }
          : {}),
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>
          {label}
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {value}
        </div>
        <div
          style={{ fontSize: 10, color: "var(--atr-text-muted)", marginTop: 1 }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

export default function ResponseStatsCard({ guide }) {
  return (
    <div style={{ ...ds.bookCard, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}
      >
        Kinerja & Status
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PerfRow
          icon={"⚡"}
          label="Respon balasan"
          value="< 1 jam"
          sub="Rata-rata 6 bulan terakhir"
        />
        <PerfRow
          icon={"📞"}
          label="Tingkat respon"
          value="99%"
          sub="Dari semua pesan"
        />
        <PerfRow
          icon={"✅"}
          label="Trip selesai"
          value={`${guide.trips || 120} trip`}
          sub={`${guide.exp || "5+ tahun"} pengalaman`}
        />
        <PerfRow
          icon={"🏆"}
          label="Status"
          value="Superhost"
          sub="Top 5% pemandu Atourin"
          highlight
        />
      </div>
    </div>
  );
}
