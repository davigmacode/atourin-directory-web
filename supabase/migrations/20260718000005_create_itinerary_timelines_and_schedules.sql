-- =============================================================
-- Migration: create_itinerary_timelines_and_schedules
-- Description:
--   `itinerary_daily_timelines` — events/activities per day
--                                  (normalized from jsonb).
--   `itinerary_schedules`       — concrete departure instances
--                                  (no plan FK, just itinerary +
--                                   start_date).
-- =============================================================

-- ── 1. Table: itinerary_daily_timelines ──────────────────────
CREATE TABLE directory.itinerary_daily_timelines (
  id                  text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which day this event belongs to
  itinerary_daily_id  text NOT NULL REFERENCES directory.itinerary_daily(id) ON DELETE CASCADE,
  -- Scheduled time for the event (e.g. "07:30", "14:00")
  time                text NOT NULL,
  -- Duration in MINUTES (UI formats: <60 → "X min", >=60 → "X jam Y min")
  -- NULL = open-ended / no fixed duration
  duration_minutes    integer CHECK (duration_minutes IS NULL OR duration_minutes >= 0),
  -- Multilingual event title: { id: "Penjemputan di hotel", en: "Hotel pickup" }
  title               jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Which stop this event is at (NULL = in-transit event, e.g. "scenic drive")
  stop_id             text REFERENCES directory.itinerary_daily_stops(id) ON DELETE SET NULL,
  -- Multilingual detailed description of the activity
  description         jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Specific inclusions list: ["Termasuk tiket masuk", "Termasuk makan siang"]
  includes            jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Travel info for transit items (e.g. "12 km · 25 min")
  travel_info         text,
  -- Display order within the day (0-indexed, sorted by time)
  sort_order          integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX itinerary_daily_timelines_day_idx
  ON directory.itinerary_daily_timelines(itinerary_daily_id, sort_order);
CREATE INDEX itinerary_daily_timelines_stop_idx
  ON directory.itinerary_daily_timelines(stop_id) WHERE stop_id IS NOT NULL;

CREATE TRIGGER itinerary_daily_timelines_updated_at
  BEFORE UPDATE ON directory.itinerary_daily_timelines
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: itinerary_schedules ────────────────────────────
-- Concrete departure date instances for an itinerary.
-- Intentionally has no plan_id FK — schedule is independent of
-- the daily template; only linked to the parent itinerary.
CREATE TABLE directory.itinerary_schedules (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Parent itinerary
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- First day of this departure (e.g. "2026-08-07")
  start_date    date NOT NULL,
  -- Optional title override for this specific departure
  custom_title  text,
  -- Booking status: scheduled (default) â†' available â†' sold_out â†' cancelled
  status        text NOT NULL DEFAULT 'scheduled'
    CHECK (status IN ('scheduled', 'available', 'sold_out', 'cancelled')),
  -- Per-schedule pax limits (NULL = fallback to itinerary's min_pax / max_pax)
  min_pax       integer CHECK (min_pax IS NULL OR min_pax >= 1),
  max_pax       integer CHECK (max_pax IS NULL OR max_pax >= 1),
  -- Per-schedule budget override in IDR (NULL = use itinerary.budget_estimation)
  -- Allows seasonal pricing (e.g., peak season = higher per-person price)
  budget_estimation integer CHECK (budget_estimation IS NULL OR budget_estimation >= 0),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX itinerary_schedules_itinerary_idx  ON directory.itinerary_schedules(itinerary_id);
CREATE INDEX itinerary_schedules_start_date_idx ON directory.itinerary_schedules(start_date);

CREATE TRIGGER itinerary_schedules_updated_at
  BEFORE UPDATE ON directory.itinerary_schedules
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
