import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { TourismVillage } from '@/types/village';

function parsePriceRange(range: string): [number, number] | null {
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
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
    const sort = query.sort || 'alpha';
    const search = (query.search || '').toLowerCase();
    const province = query.province || '';
    const adwi = query.adwi || '';
    const theme = query.theme || '';
    const activity = query.activity || '';
    const price = query.price || '';

    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // Base query
    let dbQuery = supabaseAdmin
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
        adwi_level_id,
        categories,
        activities,
        adwi_level:taxonomies!adwi_level_id (
          id,
          slug,
          name,
          type,
          metadata
        ),
        village_theme_id,
        village_theme:taxonomies!village_theme_id (
          id,
          slug,
          name,
          type,
          metadata
        ),
        rating_average,
        reviews_count,
        homestay_count,
        homestay_min_price,
        max_daily_visitor,
        signature,
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
      const provinceValues = province.split(',').map(p => p.trim()).filter(Boolean);
      if (provinceValues.length > 0) {
        dbQuery = dbQuery.in('destination.province.slug', provinceValues);
      }
    }

    // 3. ADWI Level Filter
    if (adwi) {
      const adwiValues = adwi.split(',').map(a => a.trim().toLowerCase()).filter(Boolean);
      if (adwiValues.length > 0) {
        const { data: adwiCats } = await supabaseAdmin
          .schema('directory')
          .from('taxonomies')
          .select('id')
          .eq('type', 'adwi_level')
          .in('slug', adwiValues);

        if (adwiCats && adwiCats.length > 0) {
          dbQuery = dbQuery.in('adwi_level_id', adwiCats.map(c => c.id));
        }
      }
    }

    // 4. Theme Filter
    if (theme) {
      const themeValues = theme.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      if (themeValues.length > 0) {
        const { data: themeCats } = await supabaseAdmin
          .schema('directory')
          .from('taxonomies')
          .select('id')
          .eq('type', 'village_theme')
          .in('slug', themeValues);

        if (themeCats && themeCats.length > 0) {
          dbQuery = dbQuery.in('village_theme_id', themeCats.map(c => c.id));
        }
      }
    }

    // 5. Activity Filter
    if (activity) {
      const activityValues = activity.split(',').map(a => a.trim()).filter(Boolean);
      if (activityValues.length > 0) {
        dbQuery = dbQuery.overlaps('activities', activityValues);
      }
    }

    // 6. Price Filter
    if (price) {
      const ranges = price.split(',').map(r => r.trim()).filter(Boolean);
      const conditions: string[] = [];
      ranges.forEach(r => {
        const range = parsePriceRange(r);
        if (range) {
          const [min, max] = range;
          if (max === Infinity) {
            conditions.push(`homestay_min_price.gte.${min}`);
          } else if (min === max) {
            conditions.push(`homestay_min_price.eq.${min}`);
          } else {
            conditions.push(`and(homestay_min_price.gte.${min},homestay_min_price.lte.${max})`);
          }
        }
      });
      if (conditions.length > 0) {
        dbQuery = dbQuery.or(conditions.join(','));
      }
    }

    // Sort order
    if (sort === 'popular') {
      dbQuery = dbQuery.order('reviews_count', { ascending: false });
    } else if (sort === 'rating-desc') {
      dbQuery = dbQuery.order('rating_average', { ascending: false });
    } else if (sort === 'price-asc') {
      dbQuery = dbQuery.order('homestay_min_price', { ascending: true });
    } else if (sort === 'price-desc') {
      dbQuery = dbQuery.order('homestay_min_price', { ascending: false });
    } else {
      dbQuery = dbQuery.order('name', { ascending: true });
    }

    // Pagination
    const offset = (page - 1) * limit;
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    const { data: dbData, error: dbError, count } = await dbQuery;

    if (dbError) {
      console.error('[api/tourism-villages GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    const total = count || 0;
    const villageIds = (dbData ?? []).map((row: any) => row.id);

    if (villageIds.length === 0) {
      return {
        data: [],
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }

    // Collect all unique category & activity slugs
    const allCatSlugs = new Set<string>();
    const allActSlugs = new Set<string>();
    (dbData ?? []).forEach((row: any) => {
      (row.categories ?? []).forEach((s: string) => allCatSlugs.add(s));
      (row.activities ?? []).forEach((s: string) => allActSlugs.add(s));
    });

    // Batch-fetch taxonomies for categories
    const { data: assignTaxData } = allCatSlugs.size
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', [...allCatSlugs])
      : { data: [] };
    const assignByName = new Map((assignTaxData ?? []).map((t: any) => [t.slug, t]));

    // Batch-fetch taxonomies for activities
    const { data: actTaxData } = allActSlugs.size
      ? await supabaseAdmin.schema('directory').from('taxonomies')
          .select('id, slug, name, type, metadata').in('slug', [...allActSlugs])
      : { data: [] };
    const actByName = new Map((actTaxData ?? []).map((t: any) => [t.slug, t]));

    // Fetch facilities assignments
    const { data: facilityData } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select(`
        entity_id,
        facility:facilities (
          id,
          slug,
          name
        )
      `)
      .eq('entity_type', 'village')
      .in('entity_id', villageIds);

    // Map helpers
    const categoriesMap: Record<string, any[]> = {};
    const activitiesMap: Record<string, any[]> = {};
    (dbData ?? []).forEach((row: any) => {
      categoriesMap[row.id] = (row.categories ?? []).map((s: string) => assignByName.get(s)).filter(Boolean);
      activitiesMap[row.id] = (row.activities ?? []).map((s: string) => actByName.get(s)).filter(Boolean);
    });

    const facilitiesMap: Record<string, any[]> = {};
    (facilityData ?? []).forEach((row: any) => {
      const entityId = row.entity_id;
      const fac = row.facility;
      if (!fac) return;
      facilitiesMap[entityId] = facilitiesMap[entityId] || [];
      facilitiesMap[entityId].push(fac);
    });

    // Map output data to frontend format
    const output = (dbData ?? []).map((row: any) => {
      const cats = categoriesMap[row.id] || [];
      const acts = activitiesMap[row.id] || [];
      const facs = facilitiesMap[row.id] || [];

      // Determine village theme from joined relation
      const themeCat = Array.isArray(row.village_theme) ? row.village_theme[0] : row.village_theme;
      const themeVal = themeCat?.slug || 'desa-wisata';
      let themeStr = 'Desa Wisata';
      if (themeCat) {
        const nameObj = themeCat.name;
        if (typeof nameObj === 'string') {
          themeStr = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          themeStr = nameObj[lang] || nameObj.id || nameObj.en || themeVal;
        }
      }

      // Activities compilation Ã¢â‚¬â€ from village_activities table
      const activities: { id: string; slug: string; name: string; type: string; metadata: Record<string, any> }[] = acts.map((c: any) => {
        const nameObj = c.name;
        let actName = '';
        if (typeof nameObj === 'string') {
          actName = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          actName = nameObj[lang] || nameObj.id || nameObj.en || '';
        }
        return {
          id: c.id,
          slug: c.slug,
          name: actName,
          type: c.type,
          metadata: c.metadata || {}
        };
      });
      if (activities.length === 0) {
        activities.push({ id: '', slug: 'homestay', name: 'Homestay', type: 'village_activity', metadata: {} });
      }

      const rawDestination = Array.isArray(row.destination)
        ? row.destination[0]
        : row.destination;

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
        } : undefined
      } : null;

      // Determine ADWI level from joined relation
      const adwiCat = Array.isArray(row.adwi_level) ? row.adwi_level[0] : row.adwi_level;
      const adwiVal = adwiCat?.slug || 'mandiri';
      let adwiCapitalized = 'Mandiri';
      if (adwiCat) {
        const nameObj = adwiCat.name;
        if (typeof nameObj === 'string') {
          adwiCapitalized = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          adwiCapitalized = nameObj[lang] || nameObj.id || nameObj.en || adwiVal;
        }
      }

      // Map categories
      const categories = cats.map((cat) => {
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
          metadata: cat.metadata || {}
        };
      });

      // Map facilities
      const facilities = facs.map((fac) => {
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
          metadata: fac.metadata || {}
        };
      });

      const description = row.description?.[lang] || row.description?.id || row.description?.en || '';

      return {
        id: row.slug,
        slug: row.slug,
        name: row.name,
        description,
        coverImage: {
          url: row.cover_image?.url || '',
          blurhash: row.cover_image?.blurhash || null,
          base64: row.cover_image?.base64 || null
        },
        destination: destinationMapped,
        adwiLevel: adwiCat ? {
          id: adwiCat.id,
          slug: adwiCat.slug,
          name: adwiCapitalized,
          metadata: adwiCat.metadata || {}
        } : null,
        villageTheme: themeCat ? {
          id: themeCat.id,
          slug: themeCat.slug,
          name: themeStr,
          metadata: themeCat.metadata || {}
        } : null,
        activities,
        homestayMinPrice: row.homestay_min_price,
        ratingAverage: Number(row.rating_average),
        reviewsCount: row.reviews_count,
        homestayCount: row.homestay_count,
        signature: row.signature,
        featured: row.featured,
        categories,
        facilities
      };
    });

    return {
      data: output,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  }, {
    query: t.Optional(t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      search: t.Optional(t.String()),
      province: t.Optional(t.String()),
      adwi: t.Optional(t.String()),
      theme: t.Optional(t.String()),
      activity: t.Optional(t.String()),
    }))
  });
