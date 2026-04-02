import type { Metadata } from 'next';
import { HeroMagazine } from '@/components/home/HeroMagazine';
import { LatestSection } from '@/components/home/LatestSection';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { MostReadSection } from '@/components/home/MostReadSection';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
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

  const heroLatest = latest.slice(0, 4);
  const sectionLatest = latest.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <HeroMagazine featured={featured} latest={heroLatest} />

      {/* Ad leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner size="leaderboard" />
      </div>

      {/* Categories grid */}
      <CategoriesGrid />

      {/* Latest + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LatestSection articles={sectionLatest} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar mostRead={mostRead} />
          </div>
        </div>
      </div>

      {/* Most Read full section */}
      <div className="bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MostReadSection articles={mostRead} />
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBanner />
    </>
  );
}
