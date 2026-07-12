"use client";

import React from "react";
import { sx } from "@/styles/partnership-styles";
import { BENEFITS } from "@/data/partnership-data";

export default function PartnerBenefits() {
  return (
    <div style={{ ...sx.grid3, marginTop: 40 }} className="sp-grid3">
      {BENEFITS.map((b) => (
        <div key={b.t} style={{ ...sx.card, padding: 26, textAlign: "left" }}>
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
            {b.i}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{b.t}</div>
          <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 6, lineHeight: 1.55 }}>
            {b.d}
          </div>
        </div>
      ))}
    </div>
  );
}
