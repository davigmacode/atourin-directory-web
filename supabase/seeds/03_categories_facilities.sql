-- ── Seed Data: taxonomies ─────────────────────────────────
-- `type` (NOT NULL) replaces the old `entity_types` array.
-- UNIQUE on (type, slug) allows the same slug under multiple
-- types (e.g. `bahari` as category AND guide_specialism).
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  -- ── Categories (regular content tags) ─────────────────
  ('alam',         '{"id": "Alam",        "en": "Nature"}'::jsonb,     'category', '{"icon": "🌿", "color": "#E6F7E6"}'),
  ('budaya',       '{"id": "Budaya",      "en": "Culture"}'::jsonb,    'category', '{"icon": "🎭", "color": "#EDE9FF"}'),
  ('sejarah',      '{"id": "Sejarah",     "en": "History"}'::jsonb,    'category', '{"icon": "🛣️", "color": "#FFF4D9"}'),
  ('kuliner',      '{"id": "Kuliner",     "en": "Culinary"}'::jsonb,   'category', '{"icon": "🌙", "color": "#FFE2E2"}'),
  ('religi',       '{"id": "Religi",      "en": "Religious"}'::jsonb,  'category', '{"icon": "🕌", "color": "#E2F1FF"}'),
  ('petualangan',  '{"id": "Petualangan", "en": "Adventure"}'::jsonb,  'category', '{"icon": "⚽", "color": "#D9F2DA"}'),
  ('heritage',     '{"id": "Heritage",    "en": "Heritage"}'::jsonb,   'category', '{"icon": "🎯", "color": "#FFE9D6"}'),
  ('bahari',       '{"id": "Bahari",      "en": "Marine"}'::jsonb,     'category', '{"icon": "🌊", "color": "#D4ECF4"}'),
  ('desa-wisata',  '{"id": "Desa Wisata", "en": "Tourism Village"}'::jsonb, 'category', '{"icon": "🌾", "color": "#F0FBE9"}'),
  ('ecotourism',   '{"id": "Ecotourism",  "en": "Ecotourism"}'::jsonb, 'category', '{"icon": "🌱", "color": "#E6F7E6"}'),

  -- ── ADWI Levels (Anugerah Desa Wisata Indonesia) ──────
  ('rintisan',     '{"id": "Rintisan",   "en": "Rintisan"}'::jsonb,   'adwi_level', '{"icon": "🌱", "color": "rgba(196,73,73,0.14)", "fg": "#C44949"}'),
  ('berkembang',   '{"id": "Berkembang", "en": "Berkembang"}'::jsonb, 'adwi_level', '{"icon": "🌿", "color": "rgba(31,111,176,0.14)", "fg": "#1F6FB0"}'),
  ('maju',         '{"id": "Maju",       "en": "Maju"}'::jsonb,       'adwi_level', '{"icon": "🌳", "color": "rgba(81,176,84,0.16)", "fg": "#2D8838"}'),
  ('mandiri',      '{"id": "Mandiri",    "en": "Mandiri"}'::jsonb,    'adwi_level', '{"icon": "🏆", "color": "rgba(180,122,0,0.16)", "fg": "#B47A00"}'),

  -- ── Village Themes ────────────────────────────────────
  ('budaya',       '{"id": "Budaya & Adat",  "en": "Culture & Heritage"}'::jsonb,    'village_theme', '{"icon": "🎭"}'),
  ('alam',         '{"id": "Alam & Ekowisata", "en": "Nature & Ecotourism"}'::jsonb, 'village_theme', '{"icon": "🌿"}'),
  ('kerajinan',    '{"id": "Kerajinan",      "en": "Handcrafts"}'::jsonb,           'village_theme', '{"icon": "🏺"}'),
  ('kuliner',      '{"id": "Kuliner Lokal",  "en": "Local Culinary"}'::jsonb,        'village_theme', '{"icon": "🍽️"}'),
  ('bahari',       '{"id": "Bahari",         "en": "Marine & Coastal"}'::jsonb,     'village_theme', '{"icon": "🌊"}'),
  ('pertanian',    '{"id": "Agrowisata",     "en": "Agrotourism"}'::jsonb,          'village_theme', '{"icon": "🌾"}'),

  -- ── Village Activities ────────────────────────────────
  ('tarian',       '{"id": "Tarian",   "en": "Traditional Dance"}'::jsonb,    'village_activity', '{"icon": "💃"}'),
  ('kuliner',      '{"id": "Kuliner",  "en": "Culinary Tasting"}'::jsonb,    'village_activity', '{"icon": "🍳"}'),
  ('trekking',     '{"id": "Trekking", "en": "Nature Trekking"}'::jsonb,     'village_activity', '{"icon": "🥾"}'),
  ('snorkel',      '{"id": "Snorkel",  "en": "Coral Snorkeling"}'::jsonb,    'village_activity', '{"icon": "🤿"}'),
  ('workshop',     '{"id": "Workshop", "en": "Traditional Workshop"}'::jsonb, 'village_activity', '{"icon": "🔨"}'),
  ('homestay',     '{"id": "Homestay", "en": "Local Stay Experience"}'::jsonb, 'village_activity', '{"icon": "🏡"}'),

  -- ── Languages (renamed from guide_language — now shared across guides & itineraries)
  ('id',  '{"id": "Indonesia", "en": "Indonesian"}'::jsonb, 'language', '{"icon": "🇮🇩", "code": "ID"}'),
  ('en',  '{"id": "Inggris",   "en": "English"}'::jsonb,    'language', '{"icon": "🇬🇧", "code": "EN"}'),
  ('jp',  '{"id": "Jepang",    "en": "Japanese"}'::jsonb,   'language', '{"icon": "🇯🇵", "code": "JP"}'),
  ('fr',  '{"id": "Prancis",   "en": "French"}'::jsonb,     'language', '{"icon": "🇫🇷", "code": "FR"}'),
  ('de',  '{"id": "Jerman",    "en": "German"}'::jsonb,     'language', '{"icon": "🇩🇪", "code": "DE"}'),
  ('ko',  '{"id": "Korea",     "en": "Korean"}'::jsonb,     'language', '{"icon": "🇰🇷", "code": "KO"}'),
  ('zh',  '{"id": "Mandarin",  "en": "Mandarin"}'::jsonb,   'language', '{"icon": "🇨🇳", "code": "ZH"}'),
  ('ar',  '{"id": "Arab",      "en": "Arabic"}'::jsonb,     'language', '{"icon": "🇸🇦", "code": "AR"}'),
  ('nl',  '{"id": "Belanda",   "en": "Dutch"}'::jsonb,      'language', '{"icon": "🇳🇱", "code": "NL"}'),
  ('es',  '{"id": "Spanyol",   "en": "Spanish"}'::jsonb,    'language', '{"icon": "🇪🇸", "code": "ES"}'),

  -- ── Guide Specialisms ─────────────────────────────────
  ('bahari',       '{"id": "Bahari",      "en": "Marine"}'::jsonb,      'guide_specialism', '{"icon": "🤿", "color": "#D4ECF4", "fg": "#1F6FB0"}'),
  ('petualangan',  '{"id": "Petualangan", "en": "Adventure"}'::jsonb,   'guide_specialism', '{"icon": "🏔️", "color": "#D9F2DA", "fg": "#2D8838"}'),
  ('heritage',     '{"id": "Heritage",    "en": "Heritage"}'::jsonb,    'guide_specialism', '{"icon": "🏛️", "color": "#FFE9D6", "fg": "#B47A00"}'),
  ('kuliner',      '{"id": "Kuliner",     "en": "Culinary"}'::jsonb,    'guide_specialism', '{"icon": "🍽️", "color": "#FFE2E2", "fg": "#C44949"}'),
  ('spiritual',    '{"id": "Spiritual",   "en": "Spiritual"}'::jsonb,   'guide_specialism', '{"icon": "🙏", "color": "#EDE9FF", "fg": "#6B52D4"}'),
  ('hiking',       '{"id": "Hiking",      "en": "Hiking"}'::jsonb,      'guide_specialism', '{"icon": "🥾", "color": "#D9F2DA", "fg": "#2D8838"}'),
  ('budaya',       '{"id": "Budaya",      "en": "Culture"}'::jsonb,     'guide_specialism', '{"icon": "🎭", "color": "#EDE9FF", "fg": "#6B52D4"}'),
  ('fotografi',    '{"id": "Fotografi",   "en": "Photography"}'::jsonb, 'guide_specialism', '{"icon": "📸", "color": "#FFF4D6", "fg": "#B47A00"}')
