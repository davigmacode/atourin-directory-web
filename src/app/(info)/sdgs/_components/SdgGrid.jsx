"use client";

import React from "react";
import { sx } from "@/styles/sdgs-styles";
import { SDGS } from "@/data/sdgs-data";

export default function SdgGrid() {
  return (
    <div style={sx.grid3} className="sp-grid3">
      {SDGS.map(([n, t, c, d]) => (
        <div key={n} style={{ ...sx.card, padding: 20, display: "flex", gap: 14 }} className="sp-lift">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: c,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {n}
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>{t}</div>
            <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 4, lineHeight: 1.5 }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
