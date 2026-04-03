"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useCMS } from "@/contexts/CMSContext";
import type { Category } from "@/types";

const COLORS = [
  "bg-cyan/20 text-cyan",
  "bg-red-news/20 text-red-news",
  "bg-amber-news/20 text-amber-news",
  "bg-green-live/20 text-green-live",
  "bg-purple-500/20 text-purple-400",
  "bg-blue-500/20 text-blue-400",
  "bg-pink-500/20 text-pink-400",
  "bg-orange-500/20 text-orange-400",
];

const ICONS = ["📰", "🏛️", "💰", "🔒", "🎭", "🎓", "⚽", "💻", "🏥", "🌿", "🚗", "🌎", "💬"];

type FormState = {
  name: string;
  slug: string;
  color: string;
  icon: string;
  description: string;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  color: COLORS[0],
  icon: ICONS[0],
  description: "",
};

export default function CategoriasPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCMS();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saved, setSaved] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setForm((p) => ({ ...p, name, slug }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setSaved(false);
  };

  const openEdit = (cat: Category) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
      color: cat.color,
      icon: cat.icon,
      description: cat.description,
    });
    setEditingId(cat.id);
    setShowForm(true);
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, form);
    } else {
      addCategory(form);
    }
    setSaved(true);
    setTimeout(() => {
      setShowForm(false);
      setSaved(false);
    }, 900);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Excluir a categoria "${name}"? Os artigos associados não serão excluídos.`)) {
      deleteCategory(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-bold text-3xl text-text-primary mb-1">
              Categorias
            </h1>
            <p className="font-body text-text-secondary">
              {categories.length} categoria{categories.length !== 1 ? "s" : ""} cadastrada{categories.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-cyan text-black font-mono font-semibold text-sm rounded-lg hover:bg-cyan/85 transition-colors"
          >
            + Nova Categoria
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface border border-white/10 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
              <h2 className="font-headline font-bold text-xl text-text-primary mb-6">
                {editingId ? "Editar Categoria" : "Nova Categoria"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleNameChange}
                    required
                    placeholder="Ex: Política"
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                  />
                </div>
                {/* Slug */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    placeholder="politica"
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                  />
                </div>
                {/* Icon + Color row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Ícone
                    </label>
                    <select
                      name="icon"
                      value={form.icon}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
                    >
                      {ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Cor
                    </label>
                    <select
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
                    >
                      {COLORS.map((c) => (
                        <option key={c} value={c}>{c.split("/")[0].replace("bg-", "")}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Breve descrição da categoria..."
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 resize-none"
                  />
                </div>

                {saved && (
                  <p className="text-green-live font-body text-sm">Salvo com sucesso!</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saved}
                    className="flex-1 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors disabled:opacity-60"
                  >
                    {editingId ? "Salvar" : "Criar Categoria"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 bg-elevated border border-white/5 text-text-secondary font-mono text-sm rounded-lg hover:text-text-primary transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-surface border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elevated rounded-lg flex items-center justify-center text-xl">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="font-body font-semibold text-text-primary">{cat.name}</div>
                    <div className="font-mono text-[10px] text-text-muted">/{cat.slug}</div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(cat)}
                    className="p-1.5 text-text-muted hover:text-cyan transition-colors"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 text-text-muted hover:text-red-news transition-colors"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {cat.description && (
                <p className="font-body text-sm text-text-secondary line-clamp-2 mb-3">
                  {cat.description}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-mono text-[9px] ${cat.color}`}>
                  {cat.articleCount ?? 0} artigos
                </span>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <div className="text-5xl mb-4">🏷️</div>
            <p className="font-body">Nenhuma categoria cadastrada ainda.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
