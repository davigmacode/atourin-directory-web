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

export const HOMESTAY_IMG = {
  harjiyanto: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=70",
  arenan: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&auto=format&fit=crop&q=70",
  omahe: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&auto=format&fit=crop&q=70",
  yoyok: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=900&auto=format&fit=crop&q=70",
  georium: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&auto=format&fit=crop&q=70",
  haryono: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&auto=format&fit=crop&q=70",
  virgi: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&auto=format&fit=crop&q=70",
  sri: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=900&auto=format&fit=crop&q=70",
  lify: "https://images.unsplash.com/photo-1631049307290-bb947b114627?w=900&auto=format&fit=crop&q=70",
  pulo: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&auto=format&fit=crop&q=70",
  madesa: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&auto=format&fit=crop&q=70",
  djenni: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&auto=format&fit=crop&q=70",
  heroBg: "https://images.unsplash.com/photo-1542665952-14513db15293?w=1800&auto=format&fit=crop&q=70",
};

export const HOMESTAY_DATA = [
  { img: HOMESTAY_IMG.harjiyanto, region: "Magelang",       name: "Homestay Harjiyanto",     price: 262500, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(11), facilities: ["Wi-Fi", "Parkir"] },
  { img: HOMESTAY_IMG.arenan,     region: "Kendal",          name: "Arenan Homestay",          price: 500000, operator: "Desa Wisata Sriwulan",  opAvatar: OP_AVATAR(22), facilities: ["Dapur", "AC"] },
  { img: HOMESTAY_IMG.omahe,      region: "Magelang",       name: "Omahe Biyung",             price: 420000, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(33), facilities: ["Wi-Fi", "Parkir"] },
  { img: HOMESTAY_IMG.yoyok,      region: "Magelang",       name: "Homestay Yoyok",           price: 262500, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(44), facilities: ["Wi-Fi"] },
  { img: HOMESTAY_IMG.georium,    region: "Klaten",          name: "Homestay Georium Dunia",   price: 210000, operator: "Homestay Georium Dunia", opAvatar: OP_AVATAR(55), facilities: ["AC", "Wi-Fi"] },
  { img: HOMESTAY_IMG.haryono,    region: "Magelang",       name: "Homestay Haryono",          price: 262500, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(66), facilities: ["Wi-Fi", "Dapur"] },
  { img: HOMESTAY_IMG.virgi,      region: "Minahasa Utara", name: "Virgi Homestay",            price: 250000, operator: "Desa Wisata Lihunu",    opAvatar: OP_AVATAR(13), facilities: ["AC"] },
  { img: HOMESTAY_IMG.sri,        region: "Magelang",       name: "Homestay Sri Haryati",     price: 262500, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(24), facilities: ["Wi-Fi"] },
  { img: HOMESTAY_IMG.lify,       region: "Minahasa Utara", name: "Lify Homestay",             price: 250000, operator: "Desa Wisata Lihunu",    opAvatar: OP_AVATAR(35), facilities: ["Parkir"] },
  { img: HOMESTAY_IMG.pulo,       region: "Dairi",           name: "Homestay Pulo Silalahi",   price: 1800000, operator: "Desa Wisata Silalahi III", opAvatar: OP_AVATAR(46), tag: "Best Seller", facilities: ["Wi-Fi", "AC"] },
  { img: HOMESTAY_IMG.madesa,     region: "Ciamis",          name: "Madesa Homestay",          price: 340000, operator: "Desa Wisata Jalatrang", opAvatar: OP_AVATAR(57), facilities: ["Wi-Fi"] },
  { img: HOMESTAY_IMG.djenni,     region: "Minahasa Utara", name: "Djenni Homestay",           price: 250000, operator: "Desa Wisata Lihunu",    opAvatar: OP_AVATAR(68), facilities: ["AC"] },
];

export const HOMESTAY_FACILITIES = [
  "Internet (Wi-Fi)",
  "Parkir Area",
  "Dapur",
  "Ruang Tamu",
  "Smoking Area",
  "AC",
  "Kamar Mandi Dalam",
  "Air Panas",
  "Sarapan Termasuk",
  "Pemandangan Alam",
];

export const HOMESTAY_SUGGESTIONS = [
  { title: "Homestay Candirejo", region: "Magelang, Jateng", img: HOMESTAY_IMG.harjiyanto },
  { title: "Homestay Lihunu", region: "Minahasa Utara, Sulut", img: HOMESTAY_IMG.virgi },
  { title: "Homestay Bugisan", region: "Klaten, Jateng", img: HOMESTAY_IMG.georium },
  { title: "Homestay Bilebante", region: "Lombok Tengah, NTB", img: HOMESTAY_IMG.omahe },
];

