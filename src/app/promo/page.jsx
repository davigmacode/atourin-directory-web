"use client";

import React, { useState, useMemo } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { pr } from "@/styles/promo-styles";
import { PROMOS } from "@/data/promo-data";

/* ── Sub-components ── */
import PromoHero from "./_components/PromoHero";
import PromoCats from "./_components/PromoCats";
import PromoGrid from "./_components/PromoGrid";
import PromoModal from "./_components/PromoModal";

export default function PromoPage() {
  const [cat, setCat] = useState("semua");
  const [q, setQ] = useState("");
  const [openPromo, setOpenPromo] = useState(null);

  const filtered = useMemo(() => {
    let list = cat === "semua" ? PROMOS : PROMOS.filter((p) => p.cat === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => (p.title + p.desc + p.code).toLowerCase().includes(s));
    }
    return list;
  }, [cat, q]);

  return (
    <div data-screen-label="Promo" style={pr.page}>
      <TopNav active="Pesan" />

      <style>{`
        .atr-promo-card:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(31,27,51,0.12); }
        .atr-promo-cta:hover { background: var(--atr-purple); color: #fff; }
        .atr-cat-btn:hover { background: var(--atr-bg-soft); }
        .atr-hint:hover { background: rgba(255,255,255,0.3); }
        @media (max-width: 900px) {
          .sp-grid3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .sp-grid3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <PromoHero q={q} setQ={setQ} />

      {/* CATEGORY BAR */}
      <PromoCats cat={cat} setCat={setCat} />

      {/* GRID */}
      <PromoGrid cat={cat} filtered={filtered} onOpen={setOpenPromo} />

      {/* MODAL DETAL */}
      {openPromo && <PromoModal p={openPromo} onClose={() => setOpenPromo(null)} />}

      <SiteFooter />
    </div>
  );
}
