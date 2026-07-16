import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Facility, FacilityAssignment } from '@/types/facility';

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const entityType = query.entity_type;
    const entityId = query.entity_id;

    const langHeader = headers['accept-language'] || 'id';
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
        set.status = 500;
        return { error: allFacsError.message };
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
        set.status = 500;
        return { error: assignmentsError.message };
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

      return { data: facilities };
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
        set.status = 500;
        return { error: error.message };
      }

      const facilities: Facility[] = (data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: resolveName(row.name),
        entity_types: row.entity_types,
        metadata: row.metadata || {},
      }));

      return { data: facilities };
    }

    // Default: Query all facilities
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('facilities')
      .select('id, slug, name, metadata, entity_types')
      .order('name->>id'); // Order by name text field in JSONB

    if (error) {
      console.error('[api/facilities GET all]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const facilities: Facility[] = (data ?? []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: resolveName(row.name),
      entity_types: row.entity_types,
      metadata: row.metadata || {},
    }));

    return { data: facilities };
  }, {
    query: t.Optional(t.Object({
      entity_type: t.Optional(t.String()),
      entity_id: t.Optional(t.String()),
    }))
  });
