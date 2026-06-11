import { UNTUKMU } from '@/data/explore-data';

export async function GET() {
  return Response.json({ data: UNTUKMU });
}
