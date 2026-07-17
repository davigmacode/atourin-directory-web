# Tour Guides API — Handoff Document

> **Status**: Ready for implementation  
> **Target**: AI agent executing the full refactor  
> **Project**: `d:/projects/atourin-directory-web`  
> **Stack**: Next.js 16 App Router · Elysia · Supabase (PostgreSQL `directory` schema) · TypeScript

---

## Context & Goal

Refactor `src/app/api/guides/` (static mock JS) → `src/app/api/tour-guides/` (live PostgreSQL + Elysia + TypeScript).

This follows the exact same pattern as the already-implemented:
- `src/app/api/attractions/[[...slug]]/` — **primary reference**
- `src/app/api/tourism-villages/[[...slug]]/` — secondary reference

**Decisions made:**
- `profile_picture` renamed to `avatar`
- `destination_id` is **NOT NULL** (required base area)
- Package `highlights` are **free text jsonb** `[{ "id": "...", "en": "..." }]`, no FK to attractions
- Legacy `/api/guides` route: **delete entirely** (no external consumers)
- Languages stored in `categories` table with `entity_types = ['guide_language']`
- Specialism stored in `category_assignments` with `entity_type = 'guide'`

---

## Architecture Overview

```
directory.tour_guides               ← main entity
directory.tour_guide_languages      ← join: guide ↔ language category + fluency
directory.tour_guide_packages       ← trip packages per guide

Polymorphic (existing tables):
  category_assignments  entity_type='guide'  → specialism
  certification_assignments entity_type='guide' → certs
  media               entity_type='guide'  → gallery
```

---

## Step 1 — Migrations

### File: `supabase/migrations/20260717090000_create_tour_guides_table.sql`

Create in this order (respecting FKs):

```sql
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

CREATE INDEX IF NOT EXISTS tour_guides_slug_idx ON directory.tour_guides (slug);
CREATE INDEX IF NOT EXISTS tour_guides_destination_id_idx ON directory.tour_guides (destination_id);
CREATE INDEX IF NOT EXISTS tour_guides_verified_idx ON directory.tour_guides (verified);
CREATE INDEX IF NOT EXISTS tour_guides_rating_idx ON directory.tour_guides (rating_average DESC);

CREATE TRIGGER tour_guides_updated_at
  BEFORE UPDATE ON directory.tour_guides
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();

-- ── 2. tour_guide_languages ─────────────────────────────────────
-- Languages are categories with entity_types containing 'guide_language'
-- This join table adds fluency rating per guide per language
CREATE TABLE IF NOT EXISTS directory.tour_guide_languages (
  guide_id     text NOT NULL REFERENCES directory.tour_guides(id) ON DELETE CASCADE,
  category_id  text NOT NULL REFERENCES directory.categories(id) ON DELETE CASCADE,
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
  schedule_start       text NOT NULL DEFAULT '',   -- e.g. "07.00"
  schedule_end         text NOT NULL DEFAULT '',   -- e.g. "18.00"
  min_pax              integer NOT NULL DEFAULT 1,
  max_pax              integer NOT NULL DEFAULT 1,
  transport_type       text NOT NULL DEFAULT '',   -- e.g. "Speedboat", "Phinisi"
  transport_capacity   text NOT NULL DEFAULT '',   -- e.g. "8 pax", "4 kabin"
  price_per_pax        integer NOT NULL DEFAULT 0,
  price_note           text NOT NULL DEFAULT '',   -- e.g. "min 2 pax", "kabin AC", "gear inc."
  highlights           jsonb NOT NULL DEFAULT '[]'::jsonb,  -- [{"id": "...", "en": "..."}]
  sort_order           integer NOT NULL DEFAULT 0,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tour_guide_packages_guide_id_idx ON directory.tour_guide_packages (guide_id);
CREATE INDEX IF NOT EXISTS tour_guide_packages_slug_idx     ON directory.tour_guide_packages (slug);

CREATE TRIGGER tour_guide_packages_updated_at
  BEFORE UPDATE ON directory.tour_guide_packages
  FOR EACH ROW EXECUTE FUNCTION directory.set_updated_at();
```

---

## Step 2 — Seed Data

### Modify: `supabase/seeds/03_categories_facilities.sql`

Append these rows to the existing INSERT (before `ON CONFLICT DO NOTHING`):

