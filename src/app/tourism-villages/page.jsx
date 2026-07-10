"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter, CategoryTabs } from "@/components/layout";
import { useVillages } from "@/lib/hooks/use-villages";

import VillagesHero from "./_components/VillagesHero";
import FilterBar from "./_components/FilterBar";
import VillagesGrid from "./_components/VillagesGrid";
import CTABand from "./_components/CTABand";

export default function TourismVillagesPage() {
  const [view, setView] = useState("grid");
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
        view={view}
        onViewChange={setView}
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
