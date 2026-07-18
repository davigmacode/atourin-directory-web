# Itineraries API Refactor — Plan (v9)

> TypeScript + Elysia API for itineraries.
> Full detail-page UI: hero, info chips, price breakdown,
> day plans (stops + timeline as child tables), schedules,
> best time, languages, target audience, category, etc.

## Summary

**Renames:**
- `budget_min` / `budget_max` → `budget_estimation` (single)
- `price_breakdown` → `budget_breakdown`
- `cocok_untuk` → `target_audience`
- `best_months` → `best_time_weather` (record `{jan:"rain",...}`)
- `best_time_peak` → `best_time_crowd` (record `{jan:"high",...}`)
- `itinerary_languages.category_id` → `taxonomy_id`
- `itinerary_daily.title` (text) → `title` (jsonb multilingual `{id, en}`)
- `itinerary_daily_stops.order` → `sort_order`
- `itinerary_daily.summary` (jsonb) → explicit columns: `summary_stops`, `summary_hours`, `summary_km`, `summary_price`

**Table renames:**
- `itinerary_plans` → `itinerary_daily`

**Removed:**
- `itinerary_daily.weather_pattern` → day-specific weather info isn't useful (use parent `best_time_weather` for general seasonality)
- `includes` (field) — moved to UI presentation only
- `language` (field on itineraries) → use `itinerary_languages` join table
- `days` (jsonb) → split into `itinerary_daily` + child tables `itinerary_daily_stops` + `itinerary_daily_timelines`
- `start_dates` (jsonb) → `itinerary_schedules` table

**New tables:**
- `itinerary_daily_stops` (child of `itinerary_daily`) — places/attractions per day
- `itinerary_daily_timelines` (child of `itinerary_daily`) — events/activities per day
- `itinerary_languages` (M:N with `type='language'` taxonomies)
- `itinerary_daily` (renamed from `itinerary_plans`)
- `itinerary_schedules` (concrete date instances, no plan FK)

**Taxonomy:**
- Rename `guide_language` → `language` and drop `lang-` slug prefix (`lang-id` → `id`, etc.)

## Naming Decisions

| Old | New | Reason |
|---|---|---|
| `cocok_untuk` | `target_audience` | Standard travel-industry term; reads naturally in UI ("Target audience: Solo, Couple, Group") |
| `best_months` (array of `{month, level}`) | `best_time_weather` (record `{jan:"rain",...}`) | Direct object access via key; matches the revamp UI's month pill layout |
| `best_time_peak` (single text) | `best_time_crowd` (record `{jan:"high",...}`) | "crowd" clearer than "peak" — about crowd level, not generic peak; same structure as weather for UI symmetry |
| `price_breakdown` | `budget_breakdown` | Consistent with `budget_estimation` |
| `budget_min` + `budget_max` | `budget_estimation` (single) | Display only shows the total estimate |
| `itinerary_plans` | `itinerary_daily` | "daily" matches the day-level content (stops, timeline) better than "plans" |
| `itinerary_schedules.plan_id` | removed | Schedule is independent of the daily template; just `itinerary_id` + `start_date` |
| `itinerary_daily.stops` (jsonb) | `itinerary_daily_stops` (table) | Normalized — supports individual CRUD, geo queries, sort_order, FK constraints |
| `itinerary_daily.timeline` (jsonb) | `itinerary_daily_timelines` (table) | Normalized — supports individual edit, time-based queries, reordering |
| `itinerary_daily_timelines.duration` (text "30 min") | `duration_minutes` (integer) | Single unit (minutes) — UI formats as "30 min" or "1 jam 30 min" |
| `itinerary_daily_timelines.title` (text) | `title` (jsonb) | Multilingual — consistent with `name`/`description` pattern in other tables |
| `itinerary_daily_timelines.description` (text) | `description` (jsonb) | Multilingual |
| `itinerary_daily_timelines.location` (text free-form) | `stop_id` (FK to `itinerary_daily_stops`) | Normalized — events link to actual stops; supports map view (which stop this event happens at) |
| `itinerary_daily_timelines.includes` (text "Termasuk paket") | `includes` (jsonb array of strings) | List of specific items (e.g. ["Termasuk tiket masuk", "Termasuk makan siang"]) — more informative than single generic string |
| `itinerary_daily.weather_pattern` (jsonb) | removed | Day-specific weather isn't actionable; parent `best_time_weather` covers general seasonality |
| `itineraries.category` (text) | `itinerary_categories` (table) | One-to-many: an itinerary can have multiple categories (e.g., "Adventure" + "Family") via a join table referencing `taxonomies` with `type='itinerary_category'` |
| `itinerary_languages.category_id` | `taxonomy_id` | Consistent dengan `itinerary_highlights.taxonomy_id` dan `creator_badges.taxonomy_id` — `category_id` ambigu jika dibaca bersama `itinerary_categories` |
| `itinerary_daily.title` (text) | `title` (jsonb `{id, en}`) | Multilingual — ditampilkan di day selector UI; konsisten dengan semua field display lain |
| `itinerary_daily_stops.order` (integer) | `sort_order` (integer) | `ORDER` adalah SQL reserved keyword; konsisten dengan `sort_order` di semua tabel lain |
| `itinerary_daily.summary` (jsonb) | `summary_stops`, `summary_hours`, `summary_km`, `summary_price` (integer) | Kolom eksplisit — type safety terjaga, tidak perlu jsonb shape check constraint |

