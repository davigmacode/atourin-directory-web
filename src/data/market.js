/* Image bank (Unsplash) */
export const EXP_IMG = {
  banda: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
  atv: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=900&auto=format&fit=crop&q=70",
  cycling: "https://images.unsplash.com/photo-1473800447596-01729482b8eb?w=900&auto=format&fit=crop&q=70",
  dieng: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70",
  tempodoeloe: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70",
  rejowinangun: "https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=900&auto=format&fit=crop&q=70",
  pringtutul: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&auto=format&fit=crop&q=70",
  bromo: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=900&auto=format&fit=crop&q=70",
  kuliner: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=70",
  candi: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70",
  pendingsari: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
  vw: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&auto=format&fit=crop&q=70",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=70",
  karangasem: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=70",
  bilebante: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=900&auto=format&fit=crop&q=70",
  natuna: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&auto=format&fit=crop&q=70",
  bike: "https://images.unsplash.com/photo-1473800447596-01729482b8eb?w=900&auto=format&fit=crop&q=70",
  rafting: "https://images.unsplash.com/photo-1530866495561-456fcc6dec76?w=900&auto=format&fit=crop&q=70",
  karimun: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=70",
  trekking: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&auto=format&fit=crop&q=70",
  studytour: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&auto=format&fit=crop&q=70",
  rinjani: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=900&auto=format&fit=crop&q=70",
  pancing: "https://images.unsplash.com/photo-1530866495561-456fcc6dec76?w=900&auto=format&fit=crop&q=70",
};

const OP_AVATAR = (n) => `https://i.pravatar.cc/64?img=${n}`;

