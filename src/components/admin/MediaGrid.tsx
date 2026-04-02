// Mock media data - in a real CMS this would come from a database
const mockMedia = [
  {
    id: '1',
    name: 'rua-portugal-9-scaled.webp',
    url: '/heros/rua-portugal-9-scaled.webp',
    type: 'image',
    size: '2.3 MB',
    uploadedAt: '2024-01-15',
    dimensions: '1920x1080',
  },
  {
    id: '2',
    name: 'sao-luis-ma-nitght.png',
    url: '/heros/sao-luis-ma-nitght.png',
    type: 'image',
    size: '1.8 MB',
    uploadedAt: '2024-01-14',
    dimensions: '1600x900',
  },
  // Add more mock media items as needed
];

export function MediaGrid() {
  return (
    <div className="bg-surface border border-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline font-bold text-xl text-text-primary">
          Arquivos Recentes
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
            Todos
          </button>
          <button className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
            Imagens
          </button>
          <button className="px-4 py-2 bg-elevated border border-white/5 rounded-lg font-body text-sm text-text-secondary hover:text-text-primary transition-colors">
            Vídeos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {mockMedia.map((media) => (
          <div
            key={media.id}
            className="group relative bg-elevated border border-white/5 rounded-lg overflow-hidden hover:border-cyan/30 transition-all cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-cyan/20 to-cyan/5 flex items-center justify-center">
              {media.type === 'image' ? (
                <div className="text-4xl">🖼️</div>
              ) : (
                <div className="text-4xl">🎥</div>
              )}
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors">
                👁️
              </button>
              <button className="p-2 bg-white/20 rounded hover:bg-white/30 transition-colors">
                📋
              </button>
              <button className="p-2 bg-red-news/20 rounded hover:bg-red-news/30 transition-colors">
                🗑️
              </button>
            </div>

            {/* Info */}
            <div className="p-3">
              <div className="font-body text-xs text-text-primary truncate mb-1">
                {media.name}
              </div>
              <div className="font-mono text-[9px] text-text-muted">
                {media.size} • {media.uploadedAt}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockMedia.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="font-headline font-bold text-xl text-text-primary mb-2">
            Nenhum arquivo encontrado
          </h3>
          <p className="font-body text-text-secondary">
            Faça upload de suas primeiras imagens e vídeos
          </p>
        </div>
      )}
    </div>
  );
}