## Schema Changes

### 1. Taxonomy slug renames (in `03_categories_facilities.sql`)

- `lang-id` → `id`, `lang-en` → `en`, etc. (drop `lang-` prefix)
- `entity_types` array: `['guide_language']` → `['language']`

### 2. `creators` — author profile (with Supabase user FK)

```sql
CREATE TABLE directory.creators (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Supabase auth user (nullable for synthetic accounts like "Atourin Official")
  user_id       uuid UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  -- URL-friendly identifier for profile page
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  -- Optional display name (e.g. "Welli" for "Welli Wilyanto")
  display_name  text,
  -- Avatar object: { url, blurhash, base64 } — same shape as coverImage
  avatar        jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null, "base64": null}'::jsonb,
  -- Multilingual bio: { id, en }
  bio           jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  is_verified   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX creators_slug_idx ON directory.creators(slug);
```

### 3. `creator_badges` — per-creator badge assignment

```sql
CREATE TABLE directory.creator_badges (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which creator holds this badge
  creator_id    text NOT NULL REFERENCES directory.creators(id) ON DELETE CASCADE,
  -- What kind of badge (e.g. "Local Expert", "Diving Master")
  -- References taxonomies with type='creator_role'
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE RESTRICT,
  -- When the creator was awarded this badge
  issued_at     date,
  -- When it expires (NULL = no expiry)
  valid_until   date,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- One badge kind per creator
  UNIQUE (creator_id, taxonomy_id)
);
```

### 4. `itineraries` — main table

```sql
CREATE TABLE directory.itineraries (
  id              text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug            text UNIQUE NOT NULL,
  name            jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  description     jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Hero/cover image: { url, blurhash, base64 }
  cover_image     jsonb NOT NULL DEFAULT '{"url": "", "blurhash": null, "base64": null}'::jsonb,

  -- === Metrics ===
  rating_average  numeric(3,2) NOT NULL DEFAULT 0.0 CHECK (rating_average >= 0.0 AND rating_average <= 5.0),
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
  -- category: handled via `itinerary_categories` join table (one-to-many)
  -- each itinerary can have multiple categories (e.g., "Adventure" + "Family")
  -- references taxonomies with type='itinerary_category'
  difficulty      text CHECK (difficulty IN ('easy','medium','hard')),

  -- === Budget ===
  -- Single total value (e.g., 2450000) — the displayed "Mulai dari Rp X"
  budget_estimation     integer,
  -- Itemized breakdown: [{ label, sublabel?, amount }, ...]
  -- Example: [{ label: "Transportasi 3 hari", amount: 850000 }, ...]
  budget_breakdown      jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- === Suitability ===
  -- Target audience: ["Solo", "Couple", "Group", "Family"]
  target_audience  jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- === Best time to visit ===
  -- Monthly weather/seasonality quality: { jan: "rain", feb: "rain", mar: "ok", apr: "ideal", ... }
  -- Values: free-form strings (e.g. "rain", "ok", "ideal")
  -- UI maps to color: rain=red, ok=yellow, ideal=green
  best_time_weather   jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Same structure as weather but for crowd/peak levels
  -- { jan: "high", feb: "high", mar: "mid", apr: "high", ... }
  best_time_crowd      jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Multilingual description: { id, en }
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
-- category index removed: category column dropped, use itinerary_categories_cat_idx instead
CREATE INDEX itineraries_published_idx   ON directory.itineraries(is_published) WHERE is_published = true;
```

