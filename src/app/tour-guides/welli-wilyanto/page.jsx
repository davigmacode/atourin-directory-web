"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { ds } from "@/styles/detail-styles";

/* ============================================================
   DATA
   ============================================================ */
const GUIDE = {
  name: "Welli Wilyanto",
  tagline: "Local Komodo \u00B7 Sailing & Diving Specialist",
  avatar: "https://i.pravatar.cc/400?img=15",
  cover:
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1800&auto=format&fit=crop&q=80",
  verified: true,
  superhost: true,
  basedIn: "Labuan Bajo, Manggarai Barat, NTT",
  origin: "Lahir & besar di Pulau Mesa, Labuan Bajo",
  years: 8,
  trips: 87,
  rating: 4.95,
  reviews: 218,
  responseTime: "< 1 jam",
  responseRate: 99,
  joined: "Mei 2018",
  languages: [
    { flag: "\uD83C\uDDEE\uD83C\uDDE9", name: "Indonesia", level: "Native" },
    { flag: "\uD83C\uDDEC\uD83C\uDDE7", name: "English", level: "Fluent" },
    {
      flag: "\uD83C\uDDEB\uD83C\uDDF7",
      name: "Fran\u00E7ais",
      level: "Conversational",
    },
  ],
  specialties: [
    "Bahari",
    "Diving",
    "Snorkeling",
    "Photography Trip",
    "Sailing",
  ],
  about:
    "Saya lahir di Pulau Mesa, sebuah pulau kecil di gugusan Komodo, dan sudah delapan tahun terakhir memandu sailing trip di perairan ini. Sebelum bergabung sebagai pemandu, saya bekerja sebagai crew kapal phinisi, itu yang membuat saya kenal hampir setiap spot snorkel, current pattern, dan ritme cuaca di sekitar TN Komodo.\n\nKeahlian utama saya adalah membawa tamu ke spot-spot 'rahasia' yang biasanya terlewat dari rute komersial, Manjarite, Tatawa Besar, atau pantai-pantai kecil yang hanya bisa dimasuki saat air pasang. Saya juga PADI Open Water Instructor dan bisa memandu sampai kedalaman 30m.\n\nFilosofi saya sederhana: trip terbaik bukan yang paling padat, tapi yang paling personal. Saya selalu menyesuaikan rute dengan kemampuan dan minat tamu, apakah Anda fotografer, snorkeler pemula, atau diver berpengalaman, kita akan tentukan rute terbaik bersama-sama saat briefing.\n\nDi luar memandu, saya juga aktif di Pokdarwis Mesa, mengajar anak-anak kampung bahasa Inggris dasar agar mereka punya pintu masuk ke industri pariwisata yang sustainable.",
  certifications: [
    {
      name: "PADI Open Water Scuba Instructor",
      year: 2021,
      issuer: "PADI",
      icon: "\uD83E\uDDBF",
    },
    {
      name: "Pemandu Wisata Bersertifikat",
      year: 2019,
      issuer: "BNSP",
      icon: "\uD83C\uDF93",
    },
    {
      name: "HPI (Himpunan Pramuwisata Indonesia)",
      year: 2018,
      issuer: "HPI NTT",
      icon: "\uD83E\uDEAA",
    },
    {
      name: "Atourin Verified Local Expert",
      year: 2022,
      issuer: "Atourin",
      icon: "\u2705",
    },
    {
      name: "First Aid & CPR",
      year: 2024,
      issuer: "PMI Manggarai Barat",
      icon: "\uD83D\uDE91",
    },
    {
      name: "Eco-Tourism Guide Training",
      year: 2023,
      issuer: "GSTC + WWF",
      icon: "\uD83C\uDF3F",
    },
  ],
};

const SPEC_META = {
  Bahari: { icon: "\u26F5", desc: "Sailing & island hopping" },
  Diving: { icon: "\uD83E\uDDBF", desc: "PADI OW Instructor" },
  Snorkeling: { icon: "\uD83E\uDDA0", desc: "Spot rahasia TN Komodo" },
  "Photography Trip": {
    icon: "\uD83D\uDCF8",
    desc: "Sunset & wildlife shoots",
  },
  Sailing: { icon: "\uD83D\uDEE5", desc: "Phinisi & speedboat" },
};

const EXPERIENCE_AREAS = [
  {
    name: "Pulau Padar",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&auto=format&fit=crop&q=70",
    visits: 87,
  },
  {
    name: "Manta Point",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70",
    visits: 84,
  },
  {
    name: "Pink Beach",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=70",
    visits: 79,
  },
  {
    name: "Pulau Komodo",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70",
    visits: 68,
  },
  {
    name: "Tatawa Besar",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=70",
    visits: 42,
  },
  {
    name: "Kanawa Island",
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&auto=format&fit=crop&q=70",
    visits: 35,
  },
];

