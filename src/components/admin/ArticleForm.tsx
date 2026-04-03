"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCMS } from "@/contexts/CMSContext";
import { useAuth } from "@/contexts/AuthContext";

export function ArticleForm() {
  const { categories, authors, addArticle, updateArticle, getArticleById } = useCMS();
  const { currentUser, hasPermission } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  // If the current user is an author, lock the author field to their profile
  const lockedAuthorId = currentUser?.authorId ?? "";
  const canChooseAuthor = hasPermission("articles.edit_all") || !lockedAuthorId;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    authorId: lockedAuthorId,
    imageUrl: "",
    imageAlt: "",
    tags: "",
    featured: false,
    breaking: false,
    readTime: 5,
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load article data when editing
  useEffect(() => {
    if (editId) {
      const article = getArticleById(editId);
      if (article) {
        const matchedCategory = categories.find(
          (c) => c.slug === article.category.slug,
        );
        const matchedAuthor = authors.find((a) => a.id === article.author.id);
        setFormData({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          categoryId: matchedCategory?.id ?? "",
          authorId: matchedAuthor?.id ?? "",
          imageUrl: article.imageUrl,
          imageAlt: article.imageAlt,
          tags: article.tags.join(", "),
          featured: article.featured,
          breaking: article.breaking,
          readTime: article.readTime,
        });
      }
    }
  }, [editId, getArticleById, categories, authors]);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const selectedCategory = categories.find((c) => c.id === formData.categoryId);
    const selectedAuthor = authors.find((a) => a.id === formData.authorId);

    if (!selectedCategory || !selectedAuthor) {
      setError("Selecione uma categoria e um autor válidos.");
      return;
    }

    const articleData = {
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: {
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        color: selectedCategory.color,
        icon: selectedCategory.icon,
      },
      author: {
        id: selectedAuthor.id,
        name: selectedAuthor.name,
        slug: selectedAuthor.slug,
        avatar: selectedAuthor.avatar,
        role: selectedAuthor.role,
      },
      readTime: Number(formData.readTime),
      imageUrl: formData.imageUrl,
      imageAlt: formData.imageAlt,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.featured,
      breaking: formData.breaking,
    };

    if (editId) {
      updateArticle(editId, articleData);
    } else {
      addArticle(articleData);
    }

    setSaved(true);
    setTimeout(() => {
      router.push("/admin/artigos");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {saved && (
        <div className="px-4 py-3 bg-green-live/10 border border-green-live/20 rounded-lg">
          <p className="font-body text-sm text-green-live">
            {editId ? "Artigo atualizado" : "Artigo publicado"} com sucesso! Redirecionando...
          </p>
        </div>
      )}
      {error && (
        <div className="px-4 py-3 bg-red-news/10 border border-red-news/20 rounded-lg">
          <p className="font-body text-sm text-red-news">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Título do Artigo
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Digite o título da matéria..."
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Slug (URL) — gerado automaticamente
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="titulo-do-artigo"
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Resumo
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Breve resumo da matéria..."
              rows={3}
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25 resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Conteúdo (HTML)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="<p>Conteúdo da matéria...</p>"
              rows={18}
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25 resize-y"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="política, maranhão, são luís"
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Categoria
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25 cursor-pointer"
            >
              <option value="">Selecione uma categoria...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="authorId"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Autor
            </label>
            {canChooseAuthor ? (
              <select
                id="authorId"
                name="authorId"
                value={formData.authorId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25 cursor-pointer"
              >
                <option value="">Selecione um autor...</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-secondary">
                {authors.find((a) => a.id === lockedAuthorId)?.name ?? "—"}
                <span className="ml-2 font-mono text-[9px] text-text-muted">(fixo)</span>
              </div>
            )}
          </div>

          {/* Read Time */}
          <div>
            <label
              htmlFor="readTime"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Tempo de Leitura (min)
            </label>
            <input
              type="number"
              id="readTime"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              min={1}
              max={60}
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              URL da Imagem
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="/heros/imagem.jpg"
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Image Alt */}
          <div>
            <label
              htmlFor="imageAlt"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Descrição da Imagem (Alt)
            </label>
            <input
              type="text"
              id="imageAlt"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              placeholder="Descrição acessível da imagem..."
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Options */}
          <div className="bg-surface border border-white/5 rounded-lg p-4 space-y-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
              Opções
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan cursor-pointer"
              />
              <span className="font-body text-sm text-text-secondary">
                ⭐ Artigo em Destaque
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="breaking"
                checked={formData.breaking}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan cursor-pointer"
              />
              <span className="font-body text-sm text-text-secondary">
                🚨 Notícia Urgente
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saved}
            className="w-full px-6 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-all disabled:opacity-60"
          >
            {editId ? "Salvar Alterações" : "Publicar Artigo"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/artigos")}
            className="w-full px-6 py-3 bg-elevated border border-white/5 text-text-secondary font-mono text-sm rounded-lg hover:text-text-primary transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
