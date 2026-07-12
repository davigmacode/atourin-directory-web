export const AIW_INTENTS = {
  honeymoon: [
    { ai: "Honeymoon ke timur, kombinasi private + scenic. Ini 3 ide yang pas buat budget kamu:" },
    { carousel: [
      { image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&q=70", title: "Sumba Romantic 5D", location: "Sumba, NTT", price: "Rp 12,5jt", badge: "ROMANTIS" },
      { image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&q=70", title: "Wae Rebo Heritage 6D", location: "Manggarai, NTT", price: "Rp 13,8jt" },
      { image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&q=70", title: "Labuan Bajo Private 7D", location: "Labuan Bajo, NTT", price: "Rp 14,2jt" },
    ] },
    { followups: ["Breakdown jadi itinerary", "Yang lebih ke pantai", "Cek cuaca akhir pekan"] },
  ],
  itinerary: [
    { ai: "Siap! Aku susun itinerary 4 hari Labuan Bajo yang santai tapi seru, estimasi Rp 11,6jt untuk berdua:" },
    { itinerary: { dayNum: 1, dayLabel: "Labuan Bajo → Kelor & Manjarite", items: [
      { time: "10:00", title: "Tiba Bandara Komodo", location: "Labuan Bajo" },
      { time: "13:00", title: "Boarding kapal phinisi", location: "Pelabuhan" },
      { time: "16:00", title: "Snorkeling Pulau Kelor", location: "TN Komodo" },
    ] } },
    { itinerary: { dayNum: 2, dayLabel: "Padar Sunrise → Pink Beach → Komodo", items: [
      { time: "04:30", title: "Trekking Pulau Padar (sunrise)", location: "Padar" },
      { time: "09:00", title: "Snorkeling Pink Beach", location: "Pink Beach" },
      { time: "14:00", title: "Lihat komodo + ranger", location: "Pulau Komodo" },
    ] } },
    { followups: ["Lihat hari ke-3 & 4", "Pesan trip ini", "Tambah ARTI offset"] },
  ],
  booking: [
    { ai: "Booking aktifmu, tinggal lanjut bayar kalau sudah pas:" },
    { booking: { title: "Labuan Bajo Sailing, Padar & Komodo 4D3N", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&q=70", date: "12–15 Juni 2026", guests: "2 orang dewasa", total: "Rp 11.095.000" } },
    { followups: ["Ganti tanggal", "Pakai voucher WEEKEND25"] },
  ],
  hotel: [
    { ai: "Ini penginapan dekat Labuan Bajo dengan rating tinggi, di bawah Rp 800rb/malam:" },
    { product: { image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=70", title: "Homestay Mbaru Niang Wae Rebo", location: "Manggarai, NTT", rating: "4.92", reviews: "312", price: "Rp 350K", badge: "ADWI" } },
    { followups: ["Cari yang ada AC", "Dekat pantai aja"] },
  ],
  sekitar: [
    { ai: "Kamu lagi di Labuan Bajo 📍. Yang dekat & seru dalam radius 2 km:" },
    { map: { title: "Bukit Sylvia & sekitar", location: "Labuan Bajo, NTT" } },
    { followups: ["Rute setengah hari", "Kuliner seafood dekat sini"] },
  ],
  cuaca: [
    { ai: "Cuaca Labuan Bajo akhir pekan ini bagus buat sailing, Sabtu paling cerah:" },
    { weather: { location: "Labuan Bajo, NTT", days: [
      { day: "JUM", icon: "☀️", tempH: 31, tempL: 25 }, { day: "SAB", icon: "☀️", tempH: 32, tempL: 26 },
      { day: "MIN", icon: "⛅", tempH: 30, tempL: 25 }, { day: "SEN", icon: "🌧", tempH: 28, tempL: 24 },
    ] } },
    { followups: ["Pesan sailing Sabtu", "Cari hotel dekat pelabuhan"] },
  ],
  arti: [
    { ai: "Kebun ARTI-mu 🌳 12 pohon · 248 kg CO₂ terkompensasi · Level 3 Forest Guardian. Trip Komodo terakhir nambah 4 pohon di Manggarai. 3 pohon lagi ke Level 4!" },
    { followups: ["Lihat Kebun ARTI", "Tanam pohon ekstra"] },
  ],
  voucher: [
    { ai: "Voucher aktif untukmu: WEEKEND25 (diskon 25%, min Rp200rb) & ATR50K (cashback Rp50rb, min Rp500rb). Mau aku terapkan ke salah satu trip?" },
    { followups: ["Pakai WEEKEND25", "Lihat semua promo"] },
  ],
  fallback: [
    { ai: "Siap! Ceritakan sedikit lagi, tujuan, jumlah orang, durasi, dan budget-nya. Nanti aku susunkan beberapa pilihan trip yang pas." },
    { followups: ["Plan trip 3 hari", "Cari hotel", "Sunrise tour"] },
  ],
};

export const AIW_QUICK = [
  { icon: "🗓", label: "Plan trip", intent: "itinerary", user: "Plan trip 4 hari ke Labuan Bajo buat 2 orang" },
  { icon: "🏨", label: "Cari hotel", intent: "hotel", user: "Cari penginapan dekat Labuan Bajo, max 800rb/malam" },
  { icon: "🎫", label: "Cek booking", intent: "booking", user: "Cek booking aktifku" },
  { icon: "🌅", label: "Sunrise tour", intent: "honeymoon", user: "Cari ide trip honeymoon ke Indonesia Timur, budget 15jt" },
  { icon: "📍", label: "Sekitarku", intent: "sekitar", user: "Ada apa di sekitarku sekarang?" },
  { icon: "🌤", label: "Cek cuaca", intent: "cuaca", user: "Cuaca Labuan Bajo akhir pekan gimana?" },
  { icon: "🌿", label: "Status ARTI", intent: "arti", user: "Berapa pohon yang sudah aku tanam?" },
  { icon: "💰", label: "Voucher", intent: "voucher", user: "Voucher apa yang bisa aku pakai?" },
];

export const AIW_RECENTS = [
  { title: "Labuan Bajo Sailing budget 12jt", time: "Kemarin · 18 pesan" },
  { title: "Homestay Wae Rebo bulan Juni", time: "3 hari lalu · 9 pesan" },
  { title: "Sunrise tour Bromo weekend", time: "Minggu lalu · 14 pesan" },
];
