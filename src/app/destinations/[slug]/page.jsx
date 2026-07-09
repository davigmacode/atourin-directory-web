"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { DESTINATIONS } from "@/data/destinations";
import { ATTR_DATA } from "@/data/attractions";
import { VIL_DATA } from "@/data/villages";
import { ITIN_DATA } from "@/data/itineraries";
import { GUIDE_DATA } from "@/data/guides";
import { cat } from "@/lib/i18n";
import dh from "@/styles/destination-detail";

/* ── Helpers ────────────────────────────────────────── */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

function unslug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatPrice(price) {
  if (price === 0 || price == null) return "Gratis";
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}jt`;
  if (price >= 1000) return `Rp ${(price / 1000).toFixed(0)}rb`;
  return `Rp ${price}`;
}

/* ── Default cover images for hero slider ────────────── */
const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2000&auto=format&fit=crop&q=70",
];

const WEATHER_ICONS = ["☀️", "⛅", "🌤️", "🌦️", "☁️"];
const WEATHER_COND = [
  "Cerah",
  "Cerah berawan",
  "Berawan",
  "Hujan ringan",
  "Mendung",
];

/* ── Tab definitions ──────────────────────────────────── */
function getTabs(dest) {
  return [
    { id: "atraksi", label: cat("attraction", "Atraksi"), count: dest.attr },
    { id: "desa", label: cat("village", "Desa Wisata"), count: dest.desa },
    { id: "itinerary", label: cat("itinerary", "Itinerary"), count: dest.itin },
    { id: "pemandu", label: cat("guide", "Pemandu"), count: dest.guide },
    { id: "cerita", label: "Cerita Wisatawan" },
    { id: "info", label: "Travel Info & Tips" },
  ];
}

/* ==========================================================
   FILTER HELPERS
   ========================================================== */
function FChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ ...dh.fchip, ...(active ? dh.fchipOn : {}) }}
    >
      {children}
    </button>
  );
}

function FGroup({ label, children }) {
  return (
    <div style={dh.fgroup}>
      <div style={dh.fgroupLabel}>{label}</div>
      <div style={dh.fgroupRow}>{children}</div>
    </div>
  );
}

function FilterBar({ children }) {
  return <div style={dh.filterBar}>{children}</div>;
}

function toggleArr(arr, set, v) {
  set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
}

/* ==========================================================
   HERO
   ========================================================== */
function DestHero({ dest, covers }) {
  const [slide, setSlide] = useState(0);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % covers.length), 5000);
    return () => clearInterval(t);
  }, [covers.length]);

  const weatherIcon =
    WEATHER_ICONS[Math.floor(Math.random() * WEATHER_ICONS.length)];
  const weatherTemp = Math.floor(Math.random() * 8) + 26;
  const weatherCond =
    WEATHER_COND[Math.floor(Math.random() * WEATHER_COND.length)];

  return (
    <section style={dh.hero}>
      {covers.map((c, i) => (
        <div
          key={i}
          style={{
            ...dh.heroBg,
            backgroundImage: `url(${c})`,
            opacity: i === slide ? 1 : 0,
          }}
        />
      ))}
      <div style={dh.heroOverlay} />
      <div style={dh.heroDots}>
        {covers.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{ ...dh.heroDot, ...(i === slide ? dh.heroDotActive : {}) }}
          />
        ))}
      </div>
      <div style={dh.heroContent}>
        <div style={dh.heroCrumb}>
          <a
            href="/explore-hub"
            style={dh.heroCrumbLink}
            onClick={(e) => {
              e.preventDefault();
              router.push("/explore-hub");
            }}
          >
            Jelajahi
          </a>
          <span style={dh.heroCrumbSep}>›</span>
          <span style={dh.heroCrumbCurrent}>{dest.name}</span>
        </div>
        <div style={dh.heroBadgeRow}>
          <span style={dh.heroTypeBadge}>{dest.type}</span>
          <span style={dh.heroProvBadge}>{dest.province}</span>
          <span style={dh.heroIslandBadge}>{dest.island}</span>
        </div>
        <h1 style={dh.heroTitle}>{dest.name}</h1>
        <div style={dh.heroQuickStats}>
          <span style={dh.heroQsPill}>
            📍 <strong>{dest.attr}</strong> {cat("attraction", "Atraksi")}
          </span>
          <span style={dh.heroQsPill}>
            🌾 <strong>{dest.desa}</strong> {cat("village", "Desa Wisata")}
          </span>
          <span style={dh.heroQsPill}>
            🗺️ <strong>{dest.itin}</strong> {cat("itinerary", "Itinerary")}
          </span>
          <span style={dh.heroQsPill}>
            👤 <strong>{dest.guide}</strong> {cat("guide", "Pemandu")}
          </span>
        </div>
        <div style={dh.heroTagRow}>
          {(dest.tags || []).map((t) => (
            <span key={t} style={dh.heroTag}>
              {t}
            </span>
          ))}
        </div>
        <div style={dh.heroActions}>
          <div style={dh.heroWeather}>
            <span style={dh.heroWeatherIcon}>{weatherIcon}</span>
            <div>
              <div style={dh.heroWeatherTemp}>{weatherTemp}°C</div>
              <div style={dh.heroWeatherCond}>
                {weatherCond} · {dest.name}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            style={{ ...dh.heroIconBtn, ...(saved ? dh.heroIconBtnOn : {}) }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={saved ? "var(--atr-yellow)" : "none"}
            >
              <path
                d="M6 3h12v18l-6-4-6 4V3z"
                stroke={saved ? "var(--atr-yellow)" : "#fff"}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            <span>{saved ? "Tersimpan" : "Simpan"}</span>
          </button>
          <button
            style={dh.heroIconBtn}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: dest.name,
                  url: window.location.href,
                });
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="12" r="3" stroke="#fff" strokeWidth="1.8" />
              <circle cx="18" cy="6" r="3" stroke="#fff" strokeWidth="1.8" />
              <circle cx="18" cy="18" r="3" stroke="#fff" strokeWidth="1.8" />
              <path
                d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17"
                stroke="#fff"
                strokeWidth="1.8"
              />
            </svg>
            <span>Bagikan</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   STICKY TAB BAR
   ========================================================== */
function DestTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div style={dh.tabBar}>
      <div style={dh.tabInner}>
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{ ...dh.tabBtn, ...(active ? dh.tabBtnActive : {}) }}
            >
              <span>{t.label}</span>
              {t.count != null && (
                <span
                  style={{
                    ...dh.tabCount,
                    ...(active ? dh.tabCountActive : {}),
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================
   SIDEBAR
   ========================================================== */
function DestSidebar({ dest }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <aside style={dh.sidebar}>
      <a href="#" style={dh.sbCtaCard}>
        <div style={dh.sbCtaIcon}>🛒</div>
        <div>
          <div style={dh.sbCtaTitle}>Lihat semua produk di {dest.name}</div>
          <div style={dh.sbCtaSub}>
            {dest.marketProducts || 0} paket aktif di Marketplace
          </div>
        </div>
      </a>
      <a
        href="#"
        style={{
          ...dh.sbCtaCard,
          background: "#FFF9E9",
          borderColor: "#FFE9A8",
        }}
      >
        <div style={{ ...dh.sbCtaIcon, background: "#fff" }}>👤</div>
        <div>
          <div style={dh.sbCtaTitle}>Cari pemandu di {dest.name}</div>
          <div style={dh.sbCtaSub}>{dest.guide} pemandu terverifikasi</div>
        </div>
      </a>

      <div style={dh.sbCard}>
        <div style={dh.sbCardTitle}>Cuaca minggu ini</div>
        <div style={dh.sbWeatherMain}>
          <span style={dh.sbWeatherIcon}>
            {WEATHER_ICONS[Math.floor(Math.random() * WEATHER_ICONS.length)]}
          </span>
          <div>
            <div style={dh.sbWeatherTemp}>
              {Math.floor(Math.random() * 8) + 26}°C
            </div>
            <div style={dh.sbWeatherCond}>
              {WEATHER_COND[Math.floor(Math.random() * WEATHER_COND.length)]}
            </div>
          </div>
        </div>
        <div style={dh.sbForecastRow}>
          {[
            { d: "Sel", t: 30, i: "☀️" },
            { d: "Rab", t: 29, i: "⛅" },
            { d: "Kam", t: 28, i: "🌦️" },
          ].map((f) => (
            <div key={f.d} style={dh.sbForecast}>
              <div style={dh.sbForecastDay}>{f.d}</div>
              <div style={dh.sbForecastIcon}>{f.i}</div>
              <div style={dh.sbForecastTemp}>{f.t}°</div>
            </div>
          ))}
        </div>
      </div>

      <div style={dh.sbCard}>
        <div style={dh.sbCardTitle}>Bagikan destinasi ini</div>
        <div style={dh.sbShareRow}>
          <button
            style={{ ...dh.sbShareBtn, color: "#25D366" }}
            onClick={() =>
              window.open(
                `https://wa.me/?text=${encodeURIComponent(dest.name + " " + window.location.href)}`,
              )
            }
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 19l1.5-4A8 8 0 1 1 9 19l-4 0z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            WhatsApp
          </button>
          <button
            style={{ ...dh.sbShareBtn, color: "var(--atr-text)" }}
            onClick={handleCopyLink}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            {copied ? "Tersalin!" : "Salin link"}
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ==========================================================
   ATRAKSI TAB
   ========================================================== */
