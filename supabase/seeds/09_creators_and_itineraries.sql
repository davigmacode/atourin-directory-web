-- =============================================================
-- Seed: creators and itineraries
-- Run AFTER: 04_destinations.sql (destinations must exist)
-- =============================================================

-- ── 1. Creator: Atourin Official ─────────────────────────────
INSERT INTO directory.creators (id, slug, name, display_name, avatar, bio, is_verified)
VALUES (
  'creator-atourin-official',
  'atourin-official',
  'Atourin Official',
  'Atourin',
  '{"url": "https://atourin.com/images/logo-avatar.png", "blurhash": null, "base64": null}'::jsonb,
  '{
    "id": "Tim Atourin yang berpengalaman menyusun itinerary terbaik untuk perjalanan Anda ke seluruh Indonesia.",
    "en": "The Atourin team curates the best itineraries for your journey across Indonesia."
  }'::jsonb,
  true
) ON CONFLICT (id) DO NOTHING;

-- Badge: Official role
INSERT INTO directory.creator_badges (id, creator_id, taxonomy_id, issued_at)
SELECT
  'badge-atourin-official-role',
  'creator-atourin-official',
  t.id,
  '2024-01-01'
FROM directory.taxonomies t
WHERE t.slug = 'official' AND t.type = 'creator_role'
ON CONFLICT (creator_id, taxonomy_id) DO NOTHING;

-- ── 2. Itinerary: 3D2N Lombok Tengah ─────────────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-lombok-3d2n-001',
  'pesona-lombok-tengah-3-hari-2-malam',
  '{"id": "Pesona Lombok Tengah: 3 Hari 2 Malam", "en": "Lombok Tengah Wonders: 3 Days 2 Nights"}'::jsonb,
  '{
    "id": "Jelajahi pesona Lombok Tengah dalam tiga hari — dari sirkuit pantai eksotis Mandalika, atraksi budaya Sasak, hingga sunset spektakuler di Bukit Merese.",
    "en": "Explore Central Lombok in three days — from the exotic Mandalika beach circuit, Sasak cultural attractions, to the spectacular sunset at Merese Hill."
  }'::jsonb,
  '{"url": "https://atourin.com/images/itineraries/lombok-3d2n-cover.jpg", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.85, 127, 4821, 342,
  3, 2, 1, 12,
  d.id,
  'creator-atourin-official',
  'easy',
  2450000,
  '[
    {"label": "Transportasi 3 hari", "sublabel": "Sewa motor + bensin", "amount": 450000},
    {"label": "Penginapan 2 malam", "sublabel": "Homestay area Kuta Lombok", "amount": 600000},
    {"label": "Tiket masuk & aktivitas", "amount": 350000},
    {"label": "Makan 3x sehari", "sublabel": "Estimasi per orang", "amount": 750000},
    {"label": "Oleh-oleh & lain-lain", "amount": 300000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{petualangan,bahari}'::text[],
  '{pemandangan,kearifan-budaya,biota-alam,kuliner-otentik}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "high", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "high", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Waktu terbaik: April–September (musim kemarau). Hindari Desember–Februari karena curah hujan tinggi.", "en": "Best time: April–September (dry season). Avoid December–February due to high rainfall."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'lombok-tengah'
ON CONFLICT (id) DO NOTHING;

-- ── 3. Daily plans ────────────────────────────────────────────

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-lombok-d1', 'itin-lombok-3d2n-001', 1,
   '{"id": "Sirkuit pantai & sunset di Mandalika", "en": "Beach circuit & sunset at Mandalika"}'::jsonb,
   5, 8, 32, 820000),
  ('daily-lombok-d2', 'itin-lombok-3d2n-001', 2,
   '{"id": "Budaya Sasak & desa tradisional", "en": "Sasak Culture & traditional village"}'::jsonb,
   4, 7, 45, 750000),
  ('daily-lombok-d3', 'itin-lombok-3d2n-001', 3,
   '{"id": "Snorkeling Tanjung Aan & keberangkatan", "en": "Snorkeling at Tanjung Aan & departure"}'::jsonb,
   3, 5, 20, 880000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

-- -- 4. Stops ─────────────────────────────────────────────────

-- Day 1 stops
INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-d1-01', 'daily-lombok-d1', '{"en": "Kuta Lombok Beach",  "id": "Pantai Kuta Lombok"}'::jsonb,   0, -8.8937, 116.2985, 'attraction'),
  ('stop-d1-02', 'daily-lombok-d1', '{"en": "Seger Beach",       "id": "Pantai Seger"}'::jsonb,          1, -8.9002, 116.3021, 'attraction'),
  ('stop-d1-03', 'daily-lombok-d1', '{"en": "Merese Hill",       "id": "Bukit Merese"}'::jsonb,         2, -8.9082, 116.3145, 'attraction'),
  ('stop-d1-04', 'daily-lombok-d1', '{"en": "Seger Beach Warung","id": "Warung Pantai Seger"}'::jsonb,  3, -8.9010, 116.3025, 'food'),
  ('stop-d1-05', 'daily-lombok-d1', '{"en": "Kuta Accommodation","id": "Penginapan Kuta"}'::jsonb,      4, -8.8950, 116.2991, 'rest')
ON CONFLICT (id) DO NOTHING;

-- Day 2 stops
INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-d2-01', 'daily-lombok-d2', '{"en": "Sade Village",         "id": "Desa Sade"}'::jsonb,           0, -8.8598, 116.2757, 'attraction'),
  ('stop-d2-02', 'daily-lombok-d2', '{"en": "Sukarara Craft Market","id": "Pasar Seni Sukarara"}'::jsonb,1, -8.7982, 116.2647, 'attraction'),
  ('stop-d2-03', 'daily-lombok-d2', '{"en": "Taliwang Restaurant",  "id": "Rumah Makan Taliwang"}'::jsonb,2, -8.8150, 116.2800, 'food'),
  ('stop-d2-04', 'daily-lombok-d2', '{"en": "Mawun Beach",          "id": "Pantai Mawun"}'::jsonb,       3, -8.9370, 116.2530, 'attraction')
ON CONFLICT (id) DO NOTHING;

-- Day 3 stops
INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-d3-01', 'daily-lombok-d3', '{"en": "Tanjung Aan",          "id": "Tanjung Aan"}'::jsonb,        0, -8.9182, 116.3265, 'attraction'),
  ('stop-d3-02', 'daily-lombok-d3', '{"en": "Beachside Warung",     "id": "Warung Tepi Pantai"}'::jsonb, 1, -8.9185, 116.3270, 'food'),
  ('stop-d3-03', 'daily-lombok-d3', '{"en": "Lombok Airport (LOP)", "id": "BIL Lombok Airport"}'::jsonb, 2, -8.7486, 116.2742, 'transport')
ON CONFLICT (id) DO NOTHING;

-- -- 5. Timelines ─────────────────────────────────────────────

-- Day 1 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-d1-01', 'daily-lombok-d1', '07:00', 30,
   '{"id": "Sarapan di penginapan", "en": "Breakfast at accommodation"}'::jsonb,
   'stop-d1-05',
   '{"id": "Mulai hari dengan sarapan ringan sebelum memulai perjalanan.", "en": "Start the day with a light breakfast before the journey."}'::jsonb,
   '[]'::jsonb, NULL, 0),

  ('tl-d1-02', 'daily-lombok-d1', '07:30', NULL,
   '{"id": "Perjalanan ke Pantai Kuta Lombok", "en": "Drive to Kuta Lombok Beach"}'::jsonb,
   NULL,
   '{"id": "Perjalanan singkat dengan motor sewaan dari penginapan.", "en": "Short ride with rented motorbike from accommodation."}'::jsonb,
   '[]'::jsonb, '5 km · 10 menit', 1),

  ('tl-d1-03', 'daily-lombok-d1', '07:45', 120,
   '{"id": "Eksplorasi Pantai Kuta Lombok", "en": "Explore Kuta Lombok Beach"}'::jsonb,
   'stop-d1-01',
   '{"id": "Nikmati hamparan pasir merica yang unik dan ombak yang tenang di pagi hari.", "en": "Enjoy the unique pepper-like sand and gentle morning waves."}'::jsonb,
   '["Termasuk parkir motor"]'::jsonb, NULL, 2),

  ('tl-d1-04', 'daily-lombok-d1', '10:00', 90,
   '{"id": "Pantai Seger & Batu Payung", "en": "Seger Beach & Batu Payung Rock"}'::jsonb,
   'stop-d1-02',
   '{"id": "Spot foto ikonik dengan formasi batu karang spektakuler.", "en": "Iconic photo spot with spectacular rock formations."}'::jsonb,
   '[]'::jsonb, '3 km · 5 menit', 3),

  ('tl-d1-05', 'daily-lombok-d1', '12:00', 60,
   '{"id": "Makan siang di warung tepi pantai", "en": "Lunch at beachside warung"}'::jsonb,
   'stop-d1-04',
   '{"id": "Cicipi ikan bakar segar dan plecing kangkung khas Lombok.", "en": "Taste fresh grilled fish and Lombok-style plecing kangkung."}'::jsonb,
   '[]'::jsonb, NULL, 4),

  ('tl-d1-06', 'daily-lombok-d1', '17:00', 90,
   '{"id": "Sunset di Bukit Merese", "en": "Sunset at Merese Hill"}'::jsonb,
   'stop-d1-03',
   '{"id": "Saksikan matahari terbenam yang spektakuler dengan panorama padang savana dan laut biru.", "en": "Watch a spectacular sunset over savanna fields and blue sea."}'::jsonb,
   '[]'::jsonb, '4 km · 8 menit', 5)
ON CONFLICT (id) DO NOTHING;

-- Day 2 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-d2-01', 'daily-lombok-d2', '08:00', 120,
   '{"id": "Kunjungan Desa Adat Sade", "en": "Visit to Sade Traditional Village"}'::jsonb,
   'stop-d2-01',
   '{"id": "Saksikan rumah adat Sasak, tenun tradisional, dan kehidupan sehari-hari masyarakat Sade.", "en": "See traditional Sasak houses, traditional weaving, and daily life of Sade community."}'::jsonb,
   '["Termasuk tiket masuk", "Termasuk pemandu lokal"]'::jsonb, NULL, 0),

  ('tl-d2-02', 'daily-lombok-d2', '10:30', 60,
   '{"id": "Pasar Tenun Sukarara", "en": "Sukarara Weaving Market"}'::jsonb,
   'stop-d2-02',
   '{"id": "Lihat proses tenun songket Lombok secara langsung dan belanja oleh-oleh kain tenun.", "en": "Watch live Lombok songket weaving process and shop for woven fabric souvenirs."}'::jsonb,
   '[]'::jsonb, '15 km · 25 menit', 1),

  ('tl-d2-03', 'daily-lombok-d2', '12:30', 60,
   '{"id": "Makan siang Ayam Taliwang", "en": "Ayam Taliwang Lunch"}'::jsonb,
   'stop-d2-03',
   '{"id": "Santap ayam taliwang pedas khas Lombok yang legendaris.", "en": "Enjoy the legendary spicy Lombok-style Taliwang chicken."}'::jsonb,
   '[]'::jsonb, NULL, 2),

  ('tl-d2-04', 'daily-lombok-d2', '14:30', 120,
   '{"id": "Pantai Mawun — pantai tersembunyi", "en": "Mawun Beach — hidden gem"}'::jsonb,
   'stop-d2-04',
   '{"id": "Pantai berbentuk tapal kuda dengan air biru jernih dan ombak yang tenang, jauh dari keramaian.", "en": "Horseshoe-shaped beach with crystal-clear water and calm waves, far from crowds."}'::jsonb,
   '[]'::jsonb, '25 km · 35 menit', 3)
