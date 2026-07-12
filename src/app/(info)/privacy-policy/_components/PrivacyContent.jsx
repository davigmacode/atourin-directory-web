"use client";

import React from "react";
import Link from "next/link";
import { sx, stp } from "@/styles/privacy-policy-styles";
import { SECS } from "@/data/privacy-policy-data";

export default function PrivacyContent() {
  function slug(s) {
    return s.toLowerCase().replace(/[^a-z]+/g, "-");
  }

  return (
    <div>
      {SECS.map((s) => (
        <div
          key={s.h}
          id={slug(s.h)}
          style={{ ...sx.card, padding: "24px 28px", marginBottom: 16, scrollMarginTop: 90 }}
        >
          <h3
            style={{
              fontSize: 19,
              fontWeight: 700,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "var(--atr-purple-50)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {s.ic}
            </span>
            {s.h}
          </h3>
          <p style={{ fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.7 }}>{s.b}</p>
        </div>
      ))}

      {/* Contact redirection bar */}
      <div
        style={{
          ...sx.card,
          padding: "24px 28px",
          background: "var(--atr-purple-50)",
          border: "1px solid var(--atr-purple-light)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Punya pertanyaan soal data Anda?</div>
          <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 4 }}>
            Tim privasi kami siap membantu.
          </div>
        </div>
        <Link href="/contact" style={stp.btnPrimary}>
          Hubungi Kami →
        </Link>
      </div>
    </div>
  );
}
