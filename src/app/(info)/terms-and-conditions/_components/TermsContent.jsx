"use client";

import React from "react";
import { sx } from "@/styles/terms-and-conditions-styles";

export default function TermsContent({ active }) {
  return (
    <div style={{ ...sx.card, padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--atr-purple)",
          }}
        >
          Syarat &amp; Ketentuan
        </div>
        <span
          style={{
            fontSize: 12,
            color: "var(--atr-text-muted)",
            background: "var(--atr-bg-soft)",
            padding: "5px 12px",
            borderRadius: 999,
          }}
        >
          Diperbarui 29 Mei 2026
        </span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{active}</h2>
      <p style={{ fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.7 }}>
        PT Atourin Teknologi Nusantara (selanjutnya disebut Atourin) adalah perseroan terbatas yang bergerak di bidang
        jasa portal web. Atourin menyediakan platform perdagangan elektronik (marketplace) di mana pengguna dapat
        melakukan transaksi jual-beli produk pariwisata.
      </p>
      <p style={{ fontSize: 14.5, color: "var(--atr-text)", lineHeight: 1.7, marginTop: 14 }}>
        Syarat &amp; Ketentuan ini mengatur penggunaan seluruh layanan pada platform Atourin yang berlaku terhadap
        seluruh pengguna dan setiap pihak yang menyampaikan permintaan atau informasi kepada Atourin.
      </p>
    </div>
  );
}
