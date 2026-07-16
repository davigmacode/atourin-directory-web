-- =============================================================
-- Migration: create_attractions_table
-- Schema   : directory
-- =============================================================

-- ── 1. Table: attractions ────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.attractions (
  id                     text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug                   text UNIQUE NOT NULL,
  name                   text NOT NULL,
  destination_id         text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  cover_image            jsonb NOT NULL,
  description            jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  price                  integer NOT NULL DEFAULT 0,
  rating_average         numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count          integer NOT NULL DEFAULT 0,
  opening_hours          jsonb NOT NULL,
  trekking               boolean NOT NULL DEFAULT false,
  latitude               numeric(9,6),
  longitude              numeric(9,6),
  price_tiers            jsonb,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: cover_image must contain url
ALTER TABLE directory.attractions
  ADD CONSTRAINT attractions_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Indexes
CREATE INDEX IF NOT EXISTS attractions_slug_idx ON directory.attractions (slug);
CREATE INDEX IF NOT EXISTS attractions_destination_id_idx ON directory.attractions (destination_id);

-- Trigger for updated_at
CREATE TRIGGER attractions_updated_at
  BEFORE UPDATE ON directory.attractions
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
