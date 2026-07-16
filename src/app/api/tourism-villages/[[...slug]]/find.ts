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

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const sort = query.sort || 'alpha';
    const search = (query.search || '').toLowerCase();
    const provinsi = query.provinsi || query.province || '';
    const adwi_kategori = query.adwi_kategori || query.adwi || '';
    const tema = query.tema || query.theme || '';
    const aktivitas = query.aktivitas || query.activity || '';
    const harga = query.harga || query.price || '';

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
    if (provinsi) {
      dbQuery = dbQuery.ilike('destination.province.name', provinsi);
    }

    // 3. ADWI Filter
    if (adwi_kategori) {
      const adwiLower = adwi_kategori.toLowerCase();
      dbQuery = dbQuery.eq('adwi', adwiLower);
    }

    // 4. Price Filter
    if (harga) {
      const range = parsePriceRange(harga);
      if (range) {
        const [min, max] = range;
        if (max === Infinity) {
          dbQuery = dbQuery.gte('homestay_min_price', min);
        } else {
          dbQuery = dbQuery.gte('homestay_min_price', min).lte('homestay_min_price', max);
        }
      }
    }

    // 5. Tema (Category) Filter
    if (tema) {
      // Find category matching tema
      const { data: catData } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.ilike.${tema},name->>id.ilike.${tema},name->>en.ilike.${tema}`);

      const catIds = catData ? catData.map((c) => c.id) : [];
      if (catIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const { data: assData } = await supabaseAdmin
        .schema('directory')
        .from('category_assignments')
        .select('entity_id')
        .eq('entity_type', 'village')
        .in('category_id', catIds);

      const villageIds = assData ? assData.map((a) => a.entity_id) : [];
      if (villageIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', villageIds);
    }

    // 6. Aktivitas (Category or Facility) Filter
    if (aktivitas) {
      // Find matching categories or facilities
      const { data: catData } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.ilike.${aktivitas},name->>id.ilike.${aktivitas},name->>en.ilike.${aktivitas}`);

      const { data: facData } = await supabaseAdmin
        .schema('directory')
        .from('facilities')
        .select('id')
        .or(`slug.ilike.${aktivitas},name->>id.ilike.${aktivitas},name->>en.ilike.${aktivitas}`);

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

    // Sort order
    if (sort === 'Paling populer' || sort === 'popular') {
      dbQuery = dbQuery.order('reviews_count', { ascending: false });
    } else if (sort === 'Rating tertinggi' || sort === 'rating-desc') {
      dbQuery = dbQuery.order('rating_average', { ascending: false });
    } else if (sort === 'Harga terendah' || sort === 'price-asc') {
      dbQuery = dbQuery.order('homestay_min_price', { ascending: true });
    } else if (sort === 'Harga tertinggi' || sort === 'price-desc') {
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

    // Fetch categories assignments
    const { data: assignmentsData } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        entity_id,
        category:categories (
          id,
          slug,
          name
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

      // Determine main theme
      const themeCat = cats.find((c) => THEME_MAP[c.slug]);
      const themeStr = themeCat ? THEME_MAP[themeCat.slug] : 'Desa Wisata';

      // Activities compilation
      const activities: string[] = [];
      cats.forEach((c) => {
        if (c.slug === 'budaya' && !activities.includes('Tarian')) activities.push('Tarian');
        if (c.slug === 'kuliner' && !activities.includes('Kuliner')) activities.push('Kuliner');
        if (c.slug === 'petualangan' && !activities.includes('Trekking')) activities.push('Trekking');
        if (c.slug === 'bahari' && !activities.includes('Snorkel')) activities.push('Snorkel');
      });
      facs.forEach((f) => {
        if (f.slug === 'homestay' && !activities.includes('Homestay')) activities.push('Homestay');
        if (f.slug === 'pemandu-lokal' && !activities.includes('Workshop')) activities.push('Workshop');
      });
      if (activities.length === 0) {
        activities.push('Homestay');
      }

      const rawProvince = Array.isArray(row.destination?.province)
        ? row.destination.province[0]
        : row.destination?.province;

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

      return {
        id: row.slug,
        slug: row.slug,
        img: row.cover_image?.url || '',
        name: row.name,
        region: row.destination ? `${row.destination.name}, ${rawProvince?.name || ''}` : '',
        adwi: adwiCapitalized,
        adwiBg: adwiBgMap[adwiVal] || adwiBgMap.mandiri,
        adwiFg: adwiFgMap[adwiVal] || adwiFgMap.mandiri,
        theme: themeStr,
        activities: activities.length > 0 ? activities : ['Homestay'],
        price: row.homestay_min_price,
        rating: Number(row.rating_average),
        families: row.homestay_count,
        signature: row.signature,
        featured: row.featured
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
      provinsi: t.Optional(t.String()),
      province: t.Optional(t.String()),
      adwi_kategori: t.Optional(t.String()),
      adwi: t.Optional(t.String()),
      tema: t.Optional(t.String()),
      theme: t.Optional(t.String()),
      aktivitas: t.Optional(t.String()),
      activity: t.Optional(t.String()),
      harga: t.Optional(t.String()),
      price: t.Optional(t.String())
    }))
  });
