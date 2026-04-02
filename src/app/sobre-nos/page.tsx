import type { Metadata } from 'next';
import { HeroAbout } from '@/components/about/HeroAbout';
import { AboutContent } from '@/components/about/AboutContent';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Sobre Nós | ${SITE_NAME}`,
  description:
    'Conheça a história de São Luís em Foco, um portal de notícias comprometido com jornalismo de qualidade no Maranhão.',
  openGraph: {
    title: `Sobre Nós | ${SITE_NAME}`,
    description:
      'Conheça a história de São Luís em Foco e nossa missão de informar São Luís.',
    url: '/sobre-nos',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-base min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroAbout />
      </section>

      {/* Content */}
      <AboutContent />
    </div>
  );
}
