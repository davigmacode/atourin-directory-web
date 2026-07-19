-- =============================================================
-- Migration: patch_taxonomy_types
-- Description:
--   1. Extend taxonomies.type CHECK constraint to include new
--      types: 'language', 'creator_role', 'itinerary_category',
--      'itinerary_highlight'.
--   2. Migrate existing 'guide_language' entries to 'language'
--      (slug stays the same — lang- prefix was already dropped
--      in the seed; type is the only change).
--   3. Seed new taxonomy groups needed by the itineraries feature.
-- =============================================================

-- ── 1. Replace the type CHECK constraint ─────────────────────
-- Drop the old constraint and add the expanded one.
ALTER TABLE directory.taxonomies
  DROP CONSTRAINT IF EXISTS taxonomies_type_check;

ALTER TABLE directory.taxonomies
  ADD CONSTRAINT taxonomies_type_check CHECK (type IN (
    'category',
    'adwi_level',
    'village_theme',
    'village_activity',
    -- renamed: guide_language → language (shared across guides & itineraries)
    'language',
    'guide_specialism',
    -- new types for itineraries
    'creator_role',
    'itinerary_category',
    'itinerary_highlight',
    -- audience segments for target_audience text[] column
    'target_audience'
  ));

-- ── 2. Rename type: guide_language → language ────────────────
-- UPDATE is safe here because UNIQUE is on (type, slug) and
-- no other row uses type='language' yet.
UPDATE directory.taxonomies
  SET type = 'language'
  WHERE type = 'guide_language';

-- ── 3. Seed new taxonomy entries ─────────────────────────────

-- creator_role — badge types shown on creator profiles
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  ('official',      '{"id": "Atourin Official", "en": "Atourin Official"}'::jsonb, 'creator_role', '{"icon": "✅"}'),
  ('local-expert',  '{"id": "Local Expert",     "en": "Local Expert"}'::jsonb,     'creator_role', '{"icon": "📍"}'),
  ('community',     '{"id": "Komunitas",         "en": "Community"}'::jsonb,        'creator_role', '{"icon": "👥"}'),
  ('partner',       '{"id": "Mitra",             "en": "Partner"}'::jsonb,          'creator_role', '{"icon": "🤝"}')
ON CONFLICT (type, slug) DO NOTHING;

-- itinerary_highlight — sorotan chips on detail page
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  ('pemandangan',    '{"id": "Pantai & Pemandangan",   "en": "Beach & Scenery"}'::jsonb,       'itinerary_highlight', '{"icon": "🌊"}'),
  ('kearifan-budaya','{"id": "Kearifan Budaya",         "en": "Cultural Wisdom"}'::jsonb,      'itinerary_highlight', '{"icon": "👫"}'),
  ('biota-alam',     '{"id": "Biota & Aktivitas Laut",  "en": "Marine Life & Activities"}'::jsonb, 'itinerary_highlight', '{"icon": "🐠"}'),
  ('kuliner-otentik','{"id": "Kuliner Otentik",          "en": "Authentic Culinary"}'::jsonb,   'itinerary_highlight', '{"icon": "🔍"}')
ON CONFLICT (type, slug) DO NOTHING;

-- itinerary_category — multi-category per itinerary
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  ('petualangan',   '{"id": "Petualangan", "en": "Adventure"}'::jsonb,     'itinerary_category', '{"icon": "🏔️", "color": "#D9F2DA"}'),
  ('keluarga',      '{"id": "Keluarga",    "en": "Family"}'::jsonb,        'itinerary_category', '{"icon": "👨‍👩‍👧‍👦", "color": "#FFF4D9"}'),
  ('budaya',        '{"id": "Budaya",      "en": "Cultural"}'::jsonb,      'itinerary_category', '{"icon": "🎭", "color": "#EDE9FF"}'),
  ('romantis',      '{"id": "Romantis",    "en": "Romantic"}'::jsonb,      'itinerary_category', '{"icon": "💑", "color": "#FFE2E2"}'),
  ('alam',          '{"id": "Alam",        "en": "Nature"}'::jsonb,        'itinerary_category', '{"icon": "🌿", "color": "#E6F7E6"}'),
  ('bahari',        '{"id": "Bahari",      "en": "Marine"}'::jsonb,        'itinerary_category', '{"icon": "🌊", "color": "#D4ECF4"}'),
  ('kuliner',       '{"id": "Kuliner",     "en": "Culinary"}'::jsonb,      'itinerary_category', '{"icon": "🍽️", "color": "#FFE2E2"}'),
  ('backpacker',    '{"id": "Backpacker",  "en": "Backpacker"}'::jsonb,    'itinerary_category', '{"icon": "🎒", "color": "#D9F2DA"}')
ON CONFLICT (type, slug) DO NOTHING;

-- target_audience — audience chips shown on itinerary cards
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  ('solo',    '{"id": "Solo",     "en": "Solo"}'::jsonb,     'target_audience', '{"icon": "solo"}'),
  ('couple',  '{"id": "Pasangan", "en": "Couple"}'::jsonb,   'target_audience', '{"icon": "couple"}'),
  ('group',   '{"id": "Rombongan","en": "Group"}'::jsonb,    'target_audience', '{"icon": "group"}'),
  ('family',  '{"id": "Keluarga", "en": "Family"}'::jsonb,   'target_audience', '{"icon": "family"}')
ON CONFLICT (type, slug) DO NOTHING;
