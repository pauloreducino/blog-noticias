export function AboutContent() {
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
        <h2 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-12 text-center">
          Conheca a <span className="text-cyan">Equipe</span>
        </h2>
        <p className="font-body text-text-secondary text-center max-w-2xl mx-auto mb-12">
          Profissionais dedicados ao jornalismo de qualidade, à informação
          verificada e ao compromisso com a verdade. Conheça quem trabalha nos
          bastidores do São Luís em Foco.
        </p>
      </div>
    </section>
  );
}
