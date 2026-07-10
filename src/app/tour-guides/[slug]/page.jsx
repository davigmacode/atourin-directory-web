"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { TopNav, SiteFooter } from "@/components/layout";
import { useGuide } from "@/lib/hooks/use-guide";

import DetailHero from "./_components/DetailHero";
import ActionBar from "./_components/ActionBar";
import BiographyTab from "./_components/BiographyTab";
import TripsTab from "./_components/TripsTab";
import ReviewsTab from "./_components/ReviewsTab";

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Tour Guide" />
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--atr-space-6) var(--atr-space-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--atr-space-5)",
            alignItems: "center",
            marginBottom: "var(--atr-space-6)",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "var(--atr-outline)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 28,
                width: "50%",
                borderRadius: "var(--atr-radius-md)",
                background: "var(--atr-outline)",
                marginBottom: "var(--atr-space-2)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                height: 18,
                width: "30%",
                borderRadius: "var(--atr-radius-md)",
                background: "var(--atr-outline)",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: 100,
            borderRadius: "var(--atr-radius-md)",
            background: "var(--atr-outline)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <SiteFooter />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Tour Guide" />
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          padding: "var(--atr-space-6) var(--atr-space-4)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: "var(--atr-space-4)" }}>
          &#x26A0;&#xFE0F;
        </div>
        <h1
          style={{
            fontSize: "var(--atr-fs-headline-md)",
            color: "var(--atr-text)",
            margin: "0 0 var(--atr-space-2)",
          }}
        >
          Gagal memuat data
        </h1>
        <p
          style={{
            fontSize: "var(--atr-fs-body-md)",
            color: "var(--atr-text-muted)",
            margin: "0 0 var(--atr-space-5)",
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
            borderRadius: "var(--atr-radius-pill)",
            padding: "12px 32px",
            fontSize: "var(--atr-fs-title-sm)",
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
      <TopNav active="Tour Guide" />
      <div
        style={{
          maxWidth: 480,
          margin: "80px auto",
          padding: "var(--atr-space-6) var(--atr-space-4)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: "var(--atr-space-4)" }}>
          &#x1F50D;
        </div>
        <h1
          style={{
            fontSize: "var(--atr-fs-headline-md)",
            color: "var(--atr-text)",
            margin: "0 0 var(--atr-space-2)",
          }}
        >
          Pemandu tidak ditemukan
        </h1>
        <p
          style={{
            fontSize: "var(--atr-fs-body-md)",
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
  const { guide, isLoading, isError, error } = useGuide(slug);
  const [activeTab, setActiveTab] = useState("biography");

  if (isLoading) return <LoadingSkeleton />;
  if (isError)
    return (
      <ErrorState error={error} onRetry={() => window.location.reload()} />
    );
  if (!guide) return <NotFound />;

  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Tour Guide" />
      <main
        style={{
          maxWidth: 1376,
          margin: "0 auto",
          padding: "var(--atr-space-6) var(--atr-space-4)",
        }}
      >
        <DetailHero guide={guide} />
        <ActionBar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "biography" && <BiographyTab guide={guide} />}
        {activeTab === "trips" && <TripsTab guide={guide} />}
        {activeTab === "reviews" && <ReviewsTab guide={guide} />}
      </main>
      <SiteFooter />
    </div>
  );
}
