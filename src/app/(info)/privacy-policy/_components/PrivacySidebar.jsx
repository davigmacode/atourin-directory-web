"use client";

import React from "react";
import { sx } from "@/styles/privacy-policy-styles";
import { SECS } from "@/data/privacy-policy-data";

export default function PrivacySidebar() {
  function slug(s) {
    return s.toLowerCase().replace(/[^a-z]+/g, "-");
  }

  return (
    <aside style={{ ...sx.card, padding: 14, position: "sticky", top: 90 }}>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 800,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          padding: "6px 10px",
        }}
      >
        Daftar Isi
      </div>
      {SECS.map((s, i) => (
        <a
          key={s.h}
          href={"#" + slug(s.h)}
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            padding: "9px 10px",
            borderRadius: 8,
            fontSize: 13.5,
            fontWeight: 600,
            color: "var(--atr-text)",
            textDecoration: "none",
          }}
          className="sp-lift"
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "var(--atr-purple-50)",
              color: "var(--atr-purple)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </span>
          {s.h}
        </a>
      ))}
      <div
        style={{
          marginTop: 8,
          padding: "12px",
          borderRadius: 10,
          background: "var(--atr-bg-soft)",
          fontSize: 12,
          color: "var(--atr-text-muted)",
        }}
      >
        Terakhir diperbarui
        <br />
        <strong style={{ color: "var(--atr-text)" }}>29 Mei 2026</strong>
      </div>
    </aside>
  );
}
