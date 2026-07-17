export type TaxonomyType =
  | 'category'
  | 'adwi_level'
  | 'village_theme'
  | 'village_activity'
  | 'guide_language'
  | 'guide_specialism';

export interface TaxonomyMetadata {
  icon?: string;
  color?: string;
}

export interface Taxonomy {
  id: string;
  slug: string;
  name: string;
  type: TaxonomyType;
  metadata: TaxonomyMetadata;
  createdAt?: string;
  updatedAt?: string;
}
