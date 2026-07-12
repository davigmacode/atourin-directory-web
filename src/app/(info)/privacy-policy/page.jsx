"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/privacy-policy-styles";

/* ── Sub-components ── */
import PrivacyPromises from "./_components/PrivacyPromises";
import PrivacySidebar from "./_components/PrivacySidebar";
import PrivacyContent from "./_components/PrivacyContent";

export default function PrivacyPolicyPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Privasi</div>
          <h1 style={stp.heroTitle}>
            Kebijakan <span style={stp.heroTitleHl}>Privasi</span>
          </h1>
          <p style={stp.heroSub}>
            Komitmen kami untuk melindungi dan mengelola data pribadimu secara transparan dan bertanggung jawab.
          </p>
        </div>
      </section>

      {/* Promises highlight banner */}
      <section style={{ ...stp.section, paddingBottom: 0 }}>
        <div style={{ ...stp.wrap, maxWidth: 1000 }}>
          <PrivacyPromises />
        </div>
      </section>

      {/* TOC & Body split section */}
      <section style={stp.section}>
        <div
          style={{
            ...stp.wrap,
            maxWidth: 1000,
            display: "grid",
            gridTemplateColumns: "230px 1fr",
            gap: 32,
            alignItems: "start",
          }}
          className="sp-toc"
        >
          <PrivacySidebar />
          <PrivacyContent />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
