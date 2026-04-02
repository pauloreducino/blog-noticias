import Link from 'next/link';
import Image from 'next/image';
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
            { name: 'Instagram', color: '#E1306C', icon: '📸', followers: '12,4k' },
            { name: 'Twitter/X', color: '#1DA1F2', icon: '🐦', followers: '8,1k' },
            { name: 'Facebook', color: '#1877F2', icon: '📘', followers: '23k' },
            { name: 'YouTube', color: '#FF0000', icon: '▶️', followers: '4,2k' },
          ].map((s) => (
            <a
              key={s.name}
              href="#"
              className="flex flex-col items-center gap-1 p-3 bg-elevated rounded-lg hover:bg-white/5 transition-colors border border-white/5"
            >
              <span className="text-xl">{s.icon}</span>
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