### 5. `itinerary_languages` — M:N with `type='language'` taxonomies

```sql
CREATE TABLE directory.itinerary_languages (
  -- The itinerary
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- The language taxonomy entry (e.g., "id", "en", "jp")
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, taxonomy_id)
);
CREATE INDEX itinerary_languages_tax_idx ON directory.itinerary_languages(taxonomy_id);
```

### 6. `itinerary_highlights` — join to highlight taxonomies

```sql
CREATE TABLE directory.itinerary_highlights (
  -- The itinerary
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- Which highlight (e.g., "Pantai & Pemandangan", "Kearifan Budaya")
  -- References taxonomies with type='itinerary_highlight'
  taxonomy_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE CASCADE,
  -- Itinerary-specific description override
  -- Example: "Jelajahi garis pantai eksotis dan bentang alam memukau khas Danau Toba."
  description   jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Display order within the itinerary (0-indexed)
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, taxonomy_id)
);
```

### 7. `itinerary_categories` — one-to-many: itinerary → taxonomies (type='itinerary_category')

```sql
CREATE TABLE directory.itinerary_categories (
  -- The itinerary
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- Category taxonomy entry (e.g., "Adventure", "Cultural", "Family")
  -- References taxonomies with type='itinerary_category'
  category_id   text NOT NULL REFERENCES directory.taxonomies(id) ON DELETE RESTRICT,
  -- Display order (0-indexed) — primary category first, then secondary
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (itinerary_id, category_id)
);
CREATE INDEX itinerary_categories_cat_idx ON directory.itinerary_categories(category_id);
```

- One itinerary can have many categories (e.g., "Adventure" + "Family Friendly")
- `sort_order` lets the UI show the primary category first
- `taxonomies` entries themselves are shared across many itineraries; only the assignment is unique
- Each row's `category_id` must reference a taxonomy with `type='itinerary_category'`

### 8. `itinerary_daily` — daily template (renamed from `itinerary_plans`)

```sql
CREATE TABLE directory.itinerary_daily (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which itinerary this day belongs to
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- Day number (1-indexed: 1, 2, 3, ...)
  day_number    integer NOT NULL,
  -- Day title — multilingual (e.g., { id: "Sirkuit, pantai & sunset di Lombok Tengah", en: "..." })
  title         jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Explicit summary stats (integer per field for type safety)
  summary_stops integer NOT NULL DEFAULT 0,   -- number of stops in this day
  summary_hours integer NOT NULL DEFAULT 0,   -- estimated total hours
  summary_km    integer NOT NULL DEFAULT 0,   -- estimated total distance in km
  summary_price integer NOT NULL DEFAULT 0,   -- estimated day cost in IDR
  -- Weather removed — use parent itinerary's best_time_weather for general seasonality
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  -- One day record per (itinerary, day_number)
  UNIQUE (itinerary_id, day_number)
);
CREATE INDEX itinerary_daily_itin_idx ON directory.itinerary_daily(itinerary_id);
```

### 9. `itinerary_daily_stops` — child table (places/attractions per day)

```sql
CREATE TABLE directory.itinerary_daily_stops (
  id                  text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which day this stop belongs to
  itinerary_daily_id  text NOT NULL REFERENCES directory.itinerary_daily(id) ON DELETE CASCADE,
  -- Place name (e.g., "Mandallika", "Pantai Kuta")
  name                text NOT NULL,
  -- Display order within the day (0-indexed) — renamed from "order" (SQL reserved keyword)
  sort_order          integer NOT NULL DEFAULT 0,
  -- Optional geo coordinates for map view
  lat                 numeric(9,6),
  lng                 numeric(9,6),
  -- Type of stop: attraction | food | rest | transport | photo | other
  type                text NOT NULL DEFAULT 'attraction'
    CHECK (type IN ('attraction','food','rest','transport','photo','other')),
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX itinerary_daily_stops_day_idx ON directory.itinerary_daily_stops(itinerary_daily_id, sort_order);
```

### 10. `itinerary_daily_timelines` — child table (events/activities per day)

