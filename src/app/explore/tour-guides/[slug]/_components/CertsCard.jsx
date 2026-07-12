"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

const CERT_META = {
  HPI: {
    name: "HPI (Himpunan Pramuwisata Indonesia)",
    issuer: "HPI NTT",
    year: "2018",
    icon: "🏮",
  },
  BNSP: {
    name: "Pemandu Wisata Bersertifikat",
    issuer: "BNSP RI",
    year: "2019",
    icon: "🎓",
  },
  "Diving Master": {
    name: "PADI Open Water Scuba Instructor",
    issuer: "PADI",
    year: "2021",
    icon: "🐠",
  },
  "Mountain Guide": {
    name: "Sertifikasi Pemandu Gunung",
    issuer: "APGI",
    year: "2020",
    icon: "⛰️",
  },
};

const DEFAULT_CERTS = [
  {
    name: "Pemandu Wisata Bersertifikat",
    issuer: "BNSP RI",
    year: "2019",
    icon: "🎓",
  },
  {
    name: "HPI (Himpunan Pramuwisata Indonesia)",
    issuer: "HPI Daerah",
    year: "2018",
    icon: "🏮",
  },
];

export default function CertsCard({ guide }) {
  const guideCerts = guide.certs || ["HPI", "BNSP"];
  
  const certifications = guideCerts.map((c) => {
    return CERT_META[c] || {
      name: c,
      issuer: "Lembaga Resmi",
      year: "2022",
      icon: "✅",
    };
  });

  return (
    <div style={{ ...ds.bookCard, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}
      >
        Sertifikasi ({certifications.length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {certifications.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              paddingBottom: 10,
              borderBottom:
                i === certifications.length - 1
                  ? "none"
                  : "1px dashed var(--atr-outline)",
            }}
          >
            <span style={{ fontSize: 18, marginTop: 2 }}>{c.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--atr-text)",
                  lineHeight: 1.3,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--atr-text-muted)",
                  marginTop: 1,
                }}
              >
                {c.issuer} · {c.year}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        style={{ ...ds.iconBtnGhost, justifyContent: "center", marginTop: 4, width: "100%", fontFamily: "var(--atr-font-sans)" }}
        onClick={() => alert("Membuka dokumen sertifikat...")}
      >
        📄 Lihat dokumen sertifikat
      </button>
    </div>
  );
}
