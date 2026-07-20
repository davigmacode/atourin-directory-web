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

function PriceCard({ price }) {
  const [liked, setLiked] = useState(false);
  return (
    <div style={detailStyles.priceCard}>
      <div style={detailStyles.priceRow}>
        <div>
          <div style={detailStyles.priceFromLabel}>Mulai dari</div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={detailStyles.priceVal}>{price || "Rp 1.500.000"}</span>
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
          { label: "Akomodasi & Fasilitas", value: "Termasuk paket" },
          { label: "Transportasi Lokal", value: "Termasuk paket" },
          { label: "Konsumsi Harian", value: "Termasuk paket" },
          { label: "Tiket Masuk Objek Wisata", value: "Termasuk paket" },
          { label: "Pemandu Lokal Berlisensi", value: "Termasuk paket" },
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

export default function DetailHero({ itinerary }) {
  // Safe extraction of fields for both database (new) and static (old) data
  const title = itinerary.name?.id || itinerary.name?.en || itinerary.title || '';
  const city = itinerary.destination?.name || itinerary.city || '';
  const daysLabel = typeof itinerary.days === 'string'
    ? itinerary.days
    : ((itinerary.durationDays ? `${itinerary.durationDays} Hari` : '') + (itinerary.durationNights ? ` · ${itinerary.durationNights} Malam` : ''));
  const imgUrl = itinerary.coverImage?.url || itinerary.img || '';

  const rawBudget = itinerary.budgetEstimation;
  const priceVal = itinerary.price || (typeof rawBudget === 'number' ? `Rp ${(rawBudget / 1000000).toFixed(1)}jt` : '') || 'Rp 1.500.000';

  const descText = itinerary.description?.id || itinerary.description?.en || itinerary.desc || `Eksplorasi menarik di ${city} dengan rute perjalanan terbaik.`;
  const diffLabel = itinerary.difficulty === 'easy' ? 'Mudah' : itinerary.difficulty === 'medium' ? 'Sedang' : itinerary.difficulty === 'hard' ? 'Tantangan' : 'Mudah';

  return (
    <section>
      {/* Cover image */}
      <div style={detailStyles.heroCover}>
        <img src={imgUrl} alt={title} style={detailStyles.heroImg} />
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
              <span style={detailStyles.heroTagLight}>{city}</span>
              <span style={detailStyles.heroTagDot}>{"\u00B7"}</span>
              <span style={detailStyles.heroTagLight}>{daysLabel}</span>
            </div>
            <h1 style={detailStyles.heroTitle}>{title}</h1>
            <p style={detailStyles.heroSub}>
              {descText}
            </p>
            <div style={detailStyles.heroStatsRow}>
              <HeroStat
                icon={<HeroStatGlyph kind="duration" />}
                label="Durasi"
                value={daysLabel}
              />
              <HeroStat
                icon={<HeroStatGlyph kind="group" />}
                label="Min. Peserta"
                value={`${itinerary.minPax || 1} Orang`}
              />
              <HeroStat
                icon={<HeroStatGlyph kind="language" />}
                label="Bahasa"
                value={Array.isArray(itinerary.languages) && itinerary.languages.length > 0 ? (typeof itinerary.languages[0] === 'object' ? (itinerary.languages[0].name?.id || itinerary.languages[0].name?.en) : itinerary.languages[0]) : "Indonesia"}
              />
              <HeroStat
                icon={<HeroStatGlyph kind="difficulty" />}
                label="Level"
                value={diffLabel}
              />
            </div>
          </div>

          {/* Right column — PriceCard */}
          <div style={detailStyles.heroRight}>
            <PriceCard price={priceVal} />
          </div>
        </div>
      </div>
    </section>
  );
}
