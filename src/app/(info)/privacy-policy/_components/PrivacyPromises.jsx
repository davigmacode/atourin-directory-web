"use client";

import React from "react";
import { sx } from "@/styles/privacy-policy-styles";
import { PROMISES } from "@/data/privacy-policy-data";

export default function PrivacyPromises() {
  return (
    <div style={sx.grid3} className="sp-grid3">
      {PROMISES.map((p) => (
        <div key={p.t} style={{ ...sx.card, padding: 22, textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "var(--atr-purple-50)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 12,
            }}
          >
            {p.i}
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 700 }}>{p.t}</div>
          <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 5, lineHeight: 1.5 }}>
            {p.d}
          </div>
        </div>
      ))}
    </div>
  );
}
