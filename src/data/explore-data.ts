import type { IslandData } from '@/types/island';

/* ─── Islands ─── */

export const ISLANDS: IslandData[] = [
  {
    name: 'Sumatera',
    provincesCount: 10,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      base64: null,
    },
  },
  {
    name: 'Jawa',
    provincesCount: 6,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LNH_s_xt4nxu_4RjIUj[~qxut7of',
      base64: null,
    },
  },
  {
    name: 'Kalimantan',
    provincesCount: 5,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      base64: null,
    },
  },
  {
    name: 'Sulawesi',
    provincesCount: 6,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LPG[tRxu4nM{_4WBIUj[~qt7t7of',
      base64: null,
    },
  },
  {
    name: 'Bali & Nusa Tenggara',
    provincesCount: 3,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LdHyqKxu4nt7~qofM{j[D%ofxaWB',
      base64: null,
    },
  },
  {
    name: 'Maluku',
    provincesCount: 2,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LBHxne~q9FxuD%WBIUWBxuofM{ay',
      base64: null,
    },
  },
  {
    name: 'Papua',
    provincesCount: 2,
    coverImage: {
      url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70',
      blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      base64: null,
    },
  },
];

/* ─── Provinces ─── */

export const PROVINCES = [
  { name: 'Aceh', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d1a0fe?w=600&auto=format&fit=crop&q=60', dest: 23, attr: 145, desa: 32, popular: 80 },
  { name: 'Sumatera Utara', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 33, attr: 210, desa: 45, popular: 88 },
  { name: 'Sumatera Barat', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=60', dest: 19, attr: 132, desa: 28, popular: 85 },
  { name: 'Riau', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', dest: 12, attr: 78, desa: 14, popular: 50 },
  { name: 'Kepulauan Riau', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 7, attr: 88, desa: 12, popular: 70 },
  { name: 'Jambi', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 11, attr: 64, desa: 18, popular: 40 },
  { name: 'Bengkulu', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 10, attr: 52, desa: 16, popular: 35 },
  { name: 'Sumatera Selatan', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=60', dest: 17, attr: 96, desa: 21, popular: 55 },
  { name: 'Lampung', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', dest: 15, attr: 84, desa: 20, popular: 60 },
  { name: 'Bangka Belitung', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=60', dest: 7, attr: 56, desa: 11, popular: 65 },
  { name: 'DKI Jakarta', island: 'Jawa', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=60', dest: 5, attr: 220, desa: 4, popular: 92 },
  { name: 'Banten', island: 'Jawa', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', dest: 8, attr: 110, desa: 18, popular: 72 },
  { name: 'Jawa Barat', island: 'Jawa', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=60', dest: 27, attr: 480, desa: 88, popular: 95 },
  { name: 'Jawa Tengah', island: 'Jawa', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=60', dest: 35, attr: 520, desa: 102, popular: 96 },
  { name: 'DI Yogyakarta', island: 'Jawa', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=60', dest: 5, attr: 280, desa: 42, popular: 97 },
  { name: 'Jawa Timur', island: 'Jawa', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 38, attr: 510, desa: 95, popular: 90 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 14, attr: 78, desa: 22, popular: 45 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60', dest: 13, attr: 65, desa: 18, popular: 40 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', dest: 13, attr: 72, desa: 19, popular: 50 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 10, attr: 80, desa: 16, popular: 58 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 5, attr: 34, desa: 8, popular: 30 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=60', dest: 15, attr: 124, desa: 28, popular: 75 },
  { name: 'Gorontalo', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 6, attr: 48, desa: 12, popular: 40 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 13, attr: 66, desa: 17, popular: 38 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=60', dest: 6, attr: 42, desa: 10, popular: 32 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', dest: 24, attr: 180, desa: 38, popular: 82 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60', dest: 17, attr: 92, desa: 22, popular: 60 },
  { name: 'Bali', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60', dest: 9, attr: 620, desa: 78, popular: 99 },
  { name: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=60', dest: 10, attr: 240, desa: 48, popular: 85 },
  { name: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 22, attr: 168, desa: 52, popular: 78 },
  { name: 'Maluku', island: 'Maluku', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=60', dest: 11, attr: 88, desa: 21, popular: 55 },
  { name: 'Maluku Utara', island: 'Maluku', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', dest: 10, attr: 62, desa: 18, popular: 45 },
  { name: 'Papua', island: 'Papua', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=60', dest: 29, attr: 124, desa: 35, popular: 88 },
  { name: 'Papua Barat', island: 'Papua', img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=60', dest: 13, attr: 78, desa: 22, popular: 80 },
];

/* ─── Categories ─── */

export const CATEGORIES = [
  { name: 'Alam', icon: '\uD83C\uDF3F', color: '#E6F7E6' },
  { name: 'Budaya', icon: '\uD83C\uDFAD', color: '#EDE9FF' },
  { name: 'Sejarah', icon: '\uD83D\uDEE4', color: '#FFF4D9' },
  { name: 'Kuliner', icon: '\uD83C\uDF1C', color: '#FFE2E2' },
  { name: 'Religi', icon: '\uD83D\uDD4C', color: '#E2F1FF' },
  { name: 'Petualangan', icon: '\u26BD', color: '#D9F2DA' },
  { name: 'Heritage', icon: '\uD83C\uDFAF', color: '#FFE9D6' },
  { name: 'Bahari', icon: '\uD83C\uDF0A', color: '#D4ECF4' },
  { name: 'Desa Wisata', icon: '\uD83C\uDF3E', color: '#F0FBE9' },
  { name: 'Ecotourism', icon: '\uD83C\uDF31', color: '#E6F7E6' },
];

/* ─── Featured ─── */

export const FEATURED = [
  { type: 'Itinerary', typeColor: 'var(--atr-purple)', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=70', title: 'Lombok Lengkap, Mandalika, Gili & Air Terjun', loc: 'Lombok, NTB', rating: 4.92 },
  { type: 'Desa Wisata', typeColor: '#51B054', img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=70', title: 'Desa Wisata Pentingsari', loc: 'Sleman, DIY', rating: 4.81 },
  { type: 'Atraksi', typeColor: '#1F6FB0', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=70', title: 'Candi Borobudur Sunrise', loc: 'Magelang, Jateng', rating: 4.95 },
  { type: 'Itinerary', typeColor: 'var(--atr-purple)', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=70', title: 'Bali Slow Travel 7 Hari', loc: 'Bali', rating: 4.88 },
  { type: 'Atraksi', typeColor: '#1F6FB0', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=70', title: 'Danau Toba & Pulau Samosir', loc: 'Sumatera Utara', rating: 4.7 },
];

/* ─── Desa Featured ─── */

export const DESA_FEATURED = [
  { name: 'Pentingsari', province: 'DIY', img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=60', tag: 'Agrowisata', reviews: 128 },
  { name: 'Penglipuran', province: 'Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60', tag: 'Adat', reviews: 240 },
  { name: 'Sade', province: 'NTB', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60', tag: 'Sasak Heritage', reviews: 96 },
  { name: 'Wae Rebo', province: 'NTT', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=60', tag: 'Pegunungan', reviews: 76 },
];

/* ─── Hero Backgrounds ─── */

export const HERO_BGS: string[] = [
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=2000&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=2000&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=2000&auto=format&fit=crop&q=70',
];

/* ─── Untukmu (recommendations) ─── */

export const UNTUKMU = [
  { img: 'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=500&auto=format&fit=crop&q=70', title: 'Desa Penglipuran', loc: 'Bangli, Bali', why: 'Karena kamu simpan Wae Rebo', tag: 'Desa Wisata' },
  { img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=70', title: 'Trekking Gunung Rinjani', loc: 'Lombok, NTB', why: 'Cocok untuk Alam & Petualangan', tag: 'Experience' },
  { img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&auto=format&fit=crop&q=70', title: 'Kuliner Tua Kota Semarang', loc: 'Jawa Tengah', why: 'Belum kamu jelajahi', tag: 'Atraksi' },
  { img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&auto=format&fit=crop&q=70', title: 'Pulau Padar Sunrise', loc: 'Labuan Bajo, NTT', why: 'Trending di daerahmu', tag: 'Experience' },
];
