import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Island } from '@/types/island';

const app = new Elysia({ prefix: '/api/islands' })
  .get('/', async ({ set }) => {
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('islands')
      .select('id, name, provinces_count, cover_image')
      .order('name');

    if (error) {
      console.error('[api/islands]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const islands: Island[] = (data ?? []).map((row) => ({
      id: row.id,
      slug: row.id,
      name: row.name,
      provincesCount: row.provinces_count,
      coverImage: {
        url: row.cover_image?.url ?? '',
        blurhash: row.cover_image?.blurhash ?? null,
        base64: row.cover_image?.base64 ?? null,
      },
    }));

    return { data: islands };
  });

export const GET = app.handle;
export type IslandsApp = typeof app;
