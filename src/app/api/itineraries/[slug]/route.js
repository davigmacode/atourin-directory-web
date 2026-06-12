import { ITIN_DATA } from "@/data/itineraries";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(req, { params }) {
  const { slug } = params;
  const item = ITIN_DATA.find((i) => slugify(i.title) === slug);
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ data: { ...item, id: slug } });
}
