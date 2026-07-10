"use client";

import React, { useState, useCallback } from "react";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useItineraries } from "@/lib/hooks/use-itineraries";

import ItineraryHero from "./_components/ItineraryHero";
import FilterBar from "./_components/FilterBar";
import FeaturedRail from "./_components/FeaturedRail";
import ItineraryGrid from "./_components/ItineraryGrid";

/* ── useDirectoryState hook ── */
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

/* ── Page ── */
export default function ItineraryPage() {
  const state = useDirectoryState();
  const {
    data: itineraries,
    pagination,
    isLoading,
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
