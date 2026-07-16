-- ── Seed Data: attractions ────────────────────────────────
INSERT INTO directory.attractions (
  slug, name, destination_id, cover_image, description,
  price, rating_average, reviews_count, opening_hours, trekking,
  latitude, longitude, price_tiers
) VALUES
  (
    'pulau-padar-viewpoint', 'Pulau Padar Viewpoint', '5315',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Trekking ke viewpoint ikonik dengan pemandangan 3 teluk berpasir warna berbeda dari atas bukit.", "en": "Trekking to the iconic viewpoint with views of 3 different colored sandy bays from the hilltop."}'::jsonb,
    50000, 4.95, 412,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "18:00"}], "tuesday": [{"open": "06:00", "close": "18:00"}], "wednesday": [{"open": "06:00", "close": "18:00"}], "thursday": [{"open": "06:00", "close": "18:00"}], "friday": [{"open": "06:00", "close": "18:00"}], "saturday": [{"open": "06:00", "close": "18:00"}], "sunday": [{"open": "06:00", "close": "18:00"}]}}'::jsonb,
    true, -8.6534, 119.5312,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 50000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 150000}]'::jsonb
  ),
  (
    'candi-borobudur', 'Candi Borobudur', '3308',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Candi Buddha terbesar di dunia dengan 504 arca dan 2.672 panel relief yang memukau.", "en": "The largest Buddhist temple in the world featuring 504 Buddha statues and 2,672 relief panels."}'::jsonb,
    75000, 4.90, 1240,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:30"}], "tuesday": [{"open": "06:30", "close": "17:30"}], "wednesday": [{"open": "06:30", "close": "17:30"}], "thursday": [{"open": "06:30", "close": "17:30"}], "friday": [{"open": "06:30", "close": "17:30"}], "saturday": [{"open": "06:30", "close": "17:30"}], "sunday": [{"open": "06:30", "close": "17:30"}]}}'::jsonb,
    false, -7.6079, 110.2038,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 75000}, {"name": {"id": "Anak (< 12 thn)", "en": "Child (< 12 y.o.)"}, "price": 35000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 350000}]'::jsonb
  ),
  (
    'gunung-bromo', 'Gunung Bromo', '3513',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi aktif dengan lautan pasir dan sunrise yang legendaris di Indonesia.", "en": "Active volcano with a vast sand sea and legendary sunrise vistas."}'::jsonb,
    35000, 4.88, 856,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    true, -7.9425, 112.9530,
    '[{"name": {"id": "Pengunjung WNI (Hari Kerja)", "en": "WNI Visitor (Weekday)"}, "price": 35000}, {"name": {"id": "Pengunjung WNI (Hari Libur)", "en": "WNI Visitor (Weekend)"}, "price": 45000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 220000}]'::jsonb
  ),
  (
    'pura-ulun-danu-beratan', 'Pura Ulun Danu Beratan', '5103',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura di tepi Danau Beratan dengan arsitektur ikonik yang menjadi simbol Bali.", "en": "A beautiful temple on the shores of Lake Beratan, an iconic symbol of Bali."}'::jsonb,
    50000, 4.80, 624,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "19:00"}], "tuesday": [{"open": "07:00", "close": "19:00"}], "wednesday": [{"open": "07:00", "close": "19:00"}], "thursday": [{"open": "07:00", "close": "19:00"}], "friday": [{"open": "07:00", "close": "19:00"}], "saturday": [{"open": "07:00", "close": "19:00"}], "sunday": [{"open": "07:00", "close": "19:00"}]}}'::jsonb,
    false, -8.2752, 115.1668,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 50000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 75000}]'::jsonb
  ),
  (
    'pantai-tanjung-aan', 'Pantai Tanjung Aan', '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pantai berpasir putih dengan dua teluk dan bukit kapal selam yang ikonik.", "en": "White sandy beach with twin bays and a submarine-shaped hill viewpoint."}'::jsonb,
    0, 4.75, 388,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false, -8.9135, 116.3218,
    '[{"name": {"id": "Pengunjung (Semua)", "en": "Visitor (All)"}, "price": 0}]'::jsonb
  ),
  (
    'candi-prambanan', 'Candi Prambanan', '3404',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kompleks candi Hindu terbesar di Indonesia dengan arsitektur runcing yang megah.", "en": "The largest Hindu temple compound in Indonesia, showcasing towering and pointed architecture."}'::jsonb,
    75000, 4.85, 942,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:00"}], "tuesday": [{"open": "06:30", "close": "17:00"}], "wednesday": [{"open": "06:30", "close": "17:00"}], "thursday": [{"open": "06:30", "close": "17:00"}], "friday": [{"open": "06:30", "close": "17:00"}], "saturday": [{"open": "06:30", "close": "17:00"}], "sunday": [{"open": "06:30", "close": "17:00"}]}}'::jsonb,
    false, -7.7520, 110.4914,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 75000}, {"name": {"id": "Anak (< 12 thn)", "en": "Child (< 12 y.o.)"}, "price": 35000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 350000}]'::jsonb
  ),
  (
    'danau-toba', 'Danau Toba', '1212',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Danau vulkanik terbesar di Asia Tenggara dengan Pulau Samosir di tengahnya.", "en": "The largest volcanic lake in Southeast Asia with Samosir Island at its center."}'::jsonb,
    0, 4.70, 510,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    false, 2.6145, 98.7844,
    '[{"name": {"id": "Pengunjung (Semua)", "en": "Visitor (All)"}, "price": 0}]'::jsonb
  ),
  (
    'wayag-viewpoint', 'Wayag Viewpoint', '9108',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pemandanagan gugusan pulau karst dari atas bukit, ikon utama Raja Ampat.", "en": "Stunning panoramic viewpoint overlooking the iconic limestone karst islands of Raja Ampat."}'::jsonb,
    200000, 4.98, 320,
    '{"timezone": "Asia/Jayapura", "is_24_hours": false, "periods": {"monday": [{"open": "05:30", "close": "17:00"}], "tuesday": [{"open": "05:30", "close": "17:00"}], "wednesday": [{"open": "05:30", "close": "17:00"}], "thursday": [{"open": "05:30", "close": "17:00"}], "friday": [{"open": "05:30", "close": "17:00"}], "saturday": [{"open": "05:30", "close": "17:00"}], "sunday": [{"open": "05:30", "close": "17:00"}]}}'::jsonb,
    true, -0.2078, 130.0247,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 200000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 500000}]'::jsonb
  ),
  (
    'air-terjun-tiu-kelep', 'Air Terjun Tiu Kelep', '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Air terjun bertingkat dengan air jernih dan kolam alami yang menyegarkan.", "en": "Majestic multi-tiered waterfall with crystal clear water and refreshing pools."}'::jsonb,
    25000, 4.72, 234,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    true, -8.3090, 116.4063,
    '[{"name": {"id": "Pengunjung (Semua)", "en": "Visitor (All)"}, "price": 25000}]'::jsonb
  ),
  (
    'kawah-putih-ciwidey', 'Kawah Putih Ciwidey', '3273',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawah belerang dengan air putih kehijauan dan pemandangan alam yang unik.", "en": "Striking volcanic crater lake with pale turquoise waters and misty forest surrounds."}'::jsonb,
    75000, 4.50, 678,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false, -7.1662, 107.4021,
    '[{"name": {"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}, "price": 75000}, {"name": {"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}, "price": 150000}]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

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
