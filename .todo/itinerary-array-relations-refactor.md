# Refactor: Array Relations & Taxonomy Description

**Status:** Ready for implementation
**Target:** deepseek-v4-flash
**Env:** Local dev — verifikasi dengan `supabase db reset` lalu `npm run build`
**Working dir:** `d:\projects\atourin-directory-web`

---

## CRITICAL: No Mojibake

**Jangan pernah menulis karakter Unicode multibyte (panah, simbol, emoji) langsung
ke dalam file SQL sebagai literal.**
SQL dan beberapa editor Windows akan corrupt karakter seperti `->`, `<->`, simbol
centang, dsb. menjadi mojibake seperti `â€â€Â`.

**Aturan wajib:**
- Di file SQL: gunakan teks ASCII saja untuk komentar. Ganti `->` dengan `->`,
  ganti `<->` dengan `<->` (keduanya sudah ASCII). Jangan gunakan `→`, `↔`, `✅`, dll.
- Di file TypeScript dan Markdown: boleh pakai Unicode, tapi selalu simpan dengan
  encoding **UTF-8 without BOM**.
- Setelah menulis file SQL, grep hasilnya untuk memastikan tidak ada karakter
  di luar ASCII 32-126 dan newline:
  ```powershell
  Select-String -Path "supabase\migrations\*.sql" -Pattern "[^\x00-\x7F]"
  ```
  Jika ada hasil, fix file tersebut sebelum lanjut.

---

## Overview Perubahan

### A. Tambah `description jsonb` ke `taxonomies`
Memungkinkan `itinerary_highlights` dan entri taxonomy lain menyimpan deskripsi
multilingual global (bukan per-itinerary). Setelah ini, `itinerary_highlights`
bisa menggunakan pola array yang sama.

### B. Ganti join tables menjadi `text[]` array columns
Tabel-tabel berikut tidak memiliki metadata per-assignment, sehingga lebih
efisien disimpan sebagai array slug di tabel entitas utama:

| Join table lama | Diganti dengan | Di tabel | Taxonomy type |
|---|---|---|---|
| `itinerary_languages` | `languages text[]` | `itineraries` | `language` |
| `itinerary_categories` | `categories text[]` | `itineraries` | `itinerary_category` |
| `itinerary_highlights` | `highlights text[]` | `itineraries` | `itinerary_highlight` |
| `attraction_categories` | `categories text[]` | `attractions` | `category` |
| `destination_categories` | `categories text[]` | `destinations` | `category` |
| `tourism_village_categories` | `categories text[]` | `tourism_villages` | `village_theme` |
| `tourism_village_activities` | `activities text[]` | `tourism_villages` | `village_activity` |

**Yang TIDAK diubah (punya metadata per-assignment):**
- `tour_guide_languages` — punya `fluency`, `fluency_rate`
- `tour_guide_specialism` — punya `is_primary`
- `tour_guide_certifications`, `tourism_village_certifications` — punya `issued_at`, `expires_at`
- `creator_badges` — punya `issued_at`, `valid_until`
- `itinerary_daily_timelines` — normalized rows, bukan join
- `facility_assignments` — entity_type polymorphic

### C. `target_audience` jsonb -> `target_audience text[]`
Ganti dari `jsonb` (saat ini `["Solo","Couple","Group"]`) menjadi `text[]` native
PostgreSQL dengan taxonomy backing. Tambah taxonomy type `target_audience`.

---

## Perubahan Per File

---

### 1. `supabase/migrations/20260714093716_create_categories_and_facilities.sql`

**Tambah kolom `description`** ke `CREATE TABLE directory.taxonomies`:

```sql
-- Setelah kolom `name`:
  -- Optional multilingual description (used by highlights, etc.)
  -- Format: {"id": "...", "en": "..."}
  description   jsonb,
```

**Update CHECK constraint** di file yang sama -- tambah `target_audience`:

