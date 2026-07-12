"use client";

import React, { useState } from "react";
import { sx, stp } from "@/styles/contact-styles";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: "Pilih topik pertanyaan", msg: "" });

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) {
      alert("Harap isi semua kolom wajib (*)!");
      return;
    }
    alert(`Terima kasih ${form.name}, pesan Anda telah dikirim! Tim kami akan merespons dalam 1-2 jam kerja.`);
    setForm({ name: "", email: "", topic: "Pilih topik pertanyaan", msg: "" });
  }

  return (
    <form style={sx.card} onSubmit={onSubmit}>
      <div
        style={{
          background: "var(--atr-purple)",
          color: "#fff",
          padding: "20px 24px",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700 }}>✉️ Kirim Pesan</div>
        <div style={{ fontSize: 13, opacity: 0.9, marginTop: 3 }}>
          Kami akan merespons dalam 1–2 jam kerja
        </div>
      </div>
      <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Nama Lengkap *
          </label>
          <input
            style={{
              width: "100%",
              border: "1px solid var(--atr-outline)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 14,
              fontFamily: "var(--atr-font-sans)",
              outline: "none",
              background: "var(--atr-bg-soft)",
              boxSizing: "border-box",
            }}
            placeholder="Masukkan nama lengkap Anda"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Email *
          </label>
          <input
            style={{
              width: "100%",
              border: "1px solid var(--atr-outline)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 14,
              fontFamily: "var(--atr-font-sans)",
              outline: "none",
              background: "var(--atr-bg-soft)",
              boxSizing: "border-box",
            }}
            placeholder="nama@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Topik Pertanyaan
          </label>
          <select
            style={{
              width: "100%",
              border: "1px solid var(--atr-outline)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 14,
              fontFamily: "var(--atr-font-sans)",
              outline: "none",
              background: "var(--atr-bg-soft)",
              boxSizing: "border-box",
            }}
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          >
            <option>Pilih topik pertanyaan</option>
            <option>Pertanyaan Umum</option>
            <option>Pemesanan &amp; Pembayaran</option>
            <option>Pembatalan &amp; Refund</option>
            <option>Lainnya</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
            Pesan Anda *
          </label>
          <textarea
            style={{
              width: "100%",
              minHeight: 110,
              border: "1px solid var(--atr-outline)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 14,
              fontFamily: "var(--atr-font-sans)",
              outline: "none",
              background: "var(--atr-bg-soft)",
              resize: "vertical",
              boxSizing: "border-box",
            }}
            placeholder="Tuliskan pertanyaan atau pesan Anda secara detail…"
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
          />
        </div>

        <button type="submit" style={{ ...stp.btnPrimary, width: "100%", justifyContent: "center" }}>
          ➤ Kirim Pesan
        </button>
      </div>
    </form>
  );
}
