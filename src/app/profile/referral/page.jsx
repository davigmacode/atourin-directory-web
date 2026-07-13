"use client";

import React, { useState } from "react";
import { ps } from "@/styles/profile-styles";
import { REF_CODE, REF_FRIENDS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

function refBadge(s) {
  const map = {
    reward: { t: "Reward diberikan", c: "var(--atr-arti)", b: "rgba(81,176,84,0.14)" },
    pending: { t: "Menunggu transaksi", c: "#9A6A00", b: "rgba(255,196,66,0.2)" },
    daftar: { t: "Terdaftar", c: "var(--atr-purple)", b: "var(--atr-purple-50)" },
  }[s];
  return <span style={{ fontSize: 12, fontWeight: 700, color: map.c, background: map.b, padding: "3px 11px", borderRadius: 999, whiteSpace: "nowrap" }}>{map.t}</span>;
}

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const total = REF_FRIENDS.reduce((a, f) => a + f.reward, 0);

  function copy(text) {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const shareBtn = (label, color, icon) => (
    <button onClick={() => {
      if (typeof window !== "undefined" && window.atrToast) {
        window.atrToast(label === "Buat Story Card" ? "Menyiapkan story card referral…" : "Membagikan kode via " + label);
      }
    }} className="atr-ins-row" style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid var(--atr-outline)", background: "#fff", color, borderRadius: 12, padding: "11px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>{icon}{label}</button>
  );

  return (
    <div style={ps.panel}>
      <PanelHead title="Undang Teman" sub="Ajak teman bergabung, kalian berdua dapat reward ATR Points." />

      {/* hero */}
      <div style={{ borderRadius: 18, overflow: "hidden", background: "linear-gradient(135deg,#7068D5 0%,#9B6AAB 100%)", color: "#fff", padding: "28px 30px", display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>Ajak teman, jelajahi bersama!</div>
          <div style={{ fontSize: 14.5, opacity: 0.92, marginTop: 8, lineHeight: 1.55, maxWidth: 420 }}>Setiap teman yang mendaftar dengan kodemu dan bertransaksi pertama: <b>kamu dapat 300 poin</b>, mereka dapat <b>100 poin</b>.</div>
        </div>
        <div style={{ flex: "0 0 auto", width: 90, height: 90, borderRadius: 24, background: "rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>🎁</div>
      </div>

      {/* code + total */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginTop: 20 }}>
        <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 16, padding: 22 }}>
          <div style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>Kode referral kamu</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "10px 0 16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.06em", color: "var(--atr-purple)", fontFamily: "ui-monospace,Menlo,monospace" }}>{REF_CODE}</span>
            <button onClick={() => copy(REF_CODE)} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid var(--atr-purple)", background: copied ? "var(--atr-purple)" : "#fff", color: copied ? "#fff" : "var(--atr-purple)", borderRadius: 10, padding: "9px 16px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>{copied ? PI.check : PI.book}{copied ? "Tersalin" : "Salin Kode"}</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--atr-bg-soft)", borderRadius: 10, padding: "11px 14px" }}>
            <span style={{ flex: 1, fontSize: 13, color: "var(--atr-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>atourin.com/join?ref={REF_CODE}</span>
            <button onClick={() => copy(`https://atourin.com/join?ref=${REF_CODE}`)} style={{ border: "none", background: "none", color: "var(--atr-purple)", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Salin Link</button>
          </div>
        </div>
        <div style={{ border: "1px solid var(--atr-purple-light)", background: "var(--atr-purple-50)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>Total reward referral</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "var(--atr-purple)", marginTop: 4 }}>{total}</div>
          <div style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>ATR Points terkumpul</div>
        </div>
      </div>

      {/* share row */}
      <div style={{ marginTop: 22 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Bagikan lewat</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {shareBtn("WhatsApp", "#25A35A", <span style={{ fontSize: 16 }}>🟢</span>)}
          {shareBtn("Instagram Story", "#E1306C", <span style={{ fontSize: 16 }}>📸</span>)}
          {shareBtn("Buat Story Card", "var(--atr-purple)", PI.sparkle)}
        </div>
      </div>

      {/* reward structure */}
      <div style={{ marginTop: 26 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Cara kerja reward</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { n: "1", t: "Bagikan kode", d: "Kirim kode atau link ke teman lewat WhatsApp, IG, atau salin link." },
            { n: "2", t: "Teman daftar", d: "Mereka daftar dengan kodemu & dapat 100 poin welcome bonus." },
            { n: "3", t: "Transaksi pertama", d: "Saat transaksi pertama ≥ Rp 50rb selesai, kamu dapat 300 poin." },
          ].map((s) => (
            <div key={s.n} style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: 18 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: "var(--atr-purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15 }}>{s.n}</span>
              <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 12 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* progress tracker */}
      <div style={{ marginTop: 26 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Teman yang kamu undang</div>
        <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, overflow: "hidden" }}>
          {REF_FRIENDS.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderTop: i ? "1px solid var(--atr-outline)" : "none" }}>
              <span style={{ width: 40, height: 40, borderRadius: 999, background: "var(--atr-purple-50)", color: "var(--atr-purple)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>{f.name[0].toUpperCase()}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--atr-text)" }}>{f.name}</div>
                <div style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 }}>{f.date}</div>
              </div>
              {refBadge(f.status)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
