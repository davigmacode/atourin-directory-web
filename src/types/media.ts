export interface MediaMetadata {
  width?: number;
  height?: number;
  blurhash?: string | null;
  base64?: string | null;
  duration?: number; // for videos
}

export interface Media {
  id: string;
  entityType: string;
  entityId: string;
  type: 'image' | 'video';
  url: string;
  metadata: MediaMetadata;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
