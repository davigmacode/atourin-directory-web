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
      // 1. Fetch all facilities that are expected for this entity type from the database
      const { data: allFacs, error: allFacsError } = await supabaseAdmin
        .schema('directory')
        .from('facilities')
        .select('id, slug, name, metadata, entity_types')
        .contains('entity_types', [entityType]);

      if (allFacsError) {
        console.error('[api/facilities GET allFacs]', allFacsError.message);
        return NextResponse.json({ error: allFacsError.message }, { status: 500 });
      }

      // 2. Fetch assignments for this specific entity
      const { data: assignments, error: assignmentsError } = await supabaseAdmin
        .schema('directory')
        .from('facility_assignments')
        .select('facility_id')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);

      if (assignmentsError) {
        console.error('[api/facilities GET assignments]', assignmentsError.message);
        return NextResponse.json({ error: assignmentsError.message }, { status: 500 });
      }

      // 3. Merge them: expected facilities are always returned, available = false by default unless assigned as available
      const facilities: FacilityAssignment[] = (allFacs ?? []).map((fac: any) => {
        const match = (assignments ?? []).find((a: any) => a.facility_id === fac.id);
        return {
          id: fac.id,
          slug: fac.slug,
          name: resolveName(fac.name),
          entity_types: fac.entity_types,
          metadata: fac.metadata || {},
          available: !!match,
        };
      });

      return NextResponse.json({ data: facilities });
    }

    if (entityType) {
      // Fetch only facilities that are expected for this entity type
      const { data, error } = await supabaseAdmin
        .schema('directory')
        .from('facilities')
        .select('id, slug, name, metadata, entity_types')
        .contains('entity_types', [entityType])
        .order('name->>id');

      if (error) {
        console.error('[api/facilities GET by entity_type]', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const facilities: Facility[] = (data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: resolveName(row.name),
        entity_types: row.entity_types,
        metadata: row.metadata || {},
      }));

      return NextResponse.json({ data: facilities });
    }

    // Default: Query all facilities
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('facilities')
      .select('id, slug, name, metadata, entity_types')
      .order('name->>id'); // Order by name text field in JSONB

    if (error) {
      console.error('[api/facilities GET all]', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const facilities: Facility[] = (data ?? []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: resolveName(row.name),
      entity_types: row.entity_types,
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
      const records = facilityAssignments.map((assignment: { facility_id: string }) => ({
        facility_id: assignment.facility_id,
        entity_type: entityType,
        entity_id: entityId,
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
