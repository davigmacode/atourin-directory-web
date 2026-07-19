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
    '{"icon": "🪪", "color": "#E2F1FF", "fg": "#1F6FB0"}'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

-- ── Guide 1: Welli Wilyanto (Labuan Bajo / Marine & Adventure) ──
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
SELECT 'guide-welli-001', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-welli-001', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-welli-001', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'jp' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 2: Putu Adi Wirawan (Ubud / Heritage & Spiritual) ───
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
SELECT 'guide-putu-002', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-putu-002', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-putu-002', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'fr' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 3: Sari Wibowo Putri (Yogyakarta / Heritage & Culinary) ──
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
SELECT 'guide-sari-003', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-sari-003', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-sari-003', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'de' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 4: Catur Hidayat (Bromo / Adventure & Hiking) ───────
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
SELECT 'guide-catur-004', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-catur-004', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 5: Komang Adi Susila (Sanur / Diving & Marine) ──────
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
SELECT 'guide-komang-005', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-komang-005', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-komang-005', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'jp' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 6: Andreyan Saputra (Lombok Tengah / Surf & Adventure) ──
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
SELECT 'guide-andreyan-006', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andreyan-006', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 7: Andini Mahardika (Raja Ampat / Marine & Diving) ──
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
SELECT 'guide-andini-007', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-andini-007', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 8: Dian Permatasari (Bandung / Heritage & Photography) ──
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
SELECT 'guide-dian-008', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dian-008', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dian-008', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'fr' AND type = 'language' ON CONFLICT DO NOTHING;

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

