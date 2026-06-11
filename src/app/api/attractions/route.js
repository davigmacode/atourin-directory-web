import { ATTR_DATA } from '@/data/attractions';

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
  // Normalise spaces and dashes
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
  if (r === 'Gratis') return [0, 0];
  if (r.startsWith('<')) {
    const max = parseInt(r.replace(/< Rp?(\d+)rb/, '$1')) * 1000;
    return [0, max];
  }
  if (r.startsWith('>')) {
    const min = parseInt(r.replace(/> Rp?(\d+)rb/, '$1')) * 1000;
    return [min, Infinity];
  }
  // Range: "Rp25rb – Rp100rb"
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
  const kategori = searchParams.get('kategori') || '';
  const tiketMasuk = searchParams.get('tiket_masuk') || '';
  const ratingFilter = searchParams.get('rating') || '';

  let data = ATTR_DATA.map(addId);

  // Filters
  if (search) {
    data = data.filter((d) => d.name.toLowerCase().includes(search));
  }
  if (provinsi) {
    data = data.filter((d) => d.region.toLowerCase().includes(provinsi.toLowerCase()));
  }
  if (kategori) {
    data = data.filter((d) => d.cat.toLowerCase() === kategori.toLowerCase());
  }
  if (tiketMasuk) {
    const range = parsePriceRange(tiketMasuk);
    if (range) {
      data = data.filter((d) => d.price >= range[0] && d.price <= range[1]);
    }
  }
  if (ratingFilter) {
    const match = ratingFilter.match(/[\d.]+/);
    if (match) {
      const threshold = parseFloat(match[0]);
      data = data.filter((d) => d.rating >= threshold);
    }
  }

  // Sort
  if (sort === 'Paling populer') {
    data.sort((a, b) => b.reviews - a.reviews);
  } else if (sort === 'Terbaru') {
    // No date field – keep original order
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
