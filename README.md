# 🗞️ São Luís em Foco

Portal de notícias moderno de São Luís e do Maranhão, construído com Next.js 14, TypeScript, Tailwind CSS e WordPress Headless como CMS.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript strict |
| Estilo | Tailwind CSS + CSS Variables |
| CMS | WordPress Headless (REST API) |
| Hospedagem CMS | Pantheon.io (gratuito) |
| Deploy | Vercel |

## Estrutura de Páginas

```
/                     → Homepage com hero magazine
/noticias             → Listagem geral (6 por página)
/noticias/[slug]      → Artigo individual
/categoria/[slug]     → Artigos por categoria (12 categorias)
/autor/[slug]         → Perfil do autor + seus artigos
/busca?q=...          → Busca de artigos
```

## Início Rápido

```bash
# 1. Clone e instale
git clone <repo>
cd saoluis-em-foco
npm install

# 2. Configure variáveis
cp .env.local.example .env.local
# Edite .env.local com suas configurações

# 3. Rode localmente
npm run dev
# Acesse http://localhost:3000
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `WORDPRESS_API_URL` | URL da API REST do WordPress |
| `REVALIDATE_SECRET` | Chave para o webhook de revalidação |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site |
| `NEXT_PUBLIC_SITE_NAME` | Nome do portal |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID |

## Dados de Fallback

O projeto inclui dados locais em `src/data/` que funcionam **sem WordPress**:

- `articles.ts` — 10 artigos completos sobre São Luís
- `authors.ts` — 3 autores com bio e redes sociais
- `categories.ts` — 12 categorias com ícones e cores

## Webhook de Revalidação

Configure no WordPress para chamar:

```
POST https://seu-site.vercel.app/api/revalidate?secret=SUA_CHAVE
```

Isso força o Next.js a regenerar as páginas afetadas.

---

Veja **TUTORIAL.md** para o guia completo de deploy.
