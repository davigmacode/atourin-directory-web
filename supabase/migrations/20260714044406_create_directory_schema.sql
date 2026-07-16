-- =============================================================
-- Migration: create_directory_schema
-- Schema   : directory
-- =============================================================

-- ── 1. Create schema ─────────────────────────────────────────
CREATE SCHEMA IF NOT EXISTS directory;

-- Grant akses ke Supabase roles
GRANT USAGE ON SCHEMA directory TO anon, authenticated, service_role;

-- Default privileges: tabel & sequence yg dibuat ke depan otomatis ter-grant
ALTER DEFAULT PRIVILEGES IN SCHEMA directory
  GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA directory
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- ── 2. Composite type: cover_image ───────────────────────────
-- Dipakai sebagai jsonb di semua tabel yg punya field gambar.
-- Struktur jsonb yg diharapkan:
--   {
--     "url":      "https://...",
--     "blurhash": "LGF5]+Yk^6...",   -- nullable
--     "base64":   "data:image/..."    -- nullable
--   }

-- ── 3. Table: islands ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS directory.islands (
  -- id menggunakan text (slug-based), bukan uuid,
  -- agar konsisten dengan Island.id di src/types/island.ts
  id               text PRIMARY KEY,

  name             text        NOT NULL,
  provinces_count  integer     NOT NULL DEFAULT 0,

  -- cover disimpan sebagai jsonb agar satu field merepresentasikan
  -- CoverImage { url, blurhash, base64 } sekaligus.
  -- Tabel lain yg punya gambar bisa pakai pola yang sama.
  cover_image      jsonb,

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Check constraint: pastikan jsonb cover_image minimal punya key "url"
ALTER TABLE directory.islands
  ADD CONSTRAINT islands_cover_image_has_url
  CHECK (
    cover_image IS NULL
    OR (cover_image ? 'url' AND jsonb_typeof(cover_image->'url') = 'string')
  );

-- Index untuk pencarian berdasarkan nama
CREATE INDEX IF NOT EXISTS islands_name_idx
  ON directory.islands (name);

-- ── 4. Auto-update updated_at ────────────────────────────────
-- Function trigger untuk auto-set updated_at
CREATE OR REPLACE FUNCTION directory.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER islands_updated_at
  BEFORE UPDATE ON directory.islands
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
