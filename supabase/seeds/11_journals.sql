-- ── Seed Data: creators (Dimas & Nadia) ───────────────────────
INSERT INTO directory.creators (id, slug, name, display_name, avatar, bio, is_verified) VALUES
  (
    'creator-dimas-prasetyo',
    'dimas-prasetyo',
    'Dimas Prasetyo',
    'Dimas',
    '{"url": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", "blurhash": null, "base64": null}'::jsonb,
    '{"id": "Traveler santai yang menyukai pantai dan fotografi alam.", "en": "Leisure traveler who loves beaches and nature photography."}'::jsonb,
    false
  ),
  (
    'creator-nadia-ananta',
    'nadia-ananta',
    'Nadia Ananta',
    'Nadia',
    '{"url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", "blurhash": null, "base64": null}'::jsonb,
    '{"id": "Pengejar matahari terbit dan penjelajah bukit tersembunyi.", "en": "Sunrise chaser and hidden hills explorer."}'::jsonb,
    false
  )
ON CONFLICT (id) DO NOTHING;

-- ── Seed Data: journals ───────────────────────────────────────
INSERT INTO directory.journals (
  id, slug, title, destination_id, author_id, cover_image, description, content,
  categories, rating_average, reviews_count, likes_count, views_count
) VALUES
  (
    'journal-lombok-001',
    'petualangan-tak-terlupakan-di-lombok-tengah',
    '{"id": "Petualangan tak terlupakan", "en": "An Unforgettable Adventure"}'::jsonb,
    '5202', -- Lombok Tengah
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Tiga hari keliling, highlight-nya jelas pemandangan yang luar biasa!", "en": "Three days tour, the highlight is definitely the gorgeous scenery!"}'::jsonb,
    '{"id": "Perjalanan ke Lombok Tengah kali ini sangat berkesan. Kami mengunjungi Pantai Kuta Lombok, Bukit Merese, dan Desa Sade. Pemandangan bukit hijau yang berbatasan langsung dengan samudra biru sungguh menawan.", "en": "This trip to Central Lombok was very memorable. We visited Kuta Lombok Beach, Merese Hill, and Sade Village. The views of green hills bordering the blue ocean were stunning."}'::jsonb,
    '{alam,petualangan}'::text[],
    4.85, 12, 48, 240
  ),
  (
    'journal-lombok-002',
    'sunrise-yang-tak-terlupakan-di-merese',
    '{"id": "Sunrise yang tak terlupakan", "en": "Unforgettable Sunrise"}'::jsonb,
    '5202', -- Lombok Tengah
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Trek pagi ke puncak worth it banget. Pemandangan luar biasa!", "en": "Morning trek to the peak was totally worth it. Incredible views!"}'::jsonb,
    '{"id": "Trekking pagi hari di Bukit Merese untuk menyaksikan matahari terbit adalah salah satu keputusan terbaik. Udara segar dan pemandangan laut selatan yang tenang menyambut kami di puncak.", "en": "Trekking up Merese Hill in the morning to watch the sunrise was one of the best decisions. Fresh air and peaceful views of the southern sea welcomed us at the summit."}'::jsonb,
    '{alam,petualangan}'::text[],
    4.90, 8, 31, 150
  ),
  (
    'journal-jogja-001',
    'menyusuri-keindahan-candi-prambanan',
    '{"id": "Menyusuri keindahan Prambanan", "en": "Exploring the Beauty of Prambanan"}'::jsonb,
    '3404', -- Sleman
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Kemegahan arsitektur candi Hindu terbesar di Indonesia.", "en": "The architectural grandeur of the largest Hindu temple in Indonesia."}'::jsonb,
    '{"id": "Mengunjungi Prambanan di sore hari memberikan pemandangan siluet candi yang sangat eksotis berlatar langit senja kemerahan. Sangat memukau.", "en": "Visiting Prambanan in the afternoon offers an exotic silhouette of the temple against a reddish twilight sky. Truly captivating."}'::jsonb,
    '{budaya,sejarah}'::text[],
    4.90, 15, 62, 310
  ),
  (
    'journal-jogja-002',
    'kuliner-malam-legendaris-di-malioboro',
    '{"id": "Kuliner malam Malioboro", "en": "Legendary Malioboro Night Culinary"}'::jsonb,
    '3471', -- Yogyakarta
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gudeg mercon dan kopi joss yang menggugah selera.", "en": "Appetizing Gudeg Mercon and Kopi Joss."}'::jsonb,
    '{"id": "Malam hari di Yogyakarta tidak lengkap tanpa mencoba kopi joss di dekat stasiun tugu dan seporsi gudeg mercon pedas yang legendaris di sepanjang jalan Malioboro.", "en": "A night in Yogyakarta is incomplete without trying Kopi Joss near Tugu Station and a portion of legendary spicy Gudeg Mercon along Malioboro street."}'::jsonb,
    '{kuliner}'::text[],
    4.75, 20, 55, 280
  ),
  (
    'journal-jogja-003',
    'merapi-lava-tour-uji-adrenalin',
    '{"id": "Merapi Lava Tour", "en": "Merapi Lava Tour Adrenaline Rush"}'::jsonb,
    '3404', -- Sleman
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Offroad seru menggunakan jeep di lereng Merapi.", "en": "Exciting offroad jeep tour on the slopes of Merapi."}'::jsonb,
    '{"id": "Menyusuri bekas aliran lava panas letusan Merapi tahun 2010 dengan mobil jeep terbuka. Melewati rintangan air dan debu berbatu sangat memacu adrenalin.", "en": "Traversing the former hot lava flows of the 2010 Merapi eruption in an open jeep. Going through water obstacles and rocky dust really gets the adrenaline pumping."}'::jsonb,
    '{petualangan,alam}'::text[],
    4.80, 18, 70, 340
  ),
  (
    'journal-magelang-001',
    'megahnya-borobudur-di-kala-fajar',
    '{"id": "Megahnya Borobudur di kala fajar", "en": "Magnificent Borobudur at Dawn"}'::jsonb,
    '3308', -- Magelang
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Momen magis menyaksikan matahari terbit di atas stupa Borobudur.", "en": "Magical moment witnessing sunrise over Borobudur stupas."}'::jsonb,
    '{"id": "Menembus kabut pagi demi berdiri di antara stupa-stupa candi Buddha terbesar di dunia. Pemandangan fajar keemasan menyinari perbukitan Menoreh sungguh tak ternilai.", "en": "Piercing the morning mist to stand among the stupas of the world''s largest Buddhist temple. The view of the golden dawn illuminating the Menoreh hills is priceless."}'::jsonb,
    '{heritage,sejarah,budaya}'::text[],
    4.95, 25, 110, 480
  ),
  (
    'journal-magelang-002',
    'menjelajahi-pedesaan-sekitar-candi',
    '{"id": "Menjelajahi pedesaan sekitar candi", "en": "Exploring Villages Around Borobudur"}'::jsonb,
    '3308', -- Magelang
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Gowes sepeda santai menikmati sawah dan kerajinan gerabah.", "en": "Leisurely bicycling to enjoy rice fields and pottery making."}'::jsonb,
    '{"id": "Bersepeda melewati desa-desa wisata di Magelang, melihat pembuatan gerabah tradisional, and makan siang dengan menu sayur lodeh hangat di pinggir sawah.", "en": "Cycling through tourist villages in Magelang, watching traditional pottery making, and having lunch with warm Sayur Lodeh by the rice fields."}'::jsonb,
    '{desa-wisata,budaya}'::text[],
    4.70, 9, 28, 120
  ),
  (
    'journal-bandung-001',
    'kabut-pagi-syahdu-di-kawah-putih',
    '{"id": "Kabut pagi di Kawah Putih", "en": "Serene Morning Mist at Kawah Putih"}'::jsonb,
    '3273', -- Bandung
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pemandangan kawah belerang berwarna toska dibalut kabut dingin.", "en": "Stunning view of turquoise sulfur crater wrapped in cool mist."}'::jsonb,
    '{"id": "Kawah Putih Ciwidey menawarkan suasana misterius sekaligus indah. Pemandangan air kawah berwarna putih kehijauan dengan pohon-pohon kering tanpa daun sangat instagramable.", "en": "Kawah Putih Ciwidey offers a mysterious yet beautiful atmosphere. The greenish-white crater water against bare, dry trees is very Instagrammable."}'::jsonb,
    '{alam}'::text[],
    4.80, 14, 52, 210
  ),
  (
    'journal-bandung-002',
    'wisata-kuliner-dago-yang-kekinian',
    '{"id": "Wisata kuliner Dago", "en": "Trendy Dago Culinary Tour"}'::jsonb,
    '3273', -- Bandung
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Menikmati kopi hangat di kafe estetik dengan pemandangan kota.", "en": "Enjoying warm coffee in aesthetic cafes with city views."}'::jsonb,
    '{"id": "Area Dago atas selalu sukses memanjakan pecinta kuliner. Kedai kopi bernuansa semi-outdoor menyuguhkan pemandangan lampu kota Bandung di malam hari yang romantis.", "en": "The Upper Dago area never fails to pamper food lovers. Semi-outdoor coffee shops offer romantic views of Bandung city lights at night."}'::jsonb,
    '{kuliner}'::text[],
    4.65, 11, 40, 190
  ),
  (
    'journal-garut-001',
    'relaksasi-air-panas-alami-cipanas-garut',
    '{"id": "Relaksasi Cipanas Garut", "en": "Natural Hot Spring Relaxation in Garut"}'::jsonb,
    '3205', -- Garut
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Melepas lelah dengan berendam di air panas alami kaki Gunung Guntur.", "en": "Relaxing by soaking in natural hot springs at the foot of Mount Guntur."}'::jsonb,
    '{"id": "Setelah lelah berjalan-jalan di Garut, berendam air panas alami yang mengandung belerang di Cipanas sangat membantu meregangkan otot-otot yang tegang.", "en": "After a tiring walk around Garut, soaking in natural sulfur hot springs in Cipanas works wonders to relax tense muscles."}'::jsonb,
    '{alam}'::text[],
    4.70, 7, 25, 130
  ),
  (
    'journal-bromo-001',
    'golden-sunrise-penanjakan-bromo',
    '{"id": "Golden Sunrise Penanjakan Bromo", "en": "Bromo Golden Sunrise at Penanjakan"}'::jsonb,
    '3513', -- Probolinggo
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Menyaksikan hamparan lautan pasir Bromo dari ketinggian.", "en": "Watching the vast Bromo sea of sand from the heights."}'::jsonb,
    '{"id": "Berangkat jam 3 pagi menggunakan jeep menuju Penanjakan 1. Menunggu fajar menyinari Gunung Bromo, Batok, dan Semeru yang berselimut kabut tebal layaknya negeri di atas awan.", "en": "Departed at 3 AM by jeep to Penanjakan 1. Waiting for the dawn to illuminate Mount Bromo, Batok, and Semeru wrapped in thick mist like a land above the clouds."}'::jsonb,
    '{alam,petualangan}'::text[],
    4.95, 30, 140, 600
  ),
  (
    'journal-bromo-002',
    'berkuda-menyeberangi-lautan-pasir-bromo',
    '{"id": "Berkuda di lautan pasir Bromo", "en": "Horseback Riding on Bromo Sand Sea"}'::jsonb,
    '3513', -- Probolinggo
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Sensasi seru melintasi kaldera berpasir menuju tangga kawah.", "en": "Exciting sensation crossing the sandy caldera to the crater stairs."}'::jsonb,
    '{"id": "Menyusuri kaldera pasir berbisik dengan menunggangi kuda sewaan penduduk lokal Tengger. Udara dingin bercampur angin kencang membuat suasana terasa sangat dramatis.", "en": "Traversing the Whispering Sands caldera on a rented horse from local Tenggerese. The cold air mixed with strong winds makes the atmosphere feel highly dramatic."}'::jsonb,
    '{petualangan}'::text[],
    4.80, 16, 45, 190
  ),
  (
    'journal-surabaya-001',
    'wisata-sejarah-jembatan-merah-surabaya',
    '{"id": "Sejarah Jembatan Merah", "en": "Historic Red Bridge of Surabaya"}'::jsonb,
    '3578', -- Surabaya
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Mengenang perjuangan arek-arek Suroboyo di masa kolonial.", "en": "Remembering the struggle of Surabaya youths in the colonial era."}'::jsonb,
    '{"id": "Berjalan menyusuri kawasan kota tua Surabaya di sekitar Jembatan Merah. Bangunan-bangunan tua peninggalan Belanda masih terawat dengan baik di kawasan ini.", "en": "Walking through the old town area of Surabaya around the Red Bridge. Old Dutch colonial buildings are still well-preserved in this heritage site."}'::jsonb,
    '{sejarah,heritage}'::text[],
    4.55, 6, 22, 95
  ),
  (
    'journal-malang-001',
    'metik-apel-langsung-dari-pohon-di-batu',
    '{"id": "Metik apel Batu", "en": "Picking Apples Directly in Batu"}'::jsonb,
    '3573', -- Malang
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Keseruan memanen buah apel segar di agrowisata keluarga.", "en": "Fun of harvesting fresh apples in a family agrotourism."}'::jsonb,
    '{"id": "Kota Batu memiliki banyak kebun apel mandiri. Pengunjung boleh memetik apel sepuasnya dan memakannya langsung di tempat sambil menikmati udara sejuk khas pegunungan.", "en": "Batu city has many private apple orchards. Visitors can pick as many apples as they want and eat them fresh on the spot while enjoying the cool mountain air."}'::jsonb,
    '{alam,kuliner}'::text[],
    4.75, 13, 38, 170
  ),
  (
    'journal-banyuwangi-001',
    'misteri-blue-fire-kawah-ijen',
    '{"id": "Misteri Blue Fire Kawah Ijen", "en": "Mystery of Ijen Blue Fire"}'::jsonb,
    '3510', -- Banyuwangi
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Pendakian malam demi melihat fenomena api biru langka dunia.", "en": "Night hiking to witness the world''s rare blue fire phenomenon."}'::jsonb,
    '{"id": "Mulai mendaki jam 1 dini hari di suhu super dingin. Turun ke dasar kawah yang curam demi melihat api biru belerang yang spektakuler. Pengalaman sekali seumur hidup!", "en": "Started hiking at 1 AM in freezing temperatures. Descended to the steep crater floor to see the spectacular sulfur blue fire. A once in a lifetime experience!"}'::jsonb,
    '{alam,petualangan}'::text[],
    4.90, 22, 95, 410
  ),
  (
    'journal-banyuwangi-002',
    'padang-savana-ala-afrika-di-baluran',
    '{"id": "Padang Savana Baluran", "en": "Africa-like Savanna in Baluran"}'::jsonb,
    '3510', -- Banyuwangi
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Melihat satwa liar berkeliaran bebas di savana Bekol.", "en": "Seeing wild animals roaming free in Bekol savanna."}'::jsonb,
    '{"id": "Taman Nasional Baluran menghadirkan panorama padang rumput savana Bekol berlatar belakang Gunung Baluran yang gagah. Banyak rusa, kera, dan burung merak liar berkeliaran.", "en": "Baluran National Park presents the Bekol savanna grassland panorama against the majestic Mount Baluran. Many wild deer, monkeys, and peacocks roam freely."}'::jsonb,
    '{alam}'::text[],
    4.80, 15, 48, 230
  ),
  (
    'journal-bali-001',
    'sunset-romantis-tanah-lot-bali',
    '{"id": "Sunset romantis Tanah Lot", "en": "Romantic Sunset at Tanah Lot Bali"}'::jsonb,
    '5171', -- Denpasar
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Keindahan pura di atas tebing batu karang dengan deburan ombak.", "en": "Stunning cliff temple on a rocky shore with crashing waves."}'::jsonb,
    '{"id": "Tanah Lot selalu ramai menjelang senja. Melihat matahari terbenam tepat di balik pura yang berdiri megah di tengah laut adalah momen yang sangat magis.", "en": "Tanah Lot is always crowded before sunset. Watching the sun set right behind the temple standing majestically in the middle of the sea is a magical moment."}'::jsonb,
    '{budaya,bahari}'::text[],
    4.85, 28, 120, 520
  ),
  (
    'journal-bali-002',
    'sawah-terasering-tegalalang-ubud',
    '{"id": "Sawah terasering Tegalalang", "en": "Tegalalang Rice Terraces in Ubud"}'::jsonb,
    '5104', -- Gianyar-Ubud
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Berjalan menyusuri sawah bertingkat hijau yang asri.", "en": "Walking along lush green terraced rice fields."}'::jsonb,
    '{"id": "Tegalalang Ubud terkenal dengan pemandangan sawah terasering berundak-undak yang hijau royo-royo. Trekking menyusuri pematang sawah memberikan relaksasi pikiran tersendiri.", "en": "Tegalalang Ubud is famous for its lush green terraced rice fields. Trekking along the rice field paths provides distinct mental relaxation."}'::jsonb,
    '{alam,desa-wisata}'::text[],
    4.80, 19, 75, 330
  ),
  (
    'journal-bali-003',
    'belajar-surfing-pertama-kali-di-kuta',
    '{"id": "Belajar surfing di Kuta", "en": "Learning to Surf in Kuta Beach"}'::jsonb,
    '5103', -- Badung-Kuta
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Keseruan jatuh bangun menaklukan ombak pemula Kuta.", "en": "Fun of falling and standing to conquer Kuta''s beginner waves."}'::jsonb,
    '{"id": "Pantai Kuta adalah tempat terbaik bagi pemula untuk belajar berselancar. Menyewa papan selancar lokal lengkap dengan instruktur yang sabar memandu hingga bisa berdiri tegak.", "en": "Kuta Beach is the best place for beginners to learn surfing. Renting a local surfboard complete with a patient instructor who guides you until you can stand upright."}'::jsonb,
    '{bahari,petualangan}'::text[],
    4.60, 10, 35, 160
  ),
  (
    'journal-bali-004',
    'suasana-mistis-hutan-monyet-ubud',
    '{"id": "Hutan Monyet Ubud", "en": "Mystical Vibe at Ubud Monkey Forest"}'::jsonb,
    '5104', -- Gianyar-Ubud
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Cagar alam suci yang dihuni ratusan monyet ekor panjang.", "en": "Sacred sanctuary home to hundreds of long-tailed macaques."}'::jsonb,
    '{"id": "Menyusuri jalan setapak di tengah hutan lebat rimbun di Ubud Monkey Forest. Pura-pura kuno berselimut lumut hijau tebal memberikan kesan magis dan sakral.", "en": "Strolling the pathways inside the dense, lush jungle of Ubud Monkey Forest. Ancient temples covered in thick green moss lend a magical and sacred impression."}'::jsonb,
    '{budaya,alam}'::text[],
    4.75, 14, 58, 260
  ),
  (
    'journal-bali-005',
    'nongkrong-santai-sore-hari-di-seminyak',
    '{"id": "Nongkrong santai Seminyak", "en": "Leisurely Afternoon Hangout in Seminyak"}'::jsonb,
    '5103', -- Badung-Kuta
    'creator-dimas-prasetyo',
    '{"url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Menikmati kelapa muda di beach club hits Seminyak.", "en": "Enjoying fresh coconut at trendy Seminyak beach clubs."}'::jsonb,
    '{"id": "Duduk santai di bean bag warna-warni di pinggir Pantai Seminyak, mendengarkan musik santai, sambil minum kelapa muda dingin menunggu senja tiba.", "en": "Relaxing on colorful bean bags by Seminyak Beach, listening to chill music, and sipping cold fresh coconut waiting for the dusk."}'::jsonb,
    '{kuliner,bahari}'::text[],
    4.65, 12, 42, 200
  ),
  (
    'journal-lombok-003',
    'menyapa-kehangatan-warga-desa-sade',
    '{"id": "Menyapa warga Desa Sade", "en": "Greeting Sade Village Locals"}'::jsonb,
    '5202', -- Lombok Tengah
    'creator-nadia-ananta',
    '{"url": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60"}'::jsonb,
    '{"id": "Melihat rumah adat sasak otentik dan belajar menenun.", "en": "Seeing authentic Sasak houses and learning hand-weaving."}'::jsonb,
    '{"id": "Mengunjungi Desa Sade untuk melihat langsung arsitektur rumah adat Sasak dari bambu dan tanah liat. Belajar menenun kain songket lombok yang indah dengan cara tradisional.", "en": "Visiting Sade Village to see Sasak house architecture made of bamboo and clay. Learning traditional hand-weaving of beautiful Lombok Songket fabric."}'::jsonb,
    '{budaya,desa-wisata}'::text[],
    4.80, 11, 36, 175
  )
ON CONFLICT (id) DO NOTHING;
