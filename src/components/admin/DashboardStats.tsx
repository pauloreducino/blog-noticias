"use client";

import { useCMS } from "@/contexts/CMSContext";

export function DashboardStats() {
  const { articles, categories, authors } = useCMS();

  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const featuredCount = articles.filter((a) => a.featured).length;
  const breakingCount = articles.filter((a) => a.breaking).length;

  const stats = [
    {
      label: "Total de Artigos",
      value: articles.length.toString(),
      sub: `${categories.length} categorias · ${authors.length} autores`,
      icon: "📝",
      color: "text-cyan",
    },
    {
      label: "Visualizações Totais",
      value: totalViews.toLocaleString("pt-BR"),
      sub: `Média: ${articles.length ? Math.round(totalViews / articles.length).toLocaleString("pt-BR") : 0} por artigo`,
      icon: "👁️",
      color: "text-green-live",
    },
    {
      label: "Artigos em Destaque",
      value: featuredCount.toString(),
      sub: `${articles.length ? Math.round((featuredCount / articles.length) * 100) : 0}% do total`,
      icon: "⭐",
      color: "text-amber-news",
    },
    {
      label: "Notícias Urgentes",
      value: breakingCount.toString(),
      sub: `${articles.length ? Math.round((breakingCount / articles.length) * 100) : 0}% do total`,
      icon: "🚨",
      color: "text-red-news",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-white/5 rounded-xl p-6 hover:border-cyan/20 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className={`text-3xl ${stat.color}`}>{stat.icon}</div>
            <div className="min-w-0">
              <div className="font-headline font-bold text-2xl text-text-primary mb-0.5">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1">
                {stat.label}
              </div>
              <div className="font-body text-xs text-text-muted">{stat.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