```sql
  CONSTRAINT taxonomies_type_check CHECK (type IN (
    'category',
    'adwi_level',
    'village_theme',
    'village_activity',
    'guide_language',
    'guide_specialism',
    'target_audience'
  )),
```

> CATATAN: `guide_language` masih di sini karena migration ini dibuat sebelum
> patch. Migration `20260718000000` yang kemudian mengubah CHECK constraint
> dan meremove `guide_language`. Jangan ubah migration `20260718000000`.

---

### 2. `supabase/migrations/20260718000000_patch_taxonomy_types.sql`

**Tambah `target_audience`** ke expanded CHECK constraint:

```sql
ALTER TABLE directory.taxonomies
  ADD CONSTRAINT taxonomies_type_check CHECK (type IN (
    'category',
    'adwi_level',
    'village_theme',
    'village_activity',
    'language',
    'guide_specialism',
    'creator_role',
    'itinerary_category',
    'itinerary_highlight',
    'target_audience'
  ));
```

**Tambah seed `target_audience`** di bagian INSERT baru:

```sql
-- target_audience -- audience chips shown on itinerary cards
INSERT INTO directory.taxonomies (slug, name, type, metadata) VALUES
  ('solo',    '{"id": "Solo",     "en": "Solo"}'::jsonb,     'target_audience', '{"icon": "🧍"}'),
  ('couple',  '{"id": "Pasangan", "en": "Couple"}'::jsonb,   'target_audience', '{"icon": "👫"}'),
  ('group',   '{"id": "Rombongan","en": "Group"}'::jsonb,    'target_audience', '{"icon": "👥"}'),
  ('family',  '{"id": "Keluarga", "en": "Family"}'::jsonb,   'target_audience', '{"icon": "👨‍👩‍👧‍👦"}')
ON CONFLICT (type, slug) DO NOTHING;
```

> PENTING: Emoji di jsonb (`"icon"` field) adalah string value, bukan SQL literal,
> sehingga aman dari mojibake. Tetap simpan file dengan UTF-8.

---

### 3. `supabase/migrations/20260715021500_create_attractions_table.sql`

Ganti kolom `categories` dari join table menjadi array langsung. Di dalam
`CREATE TABLE directory.attractions`, **tambahkan kolom**:

```sql
  -- Categories: array of taxonomy slugs (type='category')
  -- GIN-indexed for containment filter
  categories  text[] NOT NULL DEFAULT '{}',
```

Tambahkan **GIN index** setelah tabel:

```sql
CREATE INDEX IF NOT EXISTS attractions_categories_idx
  ON directory.attractions USING gin(categories);
```

---

### 4. `supabase/migrations/20260714134655_create_destinations_table.sql`

Di dalam `CREATE TABLE directory.destinations`, **tambahkan kolom**:

```sql
  -- Categories: array of taxonomy slugs (type='category')
  categories  text[] NOT NULL DEFAULT '{}',
```

Tambahkan **GIN index**:

```sql
CREATE INDEX IF NOT EXISTS destinations_categories_idx
  ON directory.destinations USING gin(categories);
```

---

### 5. `supabase/migrations/20260716120000_create_tourism_villages_table.sql`

Di dalam `CREATE TABLE directory.tourism_villages`, **tambahkan 2 kolom**:

```sql
  -- Village theme categories: array of taxonomy slugs (type='village_theme')
  categories  text[] NOT NULL DEFAULT '{}',
  -- Village activities: array of taxonomy slugs (type='village_activity')
  activities  text[] NOT NULL DEFAULT '{}',
```

Tambahkan **GIN indexes**:

```sql
CREATE INDEX IF NOT EXISTS tourism_villages_categories_idx
  ON directory.tourism_villages USING gin(categories);
CREATE INDEX IF NOT EXISTS tourism_villages_activities_idx
  ON directory.tourism_villages USING gin(activities);
```

---

### 6. `supabase/migrations/20260717100000_create_per_type_category_joins.sql`

