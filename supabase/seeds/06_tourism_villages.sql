-- ── Seed Data: tourism_villages ──────────────────────────────
INSERT INTO directory.tourism_villages (
  slug, name, destination_id, cover_image, description,
  featured, adwi_level_id, village_theme_id, rating_average, reviews_count,
  homestay_count, homestay_min_price, max_daily_visitor, signature,
  location_address, location_accessibility, location_directions, location_latitude, location_longitude
) VALUES
  (
    'desa-wae-rebo', 'Desa Wae Rebo', '5315',
    '{"url": "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa adat terpencil di pegunungan Manggarai dengan rumah adat kerucut Mbaru Niang yang legendaris.", "en": "A remote traditional village in the Manggarai mountains featuring the legendary conical Mbaru Niang houses."}'::jsonb,
    true, (SELECT id FROM directory.categories WHERE slug = 'adwi-mandiri'), (SELECT id FROM directory.categories WHERE slug = 'tema-budaya'), 4.95, 245,
    7, 350000, 50, 'Mbaru Niang',
    '{"id": "Kecamatan Satarmese Barat, Kabupaten Manggarai, Nusa Tenggara Timur", "en": "West Satarmese District, Manggarai Regency, East Nusa Tenggara"}'::jsonb,
    '{"id": "Terletak di pegunungan terpencil. Akses jalan aspal hanya sampai ke pos Denge, dilanjutkan dengan trekking mendaki bukit terjal hutan hujan sekitar 2-3 jam. Tidak ramah kursi roda.", "en": "Located in remote highlands. Road access only reaches Denge post, followed by a steep rainforest uphill trek of about 2-3 hours. Not wheelchair accessible."}'::jsonb,
    '[{"title": {"id": "Labuan Bajo → Pos Denge", "en": "Labuan Bajo → Denge Post"}, "detail": {"id": "Perjalanan darat sewa mobil ~4-5 jam melewati jalan berkelok lintas Flores.", "en": "Overland trip by rented car ~4-5 hours passing winding Flores roads."}}, {"title": {"id": "Pos Denge → Pos Registrasi Wae Rebo", "en": "Denge Post → Wae Rebo Registration Post"}, "detail": {"id": "Berjalan kaki menyusuri jalan setapak menanjak sejauh ~4.5 km.", "en": "Walk along the uphill footpath for ~4.5 km."}}]'::jsonb,
    -8.7758, 120.2831
  ),
  (
    'desa-penglipuran', 'Desa Penglipuran', '5104',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Salah satu desa paling bersih di dunia dengan tata ruang adat Bali kuno yang sangat asri dan tertata rapi.", "en": "One of the cleanest villages in the world boasting pristine ancient Balinese traditional layout and architecture."}'::jsonb,
    true, (SELECT id FROM directory.categories WHERE slug = 'adwi-mandiri'), (SELECT id FROM directory.categories WHERE slug = 'tema-budaya'), 4.88, 512,
    76, 200000, 300, 'Pekarangan seragam',
    '{"id": "Kecamatan Bangli, Kabupaten Bangli, Bali", "en": "Bangli District, Bangli Regency, Bali"}'::jsonb,
    '{"id": "Sangat ramah disabilitas. Seluruh area jalan desa dilapisi paving block datar tanpa tanjakan terjal, bebas kendaraan bermotor.", "en": "Very wheelchair friendly. The entire village paths are paved flat block, with no steep climbs, and completely motor vehicle free."}'::jsonb,
    '[{"title": {"id": "Bandara Ngurah Rai → Bangli", "en": "Ngurah Rai Airport → Bangli"}, "detail": {"id": "Berkendara ke utara melewati Ubud atau Bypass Ida Bagus Mantra ~1.5 jam.", "en": "Drive north passing Ubud or Ida Bagus Mantra Bypass ~1.5 hours."}}, {"title": {"id": "Tempat Parkir → Gerbang Desa", "en": "Parking Lot → Village Gate"}, "detail": {"id": "Berjalan kaki sejauh 100 meter ke pintu masuk utama desa.", "en": "Walk 100 meters to the main entrance of the village."}}]'::jsonb,
    -8.4326, 115.3582
  ),
  (
    'desa-nglanggeran', 'Desa Nglanggeran', '3404',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa wisata terbaik ASEAN dengan keunikan situs Gunung Api Purba dan budidaya cokelat lokal.", "en": "Best ASEAN tourism village featuring the unique Ancient Volcano site and local cocoa farming tours."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-maju'), (SELECT id FROM directory.categories WHERE slug = 'tema-alam'), 4.82, 189,
    38, 175000, 150, 'Gunung api purba',
    '{"id": "Kecamatan Patuk, Kabupaten Gunungkidul, DI Yogyakarta", "en": "Patuk District, Gunungkidul Regency, DI Yogyakarta"}'::jsonb,
    '{"id": "Kawasan desa berbukit-bukit. Akses ke puncak gunung api purba berupa jalur trekking tanah dan batuan terjal berundak yang tidak ramah disabilitas.", "en": "Hilly village terrain. Access to the summit of the ancient volcano is via steep dirt and rock trekking paths not suitable for disabled access."}'::jsonb,
    '[{"title": {"id": "Yogyakarta → Patuk", "en": "Yogyakarta → Patuk"}, "detail": {"id": "Melewati Jl. Wonosari naik ke arah bukit Patuk ~45 menit.", "en": "Via Wonosari St. driving up towards Patuk hill ~45 minutes."}}, {"title": {"id": "Patuk → Nglanggeran", "en": "Patuk → Nglanggeran"}, "detail": {"id": "Belok kiri di pertigaan GCD Patuk ikuti penunjuk jalan ~10 menit.", "en": "Turn left at GCD Patuk intersection, follow directions ~10 minutes."}}]'::jsonb,
    -7.8722, 110.5427
  ),
  (
    'desa-pemuteran', 'Desa Pemuteran', '5103',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa pesisir Bali barat yang mendunia berkat pelestarian terumbu karang berbasis teknologi Biorock.", "en": "West Bali coastal village globally acclaimed for its community-based Biorock technology coral reef conservation."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-maju'), (SELECT id FROM directory.categories WHERE slug = 'tema-bahari'), 4.85, 134,
    24, 250000, 100, 'Bio-rock coral',
    '{"id": "Kecamatan Gerokgak, Kabupaten Buleleng, Bali", "en": "Gerokgak District, Buleleng Regency, Bali"}'::jsonb,
    '{"id": "Sangat mudah diakses di tepi jalan raya utama Bali Utara. Area pantai landai berpasir hitam yang mudah dijelajahi.", "en": "Very accessible on the main North Bali highway. Flat sandy beachfront area that is easy to explore."}'::jsonb,
    '[{"title": {"id": "Denpasar → Singaraja → Pemuteran", "en": "Denpasar → Singaraja → Pemuteran"}, "detail": {"id": "Perjalanan darat memotong tengah pulau Bali ~3.5 jam.", "en": "Overland trip crossing the center of Bali island ~3.5 hours."}}]'::jsonb,
    -8.1481, 114.6292
  ),
  (
    'desa-pentingsari', 'Desa Pentingsari', '3404',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa wisata perintis di lereng Merapi dengan program interaksi budaya pedesaan dan pertanian tradisional.", "en": "Pioneering tourism village on the slopes of Merapi offering rural cultural interactions and traditional farming."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-mandiri'), (SELECT id FROM directory.categories WHERE slug = 'tema-pertanian'), 4.78, 98,
    48, 165000, 200, 'Sawah terasering',
    '{"id": "Kecamatan Cangkringan, Kabupaten Sleman, DI Yogyakarta", "en": "Cangkringan District, Sleman Regency, DI Yogyakarta"}'::jsonb,
    '{"id": "Area perumahan warga datar dan mudah diakses. Sebagian jalur persawahan berundak tanah liat yang licin saat hujan.", "en": "Residential areas are flat and easy to access. Some paddy field trails are terraced clay paths that get slippery when raining."}'::jsonb,
    '[{"title": {"id": "Yogyakarta → Cangkringan", "en": "Yogyakarta → Cangkringan"}, "detail": {"id": "Berkendara lurus ke utara menyusuri Jl. Kaliurang ~40 menit.", "en": "Drive straight north along Kaliurang St. ~40 minutes."}}]'::jsonb,
    -7.6433, 110.4394
  ),
  (
    'desa-sasak-sade', 'Desa Sasak Sade', '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa adat suku Sasak Lombok yang mempertahankan rumah jerami beralas kotoran kerbau dan tradisi tenun ikat.", "en": "Sasak tribe traditional village in Lombok maintaining thatched houses with clay-dung floors and ikat weaving tradition."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-berkembang'), (SELECT id FROM directory.categories WHERE slug = 'tema-budaya'), 4.70, 320,
    150, 0, 250, 'Rumah Sasak adat',
    '{"id": "Kecamatan Pujut, Kabupaten Lombok Tengah, Nusa Tenggara Barat", "en": "Pujut District, Central Lombok Regency, West Nusa Tenggara"}'::jsonb,
    '{"id": "Akses jalan desa berupa undakan tanah berundak dan gang sempit beraspal. Sedikit menyulitkan pengguna kursi roda.", "en": "Village access is earthen steps and narrow paved alleyways. Slightly challenging for wheelchair users."}'::jsonb,
    '[{"title": {"id": "Bandara Lombok → Sade", "en": "Lombok Airport → Sade"}, "detail": {"id": "Berkendara ke arah selatan menuju pantai Kuta ~15 menit di tepi jalan utama.", "en": "Drive south towards Kuta beach ~15 minutes right along the main road."}}]'::jsonb,
    -8.8398, 116.2917
  ),
  (
    'desa-wisata-alam-endah', 'Desa Wisata Alam Endah', '3273',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Desa agrowisata subur di kawasan wisata Ciwidey dikelilingi kebun strawberry dan kebun teh berhawa sejuk.", "en": "Fertile agrotourism village in the Ciwidey area surrounded by strawberry farms and cool highland tea plantations."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-maju'), (SELECT id FROM directory.categories WHERE slug = 'tema-pertanian'), 4.75, 112,
    28, 175000, 150, 'Kawah Putih & Ranca Upas',
    '{"id": "Kecamatan Rancabali, Kabupaten Bandung, Jawa Barat", "en": "Rancabali District, Bandung Regency, West Java"}'::jsonb,
    '{"id": "Jalur aspal mulus masuk ke pusat desa. Ramah kendaraan roda empat dan bus sedang. Jalur ke kebun strawberry datar.", "en": "Smooth paved roads into the village center. Accessible by cars and mid-sized buses. Trails to strawberry farms are flat."}'::jsonb,
    '[{"title": {"id": "Bandung → Ciwidey → Rancabali", "en": "Bandung → Ciwidey → Rancabali"}, "detail": {"id": "Melewati tol Soreang-Pasir Koja dilanjutkan jalur arteri Soreang-Ciwidey ~1.5 jam.", "en": "Via Soreang-Pasir Koja toll followed by Soreang-Ciwidey arterial road ~1.5 hours."}}]'::jsonb,
    -7.1432, 107.3912
  ),
  (
    'desa-wisata-ciptagelar', 'Desa Wisata Ciptagelar', '3273',
    '{"url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kampung adat Kasepuhan Banten Kidul yang memegang kuat adat bertani padi tradisional dan kemandirian pangan.", "en": "Traditional Kasepuhan Banten Kidul settlement firmly upholding ancestral paddy farming rituals and food self-sufficiency."}'::jsonb,
    false, (SELECT id FROM directory.categories WHERE slug = 'adwi-mandiri'), (SELECT id FROM directory.categories WHERE slug = 'tema-budaya'), 4.85, 76,
    12, 250000, 80, 'Kasepuhan adat Sunda',
    '{"id": "Kecamatan Cisolok, Kabupaten Sukabumi, Jawa Barat", "en": "Cisolok District, Sukabumi Regency, West Java"}'::jsonb,
    '{"id": "Medan perbukitan sangat terjal berbatu. Direkomendasikan menggunakan kendaraan 4WD (Jip) untuk masuk ke desa. Sangat tidak ramah kursi roda.", "en": "Extremely steep and rocky mountainous terrain. 4WD vehicles (Jeep) are highly recommended to enter. Not wheelchair friendly."}'::jsonb,
    '[{"title": {"id": "Pelabuhan Ratu → Cisolok", "en": "Pelabuhan Ratu → Cisolok"}, "detail": {"id": "Berkendara ke arah barat menuju perbatasan Banten ~30 menit.", "en": "Drive west towards Banten border ~30 minutes."}}, {"title": {"id": "Cisolok → Ciptagelar", "en": "Cisolok → Ciptagelar"}, "detail": {"id": "Jalur berbatu tanah menanjak melintasi pegunungan Halimun ~1.5 jam.", "en": "Rocky uphill dirt track crossing Halimun mountains ~1.5 hours."}}]'::jsonb,
    -6.7925, 106.4912
  );

