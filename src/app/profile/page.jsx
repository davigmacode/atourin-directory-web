"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ps } from "@/styles/profile-styles";
import { USER } from "@/data/profile-data";
import { PI } from "./_components/icons";

/* circular completion ring */
function Ring({ pct }) {
  const r = 20, c = 2 * Math.PI * r, off = c * (1 - pct);
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" style={ps.completeRing}>
      <circle cx="24" cy="24" r={r} fill="none" stroke="var(--atr-purple-light)" strokeWidth="5" />
      <circle cx="24" cy="24" r={r} fill="none" stroke="var(--atr-purple)" strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 24 24)" />
      <text x="24" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--atr-purple)">{Math.round(pct * 100)}%</text>
    </svg>
  );
}

export default function ProfilePage() {
  const router = useRouter();

  const identitas = [
    [PI.user, "Nama Lengkap", USER.fullName],
    [PI.cake, "Tanggal Lahir", USER.birth],
    [PI.venus, "Jenis Kelamin", USER.gender],
    [PI.briefcase, "Status Pekerjaan", USER.job],
    [PI.flag, "Kewarganegaraan", USER.nationality],
    [PI.idcard, `Identitas (${USER.idType})`, USER.idNumber],
  ];

  const domisili = [
    [PI.pin, "Provinsi", USER.province],
    [PI.pin, "Kota/Kabupaten", USER.city],
  ];

  function DataList({ rows }) {
    return (
      <div style={ps.dataList}>
        {rows.map(([icon, label, val], i) => (
          <div key={label} style={{ ...ps.dataRow, ...(i === 0 ? ps.dataRowFirst : {}) }}>
            <span style={ps.dataRowIcon}>{icon}</span>
            <span style={ps.dataRowLabel}>{label}</span>
            <span style={ps.dataRowVal}>{val}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={ps.panel}>
      {/* identity banner */}
      <div style={ps.banner}>
        <div style={ps.bannerCover}>
          <img src={USER.cover} alt="" style={ps.bannerImg} onError={(e) => { e.currentTarget.style.opacity = 0; }} />
          <button style={ps.bannerEditCover}>{PI.edit} Ubah Sampul</button>
        </div>
        <div style={ps.bannerBody}>
          <img src={USER.avatar} alt="" style={ps.bannerAvatar} />
          <div style={{ flex: 1, paddingBottom: 6 }}>
            <div style={ps.bannerName}>{USER.name}</div>
            <div style={ps.bannerMeta}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{PI.sparkle} Member {USER.tier}</span>
              <span style={ps.bannerMetaDot} />
              <span>{USER.points.toLocaleString("id-ID")} Poin</span>
              <span style={ps.bannerMetaDot} />
              <span>Bergabung sejak {USER.memberSince}</span>
            </div>
          </div>
          <button style={{ ...ps.btnPrimary, marginBottom: 6 }} onClick={() => router.push("/profile/edit")}>{PI.edit} Edit Profil</button>
        </div>
      </div>

      {/* completion nudge */}
      <div style={ps.complete}>
        <Ring pct={USER.completion} />
        <div style={{ flex: 1 }}>
          <div style={ps.completeTitle}>Profilmu hampir lengkap!</div>
          <div style={ps.completeText}>Lengkapi datamu agar rekomendasi perjalanan makin pas dan checkout makin cepat.</div>
        </div>
        <button style={ps.btnGhost} onClick={() => router.push("/profile/edit")}>Lengkapi</button>
      </div>

      {/* Identitas Diri */}
      <div style={ps.dataSecHead}>
        <span style={ps.dataSecIcon}>{PI.user}</span>
        <span style={ps.dataSecTitle}>Identitas Diri</span>
      </div>
      <DataList rows={identitas} />

      {/* Domisili */}
      <div style={ps.dataSecHead}>
        <span style={ps.dataSecIcon}>{PI.pin}</span>
        <span style={ps.dataSecTitle}>Domisili</span>
      </div>
      <DataList rows={domisili} />

      {/* Minat */}
      <div style={ps.dataSecHead}>
        <span style={ps.dataSecIcon}>{PI.compass}</span>
        <span style={ps.dataSecTitle}>Minat &amp; Preferensi</span>
      </div>
      <div style={{ ...ps.sectionSub, marginTop: 0 }}>Kami pakai ini untuk merekomendasikan pengalaman yang kamu suka</div>
      <div style={ps.chipRow}>
        {USER.interests.map((c) => <span key={c} style={ps.chip}>{c}</span>)}
      </div>
    </div>
  );
}
