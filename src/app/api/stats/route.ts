import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const island = searchParams.get('island') || '';
  const province = searchParams.get('province') || '';
  const destination = searchParams.get('destination') || '';
  const search = (searchParams.get('search') || searchParams.get('q') || '').trim();

  // 1. Resolve geographic constraints
  let provinceIds: string[] | null = null;
  let destinationIds: string[] | null = null;

  // Resolve Island (Multi choice)
  if (island) {
    const islandValues = island.split(',').map(i => i.trim()).filter(Boolean);
    if (islandValues.length > 0) {
      const orParts: string[] = [];
      islandValues.forEach(val => {
        orParts.push(`id.eq.${val}`, `name.ilike.%${val}%`);
      });
      const { data: islandRows } = await supabaseAdmin
        .schema('directory')
        .from('islands')
        .select('id')
        .or(orParts.join(','));

      const islandIds = (islandRows ?? []).map((r: any) => r.id);
      if (islandIds.length > 0) {
        const { data: provRows } = await supabaseAdmin
          .schema('directory')
          .from('provinces')
          .select('id')
          .in('island_id', islandIds);
        provinceIds = (provRows ?? []).map((r: any) => r.id);
      } else {
        return NextResponse.json({
          data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
        });
      }
    }
  }

  // Resolve Province (Multi choice)
  if (province) {
    const provinceValues = province.split(',').map(p => p.trim()).filter(Boolean);
    if (provinceValues.length > 0) {
      const orParts: string[] = [];
      provinceValues.forEach(val => {
        orParts.push(`slug.eq.${val}`, `name.ilike.%${val}%`);
      });
      const { data: provinceRows } = await supabaseAdmin
        .schema('directory')
        .from('provinces')
        .select('id')
        .or(orParts.join(','));

      const matchedProvIds = (provinceRows ?? []).map((r: any) => r.id);
      if (matchedProvIds.length > 0) {
        if (provinceIds !== null) {
          provinceIds = provinceIds.filter(id => matchedProvIds.includes(id));
        } else {
          provinceIds = matchedProvIds;
        }
      } else {
        return NextResponse.json({
          data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
        });
      }
    }
  }

  // Resolve specific Destination (Multi choice)
  if (destination) {
    const destValues = destination.split(',').map(d => d.trim()).filter(Boolean);
    if (destValues.length > 0) {
      const orParts: string[] = [];
      destValues.forEach(val => {
        const slug = val.toLowerCase().replace(/\s+/g, '-');
        orParts.push(`slug.eq.${slug}`, `name.ilike.%${val}%`);
      });
      const { data: destRows } = await supabaseAdmin
        .schema('directory')
        .from('destinations')
        .select('id, province_id')
        .or(orParts.join(','));

      const matchedDestIds = (destRows ?? []).map((r: any) => r.id);
      const matchedProvIds = [...new Set((destRows ?? []).map((r: any) => r.province_id))];

      if (matchedDestIds.length > 0) {
        if (destinationIds !== null) {
          destinationIds = destinationIds.filter(id => matchedDestIds.includes(id));
        } else {
          destinationIds = matchedDestIds;
        }
        if (provinceIds !== null) {
          provinceIds = provinceIds.filter(id => matchedProvIds.includes(id));
        } else {
          provinceIds = matchedProvIds;
        }
      } else {
        return NextResponse.json({
          data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
        });
      }
    }
  }

  // Guard: if resolved lists are empty, return all 0s directly
  if (provinceIds !== null && provinceIds.length === 0) {
    return NextResponse.json({
      data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
    });
  }
  if (destinationIds !== null && destinationIds.length === 0) {
    return NextResponse.json({
      data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
    });
  }

  // If destinationIds is still null but provinceIds is populated, get all destinations under those provinces
  if (destinationIds === null && provinceIds !== null) {
    const { data: destRows } = await supabaseAdmin
      .schema('directory')
      .from('destinations')
      .select('id')
      .in('province_id', provinceIds);
    destinationIds = (destRows ?? []).map((r: any) => r.id);
  }

  // 2. Build Parallel Count Queries
  let provQuery = supabaseAdmin
    .schema('directory')
    .from('provinces')
    .select('id', { count: 'exact', head: true });

  if (provinceIds !== null) {
    provQuery = provQuery.in('id', provinceIds);
  }
  if (search) {
    provQuery = provQuery.ilike('name', `%${search}%`);
  }

  let destQuery = supabaseAdmin
    .schema('directory')
    .from('destinations')
    .select('id', { count: 'exact', head: true });

  if (provinceIds !== null) {
    destQuery = destQuery.in('province_id', provinceIds);
  }
  if (destinationIds !== null) {
    destQuery = destQuery.in('id', destinationIds);
  }
  if (search) {
    destQuery = destQuery.or(`name.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
  }

  let attrQuery = supabaseAdmin
    .schema('directory')
    .from('attractions')
    .select('id', { count: 'exact', head: true });

  if (destinationIds !== null) {
    attrQuery = attrQuery.in('destination_id', destinationIds);
  }
  if (search) {
    attrQuery = attrQuery.or(`name.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
  }

  let villageQuery = supabaseAdmin
    .schema('directory')
    .from('tourism_villages')
    .select('id', { count: 'exact', head: true });

  if (destinationIds !== null) {
    villageQuery = villageQuery.in('destination_id', destinationIds);
  }
  if (search) {
    villageQuery = villageQuery.or(`name.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
  }

  let guideQuery = supabaseAdmin
    .schema('directory')
    .from('tour_guides')
    .select('id', { count: 'exact', head: true });

  if (destinationIds !== null) {
    guideQuery = guideQuery.in('destination_id', destinationIds);
  }
  if (search) {
    guideQuery = guideQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  let itinQuery = supabaseAdmin
    .schema('directory')
    .from('itineraries')
    .select('id', { count: 'exact', head: true })
    .eq('is_published', true);

  if (destinationIds !== null) {
    itinQuery = itinQuery.in('destination_id', destinationIds);
  }
  if (search) {
    itinQuery = itinQuery.or(`name->>'id'.ilike.%${search}%,name->>'en'.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
  }

  let journalQuery = supabaseAdmin
    .schema('directory')
    .from('journals')
    .select('id', { count: 'exact', head: true });

  if (destinationIds !== null) {
    journalQuery = journalQuery.in('destination_id', destinationIds);
  }
  if (search) {
    journalQuery = journalQuery.or(`title->>'id'.ilike.%${search}%,title->>'en'.ilike.%${search}%,description->>'id'.ilike.%${search}%,description->>'en'.ilike.%${search}%`);
  }

  // 3. Execute in parallel
  const [
    { count: countProvinces },
    { count: countDestinations },
    { count: countAttractions },
    { count: countVillages },
    { count: countGuides },
    { count: countItineraries },
    { count: countJournals }
  ] = await Promise.all([
    provQuery,
    destQuery,
    attrQuery,
    villageQuery,
    guideQuery,
    itinQuery,
    journalQuery
  ]);

  return NextResponse.json({
    data: {
      provinces: countProvinces ?? 0,
      destinations: countDestinations ?? 0,
      attractions: countAttractions ?? 0,
      villages: countVillages ?? 0,
      guides: countGuides ?? 0,
      itineraries: countItineraries ?? 0,
      journals: countJournals ?? 0
    }
  });
}
