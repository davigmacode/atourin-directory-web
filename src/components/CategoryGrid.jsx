"use client";

import React from "react";
import ex from "@/styles/explore-styles";

export default function CategoryGrid({ categories = [], isLoading = false }) {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{"\uD83C\uDFAF"} Berdasarkan kategori</div>
          <h2 style={ex.secTitle}>Apa yang kamu cari?</h2>
        </div>
      </div>
      <div style={ex.catGrid}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={ex.catCard}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    background: "var(--atr-outline)",
                  }}
                />
                <div
                  style={{
                    height: 13,
                    background: "var(--atr-outline)",
                    borderRadius: 6,
                    width: "60%",
                  }}
                />
              </div>
            ))
          : categories.map((c) => (
              <a key={c.name} href="/" style={ex.catCard}>
                <div style={{ ...ex.catIcon, background: c.color }}>
                  {c.icon}
                </div>
                <div style={ex.catName}>{c.name}</div>
              </a>
            ))}
      </div>
    </section>
  );
}
