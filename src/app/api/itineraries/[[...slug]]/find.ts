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
      kategori,
      duration,
      durasi,
      budget,
      difficulty,
      author,
      language,
      audience,
      tipe_perjalanan,
      month,
      startDate,
    } = query as Record<string, string | undefined>;

    const pageNum  = Math.max(1, parseInt(page || '1'));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit || String(PER_PAGE))));
    const offset   = (pageNum - 1) * limitNum;

    const categoryValue = kategori || category;
    const targetAudienceValue = tipe_perjalanan || audience;
    const durationValue = durasi || duration;

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

    function slugify(text: string): string {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    function parseDuration(value: string): [number, number] | null {
      const val = value.trim();
      if (val === '1 Hari' || val === '1') return [1, 1];
      if (val === '2D1N' || val === '2') return [2, 2];
      if (val === '3D2N' || val === '3') return [3, 3];
      if (val === '4D3N' || val === '4') return [4, 4];
      if (val === '5D4N' || val === '5') return [5, 5];
      if (val === '6D+' || val === '6+') return [6, 9999];
      if (val === '2-3') return [2, 3];
      if (val === '4-7') return [4, 7];
      if (val === '7+') return [8, 9999];
      return null;
    }

    function parseBudget(value: string): [number, number] | null {
      const val = value.trim().replace(/\s+/g, '');
      if (val === '<Rp500rb' || val === '<500rb') return [0, 500000];
      if (val === '<Rp1jt' || val === '<1jt') return [0, 1000000];
      if (val.includes('Rp1jt') && val.includes('Rp3jt') || val === '1-3jt') return [1000000, 3000000];
      if (val.includes('Rp3jt') && val.includes('Rp6jt') || val === '3-6jt') return [3000000, 6000000];
      if (val === 'Rp6jt+' || val === '>6jt') return [6000001, 999999999];
      if (val === '500-2jt') return [500000, 2000000];
      if (val === '>2jt') return [2000001, 999999999];
      return null;
    }

    // destination (slug)
    if (destination) {
      const destSlugs = destination.split(',').map(s => slugify(s.trim())).filter(Boolean);
      if (destSlugs.length > 0) {
        const { data: dests } = await supabaseAdmin
          .schema('directory')
          .from('destinations')
          .select('id')
          .in('slug', destSlugs);
        if (dests && dests.length > 0) {
          const destIds = dests.map(d => d.id);
          q = q.in('destination_id', destIds);
        } else {
          return { data: [], pagination: { page: pageNum, limit: limitNum, total: 0, totalPages: 0 } };
        }
      }
    }

    // Array containment / overlaps filters
    if (language) q = q.contains('languages', [language]);
    if (categoryValue) {
      const catListOriginal = categoryValue.split(',').map(c => c.trim()).filter(Boolean);
      const catListLower = categoryValue.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
      const combinedList = [...new Set([...catListOriginal, ...catListLower])];
      q = q.overlaps('categories', combinedList);
    }
    if (theme) {
      const themeList = theme.split(',').map(t => t.trim()).filter(Boolean);
      if (themeList.length > 0) {
        q = q.overlaps('highlights', themeList);
      }
    }
    if (targetAudienceValue) {
      const audListOriginal = targetAudienceValue.split(',').map(a => a.trim()).filter(Boolean);
      const audListLower = targetAudienceValue.split(',').map(a => a.trim().toLowerCase()).filter(Boolean);
      const combinedList = [...new Set([...audListOriginal, ...audListLower])];
      q = q.overlaps('target_audience', combinedList);
    }

    // difficulty
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      q = q.eq('difficulty', difficulty);
    }

    // duration_days range (multiple choice with OR)
    if (durationValue) {
      const durList = durationValue.split(',').map(d => d.trim()).filter(Boolean);
      const orConditions: string[] = [];
      durList.forEach(dur => {
        const range = parseDuration(dur);
        if (range) {
          orConditions.push(`and(duration_days.gte.${range[0]},duration_days.lte.${range[1]})`);
        }
      });
      if (orConditions.length > 0) {
        q = q.or(orConditions.join(','));
      }
    }

    // budget_estimation range (multiple choice with OR)
    if (budget) {
      const budList = budget.split(',').map(b => b.trim()).filter(Boolean);
      const orConditions: string[] = [];
      budList.forEach(bud => {
        const range = parseBudget(bud);
        if (range) {
          orConditions.push(`and(budget_estimation.gte.${range[0]},budget_estimation.lte.${range[1]})`);
        }
      });
      if (orConditions.length > 0) {
        q = q.or(orConditions.join(','));
      }
    }

    // month
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
