"use client";

import React from "react";
import { Breadcrumb } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";

const guideHero = {
  stack: { position: "absolute", inset: 0 },
  card: {
    position: "absolute",
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 12px 28px rgba(31,27,51,0.14)",
  },
  cardBack: {
    top: 16,
    left: 30,
    width: 200,
    transform: "rotate(-3deg)",
    opacity: 0.92,
  },
  cardMid: { top: 80, right: 24, width: 200, transform: "rotate(2deg)" },
  cardFront: {
    bottom: 30,
    left: 50,
    right: 50,
    padding: 22,
    transform: "rotate(0)",
    boxShadow: "0 24px 48px rgba(31,27,51,0.22)",
  },
  cardAv: {
    width: 56,
    height: 56,
    borderRadius: 999,
    marginBottom: 10,
    border: "3px solid #fff",
    boxShadow: "0 0 0 1.5px var(--atr-purple-light)",
  },
  cardAvLg: {
    width: 72,
    height: 72,
    borderRadius: 999,
    marginBottom: 12,
    border: "3px solid #fff",
    boxShadow: "0 0 0 2px var(--atr-purple)",
  },
  cardName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  cardNameLg: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--atr-text)",
    marginTop: 2,
  },
  cardLoc: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 4 },
  cardBadges: { marginTop: 8 },
  badge: {
    display: "inline-block",
    background: "#EDE9FF",
    color: "var(--atr-purple)",
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 4,
  },
  cardCert: {
    display: "inline-block",
    background: "rgba(81,176,84,0.14)",
    color: "#2D8838",
    fontSize: 10,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 999,
    marginBottom: 8,
    letterSpacing: "0.04em",
  },
  cardRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px dashed var(--atr-outline)",
  },
  cardStar: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },
  cardMeta: { fontSize: 12, color: "var(--atr-text-muted)" },
  cardMetaP: {
    fontSize: 12,
    fontWeight: 700,
    color: "var(--purple-primary, #7068d5)",
    marginLeft: "auto",
  },
};

function Stat({ n, label }) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

export default function GuidesHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Tour Guide"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Pemandu lokal yang{" "}
            <span style={{ color: "var(--atr-purple)" }}>tahu rahasia</span>{" "}
            daerahnya.
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Tour guide bersertifikat HPI & BNSP, fasih multi-bahasa, dengan
            ratusan jam pengalaman memandu wisatawan ke spot-spot lokal yang
            jarang ditemukan di Google.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <button style={dirStyles.heroPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Cari guide untukku
            </button>
            <button style={dirStyles.heroSecondary}>
              Cara kerja Atourin Guide
            </button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="640+" label="Tour guide tervalidasi" />
            <Stat n="22+" label="Bahasa & dialek" />
            <Stat n="98%" label="Tingkat kepuasan" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={guideHero.stack}>
            <div style={{ ...guideHero.card, ...guideHero.cardBack }}>
              <img
                src="https://i.pravatar.cc/120?img=15"
                alt=""
                style={guideHero.cardAv}
              />
              <div style={guideHero.cardName}>Sari Wibowo</div>
              <div style={guideHero.cardLoc}>
                {"\uD83D\uDCCD"} Yogyakarta {"\u00B7"} Heritage
              </div>
            </div>
            <div style={{ ...guideHero.card, ...guideHero.cardMid }}>
              <img
                src="https://i.pravatar.cc/120?img=64"
                alt=""
                style={guideHero.cardAv}
              />
              <div style={guideHero.cardName}>Komang Adi</div>
              <div style={guideHero.cardLoc}>
                {"\uD83D\uDCCD"} Bali {"\u00B7"} Diving
              </div>
              <div style={guideHero.cardBadges}>
                <span style={guideHero.badge}>
                  EN {"\u00B7"} ID {"\u00B7"} JP
                </span>
              </div>
            </div>
            <div style={{ ...guideHero.card, ...guideHero.cardFront }}>
              <img
                src="https://i.pravatar.cc/120?img=47"
                alt=""
                style={guideHero.cardAvLg}
              />
              <div style={guideHero.cardCert}>
                {"\u2713"} HPI {"\u00B7"} BNSP Certified
              </div>
              <div style={guideHero.cardNameLg}>Welli Wilyanto</div>
              <div style={guideHero.cardLoc}>
                {"\uD83D\uDCCD"} Labuan Bajo {"\u00B7"} Petualangan & Bahari
              </div>
              <div style={guideHero.cardRow}>
                <span style={guideHero.cardStar}>{"\u2605"} 4.95</span>
                <span style={guideHero.cardMeta}>{" \u00B7"} 412 trip</span>
                <span style={guideHero.cardMetaP}>Rp 1.2jt/hari</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
