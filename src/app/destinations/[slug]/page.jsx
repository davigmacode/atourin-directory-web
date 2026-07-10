"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopNav, SiteFooter } from "@/components/layout";
import { DESTINATIONS } from "@/data/destinations";
import { cat } from "@/lib/i18n";
import dh from "@/styles/destination-detail";


function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

/* ── Default cover images for hero slider ────────────── */
const FALLBACK_COVERS = [
  "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=2000&auto=format&fit=crop&q=70",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2000&auto=format&fit=crop&q=70",
];

const WEATHER_ICONS = ["☀️", "⛅", "🌤️", "🌦️", "☁️"];
const WEATHER_COND = [
  "Cerah",
  "Cerah berawan",
  "Berawan",
  "Hujan ringan",
  "Mendung",
];

/* ── Tab definitions ──────────────────────────────────── */
function getTabs(dest) {
  return [
    { id: "atraksi", label: cat("attraction", "Atraksi"), count: dest.attr },
    { id: "desa", label: cat("village", "Desa Wisata"), count: dest.desa },
    { id: "itinerary", label: cat("itinerary", "Itinerary"), count: dest.itin },
    { id: "pemandu", label: cat("guide", "Pemandu"), count: dest.guide },
    { id: "cerita", label: "Cerita Wisatawan" },
    { id: "info", label: "Travel Info & Tips" },
  ];
}

import DestHero from "./_components/DestHero";
import DestTabs from "./_components/DestTabs";
import DestSidebar from "./_components/DestSidebar";
import { AtraksiTab, DesaTab, ItineraryTab, PemanduTab, CeritaTab, InfoTab } from "./_components/TabPanels";

/* ==========================================================
   MAIN PAGE
   ========================================================== */
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
    if (
      tab &&
      ["atraksi", "desa", "itinerary", "pemandu", "cerita", "info"].includes(
        tab,
      )
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSetActiveTab = useCallback((tabId) => {
    setActiveTab(tabId);
    const url = new URL(window.location);
    url.searchParams.set("tab", tabId);
    window.history.replaceState({}, "", url);
  }, []);

  if (!params) return null;

  const { slug } = params;

  const dest = DESTINATIONS.find((d) => slugify(d.name) === slug);

  if (!dest) {
    if (typeof window !== "undefined") {
      router.replace("/destinations");
    }
    return null;
  }

  const covers = [dest.img, ...FALLBACK_COVERS.slice(0, 3)];
  const tabs = getTabs(dest);

  return (
    <div>
      <TopNav active="Jelajahi" />
      <DestHero dest={dest} covers={covers} />
      <DestTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
      />
      <div style={dh.pageBody}>
        <main>
          {activeTab === "atraksi" && <AtraksiTab dest={dest} />}
          {activeTab === "desa" && <DesaTab dest={dest} />}
          {activeTab === "itinerary" && <ItineraryTab dest={dest} />}
          {activeTab === "pemandu" && <PemanduTab dest={dest} />}
          {activeTab === "cerita" && <CeritaTab />}
          {activeTab === "info" && <InfoTab dest={dest} />}
        </main>
        <DestSidebar dest={dest} />
      </div>
      <SiteFooter />
    </div>
  );
}
