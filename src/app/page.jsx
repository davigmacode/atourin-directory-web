"use client";

import React, { useState, useEffect } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { hm } from "@/styles/home-styles";

/* ── Static Data ── */
import {
  HOME_CATS,
  HOME_STATS,
  HOME_PROMOS,
  HOME_PROD_FILTERS,
  HOME_PRODUCTS,
  JELAJAHI_TABS,
  HOME_VILLAGES,
  HOME_WHY,
  HOME_ARTICLES,
  HOME_TESTIMONIALS,
  HOME_SEO,
  HOME_VOUCHERS,
  HOME_DESTINATIONS,
  SAVE_COLLECTIONS,
} from "@/data/home-data";

/* ── Sub-components ── */
import Hero from "./_components/Hero";
import Categories from "./_components/Categories";
import StatsBar from "./_components/StatsBar";
import {
  PromoSection,
  VoucherSection,
  PopularSection,
  DestinationSection,
  JelajahiSection,
  VillageSection,
  WhySection,
  InspirasiSection,
  TestiSection,
  AppSection,
  SeoSection,
  NewsletterSection,
} from "./_components/HomeSections";
import { WelcomeModal, SaveModal } from "./_components/HomeModals";

export default function HomePage() {
  const accent = "#7068D5";
  const [welcome, setWelcome] = useState(false);
  const [saveProduct, setSaveProduct] = useState(null);

  // Show once per session after the user scrolls past a couple of sections.
  useEffect(() => {
    if (sessionStorage.getItem("atr_welcome_seen")) return;
    function onScroll() {
      if (window.scrollY > 800) {
        setWelcome(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeWelcome() {
    setWelcome(false);
    sessionStorage.setItem("atr_welcome_seen", "1");
  }

  return (
    <div style={hm.page} data-screen-label="Jelajahi">
      <style>{`
        .hm-carousel::-webkit-scrollbar { display: none; }
        .hm-arrow:hover { background: var(--atr-purple); color: #fff; border-color: var(--atr-purple); }
        .hm-prod:hover, .hm-art:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(31,27,51,0.12); }
        .hm-cat:hover { transform: translateY(-2px); background: var(--atr-purple-50); border-color: var(--atr-purple-light); }
        .hm-village:hover img { transform: scale(1.06); }
        .hm-promo:hover { box-shadow: 0 14px 32px rgba(31,27,51,0.18); }
        .hm-herochip:hover { background: rgba(255,255,255,0.28); }
        .hm-store:hover { filter: brightness(1.15); }
        .hm-seo:hover { color: var(--atr-purple); }
        @media (max-width: 1100px){
          .hm-grid6 { grid-template-columns: repeat(3,1fr) !important; }
          .hm-launcher-grid { grid-template-columns: repeat(5,1fr) !important; }
        }
        @media (max-width: 640px){
          .hm-launcher-grid { grid-template-columns: repeat(4,1fr) !important; }
          .hm-dest-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
      <TopNav active="Jelajahi" isLoggedIn userName="Mas Pri" notifCount={3} />

      <Hero accent={accent} />
      <Categories categories={HOME_CATS} />
      <StatsBar stats={HOME_STATS} />
      <PromoSection promos={HOME_PROMOS} />
      <VoucherSection vouchers={HOME_VOUCHERS} />
      <PopularSection accent={accent} products={HOME_PRODUCTS} filters={HOME_PROD_FILTERS} onSave={setSaveProduct} />
      <DestinationSection destinations={HOME_DESTINATIONS} />
      <JelajahiSection accent={accent} products={HOME_PRODUCTS} tabs={JELAJAHI_TABS} onSave={setSaveProduct} />
      <VillageSection villages={HOME_VILLAGES} />
      <WhySection why={HOME_WHY} />
      <InspirasiSection articles={HOME_ARTICLES} />
      <TestiSection testimonials={HOME_TESTIMONIALS} />
      <AppSection />
      <SeoSection seo={HOME_SEO} />
      <NewsletterSection />

      <SiteFooter />

      {welcome && <WelcomeModal onClose={closeWelcome} />}
      {saveProduct && (
        <SaveModal
          product={saveProduct}
          collections={SAVE_COLLECTIONS}
          onClose={() => setSaveProduct(null)}
        />
      )}
    </div>
  );
}
