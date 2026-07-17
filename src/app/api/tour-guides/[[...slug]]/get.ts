import { Elysia } from 'elysia';
import { supabaseAdmin } from '@/lib/supabase';
import type { TourGuide } from '@/types/tour-guide';

export const getController = new Elysia()
  .get('/:slug', async ({ params: { slug }, headers, set }) => {
    // Language resolution
    const langHeader = headers['accept-language'] || 'id';
    const lang = langHeader.toLowerCase().includes('en') ? 'en' : 'id';

    // 1. Fetch the guide with destination & province
    const { data: row, error: dbError } = await supabaseAdmin
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
        destination:destinations (
          id,
          name,
          slug,
          province:provinces (
            id,
            name,
            slug
          )
        )
      `)
      .eq('slug', slug)
      .maybeSingle();

    if (dbError) {
      console.error('[api/tour-guides/[slug] GET]', dbError.message);
      set.status = 500;
      return { error: dbError.message };
    }

    if (!row) {
      set.status = 404;
      return { error: 'Tour guide not found' };
    }

    // 2. Fetch specialism assignments
    const { data: specialismData, error: specError } = await supabaseAdmin
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
      .eq('entity_type', 'guide')
      .eq('entity_id', row.id);

    if (specError) {
      console.error('[api/tour-guides/[slug] GET specialisms]', specError.message);
      set.status = 500;
      return { error: specError.message };
    }

    // 3. Fetch languages with fluency
    const { data: languageData, error: langError } = await supabaseAdmin
      .schema('directory')
      .from('tour_guide_languages')
      .select(`
        fluency,
        category:categories (
          id,
          slug,
          name,
          metadata
        )
      `)
      .eq('guide_id', row.id);

    if (langError) {
      console.error('[api/tour-guides/[slug] GET languages]', langError.message);
      set.status = 500;
      return { error: langError.message };
    }

    // 4. Fetch certifications
    const { data: certData, error: certError } = await supabaseAdmin
      .schema('directory')
      .from('certification_assignments')
      .select(`
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
      .eq('entity_id', row.id);

    if (certError) {
      console.error('[api/tour-guides/[slug] GET certs]', certError.message);
      set.status = 500;
      return { error: certError.message };
    }

    // 5. Fetch media (gallery)
    const { data: mediaData, error: mediaError } = await supabaseAdmin
      .schema('directory')
      .from('media')
      .select(`
        id,
        type,
        url,
        metadata,
        sort_order
      `)
      .eq('entity_type', 'guide')
      .eq('entity_id', row.id)
      .order('sort_order', { ascending: true });

    if (mediaError) {
      console.error('[api/tour-guides/[slug] GET media]', mediaError.message);
      set.status = 500;
      return { error: mediaError.message };
    }

    // 6. Fetch packages
    const { data: packageData, error: pkgError } = await supabaseAdmin
      .schema('directory')
      .from('tour_guide_packages')
      .select(`
        id,
        slug,
        title,
        description,
        is_bestseller,
        duration_days,
        duration_nights,
        schedule_start,
        schedule_end,
        min_pax,
        max_pax,
        transport_type,
        transport_capacity,
        price_per_pax,
        price_note,
        highlights,
        sort_order
      `)
      .eq('guide_id', row.id)
      .order('sort_order', { ascending: true });

    if (pkgError) {
      console.error('[api/tour-guides/[slug] GET packages]', pkgError.message);
      set.status = 500;
      return { error: pkgError.message };
    }

    // Process specialisms
    const specialisms = (specialismData ?? []).map((ca: any) => {
      const cat = ca.category;
      if (!cat) return null;
      const nameObj = cat.name;
      let catName = '';
      if (typeof nameObj === 'string') {
        catName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        catName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return {
        id: cat.id,
        slug: cat.slug,
        name: catName,
        metadata: cat.metadata || {},
      };
    }).filter((s) => s !== null);

    // Process languages
    const languages = (languageData ?? []).map((l: any) => {
      const cat = l.category;
      if (!cat) return null;
      const nameObj = cat.name;
      let langName = '';
      if (typeof nameObj === 'string') {
        langName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        langName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return {
        id: cat.id,
        slug: cat.slug,
        name: langName,
        code: cat.metadata?.code || '',
        fluency: l.fluency,
      };
    }).filter((l) => l !== null);

    // Process certifications
    const certifications = (certData ?? []).map((c: any) => {
      const cert = c.certification;
      if (!cert) return null;
      const nameObj = cert.name;
      let certName = '';
      if (typeof nameObj === 'string') {
        certName = nameObj;
      } else if (nameObj && typeof nameObj === 'object') {
        certName = nameObj[lang] || nameObj.id || nameObj.en || '';
      }
      return {
        id: cert.id,
        slug: cert.slug,
        name: certName,
        type: cert.type,
        issuer: cert.issuer,
        issuedAt: c.issued_at,
        expiresAt: c.expires_at,
      };
    }).filter((c) => c !== null);

    // Process media
    const media = (mediaData ?? []).map((m: any) => {
      const captionObj = m.metadata?.caption;
      let captionId = '';
      let captionEn = '';
      if (captionObj && typeof captionObj === 'object') {
        captionId = captionObj.id || captionObj[lang] || '';
        captionEn = captionObj.en || '';
      }
      return {
        id: m.id,
        type: m.type as 'image' | 'video',
        url: m.url,
        caption: { id: captionId, en: captionEn },
        metadata: m.metadata || {},
        sortOrder: m.sort_order,
      };
    });

    // Process packages
    const packages = (packageData ?? []).map((p: any) => {
      const titleObj = p.title;
      const descObj = p.description;
      const titleStr = titleObj?.[lang] || titleObj?.id || titleObj?.en || '';
      const descStr = descObj?.[lang] || descObj?.id || descObj?.en || '';

      const highlights = Array.isArray(p.highlights) ? p.highlights.map((h: any) => {
        if (h && typeof h === 'object') {
          return {
            id: h.id || '',
            en: h.en || '',
          };
        }
        return { id: '', en: '' };
      }) : [];

      return {
        id: p.id,
        slug: p.slug,
        title: titleStr,
        description: descStr,
        isBestseller: p.is_bestseller,
        durationDays: p.duration_days,
        durationNights: p.duration_nights,
        scheduleStart: p.schedule_start,
        scheduleEnd: p.schedule_end,
        minPax: p.min_pax,
        maxPax: p.max_pax,
        transportType: p.transport_type,
        transportCapacity: p.transport_capacity,
        pricePerPax: p.price_per_pax,
        priceNote: p.price_note,
        highlights,
        sortOrder: p.sort_order,
      };
    });

    const rowAny = row as any;
    const rawDestination = Array.isArray(rowAny.destination)
      ? rowAny.destination[0]
      : rowAny.destination;
    const rawProvince = rawDestination
      ? (Array.isArray(rawDestination.province) ? rawDestination.province[0] : rawDestination.province)
      : null;

    const destination = rawDestination
      ? {
          id: rawDestination.id,
          slug: rawDestination.slug,
          name: rawDestination.name,
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
      rowAny.description?.[lang] || rowAny.description?.id || rowAny.description?.en || '';

    const guide: TourGuide = {
      id: rowAny.id,
      slug: rowAny.slug,
      name: rowAny.name,
      description,
      destination,
      avatar: {
        url: rowAny.avatar?.url ?? '',
        blurhash: rowAny.avatar?.blurhash ?? null,
      },
      coverImage: {
        url: rowAny.cover_image?.url ?? '',
        blurhash: rowAny.cover_image?.blurhash ?? null,
      },
      verified: rowAny.verified,
      ratingAverage: Number(rowAny.rating_average),
      reviewsCount: rowAny.reviews_count,
      tripsCount: rowAny.trips_count,
      yearExperience: rowAny.year_experience,
      dailyRate: rowAny.daily_rate,
      specialisms,
      languages,
      certifications,
      media,
      packages,
    };

    return { data: guide };
  });
