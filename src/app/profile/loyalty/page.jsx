"use client";

import React, { useState } from "react";
import { ps } from "@/styles/profile-styles";
import { LOYW_TIERS, LOYW } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

export default function LoyaltyRewardPage() {
  const [tab, setTab] = useState("Reward");
  const [points, setPoints] = useState(LOYW.points);
  const [confirm, setConfirm] = useState(null);
  const [redeemed, setRedeemed] = useState(null);
  const [board, setBoard] = useState("Nasional");

  const pct = Math.min(100, Math.round(((LOYW.cumulative - 1000) / 4000) * 100));

  function redeem(r) {
    if (points < r.cost) {
      if (typeof window !== "undefined" && window.atrToast) {
        window.atrToast("Poin belum cukup");
      }
      return;
    }
    setPoints((p) => p - r.cost);
    setConfirm(null);
    setRedeemed({
      reward: r,
      code: "ATR-" + Math.random().toString(36).slice(2, 8).toUpperCase()
    });
  }

  const cats = Object.keys(LOYW.rewards);
  const [cat, setCat] = useState(cats[0]);

  return (
    <div style={ps.panel}>
      <PanelHead title="Poin & Reward" sub="Kumpulkan ATR Points, naik tier, dan tukar jadi reward." />

      {/* tier hero */}
      <div style={{ borderRadius: 18, background: "linear-gradient(135deg,#7068D5 0%,#9B6AAB 100%)", color: "#fff", padding: "24px 28px", display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ fontSize: 13, opacity: 0.85 }}>Poin tersedia</div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{points.toLocaleString("id-ID")}</div>
          <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.25)", overflow: "hidden", marginTop: 14 }}><div style={{ width: pct + "%", height: "100%", background: "#fff" }} /></div>
          <div style={{ fontSize: 12.5, opacity: 0.92, marginTop: 7 }}><b>{LOYW.toNext.toLocaleString("id-ID")} poin</b> lagi → {LOYW.next} · total terkumpul {LOYW.cumulative.toLocaleString("id-ID")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700 }}>⚡ {LOYW.tier}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.18)", padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>🔥 Streak {LOYW.streak} hari</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,196,66,0.28)", padding: "6px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 }}>⏳ {LOYW.expiring} poin kedaluwarsa 30 hari</span>
        </div>
      </div>

      {/* tier benefits */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 16 }}>
        {LOYW_TIERS.map((t) => {
          const on = t.key === LOYW.tier;
          return (
            <div key={t.key} style={{ border: `1.5px solid ${on ? t.color : "var(--atr-outline)"}`, borderRadius: 14, padding: 14, background: on ? "rgba(81,176,84,0.05)" : "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}><span>{t.icon}</span><b style={{ fontSize: 13.5 }}>{t.key}</b></div>
              <div style={{ fontSize: 11, color: "var(--atr-text-muted)", marginBottom: 8 }}>Mulai {t.min.toLocaleString("id-ID")} poin{on ? " · kamu di sini" : ""}</div>
              {t.perks.map((p) => <div key={p} style={{ fontSize: 11.5, marginBottom: 4, display: "flex", gap: 6 }}><span style={{ color: t.color }}>✓</span>{p}</div>)}
            </div>
          );
        })}
      </div>

      {/* tabs */}
      <div style={ps.tabBar}>
        {["Reward", "Misi", "Riwayat", "Lencana", "Papan Peringkat"].map((t) => (
          <button key={t} style={{ ...ps.tab, ...(t === tab ? ps.tabActive : {}) }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        {tab === "Reward" && (
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {cats.map((c) => <button key={c} onClick={() => setCat(c)} style={{ padding: "8px 15px", borderRadius: 999, border: `1.5px solid ${c === cat ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: c === cat ? "var(--atr-purple-50)" : "#fff", color: c === cat ? "var(--atr-purple)" : "var(--atr-text)", fontFamily: "var(--atr-font-sans)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{c}</button>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
              {LOYW.rewards[cat].map((r) => {
                const afford = points >= r.cost;
                return (
                  <div key={r.id} style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: 16, background: "#fff", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 30 }}>{r.icon}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 8, flex: 1 }}>{r.name}</div>
                    {r.stok && <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", marginTop: 3 }}>{r.stok}</div>}
                    <button onClick={() => afford ? setConfirm(r) : (typeof window !== "undefined" && window.atrToast && window.atrToast("Poin belum cukup"))} style={{ marginTop: 12, height: 40, borderRadius: 10, border: "none", background: afford ? "var(--atr-purple-50)" : "var(--atr-bg-soft)", color: afford ? "var(--atr-purple)" : "var(--atr-text-faint)", fontFamily: "var(--atr-font-sans)", fontSize: 13.5, fontWeight: 800, cursor: "pointer" }}>{r.cost.toLocaleString("id-ID")} poin</button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "Misi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span style={{ fontSize: 16 }}>🔥</span><b style={{ fontSize: 14.5 }}>Streak {LOYW.streak} hari</b><span style={{ marginLeft: "auto", fontSize: 12, color: "var(--atr-text-muted)" }}>+5 poin/hari · bonus hari ke-7</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(30,1fr)", gap: 4 }}>
                {Array.from({ length: 30 }).map((_, i) => { const on = i < LOYW.streak; const ms = i === 6 || i === 13 || i === 29; return <span key={i} title={"Hari " + (i + 1)} style={{ aspectRatio: "1", borderRadius: 4, background: on ? "var(--atr-purple)" : "var(--atr-bg-soft)", border: ms ? "1.5px solid var(--atr-yellow)" : "1px solid var(--atr-outline)" }}/>; })}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", marginTop: 8 }}>Milestone (kotak kuning): hari 7 (+50) · 14 (+100) · 30 (+250). 1 Streak Shield gratis/bulan.</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>Challenge mingguan · selesaikan untuk bonus poin. Reset tiap Senin.</div>
            {LOYW.missions.map((m) => {
              const done = m.prog >= m.total;
              return (
                <div key={m.id} style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--atr-purple)", background: "var(--atr-purple-50)", padding: "3px 9px", borderRadius: 999 }}>{m.type}</span>
                    <div style={{ flex: 1, fontSize: 14.5, fontWeight: 700 }}>{m.title}</div>
                    <b style={{ fontSize: 13.5, color: "var(--atr-purple)" }}>+{m.reward}</b>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                    <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--atr-outline)", overflow: "hidden" }}><div style={{ width: (m.prog / m.total * 100) + "%", height: "100%", background: done ? "var(--atr-arti)" : "var(--atr-purple)" }} /></div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--atr-text-muted)" }}>{done ? "Selesai ✓" : m.prog + "/" + m.total}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Riwayat" && (
          <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, overflow: "hidden" }}>
            {LOYW.history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderTop: i ? "1px solid var(--atr-outline)" : "none" }}>
                <span style={{ width: 38, height: 38, borderRadius: 10, background: h.delta > 0 ? "rgba(81,176,84,0.14)" : "rgba(244,98,99,0.12)", color: h.delta > 0 ? "var(--atr-arti)" : "#B23133", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>{h.delta > 0 ? "+" : "−"}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{h.label}</div><div style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 1 }}>{h.kind} · {h.date}</div></div>
                <b style={{ fontSize: 15, color: h.delta > 0 ? "var(--atr-arti)" : "#B23133" }}>{h.delta > 0 ? "+" : ""}{h.delta}</b>
              </div>
            ))}
          </div>
        )}

        {tab === "Lencana" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {LOYW.badges.map((b, i) => (
              <div key={i} style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "20px 10px", textAlign: "center", background: "#fff", opacity: b.earned ? 1 : 0.5 }}>
                <div style={{ fontSize: 34, filter: b.earned ? "none" : "grayscale(1)" }}>{b.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>{b.name}</div>
                <div style={{ fontSize: 10.5, color: b.earned ? "var(--atr-arti)" : "var(--atr-text-faint)", marginTop: 3 }}>{b.earned ? "Diraih" : "Terkunci"}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "Papan Peringkat" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {["Nasional", "Provinsimu"].map((s) => <button key={s} onClick={() => setBoard(s)} style={{ padding: "8px 16px", borderRadius: 999, border: `1.5px solid ${board === s ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: board === s ? "var(--atr-purple-50)" : "#fff", color: board === s ? "var(--atr-purple)" : "var(--atr-text)", fontFamily: "var(--atr-font-sans)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{s}</button>)}
            </div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginBottom: 12 }}>Top traveler bulan ini ({board === "Nasional" ? "seluruh Indonesia" : "DKI Jakarta"}). Bisa disembunyikan di pengaturan privasi.</div>
            <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, overflow: "hidden" }}>
              {(board === "Nasional" ? LOYW.leaderboard : [{ rank: 1, name: "Aulia Priyono", pts: 3450, me: true }, { rank: 2, name: "Bayu P.", pts: 2980 }, { rank: 3, name: "Sinta R.", pts: 2410 }]).map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderTop: i ? "1px solid var(--atr-outline)" : "none", background: l.me ? "var(--atr-purple-50)" : "#fff" }}>
                  <span style={{ width: 28, fontSize: 15, fontWeight: 800, color: l.rank <= 3 ? "var(--atr-purple)" : "var(--atr-text-muted)" }}>{l.rank}</span>
                  <span style={{ width: 36, height: 36, borderRadius: 999, background: "var(--atr-purple-50)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{l.name[0]}</span>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 700 }}>{l.name}{l.me && " (kamu)"}</div>
                  <b style={{ fontSize: 14 }}>{l.pts.toLocaleString("id-ID")}</b>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {confirm && (
        <div onClick={() => setConfirm(null)} style={{ position: "fixed", inset: 0, background: "rgba(20,18,40,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", width: "100%", maxWidth: 420, borderRadius: 20, padding: 24, textAlign: "center", fontFamily: "var(--atr-font-sans)" }}>
            <div style={{ fontSize: 36 }}>{confirm.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, marginTop: 8 }}>Tukar {confirm.name}?</div>
            <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 6 }}>Poin berkurang <b>{confirm.cost.toLocaleString("id-ID")}</b> · sisa {(points - confirm.cost).toLocaleString("id-ID")}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setConfirm(null)} style={{ flex: 1, height: 48, border: "1px solid var(--atr-outline)", background: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Batal</button>
              <button onClick={() => redeem(confirm)} style={{ flex: 1.3, height: 48, border: "none", background: "var(--atr-purple)", color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Tukar Sekarang</button>
            </div>
          </div>
        </div>
      )}

      {redeemed && (
        <div onClick={() => setRedeemed(null)} style={{ position: "fixed", inset: 0, background: "rgba(20,18,40,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", width: "100%", maxWidth: 420, borderRadius: 20, padding: 24, textAlign: "center", fontFamily: "var(--atr-font-sans)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(81,176,84,0.14)", color: "var(--atr-arti)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto" }}>✓</div>
            <div style={{ fontSize: 19, fontWeight: 800, marginTop: 12 }}>Penukaran berhasil!</div>
            <div style={{ fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 6 }}>{redeemed.reward.name} · −{redeemed.reward.cost.toLocaleString("id-ID")} poin</div>
            <div style={{ border: "1.5px dashed var(--atr-purple-light)", background: "var(--atr-purple-50)", borderRadius: 12, padding: 16, marginTop: 16 }}>
              <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>Kode voucher</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.08em", color: "var(--atr-purple)", fontFamily: "ui-monospace,Menlo,monospace", marginTop: 4 }}>{redeemed.code}</div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => {
                if (typeof window !== "undefined" && window.atrToast) {
                  window.atrToast("Kode voucher disalin");
                }
              }} style={{ flex: 1, height: 48, border: "1px solid var(--atr-outline)", background: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Salin Kode</button>
              <button onClick={() => setRedeemed(null)} style={{ flex: 1.3, height: 48, border: "none", background: "var(--atr-purple)", color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Selesai</button>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--atr-text-faint)", marginTop: 12 }}>Voucher tersimpan di Promo · Voucher saya.</div>
          </div>
        </div>
      )}
    </div>
  );
}
