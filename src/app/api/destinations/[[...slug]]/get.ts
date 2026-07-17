import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Destination } from '@/types/destination';

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, headers, set }) => {
    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch destination
    const { data: row, error: destError } = await supabaseAdmin
      .schema('directory')
      .from('destinations')
      .select(`
        id,
        slug,
        name,
        type,
        province_id,
        cover_image,
        description,
        attractions_count,
        villages_count,
        itineraries_count,
        tour_guides_count,
        market_products_count,
        rating_average,
        popular_score,
        province:provinces (
          id,
          name,
          slug,
          island:islands (
            id,
            name
          )
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (destError) {
      console.error('[api/destinations/[slug] GET]', destError.message);
      set.status = 500;
      return { error: destError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Destination not found' };
    }

    // 2. Fetch taxonomy assignments
    const { data: assignmentsData, error: assignError } = await supabaseAdmin
      .schema('directory')
      .from('taxonomy_assignments')
      .select(`
        taxonomy:taxonomies (
          slug,
          name
        )
      `)
      .eq('entity_type', 'destination_category')
      .eq('entity_id', row.id);

    if (assignError) {
      console.error('[api/destinations/[slug] GET assignments]', assignError.message);
      set.status = 500;
      return { error: assignError.message };
    }

    // 3. Fetch media
    const { data: mediaData, error: mediaError } = await supabaseAdmin
      .schema('directory')
      .from('media')
      .select(`
        id,
        type,
        url,
        metadata,
        sort_order
      `)
      .eq('entity_type', 'destination')
      .eq('entity_id', row.id);

    if (mediaError) {
      console.error('[api/destinations/[slug] GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    const tags = (assignmentsData ?? [])
      .map((ca: any) => {
        const category = ca.taxonomy;
        if (!category) return null;
        const nameObj = category.name;
        let tagName = '';
        if (typeof nameObj === 'string') {
          tagName = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          tagName = nameObj[lang] || nameObj.id || nameObj.en || '';
        }
        return {
          slug: category.slug || '',
          name: tagName,
        };
      })
      .filter((t: any) => t !== null && t.name !== '');

    const media = (mediaData ?? [])
      .map((m: any) => ({
        id: m.id,
        entityType: 'destination',
        entityId: row.id,
        type: m.type as 'image' | 'video',
        url: m.url,
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      }))
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder);
    
    const rawProvince = Array.isArray(row.province) ? row.province[0] : row.province;
    const rawIsland = rawProvince
      ? (Array.isArray(rawProvince.island) ? rawProvince.island[0] : rawProvince.island)
      : null;

    const destination: Destination = {
      id: row.id,
      slug: row.slug,
      name: row.name,
      type: row.type as 'regency' | 'city',
      provinceId: row.province_id,
      province: rawProvince ? {
        id: rawProvince.id,
        slug: rawProvince.slug,
        name: rawProvince.name,
        destinationsCount: 0,
        attractionsCount: 0,
        villagesCount: 0,
        coverImage: { url: '', blurhash: null, base64: null },
        popularityScore: 0,
        islandId: rawIsland?.id || '',
        island: rawIsland ? {
          id: rawIsland.id,
          slug: rawIsland.id,
          name: rawIsland.name,
          provincesCount: 0,
          coverImage: { url: '', blurhash: null, base64: null }
        } : undefined
      } : undefined,
      coverImage: {
        url: row.cover_image?.url ?? '',
        blurhash: row.cover_image?.blurhash ?? null,
        base64: row.cover_image?.base64 ?? null,
      },
      description: row.description?.[lang] || row.description?.id || row.description?.en || '',
      attractionsCount: row.attractions_count,
      villagesCount: row.villages_count,
      itinerariesCount: row.itineraries_count,
      tourGuidesCount: row.tour_guides_count,
      marketProductsCount: row.market_products_count,
      ratingAverage: Number(row.rating_average),
      popularScore: row.popular_score,
      tags,
      media,
    };

    return { data: destination };
  });
