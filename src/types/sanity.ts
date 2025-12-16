import type { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  coverImage: Image & { alt?: string };
  categories: string[];
  tags?: string[];
  content: PortableTextBlock[];
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
}
