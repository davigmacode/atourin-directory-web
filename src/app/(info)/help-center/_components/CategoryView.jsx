"use client";

import React from "react";
import { hc } from "@/styles/help-center-styles";
import { HC } from "@/data/help-center-data";
import Breadcrumb from "./Breadcrumb";

export default function CategoryView({ cat, onHome, onArt }) {
  return (
    <div style={hc.catWrap}>
      <Breadcrumb items={[{ label: "Pusat Bantuan", onClick: onHome }, { label: cat.t }]} />
      <div style={hc.catHeader}>
        <span style={{ ...hc.catHeaderIcon, color: cat.tint, background: cat.tint + "18" }}>
          {HC[cat.icon]}
        </span>
        <div>
          <h1 style={hc.catTitle}>{cat.t}</h1>
          <p style={hc.catDesc}>
            {cat.desc} · {cat.articles.length} artikel
          </p>
        </div>
      </div>
      <div style={hc.artList}>
        {cat.articles.map((a) => (
          <button key={a.q} style={hc.artRow} className="hc-lift" onClick={() => onArt(a, cat)}>
            <div style={{ minWidth: 0 }}>
              <div style={hc.artRowTitle}>{a.q}</div>
              <div style={hc.artRowSub}>{a.intro}</div>
            </div>
            <span style={hc.artRowChev}>{HC.chev}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
