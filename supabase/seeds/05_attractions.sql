-- ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Seed Data: attractions ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
INSERT INTO directory.attractions (
  slug, name, destination_id, cover_image, description,
  min_price, rating_average, reviews_count, opening_hours, trekking,
  location_address, location_accessibility, location_directions, location_latitude, location_longitude
) VALUES
  (
    'pulau-padar-viewpoint', 'Pulau Padar Viewpoint', '5315',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Trekking ke viewpoint ikonik dengan pemandangan 3 teluk berpasir warna berbeda dari atas bukit.", "en": "Trekking to the iconic viewpoint with views of 3 different colored sandy bays from the hilltop."}'::jsonb,
    50000, 4.95, 412,
    '{"timezone": "Asia/Makassar", "is_24_hours": false, "periods": {"monday": [{"open": "06:00", "close": "18:00"}], "tuesday": [{"open": "06:00", "close": "18:00"}], "wednesday": [{"open": "06:00", "close": "18:00"}], "thursday": [{"open": "06:00", "close": "18:00"}], "friday": [{"open": "06:00", "close": "18:00"}], "saturday": [{"open": "06:00", "close": "18:00"}], "sunday": [{"open": "06:00", "close": "18:00"}]}}'::jsonb,
    true,
    '{"id": "Kepulauan Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Timur", "en": "Komodo Archipelago, West Manggarai Regency, East Nusa Tenggara"}'::jsonb,
    '{"id": "Berada di pulau terpencil tanpa fasilitas jalan raya. Akses menuju puncak viewpoint berupa jalur trekking tangga kayu berundak yang terjal dan melelahkan (sekitar 800 anak tangga). Tidak ramah disabilitas/kursi roda.", "en": "Located on a remote island with no road infrastructure. Access to the summit viewpoint is via a steep and tiring wooden stairway path (around 800 steps). Not suitable for wheelchairs or disability access."}'::jsonb,
    '[{"title": {"id": "Pelabuhan Labuan Bajo ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pulau Padar", "en": "Labuan Bajo Harbor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Padar Island"}, "detail": {"id": "Menggunakan Speedboat ~1.5 jam atau Kapal Phinisi ~3-4 jam.", "en": "By Speedboat ~1.5 hours or Phinisi Boat ~3-4 hours."}}, {"title": {"id": "Dermaga Pulau Padar ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pintu Masuk", "en": "Padar Island Jetty ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Entrance Gate"}, "detail": {"id": "Berjalan kaki menyusuri pantai pasir putih menuju pos registrasi.", "en": "Walk along the white sandy beach to the registration post."}}, {"title": {"id": "Pintu Masuk ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Puncak Viewpoint", "en": "Entrance ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Viewpoint Summit"}, "detail": {"id": "Trekking menanjak meniti tangga kayu sekitar 20-30 menit.", "en": "Trekking uphill climbing wooden steps for about 20-30 minutes."}}]'::jsonb,
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
    '{"id": "Tersedia ramp kursi roda di area pelataran candi. Namun, akses naik ke struktur candi utama berupa tangga batu sempit dan curam yang tidak mendukung kursi roda. Fasilitas persewaan kursi roda tersedia di dekat pintu masuk.", "en": "Wheelchair ramps are available in the temple courtyard. However, access to the main temple structure is via narrow, steep stone steps not suitable for wheelchairs. Wheelchair rental facilities are available near the entrance."}'::jsonb,
    '[{"title": {"id": "Stasiun/Bandara Yogyakarta ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Terminal Jombor", "en": "Yogyakarta Station/Airport ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Jombor Terminal"}, "detail": {"id": "Menggunakan bus TransJogja rute 2A atau taksi online ~30 menit.", "en": "Using TransJogja bus route 2A or online taxi ~30 minutes."}}, {"title": {"id": "Terminal Jombor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Terminal Borobudur", "en": "Jombor Terminal ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Borobudur Terminal"}, "detail": {"id": "Menggunakan bus lokal jurusan Borobudur ~1 jam Ãƒâ€šÃ‚Â· Rp 20.000/orang.", "en": "Using local bus heading to Borobudur ~1 hour Ãƒâ€šÃ‚Â· Rp 20,000/person."}}, {"title": {"id": "Terminal Borobudur ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pintu Masuk Candi", "en": "Borobudur Terminal ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Temple Entrance"}, "detail": {"id": "Berjalan kaki ~10 menit atau menggunakan andong/becak lokal.", "en": "Walk ~10 minutes or use local horse cart (andong)/rickshaw (becak)."}}]'::jsonb,
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
    '{"id": "Medan berpasir tebal dan berbukit. Akses ke kawah memerlukan perjalanan menanjak melewati tangga beton curam berdebu. Sangat tidak ramah kursi roda. Disarankan menyewa kuda untuk menuju kaki tangga.", "en": "Sandy, dusty, and hilly terrain. Access to the crater requires climbing steep concrete steps. Highly unsuitable for wheelchairs. Renting a horse to reach the base of the stairs is recommended."}'::jsonb,
    '[{"title": {"id": "Kota Malang/Probolinggo ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pos Cemoro Lawang", "en": "Malang/Probolinggo City ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Cemoro Lawang Post"}, "detail": {"id": "Kendaraan pribadi atau travel lokal ~2-3 jam.", "en": "Private vehicle or local travel car ~2-3 hours."}}, {"title": {"id": "Cemoro Lawang ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Lautan Pasir (Sanktuari Bromo)", "en": "Cemoro Lawang ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Sea of Sand (Bromo Sanctuary)"}, "detail": {"id": "Wajib sewa Jip 4x4 lokal ~30 menit.", "en": "Must rent local 4x4 Jeep ~30 minutes."}}, {"title": {"id": "Lautan Pasir ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kawah Bromo", "en": "Sea of Sand ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Bromo Crater"}, "detail": {"id": "Berjalan kaki/sewa kuda melewati tangga sebanyak 250 anak tangga.", "en": "Walk/rent a horse then climb the 250 concrete steps."}}]'::jsonb,
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
    '{"id": "Sangat ramah disabilitas dan lansia. Area taman dan tepi danau memiliki jalur pedestrian beraspal/semen yang datar tanpa undakan. Toilet ramah disabilitas tersedia di area parkir utama.", "en": "Very disability and elderly-friendly. The garden and lakeside areas feature flat, paved pedestrian paths without steps. Disabled-friendly restrooms are available in the main parking lot."}'::jsonb,
    '[{"title": {"id": "Bandara I Gusti Ngurah Rai ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Candikuning, Bedugul", "en": "I Gusti Ngurah Rai Airport ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Candikuning, Bedugul"}, "detail": {"id": "Menggunakan taksi charter / sewa mobil ~1.5 - 2 jam.", "en": "By chartered taxi / rental car ~1.5 - 2 hours."}}, {"title": {"id": "Jl. Raya Denpasar-Singaraja ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pura Ulun Danu", "en": "Denpasar-Singaraja Highway ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Ulun Danu Temple"}, "detail": {"id": "Belok kanan tepat di gerbang Bedugul, parkir langsung di depan gerbang pura.", "en": "Turn right at Bedugul gate, park directly in front of the temple gate."}}]'::jsonb,
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
    '{"id": "Akses area parkir cukup dekat dengan bibir pantai, namun permukaan berpasir membuat kursi roda sulit bergerak secara mandiri. Belum tersedia jalur khusus kursi roda hingga ke tepi air.", "en": "The parking area is close to the shoreline, but the sandy surface makes it difficult for wheelchairs to move independently. Wheelchair ramps to the water edge are not yet available."}'::jsonb,
    '[{"title": {"id": "Bandara Internasional Lombok ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kuta Mandalika", "en": "Lombok International Airport ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kuta Mandalika"}, "detail": {"id": "Kendaraan roda 4 / taksi online ~30 menit via Jl. Bypass Bandara.", "en": "Four-wheeled vehicle / online taxi ~30 minutes via Airport Bypass St."}}, {"title": {"id": "Kuta Mandalika ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pantai Tanjung Aan", "en": "Kuta Mandalika ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Tanjung Aan Beach"}, "detail": {"id": "Kendaraan pribadi/sepeda motor ~15 menit ke arah timur melewati Bukit Merese.", "en": "Private vehicle/motorcycle ~15 minutes eastwards passing Merese Hill."}}]'::jsonb,
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
    '{"id": "Aksesibilitas sangat baik dengan jalur pedestrian beraspal halus yang luas dan landai. Kursi roda dan stroller bayi dapat bergerak dengan mudah di seluruh area luar candi. Layanan sewa kursi roda gratis tersedia di pos informasi.", "en": "Excellent accessibility with wide, smooth paved paths. Wheelchairs and baby strollers can move easily around the entire temple complex. Free wheelchair rental is available at the information desk."}'::jsonb,
    '[{"title": {"id": "Pusat Kota Yogyakarta ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Stasiun Lempuyangan/Tugu", "en": "Yogyakarta City Center ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Lempuyangan/Tugu Station"}, "detail": {"id": "Menggunakan kereta KRL komuter tujuan Solo ~10 menit.", "en": "By KRL commuter train bound for Solo ~10 minutes."}}, {"title": {"id": "Stasiun Brambanan ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kompleks Candi Prambanan", "en": "Brambanan Station ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Prambanan Temple Complex"}, "detail": {"id": "Berjalan kaki ~10 menit ke arah utara atau menggunakan ojek online.", "en": "Walk ~10 minutes northwards or use online ride-hailing services."}}]'::jsonb,
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
    '{"id": "Area wisata tepi danau sebagian besar dapat diakses kendaraan, namun akses menuju dermaga penyeberangan kapal memiliki tangga kayu/semen yang tidak mendukung kursi roda mandiri.", "en": "Most lakeside tourist areas are accessible by vehicles, but access to the boat piers features wooden/concrete steps that do not support independent wheelchairs."}'::jsonb,
    '[{"title": {"id": "Kota Medan ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Parapat (Danau Toba)", "en": "Medan City ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Parapat (Lake Toba)"}, "detail": {"id": "Menggunakan mobil travel atau kereta api Medan-Siantar dilanjut bus lokal ~4-5 jam.", "en": "By travel car or Medan-Siantar train followed by local bus ~4-5 hours."}}, {"title": {"id": "Pelabuhan Ajibata/Tiga Raja ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pulau Samosir", "en": "Ajibata/Tiga Raja Harbor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Samosir Island"}, "detail": {"id": "Menyeberang menggunakan Kapal Feri Tao Toba ~45 menit Ãƒâ€šÃ‚Â· Rp 15.000/orang.", "en": "Cross using Tao Toba Ferry boat ~45 minutes Ãƒâ€šÃ‚Â· Rp 15,000/person."}}]'::jsonb,
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
    '{"id": "Sangat ekstrem dan berbahaya. Pendakian ke puncak viewpoint berupa tebing batu karst yang terjal, tajam, tanpa tangga pengaman, dan harus memanjat menggunakan tali tambang manual. Wajib menggunakan sepatu gunung dan pemandu. Sangat tidak ramah anak/lansia/disabilitas.", "en": "Extremely rugged and hazardous. Climbing to the viewpoint involves scaling steep, sharp limestone karst cliffs with no safety railings, holding onto manual ropes. Trail shoes and guides are mandatory. Unsuitable for children/elderly/disabled."}'::jsonb,
    '[{"title": {"id": "Bandara Sorong ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Pelabuhan Rakyat Sorong", "en": "Sorong Airport ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Sorong Harbor"}, "detail": {"id": "Menggunakan taksi lokal atau ojek ~15 menit.", "en": "Using local taxi or motorcycle taxi ~15 minutes."}}, {"title": {"id": "Pelabuhan Sorong ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Waisai (Ibu Kota Raja Ampat)", "en": "Sorong Harbor ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Waisai (Raja Ampat Capital)"}, "detail": {"id": "Kapal Feri cepat ~2 jam Ãƒâ€šÃ‚Â· Rp 125.000 - Rp 220.000/orang.", "en": "Express Ferry boat ~2 hours Ãƒâ€šÃ‚Â· Rp 125,000 - Rp 220,000/person."}}, {"title": {"id": "Waisai ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kepulauan Wayag", "en": "Waisai ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Wayag Archipelago"}, "detail": {"id": "Sewa Speedboat charter (kapasitas 8-10 orang) ~3-4 jam perjalanan laut.", "en": "Rent a chartered Speedboat (capacity 8-10 people) ~3-4 hours sea trip."}}]'::jsonb,
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
    '{"id": "Jalur trekking berupa jalan tanah hutan, menyeberangi aliran sungai dangkal berbatu, dan menyusuri selokan air beton sempit. Membutuhkan fisik prima dan pemandu lokal. Sangat tidak ramah kursi roda/disabilitas.", "en": "The trekking trail consists of forest dirt paths, crossing shallow rocky streams, and walking along narrow concrete water channels. Requires prime physical condition and local guides. Not suitable for wheelchairs/disability."}'::jsonb,
    '[{"title": {"id": "Kota Mataram ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Desa Senaru (Kaki Rinjani)", "en": "Mataram City ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Senaru Village (Rinjani Base)"}, "detail": {"id": "Menggunakan sewa mobil atau travel ~2.5 - 3 jam perjalanan darat.", "en": "By car rental or travel car ~2.5 - 3 hours overland trip."}}, {"title": {"id": "Pintu Masuk Senaru ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Air Terjun Sendang Gile & Tiu Kelep", "en": "Senaru Gate ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Sendang Gile & Tiu Kelep Waterfall"}, "detail": {"id": "Trekking jalan kaki menyusuri hutan adat Senaru ~45 menit.", "en": "Trekking on foot along the Senaru traditional forest for ~45 minutes."}}]'::jsonb,
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
    '{"id": "Aksesibilitas cukup baik. Dari area parkir atas tersedia jembatan kayu landai langsung menuju tepian kawah yang dapat dilalui kursi roda dengan pendampingan. Angkutan ontang-anting untuk naik memiliki undakan tangga tinggi.", "en": "Reasonably accessible. A flat wooden ramp bridge leads directly from the upper parking area to the crater edge, usable by wheelchairs with assistance. The ontang-anting shuttle buses have high step entrances."}'::jsonb,
    '[{"title": {"id": "Stasiun Bandung ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Terminal Leuwi Panjang", "en": "Bandung Station ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Leuwi Panjang Terminal"}, "detail": {"id": "Menggunakan angkot atau taksi online ~20-30 menit.", "en": "Using angkot minibus or online taxi ~20-30 minutes."}}, {"title": {"id": "Terminal Leuwi Panjang ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Terminal Ciwidey", "en": "Leuwi Panjang Terminal ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Ciwidey Terminal"}, "detail": {"id": "Menggunakan bus L300 / Elf lokal ~1.5 jam Ãƒâ€šÃ‚Â· Rp 20.000/orang.", "en": "Using local L300 minibus / Elf shuttle ~1.5 hours Ãƒâ€šÃ‚Â· Rp 20,000/person."}}, {"title": {"id": "Terminal Ciwidey ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Gerbang Kawah Putih", "en": "Ciwidey Terminal ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ Kawah Putih Gate"}, "detail": {"id": "Menggunakan angkot kuning jurusan Patengan ~15 menit, lanjut Ontang-anting ke kawah.", "en": "Using yellow Patengan angkot ~15 mins, then take the Ontang-anting shuttle to crater."}}]'::jsonb,
    -7.1662, 107.4021
  )
