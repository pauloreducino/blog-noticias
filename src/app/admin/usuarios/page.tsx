"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useCMS } from "@/contexts/CMSContext";
import {
  type AdminUser,
  type Permission,
  type UserRole,
  ROLE_LABELS,
  ROLE_PERMISSIONS,
  PERMISSION_LABELS,
  PERMISSION_GROUPS,
} from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type FormState = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: Permission[];
  authorId: string;
  active: boolean;
};

const emptyForm: FormState = {
  name: "",
  username: "",
  email: "",
  password: "",
  role: "author",
  permissions: ROLE_PERMISSIONS.author,
  authorId: "",
  active: true,
};

export default function UsuariosPage() {
  const { users, currentUser, createUser, updateUser, deleteUser, hasPermission } = useAuth();
  const { authors } = useCMS();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  if (!hasPermission("users.manage")) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-headline font-bold text-2xl text-text-primary mb-2">
            Acesso Negado
          </h2>
          <p className="font-body text-text-secondary">
            Você não tem permissão para gerenciar usuários.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSaved(false);
    setShowForm(true);
  };

  const openEdit = (user: AdminUser) => {
    setForm({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      permissions: [...user.permissions],
      authorId: user.authorId ?? "",
      active: user.active,
    });
    setEditingId(user.id);
    setError("");
    setSaved(false);
    setShowForm(true);
  };

  const handleRoleChange = (role: UserRole) => {
    setForm((p) => ({
      ...p,
      role,
      permissions: role !== "custom" ? [...ROLE_PERMISSIONS[role]] : [...p.permissions],
    }));
  };

  const togglePermission = (perm: Permission) => {
    setForm((p) => ({
      ...p,
      role: "custom",
      permissions: p.permissions.includes(perm)
        ? p.permissions.filter((x) => x !== perm)
        : [...p.permissions, perm],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (editingId) {
      const data: Partial<AdminUser> = {
        name: form.name,
        username: form.username,
        email: form.email,
        role: form.role,
        permissions: form.permissions,
        authorId: form.authorId || undefined,
        active: form.active,
      };
      if (form.password) data.password = form.password;

      const result = updateUser(editingId, data);
      if (!result.ok) { setError(result.error ?? "Erro ao salvar."); return; }
    } else {
      if (!form.password) { setError("Defina uma senha para o novo usuário."); return; }

      const result = createUser({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
        permissions: form.permissions,
        authorId: form.authorId || undefined,
        active: form.active,
      });
      if (!result.ok) { setError(result.error ?? "Erro ao criar usuário."); return; }
    }

    setSaved(true);
    setTimeout(() => { setShowForm(false); setSaved(false); }, 900);
  };

  const handleDelete = (user: AdminUser) => {
    if (!confirm(`Excluir o usuário "${user.name}"? Esta ação não pode ser desfeita.`)) return;
    const result = deleteUser(user.id);
    if (!result.ok) alert(result.error);
  };

  const handleToggleActive = (user: AdminUser) => {
    updateUser(user.id, { active: !user.active });
  };

  const roleColor: Record<UserRole, string> = {
    admin: "bg-cyan/20 text-cyan",
    editor: "bg-purple-500/20 text-purple-400",
    author: "bg-green-live/20 text-green-live",
    custom: "bg-amber-news/20 text-amber-news",
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-bold text-3xl text-text-primary mb-1">Usuários</h1>
            <p className="font-body text-text-secondary">
              {users.length} usuário{users.length !== 1 ? "s" : ""} cadastrado{users.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-cyan text-black font-mono font-semibold text-sm rounded-lg hover:bg-cyan/85 transition-colors"
          >
            + Novo Usuário
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[92vh] flex flex-col">
              <div className="p-8 border-b border-white/5">
                <h2 className="font-headline font-bold text-xl text-text-primary">
                  {editingId ? "Editar Usuário" : "Novo Usuário"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                {/* Basic info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">Nome Completo</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">Usuário (login)</label>
                    <input
                      type="text" required
                      value={form.username}
                      onChange={(e) => setForm((p) => ({ ...p, username: e.target.value.toLowerCase().replace(/\s/g, "") }))}
                      placeholder="joaosilva"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-mono text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Senha {editingId && <span className="normal-case">(deixe em branco para manter)</span>}
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                      placeholder={editingId ? "Nova senha..." : "Senha de acesso"}
                      required={!editingId}
                      minLength={6}
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">E-mail</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="joao@redacao.com.br"
                      className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Perfil de Acesso</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(["admin", "editor", "author", "custom"] as UserRole[]).map((r) => (
                      <button
                        key={r} type="button"
                        onClick={() => handleRoleChange(r)}
                        className={`py-2.5 px-3 rounded-lg border font-mono text-xs font-semibold transition-colors ${
                          form.role === r
                            ? "border-cyan bg-cyan/10 text-cyan"
                            : "border-white/5 bg-elevated text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {ROLE_LABELS[r]}
                      </button>
                    ))}
                  </div>

                  {/* Role description */}
                  <p className="mt-2 font-body text-xs text-text-muted">
                    {form.role === "admin" && "Acesso total ao painel, incluindo usuários e configurações."}
                    {form.role === "editor" && "Gerencia todos os artigos, categorias, autores e mídia."}
                    {form.role === "author" && "Cria e edita apenas seus próprios artigos."}
                    {form.role === "custom" && "Defina manualmente quais permissões este usuário terá."}
                  </p>
                </div>

                {/* Permissions grid */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Permissões</label>
                  <div className="space-y-4 bg-elevated rounded-xl p-4">
                    {PERMISSION_GROUPS.map((group) => (
                      <div key={group.label}>
                        <p className="font-mono text-[9px] tracking-widest uppercase text-text-muted mb-2">{group.label}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {group.perms.map((perm) => (
                            <label key={perm} className="flex items-center gap-2.5 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={form.permissions.includes(perm)}
                                onChange={() => togglePermission(perm)}
                                className="w-4 h-4 accent-cyan shrink-0"
                              />
                              <span className="font-body text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                                {PERMISSION_LABELS[perm]}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Link to Author profile */}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Perfil de Autor (opcional)
                  </label>
                  <select
                    value={form.authorId}
                    onChange={(e) => setForm((p) => ({ ...p, authorId: e.target.value }))}
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
                  >
                    <option value="">Nenhum (não é um autor)</option>
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} — {a.role}</option>
                    ))}
                  </select>
                  <p className="mt-1 font-body text-xs text-text-muted">
                    Vincule a um perfil de autor para que os artigos criados por ele apareçam automaticamente associados.
                  </p>
                </div>

                {/* Active toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
                    className="w-4 h-4 accent-cyan"
                  />
                  <span className="font-body text-sm text-text-secondary">Conta ativa (pode fazer login)</span>
                </label>

                {error && (
                  <div className="px-4 py-3 bg-red-news/10 border border-red-news/20 rounded-lg">
                    <p className="font-body text-sm text-red-news">{error}</p>
                  </div>
                )}
                {saved && (
                  <p className="font-body text-sm text-green-live">Salvo com sucesso!</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit" disabled={saved}
                    className="flex-1 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors disabled:opacity-60"
                  >
                    {editingId ? "Salvar Alterações" : "Criar Usuário"}
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

        {/* Users table */}
        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-elevated">
              <tr>
                {["Usuário", "Perfil", "Permissões", "Autor vinculado", "Criado", "Status", "Ações"].map((h) => (
                  <th key={h} className={`px-6 py-4 font-mono text-[10px] tracking-widest uppercase text-text-muted ${h === "Ações" ? "text-right" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const linkedAuthor = user.authorId ? authors.find((a) => a.id === user.authorId) : null;
                const isMe = user.id === currentUser?.id;
                return (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-elevated/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-elevated flex items-center justify-center font-mono text-sm text-text-muted shrink-0">
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-body font-medium text-text-primary flex items-center gap-2">
                            {user.name}
                            {isMe && <span className="font-mono text-[9px] bg-cyan/10 text-cyan px-1.5 py-0.5 rounded">você</span>}
                          </div>
                          <div className="font-mono text-[10px] text-text-muted">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded font-mono text-[10px] font-semibold ${roleColor[user.role]}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-text-muted">
                        {user.permissions.length} permiss{user.permissions.length !== 1 ? "ões" : "ão"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {linkedAuthor ? (
                        <span className="font-body text-sm text-text-secondary">{linkedAuthor.name}</span>
                      ) : (
                        <span className="font-mono text-[10px] text-text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-body text-sm text-text-muted">
                        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true, locale: ptBR })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => user.id !== "root" && !isMe && handleToggleActive(user)}
                        disabled={user.id === "root" || isMe}
                        className={`px-2.5 py-1 rounded font-mono text-[10px] font-semibold transition-colors ${
                          user.active
                            ? "bg-green-live/20 text-green-live hover:bg-green-live/30"
                            : "bg-red-news/20 text-red-news hover:bg-red-news/30"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {user.active ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(user)}
                          className="p-2 text-text-muted hover:text-cyan transition-colors"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={user.id === "root" || isMe}
                          className="p-2 text-text-muted hover:text-red-news transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Excluir"
                        >
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
      </div>
    </AdminLayout>
  );
}
