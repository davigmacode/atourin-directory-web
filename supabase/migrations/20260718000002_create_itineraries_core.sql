-- =============================================================
-- Migration: create_itineraries_core
-- Description:
--   `itineraries`         — main itinerary records
--   `itinerary_languages` — M:N link to taxonomies (type='language')
--   `itinerary_highlights`— M:N link to taxonomies (type='itinerary_highlight')
--                           with per-itinerary description override
-- =============================================================

-- ── 1. Table: itineraries ────────────────────────────────────
CREATE TABLE directory.itineraries (
  id              text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug            text UNIQUE NOT NULL,
  -- Multilingual name: { id, en }
  name            jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Multilingual description: { id, en }
  description     jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Hero/cover image: { url, blurhash, base64 }
  cover_image     jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null, "base64": null}'::jsonb,

  -- === Metrics ===
  rating_average  numeric(3,2) NOT NULL DEFAULT 0.0
    CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
  reviews_count   integer NOT NULL DEFAULT 0,
  views_count     integer NOT NULL DEFAULT 0,
  saves_count     integer NOT NULL DEFAULT 0,

  -- === Duration & pax ===
  duration_days   integer NOT NULL DEFAULT 1,
  duration_nights integer NOT NULL DEFAULT 0,
  min_pax         integer NOT NULL DEFAULT 1,
  max_pax         integer NOT NULL DEFAULT 1,

  -- === Relations ===
  destination_id  text NOT NULL REFERENCES directory.destinations(id) ON DELETE CASCADE,
  -- The creator who authored this itinerary
  author_id       text NOT NULL REFERENCES directory.creators(id) ON DELETE RESTRICT,
  -- role is derived from creator_badges via author_id (no role_id column here)

  -- === Classification ===
  -- Category: handled via itinerary_categories join table
  -- Difficulty: easy | medium | hard
  difficulty      text CHECK (difficulty IN ('easy', 'medium', 'hard')),

  -- === Budget ===
  -- Single display value (e.g. 2450000 = "Mulai dari Rp 2.45jt")
  budget_estimation   integer,
  -- Itemized breakdown: [{ label, sublabel?, amount }, ...]
  budget_breakdown    jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- === Suitability ===
  -- Target audience chips: ["Solo", "Couple", "Group", "Family"]
  target_audience     jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- === Best time to visit ===
  -- Monthly weather quality: { jan: "rain", feb: "ok", ..., dec: "ideal" }
  -- Values: "rain" | "ok" | "ideal" — UI maps to red/yellow/green
  best_time_weather   jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Monthly crowd level: { jan: "high", feb: "mid", ..., dec: "low" }
  -- Values: "low" | "mid" | "high"
  best_time_crowd     jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Multilingual note about best time: { id, en }
  best_time_note      jsonb,

  -- === Flags ===
  is_featured     boolean NOT NULL DEFAULT false,
  is_published    boolean NOT NULL DEFAULT true,

  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX itineraries_slug_idx        ON directory.itineraries(slug);
CREATE INDEX itineraries_destination_idx ON directory.itineraries(destination_id);
CREATE INDEX itineraries_author_idx      ON directory.itineraries(author_id);
-- NOTE: no category index here — categories live in itinerary_categories table
CREATE INDEX itineraries_published_idx   ON directory.itineraries(is_published) WHERE is_published = true;

CREATE TRIGGER itineraries_updated_at
  BEFORE UPDATE ON directory.itineraries
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: itinerary_languages ────────────────────────────
-- M:N: itinerary ↔ taxonomies (type='language')
CREATE TABLE directory.itinerary_languages (
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- taxonomy_id references a row with type='language' (e.g. id='en', slug='en')
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, taxonomy_id)
);

CREATE INDEX itinerary_languages_tax_idx ON directory.itinerary_languages(taxonomy_id);

-- ── 3. Table: itinerary_highlights ───────────────────────────
-- M:N: itinerary ↔ taxonomies (type='itinerary_highlight')
-- with per-itinerary description override and display order
CREATE TABLE directory.itinerary_highlights (
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- taxonomy_id references a row with type='itinerary_highlight'
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  -- Per-itinerary description override (e.g. "Jelajahi garis pantai eksotis...")
  description   jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Display order within the itinerary (0-indexed, lower = first)
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, taxonomy_id)
);

CREATE INDEX itinerary_highlights_tax_idx ON directory.itinerary_highlights(taxonomy_id);