ON CONFLICT (slug) DO NOTHING;

-- ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Seed Data: price_tiers (Polymorphic tiers) ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬
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

-- ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Seed Data: category_assignments (for category relations) 
INSERT INTO directory.attraction_categories (attraction_id, taxonomy_id) VALUES
  ((SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan'), (SELECT id FROM directory.taxonomies WHERE slug = 'religi' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'pura-ulun-danu-beratan'), (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan'), (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'pantai-tanjung-aan'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), (SELECT id FROM directory.taxonomies WHERE slug = 'sejarah' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), (SELECT id FROM directory.taxonomies WHERE slug = 'heritage' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'candi-prambanan'), (SELECT id FROM directory.taxonomies WHERE slug = 'budaya' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'danau-toba'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'danau-toba'), (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint'), (SELECT id FROM directory.taxonomies WHERE slug = 'bahari' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'wayag-viewpoint'), (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category')),
  ((SELECT id FROM directory.attractions WHERE slug = 'air-terjun-tiu-kelep'), (SELECT id FROM directory.taxonomies WHERE slug = 'petualangan' AND type = 'category')),
  
  ((SELECT id FROM directory.attractions WHERE slug = 'kawah-putih-ciwidey'), (SELECT id FROM directory.taxonomies WHERE slug = 'alam' AND type = 'category'))
ON CONFLICT (attraction_id, taxonomy_id) DO NOTHING;

-- ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Seed Data: facility_assignments (for facility relations)
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

-- ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Seed Data: media (Polymorphic gallery)
INSERT INTO directory.media (entity_type, entity_id, type, url, metadata, sort_order) VALUES
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'pulau-padar-viewpoint'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'candi-borobudur'), 'image', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0),
  ('attraction', (SELECT id FROM directory.attractions WHERE slug = 'gunung-bromo'), 'image', 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', '{}'::jsonb, 0)
ON CONFLICT (id) DO NOTHING;
