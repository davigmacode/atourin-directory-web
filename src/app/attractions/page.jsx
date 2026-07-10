"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { dirStyles, cardStyles, attrHero } from "@/styles/attraction-styles";
import { useAttractions } from "@/lib/hooks/use-attractions";
import {
  ATTR_IMG,
  ATTR_FILTERS,
  ATTR_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/data/attractions";

/* ── SVG icons ── */
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
function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function CategoryTabs({ active = "Atraksi" }) {
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

/* ── FilterBar ── */
function FilterBar({
  ui,
  onPickFilter,
  onRemoveFilter,
  onClearFilters,
  onSortChange,
  filters = ATTR_FILTERS,
  filterOptions = ATTR_FILTER_OPTIONS,
  resultLabel = "atraksi",
  totalResults = 1247,
}) {
  const wrapRef = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        ui.setOpenFilter(null);
        ui.setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function toggleFilter(label) {
    ui.setOpenFilter(ui.openFilter === label ? null : label);
    ui.setOpenSort(false);
  }
  function pickFilter(label, value) {
    if (!ui.activeChips.includes(value)) {
      ui.setActiveChips([...ui.activeChips, value]);
    }
    onPickFilter?.(label, value);
    ui.setOpenFilter(null);
  }
  function removeChip(c) {
    ui.setActiveChips(ui.activeChips.filter((x) => x !== c));
    onRemoveFilter?.(c);
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = ui.openFilter === f.label;
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
                      const checked = ui.activeChips.includes(opt);
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
              onClick={() => ui.setView("grid")}
              style={{
                ...dirStyles.viewBtn,
                ...(ui.view === "grid" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <GridIcon /> Grid
            </button>
            <button
              onClick={() => ui.setView("map")}
              style={{
                ...dirStyles.viewBtn,
                ...(ui.view === "map" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <MapIcon /> Peta
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                ui.setOpenSort(!ui.openSort);
                ui.setOpenFilter(null);
              }}
              style={dirStyles.sortBtn}
            >
              <SortIcon /> {ui.sort}
              <ChevDown rotated={ui.openSort} />
            </button>
            {ui.openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      ui.setSort(s);
                      onSortChange?.(s);
                      ui.setOpenSort(false);
                    }}
                    style={{
                      ...dirStyles.dropdownItem,
                      ...(s === ui.sort
                        ? { color: "var(--atr-purple)", fontWeight: 600 }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === ui.sort ? dirStyles.radioOn : {}),
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
          {ui.activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {ui.activeChips.length > 0 && (
            <button
              onClick={() => {
                ui.setActiveChips([]);
                onClearFilters?.();
              }}
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

/* ── AttractionHero ── */
function AttractionHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Atraksi"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Tempat-tempat{" "}
            <span style={{ color: "var(--atr-purple)" }}>
              wajib dikunjungi.
            </span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Pantai, air terjun, candi, museum, hingga puncak gunung. Ribuan
            atraksi yang sudah dikurasi & direview oleh wisatawan dan local
            expert Atourin.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <a
              href="/"
              style={{ ...dirStyles.heroPrimary, textDecoration: "none" }}
            >
              <PlusIcon color="#fff" />
              Tambahkan ke itinerary
            </a>
            <button style={dirStyles.heroSecondary}>
              Lihat peta interaktif
            </button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="1.2K+" label="Atraksi tersedia" />
            <Stat n="220+" label="Kota & kabupaten" />
            <Stat n="38K" label="Review terverifikasi" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={attrHero.collage}>
            <img src={ATTR_IMG.padar} alt="" style={attrHero.collageImg1} />
            <img src={ATTR_IMG.borobudur} alt="" style={attrHero.collageImg2} />
            <img src={ATTR_IMG.tanjung} alt="" style={attrHero.collageImg3} />
            <div style={attrHero.floatStat}>
              <div style={attrHero.floatStatNum}>
                4.85
                <span style={{ fontSize: 11, opacity: 0.7 }}> {"\u2605"}</span>
              </div>
              <div style={attrHero.floatStatLabel}>
                Rating rata-rata atraksi populer
              </div>
            </div>
            <div style={attrHero.floatCat}>
              <span style={attrHero.floatCatIcon}>{"\uD83D\uDD33"}</span>
              <div>
                <div style={attrHero.floatCatTitle}>Gunung & Alam</div>
                <div style={attrHero.floatCatMeta}>342 atraksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        <div
          style={{ ...skeletonBg, height: 18, width: "70%", marginBottom: 4 }}
        />
        <div style={{ ...skeletonBg, height: 13, width: "50%" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <div style={{ ...skeletonBg, height: 12, width: "35%" }} />
          <div style={{ ...skeletonBg, height: 12, width: "30%" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            paddingTop: 10,
            borderTop: "1px solid var(--atr-outline)",
          }}
        >
          <div style={{ ...skeletonBg, height: 14, width: 80 }} />
          <div style={{ ...skeletonBg, height: 12, width: 70 }} />
        </div>
      </div>
    </div>
  );
}

/* ── AttractionGrid + AttrCard ── */
function AttractionGrid({ data, loadMore, hasMore, pagination }) {
  const [saved, setSaved] = useState({});
  function toggleSave(i) {
    setSaved((prev) => ({ ...prev, [i]: !prev[i] }));
  }
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDCCD"} Direktori atraksi
          </div>
          <h2 style={cardStyles.railTitle}>Semua tempat wisata</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {data.map((a, i) => (
          <AttrCard
            key={a.id || i}
            {...a}
            save={saved[i] ?? false}
            onSave={() => toggleSave(i)}
          />
        ))}
      </div>
      <div style={cardStyles.paginationRow}>
        {hasMore && (
          <button style={cardStyles.loadMore} onClick={loadMore}>
            Muat 24 atraksi lagi
          </button>
        )}
        <div style={cardStyles.pageInfo}>
          Menampilkan {data.length} dari{" "}
          {pagination?.total?.toLocaleString("id-ID") || data.length}
        </div>
      </div>
    </section>
  );
}

function AttrCard({
  img,
  name,
  cat,
  catBg,
  catFg,
  region,
  price,
  rating,
  reviews,
  hours,
  trekking,
  save,
  onSave,
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
      onClick={() => router.push(`/attractions/${slug}`)}
    >
      <div style={cardStyles.cardImgWrap}>
        <img src={img} alt="" style={cardStyles.cardImg} />
        <span
          style={{ ...cardStyles.cardTag, background: catBg, color: catFg }}
        >
          {cat}
        </span>
        <button
          style={{
            ...cardStyles.cardSave,
            ...(save ? cardStyles.cardSaveOn : {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <HeartIcon filled={save} color={save ? "#fff" : "var(--atr-text)"} />
        </button>
        {trekking && (
          <div style={cardStyles.cardImgBottom}>
            <span
              style={{
                ...cardStyles.cardDaysPill,
                background: "rgba(180,122,0,0.92)",
              }}
            >
              {"\uD83E\uDD7E"} Perlu trekking
            </span>
          </div>
        )}
      </div>
      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardTitle}>{name}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--atr-text-muted)",
          }}
        >
          <PinSm /> {region}
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            fontSize: 12,
            color: "var(--atr-text-muted)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <ClockSm /> {hours}
          </span>
          {price === 0 ? (
            <span style={{ color: "#2D8838", fontWeight: 700 }}>
              {"\u00B7"} Gratis masuk
            </span>
          ) : (
            <span>
              {"\u00B7"} Tiket Rp {(price / 1000).toLocaleString("id-ID")}rb
            </span>
          )}
        </div>
        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={cardStyles.ratingRow}>
            <StarFill /> <strong>{rating}</strong>
            <span style={cardStyles.reviewCount}>({reviews} review)</span>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--atr-purple)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Lihat detail {"\u2192"}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── CTABand + BuilderMock ── */
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

function BuilderMock() {
  return (
    <div style={cardStyles.builderCard}>
      <div style={cardStyles.builderHeader}>
        <div style={cardStyles.builderTitle}>3 Hari di Yogyakarta</div>
        <div style={cardStyles.builderTabs}>
          <span
            style={{ ...cardStyles.builderTab, ...cardStyles.builderTabActive }}
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

/* ── useDirectoryState hook ── */
function useDirectoryState(defaultChips = ["Bali", "Pantai", "< Rp25rb"]) {
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

const FILTER_KEY_MAP = {
  Provinsi: "provinsi",
  Kategori: "kategori",
  "Tiket masuk": "tiket_masuk",
  Fasilitas: "fasilitas",
  Rating: "rating",
};

/* ── Page ── */
export default function AttractionsPage() {
  const ui = useDirectoryState(["Bali", "Pantai", "< Rp25rb"]);
  const {
    data,
    isLoading,
    isError,
    error,
    loadMore,
    hasMore,
    filters,
    setFilters,
    pagination,
  } = useAttractions();

  // Sync default chips to API filters on first mount
  useEffect(() => {
    setFilters({
      provinsi: "Bali",
      kategori: "Pantai",
      tiket_masuk: "< Rp25rb",
      fasilitas: "",
      rating: "",
      sort: "Paling populer",
    });
  }, []);

  function handlePickFilter(label, value) {
    const fkey = FILTER_KEY_MAP[label];
    if (fkey) {
      setFilters({ ...filters, [fkey]: value });
    }
  }

  function handleRemoveFilter(chip) {
    for (const [flabel, opts] of Object.entries(ATTR_FILTER_OPTIONS)) {
      if (opts.includes(chip)) {
        const fkey = FILTER_KEY_MAP[flabel];
        if (fkey) setFilters({ ...filters, [fkey]: "" });
        break;
      }
    }
  }

  function handleClearFilters() {
    setFilters({
      provinsi: "",
      kategori: "",
      tiket_masuk: "",
      fasilitas: "",
      rating: "",
      sort: filters.sort,
    });
  }

  function handleSortChange(value) {
    ui.setSort(value);
    setFilters({ ...filters, sort: value });
  }

  return (
    <div data-screen-label="Attractions Directory">
      <TopNav active="Atraksi" />
      <AttractionHero />
      <CategoryTabs active="Atraksi" />

      {isLoading && data.length === 0 && !isError ? (
        <section style={cardStyles.gridSection}>
          <div style={cardStyles.gridHeader}>
            <div>
              <div style={cardStyles.eyebrow}>
                {"\uD83D\uDCCD"} Direktori atraksi
              </div>
              <h2 style={cardStyles.railTitle}>Semua tempat wisata</h2>
            </div>
          </div>
          <div style={cardStyles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      ) : isError && data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            color: "var(--atr-red)",
          }}
        >
          Gagal memuat data. Silakan coba lagi.
        </div>
      ) : (
        <>
          <FilterBar
            ui={ui}
            onPickFilter={handlePickFilter}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
            onSortChange={handleSortChange}
            filters={ATTR_FILTERS}
            filterOptions={ATTR_FILTER_OPTIONS}
            resultLabel="atraksi"
            totalResults={pagination?.total || 1247}
          />
          <AttractionGrid
            data={data}
            loadMore={loadMore}
            hasMore={hasMore}
            pagination={pagination}
          />
        </>
      )}

      <CTABand />
      <SiteFooter />
    </div>
  );
}