function AtraksiTab({ dest }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [facilFilter, setFacilFilter] = useState([]);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");

  const data = ATTR_DATA.filter(
    (a) => a.region && a.region.toLowerCase().includes(dest.name.toLowerCase()),
  );

  const allCats = [...new Set(ATTR_DATA.map((a) => a.cat))];

  const filtered = data
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.desc || "").toLowerCase().includes(search.toLowerCase()),
    )
    .filter((a) => catFilter.length === 0 || catFilter.includes(a.cat))
    .filter(
      (a) =>
        !priceFilter ||
        (priceFilter === "free"
          ? a.price === 0
          : priceFilter === "<25"
            ? a.price > 0 && a.price < 25000
            : priceFilter === "25-100"
              ? a.price >= 25000 && a.price <= 100000
              : a.price > 100000),
    )
    .filter((a) => !ratingFilter || a.rating >= parseFloat(ratingFilter))
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "price"
          ? a.price - b.price
          : b.reviews - a.reviews,
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={dh.filterSearchInput}
              placeholder={`Cari atraksi di ${dest.name}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={dh.filterSort}
          >
            <option value="popular">Urutkan: Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
            <option value="price">Harga terendah</option>
          </select>
          <div style={dh.viewToggle}>
            <button
              onClick={() => setView("grid")}
              style={{
                ...dh.viewBtn,
                ...(view === "grid" ? dh.viewBtnOn : {}),
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect
                  x="4"
                  y="4"
                  width="7"
                  height="7"
                  rx="1.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <rect
                  x="13"
                  y="4"
                  width="7"
                  height="7"
                  rx="1.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <rect
                  x="4"
                  y="13"
                  width="7"
                  height="7"
                  rx="1.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <rect
                  x="13"
                  y="13"
                  width="7"
                  height="7"
                  rx="1.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <button
              onClick={() => setView("list")}
              style={{
                ...dh.viewBtn,
                ...(view === "list" ? dh.viewBtnOn : {}),
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <FGroup label="Kategori">
          {allCats.map((c) => (
            <FChip
              key={c}
              active={catFilter.includes(c)}
              onClick={() => toggleArr(catFilter, setCatFilter, c)}
            >
              {c}
            </FChip>
          ))}
        </FGroup>
        <FGroup label="Harga tiket">
          {[
            { k: "free", l: "Gratis" },
            { k: "<25", l: "< Rp25.000" },
            { k: "25-100", l: "Rp25-100rb" },
            { k: ">100", l: "> Rp100.000" },
          ].map((p) => (
            <FChip
              key={p.k}
              active={priceFilter === p.k}
              onClick={() => setPriceFilter(priceFilter === p.k ? "" : p.k)}
            >
              {p.l}
            </FChip>
          ))}
        </FGroup>
        <FGroup label="Rating">
          {[
            { k: "4", l: "★ 4.0+" },
            { k: "3", l: "★ 3.0+" },
          ].map((r) => (
            <FChip
              key={r.k}
              active={ratingFilter === r.k}
              onClick={() => setRatingFilter(ratingFilter === r.k ? "" : r.k)}
            >
              {r.l}
            </FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}>
          <strong>{filtered.length}</strong> atraksi ditemukan
        </span>
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--atr-text-muted)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 15 }}>
            Belum ada data atraksi untuk {dest.name}.
          </p>
        </div>
      )}

      {view === "grid" ? (
        <div style={dh.atrGrid}>
          {filtered.map((a, i) => (
            <AtrCardGrid key={i} a={a} />
          ))}
        </div>
      ) : (
        <div style={dh.atrList}>
          {filtered.map((a, i) => (
            <AtrCardList key={i} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function AtrCardGrid({ a }) {
  const [save, setSave] = useState(false);
  const router = useRouter();
  const slug = slugify(a.name);
  return (
    <article
      onClick={() => router.push(`/attractions/${slug}`)}
      style={{ ...dh.atrCard, textDecoration: "none", color: "inherit" }}
    >
      <div style={dh.atrImgWrap}>
        <img src={a.img} alt="" style={dh.atrImg} />
        <span
          style={{
            ...dh.atrCat,
            background: a.catBg || "var(--atr-bg-soft)",
            color: a.catFg || "var(--atr-text)",
          }}
        >
          {a.cat}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
          style={dh.atrSave}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "var(--atr-purple)" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke={save ? "var(--atr-purple)" : "var(--atr-text)"}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div style={dh.atrBody}>
        <h3 style={dh.atrName}>{a.name}</h3>
        <div style={dh.atrMeta}>
          <span style={dh.atrRating}>
            ★ <strong>{a.rating}</strong>{" "}
            <span style={dh.atrReviews}>({a.reviews})</span>
          </span>
          <span style={dh.atrLoc}>{a.region}</span>
        </div>
        <div style={dh.atrFooter}>
          <span style={dh.atrPrice}>
            {a.price === 0 ? "Gratis" : `Mulai ${formatPrice(a.price)}`}
          </span>
          <button
            style={dh.atrCta}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/attractions/${slug}`);
            }}
          >
            Lihat detail →
          </button>
        </div>
      </div>
    </article>
  );
}

