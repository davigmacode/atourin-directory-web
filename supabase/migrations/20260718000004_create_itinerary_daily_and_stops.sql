-- =============================================================
-- Migration: create_itinerary_daily_and_stops
-- Description:
--   `itinerary_daily`       — day templates (1 row per day per
--                             itinerary). Title is multilingual.
--                             Summary uses explicit integer
--                             columns (not jsonb) for type safety.
--   `itinerary_daily_stops` — places/attractions visited each
--                             day. Ordered via sort_order (not
--                             the SQL reserved keyword "order").
-- =============================================================

-- ── 1. Table: itinerary_daily ────────────────────────────────
CREATE TABLE directory.itinerary_daily (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which itinerary this day belongs to
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- Day number (1-indexed: Day 1, Day 2, ...)
  day_number    integer NOT NULL,
  -- Day title — multilingual: { id: "...", en: "..." }
  title         jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Explicit summary stats for the day (integer per field, type-safe)
  summary_stops integer NOT NULL DEFAULT 0,   -- count of stops
  summary_hours integer NOT NULL DEFAULT 0,   -- estimated total hours
  summary_km    integer NOT NULL DEFAULT 0,   -- estimated distance in km
  summary_price integer NOT NULL DEFAULT 0,   -- estimated day cost in IDR
  -- weather_pattern removed: use parent itinerary.best_time_weather instead
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- Enforce one row per (itinerary, day)
  UNIQUE (itinerary_id, day_number)
);

CREATE INDEX itinerary_daily_itin_idx ON directory.itinerary_daily(itinerary_id);

CREATE TRIGGER itinerary_daily_updated_at
  BEFORE UPDATE ON directory.itinerary_daily
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: itinerary_daily_stops ──────────────────────────
CREATE TABLE directory.itinerary_daily_stops (
  id                  text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which day this stop belongs to
  itinerary_daily_id  text NOT NULL REFERENCES directory.itinerary_daily(id) ON DELETE CASCADE,
  -- Place name shown in the stop pill
  name                text NOT NULL,
  -- Display order within the day (0-indexed)
  -- Named sort_order to avoid collision with SQL reserved keyword ORDER
  sort_order          integer NOT NULL DEFAULT 0,
  -- Optional geo coordinates for future map view
  lat                 numeric(9,6),
  lng                 numeric(9,6),
  -- Type of stop
  type                text NOT NULL DEFAULT 'attraction'
    CHECK (type IN ('attraction', 'food', 'rest', 'transport', 'photo', 'other')),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX itinerary_daily_stops_day_idx ON directory.itinerary_daily_stops(itinerary_daily_id, sort_order);

CREATE TRIGGER itinerary_daily_stops_updated_at
  BEFORE UPDATE ON directory.itinerary_daily_stops
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
