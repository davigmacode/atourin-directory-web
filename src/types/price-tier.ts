export interface PriceTierName {
  id: string;
  en: string;
}

export interface PriceTier {
  id: string;
  entityType: string;
  entityId: string;
  name: PriceTierName;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}