export const EXPERIENCE_DATA = [
  { img: EXP_IMG.banda,        tag: "Best Seller", region: "Maluku Tengah",   name: "Open Trip: Banda Naira 4D3N",                price: 2399000, strike: 2999000, discount: 20, operator: "Banda Neira Tour",       opAvatar: OP_AVATAR(12) },
  { img: EXP_IMG.atv,           tag: "Best Seller", region: "Lombok Tengah",   name: "ATV Experience di Bilebante",                price: 150000,  operator: "Desa Wisata Hijau Bilebante", opAvatar: OP_AVATAR(32) },
  { img: EXP_IMG.cycling,       tag: "Best Seller", region: "Klaten",           name: "Plaosan Romantic Cycling Tour",              price: 220000,  operator: "Desa Wisata Bugisan",     opAvatar: OP_AVATAR(47) },
  { img: EXP_IMG.dieng,         tag: "Best Seller", region: "Banjarnegara",     name: "Open Trip: Dieng Culture Festival",          price: 2999000, strike: 3699000, discount: 19, operator: "Expediso Tour",           opAvatar: OP_AVATAR(15) },
  { img: EXP_IMG.tempodoeloe,   tag: "Best Seller", region: "Yogyakarta",       name: "Kotagede Tempo Doeloe Walking Tour",         price: 140000,  operator: "Kampung Wisata Purbayan", opAvatar: OP_AVATAR(22) },
  { img: EXP_IMG.rejowinangun,  tag: "Best Seller", region: "Magelang",         name: "One Day Tour: Rejowinangun & Gembiraloka",   price: 312000,  operator: "Kampung Wisata Rejowinangun", opAvatar: OP_AVATAR(8) },
  { img: EXP_IMG.pringtutul,    tag: "Best Seller", region: "Malang",           name: "2H 1M di Boonpring Sanankerto",              price: 550000,  operator: "Desa Wisata Sanankerto",  opAvatar: OP_AVATAR(51) },
  { img: EXP_IMG.bromo,         tag: "Best Seller", region: "Malang",           name: "Explore Bromo with Long Jeep",               price: 190000,  operator: "JJM Tour and Travel",     opAvatar: OP_AVATAR(64) },
  { img: EXP_IMG.kuliner,       tag: "Best Seller", region: "Lombok Tengah",    name: "Kuliner Dulang, Ayam Merangkat",            price: 165000,  operator: "Desa Wisata Hijau Bilebante", opAvatar: OP_AVATAR(11) },
  { img: EXP_IMG.candi,         tag: "Best Seller", region: "Klaten",           name: "Jelajah Candi Plaosan",                       price: 110000,  operator: "Desa Wisata Bugisan",     opAvatar: OP_AVATAR(33) },
  { img: EXP_IMG.pendingsari,   tag: "Best Seller", region: "Sleman",           name: "Fieldtrip Desa Pentingsari",                  price: 201000,  operator: "Desa Wisata Pentingsari", opAvatar: OP_AVATAR(20) },
  { img: EXP_IMG.vw,            tag: "Best Seller", region: "Magelang",         name: "Village Tour VW Safari",                      price: 400000,  operator: "Dolan Ndeso Karangrejo",  opAvatar: OP_AVATAR(45) },
  { img: EXP_IMG.spa,           tag: "Best Seller", region: "Lombok Tengah",    name: "Spa for Women",                                price: 65000,   operator: "Desa Wisata Hijau Bilebante", opAvatar: OP_AVATAR(28), discount: 20, strike: 81000 },
  { img: EXP_IMG.karangasem,    tag: "Best Seller", region: "Magelang",         name: "2H 1M di Karanganyar",                         price: 700000,  operator: "Desa Wisata Karanganyar", opAvatar: OP_AVATAR(9) },
  { img: EXP_IMG.bilebante,     tag: "Best Seller", region: "Majalengka",       name: "Short Trekking & Jelajah Alam Kaki Gunung Ciremai (Daweuan)", price: 145000, operator: "Desa Wisata Bantar Agung", opAvatar: OP_AVATAR(40) },
  { img: EXP_IMG.natuna,        tag: "Best Seller", region: "Kuta Karangrejem", name: "Last Chance Tourism: Pesut Mahakam",          price: 1999000, operator: "Desa Wisata Pela",        opAvatar: OP_AVATAR(7) },
  { img: EXP_IMG.bike,          tag: "Best Seller", region: "Jakarta Selatan",  name: "Half Day Tour: Kampung Betawi",                price: 110000,  operator: "Perkampungan Budaya Betawi", opAvatar: OP_AVATAR(14) },
  { img: EXP_IMG.rafting,       tag: "Best Seller", region: "Natuna",           name: "Open Trip: 4D3N Pulau Natuna",                 price: 2799000, strike: 3499000, discount: 20, operator: "Costa Natuna Wisata",     opAvatar: OP_AVATAR(38) },
  { img: EXP_IMG.karimun,       tag: "Best Seller", region: "Lombok Tengah",    name: "Bike Tour Bilebante",                          price: 165000,  operator: "Desa Wisata Hijau Bilebante", opAvatar: OP_AVATAR(26), discount: 10, strike: 183000 },
  { img: EXP_IMG.trekking,      tag: "Best Seller", region: "Sumba",            name: "Live in 2H 1M",                                 price: 399000,  operator: "Desa Wisata Waringgar",   opAvatar: OP_AVATAR(53) },
  { img: EXP_IMG.studytour,     tag: "Best Seller", region: "Kulon Progo",      name: "Paket Wisata Jogja 1 Hari (Outbound & Jeep)", price: 350000,  operator: "DETA Wisata Tinalah",     opAvatar: OP_AVATAR(19) },
  { img: EXP_IMG.cycling,       tag: "Best Seller", region: "Badung",           name: "Cycling and BBQ at Alam Tirta",                price: 389000,  operator: "Desa Wisata Carangsari",  opAvatar: OP_AVATAR(56) },
  { img: EXP_IMG.rinjani,       tag: "Best Seller", region: "Jepara",            name: "Explore 3D2N Karimun Jawa",                    price: 2999000, operator: "Travelopkita.id and Travel", opAvatar: OP_AVATAR(43) },
  { img: EXP_IMG.studytour,     tag: "Best Seller", region: "Yogyakarta",       name: "Studi Tiru Kampung Wisata",                    price: 179000,  operator: "Kampung Wisata Pajawayan", opAvatar: OP_AVATAR(31) },
];

export const EXP_SUGGESTIONS = [
  { title: "Paket Wisata Sepeda", region: "Magelang, Jawa Tengah", img: EXP_IMG.cycling },
  { title: "Sepeda Tour Candirejo", region: "Magelang, Jawa Tengah", img: EXP_IMG.cycling },
  { title: "Paket Sepeda Half Day Tour", region: "Lombok Barat, NTB", img: EXP_IMG.bike },
  { title: "Bersepeda Mengelilingi Kampung dan Persawahan", region: "Magelang, Jawa Tengah", img: EXP_IMG.cycling },
  { title: "Trekking Gunung Rinjani", region: "Lombok Timur, NTB", img: EXP_IMG.rinjani },
  { title: "Open Trip Bromo Sunrise", region: "Probolinggo, Jawa Timur", img: EXP_IMG.bromo },
  { title: "ATV Adventure Bilebante", region: "Lombok Tengah, NTB", img: EXP_IMG.atv },
  { title: "Spa Tradisional Lombok", region: "Lombok Tengah, NTB", img: EXP_IMG.spa },
];

