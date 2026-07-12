"use client";

import React, { useMemo } from "react";
import { hc } from "@/styles/help-center-styles";
import { HC, HELP_CATS, QUICK_TASKS, POPULAR_Q } from "@/data/help-center-data";

export default function ListView({ q, setQ, onCat, onArt }) {
  const allArticles = useMemo(() => {
    return HELP_CATS.flatMap((c) => c.articles.map((a) => ({ ...a, cat: c })));
  }, []);

  const trimmed = q.trim().toLowerCase();
  const matches = useMemo(() => {
    return trimmed.length >= 2
      ? allArticles.filter((a) => (a.q + a.intro).toLowerCase().includes(trimmed))
      : [];
  }, [trimmed, allArticles]);

  return (
    <div>
      {/* hero */}
      <section style={hc.hero}>
        <div style={hc.heroGlow} />
        <div style={hc.heroInner}>
          <div style={hc.heroPin}>
            <span style={{ fontSize: 72 }}>🙋‍♂️</span>
          </div>
          <h1 style={hc.heroTitle}>Ada yang bisa kami bantu?</h1>
          <p style={hc.heroSub}>Cari jawaban cepat, lacak pesanan, atau hubungi tim kami.</p>
          <div style={hc.searchWrap}>
            <span style={hc.searchIcon}>{HC.search}</span>
            <input
              style={hc.searchInput}
              placeholder="Cari pertanyaan, mis. 'cara refund'…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <button style={hc.searchClear} onClick={() => setQ("")}>
                ✕
              </button>
            )}
          </div>
          {!trimmed && (
            <div style={hc.popQ}>
              <span style={hc.popQLabel}>Populer:</span>
              {POPULAR_Q.map((p) => (
                <button key={p} style={hc.popQChip} className="hc-chip" onClick={() => setQ(p)}>
                  {p}
                </button>
              ))}
            </div>
          )}
          {/* live results */}
          {trimmed.length >= 2 && (
            <div style={hc.searchResults}>
              {matches.length > 0 ? (
                matches.slice(0, 6).map((a) => (
                  <button key={a.q} style={hc.srItem} className="hc-lift" onClick={() => onArt(a, a.cat)}>
                    <span style={{ ...hc.srIcon, color: a.cat.tint, background: a.cat.tint + "18" }}>
                      {HC[a.cat.icon]}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <span style={hc.srTitle}>{a.q}</span>
                      <span style={hc.srCat}>{a.cat.t}</span>
                    </span>
                    {HC.chev}
                  </button>
                ))
              ) : (
                <div style={hc.srEmpty}>Tidak ada hasil untuk “{q}”. Coba kata kunci lain atau hubungi CS.</div>
              )}
            </div>
          )}
        </div>
      </section>

      <div style={hc.body}>
        {/* quick tasks */}
        <div style={hc.tasks}>
          {QUICK_TASKS.map((t) => (
            <button
              key={t.t}
              onClick={() => alert(`Membuka ${t.t}`)}
              style={{ ...hc.task, border: `1px solid var(--atr-outline)`, outline: "none", cursor: "pointer", textAlign: "left" }}
              className="hc-lift"
            >
              <span style={{ ...hc.taskIcon, color: t.tint, background: t.tint + "18" }}>{HC[t.icon]}</span>
              <div>
                <div style={hc.taskTitle}>{t.t}</div>
                <div style={hc.taskDesc}>{t.d}</div>
              </div>
              <span style={hc.taskChev}>{HC.chev}</span>
            </button>
          ))}
        </div>

        {/* categories */}
        <div style={hc.secTitle}>Telusuri berdasarkan topik</div>
        <div style={hc.catGrid} className="hc-cat-grid">
          {HELP_CATS.map((c) => (
            <button key={c.id} style={hc.catTile} className="hc-lift" onClick={() => onCat(c)}>
              <span style={{ ...hc.catTileIcon, color: c.tint, background: c.tint + "18" }}>{HC[c.icon]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={hc.catTileTitle}>{c.t}</div>
                <div style={hc.catTileDesc}>{c.desc}</div>
                <div style={hc.catTileCount}>{c.articles.length} artikel →</div>
              </div>
            </button>
          ))}
        </div>

        {/* popular + contact band */}
        <div style={hc.bottomGrid} className="hc-bottom">
          <div>
            <div style={hc.secTitle}>Pertanyaan populer</div>
            <div style={hc.card}>
              {HELP_CATS.flatMap((c) => c.articles.map((a) => ({ ...a, cat: c })))
                .slice(0, 6)
                .map((a, i) => (
                  <button
                    key={a.q}
                    style={{ ...hc.popRow, ...(i === 0 ? { borderTop: "none" } : {}) }}
                    className="hc-row"
                    onClick={() => onArt(a, a.cat)}
                  >
                    <span style={hc.popRowText}>{a.q}</span>
                    {HC.chev}
                  </button>
                ))}
            </div>
          </div>
          <div style={{ ...hc.contactBand, margin: "20px 0px 0px" }} className="hc-contact">
            <div style={hc.contactTitle}>Belum menemukan jawaban?</div>
            <div style={hc.contactDesc}>Tim Atourin siap membantu lewat kanal favoritmu.</div>
            <button
              onClick={() => alert("Menghubungi CS WhatsApp")}
              style={{ ...hc.contactWa, border: "none", cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}
            >
              {HC.chat} Chat WhatsApp
            </button>
            <button
              onClick={() => alert("Mengirimkan email bantuan")}
              style={{ ...hc.contactAlt, background: "none", border: "none", cursor: "pointer", width: "100%", fontFamily: "var(--atr-font-sans)" }}
            >
              Email / kanal lainnya →
            </button>
            <div style={hc.contactHours}>⚡ Respon &lt; 2 jam · Senin–Jumat 09.00–17.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
