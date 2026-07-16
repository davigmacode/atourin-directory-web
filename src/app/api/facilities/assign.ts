import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';

export const assignController = new Elysia()
  .post('/', async ({ body, set }) => {
    const payload = body as { entity_type: string; entity_id: string; facility_assignments?: { facility_id: string }[] };
    const { entity_type: entityType, entity_id: entityId, facility_assignments: facilityAssignments } = payload;

    // 1. Delete all existing facility assignments for this entity
    const { error: deleteError } = await supabaseAdmin
      .schema('directory')
      .from('facility_assignments')
      .delete()
      .eq('entity_type', entityType)
      .eq('entity_id', entityId);

    if (deleteError) {
      console.error('[api/facilities POST delete]', deleteError.message);
      set.status = 500;
      return { error: deleteError.message };
    }

    // 2. Insert new facility assignments if any are provided
    if (Array.isArray(facilityAssignments) && facilityAssignments.length > 0) {
      const records = facilityAssignments.map((assignment) => ({
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
        set.status = 500;
        return { error: insertError.message };
      }
    }

    return { success: true };
  }, {
    body: t.Object({
      entity_type: t.String(),
      entity_id: t.String(),
      facility_assignments: t.Optional(t.Array(t.Object({
        facility_id: t.String()
      }))),
    })
  });
