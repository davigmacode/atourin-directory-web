"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/campaign-styles";

/* ── Sub-components ── */
import CampaignGrid from "./_components/CampaignGrid";
import CampaignJoin from "./_components/CampaignJoin";

export default function CampaignPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Campaign</div>
          <h1 style={stp.heroTitle}>
            Gerakan <span style={stp.heroTitleHl}>Atourin</span>
          </h1>
          <p style={stp.heroSub}>
            Kampanye dan inisiatif kami untuk pariwisata Indonesia yang lebih baik, berkualitas, dan berkelanjutan.
          </p>
        </div>
      </section>

      {/* Campaigns Listing Grid */}
      <section style={{ ...stp.section, paddingTop: 44 }}>
        <div style={{ ...stp.wrap, maxWidth: 1100 }}>
          <CampaignGrid />
        </div>
      </section>

      {/* Join the Movement CTA Section */}
      <section style={{ ...stp.section, background: "var(--atr-bg-soft)", textAlign: "center" }}>
        <div style={stp.wrap}>
          <div style={stp.secTitle}>
            Bergabunglah dalam <span style={{ color: "var(--atr-purple)" }}>Kampanye Kami</span>
          </div>
          <div style={{ ...stp.secSub, marginBottom: 26 }}>
            Mari bersama menciptakan dampak positif untuk pariwisata Indonesia yang lebih baik.
          </div>
          <CampaignJoin />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
