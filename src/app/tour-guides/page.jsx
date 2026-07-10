"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter, CategoryTabs } from "@/components/layout";
import { useGuides } from "@/lib/hooks/use-guides";

import GuidesHero from "./_components/GuidesHero";
import FilterBar from "./_components/FilterBar";
import GuidesGrid from "./_components/GuidesGrid";
import CTABand from "./_components/CTABand";

export default function TourGuidesPage() {
  const [view, setView] = useState("grid");
  const {
    data: guides,
    pagination,
    isLoading,
    isError,
    error,
    filters,
    setFilters,
    loadMore,
    hasMore,
  } = useGuides();

  return (
    <div data-screen-label="Tour Guides Directory">
      <TopNav active="Tour Guide" />
      <GuidesHero />
      <CategoryTabs active="Tour Guide" />
      <FilterBar
        activeFilterValues={filters}
        onFilterChange={setFilters}
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
