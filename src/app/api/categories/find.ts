import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Taxonomy } from '@/types/taxonomy';

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
      // Query taxonomies assigned to a specific entity
      const { data, error } = await supabaseAdmin
        .schema('directory')
        .from('taxonomy_assignments')
        .select(`
          taxonomy:taxonomies (
            id,
            slug,
            name,
            entity_types,
            metadata
          )
        `)
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);

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
          entity_types: cat.entity_types,
          metadata: cat.metadata || {},
        }));

      return { data: taxonomies };
    }

    if (entityType) {
      // Fetch only taxonomies that are expected for this entity type
      const { data, error } = await supabaseAdmin
        .schema('directory')
        .from('taxonomies')
        .select('id, slug, name, metadata, entity_types')
        .contains('entity_types', [entityType])
        .order('name->>id');

      if (error) {
        console.error('[api/categories GET by entity_type]', error.message);
        set.status = 500;
        return { error: error.message };
      }

      const taxonomies: Taxonomy[] = (data ?? []).map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: resolveName(row.name),
        entity_types: row.entity_types,
        metadata: row.metadata || {},
      }));

      return { data: taxonomies };
    }

    // Default: Query all taxonomies
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('taxonomies')
      .select('id, slug, name, metadata, entity_types')
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
      entity_types: row.entity_types,
      metadata: row.metadata || {},
    }));

    return { data: taxonomies };
  }, {
    query: t.Optional(t.Object({
      entity_type: t.Optional(t.String()),
      entity_id: t.Optional(t.String()),
    }))
  });
