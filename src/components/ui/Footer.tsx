import Link from 'next/link';
import { categories } from '@/data/categories';
import { SITE_NAME } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear();
  const col1 = categories.slice(0, 6);
  const col2 = categories.slice(6, 12);

  return (
    <footer className="bg-surface border-t border-cyan/15 mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 – Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-9 h-9 rounded bg-cyan flex items-center justify-center">
                <span className="font-headline font-bold text-base text-sm">SL</span>
              </div>
              <div className="leading-none">
                <div className="font-headline font-bold text-text-primary text-xl tracking-tight">São Luís</div>
                <div className="font-mono text-text-muted text-[9px] tracking-[0.2em] uppercase">em Foco</div>
              </div>
            </Link>
            <p className="font-body text-text-muted text-sm leading-relaxed mb-5">
              O portal de notícias mais completo de São Luís e do Maranhão. Informação rápida, precisa e relevante para o maranhense.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter/X', href: 'https://twitter.com', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'Facebook', href: 'https://facebook.com', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'YouTube', href: 'https://www.youtube.com', icon: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-elevated border border-white/5 flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/30 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – Categorias A */}
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Categorias</h3>
            <ul className="space-y-2">
              {col1.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary transition-colors group"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 – Categorias B */}
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Mais Editorias</h3>
            <ul className="space-y-2">
              {col2.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary transition-colors group"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 – Newsletter */}
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Newsletter</h3>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
              Receba as principais notícias de São Luís diretamente no seu e-mail.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-elevated border border-white/10 rounded-lg px-3 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <button className="w-full bg-cyan text-base font-headline font-bold text-sm py-2.5 rounded-lg hover:bg-cyan/90 transition-colors">
                Assinar Grátis
              </button>
            </div>
            <div className="mt-6 space-y-1.5">
              {[
                { label: 'Sobre nós', href: '/sobre-nos' },
                { label: 'Política Editorial', href: '/politica-editorial' },
                { label: 'Fale Conosco', href: '/fale-conosco' },
                { label: 'Anuncie Conosco', href: '/fale-conosco' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-body text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-text-muted text-center sm:text-left">
            © {year} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] text-text-muted text-center sm:text-right">
            As informações deste site têm caráter jornalístico e informativo.
          </p>
        </div>
      </div>
    </footer>
  );
}
