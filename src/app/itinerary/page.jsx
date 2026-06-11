"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import TopNav from "@/components/TopNav";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { useItineraries } from "@/lib/hooks/use-itineraries";
import { dirStyles, cardStyles } from "@/styles/attraction-styles";

/* ── SVG Icons ── */
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
function ClockSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
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
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function HeartIcon({ filled, color = "var(--atr-text)" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "var(--atr-red)" : "none"}
    >
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke={filled ? "var(--atr-red)" : color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
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
function GridIcon() {
  return (
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
  );
}
function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
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
function CategoryTabs({ active = "Itinerary" }) {
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

/* ── ItineraryHero ── */
function ItineraryHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Itinerary"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Rencana perjalanan,{" "}
            <span style={{ color: "var(--atr-purple)" }}>siap pakai.</span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Ribuan itinerary kurasi dari traveler & tour guide lokal di seluruh
            Indonesia. Salin, ubah, bagikan, atau bikin sendiri dari nol.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <button style={dirStyles.heroPrimary}>
              <PlusIcon color="#fff" /> Buat itinerary baru
            </button>
            <button style={dirStyles.heroSecondary}>Lihat tutorial</button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="2.4K+" label="Itinerary publik" />
            <Stat n="180+" label="Kota & destinasi" />
            <Stat n="850+" label="Kreator lokal" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={dirStyles.heroIllustrationCard}>
            <div style={dirStyles.dayPill}>Hari 2 / 5</div>
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={dirStyles.heroImg1}
            />
            <div style={dirStyles.heroFloatCard}>
              <div style={dirStyles.heroFloatTime}>09:30</div>
              <div>
                <div style={dirStyles.heroFloatTitle}>Pura Tirta Empul</div>
                <div style={dirStyles.heroFloatMeta}>
                  2 jam {"\u00B7"} Tampaksiring
                </div>
              </div>
              <div style={dirStyles.heroFloatTag}>Culture</div>
            </div>
            <div style={dirStyles.heroFloatCard2}>
              <div style={dirStyles.heroFloatTime}>13:00</div>
              <div>
                <div style={dirStyles.heroFloatTitle}>
                  Warung Babi Guling Pak Malen
                </div>
                <div style={dirStyles.heroFloatMeta}>
                  1 jam {"\u00B7"} Sunset Road
                </div>
              </div>
              <div
                style={{
                  ...dirStyles.heroFloatTag,
                  background: "#FFF4D9",
                  color: "#B47A00",
                }}
              >
                Food
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── useDirectoryState hook (local UI state for FilterBar) ── */
function useDirectoryState(
  defaultChips = ["Bali", "Yogyakarta", "2D1N", "< Rp1jt"],
) {
  const [view, setView] = useState("grid");
  const [activeChips, setActiveChips] = useState(defaultChips);
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState("Paling populer");
  return {
    view,
    setView,
    activeChips,
    setActiveChips,
    openFilter,
    setOpenFilter,
    openSort,
    setOpenSort,
    sort,
    setSort,
  };
}

/* ── FilterBar ── */
const FILTER_OPTIONS = {
  "Destinasi tujuan": [
    "Bali",
    "Yogyakarta",
    "Lombok",
    "Labuan Bajo",
    "Raja Ampat",
    "Bandung",
    "Bromo",
    "Danau Toba",
    "Garut",
    "Surabaya",
  ],
  Durasi: ["1 Hari", "2D1N", "3D2N", "4D3N", "5D4N", "6D+"],
  Budget: [
    "< Rp500rb",
    "< Rp1jt",
    "Rp1jt \u2013 Rp3jt",
    "Rp3jt \u2013 Rp6jt",
    "Rp6jt+",
  ],
  "Tipe perjalanan": [
    "Solo",
    "Couple",
    "Family",
    "Honeymoon",
    "Group",
    "Business",
  ],
  "Kategori wisata": [
    "Culture",
    "Adventure",
    "Food",
    "Nature",
    "Beach",
    "City Break",
    "Religi",
    "Sejarah",
  ],
};
const SORT_OPTIONS = [
  "Paling populer",
  "Terbaru",
  "Rating tertinggi",
  "Harga terendah",
  "Harga tertinggi",
  "Durasi terpendek",
];
const DEFAULT_FILTERS = [
  { label: "Destinasi tujuan", icon: "pin" },
  { label: "Durasi", icon: "clock" },
  { label: "Budget", icon: "wallet" },
  { label: "Tipe perjalanan", icon: "users" },
  { label: "Kategori wisata", icon: "tag" },
];

/* Maps FilterBar category labels to the hook filter keys */
const FILTER_KEY_MAP = {
  "Destinasi tujuan": "destination",
  Durasi: "durasi",
  Budget: "budget",
  "Tipe perjalanan": "tipe_perjalanan",
  "Kategori wisata": "kategori",
};

function FilterBar({
  state,
  filters = DEFAULT_FILTERS,
  filterOptions = FILTER_OPTIONS,
  resultLabel = "itinerary",
  totalResults = 2412,
  onFilterChange,
}) {
  const wrapRef = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        state.setOpenFilter(null);
        state.setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function toggleFilter(label) {
    state.setOpenFilter(state.openFilter === label ? null : label);
    state.setOpenSort(false);
  }
  function pickFilter(label, value) {
    if (!state.activeChips.includes(value)) {
      state.setActiveChips([...state.activeChips, value]);
      const key = FILTER_KEY_MAP[label];
      if (key && onFilterChange) {
        onFilterChange(key, value);
      }
    }
    state.setOpenFilter(null);
  }
  function removeChip(c) {
    state.setActiveChips(state.activeChips.filter((x) => x !== c));
    for (const [label, opts] of Object.entries(FILTER_OPTIONS)) {
      if (opts.includes(c)) {
        const key = FILTER_KEY_MAP[label];
        if (key && onFilterChange) {
          onFilterChange(key, "");
        }
        break;
      }
    }
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = state.openFilter === f.label;
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
                      const checked = state.activeChips.includes(opt);
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
          <div style={dirStyles.viewToggle}>
            <button
              onClick={() => state.setView("grid")}
              style={{
                ...dirStyles.viewBtn,
                ...(state.view === "grid" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <GridIcon /> Grid
            </button>
            <button
              onClick={() => state.setView("map")}
              style={{
                ...dirStyles.viewBtn,
                ...(state.view === "map" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <MapIcon /> Peta
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                state.setOpenSort(!state.openSort);
                state.setOpenFilter(null);
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
              {state.sort}
              <ChevDown rotated={state.openSort} />
            </button>
            {state.openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      state.setSort(s);
                      state.setOpenSort(false);
                    }}
                    style={{
                      ...dirStyles.dropdownItem,
                      ...(s === state.sort
                        ? {
                            color: "var(--atr-purple)",
                            fontWeight: 600,
                          }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === state.sort
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
          <strong>
            {(
              totalResults -
              state.activeChips.length *
                Math.max(20, Math.floor(totalResults / 50))
            ).toLocaleString("id-ID")}
          </strong>{" "}
          {resultLabel} cocok untukmu
        </span>
        <div style={dirStyles.activeChips}>
          {state.activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {state.activeChips.length > 0 && (
            <button
              onClick={() => state.setActiveChips([])}
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

/* ── FeaturedRail ── */
function FeatureBig() {
  return (
    <article style={cardStyles.featBig}>
      <img
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
        alt=""
        style={cardStyles.featBigImg}
      />
      <div style={cardStyles.featBigOverlay} />
      <div style={cardStyles.featBigBadge}>
        <span style={cardStyles.editorBadge}>EDITOR'S PICK</span>
      </div>
      <div style={cardStyles.saveTopRight}>
        <HeartIcon />
      </div>
      <div style={cardStyles.featBigBody}>
        <div style={cardStyles.featBigMeta}>
          <span style={cardStyles.featBigChip}>7 Hari {"\u00B7"} 6 Malam</span>
          <span style={cardStyles.featBigChip}>Bali</span>
          <span style={cardStyles.featBigChip}>Family</span>
        </div>
        <h3 style={cardStyles.featBigTitle}>
          Bali Slow Travel, Ubud, Sidemen & Amed tanpa terburu-buru
        </h3>
        <p style={cardStyles.featBigDesc}>
          Trekking sawah Tegallalang, kelas memasak Bali, snorkeling USS
          Liberty. 18 aktivitas, semua transportasi & rekomendasi warung lokal.
        </p>
        <div style={cardStyles.featBigFooter}>
          <div style={cardStyles.authorRow}>
            <img
              src="https://i.pravatar.cc/80?img=12"
              style={cardStyles.authorImg}
              alt=""
            />
            <div>
              <div style={cardStyles.authorName}>Putu Adi Wirawan</div>
              <div style={cardStyles.authorRole}>
                Tour Guide bersertifikat {"\u00B7"} Bali
              </div>
            </div>
          </div>
          <div style={cardStyles.featBigBudget}>
            <div style={cardStyles.budgetLabel}>Estimasi budget</div>
            <div style={cardStyles.budgetVal}>
              Rp 4.2jt
              <span style={cardStyles.budgetUnit}>/orang</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeatureSmall({ img, tag, days, title, author, budget }) {
  return (
    <article style={cardStyles.featSmall}>
      <div style={cardStyles.featSmallImgWrap}>
        <img src={img} alt="" style={cardStyles.featSmallImg} />
        <span style={cardStyles.featSmallTag}>{tag}</span>
      </div>
      <div style={cardStyles.featSmallBody}>
        <div style={cardStyles.featSmallDays}>{days}</div>
        <h4 style={cardStyles.featSmallTitle}>{title}</h4>
        <div style={cardStyles.featSmallFooter}>
          <span style={cardStyles.featSmallAuthor}>{author}</span>
          <span style={cardStyles.featSmallBudget}>{budget}</span>
        </div>
      </div>
    </article>
  );
}

function FeaturedRail() {
  return (
    <section style={cardStyles.rail}>
      <div style={cardStyles.railHeader}>
        <div>
          <div style={cardStyles.eyebrow}>{"\u2728"} Pilihan kurator</div>
          <h2 style={cardStyles.railTitle}>Rute terbaik minggu ini</h2>
        </div>
        <a href="#" style={cardStyles.railLink}>
          Lihat semua kurasi <ArrowRight />
        </a>
      </div>
      <div style={cardStyles.railGrid}>
        <FeatureBig />
        <div style={cardStyles.railSide}>
          <FeatureSmall
            img="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=70"
            tag="Honeymoon"
            days={"5 Hari \u00B7 4 Malam"}
            title="Raja Ampat untuk Berdua"
            author="Andini Mahardika"
            budget="Rp 8.4jt"
          />
          <FeatureSmall
            img="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=70"
            tag="Adventure"
            days={"3 Hari \u00B7 2 Malam"}
            title="Sunrise Bromo & Madakaripura"
            author="Catur Hidayat"
            budget="Rp 1.6jt"
          />
        </div>
      </div>
    </section>
  );
}

/* ── ItineraryGrid + ItinCard ── */
function ItineraryGrid({
  data = [],
  isLoading,
  isError,
  loadMore,
  hasMore,
  totalCount,
}) {
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDCD2"} Direktori itinerary
          </div>
          <h2 style={cardStyles.railTitle}>Semua rute publik</h2>
        </div>
      </div>

      {isError && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--atr-text-muted)",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 12 }}>
            Gagal memuat itinerary. Silakan coba lagi.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "var(--atr-purple)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Muat ulang
          </button>
        </div>
      )}

      {isLoading && (
        <div style={cardStyles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...cardStyles.card,
                background: "#f5f5f5",
                borderRadius: 12,
                minHeight: 340,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--atr-text-muted)",
          }}
        >
          <p style={{ fontSize: 18 }}>
            Belum ada itinerary yang cocok dengan filter kamu.
          </p>
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <>
          <div style={cardStyles.grid}>
            {data.map((it, i) => (
              <ItinCard key={it.id || i} {...it} />
            ))}
          </div>
          <div style={cardStyles.paginationRow}>
            {hasMore && (
              <button style={cardStyles.loadMore} onClick={loadMore}>
                Muat 24 itinerary lagi
              </button>
            )}
            <div style={cardStyles.pageInfo}>
              Menampilkan {data.length.toLocaleString("id-ID")}
              {totalCount ? ` dari ${totalCount.toLocaleString("id-ID")}` : ""}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function ItinCard({
  img,
  days,
  city,
  tag,
  title,
  author,
  role,
  price,
  rating,
  reviews,
  views,
  save: initialSave,
  day1,
}) {
  const [save, setSave] = useState(initialSave);
  const [hover, setHover] = useState(false);
  return (
    <article
      style={{
        ...cardStyles.card,
        ...(hover
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 24px rgba(31,27,51,0.08)",
            }
          : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => alert("Buka detail: " + title)}
    >
      <div style={cardStyles.cardImgWrap}>
        <img src={img} alt="" style={cardStyles.cardImg} />
        <span style={cardStyles.cardTag}>{tag}</span>
        <button
          style={{
            ...cardStyles.cardSave,
            ...(save ? cardStyles.cardSaveOn : {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
        >
          <HeartIcon filled={save} color={save ? "#fff" : "var(--atr-text)"} />
        </button>
        <div style={cardStyles.cardImgBottom}>
          <span style={cardStyles.cardDaysPill}>
            <ClockSm /> {days}
          </span>
          <span style={cardStyles.cardCityPill}>
            <PinSm /> {city}
          </span>
        </div>
      </div>
      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardTitle}>{title}</h3>
        <div style={cardStyles.cardDayPreview}>
          <span style={cardStyles.dayLabel}>Hari 1:</span>
          {day1?.map((d, i) => (
            <React.Fragment key={d}>
              <span style={cardStyles.dayPoint}>{d}</span>
              {i < day1.length - 1 && (
                <span style={cardStyles.dayDot}>{" \u00B7"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={cardStyles.cardFooter}>
          <div style={cardStyles.cardAuthor}>
            <div style={cardStyles.authorAvatar}>{author?.[0]}</div>
            <div>
              <div style={cardStyles.cardAuthorName}>{author}</div>
              <div style={cardStyles.cardAuthorRole}>{role}</div>
            </div>
          </div>
          <div style={cardStyles.cardMeta}>
            <div style={cardStyles.ratingRow}>
              <StarFill /> <strong>{rating}</strong>
              <span style={cardStyles.reviewCount}>({reviews})</span>
            </div>
            <div style={cardStyles.priceRow}>
              <span style={cardStyles.priceFrom}>mulai</span>
              <span style={cardStyles.priceVal}>{price}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── CTABand + BuilderMock ── */
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

function CTABand() {
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
          <div style={cardStyles.ctaBtnRow}>
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

/* ── Page ── */
export default function ItineraryPage() {
  const state = useDirectoryState();
  const {
    data: itineraries,
    pagination,
    isLoading,
    isValidating,
    isError,
    filters,
    setFilters: setHookFilters,
    loadMore,
    hasMore,
  } = useItineraries();

  const handleFilterChange = useCallback(
    (key, value) => {
      setHookFilters({ ...filters, [key]: value });
    },
    [filters, setHookFilters],
  );

  return (
    <div data-screen-label="Itinerary Directory">
      <TopNav active="Itinerary" />
      <ItineraryHero />
      <CategoryTabs active="Itinerary" />
      <FilterBar
        state={state}
        onFilterChange={handleFilterChange}
        totalResults={pagination?.total || 2412}
      />
      {state.view === "grid" && <FeaturedRail />}
      <ItineraryGrid
        data={itineraries}
        isLoading={isLoading}
        isError={isError}
        loadMore={loadMore}
        hasMore={hasMore}
        totalCount={pagination?.total}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
