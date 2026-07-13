"use client";

import React, { useState } from "react";
import { ps } from "@/styles/profile-styles";
import { PAYW_TX, PAYW_PRESETS, PAYW_METHODS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

const rpP = (n) => "Rp " + Math.abs(n).toLocaleString("id-ID");

export default function WalletPage() {
  const [balance, setBalance] = useState(285000);
  const [tx, setTx] = useState(PAYW_TX);
  const [modal, setModal] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [payAmt, setPayAmt] = useState(0);
  const [amount, setAmount] = useState(0);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState(null);

  function topUp() {
    if (amount < 10000 || !method) return;
    setBalance((b) => b + amount);
    setTx((t) => [{ label: "Top Up · " + method.name, date: "Baru saja", amt: amount, kind: "masuk" }, ...t]);
    setModal(false);
    setAmount(0);
    setCustom("");
    setMethod(null);
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Top up berhasil +" + rpP(amount));
    }
  }

  function handlePay() {
    if (!(payAmt > 0 && payAmt <= balance)) return;
    setBalance((b) => b - payAmt);
    setTx((t) => [{ label: "Bayar · Homestay Mbaru Niang", date: "Baru saja", amt: -payAmt, kind: "keluar" }, ...t]);
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Pembayaran berhasil −" + rpP(payAmt));
    }
    setPayModal(false);
    setPayAmt(0);
  }

  const ic = (k) => k === "keluar" ? { c: "#B23133", b: "rgba(244,98,99,0.12)", s: "−" } : { c: "var(--atr-arti)", b: "rgba(81,176,84,0.14)", s: "+" };

  return (
    <div style={ps.panel}>
      <PanelHead title="Atourin Pay" sub="Dompet digital Atourin · saldo, top-up, cashback & refund instan." />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
        {/* balance */}
        <div style={{ borderRadius: 18, background: "linear-gradient(135deg,#1B1A2E 0%,#4B3F8F 100%)", color: "#fff", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, opacity: 0.8 }}>Saldo Atourin Pay</span>
            <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.18)", padding: "4px 10px", borderRadius: 999 }}>● Aktif</span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 8 }}>{rpP(balance)}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={() => setModal(true)} style={{ flex: 1, height: 44, borderRadius: 12, border: "none", background: "#fff", color: "var(--atr-purple)", fontFamily: "var(--atr-font-sans)", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>+ Top Up</button>
            <button onClick={() => setPayModal(true)} style={{ flex: 1, height: 44, borderRadius: 12, border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", fontFamily: "var(--atr-font-sans)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Bayar</button>
          </div>
        </div>
        {/* info + cashback */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "rgba(255,196,66,0.16)", border: "1px solid rgba(255,196,66,0.4)", borderRadius: 14, padding: "14px 16px", fontSize: 13, color: "#7A5A00", fontWeight: 700, display: "flex", gap: 10, alignItems: "center" }}>🎉 Cashback 5% paket wisata s/d 30 Jun</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[["Maks saldo", "Rp 10jt"], ["Min top-up", "Rp 10rb"], ["Cashback", "ke saldo"]].map(([k, v]) => (
              <div key={k} style={{ border: "1px solid var(--atr-outline)", borderRadius: 12, padding: "10px 12px" }}><div style={{ fontSize: 10.5, color: "var(--atr-text-muted)" }}>{k}</div><div style={{ fontSize: 13, fontWeight: 800, marginTop: 2 }}>{v}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "26px 0 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Riwayat Transaksi</div>
      </div>
      <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, overflow: "hidden" }}>
        {tx.map((t, i) => {
          const c = ic(t.kind);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderTop: i ? "1px solid var(--atr-outline)" : "none" }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: c.b, color: c.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0 }}>{c.s}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{t.label}</div><div style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 1, textTransform: "capitalize" }}>{t.kind} · {t.date}</div></div>
              <b style={{ fontSize: 15, color: c.c }}>{t.amt > 0 ? "+" : "−"}{rpP(t.amt)}</b>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", borderRadius: 12, padding: "13px 16px", fontSize: 12.5, color: "var(--atr-text-muted)", lineHeight: 1.5, marginTop: 16 }}>
        <span style={{ flexShrink: 0 }}>🔒</span><span>Atourin Pay didukung gateway berlisensi BI (DOKU). Saldo bersifat <b>closed-loop</b> (hanya untuk transaksi di Atourin, tidak bisa ditarik). Konfirmasi pembayaran dengan PIN 6 digit di aplikasi mobile.</span>
      </div>

      {/* top-up modal */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(20,18,40,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", width: "100%", maxWidth: 460, borderRadius: 20, padding: 24, fontFamily: "var(--atr-font-sans)" }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Top Up Atourin Pay</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {PAYW_PRESETS.map((p) => <button key={p} onClick={() => { setAmount(p); setCustom(""); }} style={{ height: 52, borderRadius: 12, border: `1.5px solid ${amount === p ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: amount === p ? "var(--atr-purple-50)" : "#fff", color: amount === p ? "var(--atr-purple)" : "var(--atr-text)", fontFamily: "var(--atr-font-sans)", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>{rpP(p)}</button>)}
            </div>
            <input value={custom} onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setCustom(v); setAmount(Number(v)); }} inputMode="numeric" placeholder="Nominal lain (min Rp 10.000)" style={{ width: "100%", height: 48, border: "1.5px solid var(--atr-outline)", borderRadius: 12, padding: "0 14px", fontFamily: "var(--atr-font-sans)", fontSize: 14, outline: "none", boxSizing: "border-box", margin: "12px 0" }} />
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Metode pembayaran</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PAYW_METHODS.map((m) => (
                <button key={m.id} onClick={() => setMethod(m)} style={{ display: "flex", alignItems: "center", gap: 12, border: `1.5px solid ${method && method.id === m.id ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: method && method.id === m.id ? "var(--atr-purple-50)" : "#fff", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontFamily: "var(--atr-font-sans)", textAlign: "left", width: "100%" }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ flex: 1 }}><span style={{ display: "block", fontSize: 13.5, fontWeight: 700 }}>{m.name}</span><span style={{ fontSize: 11.5, color: "var(--atr-text-muted)" }}>{m.est}</span></span>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => setModal(false)} style={{ flex: 1, height: 48, border: "1px solid var(--atr-outline)", background: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Batal</button>
              <button onClick={topUp} disabled={amount < 10000 || !method} style={{ flex: 1.4, height: 48, border: "none", background: "var(--atr-purple)", color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: (amount >= 10000 && method) ? 1 : 0.45, fontFamily: "var(--atr-font-sans)" }}>Top Up {amount >= 10000 ? rpP(amount) : ""}</button>
            </div>
          </div>
        </div>
      )}

      {payModal && (
        <div onClick={() => { setPayModal(false); setPayAmt(0); }} style={{ position: "fixed", inset: 0, background: "rgba(20,18,40,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", width: "100%", maxWidth: 420, borderRadius: 20, padding: 24, fontFamily: "var(--atr-font-sans)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--atr-purple-50)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏡</span>
              <div><div style={{ fontSize: 15, fontWeight: 700 }}>Homestay Mbaru Niang</div><div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>Wae Rebo · Mitra Atourin · QRIS</div></div>
            </div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Nominal pembayaran</label>
            <input value={payAmt || ""} onChange={(e) => setPayAmt(Number(e.target.value.replace(/\D/g, "")))} inputMode="numeric" placeholder="contoh: 48000" style={{ width: "100%", height: 50, border: "1.5px solid var(--atr-outline)", borderRadius: 12, padding: "0 14px", fontFamily: "var(--atr-font-sans)", fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box" }} />
            <div style={{ fontSize: 12, color: payAmt > balance ? "#B23133" : "var(--atr-text-muted)", marginTop: 8 }}>{payAmt > balance ? "Saldo tidak cukup" : "Saldo: " + rpP(balance)}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button onClick={() => { setPayModal(false); setPayAmt(0); }} style={{ flex: 1, height: 48, border: "1px solid var(--atr-outline)", background: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}>Batal</button>
              <button onClick={handlePay} disabled={!(payAmt > 0 && payAmt <= balance)} style={{ flex: 1.4, height: 48, border: "none", background: "var(--atr-purple)", color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: (payAmt > 0 && payAmt <= balance) ? 1 : 0.45, fontFamily: "var(--atr-font-sans)" }}>Bayar {payAmt > 0 ? rpP(payAmt) : ""}</button>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--atr-text-faint)", marginTop: 12, textAlign: "center" }}>Atourin Pay berlaku di Atourin &amp; seluruh mitra (closed-loop). Di mobile, dikonfirmasi dengan PIN 6 digit.</div>
          </div>
        </div>
      )}
    </div>
  );
}