**Hapus** semua block berikut (dan index-nya):
- `attraction_categories` (block 3a)
- `destination_categories` (block 3b)
- `tourism_village_categories` (block 3c)
- `tourism_village_activities` (block 3f)

**Pertahankan:**
- `tour_guide_specialism` (block 3e) -- punya `is_primary`

Update header comment agar akurat.

---

### 7. `supabase/migrations/20260718000002_create_itineraries_core.sql`

**Hapus** seluruh block `itinerary_languages` (table + index, ~10 baris).

**Hapus** seluruh block `itinerary_highlights` (table + index, ~13 baris).

Di dalam `CREATE TABLE directory.itineraries`, **tambahkan 4 kolom** setelah `author_id`:

```sql
  -- Languages: array of taxonomy slugs (type='language')
  -- e.g. '{id,en,jp}'
  languages         text[] NOT NULL DEFAULT '{}',

  -- Categories: array of taxonomy slugs (type='itinerary_category'), array order = display order
  -- e.g. '{petualangan,bahari}'
  categories        text[] NOT NULL DEFAULT '{}',

  -- Highlights: array of taxonomy slugs (type='itinerary_highlight'), array order = display order
  -- Descriptions come from taxonomies.description (global) not per-itinerary override
  highlights        text[] NOT NULL DEFAULT '{}',

  -- Target audience: array of taxonomy slugs (type='target_audience')
  -- Replaces jsonb target_audience column
  -- e.g. '{solo,couple,group}'
  target_audience   text[] NOT NULL DEFAULT '{}',
```

**Hapus kolom** `target_audience jsonb` yang sudah ada.

**Update comment** di Classification section:

```sql
  -- categories: text[] of taxonomy slugs (type='itinerary_category'), array order = display order
  -- highlights: text[] of taxonomy slugs (type='itinerary_highlight'), array order = display order
  -- languages:  text[] of taxonomy slugs (type='language')
  -- target_audience: text[] of taxonomy slugs (type='target_audience')
```

**Hapus komentar lama** yang menyebut join table untuk category.

**Tambahkan GIN indexes** setelah `itineraries_published_idx`:

```sql
CREATE INDEX itineraries_languages_idx       ON directory.itineraries USING gin(languages);
CREATE INDEX itineraries_categories_idx      ON directory.itineraries USING gin(categories);
CREATE INDEX itineraries_highlights_idx      ON directory.itineraries USING gin(highlights);
CREATE INDEX itineraries_target_audience_idx ON directory.itineraries USING gin(target_audience);
```

---

### 8. `supabase/migrations/20260718000003_create_itinerary_categories.sql`

**Hapus seluruh file.**

```powershell
Remove-Item "supabase\migrations\20260718000003_create_itinerary_categories.sql"
```

---

### 9. `supabase/seeds/03_categories_facilities.sql`

**Tambahkan seed `target_audience`** (jika belum ada via migration patch):

Cek dulu apakah seed ini punya section untuk target_audience. Jika tidak,
tambahkan di baris akhir sebelum ON CONFLICT block penutup:

```sql
  -- target_audience
  ('solo',    '{"id": "Solo",     "en": "Solo"}'::jsonb,     'target_audience', '{"icon": "solo"}'),
  ('couple',  '{"id": "Pasangan", "en": "Couple"}'::jsonb,   'target_audience', '{"icon": "couple"}'),
  ('group',   '{"id": "Rombongan","en": "Group"}'::jsonb,    'target_audience', '{"icon": "group"}'),
  ('family',  '{"id": "Keluarga", "en": "Family"}'::jsonb,   'target_audience', '{"icon": "family"}'),
```

> Gunakan placeholder string (bukan emoji) di SQL seed untuk menghindari
> encoding issue. Emoji actual bisa diset via admin panel atau update query
> terpisah.

---

### 10. `supabase/seeds/05_attractions.sql`

