"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/partnership-styles";

/* ── Sub-components ── */
import PartnerBenefits from "./_components/PartnerBenefits";
import PartnerSteps from "./_components/PartnerSteps";
import PartnerForm from "./_components/PartnerForm";

export default function PartnershipPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Kolaborasi</div>
          <h1 style={stp.heroTitle}>
            Bergabung dengan <span style={stp.heroTitleHl}>Atourin</span>
          </h1>
          <p style={stp.heroSub}>
            Buka peluang kerja sama untuk membangun pariwisata Indonesia yang lebih baik dan berkelanjutan.
            Dapatkan penghasilan hingga IDR 6.500.000+ per bulan.
          </p>
        </div>
      </section>

      {/* Main Info */}
      <section style={{ ...stp.section, textAlign: "center", paddingBottom: 24 }}>
        <div style={stp.wrap}>
          <button
            onClick={() => alert("Mulai Partnership")}
            style={{ ...stp.btnPrimary, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}
          >
            Mulai Partnership Sekarang →
          </button>
          <PartnerBenefits />
        </div>
      </section>

      {/* Onboarding Guide */}
      <section style={{ ...stp.section, background: "var(--atr-bg-soft)", paddingTop: 40 }}>
        <div style={stp.wrap}>
          <div style={stp.secHeadC}>
            <div style={stp.secTitle}>Cara Bergabung</div>
            <div style={stp.secSub}>3 langkah mudah untuk menjadi partner Atourin</div>
          </div>
          <PartnerSteps />
        </div>
      </section>

      {/* Form Section */}
      <section style={stp.section}>
        <div style={{ ...stp.wrap, maxWidth: 720, textAlign: "center" }}>
          <div style={stp.secTitle}>Bergabung Sekarang</div>
          <div style={{ ...stp.secSub, marginBottom: 28 }}>
            Isi form di bawah ini dan tim kami akan menghubungi Anda dalam 24 jam
          </div>
          <PartnerForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
