import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllSlugs, getMostRead } from "@/lib/wordpress";
import { Sidebar } from "@/components/ui/Sidebar";
import {
  formatDate,
  formatRelative,
  getReadingTimeLabel,
  SITE_NAME,
  SITE_URL,
  generateToc,
} from "@/lib/utils";
import { ArticleShareBar } from "@/components/article/ArticleShareBar";
import { ArticleAuthorCard } from "@/components/article/ArticleAuthorCard";
import { CMSArticlePage } from "@/components/article/CMSArticlePage";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Não encontrado" };

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${SITE_URL}/noticias/${article.slug}`,
      images: [{ url: article.imageUrl, alt: article.imageAlt }],
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const [article, mostRead] = await Promise.all([
    getArticleBySlug(params.slug),
    getMostRead(5),
  ]);

  // Article not in static data — may be a CMS article saved in localStorage
  if (!article) {
    return <CMSArticlePage slug={params.slug} />;
  }

  const { toc, modifiedHtml } = generateToc(article.content);

  const articleUrl = `${SITE_URL}/noticias/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: articleUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base/99 via-base/80 to-black/50" />

        {/* Breadcrumb over image */}
        <nav
          className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 font-mono text-[10px] text-white/50">
            <li>
              <Link href="/" className="hover:text-white/80 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link
                href="/noticias"
                className="hover:text-white/80 transition-colors"
              >
                Notícias
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link
                href={`/categoria/${article.category.slug}`}
                className="hover:text-white/80 transition-colors"
              >
                {article.category.name}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 bg-gradient-to-t from-black/60 to-transparent">
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
              Ao Vivo
            </span>
          )}
          <h1 className="font-headline font-bold text-text-primary text-2xl sm:text-4xl leading-tight mt-2 max-w-3xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article body */}
          <div className="lg:col-span-2">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/5 mb-8">
              <Link
                href={`/autor/${article.author.slug}`}
                className="flex items-center gap-2 group"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-elevated border border-white/10 shrink-0">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-text-secondary group-hover:text-cyan transition-colors">
                    {article.author.name}
                  </p>
                  {article.author.role && (
                    <p className="font-mono text-[10px] text-text-muted">
                      {article.author.role}
                    </p>
                  )}
                </div>
              </Link>
              <div className="flex items-center gap-3 font-mono text-[11px] text-text-muted ml-auto">
                <time
                  dateTime={article.publishedAt}
                  title={formatDate(article.publishedAt)}
                >
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

            {/* Share bar */}
            <ArticleShareBar url={articleUrl} title={article.title} />

            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="mt-8 p-6 bg-elevated border border-white/5 rounded-lg">
                <h2 className="font-headline font-semibold text-text-primary text-lg mb-4">
                  Sumário
                </h2>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                      >
                        <a
                          href={`#${item.id}`}
                          className="font-body text-sm text-text-secondary hover:text-cyan transition-colors"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Body content */}
            <div
              className="article-prose mt-8"
              dangerouslySetInnerHTML={{ __html: modifiedHtml }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-white/5">
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-elevated border border-white/8 font-mono text-[11px] text-text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author card */}
            <ArticleAuthorCard author={article.author} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar mostRead={mostRead} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
