"use client";

import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { dirStyles, cardStyles } from "@/styles/attraction-styles";

/* ── Icons ── */
function PinSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StarFill() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}

/* ── Stat ── */
function Stat({ n, label }) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

/* ── CategoryTabs ── */
const DIRECTORY_TABS = [
  { label: "Itinerary", count: "2.4K", href: "/itinerary" },
  { label: "Destinasi", count: "180", href: "/destinations" },
  { label: "Atraksi", count: "1.2K", href: "/attractions" },
  { label: "Tour Guide", count: "640", href: "/tour-guides" },
  { label: "Desa Wisata", count: "320", href: "/tourism-villages" },
];
function CategoryTabs({ active = "Tour Guide" }) {
  return (
    <div style={dirStyles.tabsBar}>
      <div style={dirStyles.tabsInner}>
        {DIRECTORY_TABS.map((t) => {
          const isActive = active === t.label;
          return (
            <a
              key={t.label}
              href={t.href}
              style={{
                ...dirStyles.tab,
                ...(isActive ? dirStyles.tabActive : {}),
                textDecoration: "none",
              }}
            >
              <span>{t.label}</span>
              <span
                style={{
                  ...dirStyles.tabCount,
                  ...(isActive ? dirStyles.tabCountActive : {}),
                }}
              >
                {t.count}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ── Guide Hero ── */
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
    color: "var(--atr-purple)",
    marginLeft: "auto",
  },
};

function GuidesHero() {
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

/* ── Guide Card ── */
const gc = {
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid var(--atr-outline)",
    overflow: "hidden",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "transform .25s ease, box-shadow .25s ease",
    cursor: "pointer",
  },
  topRow: { display: "flex", gap: 14, alignItems: "flex-start" },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 999,
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: "0 0 0 2px var(--atr-purple-light)",
  },
  verifiedDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--atr-purple)",
    border: "2px solid #fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1, minWidth: 0 },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
  },
  region: {
    fontSize: 12,
    color: "var(--atr-text-muted)",
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    marginTop: 6,
  },
  ratingStrong: { fontWeight: 700, color: "var(--atr-text)" },
  ratingMeta: { color: "var(--atr-text-muted)" },
  specRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  spec: {
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 999,
    letterSpacing: "0.02em",
  },
  langRow: { display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" },
  langLabel: { fontSize: 11, color: "var(--atr-text-muted)", marginRight: 2 },
  lang: {
    fontSize: 10,
    fontWeight: 700,
    color: "var(--atr-text)",
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    padding: "3px 7px",
    borderRadius: 4,
    letterSpacing: "0.04em",
  },
  certs: { display: "flex", gap: 4, flexWrap: "wrap" },
  cert: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 4,
    background: "rgba(81,176,84,0.12)",
    color: "#2D8838",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTop: "1px solid var(--atr-outline)",
  },
  exp: { fontSize: 11, color: "var(--atr-text-muted)" },
  price: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  priceFrom: { fontSize: 10, color: "var(--atr-text-muted)" },
  priceVal: {
    fontSize: 16,
    fontWeight: 700,
    color: "var(--atr-purple)",
    lineHeight: 1,
  },
  priceUnit: { fontSize: 11, color: "var(--atr-text-muted)" },
};

const GUIDE_DATA = [
  {
    name: "Welli Wilyanto",
    img: "https://i.pravatar.cc/200?img=12",
    region: "Labuan Bajo, NTT",
    spec: ["Bahari", "Petualangan"],
    specBg: "#E2F1FF",
    specFg: "#1F6FB0",
    langs: ["ID", "EN", "JP"],
    certs: ["HPI", "BNSP"],
    rating: 4.95,
    trips: 412,
    price: 1200000,
    exp: "8 tahun",
    verified: true,
  },
  {
    name: "Putu Adi Wirawan",
    img: "https://i.pravatar.cc/200?img=64",
    region: "Ubud, Bali",
    spec: ["Heritage", "Spiritual"],
    specBg: "#FFE9E9",
    specFg: "#C44949",
    langs: ["ID", "EN", "FR"],
    certs: ["HPI", "BNSP"],
    rating: 4.92,
    trips: 538,
    price: 950000,
    exp: "12 tahun",
    verified: true,
  },
  {
    name: "Sari Wibowo Putri",
    img: "https://i.pravatar.cc/200?img=15",
    region: "Yogyakarta, DIY",
    spec: ["Heritage", "Kuliner"],
    specBg: "#FFF4D9",
    specFg: "#B47A00",
    langs: ["ID", "EN", "DE"],
    certs: ["HPI"],
    rating: 4.88,
    trips: 287,
    price: 650000,
    exp: "6 tahun",
    verified: true,
  },
  {
    name: "Catur Hidayat",
    img: "https://i.pravatar.cc/200?img=33",
    region: "Bromo, Jatim",
    spec: ["Petualangan", "Hiking"],
    specBg: "#D9F2DA",
    specFg: "#2D8838",
    langs: ["ID", "EN"],
    certs: ["HPI", "Mountain Guide"],
    rating: 4.86,
    trips: 312,
    price: 750000,
    exp: "9 tahun",
    verified: true,
  },
  {
    name: "Komang Adi Susila",
    img: "https://i.pravatar.cc/200?img=68",
    region: "Sanur, Bali",
    spec: ["Diving", "Bahari"],
    specBg: "#E2F1FF",
    specFg: "#1F6FB0",
    langs: ["ID", "EN", "JP"],
    certs: ["BNSP", "Diving Master"],
    rating: 4.96,
    trips: 228,
    price: 1500000,
    exp: "10 tahun",
    verified: true,
  },
  {
    name: "Andreyan Saputra",
    img: "https://i.pravatar.cc/200?img=8",
    region: "Lombok Tengah, NTB",
    spec: ["Petualangan", "Surf"],
    specBg: "#D9F2DA",
    specFg: "#2D8838",
    langs: ["ID", "EN"],
    certs: ["HPI"],
    rating: 4.78,
    trips: 142,
    price: 580000,
    exp: "4 tahun",
    verified: true,
  },
  {
    name: "Ronal Sitorus",
    img: "https://i.pravatar.cc/200?img=22",
    region: "Samosir, Sumut",
    spec: ["Heritage", "Family"],
    specBg: "#FFE9E9",
    specFg: "#C44949",
    langs: ["ID", "EN"],
    certs: ["HPI"],
    rating: 4.7,
    trips: 88,
    price: 480000,
    exp: "5 tahun",
    verified: false,
  },
  {
    name: "Anisa Latifah",
    img: "https://i.pravatar.cc/200?img=47",
    region: "Bandung, Jabar",
    spec: ["Family", "Kuliner"],
    specBg: "#FFF4D9",
    specFg: "#B47A00",
    langs: ["ID", "EN"],
    certs: ["HPI", "BNSP"],
    rating: 4.82,
    trips: 198,
    price: 620000,
    exp: "5 tahun",
    verified: true,
  },
  {
    name: "Mighfari Arlianza",
    img: "https://i.pravatar.cc/200?img=51",
    region: "Surabaya, Jatim",
    spec: ["Heritage", "Fotografi"],
    specBg: "#EDE9FF",
    specFg: "#5448B5",
    langs: ["ID", "EN", "ZH"],
    certs: ["HPI"],
    rating: 4.75,
    trips: 156,
    price: 580000,
    exp: "6 tahun",
    verified: true,
  },
  {
    name: "Laela Urfiya",
    img: "https://i.pravatar.cc/200?img=32",
    region: "Magelang, Jateng",
    spec: ["Heritage", "Spiritual"],
    specBg: "#FFE9E9",
    specFg: "#C44949",
    langs: ["ID", "EN"],
    certs: ["HPI", "BNSP"],
    rating: 4.84,
    trips: 174,
    price: 550000,
    exp: "7 tahun",
    verified: true,
  },
  {
    name: "Thoriq Abror",
    img: "https://i.pravatar.cc/200?img=11",
    region: "Garut, Jabar",
    spec: ["Petualangan", "Hiking"],
    specBg: "#D9F2DA",
    specFg: "#2D8838",
    langs: ["ID", "EN"],
    certs: ["Mountain Guide"],
    rating: 4.68,
    trips: 92,
    price: 520000,
    exp: "3 tahun",
    verified: false,
  },
  {
    name: "Andini Mahardika",
    img: "https://i.pravatar.cc/200?img=44",
    region: "Sorong, Pabar",
    spec: ["Bahari", "Diving"],
    specBg: "#E2F1FF",
    specFg: "#1F6FB0",
    langs: ["ID", "EN"],
    certs: ["BNSP", "Diving Master"],
    rating: 4.94,
    trips: 268,
    price: 1450000,
    exp: "9 tahun",
    verified: true,
  },
];

function GuideCard({
  name,
  img,
  region,
  spec,
  specBg,
  specFg,
  langs,
  certs,
  rating,
  trips,
  price,
  exp,
  verified,
}) {
  const [hover, setHover] = useState(false);
  return (
    <article
      style={{
        ...gc.card,
        ...(hover
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 24px rgba(31,27,51,0.08)",
            }
          : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => (window.location.href = "/tour-guides/welli-wilyanto")}
    >
      <div style={gc.topRow}>
        <div style={gc.avatarWrap}>
          <img src={img} alt="" style={gc.avatar} />
          {verified && (
            <div style={gc.verifiedDot}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div style={gc.info}>
          <div style={gc.name}>{name}</div>
          <div style={gc.region}>
            <PinSm /> {region}
          </div>
          <div style={gc.rating}>
            <StarFill />
            <span style={gc.ratingStrong}>{rating}</span>
            <span style={gc.ratingMeta}>
              {" \u00B7"} {trips} trip
            </span>
          </div>
        </div>
      </div>

      <div style={gc.specRow}>
        {spec.map((s) => (
          <span
            key={s}
            style={{ ...gc.spec, background: specBg, color: specFg }}
          >
            {s}
          </span>
        ))}
      </div>

      <div style={gc.langRow}>
        <span style={gc.langLabel}>Bahasa:</span>
        {langs.map((l) => (
          <span key={l} style={gc.lang}>
            {l}
          </span>
        ))}
      </div>

      <div style={gc.certs}>
        {certs.map((c) => (
          <span key={c} style={gc.cert}>
            {"\u2713"} {c}
          </span>
        ))}
      </div>

      <div style={gc.footer}>
        <span style={gc.exp}>
          {"\uD83C\uDF92"} {exp} pengalaman
        </span>
        <div style={gc.price}>
          <span style={gc.priceFrom}>mulai dari</span>
          <span>
            <span style={gc.priceVal}>
              Rp {(price / 1000).toLocaleString("id-ID")}rb
            </span>
            <span style={gc.priceUnit}> /hari</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function GuidesGrid() {
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDC64"} Direktori tour guide
          </div>
          <h2 style={cardStyles.railTitle}>Pemandu lokal terverifikasi</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {GUIDE_DATA.map((g, i) => (
          <GuideCard key={i} {...g} />
        ))}
      </div>
      <div style={cardStyles.paginationRow}>
        <button style={cardStyles.loadMore}>Muat 24 guide lagi</button>
        <div style={cardStyles.pageInfo}>Menampilkan 12 dari 638</div>
      </div>
    </section>
  );
}

/* ── FilterBar (reuses dirStyles) ── */
const GUIDE_FILTERS = [
  { label: "Wilayah", icon: "pin" },
  { label: "Spesialisasi", icon: "tag" },
  { label: "Bahasa", icon: "users" },
  { label: "Harga", icon: "wallet" },
  { label: "Sertifikasi", icon: "clock" },
];
const GUIDE_FILTER_OPTIONS = {
  Wilayah: [
    "Bali",
    "Yogyakarta",
    "Labuan Bajo",
    "Lombok",
    "Bandung",
    "Bromo",
    "Raja Ampat",
    "Danau Toba",
    "Komodo",
    "Sumba",
  ],
  Spesialisasi: [
    "Heritage & Sejarah",
    "Petualangan",
    "Bahari & Diving",
    "Kuliner",
    "Fotografi",
    "Birdwatching",
    "Hiking",
    "Family Friendly",
    "Honeymoon",
    "Spiritual",
  ],
  Bahasa: [
    "Indonesia",
    "English",
    "Mandarin",
    "Japanese",
    "Korean",
    "Spanish",
    "French",
    "German",
    "Arabic",
    "Dutch",
  ],
  Harga: [
    "< Rp500rb/hari",
    "Rp500rb \u2013 Rp1jt",
    "Rp1jt \u2013 Rp2jt",
    "> Rp2jt/hari",
  ],
  Sertifikasi: [
    "HPI",
    "BNSP",
    "Diving Master",
    "Mountain Guide",
    "Bersertifikat semua",
  ],
};
const SORT_OPTIONS = [
  "Paling populer",
  "Rating tertinggi",
  "Harga terendah",
  "Harga tertinggi",
  "Pengalaman terbanyak",
];

function FilterGlyph({ kind }) {
  const c = "var(--atr-purple)";
  if (kind === "pin")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
          stroke={c}
          strokeWidth="1.8"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke={c} strokeWidth="1.8" />
      </svg>
    );
  if (kind === "clock")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" />
        <path
          d="M12 7v5l3 2"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "wallet")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke={c}
          strokeWidth="1.8"
        />
        <path
          d="M16 12.5h3"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "users")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3" stroke={c} strokeWidth="1.8" />
        <circle cx="17" cy="10" r="2.4" stroke={c} strokeWidth="1.8" />
        <path
          d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "tag")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12V4h8l10 10-8 8-10-10z"
          stroke={c}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="1.4" fill={c} />
      </svg>
    );
  return null;
}
function ChevDown({ rotated }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: "transform .2s",
        transform: rotated ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="var(--atr-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12l5 5L20 7"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterBar({
  state,
  filters = GUIDE_FILTERS,
  filterOptions = GUIDE_FILTER_OPTIONS,
  resultLabel = "tour guide",
  totalResults = 638,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState("Paling populer");
  const [activeChips, setActiveChips] = useState(
    state?.chips || ["Labuan Bajo", "English", "HPI"],
  );

  function toggleFilter(label) {
    setOpenFilter(openFilter === label ? null : label);
    setOpenSort(false);
  }
  function pickFilter(label, value) {
    if (!activeChips.includes(value)) setActiveChips([...activeChips, value]);
    setOpenFilter(null);
  }
  function removeChip(c) {
    setActiveChips(activeChips.filter((x) => x !== c));
  }

  return (
    <div style={dirStyles.filterWrap}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = openFilter === f.label;
            return (
              <div key={f.label} style={{ position: "relative" }}>
                <button
                  onClick={() => toggleFilter(f.label)}
                  style={{
                    ...dirStyles.filterChip,
                    ...(open
                      ? {
                          border: "1px solid var(--atr-purple)",
                          background: "#F6F4FF",
                        }
                      : {}),
                  }}
                >
                  <FilterGlyph kind={f.icon} />
                  <span>{f.label}</span>
                  <ChevDown rotated={open} />
                </button>
                {open && (
                  <div style={dirStyles.dropdown}>
                    {(filterOptions[f.label] || []).map((opt) => {
                      const checked = activeChips.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => pickFilter(f.label, opt)}
                          style={dirStyles.dropdownItem}
                        >
                          <span
                            style={{
                              ...dirStyles.checkbox,
                              ...(checked ? dirStyles.checkboxOn : {}),
                            }}
                          >
                            {checked && <CheckIcon />}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={dirStyles.filterRight}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                setOpenSort(!openSort);
                setOpenFilter(null);
              }}
              style={dirStyles.sortBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {sort}
              <ChevDown rotated={openSort} />
            </button>
            {openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSort(s);
                      setOpenSort(false);
                    }}
                    style={{
                      ...dirStyles.dropdownItem,
                      ...(s === sort
                        ? { color: "var(--atr-purple)", fontWeight: 600 }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === sort
                          ? {
                              border: "1.5px solid var(--atr-purple)",
                              boxShadow: "inset 0 0 0 3px var(--atr-purple)",
                              background: "#fff",
                            }
                          : {}),
                      }}
                    />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          <strong>{totalResults}</strong> {resultLabel} cocok untukmu
        </span>
        <div style={dirStyles.activeChips}>
          {activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {activeChips.length > 0 && (
            <button
              onClick={() => setActiveChips([])}
              style={dirStyles.clearAll}
            >
              Hapus semua
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── CTABand (from directory-cards.jsx) ── */
function CTABand() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #6F66D5 0%, #524BAA 100%)",
        marginTop: 80,
        borderRadius: 24,
        maxWidth: 1376,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          padding: "56px",
        }}
      >
        <div style={{ color: "#fff" }}>
          <div style={cardStyles.eyebrow}>{"\uD83D\uDEE0"} Bikin sendiri</div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginTop: 8,
              marginBottom: 14,
              color: "#fff",
            }}
          >
            Tidak nemu yang pas?
            <br />
            Susun itinerary kamu sendiri.
          </h2>
          <p
            style={{
              fontSize: 15,
              opacity: 0.85,
              lineHeight: 1.55,
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            Drag & drop aktivitas dari direktori Atourin, atau biarkan asisten
            AI menyusun draft awal untukmu dalam 30 detik.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: "var(--atr-purple)",
                border: "none",
                borderRadius: 10,
                padding: "14px 22px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="var(--atr-purple)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Mulai dari nol
            </button>
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                padding: "14px 22px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Coba dengan AI
            </button>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}

/* ── Page ── */
export default function TourGuidesPage() {
  return (
    <div data-screen-label="Tour Guides Directory">
      <TopNav active="Tour Guide" />
      <GuidesHero />
      <CategoryTabs active="Tour Guide" />
      <FilterBar />
      <GuidesGrid />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
