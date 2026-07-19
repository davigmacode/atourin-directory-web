import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { Itinerary, ItineraryFilters } from '@/types/itinerary';

const PER_PAGE = 12;

function parseDuration(value: string): [number, number] | null {
  if (value === '1')   return [1, 1];
  if (value === '2-3') return [2, 3];
  if (value === '4-7') return [4, 7];
  if (value === '7+')  return [8, 9999];
  return null;
}

function parseBudget(value: string): [number, number] | null {
  if (value === '<500rb')  return [0, 500_000];
  if (value === '500-2jt') return [500_000, 2_000_000];
  if (value === '>2jt')    return [2_000_001, 999_999_999];
  return null;
}

export const findController = new Elysia()
  .get('/', async ({ query, set }) => {
    const {
      page = '1',
      limit = String(PER_PAGE),
      sort = 'popular',
      destination,
      theme,
      category,
      duration,
      budget,
      difficulty,
      author,
      language,
      audience,
      month,
      startDate,
    } = query as Record<string, string | undefined>;

    const pageNum  = Math.max(1, parseInt(page || '1'));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit || String(PER_PAGE))));
    const offset   = (pageNum - 1) * limitNum;

    let q = supabaseAdmin
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
        languages,
        categories,
        highlights,
        target_audience,
        is_featured,
        destination:destinations ( id, slug, name ),
        author:creators ( id, slug, name, display_name, avatar, is_verified )
      `, { count: 'exact' })
      .eq('is_published', true);

    // destination (slug)
    if (destination) {
      const { data: dest } = await supabaseAdmin
        .schema('directory')
        .from('destinations')
        .select('id')
        .eq('slug', destination)
        .maybeSingle();
      if (dest) q = q.eq('destination_id', dest.id);
      else return { data: [], pagination: { page: pageNum, limit: limitNum, total: 0, totalPages: 0 } };
    }

    // Array containment filters (gin-indexed)
    if (language)  q = q.contains('languages', [language]);
    if (category)  q = q.contains('categories', [category]);
    if (theme)     q = q.contains('highlights', [theme]);
    if (audience)  q = q.contains('target_audience', [audience]);

    // difficulty
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      q = q.eq('difficulty', difficulty);
    }

    // duration_days range
    if (duration) {
      const range = parseDuration(duration);
      if (range) q = q.gte('duration_days', range[0]).lte('duration_days', range[1]);
    }

    // budget_estimation range
    if (budget) {
      const range = parseBudget(budget);
      if (range) q = q.gte('budget_estimation', range[0]).lte('budget_estimation', range[1]);
    }

    // month — best_time_weather @> '{"<month>":"ideal"}'
    if (month) {
      const monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
      const monthIdx = parseInt(month) - 1;
      const monthKey = monthNames[monthIdx];
      if (monthKey) q = q.contains('best_time_weather', { [monthKey]: 'ideal' });
    }

    // author — filter via creators.slug
    if (author) {
      const { data: creatorRow } = await supabaseAdmin
        .schema('directory')
        .from('creators')
        .select('id')
        .eq('slug', author)
        .maybeSingle();
      if (creatorRow) q = q.eq('author_id', creatorRow.id);
      else return { data: [], pagination: { page: pageNum, limit: limitNum, total: 0, totalPages: 0 } };
    }

    // startDate — only itineraries that have a schedule on or after this date
    if (startDate) {
      const { data: schedRows } = await supabaseAdmin
        .schema('directory')
        .from('itinerary_schedules')
        .select('itinerary_id')
        .gte('start_date', startDate);
      if (schedRows?.length) {
        const ids = [...new Set(schedRows.map((r: any) => r.itinerary_id))];
        q = q.in('id', ids);
      } else {
        return { data: [], pagination: { page: pageNum, limit: limitNum, total: 0, totalPages: 0 } };
      }
    }

    // Sort
    switch (sort) {
      case 'rating': q = q.order('rating_average', { ascending: false }); break;
      case 'newest': q = q.order('created_at', { ascending: false }); break;
      case 'budget': q = q.order('budget_estimation', { ascending: true }); break;
      default:       q = q.order('views_count', { ascending: false }); break;
    }

    q = q.range(offset, offset + limitNum - 1);

    const { data: rows, error, count } = await q;

    if (error) {
      console.error('[api/itineraries GET list]', error.message);
      set.status = 500;
      return { error: error.message };
    }

    const total      = count ?? 0;
    const totalPages = Math.ceil(total / limitNum);

    const data = (rows ?? []).map((row: any) => {
      const rawAuthor = Array.isArray(row.author) ? row.author[0] : row.author;
      const rawDest   = Array.isArray(row.destination) ? row.destination[0] : row.destination;
      return {
        id:              row.id,
        slug:            row.slug,
        name:            row.name,
        description:     row.description,
        coverImage:      row.cover_image ?? { url: '', blurhash: null },
        ratingAverage:   Number(row.rating_average),
        reviewsCount:    row.reviews_count,
        viewsCount:      row.views_count,
        savesCount:      row.saves_count,
        durationDays:    row.duration_days,
        durationNights:  row.duration_nights,
        minPax:          row.min_pax,
        maxPax:          row.max_pax,
        difficulty:      row.difficulty,
        budgetEstimation:row.budget_estimation,
        languages:       row.languages ?? [],
        categories:      row.categories ?? [],
        highlights:      row.highlights ?? [],
        targetAudience:  row.target_audience ?? [],
        isFeatured:      row.is_featured,
        destination: rawDest
          ? { id: rawDest.id, slug: rawDest.slug, name: rawDest.name }
          : { id: '', slug: '', name: '' },
        author: rawAuthor
          ? {
              id:          rawAuthor.id,
              slug:        rawAuthor.slug,
              name:        rawAuthor.name,
              displayName: rawAuthor.display_name ?? null,
              avatar:      rawAuthor.avatar ?? { url: '', blurhash: null },
              isVerified:  rawAuthor.is_verified,
            }
          : null,
      };
    });

    return { data, pagination: { page: pageNum, limit: limitNum, total, totalPages } };
  });
