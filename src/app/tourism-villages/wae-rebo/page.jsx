"use client";

import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { ds } from "@/styles/detail-styles";

/* ── Data ── */
const VLG = {
  name: "Desa Wisata Wae Rebo",
  status: "Mandiri",
  statusFg: "#2D8838",
  statusBg: "#D9F2DA",
  statusDesc:
    "Status tertinggi, desa wisata yang sudah mampu mengelola pariwisata secara mandiri & berkelanjutan dengan branding kuat di pasar nasional/internasional.",
  founded: 2008,
  kecamatan: "Satar Mese Barat",
  kota: "Manggarai",
  provinsi: "Nusa Tenggara Timur",
  rating: 4.92,
  reviews: 312,
  tags: ["Budaya", "Petualangan", "Kerajinan", "Pegunungan", "Heritage"],
  shortDesc:
    "Desa adat Manggarai di pegunungan 1.200 mdpl dengan 7 rumah Mbaru Niang berbentuk kerucut yang ikonik, diakui UNESCO Asia-Pacific Heritage Award 2012.",
  longDesc:
    "Wae Rebo adalah desa adat Manggarai yang tersembunyi di ketinggian 1.200 mdpl, dikelilingi pegunungan dan hutan kopi yang lebat. Yang membuatnya istimewa adalah 7 rumah adat Mbaru Niang berbentuk kerucut tinggi 15 meter yang berdiri membentuk lingkaran, sebuah lanskap visual yang tidak ada di tempat lain di Indonesia.\n\nDesa ini diperkirakan berusia lebih dari 1.000 tahun, dengan tradisi yang masih dipegang erat oleh warganya. Tahun 2012, Wae Rebo menerima penghargaan UNESCO Asia-Pacific Award of Excellence for Cultural Heritage Conservation, mengukuhkan statusnya sebagai salah satu desa adat paling penting di Asia Pasifik.\n\nUntuk mencapainya, wisatawan harus melakukan trekking 3-4 jam dari Desa Denge melewati hutan tropis. Setibanya, tamu disambut dengan upacara adat Pa'u Wae Lu'u, pengakuan kepada leluhur agar tamu diizinkan masuk desa. Pengunjung menginap di rumah adat bersama keluarga setempat, ikut memetik kopi, melihat proses penyangraian tradisional, dan belajar menenun songke Manggarai.\n\nWae Rebo dikelola sepenuhnya oleh Pokdarwis lokal, semua pendapatan kembali ke desa untuk pendidikan, kesehatan, dan pelestarian rumah adat. Kuota harian dibatasi 35 tamu untuk menjaga kapasitas dan keseimbangan ekologis.",
  cover:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1800&auto=format&fit=crop&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=70",
  ],
};

/* ── SVG Icons ── */
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

/* ── Shared Components ── */
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

