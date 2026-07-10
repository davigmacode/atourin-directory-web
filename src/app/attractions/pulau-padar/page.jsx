"use client";

import React from "react";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { ds } from "@/styles/detail-styles";
import {
  ATR,
  AtrGallery,
  AtrHeader,
  AtrDescription,
  AtrFacilities,
  AtrLocation,
  AtrTips,
  AtrNearby,
  AtrItineraries,
  AtrReviews,
  BookingBox,
  QuickInfoSide,
} from "./_components/AttractionDetailComponents";

/* ── Page ── */
export default function AttractionDetailPage() {
  return (
    <div data-screen-label="Attraction Detail">
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <div style={ds.crumbBar}>
          <div style={{ width: "100%" }}>
            <Breadcrumb
              items={[
                "Jelajahi",
                "Nusa Tenggara Timur",
                "Manggarai Barat",
                "Atraksi",
                "Pulau Padar",
              ]}
            />
          </div>
        </div>

        <div style={ds.containerWide}>
          <AtrGallery images={ATR.images} total={ATR.totalPhotos} />
        </div>

        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <AtrHeader />
            <AtrDescription />
            <AtrFacilities />
            <AtrLocation />
            <AtrTips />
            <AtrNearby />
            <AtrItineraries />
            <AtrReviews />
          </div>
          <aside style={ds.sideCol}>
            <BookingBox />
            <QuickInfoSide />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
