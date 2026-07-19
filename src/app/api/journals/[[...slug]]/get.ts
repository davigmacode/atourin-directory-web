import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Journal } from '@/types/journal';

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, headers, set }) => {
    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch journal
    const { data: row, error: dbError } = await supabaseAdmin
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
        destination:destinations (
          id,
          name,
          slug,
          type,
          province_id,
          province:provinces (
            id,
            name,
            slug,
            island:islands (
              id,
              name
            )
          )
        ),
        author:creators (
          id,
          slug,
          name,
          display_name,
          avatar,
          bio,
          is_verified
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (dbError) {
      console.error('[api/journals/[slug] GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Journal not found' };
    }

    // 2. Fetch categories from taxonomy metadata
    const catSlugs = (row as any).categories ?? [];
    const { data: catTaxData } = catSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', catSlugs).eq('type', 'category')
      : { data: [] };
    const catBySlugG = new Map((catTaxData ?? []).map((t: any) => [t.slug, t]));

    // Map categories
    const categories = (catSlugs ?? []).map((s: string) => {
      const t = catBySlugG.get(s);
      if (!t) return null;
      const nameObj = t.name;
      let catName = '';
      if (typeof nameObj === 'string') catName = nameObj;
      else if (nameObj && typeof nameObj === 'object') catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      return { id: t.id, slug: t.slug, name: catName, type: t.type, metadata: t.metadata || {} };
    }).filter((c) => c !== null);

    const rowAny = row as any;

    // Map destination
    const rawDestination = Array.isArray(rowAny.destination)
      ? rowAny.destination[0]
      : rowAny.destination;

    const rawProvince = rawDestination
      ? (Array.isArray(rawDestination.province) ? rawDestination.province[0] : rawDestination.province)
      : null;
    
    const rawIsland = rawProvince
      ? (Array.isArray(rawProvince.island) ? rawProvince.island[0] : rawProvince.island)
      : null;

    const destinationMapped = rawDestination ? {
      id: rawDestination.id,
      slug: rawDestination.slug,
      name: rawDestination.name,
      type: rawDestination.type as 'regency' | 'city',
      provinceId: rawDestination.province_id || '',
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

    // Map author
    const rawAuthor = Array.isArray(rowAny.author) ? rowAny.author[0] : rowAny.author;
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

    // Create journal object
    const journal: Journal = {
      id: rowAny.id,
      slug: rowAny.slug,
      title: rowAny.title?.[lang] || rowAny.title?.id || rowAny.title?.en || '',
      destinationId: rowAny.destination_id,
      destination: destinationMapped,
      authorId: rowAny.author_id,
      author: authorMapped,
      coverImage: {
        url: rowAny.cover_image?.url ?? '',
        blurhash: rowAny.cover_image?.blurhash ?? null,
        base64: rowAny.cover_image?.base64 ?? null
      },
      description: rowAny.description?.[lang] || rowAny.description?.id || rowAny.description?.en || '',
      content: rowAny.content?.[lang] || rowAny.content?.id || rowAny.content?.en || '',
      categories: categories as any[],
      ratingAverage: Number(rowAny.rating_average),
      reviewsCount: rowAny.reviews_count,
      likesCount: rowAny.likes_count,
      viewsCount: rowAny.views_count,
      createdAt: rowAny.created_at,
      updatedAt: rowAny.updated_at
    };

    return { data: journal };
  });
