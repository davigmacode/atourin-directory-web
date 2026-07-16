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
  min_price              integer NOT NULL DEFAULT 0,
  rating_average         numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count          integer NOT NULL DEFAULT 0,
  opening_hours          jsonb NOT NULL,
  trekking               boolean NOT NULL DEFAULT false,
  location_address       jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  location_accessibility jsonb NOT NULL DEFAULT '[]'::jsonb,
  location_latitude      numeric(9,6),
  location_longitude     numeric(9,6),
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

-- ── 2. Table: price_tiers (Polymorphic) ────────────────────────
CREATE TABLE IF NOT EXISTS directory.price_tiers (
  id           text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  entity_type  text NOT NULL,
  entity_id    text NOT NULL,
  name         jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  price        integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT price_tiers_entity_type_check CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary')),
  UNIQUE (entity_type, entity_id, name)
);

-- Index for searching price tiers
CREATE INDEX IF NOT EXISTS price_tiers_entity_idx ON directory.price_tiers (entity_type, entity_id);

-- Trigger for updated_at
CREATE TRIGGER price_tiers_updated_at
  BEFORE UPDATE ON directory.price_tiers
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 3. Trigger Function & Trigger: Auto update min_price ─────
CREATE OR REPLACE FUNCTION directory.update_attraction_min_price()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    IF NEW.entity_type = 'attraction' THEN
      UPDATE directory.attractions
      SET min_price = COALESCE(
        (SELECT MIN(price) FROM directory.price_tiers WHERE entity_type = 'attraction' AND entity_id = NEW.entity_id),
        0
      )
      WHERE id = NEW.entity_id;
    END IF;
  END IF;

  IF (TG_OP = 'DELETE') THEN
    IF OLD.entity_type = 'attraction' THEN
      UPDATE directory.attractions
      SET min_price = COALESCE(
        (SELECT MIN(price) FROM directory.price_tiers WHERE entity_type = 'attraction' AND entity_id = OLD.entity_id),
        0
      )
      WHERE id = OLD.entity_id;
    END IF;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER price_tiers_update_min_price
AFTER INSERT OR UPDATE OR DELETE ON directory.price_tiers
FOR EACH ROW EXECUTE FUNCTION directory.update_attraction_min_price();