export const HMS_DETAIL_DATA = {
  name: "Homestay Harjiyanto",
  shortName: "Homestay Harjiyanto",
  badges: [
    { label: "Homestay · Rumah Tradisional", bg: "#EDE9FF", fg: "#5C53C7", emoji: "🏡" },
    { label: "Berbasis Komunitas", bg: "#D6F0E8", fg: "#1B7A5C", emoji: "🤝" },
    { label: "Sertifikat Desa Wisata", bg: "#FFF4D9", fg: "#A06A00", emoji: "🏛" },
  ],

  hours: "Check-in 14:00 · Check-out 12:00",
  isOpen: true,
  location: "Candirejo, Magelang",
  shortLocation: "Candirejo, Magelang",
  address: "Dusun Tingal Wetan, Desa Candirejo, Kec. Borobudur, Kab. Magelang, Jawa Tengah 56553",
  coords: { lat: -7.6243, lng: 110.1900 },

  rating: 0,
  reviewCount: 0,
  soldCount: 7,
  capacity: "Maks 6 tamu",
  rooms: 3,
  beds: 5,
  bathrooms: 2,

  tags: ["homestay", "rumah tradisional", "borobudur", "desa wisata", "candirejo", "keluarga"],
  shortDesc: "Rumah Jawa tradisional milik Pak Harjiyanto di tengah Desa Wisata Candirejo, 3,5 km dari Candi Borobudur. Sarapan lokal, pemandu desa, dan sepeda gratis. Cocok untuk merasakan ritme desa yang lambat dan ramah.",
  longDesc: "Homestay Harjiyanto bukan sekadar tempat menginap, tetapi gerbang menuju pengalaman tak terlupakan. Anda akan menginap di rumah Pak Harjiyanto dan istri, sepasang penduduk lokal Candirejo yang membuka pintunya bagi para tamu sejak 2018.\n\nRumah ini bergaya Jawa tradisional dengan halaman terbuka, dapur bersama, dan beranda kayu menghadap kebun. Tiga kamar tidur tersedia, masing-masing dengan kamar mandi dalam (air panas), AC, dan dekorasi etnik yang dibuat tangan pengrajin desa. Sarapan disiapkan Bu Sri, biasanya nasi liwet, telur, sayur lodeh, dan teh tubruk, disajikan di beranda menghadap sawah.\n\nLokasi Candirejo membuat homestay ini ideal sebagai basecamp untuk eksplorasi Borobudur (3,5 km), Punthuk Setumbu untuk sunrise (8 km), Candi Mendut & Pawon (3 km), dan tentu saja aktivitas-aktivitas Desa Wisata Candirejo sendiri: dokar tour, tracking sawah, dan workshop kerajinan bambu.",

  images: [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&auto=format&fit=crop&q=70",
  ],
  totalPhotos: 22,

  host: {
    name: "Pak Harjiyanto",
    role: "Tuan rumah · Bersama Bu Sri",
    avatar: "https://i.pravatar.cc/200?img=68",
    since: "Sejak 2018",
    languages: ["Indonesia", "Jawa", "English (basic)"],
    responseRate: "98%",
    responseTime: "< 1 jam",
    verified: true,
    blurb: "Kami senang menerima tamu dari mana saja. Bu Sri menyiapkan sarapan setiap pagi, dan saya bisa antar ke Borobudur kalau ingin sunrise. Selamat datang di rumah kami!",
  },

  rooms_list: [
    {
      id: "single",
      name: "Single Bed Room",
      img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&auto=format&fit=crop&q=70",
      bed: "1× Single Bed",
      capacity: "Maks 1 tamu",
      size: "12 m²",
      price: 262500,
      stock: 2,
      almost: true,
      amenities: ["AC", "Kamar mandi dalam", "Air panas", "Sarapan"],
    },
    {
      id: "double",
      name: "Double Bed Room",
      img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=70",
      bed: "1× Double Bed",
      capacity: "Maks 2 tamu",
      size: "16 m²",
      price: 262500,
      stock: 2,
      almost: true,
      amenities: ["AC", "Kamar mandi dalam", "Air panas", "Sarapan"],
    },
    {
      id: "family",
      name: "Family Room",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&auto=format&fit=crop&q=70",
      bed: "1× Double + 1× Single",
      capacity: "Maks 3 tamu",
      size: "22 m²",
      price: 380000,
      stock: 1,
      almost: true,
      amenities: ["AC", "Kamar mandi dalam", "Air panas", "Sarapan", "View sawah"],
    },
  ],

  amenities: [
    { icon: "📶", label: "WiFi gratis", on: true },
    { icon: "❄️", label: "AC", on: true },
    { icon: "🚿", label: "Air panas", on: true },
    { icon: "🍳", label: "Sarapan termasuk", on: true },
    { icon: "🅿️", label: "Parkir gratis", on: true },
    { icon: "🚲", label: "Sepeda gratis", on: true },
    { icon: "🍽", label: "Dapur bersama", on: true },
    { icon: "🪴", label: "Halaman & beranda", on: true },
    { icon: "🛏", label: "Linen disediakan", on: true },
    { icon: "🧺", label: "Laundry (bayar)", on: true },
    { icon: "🏊", label: "Kolam renang", on: false },
    { icon: "🛗", label: "Lift / akses kursi roda", on: false },
  ],

  rules: [
    { icon: "🕑", title: "Check-in", body: "14:00 – 21:00 WIB" },
    { icon: "🕛", title: "Check-out", body: "Sebelum 12:00 WIB" },
    { icon: "🚭", title: "Dilarang merokok", body: "Di dalam kamar & rumah utama" },
    { icon: "🐾", title: "Tidak menerima hewan peliharaan", body: "Kecuali atas izin tertulis" },
    { icon: "👨‍👩‍👧", title: "Ramah anak", body: "Anak < 5 tahun gratis (sharing bed)" },
    { icon: "🎉", title: "Tidak ada pesta", body: "Hormati ketenangan dusun setelah 22:00" },
  ],

  tips: {
    best: "Datang **Mei – Oktober** saat musim kering. Untuk sunrise Borobudur, minta Pak Harjiyanto antar jam **04.00 pagi** ke Punthuk Setumbu, pemandangan candi diselimuti kabut tak ada duanya.",
    bring: ["Pakaian sopan (kunjungan ke candi)", "Sandal anti-slip", "Senter (lampu dusun mati 22:00)", "Uang tunai (ATM 3 km)"],
    notes: ["Suhu malam bisa 18°C, bawa jaket", "Sinyal HP baik tapi internet pelan", "Hormati waktu sembahyang penduduk"],
  },

  reviews: [],
  reviewBreakdown: [0, 0, 0, 0, 0],

  terms: [
    "Pembatalan dan H-1 dikenakan **Cancellation Charge 100%**. Pembatalan sebelumnya gratis hingga H-3.",
    "Pembayaran penuh diperlukan saat pemesanan. Booking baru terkonfirmasi setelah pembayaran masuk.",
    "Tamu wajib menunjukkan KTP/Paspor saat check-in. Anak di bawah 17 wajib didampingi orang tua.",
    "Maksimal 2 tamu dewasa per kamar. Tamu tambahan dikenakan biaya Rp75.000/malam (extra bed).",
    "Hormati aturan rumah Pak Harjiyanto, ini adalah kediaman keluarga yang dibuka untuk tamu.",
  ],

  partner: {
    name: "Desa Wisata Candirejo",
    type: "Tourism Village · Pengelola",
    location: "Borobudur, Magelang, Jawa Tengah",
    rating: 4.6,
    productCount: 15,
    totalSold: 124,
    avatar: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=200&auto=format&fit=crop&q=70",
    blurb: "Desa Wisata Candirejo adalah salah satu desa wisata tertua di Indonesia (resmi 2003), berjarak 3 km dari Candi Borobudur. Mengelola 15+ homestay, dokar tour, workshop kerajinan, dan pertunjukan budaya.",
  },

  nearby: [
    { name: "Candi Borobudur", cat: "UNESCO · Sejarah", catFg: "#B85C00", rating: 4.95, price: 350000, img: "https://images.unsplash.com/photo-1597212624239-1ca4a4a06d09?w=600&auto=format&fit=crop&q=70" },
    { name: "Punthuk Setumbu (Sunrise)", cat: "Viewpoint", catFg: "#7068D5", rating: 4.85, price: 60000, img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop&q=70" },
    { name: "Candi Mendut & Pawon", cat: "Sejarah", catFg: "#B85C00", rating: 4.6, price: 25000, img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70" },
    { name: "Dokar Tour Candirejo", cat: "Aktivitas Desa", catFg: "#2D8838", rating: 4.8, price: 75000, img: "https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=600&auto=format&fit=crop&q=70" },
    { name: "Workshop Bambu Candirejo", cat: "Kerajinan", catFg: "#C44949", rating: 4.7, price: 100000, img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70" },
    { name: "Tracking Sawah & Sungai Progo", cat: "Trekking", catFg: "#1F6FB0", rating: 4.5, price: 50000, img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=70" },
  ],

  related: [
    { img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop&q=70", tag: "Best Seller", region: "Jakarta Selatan", name: "Makna Fest", price: 89000, operator: "Makna Fest", opAvatar: OP_AVATAR(22) },
    { img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70", tag: "Best Seller", region: "Manggarai Barat, NTT", name: "Labuan Bajo Sailing, Padar & Komodo 4D3N", price: 5800000, operator: "Flores Komodo Liveaboard", opAvatar: OP_AVATAR(12) },
    { img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=70", tag: "Berbasis Komunitas", region: "Borobudur", name: "Homestay Tradisional Candirejo", price: 280000, operator: "Desa Wisata Candirejo", opAvatar: OP_AVATAR(44) },
    { img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&auto=format&fit=crop&q=70", tag: "Best Seller", region: "Lombok Tengah", name: "ATV Experience di Bilebante", price: 150000, operator: "Bilebante Tour", opAvatar: OP_AVATAR(51) },
    { img: "https://images.unsplash.com/photo-1597212624239-1ca4a4a06d09?w=600&auto=format&fit=crop&q=70", tag: "Best Seller", region: "Magelang", name: "Sunrise Borobudur dari Punthuk Setumbu", price: 175000, operator: "Magelang Sunrise Tour", opAvatar: OP_AVATAR(33) },
  ],
};
