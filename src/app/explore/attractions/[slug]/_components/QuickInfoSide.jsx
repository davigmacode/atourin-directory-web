"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { InfoLine } from "./Shared";

export default function QuickInfoSide({ attraction }) {
  const isTrekking = attraction.trekking;

  return (
    <div style={{ ...ds.bookCard, padding: 16 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Info Singkat
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontSize: 13,
        }}
      >
        <InfoLine icon={"⏱"} label="Durasi kunjungan" value={"2\u20133 jam"} />
        <InfoLine icon={"📶"} label="Sinyal HP" value="Bagus (4G)" />
        <InfoLine icon={"🌊"} label="Best season" value={"Mei \u2013 Okt (Cerah)"} />
        <InfoLine
          icon={"🎯"}
          label="Tingkat kesulitan"
          value={isTrekking ? "Sedang (trekking)" : "Mudah (santai)"}
        />
        <InfoLine icon={"👨‍👩‍👧‍👦"} label="Cocok untuk" value="Semua umur" />
      </div>
    </div>
  );
}
