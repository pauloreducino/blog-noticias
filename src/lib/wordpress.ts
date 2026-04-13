import type { Article, Author, PaginatedResult } from '@/types';
import {
  articles as fallbackArticles,
  getArticleBySlug as fallbackGetBySlug,
  getArticlesByCategory as fallbackGetByCategory,
  getArticlesByAuthor as fallbackGetByAuthor,
  getFeaturedArticles as fallbackGetFeatured,
  getBreakingArticles as fallbackGetBreaking,
  getMostRead as fallbackGetMostRead,
  getLatestArticles as fallbackGetLatest,
  searchArticles as fallbackSearch,
} from '@/data/articles';
import { authors as fallbackAuthors, getAuthorBySlug as fallbackGetAuthor } from '@/data/authors';

const WP_API = process.env.WORDPRESS_API_URL || '';
const PER_PAGE = 6;

async function wpFetch(path: string) {
  if (!WP_API) return null;
  try {
    const res = await fetch(`${WP_API}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function wpPostToArticle(post: Record<string, unknown>): Article {
  const acf = (post.acf as Record<string, unknown>) || {};
  const embedded = (post._embedded as Record<string, unknown>) || {};
  const featuredMedia = (embedded['wp:featuredmedia'] as unknown[])?.[0] as Record<string, unknown> | undefined;
  const authorData = (embedded['author'] as unknown[])?.[0] as Record<string, unknown> | undefined;
  const terms = (embedded['wp:term'] as unknown[][]) || [];
  const categories = (terms[0] || []) as Array<Record<string, unknown>>;
  const firstCat = categories[0] as Record<string, unknown> | undefined;

  return {
    id: String(post.id),
    slug: String(post.slug),
    title: decodeHtml(String((post.title as Record<string,string>)?.rendered || '')),
    excerpt: stripHtml(String((post.excerpt as Record<string,string>)?.rendered || '')),
    content: String((post.content as Record<string,string>)?.rendered || ''),
    category: {
      name: String(firstCat?.name || 'Geral'),
      slug: String(firstCat?.slug || 'geral'),
      color: '#00C8E8',
    },
    author: {
      id: String(authorData?.id || '1'),
      name: String(authorData?.name || 'Redação'),
      slug: String(authorData?.slug || 'redacao'),
      avatar: String((authorData?.['avatar_urls'] as Record<string,string>)?.[96] || ''),
    },
    publishedAt: String(post.date),
    updatedAt: String(post.modified),
    readTime: Number(acf.read_time) || 3,
    imageUrl: String((featuredMedia?.source_url) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80'),
    imageAlt: String((featuredMedia?.alt_text) || String((post.title as Record<string,string>)?.rendered || '')),
    tags: String(acf.tags_custom || '').split(',').map((t: string) => t.trim()).filter(Boolean),
    featured: Boolean(acf.featured),
    breaking: Boolean(acf.breaking),
    views: Number(acf.views) || 0,
  };
}

function wpUserToAuthor(user: Record<string, unknown>): Author {
  const acf = (user.acf as Record<string, unknown>) || {};
  const avatarUrls = (user.avatar_urls as Record<string, string>) || {};
  const avatar = avatarUrls['96'] || avatarUrls['48'] || '';

  const rawAreas = acf.areas;
  const areas: string[] = Array.isArray(rawAreas)
    ? rawAreas.map(String)
    : typeof rawAreas === 'string' && rawAreas
    ? rawAreas.split(',').map((a: string) => a.trim()).filter(Boolean)
    : [];

  const rawSocial = (acf.social as Record<string, string>) || {};

  return {
    id: String(user.id),
    name: String(user.name || ''),
    slug: String(user.slug || ''),
    role: String(acf.role || 'Repórter'),
    bio: String(user.description || acf.bio || ''),
    bioLong: acf.bio_long ? String(acf.bio_long) : undefined,
    avatar,
    social: {
      twitter: rawSocial.twitter || undefined,
      instagram: rawSocial.instagram || undefined,
      linkedin: rawSocial.linkedin || undefined,
      facebook: rawSocial.facebook || undefined,
      youtube: rawSocial.youtube || undefined,
      email: rawSocial.email || (user.email ? String(user.email) : undefined),
    },
    areas,
    since: String(acf.since || new Date().getFullYear()),
    articleCount: Number(acf.article_count) || undefined,
  };
}

function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/<[^>]+>/g, '');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getAllArticles(page = 1): Promise<PaginatedResult<Article>> {
  const data = await wpFetch(
    `/posts?_embed&per_page=${PER_PAGE}&page=${page}&orderby=date&order=desc`,
  );
  if (!data) {
    const items = fallbackArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    return { items, total: fallbackArticles.length, page, perPage: PER_PAGE, totalPages: Math.ceil(fallbackArticles.length / PER_PAGE) };
  }
  return {
    items: (data as Record<string, unknown>[]).map(wpPostToArticle),
    total: fallbackArticles.length,
    page,
    perPage: PER_PAGE,
    totalPages: Math.ceil(fallbackArticles.length / PER_PAGE),
  };
}

export async function getLatestArticles(n = 6): Promise<Article[]> {
  const data = await wpFetch(`/posts?_embed&per_page=${n}&orderby=date&order=desc`);
  if (!data) return fallbackGetLatest(n);
  return (data as Record<string, unknown>[]).map(wpPostToArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const data = await wpFetch(`/posts?_embed&per_page=6&acf[featured]=true`);
  if (!data) return fallbackGetFeatured();
  const items = (data as Record<string, unknown>[]).map(wpPostToArticle);
  return items.length ? items : fallbackGetFeatured();
}

export async function getBreakingArticles(): Promise<Article[]> {
  const data = await wpFetch(`/posts?_embed&per_page=10&acf[breaking]=true`);
  if (!data) return fallbackGetBreaking();
  const items = (data as Record<string, unknown>[]).map(wpPostToArticle);
  return items.length ? items : fallbackGetBreaking();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await wpFetch(`/posts?_embed&slug=${slug}`);
  if (!data || !(data as unknown[]).length) return fallbackGetBySlug(slug) || null;
  return wpPostToArticle((data as Record<string, unknown>[])[0]);
}

export async function getArticlesByCategory(categorySlug: string, page = 1): Promise<PaginatedResult<Article>> {
  const catData = await wpFetch(`/categories?slug=${categorySlug}`);
  if (!catData || !(catData as unknown[]).length) {
    const items = fallbackGetByCategory(categorySlug);
    return { items, total: items.length, page: 1, perPage: PER_PAGE, totalPages: Math.ceil(items.length / PER_PAGE) };
  }
  const catId = (catData as Array<{id: number}>)[0].id;
  const data = await wpFetch(`/posts?_embed&categories=${catId}&per_page=${PER_PAGE}&page=${page}`);
  if (!data) {
    const items = fallbackGetByCategory(categorySlug);
    return { items, total: items.length, page: 1, perPage: PER_PAGE, totalPages: Math.ceil(items.length / PER_PAGE) };
  }
  const items = (data as Record<string, unknown>[]).map(wpPostToArticle);
  return { items, total: items.length * 3, page, perPage: PER_PAGE, totalPages: 3 };
}

export async function getArticlesByAuthor(authorSlug: string, page = 1): Promise<PaginatedResult<Article>> {
  const authorData = await wpFetch(`/users?slug=${authorSlug}`);
  if (!authorData || !(authorData as unknown[]).length) {
    const items = fallbackGetByAuthor(authorSlug);
    return { items, total: items.length, page: 1, perPage: PER_PAGE, totalPages: Math.ceil(items.length / PER_PAGE) };
  }
  const authorId = (authorData as Array<{id: number}>)[0].id;
  const data = await wpFetch(`/posts?_embed&author=${authorId}&per_page=${PER_PAGE}&page=${page}`);
  if (!data) {
    const items = fallbackGetByAuthor(authorSlug);
    return { items, total: items.length, page: 1, perPage: PER_PAGE, totalPages: Math.ceil(items.length / PER_PAGE) };
  }
  const items = (data as Record<string, unknown>[]).map(wpPostToArticle);
  return { items, total: items.length * 2, page, perPage: PER_PAGE, totalPages: 2 };
}

export async function getMostRead(n = 5): Promise<Article[]> {
  return fallbackGetMostRead(n);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const data = await wpFetch(`/posts?_embed&search=${encodeURIComponent(query)}&per_page=12`);
  if (!data) return fallbackSearch(query);
  const items = (data as Record<string, unknown>[]).map(wpPostToArticle);
  return items.length ? items : fallbackSearch(query);
}

export async function getAllSlugs(): Promise<string[]> {
  const data = await wpFetch(`/posts?per_page=100&fields=slug`);
  if (!data) return fallbackArticles.map((a) => a.slug);
  return (data as Array<{slug: string}>).map((p) => p.slug);
}

export async function getAllAuthors(): Promise<Author[]> {
  const data = await wpFetch(`/users?_embed&per_page=100&context=view`);
  if (!data || !(data as unknown[]).length) return fallbackAuthors;
  const items = (data as Record<string, unknown>[]).map(wpUserToAuthor);
  return items.length ? items : fallbackAuthors;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const data = await wpFetch(`/users?slug=${slug}&_embed&context=view`);
  if (!data || !(data as unknown[]).length) return fallbackGetAuthor(slug) || null;
  return wpUserToAuthor((data as Record<string, unknown>[])[0]);
}
