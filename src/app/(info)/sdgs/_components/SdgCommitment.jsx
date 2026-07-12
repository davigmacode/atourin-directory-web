"use client";

import React from "react";
import { stp } from "@/styles/sdgs-styles";

export default function SdgCommitment() {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        alignItems: "center",
        padding: "56px 32px",
      }}
      className="sp-2col"
    >
      <div>
        <div style={stp.secTitle}>
          Komitmen Kami untuk <span style={{ color: "var(--atr-purple)" }}>Pariwisata Berkelanjutan</span>
        </div>
        <p style={{ fontSize: 15, color: "var(--atr-text-muted)", marginTop: 14, lineHeight: 1.6 }}>
          Atourin percaya pariwisata berkualitas &amp; berkelanjutan adalah kunci menciptakan dampak positif bagi masyarakat,
          lingkungan, dan ekonomi Indonesia.
        </p>
        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["One Traveller One Tree", "Program penanaman pohon untuk setiap wisatawan"],
            ["The Travellers Power", "Mengajak wisatawan menjadi agen perubahan positif"],
            ["We Are Quality Tourism", "Meningkatkan standar kualitas pariwisata Indonesia"],
          ].map(([t, d]) => (
            <div key={t} style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "var(--atr-arti)", fontWeight: 800 }}>✓</span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", background: "var(--atr-bg-cool)" }}>
        <img
          src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&q=70"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
      </div>
    </div>
  );
}
