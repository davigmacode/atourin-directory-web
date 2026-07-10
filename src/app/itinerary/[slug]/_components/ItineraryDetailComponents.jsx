"use client";

import React from "react";
import { TopNav, SiteFooter } from "@/components/layout";

export function LoadingSkeleton() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Itinerary" />
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "var(--atr-space-6) var(--atr-space-4)",
        }}
      >
        <div
          style={{
            height: 280,
            borderRadius: "var(--atr-radius-lg)",
            background: "var(--atr-outline)",
            marginBottom: "var(--atr-space-5)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 32,
            width: "70%",
            borderRadius: "var(--atr-radius-md)",
            background: "var(--atr-outline)",
            marginBottom: "var(--atr-space-3)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 20,
            width: "30%",
            borderRadius: "var(--atr-radius-md)",
            background: "var(--atr-outline)",
            marginBottom: "var(--atr-space-4)",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 80,
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

export function ErrorState({ error, onRetry }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Itinerary" />
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

export function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--atr-bg)" }}>
      <TopNav active="Itinerary" />
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
          Itinerary tidak ditemukan
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

export function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: "var(--atr-bg-soft)",
        borderRadius: "var(--atr-radius-md)",
        padding: "var(--atr-space-4)",
      }}
    >
      <div
        style={{
          fontSize: "var(--atr-fs-label-sm)",
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 700,
          marginBottom: "var(--atr-space-1)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "var(--atr-fs-title-lg)",
          fontWeight: 700,
          color: "var(--atr-text)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function MetaChip({ label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: "var(--atr-radius-pill)",
        fontSize: "var(--atr-fs-label-sm)",
        fontWeight: 700,
        background: "var(--atr-bg-soft)",
        color: "var(--atr-text)",
        border: "1px solid var(--atr-outline)",
      }}
    >
      {label}
    </span>
  );
}