```sql
CREATE TABLE directory.itinerary_daily_timelines (
  id                  text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- Which day this event belongs to
  itinerary_daily_id  text NOT NULL REFERENCES directory.itinerary_daily(id) ON DELETE CASCADE,
  -- Event time (e.g., "07:30", "14:00")
  time                text NOT NULL,
  -- Duration in MINUTES (e.g., 30 for "30 min", 90 for "1.5 jam", 60 for "1 jam")
  -- UI formats: < 60 → "X min", >= 60 → "X jam Y min" (e.g., 90 → "1 jam 30 min")
  duration_minutes    integer CHECK (duration_minutes IS NULL OR duration_minutes >= 0),
  -- Multilingual event title (e.g., { id: "Penjemputan di hotel", en: "Hotel pickup" })
  title               jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- Which stop this event is at (the destination of the event, e.g., the hotel stop or the restaurant stop)
  -- FK to itinerary_daily_stops — null for events that happen between stops (e.g., "scenic drive")
  stop_id             text REFERENCES directory.itinerary_daily_stops(id) ON DELETE SET NULL,
  -- Multilingual detailed description of the activity
  description         jsonb NOT NULL DEFAULT '{"id": "", "en": ""}'::jsonb,
  -- List of specific inclusions: ["Termasuk tiket masuk", "Termasuk makan siang", "Termasuk transport lokal"]
  includes            jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Travel info for transit items: "12 km · 25 min"
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
```

### 11. `itinerary_schedules` — concrete date instances (no plan FK)

```sql
CREATE TABLE directory.itinerary_schedules (
  id            text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  -- The itinerary this schedule is for
  itinerary_id  text NOT NULL REFERENCES directory.itineraries(id) ON DELETE CASCADE,
  -- First day of this specific departure
  start_date    date NOT NULL,
  -- Optional override of itinerary name for this specific schedule
  custom_title  text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX itinerary_schedules_start_date_idx ON directory.itinerary_schedules(start_date);
CREATE INDEX itinerary_schedules_itinerary_idx  ON directory.itinerary_schedules(itinerary_id);
```

### 12. Taxonomy seed additions (in `03_categories_facilities.sql`)

`type='itinerary_highlight'` (4 entries — Sorotan chips):
- `slug='pemandangan'` → "Pantai & Pemandangan" (icon 🌊)
- `slug='kearifan-budaya'` → "Kearifan Budaya" (icon 👫)
- `slug='biota-alam'` → "Biota & Aktivitas Laut" (icon 🐠)  ← was 🌊 (duplicate), changed to 🐠
- `slug='kuliner-otentik'` → "Kuliner Otentik" (icon 🔍)

`type='creator_role'` (4 entries):
- `slug='official'` → "Atourin Official"
- `slug='local-expert'` → "Local Expert"
- `slug='community'` → "Komunitas"
- `slug='partner'` → "Mitra"

`type='language'` (10 entries — renamed from `guide_language`, slugs without `lang-` prefix):
- `slug='id'` → "Indonesia" (code: ID)
- `slug='en'` → "English" (code: EN)
- `slug='jp'` → "日本語" (code: JP)
- `slug='fr'` → "Français" (code: FR)
- `slug='de'` → "Deutsch" (code: DE)
- `slug='ko'` → "한국어" (code: KO)
- `slug='zh'` → "中文" (code: ZH)
- `slug='ar'` → "العربية" (code: AR)
- `slug='nl'` → "Nederlands" (code: NL)
- `slug='es'` → "Español" (code: ES)

## Updates to Existing Tables

### `tour_guide_languages`
- Slug lookups change: `lang-id` → `id`, `lang-en` → `en`, etc. (drop `lang-` prefix)
- Type changes from `'guide_language'` to `'language'`

### `tour-guides/find.ts` filter
- `contains('entity_types', ['guide_language'])` → `contains('entity_types', ['language'])`

## TypeScript Types

### `src/types/itinerary.ts`

