import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Destination } from '@/types/destination';

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const sort = query.sort || 'alpha';
    const search = (query.search || '').toLowerCase();
    const island = query.island || '';
    const province = query.province || '';
    const category = query.category || '';

    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // Build base query
    let dbQuery = supabaseAdmin
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
        categories,
        attractions_count,
        villages_count,
        itineraries_count,
        tour_guides_count,
        market_products_count,
        rating_average,
        popular_score,
        province:provinces!inner (
          id,
          name,
          slug,
          island:islands!inner (
            id,
            name
          )
        )
      `, { count: 'exact' });

    // Apply DB Filters
    if (search) {
      dbQuery = dbQuery.ilike('name', `%${search}%`);
    }
    if (island) {
      dbQuery = dbQuery.ilike('province.island.name', island);
    }
    if (province) {
      dbQuery = dbQuery.ilike('province.name', province);
    }

    if (category) {
      dbQuery = dbQuery.contains('categories', [category]);
    }

    // Sorting
    if (sort === 'alpha') {
      dbQuery = dbQuery.order('name', { ascending: true });
    } else if (sort === 'alpha-desc') {
      dbQuery = dbQuery.order('name', { ascending: false });
    } else if (sort === 'popular') {
      dbQuery = dbQuery.order('popular_score', { ascending: false });
    } else if (sort === 'content') {
      dbQuery = dbQuery.order('attractions_count', { ascending: false });
    }

    // Pagination Range
    const offset = (page - 1) * limit;
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    const { data: dbData, error: destError, count } = await dbQuery;

    if (destError) {
      console.error('[api/destinations GET destinations]', destError.message);
      set.status = 500;
      return { error: destError.message };
    }

    const total = count || 0;
    const destinationIds = (dbData ?? []).map((row: any) => row.id);

    if (destinationIds.length === 0) {
      return {
        data: [],
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }

    // Get categories from the main query column
    const categorySlugsByDest: Record<string, string[]> = {};
    (dbData ?? []).forEach((row: any) => {
      categorySlugsByDest[row.id] = row.categories ?? [];
    });

    // Fetch taxonomy metadata for category slugs
    const allCatSlugs = [...new Set(Object.values(categorySlugsByDest).flat())];
    const { data: catMetaData } = allCatSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('slug, name').in('slug', allCatSlugs).eq('type', 'category')
      : { data: [] };
    const catMetaBySlug = new Map((catMetaData ?? []).map((t: any) => [t.slug, t.name]));

    // Query media (only for paged destinations)
    const { data: mediaData, error: mediaError } = await supabaseAdmin
      .schema('directory')
      .from('media')
      .select(`
        id,
        entity_id,
        type,
        url,
        metadata,
        sort_order
      `)
      .eq('entity_type', 'destination')
      .in('entity_id', destinationIds);

    if (mediaError) {
      console.error('[api/destinations GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    // Process media into a lookup map
    const mediaMap: Record<string, any[]> = {};
    (mediaData ?? []).forEach((m: any) => {
      const entityId = m.entity_id;
      if (!mediaMap[entityId]) {
        mediaMap[entityId] = [];
      }
      mediaMap[entityId].push({
        id: m.id,
        entityType: 'destination',
        entityId,
        type: m.type as 'image' | 'video',
        url: m.url,
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      });
    });

    // Map rows to Destination interfaces
    const destinations: Destination[] = (dbData ?? []).map((row: any) => {
      const slugs = categorySlugsByDest[row.id] ?? [];
      const tags = slugs.map((s: string) => ({
        slug: s,
        name: catMetaBySlug.get(s) ? (() => {
          const n = catMetaBySlug.get(s);
          return typeof n === 'object' ? (n[lang] || n.id || n.en || s) : n;
        })() : s,
      }));
      const media = (mediaMap[row.id] ?? []).sort((a: any, b: any) => a.sortOrder - b.sortOrder);

      const rawProvince = Array.isArray(row.province) ? row.province[0] : row.province;
      const rawIsland = rawProvince
        ? (Array.isArray(rawProvince.island) ? rawProvince.island[0] : rawProvince.island)
        : null;

      return {
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
    });

    return {
      data: destinations,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  }, {
    query: t.Optional(t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      search: t.Optional(t.String()),
      island: t.Optional(t.String()),
      province: t.Optional(t.String()),
      category: t.Optional(t.String()),
    }))
  });
