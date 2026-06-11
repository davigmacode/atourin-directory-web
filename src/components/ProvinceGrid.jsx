"use client";

import React, { useState } from "react";
import ex from "@/styles/explore-styles";

export default function ProvinceGrid({
  provinces = [],
  islands = [],
  isLoading = false,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("alpha");
  const [island, setIsland] = useState("Semua");
  const filtered = provinces
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => island === "Semua" || p.island === island)
    .sort((a, b) =>
      sort === "alpha" ? a.name.localeCompare(b.name) : b.popular - a.popular,
    );
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="var(--atr-text-muted)"
              strokeWidth="2"
            />
            <path
              d="M20 20l-3.5-3.5"
              stroke="var(--atr-text-muted)"
              strokeWidth="2"
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
          {["Semua", ...islands.map((i) => i.name)].map((i) => (
            <button
              key={i}
              onClick={() => setIsland(i)}
              style={{
                ...ex.islandChip,
                ...(island === i ? ex.islandChipActive : {}),
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
              <div key={i} style={ex.provCard}>
                <div
                  style={{
                    ...ex.provImgWrap,
                    background: "var(--atr-outline)",
                  }}
                />
                <div style={ex.provBody}>
                  <div
                    style={{
                      height: 14,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "60%",
                    }}
                  />
                  <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                    <div
                      style={{
                        height: 11,
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                        width: "30%",
                      }}
                    />
                    <div
                      style={{
                        height: 11,
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                        width: "25%",
                      }}
                    />
                    <div
                      style={{
                        height: 11,
                        background: "var(--atr-outline)",
                        borderRadius: 4,
                        width: "25%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          : filtered.map((p) => (
              <a key={p.name} href="/" style={ex.provCard}>
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
              </a>
            ))}
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
