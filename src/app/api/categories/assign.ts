import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';

const TABLE_BY_TYPE: Record<string, { table: string; fkColumn: string }> = {
  category:            { table: 'attraction_categories',   fkColumn: 'attraction_id' },
  guide_specialism:    { table: 'tour_guide_specialism',       fkColumn: 'guide_id' },
  village_activity:    { table: 'tourism_village_activities',     fkColumn: 'tourism_village_id' },
};

export const assignController = new Elysia()
  .post('/', async ({ body, set }) => {
    const payload = body as {
      type: string;
      entity_id: string;
      taxonomy_ids?: string[];
    };
    const { type, entity_id: entityId, taxonomy_ids: taxonomyIds } = payload;

    const target = TABLE_BY_TYPE[type];
    if (!target) {
      set.status = 400;
      return { error: `Unsupported type: ${type}` };
    }

    // 1. Delete all existing assignments for this entity
    const { error: deleteError } = await supabaseAdmin
      .schema('directory')
      .from(target.table)
      .delete()
      .eq(target.fkColumn, entityId);

    if (deleteError) {
      console.error('[api/categories POST delete]', deleteError.message);
      set.status = 500;
      return { error: deleteError.message };
    }

    // 2. Insert new assignments if any are provided
    if (Array.isArray(taxonomyIds) && taxonomyIds.length > 0) {
      const records = taxonomyIds.map((taxId: string) => ({
        [target.fkColumn]: entityId,
        taxonomy_id: taxId,
      }));

      const { error: insertError } = await supabaseAdmin
        .schema('directory')
        .from(target.table)
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
      type: t.String(),
      entity_id: t.String(),
      taxonomy_ids: t.Optional(t.Array(t.String())),
    })
  });
