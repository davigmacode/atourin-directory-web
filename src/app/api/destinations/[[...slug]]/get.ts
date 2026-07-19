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
        categories,
        attractions_count,
        villages_count,
        itineraries_count,
        tour_guides_count,
        journals_count,
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

    // 2. Fetch categories from taxonomy metadata
    const catSlugs = (row as any).categories ?? [];
    const { data: assignTaxData } = catSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('slug, name').eq('type', 'category').in('slug', catSlugs)
      : { data: [] };
    const assignMetaBySlug = new Map((assignTaxData ?? []).map((t: any) => [t.slug, t.name]));

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

    // 4. Fetch related attractions
    const { data: attractionsData, error: attrError } = await supabaseAdmin
      .schema('directory')
      .from('attractions')
      .select(`
        id,
        slug,
        name,
        description,
        cover_image,
        min_price,
        rating_average,
        reviews_count,
        categories,
        destination:destinations (
          id,
          name,
          slug,
          province:provinces ( id, name, slug )
        )
      `)
      .eq('destination_id', row.id)
      .limit(20);

    if (attrError) {
      console.error('[api/destinations/[slug] GET related attractions]', attrError.message);
    }

    // 5. Fetch related tourism villages
    const { data: villagesData, error: vilError } = await supabaseAdmin
      .schema('directory')
      .from('tourism_villages')
      .select(`
        id,
        slug,
        name,
        description,
        cover_image,
        featured,
        adwi_level_id,
        adwi_level:taxonomies!adwi_level_id ( id, slug, name, metadata ),
        village_theme_id,
        village_theme:taxonomies!village_theme_id ( id, slug, name, metadata ),
        rating_average,
        reviews_count,
        homestay_count,
        homestay_min_price,
        signature,
        categories,
        activities,
        destination:destinations (
          id,
          name,
          slug,
          province:provinces ( id, name, slug )
        )
      `)
      .eq('destination_id', row.id)
      .limit(20);

    if (vilError) {
      console.error('[api/destinations/[slug] GET related villages]', vilError.message);
    }

    // 6. Fetch related itineraries
    const { data: itinerariesData, error: itinError } = await supabaseAdmin
      .schema('directory')
      .from('itineraries')
      .select(`
        id,
        slug,
        name,
        description,
        cover_image,
        duration_days,
        budget_estimation,
        rating_average,
        reviews_count,
        categories,
        destination:destinations ( id, name, slug )
      `)
      .eq('destination_id', row.id)
      .limit(20);

    if (itinError) {
      console.error('[api/destinations/[slug] GET related itineraries]', itinError.message);
    }

    // 7. Fetch related tour guides
    const { data: guidesData, error: guideError } = await supabaseAdmin
      .schema('directory')
      .from('tour_guides')
      .select(`
        id,
        slug,
        name,
        avatar,
        destination_id,
        rating_average,
        trips_count,
        daily_rate,
        year_experience,
        verified,
        destination:destinations (
          id,
          name,
          slug,
          province:provinces ( id, name, slug )
        )
      `)
      .eq('destination_id', row.id)
      .limit(20);

    if (guideError) {
      console.error('[api/destinations/[slug] GET related guides]', guideError.message);
    }

    // 7.5. Fetch related journals
    const { data: journalsData, error: journalError } = await supabaseAdmin
      .schema('directory')
      .from('journals')
      .select(`
        id,
        slug,
        title,
        description,
        cover_image,
        rating_average,
        reviews_count,
        likes_count,
        views_count,
        created_at,
        author:creators (
          id,
          slug,
          name,
          display_name,
          avatar,
          is_verified
        )
      `)
      .eq('destination_id', row.id)
      .limit(20);

    if (journalError) {
      console.error('[api/destinations/[slug] GET related journals]', journalError.message);
    }

    // Batch-fetch guide specialisms, languages, certifications
    const guideIds = (guidesData ?? []).map((g: any) => g.id);

    const { data: specData } = guideIds.length
      ? await supabaseAdmin.schema('directory').from('tour_guide_specialism')
          .select('guide_id, taxonomy:taxonomies!taxonomy_id(slug)').in('guide_id', guideIds)
      : { data: [] };
    const specByGuide: Record<string, string[]> = {};
    (specData ?? []).forEach((r: any) => {
      const gid = r.guide_id;
      if (!specByGuide[gid]) specByGuide[gid] = [];
      const t = r.taxonomy;
      specByGuide[gid].push(typeof t === 'object' ? (t.slug || '') : '');
    });

    const { data: langData } = guideIds.length
      ? await supabaseAdmin.schema('directory').from('tour_guide_languages')
          .select('guide_id, tax:taxonomies!category_id(slug)').in('guide_id', guideIds)
      : { data: [] };
    const langByGuide: Record<string, string[]> = {};
    (langData ?? []).forEach((r: any) => {
      const gid = r.guide_id;
      if (!langByGuide[gid]) langByGuide[gid] = [];
      const t = r.tax;
      langByGuide[gid].push(typeof t === 'object' ? (t.slug || '') : '');
    });

    const { data: certData } = guideIds.length
      ? await supabaseAdmin.schema('directory').from('tour_guide_certifications')
          .select('tour_guide_id, cert:certifications!certification_id(slug)').in('tour_guide_id', guideIds)
      : { data: [] };
    const certByGuide: Record<string, string[]> = {};
    (certData ?? []).forEach((r: any) => {
      const gid = r.tour_guide_id;
      if (!certByGuide[gid]) certByGuide[gid] = [];
      const t = r.cert;
      certByGuide[gid].push(typeof t === 'object' ? (t.slug || '') : '');
    });

    const tags = catSlugs.map((s: string) => {
      const name = assignMetaBySlug.get(s);
      const tagName = typeof name === 'object' ? (name[lang] || name.id || name.en || s) : (name || s);
      return { slug: s, name: tagName };
    }).filter((t: any) => t.name !== '');

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

    // Map related attractions
    const mappedAttractions = (attractionsData ?? []).map((a: any) => {
      const rawDest = Array.isArray(a.destination) ? a.destination[0] : a.destination;
      const rawProv = rawDest ? (Array.isArray(rawDest.province) ? rawDest.province[0] : rawDest.province) : null;
      const nameObj = a.name;
      const aName = typeof nameObj === 'object' ? (nameObj[lang] || nameObj.id || nameObj.en || '') : (nameObj || '');
      const descObj = a.description;
      const aDesc = typeof descObj === 'object' ? (descObj[lang] || descObj.id || descObj.en || '') : (descObj || '');
      return {
        id: a.slug,
        img: a.cover_image?.url || '',
        name: aName,
        desc: aDesc,
        cat: (a.categories ?? [])[0] || '',
        price: a.min_price || 0,
        rating: Number(a.rating_average) || 0,
        reviews: a.reviews_count || 0,
        region: rawDest ? `${rawDest.name}, ${rawProv?.name || ''}` : '',
      };
    });

    // Map related villages
    const mappedVillages = (villagesData ?? []).map((v: any) => {
      const rawDest = Array.isArray(v.destination) ? v.destination[0] : v.destination;
      const rawProv = rawDest ? (Array.isArray(rawDest.province) ? rawDest.province[0] : rawDest.province) : null;
      const adwiCat = Array.isArray(v.adwi_level) ? v.adwi_level[0] : v.adwi_level;
      const themeCat = Array.isArray(v.village_theme) ? v.village_theme[0] : v.village_theme;
      return {
        id: v.slug,
        img: v.cover_image?.url || '',
        name: v.name,
        region: rawDest ? `${rawDest.name}, ${rawProv?.name || ''}` : '',
        adwi: adwiCat?.slug || 'Rintisan',
        adwiBg: adwiCat?.metadata?.color || '#F0F0F0',
        adwiFg: adwiCat?.metadata?.fg || '#5C5C5C',
        theme: themeCat?.name?.[lang] || themeCat?.name?.id || themeCat?.name?.en || themeCat?.slug || '',
        activities: v.activities || [],
        price: v.homestay_min_price || 0,
        rating: Number(v.rating_average) || 0,
        families: v.reviews_count || 0,
        signature: v.signature || '',
        featured: v.featured || false,
      };
    });

    // Map related itineraries
    const mappedItineraries = (itinerariesData ?? []).map((i: any) => {
      const rawDest = Array.isArray(i.destination) ? i.destination[0] : i.destination;
      const nameObj = i.name;
      const iName = typeof nameObj === 'object' ? (nameObj[lang] || nameObj.id || nameObj.en || '') : (nameObj || '');
      const descObj = i.description;
      const iDesc = typeof descObj === 'object' ? (descObj[lang] || descObj.id || descObj.en || '') : (descObj || '');
      return {
        id: i.slug,
        img: i.cover_image?.url || '',
        title: iName,
        desc: iDesc,
        city: rawDest?.name || '',
        budget: i.budget_estimation || 0,
        author: 'Atourin',
        authorType: 'Official',
        rating: Number(i.rating_average) || 0,
        days: i.duration_days || 1,
        tag: (i.categories ?? [])[0] || '',
      };
    });

    // Map related tour guides
    const mappedGuides = (guidesData ?? []).map((g: any) => {
      const rawDest = Array.isArray(g.destination) ? g.destination[0] : g.destination;
      const rawProv = rawDest ? (Array.isArray(rawDest.province) ? rawDest.province[0] : rawDest.province) : null;
      return {
        id: g.slug,
        name: g.name,
        img: g.avatar?.url || 'https://i.pravatar.cc/200?img=12',
        region: rawDest ? `${rawDest.name}, ${rawProv?.name || ''}` : '',
        spec: specByGuide[g.id] || [],
        langs: langByGuide[g.id] || [],
        certs: certByGuide[g.id] || [],
        rating: Number(g.rating_average) || 0,
        trips: g.trips_count || 0,
        price: g.daily_rate || 0,
        exp: g.year_experience ? `${g.year_experience} tahun` : '',
        verified: g.verified || false,
      };
    });

    // Map related journals
    const mappedJournals = (journalsData ?? []).map((j: any) => {
      const rawAuthor = Array.isArray(j.author) ? j.author[0] : j.author;
      const titleObj = j.title;
      const jTitle = typeof titleObj === 'object' ? (titleObj[lang] || titleObj.id || titleObj.en || '') : (titleObj || '');
      const descObj = j.description;
      const jDesc = typeof descObj === 'object' ? (descObj[lang] || descObj.id || descObj.en || '') : (descObj || '');
      return {
        id: j.slug,
        img: j.cover_image?.url || '',
        title: jTitle,
        excerpt: jDesc,
        author: rawAuthor ? (rawAuthor.display_name || rawAuthor.name) : '',
        authorAvatar: rawAuthor?.avatar?.url || '',
        rating: Number(j.rating_average) || 0,
        likes: j.likes_count || 0,
        views: j.views_count || 0,
        date: j.created_at,
      };
    });

    const destination: Omit<Destination, 'relatedJournals'> & {
      relatedAttractions: any[];
      relatedVillages: any[];
      relatedItineraries: any[];
      relatedTourGuides: any[];
      relatedJournals: any[];
    } = {
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
      journalsCount: row.journals_count,
      marketProductsCount: row.market_products_count,
      ratingAverage: Number(row.rating_average),
      popularScore: row.popular_score,
      tags,
      media,
      relatedAttractions: mappedAttractions,
      relatedVillages: mappedVillages,
      relatedItineraries: mappedItineraries,
      relatedTourGuides: mappedGuides,
      relatedJournals: mappedJournals,
    };

    return { data: destination };
  });
