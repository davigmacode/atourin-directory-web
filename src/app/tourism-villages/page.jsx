"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopNav, SiteFooter, Breadcrumb, CategoryTabs } from "@/components/layout";
import { dirStyles, cardStyles } from "@/styles/attraction-styles";
import { useVillages } from "@/lib/hooks/use-villages";
import { VIL_FILTERS, VIL_FILTER_OPTIONS, SORT_OPTIONS } from "@/data/villages";

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

/* ── Villages Hero ── */
const vh = {
  collage: { position: "absolute", inset: 0 },
  imgMain: {
    position: "absolute",
    top: 20,
    left: 20,
    width: "70%",
    height: "62%",
    objectFit: "cover",
    borderRadius: 18,
    boxShadow: "0 18px 36px rgba(31,27,51,0.18)",
  },
  imgTop: {
    position: "absolute",
    top: 14,
    right: 0,
    width: "36%",
    height: "36%",
    objectFit: "cover",
    borderRadius: 14,
    boxShadow: "0 10px 22px rgba(31,27,51,0.14)",
  },
  imgBottom: {
    position: "absolute",
    bottom: 20,
    right: 40,
    width: "52%",
    height: "38%",
    objectFit: "cover",
    borderRadius: 14,
    boxShadow: "0 12px 26px rgba(31,27,51,0.14)",
  },
  adwiBadge: {
    position: "absolute",
    top: 60,
    right: 30,
    background: "var(--atr-yellow)",
    color: "#3D2900",
    borderRadius: 12,
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
    zIndex: 3,
    transform: "rotate(-4deg)",
  },
  adwiLabel: {
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: "0.08em",
    textAlign: "center",
    lineHeight: 1.2,
  },
  adwiYear: { fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 4 },
  kpiCard: {
    position: "absolute",
    bottom: 30,
    left: 0,
    background: "#fff",
    borderRadius: 14,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 12px 26px rgba(31,27,51,0.16)",
    zIndex: 3,
  },
  kpiIcon: {
    fontSize: 22,
    background: "rgba(81,176,84,0.16)",
    borderRadius: 10,
    width: 40,
    height: 40,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiNum: { fontSize: 13, fontWeight: 700, color: "var(--atr-text)" },
  kpiLabel: { fontSize: 11, color: "var(--atr-text-muted)" },
};

function VillagesHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Desa Wisata"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Tinggal di rumah warga,{" "}
            <span style={{ color: "var(--atr-purple)" }}>
              hidup seperti lokal.
            </span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Desa wisata terkurasi Kemenparekraf, dari Wae Rebo di Flores hingga
            Penglipuran di Bali. Homestay, workshop kerajinan, tarian
            tradisional, dan kuliner asli kampung.
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
              Telusuri ADWI 2026
            </button>
            <button style={dirStyles.heroSecondary}>
              Apa itu desa wisata?
            </button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="320+" label="Desa terkurasi" />
            <Stat n="34" label="Provinsi" />
            <Stat n="92" label="ADWI Maju & Mandiri" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={vh.collage}>
            <img
              src="https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgMain}
            />
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgTop}
            />
            <img
              src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=70"
              alt=""
              style={vh.imgBottom}
            />
            <div style={vh.adwiBadge}>
              <div style={vh.adwiLabel}>
                ANUGERAH DESA
                <br />
                WISATA INDONESIA
              </div>
              <div style={vh.adwiYear}>2026</div>
            </div>
            <div style={vh.kpiCard}>
              <span style={vh.kpiIcon}>{"\uD83C\uDFE0"}</span>
              <div>
                <div style={vh.kpiNum}>1.840+ homestay</div>
                <div style={vh.kpiLabel}>tersedia di seluruh Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Village Card ── */
