import type { CoverImage, Island } from './island';

export interface Province {
  id: string;
  islandId: string;
  island?: Island; // Related island object
  slug: string;
  name: string;
  destinationsCount: number;
  attractionsCount: number;
  villagesCount: number;
  itinerariesCount: number;
  tourGuidesCount: number;
  journalsCount: number;
  coverImage: CoverImage;
  popularityScore: number;
}