function AtrCardList({ a }) {
  const [save, setSave] = useState(false);
  const router = useRouter();
  const slug = slugify(a.name);
  return (
    <article
      onClick={() => router.push(`/attractions/${slug}`)}
      style={{
        ...dh.atrListCard,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={dh.atrListImgWrap}>
        <img src={a.img} alt="" style={dh.atrListImg} />
        <span
          style={{
            ...dh.atrCat,
            background: a.catBg || "var(--atr-bg-soft)",
            color: a.catFg || "var(--atr-text)",
          }}
        >
          {a.cat}
        </span>
      </div>
      <div style={dh.atrListBody}>
        <div style={{ flex: 1 }}>
          <h3 style={dh.atrName}>{a.name}</h3>
          <div style={dh.atrMeta}>
            <span style={dh.atrRating}>
              ★ <strong>{a.rating}</strong>{" "}
              <span style={dh.atrReviews}>({a.reviews} ulasan)</span>
            </span>
            <span style={dh.atrLoc}>{a.region}</span>
          </div>
        </div>
        <div style={dh.atrListRight}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSave(!save);
            }}
            style={dh.atrSaveList}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={save ? "var(--atr-purple)" : "none"}
            >
              <path
                d="M6 3h12v18l-6-4-6 4V3z"
                stroke={save ? "var(--atr-purple)" : "var(--atr-text)"}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div style={dh.atrPriceList}>
            {a.price === 0 ? "Gratis" : formatPrice(a.price)}
          </div>
          <button
            style={dh.atrCtaList}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/attractions/${slug}`);
            }}
          >
            Lihat detail
          </button>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================
   DESA WISATA TAB
   ========================================================== */
const DESA_STATUS_COLOR = {
  Rintisan: { bg: "#F0F0F0", fg: "#5C5C5C" },
  Berkembang: { bg: "#FFF4D9", fg: "#B47A00" },
  Maju: { bg: "#D4ECF4", fg: "#1F6FB0" },
  Mandiri: { bg: "#D9F2DA", fg: "#2D8838" },
};

function DesaTab({ dest }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [sort, setSort] = useState("popular");

  const data = VIL_DATA.filter(
    (d) =>
      d.region &&
      d.region
        .toLowerCase()
        .includes(dest.province.toLowerCase().replace("di ", "")),
  );

  const allThemes = [...new Set(VIL_DATA.map((d) => d.theme))];

  const filtered = data
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (d) =>
        catFilter.length === 0 || catFilter.some((c) => d.theme.includes(c)),
    )
    .filter((d) => statusFilter.length === 0 || statusFilter.includes(d.adwi))
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "alpha"
          ? a.name.localeCompare(b.name)
          : b.rating - a.rating,
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={dh.filterSearchInput}
              placeholder="Cari desa wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={dh.filterSort}
          >
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
            <option value="alpha">Nama A-Z</option>
          </select>
        </div>
        <FGroup label="Tema">
          {allThemes.map((c) => (
            <FChip
              key={c}
              active={catFilter.includes(c)}
              onClick={() => toggleArr(catFilter, setCatFilter, c)}
            >
              {c}
            </FChip>
          ))}
        </FGroup>
        <FGroup label="Status ADWI">
          {["Rintisan", "Berkembang", "Maju", "Mandiri"].map((s) => (
            <FChip
              key={s}
              active={statusFilter.includes(s)}
              onClick={() => toggleArr(statusFilter, setStatusFilter, s)}
            >
              <span
                style={{
                  ...dh.statusDot,
                  background: DESA_STATUS_COLOR[s]?.fg || "#999",
                }}
              />{" "}
              {s}
            </FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}>
          <strong>{filtered.length}</strong> desa wisata ditemukan
        </span>
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--atr-text-muted)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌾</div>
          <p style={{ fontSize: 15 }}>
            Belum ada data desa wisata untuk {dest.name}.
          </p>
        </div>
      )}

      <div style={dh.desaGrid}>
        {filtered.map((d, i) => {
          const sColor = DESA_STATUS_COLOR[d.adwi] || {
            bg: "#F0F0F0",
            fg: "#5C5C5C",
          };
          return (
            <article
              key={i}
              style={{
                ...dh.desaCard,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={dh.atrImgWrap}>
                <img src={d.img} alt="" style={dh.atrImg} />
                <span
                  style={{
                    ...dh.desaStatus,
                    background: sColor.bg,
                    color: sColor.fg,
                  }}
                >
                  <span
                    style={{
                      ...dh.statusDot,
                      background: sColor.fg,
                    }}
                  />{" "}
                  {d.adwi}
                </span>
              </div>
              <div style={dh.atrBody}>
                <h3 style={dh.atrName}>{d.name}</h3>
                <div style={dh.atrLoc}>{d.region}</div>
                <div style={dh.desaTagRow}>
                  {d.activities &&
                    d.activities.slice(0, 3).map((act) => (
                      <span key={act} style={dh.desaTag}>
                        {act}
                      </span>
                    ))}
                </div>
                <div style={dh.desaHighlight}>
                  🌿 <strong>{d.activities?.length || 0}</strong> aktivitas
                  {d.price > 0 &&
                    ` · 🏡 Homestay mulai ${formatPrice(d.price)}`}
                </div>
                <div style={dh.atrFooter}>
                  <span style={dh.atrRating}>
                    ★ <strong>{d.rating}</strong>
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================
   ITINERARY TAB
   ========================================================== */
function ItineraryTab({ dest }) {
  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState([]);
  const [sort, setSort] = useState("popular");

  const data = ITIN_DATA.filter(
    (i) => i.city && i.city.toLowerCase().includes(dest.name.toLowerCase()),
  );

  const allThemes = [...new Set(ITIN_DATA.map((i) => i.tag))];

  const filtered = data
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => themeFilter.length === 0 || themeFilter.includes(i.tag))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={dh.filterSearchInput}
              placeholder="Cari itinerary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={dh.filterSort}
          >
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
          </select>
        </div>
        <FGroup label="Tema">
          {allThemes.map((t) => (
            <FChip
              key={t}
              active={themeFilter.includes(t)}
              onClick={() => toggleArr(themeFilter, setThemeFilter, t)}
            >
              {t}
            </FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}>
          <strong>{filtered.length}</strong> itinerary ditemukan
        </span>
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--atr-text-muted)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <p style={{ fontSize: 15 }}>
            Belum ada data itinerary untuk {dest.name}.
          </p>
        </div>
      )}

      <div style={dh.itinDestGrid}>
        {filtered.map((it, i) => (
          <article key={i} style={dh.itinCard}>
            <div style={dh.atrImgWrap}>
              <img src={it.img} alt="" style={dh.atrImg} />
              <span style={dh.itinDaysBadge}>{it.days}</span>
              <span
                style={{
                  ...dh.itinThemeBadge,
                  background: "var(--atr-purple-50)",
                  color: "var(--atr-purple)",
                }}
              >
                {it.tag}
              </span>
            </div>
            <div style={dh.atrBody}>
              <h3 style={dh.atrName}>{it.title}</h3>
              <div style={dh.itinInfoRow}>
                <span>📍 {it.city}</span>
                <span style={dh.itinDot}>·</span>
                <span>⭐ {it.rating}</span>
              </div>
              <div style={dh.itinBudget}>
                <span style={dh.itinBudgetLabel}>Estimasi</span>
                <span style={dh.itinBudgetVal}>
                  {it.price}
                  <span style={dh.itinBudgetUnit}>/orang</span>
                </span>
              </div>
              <div style={dh.itinFooter}>
                <div style={dh.itinCreator}>
                  <div>
                    <div style={dh.itinCreatorName}>{it.author}</div>
                    <div style={dh.itinCreatorRole}>{it.role}</div>
                  </div>
                </div>
                <div style={dh.itinRatingBlock}>
                  <span style={dh.atrRating}>
                    ★ <strong>{it.rating}</strong>
                  </span>
                  <span style={dh.itinSaves}>👁️ {it.views || it.reviews}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================
   PEMANDU TAB
   ========================================================== */
function PemanduTab({ dest }) {
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [sort, setSort] = useState("rating");

  const data = GUIDE_DATA.filter(
    (g) => g.region && g.region.toLowerCase().includes(dest.name.toLowerCase()),
  );

  const allSpecs = [...new Set(GUIDE_DATA.flatMap((g) => g.spec))];

  const filtered = data
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (p) =>
        specFilter.length === 0 || specFilter.some((s) => p.spec.includes(s)),
    )
    .filter((p) => !ratingFilter || p.rating >= parseFloat(ratingFilter))
    .sort((a, b) =>
      sort === "exp"
        ? b.trips - a.trips
        : sort === "price"
          ? a.price - b.price
          : b.rating - a.rating,
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={dh.filterSearchInput}
              placeholder="Cari pemandu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={dh.filterSort}
          >
            <option value="rating">Rating tertinggi</option>
            <option value="exp">Pengalaman terlama</option>
            <option value="price">Harga terendah</option>
          </select>
        </div>
        <FGroup label="Spesialisasi">
          {allSpecs.map((s) => (
            <FChip
              key={s}
              active={specFilter.includes(s)}
              onClick={() => toggleArr(specFilter, setSpecFilter, s)}
            >
              {s}
            </FChip>
          ))}
        </FGroup>
        <FGroup label="Rating">
          {[
            { k: "4.5", l: "★ 4.5+" },
            { k: "4", l: "★ 4.0+" },
          ].map((r) => (
            <FChip
              key={r.k}
              active={ratingFilter === r.k}
              onClick={() => setRatingFilter(ratingFilter === r.k ? "" : r.k)}
            >
              {r.l}
            </FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}>
          <strong>{filtered.length}</strong> pemandu ditemukan
        </span>
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--atr-text-muted)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
          <p style={{ fontSize: 15 }}>
            Belum ada data pemandu untuk {dest.name}.
          </p>
        </div>
      )}

      <div style={dh.guideGrid}>
        {filtered.map((p, i) => (
          <article
            key={i}
            style={{
              ...dh.guideCard,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={dh.guideImgWrap}>
              <img src={p.img} alt="" style={dh.guideImg} />
              {p.verified && (
                <span style={dh.guideVerified}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  Verified
                </span>
              )}
            </div>
            <div style={dh.guideBody}>
              <h3 style={dh.guideName}>{p.name}</h3>
              <div style={dh.guideSpecRow}>
                {p.spec.map((s) => (
                  <span key={s} style={dh.guideSpec}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={dh.guideLangRow}>
                {p.langs.map((l, j) => (
                  <span key={j} style={dh.guideLang}>
                    {l}
                  </span>
                ))}
              </div>
              <div style={dh.guideMeta}>
                <span>
                  ★ <strong>{p.rating}</strong>
                </span>
                <span style={dh.itinDot}>·</span>
                <span>{p.trips} trip</span>
              </div>
              <div style={dh.guidePriceRow}>
                <div>
                  <div style={dh.itinBudgetLabel}>Mulai</div>
                  <div style={dh.guidePrice}>
                    {formatPrice(p.price)}
                    <span style={dh.itinBudgetUnit}>/hari</span>
                  </div>
                </div>
                <div style={dh.guideCerts}>
                  {p.certs.slice(0, 2).map((c) => (
                    <span key={c} style={dh.guideCert}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div style={dh.guideCtas}>
                <button style={dh.guideCtaSec}>Lihat profil</button>
                <button style={dh.guideCtaPri}>Hubungi →</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================
   CERITA TAB
   ========================================================== */
const CERITA_WEB = [
  {
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=70",
    title: "Petualangan tak terlupakan",
    author: "Dimas Prasetyo",
    days: 3,
    date: "Mei 2026",
    likes: 48,
    excerpt:
      "Tiga hari keliling, highlight-nya jelas pemandangan yang luar biasa!",
  },
  {
    img: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=600&auto=format&fit=crop&q=70",
    title: "Sunrise yang tak terlupakan",
    author: "Nadia Ananta",
    days: 4,
    date: "Apr 2026",
    likes: 31,
    excerpt: "Trek pagi ke puncak worth it banget. Pemandangan luar biasa!",
  },
  {
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop&q=70",
    title: "Pengalaman pertama yang amazing",
    author: "Rizky Hidayat",
    days: 2,
    date: "Mar 2026",
    likes: 27,
    excerpt: "Pengalaman pertama yang bikin pengen balik lagi.",
  },
];

function CeritaTab() {
  return (
    <div style={{ padding: "4px 0 8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 16,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 22,
              letterSpacing: "-0.02em",
              margin: "0 0 4px",
            }}
          >
            Cerita Wisatawan
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--atr-text-muted)",
              margin: 0,
            }}
          >
            Journal publik dari wisatawan yang pernah menjelajahi destinasi ini.
          </p>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 16,
        }}
        className="cerita-grid"
      >
        {CERITA_WEB.map((c, i) => (
          <div
            key={i}
            style={{
              border: "1px solid var(--atr-outline)",
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
              cursor: "pointer",
              transition: "transform .15s, box-shadow .15s",
            }}
          >
            <div
              style={{
                height: 160,
                background: `url(${c.img}) center/cover`,
              }}
            />
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{c.title}</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--atr-text-muted)",
                  marginTop: 6,
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {c.excerpt}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 12,
                  fontSize: 12.5,
                  color: "var(--atr-text-muted)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 999,
                      background: "var(--atr-purple-50)",
                      color: "var(--atr-purple)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {c.author[0]}
                  </span>
                  {c.author}
                </span>
                <span>
                  · {c.days} hari · {c.date}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "var(--atr-red)",
                  }}
                >
                  ❤ {c.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          background: "rgba(81,176,84,0.08)",
          border: "1px solid rgba(81,176,84,0.3)",
          borderRadius: 12,
          padding: "13px 16px",
          fontSize: 13,
          color: "#2A6B3B",
          lineHeight: 1.5,
          marginTop: 18,
        }}
      >
        <span>🏆</span>
        <span>
          Bagikan ceritamu! Journal publik pertama dapat <b>50 ATR Points</b>,
          dan bonus 25 poin saat dilihat 10+ orang.
        </span>
      </div>
      <style>{`@media(max-width:760px){ .cerita-grid{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}

/* ==========================================================
   INFO TAB
   ========================================================== */
function InfoTab({ dest }) {
  const [faqOpen, setFaqOpen] = useState(null);

  const facts = [
    { label: "Luas wilayah", value: dest.area || "-" },
    { label: "Populasi", value: dest.population || "-" },
    {
      label: "Waktu terbaik",
      value: dest.bestTime || "Apr – Nov",
    },
    { label: "Bahasa daerah", value: dest.language || "-" },
  ];

  const faqs = [
    {
      q: `Apa waktu terbaik berkunjung ke ${dest.name}?`,
      a: `Waktu terbaik adalah April hingga November saat musim kemarau. Cuaca cerah dan laut tenang, cocok untuk aktivitas outdoor.`,
    },
    {
      q: `Bagaimana cara menuju ${dest.name}?`,
      a: `Anda bisa menggunakan pesawat terbang menuju bandara terdekat, atau menggunakan kapal feri dari kota-kota besar.`,
    },
    {
      q: `Apa saja yang perlu dibawa?`,
      a: `Bawalah pakaian ringan, sunscreen, topi, obat anti mabuk (jika naik kapal), dan kamera untuk mengabadikan momen.`,
    },
  ];

  return (
    <div style={dh.tabContent}>
      <div style={dh.infoGrid}>
        {/* Tentang */}
        <section style={dh.infoCard}>
          <h2 style={dh.infoTitle}>
            <span>🌏</span> Tentang {dest.name}
          </h2>
          <p style={dh.infoBody}>
            {dest.name} adalah {dest.type?.toLowerCase() || "destinasi"} di
            Provinsi {dest.province}, Indonesia. Destinasi ini menawarkan
            berbagai atraksi wisata menarik dengan rating ★ {dest.rating} dari
            pengunjung.
          </p>
          <p style={dh.infoBody}>
            Dengan {dest.attr} atraksi, {dest.desa} desa wisata, {dest.itin}{" "}
            itinerary, dan {dest.guide} pemandu wisata profesional, {dest.name}{" "}
            menjadi salah satu destinasi favorit di Indonesia.
          </p>
          <div style={dh.factsGrid}>
            {facts.map((f, i) => (
              <div key={i} style={dh.factCell}>
                <div style={dh.factLabel}>{f.label}</div>
                <div style={dh.factVal}>{f.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section style={dh.infoCard}>
          <h2 style={dh.infoTitle}>
            <span>💡</span> Tips wisatawan
          </h2>
          <div style={dh.dosDontsGrid}>
            <div style={dh.dosCol}>
              <div style={dh.dosTitle}>✅ Yang sebaiknya dilakukan</div>
              <ul style={dh.dosList}>
                <li>Booking akomodasi 1-2 minggu sebelumnya</li>
                <li>Gunakan sunscreen untuk perlindungan kulit</li>
                <li>Bawa perlengkapan pribadi yang diperlukan</li>
                <li>Hormati adat dan budaya setempat</li>
              </ul>
            </div>
            <div style={dh.dontsCol}>
              <div style={dh.dontsTitle}>❌ Hindari ini</div>
              <ul style={dh.dontsList}>
                <li>Jangan merusak fasilitas wisata</li>
                <li>Jangan membuang sampah sembarangan</li>
                <li>Hindari bepergian saat cuaca ekstrem</li>
                <li>Jangan mengambil benda-benda alam sebagai souvenir</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={dh.infoCard}>
          <h2 style={dh.infoTitle}>
            <span>❓</span> FAQ
          </h2>
          {faqs.map((item, i) => (
            <div key={i} style={dh.faqItem}>
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                style={dh.faqQ}
              >
                <span>{item.q}</span>
                <span
                  style={{
                    transform: faqOpen === i ? "rotate(180deg)" : "none",
                    transition: "transform .2s",
                    display: "inline-flex",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              {faqOpen === i && <div style={dh.faqA}>{item.a}</div>}
            </div>
          ))}
        </section>

        {/* Kontak */}
        <section style={dh.infoCard}>
          <h2 style={dh.infoTitle}>
            <span>📞</span> Kontak berguna
          </h2>
          <div style={dh.contactTable}>
            {[
              {
                name: "Info Wisata",
                phone: "(021) 1234 5678",
                map: "Pusat Informasi Wisata",
              },
              {
                name: "Polisi",
                phone: "110",
                map: "Kantor Polisi Terdekat",
              },
              {
                name: "Ambulans",
                phone: "118 / 119",
                map: "RS Terdekat",
              },
            ].map((c, i) => (
              <div key={i} style={dh.contactRow}>
                <div style={dh.contactName}>{c.name}</div>
                <div style={dh.contactPhone}>📞 {c.phone}</div>
                <div style={dh.contactMap}>📍 {c.map}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ==========================================================
   MAIN PAGE
   ========================================================== */
export default function DestinationDetailPage({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [activeTab, setActiveTab] = useState("atraksi");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["atraksi", "desa", "itinerary", "pemandu", "cerita", "info"].includes(
        tab,
      )
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSetActiveTab = useCallback((tabId) => {
    setActiveTab(tabId);
    const url = new URL(window.location);
    url.searchParams.set("tab", tabId);
    window.history.replaceState({}, "", url);
  }, []);

  if (!params) return null;

  const { slug } = params;

  const dest = DESTINATIONS.find((d) => slugify(d.name) === slug);

  if (!dest) {
    if (typeof window !== "undefined") {
      router.replace("/destinations");
    }
    return null;
  }

  const covers = [dest.img, ...FALLBACK_COVERS.slice(0, 3)];
  const tabs = getTabs(dest);

  return (
    <div>
      <TopNav active="Jelajahi" />
      <DestHero dest={dest} covers={covers} />
      <DestTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
      />
      <div style={dh.pageBody}>
        <main>
          {activeTab === "atraksi" && <AtraksiTab dest={dest} />}
          {activeTab === "desa" && <DesaTab dest={dest} />}
          {activeTab === "itinerary" && <ItineraryTab dest={dest} />}
          {activeTab === "pemandu" && <PemanduTab dest={dest} />}
          {activeTab === "cerita" && <CeritaTab />}
          {activeTab === "info" && <InfoTab dest={dest} />}
        </main>
        <DestSidebar dest={dest} />
      </div>
      <SiteFooter />
    </div>
  );
}
