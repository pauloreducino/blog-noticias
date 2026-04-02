import Link from 'next/link';
import { ArticleCard } from '@/components/listing/ArticleCard';
import type { Article } from '@/types';

interface LatestSectionProps {
  articles: Article[];
}

export function LatestSection({ articles }: LatestSectionProps) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Últimas notícias">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 bg-cyan rounded-full" />
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-cyan">Últimas</p>
            <h2 className="font-headline font-bold text-text-primary text-2xl -mt-0.5">Horas</h2>
          </div>
        </div>
        <Link
          href="/noticias"
          className="font-mono text-[11px] text-text-muted hover:text-cyan transition-colors tracking-wider"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 6).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
