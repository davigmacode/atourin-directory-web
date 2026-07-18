-- =============================================================
-- Migration: create_creators_and_badges
-- Description:
--   `creators`      — author profiles (optionally linked to
--                     Supabase auth users; may be synthetic
--                     accounts like "Atourin Official").
--   `creator_badges` — per-creator badge assignment (role/
--                      specialty tags shown on profile cards).
-- =============================================================

-- ── 1. Table: creators ───────────────────────────────────────
CREATE TABLE directory.creators (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Supabase auth user (nullable for synthetic accounts)
  user_id       uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  -- URL-friendly identifier used in profile page routing
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  -- Short display name shown in cards (e.g. "Welli" for "Welli Wilyanto")
  display_name  text,
  -- Avatar: { url, blurhash, base64 } — same shape as cover_image
  avatar        jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null, "base64": null}'::jsonb,
  -- Multilingual bio: { id, en }
  bio           jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  is_verified   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX creators_slug_idx ON directory.creators(slug);

CREATE TRIGGER creators_updated_at
  BEFORE UPDATE ON directory.creators
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. Table: creator_badges ─────────────────────────────────
CREATE TABLE directory.creator_badges (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which creator holds this badge
  creator_id    text NOT NULL REFERENCES directory.creators(id) ON DELETE CASCADE,
  -- What kind of badge (references taxonomies with type='creator_role')
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE RESTRICT,
  -- When the badge was awarded (NULL = from account creation)
  issued_at     date,
  -- When it expires (NULL = no expiry)
  valid_until   date,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- One badge kind per creator
  UNIQUE (creator_id, taxonomy_id)
);

CREATE INDEX creator_badges_creator_idx  ON directory.creator_badges(creator_id);
CREATE INDEX creator_badges_taxonomy_idx ON directory.creator_badges(taxonomy_id);

CREATE TRIGGER creator_badges_updated_at
  BEFORE UPDATE ON directory.creator_badges
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
