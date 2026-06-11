import { ISLANDS } from '@/data/explore-data';

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function GET() {
  const data = ISLANDS.map((item) => ({
    id: slugify(item.name),
    name: item.name,
    provinces: item.provinces,
    img: item.img,
    color: item.color,
  }));

  return Response.json({ data });
}
