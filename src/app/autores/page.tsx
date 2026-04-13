import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { authors } from '@/data/authors';
import { AdBanner } from '@/components/ui/AdBanner';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Redação | ${SITE_NAME}`,
  description: 'Conheça os jornalistas e colunistas do São Luís em Foco — a equipe por trás da cobertura mais completa de São Luís e do Maranhão.',
};

const roleColor: Record<string, string> = {
  'Editora-Chefe': '#FF3B5C',
  'Editor-Chefe': '#FF3B5C',
  'Repórter de Economia': '#F5A100',
  'Repórter Cultural': '#A855F7',
  'Repórter': '#00C8E8',
  'Colunista': '#00E08A',
};

function getRoleColor(role: string) {
  return roleColor[role] ?? '#00C8E8';
}

const socialIcons: Record<string, { label: string; icon: React.ReactNode }> = {
  twitter: {
    label: 'Twitter/X',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  email: {
    label: 'E-mail',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
};

export default function AuthorsPage() {
  const editor = authors.find((a) => a.role.toLowerCase().includes('editor'));
  const rest = authors.filter((a) => !a.role.toLowerCase().includes('editor'));

  return (
    <div>
      {/* Hero */}
      <div className="bg-surface border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Redação</p>
            <h1 className="font-headline font-bold text-text-primary text-4xl sm:text-5xl mb-4 leading-tight">
              Nossa Equipe
            </h1>
            <p className="font-body text-text-secondary text-lg leading-relaxed">
              Conheça os jornalistas e colunistas que fazem o São Luís em Foco — comprometidos
              com a cobertura mais completa, rigorosa e independente de São Luís e do Maranhão.
            </p>
          </div>

          {/* Stats da redação */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { value: authors.length.toString(), label: 'Jornalistas' },
              { value: `${authors.reduce((s, a) => s + (a.articleCount ?? 0), 0).toLocaleString('pt-BR')}+`, label: 'Artigos publicados' },
              { value: '5+', label: 'Anos de cobertura' },
              { value: '12', label: 'Editorias' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-headline font-bold text-3xl text-cyan">{stat.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Leaderboard ad */}
        <AdBanner size="leaderboard" className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Coluna principal ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Editora-Chefe em destaque */}
            {editor && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 rounded-full" style={{ backgroundColor: getRoleColor(editor.role) }} />
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted">Direção Editorial</p>
                </div>

                <Link
                  href={`/autor/${editor.slug}`}
                  className="group flex flex-col sm:flex-row gap-6 bg-surface border border-white/5 rounded-2xl p-6 hover:border-cyan/20 transition-all duration-300"
                >
                  {/* Avatar grande */}
                  <div className="shrink-0 mx-auto sm:mx-0">
                    <div
                      className="relative w-32 h-32 rounded-2xl overflow-hidden ring-2 transition-all duration-300 group-hover:ring-4"
                      style={{ ['--tw-ring-color' as string]: getRoleColor(editor.role) + '60' }}
                    >
                      <Image
                        src={editor.avatar}
                        alt={editor.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span
                      className="inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-2"
                      style={{ backgroundColor: getRoleColor(editor.role) + '20', color: getRoleColor(editor.role) }}
                    >
                      {editor.role}
                    </span>
                    <h2 className="font-headline font-bold text-text-primary text-2xl group-hover:text-cyan transition-colors mb-1">
                      {editor.name}
                    </h2>
                    <p className="font-body text-text-secondary text-sm leading-relaxed mb-3 line-clamp-3">
                      {editor.bioLong?.split('\n')[0] ?? editor.bio}
                    </p>

                    {/* Áreas */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                      {editor.areas.map((area) => (
                        <span key={area} className="px-2 py-0.5 rounded-full bg-elevated border border-white/8 font-mono text-[9px] text-text-muted">
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Stats + social */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5">
                      <div className="text-center sm:text-left">
                        <p className="font-headline font-bold text-lg text-cyan">{editor.articleCount?.toLocaleString('pt-BR')}</p>
                        <p className="font-mono text-[9px] text-text-muted uppercase">artigos</p>
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="font-headline font-bold text-lg text-cyan">{new Date().getFullYear() - Number(editor.since)}+</p>
                        <p className="font-mono text-[9px] text-text-muted uppercase">anos</p>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        {Object.entries(editor.social)
                          .filter(([, v]) => v)
                          .slice(0, 4)
                          .map(([key]) => (
                            <span key={key} className="w-8 h-8 flex items-center justify-center rounded-lg bg-elevated border border-white/8 text-text-muted">
                              {socialIcons[key]?.icon}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Demais jornalistas */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1 h-6 bg-cyan rounded-full" />
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted">Equipe de Reportagem</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((author) => (
                  <Link
                    key={author.slug}
                    href={`/autor/${author.slug}`}
                    className="group flex flex-col bg-surface border border-white/5 rounded-2xl p-5 hover:border-cyan/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-1 group-hover:ring-2 transition-all"
                        style={{ ['--tw-ring-color' as string]: getRoleColor(author.role) + '50' }}
                      >
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="inline-block font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-1"
                          style={{ backgroundColor: getRoleColor(author.role) + '20', color: getRoleColor(author.role) }}
                        >
                          {author.role}
                        </span>
                        <h3 className="font-headline font-bold text-text-primary text-lg leading-tight group-hover:text-cyan transition-colors">
                          {author.name}
                        </h3>
                      </div>
                    </div>

                    <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4 flex-1">
                      {author.bio}
                    </p>

                    {/* Áreas */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {author.areas.slice(0, 3).map((area) => (
                        <span key={area} className="px-2 py-0.5 rounded-full bg-elevated border border-white/8 font-mono text-[9px] text-text-muted">
                          {area}
                        </span>
                      ))}
                      {author.areas.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-elevated border border-white/8 font-mono text-[9px] text-text-muted">
                          +{author.areas.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex gap-4">
                        <div>
                          <p className="font-headline font-bold text-base text-cyan">{author.articleCount?.toLocaleString('pt-BR')}</p>
                          <p className="font-mono text-[9px] text-text-muted uppercase">artigos</p>
                        </div>
                        <div>
                          <p className="font-headline font-bold text-base text-cyan">desde {author.since}</p>
                          <p className="font-mono text-[9px] text-text-muted uppercase">na redação</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {Object.entries(author.social)
                          .filter(([, v]) => v)
                          .slice(0, 3)
                          .map(([key]) => (
                            <span key={key} className="w-7 h-7 flex items-center justify-center rounded-lg bg-elevated border border-white/8 text-text-muted">
                              {socialIcons[key]?.icon}
                            </span>
                          ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ad retângulo após listagem */}
            <AdBanner size="rectangle" />

            {/* CTA — Trabalhe conosco */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan/15 p-8 text-center">
              {/* Imagem de fundo */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop"
                alt="Equipe de jornalistas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Overlay escuro para legibilidade */}
              <div className="absolute inset-0 bg-base/80 backdrop-blur-[2px]" />
              {/* Conteúdo */}
              <div className="relative z-10">
                <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Faça parte da equipe</p>
                <h2 className="font-headline font-bold text-white text-2xl mb-3">
                  Quer escrever para o São Luís em Foco?
                </h2>
                <p className="font-body text-white/70 leading-relaxed max-w-lg mx-auto mb-6">
                  Aceitamos propostas de pauta, colunas de opinião e colaborações de jornalistas,
                  especialistas e pesquisadores maranhenses. Entre em contato com nossa redação.
                </p>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center gap-2 bg-cyan text-base font-headline font-bold text-sm px-6 py-3 rounded-xl hover:bg-cyan/90 transition-colors"
                >
                  Fale com a Redação
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Newsletter */}
            <div className="bg-surface rounded-2xl border border-cyan/15 p-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-1">Newsletter</p>
              <h3 className="font-headline font-bold text-text-primary text-lg mb-2">
                Receba as notícias no e-mail
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
                De segunda a sexta, os destaques do dia direto na sua caixa de entrada.
              </p>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-elevated border border-white/10 rounded-lg px-3 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/40 transition-colors mb-2"
              />
              <button className="w-full bg-cyan text-base font-headline font-bold text-sm py-2.5 rounded-lg hover:bg-cyan/90 transition-colors">
                Assinar Grátis
              </button>
            </div>

            {/* Ad rectangle */}
            <AdBanner size="rectangle" />

            {/* Redes sociais */}
            <div className="bg-surface rounded-2xl border border-white/5 p-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Siga a Redação</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: 'Instagram', color: '#E1306C', followers: '12,4k', href: '#',
                    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
                  },
                  {
                    name: 'Twitter/X', color: '#ffffff', followers: '8,1k', href: '#',
                    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  },
                  {
                    name: 'Facebook', color: '#1877F2', followers: '23k', href: '#',
                    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                  },
                  {
                    name: 'YouTube', color: '#FF0000', followers: '4,2k', href: '#',
                    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
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

            {/* Ad halfpage */}
            <AdBanner size="halfpage" />

            {/* Anuncie */}
            <div className="bg-surface rounded-2xl border border-amber-news/20 p-5">
              <p className="font-mono text-[10px] tracking-widest uppercase text-amber-news mb-2">Publicidade</p>
              <h3 className="font-headline font-bold text-text-primary text-lg mb-2">
                Anuncie no São Luís em Foco
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
                Alcance milhares de leitores em São Luís e no Maranhão. Temos formatos para todos os objetivos — banner, patrocínio editorial e branded content.
              </p>
              <Link
                href="/fale-conosco"
                className="block text-center font-headline font-bold text-sm px-4 py-2.5 rounded-xl border border-amber-news/40 text-amber-news hover:bg-amber-news/10 transition-colors"
              >
                Solicitar Mídia Kit
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
