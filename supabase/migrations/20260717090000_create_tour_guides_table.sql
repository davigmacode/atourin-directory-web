-- =============================================================
-- Migration: create_tour_guides_table
-- Schema   : directory
-- Description:
--   Creates the tour_guides entity along with two related tables:
--     - tour_guide_languages : join with categories (guide_language)
--     - tour_guide_packages  : trip packages offered by a guide
--
--   Specialisms are stored in category_assignments (entity_type='guide').
--   Certifications are stored in certification_assignments (entity_type='guide').
--   Gallery is stored in media (entity_type='guide').
-- =============================================================

-- ── 1. tour_guides ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.tour_guides (
  id               text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug             text UNIQUE NOT NULL,
  name             text NOT NULL,
  description      jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  destination_id   text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  avatar           jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null}'::jsonb,
  cover_image      jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null}'::jsonb,
  verified         boolean NOT NULL DEFAULT false,
  rating_average   numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count    integer NOT NULL DEFAULT 0,
  trips_count      integer NOT NULL DEFAULT 0,
  year_experience  integer NOT NULL DEFAULT 0,
  daily_rate       integer NOT NULL DEFAULT 0,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tour_guides_slug_idx           ON directory.tour_guides (slug);
CREATE INDEX IF NOT EXISTS tour_guides_destination_id_idx ON directory.tour_guides (destination_id);
CREATE INDEX IF NOT EXISTS tour_guides_verified_idx       ON directory.tour_guides (verified);
CREATE INDEX IF NOT EXISTS tour_guides_rating_idx         ON directory.tour_guides (rating_average DESC);

CREATE TRIGGER tour_guides_updated_at
  BEFORE UPDATE ON directory.tour_guides
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. tour_guide_languages ─────────────────────────────────────
-- Languages are categories with entity_types containing 'guide_language'.
-- This join table adds fluency rating per guide per language.
CREATE TABLE IF NOT EXISTS directory.tour_guide_languages (
  guide_id     text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  category_id  text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  fluency      text NOT NULL DEFAULT 'conversational',
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (guide_id, category_id),
  CONSTRAINT tour_guide_languages_fluency_check
    CHECK (fluency IN ('native', 'fluent', 'conversational', 'basic'))
);

CREATE INDEX IF NOT EXISTS tour_guide_languages_guide_idx ON directory.tour_guide_languages (guide_id);

-- ── 3. tour_guide_packages ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.tour_guide_packages (
  id                   text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  guide_id             text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  slug                 text UNIQUE NOT NULL,
  title                jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  description          jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  is_bestseller        boolean NOT NULL DEFAULT false,
  duration_days        integer NOT NULL DEFAULT 1,
  duration_nights      integer NOT NULL DEFAULT 0,
  schedule_start       text NOT NULL DEFAULT '',
  schedule_end         text NOT NULL DEFAULT '',
  min_pax              integer NOT NULL DEFAULT 1,
  max_pax              integer NOT NULL DEFAULT 1,
  transport_type       text NOT NULL DEFAULT '',
  transport_capacity   text NOT NULL DEFAULT '',
  price_per_pax        integer NOT NULL DEFAULT 0,
  price_note           text NOT NULL DEFAULT '',
  highlights           jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order           integer NOT NULL DEFAULT 0,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tour_guide_packages_guide_id_idx ON directory.tour_guide_packages (guide_id);
CREATE INDEX IF NOT EXISTS tour_guide_packages_slug_idx     ON directory.tour_guide_packages (slug);

CREATE TRIGGER tour_guide_packages_updated_at
  BEFORE UPDATE ON directory.tour_guide_packages
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
