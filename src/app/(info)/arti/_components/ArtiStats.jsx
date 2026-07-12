"use client";

import React from "react";
import { ar, G_COLOR } from "@/styles/arti-styles";
import { ARTI_STATS } from "@/data/arti-data";

export default function ArtiStats() {
  return (
    <div style={ar.statsCard} className="arti-stats">
      {ARTI_STATS.map((s, i) => (
        <div
          key={i}
          style={{
            ...ar.statCell,
            borderRight: i < ARTI_STATS.length - 1 ? "1px solid var(--atr-outline)" : "none",
          }}
        >
          <div style={{ ...ar.statV, color: s.g ? G_COLOR : "var(--atr-text)" }}>{s.v}</div>
          <div style={ar.statL}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}
