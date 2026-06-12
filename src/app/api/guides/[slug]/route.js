import { GUIDE_DATA } from "@/data/guides";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(req, { params }) {
  const { slug } = params;
  const item = GUIDE_DATA.find((g) => slugify(g.name) === slug);
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ data: { ...item, id: slug } });
}
