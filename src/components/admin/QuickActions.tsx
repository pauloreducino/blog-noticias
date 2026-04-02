import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      title: 'Novo Artigo',
      description: 'Criar uma nova matéria',
      href: '/admin/artigos/novo',
      icon: '📝',
      color: 'bg-cyan',
    },
    {
      title: 'Nova Categoria',
      description: 'Adicionar categoria',
      href: '/admin/categorias/novo',
      icon: '🏷️',
      color: 'bg-purple-culture',
    },
    {
      title: 'Upload de Mídia',
      description: 'Enviar imagens/videos',
      href: '/admin/midia',
      icon: '🖼️',
      color: 'bg-green-live',
    },
    {
      title: 'Ver Analytics',
      description: 'Estatísticas do site',
      href: '/admin/analytics',
      icon: '📈',
      color: 'bg-amber-news',
    },
  ];

  return (
    <div className="bg-surface border border-white/5 rounded-xl p-6">
      <h2 className="font-headline font-bold text-xl text-text-primary mb-6">
        Ações Rápidas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group p-4 rounded-lg border border-white/5 hover:border-cyan/30 transition-all hover:bg-elevated"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <h3 className="font-headline font-semibold text-text-primary mb-1">
              {action.title}
            </h3>
            <p className="font-body text-sm text-text-muted">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
