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
  )
ON CONFLICT (id) DO NOTHING;
