"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/terms-and-conditions-styles";

/* ── Sub-components ── */
import TermsSidebar from "./_components/TermsSidebar";
import TermsContent from "./_components/TermsContent";

export default function TermsAndConditionsPage() {
  const [active, setActive] = useState("Pendahuluan");

  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Legal</div>
          <h1 style={stp.heroTitle}>
            Syarat dan <span style={stp.heroTitleHl}>Ketentuan</span>
          </h1>
          <p style={stp.heroSub}>
            Panduan lengkap mengenai aturan, hak, dan kewajiban saat menggunakan layanan Atourin.
          </p>
        </div>
      </section>

      {/* TOC & Body Split Section */}
      <section style={stp.section}>
        <div
          style={{
            ...stp.wrap,
            maxWidth: 1100,
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: 28,
            alignItems: "start",
          }}
          className="sp-toc"
        >
          <TermsSidebar active={active} setActive={setActive} />
          <TermsContent active={active} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