-- ── Guide 9: Rizky Pratama (Malang / Hiking & Adventure) ──
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-rizky-009', 'rizky-pratama', 'Rizky Pratama',
    '{"id": "Pemandu gunung Malang dengan keahlian hiking dan eksplorasi pegunungan Jawa Timur.", "en": "Malang mountain guide specializing in hiking and East Java mountain exploration."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'malang' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=32", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.87, 118, 204, 7, 600000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-rizky-009', id FROM directory.taxonomies
  WHERE slug IN ('hiking', 'petualangan', 'fotografi') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-rizky-009', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-rizky-009', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-rizky-009', '2019-02-14' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-rizky-009', '2020-08-19' FROM directory.certifications WHERE slug = 'bnsp-mountain-guide' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-rizky-009', '2021-05-11' FROM directory.certifications WHERE slug = 'bnsp-first-aid' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-rizky-001', 'guide-rizky-009', 'malang-bromo-sunrise-hike',
    '{"id": "Bromo Sunrise Hike dari Malang", "en": "Bromo Sunrise Hike from Malang"}'::jsonb,
    true, 1, 0, '03.00', '12.00', 2, 8, 'Jeep 4WD', '8 pax',
    750000, 'sarapan dan kopi',
    '[{"id": "Bukit Penanjakan", "en": "Penanjakan Hill"}, {"id": "Kawah Bromo", "en": "Bromo Crater"}, {"id": "Pasir Berbisik", "en": "Whispering Sand"}, {"id": "Padang Savana", "en": "Savanna Field"}]'::jsonb,
    1
  ),
  (
    'pkg-rizky-002', 'guide-rizky-009', 'malang-waterfall-tour',
    '{"id": "Malang Waterfall Exploration", "en": "Malang Waterfall Exploration"}'::jsonb,
    false, 1, 0, '07.00', '17.00', 2, 6, 'Minivan AC', '6 pax',
    550000, 'makan siang included',
    '[{"id": "Coban Rondo", "en": "Coban Rondo"}, {"id": "Coban Rais", "en": "Coban Rais"}, {"id": "Kebun Teh Wonosari", "en": "Wonosari Tea Plantation"}, {"id": "Coban Talun", "en": "Coban Talun"}]'::jsonb,
    2
  ),
  (
    'pkg-rizky-003', 'guide-rizky-009', 'malang-tumpak-sewu-2d1n',
    '{"id": "Tumpak Sewu & Semuru 2H1M", "en": "Tumpak Sewu & Semuru 2D1N"}'::jsonb,
    false, 2, 1, '06.00', '14.00', 2, 8, 'Jeep 4WD', '8 pax',
    2100000, 'camping gear, makan 4x',
    '[{"id": "Air Terjun Tumpak Sewu", "en": "Tumpak Sewu Waterfall"}, {"id": "Ranukumbolo", "en": "Ranukumbolo Lake"}, {"id": "Puncak Semuru", "en": "Semuru Peak"}, {"id": "Desa Ngadas", "en": "Ngadas Village"}]'::jsonb,
    3
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-rizky-009', 'image', 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-rizky-009', 'image', 'https://images.unsplash.com/photo-1518173946687-a4f8892bb1e1?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1),
  ('guide', 'guide-rizky-009', 'image', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 2)
ON CONFLICT DO NOTHING;

-- ── Guide 10: Dewi Kusuma Wardani (Banyuwangi / Nature & Culture) ──
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-dewi-010', 'dewi-kusuma-wardani', 'Dewi Kusuma Wardani',
    '{"id": "Pemandu alam Banyuwangi yang ahli dalam wisata kawah Ijen dan budaya Using.", "en": "Banyuwangi nature guide skilled in Ijen crater tours and Using traditional culture."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'banyuwangi' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=28", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.83, 96, 178, 5, 500000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-dewi-010', id FROM directory.taxonomies
  WHERE slug IN ('petualangan', 'budaya', 'heritage') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dewi-010', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dewi-010', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-dewi-010', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'jp' AND type = 'language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dewi-010', '2019-06-10' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dewi-010', '2020-12-03' FROM directory.certifications WHERE slug = 'bnsp-guide-level-2' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-dewi-010', '2021-07-21' FROM directory.certifications WHERE slug = 'cultural-heritage-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-dewi-001', 'guide-dewi-010', 'ijen-bluefire-midnight-hike',
    '{"id": "Ijen Blue Fire Midnight Hike", "en": "Ijen Blue Fire Midnight Hike"}'::jsonb,
    true, 1, 0, '01.00', '12.00', 2, 8, 'Minivan AC', '8 pax',
    600000, 'headlamp, masker',
    '[{"id": "Blue Fire", "en": "Blue Fire"}, {"id": "Kawah Ijen", "en": "Ijen Crater"}, {"id": "Pohon Suren", "en": "Suren Trees"}, {"id": "Paltuding", "en": "Paltuding Basecamp"}]'::jsonb,
    1
  ),
  (
    'pkg-dewi-002', 'guide-dewi-010', 'banyuwangi-using-culture',
    '{"id": "Banyuwangi Using Culture Day", "en": "Banyuwangi Using Culture Day"}'::jsonb,
    false, 1, 0, '08.00', '17.00', 2, 10, 'Minivan AC', '10 pax',
    450000, 'makan siang tradisional',
    '[{"id": "Kampung Using", "en": "Using Village"}, {"id": "Tari Gandrung", "en": "Gandrung Dance"}, {"id": "Pulau Tabuhan", "en": "Tabuhan Island"}, {"id": "Pantai Boom", "en": "Boom Beach"}]'::jsonb,
    2
  ),
  (
    'pkg-dewi-003', 'guide-dewi-010', 'ijen-banyuwangi-2d1n-combo',
    '{"id": "Ijen & Banyuwangi 2H1M", "en": "Ijen & Banyuwangi 2D1N"}'::jsonb,
    false, 2, 1, '01.00', '16.00', 2, 8, 'Minivan AC', '8 pax',
    1500000, 'penginapan, makan 3x',
    '[{"id": "Blue Fire Ijen", "en": "Ijen Blue Fire"}, {"id": "Baluran Savannah", "en": "Baluran Savannah"}, {"id": "Pantai Bama", "en": "Bama Beach"}, {"id": "Kampung Using", "en": "Using Village"}]'::jsonb,
    3
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-dewi-010', 'image', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-dewi-010', 'image', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1),
  ('guide', 'guide-dewi-010', 'image', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 2)
ON CONFLICT DO NOTHING;

