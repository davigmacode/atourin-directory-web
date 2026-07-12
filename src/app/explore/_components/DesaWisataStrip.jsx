"use client";

import React from "react";
import ex from "@/styles/explore-styles";

export default function DesaWisataStrip({
  desaFeatured = [],
  isLoading = false,
}) {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={{ ...ex.eyebrow, color: "var(--atr-arti)" }}>
            {"\uD83C\uDF3F"} Sustainable tourism
          </div>
          <h2 style={ex.secTitle}>Desa wisata unggulan</h2>
        </div>
        <a href="/" style={ex.viewAll}>
          Lihat semua desa wisata {"\u2192"}
        </a>
      </div>
      <div style={ex.desaGrid}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={ex.desaCard}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    background: "var(--atr-outline)",
                  }}
                />
                <div style={ex.desaBody}>
                  <div
                    style={{
                      height: 11,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "35%",
                    }}
                  />
                  <div
                    style={{
                      height: 16,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "70%",
                      marginTop: 8,
                    }}
                  />
                  <div
                    style={{
                      height: 12,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "50%",
                      marginTop: 4,
                    }}
                  />
                </div>
              </div>
            ))
          : desaFeatured.map((d) => (
              <article key={d.name} style={ex.desaCard}>
                <img src={d.img} alt="" style={ex.desaImg} />
                <div style={ex.desaBody}>
                  <span style={ex.desaTag}>{d.tag}</span>
                  <div style={ex.desaName}>{d.name}</div>
                  <div style={ex.desaMeta}>
                    {d.province} · {d.reviews} reviews
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
}
