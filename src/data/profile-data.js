export const USER = {
  name: "Aulia Priyono",
  points: 1240,
  tier: "Petualang",
  nextTier: "Wanderer",
  cumulative: 3450,
  tierProgress: 0.61,
  pointsToNext: 1550,
  badges: [
    { name: "Penjelajah Baru", icon: "🧭" },
    { name: "Pen-Ulasan Aktif", icon: "⭐" },
    { name: "Sahabat ARTI", icon: "🌳" },
  ],
  memberSince: "2023",
  completion: 0.85,
  stats: [
    { label: "Perjalanan", value: 12 },
    { label: "Ulasan", value: 8 },
    { label: "Kota", value: 12 },
  ],
  avatar: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=200&auto=format&fit=crop&q=70",
  cover: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
  fullName: "Aulia Priyono",
  birth: "9 September 1983",
  birthISO: "1983-09-09",
  gender: "Perempuan",
  job: "Wiraswasta/Pengusaha",
  city: "KOTA JAKARTA SELATAN",
  province: "DKI JAKARTA",
  nationality: "WNI",
  idType: "KTP",
  idNumber: "3314020909830002",
  interests: ["Alam", "Kuliner", "Edukasi", "Relaksasi", "Bahari", "Geowisata", "Olahraga", "Keluarga"],
  username: "aulia_priyono",
  email: "aulia.priyono@gmail.com",
  phone: "+6281393064499",
  socials: { twitter: "aulia.priyono", facebook: "aulia.priyono", instagram: "aulia.priyono" },
};

export const ALL_INTERESTS = [
  "Alam", "Kuliner", "Bahari", "Relaksasi", "Keluarga", "Belanja", "Sejarah",
  "Seni & Budaya", "Olahraga", "Geowisata", "Edukasi", "Religi", "Ekowisata",
  "Agrowisata", "Birdwatching",
];

export const GENDER_OPTS = ["Perempuan", "Laki-laki"];
export const JOB_OPTS = ["Wiraswasta/Pengusaha", "Karyawan Swasta", "PNS/ASN", "Pelajar/Mahasiswa", "Lainnya"];
export const NATION_OPTS = ["WNI", "WNA"];
export const IDTYPE_OPTS = ["KTP", "Paspor", "SIM"];
export const PROVINCE_OPTS = ["DKI JAKARTA", "JAWA BARAT", "JAWA TENGAH", "DI YOGYAKARTA", "BALI", "NUSA TENGGARA BARAT"];
export const CITY_OPTS = ["KOTA JAKARTA SELATAN", "KOTA JAKARTA PUSAT", "KOTA BANDUNG", "KOTA YOGYAKARTA", "KOTA DENPASAR"];

export const ORDER_STATS = [
  { key: "mengisi", label: "Mengisi Data", sub: "Menunggu pengisian data", count: 0, tone: "blue", icon: "edit" },
  { key: "belum", label: "Belum Bayar", sub: "Menunggu pembayaran", count: 2, tone: "yellow", icon: "wallet" },
  { key: "aktif", label: "Aktif", sub: "Tiket siap digunakan", count: 1, tone: "purple", icon: "ticket" },
  { key: "selesai", label: "Selesai", sub: "Pesanan selesai", count: 12, tone: "dark", icon: "check" },
];

export const ORDER_TABS = ["Semua", "Mengisi Data", "Belum Bayar", "Aktif", "Selesai", "Dibatalkan"];

export const TRIP_TYPES = ["Bisnis", "Solo", "Keluarga", "Pasangan", "Bersama Teman", "Sekolah", "Kesehatan", "Lainnya"];
export const RATING_CATS = ["Kebersihan", "Pelayanan", "Lokasi", "Fasilitas"];

