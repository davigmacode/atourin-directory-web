export interface FacilityMetadata {
  icon?: string;
}

export interface Facility {
  id: string;
  slug: string;
  name: string;
  entity_types?: string[];
  metadata: FacilityMetadata;
  createdAt?: string;
  updatedAt?: string;
}

export interface FacilityAssignment extends Facility {
  available: boolean;
}
