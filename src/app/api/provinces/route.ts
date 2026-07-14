import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Province } from '@/types/province';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const islandFilter = searchParams.get('island');
  const sort = searchParams.get('sort');

  // Query database joining related island table details
  let query = supabaseAdmin
    .schema('directory')
    .from('provinces')
    .select(`
      id,
      island_id,
      slug,
      name,
      destinations_count,
      attractions_count,
      villages_count,
      cover_image,
      popularity_score,
      island:islands (
        id,
        name,
        cover_image,
        provinces_count
      )
    `);

  if (islandFilter) {
    query = query.eq('island_id', islandFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[api/provinces]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const provinces: Province[] = (data ?? []).map((row: any) => ({
    id: row.id,
    islandId: row.island_id,
    slug: row.slug,
    name: row.name,
    destinationsCount: row.destinations_count,
    attractionsCount: row.attractions_count,
    villagesCount: row.villages_count,
    coverImage: {
      url: row.cover_image?.url ?? '',
      blurhash: row.cover_image?.blurhash ?? null,
      base64: row.cover_image?.base64 ?? null,
    },
    popularityScore: row.popularity_score,
    island: row.island ? {
      id: row.island.id,
      slug: row.island.id,
      name: row.island.name,
      provincesCount: row.island.provinces_count,
      coverImage: {
        url: row.island.cover_image?.url ?? '',
        blurhash: row.island.cover_image?.blurhash ?? null,
        base64: row.island.cover_image?.base64 ?? null,
      },
    } : undefined,
  }));

  // Sort logic
  if (sort === 'alpha') {
    provinces.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'popular') {
    provinces.sort((a, b) => b.popularityScore - a.popularityScore);
  }

  return NextResponse.json({ data: provinces });
}
