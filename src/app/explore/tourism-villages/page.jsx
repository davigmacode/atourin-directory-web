"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useVillages } from "@/lib/hooks/use-villages";

import VillagesHero from "./_components/VillagesHero";
import FilterBar from "./_components/FilterBar";
import VillagesGrid from "./_components/VillagesGrid";

/* ── Inner Page (needs Suspense for useSearchParams) ── */
function TourismVillagesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // Sync initial filters from URL on mount
  useEffect(() => {
    const province = searchParams.get("province") || "";
    const adwi     = searchParams.get("adwi")     || "";
    const theme    = searchParams.get("theme")     || "";
    const activity = searchParams.get("activity")  || "";
    const price    = searchParams.get("price")     || "";
    const sort     = searchParams.get("sort")      || "alpha";

    setFilters({ province, adwi, theme, activity, price, sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL whenever filters change
  const handleSetFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      const p = new URLSearchParams();
      Object.entries(newFilters).forEach(([k, v]) => {
        if (v && !(k === "sort" && v === "alpha")) p.set(k, v);
      });
      router.replace(`?${p.toString()}`, { scroll: false });
    },
    [setFilters, router]
  );

  return (
    <div data-screen-label="Tourism Villages Directory">
      <TopNav active="Desa Wisata" />
      <VillagesHero />
      <CategoryTabs active="Desa Wisata" />
      <FilterBar
        filters={filters}
        setFilters={handleSetFilters}
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

export default function TourismVillagesPage() {
  return (
    <Suspense fallback={null}>
      <TourismVillagesPageInner />
    </Suspense>
  );
}
