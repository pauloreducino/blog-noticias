import { articles } from "@/data/articles";

export function AnalyticsDashboard() {
  // Mock analytics data - in a real CMS this would come from Google Analytics, etc.
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const avgViewsPerArticle = Math.round(totalViews / articles.length);
  const topArticles = articles.sort((a, b) => b.views - a.views).slice(0, 5);

  const trafficData = [
    { period: "Hoje", views: 1247, change: "+12%" },
    { period: "Ontem", views: 1109, change: "+8%" },
    { period: "Esta semana", views: 8234, change: "+15%" },
    { period: "Este mês", views: 34567, change: "+22%" },
  ];

  const deviceData = [
    { device: "Desktop", percentage: 65, color: "bg-cyan" },
    { device: "Mobile", percentage: 30, color: "bg-green-live" },
    { device: "Tablet", percentage: 5, color: "bg-amber-news" },
  ];

  return (
    <div className="space-y-8">
      {/* Traffic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trafficData.map((data) => (
          <div
            key={data.period}
            className="bg-surface border border-white/5 rounded-xl p-6"
          >
            <div className="font-headline font-bold text-2xl text-text-primary mb-1">
              {data.views.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
              {data.period}
            </div>
            <div className="font-body text-sm text-green-live">
              {data.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Articles */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="font-headline font-bold text-xl text-text-primary mb-6">
            Artigos Mais Visualizados
          </h3>
          <div className="space-y-4">
            {topArticles.map((article, index) => (
              <div key={article.id} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-cyan rounded-full flex items-center justify-center font-mono text-sm font-bold text-black">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-body font-medium text-text-primary line-clamp-1 mb-1">
                    {article.title}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted">
                    {article.views.toLocaleString()} visualizações
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="font-headline font-bold text-xl text-text-primary mb-6">
            Acesso por Dispositivo
          </h3>
          <div className="space-y-4">
            {deviceData.map((device) => (
              <div key={device.device} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-elevated rounded flex items-center justify-center text-lg">
                  {device.device === "Desktop"
                    ? "💻"
                    : device.device === "Mobile"
                      ? "📱"
                      : "📱"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body font-medium text-text-primary">
                      {device.device}
                    </span>
                    <span className="font-mono text-sm text-text-secondary">
                      {device.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-elevated rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${device.color}`}
                      style={{ width: `${device.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            {articles.length}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Total de Artigos
          </div>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-2">👁️</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            {avgViewsPerArticle}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Média por Artigo
          </div>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="text-3xl mb-2">📈</div>
          <div className="font-headline font-bold text-2xl text-text-primary mb-1">
            +22%
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
            Crescimento Mensal
          </div>
        </div>
      </div>
    </div>
  );
}
