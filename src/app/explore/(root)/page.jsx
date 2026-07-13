"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import ExploreHero from "./_components/ExploreHero";
import StatsBanner from "./_components/StatsBanner";
import UntukmuSection from "./_components/UntukmuSection";
import FeaturedCarousel from "./_components/FeaturedCarousel";
import IslandTiles from "./_components/IslandTiles";
import ProvinceGrid from "./_components/ProvinceGrid";
import CategoryGrid from "./_components/CategoryGrid";
import DesaWisataStrip from "./_components/DesaWisataStrip";
import MarketplaceCTA from "./_components/MarketplaceCTA";
import { useExploreHub } from "@/lib/hooks/use-explore-hub";

export default function ExploreHubPage() {
  const {
    heroBgs,
    stats,
    islands,
    provinces,
    categories,
    featured,
    untukmu,
    desaFeatured,
    isLoading,
  } = useExploreHub();

  return (
    <div data-screen-label="Explore Hub">
      <TopNav active="Explore" />
      <ExploreHero heroBgs={heroBgs} isLoading={isLoading} />
      <StatsBanner stats={stats} isLoading={isLoading} />
      <UntukmuSection untukmu={untukmu} isLoading={isLoading} />
      <FeaturedCarousel featured={featured} isLoading={isLoading} />
      <IslandTiles islands={islands} isLoading={isLoading} />
      <ProvinceGrid
        provinces={provinces}
        islands={islands}
        isLoading={isLoading}
      />
      <CategoryGrid categories={categories} isLoading={isLoading} />
      <DesaWisataStrip desaFeatured={desaFeatured} isLoading={isLoading} />
      <MarketplaceCTA />
      <SiteFooter />
    </div>
  );
}
