import { GUIDE_DATA } from '@/data/guides';

const LANG_MAP = {
  Indonesia: 'ID',
  English: 'EN',
  Mandarin: 'ZH',
  Japanese: 'JP',
  Korean: 'KO',
  Spanish: 'ES',
  French: 'FR',
  German: 'DE',
  Arabic: 'AR',
  Dutch: 'NL',
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function addId(item) {
  return { ...item, id: slugify(item.name) };
}

function parsePriceRange(range) {
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
  // "< Rp500rb/hari"
  if (r.startsWith('<')) {
    const max = parseInt(r.replace(/< Rp?(\d+)rb.*/, '$1')) * 1000;
    if (!isNaN(max)) return [0, max];
    return null;
  }
  // "> Rp2jt/hari"
  if (r.startsWith('>')) {
    const min = parseInt(r.replace(/> Rp?(\d+)jt.*/, '$1')) * 1000000;
    if (!isNaN(min)) return [min, Infinity];
    return null;
  }
  // "Rp500rb – Rp1jt"
  const parts = r.match(/Rp?(\d+)([ktr]b)?\s*-\s*Rp?(\d+)([ktr]b)?/);
  if (parts) {
    const unit1 = parts[2] || 'rb';
    const unit2 = parts[4] || 'rb';
    const mul1 = unit1 === 'jt' ? 1000000 : unit1 === 'rb' ? 1000 : 1;
    const mul2 = unit2 === 'jt' ? 1000000 : unit2 === 'rb' ? 1000 : 1;
    return [parseInt(parts[1]) * mul1, parseInt(parts[3]) * mul2];
  }
  return null;
}

function extractExpYears(exp) {
  const match = exp.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sort = searchParams.get('sort') || 'Paling populer';
  const search = (searchParams.get('search') || '').toLowerCase();
  const wilayah = searchParams.get('wilayah') || '';
  const spesialisasi = searchParams.get('spesialisasi') || '';
  const bahasa = searchParams.get('bahasa') || '';
  const harga = searchParams.get('harga') || '';
  const sertifikasi = searchParams.get('sertifikasi') || '';

  let data = GUIDE_DATA.map(addId);

  // Filters
  if (search) {
    data = data.filter((d) => d.name.toLowerCase().includes(search));
  }
  if (wilayah) {
    data = data.filter((d) =>
      d.region.toLowerCase().includes(wilayah.toLowerCase())
    );
  }
  if (spesialisasi) {
    data = data.filter((d) =>
      d.spec.some((s) => s.toLowerCase() === spesialisasi.toLowerCase())
    );
  }
  if (bahasa) {
    const code = LANG_MAP[bahasa];
    if (code) {
      data = data.filter((d) => d.langs.includes(code));
    }
  }
  if (harga) {
    const range = parsePriceRange(harga);
    if (range) {
      data = data.filter((d) => d.price >= range[0] && d.price <= range[1]);
    }
  }
  if (sertifikasi) {
    if (sertifikasi === 'Bersertifikat semua') {
      data = data.filter((d) => d.certs.length > 0);
    } else {
      data = data.filter((d) =>
        d.certs.some((c) => c.toLowerCase() === sertifikasi.toLowerCase())
      );
    }
  }

  // Sort
  if (sort === 'Paling populer') {
    data.sort((a, b) => b.trips - a.trips);
  } else if (sort === 'Rating tertinggi') {
    data.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'Harga terendah') {
    data.sort((a, b) => a.price - b.price);
  } else if (sort === 'Harga tertinggi') {
    data.sort((a, b) => b.price - a.price);
  } else if (sort === 'Pengalaman terbanyak') {
    data.sort((a, b) => extractExpYears(b.exp) - extractExpYears(a.exp));
  }

  // Paginate
  const total = data.length;
  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  return Response.json({
    data: paged,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
