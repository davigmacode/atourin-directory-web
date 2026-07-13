export const HOME_CATS = [
  { id: "experience", label: "Experience", icon: "sparkle", tint: "#7068D5", href: "/market/experience" },
  { id: "attraction", label: "Attraction", icon: "camera", tint: "#2F8A5B", href: "/market/attractions" },
  { id: "homestay", label: "Homestay", icon: "home", tint: "#2F6FA5", href: "/market/homestay" },
  { id: "village", label: "Desa Wisata", icon: "village", tint: "#9B6AAB", href: "/explore/tourism-villages" },
  { id: "guide", label: "Tour Guide", icon: "guide", tint: "#C99500", href: "/explore/tour-guides" },
  { id: "promo", label: "Promo", icon: "tag", tint: "#F46263", href: "/promo" },
  { id: "itinerary", label: "Itinerary", icon: "route", tint: "#3FA7B5", href: "/explore/itinerary" },
  { id: "artikel", label: "Artikel", icon: "doc", tint: "#6C7B9C", href: "/explore" },
  { id: "bantuan", label: "Bantuan", icon: "help", tint: "#51B054", href: "/help-center" },
];

export const HOME_STATS = [
  { value: "12.000+", label: "Aktivitas & tiket" },
  { value: "540+", label: "Desa wisata" },
  { value: "1.200+", label: "Pemandu bersertifikat" },
  { value: "4.8★", label: "Rating pelanggan" },
];

export const HOME_PROMOS = [
  {
    id: "p1",
    badge: "25% OFF",
    tone: "purple",
    title: "Diskon Akhir Pekan ke Labuan Bajo",
    period: "1 Mei – 30 Jun 2026",
    code: "WEEKEND25",
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "p2",
    badge: "Cashback 50K",
    tone: "green",
    title: "Cashback Tiket Wisata Alam",
    period: "Selamanya",
    code: "ATR50K",
    img: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "p3",
    badge: "Gratis ARTI",
    tone: "green",
    title: "Tanam 1 Pohon tiap Pesanan",
    period: "Selamanya",
    code: "ARTI10",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=70",
  },
];

export const HOME_PROD_FILTERS = ["Semua", "Muslim-Friendly", "Gastronomi", "Wellness", "Petualangan"];

export const HOME_PRODUCTS = [
  {
    id: "h1",
    cat: "Experience",
    city: "Klaten",
    rating: 4.5,
    reviews: 32,
    title: "Jelajah Candi Plaosan",
    price: 110000,
    operator: "Desa Wisata Bugisan",
    tags: ["Muslim-Friendly"],
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h2",
    cat: "Experience",
    city: "Lombok Tengah",
    rating: 3.8,
    reviews: 14,
    title: "ATV Experience Bilebante",
    price: 150000,
    priceOld: 170000,
    operator: "Desa Wisata Hijau Bilebante",
    tags: ["Petualangan"],
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h3",
    cat: "Experience",
    city: "Maluku Tengah",
    rating: 4.9,
    reviews: 58,
    title: "Open Trip Banda Naira 4D3N",
    price: 2999000,
    operator: "Banda Neira Tour",
    tags: ["Petualangan"],
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h4",
    cat: "Experience",
    city: "Yogyakarta",
    rating: 4.7,
    reviews: 22,
    title: "Tur Kuliner Malioboro Malam",
    price: 175000,
    priceOld: 220000,
    operator: "Jogja Food Walk",
    tags: ["Gastronomi"],
    img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h5",
    cat: "Attraction",
    city: "Gianyar",
    rating: 4.6,
    reviews: 41,
    title: "Tiket Air Terjun Manuaba",
    price: 25000,
    priceOld: 35000,
    operator: "Manuaba Waterfall",
    tags: ["Wellness"],
    img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h6",
    cat: "Experience",
    city: "Bandung",
    rating: 4.6,
    reviews: 31,
    title: "Highland Tour & Spa Ciwidey",
    price: 285000,
    operator: "Bandung Highland Trip",
    tags: ["Wellness"],
    img: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h7",
    cat: "Experience",
    city: "Labuan Bajo",
    rating: 4.92,
    reviews: 412,
    title: "Komodo Sailing 3D2N",
    price: 2400000,
    priceOld: 3100000,
    operator: "Flores Komodo Liveaboard",
    tags: ["Petualangan"],
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "h8",
    cat: "Experience",
    city: "Solo",
    rating: 4.4,
    reviews: 19,
    title: "Heritage Walk & Batik Workshop",
    price: 135000,
    operator: "Solo Heritage",
    tags: ["Gastronomi", "Muslim-Friendly"],
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=70",
  },
];

export const JELAJAHI_TABS = [
  { id: "experience", label: "Experience" },
  { id: "attraction", label: "Attraction" },
  { id: "homestay", label: "Homestay" },
];

export const HOME_VILLAGES = [
  {
    id: "v1",
    name: "Desa Wisata Bugisan",
    region: "Klaten, Jawa Tengah",
    rating: 4.7,
    count: 12,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "v2",
    name: "Desa Hijau Bilebante",
    region: "Lombok Tengah, NTB",
    rating: 4.6,
    count: 9,
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "v3",
    name: "Kampung Rejowinangun",
    region: "Yogyakarta, DIY",
    rating: 4.8,
    count: 15,
    img: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "v4",
    name: "Desa Wisata Wae Rebo",
    region: "Manggarai, NTT",
    rating: 4.9,
    count: 7,
    img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&auto=format&fit=crop&q=70",
  },
];

