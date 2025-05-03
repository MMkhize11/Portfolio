export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;

  coverImage: string;
  date: string;
  slug: string;
  tags?: string[];
  categories: string[];
} 