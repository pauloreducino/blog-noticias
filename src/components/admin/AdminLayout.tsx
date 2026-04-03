"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { Permission } from "@/types";
import { ROLE_LABELS } from "@/types";

interface MenuItem {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
  permission?: Permission;
}

const menuItems: MenuItem[] = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/artigos", label: "Artigos", icon: "📝", permission: "articles.view_own" },
  { href: "/admin/categorias", label: "Categorias", icon: "🏷️", permission: "categories.manage" },
  { href: "/admin/autores", label: "Autores", icon: "👥", permission: "authors.manage" },
  { href: "/admin/midia", label: "Mídia", icon: "🖼️", permission: "media.manage" },
  { href: "/admin/analytics", label: "Analytics", icon: "📈", permission: "analytics.view" },
  { href: "/admin/configuracoes", label: "Configurações", icon: "⚙️", permission: "settings.manage" },
  { href: "/admin/usuarios", label: "Usuários", icon: "👤", permission: "users.manage" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout, currentUser, hasPermission } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="font-mono text-text-muted text-sm">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const visibleItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission),
  );

  return (
    <div className="min-h-screen bg-base">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-white/5">
          <div className="w-8 h-8 rounded bg-cyan flex items-center justify-center shrink-0">
            <span className="font-headline font-bold text-black text-sm">SL</span>
          </div>
          <div className="leading-none min-w-0">
            <div className="font-headline font-bold text-text-primary text-lg">Admin</div>
            <div className="font-mono text-text-muted text-[9px] tracking-[0.2em] uppercase truncate">
              São Luís em Foco
            </div>
          </div>
        </div>

        {/* Current user */}
        {currentUser && (
          <div className="px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-elevated flex items-center justify-center font-mono text-xs text-text-muted shrink-0">
                {currentUser.name[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-body text-xs font-medium text-text-primary truncate">
                  {currentUser.name}
                </p>
                <p className="font-mono text-[9px] text-text-muted">
                  {ROLE_LABELS[currentUser.role]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {visibleItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-cyan/10 text-cyan border border-cyan/20"
                        : "text-text-secondary hover:bg-elevated hover:text-text-primary"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-body font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-text-muted hover:text-cyan transition-colors rounded-lg hover:bg-elevated"
          >
            <span className="text-sm">←</span>
            <span className="font-body text-sm">Ver site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-text-muted hover:text-red-news transition-colors rounded-lg hover:bg-elevated"
          >
            <span className="text-sm">🚪</span>
            <span className="font-body text-sm">Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
