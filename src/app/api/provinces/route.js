import { PROVINCES } from '@/data/explore-data';

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const island = searchParams.get('island');
  const sort = searchParams.get('sort');

  let data = PROVINCES.map((item) => ({
    id: slugify(item.name),
    name: item.name,
    island: item.island,
    img: item.img,
    destinations: item.dest,
    attractions: item.attr,
    villages: item.desa,
    popular: item.popular,
  }));

  if (island) {
    data = data.filter(
      (item) => slugify(item.island) === slugify(island)
    );
  }

  if (sort === 'alpha') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'popular') {
    data.sort((a, b) => b.popular - a.popular);
  }

  return Response.json({ data });
}
