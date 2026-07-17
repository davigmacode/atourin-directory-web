import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Taxonomy } from '@/types/taxonomy';

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const type = query.type;
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

    if (type && entityId) {
      // Query taxonomies assigned to a specific entity via every per-type table.
      const t = type as string;
      let tableName: string | null = null;
      if (t === 'category') tableName = 'attraction_categories';
      else if (t === 'guide_specialism') tableName = 'guide_categories';
      else if (t === 'village_activity') tableName = 'village_activities';
      else tableName = `${t}s`;

      // For type=adwi_level / village_theme, the assignment is via direct FK
      // columns on tourism_villages — handled in tourism-villages get/find.
      if (tableName) {
        const { data, error } = await supabaseAdmin
          .schema('directory')
          .from(tableName)
          .select(`
            taxonomy:taxonomies (
              id,
              slug,
              name,
              type,
              metadata
            )
          `)
          .eq(tableName === 'attraction_categories' ? 'attraction_id' :
              tableName === 'destination_categories' ? 'destination_id' :
              tableName === 'village_categories' ? 'village_id' :
              tableName === 'village_activities' ? 'village_id' :
              tableName === 'itinerary_categories' ? 'itinerary_id' :
              'guide_id', entityId);

        if (error) {
          console.error('[api/categories GET polymorphic]', error.message);
          set.status = 500;
          return { error: error.message };
        }

        const taxonomies = (data ?? [])
          .map((row: any) => row.taxonomy)
          .filter((cat): cat is any => !!cat)
          .map((cat: any) => ({
            id: cat.id,
            slug: cat.slug,
            name: resolveName(cat.name),
            type: cat.type,
            metadata: cat.metadata || {},
          }));

        return { data: taxonomies };
      }
    }

    if (type) {
      const { data, error } = await supabaseAdmin
        .schema('directory')
        .from('taxonomies')
        .select('id, slug, name, metadata, type')
        .eq('type', type)
        .order('name->>id');

      if (error) {
        console.error('[api/categories GET by type]', error.message);
        set.status = 500;
        return { error: error.message };
      }

      const taxonomies: Taxonomy[] = (data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: resolveName(row.name),
        type: row.type,
        metadata: row.metadata || {},
      }));

      return { data: taxonomies };
    }

    // Default: Query all taxonomies
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('taxonomies')
      .select('id, slug, name, metadata, type')
      .order('name->>id');

    if (error) {
      console.error('[api/categories GET all]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const taxonomies: Taxonomy[] = (data ?? []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: resolveName(row.name),
      type: row.type,
      metadata: row.metadata || {},
    }));

    return { data: taxonomies };
  }, {
    query: t.Optional(t.Object({
      type: t.Optional(t.String()),
      entity_id: t.Optional(t.String()),
    }))
  });
