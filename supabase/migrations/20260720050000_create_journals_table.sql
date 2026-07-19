-- =============================================================
-- Migration: create_journals_table
-- Schema   : directory
-- =============================================================

-- ── 1. Update destinations Table ─────────────────────────────
ALTER TABLE directory.destinations
  ADD COLUMN IF NOT EXISTS journals_count integer NOT NULL DEFAULT 0;

-- ── 2. Table: journals ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.journals (
  id             text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug           text UNIQUE NOT NULL,
  -- Multilingual title: { id, en }
  title          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  destination_id text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  -- The creator who authored this journal
  author_id      text NOT NULL REFERENCES directory.creators(id) ON DELETE RESTRICT,
  cover_image    jsonb NOT NULL,
  -- Multilingual short summary: { id, en }
  description    jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Multilingual main body content: { id, en }
  content        jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Categories: array of taxonomy slugs (type='category'), GIN-indexed for contains filter
  categories     text[] NOT NULL DEFAULT '{}',
  rating_average numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count  integer NOT NULL DEFAULT 0,
  likes_count    integer NOT NULL DEFAULT 0,
  views_count    integer NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: cover_image must contain url
ALTER TABLE directory.journals
  ADD CONSTRAINT journals_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Indexes
CREATE INDEX IF NOT EXISTS journals_slug_idx ON directory.journals (slug);
CREATE INDEX IF NOT EXISTS journals_destination_id_idx ON directory.journals (destination_id);
CREATE INDEX IF NOT EXISTS journals_author_id_idx ON directory.journals (author_id);
CREATE INDEX IF NOT EXISTS journals_categories_idx ON directory.journals USING gin(categories);

-- Trigger for updated_at
CREATE TRIGGER journals_updated_at
  BEFORE UPDATE ON directory.journals
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 3. Re-create Trigger Function for update_destination_counts ──────────────────────
CREATE OR REPLACE FUNCTION directory.update_destination_counts()
RETURNS TRIGGER AS $$
DECLARE
  ids text[];
BEGIN
  IF TG_OP = 'INSERT' THEN
    ids := ARRAY[NEW.destination_id];
  ELSIF TG_OP = 'DELETE' THEN
    ids := ARRAY[OLD.destination_id];
  ELSIF TG_OP = 'UPDATE' AND OLD.destination_id IS DISTINCT FROM NEW.destination_id THEN
    ids := ARRAY[OLD.destination_id, NEW.destination_id];
  ELSE
    RETURN NULL;
  END IF;

  IF TG_TABLE_NAME = 'attractions' THEN
    UPDATE directory.destinations d
    SET attractions_count = (SELECT COUNT(*) FROM directory.attractions WHERE destination_id = d.id)
    WHERE d.id = ANY(ids);
  ELSIF TG_TABLE_NAME = 'tourism_villages' THEN
    UPDATE directory.destinations d
    SET villages_count = (SELECT COUNT(*) FROM directory.tourism_villages WHERE destination_id = d.id)
    WHERE d.id = ANY(ids);
  ELSIF TG_TABLE_NAME = 'tour_guides' THEN
    UPDATE directory.destinations d
    SET tour_guides_count = (SELECT COUNT(*) FROM directory.tour_guides WHERE destination_id = d.id)
    WHERE d.id = ANY(ids);
  ELSIF TG_TABLE_NAME = 'itineraries' THEN
    UPDATE directory.destinations d
    SET itineraries_count = (SELECT COUNT(*) FROM directory.itineraries WHERE destination_id = d.id)
    WHERE d.id = ANY(ids);
  ELSIF TG_TABLE_NAME = 'journals' THEN
    UPDATE directory.destinations d
    SET journals_count = (SELECT COUNT(*) FROM directory.journals WHERE destination_id = d.id)
    WHERE d.id = ANY(ids);
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ── 4. Trigger for journals Table ────────────────────────────
CREATE TRIGGER journals_update_destination_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.journals
  FOR EACH ROW EXECUTE FUNCTION directory.update_destination_counts();

-- ── 5. Backfill counts ───────────────────────────────────────
UPDATE directory.destinations d SET
  attractions_count  = COALESCE((SELECT COUNT(*) FROM directory.attractions       a WHERE a.destination_id = d.id), 0),
  villages_count     = COALESCE((SELECT COUNT(*) FROM directory.tourism_villages  v WHERE v.destination_id = d.id), 0),
  tour_guides_count  = COALESCE((SELECT COUNT(*) FROM directory.tour_guides       g WHERE g.destination_id = d.id), 0),
  itineraries_count  = COALESCE((SELECT COUNT(*) FROM directory.itineraries       i WHERE i.destination_id = d.id), 0),
  journals_count     = COALESCE((SELECT COUNT(*) FROM directory.journals          j WHERE j.destination_id = d.id), 0);
