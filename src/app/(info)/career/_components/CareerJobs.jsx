"use client";

import React from "react";
import { sx, stp } from "@/styles/career-styles";
import { KARIR_JOBS } from "@/data/career-data";

export default function CareerJobs() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {KARIR_JOBS.map((j) => (
          <button
            key={j.t}
            onClick={() => alert(`Melamar posisi ${j.t}`)}
            style={{
              ...sx.card,
              padding: "18px 22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              color: "inherit",
              flexWrap: "wrap",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "var(--atr-font-sans)",
              outline: "none",
            }}
            className="sp-lift"
          >
            <div>
              <div style={{ fontSize: 16.5, fontWeight: 700 }}>{j.t}</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--atr-text-muted)",
                  marginTop: 4,
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <span>🏢 {j.dep}</span>
                <span>📍 {j.loc}</span>
                <span>⏰ {j.type}</span>
              </div>
            </div>
            <span style={{ ...stp.btnPrimary, padding: "10px 18px", fontSize: 13.5 }}>Lamar →</span>
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--atr-text-muted)" }}>
        Tidak menemukan posisi yang pas? Kirim CV-mu ke{" "}
        <strong style={{ color: "var(--atr-purple)" }}>career@atourin.com</strong>
      </div>
    </>
  );
}
