-- =============================================================
-- Seed: certifications
-- =============================================================

INSERT INTO directory.certifications (slug, name, type, issuer, entity_types, metadata) VALUES

  -- ── Awards (Penghargaan) ────────────────────────────────────
  (
    'adwi-award-2024',
    '{"id": "ADWI 2024", "en": "ADWI Award 2024"}'::jsonb,
    'award',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "🏆", "color": "#FFF4D6", "fg": "#B47A00", "year": 2024}'::jsonb
  ),
  (
    'adwi-award-2023',
    '{"id": "ADWI 2023", "en": "ADWI Award 2023"}'::jsonb,
    'award',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "🏆", "color": "#FFF4D6", "fg": "#B47A00", "year": 2023}'::jsonb
  ),
  (
    'adwi-award-2022',
    '{"id": "ADWI 2022", "en": "ADWI Award 2022"}'::jsonb,
    'award',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "🏆", "color": "#FFF4D6", "fg": "#B47A00", "year": 2022}'::jsonb
  ),
  (
    'gstc-certified',
    '{"id": "GSTC Certified", "en": "GSTC Certified"}'::jsonb,
    'award',
    'Global Sustainable Tourism Council',
    ARRAY['village'],
    '{"icon": "🌿", "color": "#E6F7E6", "fg": "#2D8838", "url": "https://www.gstcouncil.org"}'::jsonb
  ),
  (
    'heritage-award',
    '{"id": "UNESCO Heritage Award", "en": "UNESCO Heritage Award"}'::jsonb,
    'award',
    'UNESCO',
    ARRAY['village'],
    '{"icon": "🌐", "color": "#E2F1FF", "fg": "#1F6FB0", "url": "https://www.unesco.org"}'::jsonb
  ),
  (
    'kemenparekraf-5-star',
    '{"id": "Bintang 5 Kemenparekraf", "en": "5-Star Kemenparekraf"}'::jsonb,
    'award',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "⭐", "color": "#FFF4D6", "fg": "#B47A00"}'::jsonb
  ),
  (
    'indonesia-sustainable-tourism',
    '{"id": "Indonesia Sustainable Tourism", "en": "Indonesia Sustainable Tourism Award"}'::jsonb,
    'award',
    'ASEAN',
    ARRAY['village'],
    '{"icon": "🌱", "color": "#D9F2DA", "fg": "#2D8838"}'::jsonb
  ),

  -- ── Competency (Kompetensi Pemandu) ────────────────────────
  (
    'bnsp-guide-level-1',
    '{"id": "BNSP Pemandu Wisata Level 1", "en": "BNSP Tour Guide Level 1"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "📋", "color": "#EDE9FF", "fg": "#6B52D4", "level": 1}'::jsonb
  ),
  (
    'bnsp-guide-level-2',
    '{"id": "BNSP Pemandu Wisata Level 2", "en": "BNSP Tour Guide Level 2"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "📋", "color": "#EDE9FF", "fg": "#6B52D4", "level": 2}'::jsonb
  ),
  (
    'bnsp-guide-level-3',
    '{"id": "BNSP Pemandu Wisata Level 3", "en": "BNSP Tour Guide Level 3"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "📋", "color": "#EDE9FF", "fg": "#6B52D4", "level": 3}'::jsonb
  ),
  (
    'bnsp-first-aid',
    '{"id": "Pertolongan Pertama BNSP", "en": "BNSP First Aid"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "🏥", "color": "#FFE2E2", "fg": "#C44949"}'::jsonb
  ),
  (
    'bahasa-inggris-pariwisata',
    '{"id": "Bahasa Inggris Pariwisata", "en": "Tourism English Competency"}'::jsonb,
    'competency',
    'Pusdiklat Kemenparekraf',
    ARRAY['guide'],
    '{"icon": "🗣️", "color": "#E2F1FF", "fg": "#1F6FB0"}'::jsonb
  ),
  (
    'bnsp-dive-guide',
    '{"id": "Pemandu Selam BNSP", "en": "BNSP Dive Guide"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "🤿", "color": "#D4ECF4", "fg": "#1F6FB0"}'::jsonb
  ),
  (
    'bnsp-mountain-guide',
    '{"id": "Pemandu Pendakian BNSP", "en": "BNSP Mountain Guide"}'::jsonb,
    'competency',
    'BNSP',
    ARRAY['guide'],
    '{"icon": "🏔️", "color": "#D9F2DA", "fg": "#2D8838"}'::jsonb
  ),

  -- ── Training (Pelatihan) ─────────────────────────────────────
  (
    'sapta-pesona-training',
    '{"id": "Pelatihan Sapta Pesona", "en": "Sapta Pesona Training"}'::jsonb,
    'training',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village', 'guide'],
    '{"icon": "🎓", "color": "#FFF4D6", "fg": "#B47A00"}'::jsonb
  ),
  (
    'homestay-management-training',
    '{"id": "Pelatihan Pengelolaan Homestay", "en": "Homestay Management Training"}'::jsonb,
    'training',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "🏡", "color": "#E6F7E6", "fg": "#2D8838"}'::jsonb
  ),
  (
    'digital-marketing-training',
    '{"id": "Pelatihan Digital Marketing Desa Wisata", "en": "Tourism Village Digital Marketing Training"}'::jsonb,
    'training',
    'BEKRAF',
    ARRAY['village'],
    '{"icon": "📱", "color": "#EDE9FF", "fg": "#6B52D4"}'::jsonb
  ),
  (
    'culinary-training',
    '{"id": "Pelatihan Kuliner Khas Daerah", "en": "Regional Culinary Training"}'::jsonb,
    'training',
    'Kementerian Pariwisata dan Ekonomi Kreatif',
    ARRAY['village'],
    '{"icon": "🍳", "color": "#FFE2E2", "fg": "#C44949"}'::jsonb
  ),
  (
    'ecotourism-guide-training',
    '{"id": "Pelatihan Pemandu Ekowisata", "en": "Ecotourism Guide Training"}'::jsonb,
    'training',
    'Pusdiklat Kemenparekraf',
    ARRAY['guide'],
    '{"icon": "🌿", "color": "#E6F7E6", "fg": "#2D8838"}'::jsonb
  ),
  (
    'cultural-heritage-training',
    '{"id": "Pelatihan Interpretasi Warisan Budaya", "en": "Cultural Heritage Interpretation Training"}'::jsonb,
    'training',
    'Kemendikbudristek',
    ARRAY['village', 'guide'],
    '{"icon": "🎭", "color": "#EDE9FF", "fg": "#6B52D4"}'::jsonb
  )

ON CONFLICT (slug) DO NOTHING;
