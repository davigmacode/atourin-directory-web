"use client";

import React from "react";
import { ps } from "@/styles/profile-styles";
import { AFFW_LINKS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

const rpW = (n) => "Rp " + (n || 0).toLocaleString("id-ID");

export default function AffiliatePage() {
  const earn = { thisMonth: 1133000, pending: 312000, approved: 821000, paid: 4200000 };

  const Stat = ({ label, val, color, sub }) => (
    <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: color || "var(--atr-text)", marginTop: 4 }}>{rpW(val)}</div>
      {sub && <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={ps.panel}>
      <PanelHead title="Program Affiliate" sub="Promosikan produk Atourin, dapat komisi per transaksi via link-mu." />

      {/* hero earnings */}
      <div style={{ borderRadius: 18, background: "linear-gradient(135deg,#1B1A2E 0%,#4B3F8F 100%)", color: "#fff", padding: "26px 30px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px" }}>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Total komisi bulan ini</div>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>{rpW(earn.thisMonth)}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 700, color: "#7BE0A0", marginTop: 6 }}>▲ +30% vs bulan lalu</div>
        </div>
        <button onClick={() => {
          if (typeof window !== "undefined" && window.atrToast) {
            window.atrToast("Membuka katalog eksplorasi untuk menyalin tautan produk...");
          }
        }} style={{ border: "none", background: "rgba(255,255,255,0.16)", color: "#fff", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>+ Buat link produk baru</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 16 }}>
        <Stat label="Pending" val={earn.pending} color="#9A6A00" sub="Cair 14 hari setelah transaksi" />
        <Stat label="Approved" val={earn.approved} color="var(--atr-arti)" sub="Siap dicairkan" />
        <Stat label="Total dibayar" val={earn.paid} sub="Sepanjang waktu" />
      </div>

      {/* link performance table */}
      <div style={{ fontSize: 16, fontWeight: 700, margin: "26px 0 12px" }}>Performa link</div>
      <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.3fr", gap: 8, padding: "12px 18px", background: "var(--atr-bg-soft)", fontSize: 11.5, fontWeight: 700, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <span>Produk</span><span>Klik</span><span>Unik</span><span>Konversi</span><span style={{ textAlign: "right" }}>Komisi</span>
        </div>
        {AFFW_LINKS.map((l, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr 1.3fr", gap: 8, padding: "14px 18px", borderTop: "1px solid var(--atr-outline)", alignItems: "center", fontSize: 13.5 }}>
            <span><b style={{ fontWeight: 700 }}>{l.product}</b><br /><span style={{ fontSize: 11.5, color: "var(--atr-text-muted)" }}>{l.type} · komisi {l.rate}</span></span>
            <span>{l.clicks.toLocaleString("id-ID")}</span>
            <span>{l.uniq.toLocaleString("id-ID")}</span>
            <span>{l.conv}</span>
            <span style={{ textAlign: "right", fontWeight: 700, color: "var(--atr-purple)" }}>{rpW(l.comm)}</span>
          </div>
        ))}
      </div>

      {/* payout */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, border: "1px solid rgba(81,176,84,0.35)", background: "rgba(81,176,84,0.06)", borderRadius: 14, padding: "16px 20px", marginTop: 20 }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(81,176,84,0.16)", color: "var(--atr-arti)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>↑</span>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 700 }}>Payout berikutnya · 15 Juni 2026</div><div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 2 }}>Ke Atourin Pay · +bonus 5% · min. Rp 50.000</div></div>
        <b style={{ fontSize: 18, color: "var(--atr-arti)" }}>{rpW(earn.approved)}</b>
      </div>
    </div>
  );
}
