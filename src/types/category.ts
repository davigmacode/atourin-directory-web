export interface CategoryMetadata {
  icon?: string;
  color?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  entity_types?: string[];
  metadata: CategoryMetadata;
  createdAt?: string;
  updatedAt?: string;
}
