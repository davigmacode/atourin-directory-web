-- =============================================================
-- Migration: add_itineraries_count_trigger
-- Schema   : directory
-- Description:
--   The function `directory.update_destination_counts()` already
--   handles TG_TABLE_NAME = 'itineraries', but the trigger was
--   never created. This migration adds it and backfills the
--   count for all destinations.
-- =============================================================

CREATE TRIGGER itineraries_update_destination_count
  AFTER INSERT OR DELETE OR UPDATE ON directory.itineraries
  FOR EACH ROW EXECUTE FUNCTION directory.update_destination_counts();

-- Backfill itineraries_count for all destinations
UPDATE directory.destinations d SET
  itineraries_count = COALESCE((SELECT COUNT(*) FROM directory.itineraries i WHERE i.destination_id = d.id), 0);
