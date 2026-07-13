"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { useAttraction } from "@/lib/hooks/use-attraction";
import { ds } from "@/styles/detail-styles";

import AtrGallery from "./_components/AtrGallery";
import AtrHeader from "./_components/AtrHeader";
import AtrDescription from "./_components/AtrDescription";
import AtrFacilities from "./_components/AtrFacilities";
import AtrLocation from "./_components/AtrLocation";
import AtrTips from "./_components/AtrTips";
import AtrNearby from "./_components/AtrNearby";
import AtrItineraries from "./_components/AtrItineraries";
import AtrReviews from "./_components/AtrReviews";
import BookingBox from "./_components/BookingBox";
import QuickInfoSide from "./_components/QuickInfoSide";

export default function AttractionDetailPage() {
  const { slug } = useParams();
  const { attraction, isLoading, isError } = useAttraction(slug);

  const s = { background: "var(--atr-outline)", borderRadius: 8 };

  if (isLoading) {
    return (
      <div>
        <TopNav active="Atraksi" />
        <div style={{ maxWidth: 1376, margin: "0 auto", padding: 32 }}>
          <div style={{ ...s, height: 24, width: "40%", marginBottom: 24 }} />
          <div
            style={{ ...s, height: 400, marginBottom: 24, borderRadius: 16 }}
          />
          <div style={{ ...s, height: 32, width: "60%", marginBottom: 16 }} />
          <div style={{ ...s, height: 16, width: "80%", marginBottom: 8 }} />
          <div style={{ ...s, height: 16, width: "75%" }} />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (isError || !attraction) {
    return (
      <div>
        <TopNav active="Atraksi" />
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{"\u26A0\uFE0F"}</div>
          <h2>Atraksi tidak ditemukan</h2>
          <Link
            href="/explore/attractions"
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "var(--atr-purple)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Kembali
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const regionParts = attraction.region ? attraction.region.split(",") : [];
  const kota = regionParts[0] ? regionParts[0].trim() : "Daerah";
  const provinsi = regionParts[1] ? regionParts[1].trim() : "Indonesia";

  return (
    <div data-screen-label="Attraction Detail">
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <div style={ds.crumbBar}>
          <div style={{ width: "100%" }}>
            <Breadcrumb
              items={["Jelajahi", provinsi, kota, "Atraksi", attraction.name]}
            />
          </div>
        </div>

        <div style={ds.containerWide}>
          <AtrGallery attraction={attraction} />
        </div>

        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <AtrHeader attraction={attraction} />
            <AtrDescription attraction={attraction} />
            <AtrFacilities attraction={attraction} />
            <AtrLocation attraction={attraction} />
            <AtrTips attraction={attraction} />
            <AtrNearby attraction={attraction} />
            <AtrItineraries attraction={attraction} />
            <AtrReviews attraction={attraction} />
          </div>
          <aside style={ds.sideCol}>
            <BookingBox attraction={attraction} />
            <QuickInfoSide attraction={attraction} />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
