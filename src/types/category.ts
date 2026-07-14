export interface CategoryMetadata {
  icon?: string;
  color?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  metadata: CategoryMetadata;
  createdAt?: string;
  updatedAt?: string;
}
