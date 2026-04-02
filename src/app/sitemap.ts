import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/wordpress';
import { categories } from '@/data/categories';
import { authors } from '@/data/authors';
import { SITE_URL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const articles: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/noticias/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }));

  const authorPages: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${SITE_URL}/autor/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    { url: `${SITE_URL}/noticias`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/busca`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.3 },
    ...articles,
    ...categoryPages,
    ...authorPages,
  ];
}