Untuk setiap attraction INSERT, ganti cara assign kategori:

**Sebelum (pola saat ini — INSERT ke join table):**
```sql
INSERT INTO directory.attraction_categories (attraction_id, taxonomy_id) VALUES ...
```

**Sesudah (langsung di INSERT attractions):**
```sql
-- Tambah kolom categories ke INSERT attractions:
INSERT INTO directory.attractions (id, slug, ..., categories) VALUES
  ('atrc-001', 'pantai-kuta', ..., '{pantai,alam}'),
  ...
```

Jika seed saat ini menggunakan INSERT terpisah ke join table, pindahkan nilai
kategorinya langsung ke INSERT utama. Hapus semua INSERT ke
`attraction_categories`.

---

### 11. `supabase/seeds/06_tourism_villages.sql`

Sama dengan attraction — pindahkan:
- INSERT ke `tourism_village_categories` -> kolom `categories` di INSERT utama
- INSERT ke `tourism_village_activities` -> kolom `activities` di INSERT utama

---

### 12. `supabase/seeds/09_creators_and_itineraries.sql`

**Ubah INSERT itinerary** -- ganti kolom `target_audience` jsonb menjadi text[],
dan tambahkan `languages`, `categories`, `highlights` langsung di INSERT:

```sql
-- Kolom yang berubah/ditambah:
languages,
categories,
highlights,
target_audience,

-- Values:
'{id,en}'::text[],
'{petualangan,bahari}'::text[],
'{pemandangan,kearifan-budaya,biota-alam,kuliner-otentik}'::text[],
'{solo,couple,group}'::text[],
```

**Hapus** block berikut yang tidak lagi relevan:
- `-- 3. Languages` (INSERT INTO directory.itinerary_languages)
- `-- 4. Highlights` (INSERT INTO directory.itinerary_highlights)
- `-- 5. Categories` (INSERT INTO directory.itinerary_categories)

Renumber section comments: 3 -> Daily plans, 4 -> Stops, 5 -> Timelines, 6 -> Schedules.

---

### 13. `src/app/api/attractions/[[...slug]]/find.ts`

**Ganti filter category** -- dari subquery ke containment:

```typescript
// BEFORE (subquery approach):
const { data: catRows } = await supabaseAdmin
  .schema('directory')
  .from('attraction_categories')
  .select('attraction_id')
  .in('taxonomy_id', targetTaxonomyIds);
const ids = catRows.map(r => r.attraction_id);
q = q.in('id', ids);

// AFTER:
if (category) {
  q = q.contains('categories', [category]); // category = slug string
}
```

**Ganti fetch kategoriesMap** di list response -- dari JOIN ke join table
menjadi langsung dari kolom `categories`:

```typescript
// Tambah 'categories' ke main select string
// Ganti categoriesMap logic dengan:
const categorySlugsByEntity: Record<string, string[]> = {};
(rows ?? []).forEach((row: any) => {
  categorySlugsByEntity[row.id] = row.categories ?? [];
});

// Fetch taxonomy metadata sekali untuk semua slugs unik:
const allCatSlugs = [...new Set(Object.values(categorySlugsByEntity).flat())];
const { data: taxData } = allCatSlugs.length
  ? await supabaseAdmin.schema('directory').from('taxonomies')
      .select('id, slug, name, metadata').in('slug', allCatSlugs).eq('type', 'category')
  : { data: [] };
const taxBySlug = new Map((taxData ?? []).map((t: any) => [t.slug, t]));
```

---

### 14. `src/app/api/attractions/[[...slug]]/get.ts`

**Hapus** query ke `attraction_categories` (fetch join table).

**Tambah** `categories` ke main select. Shape response menggunakan lookup by slug
dari taxonomies (sama pola dengan itinerary get.ts).

---

### 15. `src/app/api/itineraries/[[...slug]]/find.ts`

Ganti filter `language`, `category`, dan `theme` dari subquery menjadi containment.
Tambahkan filter `audience` baru:

