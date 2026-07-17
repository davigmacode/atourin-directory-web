-- =============================================================
-- Seed: tour_guides
-- =============================================================
-- Seed the HPI membership cert that is referenced by all guides.
INSERT INTO directory.certifications (slug, name, type, issuer, entity_types, metadata) VALUES
  (
    'hpi-membership',
    '{"id": "Anggota HPI", "en": "HPI Member"}'::jsonb,
    'training',
    'Himpunan Pramuwisata Indonesia',
    ARRAY['guide'],
    '{"icon": "ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚ÂªÃƒâ€šÃ‚Âª", "color": "#E2F1FF", "fg": "#1F6FB0"}'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 1: Welli Wilyanto (Labuan Bajo / Marine & Adventure) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-welli-001', 'welli-wilyanto', 'Welli Wilyanto',
    '{"id": "Pemandu bahari berpengalaman di perairan Labuan Bajo dan Taman Nasional Komodo.", "en": "Experienced marine guide in Labuan Bajo waters and Komodo National Park."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'labuan-bajo' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=12", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.95, 203, 412, 8, 1200000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-welli-001', id FROM directory.taxonomies
  WHERE slug IN ('bahari', 'petualangan') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-welli-001', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-welli-001', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-welli-001', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'jp' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-welli-001', '2019-01-01' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-welli-001', '2020-06-15' FROM directory.certifications WHERE slug = 'bnsp-guide-level-3' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-welli-001', '2021-03-10' FROM directory.certifications WHERE slug = 'bnsp-first-aid' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-welli-001', 'guide-welli-001', 'komodo-sailing-1day-padar-pink-beach',
    '{"id": "Komodo Sailing 1 Hari, Padar & Pink Beach", "en": "Komodo Sailing 1 Day, Padar & Pink Beach"}'::jsonb,
    true, 1, 0, '07.00', '18.00', 2, 8, 'Speedboat', '8 pax',
    1850000, 'min 2 pax',
    '[{"id": "Pulau Padar", "en": "Padar Island"}, {"id": "Pink Beach", "en": "Pink Beach"}, {"id": "Manta Point", "en": "Manta Point"}, {"id": "Kanawa", "en": "Kanawa Island"}]'::jsonb,
    1
  ),
  (
    'pkg-welli-002', 'guide-welli-001', 'komodo-2d1n-phinisi-classic',
    '{"id": "Komodo 2H1M Phinisi Classic", "en": "Komodo 2D1N Classic Phinisi"}'::jsonb,
    false, 2, 1, '08.00', '16.00', 4, 12, 'Phinisi', '4 kabin',
    4500000, 'kabin AC, makan 3x',
    '[{"id": "Padar sunrise", "en": "Padar Sunrise"}, {"id": "Komodo trekking", "en": "Komodo Trekking"}, {"id": "Pink Beach", "en": "Pink Beach"}, {"id": "Taka Makassar", "en": "Taka Makassar"}, {"id": "Manta Point", "en": "Manta Point"}]'::jsonb,
    2
  ),
  (
    'pkg-welli-003', 'guide-welli-001', 'komodo-3d2n-liveaboard-premium',
    '{"id": "Komodo 3H2M Liveaboard Premium", "en": "Komodo 3D2N Premium Liveaboard"}'::jsonb,
    false, 3, 2, '08.00', '11.00', 2, 6, 'Phinisi', '3 kabin',
    7800000, 'gear snorkeling, makan 6x',
    '[{"id": "Padar", "en": "Padar"}, {"id": "Komodo", "en": "Komodo"}, {"id": "Rinca", "en": "Rinca"}, {"id": "Pink Beach", "en": "Pink Beach"}, {"id": "Batu Cermin", "en": "Batu Cermin"}, {"id": "Kanawa", "en": "Kanawa"}]'::jsonb,
    3
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-welli-001', 'image', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-welli-001', 'image', 'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1),
  ('guide', 'guide-welli-001', 'image', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 2),
  ('guide', 'guide-welli-001', 'video', 'https://www.w3schools.com/html/mov_bbb.mp4', '{"duration": 12.0}'::jsonb, 3)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 2: Putu Adi Wirawan (Ubud / Heritage & Spiritual) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-putu-002', 'putu-adi-wirawan', 'Putu Adi Wirawan',
    '{"id": "Pemandu lokal Gianyar-Ubud dengan keahlian spiritual dan heritage Bali.", "en": "Local Gianyar-Ubud guide specializing in Balinese spiritual and heritage tours."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'gianyar-ubud' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=64", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.92, 312, 538, 12, 950000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-putu-002', id FROM directory.taxonomies
  WHERE slug IN ('heritage', 'spiritual', 'budaya') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-putu-002', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-putu-002', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-putu-002', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'fr' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-putu-002', '2014-05-10' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-putu-002', '2016-08-22' FROM directory.certifications WHERE slug = 'bnsp-guide-level-3' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-putu-002', '2018-02-18' FROM directory.certifications WHERE slug = 'cultural-heritage-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-putu-001', 'guide-putu-002', 'ubud-heritage-spiritual-day',
    '{"id": "Ubud Heritage & Spiritual 1 Hari", "en": "Ubud Heritage & Spiritual 1 Day"}'::jsonb,
    true, 1, 0, '08.00', '17.00', 1, 6, 'Minivan AC', '6 pax',
    850000, 'termasuk tiket masuk',
    '[{"id": "Tirta Empul", "en": "Tirta Empul Temple"}, {"id": "Tegalalang", "en": "Tegalalang Rice Terrace"}, {"id": "Ubud Monkey Forest", "en": "Ubud Monkey Forest"}, {"id": "Pura Gunung Kawi", "en": "Gunung Kawi Temple"}]'::jsonb,
    1
  ),
  (
    'pkg-putu-002', 'guide-putu-002', 'bali-teminaless-day',
    '{"id": "Bali Temple Trail 1 Hari", "en": "Bali Temple Trail 1 Day"}'::jsonb,
    false, 1, 0, '07.30', '19.00', 2, 8, 'Minivan AC', '8 pax',
    1200000, 'makan siang included',
    '[{"id": "Pura Besakih", "en": "Besakih Temple"}, {"id": "Pura Lempuyang", "en": "Lempuyang Temple"}, {"id": "Tirta Gangga", "en": "Tirta Gangga"}, {"id": "Tenganan Village", "en": "Tenganan Village"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-putu-002', 'image', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-putu-002', 'image', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1),
  ('guide', 'guide-putu-002', 'image', 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 2)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 3: Sari Wibowo Putri (Yogyakarta / Heritage & Culinary) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-sari-003', 'sari-wibowo-putri', 'Sari Wibowo Putri',
    '{"id": "Pemandu Yogyakarta dengan fokus heritage Jawa dan wisata kuliner tradisional.", "en": "Yogyakarta guide focusing on Javanese heritage and traditional culinary tours."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'yogyakarta' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=15", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.88, 167, 287, 6, 650000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-sari-003', id FROM directory.taxonomies
  WHERE slug IN ('heritage', 'kuliner', 'budaya') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-sari-003', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-sari-003', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-sari-003', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'de' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-sari-003', '2018-04-20' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-sari-003', '2020-09-12' FROM directory.certifications WHERE slug = 'cultural-heritage-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-sari-001', 'guide-sari-003', 'yogyakarta-heritage-day',
    '{"id": "Yogyakarta Heritage 1 Hari", "en": "Yogyakarta Heritage 1 Day"}'::jsonb,
    true, 1, 0, '08.00', '17.00', 2, 8, 'Minivan AC', '8 pax',
    700000, 'termasuk tiket masuk',
    '[{"id": "Kraton Yogyakarta", "en": "Yogyakarta Palace"}, {"id": "Taman Sari", "en": "Taman Sari"}, {"id": "Museum Sonobudoyo", "en": "Sonobudoyo Museum"}, {"id": "Malioboro", "en": "Malioboro Street"}]'::jsonb,
    1
  ),
  (
    'pkg-sari-002', 'guide-sari-003', 'yogyakarta-culinary-night',
    '{"id": "Yogyakarta Kuliner Malam", "en": "Yogyakarta Night Culinary"}'::jsonb,
    false, 1, 0, '18.00', '22.00', 2, 10, 'Minivan AC', '10 pax',
    550000, '6x mencicipi',
    '[{"id": "Bakmi Jawa", "en": "Javanese Noodles"}, {"id": "Sate Klatak", "en": "Klatak Satay"}, {"id": "Gudeg Yu Djum", "en": "Gudeg Yu Djum"}, {"id": "Es Dawet", "en": "Dawet Ice"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-sari-003', 'image', 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-sari-003', 'image', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 4: Catur Hidayat (Bromo / Adventure & Hiking) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-catur-004', 'catur-hidayat', 'Catur Hidayat',
    '{"id": "Pemandu gunung Probolinggo dan Bromo dengan keahlian hiking dan petualangan ekstrem.", "en": "Probolinggo and Bromo mountain guide specializing in hiking and extreme adventure."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'probolinggo' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=33", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.86, 198, 312, 9, 750000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-catur-004', id FROM directory.taxonomies
  WHERE slug IN ('petualangan', 'hiking', 'fotografi') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-catur-004', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-catur-004', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-catur-004', '2015-07-04' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-catur-004', '2017-11-20' FROM directory.certifications WHERE slug = 'bnsp-mountain-guide' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-catur-004', '2018-03-15' FROM directory.certifications WHERE slug = 'bnsp-first-aid' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-catur-001', 'guide-catur-004', 'bromo-sunrise-jeep',
    '{"id": "Bromo Sunrise Jeep Tour", "en": "Bromo Sunrise Jeep Tour"}'::jsonb,
    true, 1, 0, '02.30', '11.00', 2, 6, 'Jeep 4WD', '6 pax',
    850000, 'termasuk sarapan',
    '[{"id": "King Kong Hill", "en": "King Kong Hill"}, {"id": "Pasir Berbisik", "en": "Whispering Sand"}, {"id": "Kawah Bromo", "en": "Bromo Crater"}, {"id": "Bukit Teletubbies", "en": "Teletubbies Hill"}]'::jsonb,
    1
  ),
  (
    'pkg-catur-002', 'guide-catur-004', 'bromo-ijen-bluefire-2d1n',
    '{"id": "Bromo & Ijen Blue Fire 2H1M", "en": "Bromo & Ijen Blue Fire 2D1N"}'::jsonb,
    false, 2, 1, '00.30', '14.00', 2, 8, 'Jeep 4WD + Minivan', '8 pax',
    1850000, 'penginapan, makan 3x',
    '[{"id": "Bromo Sunrise", "en": "Bromo Sunrise"}, {"id": "Blue Fire Ijen", "en": "Ijen Blue Fire"}, {"id": "Kawah Ijen", "en": "Ijen Crater"}, {"id": "Paltuding", "en": "Paltuding Basecamp"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-catur-004', 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-catur-004', 'image', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 5: Komang Adi Susila (Sanur / Diving & Marine) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-komang-005', 'komang-adi-susila', 'Komang Adi Susila',
    '{"id": "Pemandu selam profesional Denpasar-Sanur dengan spesialisasi marine biology.", "en": "Professional dive guide in Denpasar-Sanur specializing in marine biology."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'denpasar' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=68", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.96, 142, 228, 10, 1500000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-komang-005', id FROM directory.taxonomies
  WHERE slug IN ('bahari', 'fotografi') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-komang-005', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-komang-005', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-komang-005', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'jp' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-komang-005', '2016-02-12' FROM directory.certifications WHERE slug = 'bnsp-dive-guide' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-komang-005', '2017-08-05' FROM directory.certifications WHERE slug = 'bnsp-first-aid' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-komang-005', '2019-10-22' FROM directory.certifications WHERE slug = 'bahasa-inggris-pariwisata' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-komang-001', 'guide-komang-005', 'nusa-penida-dive-day',
    '{"id": "Nusa Penida Dive 1 Hari", "en": "Nusa Penida Dive 1 Day"}'::jsonb,
    true, 1, 0, '07.30', '17.00', 2, 6, 'Speedboat', '6 pax',
    1850000, '2x dive, gear included',
    '[{"id": "Manta Point", "en": "Manta Point"}, {"id": "Crystal Bay", "en": "Crystal Bay"}, {"id": "SD Point", "en": "SD Point"}, {"id": "Broken Beach", "en": "Broken Beach"}]'::jsonb,
    1
  ),
  (
    'pkg-komang-002', 'guide-komang-005', 'nusa-lembongan-snorkel',
    '{"id": "Nusa Lembongan Snorkeling", "en": "Nusa Lembongan Snorkeling"}'::jsonb,
    false, 1, 0, '08.00', '16.00', 2, 10, 'Speedboat', '10 pax',
    950000, 'gear snorkel included',
    '[{"id": "Mangrove Tour", "en": "Mangrove Tour"}, {"id": "Manta Bay", "en": "Manta Bay"}, {"id": "Seaweed Farm", "en": "Seaweed Farm"}, {"id": "Devil''s Tear", "en": "Devil''s Tear"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-komang-005', 'image', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-komang-005', 'image', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 6: Andreyan Saputra (Lombok Tengah / Surf & Adventure) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-andreyan-006', 'andreyan-saputra', 'Andreyan Saputra',
    '{"id": "Pemandu lokal Lombok Tengah untuk petualangan dan wisata selancar kelas dunia.", "en": "Lombok Tengah local guide for adventure and world-class surfing experiences."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'lombok-tengah' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=8", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.78, 88, 142, 4, 580000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-andreyan-006', id FROM directory.taxonomies
  WHERE slug IN ('petualangan', 'bahari') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andreyan-006', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andreyan-006', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-andreyan-006', '2020-05-15' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-andreyan-006', '2021-09-12' FROM directory.certifications WHERE slug = 'sapta-pesona-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-andreyan-001', 'guide-andreyan-006', 'lombok-surf-lesson',
    '{"id": "Lombok Surf Lesson", "en": "Lombok Surf Lesson"}'::jsonb,
    true, 1, 0, '07.00', '12.00', 1, 4, 'Mini van + Surfboard', '4 pax',
    650000, 'papan selancar included',
    '[{"id": "Desa Gerupuk", "en": "Gerupuk Village"}, {"id": "Pantai Kuta Lombok", "en": "Kuta Lombok Beach"}, {"id": "Selong Belanak", "en": "Selong Belanak"}]'::jsonb,
    1
  ),
  (
    'pkg-andreyan-002', 'guide-andreyan-006', 'lombok-waterfall-day',
    '{"id": "Lombok Waterfall Day", "en": "Lombok Waterfall Day"}'::jsonb,
    false, 1, 0, '08.00', '17.00', 2, 8, 'Mini van AC', '8 pax',
    720000, 'makan siang included',
    '[{"id": "Tiu Kelep", "en": "Tiu Kelep Waterfall"}, {"id": "Sendang Gile", "en": "Sendang Gile"}, {"id": "Benang Kelambu", "en": "Benang Kelambu"}, {"id": "Sasak Village", "en": "Sasak Village"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-andreyan-006', 'image', 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-andreyan-006', 'image', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 7: Andini Mahardika (Raja Ampat / Marine & Diving) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-andini-007', 'andini-mahardika', 'Andini Mahardika',
    '{"id": "Pemandu selam Raja Ampat dengan keahlian ekowisata dan konservasi laut.", "en": "Raja Ampat dive guide specializing in ecotourism and marine conservation."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'raja-ampat' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=44", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.94, 174, 268, 9, 1450000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-andini-007', id FROM directory.taxonomies
  WHERE slug IN ('bahari', 'fotografi') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andini-007', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andini-007', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-andini-007', '2017-03-22' FROM directory.certifications WHERE slug = 'bnsp-dive-guide' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-andini-007', '2018-09-10' FROM directory.certifications WHERE slug = 'ecotourism-guide-training' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-andini-007', '2020-02-05' FROM directory.certifications WHERE slug = 'bnsp-first-aid' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-andini-001', 'guide-andini-007', 'raja-ampat-dive-3d2n',
    '{"id": "Raja Ampat Dive 3H2M", "en": "Raja Ampat Dive 3D2N"}'::jsonb,
    true, 3, 2, '07.00', '14.00', 2, 8, 'Phinisi', '4 kabin',
    8500000, 'gear, makan 8x',
    '[{"id": "Cape Kri", "en": "Cape Kri"}, {"id": "Manta Sandy", "en": "Manta Sandy"}, {"id": "Blue Magic", "en": "Blue Magic"}, {"id": "Misool", "en": "Misool"}, {"id": "Wayag", "en": "Wayag"}]'::jsonb,
    1
  ),
  (
    'pkg-andini-002', 'guide-andini-007', 'raja-ampat-snorkel-day',
    '{"id": "Raja Ampat Snorkel 1 Hari", "en": "Raja Ampat Snorkel 1 Day"}'::jsonb,
    false, 1, 0, '08.00', '17.00', 2, 10, 'Speedboat', '10 pax',
    1850000, 'gear, makan siang',
    '[{"id": "Arborek", "en": "Arborek Village"}, {"id": "Manta Sandy", "en": "Manta Sandy"}, {"id": "Sauwandarek", "en": "Sauwandarek"}, {"id": "Pasir Timbul", "en": "Pasir Timbul"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-andini-007', 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-andini-007', 'image', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

-- ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ Guide 8: Dian Permatasari (Bandung / Heritage & Photography) ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚ÂÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-dian-008', 'dian-permatasari', 'Dian Permatasari',
    '{"id": "Pemandu Bandung dengan keahlian fotografi arsitektur dan warisan kolonial.", "en": "Bandung guide specializing in architectural photography and colonial heritage."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'bandung' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=45", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.85, 92, 156, 6, 580000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-dian-008', id FROM directory.taxonomies
  WHERE slug IN ('heritage', 'fotografi', 'budaya') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dian-008', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dian-008', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'guide_language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dian-008', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'fr' AND type = 'guide_language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dian-008', '2018-06-18' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dian-008', '2019-11-25' FROM directory.certifications WHERE slug = 'bnsp-guide-level-2' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dian-008', '2020-04-09' FROM directory.certifications WHERE slug = 'cultural-heritage-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-dian-001', 'guide-dian-008', 'bandung-architecture-photo',
    '{"id": "Bandung Arsitektur & Fotografi", "en": "Bandung Architecture & Photography"}'::jsonb,
    true, 1, 0, '08.00', '17.00', 2, 6, 'Mini van AC', '6 pax',
    720000, 'termasuk kopi heritage',
    '[{"id": "Gedung Sate", "en": "Gedung Sate"}, {"id": "Gedung Merdeka", "en": "Gedung Merdeka"}, {"id": "Villa Isola", "en": "Villa Isola"}, {"id": "Braga Heritage", "en": "Braga Heritage"}]'::jsonb,
    1
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-dian-008', 'image', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-dian-008', 'image', 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;
