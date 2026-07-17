-- Ã¢â€â‚¬Ã¢â€â‚¬ Seed Data: destinations Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO directory.destinations (
  id, slug, name, type, province_id, cover_image, description,
  attractions_count, villages_count, itineraries_count, tour_guides_count, market_products_count,
  rating_average, popular_score
) VALUES
  (
    '5202', 'lombok-tengah', 'Lombok Tengah', 'regency', '52',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Destinasi eksotis dengan pantai yang menawan dan budaya Sasak yang kaya.", "en": "Exotic destination featuring stunning beaches and rich Sasak culture."}'::jsonb,
    42, 12, 28, 18, 36, 4.80, 92
  ),
  (
    '3471', 'yogyakarta', 'Yogyakarta', 'city', '34',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat seni klasik Jawa dan kebudayaan seperti batik dan pertunjukan wayang.", "en": "The heart of classical Javanese fine art and culture such as batik and puppetry."}'::jsonb,
    128, 18, 64, 45, 84, 4.90, 97
  ),
  (
    '3404', 'sleman', 'Sleman', 'regency', '34',
    '{"url": "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kabupaten yang terletak di lereng Gunung Merapi dengan keindahan alam yang asri.", "en": "Regency located on the slopes of Mount Merapi with beautiful lush scenery."}'::jsonb,
    92, 24, 32, 28, 48, 4.70, 85
  ),
  (
    '3308', 'magelang', 'Magelang', 'regency', '33',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Rumah bagi Candi Borobudur yang bersejarah dan megah.", "en": "Home to the historic and magnificent Borobudur Temple."}'::jsonb,
    56, 16, 38, 22, 42, 4.85, 90
  ),
  (
    '3273', 'bandung', 'Bandung', 'city', '32',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota kreatif dengan surga kuliner dan udara pegunungan yang sejuk.", "en": "Creative city offering a culinary paradise and cool mountain air."}'::jsonb,
    184, 8, 72, 56, 124, 4.70, 94
  ),
  (
    '3205', 'garut', 'Garut', 'regency', '32',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Dikelilingi gunung-gunung dengan pemandian air panas alami.", "en": "Surrounded by mountains featuring natural hot springs."}'::jsonb,
    48, 14, 22, 18, 28, 4.60, 70
  ),
  (
    '3513', 'probolinggo', 'Probolinggo', 'regency', '35',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gerbang utama menuju keindahan spektakuler Gunung Bromo.", "en": "The main gateway to the spectacular beauty of Mount Bromo."}'::jsonb,
    38, 6, 26, 14, 32, 4.80, 86
  ),
  (
    '3578', 'surabaya', 'Surabaya', 'city', '35',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota Pahlawan dengan perpaduan sejarah kolonial dan modernitas.", "en": "The City of Heroes with a blend of colonial history and modernity."}'::jsonb,
    96, 4, 28, 32, 56, 4.50, 75
  ),
  (
    '3573', 'malang', 'Malang', 'city', '35',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota peristirahatan kolonial yang sejuk dengan apel segar dan pantai.", "en": "Cool colonial retreat city known for fresh apples and beaches."}'::jsonb,
    112, 10, 46, 28, 64, 4.75, 88
  ),
  (
    '3510', 'banyuwangi', 'Banyuwangi', 'regency', '35',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "The Sunrise of Java dengan keajaiban api biru Kawah Ijen.", "en": "The Sunrise of Java featuring the blue fire phenomenon of Ijen Crater."}'::jsonb,
    62, 18, 32, 16, 38, 4.85, 82
  ),
  (
    '5171', 'denpasar', 'Denpasar', 'city', '51',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Ibu kota Bali yang kaya akan pura bersejarah dan pusat perbelanjaan.", "en": "The capital of Bali rich in historic temples and shopping hubs."}'::jsonb,
    142, 12, 88, 64, 168, 4.60, 95
  ),
  (
    '5104', 'gianyar-ubud', 'Gianyar (Ubud)', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat seni dan spiritual Bali dikelilingi oleh hutan dan sawah terasering.", "en": "Bali''s artistic and spiritual center surrounded by rainforest and terraced rice paddies."}'::jsonb,
    156, 22, 96, 72, 142, 4.95, 98
  ),
  (
    '5103', 'badung-kuta', 'Badung (Kuta)', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat hiburan malam, belanja, dan selancar legendaris Bali.", "en": "The nightlife, shopping, and surfing epicenter of Bali."}'::jsonb,
    198, 6, 124, 88, 224, 4.55, 99
  ),
  (
    '5107', 'karangasem', 'Karangasem', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kabupaten ujung timur Bali dengan pemandangan Gunung Agung yang megah.", "en": "East Bali regency boasting majestic views of Mount Agung."}'::jsonb,
    78, 18, 42, 28, 52, 4.80, 78
  ),
  (
    '5315', 'labuan-bajo', 'Labuan Bajo', 'regency', '53',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gerbang utama petualangan melintasi habitat Komodo Dragon.", "en": "The main gateway for trekking and sailing through Komodo habitats."}'::jsonb,
    32, 6, 52, 24, 78, 4.92, 92
  ),
  (
    '1212', 'toba-samosir', 'Toba Samosir', 'regency', '12',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawasan danau vulkanik terbesar di dunia dengan warisan budaya Batak.", "en": "The largest volcanic lake area in the world with Batak cultural heritage."}'::jsonb,
    42, 14, 22, 12, 26, 4.70, 78
  ),
  (
    '1371', 'padang', 'Padang', 'city', '13',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Surga kuliner rendang dengan pantai berpasir putih.", "en": "Rendang culinary heaven with beautiful white-sandy beaches."}'::jsonb,
    56, 8, 28, 18, 32, 4.70, 80
  ),
  (
    '1375', 'bukittinggi', 'Bukittinggi', 'city', '13',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota bersejarah berhawa sejuk dengan Jam Gadang yang ikonik.", "en": "Cool-climate historic town featuring the iconic Jam Gadang clock tower."}'::jsonb,
    38, 6, 18, 12, 18, 4.60, 70
  ),
  (
    '1171', 'banda-aceh', 'Banda Aceh', 'city', '11',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Serambi Mekkah dengan warisan sejarah Islam dan wisata tsunami.", "en": "The veranda of Mecca with Islamic history and tsunami memorial sites."}'::jsonb,
    28, 4, 12, 8, 14, 4.50, 60
  ),
  (
    '7371', 'makassar', 'Makassar', 'city', '73',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota pelabuhan kosmopolitan dengan kuliner bahari melimpah.", "en": "Cosmopolitan port city offering abundant fresh marine culinary choices."}'::jsonb,
    64, 4, 22, 18, 28, 4.55, 76
  ),
  (
    '7326', 'toraja-utara', 'Toraja Utara', 'regency', '73',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Situs warisan budaya dengan tradisi pemakaman unik dan rumah adat Tongkonan.", "en": "Cultural heritage sites featuring unique burial traditions and Tongkonan houses."}'::jsonb,
    32, 14, 28, 14, 24, 4.85, 84
  ),
  (
    '7171', 'manado', 'Manado', 'city', '71',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Terkenal dengan keindahan bawah laut Bunaken dan kuliner pedas.", "en": "Famous for Bunaken''s underwater beauty and spicy culinary specialities."}'::jsonb,
    42, 6, 18, 16, 26, 4.60, 78
  ),
  (
    '9108', 'raja-ampat', 'Raja Ampat', 'regency', '91',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat keanekaragaman hayati laut dunia dengan pulau karang ikonik.", "en": "Global epicenter of marine biodiversity with iconic karst islets."}'::jsonb,
    18, 8, 22, 12, 42, 4.95, 95
  ),
  (
    '9471', 'jayapura', 'Jayapura', 'city', '94',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota tepi teluk di ujung timur Indonesia dengan keindahan Danau Sentani.", "en": "Bay-front city in eastern Indonesia boasting the beauty of Lake Sentani."}'::jsonb,
    22, 4, 8, 6, 12, 4.50, 62
  ),
  (
    '6471', 'balikpapan', 'Balikpapan', 'city', '64',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota minyak modern dengan pantai berpasir landai dan wisata konservasi.", "en": "Modern oil city featuring smooth sandy beaches and nature conservation parks."}'::jsonb,
    32, 6, 12, 10, 14, 4.40, 58
  ),
  (
    '6371', 'banjarmasin', 'Banjarmasin', 'city', '63',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota Seribu Sungai dengan pasar terapung yang legendaris.", "en": "The City of a Thousand Rivers famous for its legendary floating markets."}'::jsonb,
    28, 8, 14, 8, 16, 4.50, 65
  ),
  (
    '8171', 'ambon', 'Ambon', 'city', '81',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Ambon Manise dengan keindahan teluk pantai dan sejarah rempah.", "en": "Ambon Manise boasting stunning bay beaches and spice trade history."}'::jsonb,
    24, 6, 10, 8, 12, 4.70, 70
  ),
  (
    '8271', 'ternate', 'Ternate', 'city', '82',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota pulau vulkanik bersejarah penghasil cengkeh utama dunia.", "en": "Historic volcanic island city renowned as a major global clove producer."}'::jsonb,
    18, 4, 8, 6, 8, 4.60, 60
  )
