"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import detailStyles from "@/styles/itinerary-detail-styles";

/* ------------------------------------------------------------------ */
/*  Image references                                                   */
/* ------------------------------------------------------------------ */
const LBK = {
  cover:
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1600&auto=format&fit=crop&q=70",
  mandalika:
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1000&auto=format&fit=crop&q=70",
  kuta: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=70",
  merese:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&auto=format&fit=crop&q=70",
  tanjungaan:
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1000&auto=format&fit=crop&q=70",
  sade: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1000&auto=format&fit=crop&q=70",
  ayam: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1000&auto=format&fit=crop&q=70",
  sasak:
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1000&auto=format&fit=crop&q=70",
};

const IMG = {
  lombok:
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=70",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
  bromo:
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  raja: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
};

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M21 15l-5-5-6 6-3-3-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 5l4 4-9.5 9.5L4 21l2.5-4.5L14 5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7.5 13l7 3M16.5 8l-7 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 3h14v18l-7-4.5L5 21V3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9V3h12v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="13"
        width="12"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6 17H4a2 2 0 01-2-2v-3a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 15h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 10h18M8 4V2M16 4V2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 14l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8v5M12 16v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12a9 9 0 01-9 9H3l2.5-5A9 9 0 1121 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronSm({ up }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: up ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 16v2a1 1 0 001 1h2a1 1 0 001-1v-1h12v1a1 1 0 001 1h2a1 1 0 001-1v-2l-1-5-2-4H6L4 6l-1 5-1 5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 11h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2a10 10 0 00-10 10c0 6 10 12 10 12s10-6 10-12A10 10 0 0012 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }) {
  if (filled) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#F46263">
        <path d="M12 20s-7-4.3-9.2-8.5C1.3 8.3 2.8 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.2 0 4.7 3.3 3.2 6.5C19 15.7 12 20 12 20z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7-4.3-9.2-8.5C1.3 8.3 2.8 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.2 0 4.7 3.3 3.2 6.5C19 15.7 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }) {
  if (filled) {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC442">
        <path d="M12 2l3 7 7 .5-5.5 5 1.5 7.5L12 17l-6 3.5L7.5 15 2 9.5l7-.5z" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l3 7 7 .5-5.5 5 1.5 7.5L12 17l-6 3.5L7.5 15 2 9.5l7-.5z"
        stroke="#E6E6E6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

function LanguageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

function DollarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 8.5C8 7 9.5 6 12 6s4 1 4 2.5-1.5 3-4 3.5-4 1.5-4 3.5 1.5 3 4 3 4-1 4-2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Glyph for HeroStat                                                 */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  HeroStat                                                           */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  PriceCard + Breakdown                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  DetailHero (cover + body + stats + PriceCard)                      */
/* ------------------------------------------------------------------ */
function DetailHero() {
  return (
    <section>
      {/* Cover image */}
      <div style={detailStyles.heroCover}>
        <img src={LBK.cover} alt="Lombok" style={detailStyles.heroImg} />
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

/* ------------------------------------------------------------------ */
/*  ActionBar (sticky tab switcher)                                    */
/* ------------------------------------------------------------------ */
function ActionBar({ activeTab, setActiveTab }) {
  return (
    <div style={detailStyles.actionBar}>
      <div style={detailStyles.actionInner}>
        <div style={detailStyles.tabsLeft}>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "plan" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("plan")}
          >
            <PlanIcon /> Rencana Perjalanan
          </button>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "about" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("about")}
          >
            <InfoIcon /> Tentang
          </button>
        </div>
        <div style={detailStyles.actionsRight}>
          <button style={detailStyles.iconBtn} aria-label="Share">
            <ShareIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="Bookmark">
            <BookmarkIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="Print">
            <PrintIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="More">
            <MoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AuthorStrip                                                        */
/* ------------------------------------------------------------------ */
function AuthorStrip() {
  return (
    <div style={detailStyles.authorStrip}>
      <div style={detailStyles.authorLeft}>
        <img
          src="https://i.pravatar.cc/112?img=11"
          alt="Author"
          style={detailStyles.authorAvLg}
        />
        <div>
          <div style={detailStyles.authorLine1}>
            <span style={detailStyles.authorName}>Rizky Pratama</span>
            <span style={detailStyles.verifiedBadge}>
              <CheckBadge /> Travel Specialist
            </span>
          </div>
          <div style={detailStyles.authorLine2}>
            <span>Pemandu Wisata Lombok</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>18 Itinerary</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>Bergabung 2023</span>
          </div>
        </div>
      </div>
      <div style={detailStyles.authorRight}>
        <button style={detailStyles.followBtn}>Ikuti</button>
        <button style={detailStyles.messageBtn}>
          <ChatIcon /> Pesan
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data: DAYS / ACTIVITIES                                            */
/* ------------------------------------------------------------------ */
const DAYS = [
  {
    id: 1,
    label: "Hari 1",
    date: "12 Jun",
    title: "Kedatangan & Kuta Mandalika",
  },
  {
    id: 2,
    label: "Hari 2",
    date: "13 Jun",
    title: "Bukit Merese & Tanjung Aan",
  },
  {
    id: 3,
    label: "Hari 3",
    date: "14 Jun",
    title: "Desa Sade & Pantai Selatan",
  },
  { id: 4, label: "Hari 4", date: "15 Jun", title: "Pulau Seribu & Check-out" },
];

const ACTIVITIES_BY_DAY = {
  1: [
    {
      id: "a1-1",
      order: 1,
      time: "08:00",
      endTime: "10:00",
      duration: "2 jam",
      type: "transport",
      typeLabel: "Transportasi",
      title: "Penjemputan Bandara",
      location: "Bandara Internasional Lombok (LOP)",
      img: null,
      desc: "Penjemputan dari bandara menuju hotel di kawasan Kuta Mandalika.",
      tags: ["Airport Transfer", "AC"],
      tips: "Pastikan nomor penerbangan kamu sudah dikonfirmasi H-1.",
      cost: "Termasuk paket",
    },
    {
      id: "a1-2",
      order: 2,
      time: "10:30",
      endTime: "12:00",
      duration: "1.5 jam",
      type: "activity",
      typeLabel: "Aktivitas",
      title: "Check-in Hotel & Relaksasi",
      location: "Kuta Mandalika",
      img: null,
      desc: "Check-in hotel, istirahat sejenak, dan persiapan eksplorasi.",
      tags: ["Akomodasi", "Sarapan"],
      tips: "Manfaatkan welcome drink yang disediakan hotel.",
      cost: "Termasuk paket",
    },
    {
      id: "a1-3",
      order: 3,
      time: "14:00",
      endTime: "17:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pantai Kuta Mandalika",
      location: "Pantai Kuta, Lombok Tengah",
      img: LBK.kuta,
      desc: "Nikmati pasir putih dan ombak tenang di Pantai Kuta Mandalika. Cocok untuk berenang, bermain pasir, atau sekadar bersantai.",
      tags: ["Pantai", "Pasir Putih", "Spot Foto"],
      tips: "Bawa sunscreen dan topi karena cuaca bisa sangat terik.",
      cost: "Gratis",
    },
    {
      id: "a1-4",
      order: 4,
      time: "19:00",
      endTime: "21:00",
      duration: "2 jam",
      type: "meal",
      typeLabel: "Makan Malam",
      title: "Makan Malam Seafood",
      location: "Warung Seafood Kuta",
      img: null,
      desc: "Makan malam dengan hidangan seafood khas Lombok.",
      tags: ["Seafood", "Kuliner"],
      tips: "Coba sambal beberuk khas Lombok!",
      cost: "Termasuk paket",
    },
  ],
  2: [
    {
      id: "a2-1",
      order: 1,
      time: "06:30",
      endTime: "08:00",
      duration: "1.5 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Sunrise di Bukit Merese",
      location: "Bukit Merese, Lombok Tengah",
      img: LBK.merese,
      desc: "Pendakian singkat ke Bukit Merese untuk menikmati sunrise spektakuler dengan panorama Samudra Hindia.",
      tags: ["Sunrise", "Bukit", "Spot Foto"],
      tips: "Bawa senter kecil — jalur pendakian masih gelap sebelum 06.00.",
      cost: "Gratis",
    },
    {
      id: "a2-2",
      order: 2,
      time: "09:00",
      endTime: "12:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Tanjung Aan",
      location: "Tanjung Aan, Lombok Tengah",
      img: LBK.tanjungaan,
      desc: "Teluk dengan dua pasir putih yang unik: pasir seperti merica dan pasir seperti gula. Tempat sempurna untuk snorkeling.",
      tags: ["Teluk", "Snorkeling", "Pasir Unik"],
      tips: "Sewa snorkeling set di lokasi hanya Rp 50.000.",
      cost: "Rp 10.000",
    },
    {
      id: "a2-3",
      order: 3,
      time: "12:30",
      endTime: "13:30",
      duration: "1 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Makan Siang di Pinggir Pantai",
      location: "Warung Makan Tanjung Aan",
      img: null,
      desc: "Makan siang dengan nasi campur dan ikan bakar segar.",
      tags: ["Ikan Bakar", "Kuliner"],
      tips: null,
      cost: "Termasuk paket",
    },
  ],
  3: [
    {
      id: "a3-1",
      order: 1,
      time: "08:00",
      endTime: "11:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Budaya",
      title: "Desa Sade — Kampung Tradisional Sasak",
      location: "Desa Sade, Pujut, Lombok Tengah",
      img: LBK.sade,
      desc: "Kunjungi desa adat Suku Sasak yang masih mempertahankan arsitektur dan tradisi leluhur. Lihat proses menenun kain khas Lombok.",
      tags: ["Budaya", "Tradisional", "Tenun"],
      tips: "Jangan lupa mampir ke rumah tenun dan beli kain songket khas.",
      cost: "Rp 15.000",
    },
    {
      id: "a3-2",
      order: 2,
      time: "11:30",
      endTime: "13:00",
      duration: "1.5 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Kuliner Khas Lombok",
      location: "Rumah Makan Sasak",
      img: LBK.ayam,
      desc: "Mencicipi ayam taliwang dan plecing kangkung — dua ikon kuliner Lombok.",
      tags: ["Ayam Taliwang", "Kuliner"],
      tips: "Pilih level pedas yang sesuai; ayam taliwang asli cukup pedas.",
      cost: "Termasuk paket",
    },
    {
      id: "a3-3",
      order: 3,
      time: "14:00",
      endTime: "17:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pantai Selatan Lombok",
      location: "Pantai Selong Belanak / Mawun",
      img: LBK.sasak,
      desc: "Eksplorasi pantai selatan Lombok yang masih alami dengan ombak cocok untuk pemula surfing.",
      tags: ["Pantai", "Surfing", "Alami"],
      tips: "Cocok untuk belajar surfing — ombaknya bersahabat untuk pemula.",
      cost: "Gratis",
    },
  ],
  4: [
    {
      id: "a4-1",
      order: 1,
      time: "07:00",
      endTime: "10:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pulau Seribu (Gili)",
      location: "Gili Kedis / Gili Nanggu",
      img: LBK.mandalika,
      desc: "Trip singkat ke gili-gili kecil di Lombok Barat. Snorkeling di perairan jernih dengan biota laut yang indah.",
      tags: ["Gili", "Snorkeling", "Laut"],
      tips: "Bawa roti untuk memberi makan ikan — pengalaman snorkeling lebih seru.",
      cost: "Rp 150.000",
    },
    {
      id: "a4-2",
      order: 2,
      time: "12:00",
      endTime: "14:00",
      duration: "2 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Makan Siang & Check-out",
      location: "Hotel Kuta Mandalika",
      img: null,
      desc: "Makan siang terakhir di hotel, check-out, dan persiapan transfer ke bandara.",
      tags: ["Hotel", "Check-out"],
      tips: "Pastikan barang bawaan lengkap sebelum meninggalkan hotel.",
      cost: "Termasuk paket",
    },
    {
      id: "a4-3",
      order: 3,
      time: "14:30",
      endTime: null,
      duration: null,
      type: "transport",
      typeLabel: "Transportasi",
      title: "Transfer ke Bandara",
      location: "Bandara Internasional Lombok (LOP)",
      img: null,
      desc: "Antar-jemput ke bandara untuk penerbangan kembali.",
      tags: ["Airport Transfer"],
      tips: "Tiba di bandara minimal 2 jam sebelum jadwal terbang.",
      cost: "Termasuk paket",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function computeDayStats(activities) {
  let totalCost = 0;
  const types = new Set();
  activities.forEach((a) => {
    types.add(a.type);
    const num = parseInt(a.cost?.replace(/[^0-9]/g, "") || "0", 10);
    totalCost += num;
  });
  return {
    activityCount: activities.length,
    totalCost,
    types: Array.from(types),
  };
}

function getTypeColor(type) {
  const map = {
    transport: { bg: "#EDE9FF", color: "#7068D5" },
    activity: { bg: "#E4F4E4", color: "#51B054" },
    meal: { bg: "#FFFBEE", color: "#C29B00" },
    wisata: { bg: "#E1F0FA", color: "#2C7FB8" },
    budaya: { bg: "#F3E8FF", color: "#8B5CF6" },
  };
  return (
    map[type] || { bg: "var(--atr-bg-soft)", color: "var(--atr-text-muted)" }
  );
}

/* ------------------------------------------------------------------ */
/*  TransportLink                                                      */
/* ------------------------------------------------------------------ */
function TransportLink({ activity, index }) {
  return (
    <div style={detailStyles.transportLink}>
      <div />
      <div style={detailStyles.transportConnector} />
      <div style={detailStyles.transportCard}>
        <CarIcon />
        <span>
          <div style={detailStyles.transportTitle}>{activity.title}</div>
          {activity.desc && (
            <div style={detailStyles.transportMeta}>{activity.desc}</div>
          )}
        </span>
        {activity.location && (
          <button style={detailStyles.viewMapLink}>
            <PinIcon /> Lihat Peta
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ActivityCard                                                       */
/* ------------------------------------------------------------------ */
function ActivityCard({ activity, index, showTip, setShowTip }) {
  const colors = getTypeColor(activity.type);
  return (
    <div
      style={{
        ...detailStyles.activityCard,
        ...(activity.type === "transport"
          ? detailStyles.activityCardCompact
          : {}),
      }}
    >
      {/* Time column */}
      <div style={detailStyles.timeCol}>
        <div style={detailStyles.timeNum}>{activity.time}</div>
        {activity.endTime && (
          <div style={detailStyles.timeEnd}>{activity.endTime}</div>
        )}
        {activity.duration && (
          <div style={detailStyles.timeDur}>{activity.duration}</div>
        )}
      </div>

      {/* Connector column */}
      <div style={detailStyles.connectorCol}>
        <div style={detailStyles.numBubble}>{index + 1}</div>
        <div style={detailStyles.connectorLine} />
      </div>

      {/* Body */}
      <div
        style={detailStyles.actBody}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--atr-purple)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(112,104,213,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--atr-outline)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={detailStyles.actHeader}>
          {activity.img && (
            <img
              src={activity.img}
              alt={activity.title}
              style={detailStyles.actImg}
            />
          )}
          <div style={{ flex: 1 }}>
            <span
              style={{
                ...detailStyles.actTypeChip,
                background: colors.bg,
                color: colors.color,
              }}
            >
              {activity.typeLabel}
            </span>
            <div style={detailStyles.actTitle}>{activity.title}</div>
            {activity.location && (
              <div style={detailStyles.actLocation}>
                <PinIcon /> {activity.location}
              </div>
            )}
          </div>
        </div>

        {activity.desc && (
          <div style={detailStyles.actDesc}>{activity.desc}</div>
        )}

        {activity.tags && activity.tags.length > 0 && (
          <div style={detailStyles.actTagRow}>
            {activity.tags.map((tag, i) => (
              <span key={i} style={detailStyles.actTagSm}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={detailStyles.actMetaRow}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={detailStyles.actCost}>
              <DollarIcon />
              <span style={detailStyles.actCostLabel}>Biaya:</span>
              <span style={detailStyles.actCostVal}>{activity.cost}</span>
            </div>
            {activity.tips && (
              <button
                style={detailStyles.tipBtn}
                onClick={() =>
                  setShowTip(showTip === activity.id ? null : activity.id)
                }
              >
                <InfoIcon /> Tip
              </button>
            )}
          </div>
        </div>

        {showTip === activity.id && activity.tips && (
          <div style={detailStyles.tipBox}>
            <span style={detailStyles.tipBoxIcon}>
              <InfoIcon />
            </span>
            <span>{activity.tips}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DayStat                                                            */
/* ------------------------------------------------------------------ */
function DayStat({ icon, label }) {
  return (
    <div style={detailStyles.dayStat}>
      <span style={detailStyles.dayStatIcon}>{icon}</span>
      <span style={detailStyles.dayStatLabel}>{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DaySelector                                                        */
/* ------------------------------------------------------------------ */
function DaySelector({ days, activeDay, setActiveDay }) {
  return (
    <div style={detailStyles.daySelector}>
      <div style={detailStyles.daySelectorTitle}>Pilih Hari</div>
      <div style={detailStyles.dayChips}>
        {days.map((d) => {
          const isActive = d.id === activeDay;
          return (
            <button
              key={d.id}
              style={{
                ...detailStyles.dayChip,
                ...(isActive ? detailStyles.dayChipActive : {}),
              }}
              onClick={() => setActiveDay(d.id)}
            >
              <div
                style={{
                  ...detailStyles.dayChipNum,
                  background: isActive
                    ? "var(--atr-purple)"
                    : "var(--atr-purple-light)",
                  color: isActive ? "#fff" : "var(--atr-text-muted)",
                }}
              >
                {d.id}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={detailStyles.dayChipLabel}>{d.label}</div>
                <div style={detailStyles.dayChipDate}>{d.date}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PlanView                                                           */
/* ------------------------------------------------------------------ */
function PlanView() {
  const [activeDay, setActiveDay] = useState(1);
  const dayActivities = ACTIVITIES_BY_DAY[activeDay] || [];
  const stats = computeDayStats(dayActivities);
  const dayInfo = DAYS.find((d) => d.id === activeDay);
  return (
    <div style={detailStyles.planWrap}>
      <DaySelector
        days={DAYS}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />

      {/* Day Overview */}
      <div style={detailStyles.dayOverview}>
        <div>
          <div style={detailStyles.dayOverviewTop}>
            <span style={detailStyles.dayBadge}>HARI KE-{activeDay}</span>
            <span style={detailStyles.dayDate}>{dayInfo?.date || ""}</span>
          </div>
          <div style={detailStyles.dayTitle}>{dayInfo?.title || ""}</div>
        </div>
        <div style={detailStyles.dayStats}>
          <DayStat
            icon={<ClockIcon />}
            label={`${stats.activityCount} Aktivitas`}
          />
          <DayStat
            icon={<DollarIcon />}
            label={`Rp ${stats.totalCost.toLocaleString("id-ID")}`}
          />
        </div>
      </div>

      {/* Timeline */}
      <div style={detailStyles.timeline}>
        {dayActivities.map((activity, i) =>
          activity.type === "transport" ? (
            <TransportLink key={activity.id} activity={activity} index={i} />
          ) : (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ),
        )}
      </div>

      {/* End marker + next day */}
      <div style={detailStyles.afterTimeline}>
        {activeDay < DAYS.length ? (
          <button
            style={detailStyles.nextDayBtn}
            onClick={() => setActiveDay(activeDay + 1)}
          >
            Lanjut ke {DAYS.find((d) => d.id === activeDay + 1)?.label}{" "}
            <ArrowRightSm />
          </button>
        ) : (
          <div style={detailStyles.endMarker}>
            <div style={detailStyles.endDot} />
            Akhir Perjalanan — Selesai
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AboutSection                                                       */
/* ------------------------------------------------------------------ */
function AboutSection({ eyebrow, title, children }) {
  return (
    <div style={detailStyles.aboutSection}>
      {eyebrow && <div style={detailStyles.aboutEyebrow}>{eyebrow}</div>}
      {title && <div style={detailStyles.aboutTitle}>{title}</div>}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FaqItem                                                            */
/* ------------------------------------------------------------------ */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={detailStyles.faqItem}>
      <button style={detailStyles.faqQ} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span
          style={{
            ...detailStyles.faqChev,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronSm />
        </span>
      </button>
      {open && <div style={detailStyles.faqA}>{answer}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AboutTab (includes AboutSection, Map, Highlights, FAQs, Author)    */
/* ------------------------------------------------------------------ */
function AboutTab() {
  return (
    <div style={detailStyles.aboutWrap}>
      {/* Overview */}
      <AboutSection eyebrow="Tentang" title="Paket Liburan Lengkap Lombok">
        <div style={detailStyles.aboutBody}>
          Nikmati pengalaman liburan 4 hari 3 malam yang mencakup destinasi
          terbaik Lombok. Dari pantai eksotis Kuta Mandalika, Bukit Merese
          dengan sunrise spektakuler, hingga kekayaan budaya Suku Sasak di Desa
          Sade. Setiap aktivitas telah dirancang untuk memberikan kenyamanan dan
          pengalaman otentik.
        </div>
        <div style={detailStyles.aboutBody}>
          Paket ini cocok untuk pasangan, kelompok kecil, atau solo traveler
          yang ingin menjelajahi Lombok tanpa repot mengatur transportasi dan
          akomodasi. Pemandu lokal yang ramah akan menemani perjalanan Anda.
        </div>
      </AboutSection>

      {/* Highlights */}
      <AboutSection eyebrow="Sorotan" title="Yang Akan Kamu Nikmati">
        <div style={detailStyles.highlightGrid}>
          {[
            {
              icon: "\u{1F3D6}",
              title: "Pantai Eksotis",
              desc: "Pasir putih & air jernih di Kuta, Tanjung Aan, dan pantai selatan Lombok.",
            },
            {
              icon: "\u{1F30B}",
              title: "Budaya Sasak",
              desc: "Kunjungan ke Desa Sade & proses menenun songket tradisional.",
            },
            {
              icon: "\u{1F30A}",
              title: "Snorkeling",
              desc: "Jelajahi biota laut di perairan Gili Nanggu & Kedis.",
            },
            {
              icon: "\u{1F373}",
              title: "Kuliner Khas",
              desc: "Ayam taliwang, plecing kangkung, dan seafood segar.",
            },
          ].map((h, i) => (
            <div key={i} style={detailStyles.highlightCard}>
              <div style={detailStyles.highlightIcon}>{h.icon}</div>
              <div>
                <div style={detailStyles.highlightTitle}>{h.title}</div>
                <div style={detailStyles.highlightDesc}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Best Time */}
      <AboutSection eyebrow="Waktu Terbaik" title="Musim Kunjungan">
        <div style={detailStyles.monthGrid}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ].map((m, i) => {
            const peak = i >= 4 && i <= 8;
            const shoulder = i === 3 || i === 9 || i === 10;
            return (
              <div
                key={m}
                style={{
                  ...detailStyles.monthCell,
                  background: peak
                    ? "#E4F4E4"
                    : shoulder
                      ? "#FFFBEE"
                      : "var(--atr-bg-soft)",
                }}
              >
                <div style={detailStyles.monthName}>{m}</div>
                <div style={detailStyles.monthBadge}>
                  {peak ? "High" : shoulder ? "Mid" : "Low"}
                </div>
              </div>
            );
          })}
        </div>
      </AboutSection>

      {/* FAQ */}
      <AboutSection eyebrow="FAQ" title="Pertanyaan Umum">
        <div style={detailStyles.faqList}>
          <FaqItem
            question="Apakah tiket pesawat sudah termasuk?"
            answer="Tiket pesawat belum termasuk dalam paket ini. Harga yang tercantum adalah untuk paket darat (akomodasi, transportasi lokal, makan, tiket masuk, dan pemandu)."
          />
          <FaqItem
            question="Bisakah saya meminta perubahan jadwal?"
            answer="Tentu. Kamu bisa menyesuaikan jadwal, durasi, dan aktivitas melalui tombol 'Edit & Personalisasi'. Tim kami akan membantu mengatur ulang rencana sesuai keinginan."
          />
          <FaqItem
            question="Apakah ada asuransi perjalanan?"
            answer="Asuransi perjalanan belum termasuk secara default, namun dapat ditambahkan sebagai opsi tambahan saat proses pemesanan. Kami merekomendasikan untuk mengambil asuransi perjalanan untuk keamanan ekstra."
          />
          <FaqItem
            question="Bagaimana jika cuaca buruk?"
            answer="Rencana perjalanan bersifat fleksibel. Pemandu lokal akan menyesuaikan aktivitas berdasarkan kondisi cuaca untuk memastikan keselamatan dan kenyamanan Anda."
          />
        </div>
      </AboutSection>

      {/* Author card */}
      <AboutSection eyebrow="Penulis" title="Tentang Pemandu">
        <div style={detailStyles.authorBigCard}>
          <img
            src="https://i.pravatar.cc/200?img=11"
            alt="Rizky Pratama"
            style={detailStyles.authorBigImg}
          />
          <div>
            <div style={detailStyles.authorBigName}>
              Rizky Pratama
              <span style={detailStyles.verifiedBadge}>
                <CheckBadge /> Travel Specialist
              </span>
            </div>
            <div style={detailStyles.authorBigRole}>Pemandu Wisata Lombok</div>
            <div style={detailStyles.authorBigBio}>
              Berpengalaman lebih dari 5 tahun memandu wisatawan lokal dan
              mancanegara menjelajahi keindahan Lombok. Menguasai bahasa
              Indonesia, Inggris, dan bahasa Sasak.
            </div>
            <div style={detailStyles.authorBigStats}>
              <span>{"\u{1F4CD}"} 18 Itinerary</span>
              <span>{"\u{2B50}"} 4.9 Rating</span>
              <span>{"\u{1F465}"} 200+ Wisatawan</span>
            </div>
          </div>
        </div>
      </AboutSection>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RelatedItineraries                                                 */
/* ------------------------------------------------------------------ */
function RelatedItineraries() {
  const items = [
    {
      img: IMG.bali,
      meta: "Bali",
      title: "Liburan Seru di Bali — Ubud & Kuta",
      rating: "4.8",
      price: "Rp 2.500.000",
    },
    {
      img: IMG.bromo,
      meta: "Jawa Timur",
      title: "Petualangan Bromo Midnight",
      rating: "4.7",
      price: "Rp 1.750.000",
    },
    {
      img: IMG.raja,
      meta: "Papua",
      title: "Ekspedisi Raja Ampat 5 Hari",
      rating: "4.9",
      price: "Rp 8.900.000",
    },
    {
      img: IMG.lombok,
      meta: "NTB",
      title: "Trekking Rinjani 3D2N",
      rating: "4.8",
      price: "Rp 3.200.000",
    },
  ];
  return (
    <div style={detailStyles.relatedWrap}>
      <div style={detailStyles.relatedHeader}>
        <div>
          <div style={detailStyles.aboutEyebrow}>Jelajahi Lainnya</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "var(--atr-text)",
              letterSpacing: "-0.01em",
            }}
          >
            Itinerary Terkait
          </div>
        </div>
        <button style={detailStyles.relatedLink}>Lihat Semua</button>
      </div>
      <div style={detailStyles.relatedGrid}>
        {items.map((item, i) => (
          <div key={i} style={detailStyles.relCard}>
            <img src={item.img} alt={item.title} style={detailStyles.relImg} />
            <div style={detailStyles.relBody}>
              <div style={detailStyles.relMeta}>{item.meta}</div>
              <div style={detailStyles.relTitle}>{item.title}</div>
              <div style={detailStyles.relFooter}>
                <span style={detailStyles.relRating}>
                  {"\u2B50"} {item.rating}
                </span>
                <span style={detailStyles.relPrice}>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page — default export                                              */
/* ------------------------------------------------------------------ */
export default function ItineraryDetailPage() {
  const [activeTab, setActiveTab] = useState("plan");
  return (
    <div data-screen-label="Itinerary Detail">
      <TopNav active="Itinerary" />
      <DetailHero />
      <ActionBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AuthorStrip />
      {activeTab === "plan" ? <PlanView /> : <AboutTab />}
      <RelatedItineraries />
      <SiteFooter />
    </div>
  );
}
