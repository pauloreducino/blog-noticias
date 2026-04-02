import { articles } from '@/data/articles';

export function DashboardStats() {
  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const featuredArticles = articles.filter(article => article.featured).length;
  const breakingNews = articles.filter(article => article.breaking).length;

  const stats = [
    {
      label: 'Total de Artigos',
      value: totalArticles.toString(),
      icon: '📝',
      color: 'text-cyan',
    },
    {
      label: 'Visualizações Totais',
      value: totalViews.toLocaleString(),
      icon: '👁️',
      color: 'text-green-live',
    },
    {
      label: 'Artigos em Destaque',
      value: featuredArticles.toString(),
      icon: '⭐',
      color: 'text-amber-news',
    },
    {
      label: 'Notícias Urgentes',
      value: breakingNews.toString(),
      icon: '🚨',
      color: 'text-red-news',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-white/5 rounded-xl p-6 hover:border-cyan/30 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className={`text-3xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="font-headline font-bold text-2xl text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
