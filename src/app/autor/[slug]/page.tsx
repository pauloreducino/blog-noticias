import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAuthorBySlug, getArticlesByAuthor, getMostRead, getAllAuthors } from '@/lib/wordpress';
import { ArticleCard } from '@/components/listing/ArticleCard';
import { Pagination } from '@/components/listing/Pagination';
import { Sidebar } from '@/components/ui/Sidebar';
import { SITE_NAME } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return { title: 'Não encontrado' };
  return {
    title: `${author.name} | ${SITE_NAME}`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const page = Number(searchParams.page || '1');
  const [author, { items, total, totalPages }, mostRead] = await Promise.all([
    getAuthorBySlug(params.slug),
    getArticlesByAuthor(params.slug, page),
    getMostRead(5),
  ]);

  if (!author) notFound();

  const socialLinks = [
    { key: 'twitter', label: 'Twitter/X', href: author.social.twitter, icon: '𝕏' },
    { key: 'instagram', label: 'Instagram', href: author.social.instagram, icon: '📸' },
    { key: 'linkedin', label: 'LinkedIn', href: author.social.linkedin, icon: 'in' },
    { key: 'facebook', label: 'Facebook', href: author.social.facebook, icon: '📘' },
    { key: 'youtube', label: 'YouTube', href: author.social.youtube, icon: '▶' },
    { key: 'email', label: 'E-mail', href: author.social.email ? `mailto:${author.social.email}` : undefined, icon: '✉' },
  ].filter((s) => s.href);

  return (
    <div>
      {/* Author hero */}
      <div className="bg-surface border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-cyan/30 shrink-0 shadow-lg shadow-cyan/10">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                sizes="112px"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">Jornalista</p>
              <h1 className="font-headline font-bold text-text-primary text-3xl sm:text-4xl mb-1">{author.name}</h1>
              <p className="font-mono text-sm text-text-muted mb-3">{author.role}</p>
              <p className="font-body text-text-secondary leading-relaxed max-w-2xl mb-4">{author.bio}</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-4">
                {[
                  { label: 'Artigos', value: author.articleCount || total },
                  { label: 'Áreas', value: author.areas.length },
                  { label: 'Desde', value: author.since },
                ].map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <p className="font-headline font-bold text-xl text-cyan">{stat.value}</p>
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Areas */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {author.areas.map((area) => (
                  <span key={area} className="px-3 py-1 rounded-full bg-elevated border border-white/8 font-mono text-[10px] text-text-muted">
                    {area}
                  </span>
                ))}
              </div>

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.key}
                      href={s.href!}
                      target={s.key !== 'email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-elevated border border-white/8 hover:border-cyan/30 font-mono text-[11px] text-text-muted hover:text-text-primary transition-all"
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-6 bg-cyan rounded-full" />
              <h2 className="font-headline font-bold text-text-primary text-2xl">
                Artigos de {author.name.split(' ')[0]}
              </h2>
              <span className="font-mono text-[11px] text-text-muted ml-2">({total})</span>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-20 text-text-muted font-body">Nenhum artigo publicado ainda.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {items.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                <Suspense>
                  <Pagination currentPage={page} totalPages={totalPages} />
                </Suspense>
              </>
            )}
          </div>
          <div className="lg:col-span-1">
            <Sidebar mostRead={mostRead} />
          </div>
        </div>
      </div>
    </div>
  );
}
