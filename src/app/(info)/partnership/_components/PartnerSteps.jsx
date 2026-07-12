"use client";

import React from "react";
import { sx } from "@/styles/partnership-styles";
import { STEPS } from "@/data/partnership-data";

export default function PartnerSteps() {
  return (
    <div style={sx.grid3} className="sp-grid3">
      {STEPS.map((s) => (
        <div key={s.n} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "var(--atr-purple-50)",
              color: "var(--atr-purple)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            {s.n}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, maxWidth: 240, margin: "0 auto", lineHeight: 1.4 }}>
            {s.t}
          </div>
        </div>
      ))}
    </div>
  );
}
