"use client";

import React from "react";
import { sx } from "@/styles/campaign-styles";
import { CAMPAIGNS } from "@/data/campaign-data";

export default function CampaignGrid() {
  return (
    <div style={sx.grid2} className="sp-grid2">
      {CAMPAIGNS.map((c) => (
        <div key={c.t} style={{ ...sx.card, overflow: "hidden" }} className="sp-lift">
          <div style={{ position: "relative", height: 200 }}>
            <img
              src={c.img}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.opacity = 0;
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 14,
                bottom: 14,
                background: "rgba(255,255,255,0.92)",
                color: c.c,
                fontSize: 12,
                fontWeight: 800,
                padding: "5px 12px",
                borderRadius: 999,
              }}
            >
              {c.tag}
            </span>
          </div>
          <div style={{ padding: 22 }}>
            <div style={{ fontSize: 19, fontWeight: 700 }}>{c.t}</div>
            <div style={{ fontSize: 14, color: "var(--atr-text-muted)", marginTop: 8, lineHeight: 1.55 }}>
              {c.d}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