const GUIDE_PACKAGES = [
  {
    name: "Komodo Sailing 1 Day, Padar & Pink Beach",
    duration: "1 hari (07.00\u201318.00)",
    pax: "1\u20138 orang",
    spots: ["Pulau Padar", "Pink Beach", "Manta Point", "Kanawa"],
    price: 1850000,
    unit: "/orang (min 2 pax)",
    bestseller: true,
    boat: "Speedboat (8 pax)",
  },
  {
    name: "Komodo Sailing 3D2N, Phinisi Live On Board",
    duration: "3 hari \u00B7 2 malam",
    pax: "2\u201312 orang",
    spots: [
      "Padar",
      "Pink Beach",
      "Komodo",
      "Manta",
      "Kelor",
      "Tatawa",
      "Kanawa",
    ],
    price: 6850000,
    unit: "/orang (kabin AC)",
    bestseller: false,
    boat: "Phinisi 18m (4 kabin)",
  },
  {
    name: "Diving Trip 2D, Manta Point & Castle Rock",
    duration: "2 hari (4 dives)",
    pax: "2\u20136 orang",
    spots: ["Manta Point", "Castle Rock", "Crystal Rock", "Batu Bolong"],
    price: 4200000,
    unit: "/orang (gear inc.)",
    bestseller: false,
    boat: "Speedboat dive (6 pax)",
  },
];

const GUIDE_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    h: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    h: 0,
  },
];

const GUIDE_REVIEWS = [
  {
    name: "Anastasia Wijaya",
    av: "https://i.pravatar.cc/100?img=44",
    rating: 5,
    date: "10 Mei 2026",
    trip: "Sailing 3D2N \u00B7 Phinisi",
    verified: true,
    text: "Welli benar-benar tahu setiap sudut Komodo. Dia bawa kami ke spot snorkel yang tidak ada di rute biasa, kosong total, karang masih perawan. Bahasa Inggrisnya sangat fluent, briefing dive jelas dan kami semua merasa aman 100%. Kapal phinisi-nya bersih, makanan masakan ibu beliau enak banget. 10/10.",
  },
  {
    name: "Lukas Sebastian",
    av: "https://i.pravatar.cc/100?img=58",
    rating: 5,
    date: "2 Mei 2026",
    trip: "Diving 2D \u00B7 Manta Point",
    verified: true,
    text: "Sebagai diver dengan 200+ dives, jarang saya ketemu Divemaster yang segigih Welli soal safety. Buddy check tiap dive, briefing arus detail, dan dia spot 4 ekor manta untuk kami saat current memang lagi liar. Profesional sekali, akan kembali tahun depan untuk advanced trip.",
  },
  {
    name: "Famille Dupont",
    av: "https://i.pravatar.cc/100?img=20",
    rating: 5,
    date: "20 April 2026",
    trip: "Sailing 1D \u00B7 Family",
    verified: true,
    text: "Voyage parfait avec nos enfants (8 et 11 ans). Welli parle fran\u00E7ais tr\u00E8s correctement, ce qui a beaucoup rassur\u00E9 les petits. Patient, dr\u00F4le, et toujours attentif \u00E0 la s\u00E9curit\u00E9. Padar au lever du soleil, inoubliable. Merci Welli !",
    photos: [
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=200&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=200&auto=format&fit=crop&q=70",
    ],
  },
  {
    name: "Bobby Sutanto",
    av: "https://i.pravatar.cc/100?img=7",
    rating: 4,
    date: "12 April 2026",
    trip: "Sailing 1D \u00B7 Group",
    verified: false,
    text: "Pemandu yang sangat berpengalaman dan tahu banyak cerita lokal. Saya kasih 4 karena di akhir trip jadwal sedikit molor karena cuaca, tapi itu di luar kontrol beliau. Komunikasi pre-trip sangat responsif. Boat-nya nyaman.",
  },
];

const SIMILAR_GUIDES = [
  {
    name: "Yosua Mbaha",
    av: "https://i.pravatar.cc/200?img=51",
    specs: ["Petualangan", "Trekking"],
    rating: 4.88,
    trips: 62,
    price: 750000,
  },
  {
    name: "Bagas Komodo",
    av: "https://i.pravatar.cc/200?img=8",
    specs: ["Diving"],
    rating: 5.0,
    trips: 156,
    price: 1200000,
  },
  {
    name: "Ferdy Sahara",
    av: "https://i.pravatar.cc/200?img=12",
    specs: ["Fotografi", "Bahari"],
    rating: 4.92,
    trips: 95,
    price: 950000,
  },
  {
    name: "Maria Santi",
    av: "https://i.pravatar.cc/200?img=47",
    specs: ["Budaya", "Sejarah"],
    rating: 4.9,
    trips: 124,
    price: 650000,
  },
];

/* ============================================================
   HERO STYLES
   ============================================================ */
