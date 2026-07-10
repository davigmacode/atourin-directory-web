"use client";

import React from "react";
import { cardStyles, dirStyles } from "@/styles/attraction-styles";

/* ── Icons ── */
function PlusIcon({ color = "var(--atr-text)" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── BuilderMock ── */
function BuilderMock() {
  return (
    <div style={cardStyles.builderCard}>
      <div style={cardStyles.builderHeader}>
        <div style={cardStyles.builderTitle}>3 Hari di Yogyakarta</div>
        <div style={cardStyles.builderTabs}>
          <span
            style={{
              ...cardStyles.builderTab,
              ...cardStyles.builderTabActive,
            }}
          >
            Hari 1
          </span>
          <span style={cardStyles.builderTab}>Hari 2</span>
          <span style={cardStyles.builderTab}>Hari 3</span>
        </div>
      </div>
      <div style={cardStyles.builderActivities}>
        {[
          {
            t: "08:00",
            title: "Sarapan Gudeg Yu Djum",
            tag: "Food",
            color: "#FFF4D9",
            tc: "#B47A00",
          },
          {
            t: "10:30",
            title: "Keraton Yogyakarta",
            tag: "Culture",
            color: "#EDE9FF",
            tc: "var(--atr-purple)",
          },
          {
            t: "14:00",
            title: "Taman Sari Water Castle",
            tag: "Sightseeing",
            color: "#E2F1FF",
            tc: "#1F6FB0",
          },
          {
            t: "19:00",
            title: "Malioboro Sunset Walk",
            tag: "Walk",
            color: "#E6F7E6",
            tc: "#2D8838",
          },
        ].map((a, i) => (
          <div key={i} style={cardStyles.builderRow}>
            <div style={cardStyles.builderTime}>{a.t}</div>
            <div style={cardStyles.builderDot}>
              <div style={cardStyles.builderInnerDot} />
              {i < 3 && <div style={cardStyles.builderLine} />}
            </div>
            <div style={cardStyles.builderItem}>
              <div style={cardStyles.builderItemTitle}>{a.title}</div>
              <span
                style={{
                  ...cardStyles.builderItemTag,
                  background: a.color,
                  color: a.tc,
                }}
              >
                {a.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTABand() {
  return (
    <section
      style={{
        ...cardStyles.ctaBand,
        marginTop: 80,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={cardStyles.ctaInner}>
        <div style={cardStyles.ctaLeft}>
          <div style={cardStyles.eyebrow}>{"\uD83D\uDEE0"} Bikin sendiri</div>
          <h2 style={cardStyles.ctaTitle}>
            Tidak nemu yang pas?
            <br />
            Susun itinerary kamu sendiri.
          </h2>
          <p style={cardStyles.ctaSub}>
            Drag & drop aktivitas dari direktori Atourin, atau biarkan asisten
            AI menyusun draft awal untukmu dalam 30 detik.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <button style={cardStyles.ctaPrimary}>
              <PlusIcon color="var(--atr-purple)" /> Mulai dari nol
            </button>
            <button style={cardStyles.ctaSecondary}>
              <SparkleIcon /> Coba dengan AI
            </button>
          </div>
        </div>
        <div style={cardStyles.ctaRight}>
          <BuilderMock />
        </div>
      </div>
    </section>
  );
}