ON CONFLICT (id) DO NOTHING;

-- Ã¢â€â‚¬Ã¢â€â‚¬ Seed Data: category_assignments (for tags) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO directory.destination_categories (destination_id, taxonomy_id) VALUES
  -- 5202 (Lombok Tengah) -> Bahari, Petualangan, Budaya
  ('5202', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('5202', (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),
  ('5202', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),

  -- 3471 (Yogyakarta) -> Budaya, Sejarah, Kuliner
  ('3471', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  ('3471', (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),
  ('3471', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 3404 (Sleman) -> Alam, Desa Wisata
  ('3404', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ('3404', (SELECT id FROM directory.taxonomies WHERE slug = 'desa-wisata' AND type = 'category')),

  -- 3308 (Magelang) -> Heritage, Budaya, Alam
  ('3308', (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),
  ('3308', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  ('3308', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 3273 (Bandung) -> Kuliner, Alam
  ('3273', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),
  ('3273', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 3205 (Garut) -> Alam, Petualangan
  ('3205', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ('3205', (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),

  -- 3513 (Probolinggo) -> Alam, Petualangan
  ('3513', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ('3513', (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),

  -- 3578 (Surabaya) -> Sejarah, Kuliner
  ('3578', (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),
  ('3578', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 3573 (Malang) -> Alam, Kuliner, Heritage
  ('3573', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ('3573', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),
  ('3573', (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),

  -- 3510 (Banyuwangi) -> Bahari, Alam
  ('3510', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('3510', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 5171 (Denpasar) -> Bahari, Kuliner
  ('5171', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('5171', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 5104 (Gianyar) -> Budaya, Alam
  ('5104', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  ('5104', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 5103 (Badung) -> Bahari
  ('5103', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),

  -- 5107 (Karangasem) -> Bahari, Budaya
  ('5107', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('5107', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),

  -- 5315 (Labuan Bajo) -> Bahari, Petualangan
  ('5315', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('5315', (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),

  -- 1212 (Toba Samosir) -> Alam, Budaya
  ('1212', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ('1212', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),

  -- 1371 (Padang) -> Kuliner, Bahari
  ('1371', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),
  ('1371', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),

  -- 1375 (Bukittinggi) -> Heritage, Alam
  ('1375', (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),
  ('1375', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 1171 (Banda Aceh) -> Sejarah, Religi
  ('1171', (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),
  ('1171', (SELECT id FROM directory.taxonomies WHERE slug = 'religi' AND type = 'category')),

  -- 7371 (Makassar) -> Kuliner, Bahari, Sejarah
  ('7371', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),
  ('7371', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('7371', (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),

  -- 7326 (Toraja Utara) -> Budaya, Heritage
  ('7326', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  ('7326', (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),

  -- 7171 (Manado) -> Bahari, Kuliner
  ('7171', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('7171', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 9108 (Raja Ampat) -> Bahari, Petualangan
  ('9108', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('9108', (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),

  -- 9471 (Jayapura) -> Budaya, Alam
  ('9471', (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  ('9471', (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),

  -- 6471 (Balikpapan) -> Bahari, Kuliner
  ('6471', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('6471', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 6371 (Banjarmasin) -> Kuliner
  ('6371', (SELECT id FROM directory.taxonomies WHERE slug = 'kuliner' AND type = 'category')),

  -- 8171 (Ambon) -> Bahari, Sejarah
  ('8171', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ('8171', (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),

  -- 8271 (Ternate) -> Heritage, Bahari
  ('8271', (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),
  ('8271', (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category'))
ON CONFLICT (destination_id, taxonomy_id) DO NOTHING;

-- Ã¢â€â‚¬Ã¢â€â‚¬ Seed Data: media Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  (
    'destination', '5202', 'image',
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60',
    '{}'::jsonb, 0
  ),
  (
    'destination', '5202', 'video',
    'https://www.w3schools.com/html/mov_bbb.mp4',
    '{"duration": 10.0}'::jsonb, 1
  ),
  (
    'destination', '3471', 'image',
    'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60',
    '{}'::jsonb, 0
  ),
  (
    'destination', '3404', 'image',
    'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60',
    '{}'::jsonb, 0
  )
ON CONFLICT (id) DO NOTHING;
