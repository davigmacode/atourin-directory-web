"use client";

import React from "react";
import { Breadcrumb } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";

const vh = {
  collage: { position: "absolute", inset: 0 },
  imgMain: {
    position: "absolute",
    top: 20,
    left: 20,
    width: "70%",
    height: "62%",
    objectFit: "cover",
    borderRadius: 18,
    boxShadow: "0 18px 36px rgba(31,27,51,0.18)",
  },
  imgTop: {
    position: "absolute",
    top: 14,
    right: 0,
    width: "36%",
    height: "36%",
    objectFit: "cover",
    borderRadius: 14,
    boxShadow: "0 10px 22px rgba(31,27,51,0.14)",
  },
  imgBottom: {
    position: "absolute",
    bottom: 20,
    right: 40,
    width: "52%",
    height: "38%",
    objectFit: "cover",
    borderRadius: 14,
    boxShadow: "0 12px 26px rgba(31,27,51,0.14)",
  },
  adwiBadge: {
    position: "absolute",
    top: 60,
    right: 30,
    background: "var(--atr-yellow)",
    color: "#3D2900",
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
    zIndex: 3,
    transform: "rotate(-4deg)",
  },
  adwiLabel: {
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textAlign: "center",
    lineHeight: 1.2,
  },
  adwiYear: { fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 4 },
  kpiCard: {
    position: "absolute",
    bottom: 30,
    left: 0,
    background: "#fff",
    borderRadius: 14,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 12px 26px rgba(31,27,51,0.16)",
    zIndex: 3,
  },
  kpiIcon: {
    fontSize: 22,
    background: "rgba(81,176,84,0.16)",
    borderRadius: 10,
    width: 40,
    height: 40,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiNum: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },
  kpiLabel: { fontSize: 11, color: "var(--atr-text-muted)" },
};

function Stat({ n, label }) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

export default function VillagesHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Desa Wisata"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Tinggal di rumah warga,{" "}
            <span style={{ color: "var(--atr-purple)" }}>
              hidup seperti lokal.
            </span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Desa wisata terkurasi Kemenparekraf, dari Wae Rebo di Flores hingga
            Penglipuran di Bali. Homestay, workshop kerajinan, tarian
            tradisional, dan kuliner asli kampung.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <button style={dirStyles.heroPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Telusuri ADWI 2026
            </button>
            <button style={dirStyles.heroSecondary}>
              Apa itu desa wisata?
            </button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="320+" label="Desa terkurasi" />
            <Stat n="34" label="Provinsi" />
            <Stat n="92" label="ADWI Maju & Mandiri" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={vh.collage}>
            <img
              src="https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgMain}
            />
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgTop}
            />
            <img
              src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgBottom}
            />
            <div style={vh.adwiBadge}>
              <div style={vh.adwiLabel}>
                ANUGERAH DESA
                <br />
                WISATA INDONESIA
              </div>
              <div style={vh.adwiYear}>2026</div>
            </div>
            <div style={vh.kpiCard}>
              <span style={vh.kpiIcon}>{"\uD83C\uDFE0"}</span>
              <div>
                <div style={vh.kpiNum}>1.840+ homestay</div>
                <div style={vh.kpiLabel}>tersedia di seluruh Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