-- ── Guide 11: Togar Situmorang (Toba Samosir / Batak Culture) ──
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-togar-011', 'togar-situmorang', 'Togar Situmorang',
    '{"id": "Pemandu budaya Batak Toba yang mendalami sejarah Danau Toba dan tradisi Batak.", "en": "Batak Toba cultural guide deeply rooted in Lake Toba history and Batak traditions."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'toba-samosir' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=60", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.91, 74, 132, 8, 450000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-togar-011', id FROM directory.taxonomies
  WHERE slug IN ('budaya', 'heritage', 'fotografi') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-togar-011', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-togar-011', id, 'fluent', 0.85 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-togar-011', '2016-09-01' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-togar-011', '2018-04-12' FROM directory.certifications WHERE slug = 'bnsp-guide-level-2' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-togar-011', '2019-11-05' FROM directory.certifications WHERE slug = 'sapta-pesona-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-togar-001', 'guide-togar-011', 'toba-batak-culture-day',
    '{"id": "Danau Toba & Budaya Batak 1 Hari", "en": "Lake Toba & Batak Culture 1 Day"}'::jsonb,
    true, 1, 0, '08.00', '17.00', 2, 8, 'Minivan AC', '8 pax',
    500000, 'makan siang khas Batak',
    '[{"id": "Rumah Bolon", "en": "Bolon Traditional House"}, {"id": "Tomok Village", "en": "Tomok Village"}, {"id": "Makam Raja Sidabutar", "en": "King Sidabutar Tomb"}, {"id": "Air Terjun Efrata", "en": "Efrata Waterfall"}]'::jsonb,
    1
  ),
  (
    'pkg-togar-002', 'guide-togar-011', 'toba-island-explore-2d1n',
    '{"id": "Samosir Island Explore 2H1M", "en": "Samosir Island Explore 2D1N"}'::jsonb,
    false, 2, 1, '08.00', '15.00', 2, 6, 'Ferry + Minivan', '6 pax',
    1200000, 'penginapan, makan 4x',
    '[{"id": "Pulau Samosir", "en": "Samosir Island"}, {"id": "Desa Ambarita", "en": "Ambarita Village"}, {"id": "Huta Siallagan", "en": "Siallagan Village"}, {"id": "Bukit Holbung", "en": "Holbung Hill"}, {"id": "Aek Rangat", "en": "Aek Rangat Hot Spring"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-togar-011', 'image', 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-togar-011', 'image', 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1),
  ('guide', 'guide-togar-011', 'image', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 2)
ON CONFLICT DO NOTHING;

-- ── Guide 12: Yosep Kala'bi' (Toraja Utara / Culture & Heritage) ──
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate) VALUES
  (
    'guide-yosep-012', 'yosep-kalabi', 'Yosep Kala''bi''',
    '{"id": "Pemandu budaya Toraja yang ahli dalam adat Rambu Solo'' dan arsitektur Tongkonan.", "en": "Toraja cultural guide expert in Rambu Solo'' ceremonies and Tongkonan architecture."}'::jsonb,
    (SELECT id FROM directory.destinations WHERE slug = 'toraja-utara' LIMIT 1),
    '{"url": "https://i.pravatar.cc/200?img=55", "blurhash": null}'::jsonb,
    '{"url": "https://images.unsplash.com/photo-1509233725247-49e657c542a7?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
    true, 4.89, 56, 98, 10, 400000
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.tour_guide_specialism (guide_id, taxonomy_id)
SELECT 'guide-yosep-012', id FROM directory.taxonomies
  WHERE slug IN ('budaya', 'heritage', 'spiritual') AND type = 'guide_specialism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-yosep-012', id, 'native', 1.00 FROM directory.taxonomies WHERE slug = 'id' AND type = 'language' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency, fluency_rate)
SELECT 'guide-yosep-012', id, 'conversational', 0.65 FROM directory.taxonomies WHERE slug = 'en' AND type = 'language' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-yosep-012', '2014-12-08' FROM directory.certifications WHERE slug = 'hpi-membership' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_certifications (certification_id, tour_guide_id, issued_at)
SELECT id, 'guide-yosep-012', '2016-05-20' FROM directory.certifications WHERE slug = 'cultural-heritage-training' ON CONFLICT DO NOTHING;

INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order) VALUES
  (
    'pkg-yosep-001', 'guide-yosep-012', 'toraja-heritage-day',
    '{"id": "Toraja Heritage 1 Hari", "en": "Toraja Heritage 1 Day"}'::jsonb,
    true, 1, 0, '08.00', '17.00', 2, 8, 'Minivan AC', '8 pax',
    450000, 'tiket masuk objek wisata',
    '[{"id": "Tongkonan Ke''te'' Kesu''", "en": "Ke''te'' Kesu'' Tongkonan"}, {"id": "Lemo Graves", "en": "Lemo Graves"}, {"id": "Londa", "en": "Londa"}, {"id": "Batu Tumonga", "en": "Batu Tumonga"}]'::jsonb,
    1
  ),
  (
    'pkg-yosep-002', 'guide-yosep-012', 'toraja-rambu-solo-2d1n',
    '{"id": "Rambu Solo'' Ceremony 2H1M", "en": "Rambu Solo'' Ceremony 2D1N"}'::jsonb,
    false, 2, 1, '07.00', '18.00', 2, 10, 'Minivan AC', '10 pax',
    1800000, 'souvenir, akomodasi',
    '[{"id": "Upacara Rambu Solo''", "en": "Rambu Solo'' Ceremony"}, {"id": "Desa Kete Kesu", "en": "Kete Kesu Village"}, {"id": "Makam Batu Lemo", "en": "Lemo Stone Graves"}, {"id": "Pasar Bolu", "en": "Bolu Traditional Market"}, {"id": "Tongkonan", "en": "Tongkonan Houses"}]'::jsonb,
    2
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('guide', 'guide-yosep-012', 'image', 'https://images.unsplash.com/photo-1509233725247-49e657c542a7?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 0),
  ('guide', 'guide-yosep-012', 'image', 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&auto=format&fit=crop&q=80', '{}'::jsonb, 1)
ON CONFLICT DO NOTHING;

