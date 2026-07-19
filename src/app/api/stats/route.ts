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

  // Resolve Island
  if (island) {
    const { data: islandRow } = await supabaseAdmin
      .schema('directory')
      .from('islands')
      .select('id')
      .or(`id.eq.${island},name.ilike.%${island}%`)
      .maybeSingle();

    if (islandRow) {
      const { data: provRows } = await supabaseAdmin
        .schema('directory')
        .from('provinces')
        .select('id')
        .eq('island_id', islandRow.id);

      provinceIds = (provRows ?? []).map((r: any) => r.id);
    } else {
      return NextResponse.json({
        data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
      });
    }
  }

  // Resolve Province
  if (province) {
    const { data: provinceRow } = await supabaseAdmin
      .schema('directory')
      .from('provinces')
      .select('id')
      .or(`slug.eq.${province},name.ilike.%${province}%`)
      .maybeSingle();

    if (provinceRow) {
      const pId = provinceRow.id;
      if (provinceIds !== null && !provinceIds.includes(pId)) {
        return NextResponse.json({
          data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
        });
      }
      provinceIds = [pId];
    } else {
      return NextResponse.json({
        data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
      });
    }
  }

  // Resolve Destinations under resolved Provinces
  if (provinceIds !== null) {
    const { data: destRows } = await supabaseAdmin
      .schema('directory')
      .from('destinations')
      .select('id')
      .in('province_id', provinceIds);
    destinationIds = (destRows ?? []).map((r: any) => r.id);
  }

  // Resolve specific Destination
  if (destination) {
    const { data: destRow } = await supabaseAdmin
      .schema('directory')
      .from('destinations')
      .select('id, province_id')
      .or(`slug.eq.${destination},name.ilike.%${destination}%`)
      .maybeSingle();

    if (destRow) {
      const dId = destRow.id;
      if (destinationIds !== null && !destinationIds.includes(dId)) {
        return NextResponse.json({
          data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
        });
      }
      destinationIds = [dId];
      provinceIds = [destRow.province_id];
    } else {
      return NextResponse.json({
        data: { provinces: 0, destinations: 0, attractions: 0, villages: 0, guides: 0, itineraries: 0, journals: 0 }
      });
    }
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
