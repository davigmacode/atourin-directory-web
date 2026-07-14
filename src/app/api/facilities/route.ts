import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Facility, FacilityAssignment } from '@/types/facility';

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entity_type');
    const entityId = searchParams.get('entity_id');

    const langHeader = request.headers.get('accept-language') || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    const resolveName = (nameObj: any): string => {
      if (typeof nameObj === 'string') return nameObj;
      if (nameObj && typeof nameObj === 'object') {
        return nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return '';
    };

    if (entityType && entityId) {
      // Query facilities assigned to a specific entity
      const { data, error } = await supabaseAdmin
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
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);

      if (error) {
        console.error('[api/facilities GET polymorphic]', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const facilities: FacilityAssignment[] = (data ?? [])
        .map((row: any) => {
          if (!row.facility) return null;
          return {
            id: row.facility.id,
            slug: row.facility.slug,
            name: resolveName(row.facility.name),
            metadata: row.facility.metadata || {},
            available: row.available,
          };
        })
        .filter((fac): fac is FacilityAssignment => !!fac);

      return NextResponse.json({ data: facilities });
    }

    // Default: Query all facilities
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('facilities')
      .select('id, slug, name, metadata')
      .order('name->>id'); // Order by name text field in JSONB

    if (error) {
      console.error('[api/facilities GET all]', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const facilities: Facility[] = (data ?? []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: resolveName(row.name),
      metadata: row.metadata || {},
    }));

    return NextResponse.json({ data: facilities });
  } catch (err: any) {
    console.error('[api/facilities GET catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { entity_type: entityType, entity_id: entityId, facility_assignments: facilityAssignments } = body;

    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: 'Missing entity_type or entity_id in request body' },
        { status: 400 }
      );
    }

    // 1. Delete all existing facility assignments for this entity
    const { error: deleteError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .delete()
      .eq('entity_type', entityType)
      .eq('entity_id', entityId);

    if (deleteError) {
      console.error('[api/facilities POST delete]', deleteError.message);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // 2. Insert new facility assignments if any are provided
    if (Array.isArray(facilityAssignments) && facilityAssignments.length > 0) {
      const records = facilityAssignments.map((assignment: { facility_id: string; available?: boolean }) => ({
        facility_id: assignment.facility_id,
        entity_type: entityType,
        entity_id: entityId,
        available: assignment.available ?? true,
      }));

      const { error: insertError } = await supabaseAdmin
        .schema('directory')
        .from('facility_assignments')
        .insert(records);

      if (insertError) {
        console.error('[api/facilities POST insert]', insertError.message);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[api/facilities POST catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
