import type { CoverImage } from './island';
import type { Province } from './province';
import type { Media } from './media';
import type { Journal } from './journal';

export interface DestinationDescriptions {
  id: string;
  en: string;
}

export interface Destination {
  id: string; // BPS Code
  slug: string;
  name: string;
  type: 'regency' | 'city';
  provinceId: string;
  province?: Province; // Joined related province
  coverImage: CoverImage;
  description?: string; // Resolved based on request language
  attractionsCount: number;
  villagesCount: number;
  itinerariesCount: number;
  tourGuidesCount: number;
  journalsCount: number;
  marketProductsCount: number;
  ratingAverage: number;
  popularScore: number;
  tags?: { slug: string; name: string }[]; // Category objects mapped relationally
  media?: Media[]; // Polymorphic media gallery items
  relatedJournals?: Journal[];
  createdAt?: string;
  updatedAt?: string;
}