-- ── 2. Category Assignments ──────────────────────────────────
INSERT INTO directory.category_assignments (category_id, entity_type, entity_id) VALUES
  -- Wae Rebo
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-tarian'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-workshop'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),

  -- Penglipuran
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-workshop'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),

  -- Nglanggeran
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-trekking'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),

  -- Pemuteran
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-snorkel'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),

  -- Pentingsari
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-kuliner'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),

  -- Sasak Sade
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-tarian'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-workshop'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),

  -- Alam Endah
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-kuliner'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),

  -- Ciptagelar
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-workshop'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-ciptagelar')),
  ((SELECT id FROM directory.categories WHERE slug = 'aktivitas-homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-ciptagelar'));

-- ── 3. Facility Assignments ──────────────────────────────────
INSERT INTO directory.facility_assignments (facility_id, entity_type, entity_id) VALUES
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wae-rebo')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'wifi'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'charging-station'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-penglipuran')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'wifi'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-nglanggeran')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'wifi'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pemuteran')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'wifi'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-pentingsari')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-sasak-sade')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),
  ((SELECT id FROM directory.facilities WHERE slug = 'wifi'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-alam-endah')),

  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-ciptagelar')),
  ((SELECT id FROM directory.facilities WHERE slug = 'homestay'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-ciptagelar')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'village', (SELECT id FROM directory.tourism_villages WHERE slug = 'desa-wisata-ciptagelar'));
