import type { CoverImage } from './island';
import type { Destination } from './destination';
import type { Taxonomy } from './taxonomy';
import type { FacilityAssignment } from './facility';
import type { Media } from './media';

export interface VillageLocation {
  address: string;
  accessibility: string;
  directions?: { title: string; detail: string; }[];
  latitude?: number;
  longitude?: number;
}

export interface TourismVillage {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  destination?: Destination;
  coverImage: CoverImage;
  description?: string;
  featured: boolean;
  adwi: 'rintisan' | 'berkembang' | 'maju' | 'mandiri';
  ratingAverage: number;
  reviewsCount: number;
  homestayCount: number;
  homestayMinPrice: number;
  dailyQuota: number;
  location: VillageLocation;
  categories?: Taxonomy[];
  facilities?: FacilityAssignment[];
  media?: Media[];
}
