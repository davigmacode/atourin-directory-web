export interface Creator {
  id: string;
  userId: string | null;
  slug: string;
  name: string;
  displayName: string | null;
  avatar: { url: string; blurhash: string | null; base64?: string | null };
  bio: { id: string; en: string };
  isVerified: boolean;
  /** Resolved from creator_badges + taxonomies (type='creator_role') */
  badges?: CreatorBadge[];
}

export interface CreatorBadge {
  id: string;
  slug: string;
  name: { id: string; en: string };
  icon: string;
  issuedAt?: string | null;
  validUntil?: string | null;
}
