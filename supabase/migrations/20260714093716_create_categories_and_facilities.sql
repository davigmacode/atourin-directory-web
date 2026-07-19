-- =============================================================
-- Migration: create_taxonomies_and_facilities
-- Schema   : directory
-- Description:
--   Polymorphic classification system via `taxonomies` (single
--   source of truth for all classification terms).
--
--   Taxonomy `type` (single value, NOT NULL) — UNIQUE on
--   (type, slug) so the same slug can exist under different
--   types (e.g. `budaya` as both `category` and `village_theme`).
--
--   `facilities` keeps its `entity_types` array (not split
--   per-type).
--
--   The per-type join tables (attraction_categories,
--   destination_categories, etc.) live in a separate migration
--   so they can reference the entity tables that are created
--   in later migrations.
-- =============================================================

-- ── 1. Table: taxonomies ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.taxonomies (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug          text NOT NULL,
  name          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Optional multilingual description: {"id": "...", "en": "..."}
  -- Used by highlights, activities, and other taxonomy types
  description   jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  type          text NOT NULL,
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT taxonomies_type_check CHECK (type IN (
    'category',
    'adwi_level',
    'village_theme',
    'village_activity',
    'guide_language',
    'guide_specialism',
    'target_audience'
  )),
  CONSTRAINT taxonomies_type_slug_unique UNIQUE (type, slug)
);

CREATE INDEX IF NOT EXISTS taxonomies_slug_idx     ON directory.taxonomies (slug);
CREATE INDEX IF NOT EXISTS taxonomies_type_idx     ON directory.taxonomies (type);
CREATE INDEX IF NOT EXISTS taxonomies_name_id_idx ON directory.taxonomies ((name->>'id'));
CREATE INDEX IF NOT EXISTS taxonomies_name_en_idx ON directory.taxonomies ((name->>'en'));

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

-- ── 3. Table: facility_assignments (Polymorphic) ─────────────
CREATE TABLE IF NOT EXISTS directory.facility_assignments (
  facility_id  text NOT NULL REFERENCES directory.facilities(id) ON DELETE CASCADE,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (facility_id, entity_type, entity_id),
  CONSTRAINT facility_assignments_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'))
);

CREATE INDEX IF NOT EXISTS facility_assignments_entity_idx ON directory.facility_assignments (entity_type, entity_id);
