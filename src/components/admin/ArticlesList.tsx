"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCMS } from "@/contexts/CMSContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const PER_PAGE = 10;

export function ArticlesList() {
  const { articles, categories, deleteArticle } = useCMS();
  const { currentUser, hasPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [page, setPage] = useState(1);

  // Authors see only their own articles; editors/admins see all
  const viewAll = hasPermission("articles.view_all");
  const canEditAll = hasPermission("articles.edit_all");
  const canDeleteAll = hasPermission("articles.delete_all");

  const filtered = useMemo(() => {
    let list = [...articles];

    // Restrict to own articles when user doesn't have view_all
    if (!viewAll && currentUser?.authorId) {
      list = list.filter((a) => a.author.id === currentUser.authorId);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (categoryFilter) {
      list = list.filter((a) => a.category.slug === categoryFilter);
    }

    if (sortOrder === "recent") {
      list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    } else if (sortOrder === "oldest") {
      list.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      );
    } else if (sortOrder === "views") {
      list.sort((a, b) => b.views - a.views);
    }

    return list;
  }, [articles, search, categoryFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Excluir o artigo "${title}"? Esta ação não pode ser desfeita.`)) {
      deleteArticle(id);
    }
  };

  return (
    <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="p-6 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar artigos, autores, tags..."
            className="flex-1 min-w-48 px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
          />
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
            className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
          >
            <option value="recent">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
            <option value="views">Mais visualizados</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-elevated">
            <tr>
              {["Título", "Categoria", "Autor", "Status", "Visualizações", "Data", "Ações"].map(
                (h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 font-mono text-[10px] tracking-widest uppercase text-text-muted ${h === "Ações" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-text-muted font-body text-sm">
                  Nenhum artigo encontrado.
                </td>
              </tr>
            ) : (
              paginated.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-white/5 hover:bg-elevated/50 transition-colors"
                >
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded bg-elevated flex items-center justify-center text-sm shrink-0">
                        {article.category.icon ?? "📄"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-body font-medium text-text-primary line-clamp-1">
                          {article.title}
                        </div>
                        <div className="font-mono text-[10px] text-text-muted truncate">
                          /{article.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-body text-sm text-text-secondary">
                      {article.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-body text-sm text-text-secondary">
                      {article.author.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {article.featured && (
                        <span className="px-2 py-0.5 bg-amber-news/20 text-amber-news font-mono text-[9px] rounded">
                          Destaque
                        </span>
                      )}
                      {article.breaking && (
                        <span className="px-2 py-0.5 bg-red-news/20 text-red-news font-mono text-[9px] rounded">
                          Urgente
                        </span>
                      )}
                      {!article.featured && !article.breaking && (
                        <span className="px-2 py-0.5 bg-green-live/20 text-green-live font-mono text-[9px] rounded">
                          Normal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm text-text-secondary">
                      {article.views.toLocaleString("pt-BR")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-body text-sm text-text-secondary">
                      {formatDistanceToNow(new Date(article.publishedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/noticias/${article.slug}`}
                        target="_blank"
                        className="p-2 text-text-muted hover:text-cyan transition-colors"
                        title="Ver no site"
                      >
                        👁️
                      </Link>
                      {/* Edit: allowed if owns article OR has edit_all */}
                      {(canEditAll || article.author.id === currentUser?.authorId) && (
                        <Link
                          href={`/admin/artigos/novo?edit=${article.id}`}
                          className="p-2 text-text-muted hover:text-cyan transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </Link>
                      )}
                      {/* Delete: allowed if owns article OR has delete_all */}
                      {(canDeleteAll || article.author.id === currentUser?.authorId) && (
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="p-2 text-text-muted hover:text-red-news transition-colors"
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-white/5 flex items-center justify-between">
        <div className="font-body text-sm text-text-muted">
          {filtered.length === 0
            ? "Nenhum artigo"
            : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, filtered.length)} de ${filtered.length} artigo${filtered.length !== 1 ? "s" : ""}`}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 bg-elevated border border-white/5 rounded font-body text-sm text-text-muted hover:text-text-primary transition-colors disabled:opacity-40"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .map((p, idx, arr) => (
              <>
                {idx > 0 && arr[idx - 1] !== p - 1 && (
                  <span key={`ellipsis-${p}`} className="px-2 py-1.5 text-text-muted text-sm">…</span>
                )}
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded font-mono text-sm transition-colors ${
                    p === page
                      ? "bg-cyan text-black font-semibold"
                      : "bg-elevated border border-white/5 text-text-muted hover:text-text-primary"
                  }`}
                >
                  {p}
                </button>
              </>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 bg-elevated border border-white/5 rounded font-body text-sm text-text-muted hover:text-text-primary transition-colors disabled:opacity-40"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
