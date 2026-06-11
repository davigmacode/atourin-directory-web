"use client";

import React from "react";
import ex from "@/styles/explore-styles";

export default function IslandTiles({ islands = [], isLoading = false }) {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{"\uD83D\uDDFA"} Pilih region</div>
          <h2 style={ex.secTitle}>Jelajahi per pulau</h2>
        </div>
      </div>
      <div style={ex.islandGrid}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  ...ex.islandTile,
                  background: "var(--atr-outline)",
                  gridRow: i === 0 ? "span 2" : undefined,
                }}
              />
            ))
          : islands.map((isl, i) => (
              <a
                key={isl.name}
                href="/"
                style={{
                  ...ex.islandTile,
                  ...(i === 0 ? ex.islandTileBig : {}),
                }}
              >
                <img src={isl.img} alt="" style={ex.islandImg} />
                <div style={ex.islandOverlay} />
                <div style={ex.islandBody}>
                  <div style={ex.islandName}>{isl.name}</div>
                  <div style={ex.islandMeta}>
                    {isl.provinces} provinsi {"\u2192"}
                  </div>
                </div>
              </a>
            ))}
      </div>
    </section>
  );
}