function VillageCard({
  img,
  name,
  region,
  adwi,
  adwiBg,
  adwiFg,
  theme,
  activities,
  price,
  rating,
  families,
  signature,
  featured,
}) {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
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
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/tourism-villages/${slug}`)}
    >
      <div style={cardStyles.cardImgWrap}>
        <img src={img} alt="" style={cardStyles.cardImg} />
        <span
          style={{ ...cardStyles.cardTag, background: adwiBg, color: adwiFg }}
        >
          ADWI {adwi}
        </span>
        {featured && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "var(--atr-yellow)",
              color: "#3D2900",
              fontSize: 10,
              fontWeight: 800,
              padding: "4px 9px",
              borderRadius: 4,
              letterSpacing: "0.04em",
            }}
          >
            UNGGULAN
          </div>
        )}
        <div style={cardStyles.cardImgBottom}>
          <span style={cardStyles.cardCityPill}>
            <PinSm /> {region}
          </span>
        </div>
      </div>
      <div style={cardStyles.cardBody}>
        <div>
          <h3 style={cardStyles.cardTitle}>{name}</h3>
          <div
            style={{
              fontSize: 12,
              color: "var(--atr-text-muted)",
              marginTop: 4,
            }}
          >
            {"\u2728"} <em>{signature}</em>
          </div>
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 4, fontSize: 11 }}
        >
          <span
            style={{
              background: "var(--atr-bg-soft)",
              color: "var(--atr-text)",
              padding: "4px 9px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            {theme}
          </span>
          {activities.slice(0, 2).map((a) => (
            <span
              key={a}
              style={{
                background: "#fff",
                border: "1px solid var(--atr-outline)",
                color: "var(--atr-text-muted)",
                padding: "4px 9px",
                borderRadius: 999,
              }}
            >
              {a}
            </span>
          ))}
          {activities.length > 2 && (
            <span
              style={{ color: "var(--atr-text-muted)", padding: "4px 4px" }}
            >
              +{activities.length - 2}
            </span>
          )}
        </div>

        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={cardStyles.ratingRow}>
              <StarFill /> <strong>{rating}</strong>
            </div>
            <div style={{ fontSize: 11, color: "var(--atr-text-muted)" }}>
              {"\uD83C\uDFE0"} {families} KK homestay
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            {price === 0 ? (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2D8838" }}>
                Gratis
              </span>
            ) : (
              <>
                <div style={{ fontSize: 10, color: "var(--atr-text-muted)" }}>
                  mulai
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--atr-purple)",
                  }}
                >
                  Rp {(price / 1000).toLocaleString("id-ID")}rb
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 10,
                      color: "var(--atr-text-muted)",
                    }}
                  >
                    {" "}
                    /malam
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── SkeletonCard ── */
function SkeletonCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...cardStyles.card, pointerEvents: "none" }}>
      <div
        style={{ ...cardStyles.cardImgWrap, background: "var(--atr-outline)" }}
      />
      <div style={cardStyles.cardBody}>
        <div>
          <div
            style={{
              ...skeletonBg,
              height: 18,
              width: "75%",
              marginBottom: 6,
            }}
          />
          <div style={{ ...skeletonBg, height: 12, width: "55%" }} />
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <div style={{ ...skeletonBg, height: 22, width: 65 }} />
          <div style={{ ...skeletonBg, height: 22, width: 75 }} />
          <div style={{ ...skeletonBg, height: 22, width: 60 }} />
        </div>
        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...skeletonBg, height: 14, width: 55 }} />
            <div style={{ ...skeletonBg, height: 12, width: 75 }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                ...skeletonBg,
                height: 10,
                width: 45,
                marginLeft: "auto",
                marginBottom: 4,
              }}
            />
            <div
              style={{
                ...skeletonBg,
                height: 16,
                width: 85,
                marginLeft: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── VillagesGrid ── */
function VillagesGrid({
  data,
  loadMore,
  hasMore,
  isLoading,
  isError,
  pagination,
}) {
  /* Loading state – skeleton cards */
  if (isLoading && (!data || data.length === 0)) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={cardStyles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  /* Error state */
  if (isError) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "var(--atr-text-muted)", fontSize: 15 }}>
            Gagal memuat data desa wisata. Silakan coba lagi.
          </p>
        </div>
      </section>
    );
  }

  /* Empty state */
  if (!data || data.length === 0) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "var(--atr-text-muted)", fontSize: 15 }}>
            Tidak ada desa wisata yang cocok dengan filter yang dipilih.
          </p>
        </div>
      </section>
    );
  }

  /* Normal grid */
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83C\uDFE0"} Direktori desa wisata
          </div>
          <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {data.map((v, i) => (
          <VillageCard key={i} {...v} />
        ))}
      </div>
      <div style={cardStyles.paginationRow}>
        {hasMore && (
          <button
            style={cardStyles.loadMore}
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Memuat\u2026" : "Muat lebih banyak"}
          </button>
        )}
        <div style={cardStyles.pageInfo}>
          Menampilkan {data.length}
          {pagination?.total ? ` dari ${pagination.total}` : ""}
        </div>
      </div>
    </section>
  );
}

/* ── FilterBar ── */
const FILTER_KEY_MAP = {
  Provinsi: "provinsi",
  "Kategori ADWI": "adwi_kategori",
  "Tema utama": "tema",
  Aktivitas: "aktivitas",
  "Harga homestay": "harga",
};

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

function FilterBar({ filters, setFilters, totalCount }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  const activeChips = Object.values(FILTER_KEY_MAP)
    .map((k) => filters[k])
    .filter(Boolean);

  function toggleFilter(label) {
    setOpenFilter(openFilter === label ? null : label);
    setOpenSort(false);
  }

  function pickFilter(label, value) {
    const key = FILTER_KEY_MAP[label];
    const next = value === filters[key] ? "" : value;
    setFilters({ ...filters, [key]: next });
    setOpenFilter(null);
  }

  function pickSort(value) {
    const next = value === filters.sort ? "" : value;
    setFilters({ ...filters, sort: next });
    setOpenSort(false);
  }

  function removeChip(chip) {
    const entry = Object.entries(FILTER_KEY_MAP).find(
      ([_, v]) => filters[v] === chip,
    );
    if (entry) {
      setFilters({ ...filters, [entry[1]]: "" });
    }
  }

  return (
    <div style={dirStyles.filterWrap}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {VIL_FILTERS.map((f) => {
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
                    {(VIL_FILTER_OPTIONS[f.label] || []).map((opt) => {
                      const key = FILTER_KEY_MAP[f.label];
                      const checked = filters[key] === opt;
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
              {filters.sort || "Urutkan"}
              <ChevDown rotated={openSort} />
            </button>
            {openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => pickSort(s)}
                    style={{
                      ...dirStyles.dropdownItem,
                      ...(s === filters.sort
                        ? { color: "var(--atr-purple)", fontWeight: 600 }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === filters.sort
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
          <strong>{totalCount ?? 0}</strong> desa wisata cocok untukmu
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
              onClick={() =>
                setFilters({
                  provinsi: "",
                  adwi_kategori: "",
                  tema: "",
                  aktivitas: "",
                  harga: "",
                  sort: filters.sort,
                })
              }
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

/* ── CTABand ── */
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
export default function TourismVillagesPage() {
  const {
    data,
    pagination,
    isLoading,
    isError,
    filters,
    setFilters,
    loadMore,
    hasMore,
  } = useVillages();

  return (
    <div data-screen-label="Tourism Villages Directory">
      <TopNav active="Desa Wisata" />
      <VillagesHero />
      <CategoryTabs active="Desa Wisata" />
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        totalCount={pagination?.total}
      />
      <VillagesGrid
        data={data}
        loadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
