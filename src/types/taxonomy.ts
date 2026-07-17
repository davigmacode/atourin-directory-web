export interface TaxonomyMetadata {
  icon?: string;
  color?: string;
}

export interface Taxonomy {
  id: string;
  slug: string;
  name: string;
  entity_types?: string[];
  metadata: TaxonomyMetadata;
  createdAt?: string;
  updatedAt?: string;
}