```typescript
if (language) q = q.contains('languages', [language]);
if (category) q = q.contains('categories', [category]);
if (theme)    q = q.contains('highlights', [theme]);
if (audience) q = q.contains('target_audience', [audience]);
```

Tambahkan `languages, categories, highlights, target_audience` ke select.

Hapus semua subquery blocks untuk language/category/theme.

---

### 16. `src/app/api/itineraries/[[...slug]]/get.ts`

Hapus:
- Query ke `itinerary_languages`
- Query ke `itinerary_categories` (sudah tidak ada tablenya)
- Query ke `itinerary_highlights` (sudah tidak ada tablenya)

Tambahkan `languages, categories, highlights, target_audience` ke main select.

Fetch taxonomy metadata dalam 1 query:

```typescript
const allSlugs = [
  ...((row as any).languages ?? []),
  ...((row as any).categories ?? []),
  ...((row as any).highlights ?? []),
  ...((row as any).target_audience ?? []),
];
const { data: taxData } = allSlugs.length
  ? await supabaseAdmin.schema('directory').from('taxonomies')
      .select('id, slug, name, type, metadata, description')
      .in('slug', allSlugs)
      .in('type', ['language', 'itinerary_category', 'itinerary_highlight', 'target_audience'])
  : { data: [] };
const taxBySlugType = new Map(
  (taxData ?? []).map((t: any) => [`${t.type}:${t.slug}`, t])
);

// Shape highlights menggunakan description dari taxonomy:
const highlights = ((row as any).highlights ?? []).map((slug: string, i: number) => {
  const t = taxBySlugType.get(`itinerary_highlight:${slug}`);
  return t ? {
    id:          t.id,
    slug:        t.slug,
    name:        t.name,
    icon:        t.metadata?.icon ?? '',
    description: t.description ?? { id: '', en: '' },
    sortOrder:   i,
  } : null;
}).filter(Boolean);

// Shape target_audience:
const targetAudience = ((row as any).target_audience ?? []).map((slug: string) => {
  const t = taxBySlugType.get(`target_audience:${slug}`);
  return t ? { id: t.id, slug: t.slug, name: t.name, icon: t.metadata?.icon ?? null } : { slug };
});
```

---

### 17. `src/types/itinerary.ts`

**Ganti** `targetAudience: TargetAudience[]` menjadi:

```typescript
export interface ItineraryAudience {
  id: string;
  slug: string;
  name: I18nText;
  icon?: string | null;
}

// Di Itinerary interface:
targetAudience: ItineraryAudience[];
```

**Hapus** type `TargetAudience = "Solo" | "Couple" | ...` (digantikan taxonomy slugs).

**Ganti** `ItineraryHighlight` -- hapus field `description: I18nText` sebagai
per-itinerary override, karena sekarang dari `taxonomy.description`:

```typescript
export interface ItineraryHighlight {
  id: string;
  slug: string;
  name: I18nText;
  icon: string;
  /** Global description dari taxonomies.description */
  description: I18nText;
  sortOrder: number;
}
```

---

## Verification Steps

```powershell
# 0. Cek tidak ada mojibake di SQL files
Select-String -Path "supabase\migrations\*.sql" -Pattern "[^\x00-\x7F]"
# Output harus kosong (tidak ada hasil)

# 1. Reset DB
npx supabase db reset
# Harus selesai tanpa error

# 2. TypeScript build
npm run build
# Harus 0 TypeScript errors

# 3. Spot-check via API (setelah npm run dev):
# GET /api/itineraries?language=en
# GET /api/itineraries?category=bahari
# GET /api/itineraries?theme=pemandangan
# GET /api/itineraries?audience=solo
# GET /api/itineraries/pesona-lombok-tengah-3-hari-2-malam
#   response.data.highlights[0].description harus ada { id, en }
#   response.data.targetAudience harus array objects dengan slug
```
