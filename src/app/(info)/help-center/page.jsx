"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { hc } from "@/styles/help-center-styles";

/* ── Sub-components ── */
import ListView from "./_components/ListView";
import CategoryView from "./_components/CategoryView";
import ArticleView from "./_components/ArticleView";

export default function HelpCenterPage() {
  const [view, setView] = useState("list");
  const [cat, setCat] = useState(null);
  const [art, setArt] = useState(null);
  const [q, setQ] = useState("");

  function onHome() {
    setView("list");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onCat(c) {
    setCat(c);
    setView("cat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onArt(a, c) {
    setArt(a);
    setCat(c);
    setView("article");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div data-screen-label={`Pusat Bantuan · ${view}`} style={hc.page}>
      <style>{`
        .hc-lift { transition: transform .15s, box-shadow .15s, border-color .15s; }
        .hc-lift:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(31,27,51,0.12); border-color: var(--atr-purple-light); }
        .hc-row:hover { background: var(--atr-bg-soft); }
        .hc-contact { margin-top: 76px; }
        @media (max-width: 920px) { .hc-contact { margin-top: 8px !important; } }
        .hc-chip:hover { background: rgba(255,255,255,0.28); }
        @media (max-width: 920px) {
          .hc-cat-grid { grid-template-columns: 1fr 1fr !important; }
          .hc-bottom { grid-template-columns: 1fr !important; }
          .hc-art-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .hc-cat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <TopNav active="" />

      {view === "list" && <ListView q={q} setQ={setQ} onCat={onCat} onArt={onArt} />}
      {view === "cat" && cat && (
        <div style={hc.body}>
          <CategoryView cat={cat} onHome={onHome} onArt={onArt} />
        </div>
      )}
      {view === "article" && art && (
        <div style={hc.body}>
          <ArticleView art={art} cat={cat} onHome={onHome} onCat={onCat} onArt={onArt} />
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
