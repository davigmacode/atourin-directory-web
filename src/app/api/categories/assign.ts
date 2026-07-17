import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';

export const assignController = new Elysia()
  .post('/', async ({ body, set }) => {
    const payload = body as { entity_type: string; entity_id: string; taxonomy_ids?: string[] };
    const { entity_type: entityType, entity_id: entityId, taxonomy_ids: taxonomyIds } = payload;

    // 1. Delete all existing taxonomy assignments for this entity
    const { error: deleteError } = await supabaseAdmin
      .schema('directory')
      .from('taxonomy_assignments')
      .delete()
      .eq('entity_type', entityType)
      .eq('entity_id', entityId);

    if (deleteError) {
      console.error('[api/categories POST delete]', deleteError.message);
      set.status = 500;
      return { error: deleteError.message };
    }

    // 2. Insert new taxonomy assignments if any are provided
    if (Array.isArray(taxonomyIds) && taxonomyIds.length > 0) {
      const records = taxonomyIds.map((taxId: string) => ({
        taxonomy_id: taxId,
        entity_type: entityType,
        entity_id: entityId,
      }));

      const { error: insertError } = await supabaseAdmin
        .schema('directory')
        .from('taxonomy_assignments')
        .insert(records);

      if (insertError) {
        console.error('[api/categories POST insert]', insertError.message);
        set.status = 500;
        return { error: insertError.message };
      }
    }

    return { success: true };
  }, {
    body: t.Object({
      entity_type: t.String(),
      entity_id: t.String(),
      taxonomy_ids: t.Optional(t.Array(t.String())),
    })
  });
