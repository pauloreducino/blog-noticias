"use client";

import { useMemo } from "react";
import { useCMS } from "@/contexts/CMSContext";

export function AnalyticsDashboard() {
  const { articles, categories } = useCMS();

  const stats = useMemo(() => {
    const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
    const avgViews = articles.length ? Math.round(totalViews / articles.length) : 0;

    const topArticles = [...articles]
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // Views per category
    const categoryStats = categories.map((cat) => {
      const catArticles = articles.filter((a) => a.category.slug === cat.slug);
      const views = catArticles.reduce((sum, a) => sum + a.views, 0);
      return { name: cat.name, icon: cat.icon, count: catArticles.length, views };
    }).filter((c) => c.count > 0).sort((a, b) => b.views - a.views);

    const maxCatViews = categoryStats[0]?.views ?? 1;

    // Articles published per month (last 6 months)
    const now = new Date();
    const monthlyData = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const label = d.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
      const count = articles.filter((a) => {
        const pub = new Date(a.publishedAt);
        return pub.getFullYear() === d.getFullYear() && pub.getMonth() === d.getMonth();
      }).length;
      return { label, count };
    });
    const maxMonthly = Math.max(1, ...monthlyData.map((m) => m.count));

    // Simulated traffic based on total views
    const trafficData = [
      { period: "Hoje", views: Math.round(totalViews * 0.004), change: "+12%" },
      { period: "Ontem", views: Math.round(totalViews * 0.0035), change: "+8%" },
      { period: "Esta semana", views: Math.round(totalViews * 0.025), change: "+15%" },
      { period: "Este mês", views: Math.round(totalViews * 0.11), change: "+22%" },
    ];

    return { totalViews, avgViews, topArticles, categoryStats, maxCatViews, monthlyData, maxMonthly, trafficData };
  }, [articles, categories]);

  return (
    <div className="space-y-8">
      {/* Traffic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.trafficData.map((d) => (
          <div key={d.period} className="bg-surface border border-white/5 rounded-xl p-6">
            <div className="font-headline font-bold text-2xl text-text-primary mb-1">
              {d.views.toLocaleString("pt-BR")}
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
              {d.period}
            </div>
            <div className="font-body text-sm text-green-live">{d.change}</div>
          </div>
        ))}
      </div>

      {/* Top articles + Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Articles */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="font-headline font-bold text-xl text-text-primary mb-6">
            Artigos Mais Visualizados
          </h3>
          <div className="space-y-4">
            {stats.topArticles.map((article, index) => (
              <div key={article.id} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-cyan rounded-full flex items-center justify-center font-mono text-sm font-bold text-black shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body font-medium text-text-primary line-clamp-1 mb-0.5">
                    {article.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted">
                      {article.views.toLocaleString("pt-BR")} visualizações
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">·</span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {article.category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {stats.topArticles.length === 0 && (
              <p className="text-text-muted font-body text-sm">Nenhum artigo ainda.</p>
            )}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="font-headline font-bold text-xl text-text-primary mb-6">
            Visualizações por Categoria
          </h3>
          <div className="space-y-4">
            {stats.categoryStats.slice(0, 6).map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-elevated rounded flex items-center justify-center text-sm shrink-0">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-sm text-text-primary">{cat.name}</span>
                    <span className="font-mono text-xs text-text-muted">
                      {cat.views.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="w-full bg-elevated rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-cyan"
                      style={{ width: `${(cat.views / stats.maxCatViews) * 100}%` }}
                    />
                  </div>
                  <div className="font-mono text-[9px] text-text-muted mt-0.5">
                    {cat.count} artigo{cat.count !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            ))}
            {stats.categoryStats.length === 0 && (
              <p className="text-text-muted font-body text-sm">Nenhum dado disponível.</p>
            )}
          </div>
        </div>
      </div>

      {/* Monthly publications chart */}
      <div className="bg-surface border border-white/5 rounded-xl p-6">
        <h3 className="font-headline font-bold text-xl text-text-primary mb-6">
          Publicações nos Últimos 6 Meses
        </h3>
        <div className="flex items-end gap-3 h-32">
          {stats.monthlyData.map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="font-mono text-xs text-text-muted">{m.count}</span>
              <div
                className="w-full rounded-t bg-cyan/70 hover:bg-cyan transition-colors"
                style={{
                  height: `${Math.max(4, (m.count / stats.maxMonthly) * 80)}px`,
                }}
              />
              <span className="font-mono text-[9px] uppercase tracking-wide text-text-muted">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-3">📊</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            {articles.length}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Total de Artigos
          </div>
        </div>
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-3">👁️</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            {stats.avgViews.toLocaleString("pt-BR")}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Média de Visualizações
          </div>
        </div>
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-3">📈</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            {stats.totalViews.toLocaleString("pt-BR")}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Total de Visualizações
          </div>
        </div>
      </div>
    </div>
  );
}
