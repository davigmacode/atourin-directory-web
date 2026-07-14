# Supabase CLI Setup — Schema `directory`

Panduan lengkap mengintegrasikan Supabase ke project **atourin-directory-web** menggunakan schema `directory` sebagai satu-satunya schema.

---

## Prerequisites

- Node.js >= 18
- Akun Supabase -> [supabase.com](https://supabase.com)
- Project Supabase sudah dibuat di dashboard

---

## Step 1 — Install Supabase CLI

Install secara global via npm (atau gunakan `npx` setiap kali):

```bash
npm install -g supabase
```

Verifikasi instalasi:

```bash
supabase --version
```

---

## Step 2 — Login ke Supabase CLI

```bash
supabase login
```

Browser akan terbuka untuk autentikasi. Setelah login, token disimpan secara lokal.

---

## Step 3 — Init Supabase di Project

Jalankan di root project (`d:\projects\atourin-directory-web`):

```bash
supabase init
```

Ini akan membuat folder `supabase/` dengan struktur:

```
supabase/
├── config.toml       <- konfigurasi lokal
├── migrations/       <- file migration SQL
└── seed.sql          <- data awal (opsional)
```

> **Catatan:** Folder `supabase/` di-commit ke Git. Tambahkan `supabase/.temp/` ke `.gitignore`.

---

## Step 4 — Link ke Project Supabase

Dapatkan **Project ID** dari URL dashboard:
`https://supabase.com/dashboard/project/<PROJECT_ID>`

```bash
supabase link --project-ref <PROJECT_ID>
```

Masukkan password database saat diminta (ada di Settings -> Database -> Connection string).

---

## Step 5 — Konfigurasi Schema `directory`

Edit `supabase/config.toml`, tambahkan schema `directory` agar CLI mengenalinya:

```toml
[db]
schemas = ["directory"]

[api]
schemas = ["directory"]
extra_search_path = ["directory", "extensions"]
```

> **Penting:** Ini memastikan semua operasi (type generation, migrations) hanya bekerja di schema `directory`, bukan `public`.

---

## Step 6 — Buat Migration Awal

Jika schema `directory` belum ada di Supabase, buat migration pertama:

```bash
supabase migration new create_directory_schema
```

File baru akan muncul di `supabase/migrations/<timestamp>_create_directory_schema.sql`.

Edit file tersebut, tambahkan:

```sql
-- Buat schema directory
CREATE SCHEMA IF NOT EXISTS directory;

-- Contoh tabel islands
CREATE TABLE IF NOT EXISTS directory.islands (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                 text UNIQUE NOT NULL,
  name                 text NOT NULL,
  provinces_count      integer NOT NULL DEFAULT 0,
  cover_image_url      text,
  cover_image_blurhash text,
  cover_image_base64   text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);
```

---

## Step 7 — Push Migration ke Supabase

```bash
supabase db push
```

Ini menjalankan semua migration yang belum diaplikasikan ke database remote.

Untuk melihat status migration:

```bash
supabase migration list
```

---

## Step 8 — Generate TypeScript Types

Generate types dari schema `directory` secara otomatis:

```bash
supabase gen types typescript \
  --project-id <PROJECT_ID> \
  --schema directory \
  > src/types/supabase.ts
```

> **Tips:** Tambahkan script ini ke `package.json` agar mudah dijalankan ulang:

```json
{
  "scripts": {
    "db:types": "supabase gen types typescript --project-id <PROJECT_ID> --schema directory > src/types/supabase.ts"
  }
}
```

Jalankan dengan:

```bash
npm run db:types
```

---

## Step 9 — Install Supabase JS Client

```bash
npm install @supabase/supabase-js
```

---

## Step 10 — Setup Environment Variables

Buat/edit file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_ID>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY>
```

Dapatkan nilai-nilai ini dari:
- Dashboard -> Settings -> API -> **Project URL**
- Dashboard -> Settings -> API -> **anon public** key
- Dashboard -> Settings -> API -> **service_role** key (rahasia, jangan expose ke client!)

> **Penting:** Tambahkan `.env.local` ke `.gitignore` (biasanya sudah ada).

---

## Step 11 — Buat Supabase Client

Buat file `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client untuk browser (dengan RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Client untuk server-side (bypass RLS — gunakan hanya di API routes/server components)
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

---

## Step 12 — Contoh Penggunaan di API Route

Contoh update `src/app/api/islands/route.ts` untuk membaca dari Supabase:

```typescript
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Island } from '@/types/island';

export async function GET(): Promise<NextResponse> {
  const { data, error } = await supabaseAdmin
    .schema('directory')
    .from('islands')
    .select('id, slug, name, provinces_count, cover_image_url, cover_image_blurhash');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const islands: Island[] = (data ?? []).map((item) => ({
    id: item.slug,
    slug: item.slug,
    name: item.name,
    provincesCount: item.provinces_count,
    coverImage: {
      url: item.cover_image_url ?? '',
      blurhash: item.cover_image_blurhash ?? null,
      base64: null,
    },
  }));

  return NextResponse.json({ data: islands });
}
```

---

## Step 13 — Pull Schema dari Remote (Opsional)

Jika schema sudah dibuat langsung di dashboard Supabase (bukan via CLI), pull schema ke lokal:

```bash
supabase db pull
```

Ini akan men-generate migration file yang merepresentasikan state database saat ini.

---

## Quick Reference Commands

| Command | Kegunaan |
|---|---|
| `supabase login` | Login ke CLI |
| `supabase link --project-ref <ID>` | Link ke project |
| `supabase migration new <name>` | Buat migration baru |
| `supabase db push` | Jalankan migration ke remote |
| `supabase db pull` | Sync schema dari remote ke lokal |
| `supabase migration list` | Lihat status migration |
| `supabase gen types typescript ...` | Generate TS types |
| `supabase db reset` | Reset DB lokal (hati-hati!) |
| `supabase start` | Jalankan Supabase lokal (Docker) |
| `supabase stop` | Matikan Supabase lokal |

---

## Workflow Harian

```
Ubah schema di dashboard atau SQL editor
        |
supabase db pull          <- sync perubahan ke lokal
        |
npm run db:types          <- update TypeScript types
        |
Gunakan types baru di kode
```

Atau jika menggunakan migration-first:

```
Buat migration baru
        |
supabase migration new <nama>
        |
Edit SQL di supabase/migrations/
        |
supabase db push          <- apply ke remote
        |
npm run db:types          <- update TypeScript types
```

---

## Referensi

- [Supabase CLI Docs](https://supabase.com/docs/reference/cli/introduction)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Schemas](https://supabase.com/docs/guides/database/schemas)
- [Type Generation](https://supabase.com/docs/guides/api/rest/generating-types)
