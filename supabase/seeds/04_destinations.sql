-- ── Seed Data: destinations ───────────────────────────────
INSERT INTO directory.destinations (
  id, slug, name, type, province_id, cover_image, description,
  categories,
  attractions_count, villages_count, itineraries_count, tour_guides_count, market_products_count,
  rating_average, popular_score
) VALUES
  (
    '5202', 'lombok-tengah', 'Lombok Tengah', 'regency', '52',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Destinasi eksotis dengan pantai yang menawan dan budaya Sasak yang kaya.", "en": "Exotic destination featuring stunning beaches and rich Sasak culture."}'::jsonb,
    '{bahari,petualangan,budaya}'::text[],
    0, 0, 0, 0, 36, 4.80, 92
  ),
  (
    '3471', 'yogyakarta', 'Yogyakarta', 'city', '34',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat seni klasik Jawa dan kebudayaan seperti batik dan pertunjukan wayang.", "en": "The heart of classical Javanese fine art and culture such as batik and puppetry."}'::jsonb,
    '{budaya,sejarah,kuliner}'::text[],
    0, 0, 0, 0, 84, 4.90, 97
  ),
  (
    '3404', 'sleman', 'Sleman', 'regency', '34',
    '{"url": "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kabupaten yang terletak di lereng Gunung Merapi dengan keindahan alam yang asri.", "en": "Regency located on the slopes of Mount Merapi with beautiful lush scenery."}'::jsonb,
    '{alam,desa-wisata}'::text[],
    0, 0, 0, 0, 48, 4.70, 85
  ),
  (
    '3308', 'magelang', 'Magelang', 'regency', '33',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Rumah bagi Candi Borobudur yang bersejarah dan megah.", "en": "Home to the historic and magnificent Borobudur Temple."}'::jsonb,
    '{heritage,budaya,alam}'::text[],
    0, 0, 0, 0, 42, 4.85, 90
  ),
  (
    '3273', 'bandung', 'Bandung', 'city', '32',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota kreatif dengan surga kuliner dan udara pegunungan yang sejuk.", "en": "Creative city offering a culinary paradise and cool mountain air."}'::jsonb,
    '{kuliner,alam}'::text[],
    0, 0, 0, 0, 124, 4.70, 94
  ),
  (
    '3205', 'garut', 'Garut', 'regency', '32',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Dikelilingi gunung-gunung dengan pemandian air panas alami.", "en": "Surrounded by mountains featuring natural hot springs."}'::jsonb,
    '{alam,petualangan}'::text[],
    0, 0, 0, 0, 28, 4.60, 70
  ),
  (
    '3513', 'probolinggo', 'Probolinggo', 'regency', '35',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gerbang utama menuju keindahan spektakuler Gunung Bromo.", "en": "The main gateway to the spectacular beauty of Mount Bromo."}'::jsonb,
    '{alam,petualangan}'::text[],
    0, 0, 0, 0, 32, 4.80, 86
  ),
  (
    '3578', 'surabaya', 'Surabaya', 'city', '35',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota Pahlawan dengan perpaduan sejarah kolonial dan modernitas.", "en": "The City of Heroes with a blend of colonial history and modernity."}'::jsonb,
    '{sejarah,kuliner}'::text[],
    0, 0, 0, 0, 56, 4.50, 75
  ),
  (
    '3573', 'malang', 'Malang', 'city', '35',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota peristirahatan kolonial yang sejuk dengan apel segar dan pantai.", "en": "Cool colonial retreat city known for fresh apples and beaches."}'::jsonb,
    '{alam,kuliner,heritage}'::text[],
    0, 0, 0, 0, 64, 4.75, 88
  ),
  (
    '3510', 'banyuwangi', 'Banyuwangi', 'regency', '35',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "The Sunrise of Java dengan keajaiban api biru Kawah Ijen.", "en": "The Sunrise of Java featuring the blue fire phenomenon of Ijen Crater."}'::jsonb,
    '{bahari,alam}'::text[],
    0, 0, 0, 0, 38, 4.85, 82
  ),
  (
    '5171', 'denpasar', 'Denpasar', 'city', '51',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Ibu kota Bali yang kaya akan pura bersejarah dan pusat perbelanjaan.", "en": "The capital of Bali rich in historic temples and shopping hubs."}'::jsonb,
    '{bahari,kuliner}'::text[],
    0, 0, 0, 0, 168, 4.60, 95
  ),
  (
    '5104', 'gianyar-ubud', 'Gianyar (Ubud)', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat seni dan spiritual Bali dikelilingi oleh hutan dan sawah terasering.", "en": "Bali''s artistic and spiritual center surrounded by rainforest and terraced rice paddies."}'::jsonb,
    '{budaya,alam}'::text[],
    0, 0, 0, 0, 142, 4.95, 98
  ),
  (
    '5103', 'badung-kuta', 'Badung (Kuta)', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat hiburan malam, belanja, dan selancar legendaris Bali.", "en": "The nightlife, shopping, and surfing epicenter of Bali."}'::jsonb,
    '{bahari}'::text[],
    0, 0, 0, 0, 224, 4.55, 99
  ),
  (
    '5107', 'karangasem', 'Karangasem', 'regency', '51',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kabupaten ujung timur Bali dengan pemandangan Gunung Agung yang megah.", "en": "East Bali regency boasting majestic views of Mount Agung."}'::jsonb,
    '{bahari,budaya}'::text[],
    0, 0, 0, 0, 52, 4.80, 78
  ),
  (
    '5315', 'labuan-bajo', 'Labuan Bajo', 'regency', '53',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gerbang utama petualangan melintasi habitat Komodo Dragon.", "en": "The main gateway for trekking and sailing through Komodo habitats."}'::jsonb,
    '{bahari,petualangan}'::text[],
    0, 0, 0, 0, 78, 4.92, 92
  ),
  (
    '1212', 'toba-samosir', 'Toba Samosir', 'regency', '12',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawasan danau vulkanik terbesar di dunia dengan warisan budaya Batak.", "en": "The largest volcanic lake area in the world with Batak cultural heritage."}'::jsonb,
    '{alam,budaya}'::text[],
    0, 0, 0, 0, 26, 4.70, 78
  ),
  (
    '1371', 'padang', 'Padang', 'city', '13',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Surga kuliner rendang dengan pantai berpasir putih.", "en": "Rendang culinary heaven with beautiful white-sandy beaches."}'::jsonb,
    '{kuliner,bahari}'::text[],
    0, 0, 0, 0, 32, 4.70, 80
  ),
  (
    '1375', 'bukittinggi', 'Bukittinggi', 'city', '13',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota bersejarah berhawa sejuk dengan Jam Gadang yang ikonik.", "en": "Cool-climate historic town featuring the iconic Jam Gadang clock tower."}'::jsonb,
    '{heritage,alam}'::text[],
    0, 0, 0, 0, 18, 4.60, 70
  ),
  (
    '1171', 'banda-aceh', 'Banda Aceh', 'city', '11',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Serambi Mekkah dengan warisan sejarah Islam dan wisata tsunami.", "en": "The veranda of Mecca with Islamic history and tsunami memorial sites."}'::jsonb,
    '{sejarah,religi}'::text[],
    0, 0, 0, 0, 14, 4.50, 60
  ),
  (
    '7371', 'makassar', 'Makassar', 'city', '73',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota pelabuhan kosmopolitan dengan kuliner bahari melimpah.", "en": "Cosmopolitan port city offering abundant fresh marine culinary choices."}'::jsonb,
    '{kuliner,bahari,sejarah}'::text[],
    0, 0, 0, 0, 28, 4.55, 76
  ),
  (
    '7326', 'toraja-utara', 'Toraja Utara', 'regency', '73',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Situs warisan budaya dengan tradisi pemakaman unik dan rumah adat Tongkonan.", "en": "Cultural heritage sites featuring unique burial traditions and Tongkonan houses."}'::jsonb,
    '{budaya,heritage}'::text[],
    0, 0, 0, 0, 24, 4.85, 84
  ),
  (
    '7171', 'manado', 'Manado', 'city', '71',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Terkenal dengan keindahan bawah laut Bunaken dan kuliner pedas.", "en": "Famous for Bunaken''s underwater beauty and spicy culinary specialities."}'::jsonb,
    '{bahari,kuliner}'::text[],
    0, 0, 0, 0, 26, 4.60, 78
  ),
  (
    '9108', 'raja-ampat', 'Raja Ampat', 'regency', '91',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pusat keanekaragaman hayati laut dunia dengan pulau karang ikonik.", "en": "Global epicenter of marine biodiversity with iconic karst islets."}'::jsonb,
    '{bahari,petualangan}'::text[],
    0, 0, 0, 0, 42, 4.95, 95
  ),
  (
    '9471', 'jayapura', 'Jayapura', 'city', '94',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota tepi teluk di ujung timur Indonesia dengan keindahan Danau Sentani.", "en": "Bay-front city in eastern Indonesia boasting the beauty of Lake Sentani."}'::jsonb,
    '{budaya,alam}'::text[],
    0, 0, 0, 0, 12, 4.50, 62
  ),
  (
    '6471', 'balikpapan', 'Balikpapan', 'city', '64',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota minyak modern dengan pantai berpasir landai dan wisata konservasi.", "en": "Modern oil city featuring smooth sandy beaches and nature conservation parks."}'::jsonb,
    '{bahari,kuliner}'::text[],
    0, 0, 0, 0, 14, 4.40, 58
  ),
  (
    '6371', 'banjarmasin', 'Banjarmasin', 'city', '63',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota Seribu Sungai dengan pasar terapung yang legendaris.", "en": "The City of a Thousand Rivers famous for its legendary floating markets."}'::jsonb,
    '{kuliner}'::text[],
    0, 0, 0, 0, 16, 4.50, 65
  ),
  (
    '8171', 'ambon', 'Ambon', 'city', '81',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Ambon Manise dengan keindahan teluk pantai dan sejarah rempah.", "en": "Ambon Manise boasting stunning bay beaches and spice trade history."}'::jsonb,
    '{bahari,sejarah}'::text[],
    0, 0, 0, 0, 12, 4.70, 70
  ),
  (
    '8271', 'ternate', 'Ternate', 'city', '82',
    '{"url": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kota pulau vulkanik bersejarah penghasil cengkeh utama dunia.", "en": "Historic volcanic island city renowned as a major global clove producer."}'::jsonb,
    '{heritage,bahari}'::text[],
    0, 0, 0, 0, 8, 4.60, 60
  )
ON CONFLICT (id) DO NOTHING;

-- ── Seed Data: category_assignments (for tags) ────────────


-- ── Seed Data: media ──────────────────────────────────────
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
