import Link from 'next/link';
import { AdBanner } from './AdBanner';
import { categories } from '@/data/categories';
import type { Article } from '@/types';
import { formatRelative } from '@/lib/utils';

interface SidebarProps {
  mostRead?: Article[];
}

export function Sidebar({ mostRead = [] }: SidebarProps) {
  return (
    <aside className="space-y-6 w-full" aria-label="Barra lateral">
      {/* Search */}
      <div className="bg-surface rounded-xl border border-white/5 p-4">
        <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Buscar</h3>
        <form action="/busca" method="get" className="flex gap-2">
          <input
            name="q"
            type="search"
            placeholder="Buscar notícias..."
            className="flex-1 bg-elevated border border-white/8 rounded-lg px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/40 transition-colors"
          />
          <button
            type="submit"
            className="bg-cyan text-base px-3 py-2 rounded-lg hover:bg-cyan/90 transition-colors"
            aria-label="Buscar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Ad rectangle */}
      <AdBanner size="rectangle" />

      {/* Most read */}
      {mostRead.length > 0 && (
        <div className="bg-surface rounded-xl border border-white/5 p-4">
          <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Mais Lidos</h3>
          <ol className="space-y-4">
            {mostRead.slice(0, 5).map((article, i) => (
              <li key={article.id} className="flex gap-3 group">
                <span className="font-headline font-bold text-2xl text-text-muted/20 leading-none mt-0.5 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/noticias/${article.slug}`}
                    className="font-body text-sm font-medium text-text-secondary group-hover:text-cyan transition-colors line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </Link>
                  <p className="font-mono text-[10px] text-text-muted mt-1">{formatRelative(article.publishedAt)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Categories */}
      <div className="bg-surface rounded-xl border border-white/5 p-4">
        <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Editorias</h3>
        <ul className="space-y-1.5">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categoria/${cat.slug}`}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-elevated transition-colors group"
              >
                <span className="flex items-center gap-2 font-body text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  <span>{cat.icon}</span>
                  {cat.name}
                </span>
                <span className="font-mono text-[10px] text-text-muted">{cat.articleCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="bg-surface rounded-xl border border-cyan/15 p-4">
        <h3 className="font-headline font-bold text-text-primary mb-1">Newsletter</h3>
        <p className="font-body text-sm text-text-muted mb-3 leading-relaxed">
          Receba as melhores notícias de São Luís no seu e-mail.
        </p>
        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full bg-elevated border border-white/10 rounded-lg px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/40 transition-colors mb-2"
        />
        <button className="w-full bg-cyan text-base font-headline font-bold text-sm py-2.5 rounded-lg hover:bg-cyan/90 transition-colors">
          Assinar Grátis
        </button>
      </div>

      {/* Social */}
      <div className="bg-surface rounded-xl border border-white/5 p-4">
        <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Siga-nos</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              name: 'Instagram', color: '#E1306C', followers: '12,4k', href: '#',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              ),
            },
            {
              name: 'Twitter/X', color: '#ffffff', followers: '8,1k', href: '#',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              ),
            },
            {
              name: 'Facebook', color: '#1877F2', followers: '23k', href: '#',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              ),
            },
            {
              name: 'YouTube', color: '#FF0000', followers: '4,2k', href: '#',
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 bg-elevated rounded-lg hover:bg-white/5 transition-all border border-white/5 hover:border-white/15 group"
            >
              <span style={{ color: s.color }} className="transition-transform group-hover:scale-110 duration-200">
                {s.icon}
              </span>
              <span className="font-mono text-[9px] text-text-muted">{s.name}</span>
              <span className="font-headline font-bold text-xs text-text-primary">{s.followers}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Second ad */}
      <AdBanner size="square" />
    </aside>
  );
}
