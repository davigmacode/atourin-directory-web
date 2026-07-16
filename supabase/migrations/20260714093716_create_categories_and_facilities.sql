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