export const EXP_CATEGORIES = [
  "Alam",
  "Bahari",
  "Belanja",
  "Bird Watching",
  "Edukasi",
  "Ekowisata",
  "Ekstrem",
  "Geowisata",
  "Kuliner",
  "Museum",
  "Olahraga",
  "Petualangan",
  "Religi",
  "Sejarah",
  "Seni & Budaya",
  "Urban Legend",
  "Wellness",
];

export const EXP_CATEGORY_TILES = [
  { label: "Alam", icon: "🌿", bg: "#D9F2DA", count: "184 produk" },
  { label: "Bahari", icon: "🏝️", bg: "#CFE7F8", count: "92 produk" },
  { label: "Kuliner", icon: "🍜", bg: "#FFE5C8", count: "76 produk" },
  { label: "Seni & Budaya", icon: "🎭", bg: "#F0D9F4", count: "128 produk" },
  { label: "Petualangan", icon: "🧗", bg: "#FFD7D7", count: "64 produk" },
  { label: "Edukasi", icon: "📚", bg: "#E9E4FF", count: "48 produk" },
  { label: "Religi", icon: "🕌", bg: "#FFF0BD", count: "38 produk" },
  { label: "Wellness", icon: "💆", bg: "#E0F5E8", count: "29 produk" },
];

export const EXP_PROMOS = [
  { eyebrow: "Promo akhir tahun", title: "Hemat sampai 30% untuk Open Trip", sub: "Berlaku untuk semua trip 3D2N ke atas. S&K berlaku.", cta: "Lihat promo", emoji: "🎁", bg: "#FFF1D6", fg: "#5C4400" },
  { eyebrow: "Best seller", title: "Pengalaman favorit traveler", sub: "12 produk paling banyak dipesan minggu ini.", cta: "Lihat daftar", emoji: "⭐", bg: "#E9E4FF", fg: "#3A2F8C" },
  { eyebrow: "Untukmu", title: "Kurasi sesuai minatmu", sub: "Rekomendasi pengalaman berdasarkan riwayat pencarian.", cta: "Mulai jelajah", emoji: "✨", bg: "#D9F2DA", fg: "#1F5E2A" },
];

export const ATTR_IMG = {
  waterfall: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?w=900&auto=format&fit=crop&q=70",
  mangrove: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
  sumba: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70",
  pasar: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&auto=format&fit=crop&q=70",
  breksi: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=900&auto=format&fit=crop&q=70",
  anoman: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70",
  prai: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=900&auto=format&fit=crop&q=70",
  ohoi: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?w=900&auto=format&fit=crop&q=70",
  tongkarayya: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&auto=format&fit=crop&q=70",
  palalangon: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
  karodi: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70",
  gejok: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70",
};

export const ATTRACTION_DATA = [
  { img: ATTR_IMG.waterfall,    tag: "Best Seller", category: "Air Terjun", hours: "06.00–18.00", region: "Gianyar",          name: "Manuaba Waterfall",                            price: 15000,  operator: "Desa Wisata Kenderan",        opAvatar: OP_AVATAR(11) },
  { img: ATTR_IMG.mangrove,     tag: "Best Seller", category: "Alam",        hours: "07.00–17.00", region: "Minahasa Utara",   name: "Tiket Wisata Hutan Mangrove",                  price: 10000,  strike: 15000, discount: 33, operator: "Desa Wisata Budo",         opAvatar: OP_AVATAR(22) },
  { img: ATTR_IMG.sumba,        tag: "Best Seller", category: "Seni & Budaya", hours: "08.00–17.00", region: "Sumba Barat",     name: "Tiket Masuk Kampung Adat Prai Ijing",          price: 5500,   operator: "Kampung Adat Prai Ijing",     opAvatar: OP_AVATAR(33) },
  { img: ATTR_IMG.pasar,        tag: "Baru",        category: "Kuliner",     hours: "06.00–12.00", region: "Lombok Tengah",    name: "Pasar Pancingan",                              price: 7000,   operator: "Desa Wisata Hijau Bilebante", opAvatar: OP_AVATAR(44) },
  { img: ATTR_IMG.breksi,       tag: "Best Seller", category: "Alam",        hours: "05.00–21.00", region: "Sleman",            name: "Taman Tebing Breksi",                          price: 10000,  operator: "Desa Wisata Sambi",           opAvatar: OP_AVATAR(55) },
  { img: ATTR_IMG.anoman,                           category: "Seni & Budaya", hours: "19.30–21.30", region: "Klaten",            name: "Tari Anoman Obong",                           price: 150000, strike: 200000, discount: 25, operator: "Desa Wisata Bugisan",      opAvatar: OP_AVATAR(66) },
  { img: ATTR_IMG.prai,         tag: "Best Seller", category: "Seni & Budaya", hours: "08.00–16.00", region: "Sumba Barat",     name: "Sewa Baju Adat Sumba",                         price: 55000,  operator: "Kampung Adat Prai Ijing",     opAvatar: OP_AVATAR(13) },
  { img: ATTR_IMG.ohoi,         tag: "Best Seller", category: "Air Terjun", hours: "07.00–17.00", region: "Maluku Tenggara",   name: "Air Terjun Ai Moun Ni Ohoi",                   price: 10000,  operator: "Desa Wisata Soinrat",         opAvatar: OP_AVATAR(24) },
  { img: ATTR_IMG.tongkarayya,                      category: "Gunung",      hours: "06.00–17.00", region: "Bulukumba",        name: "Batu Tongkarayya Cliff Climbing",              price: 99000, strike: 150000, discount: 34, operator: "Desa Wisata Andalan",         opAvatar: OP_AVATAR(35) },
  { img: ATTR_IMG.palalangon,   tag: "Best Seller", category: "Taman",       hours: "07.00–17.30", region: "Bandung",           name: "Palalangon Park",                              price: 15000,  operator: "Palalangon Park",             opAvatar: OP_AVATAR(46) },
  { img: ATTR_IMG.karodi,       tag: "Baru",        category: "Bahari",      hours: "06.00–17.00", region: "Maluku Tenggara",   name: "Pulau Karodi",                                 price: 20000,  operator: "Desa Wisata Soinrat",         opAvatar: OP_AVATAR(57) },
  { img: ATTR_IMG.gejok,                            category: "Seni & Budaya", hours: "20.00–22.00", region: "Klaten",            name: "Kesenian Gejok Lesung",                         price: 200000, operator: "Desa Wisata Bugisan",         opAvatar: OP_AVATAR(68) },
];

