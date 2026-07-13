"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ps } from "@/styles/profile-styles";
import { USER, ALL_INTERESTS, GENDER_OPTS, JOB_OPTS, NATION_OPTS, IDTYPE_OPTS, PROVINCE_OPTS, CITY_OPTS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead, Select } from "../_components/profile-helpers";

export default function ProfileEditPage() {
  const router = useRouter();
  const [picked, setPicked] = useState(["Alam", "Kuliner", "Bahari", "Relaksasi", "Keluarga", "Olahraga", "Geowisata", "Edukasi"]);

  function toggle(c) {
    setPicked((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
  }

  function handleSave() {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Profil berhasil diperbarui!");
    }
    router.push("/profile");
  }

  return (
    <div style={ps.panel}>
      <PanelHead title="Edit Profil" sub="Perbarui datamu, cukup ubah yang perlu, lalu simpan"
        right={<button style={ps.btnGhost} onClick={() => router.push("/profile")}>{PI.close} Batal</button>} />

      <div style={ps.formSectionTitle}>Informasi Pribadi</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={ps.groupCard}>
          <label style={ps.formLabel}>Nama Lengkap <span style={ps.req}>*</span></label>
          <input style={ps.input} defaultValue={USER.fullName} />
        </div>
        <div style={ps.formGrid}>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Tanggal Lahir</label>
            <input style={ps.input} type="date" defaultValue={USER.birthISO} />
          </div>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Jenis Kelamin</label>
            <Select value={USER.gender} options={GENDER_OPTS} />
          </div>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Status Pekerjaan</label>
            <Select value={USER.job} options={JOB_OPTS} />
          </div>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Kewarganegaraan</label>
            <Select value={USER.nationality} options={NATION_OPTS} />
          </div>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Jenis Identitas</label>
            <Select value={USER.idType} options={IDTYPE_OPTS} />
          </div>
          <div style={ps.groupCard}>
            <label style={ps.formLabel}>Nomor Identitas <span style={ps.req}>*</span></label>
            <input style={ps.input} defaultValue={USER.idNumber} />
          </div>
        </div>
      </div>

      <div style={ps.formSectionTitle}>Alamat</div>
      <div style={ps.groupCard}>
        <div style={ps.formGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <label style={ps.formLabel}>Provinsi <span style={ps.req}>*</span></label>
            <Select value={USER.province} options={PROVINCE_OPTS} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <label style={ps.formLabel}>Kota/Kabupaten <span style={ps.req}>*</span></label>
            <Select value={USER.city} options={CITY_OPTS} />
          </div>
        </div>
      </div>

      <div style={ps.divider} />
      <div style={ps.sectionTitle}>Minat &amp; Preferensi</div>
      <div style={ps.sectionSub}>Pilih kategori yang Anda minati</div>
      <div style={ps.chipRow}>
        {ALL_INTERESTS.map((c) => (
          <button key={c} className="atr-chip"
            style={{ ...ps.chipSelectable, ...(picked.includes(c) ? ps.chipSelected : {}) }}
            onClick={() => toggle(c)}>{c}</button>
        ))}
      </div>

      <div style={ps.formActions}>
        <button style={ps.btnGhost} onClick={() => router.push("/profile")}>{PI.close} Batal</button>
        <button style={ps.btnPrimary} onClick={handleSave}>{PI.check} Simpan Perubahan</button>
      </div>
    </div>
  );
}