ON CONFLICT (type, slug) DO NOTHING;

-- ── Seed Data: facilities ─────────────────────────────────
-- Facilities keep `entity_types` array (not split per-type).
INSERT INTO directory.facilities (slug, name, entity_types, metadata) VALUES
  ('parkir',             '{"id": "Parkir",                   "en": "Parking"}'::jsonb,                ARRAY['attraction', 'village'], '{"icon": "🅿️"}'),
  ('toilet',             '{"id": "Toilet",                   "en": "Restroom"}'::jsonb,               ARRAY['attraction', 'village'], '{"icon": "🚾"}'),
  ('spot-foto',          '{"id": "Spot Foto",                "en": "Photo Spot"}'::jsonb,             ARRAY['attraction'],             '{"icon": "📸"}'),
  ('souvenir',           '{"id": "Souvenir",                 "en": "Souvenir"}'::jsonb,              ARRAY['attraction'],             '{"icon": "🛍️"}'),
  ('akses-disabilitas',  '{"id": "Akses Disabilitas",        "en": "Disability Access"}'::jsonb,     ARRAY['attraction'],             '{"icon": "♿"}'),
  ('restoran',           '{"id": "Restoran / Warung",        "en": "Restaurant / Eatery"}'::jsonb,   ARRAY['attraction', 'village'], '{"icon": "🍽️"}'),
  ('musholla',           '{"id": "Musholla",                 "en": "Prayer Room"}'::jsonb,           ARRAY['attraction', 'village'], '{"icon": "🕌"}'),
  ('camping-area',       '{"id": "Camping Area",             "en": "Camping Area"}'::jsonb,           ARRAY['attraction'],             '{"icon": "⛺"}'),
  ('sinyal-hp',          '{"id": "Sinyal HP",                "en": "Mobile Signal"}'::jsonb,          ARRAY['attraction'],             '{"icon": "📶"}'),
  ('air-bersih',         '{"id": "Air Bersih",               "en": "Clean Water"}'::jsonb,            ARRAY['attraction'],             '{"icon": "💧"}'),
  ('pemandu-lokal',      '{"id": "Pemandu Lokal",            "en": "Local Guide"}'::jsonb,            ARRAY['attraction', 'village'], '{"icon": "🙋"}'),
  ('homestay',           '{"id": "Homestay",                 "en": "Homestay"}'::jsonb,               ARRAY['village'],                '{"icon": "🏡"}'),
  ('charging-station',   '{"id": "Stasiun Pengisian Daya",   "en": "Charging Station"}'::jsonb,      ARRAY['village'],                '{"icon": "🔌"}'),
  ('wifi',               '{"id": "WiFi",                     "en": "WiFi Connection"}'::jsonb,        ARRAY['village'],                '{"icon": "📶"}')
ON CONFLICT (slug) DO NOTHING;
