import { FEATURED } from '@/data/explore-data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');

  let data = [...FEATURED];

  if (limit) {
    const num = parseInt(limit, 10);
    if (!isNaN(num) && num > 0) {
      data = data.slice(0, num);
    }
  }

  return Response.json({ data });
}
