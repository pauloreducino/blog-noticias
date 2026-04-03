import type { Metadata } from 'next';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { HomeDynamic } from '@/components/home/HomeDynamic';
import { Sidebar } from '@/components/ui/Sidebar';
import { AdBanner } from '@/components/ui/AdBanner';
import {
  getFeaturedArticles,
  getLatestArticles,
  getMostRead,
} from '@/lib/wordpress';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${SITE_NAME} | Portal de Notícias do Maranhão`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default async function HomePage() {
  const [featured, latest, mostRead] = await Promise.all([
    getFeaturedArticles(),
    getLatestArticles(9),
    getMostRead(5),
  ]);

  return (
    <>
      {/* Hero + Latest + Most Read — merged with CMS articles client-side */}
      <HomeDynamic
        staticFeatured={featured}
        staticLatest={latest}
        staticMostRead={mostRead}
      />

      {/* Ad leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner size="leaderboard" />
      </div>

      {/* Categories grid */}
      <CategoriesGrid />

      {/* Sidebar with most read */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 lg:col-start-3">
            <Sidebar mostRead={mostRead} />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBanner />
    </>
  );
}
