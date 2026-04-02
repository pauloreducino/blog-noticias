export function PolicyContent() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-16">
        {/* Introdução */}
        <div>
          <h2 className="font-headline font-bold text-3xl text-text-primary mb-6">
            Quem Somos e no que <span className="text-cyan">Acreditamos</span>
          </h2>
          <div className="font-body text-text-secondary leading-relaxed space-y-4">
            <p>
              São Luís em Foco é um veículo de comunicação independente comprometido com o jornalismo de qualidade, investigativo e responsável. Nossa missão é informar a população maranhense sobre os fatos que afetam suas vidas, promovendo o debate democrático e o interesse público.
            </p>
          </div>
        </div>

        {/* Princípios */}
        <div>
          <h2 className="font-headline font-bold text-3xl text-text-primary mb-8">
            Nossos <span className="text-cyan">Princípios</span>
          </h2>
          <div className="space-y-8">
            {[
              {
                title: 'Verdade e Precisão',
                content: 'Comprometemo-nos em relatar os fatos de forma precisa e verificada. Toda informação é confirmada junto a fontes confiáveis antes de ser publicada. Quando cometemos erros, fazemos correções de forma clara e visível.',
              },
              {
                title: 'Independência Editorial',
                content: 'Nossa cobertura é independente e não sofre influência de interesses comerciais ou políticos. Nossas decisões editoriais são baseadas no interesse público e na relevância da informação.',
              },
              {
                title: 'Pluralismo',
                content: 'Buscamos apresentar diferentes perspectivas sobre os temas relevantes. Ouvimos todas as partes envolvidas e nos esforçamos para refletir a diversidade de opinião existente em nossa sociedade.',
              },
              {
                title: 'Transparência',
                content: 'Divulgamos claramente nossas fontes e metodologias quando possível. Explicamos os critérios que usamos para decidir o que cobrir e como cobrimos. Somos abertos ao questionamento e à crítica.',
              },
              {
                title: 'Respeito à Privacidade',
                content: 'Respeitamos a privacidade das pessoas e não divulgamos informações pessoais sem consentimento, exceto quando há interesse público claro. Utilizamos responsabilidade na cobertura de temas sensíveis.',
              },
              {
                title: 'Responsabilidade Social',
                content: 'Estamos cientes do poder que a mídia exerce na sociedade. Buscamos conteúdo que contribua para o bem comum e evitamos sensacionalismo ou exploração de traumas.',
              },
            ].map((principle) => (
              <div key={principle.title} className="bg-surface border border-white/5 rounded-xl p-8 hover:border-cyan/30 transition-all">
                <h3 className="font-headline font-bold text-xl text-cyan mb-3">
                  {principle.title}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">
                  {principle.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Categorias */}
        <div>
          <h2 className="font-headline font-bold text-3xl text-text-primary mb-8">
            Nossas <span className="text-cyan">Coberturas</span>
          </h2>
          <p className="font-body text-text-secondary leading-relaxed mb-8">
            Cobrimos uma ampla gama de tópicos que são relevantes para a população maranhense:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Política e Governo',
              'Economia e Negócios',
              'Educação',
              'Saúde e Bem-estar',
              'Cultura e Artes',
              'Esportes',
              'Tecnologia',
              'Meio Ambiente',
              'Segurança Pública',
              'Desenvolvimento Urbano',
            ].map((category) => (
              <div key={category} className="flex items-center gap-3 p-4 bg-elevated rounded-lg border border-white/5">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan" />
                <span className="font-body text-text-secondary">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conduta Profissional */}
        <div className="bg-gradient-to-r from-cyan/10 to-cyan/5 border border-cyan/20 rounded-xl p-8">
          <h2 className="font-headline font-bold text-2xl text-text-primary mb-6">
            <span className="text-cyan">Código de Conduta</span>
          </h2>
          <div className="font-body text-text-secondary space-y-4">
            <p>
              Todos os membros da nossa equipe seguem rigorosos códigos de conduta profissional, incluindo:
            </p>
            <ul className="space-y-3 ml-4">
              <li>• Evitar conflitos de interesse e divulgar quando existem</li>
              <li>• Não utilizar nossa posição para ganhos pessoais</li>
              <li>• Tratar todas as pessoas com respeito e dignidade</li>
              <li>• Desculpar-se e corrigir erros promptamente</li>
              <li>• Respeitar as leis de proteção de dados e privacidade</li>
              <li>• Manter sigilo sobre fontes confidenciais</li>
            </ul>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-surface border border-white/5 rounded-xl p-8">
          <h2 className="font-headline font-bold text-2xl text-text-primary mb-4">
            Dúvidas sobre nossa <span className="text-cyan">Política?</span>
          </h2>
          <p className="font-body text-text-secondary mb-6">
            Se você tem dúvidas, sugestões ou denúncias sobre nossa política editorial, entre em contato conosco através da página de contato ou envie um email para editorial@saoluisemfoco.com.br
          </p>
          <a
            href="/fale-conosco"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-base font-mono font-semibold rounded-lg hover:bg-cyan/80 transition-all"
          >
            Entrar em Contato
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
