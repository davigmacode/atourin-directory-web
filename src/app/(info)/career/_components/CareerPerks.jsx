"use client";

import React from "react";
import { sx } from "@/styles/career-styles";
import { KARIR_PERKS } from "@/data/career-data";

export default function CareerPerks() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }} className="sp-grid3">
      {KARIR_PERKS.map((p) => (
        <div key={p.t} style={{ ...sx.card, padding: 24 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: "var(--atr-purple-50)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 14,
            }}
          >
            {p.i}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{p.t}</div>
          <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 6, lineHeight: 1.55 }}>
            {p.d}
          </div>
        </div>
      ))}
    </div>
  );
}
