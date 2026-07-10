"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { TopNav, SiteFooter } from "@/components/layout";
import { useItinerary } from "@/lib/hooks/use-itinerary";

import {
  LoadingSkeleton,
  ErrorState,
  NotFound,
} from "./_components/ItineraryDetailComponents";

import DetailHero from "./_components/DetailHero";
import ActionBar from "./_components/ActionBar";
import AuthorStrip from "./_components/AuthorStrip";
import PlanView from "./_components/PlanView";
import AboutTab from "./_components/AboutTab";
import RelatedItineraries from "./_components/RelatedItineraries";

export default function ItineraryDetailPage() {
  const { slug } = useParams();
  const { itinerary, isLoading, isError, error } = useItinerary(slug);
  const [activeTab, setActiveTab] = useState("plan");

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  if (!itinerary) return <NotFound />;

  return (
    <div data-screen-label="Itinerary Detail">
      <TopNav active="Itinerary" />
      <DetailHero itinerary={itinerary} />
      <ActionBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <AuthorStrip itinerary={itinerary} />
      {activeTab === "plan" ? (
        <PlanView itinerary={itinerary} />
      ) : (
        <AboutTab itinerary={itinerary} />
      )}
      <RelatedItineraries />
      <SiteFooter />
    </div>
  );
}
