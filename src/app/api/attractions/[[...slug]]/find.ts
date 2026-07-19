import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Attraction } from '@/types/attraction';
import type { Taxonomy } from '@/types/taxonomy';

function parsePriceRange(range: string): [number, number] | null {
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
  if (r.toLowerCase() === 'gratis' || r.toLowerCase() === 'free') return [0, 0];
  if (r.startsWith('<')) {
    const maxMatch = r.match(/< Rp?(\d+)rb/i);
    if (maxMatch) {
      const max = parseInt(maxMatch[1]) * 1000;
      return [0, max];
    }
  }
  if (r.startsWith('>')) {
    const minMatch = r.match(/> Rp?(\d+)rb/i);
    if (minMatch) {
      const min = parseInt(minMatch[1]) * 1000;
      return [min, Infinity];
    }
  }
  const parts = r.match(/Rp?(\d+)rb\s*-\s*Rp?(\d+)rb/i);
  if (parts) {
    return [parseInt(parts[1]) * 1000, parseInt(parts[2]) * 1000];
  }
  return null;
}

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const sort = query.sort || 'popularity';
    const search = (query.search || '').toLowerCase();
    const province = query.province || '';
    const category = query.category || '';
    const facilities = query.facilities || '';
    const priceRange = query.priceRange || '';
    const rating = query.rating || '';

    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // Build base query on directory.attractions
    let dbQuery = supabaseAdmin
      .schema('directory')
      .from('attractions')
      .select(`
        id,
        slug,
        name,
        categories,
        destination_id,
        cover_image,
        description,
        min_price,
        rating_average,
        reviews_count,
        opening_hours,
        trekking,
        location_address,
        location_accessibility,
        location_directions,
        location_latitude,
        location_longitude,
        destination:destinations!inner (
          id,
          name,
          slug,
          province:provinces!inner (
            id,
            name,
            slug,
            island:islands (
              id,
              name
            )
          )
        )
      `, { count: 'exact' });

    // 1. Text Search Filter (name)
    if (search) {
      dbQuery = dbQuery.ilike('name', `%${search}%`);
    }

    // 2. Province Filter
    if (province) {
      dbQuery = dbQuery.ilike('destination.province.name', province);
    }

    // 3. Rating Filter
    if (rating) {
      const threshold = parseFloat(rating.replace(/[^\d.]/g, ''));
      if (!isNaN(threshold)) {
        dbQuery = dbQuery.gte('rating_average', threshold);
      }
    }

    // 4. Price Range Filter
    if (priceRange) {
      const range = parsePriceRange(priceRange);
      if (range) {
        const [min, max] = range;
        if (max === Infinity) {
          dbQuery = dbQuery.gte('min_price', min);
        } else if (min === max) {
          dbQuery = dbQuery.eq('min_price', min);
        } else {
          dbQuery = dbQuery.gte('min_price', min).lte('min_price', max);
        }
      }
    }

    // 5. Category Filter — GIN containment on text[] categories column
    if (category) {
      dbQuery = dbQuery.contains('categories', [category]);
    }

    // 6. Facilities Filter
    if (facilities) {
      const facSlugs = facilities.split(',').map((s) => s.trim().toLowerCase());
      const { data: facsData } = await supabaseAdmin
        .schema('directory')
        .from('facilities')
        .select('id')
        .in('slug', facSlugs);

      if (!facsData || facsData.length < facSlugs.length) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const targetFacIds = facsData.map((f) => f.id);
      const { data: assData } = await supabaseAdmin
        .schema('directory')
        .from('facility_assignments')
        .select('entity_id, facility_id')
        .eq('entity_type', 'attraction')
        .in('facility_id', targetFacIds);

      if (!assData || assData.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const counts: Record<string, number> = {};
      assData.forEach((row) => {
        counts[row.entity_id] = (counts[row.entity_id] || 0) + 1;
      });

      const matchedAttractionIds = Object.keys(counts).filter(
        (entityId) => counts[entityId] === targetFacIds.length
      );

      if (matchedAttractionIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', matchedAttractionIds);
    }

    // 7. Sort Order
    if (sort === 'popularity') {
      dbQuery = dbQuery.order('reviews_count', { ascending: false });
    } else if (sort === 'rating-desc') {
      dbQuery = dbQuery.order('rating_average', { ascending: false });
    } else if (sort === 'price-asc') {
      dbQuery = dbQuery.order('min_price', { ascending: true });
    } else if (sort === 'price-desc') {
      dbQuery = dbQuery.order('min_price', { ascending: false });
    } else {
      dbQuery = dbQuery.order('name', { ascending: true });
    }

    // 8. Pagination Range
    const offset = (page - 1) * limit;
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    // 9. Execute query
    const { data: dbData, error: dbError, count } = await dbQuery;

    if (dbError) {
      console.error('[api/attractions GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    const total = count || 0;
    const attractionIds = (dbData ?? []).map((row: any) => row.id);

    // Early exit if no attractions in this page
    if (attractionIds.length === 0) {
      return {
        data: [],
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }

    // 10. Get categories from column + lookup taxonomy metadata
    const catSlugsByAttr: Record<string, string[]> = {};
    (dbData ?? []).forEach((row: any) => {
      catSlugsByAttr[row.id] = row.categories ?? [];
    });

    const allCatSlugs = [...new Set(Object.values(catSlugsByAttr).flat())];
    const { data: catTaxa } = allCatSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', allCatSlugs).eq('type', 'category')
      : { data: [] };
    const catBySlug = new Map((catTaxa ?? []).map((t: any) => [t.slug, t]));

    // 11. Fetch facility assignments for paged attractions
    const { data: facilityData, error: facilityError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select(`
        entity_id,
        facility:facilities (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'attraction')
      .in('entity_id', attractionIds);

    if (facilityError) {
      console.error('[api/attractions GET facilities]', facilityError.message);
      set.status = 500;
      return { error: facilityError.message };
    }

    // 12. Fetch media for paged attractions
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
      .eq('entity_type', 'attraction')
      .in('entity_id', attractionIds);

    if (mediaError) {
      console.error('[api/attractions GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    // 13. Fetch price tiers for paged attractions
    let priceTiersData: any[] = [];
    const { data: ptData, error: ptError } = await supabaseAdmin
      .schema('directory')
      .from('price_tiers')
      .select('entity_id, name, price')
      .eq('entity_type', 'attraction')
      .in('entity_id', attractionIds)
      .order('price', { ascending: true });

    if (ptError) {
      console.error('[api/attractions GET price tiers]', ptError.message);
      set.status = 500;
      return { error: ptError.message };
    }
    priceTiersData = ptData ?? [];

    // Process taxonomies lookup map from column
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

    // Process facilities lookup map
    const facilitiesMap: Record<string, any[]> = {};
    (facilityData ?? []).forEach((row: any) => {
      const entityId = row.entity_id;
      const fac = row.facility;
      if (!fac) return;

      const nameObj = fac.name;
      let facName = '';
      if (typeof nameObj === 'string') {
        facName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        facName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }

      if (!facilitiesMap[entityId]) {
        facilitiesMap[entityId] = [];
      }
      facilitiesMap[entityId].push({
        id: fac.id,
        slug: fac.slug,
        name: facName,
        metadata: fac.metadata || {},
        available: true,
      });
    });

    // Process media lookup map
    const mediaMap: Record<string, any[]> = {};
    (mediaData ?? []).forEach((m: any) => {
      const entityId = m.entity_id;
      mediaMap[entityId] = mediaMap[entityId] || [];
      mediaMap[entityId].push({
        id: m.id,
        entityType: 'attraction',
        entityId,
        type: m.type as 'image' | 'video',
        url: m.url,
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      });
    });

    // Process price tiers lookup map
    const priceTiersMap: Record<string, any[]> = {};
    priceTiersData.forEach((pt: any) => {
      const entityId = pt.entity_id;
      priceTiersMap[entityId] = priceTiersMap[entityId] || [];
      priceTiersMap[entityId].push({
        name: pt.name,
        price: pt.price
      });
    });

    // Map database rows to Attraction interfaces
    const attractions: Attraction[] = (dbData ?? []).map((row: any) => {
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
          coverImage: { url: '', blurhash: null, base64: null },
          popularityScore: 0,
          islandId: rawIsland?.id || '',
          island: rawIsland ? {
            id: rawIsland.id,
            slug: rawIsland.id,
            name: rawIsland.name,
            provincesCount: 0,
            coverImage: { url: '', blurhash: null, base64: null },
          } : undefined,
        } : undefined,
        coverImage: { url: '', blurhash: null, base64: null },
        descriptions: { id: '', en: '' },
        attractionsCount: 0,
        villagesCount: 0,
        itinerariesCount: 0,
        tourGuidesCount: 0,
        marketProductsCount: 0,
        ratingAverage: 0,
        popularScore: 0,
      } : undefined;

      const cats = categoriesMap[row.id] || [];
      const facs = facilitiesMap[row.id] || [];
      const media = (mediaMap[row.id] || []).sort((a, b) => a.sortOrder - b.sortOrder);

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        destinationId: row.destination_id,
        destination: destinationMapped,
        coverImage: {
          url: row.cover_image?.url ?? '',
          blurhash: row.cover_image?.blurhash ?? null,
          base64: row.cover_image?.base64 ?? null,
        },
        description: row.description?.[lang] || row.description?.id || row.description?.en || '',
        minPrice: row.min_price,
        priceTiers: (priceTiersMap[row.id] && priceTiersMap[row.id].length > 0) ? priceTiersMap[row.id].map((t: any) => {
          const nameObj = t.name;
          let tierName = '';
          if (typeof nameObj === 'string') {
            tierName = nameObj;
          } else if (nameObj && typeof nameObj === 'object') {
            tierName = nameObj[lang] || nameObj.id || nameObj.en || '';
          }
          return { name: tierName, price: Number(t.price) };
        }) : undefined,
        ratingAverage: Number(row.rating_average),
        reviewsCount: row.reviews_count,
        openingHours: {
          timezone: row.opening_hours?.timezone ?? "Asia/Jakarta",
          is24Hours: !!row.opening_hours?.is_24_hours,
          periods: row.opening_hours?.periods ?? {},
          note: row.opening_hours?.note,
        },
        trekking: row.trekking,
        location: {
          address: row.location_address?.[lang] || row.location_address?.id || row.location_address?.en || '',
          accessibility: row.location_accessibility?.[lang] || row.location_accessibility?.id || row.location_accessibility?.en || '',
          directions: Array.isArray(row.location_directions) ? row.location_directions.map((step: any) => {
            const titleObj = step.title;
            const detailObj = step.detail;
            let stepTitle = '';
            let stepDetail = '';
            if (typeof titleObj === 'string') {
              stepTitle = titleObj;
            } else if (titleObj && typeof titleObj === 'object') {
              stepTitle = titleObj[lang] || titleObj.id || titleObj.en || '';
            }
            if (typeof detailObj === 'string') {
              stepDetail = detailObj;
            } else if (detailObj && typeof detailObj === 'object') {
              stepDetail = detailObj[lang] || detailObj.id || detailObj.en || '';
            }
            return { title: stepTitle, detail: stepDetail };
          }) : undefined,
          latitude: row.location_latitude ? Number(row.location_latitude) : undefined,
          longitude: row.location_longitude ? Number(row.location_longitude) : undefined,
        },
        categories: cats,
        facilities: facs,
        media,
      };
    });

    return {
      data: attractions,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  }, {
    query: t.Optional(t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      search: t.Optional(t.String()),
      province: t.Optional(t.String()),
      category: t.Optional(t.String()),
      facilities: t.Optional(t.String()),
      priceRange: t.Optional(t.String()),
      rating: t.Optional(t.String()),
    }))
  });
