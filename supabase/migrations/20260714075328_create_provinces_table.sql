-- =============================================================
-- Migration: create_provinces_table
-- Schema   : directory
-- =============================================================

CREATE TABLE IF NOT EXISTS directory.provinces (
  id                  text PRIMARY KEY,
  island_id           text NOT NULL REFERENCES directory.islands(id) ON DELETE CASCADE,
  slug                text UNIQUE NOT NULL,
  name                text NOT NULL,
  destinations_count  integer NOT NULL DEFAULT 0,
  attractions_count   integer NOT NULL DEFAULT 0,
  villages_count      integer NOT NULL DEFAULT 0,
  cover_image         jsonb,
  popularity_score    integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: pastikan jsonb cover_image minimal punya key "url"
ALTER TABLE directory.provinces
  ADD CONSTRAINT provinces_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Index
CREATE INDEX IF NOT EXISTS provinces_island_id_idx ON directory.provinces (island_id);
CREATE INDEX IF NOT EXISTS provinces_name_idx ON directory.provinces (name);

-- Trigger untuk updated_at
CREATE TRIGGER provinces_updated_at
  BEFORE UPDATE ON directory.provinces
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