const ghStyles = {
  hero: {
    position: "relative",
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(31,27,51,0.05)",
  },
  cover: { position: "relative", height: 280, overflow: "hidden" },
  coverImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  coverOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(31,27,51,0) 30%, rgba(31,27,51,0.55) 100%)",
  },
  coverEditBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    color: "var(--atr-text)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  heroBody: {
    display: "grid",
    gridTemplateColumns: "176px 1fr auto",
    gap: 28,
    padding: "0 36px 28px",
    marginTop: -88,
    alignItems: "flex-end",
    position: "relative",
    zIndex: 2,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 20,
    border: "5px solid #fff",
    boxShadow: "0 8px 24px rgba(31,27,51,0.15)",
    objectFit: "cover",
    display: "block",
  },
  avBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    background: "var(--atr-purple)",
    color: "#fff",
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid #fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  identCol: { paddingBottom: 16 },
  identBadges: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  superhost: {
    background: "linear-gradient(135deg, #FFC442 0%, #FF8A00 100%)",
    color: "#3D2900",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  verifiedHero: {
    background: "var(--atr-purple)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  arti: {
    background: "rgba(81,176,84,0.12)",
    color: "var(--atr-arti)",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    border: "1px solid rgba(81,176,84,0.3)",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  name: {
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--atr-text)",
    lineHeight: 1.1,
    margin: "4px 0 6px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  nameCheck: { color: "var(--atr-purple)", fontSize: 24 },
  tagline: {
    fontSize: 15,
    color: "var(--atr-text-muted)",
    margin: 0,
    fontStyle: "italic",
  },
  identMeta: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 12,
    fontSize: 13,
    color: "var(--atr-text)",
  },
  identMetaItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  identMetaDot: { color: "var(--atr-outline)" },
  langRow: { display: "flex", gap: 4, alignItems: "center" },
  langFlag: { fontSize: 18 },

  ctaCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 16,
    minWidth: 200,
  },
  followBtn: {
    background: "var(--atr-purple)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 22px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    boxShadow: "0 6px 16px rgba(112,104,213,0.3)",
  },
  followBtnOn: {
    background: "#fff",
    color: "var(--atr-purple)",
    border: "1.5px solid var(--atr-purple)",
    boxShadow: "none",
  },
  msgBtn: {
    background: "#fff",
    color: "var(--atr-text)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 10,
    padding: "11px 22px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  iconRow: { display: "flex", gap: 6, justifyContent: "flex-end" },
  iconSqBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--atr-text)",
  },

  /* Stats strip */
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    borderTop: "1px solid var(--atr-outline)",
  },
  statCell: {
    padding: "20px 22px",
    borderRight: "1px solid var(--atr-outline)",
    textAlign: "center",
  },
  statCellLast: { borderRight: "none" },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--atr-text)",
    letterSpacing: "-0.01em",
  },
  statValuePurple: { color: "var(--atr-purple)" },
  statValueYellow: { color: "var(--atr-yellow)" },
  statLabel: {
    fontSize: 11,
    color: "var(--atr-text-muted)",
    marginTop: 4,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  statStars: {
    fontSize: 11,
    color: "var(--atr-yellow)",
    letterSpacing: "0.05em",
    marginTop: 2,
  },
};

/* ============================================================
   SPECIALTIES & LANGUAGES STYLES
   ============================================================ */
const gsStyles = {
  twoBlock: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22 },
  block: { display: "flex", flexDirection: "column", gap: 12 },
  blockTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--atr-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  specGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  specChip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 10,
    padding: "12px 14px",
  },
  specChipIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "var(--atr-purple)",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  specChipName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  specChipDesc: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 },

  langList: { display: "flex", flexDirection: "column", gap: 10 },
  langItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    background: "var(--atr-bg-soft)",
    borderRadius: 10,
    border: "1px solid var(--atr-outline)",
  },
  langFlagLg: { fontSize: 26 },
  langName: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  langLevel: { fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 },
  levelBar: { marginLeft: "auto", display: "flex", gap: 3 },
  levelDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    background: "var(--atr-purple)",
  },
  levelDotEmpty: { background: "var(--atr-outline)" },
};

/* ============================================================
   EXPERIENCE STYLES
   ============================================================ */
const expStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 },
  card: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    aspectRatio: "4 / 3",
    cursor: "pointer",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, transparent 40%, rgba(31,27,51,0.85) 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 14,
  },
  name: { color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1.2 },
  visits: { color: "rgba(255,255,255,0.85)", fontSize: 11, marginTop: 2 },
};

/* ============================================================
   PACKAGES STYLES
   ============================================================ */
const gpkgStyles = {
  list: { display: "flex", flexDirection: "column", gap: 12 },
  card: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 18,
    display: "grid",
    gridTemplateColumns: "1fr 220px",
    gap: 18,
    alignItems: "center",
  },
  cardBest: {
    border: "1px solid var(--atr-yellow)",
    boxShadow: "0 4px 14px rgba(255,196,66,0.15)",
  },
  badgeRow: { display: "flex", gap: 6, marginBottom: 8 },
  bestBadge: {
    background: "linear-gradient(135deg, #FFC442 0%, #FF8A00 100%)",
    color: "#3D2900",
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 6,
    letterSpacing: "0.04em",
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
    marginBottom: 6,
  },
  meta: {
    display: "flex",
    gap: 14,
    fontSize: 12,
    color: "var(--atr-text-muted)",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  metaItem: { display: "inline-flex", alignItems: "center", gap: 5 },
  spotRow: { display: "flex", gap: 5, flexWrap: "wrap" },
  spotChip: {
    fontSize: 11,
    color: "var(--atr-text)",
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    padding: "3px 8px",
    borderRadius: 999,
  },
  spotMore: {
    fontSize: 11,
    color: "var(--atr-purple)",
    fontWeight: 700,
    padding: "3px 6px",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: 8,
    paddingLeft: 18,
    borderLeft: "1px dashed var(--atr-outline)",
  },
  rightLabel: {
    fontSize: 10,
    color: "var(--atr-text-muted)",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  rightPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--atr-purple)",
    letterSpacing: "-0.01em",
  },
  rightUnit: { fontSize: 11, color: "var(--atr-text-muted)" },
};

