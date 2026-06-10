'use client';

/* i18n layer for Atourin Web.
   Persists lang in localStorage. Pure JS, no React deps.
*/

const KEY = 'atr.lang';

export function getLang() {
  if (typeof window === 'undefined') return 'id';
  try { const v = localStorage.getItem(KEY); return v === 'en' ? 'en' : 'id'; }
  catch { return 'id'; }
}

export function setLang(l) {
  const lang = l === 'en' ? 'en' : 'id';
  try { localStorage.setItem(KEY, lang); } catch {}
  if (typeof window !== 'undefined') window.location.reload();
}

const GLOSSARY = {
  experience:  { id: 'Experience',   en: 'Experience' },
  attraction:  { id: 'Atraksi',      en: 'Attraction' },
  destination: { id: 'Destinasi',    en: 'Destination' },
  homestay:    { id: 'Penginapan',   en: 'Homestay' },
  village:     { id: 'Desa Wisata',  en: 'Tourism Village' },
  itinerary:   { id: 'Itinerary',    en: 'Itinerary' },
  guide:       { id: 'Pemandu',      en: 'Tour Guide' },
  arti:        { id: 'ARTI',         en: 'ARTI' },
  promo:       { id: 'Promo',        en: 'Deals' },
  article:     { id: 'Artikel',      en: 'Articles' },
  help:        { id: 'Bantuan',      en: 'Help' },
};

const DICT = {
  'nav.pesan':          { id: 'Pesan',            en: 'Book' },
  'nav.jelajahi':       { id: 'Jelajahi',         en: 'Explore' },
  'nav.buatItinerary':  { id: 'Buat Itinerary',   en: 'Create Itinerary' },
  'nav.masuk':          { id: 'Masuk / Daftar',   en: 'Sign in / Register' },
  'nav.pesanan':        { id: 'Pesanan',          en: 'Orders' },
  'nav.mitra':          { id: 'Menjadi Mitra',    en: 'Become a Partner' },
  'util.promo':         { id: 'Dapatkan promo menarik dari', en: 'Get great deals from' },
  'util.cekPromo':      { id: 'Cek Promo',        en: 'View Deals' },
  'foot.produk':        { id: 'Produk',           en: 'Products' },
  'foot.informasi':     { id: 'Informasi',        en: 'Information' },
  'foot.lainnya':       { id: 'Lainnya',          en: 'Others' },
  'foot.getApp':        { id: 'Dapatkan aplikasi', en: 'Get the app' },
  'foot.follow':        { id: 'Ikuti kami',       en: 'Follow us' },
  'common.lihatSemua':  { id: 'Lihat semua',      en: 'See all' },
  'home.catTitle':      { id: 'Mau jelajah apa hari ini?', en: 'What to explore today?' },
  'home.catSub':        { id: 'Akses cepat ke semua layanan Atourin', en: 'Quick access to all Atourin services' },
  'bottom.beranda':     { id: 'Beranda',          en: 'Home' },
  'bottom.pesan':       { id: 'Pesan',            en: 'Orders' },
  'bottom.buatTrip':    { id: 'Buat Trip',        en: 'Create Trip' },
  'bottom.jelajahi':    { id: 'Jelajahi',         en: 'Explore' },
  'bottom.akun':        { id: 'Akun',             en: 'Account' },
  'akun.bahasa':        { id: 'Bahasa',           en: 'Language' },
  'akun.bahasaVal':     { id: 'Bahasa Indonesia', en: 'English' },
};

export function t(key) {
  const lang = getLang();
  const e = DICT[key];
  return e ? (e[lang] || e.id) : key;
}

export function cat(termKey, fallback) {
  const lang = getLang();
  const e = GLOSSARY[termKey];
  if (e) return e[lang] || e.id;
  return fallback != null ? fallback : termKey;
}

export function isEN() { return getLang() === 'en'; }
export function flag() { return getLang() === 'en' ? '\uD83C\uDDFA\uD83C\uDDF8' : '\uD83C\uDDEE\uD83C\uDDE9'; }
export function code() { return getLang() === 'en' ? 'EN' : 'ID'; }
