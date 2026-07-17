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
        adwi_level:categories!adwi_level_id (
          id,
          slug,
          name,
          entity_types,
          metadata
        ),
        village_theme_id,
        village_theme:categories!village_theme_id (
          id,
          slug,
          name,
          entity_types,
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
      dbQuery = dbQuery.ilike('destination.province.name', province);
    }

    // 3. ADWI Level Filter
    if (adwi) {
      const adwiSlug = `adwi-${adwi.toLowerCase()}`;
      const { data: adwiCat } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .eq('slug', adwiSlug)
        .maybeSingle();

      if (!adwiCat) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.eq('adwi_level_id', adwiCat.id);
    }

    // 4. Theme Filter — resolved directly via village_theme_id FK
    if (theme) {
      const { data: themeCat } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.eq.tema-${theme.toLowerCase()},slug.ilike.${theme},name->id.ilike.${theme},name->en.ilike.${theme}`)
        .maybeSingle();

      if (!themeCat) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.eq('village_theme_id', themeCat.id);
    }

    // 5. Activity Filter
    if (activity) {
      const { data: catData } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.ilike.${activity},name->id.ilike.${activity},name->en.ilike.${activity}`);

      const { data: facData } = await supabaseAdmin
        .schema('directory')
        .from('facilities')
        .select('id')
        .or(`slug.ilike.${activity},name->id.ilike.${activity},name->en.ilike.${activity}`);

      const catIds = catData ? catData.map((c) => c.id) : [];
      const facIds = facData ? facData.map((f) => f.id) : [];

      let matchedVillageIds: string[] = [];

      if (catIds.length > 0) {
        const { data: assData } = await supabaseAdmin
          .schema('directory')
          .from('category_assignments')
          .select('entity_id')
          .eq('entity_type', 'village')
          .in('category_id', catIds);
        if (assData) {
          matchedVillageIds = matchedVillageIds.concat(assData.map((a) => a.entity_id));
        }
      }

      if (facIds.length > 0) {
        const { data: assData } = await supabaseAdmin
          .schema('directory')
          .from('facility_assignments')
          .select('entity_id')
          .eq('entity_type', 'village')
          .in('facility_id', facIds);
        if (assData) {
          matchedVillageIds = matchedVillageIds.concat(assData.map((a) => a.entity_id));
        }
      }

      if (matchedVillageIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', matchedVillageIds);
    }

    // 6. Price Filter
    if (price) {
      const range = parsePriceRange(price);
      if (range) {
        const [min, max] = range;
        if (max === Infinity) {
          dbQuery = dbQuery.gte('homestay_min_price', min);
        } else {
          dbQuery = dbQuery.gte('homestay_min_price', min).lte('homestay_min_price', max);
        }
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

    // Fetch categories assignments — include entity_types & metadata to resolve ADWI
    const { data: assignmentsData } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        entity_id,
        category:categories (
          id,
          slug,
          name,
          entity_types,
          metadata
        )
      `)
      .eq('entity_type', 'village')
      .in('entity_id', villageIds);

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
    (assignmentsData ?? []).forEach((row: any) => {
      const entityId = row.entity_id;
      const cat = row.category;
      if (!cat) return;
      categoriesMap[entityId] = categoriesMap[entityId] || [];
      categoriesMap[entityId].push(cat);
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
      const facs = facilitiesMap[row.id] || [];

      // Determine village theme from joined relation
      const themeCat = Array.isArray(row.village_theme) ? row.village_theme[0] : row.village_theme;
      const themeVal = themeCat?.slug?.replace('tema-', '') || 'desa-wisata';
      let themeStr = 'Desa Wisata';
      if (themeCat) {
        const nameObj = themeCat.name;
        if (typeof nameObj === 'string') {
          themeStr = nameObj;
        } else if (nameObj && typeof nameObj === 'object') {
          themeStr = nameObj[lang] || nameObj.id || nameObj.en || themeVal;
        }
      }

      // Activities compilation — resolve from category_assignments (entity_types contains 'village_activity')
      const activities: { id: string; slug: string; name: string; entity_types: string[]; metadata: Record<string, any> }[] = [];
      cats.forEach((c) => {
        if (Array.isArray(c.entity_types) && c.entity_types.includes('village_activity')) {
          const nameObj = c.name;
          let actName = '';
          if (typeof nameObj === 'string') {
            actName = nameObj;
          } else if (nameObj && typeof nameObj === 'object') {
            actName = nameObj[lang] || nameObj.id || nameObj.en || '';
          }
          if (actName) activities.push({
            id: c.id,
            slug: c.slug,
            name: actName,
            entity_types: c.entity_types,
            metadata: c.metadata || {}
          });
        }
      });
      if (activities.length === 0) {
        activities.push({ id: '', slug: 'homestay', name: 'Homestay', entity_types: ['village_activity'], metadata: {} });
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
          island: rawIsland ? {
            id: rawIsland.id,
            name: rawIsland.name
          } : undefined
        } : undefined
      } : null;

      // Determine ADWI level from joined relation
      const adwiCat = Array.isArray(row.adwi_level) ? row.adwi_level[0] : row.adwi_level;
      const adwiVal = adwiCat?.slug?.replace('adwi-', '') || 'mandiri';
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
        adwi_level: adwiCat ? {
          id: adwiCat.id,
          slug: adwiCat.slug,
          name: adwiCapitalized,
          metadata: adwiCat.metadata || {}
        } : null,
        village_theme: themeCat ? {
          id: themeCat.id,
          slug: themeCat.slug,
          name: themeStr,
          metadata: themeCat.metadata || {}
        } : null,
        activities,
        homestay_min_price: row.homestay_min_price,
        rating_average: Number(row.rating_average),
        reviews_count: row.reviews_count,
        homestay_count: row.homestay_count,
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
