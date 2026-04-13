import type { Article } from '@/types';

export const articles: Article[] = [
  {
    id: '0',
    slug: 'guns-n-roses-sao-luis-castelao-abril-2026',
    title: 'Guns N\' Roses faz show histórico em São Luís no dia 21 de abril no Castelão',
    excerpt: 'A lendária banda americana traz a turnê "Because What You Want and What You Get Are Two Completely Different Things" ao Maranhão. Raimundos abre o show às 18h30.',
    content: `<p>São Luís vai vibrar ao som de Axl Rose, Slash e Duff McKagan no próximo <strong>21 de abril de 2026</strong>, feriado de Tiradentes. O Estádio Governador João Castelo, o Castelão, receberá o Guns N' Roses em um show que promete ser um dos maiores eventos de rock da história do Maranhão.</p>

<h2>A turnê</h2>
<p>A apresentação faz parte da turnê mundial <em>"Because What You Want and What You Get Are Two Completely Different Things"</em>, que percorre o Brasil em 2026. Em apenas uma hora de abertura das vendas, mais de 20 mil ingressos foram comercializados para a data de São Luís, confirmando o apetite dos maranhenses por grandes shows de rock.</p>

<h2>Programação do dia</h2>
<p>Os portões do Castelão abrem às <strong>16h</strong>. A banda brasileira <strong>Raimundos</strong>, clássico do rock nacional, sobe ao palco às <strong>18h30</strong> para aquecer o público. O Guns N' Roses está previsto para iniciar às <strong>20h</strong>.</p>

<h2>Ingressos</h2>
<p>Os ingressos estão disponíveis na Bilheteria Digital. Os preços variam entre <strong>R$ 395 (Pista VIP)</strong> e <strong>R$ 1.500 (pacote Experience)</strong>, que inclui acesso a área exclusiva e brindes oficiais da turnê.</p>

<blockquote>Em apenas uma hora, mais de 20 mil ingressos foram vendidos — um recorde para shows em São Luís e prova de que o rock tem força total no Maranhão.</blockquote>

<h2>Como chegar</h2>
<p>O Castelão fica localizado na Avenida Jerônimo de Albuquerque, no bairro Turu. O público pode acessar o estádio de carro, mototáxi ou pelos ônibus das linhas que passam pela área. Recomenda-se chegar com antecedência devido à grande demanda esperada.</p>`,
    category: { name: 'Cultura & Lazer', slug: 'cultura-lazer', color: '#A855F7' },
    author: { id: '3', name: 'Priya Noronha', slug: 'priya-noronha', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop&crop=face', role: 'Repórter Cultural' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    imageAlt: 'Show do Guns N\' Roses no Castelão em São Luís',
    tags: ['guns n roses', 'show', 'rock', 'castelão', 'são luís', 'cultura'],
    featured: true,
    breaking: true,
    views: 9540,
  },
  {
    id: '1',
    slug: 'governo-ma-plano-habitacional-sao-luis-2025',
    title: 'Governo do MA lança plano habitacional para São Luís com 10 mil unidades até 2026',
    excerpt: 'Pacote prevê construção de 10 mil unidades habitacionais em São Luís e municípios do interior, com investimento de R$ 2,3 bilhões provenientes de parceria federal.',
    content: `<p>O Governo do Estado do Maranhão anunciou nesta segunda-feira (15) o maior plano habitacional da história do estado, com previsão de construção de 10 mil unidades habitacionais em São Luís e outros 15 municípios maranhenses até o final de 2026. O investimento total é de R$ 2,3 bilhões, resultado de uma parceria entre o governo estadual e o Ministério das Cidades.</p>

<h2>Foco na Grande São Luís</h2>
<p>De acordo com o secretário de Habitação do Maranhão, as obras serão concentradas nos bairros periféricos da capital, com prioridade para o Coroadinho, Cidade Operária e zona rural da Ilha de São Luís. Cerca de 6 mil das unidades planejadas serão construídas na capital maranhense.</p>

<blockquote>O objetivo é zerar o déficit habitacional de famílias de baixa renda em São Luís até 2027. Este é um compromisso que fizemos com a população e estamos cumprindo.</blockquote>

<h2>Critérios de seleção</h2>
<p>As famílias serão selecionadas com base nos seguintes critérios: renda familiar de até 3 salários mínimos, ausência de imóvel próprio, cadastro no CadÚnico e prioridade para mulheres chefes de família. As inscrições podem ser feitas presencialmente nas subprefeituras de São Luís ou pelo portal da Secretaria de Habitação.</p>

<h2>Cronograma de obras</h2>
<p>A primeira fase das obras tem início previsto para março de 2025, com a construção de 2.500 unidades no Coroadinho. A entrega das primeiras casas está programada para o segundo semestre de 2025.</p>`,
    category: { name: 'Política', slug: 'politica', color: '#FF3B5C' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    imageAlt: 'Construção de casas populares em São Luís',
    tags: ['habitação', 'governo ma', 'são luís', 'política'],
    featured: true,
    breaking: false,
    views: 4820,
  },
  {
    id: '2',
    slug: 'lencois-maranhenses-certificacao-unesco-patrimonio',
    title: 'Lençóis Maranhenses recebe nova certificação internacional de conservação ambiental',
    excerpt: 'Parque Nacional dos Lençóis Maranhenses foi reconhecido por organismo internacional como um dos 50 ecossistemas mais preservados do planeta.',
    content: `<p>O Parque Nacional dos Lençóis Maranhenses, um dos destinos turísticos mais icônicos do Brasil, recebeu uma nova certificação internacional de conservação ambiental, concedida pelo Programa das Nações Unidas para o Meio Ambiente (PNUMA). O reconhecimento coloca os Lençóis entre os 50 ecossistemas mais bem preservados do planeta.</p>

<h2>Importância ecológica única</h2>
<p>Com mais de 155 mil hectares de dunas e lagoas temporárias de água doce, os Lençóis Maranhenses são um fenômeno natural sem igual no mundo. O parque abriga espécies endêmicas de peixes que sobrevivem apenas nas lagoas formadas pelas chuvas entre janeiro e junho.</p>

<h2>Impacto no turismo</h2>
<p>A nova certificação deve impulsionar ainda mais o turismo na região. Em 2024, o parque recebeu mais de 380 mil visitantes, sendo 45 mil estrangeiros — um recorde histórico. O município de Barreirinhas, principal porta de entrada para os Lençóis, viu sua economia crescer 23% no último ano.</p>

<blockquote>Esta certificação não é apenas um prêmio. É uma responsabilidade para que continuemos protegendo este patrimônio natural que pertence ao Brasil e ao mundo.</blockquote>`,
    category: { name: 'Meio Ambiente', slug: 'meio-ambiente', color: '#22C55E' },
    author: { id: '3', name: 'Priya Noronha', slug: 'priya-noronha', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop&crop=face', role: 'Repórter Cultural' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1701221258513-7f4c7092b6a0?q=80&w=1632&auto=format&fit=crop',
    imageAlt: 'Dunas e lagoas dos Lençóis Maranhenses',
    tags: ['lençóis maranhenses', 'meio ambiente', 'turismo', 'patrimônio'],
    featured: true,
    breaking: false,
    views: 6310,
  },
  {
    id: '3',
    slug: 'desemprego-sao-luis-cai-segundo-trimestre-2025',
    title: 'Desemprego em São Luís cai pelo segundo trimestre consecutivo e atinge menor taxa em 7 anos',
    excerpt: 'Taxa de desocupação na capital maranhense chegou a 11,2% no primeiro trimestre de 2025, queda de 2,4 pontos percentuais em relação ao mesmo período do ano anterior.',
    content: `<p>A taxa de desemprego em São Luís atingiu 11,2% no primeiro trimestre de 2025, o menor índice registrado desde 2018, segundo dados divulgados pelo IBGE (Instituto Brasileiro de Geografia e Estatística). A queda de 2,4 pontos percentuais em relação ao mesmo período de 2024 consolida a tendência de recuperação do mercado de trabalho na capital maranhense.</p>

<h2>Setores que mais geraram empregos</h2>
<p>O setor de serviços liderou a geração de empregos formais, com destaque para tecnologia da informação (crescimento de 38%), construção civil (22%) e comércio varejista (18%). O Porto do Itaqui também contribuiu significativamente, com a abertura de 1.200 vagas diretas em operações portuárias.</p>

<h2>Desafios persistentes</h2>
<p>Apesar da melhora nos indicadores, economistas alertam que a informalidade ainda é elevada em São Luís. Cerca de 43% dos trabalhadores da cidade ainda atuam sem carteira assinada, percentual acima da média nacional de 38%.</p>`,
    category: { name: 'Economia', slug: 'economia', color: '#F5A100' },
    author: { id: '2', name: 'Rafael Azevedo', slug: 'rafael-azevedo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', role: 'Repórter de Economia' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    imageAlt: 'Gráfico de desemprego em queda',
    tags: ['economia', 'emprego', 'desemprego', 'são luís', 'ibge'],
    featured: false,
    breaking: false,
    views: 3241,
  },
  {
    id: '4',
    slug: 'bumba-meu-boi-2025-programacao-sao-luis',
    title: 'Bumba-meu-boi 2025: programação completa com 120 grupos e shows no Sambódromo de São Luís',
    excerpt: 'Festa mais importante do Maranhão terá 45 dias de apresentações gratuitas distribuídas em 18 arraiais da capital, com início previsto para 1º de junho.',
    content: `<p>A Secretaria de Cultura do Maranhão divulgou a programação completa do Bumba-meu-boi 2025, considerado o maior festival folclórico do Brasil. Com 120 grupos cadastrados, a festa terá 45 dias de apresentações gratuitas distribuídas em 18 arraiais espalhados por São Luís, com início previsto para 1º de junho.</p>

<h2>Novidades desta edição</h2>
<p>A grande novidade de 2025 é a criação do Circuito Internacional do Boi, que reunirá grupos de bumba-meu-boi de três países — Portugal, França e Cabo Verde — que têm colônias maranhenses significativas. As apresentações internacionais ocorrerão no Sambódromo do Boi Bumbá, no bairro do São Raimundo.</p>

<h2>Grupos mais aguardados</h2>
<p>O Boi de Pindaré, considerado o mais tradicional do estado, abrirá a festa em 1º de junho na Praça Maria Aragão. O Boi de Maracanã, campeão consecutivo por quatro anos, faz sua estreia no dia 5 de junho no Sambódromo. Já o Boi Capricho, queridinho do público jovem, tem 18 apresentações agendadas em diferentes arraiais.</p>

<blockquote>O Bumba-meu-boi é a alma do Maranhão. Esta edição vai mostrar ao mundo que nossa cultura é viva, pulsante e capaz de emocionar qualquer pessoa.</blockquote>`,
    category: { name: 'Cultura & Lazer', slug: 'cultura-lazer', color: '#A855F7' },
    author: { id: '3', name: 'Priya Noronha', slug: 'priya-noronha', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop&crop=face', role: 'Repórter Cultural' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
    imageAlt: 'Apresentação colorida do Bumba-meu-boi',
    tags: ['bumba-meu-boi', 'cultura', 'são luís', 'maranhão', 'festival'],
    featured: true,
    breaking: false,
    views: 8942,
  },
  {
    id: '5',
    slug: 'ufma-novos-cursos-pos-graduacao-gratuitos-2025',
    title: 'UFMA abre inscrições para 14 novos cursos de pós-graduação gratuitos em 2025',
    excerpt: 'Universidade Federal do Maranhão oferece 840 vagas em novos programas de especialização nas áreas de saúde, tecnologia, direito e gestão pública.',
    content: `<p>A Universidade Federal do Maranhão (UFMA) anunciou a abertura de inscrições para 14 novos cursos de pós-graduação lato sensu (especialização) totalmente gratuitos para o ano letivo de 2025. São 840 vagas distribuídas entre os campi de São Luís, Imperatriz, Caxias e Codó.</p>

<h2>Áreas contempladas</h2>
<p>Os novos cursos atendem às demandas do mercado de trabalho maranhense, com destaque para Tecnologia da Informação e Inteligência Artificial (120 vagas), Gestão em Saúde Pública (80 vagas), Direito Administrativo e Compliance (60 vagas) e Agronegócio e Sustentabilidade (90 vagas).</p>

<h2>Como se inscrever</h2>
<p>As inscrições estão abertas até 31 de março de 2025, pelo portal posgraduacao.ufma.br. Os candidatos devem ter diploma de graduação em qualquer área e apresentar documentação completa. A seleção será feita por análise de currículo e, em alguns cursos, entrevista.</p>`,
    category: { name: 'Educação', slug: 'educacao', color: '#00C8E8' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-405a60e2e2c0?w=1200&q=80',
    imageAlt: 'Campus da UFMA em São Luís',
    tags: ['ufma', 'educação', 'pós-graduação', 'são luís'],
    featured: false,
    breaking: false,
    views: 2876,
  },
  {
    id: '6',
    slug: 'sampaio-correa-contratacao-serie-c-2025',
    title: 'Sampaio Corrêa anuncia três reforços para a disputa da Série C do Brasileirão 2025',
    excerpt: 'Tricolor Maranhense fecha com atacante revelado pelo Fluminense, volante experiente e zagueiro para a campanha na terceira divisão nacional.',
    content: `<p>O Sampaio Corrêa Futebol Clube anunciou nesta terça-feira a contratação de três reforços para a temporada 2025, quando o clube maranhense disputará a Série C do Campeonato Brasileiro. Os atletas chegam para fortalecer setores carentes do elenco e alimentar o sonho do acesso à Série B.</p>

<h2>Os novos reforços</h2>
<p>O atacante Matheus Santos, 24 anos, revelado nas categorias de base do Fluminense, chega após passagem pelo futebol português. O volante Cleverson, 30 anos, tem experiência na Série B com Guarani e Chapecoense. O zagueiro Paulo Sérgio, 27 anos, vem do CRB, onde foi um dos destaques da temporada passada.</p>

<h2>Expectativas para 2025</h2>
<p>O presidente do Sampaio, em entrevista coletiva no CT Pedra Branca, afirmou que o objetivo da temporada é o acesso à Série B. O clube investiu cerca de R$ 3,2 milhões nas contratações, o maior investimento do clube em muitos anos.</p>`,
    category: { name: 'Esportes', slug: 'esportes', color: '#00E08A' },
    author: { id: '2', name: 'Rafael Azevedo', slug: 'rafael-azevedo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', role: 'Repórter de Economia' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    readTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&q=80',
    imageAlt: 'Estádio de futebol durante partida',
    tags: ['sampaio corrêa', 'futebol', 'série c', 'maranhão'],
    featured: false,
    breaking: false,
    views: 5104,
  },
  {
    id: '7',
    slug: 'startup-maranhense-agritech-captacao-seed',
    title: 'Startup maranhense de agritech levanta R$ 5 milhões em rodada seed para expansão nacional',
    excerpt: 'A AgroMA, plataforma de gestão agrícola fundada em São Luís, recebeu aporte de fundo de venture capital paulista e prevê dobrar equipe em 2025.',
    content: `<p>A AgroMA, startup maranhense especializada em tecnologia para o agronegócio, anunciou o fechamento de uma rodada seed de R$ 5 milhões. O investimento foi liderado pelo fundo de venture capital Agro Capital, com sede em São Paulo, e marca o maior aporte já recebido por uma startup de tecnologia sediada no Maranhão.</p>

<h2>O que a AgroMA faz</h2>
<p>Fundada em 2022 por três ex-alunos da UFMA, a AgroMA oferece uma plataforma SaaS (Software as a Service) que permite pequenos e médios produtores rurais monitorar suas plantações via satélite, controlar pragas com inteligência artificial e acessar crédito rural de forma simplificada. Hoje atende 1.200 propriedades rurais no Maranhão, Piauí e Tocantins.</p>

<h2>Planos de expansão</h2>
<p>Com o novo aporte, a empresa planeja expandir para mais seis estados até o final de 2025, contratar 40 novos funcionários e lançar um módulo de previsão climática por IA. A sede permanecerá em São Luís, no Hub de Inovação do Parque Tecnológico do Maranhão.</p>`,
    category: { name: 'Tecnologia', slug: 'tecnologia', color: '#3B82F6' },
    author: { id: '2', name: 'Rafael Azevedo', slug: 'rafael-azevedo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', role: 'Repórter de Economia' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    imageAlt: 'Tecnologia agrícola e campo',
    tags: ['startup', 'tecnologia', 'agritech', 'são luís', 'inovação'],
    featured: false,
    breaking: false,
    views: 1893,
  },
  {
    id: '8',
    slug: 'temperatura-sao-luis-recorde-historico-marco',
    title: 'Temperatura em São Luís bate recorde histórico para março com 38,7°C nesta semana',
    excerpt: 'Inmet registrou a maior temperatura já medida no mês de março em São Luís desde o início das medições, em 1961. Especialistas alertam para riscos à saúde.',
    content: `<p>São Luís registrou esta semana a maior temperatura já medida no mês de março desde que o Inmet (Instituto Nacional de Meteorologia) iniciou as medições na capital maranhense, em 1961. O termômetro chegou a 38,7°C na quinta-feira, superando o recorde anterior de 38,2°C registrado em março de 2010.</p>

<h2>Causas do calor extremo</h2>
<p>Segundo os meteorologistas do Inmet, a onda de calor é resultado da combinação de três fatores: o fenômeno El Niño, que ainda afeta o hemisfério sul; a diminuição das chuvas na pré-estação (normalmente, março já teria mais precipitações); e o aquecimento global, que eleva as temperaturas médias da região.</p>

<h2>Alertas à saúde</h2>
<p>A Secretaria Municipal de Saúde emitiu alerta para a população, especialmente idosos, crianças e pessoas com doenças respiratórias ou cardiovasculares. As recomendações incluem evitar exposição solar entre 10h e 16h, aumentar a ingestão de água e buscar locais arejados.</p>`,
    category: { name: 'Meio Ambiente', slug: 'meio-ambiente', color: '#22C55E' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    readTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
    imageAlt: 'Sol forte e calor em cidade',
    tags: ['clima', 'calor', 'são luís', 'meio ambiente', 'saúde'],
    featured: false,
    breaking: true,
    views: 7621,
  },
  {
    id: '9',
    slug: 'viaduto-maracana-obras-mobilidade-sao-luis',
    title: 'Viaduto do Maracanã começa a ser construído e promete reduzir em 40% os congestionamentos',
    excerpt: 'Obra avaliada em R$ 187 milhões terá 1,2 km de extensão e conectará o corredor Maracanã ao Arame, liberando o trânsito em uma das regiões mais críticas de São Luís.',
    content: `<p>As obras do Viaduto do Maracanã, uma das maiores intervenções viárias da história de São Luís, tiveram início nesta semana. A estrutura, com 1,2 quilômetros de extensão, vai conectar a Avenida dos Portugueses ao Corredor do Arame, aliviando um dos trechos mais congestionados da capital maranhense.</p>

<h2>Impacto esperado no trânsito</h2>
<p>Estudos de engenharia de tráfego indicam que o viaduto reduzirá em até 40% o tempo de deslocamento entre os bairros Maracanã e Anil nos horários de pico. Atualmente, percorrer este trecho pode levar mais de 50 minutos em horário de rush; com a obra concluída, a previsão é de 15 minutos.</p>

<h2>Prazo e investimento</h2>
<p>A obra tem previsão de conclusão para dezembro de 2026, com investimento de R$ 187 milhões, sendo R$ 120 milhões do governo federal (PAC Cidades) e R$ 67 milhões da Prefeitura de São Luís. Durante as obras, algumas vias auxiliares serão afetadas — a SEMOSP divulga rotas alternativas em seu site.</p>`,
    category: { name: 'Trânsito', slug: 'transito', color: '#EAB308' },
    author: { id: '2', name: 'Rafael Azevedo', slug: 'rafael-azevedo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', role: 'Repórter de Economia' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    readTime: 4,
    imageUrl: 'https://cdn.brasil247.com/pb-b247gcp/swp/jtjeq9/media/20180626020612_5b3184ee79b75f796a4e7368jpeg.jpeg',
    imageAlt: 'Centro histórico de São Luís, Maranhão',
    tags: ['trânsito', 'obras', 'viaduto', 'são luís', 'mobilidade'],
    featured: false,
    breaking: false,
    views: 4318,
  },
  {
    id: '10',
    slug: 'hospital-municipal-sao-luis-ampliacao-uti',
    title: 'Hospital Municipal de São Luís inaugura nova ala com 40 leitos de UTI e equipamentos modernos',
    excerpt: 'Investimento de R$ 28 milhões na ampliação do Hospital Municipal vai reduzir tempo de espera por leitos de terapia intensiva na capital maranhense.',
    content: `<p>O Hospital Municipal Djalma Marques, o Socorrão I, inaugurou nesta sexta-feira sua nova ala de Unidade de Terapia Intensiva (UTI), com 40 leitos equipados com a mais moderna tecnologia hospitalar. O investimento de R$ 28 milhões foi financiado com recursos do governo federal, por meio do Programa de Reestruturação dos Hospitais de Emergência.</p>

<h2>Equipamentos de última geração</h2>
<p>A nova ala conta com 40 respiradores de última geração, monitores cardíacos com transmissão remota de dados, sistema de telemetria para monitoramento à distância e uma central de controle integrada com inteligência artificial para alertas em tempo real. É a UTI com tecnologia mais avançada do Norte-Nordeste, segundo a Secretaria Municipal de Saúde.</p>

<h2>Redução nas filas</h2>
<p>Com a ampliação, São Luís passa a ter 187 leitos de UTI na rede pública, um acréscimo de 27%. A previsão é que o tempo de espera por leito de UTI, que chegou a 72 horas em 2024, caia para menos de 12 horas nos próximos meses.</p>`,
    category: { name: 'Saúde', slug: 'saude', color: '#EC4899' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    imageAlt: 'Hospital moderno com equipamentos médicos',
    tags: ['saúde', 'hospital', 'uti', 'são luís'],
    featured: false,
    breaking: false,
    views: 3541,
  },
  {
    id: '12',
    slug: 'artemis-2-retorno-orion-amerissagem-pacifico-2026',
    title: 'Cápsula Orion da Artemis 2 amerissa no Pacífico e astronautas retornam à Terra após 10 dias',
    excerpt: 'Missão histórica da NASA se encerrou com sucesso com a recuperação dos quatro tripulantes pelo USS San Diego. Missão confirmou viabilidade do programa lunar americano.',
    content: `<p>A cápsula <strong>Orion</strong> da missão <strong>Artemis 2</strong> amerissou com sucesso no <strong>Oceano Pacífico</strong>, ao largo das costas da Califórnia, na tarde desta quinta-feira, encerrando dez dias de uma das viagens espaciais mais importantes da história humana. Os quatro astronautas — Reid Wiseman, Victor Glover, Christina Koch e Jeremy Hansen — foram recuperados em perfeitas condições de saúde pelo navio da Marinha americana <strong>USS San Diego</strong>.</p>

<p>O retorno à Terra foi marcado por uma entrada atmosférica precisa. A cápsula Orion atingiu a atmosfera a aproximadamente <strong>39.000 km/h</strong>, gerando um escudo de plasma em torno do veículo com temperaturas que chegaram a 2.760 °C — mais quente que a superfície do Sol. O escudo térmico da cápsula resistiu sem falhas, confirmando seu desempenho para futuras missões, incluindo a Artemis 3, que prevê pouso na superfície lunar.</p>

<h2>Os dez dias da missão</h2>
<p>Durante a viagem, a tripulação realizou uma série de experimentos científicos a bordo da cápsula Orion, testou sistemas de suporte de vida e avaliou o comportamento humano em longos períodos fora da esfera de influência gravitacional terrestre. O ponto culminante foi o sobrevoo da Lua no quarto dia, quando a Orion se aproximou a <strong>8.900 km</strong> da superfície lunar — registrando as imagens mais nítidas de nosso satélite natural já capturadas por uma missão tripulada desde 1972.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1541873676-a18131494184?w=1200&q=80" alt="Astronauta caminhando na superfície lunar durante missão histórica da NASA" />
  <figcaption>Registro histórico de astronauta na superfície lunar — a Artemis 2 preparou o terreno para que humanos voltem a pisar na Lua na missão Artemis 3 — Crédito: NASA</figcaption>
</figure>

<blockquote>Ver a Terra do outro lado da Lua, pequena e frágil naquele vazio imenso, mudou algo em mim. Cada um de nós teve que parar e simplesmente absorver aquilo. — Christina Koch, especialista de missão da Artemis 2</blockquote>

<h2>Amerissagem e recuperação</h2>
<p>A cápsula abriu seus três paraquedas principais a cerca de 2.700 metros de altitude, desacelerando progressivamente até tocar o oceano a aproximadamente <strong>9 m/s</strong>. Equipes de mergulhadores da Marinha americana chegaram à cápsula em menos de dois minutos após o impacto com a água. Os astronautas saíram da cápsula com auxílio da equipe de recuperação e foram transferidos para o USS San Diego, onde passaram por avaliação médica inicial.</p>

<p>A NASA informou que todos os quatro tripulantes apresentaram boa condição física, sem sinais de problemas cardiovasculares ou de adaptação à gravidade — resultado esperado para uma missão de dez dias, consideravelmente mais curta que as estadias de seis meses a bordo da Estação Espacial Internacional.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80" alt="Vista aérea do Oceano Pacífico onde a cápsula Orion da Artemis 2 realizou a amerissagem" />
  <figcaption>Vista aérea da região do Oceano Pacífico onde a cápsula Orion amerissou — equipes de recuperação da Marinha americana aguardavam na área — Crédito: NASA/US Navy</figcaption>
</figure>

<h2>O caminho para Artemis 3</h2>
<p>Com o sucesso da Artemis 2 confirmado, a NASA anunciou que os dados coletados durante a missão serão analisados nos próximos meses para definir o cronograma final da <strong>Artemis 3</strong>, a missão que finalmente levará humanos de volta à superfície da Lua pela primeira vez desde 1972. A previsão atual indica lançamento entre 2027 e 2028, com destino à região polar sul lunar, onde evidências de gelo de água foram identificadas.</p>

<p>A administradora associada da NASA para exploração humana, Cathie Koerner, declarou que "a Artemis 2 provou que o sistema funciona, que nossa tripulação está preparada e que a humanidade está pronta para dar o próximo passo". O programa conta com a parceria de 26 países, incluindo o Brasil por meio da Agência Espacial Brasileira (AEB), que participou do monitoramento orbital da missão a partir da estação de rastreamento em Cuiabá.</p>`,
    category: { name: 'Brasil & Mundo', slug: 'brasil-mundo', color: '#7B8DB8' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80',
    imageAlt: 'Cápsula Orion da Artemis 2 amerissando no Oceano Pacífico após missão lunar histórica',
    tags: ['artemis 2', 'nasa', 'lua', 'espaço', 'orion', 'amerissagem', 'brasil e mundo'],
    featured: true,
    breaking: false,
    views: 24180,
  },
  {
    id: '11',
    slug: 'artemis-2-lancamento-nasa-lua-tripulada-2026',
    title: 'NASA lança Artemis 2 e envia humanos à órbita da Lua pela primeira vez em 52 anos',
    excerpt: 'Foguete SLS decolou do Cabo Canaveral carregando quatro astronautas em missão histórica de circum-navegação lunar. Brasileiros acompanharam ao vivo transmissão da NASA.',
    content: `<p>O foguete <strong>Space Launch System (SLS)</strong> da NASA decolou na madrugada deste sábado do <strong>Complexo de Lançamento 39B</strong>, no Centro Espacial Kennedy, em Cabo Canaveral, na Flórida, carregando a cápsula <strong>Orion</strong> e quatro astronautas em direção à Lua. É a primeira vez desde 1972, durante a missão Apollo 17, que seres humanos viajam à órbita lunar.</p>

<p>A missão <strong>Artemis 2</strong> não tem previsão de pouso — o objetivo é realizar uma trajetória de sobrevoo lunar livre, circum-navegando o satélite natural da Terra a cerca de 8.900 quilômetros de distância da superfície e retornando à Terra em aproximadamente dez dias. É, no entanto, o passo decisivo para a futura missão Artemis 3, que levará humanos de volta ao solo lunar.</p>

<h2>A tripulação histórica</h2>
<p>O comandante da missão é <strong>Reid Wiseman</strong>, veterano da Estação Espacial Internacional. O piloto é <strong>Victor Glover</strong>, que se torna o primeiro astronauta negro a viajar à Lua. A especialista de missão <strong>Christina Koch</strong> é a primeira mulher a embarcar em uma missão lunar. Completa a equipe o canadense <strong>Jeremy Hansen</strong>, o primeiro não-americano a participar de uma missão lunar — um marco para a Agência Espacial Canadense e para o programa de parceria internacional da NASA.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=1200&q=80" alt="Astronauta em traje espacial completo antes do embarque na missão Artemis 2" />
  <figcaption>Astronauta da Artemis 2 em traje de lançamento momentos antes de embarcar na cápsula Orion — Crédito: NASA</figcaption>
</figure>

<h2>Lançamento sem intercorrências</h2>
<p>Após dois adiamentos por condições climáticas adversas na semana anterior, o lançamento ocorreu dentro da janela planejada, às 2h17 (horário de Brasília). Cerca de dois minutos após a decolagem, os propulsores sólidos se separaram do foguete. A terceira fase do SLS completou a injeção trans-lunar com sucesso, colocando a cápsula Orion na trajetória correta em direção à Lua.</p>

<p>O Centro de Controle de Missão em Houston monitorou cada etapa em tempo real. "Confirmamos separação do módulo de serviço europeu e ativação dos sistemas de sobrevivência a bordo. A tripulação está bem e os sistemas respondem nominalmente", anunciou a controladora de voo minutos após o lançamento.</p>

<blockquote>Esta é uma noite que a humanidade vai lembrar. Pela primeira vez em mais de cinco décadas, estamos enviando humanos para ver a Terra do ponto de vista da Lua. — Bill Nelson, administrador da NASA</blockquote>

<h2>Repercussão no Brasil</h2>
<p>A transmissão ao vivo da NASA foi acompanhada por milhões de brasileiros. Planetários, universidades e espaços culturais em todo o país organizaram sessões coletivas de acompanhamento. O Planetário do Ibirapuera, em São Paulo, recebeu mais de 3.000 pessoas durante a madrugada do lançamento. Em São Luís, a UFMA organizou uma transmissão aberta no anfiteatro do Campus do Bacanga.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&q=80" alt="Terra vista do espaço sideral durante a trajetória da missão Artemis 2 rumo à Lua" />
  <figcaption>Vista da Terra registrada pela câmera externa da cápsula Orion horas após o lançamento, já a caminho da Lua — Crédito: NASA</figcaption>
</figure>

<h2>Próximas etapas</h2>
<p>A cápsula Orion levará aproximadamente três dias para chegar às proximidades da Lua. O sobrevoo ocorrerá no quarto dia de missão, quando a tripulação estará a apenas 8.900 km da superfície lunar — a maior proximidade de seres humanos com a Lua desde a Apollo 17. A transmissão ao vivo desse momento está confirmada pela NASA em todas as suas plataformas digitais. O retorno à Terra está previsto para dez dias após o lançamento, com amerissagem no Oceano Pacífico.</p>`,
    category: { name: 'Brasil & Mundo', slug: 'brasil-mundo', color: '#7B8DB8' },
    author: { id: '1', name: 'Carla Mendonça', slug: 'carla-mendonca', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face', role: 'Editora-Chefe' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1457364887197-9150188c107b?w=1200&q=80',
    imageAlt: 'Foguete SLS da NASA decolando do Cabo Canaveral rumo à Lua na missão Artemis 2',
    tags: ['artemis 2', 'nasa', 'lua', 'espaço', 'astronautas', 'brasil e mundo'],
    featured: true,
    breaking: false,
    views: 18420,
  },
  {
    id: '13',
    slug: 'coronel-augusta-andrade-ssp-ma-combate-faccoes-sao-luis-2026',
    title: 'Nova secretária de Segurança do MA declara guerra às facções e promete operações em São Luís e no interior',
    excerpt: 'Coronel Augusta Andrade assumiu o comando da SSP-MA com foco no crime organizado. São Luís já é a capital mais segura do Nordeste e 8ª do Brasil, aponta ranking do CLP.',
    content: `<p>A Coronel <strong>Augusta Andrade</strong> assumiu em março a <strong>Secretaria de Estado da Segurança Pública do Maranhão (SSP-MA)</strong> com uma agenda clara: combater as facções criminosas que avançam sobre o estado, com atenção redobrada à capital São Luís e à cidade de Imperatriz, que enfrenta crescimento da criminalidade organizada.</p>

<p>Com mais de 30 anos de serviço público na Polícia Militar do Maranhão, Augusta Andrade se tornou a segunda mulher a alcançar a patente de coronel na corporação e a primeira a comandar a pasta de segurança do estado. Sua nomeação pelo governador <strong>Carlos Brandão</strong> ocorreu em 17 de março e foi recebida com expectativa por agentes de segurança e representantes da sociedade civil.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80" alt="Central de monitoramento com telas de vigilância representando sistema de inteligência da SSP-MA" />
  <figcaption>Expansão do videomonitoramento e uso de drones é uma das prioridades da nova gestão da SSP-MA — Crédito: SSP-MA</figcaption>
</figure>

<h2>Prioridades da nova gestão</h2>
<p>Em entrevista ao portal Imirante, a secretária detalhou as frentes de atuação que irá priorizar. O combate ao crime organizado encabeça a lista, com foco em "<strong>asfixiar o braço financeiro das facções</strong>" por meio de operações integradas entre Polícia Militar, Polícia Civil e órgãos de inteligência. A expansão do videomonitoramento e o uso de drones em polos estratégicos como São Luís, Imperatriz e Balsas também estão no plano.</p>

<blockquote>Quem tem que ficar preso são eles, não a população. As pessoas precisam ter liberdade para circular pelas ruas da cidade. — Coronel Augusta Andrade, secretária de Segurança Pública do Maranhão</blockquote>

<p>A secretária também destacou que o interior do Maranhão receberá atenção especial, com previsão de grandes operações em Imperatriz nas próximas semanas. "Imperatriz vai ser um dos primeiros locais onde a gente vai fazer uma grande operação", afirmou.</p>

<h2>São Luís lidera segurança no Nordeste</h2>
<p>O novo comando da SSP-MA herda um cenário de avanços na capital. Em janeiro de 2026, o <strong>Centro de Liderança Pública (CLP)</strong> divulgou seu Ranking de Competitividade das Capitais, que colocou São Luís na <strong>8ª posição nacional</strong> e na <strong>1ª posição entre as capitais do Nordeste</strong> em indicadores de segurança pública. A capital maranhense ficou à frente de Fortaleza (17ª), Teresina (18ª), Salvador (22ª) e Recife (24ª).</p>

<figure>
  <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80" alt="Estátua da Justiça simbolizando o compromisso com a segurança pública no Maranhão" />
  <figcaption>São Luís conquistou a 1ª posição no Nordeste e 8ª no Brasil no ranking de segurança pública do CLP em 2026 — Crédito: CLP/Divulgação</figcaption>
</figure>

<p>O governador Carlos Brandão atribuiu o resultado aos investimentos realizados desde 2022: mais de <strong>840 viaturas entregues</strong>, <strong>73 delegacias modernizadas</strong> em todo o estado, reajuste salarial de 20% para policiais militares e bombeiros em 2025, além da adoção de tecnologias de inteligência e monitoramento. "Este resultado reflete os muitos investimentos que fizemos em efetivo, equipamentos, tecnologia e inteligência", disse o governador.</p>

<h2>Carnaval 2026: vitrine da segurança em São Luís</h2>
<p>O desempenho da segurança pública em São Luís ganhou visibilidade nacional durante o <strong>Carnaval 2026</strong>. Com mais de <strong>5,4 milhões de pessoas</strong> nos circuitos da capital, a operação encerrou sem registro de homicídio, feminicídio, latrocínio ou apreensão de armas de fogo nos circuitos oficiais. Os casos de furto de celulares na orla da Litorânea caíram <strong>40%</strong> em relação ao ano anterior, e os roubos de celulares recuaram <strong>98%</strong>.</p>

<p>Para a nova secretária Augusta Andrade, esses números são um ponto de partida, não de chegada. "O Maranhão avançou muito, mas ainda há muito a fazer. Meu compromisso é com a segurança de cada maranhense, em São Luís e em todos os municípios do estado."</p>`,
    category: { name: 'Segurança', slug: 'seguranca', color: '#FF5C20' },
    author: { id: '2', name: 'Rafael Azevedo', slug: 'rafael-azevedo', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face', role: 'Repórter de Economia' },
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    imageAlt: 'Estátua da Justiça representando segurança pública e combate ao crime no Maranhão',
    tags: ['segurança', 'ssp-ma', 'augusta andrade', 'facções', 'são luís', 'ranking', 'polícia'],
    featured: false,
    breaking: false,
    views: 7840,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return articles.filter((a) => a.author.slug === authorSlug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getBreakingArticles(): Article[] {
  return articles.filter((a) => a.breaking);
}

export function getMostRead(n = 5): Article[] {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, n);
}

export function getLatestArticles(n = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, n);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
