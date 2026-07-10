"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function CertRow({ icon, name, year, issuer }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "4px 0" }}>
      <span style={{ fontSize: 18, marginTop: 2 }}>{icon}</span>
      <div>
        <div
          style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {name}{" "}
          <span style={{ color: "var(--atr-text-muted)", fontWeight: 500 }}>
            {" \u00B7"} {year}
          </span>
        </div>
        <div
          style={{ fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 }}
        >
          {issuer}
        </div>
      </div>
    </div>
  );
}

export default function CertsCard({ village }) {
  const adwiStatus = village.adwi || "Mandiri";
  const foundedYear = village.founded || 2012;

  return (
    <div style={{ ...ds.bookCard, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 14,
        }}
      >
        Sertifikasi & Penghargaan
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <CertRow
          icon={"\uD83C\uDF1C"}
          name="UNESCO Asia-Pacific Award"
          year="2012"
          issuer="UNESCO Heritage Heritage"
        />
        <CertRow
          icon={"\uD83C\uDFC6"}
          name={`ADWI ${adwiStatus}`}
          year="2023"
          issuer="Kemenparekraf RI"
        />
        <CertRow
          icon={"\uD83C\uDF3F"}
          name="GSTC Sustainable Certified"
          year="2022"
          issuer="Global Sustainable Tourism Council"
        />
        <CertRow
          icon={"\u2705"}
          name="CHSE Certified Protocol"
          year="2021"
          issuer="Kemenparekraf RI"
        />
      </div>
    </div>
  );
}
