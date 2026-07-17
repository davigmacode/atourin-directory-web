"use client";

import React, { useMemo } from "react";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useTourGuides } from "@/lib/hooks/use-tour-guides";

import GuidesHero from "./_components/GuidesHero";
import FilterBar from "./_components/FilterBar";
import GuidesGrid from "./_components/GuidesGrid";

const PROVINCE_MAP: Record<string, string> = {
  Bali: "Bali",
  Yogyakarta: "Yogyakarta",
  "Labuan Bajo": "Nusa Tenggara Timur",
  Lombok: "Nusa Tenggara Barat",
  Bandung: "Jawa Barat",
  Bromo: "Jawa Timur",
  "Raja Ampat": "Papua Barat",
  "Danau Toba": "Sumatera Utara",
  Komodo: "Nusa Tenggara Timur",
  Sumba: "Nusa Tenggara Timur",
};

const SPECIALISM_MAP: Record<string, string> = {
  "Heritage & Sejarah": "heritage",
  Petualangan: "petualangan",
  "Bahari & Diving": "bahari",
  Kuliner: "kuliner",
  Fotografi: "fotografi",
  Birdwatching: "petualangan",
  Hiking: "hiking",
  "Family Friendly": "budaya",
  Honeymoon: "budaya",
  Spiritual: "spiritual",
};

const LANGUAGE_MAP: Record<string, string> = {
  Indonesia: "lang-id",
  English: "lang-en",
  Mandarin: "lang-zh",
  Japanese: "lang-jp",
  Korean: "lang-ko",
  Spanish: "lang-es",
  French: "lang-fr",
  German: "lang-de",
  Arabic: "lang-ar",
  Dutch: "lang-nl",
};

const CERT_MAP: Record<string, string> = {
  HPI: "hpi-membership",
  BNSP: "bnsp-guide-level-3",
  "Diving Master": "bnsp-dive-guide",
  "Mountain Guide": "bnsp-mountain-guide",
  "Bersertifikat semua": "hpi-membership",
};

const SORT_MAP: Record<string, string> = {
  "Paling populer": "popularity",
  "Rating tertinggi": "rating-desc",
  "Harga terendah": "price-asc",
  "Harga tertinggi": "price-desc",
  "Pengalaman terbanyak": "experience-desc",
  popular: "popularity",
  rating: "rating-desc",
  price_low: "price-asc",
  price_high: "price-desc",
  experience: "experience-desc",
};

const FILTER_KEY_MAP: Record<string, string> = {
  Wilayah: "province",
  Spesialisasi: "specialism",
  Bahasa: "language",
  Harga: "price",
  Sertifikasi: "certification",
};

const VALUE_MAP: Record<string, Record<string, string>> = {
  Wilayah: PROVINCE_MAP,
  Spesialisasi: SPECIALISM_MAP,
  Bahasa: LANGUAGE_MAP,
  Sertifikasi: CERT_MAP,
};

function translateFilters(values: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [label, value] of Object.entries(values)) {
    if (!value) continue;
    if (label === "sort") {
      out.sort = SORT_MAP[value] || value;
      continue;
    }
    const fkey = FILTER_KEY_MAP[label];
    if (!fkey) continue;
    if (fkey === "price") {
      out.price = value;
      continue;
    }
    const vmap = VALUE_MAP[label];
    out[fkey] = vmap ? vmap[value] || value : value;
  }
  if (!out.sort) out.sort = "popularity";
  return out;
}

export default function TourGuidesPage() {
  const [view, setView] = React.useState("grid");
  const [activeFilterValues, setActiveFilterValues] = React.useState<
    Record<string, string>
  >({});

  const apiFilters = useMemo(
    () => translateFilters(activeFilterValues),
    [activeFilterValues]
  );

  const {
    data: guides,
    pagination,
    isLoading,
    isError,
    error,
    setFilters,
    loadMore,
    hasMore,
  } = useTourGuides();

  function handleFilterChange(next: Record<string, string>) {
    setActiveFilterValues(next);
    setFilters(translateFilters(next));
  }

  return (
    <div data-screen-label="Tour Guides Directory">
      <TopNav active="Tour Guide" />
      <GuidesHero />
      <CategoryTabs active="Tour Guide" />
      <FilterBar
        activeFilterValues={activeFilterValues}
        onFilterChange={handleFilterChange}
        totalResults={pagination?.total || 0}
        view={view}
        onViewChange={setView}
      />
      <GuidesGrid
        data={guides}
        loadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        isError={isError}
        error={error}
        total={pagination?.total}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
