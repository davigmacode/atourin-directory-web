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
