-- ── Seed Data: attractions ────────────────────────────────
INSERT INTO directory.attractions (
  slug, name, categories, destination_id, cover_image, description,
  min_price, rating_average, reviews_count, opening_hours, trekking,
  location_address, location_accessibility, location_directions, location_latitude, location_longitude
) VALUES
  (
    'pulau-padar-viewpoint', 'Pulau Padar Viewpoint', '{alam,petualangan}'::text[], '5315',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Trekking ke viewpoint ikonik dengan pemandangan 3 teluk berpasir warna berbeda dari atas bukit.", "en": "Trekking to the iconic viewpoint with views of 3 different colored sandy bays from the hilltop."}'::jsonb,
    50000, 4.95, 412,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "18:00"}], "tuesday": [{"open": "06:00", "close": "18:00"}], "wednesday": [{"open": "06:00", "close": "18:00"}], "thursday": [{"open": "06:00", "close": "18:00"}], "friday": [{"open": "06:00", "close": "18:00"}], "saturday": [{"open": "06:00", "close": "18:00"}], "sunday": [{"open": "06:00", "close": "18:00"}]}}'::jsonb,
    true,
    '{"id": "Kepulauan Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur", "en": "Komodo Archipelago, West Manggarai Regency, East Nusa Tenggara"}'::jsonb,
    '{"id": "Berada di pulau terpencil tanpa fasilitas jalan raya. Akses menuju puncak viewpoint berupa jalur trekking tangga kayu berundak yang terjal dan melelahkan (sekitar 800 anak tangga). Tidak ramah disabilitas/kursi roda.", "en": "Located on a remote island with no road infrastructure. Access to the summit viewpoint is via a steep and tiring wooden stairway path (around 800 steps). Not suitable for wheelchairs or disability access."}'::jsonb,
    '[{"title": {"id": "Pelabuhan Labuan Bajo → Pulau Padar", "en": "Labuan Bajo Harbor → Padar Island"}, "detail": {"id": "Menggunakan Speedboat ~1.5 jam atau Kapal Phinisi ~3-4 jam.", "en": "By Speedboat ~1.5 hours or Phinisi Boat ~3-4 hours."}}, {"title": {"id": "Dermaga Pulau Padar → Pintu Masuk", "en": "Padar Island Jetty → Entrance Gate"}, "detail": {"id": "Berjalan kaki menyusuri pantai pasir putih menuju pos registrasi.", "en": "Walk along the white sandy beach to the registration post."}}, {"title": {"id": "Pintu Masuk → Puncak Viewpoint", "en": "Entrance → Viewpoint Summit"}, "detail": {"id": "Trekking menanjak meniti tangga kayu sekitar 20-30 menit.", "en": "Trekking uphill climbing wooden steps for about 20-30 minutes."}}]'::jsonb,
    -8.6534, 119.5312
  ),
  (
    'candi-borobudur', 'Candi Borobudur', '{sejarah,heritage,budaya}'::text[], '3308',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Candi Buddha terbesar di dunia dengan 504 arca dan 2.672 panel relief yang memukau.", "en": "The largest Buddhist temple in the world featuring 504 Buddha statues and 2,672 relief panels."}'::jsonb,
    75000, 4.90, 1240,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:30"}], "tuesday": [{"open": "06:30", "close": "17:30"}], "wednesday": [{"open": "06:30", "close": "17:30"}], "thursday": [{"open": "06:30", "close": "17:30"}], "friday": [{"open": "06:30", "close": "17:30"}], "saturday": [{"open": "06:30", "close": "17:30"}], "sunday": [{"open": "06:30", "close": "17:30"}]}}'::jsonb,
    false,
    '{"id": "Jl. Badrawati, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah", "en": "Badrawati St., Borobudur District, Magelang Regency, Central Java"}'::jsonb,
    '{"id": "Tersedia ramp kursi roda di area pelataran candi. Namun, akses naik ke struktur candi utama berupa tangga batu sempit dan curam yang tidak mendukung kursi roda. Fasilitas persewaan kursi roda tersedia di dekat pintu masuk.", "en": "Wheelchair ramps are available in the temple courtyard. However, access to the main temple structure is via narrow, steep stone steps not suitable for wheelchairs. Wheelchair rental facilities are available near the entrance."}'::jsonb,
    '[{"title": {"id": "Stasiun/Bandara Yogyakarta → Terminal Jombor", "en": "Yogyakarta Station/Airport → Jombor Terminal"}, "detail": {"id": "Menggunakan bus TransJogja rute 2A atau taksi online ~30 menit.", "en": "Using TransJogja bus route 2A or online taxi ~30 minutes."}}, {"title": {"id": "Terminal Jombor → Terminal Borobudur", "en": "Jombor Terminal → Borobudur Terminal"}, "detail": {"id": "Menggunakan bus lokal jurusan Borobudur ~1 jam · Rp 20.000/orang.", "en": "Using local bus heading to Borobudur ~1 hour · Rp 20,000/person."}}, {"title": {"id": "Terminal Borobudur → Pintu Masuk Candi", "en": "Borobudur Terminal → Temple Entrance"}, "detail": {"id": "Berjalan kaki ~10 menit atau menggunakan andong/becak lokal.", "en": "Walk ~10 minutes or use local horse cart (andong)/rickshaw (becak)."}}]'::jsonb,
    -7.6079, 110.2038
  ),
  (
    'gunung-bromo', 'Gunung Bromo', '{alam,petualangan}'::text[], '3513',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi aktif dengan lautan pasir dan sunrise yang legendaris di Indonesia.", "en": "Active volcano with a vast sand sea and legendary sunrise vistas."}'::jsonb,
    35000, 4.88, 856,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    true,
    '{"id": "Kawasan Taman Nasional Bromo Tengger Semeru, Jawa Timur", "en": "Bromo Tengger Semeru National Park Area, East Java"}'::jsonb,
    '{"id": "Medan berpasir tebal dan berbukit. Akses ke kawah memerlukan perjalanan menanjak melewati tangga beton curam berdebu. Sangat tidak ramah kursi roda. Disarankan menyewa kuda untuk menuju kaki tangga.", "en": "Sandy, dusty, and hilly terrain. Access to the crater requires climbing steep concrete steps. Highly unsuitable for wheelchairs. Renting a horse to reach the base of the stairs is recommended."}'::jsonb,
    '[{"title": {"id": "Kota Malang/Probolinggo → Pos Cemoro Lawang", "en": "Malang/Probolinggo City → Cemoro Lawang Post"}, "detail": {"id": "Kendaraan pribadi atau travel lokal ~2-3 jam.", "en": "Private vehicle or local travel car ~2-3 hours."}}, {"title": {"id": "Cemoro Lawang → Lautan Pasir (Sanktuari Bromo)", "en": "Cemoro Lawang → Sea of Sand (Bromo Sanctuary)"}, "detail": {"id": "Wajib sewa Jip 4x4 lokal ~30 menit.", "en": "Must rent local 4x4 Jeep ~30 minutes."}}, {"title": {"id": "Lautan Pasir → Kawah Bromo", "en": "Sea of Sand → Bromo Crater"}, "detail": {"id": "Berjalan kaki/sewa kuda melewati tangga sebanyak 250 anak tangga.", "en": "Walk/rent a horse then climb the 250 concrete steps."}}]'::jsonb,
    -7.9425, 112.9530
  ),
  (
    'pura-ulun-danu-beratan', 'Pura Ulun Danu Beratan', '{religi,budaya}'::text[], '5103',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura di tepi Danau Beratan dengan arsitektur ikonik yang menjadi simbol Bali.", "en": "A beautiful temple on the shores of Lake Beratan, an iconic symbol of Bali."}'::jsonb,
    50000, 4.80, 624,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "19:00"}], "tuesday": [{"open": "07:00", "close": "19:00"}], "wednesday": [{"open": "07:00", "close": "19:00"}], "thursday": [{"open": "07:00", "close": "19:00"}], "friday": [{"open": "07:00", "close": "19:00"}], "saturday": [{"open": "07:00", "close": "19:00"}], "sunday": [{"open": "07:00", "close": "19:00"}]}}'::jsonb,
    false,
    '{"id": "Danau Beratan, Candikuning, Kecamatan Baturiti, Kabupaten Tabanan, Bali", "en": "Lake Beratan, Candikuning, Baturiti District, Tabanan Regency, Bali"}'::jsonb,
    '{"id": "Sangat ramah disabilitas dan lansia. Area taman dan tepi danau memiliki jalur pedestrian beraspal/semen yang datar tanpa undakan. Toilet ramah disabilitas tersedia di area parkir utama.", "en": "Very disability and elderly-friendly. The garden and lakeside areas feature flat, paved pedestrian paths without steps. Disabled-friendly restrooms are available in the main parking lot."}'::jsonb,
    '[{"title": {"id": "Bandara I Gusti Ngurah Rai → Candikuning, Bedugul", "en": "I Gusti Ngurah Rai Airport → Candikuning, Bedugul"}, "detail": {"id": "Menggunakan taksi charter / sewa mobil ~1.5 - 2 jam.", "en": "By chartered taxi / rental car ~1.5 - 2 hours."}}, {"title": {"id": "Jl. Raya Denpasar-Singaraja → Pura Ulun Danu", "en": "Denpasar-Singaraja Highway → Ulun Danu Temple"}, "detail": {"id": "Belok kanan tepat di gerbang Bedugul, parkir langsung di depan gerbang pura.", "en": "Turn right at Bedugul gate, park directly in front of the temple gate."}}]'::jsonb,
    -8.2752, 115.1668
  ),
  (
    'pantai-tanjung-aan', 'Pantai Tanjung Aan', '{bahari,alam}'::text[], '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pantai berpasir putih dengan dua teluk dan bukit kapal selam yang ikonik.", "en": "White sandy beach with twin bays and a submarine-shaped hill viewpoint."}'::jsonb,
    0, 4.75, 388,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Kawasan Ekonomi Khusus Mandalika, Lombok Tengah, Nusa Tenggara Barat", "en": "Mandalika Special Economic Zone, Central Lombok, West Nusa Tenggara"}'::jsonb,
    '{"id": "Akses area parkir cukup dekat dengan bibir pantai, namun permukaan berpasir membuat kursi roda sulit bergerak secara mandiri. Belum tersedia jalur khusus kursi roda hingga ke tepi air.", "en": "The parking area is close to the shoreline, but the sandy surface makes it difficult for wheelchairs to move independently. Wheelchair ramps to the water edge are not yet available."}'::jsonb,
    '[{"title": {"id": "Bandara Internasional Lombok → Kuta Mandalika", "en": "Lombok International Airport → Kuta Mandalika"}, "detail": {"id": "Kendaraan roda 4 / taksi online ~30 menit via Jl. Bypass Bandara.", "en": "Four-wheeled vehicle / online taxi ~30 minutes via Airport Bypass St."}}, {"title": {"id": "Kuta Mandalika → Pantai Tanjung Aan", "en": "Kuta Mandalika → Tanjung Aan Beach"}, "detail": {"id": "Kendaraan pribadi/sepeda motor ~15 menit ke arah timur melewati Bukit Merese.", "en": "Private vehicle/motorcycle ~15 minutes eastwards passing Merese Hill."}}]'::jsonb,
    -8.9135, 116.3218
  ),
  (
    'candi-prambanan', 'Candi Prambanan', '{sejarah,heritage,budaya}'::text[], '3404',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kompleks candi Hindu terbesar di Indonesia dengan arsitektur runcing yang megah.", "en": "The largest Hindu temple compound in Indonesia, showcasing towering and pointed architecture."}'::jsonb,
    75000, 4.85, 942,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:30", "close": "17:00"}], "tuesday": [{"open": "06:30", "close": "17:00"}], "wednesday": [{"open": "06:30", "close": "17:00"}], "thursday": [{"open": "06:30", "close": "17:00"}], "friday": [{"open": "06:30", "close": "17:00"}], "saturday": [{"open": "06:30", "close": "17:00"}], "sunday": [{"open": "06:30", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Solo - Yogyakarta No.16, Kranggan, Bokoharjo, Kec. Prambanan, Kabupaten Sleman, Daerah Istimewa Yogyakarta", "en": "Solo - Yogyakarta Highway No.16, Bokoharjo, Prambanan, Sleman, Special Region of Yogyakarta"}'::jsonb,
    '{"id": "Aksesibilitas sangat baik dengan jalur pedestrian beraspal halus yang luas dan landai. Kursi roda dan stroller bayi dapat bergerak dengan mudah di seluruh area luar candi. Layanan sewa kursi roda gratis tersedia di pos informasi.", "en": "Excellent accessibility with wide, smooth paved paths. Wheelchairs and baby strollers can move easily around the entire temple complex. Free wheelchair rental is available at the information desk."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Yogyakarta → Stasiun Lempuyangan/Tugu", "en": "Yogyakarta City Center → Lempuyangan/Tugu Station"}, "detail": {"id": "Menggunakan kereta KRL komuter tujuan Solo ~10 menit.", "en": "By KRL commuter train bound for Solo ~10 minutes."}}, {"title": {"id": "Stasiun Brambanan → Kompleks Candi Prambanan", "en": "Brambanan Station → Prambanan Temple Complex"}, "detail": {"id": "Berjalan kaki ~10 menit ke arah utara atau menggunakan ojek online.", "en": "Walk ~10 minutes northwards or use online ride-hailing services."}}]'::jsonb,
    -7.7520, 110.4914
  ),
  (
    'danau-toba', 'Danau Toba', '{alam,bahari}'::text[], '1212',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Danau vulkanik terbesar di Asia Tenggara dengan Pulau Samosir di tengahnya.", "en": "The largest volcanic lake in Southeast Asia with Samosir Island at its center."}'::jsonb,
    0, 4.70, 510,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Sumatera Utara, Indonesia", "en": "North Sumatra, Indonesia"}'::jsonb,
    '{"id": "Area wisata tepi danau sebagian besar dapat diakses kendaraan, namun akses menuju dermaga penyeberangan kapal memiliki tangga kayu/semen yang tidak mendukung kursi roda mandiri.", "en": "Most lakeside tourist areas are accessible by vehicles, but access to the boat piers features wooden/concrete steps that do not support independent wheelchairs."}'::jsonb,
    '[{"title": {"id": "Kota Medan → Parapat (Danau Toba)", "en": "Medan City → Parapat (Lake Toba)"}, "detail": {"id": "Menggunakan mobil travel atau kereta api Medan-Siantar dilanjut bus lokal ~4-5 jam.", "en": "By travel car or Medan-Siantar train followed by local bus ~4-5 hours."}}, {"title": {"id": "Pelabuhan Ajibata/Tiga Raja → Pulau Samosir", "en": "Ajibata/Tiga Raja Harbor → Samosir Island"}, "detail": {"id": "Menyeberang menggunakan Kapal Feri Tao Toba ~45 menit · Rp 15.000/orang.", "en": "Cross using Tao Toba Ferry boat ~45 minutes · Rp 15,000/person."}}]'::jsonb,
    2.6145, 98.7844
  ),
  (
    'wayag-viewpoint', 'Wayag Viewpoint', '{alam,bahari,petualangan}'::text[], '9108',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pemandanagan gugusan pulau karst dari atas bukit, ikon utama Raja Ampat.", "en": "Stunning panoramic viewpoint overlooking the iconic limestone karst islands of Raja Ampat."}'::jsonb,
    200000, 4.98, 320,
    '{"timezone": "Asia/Jayapura", "is_24_hours": false, "periods": {"monday": [{"open": "05:30", "close": "17:00"}], "tuesday": [{"open": "05:30", "close": "17:00"}], "wednesday": [{"open": "05:30", "close": "17:00"}], "thursday": [{"open": "05:30", "close": "17:00"}], "friday": [{"open": "05:30", "close": "17:00"}], "saturday": [{"open": "05:30", "close": "17:00"}], "sunday": [{"open": "05:30", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Kepulauan Wayag, Kabupaten Raja Ampat, Papua Barat", "en": "Wayag Archipelago, Raja Ampat Regency, West Papua"}'::jsonb,
    '{"id": "Sangat ekstrem dan berbahaya. Pendakian ke puncak viewpoint berupa tebing batu karst yang terjal, tajam, tanpa tangga pengaman, dan harus memanjat menggunakan tali tambang manual. Wajib menggunakan sepatu gunung dan pemandu. Sangat tidak ramah anak/lansia/disabilitas.", "en": "Extremely rugged and hazardous. Climbing to the viewpoint involves scaling steep, sharp limestone karst cliffs with no safety railings, holding onto manual ropes. Trail shoes and guides are mandatory. Unsuitable for children/elderly/disabled."}'::jsonb,
    '[{"title": {"id": "Bandara Sorong → Pelabuhan Rakyat Sorong", "en": "Sorong Airport → Sorong Harbor"}, "detail": {"id": "Menggunakan taksi lokal atau ojek ~15 menit.", "en": "Using local taxi or motorcycle taxi ~15 minutes."}}, {"title": {"id": "Pelabuhan Sorong → Waisai (Ibu Kota Raja Ampat)", "en": "Sorong Harbor → Waisai (Raja Ampat Capital)"}, "detail": {"id": "Kapal Feri cepat ~2 jam · Rp 125.000 - Rp 220.000/orang.", "en": "Express Ferry boat ~2 hours · Rp 125,000 - Rp 220,000/person."}}, {"title": {"id": "Waisai → Kepulauan Wayag", "en": "Waisai → Wayag Archipelago"}, "detail": {"id": "Sewa Speedboat charter (kapasitas 8-10 orang) ~3-4 jam perjalanan laut.", "en": "Rent a chartered Speedboat (capacity 8-10 people) ~3-4 hours sea trip."}}]'::jsonb,
    -0.2078, 130.0247
  ),
  (
    'air-terjun-tiu-kelep', 'Air Terjun Tiu Kelep', '{alam,petualangan}'::text[], '5202',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Air terjun bertingkat dengan air jernih dan kolam alami yang menyegarkan.", "en": "Majestic multi-tiered waterfall with crystal clear water and refreshing pools."}'::jsonb,
    25000, 4.72, 234,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Senaru, Kecamatan Bayan, Kabupaten Lombok Utara, Nusa Tenggara Barat", "en": "Senaru, Bayan District, North Lombok Regency, West Nusa Tenggara"}'::jsonb,
    '{"id": "Jalur trekking berupa jalan tanah hutan, menyeberangi aliran sungai dangkal berbatu, dan menyusuri selokan air beton sempit. Membutuhkan fisik prima dan pemandu lokal. Sangat tidak ramah kursi roda/disabilitas.", "en": "The trekking trail consists of forest dirt paths, crossing shallow rocky streams, and walking along narrow concrete water channels. Requires prime physical condition and local guides. Not suitable for wheelchairs/disability."}'::jsonb,
    '[{"title": {"id": "Kota Mataram → Desa Senaru (Kaki Rinjani)", "en": "Mataram City → Senaru Village (Rinjani Base)"}, "detail": {"id": "Menggunakan sewa mobil atau travel ~2.5 - 3 jam perjalanan darat.", "en": "By car rental or travel car ~2.5 - 3 hours overland trip."}}, {"title": {"id": "Pintu Masuk Senaru → Air Terjun Sendang Gile & Tiu Kelep", "en": "Senaru Gate → Sendang Gile & Tiu Kelep Waterfall"}, "detail": {"id": "Trekking jalan kaki menyusuri hutan adat Senaru ~45 menit.", "en": "Trekking on foot along the Senaru traditional forest for ~45 minutes."}}]'::jsonb,
    -8.3090, 116.4063
  ),
  (
    'kawah-putih-ciwidey', 'Kawah Putih Ciwidey', '{alam}'::text[], '3273',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawah belerang dengan air putih kehijauan dan pemandangan alam yang unik.", "en": "Striking volcanic crater lake with pale turquoise waters and misty forest surrounds."}'::jsonb,
    75000, 4.50, 678,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Soreang-Ciwidey, Sugihmukti, Kecamatan Pasirjambu, Kabupaten Bandung, Jawa Barat", "en": "Soreang-Ciwidey Highway, Sugihmukti, Pasirjambu District, Bandung Regency, West Java"}'::jsonb,
    '{"id": "Aksesibilitas cukup baik. Dari area parkir atas tersedia jembatan kayu landai langsung menuju tepian kawah yang dapat dilalui kursi roda dengan pendampingan. Angkutan ontang-anting untuk naik memiliki undakan tangga tinggi.", "en": "Reasonably accessible. A flat wooden ramp bridge leads directly from the upper parking area to the crater edge, usable by wheelchairs with assistance. The ontang-anting shuttle buses have high step entrances."}'::jsonb,
    '[{"title": {"id": "Stasiun Bandung → Terminal Leuwi Panjang", "en": "Bandung Station → Leuwi Panjang Terminal"}, "detail": {"id": "Menggunakan angkot atau taksi online ~20-30 menit.", "en": "Using angkot minibus or online taxi ~20-30 minutes."}}, {"title": {"id": "Terminal Leuwi Panjang → Terminal Ciwidey", "en": "Leuwi Panjang Terminal → Ciwidey Terminal"}, "detail": {"id": "Menggunakan bus L300 / Elf lokal ~1.5 jam · Rp 20.000/orang.", "en": "Using local L300 minibus / Elf shuttle ~1.5 hours · Rp 20,000/person."}}, {"title": {"id": "Terminal Ciwidey → Gerbang Kawah Putih", "en": "Ciwidey Terminal → Kawah Putih Gate"}, "detail": {"id": "Menggunakan angkot kuning jurusan Patengan ~15 menit, lanjut Ontang-anting ke kawah.", "en": "Using yellow Patengan angkot ~15 mins, then take the Ontang-anting shuttle to crater."}}]'::jsonb,
    -7.1662, 107.4021
  ),
  (
    'pantai-kuta', 'Pantai Kuta', '{bahari,alam}'::text[], '5103',
    '{"url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pantai pasir putih terkenal dengan pemandangan sunset spektakuler dan ombak yang cocok untuk berselancar.", "en": "Famous white sand beach with spectacular sunset views and waves suitable for surfing."}'::jsonb,
    0, 4.2, 1200,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Kuta, Kecamatan Kuta, Kabupaten Badung, Bali", "en": "Kuta, Kuta District, Badung Regency, Bali"}'::jsonb,
    '{"id": "Area parkir dekat bibir pantai namun permukaan pasir menyulitkan kursi roda. Tersedia jalur pedestrian di sepanjang trotoar Jl. Pantai Kuta.", "en": "Parking area is close to the shoreline but sandy surface makes wheelchair movement difficult. Pedestrian paths are available along Kuta Beach Street."}'::jsonb,
    '[{"title": {"id": "Bandara Ngurah Rai → Pantai Kuta", "en": "Ngurah Rai Airport → Kuta Beach"}, "detail": {"id": "Menggunakan taksi online atau sewa mobil ~15 menit via Jl. By Pass Ngurah Rai.", "en": "By online taxi or rental car ~15 minutes via By Pass Ngurah Rai St."}}]'::jsonb,
    -8.7186, 115.1686
  ),
  (
    'monkey-forest-ubud', 'Monkey Forest Ubud', '{alam,budaya,ecotourism}'::text[], '5104',
    '{"url": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Cagar alam dan hutan suci dengan ratusan monyet ekor panjang yang menjadi ikon wisata Ubud.", "en": "Nature reserve and sacred forest with hundreds of long-tailed macaques, the iconic Ubud attraction."}'::jsonb,
    80000, 4.5, 890,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "08:00", "close": "18:00"}], "tuesday": [{"open": "08:00", "close": "18:00"}], "wednesday": [{"open": "08:00", "close": "18:00"}], "thursday": [{"open": "08:00", "close": "18:00"}], "friday": [{"open": "08:00", "close": "18:00"}], "saturday": [{"open": "08:00", "close": "18:00"}], "sunday": [{"open": "08:00", "close": "18:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Monkey Forest, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali", "en": "Monkey Forest St., Ubud, Ubud District, Gianyar Regency, Bali"}'::jsonb,
    '{"id": "Jalur di dalam hutan berupa jalan setapak beton rata dan cukup lebar. Tersedia area parkir luas di depan pintu masuk. Beberapa anak tangga terdapat di area pura dalam hutan.", "en": "Paths inside the forest are flat, wide concrete walkways. A large parking area is at the entrance. Several steps exist in the inner temple area."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Ubud → Monkey Forest", "en": "Ubud City Center → Monkey Forest"}, "detail": {"id": "Berjalan kaki ~10 menit dari Pasar Ubud atau menggunakan ojek online.", "en": "Walk ~10 minutes from Ubud Market or use online ride-hailing."}}]'::jsonb,
    -8.5181, 115.2590
  ),
  (
    'tirta-empul', 'Pura Tirta Empul', '{religi,budaya}'::text[], '5104',
    '{"url": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura suci dengan sumber mata air alami untuk ritual melukat (pembersihan diri) yang masih aktif digunakan.", "en": "Sacred temple with natural spring water source for the melukat (self-purification) ritual still actively practiced."}'::jsonb,
    50000, 4.6, 560,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "18:00"}], "tuesday": [{"open": "07:00", "close": "18:00"}], "wednesday": [{"open": "07:00", "close": "18:00"}], "thursday": [{"open": "07:00", "close": "18:00"}], "friday": [{"open": "07:00", "close": "18:00"}], "saturday": [{"open": "07:00", "close": "18:00"}], "sunday": [{"open": "07:00", "close": "18:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Tirta, Manukaya, Kecamatan Tampaksiring, Kabupaten Gianyar, Bali", "en": "Tirta St., Manukaya, Tampaksiring District, Gianyar Regency, Bali"}'::jsonb,
    '{"id": "Area pelataran pura cukup datar dengan permukaan batu paving. Kolam pemandian suci memiliki undakan tangga masuk. Tersedia area parkir luas di luar pura.", "en": "The temple courtyard is fairly flat with paved stone surface. The sacred bathing pool has stepped entry. A large parking area is available outside."}'::jsonb,
    '[{"title": {"id": "Ubud → Pura Tirta Empul", "en": "Ubud → Tirta Empul Temple"}, "detail": {"id": "Menggunakan kendaraan pribadi atau taksi online ~30 menit ke arah utara via Jl. Raya Tampaksiring.", "en": "By private vehicle or online taxi ~30 minutes north via Tampaksiring Highway."}}]'::jsonb,
    -8.4152, 115.3155
  ),
  (
    'tanah-lot', 'Tanah Lot', '{religi,budaya,bahari}'::text[], '5103',
    '{"url": "https://images.unsplash.com/photo-1621870933152-5a7e5b75b67b?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura laut ikonik Bali yang berdiri di atas batu karang di tepi laut dengan latar sunset yang memukau.", "en": "Iconic Balinese sea temple perched on a rocky offshore islet with a stunning sunset backdrop."}'::jsonb,
    60000, 4.5, 980,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "19:00"}], "tuesday": [{"open": "06:00", "close": "19:00"}], "wednesday": [{"open": "06:00", "close": "19:00"}], "thursday": [{"open": "06:00", "close": "19:00"}], "friday": [{"open": "06:00", "close": "19:00"}], "saturday": [{"open": "06:00", "close": "19:00"}], "sunday": [{"open": "06:00", "close": "19:00"}]}}'::jsonb,
    false,
    '{"id": "Beraban, Kecamatan Kediri, Kabupaten Tabanan, Bali", "en": "Beraban, Kediri District, Tabanan Regency, Bali"}'::jsonb,
    '{"id": "Jalur pedestrian dari area parkir menuju pura berupa jalan aspal landai dengan beberapa anak tangga di area tebing. Tersedia toilet ramah disabilitas di area parkir.", "en": "Pedestrian path from parking to the temple is a sloping asphalt road with some steps near the cliff. Disabled-friendly restrooms available in the parking area."}'::jsonb,
    '[{"title": {"id": "Kota Denpasar → Tanah Lot", "en": "Denpasar City → Tanah Lot"}, "detail": {"id": "Menggunakan kendaraan pribadi atau taksi ~1 jam ke arah barat laut melalui Tabanan.", "en": "By private vehicle or taxi ~1 hour northwest via Tabanan."}}]'::jsonb,
    -8.6213, 115.0868
  ),
  (
    'pura-besakih', 'Pura Besakih', '{religi,budaya,sejarah}'::text[], '5107',
    '{"url": "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pura terbesar dan termegah di Bali yang dikenal sebagai Pura Agung, kompleks pura di lereng Gunung Agung.", "en": "The largest and most magnificent temple in Bali, known as Pura Agung, a temple complex on the slopes of Mount Agung."}'::jsonb,
    60000, 4.6, 720,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "18:00"}], "tuesday": [{"open": "07:00", "close": "18:00"}], "wednesday": [{"open": "07:00", "close": "18:00"}], "thursday": [{"open": "07:00", "close": "18:00"}], "friday": [{"open": "07:00", "close": "18:00"}], "saturday": [{"open": "07:00", "close": "18:00"}], "sunday": [{"open": "07:00", "close": "18:00"}]}}'::jsonb,
    false,
    '{"id": "Besakih, Kecamatan Rendang, Kabupaten Karangasem, Bali", "en": "Besakih, Rendang District, Karangasem Regency, Bali"}'::jsonb,
    '{"id": "Akses menuju pura melalui jalan berundak panjang dan curam. Tidak ramah kursi roda mandiri. Tersedia area parkir luas di bawah dan ojek lokal untuk membantu mencapai pelataran pura.", "en": "Access to the temple is via long, steep stepped paths. Not suitable for independent wheelchairs. A large parking area below and local ojek are available to reach the courtyard."}'::jsonb,
    '[{"title": {"id": "Kota Denpasar → Pura Besakih", "en": "Denpasar City → Besakih Temple"}, "detail": {"id": "Menggunakan kendaraan pribadi atau taksi ~2 jam ke arah timur laut melalui Gianyar dan Bangli.", "en": "By private vehicle or taxi ~2 hours northeast via Gianyar and Bangli."}}]'::jsonb,
    -8.3741, 115.4508
  ),
  (
    'tirta-gangga', 'Taman Tirta Gangga', '{budaya,alam}'::text[], '5107',
    '{"url": "https://images.unsplash.com/photo-1570168009544-f069c4db0e89?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Istana air kerajaan Karangasem dengan kolam, air mancur, dan patung-patung yang indah di tengah taman tropis.", "en": "Royal water palace of Karangasem with ponds, fountains, and beautiful statues set in a tropical garden."}'::jsonb,
    30000, 4.5, 430,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "18:00"}], "tuesday": [{"open": "07:00", "close": "18:00"}], "wednesday": [{"open": "07:00", "close": "18:00"}], "thursday": [{"open": "07:00", "close": "18:00"}], "friday": [{"open": "07:00", "close": "18:00"}], "saturday": [{"open": "07:00", "close": "18:00"}], "sunday": [{"open": "07:00", "close": "18:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Abang-Amlapura, Ababi, Kecamatan Abang, Kabupaten Karangasem, Bali", "en": "Abang-Amlapura Highway, Ababi, Abang District, Karangasem Regency, Bali"}'::jsonb,
    '{"id": "Area taman seluruhnya berupa permukaan datar berbatu paving yang dapat dilalui kursi roda dengan mudah. Tersedia parkir di depan pintu masuk.", "en": "The entire garden area has flat paved stone surfaces easily accessible by wheelchair. Parking is available at the entrance."}'::jsonb,
    '[{"title": {"id": "Kota Amlapura → Tirta Gangga", "en": "Amlapura City → Tirta Gangga"}, "detail": {"id": "Menggunakan kendaraan pribadi ~15 menit ke arah utara via Jl. Raya Abang.", "en": "By private vehicle ~15 minutes north via Abang Highway."}}]'::jsonb,
    -8.4091, 115.5873
  ),
  (
    'keraton-yogyakarta', 'Keraton Yogyakarta', '{sejarah,budaya,heritage}'::text[], '3471',
    '{"url": "https://images.unsplash.com/photo-1579948943790-63287d63fb3e?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Istana Kesultanan Yogyakarta yang masih berfungsi dengan arsitektur Jawa asli dan museum koleksi kerajaan.", "en": "The functioning Yogyakarta Sultanate Palace featuring authentic Javanese architecture and royal collection museum."}'::jsonb,
    15000, 4.6, 1100,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "08:00", "close": "14:30"}], "tuesday": [{"open": "08:00", "close": "14:30"}], "wednesday": [{"open": "08:00", "close": "14:30"}], "thursday": [{"open": "08:00", "close": "14:30"}], "friday": [{"open": "08:00", "close": "14:30"}], "saturday": [{"open": "08:00", "close": "14:30"}], "sunday": [{"open": "08:00", "close": "14:30"}]}}'::jsonb,
    false,
    '{"id": "Jl. Rotowijayan, Panembahan, Kecamatan Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta", "en": "Rotowijayan St., Panembahan, Kraton District, Yogyakarta City, Special Region of Yogyakarta"}'::jsonb,
    '{"id": "Jalur di dalam kompleks keraton berupa lantai marmer dan paving yang rata. Tersedia beberapa ramp untuk kursi roda di area pintu masuk utama. Parkir di area sisi barat dan timur.", "en": "Paths inside the complex are flat marble and paved floors. Several wheelchair ramps are available at the main entrance. Parking on the west and east sides."}'::jsonb,
    '[{"title": {"id": "Stasiun Tugu → Keraton Yogyakarta", "en": "Tugu Station → Yogyakarta Palace"}, "detail": {"id": "Berjalan kaki ~15 menit ke arah selatan atau menggunakan becak/ojek online.", "en": "Walk ~15 minutes southwards or use rickshaw/online ride-hailing."}}]'::jsonb,
    -7.8058, 110.3642
  ),
  (
    'taman-sari-yogyakarta', 'Taman Sari Yogyakarta', '{sejarah,heritage}'::text[], '3471',
    '{"url": "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Bekas taman istana dan kolam pemandian Keraton Yogyakarta dengan arsitektur campuran Jawa-Portugis.", "en": "Former royal garden and bathing complex of the Yogyakarta Palace with mixed Javanese-Portuguese architecture."}'::jsonb,
    15000, 4.3, 460,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "08:00", "close": "15:00"}], "tuesday": [{"open": "08:00", "close": "15:00"}], "wednesday": [{"open": "08:00", "close": "15:00"}], "thursday": [{"open": "08:00", "close": "15:00"}], "friday": [{"open": "08:00", "close": "15:00"}], "saturday": [{"open": "08:00", "close": "15:00"}], "sunday": [{"open": "08:00", "close": "15:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Taman, Patehan, Kecamatan Kraton, Kota Yogyakarta, Daerah Istimewa Yogyakarta", "en": "Taman St., Patehan, Kraton District, Yogyakarta City, Special Region of Yogyakarta"}'::jsonb,
    '{"id": "Banyak area berupa tangga sempit dan lorong bawah tanah. Tidak ramah kursi roda. Pengunjung harus berhati-hati di area kolam dan lorong.", "en": "Many areas feature narrow stairs and underground passages. Not wheelchair friendly. Visitors must be cautious around pools and passageways."}'::jsonb,
    '[{"title": {"id": "Keraton Yogyakarta → Taman Sari", "en": "Yogyakarta Palace → Taman Sari"}, "detail": {"id": "Berjalan kaki ~10 menit ke arah barat daya melewati permukiman.", "en": "Walk ~10 minutes southwest through residential area."}}]'::jsonb,
    -7.8095, 110.3587
  ),
  (
    'malioboro', 'Kawasan Malioboro', '{kuliner,budaya}'::text[], '3471',
    '{"url": "https://images.unsplash.com/photo-1569271720809-1f5f08e92e32?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawasan perbelanjaan dan kuliner ikonik di pusat Kota Yogyakarta dengan deretan toko, pedagang kaki lima, dan becak.", "en": "Iconic shopping and culinary district in the heart of Yogyakarta with rows of shops, street vendors, and rickshaws."}'::jsonb,
    0, 4.4, 1500,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Jl. Malioboro, Kecamatan Gedongtengen, Kota Yogyakarta, Daerah Istimewa Yogyakarta", "en": "Malioboro St., Gedongtengen District, Yogyakarta City, Special Region of Yogyakarta"}'::jsonb,
    '{"id": "Trotoar lebar dan jalur pedestrian tersedia di sepanjang jalan. Namun area pasar dan pedagang kaki lima cukup padat. Tersedia jalur disabilitas di trotoar utama.", "en": "Wide sidewalks and pedestrian paths are available along the street. However, market and street vendor areas are quite crowded. Disability paths available on main sidewalks."}'::jsonb,
    '[{"title": {"id": "Stasiun Tugu → Malioboro", "en": "Tugu Station → Malioboro"}, "detail": {"id": "Berjalan kaki langsung ke selatan ~5 menit sudah berada di kawasan Malioboro.", "en": "Walk directly south ~5 minutes to reach the Malioboro area."}}]'::jsonb,
    -7.7908, 110.3664
  ),
  (
    'gili-trawangan', 'Gili Trawangan', '{bahari,alam}'::text[], '5202',
    '{"url": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pulau tropis dengan pasir putih, air laut jernih, dan kehidupan malam yang ramai. Surga snorkeling dan diving di Lombok.", "en": "Tropical island with white sands, crystal clear waters, and vibrant nightlife. A snorkeling and diving paradise in Lombok."}'::jsonb,
    0, 4.5, 780,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Gili Indah, Kecamatan Pemenang, Kabupaten Lombok Utara, Nusa Tenggara Barat", "en": "Gili Indah, Pemenang District, North Lombok Regency, West Nusa Tenggara"}'::jsonb,
    '{"id": "Tidak ada kendaraan bermotor di pulau ini. Transportasi menggunakan sepeda atau cidomo (kereta kuda). Permukaan pasir menyulitkan kursi roda. Tidak ramah disabilitas.", "en": "No motorized vehicles on the island. Transportation by bicycle or cidomo (horse cart). Sandy surface makes wheelchair use difficult. Not disability friendly."}'::jsonb,
    '[{"title": {"id": "Bangsal Harbor → Gili Trawangan", "en": "Bangsal Harbor → Gili Trawangan"}, "detail": {"id": "Menggunakan kapal feri cepat ~30 menit atau public boat ~45 menit.", "en": "By fast ferry ~30 minutes or public boat ~45 minutes."}}, {"title": {"id": "Pelabuhan Senggigi → Bangsal", "en": "Senggigi Harbor → Bangsal"}, "detail": {"id": "Menggunakan kendaraan pribadi atau taksi ~20 menit.", "en": "By private vehicle or taxi ~20 minutes."}}]'::jsonb,
    -8.3500, 116.0378
  ),
  (
    'gunung-rinjani', 'Gunung Rinjani', '{alam,petualangan}'::text[], '5202',
    '{"url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi tertinggi kedua di Indonesia dengan kaldera dan Danau Segara Anak yang mempesona.", "en": "The second highest volcano in Indonesia featuring a stunning caldera and Lake Segara Anak."}'::jsonb,
    150000, 4.7, 340,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    true,
    '{"id": "Kawasan Taman Nasional Gunung Rinjani, Lombok, Nusa Tenggara Barat", "en": "Mount Rinjani National Park Area, Lombok, West Nusa Tenggara"}'::jsonb,
    '{"id": "Medan pendakian sangat berat dan terjal dengan jalur berbatu dan tanah longsor. Wajib menggunakan pemandu lokal profesional. Sangat tidak ramah disabilitas dan anak kecil.", "en": "Very difficult and steep climbing terrain with rocky paths and landslides. Professional local guides are mandatory. Not suitable for disabilities and young children."}'::jsonb,
    '[{"title": {"id": "Kota Mataram → Desa Senaru/Sembalun", "en": "Mataram City → Senaru/Sembalun Village"}, "detail": {"id": "Kendaraan pribadi atau travel ~2-3 jam menuju pintu masuk pendakian.", "en": "Private vehicle or travel car ~2-3 hours to the climbing entrance."}}, {"title": {"id": "Pendakian Rinjani", "en": "Rinjani Climb"}, "detail": {"id": "Pendakian 2-4 hari dengan pemandu wajib. Izin masuk taman nasional dan porter tersedia di pos pendakian.", "en": "2-4 day climb with mandatory guide. National park entry permits and porters available at climbing posts."}}]'::jsonb,
    -8.4131, 116.4583
  ),
  (
    'pantai-pink-lombok', 'Pantai Pink Lombok', '{bahari,alam}'::text[], '5202',
    '{"url": "https://images.unsplash.com/photo-1602002418082-a4443b0816a5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pantai dengan pasir berwarna pink alami akibat pecahan koral merah yang tercampur pasir putih.", "en": "Beach with naturally pink sand resulting from crushed red coral mixed with white sand."}'::jsonb,
    10000, 4.3, 280,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Sekaroh, Kecamatan Jerowaru, Kabupaten Lombok Timur, Nusa Tenggara Barat", "en": "Sekaroh, Jerowaru District, East Lombok Regency, West Nusa Tenggara"}'::jsonb,
    '{"id": "Akses jalan menuju pantai sebagian rusak dan berbatu. Area parkir dekat pantai namun permukaan berpasir menyulitkan kursi roda. Tidak ada jalur khusus difabel.", "en": "Road access to the beach is partly damaged and rocky. Parking is near the beach but sandy surface hinders wheelchairs. No special disability paths."}'::jsonb,
    '[{"title": {"id": "Kota Mataram → Pantai Pink", "en": "Mataram City → Pink Beach"}, "detail": {"id": "Menggunakan kendaraan pribadi ~2 jam ke arah tenggara melalui Kecamatan Jerowaru.", "en": "By private vehicle ~2 hours southeast through Jerowaru District."}}]'::jsonb,
    -8.8756, 116.4797
  ),
  (
    'taman-nasional-komodo', 'Taman Nasional Komodo', '{alam,bahari,petualangan}'::text[], '5315',
    '{"url": "https://images.unsplash.com/photo-1573583238277-2c7c456cac6b?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Taman nasional dan situs warisan dunia UNESCO yang menjadi habitat asli komodo, reptil purba terbesar di dunia.", "en": "National park and UNESCO World Heritage site, the natural habitat of the Komodo dragon, the largest living lizard on earth."}'::jsonb,
    150000, 4.8, 560,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Kecamatan Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur", "en": "Komodo District, West Manggarai Regency, East Nusa Tenggara"}'::jsonb,
    '{"id": "Akses menuju lokasi pengamatan komodo berupa jalan tanah berbatu dan trekking pendek melalui hutan kering. Tidak ramah kursi roda. Wajib ditemani ranger taman nasional.", "en": "Access to komodo viewing areas consists of rocky dirt paths and short treks through dry forest. Not wheelchair friendly. National park ranger escort is mandatory."}'::jsonb,
    '[{"title": {"id": "Pelabuhan Labuan Bajo → Loh Liang (Pulau Rinca)", "en": "Labuan Bajo Harbor → Loh Liang (Rinca Island)"}, "detail": {"id": "Menggunakan speedboat ~30 menit atau kapal phinisi ~1.5 jam.", "en": "By speedboat ~30 minutes or phinisi boat ~1.5 hours."}}]'::jsonb,
    -8.5502, 119.4898
  ),
  (
    'air-terjun-madakaripura', 'Air Terjun Madakaripura', '{alam,petualangan}'::text[], '3513',
    '{"url": "https://images.unsplash.com/photo-1433089060381-31b3e4ca2b0a?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Air terjun tertinggi di Jawa Timur dengan tebing curam dan semprotan air yang menyegarkan, terletak di kawasan Taman Nasional Bromo.", "en": "The highest waterfall in East Java with steep cliffs and refreshing mist, located in the Bromo National Park area."}'::jsonb,
    40000, 4.6, 310,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "16:00"}], "tuesday": [{"open": "07:00", "close": "16:00"}], "wednesday": [{"open": "07:00", "close": "16:00"}], "thursday": [{"open": "07:00", "close": "16:00"}], "friday": [{"open": "07:00", "close": "16:00"}], "saturday": [{"open": "07:00", "close": "16:00"}], "sunday": [{"open": "07:00", "close": "16:00"}]}}'::jsonb,
    true,
    '{"id": "Desa Sapi Kerep, Kecamatan Sukapura, Kabupaten Probolinggo, Jawa Timur", "en": "Sapi Kerep Village, Sukapura District, Probolinggo Regency, East Java"}'::jsonb,
    '{"id": "Jalur trekking menurun berupa jalan setapak batu dan anak sungai yang licin. Membutuhkan fisik prima. Tidak ramah kursi roda. Wajib menggunakan alas kaki anti slip.", "en": "Descending trekking path along stone walkways and slippery streams. Requires good physical condition. Not wheelchair friendly. Non-slip footwear mandatory."}'::jsonb,
    '[{"title": {"id": "Kota Probolinggo → Air Terjun Madakaripura", "en": "Probolinggo City → Madakaripura Waterfall"}, "detail": {"id": "Menggunakan kendaraan pribadi ~1.5 jam menuju Desa Sapi Kerep.", "en": "By private vehicle ~1.5 hours to Sapi Kerep Village."}}, {"title": {"id": "Pintu Masuk → Air Terjun", "en": "Entrance Gate → Waterfall"}, "detail": {"id": "Trekking jalan kaki menuruni bukit melewati tebing ~30-45 menit.", "en": "Trekking downhill through cliffs ~30-45 minutes."}}]'::jsonb,
    -7.8669, 113.3054
  ),
  (
    'kawah-ijen', 'Kawah Ijen', '{alam,petualangan}'::text[], '3510',
    '{"url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawah asam dengan blue fire yang langka serta danau kawah terbesar di Jawa. Fenomena api biru hanya terlihat sebelum fajar.", "en": "Acid crater with rare blue fire phenomenon and the largest acidic crater lake in Java. Blue fire visible only before dawn."}'::jsonb,
    100000, 4.7, 490,
    '{"timezone": "Asia/Jakarta", "is_24_hours": true, "periods": {}}'::jsonb,
    true,
    '{"id": "Licin, Kecamatan Licin, Kabupaten Banyuwangi, Jawa Timur", "en": "Licin, Licin District, Banyuwangi Regency, East Java"}'::jsonb,
    '{"id": "Jalur pendakian sepanjang ~3 km dengan kemiringan terjal dan permukaan berbatu. Sangat tidak ramah kursi roda. Masker wajib karena gas belerang beracun di sekitar kawah.", "en": "Climbing trail ~3 km long with steep incline and rocky surface. Not wheelchair friendly. Gas masks required due to toxic sulfur fumes near the crater."}'::jsonb,
    '[{"title": {"id": "Kota Banyuwangi → Pos Paltuding", "en": "Banyuwangi City → Paltuding Post"}, "detail": {"id": "Kendaraan pribadi atau sewa mobil ~1.5 jam menuju basecamp pendakian.", "en": "Private vehicle or rental car ~1.5 hours to the climbing basecamp."}}, {"title": {"id": "Pos Paltuding → Kawah Ijen", "en": "Paltuding Post → Ijen Crater"}, "detail": {"id": "Trekking jalan kaki ~1.5-2 jam mendaki bukit terjal.", "en": "Trekking on foot ~1.5-2 hours climbing steep hill."}}]'::jsonb,
    -8.0584, 114.2420
  ),
  (
    'jam-gadang', 'Jam Gadang', '{sejarah,heritage}'::text[], '1375',
    '{"url": "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Menara jam bersejarah ikonik Bukittinggi, peninggalan kolonial Belanda dengan arsitektur khas Minangkabau.", "en": "Iconic historic clock tower of Bukittinggi, a Dutch colonial legacy with distinctive Minangkabau architecture."}'::jsonb,
    10000, 4.4, 650,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "08:00", "close": "21:00"}], "tuesday": [{"open": "08:00", "close": "21:00"}], "wednesday": [{"open": "08:00", "close": "21:00"}], "thursday": [{"open": "08:00", "close": "21:00"}], "friday": [{"open": "08:00", "close": "21:00"}], "saturday": [{"open": "08:00", "close": "21:00"}], "sunday": [{"open": "08:00", "close": "21:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Jam Gadang, Pasa Kubu, Kecamatan Aur Birugo Tigo Baleh, Kota Bukittinggi, Sumatera Barat", "en": "Jam Gadang St., Pasa Kubu, Aur Birugo Tigo Baleh District, Bukittinggi City, West Sumatra"}'::jsonb,
    '{"id": "Area taman di sekitar Jam Gadang memiliki permukaan datar beraspal. Tersedia kursi taman dan area duduk. Namun akses ke puncak menara jam tidak memungkinkan untuk kursi roda.", "en": "The park area around Jam Gadang has flat paved surfaces. Benches and seating areas available. However, access to the top of the clock tower is not wheelchair accessible."}'::jsonb,
    '[{"title": {"id": "Kota Padang → Bukittinggi", "en": "Padang City → Bukittinggi"}, "detail": {"id": "Menggunakan bus travel ~3 jam dari Terminal Pasar Raya Padang ke Terminal Aur Kuning Bukittinggi.", "en": "By travel bus ~3 hours from Padang Pasar Raya Terminal to Aur Kuning Terminal Bukittinggi."}}]'::jsonb,
    -0.3025, 100.3695
  ),
  (
    'ngarai-sianok', 'Ngarai Sianok', '{alam,petualangan}'::text[], '1375',
    '{"url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Lembah curam dan jurang indah yang membelah Kota Bukittinggi dengan pemandangan hijau dan aliran sungai di dasarnya.", "en": "Steep valley and beautiful canyon dividing Bukittinggi city with lush green scenery and a river flowing at its base."}'::jsonb,
    15000, 4.5, 380,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "18:00"}], "tuesday": [{"open": "07:00", "close": "18:00"}], "wednesday": [{"open": "07:00", "close": "18:00"}], "thursday": [{"open": "07:00", "close": "18:00"}], "friday": [{"open": "07:00", "close": "18:00"}], "saturday": [{"open": "07:00", "close": "18:00"}], "sunday": [{"open": "07:00", "close": "18:00"}]}}'::jsonb,
    true,
    '{"id": "Kecamatan Guguk Panjang, Kota Bukittinggi, Sumatera Barat", "en": "Guguk Panjang District, Bukittinggi City, West Sumatra"}'::jsonb,
    '{"id": "Jalur pengamatan di tepi ngarai memiliki pagar pengaman dan permukaan beton yang rata. Namun trekking ke dasar ngarai memerlukan menuruni ratusan anak tangga curam.", "en": "Observation paths along the canyon edge have safety railings and flat concrete surfaces. However, trekking to the canyon floor requires descending hundreds of steep steps."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Bukittinggi → Ngarai Sianok", "en": "Bukittinggi City Center → Sianok Canyon"}, "detail": {"id": "Berjalan kaki ~15 menit dari Jam Gadang atau menggunakan ojek online.", "en": "Walk ~15 minutes from Jam Gadang or use online ride-hailing."}}]'::jsonb,
    -0.2930, 100.3592
  ),
  (
    'masjid-raya-baiturrahman', 'Masjid Raya Baiturrahman', '{religi,sejarah,budaya}'::text[], '1171',
    '{"url": "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Masjid bersejarah ikonik Banda Aceh dengan arsitektur megah berkubah hitam yang selamat dari tsunami 2004.", "en": "Iconic historic mosque of Banda Aceh with magnificent black dome architecture that survived the 2004 tsunami."}'::jsonb,
    0, 4.7, 810,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "05:00", "close": "22:00"}], "tuesday": [{"open": "05:00", "close": "22:00"}], "wednesday": [{"open": "05:00", "close": "22:00"}], "thursday": [{"open": "05:00", "close": "22:00"}], "friday": [{"open": "05:00", "close": "22:00"}], "saturday": [{"open": "05:00", "close": "22:00"}], "sunday": [{"open": "05:00", "close": "22:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Moh. Jam No.1, Kp. Baru, Kecamatan Baiturrahman, Kota Banda Aceh, Aceh", "en": "Moh. Jam St. No.1, Kp. Baru, Baiturrahman District, Banda Aceh City, Aceh"}'::jsonb,
    '{"id": "Area masjid seluruhnya berupa lantai marmer datar yang luas dan dapat diakses kursi roda. Tersedia ramp masuk di beberapa sisi dan toilet ramah disabilitas.", "en": "The entire mosque area features wide flat marble flooring accessible by wheelchair. Entry ramps available on several sides and disabled-friendly restrooms."}'::jsonb,
    '[{"title": {"id": "Bandara SIM → Masjid Raya Baiturrahman", "en": "SIM Airport → Baiturrahman Grand Mosque"}, "detail": {"id": "Menggunakan taksi online atau bus kota ~30 menit via Jl. Sultan Iskandar Muda.", "en": "By online taxi or city bus ~30 minutes via Sultan Iskandar Muda St."}}]'::jsonb,
    5.5533, 95.3172
  ),
  (
    'bunaken', 'Taman Laut Bunaken', '{bahari,alam}'::text[], '7171',
    '{"url": "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Taman laut dengan keanekaragaman hayati bawah laut tertinggi di dunia, terkenal dengan dinding terumbu karang vertikalnya.", "en": "Marine park with the highest underwater biodiversity in the world, famous for its vertical coral reef walls."}'::jsonb,
    50000, 4.7, 420,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Pulau Bunaken, Kecamatan Bunaken, Kota Manado, Sulawesi Utara", "en": "Bunaken Island, Bunaken District, Manado City, North Sulawesi"}'::jsonb,
    '{"id": "Akses menuju pulau menggunakan perahu dari dermaga Manado. Di pulau, jalan setapak tanah dan pasir sangat sulit untuk kursi roda. Spot diving dan snorkeling hanya dapat diakses dari perahu.", "en": "Access to the island is by boat from Manado harbor. On the island, dirt and sand paths are very difficult for wheelchairs. Diving and snorkeling spots are only accessible by boat."}'::jsonb,
    '[{"title": {"id": "Kota Manado → Dermaga Bunaken", "en": "Manado City → Bunaken Jetty"}, "detail": {"id": "Menggunakan taksi atau ojek ~20 menit menuju Dermaga Karavan atau Marina Megamas.", "en": "By taxi or ojek ~20 minutes to Karavan Jetty or Marina Megamas."}}, {"title": {"id": "Dermaga → Pulau Bunaken", "en": "Jetty → Bunaken Island"}, "detail": {"id": "Menggunakan perahu motor reguler / sewa speedboat ~30-45 menit.", "en": "By regular motorboat / rented speedboat ~30-45 minutes."}}]'::jsonb,
    1.6178, 124.7604
  ),
  (
    'tana-toraja-londa', 'Tana Toraja (Londa)', '{budaya,heritage,desa-wisata}'::text[], '7326',
    '{"url": "https://images.unsplash.com/photo-1597279091505-3e5038e2c4bd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kompleks makam batu alam Toraja dengan patung kayu (tau-tau) di tebing dan gua pemakaman adat yang unik.", "en": "Toraja natural stone grave complex with wooden effigies (tau-tau) on cliffs and unique traditional burial caves."}'::jsonb,
    40000, 4.6, 290,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Londa, Kecamatan Rantepao, Kabupaten Toraja Utara, Sulawesi Selatan", "en": "Londa, Rantepao District, North Toraja Regency, South Sulawesi"}'::jsonb,
    '{"id": "Area makam Londa berlokasi di tebing dengan jalan setapak berbatu. Gua pemakaman gelap dan lembab dengan lantai tidak rata. Sangat tidak ramah kursi roda. Senter diperlukan di dalam gua.", "en": "Londa burial site is on a cliffside with rocky footpaths. The burial cave is dark and damp with uneven floors. Not wheelchair friendly. Flashlight required inside the cave."}'::jsonb,
    '[{"title": {"id": "Kota Makassar → Rantepao (Toraja)", "en": "Makassar City → Rantepao (Toraja)"}, "detail": {"id": "Menggunakan bus travel malam atau mobil pribadi ~8-10 jam perjalanan darat.", "en": "By overnight travel bus or private car ~8-10 hours overland."}}, {"title": {"id": "Rantepao → Londa", "en": "Rantepao → Londa"}, "detail": {"id": "Menggunakan kendaraan pribadi atau ojek ~20 menit ke arah utara.", "en": "By private vehicle or ojek ~20 minutes northwards."}}]'::jsonb,
    -2.9684, 119.9001
  ),
  (
    'pantai-losari', 'Pantai Losari', '{bahari,kuliner}'::text[], '7371',
    '{"url": "https://images.unsplash.com/photo-1519046904884-53103b34b5b9?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kawasan tepi pantai ikonik Makassar dengan plaza terbuka, kursi taman, dan deretan pedagang kuliner seafood dan pisang epe.", "en": "Iconic Makassar waterfront area with an open plaza, garden benches, and rows of seafood and pisang epe street vendors."}'::jsonb,
    0, 4.2, 950,
    '{"timezone": "Asia/Makassar", "is_24_hours": true, "periods": {}}'::jsonb,
    false,
    '{"id": "Jl. Penghibur, Losari, Kecamatan Ujung Pandang, Kota Makassar, Sulawesi Selatan", "en": "Penghibur St., Losari, Ujung Pandang District, Makassar City, South Sulawesi"}'::jsonb,
    '{"id": "Plaza Losari memiliki permukaan lantai keramik yang rata dan luas, sangat ramah kursi roda. Tersedia jalur pedestrian lebar dan kursi taman di sepanjang area.", "en": "Losari Plaza has wide, flat ceramic flooring, very wheelchair friendly. Wide pedestrian paths and benches are available throughout the area."}'::jsonb,
    '[{"title": {"id": "Bandara Sultan Hasanuddin → Pantai Losari", "en": "Sultan Hasanuddin Airport → Losari Beach"}, "detail": {"id": "Menggunakan taksi online atau DAMRI bus ~30 menit.", "en": "By online taxi or DAMRI bus ~30 minutes."}}]'::jsonb,
    -5.1402, 119.4091
  ),
  (
    'pasar-terapung-banjarmasin', 'Pasar Terapung Banjarmasin', '{kuliner,budaya}'::text[], '6371',
    '{"url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pasar tradisional unik di atas sungai di mana para pedagang berjualan menggunakan perahu-perahu kecil di Sungai Martapura.", "en": "Unique traditional floating market on the river where traders sell goods from small boats on the Martapura River."}'::jsonb,
    0, 4.3, 370,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "11:00"}], "tuesday": [{"open": "06:00", "close": "11:00"}], "wednesday": [{"open": "06:00", "close": "11:00"}], "thursday": [{"open": "06:00", "close": "11:00"}], "friday": [{"open": "06:00", "close": "11:00"}], "saturday": [{"open": "06:00", "close": "11:00"}], "sunday": [{"open": "06:00", "close": "11:00"}]}}'::jsonb,
    false,
    '{"id": "Sungai Martapura, Kawasan Pasar Terapung Muara Kuin, Kota Banjarmasin, Kalimantan Selatan", "en": "Martapura River, Muara Kuin Floating Market Area, Banjarmasin City, South Kalimantan"}'::jsonb,
    '{"id": "Akses menuju pasar terapung menggunakan perahu klotok dari Dermaga Muara Kuin. Tidak ada akses kursi roda ke atas perahu. Dermaga kayu memiliki tangga turun yang curam.", "en": "Access to the floating market is by klotok boat from Muara Kuin Jetty. No wheelchair access onto the boats. The wooden jetty has steep descending steps."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Banjarmasin → Dermaga Muara Kuin", "en": "Banjarmasin City Center → Muara Kuin Jetty"}, "detail": {"id": "Menggunakan kendaraan pribadi atau taksi ~20 menit ke arah barat.", "en": "By private vehicle or taxi ~20 minutes westwards."}}, {"title": {"id": "Dermaga → Pasar Terapung", "en": "Jetty → Floating Market"}, "detail": {"id": "Menyewa perahu klotok motor ~30 menit menyusuri Sungai Martapura.", "en": "Rent a motorized klotok boat ~30 minutes along the Martapura River."}}]'::jsonb,
    -3.0010, 114.5918
  ),
  (
    'benteng-rotterdam', 'Fort Rotterdam', '{sejarah,heritage}'::text[], '7371',
    '{"url": "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Benteng peninggalan kolonial Belanda di pusat Makassar dengan arsitektur Eropa khas abad ke-17.", "en": "Dutch colonial fortress in the center of Makassar with distinctive 17th-century European architecture."}'::jsonb,
    15000, 4.3, 520,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "08:00", "close": "17:00"}], "tuesday": [{"open": "08:00", "close": "17:00"}], "wednesday": [{"open": "08:00", "close": "17:00"}], "thursday": [{"open": "08:00", "close": "17:00"}], "friday": [{"open": "08:00", "close": "17:00"}], "saturday": [{"open": "08:00", "close": "17:00"}], "sunday": [{"open": "08:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Ujung Pandang No.1, Bulogading, Kecamatan Ujung Pandang, Kota Makassar, Sulawesi Selatan", "en": "Ujung Pandang St. No.1, Bulogading, Ujung Pandang District, Makassar City, South Sulawesi"}'::jsonb,
    '{"id": "Area benteng memiliki halaman rumput luas dan jalan setapak paving yang rata. Sayangnya beberapa ruangan memiliki pintu sempit dan anak tangga. Tersedia toilet umum.", "en": "The fort area has a wide grassy courtyard and flat paved walkways. However, some rooms have narrow doors and steps. Public restrooms available."}'::jsonb,
    '[{"title": {"id": "Pantai Losari → Fort Rotterdam", "en": "Losari Beach → Fort Rotterdam"}, "detail": {"id": "Berjalan kaki ~10 menit ke arah timur atau menggunakan becak motor.", "en": "Walk ~10 minutes eastwards or use motorized rickshaw."}}]'::jsonb,
    -5.1334, 119.4051
  ),
  (
    'tangkuban-perahu', 'Tangkuban Perahu', '{alam,petualangan}'::text[], '3273',
    '{"url": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi aktif di utara Bandung dengan kawah yang dapat diakses langsung menggunakan kendaraan hingga ke bibir kawah.", "en": "Active volcano north of Bandung with a crater accessible directly by vehicle up to the crater edge."}'::jsonb,
    35000, 4.3, 670,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "07:00", "close": "17:00"}], "tuesday": [{"open": "07:00", "close": "17:00"}], "wednesday": [{"open": "07:00", "close": "17:00"}], "thursday": [{"open": "07:00", "close": "17:00"}], "friday": [{"open": "07:00", "close": "17:00"}], "saturday": [{"open": "07:00", "close": "17:00"}], "sunday": [{"open": "07:00", "close": "17:00"}]}}'::jsonb,
    false,
    '{"id": "Jl. Raya Tangkuban Perahu, Cikole, Kecamatan Lembang, Kabupaten Bandung Barat, Jawa Barat", "en": "Tangkuban Perahu Highway, Cikole, Lembang District, West Bandung Regency, West Java"}'::jsonb,
    '{"id": "Akses dari area parkir ke bibir kawah berupa jalan aspal landai. Kursi roda dapat mencapai tepi kawah utama Kawah Ratu dengan pendampingan. Tersedia area parkir luas dan toilet.", "en": "Access from parking to the crater edge is a sloping asphalt path. Wheelchairs can reach the main Kawah Ratu crater edge with assistance. Large parking area and restrooms available."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Bandung → Tangkuban Perahu", "en": "Bandung City Center → Tangkuban Perahu"}, "detail": {"id": "Menggunakan kendaraan pribadi atau travel ~1 jam melalui Lembang.", "en": "By private vehicle or travel car ~1 hour via Lembang."}}]'::jsonb,
    -6.7583, 107.6139
  ),
  (
    'gunung-papandayan', 'Gunung Papandayan', '{alam,petualangan}'::text[], '3205',
    '{"url": "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gunung berapi aktif dengan kawah belerang, hutan fosil, dan padang edelweiss yang indah di Garut.", "en": "Active volcano with sulfur craters, a fossil forest, and beautiful edelweiss fields in Garut."}'::jsonb,
    50000, 4.4, 310,
    '{"timezone": "Asia/Jakarta", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "17:00"}], "tuesday": [{"open": "06:00", "close": "17:00"}], "wednesday": [{"open": "06:00", "close": "17:00"}], "thursday": [{"open": "06:00", "close": "17:00"}], "friday": [{"open": "06:00", "close": "17:00"}], "saturday": [{"open": "06:00", "close": "17:00"}], "sunday": [{"open": "06:00", "close": "17:00"}]}}'::jsonb,
    true,
    '{"id": "Kecamatan Cisurupan, Kabupaten Garut, Jawa Barat", "en": "Cisurupan District, Garut Regency, West Java"}'::jsonb,
    '{"id": "Jalur pendakian berupa tanah vulkanik berpasir dan bebatuan. Area kawah memiliki gas belerang yang perlu diwaspadai. Tidak ramah kursi roda. Wajib menggunakan masker dan alas kaki yang sesuai.", "en": "Climbing trail consists of sandy volcanic soil and rocks. The crater area has sulfur fumes to be aware of. Not wheelchair friendly. Masks and appropriate footwear are mandatory."}'::jsonb,
    '[{"title": {"id": "Kota Garut → Gunung Papandayan", "en": "Garut City → Mount Papandayan"}, "detail": {"id": "Menggunakan kendaraan pribadi ~1 jam menuju Desa Cisurupan.", "en": "By private vehicle ~1 hour to Cisurupan Village."}}]'::jsonb,
    -7.3196, 107.7330
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
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 150000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 80000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 150000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 50000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 75000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 60000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 100000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 60000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 100000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 30000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 50000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 15000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 50000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-sari-yogyakarta'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 15000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-sari-yogyakarta'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 50000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'malioboro'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gili-trawangan'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 150000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 500000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-pink-lombok'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 10000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-nasional-komodo'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 150000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-nasional-komodo'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 350000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 40000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 100000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 100000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 250000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 10000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 25000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 15000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 25000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 50000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 150000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 40000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 75000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pasar-terapung-banjarmasin'), '{"id": "Pengunjung (Semua)", "en": "Visitor (All)"}'::jsonb, 0),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 15000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 50000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 35000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 100000),

  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan'), '{"id": "Pengunjung (WNI)", "en": "Visitor (WNI)"}'::jsonb, 50000),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan'), '{"id": "Wisatawan Asing (WNA)", "en": "Foreign Tourist (WNA)"}'::jsonb, 100000)
