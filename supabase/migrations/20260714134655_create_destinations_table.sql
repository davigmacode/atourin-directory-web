-- =============================================================
-- Migration: create_destinations_table
-- Schema   : directory
-- =============================================================

-- ── 1. Table: destinations ───────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.destinations (
  id                     text PRIMARY KEY, -- BPS City/Regency Code
  slug                   text UNIQUE NOT NULL,
  name                   text NOT NULL,
  type                   text NOT NULL CHECK (type IN ('regency', 'city')),
  province_id            text NOT NULL REFERENCES directory.provinces(id) ON DELETE CASCADE,
  cover_image            jsonb NOT NULL,
  description            jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Categories: array of taxonomy slugs (type='category'), GIN-indexed for contains filter
  categories             text[] NOT NULL DEFAULT '{}',
  attractions_count      integer NOT NULL DEFAULT 0,
  villages_count         integer NOT NULL DEFAULT 0,
  itineraries_count      integer NOT NULL DEFAULT 0,
  tour_guides_count      integer NOT NULL DEFAULT 0,
  market_products_count  integer NOT NULL DEFAULT 0,
  rating_average         numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  popular_score          integer NOT NULL DEFAULT 0,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: pastikan jsonb cover_image minimal punya key "url"
ALTER TABLE directory.destinations
  ADD CONSTRAINT destinations_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Indexes for searching/filtering destinations
CREATE INDEX IF NOT EXISTS destinations_slug_idx ON directory.destinations (slug);
CREATE INDEX IF NOT EXISTS destinations_name_idx ON directory.destinations (name);
CREATE INDEX IF NOT EXISTS destinations_province_id_idx ON directory.destinations (province_id);
CREATE INDEX IF NOT EXISTS destinations_categories_idx ON directory.destinations USING gin(categories);

-- Trigger to auto-update updated_at
CREATE TRIGGER destinations_updated_at
  BEFORE UPDATE ON directory.destinations
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: media (Polymorphic Media Gallery) ──────────────
CREATE TABLE IF NOT EXISTS directory.media (
  id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  type         text NOT NULL CHECK (type IN ('image', 'video')),
  url          text NOT NULL,
  caption      jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  metadata     jsonb NOT NULL DEFAULT '{}'::jsonb, -- holds width, height, blurhash, base64, duration, etc.
  sort_order   integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT media_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'))
);

CREATE INDEX IF NOT EXISTS media_entity_idx    ON directory.media (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS media_caption_id_idx ON directory.media ((caption->>'id'));
CREATE INDEX IF NOT EXISTS media_caption_en_idx ON directory.media ((caption->>'en'));

-- Trigger for media updated_at
CREATE TRIGGER media_updated_at
  BEFORE UPDATE ON directory.media
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