export const HOME_WHY = [
  {
    id: "w1",
    icon: "guide",
    title: "Pemandu Lokal Bersertifikat",
    text: "Ditemani local expert yang paham betul cerita & budaya tiap destinasi.",
  },
  {
    id: "w2",
    icon: "leaf",
    title: "Liburan Ramah Bumi (ARTI)",
    text: "Setiap pemesanan menanam pohon, jejak karbon perjalananmu terkompensasi.",
  },
  {
    id: "w3",
    icon: "verified",
    title: "Desa Wisata Resmi",
    text: "Mitra desa wisata terverifikasi pemerintah & terdaftar GSTC.",
  },
  {
    id: "w4",
    icon: "shield",
    title: "Aman & Terlindungi",
    text: "Pembayaran aman, e-tiket instan, dan opsi asuransi perjalanan.",
  },
];

export const HOME_ARTICLES = [
  {
    id: "a1",
    cat: "Desa Wisata",
    date: "21 Mei 2026",
    title: "Hingga Sini Open House Mejik Masuk Desa Bilebante",
    excerpt: "Mengintip aktivitas seru sekaligus belajar tani organik di Lombok.",
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "a2",
    cat: "Inspirasi",
    date: "18 Mei 2026",
    title: "5 Spot Sunrise Terbaik di Indonesia Timur",
    excerpt: "Dari Bromo hingga Banda Naira, ini deretan langit pagi paling memukau.",
    img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "a3",
    cat: "Tips",
    date: "15 Mei 2026",
    title: "Panduan Open Trip buat Pemula",
    excerpt: "Persiapan, etika, dan tips hemat agar open trip pertamamu lancar.",
    img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: "a4",
    cat: "Kuliner",
    date: "12 Mei 2026",
    title: "Jelajah Rasa: Kuliner Legendaris Yogyakarta",
    excerpt: "Menyusuri gudeg, sate klathak, sampai kopi joss di sudut kota.",
    img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&auto=format&fit=crop&q=70",
  },
];

export const HOME_TESTIMONIALS = [
  {
    id: "t1",
    name: "Andini Mahardika",
    trip: "Open Trip Banda Naira",
    rating: 5,
    text: "Pemandunya ramah banget dan tahu semua spot tersembunyi. Liburan paling berkesan tahun ini!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=70",
  },
  {
    id: "t2",
    name: "Bagas Pratama",
    trip: "ATV Experience Bilebante",
    rating: 5,
    text: "Booking gampang, e-tiket langsung masuk email. Desanya asri, wargane super welcome.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=70",
  },
  {
    id: "t3",
    name: "Citra Lestari",
    trip: "Heritage Walk Solo",
    rating: 4.5,
    text: "Suka konsep ARTI-nya, jalan-jalan sambil ikut menjaga lingkungan. Recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=70",
  },
];

export const HOME_SEO = {
  Experience: [
    "Open Trip Banda Naira 4D3N",
    "ATV Experience",
    "Plaosan Romantic Cycling",
    "Tur Kuliner Malioboro",
    "Komodo Sailing 3D2N",
    "Heritage Walk Solo",
    "Highland Tour Ciwidey",
    "Sunrise Bromo Midnight",
  ],
  Attraction: [
    "Air Terjun Manuaba",
    "Hutan Mangrove",
    "Kampung Adat Prai Ijing",
    "Pasar Pancingan",
    "Candi Plaosan",
    "Pulau Padar",
    "Taman Nasional Komodo",
    "Kawah Putih",
  ],
  Homestay: [
    "Homestay Candirejo",
    "Homestay Bilebante",
    "Homestay Wae Rebo",
    "Homestay Dieng",
    "Homestay Toba",
    "Homestay Bromo",
    "Homestay Rejowinangun",
    "Homestay Sade",
  ],
};

export const HOME_DESTINATIONS = [
  {
    name: "Labuan Bajo",
    count: 142,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Lombok",
    count: 128,
    img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Yogyakarta",
    count: 94,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Raja Ampat",
    count: 42,
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
  },
];

export const HOME_VOUCHERS = [
  {
    id: "vc1",
    value: "25%",
    kind: "DISKON",
    title: "Diskon Akhir Pekan",
    partner: "Atourin",
    code: "WEEKEND25",
    min: "Min. transaksi Rp200.000",
  },
  {
    id: "vc2",
    value: "Gratis",
    kind: "ARTI",
    title: "Tanam 1 Pohon Ekstra",
    partner: "ARTI by Atourin",
    code: "ARTI10",
    min: "Semua transaksi",
  },
  {
    id: "vc3",
    value: "Rp50.000",
    kind: "CASHBACK",
    title: "Cashback Wisata Alam",
    partner: "Atourin",
    code: "ATR50K",
    min: "Min. transaksi Rp500.000",
  },
  {
    id: "vc4",
    value: "20%",
    kind: "DISKON",
    title: "Liburan Labuan Bajo",
    partner: "Flores Komodo",
    code: "ATRJALAN20",
    min: "Min. transaksi Rp1.000.000",
  },
];

export const SAVE_COLLECTIONS = [
  { id: "all", name: "Semua Produk", count: 7, special: true },
  {
    id: "coba",
    name: "Coba koleksi",
    count: 1,
    img: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=120&auto=format&fit=crop&q=70",
  },
  {
    id: "nataru",
    name: "Nataru",
    count: 2,
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=120&auto=format&fit=crop&q=70",
  },
];
