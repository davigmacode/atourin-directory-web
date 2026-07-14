-- =============================================================
-- Migration: create_categories_and_facilities
-- Schema   : directory
-- =============================================================

-- ── 1. Table: categories ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.categories (
  id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug        text UNIQUE NOT NULL,
  name        jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  metadata    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for searching categories
CREATE INDEX IF NOT EXISTS categories_slug_idx ON directory.categories (slug);
CREATE INDEX IF NOT EXISTS categories_name_id_idx ON directory.categories ((name->>'id'));
CREATE INDEX IF NOT EXISTS categories_name_en_idx ON directory.categories ((name->>'en'));

-- Trigger for updated_at
CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON directory.categories
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: facilities ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.facilities (
  id          text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug        text UNIQUE NOT NULL,
  name        jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  metadata    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for searching facilities
CREATE INDEX IF NOT EXISTS facilities_slug_idx ON directory.facilities (slug);
CREATE INDEX IF NOT EXISTS facilities_name_id_idx ON directory.facilities ((name->>'id'));
CREATE INDEX IF NOT EXISTS facilities_name_en_idx ON directory.facilities ((name->>'en'));

-- Trigger for updated_at
CREATE TRIGGER facilities_updated_at
  BEFORE UPDATE ON directory.facilities
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 3. Table: category_assignments (Polymorphic) ─────────────
CREATE TABLE IF NOT EXISTS directory.category_assignments (
  category_id  text NOT NULL REFERENCES directory.categories(id) ON DELETE CASCADE,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (category_id, entity_type, entity_id),
  CONSTRAINT category_assignments_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary'))
);

CREATE INDEX IF NOT EXISTS category_assignments_entity_idx ON directory.category_assignments (entity_type, entity_id);

-- ── 4. Table: facility_assignments (Polymorphic) ─────────────
CREATE TABLE IF NOT EXISTS directory.facility_assignments (
  facility_id  text NOT NULL REFERENCES directory.facilities(id) ON DELETE CASCADE,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  available    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (facility_id, entity_type, entity_id),
  CONSTRAINT facility_assignments_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary'))
);

CREATE INDEX IF NOT EXISTS facility_assignments_entity_idx ON directory.facility_assignments (entity_type, entity_id);

-- ── 5. Seed Data: categories ─────────────────────────────────
INSERT INTO directory.categories (slug, name, metadata) VALUES
  ('alam', '{"id": "Alam", "en": "Nature"}'::jsonb, '{"icon": "🌿", "color": "#E6F7E6"}'),
  ('budaya', '{"id": "Budaya", "en": "Culture"}'::jsonb, '{"icon": "🎭", "color": "#EDE9FF"}'),
  ('sejarah', '{"id": "Sejarah", "en": "History"}'::jsonb, '{"icon": "🛣️", "color": "#FFF4D9"}'),
  ('kuliner', '{"id": "Kuliner", "en": "Culinary"}'::jsonb, '{"icon": "🌙", "color": "#FFE2E2"}'),
  ('religi', '{"id": "Religi", "en": "Religious"}'::jsonb, '{"icon": "🕌", "color": "#E2F1FF"}'),
  ('petualangan', '{"id": "Petualangan", "en": "Adventure"}'::jsonb, '{"icon": "⚽", "color": "#D9F2DA"}'),
  ('heritage', '{"id": "Heritage", "en": "Heritage"}'::jsonb, '{"icon": "🎯", "color": "#FFE9D6"}'),
  ('bahari', '{"id": "Bahari", "en": "Marine"}'::jsonb, '{"icon": "🌊", "color": "#D4ECF4"}'),
  ('desa-wisata', '{"id": "Desa Wisata", "en": "Tourism Village"}'::jsonb, '{"icon": "🌾", "color": "#F0FBE9"}'),
  ('ecotourism', '{"id": "Ecotourism", "en": "Ecotourism"}'::jsonb, '{"icon": "🌱", "color": "#E6F7E6"}')
ON CONFLICT (slug) DO NOTHING;

-- ── 6. Seed Data: facilities ─────────────────────────────────
INSERT INTO directory.facilities (slug, name, metadata) VALUES
  ('parkir', '{"id": "Parkir", "en": "Parking"}'::jsonb, '{"icon": "🅿️"}'),
  ('toilet', '{"id": "Toilet", "en": "Restroom"}'::jsonb, '{"icon": "🚾"}'),
  ('spot-foto', '{"id": "Spot Foto", "en": "Photo Spot"}'::jsonb, '{"icon": "📸"}'),
  ('souvenir', '{"id": "Souvenir", "en": "Souvenir"}'::jsonb, '{"icon": "🛍️"}'),
  ('akses-disabilitas', '{"id": "Akses Disabilitas", "en": "Disability Access"}'::jsonb, '{"icon": "♿"}'),
  ('restoran', '{"id": "Restoran / Warung", "en": "Restaurant / Eatery"}'::jsonb, '{"icon": "🍽️"}'),
  ('musholla', '{"id": "Musholla", "en": "Prayer Room"}'::jsonb, '{"icon": "🕌"}'),
  ('camping-area', '{"id": "Camping Area", "en": "Camping Area"}'::jsonb, '{"icon": "⛺"}'),
  ('sinyal-hp', '{"id": "Sinyal HP", "en": "Mobile Signal"}'::jsonb, '{"icon": "📶"}'),
  ('air-bersih', '{"id": "Air Bersih", "en": "Clean Water"}'::jsonb, '{"icon": "💧"}'),
  ('pemandu-lokal', '{"id": "Pemandu Lokal", "en": "Local Guide"}'::jsonb, '{"icon": "🙋"}'),
  ('homestay', '{"id": "Homestay", "en": "Homestay"}'::jsonb, '{"icon": "🏡"}'),
  ('charging-station', '{"id": "Stasiun Pengisian Daya", "en": "Charging Station"}'::jsonb, '{"icon": "🔌"}'),
  ('wifi', '{"id": "WiFi", "en": "WiFi Connection"}'::jsonb, '{"icon": "📶"}')
ON CONFLICT (slug) DO NOTHING;
