-- =============================================================
-- Migration: create_certifications_table
-- Schema   : directory
-- Description:
--   Catalog table for all certifications (training, competency,
--   award). The polymorphic join tables (tourism_village_certifications,
--   tour_guide_certifications) are created in a later migration
--   so the FK references resolve.
-- =============================================================

-- ── 1. Table: certifications (catalog) ──────────────────────
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

CREATE INDEX IF NOT EXISTS certifications_slug_idx        ON directory.certifications (slug);
CREATE INDEX IF NOT EXISTS certifications_type_idx        ON directory.certifications (type);
CREATE INDEX IF NOT EXISTS certifications_issuer_idx      ON directory.certifications (issuer);
CREATE INDEX IF NOT EXISTS certifications_name_id_idx     ON directory.certifications ((name->>'id'));
CREATE INDEX IF NOT EXISTS certifications_name_en_idx     ON directory.certifications ((name->>'en'));
CREATE INDEX IF NOT EXISTS certifications_entity_types_idx ON directory.certifications USING gin (entity_types);

CREATE TRIGGER certifications_updated_at
  BEFORE UPDATE ON directory.certifications
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
