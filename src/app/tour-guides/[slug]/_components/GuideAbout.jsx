"use client";

import React from "react";
import { SectionCard, ReadMore } from "./Shared";

export default function GuideAbout({ guide }) {
  const defaultAbout = `Halo! Saya ${guide.name}, pemandu wisata lokal berlisensi resmi di ${guide.region || "Labuan Bajo"}. Berpengalaman memandu wisatawan menjelajahi spot-spot ikonik dan tersembunyi. Saya berkomitmen memberikan pelayanan trip yang aman, nyaman, menyenangkan, dan berkesan untuk Anda.`;
  const aboutText = guide.about || defaultAbout;

  return (
    <SectionCard title="Tentang Saya" icon={"\uD83D\uDC4B"}>
      <ReadMore text={aboutText} clamp={5} />
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 16,
          padding: "14px 16px",
          background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
          borderRadius: 10,
          alignItems: "center",
          border: "1px solid #D8D0FF",
        }}
      >
        <span style={{ fontSize: 22 }}>{"\uD83C\uDF3F"}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-text)" }}
          >
            Anggota komunitas ARTI by Atourin
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--atr-text-muted)",
              marginTop: 2,
            }}
          >
            Pemandu yang berkomitmen pada praktik pariwisata berkelanjutan &
            carbon-offset.
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
