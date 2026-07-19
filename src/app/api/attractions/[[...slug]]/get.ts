import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Attraction } from '@/types/attraction';

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, headers, set }) => {
    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch attraction
    const { data: row, error: dbError } = await supabaseAdmin
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
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (dbError) {
      console.error('[api/attractions/[slug] GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Attraction not found' };
    }

    // 2. Fetch categories from taxonomy metadata
    const catSlugs = (row as any).categories ?? [];
    const { data: catTaxData } = catSlugs.length
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', catSlugs).eq('type', 'category')
      : { data: [] };
    const catBySlugG = new Map((catTaxData ?? []).map((t: any) => [t.slug, t]));

    // 3. Fetch all facilities that are expected for attractions from the database
    const { data: allFacs, error: allFacsError } = await supabaseAdmin
      .schema('directory')
      .from('facilities')
      .select('id, slug, name, metadata')
      .contains('entity_types', ['attraction']);

    if (allFacsError) {
      console.error('[api/attractions/[slug] GET expected facilities]', allFacsError.message);
      set.status = 500;
      return { error: allFacsError.message };
    }

    // Fetch facility assignments
    const { data: facilityAssignments, error: facilityError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select('facility_id')
      .eq('entity_type', 'attraction')
      .eq('entity_id', row.id);

    if (facilityError) {
      console.error('[api/attractions/[slug] GET facilities]', facilityError.message);
      set.status = 500;
      return { error: facilityError.message };
    }

    // 5. Fetch price tiers from polymorphic table
    const { data: priceTiersData, error: priceTiersError } = await supabaseAdmin
      .schema('directory')
      .from('price_tiers')
      .select('name, price')
      .eq('entity_type', 'attraction')
      .eq('entity_id', row.id)
      .order('price', { ascending: true });

    if (priceTiersError) {
      console.error('[api/attractions/[slug] GET price tiers]', priceTiersError.message);
      set.status = 500;
      return { error: priceTiersError.message };
    }

    // 4. Fetch media
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
      .eq('entity_type', 'attraction')
      .eq('entity_id', row.id);

    if (mediaError) {
      console.error('[api/attractions/[slug] GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    // Process taxonomies from column
    const categories = (catSlugs ?? []).map((s: string) => {
      const t = catBySlugG.get(s);
      if (!t) return null;
      const nameObj = t.name;
      let catName = '';
      if (typeof nameObj === 'string') catName = nameObj;
      else if (nameObj && typeof nameObj === 'object') catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      return { id: t.id, slug: t.slug, name: catName, type: t.type, metadata: t.metadata || {} };
    }).filter((c) => c !== null);

    // Process facilities
    const facilities = (allFacs ?? []).map((fac: any) => {
      const match = (facilityAssignments ?? []).find((fa: any) => fa.facility_id === fac.id);
      const nameObj = fac.name;
      let facName = '';
      if (typeof nameObj === 'string') {
        facName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        facName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return {
        id: fac.id,
        slug: fac.slug,
        name: facName,
        metadata: fac.metadata || {},
        available: !!match,
      };
    });

    // Process media
    const media = (mediaData ?? [])
      .map((m: any) => ({
        id: m.id,
        entityType: 'attraction',
        entityId: row.id,
        type: m.type as 'image' | 'video',
        url: m.url,
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const rowAny = row as any;

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
      description: '',
      attractionsCount: 0,
      villagesCount: 0,
      itinerariesCount: 0,
      tourGuidesCount: 0,
      journalsCount: 0,
      marketProductsCount: 0,
      ratingAverage: 0,
      popularScore: 0,
    } : undefined;

    const attraction: Attraction = {
      id: rowAny.id,
      slug: rowAny.slug,
      name: rowAny.name,
      destinationId: rowAny.destination_id,
      destination: destinationMapped,
      coverImage: {
        url: rowAny.cover_image?.url ?? '',
        blurhash: rowAny.cover_image?.blurhash ?? null,
        base64: rowAny.cover_image?.base64 ?? null,
      },
      description: rowAny.description?.[lang] || rowAny.description?.id || rowAny.description?.en || '',
      minPrice: rowAny.min_price,
      priceTiers: (priceTiersData && priceTiersData.length > 0) ? priceTiersData.map((t: any) => {
        const nameObj = t.name;
        let tierName = '';
        if (typeof nameObj === 'string') {
          tierName = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          tierName = nameObj[lang] || nameObj.id || nameObj.en || '';
        }
        return { name: tierName, price: Number(t.price) };
      }) : undefined,
      ratingAverage: Number(rowAny.rating_average),
      reviewsCount: rowAny.reviews_count,
      openingHours: {
        timezone: rowAny.opening_hours?.timezone ?? "Asia/Jakarta",
        is24Hours: !!rowAny.opening_hours?.is_24_hours,
        periods: rowAny.opening_hours?.periods ?? {},
        note: rowAny.opening_hours?.note,
      },
      trekking: rowAny.trekking,
      location: {
        address: rowAny.location_address?.[lang] || rowAny.location_address?.id || rowAny.location_address?.en || '',
        accessibility: rowAny.location_accessibility?.[lang] || rowAny.location_accessibility?.id || rowAny.location_accessibility?.en || '',
        directions: Array.isArray(rowAny.location_directions) ? rowAny.location_directions.map((step: any) => {
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
        latitude: rowAny.location_latitude ? Number(rowAny.location_latitude) : undefined,
        longitude: rowAny.location_longitude ? Number(rowAny.location_longitude) : undefined,
      },
      categories: categories as any[],
      facilities: facilities as any[],
      media,
    };

    return { data: attraction };
  });