```sql
-- Guide Languages (guide_language)
('lang-id',  '{"id": "Indonesia",  "en": "Indonesian"}'::jsonb,  ARRAY['guide_language'], '{"icon": "🇮🇩", "code": "ID"}'),
('lang-en',  '{"id": "Inggris",    "en": "English"}'::jsonb,     ARRAY['guide_language'], '{"icon": "🇬🇧", "code": "EN"}'),
('lang-jp',  '{"id": "Jepang",     "en": "Japanese"}'::jsonb,    ARRAY['guide_language'], '{"icon": "🇯🇵", "code": "JP"}'),
('lang-fr',  '{"id": "Prancis",    "en": "French"}'::jsonb,      ARRAY['guide_language'], '{"icon": "🇫🇷", "code": "FR"}'),
('lang-de',  '{"id": "Jerman",     "en": "German"}'::jsonb,      ARRAY['guide_language'], '{"icon": "🇩🇪", "code": "DE"}'),
('lang-ko',  '{"id": "Korea",      "en": "Korean"}'::jsonb,      ARRAY['guide_language'], '{"icon": "🇰🇷", "code": "KO"}'),
('lang-zh',  '{"id": "Mandarin",   "en": "Mandarin"}'::jsonb,    ARRAY['guide_language'], '{"icon": "🇨🇳", "code": "ZH"}'),
('lang-ar',  '{"id": "Arab",       "en": "Arabic"}'::jsonb,      ARRAY['guide_language'], '{"icon": "🇸🇦", "code": "AR"}'),
('lang-nl',  '{"id": "Belanda",    "en": "Dutch"}'::jsonb,       ARRAY['guide_language'], '{"icon": "🇳🇱", "code": "NL"}'),
('lang-es',  '{"id": "Spanyol",    "en": "Spanish"}'::jsonb,     ARRAY['guide_language'], '{"icon": "🇪🇸", "code": "ES"}'),

-- Guide Specialisms (guide_specialism)
('spec-bahari',      '{"id": "Bahari",       "en": "Marine"}'::jsonb,      ARRAY['guide_specialism'], '{"icon": "🤿", "color": "#D4ECF4", "fg": "#1F6FB0"}'),
('spec-petualangan', '{"id": "Petualangan",  "en": "Adventure"}'::jsonb,   ARRAY['guide_specialism'], '{"icon": "🏔️", "color": "#D9F2DA", "fg": "#2D8838"}'),
('spec-heritage',    '{"id": "Heritage",     "en": "Heritage"}'::jsonb,    ARRAY['guide_specialism'], '{"icon": "🏛️", "color": "#FFE9D6", "fg": "#B47A00"}'),
('spec-kuliner',     '{"id": "Kuliner",      "en": "Culinary"}'::jsonb,    ARRAY['guide_specialism'], '{"icon": "🍽️", "color": "#FFE2E2", "fg": "#C44949"}'),
('spec-spiritual',   '{"id": "Spiritual",    "en": "Spiritual"}'::jsonb,   ARRAY['guide_specialism'], '{"icon": "🙏", "color": "#EDE9FF", "fg": "#6B52D4"}'),
('spec-hiking',      '{"id": "Hiking",       "en": "Hiking"}'::jsonb,      ARRAY['guide_specialism'], '{"icon": "🥾", "color": "#D9F2DA", "fg": "#2D8838"}'),
('spec-budaya',      '{"id": "Budaya",       "en": "Culture"}'::jsonb,     ARRAY['guide_specialism'], '{"icon": "🎭", "color": "#EDE9FF", "fg": "#6B52D4"}'),
('spec-fotografi',   '{"id": "Fotografi",    "en": "Photography"}'::jsonb, ARRAY['guide_specialism'], '{"icon": "📸", "color": "#FFF4D6", "fg": "#B47A00"}'),
```

### Create: `supabase/seeds/08_tour_guides.sql`

Seed ~6 guides from `src/data/guides.js`. Example structure:

