import { HERO_BGS } from '@/data/explore-data';

export async function GET() {
  return Response.json({ data: HERO_BGS });
}
