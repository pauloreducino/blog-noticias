interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'square' | 'halfpage';
  imageUrl?: string;
  linkUrl?: string;
  altText?: string;
  label?: string;
  className?: string;
}

const sizeMap = {
  leaderboard: { w: '100%', h: '90px', label: '728×90' },
  rectangle:   { w: '100%', h: '250px', label: '300×250' },
  square:      { w: '100%', h: '250px', label: '250×250' },
  halfpage:    { w: '100%', h: '600px', label: '300×600' },
};

export function AdBanner({ size = 'rectangle', imageUrl, linkUrl, altText, label = 'PUBLICIDADE', className = '' }: AdBannerProps) {
  const { w, h, label: dimLabel } = sizeMap[size];

  const inner = (
    <div
      className={`relative border border-dashed border-white/20 rounded-lg overflow-hidden flex items-center justify-center bg-surface ${className}`}
      style={{ width: w, height: h }}
      role="complementary"
      aria-label="Espaço publicitário"
    >
      <span className="absolute top-1.5 left-2 font-mono text-[9px] tracking-widest text-text-muted uppercase">
        {label}
      </span>
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={altText || 'Anúncio'} className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-text-muted/30" aria-hidden="true">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-mono text-[10px]">{dimLabel} · Espaço Publicitário</span>
        </div>
      )}
    </div>
  );

  if (linkUrl) {
    return (
      <a href={linkUrl} target="_blank" rel="nofollow noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
