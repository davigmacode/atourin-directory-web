"use client";

import React from "react";
import { hm } from "@/styles/home-styles";

export default function StatsBar({ stats = [] }) {
  return (
    <div style={hm.statsBar}>
      <div style={hm.statsCard}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ ...hm.statCell, ...(i === 0 ? { borderLeft: "none" } : {}) }}>
            <div style={hm.statVal}>{s.value}</div>
            <div style={hm.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
