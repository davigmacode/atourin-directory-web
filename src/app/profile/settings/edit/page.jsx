"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ps } from "@/styles/profile-styles";
import { USER } from "@/data/profile-data";
import { PI } from "../../_components/icons";
import OtpModal from "../../_components/OtpModal";

const SOCIALS = [
  { key: "twitter", name: "Twitter", color: "#1DA1F2", bg: "rgba(29,161,242,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 00-6.8 3.6A11.3 11.3 0 013 4.8a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 003.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 003.7 2.8A8 8 0 012 18.3a11.3 11.3 0 006.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.2z"/></svg> },
  { key: "facebook", name: "Facebook", color: "#1877F2", bg: "rgba(24,119,242,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/></svg> },
  { key: "instagram", name: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#E1306C" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.6" stroke="#E1306C" strokeWidth="1.7"/><circle cx="16.8" cy="7.2" r="1.1" fill="#E1306C"/></svg> },
];

function PwField({ label, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={ps.formLabel}>{label}</label>
      <div style={ps.inputWrap}>
        <input style={{ ...ps.input, paddingRight: 40 }} type={show ? "text" : "password"} placeholder={placeholder} />
        <button style={ps.eyeBtn} onClick={() => setShow(!show)} type="button">{PI.eye}</button>
      </div>
    </div>
  );
}

export default function AccountSettingsEditPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(null);

  const maskEmail = (e) => { const [u, d] = String(e).split("@"); return (u.slice(0, 2) + "•••@" + (d || "")); };

  function handleSaveDone() {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Perubahan pengaturan berhasil disimpan!");
    }
    router.push("/profile/settings");
  }

  return (
    <div style={ps.panel}>
      <OtpModal open={!!otp} {...(otp || {})} onClose={() => setOtp(null)}
        onVerified={() => { setOtp(null); handleSaveDone(); }} />

      <div style={ps.h1}>Edit Pengaturan &amp; Privasi</div>
      <div style={ps.sub}>Sesuaikan kredensial login, kata sandi, dan jejaring sosial Anda.</div>

      {/* Kredensial Login */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Kredensial Login</div>
          <div style={ps.setDesc}>Perbarui nama pengguna dan alamat surel Anda untuk proses masuk dan notifikasi di sistem Atourin.</div>
        </div>
        <div style={ps.setCard}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={ps.formLabel}>Username Publik</label>
              <input style={ps.input} defaultValue={USER.username} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={ps.formLabel}>Alamat Email</label>
              <input style={ps.input} defaultValue={USER.email} />
              <span style={ps.otpNote}>⚠ Perubahan email butuh verifikasi (OTP)</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={ps.formLabel}>Nomor Telepon</label>
              <input style={ps.input} defaultValue={USER.phone} />
            </div>
          </div>
          <div style={ps.cardActions}>
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings")}>Batal</button>
            <button style={ps.btnPrimary} onClick={() => setOtp({ channel: "email", target: maskEmail(USER.email), title: "Verifikasi Perubahan Kredensial", subtitle: <>Demi keamanan, masukkan kode yang kami kirim ke email &amp; nomor lamamu sebelum mengubah email/nomor.</>, actionLabel: "Verifikasi & Simpan" })}>Simpan Perubahan</button>
          </div>
        </div>
      </div>

      {/* Keamanan Sandi */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Keamanan Sandi</div>
          <div style={ps.setDesc}>Pastikan akun Anda sangat aman dengan membuat kata sandi yang panjang dan acak.</div>
        </div>
        <div style={ps.setCard}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <PwField label="Kata Sandi Lama" placeholder="Ketik sandi saat ini" />
            <PwField label="Kata Sandi Baru" placeholder="Minimal 6 karakter" />
            <PwField label="Konfirmasi Baru" placeholder="Ulangi sandi baru" />
          </div>
          <div style={ps.cardActions}>
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings")}>Batal</button>
            <button style={ps.btnPrimary} onClick={handleSaveDone}>Simpan Keamanan</button>
          </div>
        </div>
      </div>

      {/* Jejaring Sosial */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Jejaring Sosial</div>
          <div style={ps.setDesc}>Menautkan saluran publik Anda.</div>
        </div>
        <div style={ps.setCard}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SOCIALS.map((s) => (
              <div key={s.key} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={ps.formLabel}>Tautan {s.name}</label>
                <input style={ps.input} defaultValue={USER.socials[s.key]} />
              </div>
            ))}
          </div>
          <div style={ps.cardActions}>
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings")}>Batal</button>
            <button style={ps.btnPrimary} onClick={handleSaveDone}>Daftarkan Koneksi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