```sql
-- Insert guides
INSERT INTO directory.tour_guides (id, slug, name, description, destination_id, avatar, cover_image, verified, rating_average, reviews_count, trips_count, year_experience, daily_rate)
VALUES (
  'guide-welli-001', 'welli-wilyanto',
  'Welli Wilyanto',
  '{"id": "Pemandu bahari berpengalaman di perairan Labuan Bajo dan Taman Nasional Komodo.", "en": "Experienced marine guide in Labuan Bajo waters and Komodo National Park."}'::jsonb,
  -- destination_id: look up Labuan Bajo / Manggarai Barat from seeds/04_destinations.sql
  (SELECT id FROM directory.destinations WHERE slug = 'kabupaten-manggarai-barat' LIMIT 1),
  '{"url": "https://i.pravatar.cc/200?img=12", "blurhash": null}'::jsonb,
  '{"url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80", "blurhash": null}'::jsonb,
  true, 4.95, 203, 412, 8, 1200000
) ON CONFLICT (slug) DO NOTHING;

-- Insert specialism assignments
INSERT INTO directory.category_assignments (category_id, entity_type, entity_id)
SELECT id, 'guide', 'guide-welli-001' FROM directory.categories WHERE slug IN ('spec-bahari', 'spec-petualangan')
ON CONFLICT DO NOTHING;

-- Insert language assignments
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency)
SELECT 'guide-welli-001', id, 'native'  FROM directory.categories WHERE slug = 'lang-id' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency)
SELECT 'guide-welli-001', id, 'fluent'  FROM directory.categories WHERE slug = 'lang-en' ON CONFLICT DO NOTHING;
INSERT INTO directory.tour_guide_languages (guide_id, category_id, fluency)
SELECT 'guide-welli-001', id, 'conversational' FROM directory.categories WHERE slug = 'lang-jp' ON CONFLICT DO NOTHING;

-- Insert certifications (use slugs from 07_certifications.sql)
INSERT INTO directory.certification_assignments (certification_id, entity_type, entity_id, issued_at)
SELECT id, 'guide', 'guide-welli-001', '2019-01-01' FROM directory.certifications WHERE slug = 'bnsp-guide-level-3'
ON CONFLICT DO NOTHING;

-- Insert packages (Komodo-style from the UI screenshot)
INSERT INTO directory.tour_guide_packages (id, guide_id, slug, title, is_bestseller, duration_days, duration_nights, schedule_start, schedule_end, min_pax, max_pax, transport_type, transport_capacity, price_per_pax, price_note, highlights, sort_order)
VALUES (
  'pkg-welli-001', 'guide-welli-001', 'komodo-sailing-1day-padar-pink-beach',
  '{"id": "Komodo Sailing 1 Day, Padar & Pink Beach", "en": "Komodo Sailing 1 Day, Padar & Pink Beach"}'::jsonb,
  true, 1, 0, '07.00', '18.00', 2, 8, 'Speedboat', '8 pax',
  1850000, 'min 2 pax',
  '[{"id": "Pulau Padar", "en": "Padar Island"}, {"id": "Pink Beach", "en": "Pink Beach"}, {"id": "Manta Point", "en": "Manta Point"}, {"id": "Kanawa", "en": "Kanawa Island"}]'::jsonb,
  1
) ON CONFLICT (slug) DO NOTHING;
```

Seed at least 6 guides from `src/data/guides.js`. Reference the file for names, regions, specs, langs, certs, trips, ratings, prices, exp years.

---

## Step 3 — API Route

### Delete: `src/app/api/guides/` (entire folder)

Remove `route.js` and `[slug]/` subfolder entirely.

### Create: `src/app/api/tour-guides/[[...slug]]/route.ts`

```ts
import { Elysia } from 'elysia';
import { findController } from './find';
import { getController } from './get';

const app = new Elysia({ prefix: '/api/tour-guides' })
  .use(findController)
  .use(getController);

export const GET = app.handle;
export type TourGuidesApp = typeof app;
```

### Create: `src/app/api/tour-guides/[[...slug]]/find.ts`

**Query params** (all English):

| Param | Type | Description |
|---|---|---|
| `page` | integer | Default 1 |
| `limit` | integer | Default 12 |
| `sort` | string | `popularity` \| `rating-desc` \| `price-asc` \| `price-desc` \| `experience-desc` \| `alpha` |
| `search` | string | ilike on `name` |
| `province` | string | Filter by province name (ilike) |
| `destination` | string | Filter by destination slug |
| `specialism` | string | Slug of `guide_specialism` category |
| `language` | string | Slug of `guide_language` category |
| `certification` | string | Slug of certification |
| `price` | string | Range string e.g. `< Rp1jt`, `Rp500rb - Rp1jt` |
| `verified` | string | `"true"` = only verified guides |

**Pattern** — copy architecture from `src/app/api/attractions/[[...slug]]/find.ts`:
1. Build base Supabase query with joins to `destinations!inner → provinces!inner`
2. For `specialism`/`language`/`certification` filters: subquery assignment tables, collect `entity_id` list, filter main query with `.in('id', ids)`
3. For `price`: parse range string → filter `daily_rate`
4. After pagination, fetch in parallel:
   - `category_assignments` (entity_type='guide') + join categories → specialisms
   - `tour_guide_languages` + join categories → languages with fluency
   - `certification_assignments` (entity_type='guide') + join certifications
5. Map to camelCase response

**camelCase Response shape per item:**
```ts
{
  id: string
  slug: string
  name: string
  description: string       // resolved from jsonb by Accept-Language
  destination: {
    id: string
    name: string
    province: { id: string; name: string; slug: string }
  }
  avatar: { url: string; blurhash: string | null }
  coverImage: { url: string; blurhash: string | null }
  verified: boolean
  ratingAverage: number
  reviewsCount: number
  tripsCount: number
  yearExperience: number
  dailyRate: number
  specialisms: Array<{ id: string; slug: string; name: string; metadata: object }>
  languages: Array<{ id: string; slug: string; name: string; code: string; fluency: string }>
  certifications: Array<{ id: string; slug: string; name: string; type: string; issuer: string }>
}
```

