-- =============================================================
-- Migration: add_province_counts
-- Schema   : directory
-- =============================================================

-- ── 1. Update provinces Table ────────────────────────────────
ALTER TABLE directory.provinces
  ADD COLUMN IF NOT EXISTS itineraries_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tour_guides_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS journals_count integer NOT NULL DEFAULT 0;

-- ── 2. Create Trigger Function for update_province_counts ─────
CREATE OR REPLACE FUNCTION directory.update_province_counts()
RETURNS TRIGGER AS $$
DECLARE
  prov_ids text[];
BEGIN
  -- Collect affected province IDs
  IF TG_TABLE_NAME = 'destinations' THEN
    IF TG_OP = 'INSERT' THEN
      prov_ids := ARRAY[NEW.province_id];
    ELSIF TG_OP = 'DELETE' THEN
      prov_ids := ARRAY[OLD.province_id];
    ELSIF TG_OP = 'UPDATE' AND OLD.province_id IS DISTINCT FROM NEW.province_id THEN
      prov_ids := ARRAY[OLD.province_id, NEW.province_id];
    ELSE
      RETURN NULL;
    END IF;
  ELSE
    -- For attractions, tourism_villages, itineraries, tour_guides, journals
    IF TG_OP = 'INSERT' THEN
      SELECT ARRAY[province_id] INTO prov_ids FROM directory.destinations WHERE id = NEW.destination_id;
    ELSIF TG_OP = 'DELETE' THEN
      SELECT ARRAY[province_id] INTO prov_ids FROM directory.destinations WHERE id = OLD.destination_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.destination_id IS DISTINCT FROM NEW.destination_id THEN
      SELECT ARRAY_AGG(province_id) INTO prov_ids FROM directory.destinations WHERE id IN (OLD.destination_id, NEW.destination_id);
    ELSE
      RETURN NULL;
    END IF;
  END IF;

  IF prov_ids IS NULL OR CARDINALITY(prov_ids) = 0 THEN
    RETURN NULL;
  END IF;

  -- Dispatch on TG_TABLE_NAME
  IF TG_TABLE_NAME = 'destinations' THEN
    UPDATE directory.provinces p
    SET destinations_count = (
      SELECT COUNT(*)
      FROM directory.destinations d
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  ELSIF TG_TABLE_NAME = 'attractions' THEN
    UPDATE directory.provinces p
    SET attractions_count = (
      SELECT COUNT(*)
      FROM directory.attractions a
      JOIN directory.destinations d ON a.destination_id = d.id
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  ELSIF TG_TABLE_NAME = 'tourism_villages' THEN
    UPDATE directory.provinces p
    SET villages_count = (
      SELECT COUNT(*)
      FROM directory.tourism_villages v
      JOIN directory.destinations d ON v.destination_id = d.id
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  ELSIF TG_TABLE_NAME = 'itineraries' THEN
    UPDATE directory.provinces p
    SET itineraries_count = (
      SELECT COUNT(*)
      FROM directory.itineraries i
      JOIN directory.destinations d ON i.destination_id = d.id
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  ELSIF TG_TABLE_NAME = 'tour_guides' THEN
    UPDATE directory.provinces p
    SET tour_guides_count = (
      SELECT COUNT(*)
      FROM directory.tour_guides g
      JOIN directory.destinations d ON g.destination_id = d.id
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  ELSIF TG_TABLE_NAME = 'journals' THEN
    UPDATE directory.provinces p
    SET journals_count = (
      SELECT COUNT(*)
      FROM directory.journals j
      JOIN directory.destinations d ON j.destination_id = d.id
      WHERE d.province_id = p.id
    )
    WHERE p.id = ANY(prov_ids);
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ── 3. Create Triggers ───────────────────────────────────────
CREATE TRIGGER destinations_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.destinations
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

CREATE TRIGGER attractions_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.attractions
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

CREATE TRIGGER tourism_villages_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.tourism_villages
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

CREATE TRIGGER itineraries_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.itineraries
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

CREATE TRIGGER tour_guides_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.tour_guides
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

CREATE TRIGGER journals_update_province_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.journals
  FOR EACH ROW EXECUTE FUNCTION directory.update_province_counts();

-- ── 4. Backfill counts ───────────────────────────────────────
UPDATE directory.provinces p SET
  destinations_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.destinations d
    WHERE d.province_id = p.id
  ), 0),
  attractions_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.attractions a
    JOIN directory.destinations d ON a.destination_id = d.id
    WHERE d.province_id = p.id
  ), 0),
  villages_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.tourism_villages v
    JOIN directory.destinations d ON v.destination_id = d.id
    WHERE d.province_id = p.id
  ), 0),
  itineraries_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.itineraries i
    JOIN directory.destinations d ON i.destination_id = d.id
    WHERE d.province_id = p.id
  ), 0),
  tour_guides_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.tour_guides g
    JOIN directory.destinations d ON g.destination_id = d.id
    WHERE d.province_id = p.id
  ), 0),
  journals_count = COALESCE((
    SELECT COUNT(*)
    FROM directory.journals j
    JOIN directory.destinations d ON j.destination_id = d.id
    WHERE d.province_id = p.id
  ), 0);
