-- =============================================================
-- Migration: create_per_type_category_joins
-- Schema   : directory
-- Description:
--   Only tour_guide_specialism remains here.
--   The following join tables have been replaced by text[]
--   columns on their respective entity tables:
--     attraction_categories       -> attractions.categories
--     destination_categories      -> destinations.categories
--     tourism_village_categories  -> tourism_villages.categories
--     tourism_village_activities  -> tourism_villages.activities
--     itinerary_languages         -> itineraries.languages
--     itinerary_highlights        -> itineraries.highlights
--     itinerary_categories        -> itineraries.categories
-- =============================================================

-- tour_guide_specialism — used for guide specialisms.
-- `is_primary` flags the lead specialism shown first in the UI.
CREATE TABLE IF NOT EXISTS directory.tour_guide_specialism (
  guide_id     text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  taxonomy_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  is_primary   boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (guide_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS tour_guide_specialism_taxonomy_idx
  ON directory.tour_guide_specialism (taxonomy_id);
