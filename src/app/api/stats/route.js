export async function GET() {
  const data = {
    destinations: '180+',
    attractions: '1.2K+',
    guides: '640+',
    villages: '320+',
    itineraries: '2.4K+',
  };

  return Response.json({ data });
}
