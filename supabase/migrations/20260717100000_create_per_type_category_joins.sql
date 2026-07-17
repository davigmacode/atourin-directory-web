-- =============================================================
-- Migration: create_per_type_category_joins
-- Schema   : directory
-- Description:
--   Creates 5 typed join tables — one per (entity, kind) pair
--   that needs a category-style join. Plus `village_activities`
--   for activity tagging on tourism villages.
--
--   Each table has explicit FKs to both the entity and the
--   taxonomy, ON DELETE CASCADE on both, and a composite PK.
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

-- 3c. village_categories (regular category tags on villages)
CREATE TABLE IF NOT EXISTS directory.village_categories (
  village_id   text NOT NULL REFERENCES directory.tourism_villages(id) ON DELETE CASCADE,
  taxonomy_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (village_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS village_categories_taxonomy_idx
  ON directory.village_categories (taxonomy_id);

-- 3d. itinerary_categories — placeholder for when itineraries table exists.

-- 3e. guide_categories — used for guide specialisms.
-- `is_primary` flags the lead specialism shown first in the UI.
CREATE TABLE IF NOT EXISTS directory.guide_categories (
  guide_id     text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  taxonomy_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  is_primary   boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (guide_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS guide_categories_taxonomy_idx
  ON directory.guide_categories (taxonomy_id);

-- 3f. village_activities — activities tagged on villages.
-- Kept separate from `village_categories` because the `type`
-- value differs (`village_activity` vs `category`).
CREATE TABLE IF NOT EXISTS directory.village_activities (
  village_id   text NOT NULL REFERENCES directory.tourism_villages(id) ON DELETE CASCADE,
  taxonomy_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (village_id, taxonomy_id)
);
CREATE INDEX IF NOT EXISTS village_activities_taxonomy_idx
  ON directory.village_activities (taxonomy_id);
