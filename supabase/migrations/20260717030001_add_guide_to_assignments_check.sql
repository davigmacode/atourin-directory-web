-- =============================================================
-- Migration: add_guide_to_facility_assignments_check
-- Schema   : directory
-- Description:
--   Extends the entity_type CHECK constraint on
--   facility_assignments to include 'guide', in preparation
--   for tour_guides integration.
-- =============================================================

ALTER TABLE directory.facility_assignments
  DROP CONSTRAINT IF EXISTS facility_assignments_entity_type_check;

ALTER TABLE directory.facility_assignments
  ADD CONSTRAINT facility_assignments_entity_type_check
    CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'));
