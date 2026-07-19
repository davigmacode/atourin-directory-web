-- =============================================================
-- Migration: create_itineraries_core
-- Description:
--   `itineraries` — main itinerary records
--   Languages, categories, highlights, and target_audience
--   are stored as text[] array columns (taxonomy slugs),
--   eliminating the need for separate join tables.
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

  -- === Taxonomy slugs arrays (replaces join tables) ===
  -- Languages: text[] of slugs (type='language'), e.g. '{id,en}'
  languages         text[] NOT NULL DEFAULT '{}',
  -- Categories: text[] of slugs (type='itinerary_category'), array order = display order
  categories        text[] NOT NULL DEFAULT '{}',
  -- Highlights: text[] of slugs (type='itinerary_highlight'), array order = display order
  -- Descriptions come from taxonomies.description (global), not per-itinerary override
  highlights        text[] NOT NULL DEFAULT '{}',
  -- Target audience: text[] of slugs (type='target_audience'), e.g. '{solo,couple,group}'
  target_audience   text[] NOT NULL DEFAULT '{}',

  -- === Classification ===
  -- Difficulty: easy | medium | hard
  difficulty      text CHECK (difficulty IN ('easy', 'medium', 'hard')),

  -- === Budget ===
  -- Single display value (e.g. 2450000 = "Mulai dari Rp 2.45jt")
  budget_estimation   integer,
  -- Itemized breakdown: [{ label, sublabel?, amount }, ...]
  budget_breakdown    jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- === Best time to visit ===
  -- Monthly weather quality: { jan: "rain", feb: "ok", ..., dec: "ideal" }
  -- Values: "rain" | "ok" | "ideal" UI maps to red/yellow/green
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

CREATE INDEX itineraries_slug_idx            ON directory.itineraries(slug);
CREATE INDEX itineraries_destination_idx     ON directory.itineraries(destination_id);
CREATE INDEX itineraries_author_idx          ON directory.itineraries(author_id);
CREATE INDEX itineraries_published_idx       ON directory.itineraries(is_published) WHERE is_published = true;
-- GIN indexes for array containment filters
CREATE INDEX itineraries_languages_idx       ON directory.itineraries USING gin(languages);
CREATE INDEX itineraries_categories_idx      ON directory.itineraries USING gin(categories);
CREATE INDEX itineraries_highlights_idx      ON directory.itineraries USING gin(highlights);
CREATE INDEX itineraries_target_audience_idx ON directory.itineraries USING gin(target_audience);

CREATE TRIGGER itineraries_updated_at
  BEFORE UPDATE ON directory.itineraries
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
