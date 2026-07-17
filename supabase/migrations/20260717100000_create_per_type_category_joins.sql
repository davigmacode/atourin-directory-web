-- =============================================================
-- Migration: create_per_type_category_joins
-- Schema   : directory
-- Description:
--   Creates 5 typed join tables ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â one per (entity, kind) pair
--   that needs a category-style join. Plus `tourism_village_activities`
--   for activity tagging on tourism villages.
--
--   Each table has explicit FKs to both the entity and the
--   taxonomy, ON DELETE CASCADE on both, and a composite PK.
--
--   Naming convention: main entity is plural
--   (`tourism_villages`), join tables use singular prefix
--   (`tourism_village_*`, `tour_guide_*`).
--
--   These are placed after all entity tables (destinations,
--   attractions, tourism_villages, tour_guides) exist so the
--   FK references resolve.
-- =============================================================

-- 3a. attraction_categories
CREATE TABLE IF NOT EXISTS directory.attraction_categories (
  attraction_id  text NOT NULL REFERENCES directory.attractions(id) ON DELETE CASCADE,
  taxonomy_id    text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at     timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (attraction_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS attraction_categories_taxonomy_idx
  ON directory.attraction_categories (taxonomy_id);

-- 3b. destination_categories
CREATE TABLE IF NOT EXISTS directory.destination_categories (
  destination_id  text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  taxonomy_id     text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (destination_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS destination_categories_taxonomy_idx
  ON directory.destination_categories (taxonomy_id);

-- 3c. tourism_village_categories (regular category tags on villages)
CREATE TABLE IF NOT EXISTS directory.tourism_village_categories (
  tourism_village_id  text NOT NULL REFERENCES directory.tourism_villages(id) ON DELETE CASCADE,
  taxonomy_id         text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at          timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tourism_village_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS tourism_village_categories_taxonomy_idx
  ON directory.tourism_village_categories (taxonomy_id);

-- 3d. itinerary_categories ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â placeholder for when itineraries table exists.

-- 3e. tour_guide_specialism ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â used for guide specialisms.
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

-- 3f. tourism_village_activities ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â activities tagged on villages.
-- Kept separate from `tourism_village_categories` because the
-- `type` value differs (`village_activity` vs `category`).
CREATE TABLE IF NOT EXISTS directory.tourism_village_activities (
  tourism_village_id  text NOT NULL REFERENCES directory.tourism_villages(id) ON DELETE CASCADE,
  taxonomy_id         text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at          timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tourism_village_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS tourism_village_activities_taxonomy_idx
  ON directory.tourism_village_activities (taxonomy_id);
