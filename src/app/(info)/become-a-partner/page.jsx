"use client";

import React from "react";
import Link from "next/link";
import { TopNav, SiteFooter } from "@/components/layout";
import { mt } from "@/styles/become-a-partner-styles";
import { MI, MITRA_STEPS } from "@/data/become-a-partner-data";

/* ── Sub-components ── */
import PartnerCalculator from "./_components/PartnerCalculator";
import PartnerFaq from "./_components/PartnerFaq";
import PartnerTypes from "./_components/PartnerTypes";
import PartnerValues from "./_components/PartnerValues";
import PartnerTesti from "./_components/PartnerTesti";

export default function BecomeAPartnerPage() {
  return (
    <div style={mt.page}>
      <style>{`
        .mt-lift { transition: transform .15s, box-shadow .15s, border-color .15s; }
        .mt-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(31,27,51,0.12); border-color: var(--atr-purple-light); }
        @media (max-width: 920px) {
          .mt-hero { grid-template-columns: 1fr !important; }
          .mt-grid3 { grid-template-columns: 1fr 1fr !important; }
          .mt-grid4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .mt-grid3, .mt-grid4 { grid-template-columns: 1fr !important; }
          .mt-calc { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <TopNav active="" />

      {/* HERO */}
      <section style={mt.hero}>
        <div style={mt.heroGlow} />
        <div style={mt.heroInner} className="mt-hero">
          <div style={mt.heroLeft}>
            <span style={mt.heroBadge}>🤝 Atourin for Business</span>
            <h1 style={mt.heroTitle}>Kembangkan bisnis wisatamu bersama Atourin</h1>
            <p style={mt.heroSub}>
              Pasarkan paket wisata, experience, tiket atraksi, homestay, hingga produk UMKM-mu ke ribuan wisatawan
              se-Indonesia, gratis, mudah, dan berdampak.
            </p>
            <div style={mt.heroBtns}>
              <Link href="/partnership" style={mt.btnPrimary}>
                Daftar jadi Mitra
              </Link>
              <a href="#cara" style={mt.btnGhost}>
                Lihat cara kerjanya
              </a>
            </div>
            <div style={mt.heroTrust}>
              <span style={mt.trustItem}>{MI.check} Gratis daftar</span>
              <span style={mt.trustItem}>{MI.check} Tanpa biaya bulanan</span>
              <span style={mt.trustItem}>{MI.check} Verifikasi 1×24 jam</span>
            </div>
          </div>
          <div style={mt.heroCardWrap}>
            <div style={mt.heroCard}>
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=70"
                alt=""
                style={mt.heroImg}
                onError={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              />
              <div style={mt.heroCardStat}>
                <div style={mt.hcStatVal}>Rp6,5jt+</div>
                <div style={mt.hcStatLabel}>rata-rata potensi/bulan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={mt.statsBand}>
        <div style={mt.statsInner} className="mt-grid4">
          {[
            ["10.000+", "Wisatawan aktif"],
            ["540+", "Desa wisata mitra"],
            ["1.200+", "Pemandu bersertifikat"],
            ["4.8★", "Rating pelanggan"],
          ].map(([v, l]) => (
            <div key={l} style={mt.statCell}>
              <div style={mt.statVal}>{v}</div>
              <div style={mt.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={mt.body}>
        {/* PARTNER TYPES */}
        <div style={mt.secHead}>
          <div style={mt.secKicker}>Untuk siapa</div>
          <div style={mt.secTitle}>Cocok untuk semua pelaku wisata</div>
        </div>
        <PartnerTypes />

        {/* VALUE PROPS */}
        <div style={mt.secHead}>
          <div style={mt.secKicker}>Kenapa Atourin</div>
          <div style={mt.secTitle}>Semua yang kamu butuh untuk bertumbuh</div>
        </div>
        <PartnerValues />
      </div>

      {/* CALCULATOR */}
      <div style={mt.calcBand}>
        <div style={mt.body}>
          <PartnerCalculator />
        </div>
      </div>

      <div style={mt.body} id="cara">
        {/* STEPS */}
        <div style={mt.secHead}>
          <div style={mt.secKicker}>Cara bergabung</div>
          <div style={mt.secTitle}>Mulai jualan dalam 4 langkah</div>
        </div>
        <div style={mt.stepGrid} className="mt-grid4">
          {MITRA_STEPS.map(([t, d], i) => (
            <div key={t} style={mt.stepCard}>
              <span style={mt.stepNum}>{i + 1}</span>
              <div style={mt.stepTitle}>{t}</div>
              <div style={mt.stepDesc}>{d}</div>
            </div>
          ))}
        </div>

        {/* TESTIMONI */}
        <div style={mt.secHead}>
          <div style={mt.secKicker}>Kata mitra</div>
          <div style={mt.secTitle}>Dipercaya pelaku wisata Nusantara</div>
        </div>
        <PartnerTesti />

        {/* FAQ */}
        <div style={mt.secHead}>
          <div style={mt.secKicker}>FAQ</div>
          <div style={mt.secTitle}>Pertanyaan seputar kemitraan</div>
        </div>
        <PartnerFaq />
      </div>

      {/* CTA BAND */}
      <div style={mt.body}>
        <div style={mt.ctaBand}>
          <div style={mt.ctaGlow} />
          <div style={mt.ctaContent}>
            <div style={mt.ctaTitle}>Siap menjangkau lebih banyak wisatawan?</div>
            <div style={mt.ctaDesc}>
              Gabung gratis hari ini dan mulai pasarkan produk wisatamu ke seluruh Indonesia.
            </div>
            <div style={mt.ctaBtns}>
              <Link href="/partnership" style={mt.ctaBtnPrimary}>
                Daftar jadi Mitra sekarang
              </Link>
              <Link href="/help-center" style={mt.ctaBtnGhost}>
                Punya pertanyaan?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
