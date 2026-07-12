"use client";

import React from "react";
import { pesanStyles } from "@/styles/pesan-styles";

export default function PromoBannerRow({ banners = [] }) {
  return (
    <section style={pesanStyles.promoSection}>
      <div style={pesanStyles.promoGrid}>
        {banners.map((b, i) => (
          <div key={i} style={{ ...pesanStyles.promoCard, background: b.bg, color: b.fg }}>
            <div style={{ position: "relative", zIndex: 2, flex: 1 }}>
              <div style={pesanStyles.promoEyebrow}>{b.eyebrow}</div>
              <h3 style={pesanStyles.promoTitle}>{b.title}</h3>
              <p style={pesanStyles.promoSub}>{b.sub}</p>
              <button style={{ ...pesanStyles.promoBtn, color: b.fg, borderColor: b.fg }}>
                {b.cta} →
              </button>
            </div>
            <span style={pesanStyles.promoEmoji}>{b.emoji}</span>
            <svg style={pesanStyles.promoBlob} viewBox="0 0 200 200" fill="none">
              <circle cx="160" cy="160" r="90" fill={b.fg} opacity="0.08" />
              <circle cx="180" cy="40" r="40" fill={b.fg} opacity="0.06" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