ON CONFLICT (entity_type, entity_id, name) DO NOTHING;

-- ── Seed Data: category_assignments (for category relations) 


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
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'souvenir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'akses-disabilitas'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-sari-yogyakarta')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-sari-yogyakarta')),

  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'malioboro')),
  ((SELECT id FROM directory.facilities WHERE slug = 'souvenir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'malioboro')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'malioboro')),

  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gili-trawangan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gili-trawangan')),

  ((SELECT id FROM directory.facilities WHERE slug = 'camping-area'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-pink-lombok')),

  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-nasional-komodo')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-nasional-komodo')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman')),
  ((SELECT id FROM directory.facilities WHERE slug = 'musholla'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman')),
  ((SELECT id FROM directory.facilities WHERE slug = 'akses-disabilitas'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari')),
  ((SELECT id FROM directory.facilities WHERE slug = 'akses-disabilitas'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pasar-terapung-banjarmasin')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'pasar-terapung-banjarmasin')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam')),
  ((SELECT id FROM directory.facilities WHERE slug = 'souvenir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu')),
  ((SELECT id FROM directory.facilities WHERE slug = 'spot-foto'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu')),
  ((SELECT id FROM directory.facilities WHERE slug = 'restoran'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu')),

  ((SELECT id FROM directory.facilities WHERE slug = 'parkir'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'toilet'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'camping-area'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan')),
  ((SELECT id FROM directory.facilities WHERE slug = 'pemandu-lokal'), 'attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan'))
ON CONFLICT (facility_id, entity_type, entity_id) DO NOTHING;

-- ── Seed Data: media (Polymorphic gallery)
INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), 'image', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-kuta'), 'image', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'monkey-forest-ubud'), 'image', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-empul'), 'image', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tanah-lot'), 'image', 'https://images.unsplash.com/photo-1621870933152-5a7e5b75b67b?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pura-besakih'), 'image', 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tirta-gangga'), 'image', 'https://images.unsplash.com/photo-1570168009544-f069c4db0e89?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'keraton-yogyakarta'), 'image', 'https://images.unsplash.com/photo-1579948943790-63287d63fb3e?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-sari-yogyakarta'), 'image', 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'malioboro'), 'image', 'https://images.unsplash.com/photo-1569271720809-1f5f08e92e32?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gili-trawangan'), 'image', 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-rinjani'), 'image', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-pink-lombok'), 'image', 'https://images.unsplash.com/photo-1602002418082-a4443b0816a5?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'taman-nasional-komodo'), 'image', 'https://images.unsplash.com/photo-1573583238277-2c7c456cac6b?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'air-terjun-madakaripura'), 'image', 'https://images.unsplash.com/photo-1433089060381-31b3e4ca2b0a?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'kawah-ijen'), 'image', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'jam-gadang'), 'image', 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'ngarai-sianok'), 'image', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'masjid-raya-baiturrahman'), 'image', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'bunaken'), 'image', 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tana-toraja-londa'), 'image', 'https://images.unsplash.com/photo-1597279091505-3e5038e2c4bd?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pantai-losari'), 'image', 'https://images.unsplash.com/photo-1519046904884-53103b34b5b9?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pasar-terapung-banjarmasin'), 'image', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'benteng-rotterdam'), 'image', 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'tangkuban-perahu'), 'image', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-papandayan'), 'image', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0)
ON CONFLICT (id) DO NOTHING;
