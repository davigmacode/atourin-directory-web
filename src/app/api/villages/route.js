import { VIL_DATA } from '@/data/villages';

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
  if (r.startsWith('<')) {
    const max = parseInt(r.replace(/< Rp?(\d+)rb/, '$1')) * 1000;
    if (!isNaN(max)) return [0, max];
    return null;
  }
  if (r.startsWith('>')) {
    const min = parseInt(r.replace(/> Rp?(\d+)rb/, '$1')) * 1000;
    if (!isNaN(min)) return [min, Infinity];
    return null;
  }
  const parts = r.match(/Rp?(\d+)rb\s*-\s*Rp?(\d+)rb/);
  if (parts) {
    return [parseInt(parts[1]) * 1000, parseInt(parts[2]) * 1000];
  }
  return null;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sort = searchParams.get('sort') || 'Paling populer';
  const search = (searchParams.get('search') || '').toLowerCase();
  const provinsi = searchParams.get('provinsi') || '';
  const adwiKategori = searchParams.get('adwi_kategori') || '';
  const tema = searchParams.get('tema') || '';
  const aktivitas = searchParams.get('aktivitas') || '';
  const harga = searchParams.get('harga') || '';

  let data = VIL_DATA.map(addId);

  // Filters
  if (search) {
    data = data.filter((d) => d.name.toLowerCase().includes(search));
  }
  if (provinsi) {
    data = data.filter((d) =>
      d.region.toLowerCase().includes(provinsi.toLowerCase())
    );
  }
  if (adwiKategori) {
    data = data.filter((d) => d.adwi === adwiKategori);
  }
  if (tema) {
    data = data.filter((d) => d.theme === tema);
  }
  if (aktivitas) {
    data = data.filter((d) =>
      d.activities.some((a) => a.toLowerCase() === aktivitas.toLowerCase())
    );
  }
  if (harga) {
    const range = parsePriceRange(harga);
    if (range) {
      data = data.filter((d) => d.price >= range[0] && d.price <= range[1]);
    }
  }

  // Sort
  if (sort === 'Paling populer') {
    data.sort((a, b) => b.families - a.families);
  } else if (sort === 'Rating tertinggi') {
    data.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'Harga terendah') {
    data.sort((a, b) => a.price - b.price);
  } else if (sort === 'Harga tertinggi') {
    data.sort((a, b) => b.price - a.price);
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
