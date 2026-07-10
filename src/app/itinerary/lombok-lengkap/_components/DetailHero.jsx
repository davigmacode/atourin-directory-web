"use client";

import React, { useState } from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import {
  GalleryIcon,
  EditIcon,
  CopyIcon,
  ShieldIcon,
  HeartIcon,
} from "./Shared";

function HeroStatGlyph({ kind }) {
  const s = { width: 18, height: 18 };
  if (kind === "duration") {
    return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "group") {
    return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 19c0-3.3 3.1-6 7-6s7 2.7 7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M17 9c2.2 0 4 1.8 4 4 0 1.5-.7 2.6-1.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "language") {
    return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3c2.5 3 4 6.5 4 9s-1.5 6-4 9M12 3C9.5 6 8 9.5 8 12s1.5 6 4 9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "difficulty") {
    return (
      <svg {...s} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3v18h18M7 16l4-6 4 4 6-8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return null;
}

function HeroStat({ icon, label, value }) {
  return (
    <div style={detailStyles.heroStat}>
      <div style={detailStyles.heroStatIcon}>{icon}</div>
      <div>
        <div style={detailStyles.heroStatLabel}>{label}</div>
        <div style={detailStyles.heroStatValue}>{value}</div>
      </div>
    </div>
  );
}

function Breakdown({ items }) {
  return (
    <div style={detailStyles.priceBreakdown}>
      {items.map((item, i) => (
        <div key={i} style={detailStyles.breakdownRow}>
          <span style={detailStyles.breakdownLabel}>{item.label}</span>
          <span style={detailStyles.breakdownVal}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function PriceCard() {
  const [liked, setLiked] = useState(false);
  return (
    <div style={detailStyles.priceCard}>
      <div style={detailStyles.priceRow}>
        <div>
          <div style={detailStyles.priceFromLabel}>Mulai dari</div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={detailStyles.priceVal}>Rp 2.890.000</span>
            <span style={detailStyles.priceUnit}>/pax</span>
          </div>
        </div>
        <button
          style={{
            ...detailStyles.heartBtn,
            ...(liked ? detailStyles.heartBtnOn : {}),
          }}
          onClick={() => setLiked(!liked)}
          aria-label="Favorite"
        >
          <HeartIcon filled={liked} />
        </button>
      </div>
      <Breakdown
        items={[
          { label: "Akomodasi (3 malam)", value: "Rp 1.200.000" },
          { label: "Transportasi", value: "Rp 850.000" },
          { label: "Makanan (6x)", value: "Rp 480.000" },
          { label: "Tiket masuk objek wisata", value: "Rp 280.000" },
          { label: "Pemandu lokal", value: "Rp 80.000" },
        ]}
      />
      <div style={detailStyles.ctaCol}>
        <button style={detailStyles.editPrimary}>
          <EditIcon /> Edit & Personalisasi
        </button>
        <button style={detailStyles.copyBtn}>
          <CopyIcon /> Salin Rencana
        </button>
        <button style={detailStyles.bookBtn}>Pesan Sekarang</button>
      </div>
      <div style={detailStyles.priceFooter}>
        <ShieldIcon />
        <span>Pembayaran aman & kebijakan refund fleksibel.</span>
      </div>
    </div>
  );
}

export default function DetailHero() {
  const coverUrl =
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1600&auto=format&fit=crop&q=70";

  return (
    <section>
      {/* Cover image */}
      <div style={detailStyles.heroCover}>
        <img src={coverUrl} alt="Lombok" style={detailStyles.heroImg} />
        <div style={detailStyles.heroOverlay} />
        <button style={detailStyles.heroGalleryBtn}>
          <GalleryIcon /> Lihat Galeri
        </button>
      </div>

      {/* Body row */}
      <div style={detailStyles.heroBody}>
        <div style={detailStyles.heroRow}>
          {/* Left column */}
          <div style={detailStyles.heroLeft}>
            <div style={detailStyles.heroChipsRow}>
              <span style={detailStyles.heroTagPurple}>ITINERARY</span>
              <span style={detailStyles.heroTagDot}>{"\u00B7"}</span>
              <span style={detailStyles.heroTagLight}>Lombok, NTB</span>
              <span style={detailStyles.heroTagDot}>{"\u00B7"}</span>
              <span style={detailStyles.heroTagLight}>4 Hari 3 Malam</span>
            </div>
            <h1 style={detailStyles.heroTitle}>Liburan Lengkap Lombok</h1>
            <p style={detailStyles.heroSub}>
              Jelajahi keindahan Lombok dari Pantai Kuta Mandalika, Bukit
              Merese, hingga Desa Sade yang eksotis. Paket lengkap dengan
              akomodasi, transportasi, dan pemandu lokal.
            </p>
            <div style={detailStyles.heroStatsRow}>
              <HeroStat
                icon={<HeroStatGlyph kind="duration" />}
                label="Durasi"
                value="4 Hari 3 Malam"
              />
              <HeroStat
                icon={<HeroStatGlyph kind="group" />}
                label="Min. Peserta"
                value="2 Orang"
              />
              <HeroStat
                icon={<HeroStatGlyph kind="language" />}
                label="Bahasa"
                value="Indonesia"
              />
              <HeroStat
                icon={<HeroStatGlyph kind="difficulty" />}
                label="Level"
                value="Mudah"
              />
            </div>
          </div>

          {/* Right column — PriceCard */}
          <div style={detailStyles.heroRight}>
            <PriceCard />
          </div>
        </div>
      </div>
    </section>
  );
}
