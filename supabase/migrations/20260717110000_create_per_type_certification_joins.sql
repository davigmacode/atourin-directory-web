-- =============================================================
-- Migration: create_per_type_certification_joins
-- Schema   : directory
-- Description:
--   Creates the two per-type certification join tables.
--     - tourism_village_certifications (village awards)
--     - tour_guide_certifications (guide credentials)
--
--   Each has its own dedicated per-type columns:
--   villages track awarded_at/valid_until; guides track
--   issued_at/expires_at/certificate_url/proficiency_level.
--
--   Placed after both entity tables exist so FK references
--   resolve.
-- =============================================================

-- 1. tourism_village_certifications (village awards)
CREATE TABLE IF NOT EXISTS directory.tourism_village_certifications (
  tourism_village_id  text NOT NULL REFERENCES directory.tourism_villages(id) ON DELETE CASCADE,
  certification_id    text NOT NULL REFERENCES directory.certifications(id) ON DELETE CASCADE,
  awarded_at          date,
  valid_until         date,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tourism_village_id, certification_id)
);
CREATE INDEX IF NOT EXISTS tourism_village_certifications_cert_idx
  ON directory.tourism_village_certifications (certification_id);

-- 2. tour_guide_certifications (guide credentials)
CREATE TABLE IF NOT EXISTS directory.tour_guide_certifications (
  tour_guide_id        text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  certification_id     text NOT NULL REFERENCES directory.certifications(id) ON DELETE CASCADE,
  issued_at            date,
  expires_at           date,
  certificate_url      text,
  proficiency_level    text,
  notes                text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tour_guide_id, certification_id)
);
CREATE INDEX IF NOT EXISTS tour_guide_certifications_cert_idx
  ON directory.tour_guide_certifications (certification_id);
