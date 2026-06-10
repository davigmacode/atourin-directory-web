'use client';

import React from 'react';
import TopNav from '@/components/TopNav';
import ExploreHero from '@/components/ExploreHero';
import StatsBanner from '@/components/StatsBanner';
import UntukmuSection from '@/components/UntukmuSection';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import IslandTiles from '@/components/IslandTiles';
import ProvinceGrid from '@/components/ProvinceGrid';
import CategoryGrid from '@/components/CategoryGrid';
import DesaWisataStrip from '@/components/DesaWisataStrip';
import MarketplaceCTA from '@/components/MarketplaceCTA';
import SiteFooter from '@/components/SiteFooter';

export default function ExploreHubPage() {
  return (
    <div data-screen-label="Explore Hub">
      <TopNav active="Explore" />
      <ExploreHero />
      <StatsBanner />
      <UntukmuSection />
      <FeaturedCarousel />
      <IslandTiles />
      <ProvinceGrid />
      <CategoryGrid />
      <DesaWisataStrip />
      <MarketplaceCTA />
      <SiteFooter />
    </div>
  );
}
