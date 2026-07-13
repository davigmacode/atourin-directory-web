"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ps } from "@/styles/profile-styles";
import { USER } from "@/data/profile-data";
import { PI } from "../_components/icons";
import OtpModal from "../_components/OtpModal";

const SOCIALS = [
  { key: "twitter", name: "Twitter", color: "#1DA1F2", bg: "rgba(29,161,242,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 00-6.8 3.6A11.3 11.3 0 013 4.8a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 003.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 003.7 2.8A8 8 0 012 18.3a11.3 11.3 0 006.2 1.8c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.2z"/></svg> },
  { key: "facebook", name: "Facebook", color: "#1877F2", bg: "rgba(24,119,242,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/></svg> },
  { key: "instagram", name: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.12)",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#E1306C" strokeWidth="1.7"/><circle cx="12" cy="12" r="3.6" stroke="#E1306C" strokeWidth="1.7"/><circle cx="16.8" cy="7.2" r="1.1" fill="#E1306C"/></svg> },
];

export default function AccountSettingsPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(null);

  const maskPhone = (p) => String(p).replace(/\d(?=\d{2})/g, "•").replace(/(•)(?=•{0,}\d)/g, (m, _, i) => i < 6 ? "•" : m);

  function handleDeleted() {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Akun Anda telah dieliminasi permanen secara simulatif.");
    }
    router.push("/");
  }

  return (
    <div style={ps.panel}>
      <OtpModal open={!!otp} {...(otp || {})} onClose={() => setOtp(null)}
        onVerified={() => { const cb = otp && otp.onDone; setOtp(null); cb && cb(); }} />

      <div style={ps.h1}>Pengaturan &amp; Privasi</div>
      <div style={ps.sub}>Atur kredensial, sandi, dan koneksi digitalmu, semuanya di satu tempat yang aman.</div>

      {/* Kredensial Login */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Kredensial Login</div>
          <div style={ps.setDesc}>Perbarui nama pengguna dan alamat surel Anda untuk proses masuk dan notifikasi di sistem Atourin.</div>
        </div>
        <div style={ps.setCard}>
          <div style={ps.setCardHead}>
            <div style={ps.kvLabel}>Username Publik</div>
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings/edit")}>Edit Data</button>
          </div>
          <div style={ps.kvVal}>{USER.username}</div>
          <div style={ps.kvLabel}>Alamat Email</div>
          <div style={ps.kvVal}>{USER.email}</div>
          <div style={ps.kvLabel}>Nomor Telepon</div>
          <div style={{ ...ps.kvVal, marginBottom: 0 }}>{USER.phone}</div>
        </div>
      </div>

      {/* Keamanan Sandi */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Keamanan Sandi</div>
          <div style={ps.setDesc}>Pastikan akun Anda sangat aman dengan membuat kata sandi yang panjang dan acak.</div>
        </div>
        <div style={ps.setCard}>
          <div style={ps.setCardHead}>
            <div style={ps.kvLabel}>Status Sandi</div>
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings/edit")}>Ubah Sandi</button>
          </div>
          <div style={{ fontSize: 18, letterSpacing: "0.18em", color: "var(--atr-text-muted)", marginTop: 10 }}>••••••••••••</div>
        </div>
      </div>

      {/* Jejaring Sosial */}
      <div style={ps.setRow}>
        <div>
          <div style={ps.setLabel}>Jejaring Sosial</div>
          <div style={ps.setDesc}>Menautkan saluran publik Anda.</div>
        </div>
        <div style={ps.setCard}>
          <div style={{ ...ps.setCardHead, marginBottom: 8 }}>
            <span />
            <button style={ps.linkBtn} onClick={() => router.push("/profile/settings/edit")}>Edit Tautan</button>
          </div>
          {SOCIALS.map((s) => (
            <div key={s.key} style={ps.socialRow}>
              <span style={{ ...ps.socialIcon, background: s.bg }}>{s.icon}</span>
              <div>
                <div style={ps.socialName}>{s.name}</div>
                <div style={ps.socialHandle}>{USER.socials[s.key]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pemusnahan Entitas */}
      <div style={ps.setRow}>
        <div>
          <div style={{ ...ps.setLabel, ...ps.setLabelDanger }}>Pemusnahan Entitas</div>
          <div style={ps.setDesc}>Hapus selamanya kehadiran Anda beserta jejak riwayat pembelian.</div>
        </div>
        <div style={ps.dangerCard}>
          <div>
            <div style={ps.dangerTitle}>Berantas Akun Permanen</div>
            <div style={ps.dangerText}>Setelah dihapus, tidak ada alat yang bisa memulihkannya lagi di waktu mendatang. Yakin pergi sekarang?</div>
          </div>
          <button style={ps.dangerBtn} onClick={() => setOtp({ channel: "sms", target: maskPhone(USER.phone), title: "Konfirmasi Hapus Akun", subtitle: <>Tindakan ini permanen. Masukkan kode verifikasi untuk menghapus akunmu selamanya.</>, actionLabel: "Hapus Akun Permanen", onDone: handleDeleted })}>Eliminasi Akunku</button>
        </div>
      </div>
    </div>
  );
}
