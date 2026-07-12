"use client";

import React, { useState } from "react";
import { sx, stp } from "@/styles/partnership-styles";

export default function PartnerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "" });

  function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.business) {
      alert("Harap isi semua kolom wajib (*)!");
      return;
    }
    alert(`Terima kasih ${form.name}, pendaftaran Anda telah dikirim! Tim partnership kami akan menghubungi Anda dalam 24 jam.`);
    setForm({ name: "", email: "", phone: "", business: "" });
  }

  return (
    <form style={{ ...sx.card, padding: 28, textAlign: "left" }} onSubmit={onSubmit}>
      <div style={{ height: 4, background: "var(--atr-purple)", borderRadius: 999, marginBottom: 20 }} />
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
        Partnership with Atourin
      </div>
      <p style={{ fontSize: 14, color: "var(--atr-text-muted)", lineHeight: 1.6 }}>
        Kami membuka peluang kerja sama dengan mitra yang punya visi sama dalam menghadirkan pariwisata Indonesia
        yang lebih baik, inklusif, dan berkelanjutan. Untuk pertanyaan, hubungi tim Partnership di{" "}
        <strong style={{ color: "var(--atr-purple)" }}>+62 814-0051-6348</strong> atau{" "}
        <strong style={{ color: "var(--atr-purple)" }}>partnership@atourin.com</strong>.
      </p>

      {[
        ["Nama Lengkap *", "name", "Jawaban Anda"],
        ["Email *", "email", "Jawaban Anda"],
        ["Nomor Telepon *", "phone", "Jawaban Anda"],
        ["Nama Bisnis / Organisasi *", "business", "Jawaban Anda"],
      ].map(([label, key, placeholder]) => (
        <div key={key} style={{ marginTop: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>
            {label}
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
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}

      <button type="submit" style={{ ...stp.btnPrimary, width: "100%", justifyContent: "center", marginTop: 22 }}>
        Kirim Pendaftaran
      </button>
    </form>
  );
}
