"use client";

import { useCMS } from "@/contexts/CMSContext";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  formatDate,
  formatRelative,
  getReadingTimeLabel,
  SITE_URL,
  generateToc,
} from "@/lib/utils";
import { ArticleShareBar } from "./ArticleShareBar";
import { ArticleAuthorCard } from "./ArticleAuthorCard";

export function CMSArticlePage({ slug }: { slug: string }) {
  const { articles } = useCMS();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const { toc, modifiedHtml } = generateToc(article.content);
  const articleUrl = `${SITE_URL}/noticias/${article.slug}`;

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden bg-elevated">
        {article.imageUrl && (
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={() => {}}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base/99 via-base/80 to-black/50" />

        {/* Breadcrumb */}
        <nav className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 font-mono text-[10px] text-white/50">
            <li><Link href="/" className="hover:text-white/80 transition-colors">Início</Link></li>
            <li><span>/</span></li>
            <li><Link href="/noticias" className="hover:text-white/80 transition-colors">Notícias</Link></li>
            <li><span>/</span></li>
            <li>
              <Link href={`/categoria/${article.category.slug}`} className="hover:text-white/80 transition-colors">
                {article.category.name}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <span
            className="font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded border mb-3 inline-block"
            style={{
              color: article.category.color,
              borderColor: article.category.color + "60",
              backgroundColor: article.category.color + "15",
            }}
          >
            {article.category.name}
          </span>
          {article.breaking && (
            <span className="ml-2 inline-flex items-center gap-1.5 bg-red-news px-2 py-1 rounded font-mono text-[10px] font-bold text-white tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-pulse" />
              Urgente
            </span>
          )}
          <h1 className="font-headline font-bold text-text-primary text-2xl sm:text-4xl leading-tight mt-2 max-w-3xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/5 mb-8">
              <Link href={`/autor/${article.author.slug}`} className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-elevated border border-white/10 shrink-0">
                  {article.author.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      onError={() => {}}
                    />
                  )}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-text-secondary group-hover:text-cyan transition-colors">
                    {article.author.name}
                  </p>
                  {article.author.role && (
                    <p className="font-mono text-[10px] text-text-muted">{article.author.role}</p>
                  )}
                </div>
              </Link>
              <div className="flex items-center gap-3 font-mono text-[11px] text-text-muted ml-auto">
                <time dateTime={article.publishedAt} title={formatDate(article.publishedAt)}>
                  {formatRelative(article.publishedAt)}
                </time>
                <span className="opacity-30">·</span>
                <span>{getReadingTimeLabel(article.readTime)}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-8 font-medium border-l-2 border-cyan pl-4">
              {article.excerpt}
            </p>

            {/* Share */}
            <ArticleShareBar url={articleUrl} title={article.title} />

            {/* TOC */}
            {toc.length > 0 && (
              <div className="mt-8 p-6 bg-elevated border border-white/5 rounded-lg">
                <h2 className="font-headline font-semibold text-text-primary text-lg mb-4">Sumário</h2>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}>
                        <a href={`#${item.id}`} className="font-body text-sm text-text-secondary hover:text-cyan transition-colors">
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Body */}
            <div
              className="article-prose mt-8"
              dangerouslySetInnerHTML={{ __html: modifiedHtml }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-white/5">
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-elevated border border-white/8 font-mono text-[11px] text-text-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ArticleAuthorCard author={article.author} />
          </div>

          {/* Sidebar placeholder */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface border border-white/5 rounded-xl p-5">
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">
                  Mais lidas
                </p>
                <p className="font-body text-sm text-text-muted">
                  Carregando artigos...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
