import React from "react";

export const MI = {
  reach: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  pay: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  dash: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="3" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="11" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3" y="15" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  guide: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l3 6 6 .8-4.3 4.2 1 6L12 17l-5.7 3 1-6L3 9.8 9 9l3-6z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 15c2-3 5-5 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC442">
      <path d="M12 2l3 6.5 7 .7-5.2 4.8 1.5 6.9L12 18.6 5.2 20.9l1.5-6.9L1.5 9.2l7-.7L12 2z" />
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  minus: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export const MITRA_TYPES = [
  { icon: "🏡", t: "Desa Wisata", d: "Kelola & pasarkan paket desa wisata, homestay, dan aktivitas lokalmu." },
  { icon: "✨", t: "Operator Experience", d: "Open trip, one-day tour, dan workshop budaya, jangkau pasar nasional." },
  { icon: "🎟️", t: "Pengelola Atraksi", d: "Jual tiket masuk objek wisata dengan check-in QR yang praktis." },
  { icon: "🏠", t: "Homestay", d: "Tampilkan penginapan otentikmu ke ribuan traveler." },
  { icon: "🧭", t: "Pemandu Wisata", d: "Tawarkan jasa local expert bersertifikat & bangun reputasi." },
  { icon: "🛍️", t: "UMKM", d: "Pasarkan produk lokal khas yang kaya nilai budaya." },
];

export const MITRA_VALUE = [
  { icon: "reach", t: "Jangkauan nasional", d: "Produkmu tampil ke 10.000+ wisatawan aktif tiap hari di seluruh Indonesia." },
  { icon: "pay", t: "Pembayaran aman & cepat", d: "Dana masuk otomatis & terjadwal. Dukungan VA, QRIS, e-wallet, kartu." },
  { icon: "dash", t: "Dashboard mitra", d: "Pantau pesanan, performa, dan pendapatan dari satu tempat." },
  { icon: "guide", t: "Pendampingan", d: "Tim mitra membantu onboarding, foto produk, hingga strategi promo." },
  { icon: "shield", t: "Terverifikasi & terpercaya", d: "Badge mitra resmi meningkatkan kepercayaan calon pembeli." },
  { icon: "leaf", t: "Berdampak (ARTI)", d: "Tiap transaksi menanam pohon, jualan sambil menjaga bumi." },
];

export const MITRA_STEPS = [
  ["Daftar", "Isi formulir registrasi mitra & verifikasi email kamu."],
  ["Verifikasi", "Lengkapi profil bisnis. Tim kami review maksimal 1×24 jam."],
  ["Buat produk", "Unggah paket/tiket dengan foto & harga menarik."],
  ["Mulai jualan", "Produkmu tayang & siap dipesan ribuan wisatawan."],
];

export const MITRA_TESTI = [
  { name: "Desa Wisata Bilebante", role: "Lombok Tengah", rating: 5, text: "Sejak gabung Atourin, kunjungan naik drastis. Sistem pemesanannya rapi dan pembayarannya tepat waktu.", avatar: "B" },
  { name: "Banda Neira Tour", role: "Operator Open Trip", rating: 5, text: "Dashboard-nya memudahkan kelola kuota trip. Tim support responsif banget.", avatar: "B" },
  { name: "Komodo Liveaboard", role: "Labuan Bajo", rating: 5, text: "Jangkauan pasarnya luas. Banyak tamu dari luar daerah yang sebelumnya susah kami jangkau.", avatar: "K" },
];

export const MITRA_FAQ = [
  ["Apakah ada biaya untuk menjadi mitra?", "Pendaftaran mitra 100% gratis. Atourin hanya mengenakan komisi kecil per transaksi yang berhasil, tanpa biaya bulanan."],
  ["Berapa lama proses verifikasi?", "Verifikasi profil mitra umumnya selesai dalam 1×24 jam kerja setelah dokumen lengkap kamu kirim."],
  ["Bagaimana sistem pembayaran ke mitra?", "Dana hasil penjualan dicairkan otomatis ke rekening terdaftar sesuai jadwal pencairan, setelah perjalanan/aktivitas selesai."],
  ["Apakah saya bisa kelola banyak produk?", "Tentu. Lewat dashboard mitra kamu bisa menambah, mengedit, dan menonaktifkan produk kapan saja."],
  ["Apa saja yang dibutuhkan untuk mendaftar?", "Data diri/penanggung jawab, info bisnis/organisasi, dan dokumen pendukung (mis. legalitas usaha bila ada)."],
];
