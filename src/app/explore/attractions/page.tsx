"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

/* ── Inner Page (needs Suspense for useSearchParams) ── */
function AttractionsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ui = useDirectoryState([]);
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

  // Sync initial filters from URL on mount
  useEffect(() => {
    const province   = searchParams.get("province")   || "";
    const category   = searchParams.get("category")   || "";
    const priceRange = searchParams.get("priceRange") || "";
    const facilities = searchParams.get("facilities") || "";
    const rating     = searchParams.get("rating")     || "";
    const sort       = searchParams.get("sort")       || "popularity";

    setFilters({ province, category, priceRange, facilities, rating, sort });

    // Sync active chips from URL
    const chips = [province, category, priceRange].filter(Boolean);
    if (chips.length > 0) ui.setActiveChips(chips);
    if (sort) {
      const uiSort = Object.entries(SORT_KEY_MAP).find(([, v]) => v === sort)?.[0] || "Paling populer";
      ui.setSort(uiSort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePickFilter(label: string, value: string) {
    const fkey = FILTER_KEY_MAP[label];
    if (fkey) {
      const newFilters = { ...filters, [fkey]: value };
      setFilters(newFilters);
      syncUrl(newFilters);
    }
  }

  function handleRemoveFilter(chip: string) {
    let newFilters = { ...filters };
    for (const [flabel, opts] of Object.entries(ATTR_FILTER_OPTIONS)) {
      if (opts.includes(chip)) {
        const fkey = FILTER_KEY_MAP[flabel];
        if (fkey) newFilters = { ...newFilters, [fkey]: "" };
        break;
      }
    }
    setFilters(newFilters);
    syncUrl(newFilters);
  }

  function handleClearFilters() {
    const newFilters: AttractionsFilters = {
      province: "",
      category: "",
      priceRange: "",
      facilities: "",
      rating: "",
      sort: filters.sort,
    };
    setFilters(newFilters);
    syncUrl(newFilters);
  }

  function handleSortChange(value: string) {
    ui.setSort(value);
    const engSort = SORT_KEY_MAP[value] || "popularity";
    const newFilters = { ...filters, sort: engSort };
    setFilters(newFilters);
    syncUrl(newFilters);
  }

  function syncUrl(f: AttractionsFilters) {
    const p = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => {
      if (v && !(k === "sort" && v === "popularity")) p.set(k, v as string);
    });
    router.replace(`?${p.toString()}`, { scroll: false });
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

export default function AttractionsPage() {
  return (
    <Suspense fallback={null}>
      <AttractionsPageInner />
    </Suspense>
  );
}
