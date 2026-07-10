"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter } from "@/components/layout";

import DetailHero from "./_components/DetailHero";
import ActionBar from "./_components/ActionBar";
import AuthorStrip from "./_components/AuthorStrip";
import PlanView from "./_components/PlanView";
import AboutTab from "./_components/AboutTab";
import RelatedItineraries from "./_components/RelatedItineraries";

export default function ItineraryDetailPage() {
  const [activeTab, setActiveTab] = useState("plan");
  return (
    <div data-screen-label="Itinerary Detail">
      <TopNav active="Itinerary" />
      <DetailHero />
      <ActionBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AuthorStrip />
      {activeTab === "plan" ? <PlanView /> : <AboutTab />}
      <RelatedItineraries />
      <SiteFooter />
    </div>
  );
}
