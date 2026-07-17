-- =============================================================
-- Migration: add_guide_to_assignments_check
-- Schema   : directory
-- Description:
--   Extends the entity_type CHECK constraint on existing
--   category_assignments and facility_assignments tables to
--   include 'guide', in preparation for tour_guides integration.
-- =============================================================

-- ── 1. category_assignments ────────────────────────────────────
ALTER TABLE directory.category_assignments
  DROP CONSTRAINT IF EXISTS category_assignments_entity_type_check;

ALTER TABLE directory.category_assignments
  ADD CONSTRAINT category_assignments_entity_type_check
    CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'));

-- ── 2. facility_assignments ────────────────────────────────────
ALTER TABLE directory.facility_assignments
  DROP CONSTRAINT IF EXISTS facility_assignments_entity_type_check;

ALTER TABLE directory.facility_assignments
  ADD CONSTRAINT facility_assignments_entity_type_check
    CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'));
