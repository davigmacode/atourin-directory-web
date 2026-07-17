"use client";

import React from "react";
import { useParams } from "next/navigation";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { useTourGuide } from "@/lib/hooks/use-tour-guide";
import { ds } from "@/styles/detail-styles";

import DetailHero from "./_components/DetailHero";
import GuideAbout from "./_components/GuideAbout";
import GuideSpecialties from "./_components/GuideSpecialties";
import GuideExperience from "./_components/GuideExperience";
import GuidePackages from "./_components/GuidePackages";
import GuideGallery from "./_components/GuideGallery";
import GuideReviews from "./_components/GuideReviews";
import SimilarGuides from "./_components/SimilarGuides";
import BookGuideCard from "./_components/BookGuideCard";
import ResponseStatsCard from "./_components/ResponseStatsCard";
import CertsCard from "./_components/CertsCard";

function LoadingSkeleton() {
  const s = { background: "var(--atr-outline)", borderRadius: 8 };
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg-soft)" }}>
      <TopNav active="Explore" />
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

function ErrorState({ error, onRetry }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Explore" />
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          &#x26A0;&#xFE0F;
        </div>
        <h1
          style={{
            fontSize: 24,
            color: "var(--atr-text)",
            margin: "0 0 8px",
          }}
        >
          Gagal memuat data
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--atr-text-muted)",
            margin: "0 0 20px",
          }}
        >
          {error?.message || "Terjadi kesalahan. Silakan coba lagi."}
        </p>
        <button
          onClick={onRetry}
          style={{
            background: "var(--atr-purple)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "12px 32px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--atr-font-sans)",
          }}
        >
          Coba Lagi
        </button>
      </div>
      <SiteFooter />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Explore" />
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          padding: "24px 16px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          &#x1F50D;
        </div>
        <h1
          style={{
            fontSize: 24,
            color: "var(--atr-text)",
            margin: "0 0 8px",
          }}
        >
          Pemandu tidak ditemukan
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--atr-text-muted)",
            margin: 0,
          }}
        >
          Halaman yang Anda cari tidak tersedia atau telah dihapus.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}

export default function GuideDetailPage() {
  const { slug } = useParams();
  const { guide, isLoading, isError, error } = useTourGuide(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  if (!guide) return <NotFound />;

  const kota = guide.destination?.name || "Tour Guide";

  return (
    <div data-screen-label="Tour Guide Detail" style={{ minHeight: "100vh", background: "var(--atr-bg-soft)" }}>
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <div style={ds.crumbBar}>
          <div style={{ width: "100%" }}>
            <Breadcrumb
              items={["Jelajahi", "Pemandu Wisata", kota, guide.name]}
            />
          </div>
        </div>
        <div style={ds.containerWide}>
          <DetailHero guide={guide} />
        </div>
        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <GuideAbout guide={guide} />
            <GuideSpecialties guide={guide} />
            <GuideExperience guide={guide} />
            <GuidePackages guide={guide} />
            <GuideGallery guide={guide} />
            <GuideReviews guide={guide} />
            <SimilarGuides guide={guide} />
          </div>
          <aside style={ds.sideCol}>
            <BookGuideCard guide={guide} />
            <ResponseStatsCard guide={guide} />
            <CertsCard guide={guide} />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