ON CONFLICT (id) DO NOTHING;

-- Day 3 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-d3-01', 'daily-lombok-d3', '07:30', 180,
   '{"id": "Snorkeling di Tanjung Aan", "en": "Snorkeling at Tanjung Aan"}'::jsonb,
   'stop-d3-01',
   '{"id": "Selami keindahan bawah laut Tanjung Aan dengan terumbu karang berwarna-warni dan ikan tropis.", "en": "Dive into the underwater beauty of Tanjung Aan with colorful coral reefs and tropical fish."}'::jsonb,
   '["Termasuk sewa alat snorkel", "Termasuk pemandu snorkeling"]'::jsonb, NULL, 0),

  ('tl-d3-02', 'daily-lombok-d3', '11:00', 60,
   '{"id": "Makan siang seafood tepi pantai", "en": "Seafood lunch by the beach"}'::jsonb,
   'stop-d3-02',
   '{"id": "Santap seafood segar hasil tangkapan nelayan lokal langsung di tepi pantai.", "en": "Enjoy fresh seafood caught by local fishermen right by the beach."}'::jsonb,
   '[]'::jsonb, NULL, 1),

  ('tl-d3-03', 'daily-lombok-d3', '14:00', NULL,
   '{"id": "Perjalanan ke Bandara Lombok (BIL)", "en": "Transfer to Lombok International Airport (BIL)"}'::jsonb,
   'stop-d3-03',
   '{"id": "Perjalanan ke bandara untuk penerbangan selanjutnya.", "en": "Transfer to airport for onward flight."}'::jsonb,
   '[]'::jsonb, '28 km · 40 menit', 2)
ON CONFLICT (id) DO NOTHING;

-- -- 6. Schedules ─────────────────────────────────────────────
INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-lombok-aug-01', 'itin-lombok-3d2n-001', '2026-08-07', NULL,          'available', 1, 12, NULL),
  ('sched-lombok-aug-02', 'itin-lombok-3d2n-001', '2026-08-21', NULL,          'available', 2, 8,  2750000),
  ('sched-lombok-sep-01', 'itin-lombok-3d2n-001', '2026-09-04', 'Long Weekend Edition', 'sold_out', 1, 12, 2850000),
  ('sched-lombok-sep-02', 'itin-lombok-3d2n-001', '2026-09-18', NULL,          'available', 1, 12, NULL)
ON CONFLICT (id) DO NOTHING;

