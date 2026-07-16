-- ── Seed Data: attractions ────────────────────────────────
INSERT INTO directory.attractions (
  slug, name, destination_id, cover_image, description,
  min_price, rating_average, reviews_count, opening_hours, trekking,
  location_address, location_accessibility, location_latitude, location_longitude
) VALUES
  (
    'pulau-padar-viewpoint', 'Pulau Padar Viewpoint', '5315',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Trekking ke viewpoint ikonik dengan pemandangan 3 teluk berpasir warna berbeda dari atas bukit.", "en": "Trekking to the iconic viewpoint with views of 3 different colored sandy bays from the hilltop."}'::jsonb,
    50000, 4.95, 412,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "18:00"}], "tuesday": [{"open": "06:00", "close": "18:00"}], "wednesday": [{"open": "06:00", "close": "18:00"}], "thursday": [{"open": "06:00", "close": "18:00"}], "friday": [{"open": "06:00", "close": "18:00"}], "saturday": [{"open": "06:00", "close": "18:00"}], "sunday": [{"open": "06:00", "close": "18:00"}]}}'::jsonb,
    true,
    '{"id": "Kepulauan Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur", "en": "Komodo Archipelago, West Manggarai Regency, East Nusa Tenggara"}'::jsonb,
    '["Trekking tangga kayu", "Pemandu lokal"]'::jsonb,
    -8.6534, 119.5312
  ),
  (
    'candi-borobudur', 'Candi Borobudur', '3308',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Candi Buddha terbesar di dunia dengan 504 arca dan 2.672 panel relief yang memukau.", "en": "The largest Buddhist temple in the world featuring 504 Buddha statues and 2,672 relief panels."}'::jsonb,
    75000, 4.90, 1240,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:30"}], "tuesday": [{"open": "06:30", "close": "17:30"}], "wednesday": [{"open": "06:30", "close": "17:30"}], "thursday": [{"open": "06:30", "close": "17:30"}], "friday": [{"open": "06:30", "close": "17:30"}], "saturday": [{"open": "06:30", "close": "17:30"}], "sunday": [{"open": "06:30", "close": "17:30"}]}}'::jsonb,
    false,
    '{"id": "Jl. Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah", "en": "Badrawati St., Borobudur District, Magelang Regency, Central Java"}'::jsonb,
    '["Ramp kursi roda", "Akses disabilitas", "Pemandu wisata"]'::jsonb,
    -7.6079, 110.2038
  ),
  (
    'gunung-bromo', 'Gunung Bromo', '3513',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi aktif dengan lautan pasir dan sunrise yang legendaris di Indonesia.", "en": "Active volcano with a vast sand sea and legendary sunrise vistas."}'::jsonb,
    35000, 4.88, 856,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    true,
    '{"id": "Kawasan Taman Nasional Bromo Tengger Semeru, Jawa Timur", "en": "Bromo Tengger Semeru National Park Area, East Java"}'::jsonb,
    '["Transportasi Jip", "Tangga ke kawah", "Sewa kuda"]'::jsonb,
    -7.9425, 112.9530
  ),
  (
    'pura-ulun-danu-beratan', 'Pura Ulun Danu Beratan', '5103',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura di tepi Danau Beratan dengan arsitektur ikonik yang menjadi simbol Bali.", "en": "A beautiful temple on the shores of Lake Beratan, an iconic symbol of Bali."}'::jsonb,
    50000, 4.80, 624,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "19:00"}], "tuesday": [{"open": "07:00", "close": "19:00"}], "wednesday": [{"open": "07:00", "close": "19:00"}], "thursday": [{"open": "07:00", "close": "19:00"}], "friday": [{"open": "07:00", "close": "19:00"}], "saturday": [{"open": "07:00", "close": "19:00"}], "sunday": [{"open": "07:00", "close": "19:00"}]}}'::jsonb,
    false,
    '{"id": "Danau Beratan, Candikuning, Kecamatan Baturiti, Kabupaten Tabanan, Bali", "en": "Lake Beratan, Candikuning, Baturiti District, Tabanan Regency, Bali"}'::jsonb,
    '["Akses kursi roda", "Jalur pedestrian datar", "Toilet ramah disabilitas"]'::jsonb,
    -8.2752, 115.1668
  ),
  (
    'pantai-tanjung-aan', 'Pantai Tanjung Aan', '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pantai berpasir putih dengan dua teluk dan bukit kapal selam yang ikonik.", "en": "White sandy beach with twin bays and a submarine-shaped hill viewpoint."}'::jsonb,
    0, 4.75, 388,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Kawasan Ekonomi Khusus Mandalika, Lombok Tengah, Nusa Tenggara Barat", "en": "Mandalika Special Economic Zone, Central Lombok, West Nusa Tenggara"}'::jsonb,
    '["Akses langsung ke pasir pantai", "Area parkir dekat pantai"]'::jsonb,
    -8.9135, 116.3218
  ),
  (
    'candi-prambanan', 'Candi Prambanan', '3404',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kompleks candi Hindu terbesar di Indonesia dengan arsitektur runcing yang megah.", "en": "The largest Hindu temple compound in Indonesia, showcasing towering and pointed architecture."}'::jsonb,
    75000, 4.85, 942,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:00"}], "tuesday": [{"open": "06:30", "close": "17:00"}], "wednesday": [{"open": "06:30", "close": "17:00"}], "thursday": [{"open": "06:30", "close": "17:00"}], "friday": [{"open": "06:30", "close": "17:00"}], "saturday": [{"open": "06:30", "close": "17:00"}], "sunday": [{"open": "06:30", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta", "en": "Solo - Yogyakarta Highway No.16, Bokoharjo, Prambanan, Sleman, Special Region of Yogyakarta"}'::jsonb,
    '["Jalur pedestrian beraspal", "Jalur pemandu disabilitas netra", "Sewa kursi roda"]'::jsonb,
    -7.7520, 110.4914
  ),
  (
    'danau-toba', 'Danau Toba', '1212',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Danau vulkanik terbesar di Asia Tenggara dengan Pulau Samosir di tengahnya.", "en": "The largest volcanic lake in Southeast Asia with Samosir Island at its center."}'::jsonb,
    0, 4.70, 510,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Sumatera Utara, Indonesia", "en": "North Sumatra, Indonesia"}'::jsonb,
    '["Dermaga penyeberangan kapal", "Akses jalan utama beraspal"]'::jsonb,
    2.6145, 98.7844
  ),
  (
    'wayag-viewpoint', 'Wayag Viewpoint', '9108',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pemandanagan gugusan pulau karst dari atas bukit, ikon utama Raja Ampat.", "en": "Stunning panoramic viewpoint overlooking the iconic limestone karst islands of Raja Ampat."}'::jsonb,
    200000, 4.98, 320,
    '{"timezone": "Asia/Jayapura", "is_24_hours": false, "periods": {"monday": [{"open": "05:30", "close": "17:00"}], "tuesday": [{"open": "05:30", "close": "17:00"}], "wednesday": [{"open": "05:30", "close": "17:00"}], "thursday": [{"open": "05:30", "close": "17:00"}], "friday": [{"open": "05:30", "close": "17:00"}], "saturday": [{"open": "05:30", "close": "17:00"}], "sunday": [{"open": "05:30", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Kepulauan Wayag, Kabupaten Raja Ampat, Papua Barat", "en": "Wayag Archipelago, Raja Ampat Regency, West Papua"}'::jsonb,
    '["Trekking tebing karst terjal", "Peralatan keselamatan/pemandu wajib"]'::jsonb,
    -0.2078, 130.0247
  ),
  (
    'air-terjun-tiu-kelep', 'Air Terjun Tiu Kelep', '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Air terjun bertingkat dengan air jernih dan kolam alami yang menyegarkan.", "en": "Majestic multi-tiered waterfall with crystal clear water and refreshing pools."}'::jsonb,
    25000, 4.72, 234,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Senaru, Kecamatan Bayan, Kabupaten Lombok Utara, Nusa Tenggara Barat", "en": "Senaru, Bayan District, North Lombok Regency, West Nusa Tenggara"}'::jsonb,
    '["Trekking jalur tanah & sungai", "Pemandu lokal wajib"]'::jsonb,
    -8.3090, 116.4063
  ),
  (
    'kawah-putih-ciwidey', 'Kawah Putih Ciwidey', '3273',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawah belerang dengan air putih kehijauan dan pemandangan alam yang unik.", "en": "Striking volcanic crater lake with pale turquoise waters and misty forest surrounds."}'::jsonb,
    75000, 4.50, 678,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Soreang-Ciwidey, Sugihmukti, Kecamatan Pasirjambu, Kabupaten Bandung, Jawa Barat", "en": "Soreang-Ciwidey Highway, Sugihmukti, Pasirjambu District, Bandung Regency, West Java"}'::jsonb,
    '["Shutle Ontang-anting", "Jalur kayu (wooden track) ramah disabilitas"]'::jsonb,
    -7.1662, 107.4021
  )
