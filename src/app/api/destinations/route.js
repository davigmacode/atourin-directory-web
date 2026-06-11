import { DESTINATIONS } from '@/data/destinations';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function addId(item) {
  return { ...item, id: slugify(item.name) };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sort = searchParams.get('sort') || 'alpha';
  const search = (searchParams.get('search') || '').toLowerCase();
  const island = searchParams.get('island') || '';
  const province = searchParams.get('province') || '';
  const category = searchParams.get('category') || '';

  let data = DESTINATIONS.map(addId);

  // Filters
  if (search) data = data.filter((d) => d.name.toLowerCase().includes(search));
  if (island) data = data.filter((d) => d.island === island);
  if (province) data = data.filter((d) => d.province === province);
  if (category) data = data.filter((d) => d.type === category);

  // Sort
  if (sort === 'alpha') data.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'alpha-rev') data.sort((a, b) => b.name.localeCompare(a.name));
  else if (sort === 'popular') data.sort((a, b) => b.popular - a.popular);
  else if (sort === 'content') data.sort((a, b) => b.attr + b.itin - (a.attr + a.itin));

  // Paginate
  const total = data.length;
  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  return Response.json({
    data: paged,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
