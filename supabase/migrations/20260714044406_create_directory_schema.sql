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

-- ── 5. Seed awal (dari explore-data.ts) ──────────────────────
-- base64 di-generate via: npm run gen:blur
INSERT INTO directory.islands (id, name, provinces_count, cover_image) VALUES
  (
    'sumatera', 'Sumatera', 10,
    '{"url":"https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70","blurhash":"LGF5]+Yk^6#M@-5c,1J5@[or[Q6.","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVQImQH4AAf/AKfU6czm8sLj8Mvo89Hr9dbt9s3m8+Lv+Pz9/////wDH4/DW7fa13e6s2+6y4fOy4fSc2/CD0uuK1O2E0OkAueX2uef2hKi7hKe2r9XljsLWlMvektHkltXro97yAGeeoXKnsVNfWkliaZa7y4SntrTI0s7W3sjX38PX4QAACwBHSSgxKg0wKhpPVElahI4tV1wFSlMAY3cAZnwAPTAOQTUZSzcTMyYAJB0ANzIaGRcADBEAIS4nVYGQAAkkHDpUTBEeFxQsM5KpsI6lsJ+0vae5wLnI0b7U3gB2ttB6ttRDan8RSl9Vj6opbYdLgJlym7Fxpr14tNAxmIfzgbvVPAAAAABJRU5ErkJggg=="}'
  ),
  (
    'jawa', 'Jawa', 6,
    '{"url":"https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70","blurhash":"LNH_s_xt4nxu_4RjIUj[~qxut7of","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA4klEQVQImWNgYGFwDjHdtGfTgSP7/v3/f+zsoeMnDx07dbiyrUnH1pFBQoFH2Vg2Ii9229GT7fNXJdfmNM5oS8iNU9DV55WUZzB3lbT31neP8fXKiA/MDw3LdQ5M8zJ0MhBXV2AVEWTwT+XOqBMv69FMqDRJrrILy9Cz9Ve2dNeW0BThkWBmCMkUS6oUrpsoU94nFZQpbu4jpeckqWwkIaHNyaHAwOAcJh+WzZdULZxQLxJWLGAfwcYqysAgwMCryMAgysCgYSNk4cvvk8ZtHcbmEMdh6c8CEuVlYGBnYGBhAADoeDtukTXnhgAAAABJRU5ErkJggg=="}'
  ),
  (
    'kalimantan', 'Kalimantan', 5,
    '{"url":"https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70","blurhash":"LGF5]+Yk^6#M@-5c,1J5@[or[Q6.","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVQImQH4AAf/AKfU6czm8sLj8Mvo89Hr9dbt9s3m8+Lv+Pz9/////wDH4/DW7fa13e6s2+6y4fOy4fSc2/CD0uuK1O2E0OkAueX2uef2hKi7hKe2r9XljsLWlMvektHkltXro97yAGeeoXKnsVNfWkliaZa7y4SntrTI0s7W3sjX38PX4QAACwBHSSgxKg0wKhpPVElahI4tV1wFSlMAY3cAZnwAPTAOQTUZSzcTMyYAJB0ANzIaGRcADBEAIS4nVYGQAAkkHDpUTBEeFxQsM5KpsI6lsJ+0vae5wLnI0b7U3gB2ttB6ttRDan8RSl9Vj6opbYdLgJlym7Fxpr14tNAxmIfzgbvVPAAAAABJRU5ErkJggg=="}'
  ),
  (
    'sulawesi', 'Sulawesi', 6,
    '{"url":"https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=900&auto=format&fit=crop&q=70","blurhash":"LCHLh[xu4nxu-;WBM{j[~qj[D%xt","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5ElEQVQImQHZACb/AJG3yqPF17TR4r7Y6M7n9Nzx+/T9/9nl7X+MiiQfAAC50N7F2efQ4Ozc7fbE0dW7ycx4jY84RkYfJhkjGAAATn+UY5WnMFZbQmJnSV1gLDY0Iy4mIiQaPToyEAAAAABZawBxfgBcZABzdgB6eABrZmeMhZOXiIFyZjEpIwAAZmsAfn8Aj44App8AjoGc49mo0MH2+uniw6o7OTMAAF5gAHJxAI6HN52QKyQTvb2v3NG/8dWodmU5MiwqAABNSgBYVTt+b3OyowkYE15QOcS1lI17PzYzCS8pKAP0YJP06ZEpAAAAAElFTkSuQmCC"}'
  ),
  (
    'papua', 'Papua', 2,
    '{"url":"https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&auto=format&fit=crop&q=70","blurhash":"LBHexJ%M00xu~qkBIUof?wofD%kB","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAz0lEQVQImWNgUDFkUDUEkXCkasjAoG4CRqZg0phBzRjEYLD1YbD1BSEbbyjD3ofBoqpXv6rHoHaCZeNU/YZJ8bPWxE1bwbDg3L1N997t/fj/xL//q978vv3//75nXxjWnb3z7v//Nx9/3D1+6vOf/w/+/z/6+D2DtE+Ef1O/u2+Ql6p8TEFl1tQlDulFDAx8ogzyGgwqmgyCEgyq6gy6pgwKOgwMPNwMPHwMSvwMGkIMUsIMqsIMQiIMDKIMDCIMDAIMDBqsDFJMDFIMDEIMAB6wQoBAaEB7AAAAAElFTkSuQmCC"}'
  ),
  (
    'bali-nusa', 'Bali & Nusa', 3,
    '{"url":"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=70","blurhash":"LdHe9S%2RjWB~qt7WBaz?bj[ayj[","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVQImQH6AAX/APft5vju5/ft5Pjv5vry6Pry6vnx6fnx5wD99e/88er+/PbKx8Df2tP+/Pb99vD++fMA3dLA4NXD8+bVhYJ4pp6S9+jY49XE1MSuACIwJDdGN0xWQiAmHk5OQJWPc4V/YoSBYwAACQIbGw44MiAaFgomIxgtLiJlX0l8eWEAABAACA8AJCIURTYeHhQAFxAAU0grHSIZAAAJDQASEQEWEAAAAAYOAhcaEi0yIyg1KQDhzbjWx7Hiz7g7PTh1cGP13sbbyLLFtqEA8ta97dG4993DamRWk4l4+eXK9d7I+ebQAMywk8CniLmfgXJoVIt9Yrmhg8StjNO4md17gEFCy7GWAAAAAElFTkSuQmCC"}'
  ),
  (
    'maluku', 'Maluku', 2,
    '{"url":"https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70","blurhash":"LGF5]+Yk^6#M@-5c,1J5@[or[Q6.","base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVQImQH4AAf/AKfU6czm8sLj8Mvo89Hr9dbt9s3m8+Lv+Pz9/////wDH4/DW7fa13e6s2+6y4fOy4fSc2/CD0uuK1O2E0OkAueX2uef2hKi7hKe2r9XljsLWlMvektHkltXro97yAGeeoXKnsVNfWkliaZa7y4SntrTI0s7W3sjX38PX4QAACwBHSSgxKg0wKhpPVElahI4tV1wFSlMAY3cAZnwAPTAOQTUZSzcTMyYAJB0ANzIaGRcADBEAIS4nVYGQAAkkHDpUTBEeFxQsM5KpsI6lsJ+0vae5wLnI0b7U3gB2ttB6ttRDan8RSl9Vj6opbYdLgJlym7Fxpr14tNAxmIfzgbvVPAAAAABJRU5ErkJggg=="}'
  )
ON CONFLICT (id) DO NOTHING;