/* ============================================================
   SIMILAR GUIDES STYLES
   ============================================================ */
const sgStyles = {
  hScroll: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "minmax(220px, 230px)",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 8,
  },
  card: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    textAlign: "center",
  },
  av: { width: 72, height: 72, borderRadius: 999, marginBottom: 4 },
  name: { fontSize: 14, fontWeight: 700, color: "var(--atr-text)" },
  specs: { fontSize: 11, color: "var(--atr-text-muted)" },
  meta: { fontSize: 12, color: "var(--atr-text)", marginTop: 4 },
  price: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--atr-purple)",
    marginTop: 6,
  },
  btn: {
    marginTop: 8,
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--atr-text)",
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    width: "100%",
  },
};

/* ============================================================
   BOOKING CARD STYLES
   ============================================================ */
const bgStyles = {
  card: { ...ds.bookCard, padding: 22 },
  fromRow: { display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 },
  fromVal: {
    fontSize: 28,
    fontWeight: 700,
    color: "var(--atr-purple)",
    letterSpacing: "-0.01em",
  },
  fromUnit: { fontSize: 13, color: "var(--atr-text-muted)" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "14px 0",
    borderTop: "1px dashed var(--atr-outline)",
    borderBottom: "1px dashed var(--atr-outline)",
  },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--atr-text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  input: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13,
    color: "var(--atr-text)",
    fontFamily: "var(--atr-font-sans)",
    outline: "none",
  },
  twoFields: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 },
  estBox: {
    background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
    border: "1px solid #D8D0FF",
    borderRadius: 10,
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  estLabel: { fontSize: 12, color: "var(--atr-text)" },
  estVal: { fontSize: 18, fontWeight: 700, color: "var(--atr-purple)" },
};

/* ============================================================
   SVG ICONS
   ============================================================ */
function Pin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */
function CrumbBar({ items }) {
  return (
    <div style={ds.crumbBar}>
      <div style={{ width: "100%" }}>
        <Breadcrumb items={items} />
      </div>
    </div>
  );
}

