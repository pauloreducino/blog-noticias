"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const SETTINGS_KEY = "slf_site_settings";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  socialTwitter: string;
  socialInstagram: string;
  socialFacebook: string;
  articlesPerPage: string;
  breakingNewsEnabled: boolean;
  newsletterEnabled: boolean;
  maintenanceMode: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: "São Luís em Foco",
  siteDescription: "Portal de notícias do Maranhão",
  siteUrl: "https://saoluisemfoco.com.br",
  contactEmail: "redacao@saoluisemfoco.com.br",
  socialTwitter: "@saoluisemfoco",
  socialInstagram: "@saoluisemfoco",
  socialFacebook: "saoluisemfoco",
  articlesPerPage: "10",
  breakingNewsEnabled: true,
  newsletterEnabled: true,
  maintenanceMode: false,
};

export default function ConfiguracoesPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"geral" | "social" | "seguranca">("geral");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      } catch {
        // ignore
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "A senha deve ter pelo menos 6 caracteres." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "As senhas não coincidem." });
      return;
    }
    // In a real app this would call an API. Here we just store locally.
    localStorage.setItem("slf_admin_password", newPassword);
    setPasswordMsg({ type: "success", text: "Senha alterada com sucesso!" });
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMsg(null), 3000);
  };

  const handleLogoutAll = () => {
    if (confirm("Deseja encerrar todas as sessões ativas?")) {
      logout();
      router.push("/admin/login");
    }
  };

  const tabs = [
    { id: "geral" as const, label: "Geral", icon: "⚙️" },
    { id: "social" as const, label: "Redes Sociais", icon: "🔗" },
    { id: "seguranca" as const, label: "Segurança", icon: "🔒" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-1">
            Configurações
          </h1>
          <p className="font-body text-text-secondary">
            Gerencie as configurações gerais do portal
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/5 pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-sm rounded-t-lg transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-cyan text-cyan"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Geral */}
        {activeTab === "geral" && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-5">
              <h2 className="font-headline font-semibold text-lg text-text-primary">
                Informações do Site
              </h2>

              {[
                { name: "siteName", label: "Nome do Site", placeholder: "São Luís em Foco" },
                { name: "siteDescription", label: "Descrição", placeholder: "Portal de notícias..." },
                { name: "siteUrl", label: "URL do Site", placeholder: "https://saoluisemfoco.com.br" },
                { name: "contactEmail", label: "E-mail de Contato", placeholder: "redacao@..." },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={settings[field.name as keyof SiteSettings] as string}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                  />
                </div>
              ))}

              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                  Artigos por Página
                </label>
                <select
                  name="articlesPerPage"
                  value={settings.articlesPerPage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary outline-none focus:border-cyan/30 cursor-pointer"
                >
                  {["5", "10", "15", "20", "25"].map((n) => (
                    <option key={n} value={n}>{n} artigos</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-4">
              <h2 className="font-headline font-semibold text-lg text-text-primary">
                Funcionalidades
              </h2>

              {[
                { name: "breakingNewsEnabled", label: "Notícias Urgentes", desc: "Exibir banner de notícias urgentes no topo do site" },
                { name: "newsletterEnabled", label: "Newsletter", desc: "Exibir formulário de cadastro na newsletter" },
                { name: "maintenanceMode", label: "Modo Manutenção", desc: "Exibir página de manutenção para visitantes" },
              ].map((toggle) => (
                <label key={toggle.name} className="flex items-start gap-4 cursor-pointer group">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      name={toggle.name}
                      checked={settings[toggle.name as keyof SiteSettings] as boolean}
                      onChange={handleChange}
                      className="w-4 h-4 accent-cyan cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="font-body font-medium text-text-primary group-hover:text-cyan transition-colors">
                      {toggle.label}
                    </div>
                    <div className="font-body text-sm text-text-muted">{toggle.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {saved && (
              <div className="px-4 py-3 bg-green-live/10 border border-green-live/20 rounded-lg">
                <p className="font-body text-sm text-green-live">Configurações salvas com sucesso!</p>
              </div>
            )}

            <button
              type="submit"
              className="px-8 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors"
            >
              Salvar Configurações
            </button>
          </form>
        )}

        {/* Tab: Redes Sociais */}
        {activeTab === "social" && (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-5">
              <h2 className="font-headline font-semibold text-lg text-text-primary">
                Perfis nas Redes Sociais
              </h2>

              {[
                { name: "socialTwitter", label: "Twitter / X", placeholder: "@saoluisemfoco", icon: "𝕏" },
                { name: "socialInstagram", label: "Instagram", placeholder: "@saoluisemfoco", icon: "📸" },
                { name: "socialFacebook", label: "Facebook", placeholder: "saoluisemfoco", icon: "👍" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    {field.label}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{field.icon}</span>
                    <input
                      type="text"
                      name={field.name}
                      value={settings[field.name as keyof SiteSettings] as string}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="flex-1 px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                    />
                  </div>
                </div>
              ))}
            </div>

            {saved && (
              <div className="px-4 py-3 bg-green-live/10 border border-green-live/20 rounded-lg">
                <p className="font-body text-sm text-green-live">Configurações salvas!</p>
              </div>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors"
            >
              Salvar
            </button>
          </form>
        )}

        {/* Tab: Segurança */}
        {activeTab === "seguranca" && (
          <div className="space-y-6">
            {/* Change password */}
            <div className="bg-surface border border-white/5 rounded-xl p-6">
              <h2 className="font-headline font-semibold text-lg text-text-primary mb-5">
                Alterar Senha de Acesso
              </h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-elevated border border-white/5 rounded-lg font-body text-text-primary placeholder:text-text-muted outline-none focus:border-cyan/30"
                  />
                </div>

                {passwordMsg && (
                  <div
                    className={`px-4 py-3 rounded-lg border ${
                      passwordMsg.type === "success"
                        ? "bg-green-live/10 border-green-live/20"
                        : "bg-red-news/10 border-red-news/20"
                    }`}
                  >
                    <p
                      className={`font-body text-sm ${
                        passwordMsg.type === "success" ? "text-green-live" : "text-red-news"
                      }`}
                    >
                      {passwordMsg.text}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan text-black font-mono font-semibold rounded-lg hover:bg-cyan/85 transition-colors"
                >
                  Alterar Senha
                </button>
              </form>
            </div>

            {/* Session */}
            <div className="bg-surface border border-white/5 rounded-xl p-6">
              <h2 className="font-headline font-semibold text-lg text-text-primary mb-2">
                Sessões Ativas
              </h2>
              <p className="font-body text-sm text-text-secondary mb-5">
                Encerre todas as sessões ativas do painel administrativo.
              </p>
              <button
                onClick={handleLogoutAll}
                className="px-6 py-3 bg-red-news/10 border border-red-news/20 text-red-news font-mono text-sm font-semibold rounded-lg hover:bg-red-news/20 transition-colors"
              >
                🚪 Encerrar Todas as Sessões
              </button>
            </div>

            {/* Credentials info */}
            <div className="bg-elevated border border-white/5 rounded-xl p-6">
              <h2 className="font-headline font-semibold text-base text-text-primary mb-2">
                Credenciais Atuais
              </h2>
              <p className="font-mono text-xs text-text-muted">
                Usuário: <span className="text-cyan">admin</span>
              </p>
              <p className="font-mono text-xs text-text-muted mt-1">
                Senha padrão: <span className="text-cyan">saoluis@2024</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
