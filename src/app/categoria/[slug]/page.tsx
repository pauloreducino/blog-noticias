import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArticleCard } from '@/components/listing/ArticleCard';
import { Pagination } from '@/components/listing/Pagination';
import { Sidebar } from '@/components/ui/Sidebar';
import { getArticlesByCategory, getMostRead } from '@/lib/wordpress';
import { getCategoryBySlug, categories } from '@/data/categories';
import { SITE_NAME } from '@/lib/utils';

export const revalidate = 60;

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Não encontrado' };
  return {
    title: `${category.name} | ${SITE_NAME}`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const page = Number(searchParams.page || '1');
  const [{ items, total, totalPages }, mostRead] = await Promise.all([
    getArticlesByCategory(params.slug, page),
    getMostRead(5),
  ]);

  return (
    <div>
      {/* Category hero */}
      <div
        className="relative border-b border-white/5 py-14"
        style={{ background: `linear-gradient(135deg, ${category.color}08 0%, transparent 60%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: category.color + '15', border: `1px solid ${category.color}30` }}
            >
              {category.icon}
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1">Editoria</p>
              <h1
                className="font-headline font-bold text-4xl"
                style={{ color: category.color }}
              >
                {category.name}
              </h1>
            </div>
          </div>
          <p className="font-body text-text-muted mt-4 max-w-2xl leading-relaxed">{category.description}</p>
          <p className="font-mono text-[10px] text-text-muted mt-2">{total} artigos publicados</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="text-center py-20 text-text-muted font-body">
                Nenhum artigo nesta categoria ainda.
              </div>
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
