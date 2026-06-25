"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ex from "@/styles/explore-styles";

export default function IslandTiles({ islands = [], isLoading = false }) {
  const router = useRouter();
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
              <div
                key={isl.name}
                onClick={() => {
                  const slug = isl.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .replace(/\s+/g, "-");
                  router.push(`/destinations?island=${slug}`);
                }}
                style={{
                  ...ex.islandTile,
                  ...(i === 0 ? ex.islandTileBig : {}),
                  cursor: "pointer",
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
              </div>
            ))}
      </div>
    </section>
  );
}
