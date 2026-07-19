import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Journal } from '@/types/journal';

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const sort = query.sort || 'popularity';
    const search = (query.search || '').toLowerCase();
    const destinationId = query.destination_id || '';
    const destinationSlug = query.destination_slug || '';
    const authorSlug = query.author_slug || '';
    const category = query.category || '';
    const rating = query.rating || '';

    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // Build base query
    let dbQuery = supabaseAdmin
      .schema('directory')
      .from('journals')
      .select(`
        id,
        slug,
        title,
        destination_id,
        author_id,
        cover_image,
        description,
        content,
        categories,
        rating_average,
        reviews_count,
        likes_count,
        views_count,
        created_at,
        updated_at,
        destination:destinations!inner (
          id,
          name,
          slug,
          type,
          province_id,
          province:provinces!inner (
            id,
            name,
            slug,
            island:islands (
              id,
              name
            )
          )
        ),
        author:creators!inner (
          id,
          slug,
          name,
          display_name,
          avatar,
          bio,
          is_verified
        )
      `, { count: 'exact' });

    // 1. Text Search Filter
    if (search) {
      dbQuery = dbQuery.or(`title->>'id'.ilike.%${search}%,title->>'en'.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
    }

    // 2. Destination ID Filter
    if (destinationId) {
      dbQuery = dbQuery.eq('destination_id', destinationId);
    }

    // 3. Destination Slug Filter
    if (destinationSlug) {
      dbQuery = dbQuery.eq('destination.slug', destinationSlug);
    }

    // 4. Author Slug Filter
    if (authorSlug) {
      dbQuery = dbQuery.eq('author.slug', authorSlug);
    }

    // 5. Category Filter (containment)
    if (category) {
      dbQuery = dbQuery.contains('categories', [category]);
    }

    // 6. Rating Filter
    if (rating) {
      const threshold = parseFloat(rating);
      if (!isNaN(threshold)) {
        dbQuery = dbQuery.gte('rating_average', threshold);
      }
    }

    // 7. Sort Order
    if (sort === 'popularity') {
      dbQuery = dbQuery.order('views_count', { ascending: false }).order('likes_count', { ascending: false });
    } else if (sort === 'rating') {
      dbQuery = dbQuery.order('rating_average', { ascending: false });
    } else if (sort === 'newest') {
      dbQuery = dbQuery.order('created_at', { ascending: false });
    } else {
      dbQuery = dbQuery.order('created_at', { ascending: false });
    }

    // 8. Pagination
    const offset = (page - 1) * limit;
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    // 9. Execute query
    const { data: dbData, error: dbError, count } = await dbQuery;

    if (dbError) {
      console.error('[api/journals GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    const total = count || 0;
    const journalIds = (dbData ?? []).map((row: any) => row.id);

    if (journalIds.length === 0) {
      return {
        data: [],
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }

    // 10. Fetch categories lookup mapping
    const catSlugsByJournal: Record<string, string[]> = {};
    (dbData ?? []).forEach((row: any) => {
      catSlugsByJournal[row.id] = row.categories ?? [];
    });

    const allCatSlugs = [...new Set(Object.values(catSlugsByJournal).flat())];
    const { data: catTaxa } = allCatSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', allCatSlugs).eq('type', 'category')
      : { data: [] };
    const catBySlug = new Map((catTaxa ?? []).map((t: any) => [t.slug, t]));

    const categoriesMap: Record<string, any[]> = {};
    (dbData ?? []).forEach((row: any) => {
      const slugs = row.categories ?? [];
      categoriesMap[row.id] = slugs.map((s: string) => {
        const t = catBySlug.get(s);
        if (!t) return { id: '', slug: s, name: s, type: 'category', metadata: {} };
        const nameObj = t.name;
        let catName = '';
        if (typeof nameObj === 'string') catName = nameObj;
        else if (nameObj && typeof nameObj === 'object') catName = nameObj[lang] || nameObj.id || nameObj.en || '';
        return { id: t.id, slug: t.slug, name: catName, type: t.type, metadata: t.metadata || {} };
      });
    });

    // 11. Map database rows to Journal interfaces
    const journals: Journal[] = (dbData ?? []).map((row: any) => {
      const rawProvince = Array.isArray(row.destination?.province)
        ? row.destination.province[0]
        : row.destination?.province;
      
      const rawIsland = rawProvince
        ? (Array.isArray(rawProvince.island) ? rawProvince.island[0] : rawProvince.island)
        : null;

      const destinationMapped = row.destination ? {
        id: row.destination.id,
        slug: row.destination.slug,
        name: row.destination.name,
        type: row.destination.type as 'regency' | 'city',
        provinceId: row.destination.province_id || '',
        province: rawProvince ? {
          id: rawProvince.id,
          slug: rawProvince.slug,
          name: rawProvince.name,
          destinationsCount: 0,
          attractionsCount: 0,
          villagesCount: 0,
          itinerariesCount: 0,
          tourGuidesCount: 0,
          journalsCount: 0,
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
        coverImage: { url: '', blurhash: null, base64: null },
        description: '',
        attractionsCount: 0,
        villagesCount: 0,
        itinerariesCount: 0,
        tourGuidesCount: 0,
        journalsCount: 0,
        marketProductsCount: 0,
        ratingAverage: 0,
        popularScore: 0
      } : undefined;

      const rawAuthor = Array.isArray(row.author) ? row.author[0] : row.author;
      const authorMapped = rawAuthor ? {
        id: rawAuthor.id,
        userId: null,
        slug: rawAuthor.slug,
        name: rawAuthor.name,
        displayName: rawAuthor.display_name,
        avatar: {
          url: rawAuthor.avatar?.url ?? '',
          blurhash: rawAuthor.avatar?.blurhash ?? null,
          base64: rawAuthor.avatar?.base64 ?? null
        },
        bio: {
          id: rawAuthor.bio?.id || '',
          en: rawAuthor.bio?.en || ''
        },
        isVerified: !!rawAuthor.is_verified
      } : undefined;

      const cats = categoriesMap[row.id] || [];

      return {
        id: row.id,
        slug: row.slug,
        title: row.title?.[lang] || row.title?.id || row.title?.en || '',
        destinationId: row.destination_id,
        destination: destinationMapped,
        authorId: row.author_id,
        author: authorMapped,
        coverImage: {
          url: row.cover_image?.url ?? '',
          blurhash: row.cover_image?.blurhash ?? null,
          base64: row.cover_image?.base64 ?? null
        },
        description: row.description?.[lang] || row.description?.id || row.description?.en || '',
        content: row.content?.[lang] || row.content?.id || row.content?.en || '',
        categories: cats,
        ratingAverage: Number(row.rating_average),
        reviewsCount: row.reviews_count,
        likesCount: row.likes_count,
        viewsCount: row.views_count,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    });

    return {
      data: journals,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  }, {
    query: t.Optional(t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      search: t.Optional(t.String()),
      destination_id: t.Optional(t.String()),
      destination_slug: t.Optional(t.String()),
      author_slug: t.Optional(t.String()),
      category: t.Optional(t.String()),
      rating: t.Optional(t.String()),
    }))
  });
