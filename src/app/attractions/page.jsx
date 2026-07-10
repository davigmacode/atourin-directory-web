"use client";

import React, { useState, useEffect } from "react";
import { TopNav, SiteFooter, CategoryTabs } from "@/components/layout";
import { cardStyles } from "@/styles/attraction-styles";
import { useAttractions } from "@/lib/hooks/use-attractions";
import { ATTR_FILTER_OPTIONS } from "@/data/attractions";

import FilterBar, { PlusIcon, SparkleIcon } from "./_components/FilterBar";
import AttractionHero from "./_components/AttractionHero";
import AttractionGrid, { SkeletonCard } from "./_components/AttractionGrid";

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
