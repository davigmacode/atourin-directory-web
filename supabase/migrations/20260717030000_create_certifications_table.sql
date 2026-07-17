-- =============================================================
-- Migration: create_certifications_table
-- Schema   : directory
-- Description:
--   Polymorphic certifications system for training, competency,
--   and award certificates. Designed to be shared by:
--     - tourism_villages (entity_type = 'village')
--     - tour_guides      (entity_type = 'guide')
-- =============================================================

-- ── 1. Table: certifications ───────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.certifications (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug          text UNIQUE NOT NULL,
  name          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  type          text NOT NULL,
  issuer        text NOT NULL DEFAULT '',
  entity_types  text[] NOT NULL DEFAULT '{}'::text[],
  metadata      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT certifications_type_check
    CHECK (type IN ('training', 'competency', 'award'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS certifications_slug_idx        ON directory.certifications (slug);
CREATE INDEX IF NOT EXISTS certifications_type_idx        ON directory.certifications (type);
CREATE INDEX IF NOT EXISTS certifications_issuer_idx      ON directory.certifications (issuer);
CREATE INDEX IF NOT EXISTS certifications_name_id_idx     ON directory.certifications ((name->>'id'));
CREATE INDEX IF NOT EXISTS certifications_name_en_idx     ON directory.certifications ((name->>'en'));
CREATE INDEX IF NOT EXISTS certifications_entity_types_idx ON directory.certifications USING gin (entity_types);

-- Trigger for updated_at
CREATE TRIGGER certifications_updated_at
  BEFORE UPDATE ON directory.certifications
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: certification_assignments (Polymorphic) ──────────
CREATE TABLE IF NOT EXISTS directory.certification_assignments (
  certification_id  text NOT NULL REFERENCES directory.certifications(id) ON DELETE CASCADE,
  entity_type       text NOT NULL,
  entity_id         text NOT NULL,
  issued_at         date,
  expires_at        date,
  certificate_url   text,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now(),

  PRIMARY KEY (certification_id, entity_type, entity_id),

  CONSTRAINT certification_assignments_entity_type_check
    CHECK (entity_type IN ('village', 'guide'))
);

CREATE INDEX IF NOT EXISTS certification_assignments_entity_idx
  ON directory.certification_assignments (entity_type, entity_id);

CREATE INDEX IF NOT EXISTS certification_assignments_cert_idx
  ON directory.certification_assignments (certification_id);
