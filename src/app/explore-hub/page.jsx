"use client";

import React from "react";
import TopNav from "@/components/TopNav";
import ExploreHero from "@/components/ExploreHero";
import StatsBanner from "@/components/StatsBanner";
import UntukmuSection from "@/components/UntukmuSection";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import IslandTiles from "@/components/IslandTiles";
import ProvinceGrid from "@/components/ProvinceGrid";
import CategoryGrid from "@/components/CategoryGrid";
import DesaWisataStrip from "@/components/DesaWisataStrip";
import MarketplaceCTA from "@/components/MarketplaceCTA";
import SiteFooter from "@/components/SiteFooter";
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