function SectionCard({
  title,
  eyebrow,
  icon,
  link,
  linkLabel,
  children,
  style = {},
}) {
  return (
    <section style={{ ...ds.section, ...style }}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            {icon && <span>{icon}</span>}
            {title}
          </h2>
          {eyebrow && <div style={ds.sectionSub}>{eyebrow}</div>}
        </div>
        {link && (
          <a href={link} style={ds.sectionLink}>
            {linkLabel || "Lihat semua"} <span>{"\u2192"}</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

function ReadMore({ text, clamp = 4 }) {
  const [open, setOpen] = useState(false);
  const clamped = { ...ds.longTextClamped, WebkitLineClamp: clamp };
  return (
    <div>
      <p style={open ? ds.longText : clamped}>{text}</p>
      <button style={ds.readMoreBtn} onClick={() => setOpen(!open)}>
        {open ? "Sembunyikan \u2191" : "Baca selengkapnya \u2193"}
      </button>
    </div>
  );
}

function RatingBreakdown({ avg = 4.8, count = 0, dist = [78, 15, 4, 2, 1] }) {
  return (
    <div style={ds.reviewTop}>
      <div style={ds.ratingSummary}>
        <div style={ds.ratingBig}>{avg.toFixed(1)}</div>
        <div style={ds.ratingStars}>{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <div style={ds.ratingCount}>
          dari {count.toLocaleString("id-ID")} ulasan
        </div>
      </div>
      <div style={ds.breakdownCol}>
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} style={ds.breakdownRow}>
            <span style={ds.breakdownStar}>
              {s} {"\u2605"}
            </span>
            <div style={ds.breakdownTrack}>
              <div style={{ ...ds.breakdownFill, width: `${dist[i]}%` }} />
            </div>
            <span style={ds.breakdownPct}>{dist[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div style={ds.reviewCard}>
      <img src={r.av} alt="" style={ds.reviewAv} />
      <div>
        <div style={ds.reviewHeader}>
          <div>
            <div style={ds.reviewName}>{r.name}</div>
            <div style={ds.reviewMeta}>
              <span style={ds.reviewStarRow}>{"\u2605".repeat(r.rating)}</span>
              <span>{" \u00B7 "}</span>
              <span>{r.date}</span>
              {r.trip && (
                <>
                  <span>{" \u00B7 "}</span>
                  <span>{r.trip}</span>
                </>
              )}
            </div>
          </div>
          {r.verified && (
            <span style={ds.reviewVerified}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Pembelian Terverifikasi
            </span>
          )}
        </div>
        <p style={ds.reviewText}>{r.text}</p>
      </div>
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function GuideHero() {
  const [follow, setFollow] = useState(false);
  return (
    <div style={ghStyles.hero}>
      <div style={ghStyles.cover}>
        <img src={GUIDE.cover} alt="" style={ghStyles.coverImg} />
        <div style={ghStyles.coverOverlay} />
      </div>

      <div style={ghStyles.heroBody}>
        <div style={ghStyles.avatarWrap}>
          <img src={GUIDE.avatar} alt={GUIDE.name} style={ghStyles.avatar} />
          <div style={ghStyles.avBadge}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div style={ghStyles.identCol}>
          <div style={ghStyles.identBadges}>
            <span style={ghStyles.superhost}>{"\u2B50"} SUPERHOST 2026</span>
            <span style={ghStyles.verifiedHero}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              VERIFIED PEMANDU
            </span>
            <span style={ghStyles.arti}>{"\uD83C\uDF3F"} ARTI Certified</span>
          </div>
          <h1 style={ghStyles.name}>{GUIDE.name}</h1>
          <p style={ghStyles.tagline}>"{GUIDE.tagline}"</p>
          <div style={ghStyles.identMeta}>
            <span style={ghStyles.identMetaItem}>
              <Pin /> {GUIDE.basedIn}
            </span>
            <span style={ghStyles.identMetaDot}>{"\u00B7"}</span>
            <span style={ghStyles.identMetaItem}>
              {"\uD83C\uDF82"} Bergabung {GUIDE.joined}
            </span>
            <span style={ghStyles.identMetaDot}>{"\u00B7"}</span>
            <span style={ghStyles.langRow}>
              {GUIDE.languages.map((l, i) => (
                <span key={i} style={ghStyles.langFlag} title={l.name}>
                  {l.flag}
                </span>
              ))}
              <span style={{ color: "var(--atr-text-muted)", marginLeft: 4 }}>
                {GUIDE.languages.length} bahasa
              </span>
            </span>
          </div>
        </div>

        <div style={ghStyles.ctaCol}>
          <button
            style={{
              ...ghStyles.followBtn,
              ...(follow ? ghStyles.followBtnOn : {}),
            }}
            onClick={() => setFollow(!follow)}
          >
            {follow ? "\u2713 Diikuti" : "+ Ikuti pemandu"}
          </button>
          <button style={ghStyles.msgBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12c0 4.4-4 8-9 8-1 0-2-.1-2.9-.4L4 21l1.4-4C4.5 15.7 4 13.9 4 12c0-4.4 4-8 9-8s8 3.6 8 8z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Kirim Pesan
          </button>
          <div style={ghStyles.iconRow}>
            <button style={ghStyles.iconSqBtn} title="Bagikan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="6"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="18"
                  cy="6"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <button style={ghStyles.iconSqBtn} title="Simpan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 3h12v18l-6-4-6 4V3z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button style={ghStyles.iconSqBtn} title="Lebih">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="12" r="1.6" fill="currentColor" />
                <circle cx="12" cy="12" r="1.6" fill="currentColor" />
                <circle cx="18" cy="12" r="1.6" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div style={ghStyles.statsStrip}>
        <div style={ghStyles.statCell}>
          <div style={{ ...ghStyles.statValue, ...ghStyles.statValueYellow }}>
            {"\u2605"} {GUIDE.rating}
          </div>
          <div style={ghStyles.statStars}>
            {"\u2605\u2605\u2605\u2605\u2605"}
          </div>
          <div style={ghStyles.statLabel}>{GUIDE.reviews} ulasan</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={ghStyles.statValue}>{GUIDE.trips}</div>
          <div style={ghStyles.statLabel}>Trip selesai</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={ghStyles.statValue}>{GUIDE.years} tahun</div>
          <div style={ghStyles.statLabel}>Pengalaman</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={{ ...ghStyles.statValue, ...ghStyles.statValuePurple }}>
            {GUIDE.responseTime}
          </div>
          <div style={ghStyles.statLabel}>Respon balasan</div>
        </div>
        <div style={{ ...ghStyles.statCell, ...ghStyles.statCellLast }}>
          <div style={{ ...ghStyles.statValue, ...ghStyles.statValuePurple }}>
            {GUIDE.responseRate}%
          </div>
          <div style={ghStyles.statLabel}>Tingkat respon</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function GuideAbout() {
  return (
    <SectionCard title="Tentang Saya" icon={"\uD83D\uDC4B"}>
      <ReadMore text={GUIDE.about} clamp={5} />
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 16,
          padding: "14px 16px",
          background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
          borderRadius: 10,
          alignItems: "center",
          border: "1px solid #D8D0FF",
        }}
      >
        <span style={{ fontSize: 22 }}>{"\uD83C\uDF3F"}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-text)" }}
          >
            Anggota komunitas ARTI by Atourin
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--atr-text-muted)",
              marginTop: 2,
            }}
          >
            Pemandu yang berkomitmen pada praktik pariwisata berkelanjutan &
            carbon-offset.
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ============================================================
   SPECIALTIES & LANGUAGES
   ============================================================ */
function GuideSpecialties() {
  return (
    <SectionCard title="Spesialisasi & Bahasa" icon={"\uD83C\uDFAF"}>
      <div style={gsStyles.twoBlock}>
        <div style={gsStyles.block}>
          <div style={gsStyles.blockTitle}>Spesialisasi</div>
          <div style={gsStyles.specGrid}>
            {GUIDE.specialties.map((s) => (
              <div key={s} style={gsStyles.specChip}>
                <span style={gsStyles.specChipIcon}>
                  {SPEC_META[s]?.icon || "\u2726"}
                </span>
                <div>
                  <div style={gsStyles.specChipName}>{s}</div>
                  <div style={gsStyles.specChipDesc}>{SPEC_META[s]?.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={gsStyles.block}>
          <div style={gsStyles.blockTitle}>Bahasa yang dikuasai</div>
          <div style={gsStyles.langList}>
            {GUIDE.languages.map((l, i) => {
              const filled =
                l.level === "Native" ? 5 : l.level === "Fluent" ? 4 : 3;
              return (
                <div key={i} style={gsStyles.langItem}>
                  <span style={gsStyles.langFlagLg}>{l.flag}</span>
                  <div>
                    <div style={gsStyles.langName}>{l.name}</div>
                    <div style={gsStyles.langLevel}>{l.level}</div>
                  </div>
                  <div style={gsStyles.levelBar}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        style={{
                          ...gsStyles.levelDot,
                          ...(n > filled ? gsStyles.levelDotEmpty : {}),
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ============================================================
   EXPERIENCE / AREAS COVERED
   ============================================================ */
function GuideExperience() {
  return (
    <SectionCard
      title="Wilayah Penguasaan"
      icon={"\uD83D\uDDFA"}
      eyebrow="Spot-spot yang sering ditangani"
      link="#"
      linkLabel="Lihat semua spot"
    >
      <div style={expStyles.grid}>
        {EXPERIENCE_AREAS.map((a, i) => (
          <div key={i} style={expStyles.card}>
            <img src={a.img} alt="" style={expStyles.img} />
            <div style={expStyles.overlay}>
              <div style={expStyles.name}>{a.name}</div>
              <div style={expStyles.visits}>
                {a.visits}
                {"\u00D7"} ditangani
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ============================================================
   PACKAGES
   ============================================================ */
function GuidePackages() {
  return (
    <SectionCard
      title="Paket Trip Pemandu"
      icon={"\uD83E\uDEB3"}
      eyebrow="3 paket aktif \u00B7 semua bisa di-custom"
    >
      <div style={gpkgStyles.list}>
        {GUIDE_PACKAGES.map((p, i) => (
          <div
            key={i}
            style={{
              ...gpkgStyles.card,
              ...(p.bestseller ? gpkgStyles.cardBest : {}),
            }}
          >
            <div>
              <div style={gpkgStyles.badgeRow}>
                {p.bestseller && (
                  <span style={gpkgStyles.bestBadge}>
                    {"\u2605"} BESTSELLER
                  </span>
                )}
              </div>
              <div style={gpkgStyles.name}>{p.name}</div>
              <div style={gpkgStyles.meta}>
                <span style={gpkgStyles.metaItem}>
                  {"\u23F1"} {p.duration}
                </span>
                <span>{"\u00B7"}</span>
                <span style={gpkgStyles.metaItem}>
                  {"\uD83D\uDC65"} {p.pax}
                </span>
                <span>{"\u00B7"}</span>
                <span style={gpkgStyles.metaItem}>
                  {"\u26F5"} {p.boat}
                </span>
              </div>
              <div style={gpkgStyles.spotRow}>
                {p.spots.slice(0, 4).map((s) => (
                  <span key={s} style={gpkgStyles.spotChip}>
                    {"\uD83D\uDCCD"} {s}
                  </span>
                ))}
                {p.spots.length > 4 && (
                  <span style={gpkgStyles.spotMore}>
                    +{p.spots.length - 4} lagi
                  </span>
                )}
              </div>
            </div>
            <div style={gpkgStyles.right}>
              <span style={gpkgStyles.rightLabel}>Mulai dari</span>
              <div>
                <span style={gpkgStyles.rightPrice}>
                  Rp {(p.price / 1000000).toFixed(2)}jt
                </span>
                <span style={gpkgStyles.rightUnit}> {p.unit}</span>
              </div>
              <button style={{ ...ds.primaryCta }}>Pesan Paket</button>
              <button style={{ ...ds.iconBtnGhost, justifyContent: "center" }}>
                Detail itinerary
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ============================================================
   GALLERY
   ============================================================ */
function GuideGallery() {
  return (
    <SectionCard
      title="Galeri Trip"
      icon={"\uD83D\uDCF8"}
      eyebrow="Dokumentasi trip bersama tamu"
      link="#"
      linkLabel="Lihat semua 124 foto"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: 130,
          gap: 8,
        }}
      >
        {GUIDE_GALLERY.map((g, i) => (
          <div
            key={i}
            style={{
              gridRow: g.h ? "span 2" : "span 1",
              borderRadius: 10,
              overflow: "hidden",
              cursor: "zoom-in",
            }}
          >
            <img
              src={g.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ============================================================
   REVIEWS
   ============================================================ */
function SubRating({ label, v }) {
  return (
    <div
      style={{
        background: "var(--atr-bg-soft)",
        borderRadius: 10,
        padding: "12px 14px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--atr-text-muted)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--atr-purple)",
          marginTop: 4,
        }}
      >
        {v.toFixed(2)}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--atr-yellow)",
          letterSpacing: "0.05em",
        }}
      >
        {"\u2605\u2605\u2605\u2605\u2605"}
      </div>
    </div>
  );
}

function GuideReviews() {
  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>{"\u2B50"} Ulasan Tamu</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...ds.iconBtnGhost, padding: "8px 14px" }}>
            <option>Semua trip</option>
            <option>Sailing</option>
            <option>Diving</option>
          </select>
        </div>
      </div>
      <RatingBreakdown
        avg={GUIDE.rating}
        count={GUIDE.reviews}
        dist={[91, 7, 1, 1, 0]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 24,
        }}
      >
        <SubRating label="Pengetahuan" v={4.98} />
        <SubRating label="Komunikasi" v={4.95} />
        <SubRating label="Keamanan" v={5.0} />
        <SubRating label="Value" v={4.88} />
      </div>

      <div style={ds.reviewList}>
        {GUIDE_REVIEWS.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
      <button style={ds.loadMoreBtn}>
        Muat 10 ulasan berikutnya {"\u2193"}
      </button>
    </section>
  );
}

/* ============================================================
   SIMILAR GUIDES
   ============================================================ */
function SimilarGuides() {
  return (
    <SectionCard
      title="Pemandu Serupa di Labuan Bajo"
      icon={"\uD83D\uDC65"}
      link="Destination Hub.html?tab=pemandu"
      linkLabel="Lihat semua pemandu"
    >
      <div style={sgStyles.hScroll}>
        {SIMILAR_GUIDES.map((g, i) => (
          <a key={i} href="#" style={sgStyles.card}>
            <img src={g.av} alt="" style={sgStyles.av} />
            <div style={sgStyles.name}>{g.name}</div>
            <div style={sgStyles.specs}>{g.specs.join(" \u00B7 ")}</div>
            <div style={sgStyles.meta}>
              {"\u2605"} <strong>{g.rating}</strong> {"\u00B7"} {g.trips} trip
            </div>
            <div style={sgStyles.price}>
              mulai Rp {(g.price / 1000).toFixed(0)}rb/hari
            </div>
            <button style={sgStyles.btn}>Lihat profil</button>
          </a>
        ))}
      </div>
    </SectionCard>
  );
}

/* ============================================================
   SIDEBAR — BOOKING CARD
   ============================================================ */
function GuideMiniCalendar({ selected, onPick }) {
  // June 2026 demo availability
  const statusFor = (d) => {
    if (d < 4) return "past";
    if ([8, 15, 22].includes(d)) return "full";
    if (new Date(2026, 5, d).getDay() === 0) return "unavailable";
    return "available";
  };
  const startDow = (new Date(2026, 5, 1).getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= 30; d++) cells.push(d);
  const dow = ["S", "S", "R", "K", "J", "S", "M"];
  return (
    <div style={{ borderTop: "1px dashed var(--atr-outline)", paddingTop: 14 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 8,
        }}
      >
        Ketersediaan \u00B7 Juni 2026
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 4,
        }}
      >
        {dow.map((d, i) => (
          <div
            key={"h" + i}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "var(--atr-text-faint)",
            }}
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={"e" + i} />;
          const st = statusFor(d);
          const sel = selected === d;
          const avail = st === "available";
          const bg = sel
            ? "var(--atr-purple)"
            : avail
              ? "rgba(81,176,84,0.14)"
              : "#fff";
          const fg = sel
            ? "#fff"
            : avail
              ? "#2A8A3B"
              : st === "past"
                ? "var(--atr-outline)"
                : "var(--atr-text-faint)";
          return (
            <button
              key={i}
              disabled={!avail}
              onClick={() => onPick(d)}
              style={{
                aspectRatio: "1",
                borderRadius: 7,
                border: `1px solid ${sel ? "var(--atr-purple)" : avail ? "transparent" : "var(--atr-outline)"}`,
                background: bg,
                color: fg,
                fontSize: 12,
                fontWeight: 700,
                cursor: avail ? "pointer" : "default",
                textDecoration: st === "full" ? "line-through" : "none",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 8,
          fontSize: 10.5,
          color: "var(--atr-text-muted)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "rgba(81,176,84,0.4)",
            }}
          />
          Tersedia
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              border: "1px solid var(--atr-outline)",
            }}
          />
          Penuh / libur
        </span>
      </div>
    </div>
  );
}

function BookGuideCard() {
  const [sel, setSel] = useState(null);
  return (
    <div style={bgStyles.card}>
      <div>
        <div style={ds.bookEyebrow}>Tarif Pemandu</div>
        <div style={bgStyles.fromRow}>
          <span style={bgStyles.fromVal}>Rp 850rb</span>
          <span style={bgStyles.fromUnit}>/hari</span>
        </div>
        <div
          style={{ fontSize: 11, color: "var(--atr-text-muted)", marginTop: 2 }}
        >
          Tarif pemandu saja (excl. transport & paket)
        </div>
      </div>

      <div style={{ ...ds.statusChip, ...ds.statusOpen, width: "fit-content" }}>
        <span style={{ ...ds.statusDot, background: "#1F7A21" }} />
        Tersedia minggu ini
      </div>

      <div style={bgStyles.form}>
        <div style={bgStyles.field}>
          <span style={bgStyles.label}>Tipe trip</span>
          <select style={bgStyles.input} defaultValue="sailing">
            <option value="sailing">Sailing 1 Day, Padar & Pink Beach</option>
            <option value="phinisi">Phinisi 3D2N</option>
            <option value="diving">Diving Trip 2D</option>
            <option value="custom">Custom request</option>
          </select>
        </div>

        <GuideMiniCalendar selected={sel} onPick={setSel} />

        <div style={bgStyles.twoFields}>
          <div style={bgStyles.field}>
            <span style={bgStyles.label}>Tanggal dipilih</span>
            <input
              readOnly
              style={bgStyles.input}
              value={sel ? `${sel} Juni 2026` : "Pilih di kalender"}
            />
          </div>
          <div style={bgStyles.field}>
            <span style={bgStyles.label}>Peserta</span>
            <select style={bgStyles.input} defaultValue="2">
              <option>1 orang</option>
              <option>2 orang</option>
              <option>3 orang</option>
              <option>4 orang</option>
              <option>5+ orang</option>
            </select>
          </div>
        </div>
        <div style={bgStyles.estBox}>
          <span style={bgStyles.estLabel}>Estimasi total</span>
          <span style={bgStyles.estVal}>Rp 3.700.000</span>
        </div>
      </div>

      <button
        style={{
          ...ds.primaryCta,
          opacity: sel ? 1 : 0.55,
          cursor: sel ? "pointer" : "not-allowed",
        }}
        disabled={!sel}
      >
        {sel ? `Lanjut Pesan \u00B7 ${sel} Juni` : "Pilih tanggal dulu"}
      </button>
      <button
        style={ds.secondaryCta}
        onClick={() => {
          window.location.href = "Tanya Guide Lokal.html";
        }}
      >
        {"\uD83D\uDCAC"} Konsultasi Gratis dulu
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          color: "var(--atr-text-muted)",
          lineHeight: 1.4,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          Booking aman lewat Atourin Escrow. Refund 100% jika cancel H-3.
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   SIDEBAR — RESPONSE STATS
   ============================================================ */
function PerfRow({ icon, label, value, sub, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        ...(highlight
          ? {
              background: "rgba(255,196,66,0.1)",
              border: "1px solid rgba(255,196,66,0.3)",
              borderRadius: 10,
              padding: "10px 12px",
            }
          : {}),
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>
          {label}
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {value}
        </div>
        <div
          style={{ fontSize: 10, color: "var(--atr-text-muted)", marginTop: 1 }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

function ResponseStatsCard() {
  return (
    <div style={{ ...ds.bookCard, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Kinerja & Status
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <PerfRow
          icon={"\u26A1"}
          label="Respon balasan"
          value={GUIDE.responseTime}
          sub="Rata-rata 6 bulan terakhir"
        />
        <PerfRow
          icon={"\uD83D\uDCDE"}
          label="Tingkat respon"
          value={`${GUIDE.responseRate}%`}
          sub="Dari semua pesan"
        />
        <PerfRow
          icon={"\u2705"}
          label="Trip selesai"
          value={GUIDE.trips}
          sub={`${GUIDE.years} tahun pengalaman`}
        />
        <PerfRow
          icon={"\uD83C\uDFC6"}
          label="Status"
          value="Superhost"
          sub="Top 5% pemandu Atourin"
          highlight
        />
      </div>
    </div>
  );
}

/* ============================================================
   SIDEBAR — CERTIFICATIONS
   ============================================================ */
function CertsCard() {
  return (
    <div style={{ ...ds.bookCard, padding: 18 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Sertifikasi ({GUIDE.certifications.length})
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {GUIDE.certifications.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              paddingBottom: 10,
              borderBottom:
                i === GUIDE.certifications.length - 1
                  ? "none"
                  : "1px dashed var(--atr-outline)",
            }}
          >
            <span style={{ fontSize: 18, marginTop: 2 }}>{c.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--atr-text)",
                  lineHeight: 1.3,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--atr-text-muted)",
                  marginTop: 1,
                }}
              >
                {c.issuer} {"\u00B7"} {c.year}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        style={{ ...ds.iconBtnGhost, justifyContent: "center", marginTop: 4 }}
      >
        {"\uD83D\uDCC4"} Lihat dokumen sertifikat
      </button>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function GuideDetailPage() {
  return (
    <div data-screen-label="Tour Guide Detail">
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <CrumbBar
          items={["Jelajahi", "Pemandu Wisata", "Labuan Bajo", GUIDE.name]}
        />
        <div style={ds.containerWide}>
          <GuideHero />
        </div>
        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <GuideAbout />
            <GuideSpecialties />
            <GuideExperience />
            <GuidePackages />
            <GuideGallery />
            <GuideReviews />
            <SimilarGuides />
          </div>
          <aside style={ds.sideCol}>
            <BookGuideCard />
            <ResponseStatsCard />
            <CertsCard />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
