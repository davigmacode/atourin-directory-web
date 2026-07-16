import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { TourismVillage } from '@/types/village';

const THEME_MAP: Record<string, string> = {
  'budaya': 'Budaya & Adat',
  'alam': 'Alam & Ekowisata',
  'kerajinan': 'Kerajinan',
  'kuliner': 'Kuliner Lokal',
  'edukasi': 'Edukasi',
  'religi': 'Religi',
  'pertanian': 'Pertanian',
  'bahari': 'Bahari'
};

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, headers, set }) => {
    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch tourism village
    const { data: row, error: dbError } = await supabaseAdmin
      .schema('directory')
      .from('tourism_villages')
      .select(`
        id,
        slug,
        name,
        description,
        destination_id,
        cover_image,
        featured,
        adwi,
        rating_average,
        reviews_count,
        homestay_count,
        homestay_min_price,
        daily_quota,
        signature,
        location_address,
        location_accessibility,
        location_directions,
        location_latitude,
        location_longitude,
        destination:destinations (
          id,
          name,
          slug,
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
      console.error('[api/tourism-villages/[slug] GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Tourism village not found' };
    }

    // 2. Fetch category assignments
    const { data: assignmentsData, error: assignError } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        category:categories (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'village')
      .eq('entity_id', row.id);

    if (assignError) {
      console.error('[api/tourism-villages/[slug] GET assignments]', assignError.message);
      set.status = 500;
      return { error: assignError.message };
    }

    // 3. Fetch all facilities that are expected for villages from the database
    const { data: allFacs, error: allFacsError } = await supabaseAdmin
      .schema('directory')
      .from('facilities')
      .select('id, slug, name, metadata')
      .contains('entity_types', ['village']);

    if (allFacsError) {
      console.error('[api/tourism-villages/[slug] GET expected facilities]', allFacsError.message);
      set.status = 500;
      return { error: allFacsError.message };
    }

    // Fetch facility assignments
    const { data: facilityAssignments, error: facilityError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select('facility_id')
      .eq('entity_type', 'village')
      .eq('entity_id', row.id);

    if (facilityError) {
      console.error('[api/tourism-villages/[slug] GET facilities]', facilityError.message);
      set.status = 500;
      return { error: facilityError.message };
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
      .eq('entity_type', 'village')
      .eq('entity_id', row.id);

    if (mediaError) {
      console.error('[api/tourism-villages/[slug] GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    // Process categories
    const categories = (assignmentsData ?? []).map((ca: any) => {
      const cat = ca.category;
      if (!cat) return null;
      const nameObj = cat.name;
      let catName = '';
      if (typeof nameObj === 'string') {
        catName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return {
        id: cat.id,
        slug: cat.slug,
        name: catName,
        metadata: cat.metadata || {},
      };
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
        entityType: 'village',
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
      descriptions: { id: '', en: '' },
      attractionsCount: 0,
      villagesCount: 0,
      itinerariesCount: 0,
      tourGuidesCount: 0,
      marketProductsCount: 0,
      ratingAverage: 0,
      popularScore: 0,
    } : undefined;

    // Compile ADWI capitalized and colors
    const adwiVal = row.adwi || 'mandiri';
    const adwiCapitalized = adwiVal.charAt(0).toUpperCase() + adwiVal.slice(1);
    const adwiBgMap: Record<string, string> = {
      rintisan: 'rgba(196,73,73,0.14)',
      berkembang: 'rgba(31,111,176,0.14)',
      maju: 'rgba(81,176,84,0.16)',
      mandiri: 'rgba(180,122,0,0.16)'
    };
    const adwiFgMap: Record<string, string> = {
      rintisan: '#C44949',
      berkembang: '#1F6FB0',
      maju: '#2D8838',
      mandiri: '#B47A00'
    };

    // Determine theme
    const themeCat = categories.find((c) => THEME_MAP[c.slug]);
    const themeStr = themeCat ? THEME_MAP[themeCat.slug] : 'Desa Wisata';

    // Activities compilation
    const activities: string[] = [];
    categories.forEach((c) => {
      if (c.slug === 'budaya' && !activities.includes('Tarian')) activities.push('Tarian');
      if (c.slug === 'kuliner' && !activities.includes('Kuliner')) activities.push('Kuliner');
      if (c.slug === 'petualangan' && !activities.includes('Trekking')) activities.push('Trekking');
      if (c.slug === 'bahari' && !activities.includes('Snorkel')) activities.push('Snorkel');
    });
    facilities.forEach((f) => {
      if (f.available && f.slug === 'homestay' && !activities.includes('Homestay')) activities.push('Homestay');
      if (f.available && f.slug === 'pemandu-lokal' && !activities.includes('Workshop')) activities.push('Workshop');
    });
    if (activities.length === 0) {
      activities.push('Homestay');
    }

    const village = {
      id: rowAny.slug,
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
      featured: rowAny.featured,
      adwi: adwiCapitalized,
      adwiBg: adwiBgMap[adwiVal] || adwiBgMap.mandiri,
      adwiFg: adwiFgMap[adwiVal] || adwiFgMap.mandiri,
      rating: Number(rowAny.rating_average),
      reviewsCount: rowAny.reviews_count,
      families: rowAny.homestay_count,
      price: rowAny.homestay_min_price,
      dailyQuota: rowAny.daily_quota,
      signature: rowAny.signature,
      theme: themeStr,
      activities: activities.length > 0 ? activities : ['Homestay'],
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
      categories,
      facilities,
      media,
      // For compatibility with detail page breadcrumbs
      region: rawDestination ? `${rawDestination.name}, ${rawProvince?.name || ''}` : '',
    };

    return { data: village };
  });
