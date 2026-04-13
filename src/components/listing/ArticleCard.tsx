import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/types';
import { formatRelative, getReadingTimeLabel } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  size?: 'default' | 'featured' | 'mini';
}

function ArticleCardBase({ article, size = 'default' }: ArticleCardProps) {
  if (size === 'mini') {
    return (
      <Link href={`/noticias/${article.slug}`} className="flex gap-3 group">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-elevated">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-body text-sm font-medium text-text-secondary group-hover:text-cyan transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>
          <p className="font-mono text-[10px] text-text-muted mt-1">{formatRelative(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (size === 'featured') {
    return (
      <Link
        href={`/noticias/${article.slug}`}
        className="group relative block rounded-xl overflow-hidden bg-surface border border-white/5 hover:border-cyan/20 transition-all duration-300"
      >
        <div className="relative h-52 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/30 to-transparent" />
          {article.breaking && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1.5 bg-red-badge px-2 py-1 rounded font-mono text-[10px] font-bold text-white tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
                Ao Vivo
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <CategoryBadge name={article.category.name} slug={article.category.slug} color={article.category.color} />
          <h2 className="font-headline font-bold text-text-primary text-lg mt-2 mb-2 leading-snug group-hover:text-cyan transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="font-body text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
          <ArticleMeta article={article} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/noticias/${article.slug}`}
      className="group flex flex-col bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-cyan/20 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden shrink-0">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {article.breaking && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-red-badge px-2 py-0.5 rounded font-mono text-[9px] font-bold text-white tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
            Ao Vivo
          </span>
        )}
        {/* Read time pill — top right */}
        <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono text-[9px] text-white/80">
          <svg className="w-2.5 h-2.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          {getReadingTimeLabel(article.readTime)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + title */}
        <div>
          <span
            className="inline-block font-mono text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded border mb-2"
            style={{ color: article.category.color, borderColor: article.category.color + '50', backgroundColor: article.category.color + '12' }}
          >
            {article.category.name}
          </span>
          <h2 className="font-headline font-bold text-text-primary text-base leading-snug group-hover:text-cyan transition-colors line-clamp-2">
            {article.title}
          </h2>
        </div>

        {/* Excerpt */}
        <p className="font-body text-sm text-text-muted line-clamp-2 leading-relaxed flex-1">
          {article.excerpt}
        </p>

        {/* Meta — author left, time right */}
        <ArticleMeta article={article} />
      </div>
    </Link>
  );
}

export function CategoryBadge({ name, slug, color }: { name: string; slug: string; color: string }) {
  return (
    <Link
      href={`/categoria/${slug}`}
      onClick={(e) => e.stopPropagation()}
      className="inline-block font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border transition-colors hover:opacity-80"
      style={{ color, borderColor: color + '60', backgroundColor: color + '15' }}
    >
      {name}
    </Link>
  );
}

export function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5 font-mono text-[10px] text-text-muted">
      {/* Author — truncates gracefully */}
      <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
        <div className="relative w-5 h-5 rounded-full overflow-hidden bg-elevated shrink-0">
          <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" sizes="20px" />
        </div>
        <span className="truncate">{article.author.name}</span>
      </div>
      {/* Time — never cut off */}
      <time dateTime={article.publishedAt} className="shrink-0 text-white/40">
        {formatRelative(article.publishedAt)}
      </time>
    </div>
  );
}

export const ArticleCard = memo(ArticleCardBase);