export const ATTR_SUGGESTIONS = [
  { title: "Manuaba Waterfall", region: "Gianyar, Bali", img: ATTR_IMG.waterfall },
  { title: "Taman Tebing Breksi", region: "Sleman, DIY", img: ATTR_IMG.breksi },
  { title: "Hutan Mangrove", region: "Minahasa Utara, Sulut", img: ATTR_IMG.mangrove },
  { title: "Candi Borobudur", region: "Magelang, Jateng", img: ATTR_IMG.waterfall },
  { title: "Pulau Karodi", region: "Maluku Tenggara, Maluku", img: ATTR_IMG.karodi },
];

export const ATTR_CATEGORIES = [
  "Alam",
  "Bahari",
  "Edukasi",
  "Ekowisata",
  "Kuliner",
  "Museum",
  "Religi",
  "Sejarah",
  "Seni & Budaya",
  "Olahraga",
  "Air Terjun",
  "Pantai",
  "Gunung",
];

export const ATTR_CATEGORY_TILES = [
  { label: "Pantai", icon: "🏖️", bg: "#CFE7F8", count: "94 tiket" },
  { label: "Gunung", icon: "⛰️", bg: "#D9F2DA", count: "62 tiket" },
  { label: "Air Terjun", icon: "💦", bg: "#CFE7F8", count: "38 tiket" },
  { label: "Candi & Sejarah", icon: "🏛️", bg: "#FFF0BD", count: "45 tiket" },
  { label: "Museum", icon: "🖼️", bg: "#F0D9F4", count: "28 tiket" },
  { label: "Religi", icon: "🕌", bg: "#FFF0BD", count: "31 tiket" },
  { label: "Taman", icon: "🌳", bg: "#D9F2DA", count: "52 tiket" },
  { label: "Edukasi", icon: "📚", bg: "#E9E4FF", count: "22 tiket" },
];

export const ATTR_PROMOS = [
  { eyebrow: "Hemat", title: "Tiket masuk mulai Rp 5rb", sub: "Beli langsung tanpa antre, scan QR di lokasi.", cta: "Cek tiket murah", emoji: "🎫", bg: "#FFF1D6", fg: "#5C4400" },
  { eyebrow: "Bundle", title: "Paket hemat candi + transport", sub: "Bundling tiket masuk + jemput hotel + guide.", cta: "Lihat bundle", emoji: "🚐", bg: "#E9E4FF", fg: "#3A2F8C" },
  { eyebrow: "Trending", title: "Lokasi hits di TikTok", sub: "Spot foto viral yang bisa kamu kunjungi sekarang.", cta: "Cek spot", emoji: "📸", bg: "#FFD7D7", fg: "#7C2A2A" },
];
