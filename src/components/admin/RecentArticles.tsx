import Link from 'next/link';
import { articles } from '@/data/articles';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function RecentArticles() {
  const recentArticles = articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-surface border border-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline font-bold text-xl text-text-primary">
          Artigos Recentes
        </h2>
        <Link
          href="/admin/artigos"
          className="font-mono text-[11px] text-cyan hover:underline"
        >
          Ver todos →
        </Link>
      </div>

      <div className="space-y-4">
        {recentArticles.map((article) => (
          <div key={article.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-elevated transition-colors">
            <div className="w-12 h-12 rounded-lg bg-elevated flex items-center justify-center text-cyan text-lg">
              {article.category.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-text-primary truncate mb-1">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span>{article.author.name}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: ptBR })}</span>
                <span>•</span>
                <span>{article.views} visualizações</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-text-muted hover:text-cyan transition-colors">
                ✏️
              </button>
              <button className="p-2 text-text-muted hover:text-red-news transition-colors">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
