"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/sdgs-styles";

/* ── Sub-components ── */
import SdgGrid from "./_components/SdgGrid";
import SdgCommitment from "./_components/SdgCommitment";

export default function SDGsPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>SDGs</div>
          <h1 style={stp.heroTitle}>
            Nilai-nilai SDG <span style={stp.heroTitleHl}>yang Kami Patuhi</span>
          </h1>
          <p style={stp.heroSub}>
            Kami berkomitmen mendukung pencapaian Tujuan Pembangunan Berkelanjutan melalui berbagai inisiatif &amp; program.
          </p>
        </div>
      </section>

      {/* SDGs Grid list */}
      <section style={{ ...stp.section, paddingTop: 44 }}>
        <div style={stp.wrap}>
          <SdgGrid />
        </div>
      </section>

      {/* Commitment section */}
      <section style={{ background: "linear-gradient(135deg,#F6F4FF,#FBFAFF)" }}>
        <SdgCommitment />
      </section>

      <SiteFooter />
    </div>
  );
}
