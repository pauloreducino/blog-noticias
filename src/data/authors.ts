import type { Author } from '@/types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Carla Mendonça',
    slug: 'carla-mendonca',
    role: 'Editora-Chefe',
    bio: 'Jornalista com 12 anos de experiência em coberturas políticas e sociais no Maranhão.',
    bioLong: `Carla Mendonça é jornalista formada pela Universidade Federal do Maranhão (UFMA), com especialização em Jornalismo Político pela PUC-SP. Com mais de 12 anos de carreira, acompanhou as principais eleições e mudanças políticas no estado do Maranhão.

Antes de fundar o São Luís em Foco, trabalhou como repórter na TV Mirante, correspondente para o jornal O Estado do Maranhão e editora do portal Imirante. É referência em cobertura institucional e tem acesso privilegiado às principais lideranças políticas do estado.

Recebeu o Prêmio Maranhense de Jornalismo em 2019 e 2022 na categoria Jornalismo Político.`,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/',
      instagram: 'https://instagram.com/',
      linkedin: 'https://linkedin.com/in/',
      email: 'carla@saoluisemfoco.com.br',
    },
    areas: ['Política', 'Sociedade', 'Gestão Pública'],
    since: '2020',
    articleCount: 487,
  },
  {
    id: '2',
    name: 'Rafael Azevedo',
    slug: 'rafael-azevedo',
    role: 'Repórter de Economia',
    bio: 'Especialista em economia regional e mercado imobiliário do Maranhão.',
    bioLong: `Rafael Azevedo é economista e jornalista, formado pela Universidade Estadual do Maranhão (UEMA). Possui MBA em Finanças pelo Ibmec e atua como repórter especializado em economia há 8 anos.

Cobriu as principais transformações econômicas do Maranhão, incluindo a expansão do Porto do Itaqui, o crescimento das exportações do agronegócio e o desenvolvimento do setor de energias renováveis no estado. Colabora regularmente com publicações especializadas em economia regional.`,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face',
    social: {
      twitter: 'https://twitter.com/',
      instagram: 'https://instagram.com/',
      linkedin: 'https://linkedin.com/in/',
      email: 'rafael@saoluisemfoco.com.br',
    },
    areas: ['Economia', 'Negócios', 'Agronegócio', 'Mercado Imobiliário'],
    since: '2021',
    articleCount: 312,
  },
  {
    id: '3',
    name: 'Priya Noronha',
    slug: 'priya-noronha',
    role: 'Repórter Cultural',
    bio: 'Cobre arte, cultura e turismo em São Luís. Especialista em patrimônio histórico.',
    bioLong: `Priya Noronha é jornalista e historiadora, formada pela UFMA com mestrado em Patrimônio Cultural pela Universidade de Lisboa. Nascida e criada em São Luís, tem paixão pela história e cultura do Maranhão.

Especialista em Bumba-meu-boi e festas juninas, já publicou artigos acadêmicos sobre as manifestações culturais maranhenses. Documenta e divulga o rico patrimônio histórico do centro de São Luís e da região dos Lençóis Maranhenses. Também cobre a cena musical, gastronômica e de artes visuais da capital.`,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop&crop=face',
    social: {
      instagram: 'https://instagram.com/',
      twitter: 'https://twitter.com/',
      youtube: 'https://youtube.com/',
      email: 'priya@saoluisemfoco.com.br',
    },
    areas: ['Cultura', 'Turismo', 'Patrimônio Histórico', 'Arte'],
    since: '2022',
    articleCount: 224,
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
