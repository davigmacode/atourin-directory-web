import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Attraction } from '@/types/attraction';

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

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || 'popularity';
    const search = (searchParams.get('search') || '').toLowerCase();
    const province = searchParams.get('province') || '';
    const category = searchParams.get('category') || '';
    const facilities = searchParams.get('facilities') || '';
    const priceRange = searchParams.get('priceRange') || '';
    const rating = searchParams.get('rating') || '';

    // Language resolution
    const langHeader = request.headers.get('accept-language') || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch attractions
    const { data: dbData, error: dbError } = await supabaseAdmin
      .schema('directory')
      .from('attractions')
      .select(`
        id,
        slug,
        name,
        destination_id,
        cover_image,
        description,
        price,
        rating_average,
        reviews_count,
        opening_hours,
        trekking,
        latitude,
        longitude,
        price_tiers,
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
      `);

    if (dbError) {
      console.error('[api/attractions GET]', dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Fetch category assignments
    const { data: assignmentsData, error: assignError } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        entity_id,
        category:categories (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'attraction');

    if (assignError) {
      console.error('[api/attractions GET assignments]', assignError.message);
      return NextResponse.json({ error: assignError.message }, { status: 500 });
    }

    // 3. Fetch facility assignments
    const { data: facilityData, error: facilityError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select(`
        entity_id,
        available,
        facility:facilities (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'attraction');

    if (facilityError) {
      console.error('[api/attractions GET facilities]', facilityError.message);
      return NextResponse.json({ error: facilityError.message }, { status: 500 });
    }

    // 4. Fetch media
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
      .eq('entity_type', 'attraction');

    if (mediaError) {
      console.error('[api/attractions GET media]', mediaError.message);
      return NextResponse.json({ error: mediaError.message }, { status: 500 });
    }

    // Process categories lookup map
    const categoriesMap: Record<string, any[]> = {};
    (assignmentsData ?? []).forEach((row: any) => {
      const entityId = row.entity_id;
      const cat = row.category;
      if (!cat) return;
      
      const nameObj = cat.name;
      let catName = '';
      if (typeof nameObj === 'string') {
        catName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }

      if (!categoriesMap[entityId]) {
        categoriesMap[entityId] = [];
      }
      categoriesMap[entityId].push({
        id: cat.id,
        slug: cat.slug,
        name: catName,
        metadata: cat.metadata || {},
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
        available: row.available,
      });
    });

    // Process media lookup map
    const mediaMap: Record<string, any[]> = {};
    (mediaData ?? []).forEach((m: any) => {
      const entityId = m.entity_id;
      if (!mediaMap[entityId]) {
        mediaMap[entityId] = [];
      }
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

    // Map database rows to Attraction interfaces
    let attractions: Attraction[] = (dbData ?? []).map((row: any) => {
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
        price: row.price,
        priceTiers: Array.isArray(row.price_tiers) ? row.price_tiers.map((t: any) => {
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
        latitude: row.latitude ? Number(row.latitude) : undefined,
        longitude: row.longitude ? Number(row.longitude) : undefined,
        categories: cats,
        facilities: facs,
        media,
      };
    });

    // In-memory filters
    if (search) {
      attractions = attractions.filter((a) => a.name.toLowerCase().includes(search));
    }
    if (province) {
      attractions = attractions.filter((a) =>
        a.destination?.province?.name.toLowerCase() === province.toLowerCase()
      );
    }
    if (category) {
      attractions = attractions.filter((a) =>
        a.categories?.some(
          (c) => c.slug.toLowerCase() === category.toLowerCase() || c.name.toLowerCase() === category.toLowerCase()
        )
      );
    }
    if (facilities) {
      const facSlugs = facilities.split(',').map((s) => s.trim().toLowerCase());
      attractions = attractions.filter((a) =>
        facSlugs.every((fs) =>
          a.facilities?.some((f) => f.slug.toLowerCase() === fs && f.available)
        )
      );
    }
    if (priceRange) {
      const range = parsePriceRange(priceRange);
      if (range) {
        attractions = attractions.filter((a) => a.price >= range[0] && a.price <= range[1]);
      }
    }
    if (rating) {
      const threshold = parseFloat(rating.replace(/[^\d.]/g, ''));
      if (!isNaN(threshold)) {
        attractions = attractions.filter((a) => a.ratingAverage >= threshold);
      }
    }

    // In-memory sort
    if (sort === 'popularity') {
      attractions.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sort === 'rating-desc') {
      attractions.sort((a, b) => b.ratingAverage - a.ratingAverage);
    } else if (sort === 'price-asc') {
      attractions.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      attractions.sort((a, b) => b.price - a.price);
    }

    // Paginate
    const total = attractions.length;
    const start = (page - 1) * limit;
    const paged = attractions.slice(start, start + limit);

    return NextResponse.json({
      data: paged,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    console.error('[api/attractions GET catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
