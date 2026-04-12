import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { formatRelative } from '@/lib/utils';

export function MostReadSection({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Mais lidas">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 bg-red-news rounded-full" />
        <div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-red-news">Ranking</p>
          <h2 className="font-headline font-bold text-text-primary text-2xl -mt-0.5">Mais Lidos</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {articles.slice(0, 5).map((article, i) => (
          <Link
            key={article.id}
            href={`/noticias/${article.slug}`}
            className="group flex items-start gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-cyan/20 transition-all duration-300"
          >
            {/* Rank number */}
            <span className="font-headline font-bold text-3xl leading-none text-text-muted/20 shrink-0 w-10 text-right pt-1" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span
                className="font-mono text-[9px] font-semibold tracking-wider uppercase"
                style={{ color: article.category.color }}
              >
                {article.category.name}
              </span>
              <h3 className="font-headline font-semibold text-text-secondary group-hover:text-cyan transition-colors text-sm leading-snug mt-0.5 line-clamp-2">
                {article.title}
              </h3>
              <p className="font-mono text-[10px] text-text-muted mt-1.5">{formatRelative(article.publishedAt)}</p>
            </div>

            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-elevated">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="64px"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
