"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { stp } from "@/styles/contact-styles";
import { OFFICE_STATS } from "@/data/contact-data";

/* ── Sub-components ── */
import ContactChannels from "./_components/ContactChannels";
import ContactForm from "./_components/ContactForm";
import ContactOffice from "./_components/ContactOffice";

export default function ContactPage() {
  return (
    <div style={stp.page}>
      <TopNav active="" />

      {/* Hero */}
      <section style={stp.hero}>
        <div style={stp.wrap}>
          <div style={stp.kicker}>Hubungi Kami</div>
          <h1 style={stp.heroTitle}>
            Hubungi Tim <span style={stp.heroTitleHl}>Kami</span>
          </h1>
          <p style={stp.heroSub}>
            Buang ragumu, kami sangat siap membantu liburanmu jadi semakin seru! Hubungi sekarang!
          </p>
        </div>
      </section>

      {/* Statistics Bar */}
      <div style={{ borderBottom: "1px solid var(--atr-outline)", background: "#fff" }}>
        <div
          style={{
            ...stp.wrap,
            maxWidth: 1100,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            padding: "20px 32px",
            flexWrap: "wrap",
          }}
        >
          {OFFICE_STATS.map((s) => (
            <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{s.i}</span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)" }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <section style={{ ...stp.section, paddingTop: 40 }}>
        <div style={{ ...stp.wrap, maxWidth: 1100 }}>
          <ContactChannels />

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24, marginTop: 32 }} className="sp-2col">
            <ContactForm />
            <ContactOffice />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
