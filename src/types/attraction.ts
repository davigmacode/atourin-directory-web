import type { CoverImage } from './island';
import type { Destination } from './destination';
import type { Category } from './category';
import type { FacilityAssignment } from './facility';
import type { Media } from './media';

export interface OpeningHoursPeriod {
  open: string;
  close: string;
}

export interface OpeningHours {
  timezone: string;
  is24Hours: boolean;
  periods: {
    monday?: OpeningHoursPeriod[];
    tuesday?: OpeningHoursPeriod[];
    wednesday?: OpeningHoursPeriod[];
    thursday?: OpeningHoursPeriod[];
    friday?: OpeningHoursPeriod[];
    saturday?: OpeningHoursPeriod[];
    sunday?: OpeningHoursPeriod[];
  };
  note?: {
    id: string;
    en: string;
  };
}

export interface PriceTier {
  name: string;
  price: number;
}

export interface Attraction {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  destination?: Destination;
  coverImage: CoverImage;
  description?: string;
  price: number;
  priceTiers?: PriceTier[];
  ratingAverage: number;
  reviewsCount: number;
  openingHours: OpeningHours;
  trekking: boolean;
  latitude?: number;
  longitude?: number;
  categories?: Category[];
  facilities?: FacilityAssignment[];
  media?: Media[];
}
