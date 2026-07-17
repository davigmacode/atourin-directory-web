-- =============================================================
-- Migration: add_guide_to_assignments_check
-- Schema   : directory
-- Description:
--   Extends the entity_type CHECK constraint on
--   taxonomy_assignments (formerly category_assignments) to
--   include 'guide_category', in preparation for tour_guides.
--
--   facility_assignments is unchanged by this migration; the
--   `*_category` suffix is only used on the taxonomy side.
-- =============================================================

-- ── 1. taxonomy_assignments ────────────────────────────────────
ALTER TABLE directory.taxonomy_assignments
  DROP CONSTRAINT IF EXISTS taxonomy_assignments_entity_type_check;

ALTER TABLE directory.taxonomy_assignments
  ADD CONSTRAINT taxonomy_assignments_entity_type_check
    CHECK (entity_type IN (
      'attraction_category',
      'destination_category',
      'village_category',
      'itinerary_category',
      'guide_category'
    ));

-- ── 2. facility_assignments ────────────────────────────────────
ALTER TABLE directory.facility_assignments
  DROP CONSTRAINT IF EXISTS facility_assignments_entity_type_check;

ALTER TABLE directory.facility_assignments
  ADD CONSTRAINT facility_assignments_entity_type_check
    CHECK (entity_type IN ('destination', 'attraction', 'village', 'itinerary', 'guide'));
