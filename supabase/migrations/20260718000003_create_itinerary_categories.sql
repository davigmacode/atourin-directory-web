-- =============================================================
-- Migration: create_itinerary_categories
-- Description:
--   `itinerary_categories` — M:N join between itineraries and
--   taxonomies (type='itinerary_category'). An itinerary can
--   have multiple categories (e.g. "Adventure" + "Family").
--   sort_order lets the UI show the primary category first.
-- =============================================================

CREATE TABLE directory.itinerary_categories (
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- references a taxonomy with type='itinerary_category'
  category_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE RESTRICT,
  -- Display order (0-indexed) — primary category is 0, secondary is 1, etc.
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, category_id)
);

CREATE INDEX itinerary_categories_cat_idx    ON directory.itinerary_categories(category_id);
CREATE INDEX itinerary_categories_order_idx  ON directory.itinerary_categories(itinerary_id, sort_order);
