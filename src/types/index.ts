export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  bioLong?: string;
  avatar: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    email?: string;
  };
  areas: string[];
  since: string;
  articleCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
  articleCount?: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: {
    name: string;
    slug: string;
    color: string;
    icon?: string;
  };
  author: {
    id: string;
    name: string;
    slug: string;
    avatar: string;
    role?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  breaking: boolean;
  views: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
