import Image from 'next/image';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/wordpress';

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

export async function AboutContent() {
  const authors = await getAllAuthors();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Sobre Nós */}
        <div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-6">
            Sobre <span className="text-cyan">São Luís em Foco</span>
          </h2>
          <div className="space-y-4 font-body text-text-secondary leading-relaxed">
            <p>
              São Luís em Foco é o principal portal de jornalismo digital de São
              Luís e Maranhão. Fundado com o compromisso de trazer informação de
              qualidade, verificada e relevante para a população maranhense.
            </p>
            <p>
              Nossa equipe é composta por jornalistas experientes, colunistas e
              colaboradores que trabalham diariamente para trazer as histórias
              que importam, dos bastidores da política às histórias de gente
              comum que fazem nossa cidade diferente.
            </p>
            <p>
              Cobrimos política, economia, cultura, esportes, educação,
              tecnologia e muito mais. Estamos presentes nas redes sociais e em
              eventos importantes da cidade, sempre buscando estar onde estão as
              notícias.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { value: "500K+", label: "Leitores Mensais" },
            { value: "50+", label: "Colaboradores" },
            { value: "100%", label: "Compromisso com Verdade" },
            { value: "24/7", label: "Cobertura Contínua" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface border border-white/5 rounded-xl p-6 hover:border-cyan/30 transition-all"
            >
              <div className="font-headline font-bold text-2xl md:text-3xl text-cyan mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Valores */}
      <div className="mb-20">
        <h2 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-12 text-center">
          Nossos <span className="text-cyan">Valores</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Verificação",
              description:
                "Cada informação é verificada rigorosamente antes de ser publicada. Não publicamos sem ter certeza.",
              icon: "✓",
            },
            {
              title: "Transparência",
              description:
                "Nossas fontes são claras, nossos posicionamentos são explícitos e estamos abertos ao diálogo.",
              icon: "◇",
            },
            {
              title: "Independência",
              description:
                "Somos independentes e cobertos apenas pelos nossos valores jornalísticos e pela verdade.",
              icon: "☆",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-surface border border-white/5 rounded-xl p-8 hover:border-cyan/30 transition-all"
            >
              <div className="text-4xl text-cyan mb-4">{value.icon}</div>
              <h3 className="font-headline font-bold text-xl text-text-primary mb-3">
                {value.title}
              </h3>
              <p className="font-body text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Equipe */}
      <div>
        <h2 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-4 text-center">
          Conheça a <span className="text-cyan">Equipe</span>
        </h2>
        <p className="font-body text-text-secondary text-center max-w-2xl mx-auto mb-12">
          Profissionais dedicados ao jornalismo de qualidade, à informação
          verificada e ao compromisso com a verdade. Conheça quem trabalha nos
          bastidores do São Luís em Foco.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/autor/${author.slug}`}
              className="group flex flex-col items-center text-center bg-surface border border-white/5 rounded-2xl p-5 hover:border-cyan/20 transition-all duration-300 hover:-translate-y-0.5 w-40 sm:w-44"
            >
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 transition-all duration-300 group-hover:ring-4"
                style={{ ['--tw-ring-color' as string]: getRoleColor(author.role) + '50' }}
              >
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <span
                className="inline-block font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-1.5"
                style={{ backgroundColor: getRoleColor(author.role) + '20', color: getRoleColor(author.role) }}
              >
                {author.role}
              </span>
              <h3 className="font-headline font-bold text-text-primary text-sm leading-tight group-hover:text-cyan transition-colors">
                {author.name}
              </h3>
              {author.bio && (
                <p className="font-body text-[11px] text-text-muted leading-relaxed mt-1.5 line-clamp-2">
                  {author.bio}
                </p>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/autores"
            className="inline-flex items-center gap-2 font-headline font-bold text-sm px-6 py-3 rounded-xl border border-cyan/30 text-cyan hover:bg-cyan/10 transition-colors"
          >
            Ver toda a redação
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
