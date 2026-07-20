import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';

const app = new Elysia({ prefix: '/api/certifications' })
  .get('/', async ({ set }) => {
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('certifications')
      .select('id, name, slug')
      .order('name->>id');

    if (error) {
      console.error('[api/certifications]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const certifications = (data ?? []).map((row: any) => ({
      id: row.id,
      name: typeof row.name === 'string' ? row.name : (row.name?.id || row.name?.en || ''),
      slug: row.slug,
    }));

    return { data: certifications };
  });

export const GET = app.handle;
export type CertificationsApp = typeof app;
