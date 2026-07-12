"use client";

import React from "react";
import { sx } from "@/styles/contact-styles";

export default function ContactOffice() {
  return (
    <div style={{ ...sx.card, padding: 22 }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🏢 Kantor Kami</div>
      <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--atr-text)" }}>🕐 Jam Operasional</strong>
        <br />
        Senin – Jumat: 09.00 – 17.00 WIB
        <br />
        <br />
        <strong style={{ color: "var(--atr-text)" }}>📍 Alamat</strong>
        <br />
        Jl. Teratai Raya, Blok F3, Kel. Tanjung Barat, Kec. Jagakarsa, Jakarta Selatan, 12530
      </div>
      <div
        style={{
          marginTop: 14,
          borderRadius: 12,
          overflow: "hidden",
          height: 150,
          background: "var(--atr-bg-cool)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=70"
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
