/* ─── Shared image/media type ─── */

export interface CoverImage {
  url: string;
  blurhash: string | null;
  base64: string | null;
}

/* ─── Island ─── */

/** Raw shape stored in explore-data.ts */
export interface IslandData {
  name: string;
  provincesCount: number;
  coverImage: CoverImage;
}

/** Shape returned by /api/islands */
export interface Island {
  id: string;
  slug: string;
  name: string;
  provincesCount: number;
  coverImage: CoverImage;
}
