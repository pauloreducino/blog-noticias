import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/listing/ArticleCard';
import { Sidebar } from '@/components/ui/Sidebar';
import { searchArticles, getMostRead } from '@/lib/wordpress';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Busca | ${SITE_NAME}`,
  description: `Busque notícias de São Luís e do Maranhão em ${SITE_NAME}.`,
};

interface Props {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() || '';
  const [results, mostRead] = await Promise.all([
    query ? searchArticles(query) : Promise.resolve([]),
    getMostRead(5),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search header */}
      <div className="mb-8">
        <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">Busca</p>
        <h1 className="font-headline font-bold text-text-primary text-3xl mb-6">
          {query ? `Resultados para "${query}"` : 'Buscar notícias'}
        </h1>

        {/* Search form */}
        <form action="/busca" method="get" className="flex gap-3 max-w-xl">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Buscar em São Luís em Foco..."
            className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/50 transition-colors"
          />
          <button
            type="submit"
            className="bg-cyan text-base font-headline font-bold px-5 py-3 rounded-xl hover:bg-cyan/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
        </form>

        {query && (
          <p className="font-mono text-[11px] text-text-muted mt-3">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!query ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-body text-text-muted">Digite algo para buscar notícias.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="font-headline font-bold text-text-primary text-xl mb-2">
                Nenhum resultado para &ldquo;{query}&rdquo;
              </h2>
              <p className="font-body text-text-muted mb-6">Tente palavras-chave diferentes ou navegue por categorias.</p>
              <Link
                href="/noticias"
                className="inline-block bg-surface border border-white/10 hover:border-cyan/30 text-text-secondary hover:text-text-primary font-body text-sm px-4 py-2 rounded-lg transition-all"
              >
                Ver todas as notícias
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Sidebar mostRead={mostRead} />
        </div>
      </div>
    </div>
  );
}
