import { articles } from '@/data/articles';
import { categories } from '@/data/categories';
import { authors } from '@/data/authors';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ArticlesList() {
  return (
    <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar artigos..."
            className="flex-1 px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
          />
          <select className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary outline-none focus:border-cyan/30 cursor-pointer">
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary outline-none focus:border-cyan/30 cursor-pointer">
            <option value="recent">Mais recentes</option>
            <option value="views">Mais visualizados</option>
            <option value="oldest">Mais antigos</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-elevated">
            <tr>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Título
              </th>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Categoria
              </th>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Autor
              </th>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Status
              </th>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Visualizações
              </th>
              <th className="px-6 py-4 text-left font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Data
              </th>
              <th className="px-6 py-4 text-right font-mono text-[10px] tracking-widest uppercase text-text-muted">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              const category = categories.find(c => c.slug === article.category.slug);
              const author = authors.find(a => a.id === article.author.id);

              return (
                <tr key={article.id} className="border-b border-white/5 hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-elevated flex items-center justify-center text-cyan text-sm">
                        {category?.icon}
                      </div>
                      <div>
                        <div className="font-body font-medium text-text-primary line-clamp-2">
                          {article.title}
                        </div>
                        <div className="font-mono text-[10px] text-text-muted">
                          {article.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-text-secondary">
                      {category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-text-secondary">
                      {author?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {article.featured && (
                        <span className="px-2 py-1 bg-amber-news/20 text-amber-news font-mono text-[9px] rounded">
                          Destaque
                        </span>
                      )}
                      {article.breaking && (
                        <span className="px-2 py-1 bg-red-news/20 text-red-news font-mono text-[9px] rounded">
                          Urgente
                        </span>
                      )}
                      {!article.featured && !article.breaking && (
                        <span className="px-2 py-1 bg-green-live/20 text-green-live font-mono text-[9px] rounded">
                          Normal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-text-secondary">
                      {article.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-text-secondary">
                      {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: ptBR })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-muted hover:text-cyan transition-colors">
                        👁️
                      </button>
                      <button className="p-2 text-text-muted hover:text-cyan transition-colors">
                        ✏️
                      </button>
                      <button className="p-2 text-text-muted hover:text-red-news transition-colors">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-white/5 flex items-center justify-between">
        <div className="font-body text-sm text-text-muted">
          Mostrando 1-10 de {articles.length} artigos
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-elevated border border-white/5 rounded font-body text-sm text-text-muted hover:text-text-primary transition-colors">
            Anterior
          </button>
          <button className="px-3 py-2 bg-cyan text-base font-mono font-semibold rounded">
            1
          </button>
          <button className="px-3 py-2 bg-elevated border border-white/5 rounded font-body text-sm text-text-muted hover:text-text-primary transition-colors">
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
