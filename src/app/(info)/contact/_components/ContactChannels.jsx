"use client";

import React from "react";
import { sx } from "@/styles/contact-styles";
import { CONTACT_CH } from "@/data/contact-data";

export default function ContactChannels() {
  return (
    <div style={sx.grid3} className="sp-grid3">
      {CONTACT_CH.map((c) => (
        <button
          key={c.t}
          onClick={() => alert(`Menghubungi via ${c.t}`)}
          style={{
            borderRadius: 18,
            padding: 24,
            color: "#fff",
            background: c.bg,
            boxShadow: "var(--atr-shadow-2)",
            border: "none",
            outline: "none",
            textAlign: "left",
            fontFamily: "var(--atr-font-sans)",
            cursor: "pointer",
          }}
          className="sp-lift"
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "rgba(255,255,255,0.22)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              marginBottom: 16,
            }}
          >
            {c.i}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{c.t}</div>
          <div style={{ fontSize: 13.5, opacity: 0.92, marginTop: 6 }}>{c.d}</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 16 }}>{c.cta} →</div>
        </button>
      ))}
    </div>
  );
}
