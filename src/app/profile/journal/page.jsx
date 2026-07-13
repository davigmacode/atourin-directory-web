"use client";

import React, { useState } from "react";
import { ps } from "@/styles/profile-styles";
import { MY_JOURNALS, MOODS_W } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

export default function TripJournalPage() {
  const [tab, setTab] = useState("daftar");
  const [mood, setMood] = useState(0);
  const [privacy, setPrivacy] = useState("publik");

  function toast(msg) {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast(msg);
    }
  }

  return (
    <div style={ps.panel}>
      <PanelHead title="Trip Journal" sub="Dokumentasikan perjalananmu & bagikan sebagai story card." right={
        <div style={{ display: "flex", gap: 8 }}>
          {[["daftar", "Journal Saya"], ["editor", "Buat Baru"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ border: `1px solid ${tab === k ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: tab === k ? "var(--atr-purple)" : "#fff", color: tab === k ? "#fff" : "var(--atr-text)", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>{l}</button>
          ))}
        </div>
      } />

      {tab === "daftar" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {MY_JOURNALS.map((j, i) => (
            <div key={i} className="atr-ins-row" style={{ border: "1px solid var(--atr-outline)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "box-shadow .15s" }}>
              <div style={{ height: 140, background: `url(${j.cover}) center/cover`, position: "relative" }}>
                <span style={{ position: "absolute", top: 10, right: 10, fontSize: 11, fontWeight: 700, color: "#fff", background: "rgba(27,26,46,0.7)", padding: "4px 10px", borderRadius: 999 }}>{j.privacy}</span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700 }}>{j.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 4 }}>📍 {j.loc} · {j.days} hari{j.views ? ` · ${j.views} dilihat` : ""}</div>
              </div>
            </div>
          ))}
          <button onClick={() => setTab("editor")} className="atr-create-card" style={{ border: "2px dashed var(--atr-outline)", borderRadius: 16, minHeight: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "transparent", color: "var(--atr-text-muted)", fontFamily: "var(--atr-font-sans)" }}>
            <span style={{ width: 44, height: 44, borderRadius: 999, background: "var(--atr-purple-50)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{PI.plus}</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Buat Journal Baru</span>
          </button>
        </div>
      )}

      {tab === "editor" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 22, alignItems: "start" }}>
          {/* editor */}
          <div>
            <div style={{ height: 200, borderRadius: 16, background: "url(https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=70) center/cover", position: "relative", display: "flex", alignItems: "flex-end", padding: 18 }}>
              <button style={{ position: "absolute", top: 12, right: 12, border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", borderRadius: 999, padding: "8px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Ganti cover</button>
              <input defaultValue="Petualangan di Labuan Bajo" style={{ width: "100%", border: "none", background: "transparent", color: "#fff", fontFamily: "var(--atr-font-sans)", fontSize: 24, fontWeight: 800, outline: "none", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {[["privat", "Privat"], ["teman", "Teman saja"], ["publik", "Publik"]].map(([k, l]) => (
                <button key={k} onClick={() => setPrivacy(k)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1.5px solid ${privacy === k ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: privacy === k ? "var(--atr-purple-50)" : "#fff", color: privacy === k ? "var(--atr-purple)" : "var(--atr-text-muted)", fontFamily: "var(--atr-font-sans)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, margin: "20px 0 10px" }}>Hari 1 · Tiba di Labuan Bajo</div>
            <textarea rows={4} defaultValue="Sampai siang, langsung sewa kapal buat sunset di Bukit Sylvia. Langitnya pecah banget!" style={{ width: "100%", border: "1px solid var(--atr-outline)", borderRadius: 12, padding: 14, fontFamily: "var(--atr-font-sans)", fontSize: 14, lineHeight: 1.5, resize: "vertical", outline: "none", color: "var(--atr-text)" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {MOODS_W.map(([e, l], i) => (
                <button key={i} onClick={() => setMood(i)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `1.5px solid ${mood === i ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: mood === i ? "var(--atr-purple-50)" : "#fff", cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>
                  <div style={{ fontSize: 20 }}>{e}</div><div style={{ fontSize: 10.5, color: "var(--atr-text-muted)", marginTop: 2 }}>{l}</div>
                </button>
              ))}
            </div>
            <button onClick={() => toast('Entri dijadikan ulasan resmi (+50 poin)')} style={{ width: "100%", height: 44, marginTop: 14, border: "1px solid var(--atr-outline)", background: "#fff", color: "var(--atr-purple)", borderRadius: 12, fontFamily: "var(--atr-font-sans)", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>★ Jadikan entri ini Ulasan resmi</button>
            <button onClick={() => toast('Hari baru ditambahkan ke journal')} style={{ width: "100%", height: 46, marginTop: 14, border: "2px dashed var(--atr-purple-light)", background: "var(--atr-purple-50)", color: "var(--atr-purple)", borderRadius: 12, fontFamily: "var(--atr-font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>+ Tambah hari</button>
          </div>

          {/* story card preview */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--atr-text-muted)" }}>Pratinjau story card</div>
            <div style={{ width: 220, margin: "0 auto", aspectRatio: "9/16", borderRadius: 18, overflow: "hidden", position: "relative", boxShadow: "0 12px 30px rgba(27,26,46,0.2)" }}>
              <div style={{ position: "absolute", inset: 0, background: "url(https://images.unsplash.com/photo-1528127269322-539801943592?w=400&auto=format&fit=crop&q=70) center/cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 35%, rgba(27,26,46,0.9) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 18, color: "#fff" }}>
                <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.85, letterSpacing: "0.08em" }}>TRIP JOURNAL</div>
                <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15, marginTop: 4 }}>Petualangan di Labuan Bajo</div>
                <div style={{ fontSize: 11, opacity: 0.9, marginTop: 6 }}>NTT · 4 hari · Jul 2026</div>
                <div style={{ fontSize: 9, opacity: 0.7, marginTop: 10 }}>dibuat dengan Atourin</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
              {["9:16", "1:1", "16:9"].map((r, i) => <span key={r} style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? "#fff" : "var(--atr-text)", background: i === 0 ? "var(--atr-purple)" : "#fff", border: `1px solid ${i === 0 ? "var(--atr-purple)" : "var(--atr-outline)"}`, padding: "6px 12px", borderRadius: 999 }}>{r}</span>)}
            </div>
            <button onClick={() => toast('Story card diunduh (PNG)')} style={{ width: "100%", height: 48, marginTop: 14, border: "none", background: "var(--atr-purple)", color: "#fff", borderRadius: 12, fontFamily: "var(--atr-font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Download PNG</button>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "rgba(81,176,84,0.08)", borderRadius: 12, padding: "12px 14px", fontSize: 12.5, color: "#2A6B3B", lineHeight: 1.45, marginTop: 14 }}>
              <span>🏆</span><span>Journal publik pertama: +50 ATR Points. Yang dilihat 10+ orang: +25 poin.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
