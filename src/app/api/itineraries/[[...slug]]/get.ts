import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Itinerary } from '@/types/itinerary';

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, set }) => {

    // ── 1. Fetch itinerary core ─────────────────────────────
    const { data: row, error: mainError } = await supabaseAdmin
      .schema('directory')
      .from('itineraries')
      .select(`
        id,
        slug,
        name,
        description,
        cover_image,
        rating_average,
        reviews_count,
        views_count,
        saves_count,
        duration_days,
        duration_nights,
        min_pax,
        max_pax,
        difficulty,
        budget_estimation,
        budget_breakdown,
        target_audience,
        best_time_weather,
        best_time_crowd,
        best_time_note,
        is_featured,
        is_published,
        created_at,
        updated_at,
        destination:destinations ( id, slug, name ),
        author:creators ( id, slug, name, display_name, avatar, bio, is_verified )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (mainError) {
      console.error('[api/itineraries/[slug] GET]', mainError.message);
      set.status = 500;
      return { error: mainError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Itinerary not found' };
    }

    // ── 2. Increment views_count (fire-and-forget) ──────────
    supabaseAdmin
      .schema('directory')
      .from('itineraries')
      .update({ views_count: (row as any).views_count + 1 })
      .eq('id', (row as any).id)
      .then(() => {/* intentionally ignored */});

    // ── 3. Fetch creator badges ─────────────────────────────
    const authorRow = Array.isArray((row as any).author)
      ? (row as any).author[0]
      : (row as any).author;

    const { data: badgeData } = await supabaseAdmin
      .schema('directory')
      .from('creator_badges')
      .select(`
        issued_at,
        valid_until,
        taxonomy:taxonomies ( id, slug, name, metadata )
      `)
      .eq('creator_id', authorRow?.id ?? '');

    // ── 4. Fetch categories ─────────────────────────────────
    const { data: categoryData, error: catError } = await supabaseAdmin
      .schema('directory')
      .from('itinerary_categories')
      .select(`
        sort_order,
        taxonomy:taxonomies ( id, slug, name, metadata )
      `)
      .eq('itinerary_id', (row as any).id)
      .order('sort_order', { ascending: true });

    if (catError) {
      console.error('[api/itineraries/[slug] GET categories]', catError.message);
      set.status = 500;
      return { error: catError.message };
    }

    // ── 5. Fetch highlights ─────────────────────────────────
    const { data: highlightData, error: hlError } = await supabaseAdmin
      .schema('directory')
      .from('itinerary_highlights')
      .select(`
        description,
        sort_order,
        taxonomy:taxonomies ( id, slug, name, metadata )
      `)
      .eq('itinerary_id', (row as any).id)
      .order('sort_order', { ascending: true });

    if (hlError) {
      console.error('[api/itineraries/[slug] GET highlights]', hlError.message);
      set.status = 500;
      return { error: hlError.message };
    }

    // ── 6. Fetch languages ──────────────────────────────────
    const { data: languageData, error: langError } = await supabaseAdmin
      .schema('directory')
      .from('itinerary_languages')
      .select(`
        taxonomy:taxonomies ( id, slug, name, metadata )
      `)
      .eq('itinerary_id', (row as any).id);

    if (langError) {
      console.error('[api/itineraries/[slug] GET languages]', langError.message);
      set.status = 500;
      return { error: langError.message };
    }

    // ── 7. Fetch daily plans ────────────────────────────────
    const { data: dailyData, error: dailyError } = await supabaseAdmin
      .schema('directory')
      .from('itinerary_daily')
      .select(`
        id,
        day_number,
        title,
        summary_stops,
        summary_hours,
        summary_km,
        summary_price
      `)
      .eq('itinerary_id', (row as any).id)
      .order('day_number', { ascending: true });

    if (dailyError) {
      console.error('[api/itineraries/[slug] GET daily]', dailyError.message);
      set.status = 500;
      return { error: dailyError.message };
    }

    const dailyIds = (dailyData ?? []).map((d: any) => d.id);

    // ── 8. Fetch stops for all days ─────────────────────────
    const { data: stopsData, error: stopsError } = dailyIds.length
      ? await supabaseAdmin
          .schema('directory')
          .from('itinerary_daily_stops')
          .select('id, itinerary_daily_id, name, sort_order, lat, lng, type')
          .in('itinerary_daily_id', dailyIds)
          .order('sort_order', { ascending: true })
      : { data: [], error: null };

    if (stopsError) {
      console.error('[api/itineraries/[slug] GET stops]', stopsError.message);
      set.status = 500;
      return { error: stopsError.message };
    }

    // ── 9. Fetch timelines for all days ────────────────────
    const { data: timelineData, error: tlError } = dailyIds.length
      ? await supabaseAdmin
          .schema('directory')
          .from('itinerary_daily_timelines')
          .select(`
            id,
            itinerary_daily_id,
            time,
            duration_minutes,
            title,
            stop_id,
            description,
            includes,
            travel_info,
            sort_order
          `)
          .in('itinerary_daily_id', dailyIds)
          .order('sort_order', { ascending: true })
      : { data: [], error: null };

    if (tlError) {
      console.error('[api/itineraries/[slug] GET timelines]', tlError.message);
      set.status = 500;
      return { error: tlError.message };
    }

    // ── 10. Fetch schedules ─────────────────────────────────
    const { data: scheduleData, error: schedError } = await supabaseAdmin
      .schema('directory')
      .from('itinerary_schedules')
      .select('id, start_date, custom_title')
      .eq('itinerary_id', (row as any).id)
      .gte('start_date', new Date().toISOString().slice(0, 10))
      .order('start_date', { ascending: true });

    if (schedError) {
      console.error('[api/itineraries/[slug] GET schedules]', schedError.message);
      set.status = 500;
      return { error: schedError.message };
    }

    // ── Shape response ──────────────────────────────────────

    // Build stop lookup by id
    const stopById = new Map<string, any>();
    (stopsData ?? []).forEach((s: any) => stopById.set(s.id, s));

    // Group stops and timelines by daily_id
    const stopsByDay  = new Map<string, any[]>();
    const timesByDay  = new Map<string, any[]>();

    (stopsData ?? []).forEach((s: any) => {
      if (!stopsByDay.has(s.itinerary_daily_id)) stopsByDay.set(s.itinerary_daily_id, []);
      stopsByDay.get(s.itinerary_daily_id)!.push(s);
    });

    (timelineData ?? []).forEach((t: any) => {
      if (!timesByDay.has(t.itinerary_daily_id)) timesByDay.set(t.itinerary_daily_id, []);
      timesByDay.get(t.itinerary_daily_id)!.push(t);
    });

    const days = (dailyData ?? []).map((d: any) => ({
      id:            d.id,
      dayNumber:     d.day_number,
      title:         d.title,
      summaryStops:  d.summary_stops,
      summaryHours:  d.summary_hours,
      summaryKm:     d.summary_km,
      summaryPrice:  d.summary_price,
      stops: (stopsByDay.get(d.id) ?? []).map((s: any) => ({
        id:        s.id,
        name:      s.name,
        sortOrder: s.sort_order,
        lat:       s.lat != null ? Number(s.lat) : null,
        lng:       s.lng != null ? Number(s.lng) : null,
        type:      s.type,
      })),
      timeline: (timesByDay.get(d.id) ?? []).map((t: any) => ({
        id:              t.id,
        time:            t.time,
        durationMinutes: t.duration_minutes,
        title:           t.title,
        stopId:          t.stop_id,
        stop:            t.stop_id ? (() => {
          const s = stopById.get(t.stop_id);
          return s ? { id: s.id, name: s.name, sortOrder: s.sort_order, lat: s.lat != null ? Number(s.lat) : null, lng: s.lng != null ? Number(s.lng) : null, type: s.type } : null;
        })() : null,
        description:     t.description,
        includes:        t.includes ?? [],
        travelInfo:      t.travel_info ?? null,
        sortOrder:       t.sort_order,
      })),
    }));

    const badges = (badgeData ?? []).map((b: any) => {
      const tax = Array.isArray(b.taxonomy) ? b.taxonomy[0] : b.taxonomy;
      return tax ? {
        id:         tax.id,
        slug:       tax.slug,
        name:       tax.name,
        icon:       tax.metadata?.icon ?? '',
        issuedAt:   b.issued_at ?? null,
        validUntil: b.valid_until ?? null,
      } : null;
    }).filter(Boolean);

    const categories = (categoryData ?? []).map((c: any) => {
      const tax = Array.isArray(c.taxonomy) ? c.taxonomy[0] : c.taxonomy;
      return tax ? {
        id:        tax.id,
        slug:      tax.slug,
        name:      tax.name,
        icon:      tax.metadata?.icon ?? null,
        sortOrder: c.sort_order,
      } : null;
    }).filter(Boolean);

    const highlights = (highlightData ?? []).map((h: any) => {
      const tax = Array.isArray(h.taxonomy) ? h.taxonomy[0] : h.taxonomy;
      return tax ? {
        id:          tax.id,
        slug:        tax.slug,
        name:        tax.name,
        icon:        tax.metadata?.icon ?? '',
        description: h.description,
        sortOrder:   h.sort_order,
      } : null;
    }).filter(Boolean);

    const languages = (languageData ?? []).map((l: any) => {
      const tax = Array.isArray(l.taxonomy) ? l.taxonomy[0] : l.taxonomy;
      return tax ? {
        id:   tax.id,
        slug: tax.slug,
        name: tax.name,
        code: tax.metadata?.code ?? null,
        icon: tax.metadata?.icon ?? null,
      } : null;
    }).filter(Boolean);

    const schedules = (scheduleData ?? []).map((s: any) => ({
      id:          s.id,
      startDate:   s.start_date,
      customTitle: s.custom_title ?? null,
    }));

    const rawDest = Array.isArray((row as any).destination)
      ? (row as any).destination[0]
      : (row as any).destination;

    const itinerary: Itinerary = {
      id:               (row as any).id,
      slug:             (row as any).slug,
      name:             (row as any).name,
      description:      (row as any).description,
      coverImage:       (row as any).cover_image ?? { url: '', blurhash: null },
      ratingAverage:    Number((row as any).rating_average),
      reviewsCount:     (row as any).reviews_count,
      viewsCount:       (row as any).views_count,
      savesCount:       (row as any).saves_count,
      durationDays:     (row as any).duration_days,
      durationNights:   (row as any).duration_nights,
      minPax:           (row as any).min_pax,
      maxPax:           (row as any).max_pax,
      difficulty:       (row as any).difficulty ?? null,
      budgetEstimation: (row as any).budget_estimation ?? null,
      budgetBreakdown:  (row as any).budget_breakdown ?? [],
      targetAudience:   (row as any).target_audience ?? [],
      bestTimeWeather:  (row as any).best_time_weather ?? {},
      bestTimeCrowd:    (row as any).best_time_crowd ?? {},
      bestTimeNote:     (row as any).best_time_note ?? null,
      isFeatured:       (row as any).is_featured,
      isPublished:      (row as any).is_published,
      createdAt:        (row as any).created_at,
      updatedAt:        (row as any).updated_at,
      destination: rawDest
        ? { id: rawDest.id, slug: rawDest.slug, name: rawDest.name }
        : { id: '', slug: '', name: '' },
      author: authorRow
        ? {
            id:          authorRow.id,
            userId:      null,
            slug:        authorRow.slug,
            name:        authorRow.name,
            displayName: authorRow.display_name ?? null,
            avatar:      authorRow.avatar ?? { url: '', blurhash: null },
            bio:         authorRow.bio ?? { id: '', en: '' },
            isVerified:  authorRow.is_verified,
            badges,
          }
        : { id: '', userId: null, slug: '', name: '', displayName: null, avatar: { url: '', blurhash: null }, bio: { id: '', en: '' }, isVerified: false, badges: [] },
      categories,
      highlights,
      languages,
      days,
      schedules,
    };

    return { data: itinerary };
  });
