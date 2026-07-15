"use client";

import React, { useState, useEffect } from "react";
import { TopNav, SiteFooter, CategoryTabs } from "@/components/layout";
import { cardStyles as cardStylesRaw } from "@/styles/attraction-styles";
import { useAttractions, type AttractionsFilters } from "@/lib/hooks/use-attractions";
import { ATTR_FILTER_OPTIONS } from "@/data/attractions";
import type { Attraction } from "@/types/attraction";

import FilterBar from "./_components/FilterBar";
import AttractionHero from "./_components/AttractionHero";
import AttractionGrid, { SkeletonCard } from "./_components/AttractionGrid";

const cardStyles = cardStylesRaw as Record<string, React.CSSProperties>;

/* ── useDirectoryState hook ── */
function useDirectoryState(defaultChips = ["Bali", "Pantai", "< Rp25rb"]) {
  const [view, setView] = useState("grid");
  const [activeChips, setActiveChips] = useState(defaultChips);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
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

const FILTER_KEY_MAP: Record<string, keyof AttractionsFilters> = {
  Provinsi: "province",
  Kategori: "category",
  "Tiket masuk": "priceRange",
  Fasilitas: "facilities",
  Rating: "rating",
};

const SORT_KEY_MAP: Record<string, string> = {
  "Paling populer": "popularity",
  "Terbaru": "newest",
  "Rating tertinggi": "rating-desc",
  "Harga terendah": "price-asc",
  "Harga tertinggi": "price-desc",
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
      province: "Bali",
      category: "Pantai",
      priceRange: "< Rp25rb",
      facilities: "",
      rating: "",
      sort: "popularity",
    });
  }, []);

  function handlePickFilter(label: string, value: string) {
    const fkey = FILTER_KEY_MAP[label];
    if (fkey) {
      setFilters({ ...filters, [fkey]: value });
    }
  }

  function handleRemoveFilter(chip: string) {
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
      province: "",
      category: "",
      priceRange: "",
      facilities: "",
      rating: "",
      sort: filters.sort,
    });
  }

  function handleSortChange(value: string) {
    ui.setSort(value);
    const engSort = SORT_KEY_MAP[value] || "popularity";
    setFilters({ ...filters, sort: engSort });
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
            totalResults={pagination?.total || 0}
          />
          <AttractionGrid
            data={data}
            loadMore={loadMore}
            hasMore={hasMore}
            pagination={pagination}
          />
        </>
      )}
      <SiteFooter />
    </div>
  );
}