```ts
export type Difficulty = "easy" | "medium" | "hard";
// Strict enum per month — UI maps to color: rain=red, ok=yellow, ideal=green
export type BestTimeWeather = "rain" | "ok" | "ideal";
// Crowd level per month
export type BestTimeCrowd = "low" | "mid" | "high";
// Audience segment shown in chips
export type TargetAudience = "Solo" | "Couple" | "Group" | "Family" | string;

export interface ItineraryPriceItem {
  label: string;
  sublabel?: string | null;
  amount: number;
}

// One month entry in best_time_weather / best_time_crowd
export interface ItineraryTimeMap {
  [month: string]: string; // e.g., "rain", "ok", "ideal", "low", "mid", "high"
}

export interface ItineraryStop {
  id: string;
  name: string;
  sortOrder: number;  // renamed from `order` (SQL reserved keyword)
  lat?: number | null;
  lng?: number | null;
  type: "attraction" | "food" | "rest" | "transport" | "photo" | "other";
}

export interface ItineraryTimelineEvent {
  id: string;
  time: string;
  // Duration in MINUTES (e.g., 30 for "30 min", 90 for "1.5 jam")
  // UI formats: < 60 → "X min", >= 60 → "X jam Y min"
  durationMinutes?: number | null;
  // Multilingual title — resolved by current language
  title: { id: string; en: string };
  // FK to itinerary_daily_stops (which stop this event happens at)
  stopId?: string | null;
  // Resolved stop object (joined in API response)
  stop?: ItineraryStop;
  // Multilingual description
  description?: { id: string; en: string };
  // List of specific inclusions
  includes?: string[];
  travelInfo?: string | null;
  sortOrder: number;
}

export interface ItineraryCategory {
  id: string;
  slug: string;
  name: { id: string; en: string };  // multilingual from taxonomies.name
  sortOrder: number;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: { id: string; en: string };  // multilingual — was plain text
  // Explicit summary stats (maps to summary_stops/hours/km/price columns)
  summaryStops: number;
  summaryHours: number;
  summaryKm: number;
  summaryPrice: number;
  stops: ItineraryStop[];
  timeline: ItineraryTimelineEvent[];
}

export interface ItinerarySchedule {
  id: string;
  startDate: string;        // ISO date
  customTitle?: string | null;
}

export interface ItineraryHighlight {
  id: string;
  slug: string;
  name: { id: string; en: string };         // multilingual from taxonomies.name
  icon: string;
  description: { id: string; en: string };  // multilingual override per itinerary
  sortOrder: number;
}

export interface ItineraryLanguage {
  id: string;
  slug: string;
  name: string;
  code?: string;
}

export interface Itinerary {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: { url: string; blurhash: string | null; base64?: string | null };
  ratingAverage: number;
  reviewsCount: number;
  viewsCount: number;
  savesCount: number;
  durationDays: number;
  durationNights: number;
  minPax: number;
  maxPax: number;
  destination: { id: string; slug: string; name: string };
  author: Creator;
  // Category: one-to-many via itinerary_categories join table
  // (an itinerary can have multiple categories like "Adventure" + "Family")
  categories: ItineraryCategory[];
  difficulty: Difficulty;
  budgetEstimation?: number | null;
  budgetBreakdown: ItineraryPriceItem[];
  targetAudience: TargetAudience[];
  bestTimeWeather: ItineraryTimeMap;
  bestTimeCrowd: ItineraryTimeMap;
  bestTimeNote: { id: string; en: string } | null;  // multilingual, matches DB jsonb column
  days: ItineraryDay[];
  schedules: ItinerarySchedule[];
  highlights: ItineraryHighlight[];
  languages: ItineraryLanguage[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItineraryFilters {
  destination?: string;
  theme?: string;
  // Filter by category (taxonomy slug via itinerary_categories)
  category?: string;
  duration?: string;
  budget?: string;
  difficulty?: string;
  author?: string;
  language?: string;
  // Filter by month — find itineraries with best_time_weather @> '{"<month>":"ideal"}'
  month?: string;
  // Filter by schedule start_date >= this date
  startDate?: string;
  sort?: string;
}
```

### `src/types/creator.ts`

```ts
export interface Creator {
  id: string;
  userId: string | null;
  slug: string;
  name: string;
  displayName: string | null;
  avatar: { url: string; blurhash: string | null; base64?: string | null };
  bio: { id: string; en: string };
  isVerified: boolean;
}
```

## Elysia API Route (TypeScript)

### `src/app/api/itineraries/[[...slug]]/route.ts`

