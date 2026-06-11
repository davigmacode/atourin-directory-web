import { DESA_FEATURED } from '@/data/explore-data';

export async function GET() {
  return Response.json({ data: DESA_FEATURED });
}
