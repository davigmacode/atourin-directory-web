import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Attraction } from '@/types/attraction';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params;
    
    // Language resolution
    const langHeader = request.headers.get('accept-language') || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch attraction
    const { data: row, error: dbError } = await supabaseAdmin
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
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (dbError) {
      console.error('[api/attractions/[slug] GET]', dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    if (!row) {
      return NextResponse.json({ error: 'Attraction not found' }, { status: 404 });
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
      .eq('entity_type', 'attraction')
      .eq('entity_id', row.id);

    if (assignError) {
      console.error('[api/attractions/[slug] GET assignments]', assignError.message);
      return NextResponse.json({ error: assignError.message }, { status: 500 });
    }

    // 3. Fetch facility assignments
    const { data: facilityData, error: facilityError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .select(`
        available,
        facility:facilities (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'attraction')
      .eq('entity_id', row.id);

    if (facilityError) {
      console.error('[api/attractions/[slug] GET facilities]', facilityError.message);
      return NextResponse.json({ error: facilityError.message }, { status: 500 });
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
      return NextResponse.json({ error: mediaError.message }, { status: 500 });
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
    const facilities = (facilityData ?? []).map((fa: any) => {
      const fac = fa.facility;
      if (!fac) return null;
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
        available: fa.available,
      };
    }).filter((f) => f !== null);

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
      descriptions: { id: '', en: '' },
      attractionsCount: 0,
      villagesCount: 0,
      itinerariesCount: 0,
      tourGuidesCount: 0,
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
      price: rowAny.price,
      priceTiers: Array.isArray(rowAny.price_tiers) ? rowAny.price_tiers.map((t: any) => {
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
      latitude: rowAny.latitude ? Number(rowAny.latitude) : undefined,
      longitude: rowAny.longitude ? Number(rowAny.longitude) : undefined,
      categories: categories as any[],
      facilities: facilities as any[],
      media,
    };

    return NextResponse.json({ data: attraction });
  } catch (err: any) {
    console.error('[api/attractions/[slug] GET catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
