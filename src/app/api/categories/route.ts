import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Category } from '@/types/category';

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
      // Query categories assigned to a specific entity
      const { data, error } = await supabaseAdmin
        .schema('directory')
        .from('category_assignments')
        .select(`
          category:categories (
            id,
            slug,
            name,
            metadata
          )
        `)
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);

      if (error) {
        console.error('[api/categories GET polymorphic]', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const categories = (data ?? [])
        .map((row: any) => row.category)
        .filter((cat): cat is any => !!cat)
        .map((cat: any) => ({
          id: cat.id,
          slug: cat.slug,
          name: resolveName(cat.name),
          metadata: cat.metadata || {},
        }));

      return NextResponse.json({ data: categories });
    }

    // Default: Query all categories
    const { data, error } = await supabaseAdmin
      .schema('directory')
      .from('categories')
      .select('id, slug, name, metadata')
      .order('name->>id'); // Order by name text field in JSONB

    if (error) {
      console.error('[api/categories GET all]', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const categories: Category[] = (data ?? []).map((row: any) => ({
      id: row.id,
      slug: row.slug,
      name: resolveName(row.name),
      metadata: row.metadata || {},
    }));

    return NextResponse.json({ data: categories });
  } catch (err: any) {
    console.error('[api/categories GET catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { entity_type: entityType, entity_id: entityId, category_ids: categoryIds } = body;

    if (!entityType || !entityId) {
      return NextResponse.json(
        { error: 'Missing entity_type or entity_id in request body' },
        { status: 400 }
      );
    }

    // 1. Delete all existing category assignments for this entity
    const { error: deleteError } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .delete()
      .eq('entity_type', entityType)
      .eq('entity_id', entityId);

    if (deleteError) {
      console.error('[api/categories POST delete]', deleteError.message);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // 2. Insert new category assignments if any are provided
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      const records = categoryIds.map((catId: string) => ({
        category_id: catId,
        entity_type: entityType,
        entity_id: entityId,
      }));

      const { error: insertError } = await supabaseAdmin
        .schema('directory')
        .from('category_assignments')
        .insert(records);

      if (insertError) {
        console.error('[api/categories POST insert]', insertError.message);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[api/categories POST catch]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
