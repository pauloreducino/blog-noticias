"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { authors } from "@/data/authors";

export function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    authorId: "",
    imageUrl: "",
    imageAlt: "",
    tags: "",
    featured: false,
    breaking: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Article data:", formData);
    // Aqui seria implementada a lógica para salvar no CMS
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
              onChange={handleChange}
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
              Slug (URL)
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
              Resumo (Excerpt)
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
              placeholder="Conteúdo da matéria em HTML..."
              rows={15}
              required
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25 resize-none"
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
              placeholder="tag1, tag2, tag3"
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
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Image Alt */}
          <div>
            <label
              htmlFor="imageAlt"
              className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2"
            >
              Descrição da Imagem
            </label>
            <input
              type="text"
              id="imageAlt"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              placeholder="Descrição da imagem..."
              className="w-full px-4 py-3 bg-surface border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 focus:ring-1 focus:ring-cyan/25"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
              Opções
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-cyan cursor-pointer"
              />
              <span className="font-body text-sm text-text-secondary">
                Artigo em Destaque
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
                Notícia Urgente
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-cyan text-base font-mono font-semibold text-black rounded-lg hover:bg-cyan/80 transition-all"
          >
            Publicar Artigo
          </button>
        </div>
      </div>
    </form>
  );
}