-- =============================================================
-- 14 NEW ITINERARIES
-- =============================================================
-- ── 1. Yogyakarta 2D1N - Borobudur & Prambanan Temple ─────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-yogya-borobudur-001',
  'borobudur-prambanan-2-hari-1-malam',
  '{"id": "Keajaiban Candi: Borobudur & Prambanan 2D1N", "en": "Temple Wonders: Borobudur & Prambanan 2D1N"}'::jsonb,
  '{
    "id": "Saksikan matahari terbit dari Candi Borobudur, jelajahi relief Candi Prambanan, dan nikmati sore di Keraton Ratu Boko dalam perjalanan 2 hari penuh sejarah.",
    "en": "Witness sunrise at Borobudur Temple, explore Prambanan Temple reliefs, and enjoy afternoon at Ratu Boko Palace in this 2-day heritage journey."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.90, 203, 6210, 512,
  2, 1, 1, 15,
  d.id,
  'creator-atourin-official',
  'easy',
  1850000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa mobil + sopir", "amount": 500000},
    {"label": "Penginapan 1 malam", "sublabel": "Hotel area Yogyakarta", "amount": 400000},
    {"label": "Tiket masuk candi", "sublabel": "Borobudur + Prambanan", "amount": 450000},
    {"label": "Makan 3x", "sublabel": "Estimasi per orang", "amount": 350000},
    {"label": "Oleh-oleh & lain-lain", "amount": 150000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{heritage,sejarah}'::text[],
  '{candi-ikonic,kearifan-budaya,kuliner-otentik}'::text[],
  '{solo,couple,family,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "high", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "high", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Waktu terbaik: April–September. Datanglah pagi buta untuk sunrise Borobudur yang magis.", "en": "Best time: April–September. Arrive early for the magical Borobudur sunrise."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'magelang'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-yogya-borobudur-d1', 'itin-yogya-borobudur-001', 1,
   '{"id": "Borobudur Sunrise & Candi Mendut", "en": "Borobudur Sunrise & Mendut Temple"}'::jsonb,
    4, 10, 45, 950000),
  ('daily-yogya-borobudur-d2', 'itin-yogya-borobudur-001', 2,
   '{"id": "Prambanan & Ratu Boko Sunset", "en": "Prambanan & Ratu Boko Sunset"}'::jsonb,
    4, 8, 35, 900000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-yogya-borobudur-d1-01', 'daily-yogya-borobudur-d1', '{"en": "Borobudur Temple", "id": "Candi Borobudur"}'::jsonb, 0, -7.6079, 110.2038, 'attraction'),
  ('stop-yogya-borobudur-d1-02', 'daily-yogya-borobudur-d1', '{"en": "Mendut Temple", "id": "Candi Mendut"}'::jsonb, 1, -7.6052, 110.2290, 'attraction'),
  ('stop-yogya-borobudur-d1-03', 'daily-yogya-borobudur-d1', '{"en": "Pawon Temple", "id": "Candi Pawon"}'::jsonb, 2, -7.6061, 110.2164, 'attraction'),
  ('stop-yogya-borobudur-d1-04', 'daily-yogya-borobudur-d1', '{"en": "Borobudur Area Hotel", "id": "Hotel Area Borobudur"}'::jsonb, 3, -7.6058, 110.2060, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-yogya-borobudur-d2-01', 'daily-yogya-borobudur-d2', '{"en": "Prambanan Temple", "id": "Candi Prambanan"}'::jsonb, 0, -7.7520, 110.4914, 'attraction'),
  ('stop-yogya-borobudur-d2-02', 'daily-yogya-borobudur-d2', '{"en": "Sewu Temple", "id": "Candi Sewu"}'::jsonb, 1, -7.7456, 110.4939, 'attraction'),
  ('stop-yogya-borobudur-d2-03', 'daily-yogya-borobudur-d2', '{"en": "Ratu Boko Palace", "id": "Keraton Ratu Boko"}'::jsonb, 2, -7.7692, 110.4890, 'attraction'),
  ('stop-yogya-borobudur-d2-04', 'daily-yogya-borobudur-d2', '{"en": "Gudeg Restaurant", "id": "Restoran Gudeg"}'::jsonb, 3, -7.7906, 110.4060, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-yogya-borobudur-aug-01', 'itin-yogya-borobudur-001', '2026-08-08', NULL, 'available', 1, 15, 1850000),
  ('sched-yogya-borobudur-aug-02', 'itin-yogya-borobudur-001', '2026-08-22', 'Sunrise Special', 'available', 2, 12, 2100000),
  ('sched-yogya-borobudur-sep-01', 'itin-yogya-borobudur-001', '2026-09-12', NULL, 'available', 1, 15, NULL)
ON CONFLICT (id) DO NOTHING;

-- Day 1 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-yogya-borobudur-d1-01', 'daily-yogya-borobudur-d1', '04:00', NULL,
   '{"id": "Penjemputan dari hotel", "en": "Pick-up from hotel"}'::jsonb,
   NULL,
   '{"id": "Perjalanan menuju Candi Borobudur untuk sunrise.", "en": "Journey to Borobudur Temple for sunrise."}'::jsonb,
   '["Termasuk antar-jemput"]'::jsonb, '25 km · 45 menit', 0),
  ('tl-yogya-borobudur-d1-02', 'daily-yogya-borobudur-d1', '05:00', 120,
   '{"id": "Sunrise di Borobudur", "en": "Sunrise at Borobudur"}'::jsonb,
   'stop-yogya-borobudur-d1-01',
   '{"id": "Saksikan matahari terbit dari puncak candi Buddha terbesar di dunia.", "en": "Witness the sunrise from the world''s largest Buddhist temple."}'::jsonb,
   '["Termasuk tiket masuk"]'::jsonb, NULL, 1),
  ('tl-yogya-borobudur-d1-03', 'daily-yogya-borobudur-d1', '08:00', 60,
   '{"id": "Sarapan dengan latar candi", "en": "Breakfast with temple backdrop"}'::jsonb,
   'stop-yogya-borobudur-d1-04',
   '{"id": "Sarapan pagi sambil menikmati pemandangan Bukit Menoreh.", "en": "Morning breakfast while enjoying Menoreh Hill views."}'::jsonb,
   '[]'::jsonb, NULL, 2),
  ('tl-yogya-borobudur-d1-04', 'daily-yogya-borobudur-d1', '09:30', 120,
   '{"id": "Candi Mendut & Pawon", "en": "Mendut & Pawon Temples"}'::jsonb,
   'stop-yogya-borobudur-d1-02',
   '{"id": "Jelajahi candi-candi era Mataram Kuno dengan arsitektur yang memukau.", "en": "Explore ancient Mataram-era temples with stunning architecture."}'::jsonb,
   '[]'::jsonb, '3 km · 5 menit', 3)
ON CONFLICT (id) DO NOTHING;

-- ── 2. Yogyakarta 3D2N - Heritage & Culinary Tour ─────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-yogya-heritage-001',
  'heritage-kuliner-yogyakarta-3-hari-2-malam',
  '{"id": "Warisan & Kuliner Yogyakarta 3D2N", "en": "Yogyakarta Heritage & Culinary 3D2N"}'::jsonb,
  '{
    "id": "Benamkan diri dalam budaya Jawa: dari Keraton Yogyakarta, Taman Sari, hingga wisata kuliner malam Malioboro yang legendaris.",
    "en": "Immerse yourself in Javanese culture: from the Yogyakarta Palace, Taman Sari, to the legendary Malioboro night food scene."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.80, 156, 5230, 423,
  3, 2, 1, 10,
  d.id,
  'creator-atourin-official',
  'easy',
  2200000,
  '[
    {"label": "Transportasi 3 hari", "sublabel": "Sewa mobil + sopir", "amount": 650000},
    {"label": "Penginapan 2 malam", "sublabel": "Hotel area Malioboro", "amount": 700000},
    {"label": "Tiket & aktivitas", "amount": 250000},
    {"label": "Makan & kuliner", "sublabel": "Termasuk angkringan & gudeg", "amount": 450000},
    {"label": "Belanja batik & lain-lain", "amount": 150000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{budaya,sejarah,kuliner}'::text[],
  '{kearifan-budaya,kuliner-otentik,belanja-oleh-oleh}'::text[],
  '{solo,couple,family}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "high", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "high", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Yogyakarta nyaman dikunjungi kapan saja. Musim kemarau (April–September) paling ideal.", "en": "Yogyakarta is pleasant year-round. Dry season (April–September) is most ideal."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'yogyakarta'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-yogya-heritage-d1', 'itin-yogya-heritage-001', 1,
   '{"id": "Keraton & Malioboro", "en": "Palace & Malioboro"}'::jsonb, 4, 8, 15, 750000),
  ('daily-yogya-heritage-d2', 'itin-yogya-heritage-001', 2,
   '{"id": "Batik & Kotagede", "en": "Batik & Kotagede"}'::jsonb, 4, 7, 20, 700000),
  ('daily-yogya-heritage-d3', 'itin-yogya-heritage-001', 3,
   '{"id": "Museum & Kuliner Akhir", "en": "Museum & Farewell Culinary"}'::jsonb, 3, 5, 12, 750000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-yogya-heritage-d1-01', 'daily-yogya-heritage-d1', '{"en": "Yogyakarta Palace", "id": "Keraton Yogyakarta"}'::jsonb, 0, -7.8054, 110.3642, 'attraction'),
  ('stop-yogya-heritage-d1-02', 'daily-yogya-heritage-d1', '{"en": "Taman Sari Water Castle", "id": "Taman Sari"}'::jsonb, 1, -7.8094, 110.3588, 'attraction'),
  ('stop-yogya-heritage-d1-03', 'daily-yogya-heritage-d1', '{"en": "Malioboro Street", "id": "Jalan Malioboro"}'::jsonb, 2, -7.7924, 110.3664, 'attraction'),
  ('stop-yogya-heritage-d1-04', 'daily-yogya-heritage-d1', '{"en": "Angkringan Malioboro", "id": "Angkringan Malioboro"}'::jsonb, 3, -7.7915, 110.3667, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-yogya-heritage-d2-01', 'daily-yogya-heritage-d2', '{"en": "Batik Workshop", "id": "Workshop Batik"}'::jsonb, 0, -7.8100, 110.3670, 'attraction'),
  ('stop-yogya-heritage-d2-02', 'daily-yogya-heritage-d2', '{"en": "Kotagede Silver Market", "id": "Pasar Perak Kotagede"}'::jsonb, 1, -7.8260, 110.3995, 'attraction'),
  ('stop-yogya-heritage-d2-03', 'daily-yogya-heritage-d2', '{"en": "Gudeg Pawon Restaurant", "id": "Gudeg Pawon"}'::jsonb, 2, -7.8140, 110.3950, 'food'),
  ('stop-yogya-heritage-d2-04', 'daily-yogya-heritage-d2', '{"en": "City Hotel", "id": "Hotel Kota"}'::jsonb, 3, -7.8000, 110.3650, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-yogya-heritage-d3-01', 'daily-yogya-heritage-d3', '{"en": "Sonobudoyo Museum", "id": "Museum Sonobudoyo"}'::jsonb, 0, -7.8005, 110.3628, 'attraction'),
  ('stop-yogya-heritage-d3-02', 'daily-yogya-heritage-d3', '{"en": "Beringharjo Market", "id": "Pasar Beringharjo"}'::jsonb, 1, -7.7931, 110.3653, 'attraction'),
  ('stop-yogya-heritage-d3-03', 'daily-yogya-heritage-d3', '{"en": "The House of Raminten", "id": "Omah Raminten"}'::jsonb, 2, -7.7920, 110.3680, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-yogya-heritage-aug-01', 'itin-yogya-heritage-001', '2026-08-05', NULL, 'available', 1, 10, 2200000),
  ('sched-yogya-heritage-aug-02', 'itin-yogya-heritage-001', '2026-08-19', 'Batik Workshop Included', 'available', 2, 8, 2500000),
  ('sched-yogya-heritage-sep-01', 'itin-yogya-heritage-001', '2026-09-02', NULL, 'available', 1, 10, NULL),
   ('sched-yogya-heritage-sep-02', 'itin-yogya-heritage-001', '2026-09-16', NULL, 'available', 2, 10, 2350000)
ON CONFLICT (id) DO NOTHING;

-- ── 3. Bandung 2D1N - Kawah Putih & Factory Outlets ───────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-bandung-kawah-001',
  'kawah-putih-outlet-bandung-2-hari-1-malam',
  '{"id": "Kawah Putih & Factory Outlet 2D1N", "en": "Kawah Putih & Factory Outlet 2D1N"}'::jsonb,
  '{
    "id": "Nikmati keajaiban alam Kawah Putih Ciwidey, lalu berbelanja di factory outlet ternama Bandung — perpaduan sempurna alam dan gaya.",
    "en": "Enjoy the natural wonder of Kawah Putih Ciwidey, then shop at Bandung''s famous factory outlets — the perfect blend of nature and style."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.75, 98, 4120, 315,
  2, 1, 1, 12,
  d.id,
  'creator-atourin-official',
  'easy',
  1300000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa mobil", "amount": 400000},
    {"label": "Penginapan 1 malam", "sublabel": "Hotel area Dago", "amount": 350000},
    {"label": "Tiket Kawah Putih & parkir", "amount": 150000},
    {"label": "Makan & kuliner", "sublabel": "Estimasi per orang", "amount": 300000},
    {"label": "Belanja outlet", "amount": 100000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{alam,kuliner}'::text[],
  '{pemandangan,belanja-oleh-oleh,kuliner-otentik}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Musim kemarau (Juni–September) memberi langit cerah untuk pemandangan Kawah Putih optimal.", "en": "Dry season (June–September) gives clear skies for optimal Kawah Putih views."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'bandung'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-bandung-kawah-d1', 'itin-bandung-kawah-001', 1,
   '{"id": "Kawah Putih & Ciwidey", "en": "Kawah Putih & Ciwidey"}'::jsonb, 3, 8, 50, 650000),
  ('daily-bandung-kawah-d2', 'itin-bandung-kawah-001', 2,
   '{"id": "Factory Outlet & Braga", "en": "Factory Outlet & Braga"}'::jsonb, 3, 6, 15, 650000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bandung-kawah-d1-01', 'daily-bandung-kawah-d1', '{"en": "Kawah Putih Crater", "id": "Kawah Putih"}'::jsonb, 0, -7.1781, 107.4046, 'attraction'),
  ('stop-bandung-kawah-d1-02', 'daily-bandung-kawah-d1', '{"en": "Situ Patenggang Lake", "id": "Situ Patenggang"}'::jsonb, 1, -7.1654, 107.3695, 'attraction'),
  ('stop-bandung-kawah-d1-03', 'daily-bandung-kawah-d1', '{"en": "Ridwan Farm Strawberry", "id": "Kebun Stroberi Ridwan Farm"}'::jsonb, 2, -7.1700, 107.3950, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bandung-kawah-d2-01', 'daily-bandung-kawah-d2', '{"en": "Dago Factory Outlet", "id": "Factory Outlet Dago"}'::jsonb, 0, -6.8750, 107.6135, 'attraction'),
  ('stop-bandung-kawah-d2-02', 'daily-bandung-kawah-d2', '{"en": "Braga Street", "id": "Jalan Braga"}'::jsonb, 1, -6.9133, 107.6115, 'attraction'),
  ('stop-bandung-kawah-d2-03', 'daily-bandung-kawah-d2', '{"en": "Batagor Kingsley", "id": "Batagor Kingsley"}'::jsonb, 2, -6.9120, 107.6100, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-bandung-kawah-aug-01', 'itin-bandung-kawah-001', '2026-08-01', NULL, 'available', 1, 12, 1300000),
  ('sched-bandung-kawah-aug-02', 'itin-bandung-kawah-001', '2026-08-15', 'Weekend Shopping', 'available', 2, 10, 1500000),
  ('sched-bandung-kawah-sep-01', 'itin-bandung-kawah-001', '2026-09-05', NULL, 'available', 1, 12, NULL)
ON CONFLICT (id) DO NOTHING;

-- Day 1 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-bandung-kawah-d1-01', 'daily-bandung-kawah-d1', '07:00', 30,
   '{"id": "Sarapan pagi", "en": "Morning breakfast"}'::jsonb,
   NULL,
   '{"id": "Sarapan di hotel sebelum perjalanan ke Ciwidey.", "en": "Breakfast at hotel before the Ciwidey trip."}'::jsonb,
   '[]'::jsonb, NULL, 0),
  ('tl-bandung-kawah-d1-02', 'daily-bandung-kawah-d1', '08:00', NULL,
   '{"id": "Perjalanan menuju Kawah Putih", "en": "Drive to Kawah Putih"}'::jsonb,
   NULL,
   '{"id": "Perjalanan menuju kawasan Ciwidey yang sejuk.", "en": "Journey to the cool Ciwidey area."}'::jsonb,
   '[]'::jsonb, '35 km · 1 jam', 1),
  ('tl-bandung-kawah-d1-03', 'daily-bandung-kawah-d1', '09:30', 120,
   '{"id": "Eksplorasi Kawah Putih", "en": "Explore Kawah Putih"}'::jsonb,
   'stop-bandung-kawah-d1-01',
   '{"id": "Nikmati pemandangan danau kawah belerang berwarna putih kehijauan yang ikonik.", "en": "Enjoy views of the iconic greenish-white sulfur crater lake."}'::jsonb,
   '["Termasuk tiket masuk", "Termasuk parkir"]'::jsonb, NULL, 2),
  ('tl-bandung-kawah-d1-04', 'daily-bandung-kawah-d1', '12:00', 90,
   '{"id": "Makan siang & stroberi", "en": "Lunch & strawberries"}'::jsonb,
   'stop-bandung-kawah-d1-03',
   '{"id": "Makan siang dan petik stroberi segar langsung dari kebun.", "en": "Lunch and pick fresh strawberries from the farm."}'::jsonb,
   '[]'::jsonb, '5 km · 10 menit', 3)
ON CONFLICT (id) DO NOTHING;

-- ── 4. Bandung 3D2N - Nature & Culinary ────────────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-bandung-nature-001',
  'alam-kuliner-bandung-3-hari-2-malam',
  '{"id": "Alam & Kuliner Bandung 3D2N", "en": "Bandung Nature & Culinary 3D2N"}'::jsonb,
  '{
    "id": "Jelajahi kawah vulkanik, kebun teh hijau, dan nikmati kuliner legendaris Bandung dalam tiga hari penuh petualangan.",
    "en": "Explore volcanic craters, green tea plantations, and enjoy legendary Bandung cuisine in three adventure-filled days."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.70, 82, 3840, 278,
  3, 2, 1, 10,
  d.id,
  'creator-atourin-official',
  'medium',
  2200000,
  '[
    {"label": "Transportasi 3 hari", "sublabel": "Sewa mobil full", "amount": 700000},
    {"label": "Penginapan 2 malam", "sublabel": "Hotel area Lembang", "amount": 600000},
    {"label": "Tiket & parkir", "amount": 250000},
    {"label": "Makan & wisata kuliner", "sublabel": "Termasuk suki & sate", "amount": 500000},
    {"label": "Lain-lain", "amount": 150000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{alam,kuliner}'::text[],
  '{pemandangan,kuliner-otentik,biota-alam}'::text[],
  '{couple,family,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Akhir pekan bisa ramai di Lembang. Kunjungi hari kerja untuk pengalaman lebih tenang.", "en": "Weekends can be crowded at Lembang. Visit on weekdays for a calmer experience."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'bandung'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-bandung-nature-d1', 'itin-bandung-nature-001', 1,
   '{"id": "Tangkuban Perahu & Lembang", "en": "Tangkuban Perahu & Lembang"}'::jsonb, 4, 7, 30, 750000),
  ('daily-bandung-nature-d2', 'itin-bandung-nature-001', 2,
   '{"id": "Ciwidey & Kebun Teh", "en": "Ciwidey & Tea Plantation"}'::jsonb, 4, 8, 60, 800000),
  ('daily-bandung-nature-d3', 'itin-bandung-nature-001', 3,
   '{"id": "Kuliner Bandung", "en": "Bandung Culinary Tour"}'::jsonb, 3, 5, 15, 650000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bandung-nature-d1-01', 'daily-bandung-nature-d1', '{"en": "Tangkuban Perahu Crater", "id": "Kawah Tangkuban Perahu"}'::jsonb, 0, -6.7620, 107.6140, 'attraction'),
  ('stop-bandung-nature-d1-02', 'daily-bandung-nature-d1', '{"en": "Floating Market Lembang", "id": "Floating Market Lembang"}'::jsonb, 1, -6.8147, 107.6176, 'attraction'),
  ('stop-bandung-nature-d1-03', 'daily-bandung-nature-d1', '{"en": "De Ranch Lembang", "id": "De Ranch Lembang"}'::jsonb, 2, -6.8160, 107.6180, 'attraction'),
  ('stop-bandung-nature-d1-04', 'daily-bandung-nature-d1', '{"en": "Lembang Hotel", "id": "Hotel Lembang"}'::jsonb, 3, -6.8180, 107.6190, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bandung-nature-d2-01', 'daily-bandung-nature-d2', '{"en": "Kawah Putih", "id": "Kawah Putih"}'::jsonb, 0, -7.1781, 107.4046, 'attraction'),
  ('stop-bandung-nature-d2-02', 'daily-bandung-nature-d2', '{"en": "Rancabali Tea Plantation", "id": "Perkebunan Teh Rancabali"}'::jsonb, 1, -7.1600, 107.3800, 'attraction'),
  ('stop-bandung-nature-d2-03', 'daily-bandung-nature-d2', '{"en": "Situ Patenggang", "id": "Situ Patenggang"}'::jsonb, 2, -7.1654, 107.3695, 'attraction'),
  ('stop-bandung-nature-d2-04', 'daily-bandung-nature-d2', '{"en": "Ciwidey Restaurant", "id": "Restoran Ciwidey"}'::jsonb, 3, -7.1750, 107.4000, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bandung-nature-d3-01', 'daily-bandung-nature-d3', '{"en": "Sate Klatak", "id": "Sate Klatak"}'::jsonb, 0, -6.9030, 107.6200, 'food'),
  ('stop-bandung-nature-d3-02', 'daily-bandung-nature-d3', '{"en": "Coblong Suji", "id": "Suji Coblong"}'::jsonb, 1, -6.8980, 107.6180, 'food'),
  ('stop-bandung-nature-d3-03', 'daily-bandung-nature-d3', '{"en": "Bandung Station", "id": "Stasiun Bandung"}'::jsonb, 2, -6.9147, 107.5997, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-bandung-nature-jul-01', 'itin-bandung-nature-001', '2026-07-10', NULL, 'available', 1, 10, 2200000),
  ('sched-bandung-nature-aug-01', 'itin-bandung-nature-001', '2026-08-14', NULL, 'available', 1, 10, NULL),
   ('sched-bandung-nature-sep-01', 'itin-bandung-nature-001', '2026-09-11', 'Nature Explorer', 'available', 2, 8, 2500000)
ON CONFLICT (id) DO NOTHING;

-- ── 5. Ubud 3D2N - Sacred Temples & Rice Terraces ──────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-ubud-temples-001',
  'pura-terasering-ubud-3-hari-2-malam',
  '{"id": "Pura Suci & Terasering Ubud 3D2N", "en": "Sacred Temples & Rice Terraces 3D2N"}'::jsonb,
  '{
    "id": "Rasakan kedamaian Ubud: dari sawah terasering Tegallalang, Pura Tirta Empul yang suci, hingga tegakan bukit Campuhan Ridge.",
    "en": "Experience the tranquility of Ubud: from Tegallalang rice terraces, the sacred Tirta Empul Temple, to Campuhan Ridge walks."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.95, 210, 7210, 589,
  3, 2, 1, 12,
  d.id,
  'creator-atourin-official',
  'easy',
  2800000,
  '[
    {"label": "Transportasi 3 hari", "sublabel": "Sewa mobil + sopir", "amount": 750000},
    {"label": "Penginapan 2 malam", "sublabel": "Villa area Ubud", "amount": 1000000},
    {"label": "Tiket pura & parkir", "amount": 250000},
    {"label": "Makan 3x sehari", "sublabel": "Termasuk babi guling", "amount": 600000},
    {"label": "Lain-lain", "amount": 200000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{budaya,alam}'::text[],
  '{pemandangan,kearifan-budaya,kuliner-otentik,wellness-relax}'::text[],
  '{solo,couple,family}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Ubud indah sepanjang tahun. Pagi hari paling tenang sebelum kedatangan wisatawan.", "en": "Ubud is beautiful year-round. Mornings are the quietest before tourist arrivals."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'gianyar-ubud'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-ubud-temples-d1', 'itin-ubud-temples-001', 1,
   '{"id": "Tegallalang & Tirta Empul", "en": "Tegallalang & Tirta Empul"}'::jsonb, 4, 8, 25, 950000),
  ('daily-ubud-temples-d2', 'itin-ubud-temples-001', 2,
   '{"id": "Monkey Forest & Ubud Center", "en": "Monkey Forest & Ubud Center"}'::jsonb, 4, 7, 10, 900000),
  ('daily-ubud-temples-d3', 'itin-ubud-temples-001', 3,
   '{"id": "Tegenungan & Sukawati", "en": "Tegenungan & Sukawati"}'::jsonb, 4, 6, 20, 950000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-ubud-temples-d1-01', 'daily-ubud-temples-d1', '{"en": "Tegallalang Rice Terrace", "id": "Terasering Tegallalang"}'::jsonb, 0, -8.4659, 115.2797, 'attraction'),
  ('stop-ubud-temples-d1-02', 'daily-ubud-temples-d1', '{"en": "Tirta Empul Temple", "id": "Pura Tirta Empul"}'::jsonb, 1, -8.4155, 115.3159, 'attraction'),
  ('stop-ubud-temples-d1-03', 'daily-ubud-temples-d1', '{"en": "Kintamani Volcano View", "id": "Pemandangan Gunung Kintamani"}'::jsonb, 2, -8.2540, 115.3310, 'attraction'),
  ('stop-ubud-temples-d1-04', 'daily-ubud-temples-d1', '{"en": "Babi Guling Ibu Oka", "id": "Babi Guling Ibu Oka"}'::jsonb, 3, -8.5070, 115.2650, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-ubud-temples-d2-01', 'daily-ubud-temples-d2', '{"en": "Ubud Monkey Forest", "id": "Monkey Forest Ubud"}'::jsonb, 0, -8.5181, 115.2590, 'attraction'),
  ('stop-ubud-temples-d2-02', 'daily-ubud-temples-d2', '{"en": "Ubud Palace", "id": "Puri Saren Ubud"}'::jsonb, 1, -8.5069, 115.2625, 'attraction'),
  ('stop-ubud-temples-d2-03', 'daily-ubud-temples-d2', '{"en": "Campuhan Ridge Walk", "id": "Campuhan Ridge Walk"}'::jsonb, 2, -8.5090, 115.2560, 'attraction'),
  ('stop-ubud-temples-d2-04', 'daily-ubud-temples-d2', '{"en": "Ubud Traditional Market", "id": "Pasar Seni Ubud"}'::jsonb, 3, -8.5065, 115.2630, 'attraction')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-ubud-temples-d3-01', 'daily-ubud-temples-d3', '{"en": "Goa Gajah (Elephant Cave)", "id": "Goa Gajah"}'::jsonb, 0, -8.5231, 115.2864, 'attraction'),
  ('stop-ubud-temples-d3-02', 'daily-ubud-temples-d3', '{"en": "Tegenungan Waterfall", "id": "Air Terjun Tegenungan"}'::jsonb, 1, -8.5690, 115.2890, 'attraction'),
  ('stop-ubud-temples-d3-03', 'daily-ubud-temples-d3', '{"en": "Sukawati Art Market", "id": "Pasar Seni Sukawati"}'::jsonb, 2, -8.5940, 115.2830, 'attraction'),
  ('stop-ubud-temples-d3-04', 'daily-ubud-temples-d3', '{"en": "Bebek Bengil Ubud", "id": "Bebek Bengil Ubud"}'::jsonb, 3, -8.5200, 115.2680, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-ubud-temples-jul-01', 'itin-ubud-temples-001', '2026-07-12', NULL, 'available', 1, 12, 2800000),
  ('sched-ubud-temples-jul-02', 'itin-ubud-temples-001', '2026-07-26', 'Spiritual Retreat', 'available', 2, 10, 3200000),
  ('sched-ubud-temples-aug-01', 'itin-ubud-temples-001', '2026-08-09', NULL, 'available', 1, 12, NULL),
  ('sched-ubud-temples-aug-02', 'itin-ubud-temples-001', '2026-08-23', NULL, 'available', 1, 10, 2950000)
ON CONFLICT (id) DO NOTHING;

-- Day 1 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-ubud-temples-d1-01', 'daily-ubud-temples-d1', '07:00', 30,
   '{"id": "Sarapan di villa", "en": "Breakfast at villa"}'::jsonb,
   NULL,
   '{"id": "Sarapan sehat di penginapan sebelum memulai hari.", "en": "Healthy breakfast at accommodation before starting the day."}'::jsonb,
   '[]'::jsonb, NULL, 0),
  ('tl-ubud-temples-d1-02', 'daily-ubud-temples-d1', '08:00', 120,
   '{"id": "Terasering Tegallalang", "en": "Tegallalang Rice Terraces"}'::jsonb,
   'stop-ubud-temples-d1-01',
   '{"id": "Jelajahi sawah terasering ikonik dengan pemandangan hijau yang menakjubkan.", "en": "Explore iconic rice terraces with stunning green landscapes."}'::jsonb,
   '["Termasuk parkir"]'::jsonb, '10 km · 20 menit', 1),
  ('tl-ubud-temples-d1-03', 'daily-ubud-temples-d1', '11:00', 90,
   '{"id": "Pura Tirta Empul", "en": "Tirta Empul Temple"}'::jsonb,
   'stop-ubud-temples-d1-02',
   '{"id": "Ikuti ritual pemurnian diri di pura suci dengan air pancuran.", "en": "Participate in the purification ritual at the holy water temple."}'::jsonb,
   '["Termasuk tiket masuk", "Termasuk sarung"]'::jsonb, '8 km · 15 menit', 2),
  ('tl-ubud-temples-d1-04', 'daily-ubud-temples-d1', '13:00', 60,
   '{"id": "Makan siang dengan pemandangan", "en": "Lunch with a view"}'::jsonb,
   'stop-ubud-temples-d1-04',
   '{"id": "Santap babi guling legendaris Ibu Oka.", "en": "Enjoy legendary Ibu Oka suckling pig."}'::jsonb,
   '[]'::jsonb, '15 km · 30 menit', 3),
  ('tl-ubud-temples-d1-05', 'daily-ubud-temples-d1', '15:00', 120,
   '{"id": "Kintamani & Batur View", "en": "Kintamani & Mount Batur View"}'::jsonb,
   'stop-ubud-temples-d1-03',
   '{"id": "Nikmati panorama Gunung Batur dan Danau Batur dari Kintamani.", "en": "Enjoy panoramic views of Mount Batur and Lake Batur from Kintamani."}'::jsonb,
   '[]'::jsonb, '20 km · 40 menit', 4)
ON CONFLICT (id) DO NOTHING;

-- ── 6. Kuta 2D1N - Surf & Beach Club ───────────────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-kuta-surf-001',
  'surf-beach-club-kuta-2-hari-1-malam',
  '{"id": "Surf & Beach Club Kuta 2D1N", "en": "Surf & Beach Club Kuta 2D1N"}'::jsonb,
  '{
    "id": "Cobalah berselancar di ombak legendaris Kuta, bersantai di beach club Seminyak, dan nikmati sunset spektakuler di Jimbaran.",
    "en": "Try surfing on Kuta''s legendary waves, relax at Seminyak beach clubs, and enjoy spectacular sunset dining at Jimbaran."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.60, 145, 5120, 398,
  2, 1, 1, 15,
  d.id,
  'creator-atourin-official',
  'easy',
  2000000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa motor", "amount": 200000},
    {"label": "Penginapan 1 malam", "sublabel": "Hotel area Kuta", "amount": 500000},
    {"label": "Les surfing + sewa papan", "amount": 350000},
    {"label": "Beach club & minuman", "amount": 400000},
    {"label": "Makan seafood Jimbaran", "amount": 550000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{bahari}'::text[],
  '{aktivitas-luar-ruangan,wellness-relax,kuliner-otentik}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "high", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "high", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Ombak terbaik untuk surfing: Mei–September. Hindari musim hujan Desember–Februari.", "en": "Best waves for surfing: May–September. Avoid the rainy season December–February."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'badung-kuta'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-kuta-surf-d1', 'itin-kuta-surf-001', 1,
   '{"id": "Surf & Sunset di Kuta", "en": "Surf & Sunset at Kuta"}'::jsonb, 4, 8, 10, 1050000),
  ('daily-kuta-surf-d2', 'itin-kuta-surf-001', 2,
   '{"id": "Seminyak & Jimbaran", "en": "Seminyak & Jimbaran"}'::jsonb, 4, 7, 15, 950000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-kuta-surf-d1-01', 'daily-kuta-surf-d1', '{"en": "Kuta Beach", "id": "Pantai Kuta"}'::jsonb, 0, -8.7184, 115.1686, 'attraction'),
  ('stop-kuta-surf-d1-02', 'daily-kuta-surf-d1', '{"en": "Surf School Kuta", "id": "Sekolah Surf Kuta"}'::jsonb, 1, -8.7190, 115.1690, 'attraction'),
  ('stop-kuta-surf-d1-03', 'daily-kuta-surf-d1', '{"en": "Beachwalk Mall", "id": "Beachwalk Mall"}'::jsonb, 2, -8.7200, 115.1660, 'attraction'),
  ('stop-kuta-surf-d1-04', 'daily-kuta-surf-d1', '{"en": "Kuta Hotel", "id": "Hotel Kuta"}'::jsonb, 3, -8.7160, 115.1700, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-kuta-surf-d2-01', 'daily-kuta-surf-d2', '{"en": "Seminyak Beach", "id": "Pantai Seminyak"}'::jsonb, 0, -8.6910, 115.1550, 'attraction'),
  ('stop-kuta-surf-d2-02', 'daily-kuta-surf-d2', '{"en": "Potato Head Beach Club", "id": "Potato Head Beach Club"}'::jsonb, 1, -8.6900, 115.1530, 'attraction'),
  ('stop-kuta-surf-d2-03', 'daily-kuta-surf-d2', '{"en": "Jimbaran Bay Seafood", "id": "Pasar Ikan Jimbaran"}'::jsonb, 2, -8.7790, 115.1600, 'food'),
  ('stop-kuta-surf-d2-04', 'daily-kuta-surf-d2', '{"en": "Ngurah Rai Airport (DPS)", "id": "Bandara Ngurah Rai (DPS)"}'::jsonb, 3, -8.7482, 115.1673, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-kuta-surf-jul-01', 'itin-kuta-surf-001', '2026-07-11', NULL, 'available', 1, 15, 2000000),
  ('sched-kuta-surf-jul-02', 'itin-kuta-surf-001', '2026-07-25', 'Surf Camp', 'available', 2, 12, 2500000),
   ('sched-kuta-surf-aug-01', 'itin-kuta-surf-001', '2026-08-08', NULL, 'available', 1, 15, NULL)
ON CONFLICT (id) DO NOTHING;

-- ── 7. Labuan Bajo 3D2N - Komodo Island Hopping ────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-labuan-bajo-001',
  'island-hopping-komodo-3d2n',
  '{"id": "Island Hopping Komodo 3D2N", "en": "Komodo Island Hopping 3D2N"}'::jsonb,
  '{
    "id": "Trekking mencari Komodo asli, snorkeling di Pink Beach, dan sunset dari Bukit Kalong — petualangan bahari terbaik Indonesia Timur.",
    "en": "Trek for real Komodo dragons, snorkel at Pink Beach, and watch sunset from Kalong Hill — the best marine adventure in Eastern Indonesia."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.92, 187, 6340, 512,
  3, 2, 2, 12,
  d.id,
  'creator-atourin-official',
  'medium',
  4800000,
  '[
    {"label": "Paket kapal 3 hari", "sublabel": "Kapal phinisi sharing", "amount": 2000000},
    {"label": "Penginapan 2 malam", "sublabel": "1 malam kapal + 1 malam hotel", "amount": 800000},
    {"label": "Tiket masuk taman nasional + ranger", "amount": 500000},
    {"label": "Makan & minum 3 hari", "sublabel": "Full board di kapal", "amount": 900000},
    {"label": "Sewa snorkel & lain-lain", "amount": 600000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{bahari,petualangan}'::text[],
  '{biota-alam,pemandangan,aktivitas-luar-ruangan}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Musim kemarau April–Oktober. Juli–Agustus paling ramai — pesan kapal jauh-jauh hari.", "en": "Dry season April–October. July–August busiest — book boat well in advance."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'labuan-bajo'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-labuan-bajo-d1', 'itin-labuan-bajo-001', 1,
   '{"id": "Labuan Bajo & Sunset Kalong", "en": "Labuan Bajo & Kalong Sunset"}'::jsonb, 3, 6, 15, 1200000),
  ('daily-labuan-bajo-d2', 'itin-labuan-bajo-001', 2,
   '{"id": "Komodo & Pink Beach", "en": "Komodo & Pink Beach"}'::jsonb, 4, 10, 80, 2000000),
  ('daily-labuan-bajo-d3', 'itin-labuan-bajo-001', 3,
   '{"id": "Snorkeling & Kembali", "en": "Snorkeling & Return"}'::jsonb, 3, 5, 60, 1600000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-labuan-bajo-d1-01', 'daily-labuan-bajo-d1', '{"en": "Mirror Cave", "id": "Goa Cermin"}'::jsonb, 0, -8.5070, 119.8830, 'attraction'),
  ('stop-labuan-bajo-d1-02', 'daily-labuan-bajo-d1', '{"en": "Kalong Island Sunset", "id": "Sunset Pulau Kalong"}'::jsonb, 1, -8.5600, 119.4950, 'attraction'),
  ('stop-labuan-bajo-d1-03', 'daily-labuan-bajo-d1', '{"en": "Labuan Bajo Hotel", "id": "Hotel Labuan Bajo"}'::jsonb, 2, -8.4964, 119.8870, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-labuan-bajo-d2-01', 'daily-labuan-bajo-d2', '{"en": "Komodo Island", "id": "Pulau Komodo"}'::jsonb, 0, -8.5930, 119.4910, 'attraction'),
  ('stop-labuan-bajo-d2-02', 'daily-labuan-bajo-d2', '{"en": "Pink Beach", "id": "Pantai Merah"}'::jsonb, 1, -8.5690, 119.4590, 'attraction'),
  ('stop-labuan-bajo-d2-03', 'daily-labuan-bajo-d2', '{"en": "Padar Island", "id": "Pulau Padar"}'::jsonb, 2, -8.6616, 119.5795, 'attraction'),
  ('stop-labuan-bajo-d2-04', 'daily-labuan-bajo-d2', '{"en": "Overnight on Boat", "id": "Menginap di Kapal"}'::jsonb, 3, -8.5800, 119.5100, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-labuan-bajo-d3-01', 'daily-labuan-bajo-d3', '{"en": "Kanawa Island Snorkeling", "id": "Snorkeling Pulau Kanawa"}'::jsonb, 0, -8.4910, 119.9560, 'attraction'),
  ('stop-labuan-bajo-d3-02', 'daily-labuan-bajo-d3', '{"en": "Manta Point", "id": "Manta Point"}'::jsonb, 1, -8.5140, 119.5670, 'attraction'),
  ('stop-labuan-bajo-d3-03', 'daily-labuan-bajo-d3', '{"en": "Komodo Airport (LBJ)", "id": "Bandara Komodo (LBJ)"}'::jsonb, 2, -8.4865, 119.8890, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-labuan-bajo-aug-01', 'itin-labuan-bajo-001', '2026-08-06', NULL, 'available', 2, 12, 4800000),
  ('sched-labuan-bajo-aug-02', 'itin-labuan-bajo-001', '2026-08-20', 'Full Moon Cruise', 'available', 2, 10, 5500000),
  ('sched-labuan-bajo-sep-01', 'itin-labuan-bajo-001', '2026-09-03', NULL, 'available', 2, 12, NULL),
  ('sched-labuan-bajo-sep-02', 'itin-labuan-bajo-001', '2026-09-17', NULL, 'available', 2, 10, 5200000)
ON CONFLICT (id) DO NOTHING;

-- Day 2 timeline
INSERT INTO directory.itinerary_daily_timelines
  (id, itinerary_daily_id, time, duration_minutes, title, stop_id, description, includes, travel_info, sort_order)
VALUES
  ('tl-labuan-bajo-d2-01', 'daily-labuan-bajo-d2', '05:00', NULL,
   '{"id": "Sarapan pagi di kapal", "en": "Breakfast on boat"}'::jsonb,
   NULL,
   '{"id": "Sarapan pagi sambil berlayar menuju Pulau Komodo.", "en": "Morning breakfast while sailing to Komodo Island."}'::jsonb,
   '["Termasuk sarapan"]'::jsonb, NULL, 0),
  ('tl-labuan-bajo-d2-02', 'daily-labuan-bajo-d2', '06:30', 120,
   '{"id": "Trekking Komodo", "en": "Komodo Trekking"}'::jsonb,
   'stop-labuan-bajo-d2-01',
   '{"id": "Trekking dengan ranger untuk melihat Komodo di habitat aslinya.", "en": "Trek with a ranger to see Komodo dragons in their natural habitat."}'::jsonb,
   '["Termasuk ranger", "Termasuk tiket taman nasional"]'::jsonb, NULL, 1),
  ('tl-labuan-bajo-d2-03', 'daily-labuan-bajo-d2', '10:00', 90,
   '{"id": "Snorkeling Pink Beach", "en": "Snorkeling at Pink Beach"}'::jsonb,
   'stop-labuan-bajo-d2-02',
   '{"id": "Snorkeling di pantai berpasir merah muda dengan terumbu karang indah.", "en": "Snorkeling at the pink sand beach with beautiful coral reefs."}'::jsonb,
   '["Termasuk alat snorkel"]'::jsonb, NULL, 2),
  ('tl-labuan-bajo-d2-04', 'daily-labuan-bajo-d2', '13:00', 120,
   '{"id": "Pendakian Pulau Padar", "en": "Padar Island Hike"}'::jsonb,
   'stop-labuan-bajo-d2-03',
   '{"id": "Daki bukit Pulau Padar untuk panorama teluk yang ikonik.", "en": "Hike Padar Island hill for iconic bay panoramas."}'::jsonb,
   '[]'::jsonb, NULL, 3)
ON CONFLICT (id) DO NOTHING;

-- ── 8. Malang 2D1N - Bromo Sunrise Trip ────────────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-bromo-sunrise-001',
  'bromo-sunrise-probolinggo-2-hari-1-malam',
  '{"id": "Sunrise Bromo 2D1N", "en": "Bromo Sunrise 2D1N"}'::jsonb,
  '{
    "id": "Saksikan matahari terbit paling ikonik di Indonesia dari puncak Penanjakan, lalu jelajahi lautan pasir dan kawah aktif Gunung Bromo.",
    "en": "Witness Indonesia''s most iconic sunrise from Penanjakan peak, then explore the sea of sand and active crater of Mount Bromo."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.88, 176, 5890, 467,
  2, 1, 1, 15,
  d.id,
  'creator-atourin-official',
  'medium',
  1600000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa Jeep + mobil", "amount": 600000},
    {"label": "Penginapan 1 malam", "sublabel": "Homestay area Cemoro Lawang", "amount": 300000},
    {"label": "Tiket masuk Bromo", "amount": 250000},
    {"label": "Makan 3x", "sublabel": "Estimasi per orang", "amount": 300000},
    {"label": "Lain-lain", "amount": 150000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{alam,petualangan}'::text[],
  '{pemandangan,aktivitas-luar-ruangan,biota-alam}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "high", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Musim kemarau (April–Oktober) untuk pemandangan sunrise terbaik. Bawa jaket tebal — suhu bisa 0–5°C.", "en": "Dry season (April–October) for best sunrise views. Bring a thick jacket — temperature can be 0–5°C."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'probolinggo'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-bromo-sunrise-d1', 'itin-bromo-sunrise-001', 1,
   '{"id": "Perjalanan ke Bromo & Sunset", "en": "Journey to Bromo & Sunset"}'::jsonb, 3, 6, 45, 650000),
  ('daily-bromo-sunrise-d2', 'itin-bromo-sunrise-001', 2,
   '{"id": "Sunrise & Kawah Bromo", "en": "Sunrise & Bromo Crater"}'::jsonb, 4, 8, 20, 950000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bromo-sunrise-d1-01', 'daily-bromo-sunrise-d1', '{"en": "Cemoro Lawang Village", "id": "Desa Cemoro Lawang"}'::jsonb, 0, -7.9475, 112.9550, 'rest'),
  ('stop-bromo-sunrise-d1-02', 'daily-bromo-sunrise-d1', '{"en": "Penanjakan 1 Sunset View", "id": "Penanjakan 1 Sunset"}'::jsonb, 1, -7.9420, 112.9450, 'attraction'),
  ('stop-bromo-sunrise-d1-03', 'daily-bromo-sunrise-d1', '{"en": "Warung Makan Bromo", "id": "Warung Makan Bromo"}'::jsonb, 2, -7.9480, 112.9540, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-bromo-sunrise-d2-01', 'daily-bromo-sunrise-d2', '{"en": "Penanjakan Sunrise Point", "id": "Penanjakan Sunrise"}'::jsonb, 0, -7.9400, 112.9440, 'attraction'),
  ('stop-bromo-sunrise-d2-02', 'daily-bromo-sunrise-d2', '{"en": "Sea of Sand", "id": "Lautan Pasir Bromo"}'::jsonb, 1, -7.9485, 112.9560, 'attraction'),
  ('stop-bromo-sunrise-d2-03', 'daily-bromo-sunrise-d2', '{"en": "Bromo Crater", "id": "Kawah Bromo"}'::jsonb, 2, -7.9405, 112.9570, 'attraction'),
  ('stop-bromo-sunrise-d2-04', 'daily-bromo-sunrise-d2', '{"en": "Probolinggo Station", "id": "Stasiun Probolinggo"}'::jsonb, 3, -7.7540, 113.2160, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-bromo-sunrise-jul-01', 'itin-bromo-sunrise-001', '2026-07-04', NULL, 'available', 1, 15, 1600000),
  ('sched-bromo-sunrise-jul-02', 'itin-bromo-sunrise-001', '2026-07-18', 'Full Moon Bromo', 'available', 2, 12, 1900000),
   ('sched-bromo-sunrise-aug-01', 'itin-bromo-sunrise-001', '2026-08-01', NULL, 'available', 1, 15, NULL)
ON CONFLICT (id) DO NOTHING;

-- ── 9. Banyuwangi 2D1N - Ijen Blue Fire & Baluran ─────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-banyuwangi-ijen-001',
  'ijen-blue-fire-baluran-2-hari-1-malam',
  '{"id": "Api Biru Ijen & Baluran 2D1N", "en": "Ijen Blue Fire & Baluran 2D1N"}'::jsonb,
  '{
    "id": "Saksikan fenomena api biru langka di Kawah Ijen, lalu jelajahi savana Afrika-nya Jawa di Taman Nasional Baluran.",
    "en": "Witness the rare blue fire phenomenon at Ijen Crater, then explore Java''s African savanna at Baluran National Park."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.85, 132, 4510, 378,
  2, 1, 1, 10,
  d.id,
  'creator-atourin-official',
  'hard',
  1350000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa mobil + sopir", "amount": 500000},
    {"label": "Penginapan 1 malam", "sublabel": "Homestay Licin", "amount": 250000},
    {"label": "Tiket Ijen + Baluran", "amount": 200000},
    {"label": "Makan 3x", "sublabel": "Estimasi per orang", "amount": 300000},
    {"label": "Lain-lain", "amount": 100000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{alam,petualangan}'::text[],
  '{pemandangan,biota-alam,aktivitas-luar-ruangan}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Api biru Ijen terbaik saat musim kemarau (Mei–September). Trek malam hari dimulai pukul 01.00.", "en": "Ijen blue fire best in dry season (May–September). Night trek starts at 01:00 AM."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'banyuwangi'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-banyuwangi-ijen-d1', 'itin-banyuwangi-ijen-001', 1,
   '{"id": "Ijen Blue Fire Trek", "en": "Ijen Blue Fire Trek"}'::jsonb, 3, 10, 15, 750000),
  ('daily-banyuwangi-ijen-d2', 'itin-banyuwangi-ijen-001', 2,
   '{"id": "Baluran Savana Afrika", "en": "Baluran African Savanna"}'::jsonb, 4, 7, 50, 600000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-banyuwangi-ijen-d1-01', 'daily-banyuwangi-ijen-d1', '{"en": "Ijen Crater", "id": "Kawah Ijen"}'::jsonb, 0, -8.0581, 114.2508, 'attraction'),
  ('stop-banyuwangi-ijen-d1-02', 'daily-banyuwangi-ijen-d1', '{"en": "Ijen Crater Rim", "id": "Pinggir Kawah Ijen"}'::jsonb, 1, -8.0585, 114.2490, 'attraction'),
  ('stop-banyuwangi-ijen-d1-03', 'daily-banyuwangi-ijen-d1', '{"en": "Licin Homestay", "id": "Homestay Licin"}'::jsonb, 2, -8.1010, 114.2500, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-banyuwangi-ijen-d2-01', 'daily-banyuwangi-ijen-d2', '{"en": "Baluran National Park", "id": "Taman Nasional Baluran"}'::jsonb, 0, -7.8560, 114.3780, 'attraction'),
  ('stop-banyuwangi-ijen-d2-02', 'daily-banyuwangi-ijen-d2', '{"en": "Savanna Bekol", "id": "Savana Bekol"}'::jsonb, 1, -7.8400, 114.3880, 'attraction'),
  ('stop-banyuwangi-ijen-d2-03', 'daily-banyuwangi-ijen-d2', '{"en": "Bama Beach", "id": "Pantai Bama"}'::jsonb, 2, -7.8350, 114.4000, 'attraction'),
  ('stop-banyuwangi-ijen-d2-04', 'daily-banyuwangi-ijen-d2', '{"en": "Banyuwangi Station", "id": "Stasiun Banyuwangi"}'::jsonb, 3, -8.2180, 114.3680, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-banyuwangi-ijen-jul-01', 'itin-banyuwangi-ijen-001', '2026-07-08', NULL, 'available', 1, 10, 1350000),
   ('sched-banyuwangi-ijen-aug-01', 'itin-banyuwangi-ijen-001', '2026-08-12', 'Blue Fire Expedition', 'available', 2, 8, 1600000)
ON CONFLICT (id) DO NOTHING;

-- ── 10. Toba Samosir 3D2N - Batak Culture & Lake ──────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-toba-samosir-001',
  'batak-lake-toba-3-hari-2-malam',
  '{"id": "Budaya Batak & Danau Toba 3D2N", "en": "Batak Culture & Lake Toba 3D2N"}'::jsonb,
  '{
    "id": "Rasakan keagungan Danau Toba, jelajahi desa Batak di Pulau Samosir, dan nikmati ketenangan danau vulkanik terbesar di dunia.",
    "en": "Experience the grandeur of Lake Toba, explore Batak villages on Samosir Island, and enjoy the serenity of the world''s largest volcanic lake."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.70, 89, 3240, 245,
  3, 2, 1, 15,
  d.id,
  'creator-atourin-official',
  'easy',
  2100000,
  '[
    {"label": "Transportasi 3 hari", "sublabel": "Sewa mobil + ferry", "amount": 700000},
    {"label": "Penginapan 2 malam", "sublabel": "Resort tepi danau", "amount": 600000},
    {"label": "Tiket & parkir", "amount": 150000},
    {"label": "Makan 3x sehari", "sublabel": "Termasuk ikan mas Arsik", "amount": 500000},
    {"label": "Lain-lain", "amount": 150000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{budaya,alam}'::text[],
  '{kearifan-budaya,pemandangan,kuliner-otentik}'::text[],
  '{solo,couple,family,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Mei–September cuaca cerah. Akhir pekan cukup ramai di area Parapat dan Samosir.", "en": "May–September clear weather. Weekends are busier around Parapat and Samosir."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'toba-samosir'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-toba-samosir-d1', 'itin-toba-samosir-001', 1,
   '{"id": "Ferry & Samosir", "en": "Ferry & Samosir"}'::jsonb, 3, 7, 30, 750000),
  ('daily-toba-samosir-d2', 'itin-toba-samosir-001', 2,
   '{"id": "Desa Batak & Tomok", "en": "Batak Villages & Tomok"}'::jsonb, 4, 7, 25, 700000),
  ('daily-toba-samosir-d3', 'itin-toba-samosir-001', 3,
   '{"id": "Sipisopiso & Pulang", "en": "Sipisopiso & Return"}'::jsonb, 3, 5, 60, 650000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-toba-samosir-d1-01', 'daily-toba-samosir-d1', '{"en": "Parapat Harbour", "id": "Pelabuhan Parapat"}'::jsonb, 0, 2.7925, 98.9340, 'transport'),
  ('stop-toba-samosir-d1-02', 'daily-toba-samosir-d1', '{"en": "Samosir Island", "id": "Pulau Samosir"}'::jsonb, 1, 2.6500, 98.8000, 'attraction'),
  ('stop-toba-samosir-d1-03', 'daily-toba-samosir-d1', '{"en": "Tuk Tuk Resort Area", "id": "Kawasan Resor Tuk Tuk"}'::jsonb, 2, 2.6620, 98.8310, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-toba-samosir-d2-01', 'daily-toba-samosir-d2', '{"en": "Tomok Village", "id": "Desa Tomok"}'::jsonb, 0, 2.6650, 98.8560, 'attraction'),
  ('stop-toba-samosir-d2-02', 'daily-toba-samosir-d2', '{"en": "King Sidabutar Tomb", "id": "Makam Raja Sidabutar"}'::jsonb, 1, 2.6645, 98.8570, 'attraction'),
  ('stop-toba-samosir-d2-03', 'daily-toba-samosir-d2', '{"en": "Traditional Batak House", "id": "Rumah Adat Batak"}'::jsonb, 2, 2.6480, 98.8270, 'attraction'),
  ('stop-toba-samosir-d2-04', 'daily-toba-samosir-d2', '{"en": "Ikan Arsik Restaurant", "id": "Restoran Ikan Arsik"}'::jsonb, 3, 2.6600, 98.8300, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-toba-samosir-d3-01', 'daily-toba-samosir-d3', '{"en": "Sipisopiso Waterfall", "id": "Air Terjun Sipisopiso"}'::jsonb, 0, 2.8280, 98.6700, 'attraction'),
  ('stop-toba-samosir-d3-02', 'daily-toba-samosir-d3', '{"en": "Danau Toba Viewpoint", "id": "Pemandangan Danau Toba"}'::jsonb, 1, 2.7900, 98.9200, 'attraction'),
  ('stop-toba-samosir-d3-03', 'daily-toba-samosir-d3', '{"en": "Parapat Bus Terminal", "id": "Terminal Bus Parapat"}'::jsonb, 2, 2.7930, 98.9350, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-toba-samosir-jul-01', 'itin-toba-samosir-001', '2026-07-15', NULL, 'available', 1, 15, 2100000),
  ('sched-toba-samosir-aug-01', 'itin-toba-samosir-001', '2026-08-10', NULL, 'available', 1, 15, NULL),
   ('sched-toba-samosir-aug-02', 'itin-toba-samosir-001', '2026-08-24', 'Cultural Immersion', 'available', 2, 12, 2400000)
ON CONFLICT (id) DO NOTHING;

-- ── 11. Makassar 2D1N - City Tour & Culinary ───────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-makassar-city-001',
  'city-tour-kuliner-makassar-2-hari-1-malam',
  '{"id": "Jelajah Kota & Kuliner Makassar 2D1N", "en": "Makassar City Tour & Culinary 2D1N"}'::jsonb,
  '{
    "id": "Jelajahi benteng peninggalan kolonial, nikmati kuliner bahari khas Makassar, dan saksikan matahari terbenam di Dermaga Losari.",
    "en": "Explore colonial fort remnants, enjoy Makassar''s marine culinary delights, and watch sunset at Losari Pier."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.55, 67, 2560, 189,
  2, 1, 1, 12,
  d.id,
  'creator-atourin-official',
  'easy',
  1500000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa mobil + sopir", "amount": 400000},
    {"label": "Penginapan 1 malam", "sublabel": "Hotel area Losari", "amount": 400000},
    {"label": "Tiket & parkir", "amount": 100000},
    {"label": "Wisata kuliner", "sublabel": "Coto, Sop Saudara, Pisang Eppe", "amount": 350000},
    {"label": "Lain-lain", "amount": 250000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{sejarah,kuliner}'::text[],
  '{kearifan-lokal,kuliner-otentik,belanja-oleh-oleh}'::text[],
  '{solo,couple,family}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Makassar panas sepanjang tahun. Kunjungi pagi atau sore hari untuk cuaca lebih nyaman.", "en": "Makassar is hot year-round. Visit in the morning or late afternoon for comfortable weather."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'makassar'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-makassar-city-d1', 'itin-makassar-city-001', 1,
   '{"id": "Sejarah & Kuliner Makassar", "en": "History & Culinary Makassar"}'::jsonb, 4, 8, 15, 800000),
  ('daily-makassar-city-d2', 'itin-makassar-city-001', 2,
   '{"id": "Losari & Kuliner Akhir", "en": "Losari & Farewell Culinary"}'::jsonb, 3, 5, 10, 700000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-makassar-city-d1-01', 'daily-makassar-city-d1', '{"en": "Fort Rotterdam", "id": "Benteng Rotterdam"}'::jsonb, 0, -5.1330, 119.4050, 'attraction'),
  ('stop-makassar-city-d1-02', 'daily-makassar-city-d1', '{"en": "Trans Studio Makassar", "id": "Trans Studio Makassar"}'::jsonb, 1, -5.1480, 119.4150, 'attraction'),
  ('stop-makassar-city-d1-03', 'daily-makassar-city-d1', '{"en": "Coto Makassar Restaurant", "id": "Restoran Coto Makassar"}'::jsonb, 2, -5.1370, 119.4100, 'food'),
  ('stop-makassar-city-d1-04', 'daily-makassar-city-d1', '{"en": "Losari Beach Hotel", "id": "Hotel Pantai Losari"}'::jsonb, 3, -5.1350, 119.4000, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-makassar-city-d2-01', 'daily-makassar-city-d2', '{"en": "Losari Beach", "id": "Pantai Losari"}'::jsonb, 0, -5.1340, 119.4030, 'attraction'),
  ('stop-makassar-city-d2-02', 'daily-makassar-city-d2', '{"en": "Paotere Harbour", "id": "Pelabuhan Paotere"}'::jsonb, 1, -5.1200, 119.3950, 'attraction'),
  ('stop-makassar-city-d2-03', 'daily-makassar-city-d2', '{"en": "Pisang Eppe", "id": "Pisang Eppe"}'::jsonb, 2, -5.1360, 119.4010, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-makassar-city-jul-01', 'itin-makassar-city-001', '2026-07-09', NULL, 'available', 1, 12, 1500000),
  ('sched-makassar-city-aug-01', 'itin-makassar-city-001', '2026-08-13', NULL, 'available', 1, 12, NULL),
   ('sched-makassar-city-aug-02', 'itin-makassar-city-001', '2026-08-27', 'Culinary Fest', 'available', 2, 10, 1800000)
ON CONFLICT (id) DO NOTHING;

-- ── 12. Padang 2D1N - Mentawai Surf & Beach ───────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-padang-mentawai-001',
  'mentawai-surf-padang-2-hari-1-malam',
  '{"id": "Mentawai Surf & Pantai Padang 2D1N", "en": "Mentawai Surf & Padang Beach 2D1N"}'::jsonb,
  '{
    "id": "Nikmati ombak kelas dunia di Mentawai atau bersantai di pantai Padang, cicipi rendang autentik, dan eksplorasi kota tua Padang.",
    "en": "Ride world-class waves in Mentawai or relax on Padang beaches, taste authentic rendang, and explore Old Padang."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.60, 78, 2980, 210,
  2, 1, 1, 10,
  d.id,
  'creator-atourin-official',
  'medium',
  2500000,
  '[
    {"label": "Transportasi 2 hari", "sublabel": "Sewa mobil + speedboat", "amount": 1000000},
    {"label": "Penginapan 1 malam", "sublabel": "Hotel area Pantai Padang", "amount": 400000},
    {"label": "Surf guide & papan", "amount": 450000},
    {"label": "Makan rendang & sate", "sublabel": "Estimasi per orang", "amount": 400000},
    {"label": "Lain-lain", "amount": 250000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{bahari,kuliner}'::text[],
  '{aktivitas-luar-ruangan,kuliner-otentik,pemandangan}'::text[],
  '{solo,couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "high", "jun": "high", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Ombak Mentawai terbaik Mei–September. Musim hujan Oktober–Februari ombak lebih kecil.", "en": "Best Mentawai waves May–September. Rainy season October–February has smaller waves."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'padang'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-padang-mentawai-d1', 'itin-padang-mentawai-001', 1,
   '{"id": "Kota Padang & Rendang", "en": "Padang City & Rendang"}'::jsonb, 4, 6, 15, 800000),
  ('daily-padang-mentawai-d2', 'itin-padang-mentawai-001', 2,
   '{"id": "Pantai & Surfing", "en": "Beach & Surfing"}'::jsonb, 3, 7, 30, 1700000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-padang-mentawai-d1-01', 'daily-padang-mentawai-d1', '{"en": "Old Town Padang", "id": "Kota Tua Padang"}'::jsonb, 0, -0.9530, 100.3560, 'attraction'),
  ('stop-padang-mentawai-d1-02', 'daily-padang-mentawai-d1', '{"en": "Siti Nurbaya Bridge", "id": "Jembatan Siti Nurbaya"}'::jsonb, 1, -0.9580, 100.3580, 'attraction'),
  ('stop-padang-mentawai-d1-03', 'daily-padang-mentawai-d1', '{"en": "Rendang Restaurant", "id": "Restoran Rendang"}'::jsonb, 2, -0.9510, 100.3540, 'food'),
  ('stop-padang-mentawai-d1-04', 'daily-padang-mentawai-d1', '{"en": "Padang Beach Hotel", "id": "Hotel Pantai Padang"}'::jsonb, 3, -0.9450, 100.3480, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-padang-mentawai-d2-01', 'daily-padang-mentawai-d2', '{"en": "Carocok Beach", "id": "Pantai Carocok"}'::jsonb, 0, -1.0650, 100.3920, 'attraction'),
  ('stop-padang-mentawai-d2-02', 'daily-padang-mentawai-d2', '{"en": "Mentawai Surf Spot", "id": "Spot Surf Mentawai"}'::jsonb, 1, -1.4500, 100.1000, 'attraction'),
  ('stop-padang-mentawai-d2-03', 'daily-padang-mentawai-d2', '{"en": "Sate Padang Stall", "id": "Sate Padang"}'::jsonb, 2, -0.9520, 100.3530, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-padang-mentawai-jul-01', 'itin-padang-mentawai-001', '2026-07-16', NULL, 'available', 1, 10, 2500000),
  ('sched-padang-mentawai-aug-01', 'itin-padang-mentawai-001', '2026-08-06', 'Surf Expedition', 'available', 2, 8, 3000000),
   ('sched-padang-mentawai-aug-02', 'itin-padang-mentawai-001', '2026-08-20', NULL, 'available', 1, 10, NULL)
ON CONFLICT (id) DO NOTHING;

-- ── 13. Raja Ampat 4D3N - Island Hopping ───────────────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-raja-ampat-001',
  'raja-ampat-island-hopping-4-hari-3-malam',
  '{"id": "Island Hopping Raja Ampat 4D3N", "en": "Raja Ampat Island Hopping 4D3N"}'::jsonb,
  '{
    "id": "Jelajahi surga bawah laut terbaik dunia di Raja Ampat — dari Pianemo yang ikonik, snorkeling di Manta Point, hingga desa Arborek.",
    "en": "Explore the world''s best marine paradise in Raja Ampat — from iconic Pianemo, snorkeling at Manta Point, to Arborek Village."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.95, 145, 4890, 412,
  4, 3, 2, 12,
  d.id,
  'creator-atourin-official',
  'medium',
  6500000,
  '[
    {"label": "Paket kapal 4 hari", "sublabel": "Kapal phinisi private", "amount": 3000000},
    {"label": "Penginapan 3 malam", "sublabel": "Homestay + kapal", "amount": 1200000},
    {"label": "Tiket masuk & retribusi", "amount": 500000},
    {"label": "Makan & minum 4 hari", "sublabel": "Full board", "amount": 1200000},
    {"label": "Sewa snorkel & lain-lain", "amount": 600000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{bahari,petualangan}'::text[],
  '{biota-alam,pemandangan,aktivitas-luar-ruangan}'::text[],
  '{couple,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "high", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Waktu terbaik Oktober–April untuk laut tenang. Juli–Agustus berangin tapi masih bisa.", "en": "Best time October–April for calm seas. July–August windy but still doable."}'::jsonb,
  true,
  true
FROM directory.destinations d
WHERE d.slug = 'raja-ampat'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-raja-ampat-d1', 'itin-raja-ampat-001', 1,
   '{"id": "Sorong & Homestay", "en": "Sorong & Homestay"}'::jsonb, 3, 5, 10, 1200000),
  ('daily-raja-ampat-d2', 'itin-raja-ampat-001', 2,
   '{"id": "Pianemo & Lagoon", "en": "Pianemo & Lagoon"}'::jsonb, 4, 8, 50, 1800000),
  ('daily-raja-ampat-d3', 'itin-raja-ampat-001', 3,
   '{"id": "Manta Point & Snorkeling", "en": "Manta Point & Snorkeling"}'::jsonb, 3, 7, 40, 1800000),
  ('daily-raja-ampat-d4', 'itin-raja-ampat-001', 4,
   '{"id": "Arborek & Kembali", "en": "Arborek & Return"}'::jsonb, 3, 5, 30, 1700000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-raja-ampat-d1-01', 'daily-raja-ampat-d1', '{"en": "Sorong Harbour", "id": "Pelabuhan Sorong"}'::jsonb, 0, -0.8800, 131.2800, 'transport'),
  ('stop-raja-ampat-d1-02', 'daily-raja-ampat-d1', '{"en": "Waisai Town", "id": "Kota Waisai"}'::jsonb, 1, -0.4000, 130.8700, 'attraction'),
  ('stop-raja-ampat-d1-03', 'daily-raja-ampat-d1', '{"en": "Homestay Raja Ampat", "id": "Homestay Raja Ampat"}'::jsonb, 2, -0.3800, 130.8600, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-raja-ampat-d2-01', 'daily-raja-ampat-d2', '{"en": "Pianemo Viewpoint", "id": "Pianemo"}'::jsonb, 0, -0.6450, 130.5500, 'attraction'),
  ('stop-raja-ampat-d2-02', 'daily-raja-ampat-d2', '{"en": "Wayag Lagoon", "id": "Laguna Wayag"}'::jsonb, 1, -0.1500, 130.0500, 'attraction'),
  ('stop-raja-ampat-d2-03', 'daily-raja-ampat-d2', '{"en": "Kabui Bay", "id": "Teluk Kabui"}'::jsonb, 2, -0.5700, 130.6000, 'attraction'),
  ('stop-raja-ampat-d2-04', 'daily-raja-ampat-d2', '{"en": "Lunch on Boat", "id": "Makan siang di kapal"}'::jsonb, 3, -0.5000, 130.5000, 'food')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-raja-ampat-d3-01', 'daily-raja-ampat-d3', '{"en": "Manta Point", "id": "Manta Point"}'::jsonb, 0, -0.5500, 130.2000, 'attraction'),
  ('stop-raja-ampat-d3-02', 'daily-raja-ampat-d3', '{"en": "Cape Kri Snorkeling", "id": "Snorkeling Cape Kri"}'::jsonb, 1, -0.4500, 130.4500, 'attraction'),
  ('stop-raja-ampat-d3-03', 'daily-raja-ampat-d3', '{"en": "Friwen Island", "id": "Pulau Friwen"}'::jsonb, 2, -0.4200, 130.8800, 'rest')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-raja-ampat-d4-01', 'daily-raja-ampat-d4', '{"en": "Arborek Village", "id": "Desa Arborek"}'::jsonb, 0, -0.3300, 130.6800, 'attraction'),
  ('stop-raja-ampat-d4-02', 'daily-raja-ampat-d4', '{"en": "Sawinggrai Village", "id": "Desa Sawinggrai"}'::jsonb, 1, -0.3500, 130.7200, 'attraction'),
  ('stop-raja-ampat-d4-03', 'daily-raja-ampat-d4', '{"en": "Sorong Airport (SOQ)", "id": "Bandara Sorong (SOQ)"}'::jsonb, 2, -0.8920, 131.2860, 'transport')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-raja-ampat-oct-01', 'itin-raja-ampat-001', '2026-10-05', NULL, 'available', 2, 12, 6500000),
  ('sched-raja-ampat-oct-02', 'itin-raja-ampat-001', '2026-10-19', 'Diving Package', 'available', 2, 10, 7500000),
  ('sched-raja-ampat-nov-01', 'itin-raja-ampat-001', '2026-11-02', NULL, 'available', 2, 12, NULL)
ON CONFLICT (id) DO NOTHING;

-- ── 14. Surabaya 1D - Colonial Heritage & Culinary ─────────────
INSERT INTO directory.itineraries (
  id, slug, name, description, cover_image,
  rating_average, reviews_count, views_count, saves_count,
  duration_days, duration_nights, min_pax, max_pax,
  destination_id, author_id, difficulty,
  budget_estimation, budget_breakdown,
  languages, categories, highlights, target_audience,
  best_time_weather, best_time_crowd, best_time_note,
  is_featured, is_published
)
SELECT
  'itin-surabaya-colonial-001',
  'colonial-kuliner-surabaya-1-hari',
  '{"id": "Heritage Kolonial & Kuliner Surabaya 1H", "en": "Surabaya Colonial Heritage & Culinary 1D"}'::jsonb,
  '{
    "id": "Jelajahi gedung kolonial Belanda di Kota Tua Surabaya, nikmati kuliner legendaris, dan belanja oleh-oleh khas Pahlawan.",
    "en": "Explore Dutch colonial buildings in Old Surabaya, enjoy legendary culinary delights, and shop for souvenirs at Heroes Monument."
  }'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60", "blurhash": "LKF~Wqj]D%xt~pofxtWB", "base64": null}'::jsonb,
  4.50, 54, 2130, 156,
  1, 0, 1, 15,
  d.id,
  'creator-atourin-official',
  'easy',
  500000,
  '[
    {"label": "Transportasi", "sublabel": "Sewa mobil half day", "amount": 200000},
    {"label": "Tiket museum & parkir", "amount": 50000},
    {"label": "Wisata kuliner", "sublabel": "Rawon, sate, rujak", "amount": 200000},
    {"label": "Belanja oleh-oleh", "amount": 50000}
  ]'::jsonb,
  '{id,en}'::text[],
  '{sejarah,kuliner}'::text[],
  '{kearifan-lokal,kuliner-otentik,belanja-oleh-oleh}'::text[],
  '{solo,couple,family,group}'::text[],
  '{"jan": "rain", "feb": "rain", "mar": "ok", "apr": "ideal", "may": "ideal", "jun": "ideal", "jul": "ideal", "aug": "ideal", "sep": "ideal", "oct": "ok", "nov": "rain", "dec": "rain"}'::jsonb,
  '{"jan": "high", "feb": "high", "mar": "mid", "apr": "mid", "may": "mid", "jun": "mid", "jul": "mid", "aug": "high", "sep": "mid", "oct": "mid", "nov": "low", "dec": "mid"}'::jsonb,
  '{"id": "Surabaya panas. Mulai perjalanan pagi hari (08.00) untuk cuaca lebih nyaman.", "en": "Surabaya is hot. Start your trip in the morning (08:00) for comfortable weather."}'::jsonb,
  false,
  true
FROM directory.destinations d
WHERE d.slug = 'surabaya'
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_daily (id, itinerary_id, day_number, title, summary_stops, summary_hours, summary_km, summary_price)
VALUES
  ('daily-surabaya-colonial-d1', 'itin-surabaya-colonial-001', 1,
   '{"id": "Surabaya Heritage & Culinary", "en": "Surabaya Heritage & Culinary"}'::jsonb, 5, 8, 15, 500000)
ON CONFLICT (itinerary_id, day_number) DO NOTHING;

INSERT INTO directory.itinerary_daily_stops (id, itinerary_daily_id, name, sort_order, lat, lng, type) VALUES
  ('stop-surabaya-colonial-d1-01', 'daily-surabaya-colonial-d1', '{"en": "Tugu Pahlawan", "id": "Tugu Pahlawan"}'::jsonb, 0, -7.2450, 112.7370, 'attraction'),
  ('stop-surabaya-colonial-d1-02', 'daily-surabaya-colonial-d1', '{"en": "House of Sampoerna", "id": "House of Sampoerna"}'::jsonb, 1, -7.2330, 112.7310, 'attraction'),
  ('stop-surabaya-colonial-d1-03', 'daily-surabaya-colonial-d1', '{"en": "Surabaya Old Town", "id": "Kota Tua Surabaya"}'::jsonb, 2, -7.2400, 112.7350, 'attraction'),
  ('stop-surabaya-colonial-d1-04', 'daily-surabaya-colonial-d1', '{"en": "Rawon Setan Restaurant", "id": "Rawon Setan"}'::jsonb, 3, -7.2550, 112.7400, 'food'),
  ('stop-surabaya-colonial-d1-05', 'daily-surabaya-colonial-d1', '{"en": "Pasar Atom", "id": "Pasar Atom"}'::jsonb, 4, -7.2440, 112.7390, 'attraction')
ON CONFLICT (id) DO NOTHING;

INSERT INTO directory.itinerary_schedules
  (id, itinerary_id, start_date, custom_title, status, min_pax, max_pax, budget_estimation)
VALUES
  ('sched-surabaya-colonial-aug-01', 'itin-surabaya-colonial-001', '2026-08-03', NULL, 'available', 1, 15, 500000),
  ('sched-surabaya-colonial-aug-02', 'itin-surabaya-colonial-001', '2026-08-17', 'Independence Day Walk', 'available', 1, 15, NULL),
  ('sched-surabaya-colonial-aug-03', 'itin-surabaya-colonial-001', '2026-08-31', NULL, 'available', 1, 12, 600000)
ON CONFLICT (id) DO NOTHING;
