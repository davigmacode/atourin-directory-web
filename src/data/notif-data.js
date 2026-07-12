export const NOTIF_TABS = [
  { id: "semua",    label: "Semua" },
  { id: "pesanan",  label: "Pesanan" },
  { id: "promosi",  label: "Promosi" },
  { id: "arti",     label: "ARTI" },
  { id: "info",     label: "Info" },
];

export const NOTIFS = [
  {
    id: "n1", cat: "pesanan", important: true, unread: true, group: "Hari ini", time: "10 menit lalu",
    title: "Pembayaran berhasil",
    body: "Pembayaran Komodo Sailing 3D2N sebesar Rp 4.220.000 telah berhasil. E-tiket sudah dikirim ke email-mu. Kode booking ATR-7K2K91.",
    cta: "Lihat E-Tiket", href: "#",
  },
  {
    id: "n2", cat: "pesanan", important: true, unread: true, group: "Hari ini", time: "1 jam lalu",
    title: "Pengingat keberangkatan",
    body: "Jangan lupa! Trip Komodo Sailing berangkat besok, 12 Juni 2026 pukul 07.00 WITA. Siapkan dokumen & tiba 30 menit lebih awal.",
    cta: "Lihat detail trip", href: "/itinerary",
  },
  {
    id: "n3", cat: "arti", important: true, unread: true, group: "Hari ini", time: "3 jam lalu",
    title: "Kamu menanam 4 pohon 🌱",
    body: "Trip Komodo Sailing-mu mengompensasi jejak karbon dengan 4 pohon di Kebun ARTI. Total kebunmu kini 12 pohon.",
    cta: "Lihat Kebun ARTI", href: "#",
  },
  {
    id: "n4", cat: "promosi", important: false, unread: true, group: "Hari ini", time: "5 jam lalu",
    title: "Diskon 25% akhir pekan",
    body: "Pakai kode WEEKEND25 untuk semua experience, min. transaksi Rp 200.000. Aktif akhir pekan ini, jangan terlewat!",
    cta: "Lihat promo", href: "#",
  },
  {
    id: "n5", cat: "info", important: false, unread: false, group: "Hari ini", time: "6 jam lalu",
    title: "Ulasan baru untuk tripmu",
    body: "Reza Pratama memberi ulasan 5 bintang untuk Komodo Sailing 3D2N. Lihat apa kata mereka.",
    cta: "Baca ulasan", href: "#",
  },
  {
    id: "n6", cat: "promosi", important: false, unread: false, group: "Kemarin", time: "1 hari lalu",
    title: "Cashback Rp 50.000 menanti",
    body: "Dapatkan cashback Rp 50.000 untuk pembelian min. Rp 500.000. Gunakan kode ATR50K saat checkout.",
    cta: "Klaim sekarang", href: "#",
  },
  {
    id: "n7", cat: "pesanan", important: false, unread: false, group: "Kemarin", time: "1 hari lalu",
    title: "Pesanan menunggu pembayaran",
    body: "Selesaikan pembayaran untuk Tiket Masuk Pulau Padar sebelum batas waktu agar pesanan tidak dibatalkan.",
    cta: "Bayar sekarang", href: "#",
  },
  {
    id: "n8", cat: "info", important: false, unread: false, group: "Kemarin", time: "1 hari lalu",
    title: "Email berhasil diverifikasi",
    body: "Akunmu kini terverifikasi. Nikmati checkout lebih cepat dan penawaran eksklusif khusus member.",
    cta: null, href: null,
  },
  {
    id: "n9", cat: "arti", important: false, unread: false, group: "Minggu ini", time: "3 hari lalu",
    title: "Pohonmu mulai tumbuh",
    body: "Bibit pohon dari trip Wae Rebo-mu kini setinggi 40 cm. Pantau pertumbuhannya di Kebun ARTI.",
    cta: "Lihat Kebun ARTI", href: "#",
  },
  {
    id: "n10", cat: "info", important: false, unread: false, group: "Minggu ini", time: "4 hari lalu",
    title: "Pemeliharaan sistem terjadwal",
    body: "Atourin akan melakukan pemeliharaan pada 12 Juni 2026 pukul 02.00–04.00 WIB. Beberapa layanan mungkin sementara tidak tersedia.",
    cta: null, href: null,
  },
];
