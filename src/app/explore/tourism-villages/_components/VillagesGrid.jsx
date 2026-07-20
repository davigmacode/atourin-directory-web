"use client";

import React from "react";
import { cardStyles } from "@/styles/attraction-styles";
import VillageCard from "./VillageCard";

function SkeletonCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...cardStyles.card, pointerEvents: "none" }}>
      <div
        style={{ ...cardStyles.cardImgWrap, background: "var(--atr-outline)" }}
      />
      <div style={cardStyles.cardBody}>
        <div>
          <div
            style={{
              ...skeletonBg,
              height: 18,
              width: "75%",
              marginBottom: 6,
            }}
          />
          <div style={{ ...skeletonBg, height: 12, width: "55%" }} />
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <div style={{ ...skeletonBg, height: 22, width: 65 }} />
          <div style={{ ...skeletonBg, height: 22, width: 75 }} />
          <div style={{ ...skeletonBg, height: 22, width: 60 }} />
        </div>
        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...skeletonBg, height: 14, width: 55 }} />
            <div style={{ ...skeletonBg, height: 12, width: 75 }} />
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                ...skeletonBg,
                height: 10,
                width: 45,
                marginLeft: "auto",
                marginBottom: 4,
              }}
            />
            <div
              style={{
                ...skeletonBg,
                height: 16,
                width: 85,
                marginLeft: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VillagesGrid({
  data,
  loadMore,
  hasMore,
  isLoading,
  isError,
  pagination,
}) {
  /* Loading state – skeleton cards */
  if (isLoading && (!data || data.length === 0)) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={cardStyles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  /* Error state */
  if (isError) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "var(--atr-text-muted)", fontSize: 15 }}>
            Gagal memuat data desa wisata. Silakan coba lagi.
          </p>
        </div>
      </section>
    );
  }

  /* Empty state */
  if (!data || data.length === 0) {
    return (
      <section style={cardStyles.gridSection}>
        <div style={cardStyles.gridHeader}>
          <div>
            <div style={cardStyles.eyebrow}>
              {"\uD83C\uDFE0"} Direktori desa wisata
            </div>
            <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ color: "var(--atr-text-muted)", fontSize: 15 }}>
            Tidak ada desa wisata yang cocok dengan filter yang dipilih.
          </p>
        </div>
      </section>
    );
  }

  /* Normal grid */
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83C\uDFE0"} Direktori desa wisata
          </div>
          <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {data.map((v, i) => (
          <VillageCard key={v.id || i} {...v} />
        ))}
      </div>
      <div style={cardStyles.paginationRow}>
        {hasMore && (() => {
          const totalCount = pagination?.total || 0;
          const remaining = totalCount ? totalCount - data.length : 0;
          const nextLoadCount = remaining > 0 ? Math.min(12, remaining) : 12;
          return (
            <button
              style={cardStyles.loadMore}
              onClick={loadMore}
              disabled={isLoading}
            >
              {isLoading ? "Memuat\u2026" : `Muat ${nextLoadCount} desa wisata lagi`}
            </button>
          );
        })()}
        <div style={cardStyles.pageInfo}>
          Menampilkan {data.length}
          {pagination?.total ? ` dari ${pagination.total}` : ""}
        </div>
      </div>
    </section>
  );
}
