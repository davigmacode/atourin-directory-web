"use client";

import React from "react";
import Link from "next/link";
import { TopNav, SiteFooter } from "@/components/layout";
import { ab } from "@/styles/about-styles";

/* ── Static Data ── */
import { VALUES, RECOGNITION, AB_I } from "@/data/about-data";

/* ── Sub-components ── */
import AboutHero from "./_components/AboutHero";
import AboutImpact from "./_components/AboutImpact";
import AboutTimeline from "./_components/AboutTimeline";
import AboutTeam from "./_components/AboutTeam";

export default function AboutPage() {
  return (
    <div data-screen-label="Tentang Kami" style={ab.page}>
      <style>{`
        @keyframes abBlink { 50% { opacity: 0 } }
        @keyframes abFade {
          from { opacity: 0; transform: translateY(6.5px) }
          to { opacity: 1; transform: none }
        }
        .ab-lift { transition: transform .15s, box-shadow .15s, border-color .15s }
        .ab-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 34px rgba(31,27,51,0.12);
          border-color: var(--atr-purple-light);
        }
        .ab-team-card:hover img { transform: scale(1.05) }
        @media (max-width: 920px) {
          .ab-story { grid-template-columns: 1fr !important }
          .ab-grid4 { grid-template-columns: 1fr 1fr !important }
          .ab-grid2 { grid-template-columns: 1fr !important }
          .ab-lead { grid-template-columns: 1fr 1fr !important }
          .ab-team { grid-template-columns: 1fr 1fr !important }
          .ab-time { grid-template-columns: 1fr !important }
          .ab-time-line { display: none }
        }
        @media (max-width: 560px) {
          .ab-grid4, .ab-lead, .ab-team { grid-template-columns: 1fr !important }
        }
      `}</style>

      <TopNav active="" />

      {/* Hero */}
      <AboutHero />

      {/* Story */}
      <section style={ab.body}>
        <div style={ab.story} className="ab-story">
          <div style={ab.storyArtWrap}>
            <div style={ab.storyArt}>
              <img
                src="https://images.unsplash.com/photo-1542665952-14513db15293?w=900&auto=format&fit=crop&q=70"
                alt="Atourin"
                style={ab.storyImg}
                onError={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              />
            </div>
          </div>
          <div>
            <div style={ab.kicker}>Cerita kami</div>
            <h2 style={ab.storyTitle}>Berawal dari satu keyakinan sederhana</h2>
            <p style={ab.storyText}>
              Indonesia punya ribuan cerita yang belum tersampaikan, desa-desa dengan kearifan lokal, pemandu yang hafal
              tiap lekuk jalannya, dan pengalaman yang tak ada duanya. Sayangnya, banyak yang sulit ditemukan wisatawan.
            </p>
            <p style={ab.storyText}>
              Atourin hadir untuk menjembatani itu: <strong>teknologi yang mengangkat pariwisata lokal</strong>, agar
              setiap perjalanan berdampak baik bagi wisatawan, masyarakat, dan bumi.
            </p>
            <div style={ab.storyQuote}>“Menjelajah Nusantara, memberdayakan Indonesia.”</div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <AboutImpact />

      <div style={ab.body}>
        {/* Values */}
        <div style={ab.secHead}>
          <div style={ab.kicker}>Nilai yang kami pegang</div>
          <h2 style={ab.secTitle}>Empat pilar di balik setiap langkah</h2>
        </div>
        <div style={ab.valGrid} className="ab-grid2">
          {VALUES.map((v, i) => (
            <div key={v.t} style={ab.valCard} className="ab-lift">
              <div style={ab.valTop}>
                <span style={{ ...ab.valIcon, color: v.c, background: v.c + "18" }}>{AB_I[v.icon]}</span>
                <span style={ab.valNum}>0{i + 1}</span>
              </div>
              <div style={{ ...ab.valTitle, color: v.c }}>{v.t}</div>
              <div style={ab.valDesc}>{v.d}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={ab.secHead}>
          <div style={ab.kicker}>Perjalanan kami</div>
          <h2 style={ab.secTitle}>Tumbuh bersama pariwisata Indonesia</h2>
        </div>
        <AboutTimeline />
      </div>

      {/* Recognition */}
      <section style={ab.recBand}>
        <div style={ab.body}>
          <div style={ab.secHead}>
            <div style={ab.kicker}>Penghargaan</div>
            <h2 style={ab.secTitle}>Diakui sepanjang perjalanan</h2>
          </div>
          <div style={ab.recGrid} className="ab-grid4">
            {RECOGNITION.map(([t, y]) => (
              <div key={t} style={ab.recCard}>
                <span style={ab.recIcon}>{AB_I.award}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={ab.recT}>{t}</div>
                  <div style={ab.recY}>{y}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={ab.body}>
        {/* Team */}
        <div style={ab.secHead}>
          <div style={ab.kicker}>Meet the team</div>
          <h2 style={ab.secTitle}>Tim di balik Atourin</h2>
          <p style={ab.secSub}>Profesional yang berdedikasi membawa wisata Indonesia ke level lebih tinggi.</p>
        </div>
        <AboutTeam />

        {/* CTA */}
        <div style={ab.cta}>
          <div style={ab.ctaGlow} />
          <div style={ab.ctaContent}>
            <div style={ab.ctaTitle}>Jadi bagian dari perjalanan kami</div>
            <div style={ab.ctaDesc}>Jelajah Nusantara sebagai wisatawan, atau kembangkan bisnismu sebagai mitra.</div>
            <div style={ab.ctaBtns}>
              <Link href="/market/experience" style={ab.ctaPrimary}>
                Mulai jelajahi
              </Link>
              <button style={ab.ctaGhost} onClick={() => alert("Menjadi Mitra")}>
                Jadi mitra Atourin
              </button>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
