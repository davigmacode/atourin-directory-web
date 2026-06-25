"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ex from "@/styles/explore-styles";

export default function ProvinceGrid({
  provinces = [],
  islands = [],
  isLoading = false,
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("alpha");
  const [island, setIsland] = useState("Semua");

  const list = islands.map((i) => i.name);
  const islandsAll = ["Semua", ...list];

  const filtered = provinces
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => island === "Semua" || p.island === island)
    .sort((a, b) =>
      sort === "alpha" ? a.name.localeCompare(b.name) : b.popular - a.popular,
    );

  function goToProvince(name) {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    router.push(`/destinations?province=${slug}`);
  }

  return (
    <section style={ex.section} id="provinces">
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{"\uD83D\uDCCD"} Pilih provinsi</div>
          <h2 style={ex.secTitle}>34 Provinsi di Indonesia</h2>
        </div>
        <div style={ex.provSortRow}>
          <button
            onClick={() => setSort("alpha")}
            style={{
              ...ex.sortToggle,
              ...(sort === "alpha" ? ex.sortToggleActive : {}),
            }}
          >
            Alfabetis
          </button>
          <button
            onClick={() => setSort("popular")}
            style={{
              ...ex.sortToggle,
              ...(sort === "popular" ? ex.sortToggleActive : {}),
            }}
          >
            Terpopuler
          </button>
        </div>
      </div>

      <div style={ex.provFilters}>
        <div style={ex.provSearchWrap}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="var(--atr-text-muted)"
              strokeWidth="1.8"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="var(--atr-text-muted)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            style={ex.provSearch}
            placeholder="Cari provinsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={ex.islandChips}>
          {islandsAll.map((i, idx) => (
            <button
              key={i}
              onClick={() => setIsland(idx)}
              style={{
                ...ex.islandChip,
                ...(island === idx ? ex.islandChipActive : {}),
              }}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div style={ex.provGrid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ ...ex.provCard, pointerEvents: "none" }}>
                <div
                  style={{
                    ...ex.provImgWrap,
                    background: "var(--atr-outline)",
                  }}
                />
                <div style={ex.provBody}>
                  <div
                    style={{
                      height: 16,
                      width: "60%",
                      background: "var(--atr-outline)",
                      borderRadius: 4,
                    }}
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <div
                      style={{
                        height: 12,
                        width: "30%",
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                      }}
                    />
                    <div
                      style={{
                        height: 12,
                        width: "25%",
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                      }}
                    />
                    <div
                      style={{
                        height: 12,
                        width: "25%",
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          : filtered.map((p) => {
              const slug = p.name
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-");
              return (
                <div
                  key={p.name}
                  onClick={() => goToProvince(p.name)}
                  style={{ ...ex.provCard, cursor: "pointer" }}
                >
                  <div style={ex.provImgWrap}>
                    <img src={p.img} alt="" style={ex.provImg} />
                    <span style={ex.provIslandBadge}>{p.island}</span>
                  </div>
                  <div style={ex.provBody}>
                    <div style={ex.provName}>{p.name}</div>
                    <div style={ex.provStats}>
                      <span>
                        <strong>{p.dest}</strong> destinasi
                      </span>
                      <span style={ex.provDot}>·</span>
                      <span>
                        <strong>{p.attr}</strong> atraksi
                      </span>
                      <span style={ex.provDot}>·</span>
                      <span>
                        <strong>{p.desa}</strong> desa
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {!isLoading && filtered.length === 0 && (
        <div style={ex.emptyState}>
          <div style={ex.emptyIcon}>{"\uD83D\uDD0D"}</div>
          <div style={ex.emptyTitle}>Tidak ada provinsi yang sesuai</div>
          <button
            onClick={() => {
              setSearch("");
              setIsland("Semua");
            }}
            style={ex.emptyBtn}
          >
            Reset filter
          </button>
        </div>
      )}
    </section>
  );
}
