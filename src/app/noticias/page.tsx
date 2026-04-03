import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ArticleCard } from '@/components/listing/ArticleCard';
import { Pagination } from '@/components/listing/Pagination';
import { CategoryPills } from '@/components/listing/CategoryPills';
import { Sidebar } from '@/components/ui/Sidebar';
import { getAllArticles, getMostRead } from '@/lib/wordpress';
import { SITE_NAME } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Todas as Notícias | ${SITE_NAME}`,
  description: `Acompanhe todas as notícias de São Luís e do Maranhão em ${SITE_NAME}.`,
};

interface Props {
  searchParams: { page?: string };
}

export default async function NoticiasPage({ searchParams }: Props) {
  const page = Number(searchParams.page || '1');
  const [{ items, total, totalPages }, mostRead] = await Promise.all([
    getAllArticles(page),
    getMostRead(5),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">Portal</p>
        <h1 className="font-headline font-bold text-text-primary text-3xl sm:text-4xl mb-4">
          Todas as Notícias
        </h1>
        <p className="font-mono text-[11px] text-text-muted mb-6">
          {total} artigos publicados
        </p>
        <Suspense>
          <CategoryPills />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles grid */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="text-center py-20 text-text-muted font-body">
              Nenhum artigo encontrado.
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

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar mostRead={mostRead} />
        </div>
      </div>
    </div>
  );
}
