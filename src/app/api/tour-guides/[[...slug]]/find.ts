import { Elysia, t } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { TourGuide } from '@/types/tour-guide';

function parsePriceRange(range: string): [number, number] | null {
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
  const parseValue = (s: string): number | null => {
    const m = s.match(/Rp?(\d+)([a-zA-Z]+)?/);
    if (!m) return null;
    const raw = parseInt(m[1]);
    const unit = (m[2] || 'rb').toLowerCase();
    const mul = unit === 'jt' ? 1000000 : 1000;
    return raw * mul;
  };
  if (r.startsWith('<')) {
    const max = parseValue(r.replace(/^[<>]\s*/, ''));
    if (max !== null) return [0, max];
  }
  if (r.startsWith('>')) {
    const min = parseValue(r.replace(/^[<>]\s*/, ''));
    if (min !== null) return [min, Infinity];
  }
  const parts = r.split(/\s*-\s*/);
  if (parts.length === 2) {
    const min = parseValue(parts[0]);
    const max = parseValue(parts[1]);
    if (min !== null && max !== null) return [min, max];
  }
  return null;
}

export const findController = new Elysia()
  .get('/', async ({ query, headers, set }) => {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const sort = query.sort || 'popularity';
    const search = (query.search || '').toLowerCase();
    const province = query.province || '';
    const destination = query.destination || '';
    const specialism = query.specialism || '';
    const language = query.language || '';
    const certification = query.certification || '';
    const priceRange = query.price || '';
    const verified = query.verified || '';

    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // Base query on directory.tour_guides
    let dbQuery = supabaseAdmin
      .schema('directory')
      .from('tour_guides')
      .select(`
        id,
        slug,
        name,
        description,
        destination_id,
        avatar,
        cover_image,
        verified,
        rating_average,
        reviews_count,
        trips_count,
        year_experience,
        daily_rate,
        destination:destinations!inner (
          id,
          name,
          slug,
          province:provinces!inner (
            id,
            name,
            slug
          )
        )
      `, { count: 'exact' });

    // 1. Text Search
    if (search) {
      dbQuery = dbQuery.ilike('name', `%${search}%`);
    }

    // 2. Province filter
    if (province) {
      dbQuery = dbQuery.ilike('destination.province.name', province);
    }

    // 3. Destination slug filter
    if (destination) {
      dbQuery = dbQuery.eq('destination.slug', destination);
    }

    // 4. Verified filter
    if (verified === 'true') {
      dbQuery = dbQuery.eq('verified', true);
    }

    // 5. Price filter
    if (priceRange) {
      const range = parsePriceRange(priceRange);
      if (range) {
        const [min, max] = range;
        if (max === Infinity) {
          dbQuery = dbQuery.gte('daily_rate', min);
        } else if (min === max) {
          dbQuery = dbQuery.eq('daily_rate', min);
        } else {
          dbQuery = dbQuery.gte('daily_rate', min).lte('daily_rate', max);
        }
      }
    }

    // 6. Specialism filter — via category_assignments (entity_type='guide')
    if (specialism) {
      const { data: specCats } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.ilike.${specialism},name->>id.ilike.${specialism},name->>en.ilike.${specialism}`);

      const targetCategoryIds = specCats ? specCats.map((c) => c.id) : [];
      if (targetCategoryIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const { data: assData } = await supabaseAdmin
        .schema('directory')
        .from('category_assignments')
        .select('entity_id')
        .eq('entity_type', 'guide')
        .in('category_id', targetCategoryIds);

      const matchedIds = assData ? Array.from(new Set(assData.map((a) => a.entity_id))) : [];
      if (matchedIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', matchedIds);
    }

    // 7. Language filter — via tour_guide_languages → category (guide_language)
    if (language) {
      const { data: langCats } = await supabaseAdmin
        .schema('directory')
        .from('categories')
        .select('id')
        .or(`slug.ilike.${language},name->>id.ilike.${language},name->>en.ilike.${language}`)
        .contains('entity_types', ['guide_language']);

      const targetLangIds = langCats ? langCats.map((c) => c.id) : [];
      if (targetLangIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const { data: langData } = await supabaseAdmin
        .schema('directory')
        .from('tour_guide_languages')
        .select('guide_id')
        .in('category_id', targetLangIds);

      const matchedIds = langData ? Array.from(new Set(langData.map((l) => l.guide_id))) : [];
      if (matchedIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', matchedIds);
    }

    // 8. Certification filter — via certification_assignments (entity_type='guide')
    if (certification) {
      const { data: certs } = await supabaseAdmin
        .schema('directory')
        .from('certifications')
        .select('id')
        .or(`slug.ilike.${certification},name->>id.ilike.${certification},name->>en.ilike.${certification}`);

      const targetCertIds = certs ? certs.map((c) => c.id) : [];
      if (targetCertIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }

      const { data: certAss } = await supabaseAdmin
        .schema('directory')
        .from('certification_assignments')
        .select('entity_id')
        .eq('entity_type', 'guide')
        .in('certification_id', targetCertIds);

      const matchedIds = certAss ? Array.from(new Set(certAss.map((a) => a.entity_id))) : [];
      if (matchedIds.length === 0) {
        return {
          data: [],
          pagination: { page, limit, total: 0, totalPages: 0 }
        };
      }
      dbQuery = dbQuery.in('id', matchedIds);
    }

    // 9. Sort order
    if (sort === 'popularity') {
      dbQuery = dbQuery.order('trips_count', { ascending: false });
    } else if (sort === 'rating-desc') {
      dbQuery = dbQuery.order('rating_average', { ascending: false });
    } else if (sort === 'price-asc') {
      dbQuery = dbQuery.order('daily_rate', { ascending: true });
    } else if (sort === 'price-desc') {
      dbQuery = dbQuery.order('daily_rate', { ascending: false });
    } else if (sort === 'experience-desc') {
      dbQuery = dbQuery.order('year_experience', { ascending: false });
    } else {
      dbQuery = dbQuery.order('name', { ascending: true });
    }

    // 10. Pagination
    const offset = (page - 1) * limit;
    dbQuery = dbQuery.range(offset, offset + limit - 1);

    // 11. Execute base query
    const { data: dbData, error: dbError, count } = await dbQuery;
    if (dbError) {
      console.error('[api/tour-guides GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    const total = count || 0;
    const guideIds = (dbData ?? []).map((row: any) => row.id);

    if (guideIds.length === 0) {
      return {
        data: [],
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }

    // 12. Fetch specialism assignments
    const { data: specialismData, error: specError } = await supabaseAdmin
      .schema('directory')
      .from('category_assignments')
      .select(`
        entity_id,
        category:categories (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('entity_type', 'guide')
      .in('entity_id', guideIds);

    if (specError) {
      console.error('[api/tour-guides GET specialisms]', specError.message);
      set.status = 500;
      return { error: specError.message };
    }

    // 13. Fetch languages with fluency
    const { data: languageData, error: langError } = await supabaseAdmin
      .schema('directory')
      .from('tour_guide_languages')
      .select(`
        guide_id,
        fluency,
        category:categories (
          id,
          slug,
          name,
          metadata
        )
      `)
      .in('guide_id', guideIds);

    if (langError) {
      console.error('[api/tour-guides GET languages]', langError.message);
      set.status = 500;
      return { error: langError.message };
    }

    // 14. Fetch certifications
    const { data: certData, error: certError } = await supabaseAdmin
      .schema('directory')
      .from('certification_assignments')
      .select(`
        entity_id,
        issued_at,
        expires_at,
        certification:certifications (
          id,
          slug,
          name,
          type,
          issuer
        )
      `)
      .eq('entity_type', 'guide')
      .in('entity_id', guideIds);

    if (certError) {
      console.error('[api/tour-guides GET certs]', certError.message);
      set.status = 500;
      return { error: certError.message };
    }

    // Build lookup maps
    const specialismsMap: Record<string, any[]> = {};
    (specialismData ?? []).forEach((row: any) => {
      const cat = row.category;
      if (!cat) return;
      const nameObj = cat.name;
      let catName = '';
      if (typeof nameObj === 'string') {
        catName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      specialismsMap[row.entity_id] = specialismsMap[row.entity_id] || [];
      specialismsMap[row.entity_id].push({
        id: cat.id,
        slug: cat.slug,
        name: catName,
        metadata: cat.metadata || {},
      });
    });

    const languagesMap: Record<string, any[]> = {};
    (languageData ?? []).forEach((row: any) => {
      const cat = row.category;
      if (!cat) return;
      const nameObj = cat.name;
      let langName = '';
      if (typeof nameObj === 'string') {
        langName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        langName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      const code = cat.metadata?.code || '';
      languagesMap[row.guide_id] = languagesMap[row.guide_id] || [];
      languagesMap[row.guide_id].push({
        id: cat.id,
        slug: cat.slug,
        name: langName,
        code,
        fluency: row.fluency,
      });
    });

    const certificationsMap: Record<string, any[]> = {};
    (certData ?? []).forEach((row: any) => {
      const cert = row.certification;
      if (!cert) return;
      const nameObj = cert.name;
      let certName = '';
      if (typeof nameObj === 'string') {
        certName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        certName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      certificationsMap[row.entity_id] = certificationsMap[row.entity_id] || [];
      certificationsMap[row.entity_id].push({
        id: cert.id,
        slug: cert.slug,
        name: certName,
        type: cert.type,
        issuer: cert.issuer,
        issuedAt: row.issued_at,
        expiresAt: row.expires_at,
      });
    });

    // Map to TourGuide[]
    const guides: TourGuide[] = (dbData ?? []).map((row: any) => {
      const rawProvince = Array.isArray(row.destination?.province)
        ? row.destination.province[0]
        : row.destination?.province;

      const rawDestination = row.destination
        ? {
            id: row.destination.id,
            slug: row.destination.slug,
            name: row.destination.name,
            province: rawProvince
              ? {
                  id: rawProvince.id,
                  slug: rawProvince.slug,
                  name: rawProvince.name,
                }
              : { id: '', slug: '', name: '' },
          }
        : { id: '', slug: '', name: '', province: { id: '', slug: '', name: '' } };

      const description =
        row.description?.[lang] || row.description?.id || row.description?.en || '';

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        description,
        destination: rawDestination,
        avatar: {
          url: row.avatar?.url ?? '',
          blurhash: row.avatar?.blurhash ?? null,
        },
        coverImage: {
          url: row.cover_image?.url ?? '',
          blurhash: row.cover_image?.blurhash ?? null,
        },
        verified: row.verified,
        ratingAverage: Number(row.rating_average),
        reviewsCount: row.reviews_count,
        tripsCount: row.trips_count,
        yearExperience: row.year_experience,
        dailyRate: row.daily_rate,
        specialisms: specialismsMap[row.id] || [],
        languages: languagesMap[row.id] || [],
        certifications: certificationsMap[row.id] || [],
      };
    });

    return {
      data: guides,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  }, {
    query: t.Optional(t.Object({
      page: t.Optional(t.String()),
      limit: t.Optional(t.String()),
      sort: t.Optional(t.String()),
      search: t.Optional(t.String()),
      province: t.Optional(t.String()),
      destination: t.Optional(t.String()),
      specialism: t.Optional(t.String()),
      language: t.Optional(t.String()),
      certification: t.Optional(t.String()),
      price: t.Optional(t.String()),
      verified: t.Optional(t.String()),
    }))
  });
