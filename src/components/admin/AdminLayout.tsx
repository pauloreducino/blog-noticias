import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/artigos", label: "Artigos", icon: "📝" },
    { href: "/admin/categorias", label: "Categorias", icon: "🏷️" },
    { href: "/admin/autores", label: "Autores", icon: "👥" },
    { href: "/admin/midia", label: "Mídia", icon: "🖼️" },
    { href: "/admin/analytics", label: "Analytics", icon: "📈" },
    { href: "/admin/configuracoes", label: "Configurações", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-base">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-white/5">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-white/5">
            <div className="w-8 h-8 rounded bg-cyan flex items-center justify-center">
              <span className="font-headline font-bold text-base text-sm">
                SL
              </span>
            </div>
            <div className="leading-none">
              <div className="font-headline font-bold text-text-primary text-lg">
                Admin
              </div>
              <div className="font-mono text-text-muted text-[9px] tracking-[0.2em] uppercase">
                São Luís em Foco
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-elevated transition-colors text-text-secondary hover:text-text-primary"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-body font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/5">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-muted hover:text-cyan transition-colors"
            >
              <span>←</span>
              <span className="font-body text-sm">Voltar ao site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
