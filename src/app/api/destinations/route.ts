import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Destination } from '@/types/destination';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sort = searchParams.get('sort') || 'alpha';
    const search = (searchParams.get('search') || '').toLowerCase();
    const island = searchParams.get('island') || '';
    const province = searchParams.get('province') || '';
    const category = searchParams.get('category') || '';

    // Language resolution
    const langHeader = request.headers.get('accept-language') || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Query destinations
    const { data: dbData, error: destError } = await supabaseAdmin
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
        attractions_count,
        villages_count,
        itineraries_count,
        tour_guides_count,
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
      `);

    if (destError) {
      console.error('[api/destinations GET destinations]', destError.message);
      return NextResponse.json({ error: destError.message }, { status: 500 });
    }

    // 2. Query category assignments (for tags)
    const { data: assignmentsData, error: assignError } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        entity_id,
        category:categories (
          slug,
          name
        )
      `)
      .eq('entity_type', 'destination');

    if (assignError) {
      console.error('[api/destinations GET assignments]', assignError.message);
      return NextResponse.json({ error: assignError.message }, { status: 500 });
    }

    // 3. Query media
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
      .eq('entity_type', 'destination');

    if (mediaError) {
      console.error('[api/destinations GET media]', mediaError.message);
      return NextResponse.json({ error: mediaError.message }, { status: 500 });
    }

    // Process assignments into a lookup map
    const assignmentsMap: Record<string, { slug: string; name: string }[]> = {};
    (assignmentsData ?? []).forEach((row: any) => {
      const entityId = row.entity_id;
      const category = row.category;
      if (!category) return;
      const nameObj = category.name;
      let tagName = '';
      if (typeof nameObj === 'string') {
        tagName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        tagName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      if (tagName) {
        if (!assignmentsMap[entityId]) {
          assignmentsMap[entityId] = [];
        }
        assignmentsMap[entityId].push({
          slug: category.slug || '',
          name: tagName,
        });
      }
    });

    // Process media into a lookup map
    const mediaMap: Record<string, any[]> = {};
    (mediaData ?? []).forEach((m: any) => {
      const entityId = m.entity_id;
      if (!mediaMap[entityId]) {
        mediaMap[entityId] = [];
      }
      mediaMap[entityId].push({
        id: m.id,
        entityType: 'destination',
        entityId,
        type: m.type as 'image' | 'video',
        url: m.url,
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      });
    });

    // Map rows to Destination interfaces
    let destinations: Destination[] = (dbData ?? []).map((row: any) => {
      const tags = assignmentsMap[row.id] ?? [];
      const media = (mediaMap[row.id] ?? []).sort((a: any, b: any) => a.sortOrder - b.sortOrder);

      const rawProvince = Array.isArray(row.province) ? row.province[0] : row.province;
      const rawIsland = rawProvince
        ? (Array.isArray(rawProvince.island) ? rawProvince.island[0] : rawProvince.island)
        : null;

      return {
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
        marketProductsCount: row.market_products_count,
        ratingAverage: Number(row.rating_average),
        popularScore: row.popular_score,
        tags,
        media,
      };
    });

    // In-memory filters
    if (search) {
      destinations = destinations.filter((d) => d.name.toLowerCase().includes(search));
    }
    if (island) {
      destinations = destinations.filter((d) => d.province?.island?.name.toLowerCase() === island.toLowerCase());
    }
    if (province) {
      destinations = destinations.filter((d) => d.province?.name.toLowerCase() === province.toLowerCase());
    }
    if (category) {
      destinations = destinations.filter((d) => d.tags?.some((t) => t.slug.toLowerCase() === category.toLowerCase() || t.name.toLowerCase() === category.toLowerCase()));
    }

    // In-memory sort
    if (sort === 'alpha') {
      destinations.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'alpha-desc') {
      destinations.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'popular') {
      destinations.sort((a, b) => b.popularScore - a.popularScore);
    } else if (sort === 'content') {
      destinations.sort((a, b) => (b.attractionsCount + b.itinerariesCount) - (a.attractionsCount + a.itinerariesCount));
    }

    // Paginate
    const total = destinations.length;
    const start = (page - 1) * limit;
    const paged = destinations.slice(start, start + limit);

    return NextResponse.json({
      data: paged,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    console.error('[api/destinations GET catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
