import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Province } from '@/types/province';

const app = new Elysia({ prefix: '/api/provinces' })
  .get('/', async ({ query, set }) => {
    const islandFilter = query.island;
    const sort = query.sort;

    // Query database joining related island table details
    let dbQuery = supabaseAdmin
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
        itineraries_count,
        tour_guides_count,
        journals_count,
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
      dbQuery = dbQuery.eq('island_id', islandFilter);
    }

    const { data, error } = await dbQuery;

    if (error) {
      console.error('[api/provinces]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const provinces: Province[] = (data ?? []).map((row: any) => ({
      id: row.id,
      islandId: row.island_id,
      slug: row.slug,
      name: row.name,
      destinationsCount: row.destinations_count,
      attractionsCount: row.attractions_count,
      villagesCount: row.villages_count,
      itinerariesCount: row.itineraries_count,
      tourGuidesCount: row.tour_guides_count,
      journalsCount: row.journals_count,
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

    return { data: provinces };
  }, {
    query: t.Optional(t.Object({
      island: t.Optional(t.String()),
      sort: t.Optional(t.String()),
    }))
  });

export const GET = app.handle;
export type ProvincesApp = typeof app;