function ReadMore({ text, clamp = 5 }) {
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

function FacilityItem({ icon, label, available = true }) {
  return (
    <div style={{ ...ds.facItem, ...(available ? {} : ds.facItemOff) }}>
      <span style={ds.facIcon}>{icon}</span>
      <span style={{ ...ds.facLabel, ...(available ? {} : ds.facStrike) }}>
        {label}
      </span>
    </div>
  );
}

function RatingBreakdown({ avg = 4.8, count = 0, dist = [88, 9, 2, 1, 0] }) {
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
        {r.photos && (
          <div style={ds.reviewPhotos}>
            {r.photos.map((p, i) => (
              <img key={i} src={p} alt="" style={ds.reviewPhoto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniAttractionCard({ a }) {
  return (
    <a href="/" style={ds.miniCard}>
      <img src={a.img} alt="" style={ds.miniImg} />
      <div style={ds.miniBody}>
        <span style={{ ...ds.miniCat, color: a.catFg }}>{a.cat}</span>
        <span style={ds.miniName}>{a.name}</span>
        <div style={ds.miniMeta}>
          <span style={ds.miniRating}>
            {"\u2605"} <strong>{a.rating}</strong>
          </span>
          <span style={ds.miniPrice}>
            {a.price === 0 ? "Gratis" : `Rp ${(a.price / 1000).toFixed(0)}rb`}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── Village Detail Styles ── */
const vdStyles = {
  heroCover: {
    position: "relative",
    height: 440,
    overflow: "hidden",
    borderRadius: 16,
    marginBottom: 12,
    background: "#1F1B33",
  },
  heroCoverImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroPlay: {
    position: "absolute",
    bottom: 20,
    left: 24,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "var(--atr-text)",
  },
  heroSeeAll: {
    position: "absolute",
    bottom: 20,
    right: 24,
    background: "rgba(31,27,51,0.7)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  heroBadgeCorner: {
    position: "absolute",
    top: 24,
    left: 24,
    background: "rgba(255,255,255,0.95)",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 8,
  },
  galleryItem: {
    aspectRatio: "1 / 1",
    borderRadius: 10,
    overflow: "hidden",
    cursor: "zoom-in",
  },
  galleryItemImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  actGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
  actCard: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  actIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 4,
  },
  actName: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)" },
  actDur: {
    display: "inline-block",
    background: "#EDE9FF",
    color: "var(--atr-purple)",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 999,
    width: "fit-content",
  },
  actDesc: {
    fontSize: 13,
    lineHeight: 1.5,
    color: "var(--atr-text-muted)",
    margin: 0,
  },
  pkgGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  pkgCard: {
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 14,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  pkgBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: "4px 8px",
    borderRadius: 6,
    letterSpacing: "0.04em",
    width: "fit-content",
    background: "#FFF4D9",
    color: "#B47A00",
  },
  pkgName: {
    fontSize: 17,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
  },
  pkgMetaRow: {
    display: "flex",
    gap: 12,
    fontSize: 12,
    color: "var(--atr-text-muted)",
  },
  pkgIncList: {
    margin: 0,
    paddingLeft: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  pkgIncItem: {
    fontSize: 13,
    color: "var(--atr-text)",
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
  },
  pkgFoot: {
    marginTop: "auto",
    paddingTop: 12,
    borderTop: "1px dashed var(--atr-outline)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pkgPrice: { fontSize: 22, fontWeight: 700, color: "var(--atr-purple)" },
  pkgPriceUnit: {
    fontSize: 12,
    color: "var(--atr-text-muted)",
    fontWeight: 500,
  },
  galMason: { columnCount: 3, columnGap: 10 },
  galMasonItem: {
    breakInside: "avoid",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  galMasonImg: { width: "100%", display: "block" },
  galMasonCap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)",
    color: "#fff",
    padding: "20px 12px 10px",
    fontSize: 11,
    fontWeight: 600,
  },
  customBanner: {
    background: "linear-gradient(135deg, #F6F4FF 0%, #EDE9FF 100%)",
    border: "1px solid #D8D0FF",
    borderRadius: 12,
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },
};

/* ── Hero + Gallery ── */
function VillageHeroBlock() {
  return (
    <div>
      <div style={vdStyles.heroCover}>
        <img src={VLG.cover} alt="" style={vdStyles.heroCoverImg} />
        <div style={vdStyles.heroBadgeCorner}>
          <span
            style={{
              ...ds.statusDot,
              background: VLG.statusFg,
              width: 8,
              height: 8,
            }}
          />
          Desa <strong>{VLG.status}</strong>
        </div>
        <button style={vdStyles.heroPlay}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--atr-purple)"
          >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Tonton video pendek (28 dtk)
        </button>
        <button style={vdStyles.heroSeeAll}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle
              cx="9"
              cy="11"
              r="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3 17l5-5 4 4 3-3 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          Lihat semua 47 foto
        </button>
      </div>
      <div style={vdStyles.galleryGrid}>
        {VLG.gallery.slice(0, 4).map((src, i) => (
          <div key={i} style={vdStyles.galleryItem}>
            <img src={src} alt="" style={vdStyles.galleryItemImg} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Header ── */
function VillageHeader() {
  return (
    <section style={ds.section}>
      <div style={ds.hdrBadgeRow}>
        <span
          style={{
            ...ds.catBadge,
            background: VLG.statusBg,
            color: VLG.statusFg,
          }}
        >
          <span style={{ ...ds.statusDot, background: VLG.statusFg }} />
          Desa {VLG.status}
        </span>
        <span
          style={{
            ...ds.certBadge,
            color: "#7E1D1D",
            background: "#FFF5F5",
            borderColor: "rgba(126,29,29,0.3)",
          }}
        >
          {"\uD83C\uDF1C"} UNESCO Heritage Award 2012
        </span>
        <span
          style={{
            ...ds.certBadge,
            color: "var(--atr-arti)",
            background: "rgba(81,176,84,0.08)",
            borderColor: "rgba(81,176,84,0.3)",
          }}
        >
          {"\uD83C\uDF3F"} GSTC Certified
        </span>
        <span
          style={{
            ...ds.certBadge,
            color: "var(--atr-purple)",
            background: "#EDE9FF",
            borderColor: "var(--atr-purple-light)",
          }}
        >
          {"\uD83C\uDFC6"} Pokdarwis Nasional
        </span>
      </div>
      <h1 style={ds.hdrTitle}>{VLG.name}</h1>
      <div style={ds.hdrMetaRow}>
        <span style={ds.hdrMetaItem}>
          <Pin /> Kec. {VLG.kecamatan}, {VLG.kota}, {VLG.provinsi}
        </span>
        <a href="#map" style={ds.hdrMetaLink}>
          Google Maps {"\u2192"}
        </a>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <span style={ds.hdrMetaItem}>
          {"\uD83D\uDCD3"} Desa Wisata sejak <strong>{VLG.founded}</strong>
        </span>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <span style={ds.hdrMetaItem}>
          <span style={{ color: "var(--atr-yellow)" }}>{"\u2605"}</span>{" "}
          <strong>{VLG.rating}</strong>{" "}
          <span style={{ color: "var(--atr-text-muted)" }}>
            ({VLG.reviews} ulasan)
          </span>
        </span>
      </div>
      <div style={ds.hdrTagRow}>
        {VLG.tags.map((t) => (
          <span key={t} style={ds.hdrTag}>
            #{t.toLowerCase()}
          </span>
        ))}
      </div>
      <p style={ds.hdrShortDesc}>{VLG.shortDesc}</p>
    </section>
  );
}

/* ── About ── */
function VillageAbout() {
  return (
    <SectionCard title="Tentang Desa" icon={"\uD83C\uDFE0"}>
      <ReadMore text={VLG.longDesc} clamp={5} />
    </SectionCard>
  );
}

/* ── Activities ── */
const ACTIVITIES = [
  {
    icon: "\uD83E\uDD7E",
    name: "Trekking Hutan Kopi",
    dur: "3\u20134 jam",
    desc: "Pendakian dari Desa Denge melewati kebun kopi dan hutan tropis sampai Wae Rebo.",
  },
  {
    icon: "\uD83E\uDDF5",
    name: "Workshop Menenun Songke",
    dur: "2 jam",
    desc: "Belajar menenun kain songke tradisional Manggarai dari ibu-ibu desa.",
  },
  {
    icon: "\u2615",
    name: "Petik & Sangrai Kopi",
    dur: "1,5 jam",
    desc: "Memetik kopi arabika langsung dari pohon dan menyangrai dengan kayu bakar.",
  },
  {
    icon: "\uD83C\uDFAD",
    name: "Upacara Pa'u Wae Lu'u",
    dur: "30 menit",
    desc: "Ritual penyambutan tamu, pengakuan kepada leluhur sebelum masuk desa.",
  },
  {
    icon: "\uD83C\uDFB5",
    name: "Pertunjukan Caci",
    dur: "1 jam",
    desc: "Tarian perang tradisional Manggarai dengan cambuk & perisai (sesuai jadwal).",
  },
  {
    icon: "\uD83C\uDF05",
    name: "Sunrise di Bukit",
    dur: "45 menit",
    desc: "Trek pendek ke bukit di belakang desa untuk view matahari terbit di kabut pagi.",
  },
];

function VillageActivities() {
  return (
    <SectionCard
      title="Aktivitas & Pengalaman"
      icon={"\uD83C\uDFAF"}
      eyebrow="6 aktivitas yang bisa dialami di Wae Rebo"
    >
      <div style={vdStyles.actGrid}>
        {ACTIVITIES.map((a) => (
          <div key={a.name} style={vdStyles.actCard}>
            <span style={vdStyles.actIcon}>{a.icon}</span>
            <div style={vdStyles.actName}>{a.name}</div>
            <span style={vdStyles.actDur}>
              {"\u23F1"} {a.dur}
            </span>
            <p style={vdStyles.actDesc}>{a.desc}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Packages ── */
const PACKAGES = [
  {
    name: "Wae Rebo 2D1N, Heritage Experience",
    duration: "2 Hari \u00B7 1 Malam",
    minPax: 2,
    maxPax: 8,
    price: 1850000,
    popular: true,
    includes: [
      "Transport PP Labuan Bajo\u2013Denge",
      "Pemandu lokal bersertifikat HPI",
      "Menginap di Mbaru Niang",
      "3x makan masakan Manggarai",
      "Upacara penyambutan adat",
      "Workshop tenun songke",
    ],
  },
  {
    name: "Wae Rebo + Kopi Tour 3D2N",
    duration: "3 Hari \u00B7 2 Malam",
    minPax: 2,
    maxPax: 6,
    price: 2950000,
    popular: false,
    includes: [
      "Semua di paket 2D1N",
      "Kunjungan kebun kopi Arabika",
      "Workshop sangrai kopi tradisional",
      "Tambahan 1 malam di Denge",
      "Sertifikat Pokdarwis",
    ],
  },
];

function VillagePackages() {
  return (
    <SectionCard
      title="Paket Wisata Resmi"
      icon={"\uD83D\uDCE6"}
      eyebrow="Paket terdaftar di Marketplace Atourin"
      link="/"
      linkLabel="Pesan custom"
    >
      <div style={vdStyles.pkgGrid}>
        {PACKAGES.map((p, i) => (
          <article key={i} style={vdStyles.pkgCard}>
            {p.popular && (
              <span style={vdStyles.pkgBadge}>{"\u2B50"} TERPOPULER</span>
            )}
            <div style={vdStyles.pkgName}>{p.name}</div>
            <div style={vdStyles.pkgMetaRow}>
              <span>
                {"\u23F1"} {p.duration}
              </span>
              <span>{"\u00B7"}</span>
              <span>
                {"\uD83D\uDC65"} {p.minPax}
                {"\u2013"}
                {p.maxPax} orang
              </span>
            </div>
            <ul style={vdStyles.pkgIncList}>
              {p.includes.map((inc, j) => (
                <li key={j} style={vdStyles.pkgIncItem}>
                  <span
                    style={{
                      color: "var(--atr-arti)",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {"\u2713"}
                  </span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
            <div style={vdStyles.pkgFoot}>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--atr-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Mulai dari
                </div>
                <span style={vdStyles.pkgPrice}>
                  Rp {(p.price / 1000000).toFixed(2)}jt
                </span>
                <span style={vdStyles.pkgPriceUnit}>/orang</span>
              </div>
              <button
                style={{
                  ...ds.primaryCta,
                  width: "auto",
                  padding: "12px 22px",
                }}
              >
                Pesan
              </button>
            </div>
          </article>
        ))}
      </div>
      <div style={{ ...vdStyles.customBanner, marginTop: 14 }}>
        <div>
          <div
            style={{ fontSize: 14, fontWeight: 700, color: "var(--atr-text)" }}
          >
            Ingin paket custom?
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--atr-text-muted)",
              marginTop: 2,
            }}
          >
            Itinerary fleksibel, durasi & aktivitas bisa disesuaikan kebutuhan
            grup Anda.
          </div>
        </div>
        <button
          style={{ ...ds.secondaryCta, width: "auto", padding: "10px 20px" }}
        >
          {"\uD83D\uDCAC"} Hubungi Pengelola
        </button>
      </div>
    </SectionCard>
  );
}

/* ── Nearby Attractions ── */
const VILLAGE_ATTRACTIONS = [
  {
    name: "Air Terjun Cunca Wulang",
    cat: "Air Terjun",
    catFg: "#1F6FB0",
    rating: 4.7,
    price: 25000,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Bukit Cinta",
    cat: "Viewpoint",
    catFg: "#B85C00",
    rating: 4.6,
    price: 0,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Sawah Lingko",
    cat: "Heritage",
    catFg: "#7E1D1D",
    rating: 4.8,
    price: 15000,
    img: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Kampung Adat Todo",
    cat: "Budaya",
    catFg: "#7068D5",
    rating: 4.5,
    price: 20000,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Hutan Kopi Colol",
    cat: "Alam",
    catFg: "#2D8838",
    rating: 4.6,
    price: 30000,
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
  },
];

function VillageAttractions() {
  return (
    <SectionCard
      title="Atraksi di Sekitar Desa"
      icon={"\uD83D\uDCCD"}
      eyebrow="Atraksi yang bisa dikunjungi dalam radius 20 km"
      link="/"
    >
      <div style={ds.hScroll}>
        {VILLAGE_ATTRACTIONS.map((a, i) => (
          <MiniAttractionCard key={i} a={a} />
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Facilities ── */
const VLG_FACILITIES = [
  { icon: "\uD83D\uDEBB", label: "Toilet Bersama", on: true },
  { icon: "\uD83C\uDF7D\uFE0F", label: "Restoran Lokal", on: true },
  { icon: "\uD83D\uDEF5\uFE0F", label: "Parkir di Denge", on: true },
  { icon: "\uD83D\uDEE1", label: "Pemandu Lokal", on: true },
  { icon: "\uD83C\uDFE1", label: "Homestay Mbaru", on: true },
  { icon: "\uD83D\uDD4C", label: "Mushola", on: true },
  { icon: "\uD83D\uDD0C", label: "Charger Station", on: true },
  { icon: "\uD83D\uDCF6", label: "WiFi", on: false },
];

function VillageFacilities() {
  return (
    <SectionCard title="Fasilitas & Akomodasi" icon={"\uD83C\uDFA8"}>
      <div style={ds.facGrid}>
        {VLG_FACILITIES.map((f) => (
          <FacilityItem
            key={f.label}
            icon={f.icon}
            label={f.label}
            available={f.on}
          />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 16,
        }}
      >
        <div
          style={{
            background: "var(--atr-bg-soft)",
            border: "1px solid var(--atr-outline)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {"\uD83C\uDFE1"}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              7 Mbaru Niang Homestay
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              Tidur dengan keluarga adat {"\u00B7"} Mulai{" "}
              <strong style={{ color: "var(--atr-purple)" }}>
                Rp 350.000/malam
              </strong>{" "}
              (inc. makan)
            </div>
          </div>
        </div>
        <div
          style={{
            background: "var(--atr-bg-soft)",
            border: "1px solid var(--atr-outline)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {"\uD83D\uDC65"}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              Kuota harian: 35 tamu
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              Untuk menjaga keseimbangan ekologis dan budaya. Wajib booking H-7.
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ── Access ── */
function AccessStep({ n, title, sub }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: 14,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: "var(--atr-purple)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {n}
      </div>
      <div>
        <div
          style={{ fontSize: 14, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {title}
        </div>
        <div
          style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

function VillageAccess() {
  return (
    <SectionCard title="Cara Menuju Wae Rebo" icon={"\uD83D\uDE97"}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AccessStep
          n="1"
          title="Labuan Bajo → Ruteng"
          sub={"Travel/charter ~4 jam (jalan darat) \u00B7 Rp 250rb/orang"}
        />
        <AccessStep
          n="2"
          title="Ruteng → Desa Denge (titik trek)"
          sub={"Mobil 4WD ~3 jam \u00B7 Rp 150rb/orang"}
        />
        <AccessStep
          n="3"
          title="Trek Denge → Wae Rebo"
          sub={
            "Jalan kaki 3\u20134 jam menanjak \u00B7 Pemandu wajib \u00B7 Pikul barang Rp 100rb"
          }
        />
      </div>
      <div style={{ ...ds.mapBox, marginTop: 16 }} id="map">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
          alt=""
          style={ds.mapImg}
        />
        <span style={ds.mapPin}>{"\uD83D\uDCCD"}</span>
        <button style={ds.mapDirBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 12L12 2 2 12l10 10 10-10z"
              stroke="#fff"
              strokeWidth="1.6"
            />
          </svg>
          Buka di Maps
        </button>
      </div>
    </SectionCard>
  );
}

/* ── Activity Gallery ── */
const ACT_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    cap: "Trekking pagi melewati hutan kopi",
  },
  {
    src: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70",
    cap: "Workshop menenun songke",
  },
  {
    src: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    cap: "Mbaru Niang dari sudut sawah",
  },
  {
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    cap: "Sunset di puncak bukit",
  },
  {
    src: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
    cap: "Sangrai kopi tradisional",
  },
  {
    src: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    cap: "Upacara Pa'u Wae Lu'u",
  },
];

function VillageActivityGallery() {
  return (
    <SectionCard
      title="Galeri Kegiatan"
      icon={"\uD83D\uDCF8"}
      eyebrow="Dokumentasi tamu Wae Rebo"
      link="/"
      linkLabel="Lihat semua 47 foto"
    >
      <div style={vdStyles.galMason}>
        {ACT_GALLERY.map((g, i) => (
          <div key={i} style={vdStyles.galMasonItem}>
            <img
              src={g.src}
              alt=""
              style={{
                ...vdStyles.galMasonImg,
                aspectRatio: i % 2 === 0 ? "4/3" : "3/4",
              }}
            />
            <div style={vdStyles.galMasonCap}>{g.cap}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Reviews ── */
const VLG_REVIEWS = [
  {
    name: "Naufal Rasyid",
    av: "https://i.pravatar.cc/100?img=33",
    rating: 5,
    date: "2 Mei 2026",
    trip: "Paket 2D1N",
    verified: true,
    text: "Pengalaman paling autentik yang pernah saya alami di Indonesia. Tidur di Mbaru Niang, masak bareng keluarga Bapak Yos, dan upacara penyambutan yang tulus, bukan untuk turis, tapi karena memang bagian dari hidup mereka. Trek 4 jam totally worth it.",
  },
  {
    name: "Karina Linggar",
    av: "https://i.pravatar.cc/100?img=49",
    rating: 5,
    date: "20 April 2026",
    trip: "Paket 3D2N",
    verified: true,
    text: "Pengelola desa sangat profesional. Workshop tenun langsung dari Mama Veronica, dia 30 tahun menenun. Pulang bawa selendang songke yang saya tenun sendiri (jelek, tapi penuh makna). Recommended banget!",
    photos: [
      "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=200&auto=format&fit=crop&q=70",
    ],
  },
  {
    name: "Ariq & Tika",
    av: "https://i.pravatar.cc/100?img=11",
    rating: 4,
    date: "8 April 2026",
    trip: "Honeymoon",
    verified: true,
    text: "Indah, tapi siapkan fisik. Trek lebih berat dari ekspektasi (kami sering trekking, tetap berat). Bawa headlamp wajib karena ada bagian gelap. Selain itu, semua perfect. View Mbaru Niang muncul dari kabut adalah momen yang tidak akan kami lupakan.",
  },
];

function VillageReviews() {
  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>{"\u2B50"} Ulasan Wisatawan</h2>
        <button
          style={{ ...ds.secondaryCta, width: "auto", padding: "10px 16px" }}
        >
          + Tulis ulasan
        </button>
      </div>
      <RatingBreakdown
        avg={VLG.rating}
        count={VLG.reviews}
        dist={[88, 9, 2, 1, 0]}
      />
      <div style={ds.reviewList}>
        {VLG_REVIEWS.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
      <button style={ds.loadMoreBtn}>
        Muat 10 ulasan berikutnya {"\u2193"}
      </button>
    </section>
  );
}

/* ── Related Villages ── */
const RELATED_VILLAGES = [
  {
    name: "Desa Todo",
    status: "Maju",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    desc: "Kampung adat Manggarai dengan rumah Niang yang lebih tua, 2 jam dari Ruteng.",
    rating: 4.6,
    statusBg: "#D4ECF4",
    statusFg: "#1F6FB0",
  },
  {
    name: "Desa Melo",
    status: "Berkembang",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
    desc: "Desa di lereng dengan kerajinan tenun & view savana yang dramatis.",
    rating: 4.5,
    statusBg: "#FFF4D9",
    statusFg: "#B47A00",
  },
  {
    name: "Desa Liang Ndara",
    status: "Mandiri",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
    desc: "Sanggar tari Caci tradisional 5 km dari Labuan Bajo dengan paket budaya 1-day.",
    rating: 4.7,
    statusBg: "#D9F2DA",
    statusFg: "#2D8838",
  },
];

const relVlgStyles = {
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  card: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
  },
  img: {
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    display: "block",
  },
  body: { padding: 14, display: "flex", flexDirection: "column", gap: 8 },
  name: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)" },
  desc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "var(--atr-text-muted)",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

function VillageRelated() {
  return (
    <SectionCard
      title={"Desa Wisata Lainnya di " + VLG.kota}
      icon={"\uD83C\uDFE0"}
      link="/"
      linkLabel="Lihat semua desa wisata"
    >
      <div style={relVlgStyles.grid}>
        {RELATED_VILLAGES.map((v, i) => (
          <a key={i} href="/" style={relVlgStyles.card}>
            <img src={v.img} alt="" style={relVlgStyles.img} />
            <div style={relVlgStyles.body}>
              <span
                style={{
                  ...ds.catBadge,
                  background: v.statusBg,
                  color: v.statusFg,
                  width: "fit-content",
                }}
              >
                <span style={{ ...ds.statusDot, background: v.statusFg }} />
                Desa {v.status}
              </span>
              <div style={relVlgStyles.name}>{v.name}</div>
              <p style={relVlgStyles.desc}>{v.desc}</p>
              <div style={{ fontSize: 12, color: "var(--atr-text)" }}>
                {"\u2605"} <strong>{v.rating}</strong>
              </div>
            </div>
          </a>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── Sidebar Contact ── */
function ContactLine({ icon, label, value, link }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <span
        style={{
          color: "var(--atr-text-muted)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{icon}</span>
        {label}
      </span>
      <a
        href={link}
        style={{
          color: "var(--atr-text)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {value}
      </a>
    </div>
  );
}

function SocialDot({ icon, label }) {
  return (
    <button
      style={{
        flex: 1,
        background: "#fff",
        border: "1px solid var(--atr-outline)",
        borderRadius: 8,
        padding: "8px 4px",
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <span>{icon}</span>
      <span
        style={{
          fontSize: 10,
          color: "var(--atr-text-muted)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function ContactCard() {
  const [save, setSave] = useState(false);
  return (
    <div style={ds.bookCard}>
      <div style={ds.bookHead}>
        <span style={ds.bookEyebrow}>Pengelola Desa</span>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <img
            src="https://i.pravatar.cc/80?img=68"
            alt=""
            style={{ width: 44, height: 44, borderRadius: 999 }}
          />
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              Pak Yosef Mbaha
            </div>
            <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>
              Ketua Pokdarwis {"\u00B7"} sejak 2015
            </div>
          </div>
        </div>
      </div>
      <div style={{ ...ds.priceTable, padding: "14px 14px", gap: 10 }}>
        <ContactLine
          icon={"\uD83D\uDCDE"}
          label="Telepon"
          value="+62 813-3856-7720"
          link="tel:+6281338567720"
        />
        <ContactLine
          icon={"\u2709\uFE0F"}
          label="Email"
          value="info@waerebo.id"
          link="mailto:info@waerebo.id"
        />
        <ContactLine
          icon={"\uD83C\uDF10"}
          label="Website"
          value="waerebo.id"
          link="https://waerebo.id"
        />
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingTop: 6,
            borderTop: "1px dashed var(--atr-outline)",
          }}
        >
          <SocialDot icon={"\uD83D\uDCF7"} label="IG" />
          <SocialDot icon={"\uD83D\uDCD8"} label="FB" />
          <SocialDot icon={"\uD83C\uDFB5"} label="TT" />
        </div>
      </div>
      <button style={ds.primaryCta}>{"\uD83D\uDCE6"} Pesan Paket Wisata</button>
      <button style={ds.secondaryCta}>
        {"\uD83D\uDCAC"} Hubungi Pengelola (WA)
      </button>
      <div style={ds.iconRow}>
        <button
          style={{ ...ds.iconBtnGhost, ...(save ? ds.iconBtnOn : {}) }}
          onClick={() => setSave(!save)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "currentColor" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          {save ? "Tersimpan" : "Simpan"}
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Tautan disalin ke clipboard")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
          Bagikan
        </button>
        <button
          style={{
            ...ds.iconBtnGhost,
            color: "var(--atr-purple)",
            borderColor: "var(--atr-purple-light)",
            background: "var(--atr-purple-50)",
          }}
          onClick={() => alert("Link affiliate disalin")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M9 15l6-6" />
            <path d="M11 6l1-1a4 4 0 015.7 5.7l-1 1M13 18l-1 1A4 4 0 016.3 13.3l1-1" />
          </svg>{" "}
          Komisi
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Diunduh untuk offline")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v11m0 0l-4-4m4 4l4-4" />
            <path d="M5 19h14" />
          </svg>{" "}
          Offline
        </button>
      </div>
    </div>
  );
}

/* ── Sidebar Certifications ── */
function CertRow({ icon, name, year, issuer }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, marginTop: 2 }}>{icon}</span>
      <div>
        <div
          style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-text)" }}
        >
          {name}{" "}
          <span style={{ color: "var(--atr-text-muted)", fontWeight: 500 }}>
            {" \u00B7"} {year}
          </span>
        </div>
        <div
          style={{ fontSize: 11, color: "var(--atr-text-muted)", marginTop: 1 }}
        >
          {issuer}
        </div>
      </div>
    </div>
  );
}

function CertificationsCard() {
  return (
    <div style={{ ...ds.bookCard, padding: 16 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Sertifikasi & Penghargaan
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CertRow
          icon={"\uD83C\uDF1C"}
          name="UNESCO Asia-Pacific Award"
          year="2012"
          issuer="UNESCO"
        />
        <CertRow
          icon={"\uD83C\uDFC6"}
          name="ADWI Mandiri"
          year="2023"
          issuer="Kemenparekraf"
        />
        <CertRow
          icon={"\uD83C\uDF3F"}
          name="GSTC Certified"
          year="2022"
          issuer="Global Sustainable Tourism Council"
        />
        <CertRow
          icon={"\u2705"}
          name="CHSE Certified"
          year="2021"
          issuer="Kemenparekraf"
        />
      </div>
    </div>
  );
}

/* ── Page ── */
export default function VillageDetailPage() {
  return (
    <div data-screen-label="Tourism Village Detail">
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <CrumbBar
          items={[
            "Jelajahi",
            "Nusa Tenggara Timur",
            "Manggarai",
            "Desa Wisata",
            "Wae Rebo",
          ]}
        />
        <div style={ds.containerWide}>
          <VillageHeroBlock />
        </div>
        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <VillageHeader />
            <VillageAbout />
            <VillageActivities />
            <VillagePackages />
            <VillageAttractions />
            <VillageFacilities />
            <VillageAccess />
            <VillageActivityGallery />
            <VillageReviews />
            <VillageRelated />
          </div>
          <aside style={ds.sideCol}>
            <ContactCard />
            <CertificationsCard />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
