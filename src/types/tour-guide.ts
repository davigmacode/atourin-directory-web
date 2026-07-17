export type FluencyLevel = 'native' | 'fluent' | 'conversational' | 'basic';

export interface TourGuideLanguage {
  id: string;
  slug: string;
  name: string;
  code: string;
  fluency: FluencyLevel;
}

export interface TourGuideSpecialismMetadata {
  icon?: string;
  color?: string;
  fg?: string;
}

export interface TourGuideSpecialism {
  id: string;
  slug: string;
  name: string;
  metadata: TourGuideSpecialismMetadata;
}

export type CertificationType = 'training' | 'competency' | 'award';

export interface TourGuideCertification {
  id: string;
  slug: string;
  name: string;
  type: CertificationType;
  issuer: string;
  issuedAt?: string | null;
  expiresAt?: string | null;
}

export interface TourGuidePackageHighlight {
  id: string;
  en: string;
}

export interface TourGuidePackage {
  id: string;
  slug: string;
  title: string;
  description: string;
  isBestseller: boolean;
  durationDays: number;
  durationNights: number;
  scheduleStart: string;
  scheduleEnd: string;
  minPax: number;
  maxPax: number;
  transportType: string;
  transportCapacity: string;
  pricePerPax: number;
  priceNote: string;
  highlights: TourGuidePackageHighlight[];
  sortOrder: number;
}

export interface TourGuideMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: { id: string; en: string };
  metadata: Record<string, unknown>;
  sortOrder: number;
}

export interface TourGuideDestination {
  id: string;
  slug: string;
  name: string;
  province: { id: string; slug: string; name: string };
}

export interface TourGuide {
  id: string;
  slug: string;
  name: string;
  description: string;
  destination: TourGuideDestination;
  avatar: { url: string; blurhash: string | null };
  coverImage: { url: string; blurhash: string | null };
  verified: boolean;
  ratingAverage: number;
  reviewsCount: number;
  tripsCount: number;
  yearExperience: number;
  dailyRate: number;
  specialisms: TourGuideSpecialism[];
  languages: TourGuideLanguage[];
  certifications: TourGuideCertification[];
  media?: TourGuideMedia[];
  packages?: TourGuidePackage[];
}
