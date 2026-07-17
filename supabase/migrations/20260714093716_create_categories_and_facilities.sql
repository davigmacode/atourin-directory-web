-- =============================================================
-- Migration: create_taxonomies_and_facilities
-- Schema   : directory
-- Description:
--   Renamed from `categories` / `category_assignments` to
--   `taxonomies` / `taxonomy_assignments` to better reflect the
--   polymorphic classification system (categories, ADWI levels,
--   village themes, village activities, guide languages, and
--   guide specialisms all live in one place).
--
--   taxonomy_assignments gains a `metadata` jsonb column for
--   per-assignment extras (e.g. fluency_rate for languages,
--   intensity for specialisms, weight, etc.).
-- =============================================================

-- ── 1. Table: taxonomies ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.taxonomies (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug          text UNIQUE NOT NULL,
  name          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  entity_types  text[] NOT NULL DEFAULT '{}'::text[],
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Index for searching taxonomies
CREATE INDEX IF NOT EXISTS taxonomies_slug_idx          ON directory.taxonomies (slug);
CREATE INDEX IF NOT EXISTS taxonomies_name_id_idx      ON directory.taxonomies ((name->>'id'));
CREATE INDEX IF NOT EXISTS taxonomies_name_en_idx      ON directory.taxonomies ((name->>'en'));
CREATE INDEX IF NOT EXISTS taxonomies_entity_types_idx ON directory.taxonomies USING gin (entity_types);

-- Trigger for updated_at
CREATE TRIGGER taxonomies_updated_at
  BEFORE UPDATE ON directory.taxonomies
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: facilities ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.facilities (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug          text UNIQUE NOT NULL,
  name          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  entity_types  text[] NOT NULL DEFAULT '{}'::text[],
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS facilities_slug_idx          ON directory.facilities (slug);
CREATE INDEX IF NOT EXISTS facilities_name_id_idx      ON directory.facilities ((name->>'id'));
CREATE INDEX IF NOT EXISTS facilities_name_en_idx      ON directory.facilities ((name->>'en'));
CREATE INDEX IF NOT EXISTS facilities_entity_types_idx ON directory.facilities USING gin (entity_types);

CREATE TRIGGER facilities_updated_at
  BEFORE UPDATE ON directory.facilities
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 3. Table: taxonomy_assignments (Polymorphic) ─────────────
-- entity_type uses the `*_category` suffix for category-style
-- assignments (attraction_category, destination_category, etc.).
-- Special taxonomy kinds (guide_language, guide_specialism,
-- adwi_level, village_theme, village_activity) are NOT inserted
-- through this table; they live in their own join tables or are
-- resolved via direct FK columns on the parent entity.
CREATE TABLE IF NOT EXISTS directory.taxonomy_assignments (
  taxonomy_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  metadata     jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (taxonomy_id, entity_type, entity_id),
  CONSTRAINT taxonomy_assignments_entity_type_check
    CHECK (entity_type IN (
      'attraction_category',
      'destination_category',
      'village_category',
      'itinerary_category',
      'guide_category'
    ))
);

CREATE INDEX IF NOT EXISTS taxonomy_assignments_entity_idx
  ON directory.taxonomy_assignments (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS taxonomy_assignments_metadata_idx
  ON directory.taxonomy_assignments USING gin (metadata);

-- ── 4. Table: facility_assignments (Polymorphic) ─────────────
CREATE TABLE IF NOT EXISTS directory.facility_assignments (
  facility_id  text NOT NULL REFERENCES directory.facilities(id) ON DELETE CASCADE,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (facility_id, entity_type, entity_id),
  CONSTRAINT facility_assignments_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary'))
);

CREATE INDEX IF NOT EXISTS facility_assignments_entity_idx ON directory.facility_assignments (entity_type, entity_id);
