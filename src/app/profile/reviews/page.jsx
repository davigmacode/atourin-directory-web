"use client";

import React, { useState } from "react";
import { ps, revStyles } from "@/styles/profile-styles";
import { REVIEW_FILTERS, REVIEWS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

export default function MyReviewsPage() {
  const [filter, setFilter] = useState("Semua");
  const [sort, setSort] = useState("Terbaru");

  const list = REVIEWS.filter((r) => filter === "Semua" || (filter === "Ada Media" && r.media.length) || (filter === "Ada Komentar" && r.text));

  function handleHelpful(id) {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Ulasan ditandai sebagai membantu.");
    }
  }

  return (
    <div style={ps.panel}>
      <PanelHead title="Ulasan Anda" sub="Lihat dan kelola ulasan yang telah Anda berikan untuk berbagai aktivitas" />
      <div style={revStyles.toolbar}>
        <span style={revStyles.filterLabel}>Filter:</span>
        {REVIEW_FILTERS.map((f) => (
          <button key={f} style={{ ...revStyles.fchip, ...(f === filter ? revStyles.fchipOn : {}) }} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <div style={revStyles.sortWrap}>
          <span style={revStyles.filterLabel}>Urut:</span>
          <div style={{ ...ps.inputWrap, minWidth: 150 }}>
            <select style={{ ...ps.input, appearance: "none", paddingRight: 36, cursor: "pointer", background: "#fff" }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Rating Tertinggi</option>
            </select>
            <span style={ps.selectChevron}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          </div>
        </div>
      </div>

      {list.map((r) => (
        <div key={r.id} style={revStyles.card}>
          <img src={r.img} alt="" style={revStyles.thumb} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
          <div style={{ flex: 1 }}>
            <div style={revStyles.head}>
              <div>
                <div style={revStyles.prod}>{r.product}</div>
                <div style={revStyles.loc}>{PI.pin} {r.location}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 5, alignItems: "center" }}>
                  {["🧭", "⭐", "🌳"].map((b) => <span key={b} title="Lencana penulis" style={{ width: 20, height: 20, borderRadius: 999, background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{b}</span>)}
                  <span style={{ fontSize: 11, color: "var(--atr-text-muted)", marginLeft: 2 }}>Member Petualang</span>
                </div>
              </div>
              <span style={revStyles.ratingBadge}>{PI.star} {r.rating.toString().replace(".", ",")}</span>
            </div>
            <div style={revStyles.text}>{r.text}</div>
            {r.media.length > 0 && (
              <div style={revStyles.media}>
                {r.media.map((m, i) => <img key={i} src={m} alt="" style={revStyles.mediaImg} onError={(e) => { e.currentTarget.style.opacity = 0; }} />)}
              </div>
            )}
            <div style={revStyles.foot}>
              <span style={revStyles.date}>{r.date}</span>
              <button style={revStyles.helpful} onClick={() => handleHelpful(r.id)}>{PI.thumb} Membantu · {r.helpful}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
