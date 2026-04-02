import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { formatRelative, getReadingTimeLabel } from '@/lib/utils';

interface HeroMagazineProps {
  featured: Article[];
  latest: Article[];
}

export function HeroMagazine({ featured, latest }: HeroMagazineProps) {
  const main = featured[0] || latest[0];
  const secondary = (featured.length > 1 ? featured.slice(1, 4) : latest.slice(1, 4));

  if (!main) return null;

  return (
    <section className="grid-pattern relative" aria-label="Destaques principais">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 min-h-[480px]">

          {/* Main featured article */}
          <Link
            href={`/noticias/${main.slug}`}
            className="lg:col-span-3 relative group rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-cyan/20 transition-all duration-500"
          >
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
              <Image
                src={main.imageUrl}
                alt={main.imageAlt}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base/98 via-base/50 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded border"
                    style={{
                      color: main.category.color,
                      borderColor: main.category.color + '60',
                      backgroundColor: main.category.color + '15',
                    }}
                  >
                    {main.category.name}
                  </span>
                  {main.breaking && (
                    <span className="inline-flex items-center gap-1.5 bg-red-news/90 px-2 py-1 rounded font-mono text-[10px] font-bold text-white tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                      Ao Vivo
                    </span>
                  )}
                </div>
                <h1 className="font-headline font-bold text-text-primary text-2xl sm:text-3xl leading-tight mb-3 tracking-tight group-hover:text-cyan transition-colors duration-300">
                  {main.title}
                </h1>
                <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2 max-w-xl">
                  {main.excerpt}
                </p>
                <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-elevated shrink-0">
                    <Image
                      src={main.author.avatar}
                      alt={main.author.name}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </div>
                  <span>{main.author.name}</span>
                  <span className="opacity-30">·</span>
                  <time dateTime={main.publishedAt}>{formatRelative(main.publishedAt)}</time>
                  <span className="opacity-30">·</span>
                  <span>{getReadingTimeLabel(main.readTime)}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary articles stack */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {secondary.map((article, idx) => (
              <Link
                key={article.id}
                href={`/noticias/${article.slug}`}
                className="relative group flex-1 rounded-xl overflow-hidden bg-surface border border-white/5 hover:border-cyan/20 transition-all duration-300 min-h-[120px]"
              >
                <div className="relative h-full min-h-[120px] overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span
                      className="font-mono text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border mb-1.5 inline-block"
                      style={{
                        color: article.category.color,
                        borderColor: article.category.color + '50',
                        backgroundColor: article.category.color + '15',
                      }}
                    >
                      {article.category.name}
                    </span>
                    {idx === secondary.length - 1 && (
                      <span className="ml-2 font-mono text-[9px] text-amber-news tracking-wider">🔥 TRENDING</span>
                    )}
                    <h2 className="font-headline font-semibold text-text-primary text-sm leading-snug group-hover:text-cyan transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="font-mono text-[10px] text-text-muted mt-1.5">{formatRelative(article.publishedAt)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
