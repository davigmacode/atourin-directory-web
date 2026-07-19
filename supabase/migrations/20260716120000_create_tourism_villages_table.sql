-- =============================================================
-- Migration: create_tourism_villages_table
-- Schema   : directory
-- =============================================================

-- ── 1. Table: tourism_villages ────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.tourism_villages (
  id                     text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug                   text UNIQUE NOT NULL,
  name                   text NOT NULL,
  description            jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Theme categories: array of taxonomy slugs (type='village_theme'), GIN-indexed
  categories             text[] NOT NULL DEFAULT '{}',
  -- Activities: array of taxonomy slugs (type='village_activity'), GIN-indexed
  activities             text[] NOT NULL DEFAULT '{}',
  destination_id         text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  cover_image            jsonb NOT NULL,
  featured               boolean NOT NULL DEFAULT false,
  adwi_level_id          text REFERENCES directory.taxonomies(id) ON DELETE SET NULL,
  village_theme_id       text REFERENCES directory.taxonomies(id) ON DELETE SET NULL,
  rating_average         numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count          integer NOT NULL DEFAULT 0,
  homestay_count         integer NOT NULL DEFAULT 0,
  homestay_min_price     integer NOT NULL DEFAULT 0,
  max_daily_visitor      integer NOT NULL DEFAULT 0,
  signature              text NOT NULL DEFAULT '',
  location_address       jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  location_accessibility jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  location_directions    jsonb NOT NULL DEFAULT '[]'::jsonb,
  location_latitude      numeric(9,6),
  location_longitude     numeric(9,6),
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: cover_image must contain url
ALTER TABLE directory.tourism_villages
  ADD CONSTRAINT tourism_villages_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Indexes
CREATE INDEX IF NOT EXISTS tourism_villages_slug_idx ON directory.tourism_villages (slug);
CREATE INDEX IF NOT EXISTS tourism_villages_destination_id_idx ON directory.tourism_villages (destination_id);
CREATE INDEX IF NOT EXISTS tourism_villages_adwi_level_id_idx ON directory.tourism_villages (adwi_level_id);
CREATE INDEX IF NOT EXISTS tourism_villages_village_theme_id_idx ON directory.tourism_villages (village_theme_id);
CREATE INDEX IF NOT EXISTS tourism_villages_categories_idx ON directory.tourism_villages USING gin(categories);
CREATE INDEX IF NOT EXISTS tourism_villages_activities_idx ON directory.tourism_villages USING gin(activities);

-- Trigger for updated_at
CREATE TRIGGER tourism_villages_updated_at
  BEFORE UPDATE ON directory.tourism_villages
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
