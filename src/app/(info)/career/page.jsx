"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/career-styles";

/* ── Sub-components ── */
import CareerPerks from "./_components/CareerPerks";
import CareerJobs from "./_components/CareerJobs";

export default function CareerPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Karir</div>
          <h1 style={stp.heroTitle}>
            Bangun pariwisata Nusantara <span style={stp.heroTitleHl}>bareng kami</span>
          </h1>
          <p style={stp.heroSub}>
            Bergabunglah dengan tim Atourin dan jadi bagian dari gerakan digitalisasi pariwisata Indonesia yang berdampak.
          </p>
        </div>
      </section>

      {/* Perks / Culture Section */}
      <section style={stp.section}>
        <div style={{ ...stp.wrap, maxWidth: 1100 }}>
          <div style={stp.secHeadC}>
            <div style={stp.kicker}>Kenapa Atourin</div>
            <div style={stp.secTitle}>Tempat tumbuh yang bermakna</div>
          </div>
          <CareerPerks />
        </div>
      </section>

      {/* Open Vacancies Section */}
      <section style={{ ...stp.section, background: "var(--atr-bg-soft)" }}>
        <div style={{ ...stp.wrap, maxWidth: 820 }}>
          <div style={stp.secHeadC}>
            <div style={stp.kicker}>Lowongan Terbuka</div>
            <div style={stp.secTitle}>Posisi yang sedang kami cari</div>
          </div>
          <CareerJobs />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
