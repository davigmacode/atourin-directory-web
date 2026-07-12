"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { ar } from "@/styles/arti-styles";

/* ── Sub-components ── */
import ArtiHero from "./_components/ArtiHero";
import ArtiStats from "./_components/ArtiStats";
import ArtiActivity from "./_components/ArtiActivity";
import ArtiTracker from "./_components/ArtiTracker";

export default function ArtiPage() {
  return (
    <div style={ar.page}>
      <style>{`
        @media (max-width: 900px) {
          .arti-stats { grid-template-columns: repeat(2,1fr) !important; gap: 18px 0 !important; }
          .arti-grid { grid-template-columns: 1fr !important; }
          .arti-h1 { font-size: 32px !important; }
        }
      `}</style>

      <TopNav active="" />

      {/* Hero Section */}
      <ArtiHero />

      <div style={ar.body}>
        {/* Statistics Board */}
        <ArtiStats />

        {/* Level Banner */}
        <div style={ar.levelCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Forest Guardian · Level 3</div>
              <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 3 }}>
                3 pohon lagi untuk naik ke Level 4 (Eco Hero)
              </div>
            </div>
            <div style={{ fontSize: 26 }}>🏆</div>
          </div>
          <div style={ar.bar}>
            <div style={ar.barFill} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "var(--atr-text-muted)" }}>
            <span>12 pohon</span>
            <span style={{ fontWeight: 700 }}>15 untuk Level 4</span>
          </div>
        </div>

        {/* Recent timeline lists & Live map details */}
        <div style={ar.grid} className="arti-grid">
          <ArtiActivity />
          <ArtiTracker />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
