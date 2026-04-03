"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useCMS } from "@/contexts/CMSContext";
import type { Author } from "@/types";

type FormState = {
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  areas: string;
  since: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  social_email: string;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  role: "",
  bio: "",
  avatar: "",
  areas: "",
  since: new Date().getFullYear().toString(),
  social_twitter: "",
  social_instagram: "",
  social_linkedin: "",
  social_email: "",
};

export default function AutoresPage() {
  const { authors, addAuthor, updateAuthor, deleteAuthor, articles } = useCMS();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saved, setSaved] = useState(false);

  const authorArticleCount = (authorId: string) =>
    articles.filter((a) => a.author.id === authorId).length;

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const openEdit = (author: Author) => {
    setForm({
      name: author.name,
      slug: author.slug,
      role: author.role,
      bio: author.bio,
      avatar: author.avatar,
      areas: author.areas.join(", "),
      since: author.since,
      social_twitter: author.social.twitter ?? "",
      social_instagram: author.social.instagram ?? "",
      social_linkedin: author.social.linkedin ?? "",
      social_email: author.social.email ?? "",
    });
    setEditingId(author.id);
    setShowForm(true);
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      slug: form.slug,
      role: form.role,
      bio: form.bio,
      avatar: form.avatar || "/avatars/default.jpg",
      areas: form.areas.split(",").map((a) => a.trim()).filter(Boolean),
      since: form.since,
      social: {
        twitter: form.social_twitter || undefined,
        instagram: form.social_instagram || undefined,
        linkedin: form.social_linkedin || undefined,
        email: form.social_email || undefined,
      },
    };
    if (editingId) {
      updateAuthor(editingId, data);
    } else {
      addAuthor(data);
    }
    setSaved(true);
    setTimeout(() => {
      setShowForm(false);
      setSaved(false);
    }, 900);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Excluir o autor "${name}"? Os artigos associados não serão excluídos.`)) {
      deleteAuthor(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-bold text-3xl text-text-primary mb-1">
              Autores
            </h1>
            <p className="font-body text-text-secondary">
              {authors.length} autor{authors.length !== 1 ? "es" : ""} cadastrado{authors.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-cyan text-black font-mono font-semibold text-sm rounded-lg hover:bg-cyan/85 transition-colors"
          >
            + Novo Autor
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-surface border border-white/10 rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="font-headline font-bold text-xl text-text-primary mb-6">
                {editingId ? "Editar Autor" : "Novo Autor"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleNameChange}
                      required
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  {/* Slug */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      required
                      placeholder="joao-silva"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Cargo / Função
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      placeholder="Repórter, Editor..."
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  {/* Bio */}
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Biografia
                    </label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Breve bio do autor..."
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30 resize-none"
                    />
                  </div>
                  {/* Avatar */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      URL do Avatar
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      value={form.avatar}
                      onChange={handleChange}
                      placeholder="/avatars/foto.jpg"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  {/* Since */}
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Membro desde (ano)
                    </label>
                    <input
                      type="text"
                      name="since"
                      value={form.since}
                      onChange={handleChange}
                      placeholder="2020"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  {/* Areas */}
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Áreas de Cobertura (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      name="areas"
                      value={form.areas}
                      onChange={handleChange}
                      placeholder="Política, Economia, Cultura"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                </div>

                {/* Social */}
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">
                    Redes Sociais (opcional)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "social_twitter", placeholder: "@usuario", label: "Twitter/X" },
                      { name: "social_instagram", placeholder: "@usuario", label: "Instagram" },
                      { name: "social_linkedin", placeholder: "linkedin.com/in/...", label: "LinkedIn" },
                      { name: "social_email", placeholder: "email@exemplo.com", label: "E-mail" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block font-mono text-[9px] tracking-widest uppercase text-text-muted mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          name={field.name}
                          value={form[field.name as keyof FormState]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2.5 bg-elevated border border-white/5 rounded-lg font-mono text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                        />
                      </div>
                    ))}
                  </div>
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
                    {editingId ? "Salvar" : "Criar Autor"}
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

        {/* Authors list */}
        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                {["Autor", "Cargo", "Áreas", "Artigos", "Membro desde", "Ações"].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-4 font-mono text-[10px] tracking-widest uppercase text-text-muted ${h === "Ações" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted font-body text-sm">
                    Nenhum autor cadastrado ainda.
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author.id} className="border-b border-white/5 hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-elevated overflow-hidden shrink-0">
                          {author.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-text-muted">
                              {author.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-body font-medium text-text-primary">{author.name}</div>
                          <div className="font-mono text-[10px] text-text-muted">/{author.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body text-sm text-text-secondary">{author.role}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {author.areas.slice(0, 3).map((area) => (
                          <span key={area} className="px-2 py-0.5 bg-elevated font-mono text-[9px] text-text-muted rounded">
                            {area}
                          </span>
                        ))}
                        {author.areas.length > 3 && (
                          <span className="font-mono text-[9px] text-text-muted">+{author.areas.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-text-secondary">{authorArticleCount(author.id)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body text-sm text-text-secondary">{author.since}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(author)}
                          className="p-2 text-text-muted hover:text-cyan transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(author.id, author.name)}
                          className="p-2 text-text-muted hover:text-red-news transition-colors"
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
