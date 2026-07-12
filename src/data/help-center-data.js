import React from "react";

export const HC = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.9" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  cal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  landmark: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 10l8-5 8 5M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  q: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 9.5a2.5 2.5 0 014.7 1.2c0 1.7-2.2 2-2.2 3.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="17.4" r="0.6" fill="currentColor" stroke="currentColor" />
    </svg>
  ),
  cart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h2l1.5 11h10l1.5-8H7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  ),
  compass: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  card: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  chev: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  back: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  receipt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  refund: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 9a8 8 0 1 1-1 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 4v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H9l-4 3V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  up: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  down: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export const HELP_CATS = [
  {
    id: "rencana",
    t: "Rencana Perjalanan",
    icon: "cal",
    tint: "#7068D5",
    desc: "Seputar perencanaan & itinerary perjalananmu",
    articles: [
      {
        q: "Bagaimana cara mengubah jadwal perjalanan?",
        intro: "Untuk mengubah jadwal perjalanan, ikuti langkah berikut:",
        steps: ["Masuk ke akun Atourin Anda", "Pilih menu 'Pesanan Saya'", "Pilih pesanan yang ingin diubah", "Klik 'Ubah Jadwal'", "Pilih tanggal baru yang tersedia", "Konfirmasi perubahan"],
        note: "Perubahan jadwal hanya dapat dilakukan minimal 24 jam sebelum keberangkatan.",
      },
      {
        q: "Apa saja dokumen yang diperlukan untuk berwisata?",
        intro: "Dokumen bervariasi tergantung destinasi. Umumnya Anda memerlukan:",
        steps: ["Kartu identitas (KTP/Paspor)", "Bukti pemesanan/voucher Atourin", "Dokumen kesehatan (jika diperlukan)", "Surat izin khusus untuk kawasan tertentu"],
        note: "Simpan e-tiket di aplikasi agar mudah diakses saat check-in.",
      },
      {
        q: "Bagaimana cara merencanakan perjalanan multi-kota?",
        intro: "Untuk merencanakan perjalanan multi-kota di Atourin:",
        steps: ["Gunakan fitur 'Buat Itinerary'", "Pilih kota-kota tujuan", "Tentukan durasi di tiap kota", "Pilih objek wisata", "Atur transportasi antar kota", "Simpan & bagikan itinerary"],
        note: "Itinerary tersimpan otomatis dan bisa diedit kapan saja.",
      },
    ],
  },
  {
    id: "objek",
    t: "Objek Wisata",
    icon: "landmark",
    tint: "#2F8A5B",
    desc: "Informasi destinasi & objek wisata",
    articles: [
      {
        q: "Bagaimana cara melihat review objek wisata?",
        intro: "Setiap objek wisata punya halaman ulasan dari wisatawan lain:",
        steps: ["Buka halaman detail objek wisata", "Scroll ke bagian 'Ulasan'", "Gunakan filter rating atau media", "Klik 'Membantu' pada ulasan relevan"],
        note: "Hanya pengguna yang sudah berkunjung yang bisa memberi ulasan.",
      },
      {
        q: "Apakah jam operasional objek wisata selalu akurat?",
        intro: "Jam operasional diperbarui berkala oleh mitra desa wisata:",
        steps: ["Cek jam operasional di halaman detail", "Perhatikan catatan hari libur nasional", "Hubungi operator bila ragu"],
        note: "Saat musim liburan, jam bisa berubah sewaktu-waktu.",
      },
    ],
  },
  {
    id: "umum",
    t: "Pertanyaan Umum",
    icon: "q",
    tint: "#E07B3A",
    desc: "Pertanyaan yang paling sering diajukan",
    articles: [
      {
        q: "Apa itu Atourin?",
        intro: "Atourin adalah platform teknologi pariwisata yang mempertemukan wisatawan dengan pengalaman lokal otentik:",
        steps: ["Pesan experience, tiket atraksi, & homestay", "Ditemani pemandu lokal bersertifikat", "Dukung desa wisata & UMKM setempat", "Setiap transaksi menanam pohon lewat ARTI"],
        note: "Atourin terdaftar di PSE Kominfo & member GSTC.",
      },
      {
        q: "Apakah akun Atourin gratis?",
        intro: "Ya, membuat akun Atourin sepenuhnya gratis:",
        steps: ["Daftar dengan email atau nomor telepon", "Lengkapi profil untuk rekomendasi lebih pas", "Nikmati promo khusus member baru"],
        note: "Tidak ada biaya keanggotaan apa pun.",
      },
    ],
  },
  {
    id: "marketplace",
    t: "Pemesanan",
    icon: "cart",
    tint: "#2F6FA5",
    desc: "Seputar pemesanan, e-tiket & voucher",
    articles: [
      {
        q: "Bagaimana cara melakukan pemesanan?",
        intro: "Memesan di Atourin sangat mudah:",
        steps: ["Pilih produk yang diinginkan", "Tentukan tanggal & jumlah peserta", "Isi data pemesan", "Lanjut ke checkout & bayar", "E-tiket dikirim otomatis ke email"],
        note: "Cek kembali tanggal & jumlah peserta sebelum membayar.",
      },
      {
        q: "Di mana saya bisa melihat e-tiket saya?",
        intro: "E-tiket tersimpan otomatis di akunmu:",
        steps: ["Masuk ke 'Pesanan Saya'", "Pilih pesanan yang aktif", "Buka 'Detail Pesanan' lalu 'Lihat E-Tiket'", "Tunjukkan QR saat check-in"],
        note: "E-tiket juga dikirim ke email terdaftar.",
      },
    ],
  },
  {
    id: "pemandu",
    t: "Pemandu Wisata",
    icon: "compass",
    tint: "#9B6AAB",
    desc: "Seputar local expert & tour guide",
    articles: [
      {
        q: "Apakah pemandu Atourin bersertifikat?",
        intro: "Semua pemandu telah melalui proses verifikasi:",
        steps: ["Memiliki sertifikat pemandu resmi", "Diverifikasi identitas & rekam jejak", "Dinilai langsung oleh wisatawan via rating"],
        note: "Lihat rating & jumlah trip di profil tiap pemandu.",
      },
    ],
  },
  {
    id: "pembayaran",
    t: "Pembayaran & Refund",
    icon: "card",
    tint: "#C99500",
    desc: "Metode, keamanan transaksi & pengembalian dana",
    articles: [
      {
        q: "Metode pembayaran apa saja yang didukung?",
        intro: "Atourin mendukung beragam metode:",
        steps: ["Virtual Account (BCA, BNI, Mandiri, BRI, dll)", "QRIS, scan dari aplikasi apa pun", "E-wallet (GoPay, OVO, DANA, ShopeePay)", "Kartu kredit Visa/Mastercard"],
        note: "Semua transaksi dienkripsi & aman.",
      },
      {
        q: "Bagaimana kebijakan & cara refund?",
        intro: "Refund mengikuti ketentuan tiap produk:",
        steps: ["Buka 'Pesanan Saya' → 'Detail Pesanan'", "Klik 'Ajukan Refund / Pembatalan'", "Pilih alasan & tujuan pengembalian dana", "Dana kembali dalam 3–5 hari kerja"],
        note: "Pembatalan H-7 dapat dikenakan potongan biaya admin.",
      },
    ],
  },
];

export const QUICK_TASKS = [
  { icon: "receipt", t: "Lacak Pesanan", d: "Cek status & detail pesananmu", href: "#", tint: "#7068D5" },
  { icon: "refund", t: "Ajukan Refund", d: "Batalkan & kembalikan dana", href: "#", tint: "#F46263" },
  { icon: "wallet", t: "Status Pembayaran", d: "Cek pembayaran tertunda", href: "#", tint: "#2F8A5B" },
  { icon: "chat", t: "Chat WhatsApp", d: "Bicara langsung dengan CS", href: "#", tint: "#2F6FA5" },
];

export const POPULAR_Q = ["Bagaimana cara refund?", "Di mana e-tiket saya?", "Cara mengubah jadwal?", "Metode pembayaran", "Apa itu Atourin?"];