```ts
import { Elysia } from "elysia";
import { findController } from "./find";
import { getController } from "./get";
const app = new Elysia({ prefix: "/api/itineraries" })
  .use(findController)
  .use(getController);
export const GET = app.handle;
export type ItinerariesApp = typeof app;
```

### `find.ts` — list filters

- `page`, `limit`, `sort` (popular | rating | newest | budget)
- `destination` (slug)
- `theme` (taxonomy via `itinerary_highlights`)
- `category` (taxonomy slug via `itinerary_categories`)
- `duration` (1 | 2-3 | 4-7 | 7+)
- `budget` (<500rb | 500-2jt | >2jt)
- `difficulty`
- `author` (creator slug)
- `language` (taxonomy slug via `itinerary_languages`)
- `month` (1-12) — `best_time_weather @> '{"<month>":"ideal"}'`
- `startDate` (ISO date) — `itinerary_schedules.start_date >= this`

### `get.ts` — detail

- Fetch itinerary + author + role badges + plans + stops + timeline + highlights + languages + categories + destination
- Increment `views_count` on call

## Hook & Page Updates

### `src/lib/hooks/use-itineraries.ts` (TS)
- Replace `use-itineraries.js`
- English API params
- `Itinerary` type

### `src/lib/hooks/use-itinerary.ts`

### Update `src/app/explore/itinerary/[slug]/page.jsx`
- Hero with breadcrumb + badge + duration + region + tags
- Title + description
- Info chips row (Durasi, Mulai dari, Cocok untuk, Tingkat)
- Right sidebar with `budgetEstimation` + `budgetBreakdown` list
- Tabs: Plan View / Tentang itinerary
- Plan View: day selector (from `schedules`) + day detail (from `plans`) with stops, timeline, weather from parent
- Tentang tab: description, highlights, best time, languages, target audience
- Remove `src/data/itineraries.js`

## Migration Order

1. Update `03_categories_facilities.sql` — rename `lang-*` slugs to `*`, change `entity_types` to `language`
2. `20260718000000_create_creators_and_badges.sql` — creators + creator_badges
3. `20260718000001_create_itineraries_core.sql` — itineraries + itinerary_languages + itinerary_highlights
4. `20260718000002_create_itinerary_categories.sql` — itinerary_categories
5. `20260718000003_create_itinerary_daily_and_stops.sql` — itinerary_daily + itinerary_daily_stops
6. `20260718000004_create_itinerary_daily_timelines.sql` — itinerary_daily_timelines
7. `20260718000005_create_itinerary_schedules.sql` — itinerary_schedules
8. Update `08_tour_guides.sql` — fix language slug references (`lang-id` → `id`, etc.)
9. New seeds: `09_creators_and_itineraries.sql` (or split per table)

## Implementation Phases

1. Taxonomy updates
2. DB migrations
3. Seeds
4. TypeScript types
5. Elysia API
6. Hooks
7. Page updates
8. Remove static data
9. Update tour-guides API
10. Verify

## Verify Checklist

- [ ] `supabase db reset` passes
- [ ] `npm run build` passes
- [ ] Taxonomy slugs changed: `id`, `en`, etc. (not `lang-id`)
- [ ] `tour_guide_languages` still works (uses new short slugs)
- [ ] `GET /api/itineraries?destination=lombok-tengah` works
- [ ] `GET /api/itineraries?language=id` works
- [ ] `GET /api/itineraries?month=5` works (best_time_weather)
- [ ] `GET /api/itineraries?startDate=2026-05-12` works
- [ ] Detail page renders all 3 days with stops + timeline from child tables
- [ ] `budgetEstimation` matches sum of `budgetBreakdown`
- [ ] `targetAudience` array (e.g., ["Solo", "Couple", "Group"])
- [ ] `bestTimeWeather` is `{ jan: "rain", ..., dec: "rain" }` (12 keys)
- [ ] `bestTimeCrowd` is `{ jan: "high", ..., dec: "low" }` (12 keys)
- [ ] `categories` array populated from `itinerary_categories` (no `category` text field)
- [ ] `languages` array populated from `itinerary_languages`
- [ ] No more `includes`, `language` field, `days` jsonb, `startDates` jsonb
- [ ] No more `weather_pattern` on `itinerary_daily`
- [ ] `itinerary_daily_stops` has rows with proper `order` values
- [ ] `itinerary_daily_timelines` has rows sorted by `sort_order`
