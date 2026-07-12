"use client";

import React from "react";
import { pesanStyles } from "@/styles/pesan-styles";

export default function CategoryRail({ items = [], onPick }) {
  return (
    <section style={pesanStyles.catRail}>
      <div style={pesanStyles.catRailHeader}>
        <h2 style={pesanStyles.catRailTitle}>Cari berdasarkan kategori</h2>
        <button style={pesanStyles.catRailMore}>Lihat semua →</button>
      </div>
      <div style={pesanStyles.catRailGrid}>
        {items.map((c, i) => (
          <button key={i} style={pesanStyles.catTile} onClick={() => onPick && onPick(c.label)}>
            <div style={{ ...pesanStyles.catTileIconWrap, background: c.bg }}>
              <span style={pesanStyles.catTileEmoji}>{c.icon}</span>
            </div>
            <div style={pesanStyles.catTileLabel}>{c.label}</div>
            <div style={pesanStyles.catTileCount}>{c.count}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