export const ORDERS = [
  { id: "ZQST0MTV", date: "29 MEI 2026", title: "Plaosan Romantic Cycling Tour", total: 230000, status: "belum",
    img: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&auto=format&fit=crop&q=70" },
  { id: "ATR-7K2K91", date: "29 MEI 2026", title: "Labuan Bajo Sailing, Padar & Komodo 4D3N", total: 11095000, status: "aktif",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&auto=format&fit=crop&q=70" },
  { id: "ATR-9P3M22", date: "24 MEI 2026", title: "Wae Rebo Heritage Tour", total: 2950000, status: "belum",
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&auto=format&fit=crop&q=70" },
  { id: "BH5H2RXD", date: "29 MEI 2026", title: "ATV Experience", total: 150000, status: "ignore",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=70" },
  { id: "492JYGK1", date: "22 MEI 2026", title: "Pasar Pancingan", total: 13000, status: "selesai",
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&auto=format&fit=crop&q=70" },
  { id: "BPI9HGPM", date: "22 MEI 2026", title: "Tiket Masuk Kampung Adat Prai Ijing | Entrance Ticket Prai Ijing Village", total: 5500, status: "ignore",
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&auto=format&fit=crop&q=70" },
  { id: "9D3QP5OR", date: "22 MEI 2026", title: "Tiket Wisata Hutan Mangrove", total: 16000, status: "selesai", reviewed: true, myRating: 4.5,
    img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=400&auto=format&fit=crop&q=70" },
  { id: "PD4KS07Q", date: "22 MEI 2026", title: "ATV Experience", total: 160000, status: "selesai",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=70" },
  { id: "KMZ3X9TP", date: "18 MEI 2026", title: "Plaosan Romantic Cycling Tour", total: 230000, status: "batal",
    img: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&auto=format&fit=crop&q=70" },
  { id: "LP7Q2WRN", date: "16 MEI 2026", title: "Open Trip: Komodo Sailing 3D2N", total: 4245000, status: "batal",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&auto=format&fit=crop&q=70" },
];

export const WISH_PRODUCTS = [
  { id: "w1", city: "Klaten", rating: 4.5, reviews: null, title: "Jelajah Candi Plaosan", price: 110000, operator: "Desa Wisata Bugisan",
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500&auto=format&fit=crop&q=70" },
  { id: "w2", city: "Lombok Tengah", rating: 3.8, reviews: 14, title: "ATV Experience", price: 150000, operator: "Desa Wisata Hijau Bilebante",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=70" },
  { id: "w3", city: "Labuan Bajo", rating: 4.96, reviews: 88, title: "Wae Rebo + Labuan Bajo Combo 5D4N", price: 4800000, operator: "Flores Komodo Liveaboard",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=500&auto=format&fit=crop&q=70" },
  { id: "w4", city: "Yogyakarta", rating: 4.7, reviews: 22, title: "One Day Tour: Rejowinangun & Gembiraloka", price: 312000, operator: "Kampung Wisata Rejowinangun",
    img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&auto=format&fit=crop&q=70" },
  { id: "w5", city: "Bandung", rating: 4.6, reviews: 31, title: "Tangkuban Perahu Highland Tour", price: 285000, operator: "Bandung Highland Trip",
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500&auto=format&fit=crop&q=70" },
  { id: "w6", city: "Labuan Bajo", rating: 4.92, reviews: 412, title: "Komodo Sailing 3D2N", price: 2400000, operator: "Flores Komodo Liveaboard",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&auto=format&fit=crop&q=70" },
  { id: "w7", city: "Probolinggo", rating: 4.8, reviews: 44, title: "Bromo Midnight Sunrise Tour", price: 780000, operator: "Bromo Adventure",
    img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=500&auto=format&fit=crop&q=70" },
];

export const WISH_COLLECTIONS = [
  { id: "all", name: "Semua Produk", subtitle: "Lihat semua wishlist", count: 7, ids: ["w1", "w2", "w3", "w4", "w5", "w6", "w7"], special: true },
  { id: "coba", name: "Coba koleksi", count: 1, ids: ["w4"] },
  { id: "nataru", name: "Nataru", count: 2, ids: ["w2", "w1"] },
];

export const REVIEW_FILTERS = ["Semua", "Ada Media", "Ada Komentar"];

export const REVIEWS = [
  { id: "r1", product: "Arung Jeram Citarik", location: "Sukabumi", rating: 3.8, text: "Seru banget, pemandu ramah dan jeramnya menantang. Recommended buat yang cari adrenalin!",
    date: "20 Mei 2026", helpful: 4, media: ["https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=200&auto=format&fit=crop&q=70"],
    img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=300&auto=format&fit=crop&q=70" },
  { id: "r2", product: "Desa Wisata Wae Rebo", location: "Manggarai, NTT", rating: 5, text: "Menginap di rumah Mbaru Niang jadi pengalaman tak terlupakan. Warga ramah, kopinya juara, pemandangan negeri di atas awan.",
    date: "15 Mei 2026", helpful: 12, media: [],
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=300&auto=format&fit=crop&q=70" },
  { id: "r3", product: "Tiket Wisata Hutan Mangrove", location: "Surabaya", rating: 4.2, text: "Tracking mangrove-nya asri dan sejuk. Cocok buat foto-foto. Sayang toilet kurang terawat.",
    date: "10 Mei 2026", helpful: 7, media: ["https://images.unsplash.com/photo-1559825481-12a05cc00344?w=200&auto=format&fit=crop&q=70", "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=200&auto=format&fit=crop&q=70"],
    img: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=300&auto=format&fit=crop&q=70" },
];

export const INS_STATS = [
  { key: "aktif", label: "AKTIF", count: 3, tone: "green", icon: "shield" },
  { key: "menunggu", label: "MENUNGGU DATA", count: 7, tone: "yellow", icon: "clock" },
  { key: "semua", label: "SEMUA", count: 16, tone: "purple", icon: "folder" },
];

export const INS_TABS = ["Semua", "Aktif", "Menunggu Data"];

export const INSURANCES = [
  { code: "492JYGK1", status: "Aktif", reqId: "a972c1b2-0527-a03f-6f1a-44e2c3d9", premi: 1000, covered: 1, date: "22 Mei 2026",
    policies: [{ no: 1, name: "Aulia Priyono", policyNo: "7527009150526000007", ticketNo: "ATR-ATR-1S2HM-4GGC", idNo: "0000000000000000", premi: 1000, route: "Indonesia", dest: "Labuan Bajo Sailing, Padar & Komodo", depart: "12 Juni 2026 pukul 07.00", ret: "15 Juni 2026 pukul 17.00" }] },
  { code: "9D3QP5OR", status: "Failed", reqId: "e5b34111-f285-4162-bbf2-13a9c8d4", premi: 1000, covered: 1, date: "22 Mei 2026", policies: [] },
  { code: "PD4KS07Q", status: "Menunggu Data", reqId: "c9e82bec-61b2-40d6-8a31-77f0e1b2", premi: 5000, covered: 1, date: "22 Mei 2026", policies: [] },
  { code: "C9EC6JH3", status: "Failed", reqId: "2306bcc3-3ba4-40ed-8c19-9a0f5e6d", premi: 1000, covered: 1, date: "20 Mei 2026", policies: [] },
  { code: "YRGGUYQN", status: "Failed", reqId: "5e300f36-63ec-444b-bd02-6c4a1f7e", premi: 1000, covered: 1, date: "20 Mei 2026", policies: [] },
  { code: "S07JAJUM", status: "Menunggu Data", reqId: "56c3a49a-84e3-4599-a7b1-2d8f0c3a", premi: 5000, covered: 1, date: "20 Mei 2026", policies: [] },
  { code: "LXU8FYHH", status: "Failed", reqId: "25e6371c-7df4-4bc5-8120-3e9a6b1c", premi: 1000, covered: 1, date: "13 Mei 2026", policies: [] },
  { code: "W9O1BIYX", status: "Menunggu Data", reqId: "e9e2f5e8-1596-49c5-a3d0-8f1b2c7e", premi: 5000, covered: 1, date: "13 Mei 2026", policies: [] },
];

export const MY_ITINERARIES = [
  { id: "m1", city: "Yogyakarta", days: "3 Hari · 2 Malam", stops: 8, tag: "Culture", status: "published", visibility: "Publik", updated: "2 hari lalu", title: "Senja di Borobudur, Pagi di Prambanan",
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500&auto=format&fit=crop&q=70" },
  { id: "m2", city: "Bandung", days: "2 Hari · 1 Malam", stops: 5, tag: "Family", status: "draft", visibility: "Privat", updated: "5 hari lalu", title: "Weekend Lembang bareng Keluarga (draft)",
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500&auto=format&fit=crop&q=70" },
  { id: "m3", city: "Probolinggo", days: "2 Hari · 1 Malam", stops: 6, tag: "Adventure", status: "draft", visibility: "Privat", updated: "kemarin", title: "Bromo Midnight, Sunrise & Bukit Cinta",
    img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=500&auto=format&fit=crop&q=70" },
];

export const SAVED_ITINERARIES = [
  { id: "s1", city: "Labuan Bajo", days: "4 Hari · 3 Malam", tag: "Adventure", title: "Sailing Komodo, Padar, Pink Beach & Komodo", author: "Andini M.", role: "Local Expert", price: "Rp4.2jt", rating: 4.9, savedAt: "Disimpan 21 Mei",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&auto=format&fit=crop&q=70" },
  { id: "s2", city: "Lombok Tengah", days: "1 Hari", tag: "Adventure", title: "One Day Tour Mandalika & Kuta Lombok", author: "Bagas P.", role: "Tour Guide", price: "Rp480rb", rating: 4.6, savedAt: "Disimpan 18 Mei",
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=500&auto=format&fit=crop&q=70" },
  { id: "s3", city: "Danau Toba", days: "5 Hari · 4 Malam", tag: "Honeymoon", title: "Toba & Samosir untuk Pasangan", author: "Citra L.", role: "Local Expert", price: "Rp3.9jt", rating: 4.8, savedAt: "Disimpan 12 Mei",
    img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=500&auto=format&fit=crop&q=70" },
];

export const ITINERARIES = [
  { id: "i1", city: "Yogyakarta", days: "3 Hari · 2 Malam", tag: "Culture", title: "Senja di Borobudur, Pagi di Prambanan", role: "Local Expert", price: "Rp1.2jt", rating: 4.8, views: 1240,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500&auto=format&fit=crop&q=70" },
  { id: "i2", city: "Lombok Tengah", days: "1 Hari", tag: "Adventure", title: "One Day Tour Mandalika & Kuta Lombok", role: "Tour Guide", price: "Rp480rb", rating: 4.6, views: 870,
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=500&auto=format&fit=crop&q=70" },
  { id: "i3", city: "Labuan Bajo", days: "4 Hari · 3 Malam", tag: "Adventure", title: "Sailing Komodo, Padar, Pink Beach & Komodo", role: "Local Expert", price: "Rp4.2jt", rating: 4.9, views: 2310,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&auto=format&fit=crop&q=70" },
  { id: "i4", city: "Bandung", days: "2 Hari · 1 Malam", tag: "Family", title: "Weekend Lembang bareng Keluarga", role: "Family Traveler", price: "Rp950rb", rating: 4.5, views: 640,
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500&auto=format&fit=crop&q=70" },
  { id: "i5", city: "Probolinggo", days: "2 Hari · 1 Malam", tag: "Adventure", title: "Bromo Midnight, Sunrise & Bukit Cinta", role: "Tour Guide", price: "Rp780rb", rating: 4.7, views: 1530,
    img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=500&auto=format&fit=crop&q=70" },
  { id: "i6", city: "Danau Toba", days: "5 Hari · 4 Malam", tag: "Honeymoon", title: "Toba & Samosir untuk Pasangan", role: "Local Expert", price: "Rp3.9jt", rating: 4.8, views: 980,
    img: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=500&auto=format&fit=crop&q=70" },
];

export const REF_CODE = "ATR-RIVO7";
export const REF_FRIENDS = [
  { name: "Dimas Prasetyo", status: "reward", date: "28 Mei 2026", reward: 300 },
  { name: "Nadia Ananta", status: "pending", date: "30 Mei 2026", reward: 0 },
  { name: "rahmat****@gmail.com", status: "daftar", date: "01 Jun 2026", reward: 0 },
];

export const LOYW_TIERS = [
  { key: "Penjelajah", min: 0, color: "#7068D5", icon: "🧭", perks: ["Poin tiap transaksi", "Promo khusus member"] },
  { key: "Petualang", min: 1000, color: "#2A8A3B", icon: "⛺", perks: ["Early access fitur baru", "Bonus top-up Atourin Pay +1%", "Badge Petualang"] },
  { key: "Wanderer", min: 5000, color: "#1F6FB0", icon: "🌊", perks: ["Diskon 5% semua pemesanan", "Priority support", "Konten editorial premium"] },
  { key: "Maestro Nusantara", min: 20000, color: "#B47A00", icon: "🏆", perks: ["Diskon 10% + cashback 3% ke Pay", "Undangan event eksklusif", "Verified Traveler & akses beta"] },
];

export const LOYW = {
  points: 1240, cumulative: 3450, tier: "Petualang", next: "Wanderer", toNext: 1550, expiring: 120, streak: 5,
  history: [
    { label: "Booking Sailing Komodo", date: "20 Mei 2026", delta: 135, kind: "Transaksi" },
    { label: "Reward referral · Dimas", date: "28 Mei 2026", delta: 300, kind: "Referral" },
    { label: "Tukar · Voucher Rp25.000", date: "15 Mei 2026", delta: -500, kind: "Tukar" },
    { label: "Ulasan + foto Wae Rebo", date: "15 Mei 2026", delta: 50, kind: "Ulasan" },
    { label: "Bayar pakai Atourin Pay (2×)", date: "12 Mei 2026", delta: 270, kind: "Bonus" },
  ],
  rewards: {
    Diskon: [{ id: "d1", name: "Diskon Rp5.000", cost: 500, icon: "🏷️" }, { id: "d2", name: "Diskon Rp25.000", cost: 2500, icon: "🏷️" }],
    "Atourin Pay": [{ id: "p1", name: "Saldo Rp4.000", cost: 500, icon: "💳" }, { id: "p2", name: "Saldo Rp10.000", cost: 1200, icon: "💳" }],
    Merchandise: [{ id: "m1", name: "Stiker Atourin", cost: 300, icon: "🎨", stok: "Stok 40" }, { id: "m2", name: "Kaos Atourin", cost: 4000, icon: "👕", stok: "Stok 12" }],
    Donasi: [{ id: "do1", name: "Konservasi Komodo", cost: 200, icon: "🦎" }, { id: "do2", name: "Terumbu Karang", cost: 200, icon: "🪸" }],
    Upgrade: [{ id: "u1", name: "Itinerary Premium", cost: 1000, icon: "🗺️" }],
  },
  missions: [
    { id: "m1", title: "Selesaikan 1 booking bulan ini", reward: 150, prog: 0, total: 1, type: "Transaksi" },
    { id: "m2", title: "Tulis 3 ulasan", reward: 120, prog: 2, total: 3, type: "Sosial" },
    { id: "m3", title: "Kunjungi detail 5 atraksi", reward: 100, prog: 3, total: 5, type: "Explore" },
  ],
  badges: [
    { name: "Penjelajah Baru", icon: "🧭", earned: true }, { name: "Pen-Ulasan Aktif", icon: "⭐", earned: true },
    { name: "Fotografer Alam", icon: "📷", earned: true }, { name: "Desa Wisata Lover", icon: "🏡", earned: false },
    { name: "Penjelajah 5 Pulau", icon: "🏝️", earned: false }, { name: "Indonesia Banget", icon: "🌏", earned: false },
  ],
  leaderboard: [
    { rank: 1, name: "Rama S.", pts: 9820 }, { rank: 2, name: "Aulia Priyono", pts: 3450, me: true }, { rank: 3, name: "Nadia A.", pts: 3110 },
  ],
};

export const PAYW_TX = [
  { label: "Cashback Sailing Komodo", date: "21 Mei 2026", amt: 67500, kind: "cashback" },
  { label: "Bayar · Tiket Tana Toraja", date: "20 Mei 2026", amt: -150000, kind: "keluar" },
  { label: "Top Up · BCA Virtual Account", date: "18 Mei 2026", amt: 200000, kind: "masuk" },
  { label: "Refund · Homestay Ubud", date: "15 Mei 2026", amt: 320000, kind: "refund" },
  { label: "Bayar · Desa Wisata Penglipuran", date: "12 Mei 2026", amt: -95000, kind: "keluar" },
];

export const PAYW_PRESETS = [50000, 100000, 200000, 500000];
export const PAYW_METHODS = [
  { id: "va", name: "Virtual Account (BCA)", est: "Instan", icon: "🏦" },
  { id: "qris", name: "QRIS", est: "Instan", icon: "📱" },
  { id: "gopay", name: "GoPay", est: "Instan", icon: "🟢" },
  { id: "card", name: "Kartu Kredit/Debit", est: "± 1 menit", icon: "💳" },
];

export const AFFW_LINKS = [
  { product: "Sailing Komodo 3D2N", type: "Paket", clicks: 1240, uniq: 980, conv: 18, rate: "4%", comm: 540000 },
  { product: "Jasa Pemandu · Andre W.", type: "Pemandu", clicks: 880, uniq: 654, conv: 12, rate: "5%", comm: 425000 },
  { product: "Tiket Tana Toraja", type: "Atraksi", clicks: 2110, uniq: 1580, conv: 24, rate: "2%", comm: 168000 },
];

export const MY_JOURNALS = [
  { title: "Petualangan di Labuan Bajo", loc: "NTT", days: 4, privacy: "Publik", views: 124, cover: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&auto=format&fit=crop&q=70" },
  { title: "Slow Living di Ubud", loc: "Bali", days: 3, privacy: "Teman", views: 0, cover: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=400&auto=format&fit=crop&q=70" },
];

export const MOODS_W = [["😍", "Luar Biasa"], ["😊", "Menyenangkan"], ["😐", "Biasa"], ["😔", "Kurang"]];
