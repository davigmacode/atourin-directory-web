"use client";

import React from "react";
import ex from "@/styles/explore-styles";

const FALLBACK = [
  { n: "34", l: "Provinsi" },
  { n: "486", l: "Destinasi" },
  { n: "5,240", l: "Atraksi" },
  { n: "892", l: "Desa Wisata" },
  { n: "1,260", l: "Pemandu" },
];

export default function StatsBanner({ stats, isLoading }) {
  const items =
    stats && !isLoading
      ? [
          { n: stats.provinces || "34", l: "Provinsi" },
          { n: stats.destinations || "180+", l: "Destinasi" },
          { n: stats.attractions || "1.2K+", l: "Atraksi" },
          { n: stats.villages || "320+", l: "Desa Wisata" },
          { n: stats.guides || "640+", l: "Pemandu" },
        ]
      : FALLBACK;

  return (
    <section style={ex.stats}>
      <div style={ex.statsInner}>
        {items.map((s) => (
          <div key={s.l} style={ex.statCell}>
            <div style={ex.statN}>{s.n}</div>
            <div style={ex.statL}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
