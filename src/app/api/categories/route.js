import { CATEGORIES } from '@/data/explore-data';

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export async function GET() {
  const data = CATEGORIES.map((item) => ({
    id: slugify(item.name),
    name: item.name,
    icon: item.icon,
    color: item.color,
  }));

  return Response.json({ data });
}