### Create: `src/app/api/tour-guides/[[...slug]]/get.ts`

Detail by slug. Same as find but for single guide + extra:
- `media[]` from `directory.media` (entity_type='guide')
- `packages[]` from `directory.tour_guide_packages` ordered by `sort_order`

Package response shape:
```ts
{
  id: string
  slug: string
  title: string             // resolved from jsonb
  description: string       // resolved from jsonb
  isBestseller: boolean
  durationDays: number
  durationNights: number
  scheduleStart: string
  scheduleEnd: string
  minPax: number
  maxPax: number
  transportType: string
  transportCapacity: string
  pricePerPax: number
  priceNote: string
  highlights: Array<{ id: string; en: string }>
  sortOrder: number
}
```

---

## Step 4 — TypeScript Types

### Create: `src/types/tour-guide.ts`

```ts
export interface TourGuideLanguage {
  id: string;
  slug: string;
  name: string;
  code: string;
  fluency: 'native' | 'fluent' | 'conversational' | 'basic';
}

export interface TourGuideSpecialism {
  id: string;
  slug: string;
  name: string;
  metadata: { icon?: string; color?: string; fg?: string };
}

export interface TourGuideCertification {
  id: string;
  slug: string;
  name: string;
  type: 'training' | 'competency' | 'award';
  issuer: string;
  issuedAt?: string;
  expiresAt?: string;
}

export interface TourGuidePackage {
  id: string;
  slug: string;
  title: string;
  description: string;
  isBestseller: boolean;
  durationDays: number;
  durationNights: number;
  scheduleStart: string;
  scheduleEnd: string;
  minPax: number;
  maxPax: number;
  transportType: string;
  transportCapacity: string;
  pricePerPax: number;
  priceNote: string;
  highlights: Array<{ id: string; en: string }>;
  sortOrder: number;
}

export interface TourGuide {
  id: string;
  slug: string;
  name: string;
  description: string;
  destination: {
    id: string;
    name: string;
    slug: string;
    province: { id: string; name: string; slug: string };
  };
  avatar: { url: string; blurhash: string | null };
  coverImage: { url: string; blurhash: string | null };
  verified: boolean;
  ratingAverage: number;
  reviewsCount: number;
  tripsCount: number;
  yearExperience: number;
  dailyRate: number;
  specialisms: TourGuideSpecialism[];
  languages: TourGuideLanguage[];
  certifications: TourGuideCertification[];
  // Detail only:
  media?: Array<{ id: string; type: 'image' | 'video'; url: string; caption: { id: string; en: string }; metadata: object }>;
  packages?: TourGuidePackage[];
}
```

---

## Step 5 — Hook

### Modify: `src/lib/hooks/use-guides.js` → `src/lib/hooks/use-tour-guides.ts`

Convert to TypeScript. Update:
- Endpoint: `/guides?` → `/tour-guides?`
- Filter keys: `wilayah` → `province`, `spesialisasi` → `specialism`, `bahasa` → `language`, `harga` → `price`, `sertifikasi` → `certification`
- **Remove `setAllData([])`** from `updateFilters` (bug fix — see pattern in `use-villages.js` and `use-attractions.ts`)
- Import `TourGuide` type from `@/types/tour-guide`

---

## Step 6 — Verify

```bash
npx supabase db reset
npm run build
```

Expected: all migrations apply, seeds insert without error, build succeeds.

---

## Reference Files

| Purpose | File |
|---|---|
| Migration pattern | `supabase/migrations/20260715021500_create_attractions_table.sql` |
| Join table pattern | `supabase/migrations/20260714093716_create_categories_and_facilities.sql` |
| Certifications table | `supabase/migrations/20260717030000_create_certifications_table.sql` |
| find.ts pattern | `src/app/api/attractions/[[...slug]]/find.ts` |
| get.ts pattern | `src/app/api/attractions/[[...slug]]/get.ts` |
| route.ts pattern | `src/app/api/tourism-villages/[[...slug]]/route.ts` |
| Hook pattern | `src/lib/hooks/use-villages.js` |
| Existing guide data | `src/data/guides.js` |
| Existing seed categories | `supabase/seeds/03_categories_facilities.sql` |
| Certification seeds | `supabase/seeds/07_certifications.sql` |

---

## Conventions to Follow (from AGENTS.md)

- All API response keys **must be camelCase**
- Use `supabaseAdmin` from `@/lib/supabase`
- Language resolution: `Accept-Language` header → `id` or `en`, resolve jsonb `name[lang]`
- No hardcoded Indonesian strings in API controllers
- Import order: Elysia → supabase → types
