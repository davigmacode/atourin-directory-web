"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TopNav, SiteFooter, CategoryTabs } from "@/components/layout";
import { cardStyles as cardStylesRaw } from "@/styles/attraction-styles";
import { useAttractions, type AttractionsFilters } from "@/lib/hooks/use-attractions";
import type { Attraction } from "@/types/attraction";

import FilterBar from "./_components/FilterBar";
import AttractionHero from "./_components/AttractionHero";
import AttractionGrid, { SkeletonCard } from "./_components/AttractionGrid";

const cardStyles = cardStylesRaw as Record<string, React.CSSProperties>;

/* ── useDirectoryState hook ── */
function useDirectoryState(defaultChips = []) {
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

const STATIC_SLUG_TO_LABEL: Record<string, string> = {
  // Price Range
  "gratis": "Gratis",
  "free": "Gratis",
  "<25rb": "< Rp25rb",
  "25rb-100rb": "Rp25rb \u2013 Rp100rb",
  "100rb-250rb": "Rp100rb \u2013 Rp250rb",
  ">250rb": "> Rp250rb",
  // Rating
  "4.5": "\u2605 4.5+",
  "4.0": "\u2605 4.0+",
  "3.5": "\u2605 3.5+",
  "all": "Semua rating",
};

const STATIC_LABEL_TO_SLUG: Record<string, string> = {
  "Gratis": "gratis",
  "< Rp25rb": "<25rb",
  "Rp25rb \u2013 Rp100rb": "25rb-100rb",
  "Rp100rb \u2013 Rp250rb": "100rb-250rb",
  "> Rp250rb": ">250rb",
  "\u2605 4.5+": "4.5",
  "\u2605 4.0+": "4.0",
  "\u2605 3.5+": "3.5",
  "Semua rating": "all",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function deslugify(slug: string) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Inner Page (needs Suspense for useSearchParams) ── */
function AttractionsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Fetch dynamic categories, provinces, and facilities from database
  const { data: provincesRes } = useSWR("/provinces");
  const { data: catsRes } = useSWR("/categories?type=category");
  const { data: facsRes } = useSWR("/facilities?entity_type=attraction");

  const [provsMap, setProvsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });
  const [catsMap, setCatsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });
  const [facsMap, setFacsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (provincesRes?.data) {
      provincesRes.data.forEach((p: any) => {
        slugToLabel[p.slug] = p.name;
        labelToSlug[p.name] = p.slug;
      });
    }
    setProvsMap({ slugToLabel, labelToSlug });
  }, [provincesRes]);

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (catsRes?.data) {
      catsRes.data.forEach((c: any) => {
        slugToLabel[c.slug] = c.name;
        labelToSlug[c.name] = c.slug;
      });
    }
    setCatsMap({ slugToLabel, labelToSlug });
  }, [catsRes]);

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (facsRes?.data) {
      facsRes.data.forEach((f: any) => {
        slugToLabel[f.slug] = f.name;
        labelToSlug[f.name] = f.slug;
      });
    }
    setFacsMap({ slugToLabel, labelToSlug });
  }, [facsRes]);

  const getSlugToLabel = useCallback((key: keyof AttractionsFilters, slug: string) => {
    if (key === "province") {
      return provsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "category") {
      return catsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "facilities") {
      return facsMap.slugToLabel[slug] || deslugify(slug);
    }
    return STATIC_SLUG_TO_LABEL[slug] || slug;
  }, [provsMap, catsMap, facsMap]);

  const getLabelToSlug = useCallback((key: keyof AttractionsFilters, label: string) => {
    if (key === "province") {
      return provsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "category") {
      return catsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "facilities") {
      return facsMap.labelToSlug[label] || slugify(label);
    }
    return STATIC_LABEL_TO_SLUG[label] || label;
  }, [provsMap, catsMap, facsMap]);

  // Sync initial active chips from URL
  const getInitialChips = () => {
    const initial: string[] = [];
    const keys: (keyof AttractionsFilters)[] = ["province", "category", "priceRange", "facilities", "rating"];
    keys.forEach(k => {
      const val = searchParams.get(k);
      if (val) {
        val.split(",").map(v => v.trim().toLowerCase()).filter(Boolean).forEach(slug => {
          const label = getSlugToLabel(k, slug);
          if (label && !initial.includes(label)) {
            initial.push(label);
          }
        });
      }
    });
    return initial;
  };

  const ui = useDirectoryState(getInitialChips());
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

  // Re-sync activeChips when dynamic maps load to resolve any fallback spellings
  useEffect(() => {
    const keys: (keyof AttractionsFilters)[] = ["province", "category", "priceRange", "facilities", "rating"];
    const correctedChips: string[] = [];
    keys.forEach(k => {
      const val = searchParams.get(k);
      if (val) {
        val.split(",").map(v => v.trim().toLowerCase()).filter(Boolean).forEach(slug => {
          const label = getSlugToLabel(k, slug);
          if (label && !correctedChips.includes(label)) {
            correctedChips.push(label);
          }
        });
      }
    });
    if (correctedChips.length > 0) {
      ui.setActiveChips(correctedChips);
    }
  }, [provsMap, catsMap, facsMap]);

  // Sync active chips state back to URL query parameters and hook filters
  const syncChipsToUrlAndHook = useCallback((chips: string[]) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const nextFilters: AttractionsFilters = {
      province: "",
      category: "",
      priceRange: "",
      facilities: "",
      rating: "",
      sort: filters.sort,
    };

    const dynamicFilterOptions = {
      "Provinsi": (provincesRes?.data || []).map((p: any) => p.name),
      "Kategori": (catsRes?.data || []).map((c: any) => c.name),
      "Tiket masuk": ["Gratis", "< Rp25rb", "Rp25rb \u2013 Rp100rb", "Rp100rb \u2013 Rp250rb", "> Rp250rb"],
      "Fasilitas": (facsRes?.data || []).map((f: any) => f.name),
      "Rating": ["\u2605 4.5+", "\u2605 4.0+", "\u2605 3.5+", "Semua rating"],
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label as keyof typeof dynamicFilterOptions] || [];
      const selectedLabels = chips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);

      if (selectedSlugs.length > 0) {
        const csvValue = selectedSlugs.join(",");
        urlParams.set(key, csvValue);
        nextFilters[key] = csvValue;
      } else {
        urlParams.delete(key);
        nextFilters[key] = "";
      }
    });

    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
    setFilters(nextFilters);
  }, [searchParams, pathname, router, setFilters, provincesRes, catsRes, facsRes, getLabelToSlug, filters?.sort]);

  // Push initial URL state filters to Hook on mount
  useEffect(() => {
    const initialFilters: AttractionsFilters = {
      province: "",
      category: "",
      priceRange: "",
      facilities: "",
      rating: "",
      sort: searchParams.get("sort") || "popularity",
    };

    const dynamicFilterOptions = {
      "Provinsi": (provincesRes?.data || []).map((p: any) => p.name),
      "Kategori": (catsRes?.data || []).map((c: any) => c.name),
      "Tiket masuk": ["Gratis", "< Rp25rb", "Rp25rb \u2013 Rp100rb", "Rp100rb \u2013 Rp250rb", "> Rp250rb"],
      "Fasilitas": (facsRes?.data || []).map((f: any) => f.name),
      "Rating": ["\u2605 4.5+", "\u2605 4.0+", "\u2605 3.5+", "Semua rating"],
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label as keyof typeof dynamicFilterOptions] || [];
      const selectedLabels = ui.activeChips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        initialFilters[key] = selectedSlugs.join(",");
      } else {
        initialFilters[key] = "";
      }
    });

    setFilters(initialFilters);
  }, [provincesRes, catsRes]);

  function handleSortChange(value: string) {
    ui.setSort(value);
    const engSort = SORT_KEY_MAP[value] || "popularity";
    const newFilters = { ...filters, sort: engSort };
    setFilters(newFilters);
    
    const urlParams = new URLSearchParams(searchParams.toString());
    if (engSort && engSort !== "popularity") {
      urlParams.set("sort", engSort);
    } else {
      urlParams.delete("sort");
    }
    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
  }

  const dynamicFilterOptions = {
    "Provinsi": (provincesRes?.data || []).map((p: any) => p.name),
    "Kategori": (catsRes?.data || []).map((c: any) => c.name),
    "Tiket masuk": ["Gratis", "< Rp25rb", "Rp25rb \u2013 Rp100rb", "Rp100rb \u2013 Rp250rb", "> Rp250rb"],
    "Fasilitas": ["Parkir", "Toilet", "Mushola", "Restoran", "Penyewaan alat", "Ramah anak", "Akses kursi roda"],
    "Rating": ["\u2605 4.5+", "\u2605 4.0+", "\u2605 3.5+", "Semua rating"],
  };

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
            filterOptions={dynamicFilterOptions}
            onActiveChipsChange={syncChipsToUrlAndHook}
            onSortChange={handleSortChange}
            resultLabel="atraksi"
            totalResults={pagination?.total || 0}
            isLoading={isLoading}
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
    <Suspense fallback={<div>Memuat halaman atraksi...</div>}>
      <AttractionsPageInner />
    </Suspense>
  );
}