ON CONFLICT (slug) DO NOTHING;

-- ── Seed Data: price_tiers (Polymorphic tiers) ──────────────
INSERT INTO directory.price_tiers (entity_type, entity_id, name, price) VALUES
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 50000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 150000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 75000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), '{"id": "Anak (< 12 thn)", "en": "Child (< 12 y.o.)"}'::jsonb, 35000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 350000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), '{"id": "Pengunjung WNI (Hari Kerja)", "en": "WNI Visitor (Weekday)"}'::jsonb, 35000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), '{"id": "Pengunjung WNI (Hari Libur)", "en": "WNI Visitor (Weekend)"}'::jsonb, 45000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 220000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 50000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 75000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 75000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), '{"id": "Anak (< 12 thn)", "en": "Child (< 12 y.o.)"}'::jsonb, 35000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 350000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 200000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 500000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 25000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 75000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 150000)
ON CONFLICT (entity_type, entity_id, name) DO NOTHING;

-- ── Seed Data: category_assignments (for category relations) 
INSERT INTO directory.category_assignments (category_id, entity_type, entity_id) VALUES
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint')),
  ((SELECT id FROM directory.categories WHERE slug = 'petualangan'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'sejarah'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.categories WHERE slug = 'heritage'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.categories WHERE slug = 'budaya'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  ((SELECT id FROM directory.categories WHERE slug = 'petualangan'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'religi'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),
  ((SELECT id FROM directory.categories WHERE slug = 'budaya'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'bahari'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan')),
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'sejarah'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.categories WHERE slug = 'heritage'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.categories WHERE slug = 'budaya'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),
  ((SELECT id FROM directory.categories WHERE slug = 'bahari'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint')),
  ((SELECT id FROM directory.categories WHERE slug = 'bahari'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint')),
  ((SELECT id FROM directory.categories WHERE slug = 'petualangan'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep')),
  ((SELECT id FROM directory.categories WHERE slug = 'petualangan'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep')),
  
  ((SELECT id FROM directory.categories WHERE slug = 'alam'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'))
ON CONFLICT (category_id, entity_type, entity_id) DO NOTHING;

-- ── Seed Data: facility_assignments (for facility relations)
INSERT INTO directory.facility_assignments (facility_id, entity_type, entity_id) VALUES
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.facilities WHERE slug = 'souvenir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.facilities WHERE slug = 'akses-disabilitas'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'camping-area'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'souvenir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'danau-toba')),

  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'))
ON CONFLICT (facility_id, entity_type, entity_id) DO NOTHING;

-- ── Seed Data: media (Polymorphic gallery)
INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), 'image', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0)
ON CONFLICT (id) DO NOTHING;
