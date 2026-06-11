import { ITIN_DATA } from '@/data/itineraries';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function addId(item) {
  const id = slugify(item.title);
  return { ...item, id };
}

function parseNumericPrice(priceStr) {
  // "Rp 1.2jt" -> 1200000
  // "Rp 480rb" -> 480000
  // "Rp 320rb" -> 320000
  const s = priceStr.replace(/[^0-9,.ktrb]/g, '').toLowerCase();
  if (s.includes('jt')) {
    const num = parseFloat(s.replace('jt', '').replace(/\./g, '').replace(',', '.'));
    return isNaN(num) ? null : num * 1000000;
  }
  if (s.includes('rb')) {
    const num = parseFloat(s.replace('rb', '').replace(/\./g, '').replace(',', '.'));
    return isNaN(num) ? null : num * 1000;
  }
  const num = parseFloat(s);
  return isNaN(num) ? null : num;
}

function parseBudgetRange(range) {
  const r = range.replace(/\s*\u2013\s*/g, ' - ').trim();
  if (r.startsWith('<')) {
    const match = r.match(/< Rp?([\d.]+)([ktr]b)/);
    if (match) {
      const val = parseFloat(match[1].replace(/\./g, ''));
      const mul = match[2] === 'jt' ? 1000000 : match[2] === 'rb' ? 1000 : 1;
      return [0, val * mul];
    }
    return null;
  }
  if (r.endsWith('+')) {
    const match = r.match(/Rp?([\d.]+)([ktr]b)\+/);
    if (match) {
      const val = parseFloat(match[1].replace(/\./g, ''));
      const mul = match[2] === 'jt' ? 1000000 : match[2] === 'rb' ? 1000 : 1;
      return [val * mul, Infinity];
    }
    return null;
  }
  // "Rp1jt – Rp3jt"
  const parts = r.match(/Rp?([\d.]+)([ktr]b)?\s*-\s*Rp?([\d.]+)([ktr]b)?/);
  if (parts) {
    const mul1 = (parts[2] || 'rb') === 'jt' ? 1000000 : 1000;
    const mul2 = (parts[4] || 'rb') === 'jt' ? 1000000 : 1000;
    return [parseFloat(parts[1].replace(/\./g, '')) * mul1, parseFloat(parts[3].replace(/\./g, '')) * mul2];
  }
  return null;
}

function parseDayCount(daysStr) {
  // "3 Hari · 2 Malam" -> 3
  // "1 Hari" -> 1
  // "4 Hari · 3 Malam" -> 4
  const match = daysStr.match(/(\d+)\s*Hari/);
  return match ? parseInt(match[1]) : 99;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sort = searchParams.get('sort') || 'Paling populer';
  const search = (searchParams.get('search') || '').toLowerCase();
  const destination = searchParams.get('destination') || '';
  const durasi = searchParams.get('durasi') || '';
  const budget = searchParams.get('budget') || '';
  const tipePerjalanan = searchParams.get('tipe_perjalanan') || '';
  const kategori = searchParams.get('kategori') || '';

  let data = ITIN_DATA.map(addId);

  // Filters
  if (search) {
    data = data.filter(
      (d) =>
        d.title.toLowerCase().includes(search) ||
        d.author.toLowerCase().includes(search)
    );
  }
  if (destination) {
    data = data.filter((d) =>
      d.city.toLowerCase().includes(destination.toLowerCase())
    );
  }
  if (durasi) {
    // Normalise: "2D1N", "3D2N" -> parse days
    const match = durasi.match(/(\d+)D/i);
    const dayFilter = match ? parseInt(match[1]) : null;
    if (dayFilter) {
      data = data.filter((d) => parseDayCount(d.days) === dayFilter);
    } else if (durasi === '6D+') {
      data = data.filter((d) => parseDayCount(d.days) >= 6);
    } else if (durasi === '1 Hari') {
      data = data.filter((d) => parseDayCount(d.days) === 1);
    }
  }
  if (budget) {
    const range = parseBudgetRange(budget);
    if (range) {
      data = data.filter((d) => {
        const p = parseNumericPrice(d.price);
        return p !== null && p >= range[0] && p <= range[1];
      });
    }
  }
  if (tipePerjalanan) {
    data = data.filter((d) =>
      d.tag.toLowerCase() === tipePerjalanan.toLowerCase()
    );
  }
  if (kategori) {
    data = data.filter((d) =>
      d.tag.toLowerCase() === kategori.toLowerCase()
    );
  }

  // Sort
  if (sort === 'Paling populer') {
    data.sort((a, b) => b.views - a.views);
  } else if (sort === 'Terbaru') {
    // No date field – keep original order
  } else if (sort === 'Rating tertinggi') {
    data.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'Harga terendah') {
    data.sort((a, b) => {
      const pa = parseNumericPrice(a.price) || 0;
      const pb = parseNumericPrice(b.price) || 0;
      return pa - pb;
    });
  } else if (sort === 'Harga tertinggi') {
    data.sort((a, b) => {
      const pa = parseNumericPrice(a.price) || 0;
      const pb = parseNumericPrice(b.price) || 0;
      return pb - pa;
    });
  } else if (sort === 'Durasi terpendek') {
    data.sort((a, b) => parseDayCount(a.days) - parseDayCount(b.days));
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
