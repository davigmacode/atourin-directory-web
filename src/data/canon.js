/* Canonical data — single source of truth for Atourin Web.
   All prices, ratings, booking codes come from here.
*/

export const GLOSSARY = {
  experience: { id: 'Experience',  en: 'Experience' },
  attraction: { id: 'Atraksi',     en: 'Attraction' },
  destination:{ id: 'Destinasi',   en: 'Destination' },
  homestay:   { id: 'Penginapan',  en: 'Homestay' },
  village:    { id: 'Desa Wisata', en: 'Tourism Village' },
  itinerary:  { id: 'Itinerary',   en: 'Itinerary' },
  guide:      { id: 'Pemandu',     en: 'Tour Guide' },
  arti:       { id: 'ARTI',        en: 'ARTI' },
};

export const label = (key, lang) => (GLOSSARY[key] || {})[lang || 'id'] || key;

export const PRODUCTS = {
  komodoSailing: {
    id: 'komodo-sailing-3d2n',
    kind: 'experience',
    name: 'Open Trip Komodo Sailing 3D2N',
    location: 'Labuan Bajo, Manggarai Barat, NTT',
    operator: 'Flores Komodo Liveaboard',
    pricePerPax: 2400000,
    priceOld: 3100000,
    rating: 4.92, reviews: 412,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70',
  },
  borobudurSunrise: {
    id: 'borobudur-sunrise',
    kind: 'experience',
    name: 'Borobudur Sunrise + Setumbu',
    location: 'Magelang, Jawa Tengah',
    operator: 'Jogja Heritage Trip',
    pricePerPax: 325000,
    rating: 4.85, reviews: 240,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70',
  },
  ubudSlow: {
    id: 'ubud-slow-travel',
    kind: 'experience',
    name: 'Ubud Slow Travel 4 Hari',
    location: 'Ubud, Bali',
    operator: 'Bali Slow Travel',
    pricePerPax: 1800000,
    rating: 4.78, reviews: 156,
    badge: 'KURATOR',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70',
  },
};

export const ENTITIES = {
  attraction_padar: {
    name: 'Pulau Padar',
    category: 'Alam · Trekking',
    location: 'Taman Nasional Komodo, Labuan Bajo, NTT',
    operator: 'Balai Taman Nasional Komodo',
    steps: 819,
    rating: 4.95, reviews: 1240,
    entryPrice: 150000,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70',
  },
  guide_welli: {
    name: 'Welli Wilyanto',
    tagline: 'Local Komodo · Sailing & Diving Specialist',
    years: 8, trips: 87, rating: 4.95, reviews: 218,
    pricePerDay: 1200000,
    certs: ['PADI Divemaster', 'BNSP Pramuwisata', 'HPI', 'GSTC Trained'],
  },
  village_waerebo: {
    name: 'Desa Wisata Wae Rebo',
    kab: 'Manggarai, NTT',
    status: 'Mandiri',
    homestayFrom: 350000,
    rating: 4.92, reviews: 312,
    certs: [
      'UNESCO Award of Excellence 2012',
      'ADWI Mandiri 2023',
      'GSTC Destinations 2022',
      'CHSE Kemenparekraf 2021',
    ],
    image: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&auto=format&fit=crop&q=70',
  },
  itinerary_lombok: {
    title: 'Lombok Lengkap, Mandalika, Gili & Air Terjun',
    meta: 'Adventure · 3 Hari 2 Malam · Lombok Tengah',
    price: 2450000,
  },
};

export const BOOKING = {
  bookingCode: 'ATR-7K2K91',
  invoice: 'INV-ATR7K2K91',
  orderedAt: '26 Mei 2026 · 14:32 WIB',
  productName: 'Labuan Bajo Sailing, Padar & Komodo 4D3N',
  category: 'Experience · Open Trip',
  operator: 'Flores Komodo Liveaboard',
  location: 'Labuan Bajo, Manggarai Barat, NTT',
  image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&auto=format&fit=crop&q=70',
  scheduleDate: 'Jumat, 12 Juni 2026',
  scheduleWindow: '07.00 WITA · Meeting point Pelabuhan Labuan Bajo',
  pax: 2,
  schedule: '12–15 Juni 2026',
  pricePerPax: 5800000,
  subtotal: 11600000,
  voucher: 'WEEKEND25',
  voucherSaving: 580000,
  serviceFee: 75000,
  total: 11095000,
  pemesan: {
    name: 'Aulia Priyono',
    nationality: 'Indonesia',
    email: 'aulia.priyono@gmail.com',
    phone: '+62 813 9306 4499',
    domicile: 'Kota Jakarta Selatan, DKI Jakarta',
  },
  participants: [
    { name: 'Aulia Priyono', type: 'Dewasa' },
    { name: 'Bagas Priyono', type: 'Dewasa' },
  ],
  payment: {
    method: 'BCA Virtual Account',
    masked: '1290 8xxx xxxx 4499',
    va: '1290 8123 4567 4499',
    paidAt: '26 Mei 2026 · 14:45 WIB',
  },
  refundAdminPct: 10,
  arti: { trees: 4, label: 'Trip ini sudah termasuk ARTI · 4 pohon ditanam' },
};

export const VOUCHERS = [
  { id: 'vc1', value: '25%',      kind: 'DISKON',   title: 'Diskon Akhir Pekan',      partner: 'Atourin',        code: 'WEEKEND25',  min: 'Min. transaksi Rp200.000' },
  { id: 'vc2', value: 'Gratis',   kind: 'ARTI',     title: 'Tanam 1 Pohon Ekstra',    partner: 'ARTI by Atourin',code: 'ARTI10',     min: 'Semua transaksi' },
  { id: 'vc3', value: 'Rp50.000', kind: 'CASHBACK', title: 'Cashback Wisata Alam',    partner: 'Atourin',        code: 'ATR50K',     min: 'Min. transaksi Rp500.000' },
  { id: 'vc4', value: '20%',      kind: 'DISKON',   title: 'Liburan Labuan Bajo',     partner: 'Flores Komodo',  code: 'ATRJALAN20', min: 'Min. transaksi Rp1.000.000' },
];

export const DESTINATIONS = [
  { name: 'Labuan Bajo', count: 142, img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&auto=format&fit=crop&q=70' },
  { name: 'Lombok',      count: 128, img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&auto=format&fit=crop&q=70' },
  { name: 'Yogyakarta',  count: 94,  img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&auto=format&fit=crop&q=70' },
  { name: 'Raja Ampat',  count: 42,  img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&auto=format&fit=crop&q=70' },
];
