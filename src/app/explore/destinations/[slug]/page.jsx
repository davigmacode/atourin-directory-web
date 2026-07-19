"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { TopNav, SiteFooter } from "@/components/layout";
import { cat } from "@/lib/i18n";
import dh from "@/styles/destination-detail";
import DestHero from "./_components/DestHero";
import DestTabs from "./_components/DestTabs";
import DestSidebar from "./_components/DestSidebar";
import { AtraksiTab, DesaTab, ItineraryTab, PemanduTab, CeritaTab, InfoTab } from "./_components/TabPanels";

/* ── Default cover images for hero slider ────────────── */
const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2000&auto=format&fit=crop&q=70",
];

const WEATHER_ICONS = ["☀️", "⛅", "🌤️", "🌦️", "☁️"];
const WEATHER_COND = ["Cerah", "Cerah berawan", "Berawan", "Hujan ringan", "Mendung"];

function getTabs(dest) {
  return [
    { id: "atraksi",   label: cat("attraction", "Atraksi"),     count: dest.relatedAttractions?.length ?? dest.attractionsCount ?? dest.attr ?? 0 },
    { id: "desa",      label: cat("village", "Desa Wisata"),     count: dest.relatedVillages?.length ?? dest.villagesCount ?? dest.desa ?? 0 },
    { id: "itinerary", label: cat("itinerary", "Itinerary"),     count: dest.relatedItineraries?.length ?? dest.itinerariesCount ?? dest.itin ?? 0 },
    { id: "pemandu",   label: cat("guide", "Pemandu"),           count: dest.relatedTourGuides?.length ?? dest.tourGuidesCount ?? dest.guide ?? 0 },
    { id: "cerita",    label: "Cerita Wisatawan",                count: dest.relatedJournals?.length ?? dest.ceritaCount ?? 0 },
    { id: "info",      label: "Travel Info & Tips" },
  ];
}

function mapApiDest(apiDest) {
  return {
    ...apiDest,
    img: apiDest.coverImage?.url || apiDest.cover_image?.url || '',
    name: apiDest.name?.id || apiDest.name || '',
    description: apiDest.description?.id || apiDest.description || '',
    province: apiDest.province?.name || apiDest.province || '',
    type: apiDest.type || 'city',
    area: '',
    population: '',
    bestTime: '',
    language: '',
    rating: apiDest.ratingAverage ?? apiDest.rating_average ?? 0,
    attr: apiDest.attractionsCount ?? apiDest.attractions_count ?? 0,
    desa: apiDest.villagesCount ?? apiDest.villages_count ?? 0,
    itin: apiDest.itinerariesCount ?? apiDest.itineraries_count ?? 0,
    guide: apiDest.tourGuidesCount ?? apiDest.tour_guides_count ?? 0,
    ceritaCount: apiDest.journalsCount ?? apiDest.journals_count ?? 0,
    relatedJournals: apiDest.relatedJournals ?? [],
  };
}

export default function DestinationDetailPage({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [activeTab, setActiveTab] = useState("atraksi");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    paramsPromise.then(setParams);
  }, [paramsPromise]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["atraksi", "desa", "itinerary", "pemandu", "cerita", "info"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSetActiveTab = useCallback((tabId) => {
    setActiveTab(tabId);
    const url = new URL(window.location);
    url.searchParams.set("tab", tabId);
    window.history.replaceState({}, "", url);
  }, []);

  const slug = params?.slug;
  const { data: apiData, isLoading, error } = useSWR(slug ? `/destinations/${slug}` : null);

  useEffect(() => {
    if (!isLoading && error) {
      console.warn("[DestinationDetailPage] API error:", error);
    }
  }, [error, isLoading]);

  if (!params) return null;

  if (error) {
    return (
      <div>
        <TopNav active="Jelajahi" />
        <div style={{ textAlign: "center", padding: 80, color: "var(--atr-text-muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 15 }}>Destinasi tidak ditemukan.</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (isLoading || !apiData?.data) return null;

  const dest = mapApiDest(apiData.data);
  const covers = [dest.img, ...FALLBACK_COVERS.slice(0, 3)];
  const tabs = getTabs(dest);

  return (
    <div>
      <TopNav active="Jelajahi" />
      <DestHero dest={dest} covers={covers} />
      <DestTabs tabs={tabs} activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      <div style={dh.pageBody}>
        <main>
          {activeTab === "atraksi"   && <AtraksiTab dest={dest} />}
          {activeTab === "desa"      && <DesaTab dest={dest} />}
          {activeTab === "itinerary" && <ItineraryTab dest={dest} />}
          {activeTab === "pemandu"   && <PemanduTab dest={dest} />}
          {activeTab === "cerita"    && <CeritaTab dest={dest} />}
          {activeTab === "info"      && <InfoTab dest={dest} />}
        </main>
        <DestSidebar dest={dest} />
      </div>
      <SiteFooter />
    </div>
  );
}
