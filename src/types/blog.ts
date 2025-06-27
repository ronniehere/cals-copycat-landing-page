
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  slug: string;
  isPublished: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  imageAlt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogFilters {
  category?: string;
  tags?: string[];
  sortBy: 'newest' | 'oldest' | 'popular';
  search?: string;
}
