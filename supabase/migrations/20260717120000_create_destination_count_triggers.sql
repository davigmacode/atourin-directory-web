-- =============================================================
-- Migration: create_destination_count_triggers
-- Schema   : directory
-- Description:
--   Auto-update destinations.{attractions_count,
--   villages_count, tour_guides_count} on INSERT / UPDATE
--   / DELETE of the respective entity tables.
--
--   Uses a single trigger function that dispatches on
--   TG_TABLE_NAME so there's only one function to maintain.
-- =============================================================

-- ── 1. Trigger function ─────────────────────────────────────
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
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ── 2. Triggers ─────────────────────────────────────────────
CREATE TRIGGER attractions_update_destination_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.attractions
  FOR EACH ROW EXECUTE FUNCTION directory.update_destination_counts();

CREATE TRIGGER tourism_villages_update_destination_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.tourism_villages
  FOR EACH ROW EXECUTE FUNCTION directory.update_destination_counts();

CREATE TRIGGER tour_guides_update_destination_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.tour_guides
  FOR EACH ROW EXECUTE FUNCTION directory.update_destination_counts();

-- ── 3. Backfill existing data ───────────────────────────────
UPDATE directory.destinations d SET
  attractions_count  = COALESCE((SELECT COUNT(*) FROM directory.attractions       a WHERE a.destination_id = d.id), 0),
  villages_count     = COALESCE((SELECT COUNT(*) FROM directory.tourism_villages  v WHERE v.destination_id = d.id), 0),
  tour_guides_count  = COALESCE((SELECT COUNT(*) FROM directory.tour_guides       g WHERE g.destination_id = d.id), 0);
