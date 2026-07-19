import type { CoverImage } from './island';
import type { Destination } from './destination';
import type { Taxonomy } from './taxonomy';
import type { Creator } from './creator';

export interface Journal {
  id: string;
  slug: string;
  title: string;
  destinationId: string;
  destination?: Destination;
  authorId: string;
  author?: Creator;
  coverImage: CoverImage;
  description?: string;
  content?: string;
  categories?: Taxonomy[];
  ratingAverage: number;
  reviewsCount: number;
  likesCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}
