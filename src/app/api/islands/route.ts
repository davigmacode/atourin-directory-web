import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Island } from '@/types/island';

export async function GET(): Promise<NextResponse> {
  const { data, error } = await supabaseAdmin
    .schema('directory')
    .from('islands')
    .select('id, name, provinces_count, cover_image')
    .order('name');

  if (error) {
    console.error('[api/islands]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
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

  return NextResponse.json({ data: islands });
}
