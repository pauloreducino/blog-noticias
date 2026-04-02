# 📖 TUTORIAL — São Luís em Foco

Guia completo do zero ao deploy em produção.

---

## ÍNDICE

1. [Instalação Local](#1-instalação-local)
2. [Configurar WordPress no Pantheon.io](#2-configurar-wordpress-no-pantheonid)
3. [Plugins WordPress recomendados](#3-plugins-wordpress-recomendados)
4. [Configurar ACF (campos dos autores)](#4-configurar-acf)
5. [Publicar o primeiro artigo](#5-publicar-o-primeiro-artigo)
6. [Deploy na Vercel](#6-deploy-na-vercel)
7. [Configurar Webhook de Revalidação](#7-configurar-webhook-de-revalidação)
8. [Adicionar anúncios](#8-adicionar-anúncios)
9. [Personalizar cores e nome](#9-personalizar-cores-e-nome)
10. [Adicionar nova categoria](#10-adicionar-nova-categoria)
11. [Fluxo diário de publicação](#11-fluxo-diário-de-publicação)

---

## 1. Instalação Local

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

```bash
# Descompacte o ZIP do projeto
unzip saoluis-em-foco.zip
cd saoluis-em-foco

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.local.example .env.local
```

Abra `.env.local` e preencha:

```env
WORDPRESS_API_URL=http://localhost/wp-json/wp/v2
REVALIDATE_SECRET=qualquer_chave_secreta_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=São Luís em Foco
NEXT_PUBLIC_SITE_DESCRIPTION=O portal de notícias de São Luís e do Maranhão
```

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000** — o site já estará rodando com os dados de fallback locais (10 artigos de exemplo).

---

## 2. Configurar WordPress no Pantheon.io

### 2.1 Criar conta no Pantheon

1. Acesse [pantheon.io](https://pantheon.io) e crie uma conta gratuita
2. Clique em **Create New Site**
3. Escolha **WordPress**
4. Dê um nome (ex: `saoluis-em-foco`)
5. Aguarde a criação (2-3 minutos)

### 2.2 Acessar o WordPress

1. No painel do Pantheon, vá em **Visit Development Site**
2. Complete a instalação do WordPress (idioma, usuário, senha)
3. Anote a URL — será algo como `https://live-saoluis-em-foco.pantheonsite.io`

### 2.3 Habilitar CORS para a API REST

Adicione ao `functions.php` do seu tema (ou via plugin WP CORS):

```php
function add_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
add_action('init', 'add_cors_headers');
```

### 2.4 Atualizar `.env.local` com a URL do Pantheon

```env
WORDPRESS_API_URL=https://live-saoluis-em-foco.pantheonsite.io/wp-json/wp/v2
```

---

## 3. Plugins WordPress Recomendados

Instale em **Plugins > Adicionar novo**:

| Plugin | Para que serve |
|--------|----------------|
| **Advanced Custom Fields (ACF)** | Campos customizados (read_time, breaking, etc) |
| **WP CORS** | Habilitar CORS para a API REST |
| **Yoast SEO** | SEO avançado e sitemaps |
| **WP Fastest Cache** | Cache de páginas |

---

## 4. Configurar ACF

### 4.1 Grupo: Informações do Artigo

Em **ACF > Grupos de campos > Adicionar novo**:

- Nome do grupo: `Informações do Artigo`
- Local: Post Type é igual a Post

Campos:

| Rótulo | Nome | Tipo |
|--------|------|------|
| Tempo de Leitura | `read_time` | Número |
| Breaking News | `breaking` | Verdadeiro/Falso |
| Artigo em Destaque | `featured` | Verdadeiro/Falso |
| Tags Customizadas | `tags_custom` | Texto (separado por vírgula) |

> **IMPORTANTE:** Em cada campo, ative **"Mostrar no REST API"**

### 4.2 Grupo: Perfil do Autor

Em **ACF > Grupos de campos > Adicionar novo**:

- Nome do grupo: `Perfil do Autor`
- Local: Tipo de usuário é igual a todos

Campos:

| Rótulo | Nome | Tipo |
|--------|------|------|
| Cargo | `cargo` | Texto |
| Bio Longa | `bio_longa` | Área de texto |
| Foto de Perfil | `foto_perfil` | Imagem |
| Twitter | `twitter` | URL |
| Instagram | `instagram` | URL |
| LinkedIn | `linkedin` | URL |
| Áreas de Cobertura | `areas_cobertura` | Texto |
| Membro desde | `membro_desde` | Data |

---

## 5. Publicar o Primeiro Artigo

1. No WordPress, vá em **Posts > Adicionar novo**
2. Escreva o título e o conteúdo
3. Adicione uma **Imagem destacada** (obrigatório para aparecer no site)
4. Selecione uma **categoria** (crie as mesmas categorias do arquivo `src/data/categories.ts`)
5. Preencha os campos ACF:
   - **Tempo de Leitura**: ex. `5`
   - **Breaking News**: marque se for urgente
   - **Artigo em Destaque**: marque para aparecer no hero
6. Clique em **Publicar**

O artigo aparecerá automaticamente no site em até 60 segundos (via ISR) ou imediatamente se o webhook estiver configurado.

---

## 6. Deploy na Vercel

### 6.1 Fazer upload do código no GitHub

```bash
git init
git add .
git commit -m "🚀 Initial commit — São Luís em Foco"
git remote add origin https://github.com/SEU_USUARIO/saoluis-em-foco.git
git push -u origin main
```

### 6.2 Conectar à Vercel

1. Acesse [vercel.com](https://vercel.com) e crie conta
2. Clique em **Add New Project**
3. Importe o repositório do GitHub
4. Em **Environment Variables**, adicione todas as variáveis do `.env.local`:
   - `WORDPRESS_API_URL`
   - `REVALIDATE_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (use a URL da Vercel: `https://saoluis.vercel.app`)
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_SITE_DESCRIPTION`
5. Clique em **Deploy**

O deploy demora ~3 minutos. Após isso, o site estará em `https://saoluis.vercel.app`.

### 6.3 Domínio personalizado (opcional)

Em **Vercel > Seu projeto > Settings > Domains**, adicione seu domínio e configure o DNS conforme instrução da Vercel.

---

## 7. Configurar Webhook de Revalidação

Para que o site atualize automaticamente quando você publicar no WordPress:

### 7.1 No WordPress

Instale o plugin **WP Webhooks** ou use o Yoast SEO (que tem suporte a webhooks).

Configure para enviar um POST para:

```
https://SEU_SITE.vercel.app/api/revalidate?secret=SUA_CHAVE_REVALIDATE
```

Corpo da requisição (JSON):
```json
{ "slug": "{{post_slug}}" }
```

Evento: **Ao publicar ou atualizar um post**

### 7.2 Testar o webhook

Acesse no navegador:
```
https://SEU_SITE.vercel.app/api/revalidate?secret=SUA_CHAVE
```

Deve retornar:
```json
{ "revalidated": true, "timestamp": "..." }
```

---

## 8. Adicionar Anúncios

### 8.1 Anúncios estáticos (imagem)

Edite o componente `AdBanner` onde ele é usado. Exemplo em `src/app/page.tsx`:

```tsx
<AdBanner
  size="leaderboard"
  imageUrl="https://seu-servidor.com/banner-parceiro.jpg"
  linkUrl="https://site-do-parceiro.com.br"
  altText="Anúncio Parceiro XYZ"
/>
```

### 8.2 Google AdSense

1. Cadastre-se no [Google AdSense](https://adsense.google.com)
2. Adicione o script global em `src/app/layout.tsx`:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

3. Substitua o conteúdo do `AdBanner` pelo código de unidade do AdSense.

---

## 9. Personalizar Cores e Nome

### 9.1 Trocar nome do portal

Em `.env.local` (ou nas variáveis da Vercel):
```env
NEXT_PUBLIC_SITE_NAME=Meu Portal de Notícias
```

### 9.2 Trocar a paleta de cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  base: '#060B18',        // fundo principal
  surface: '#0C1424',     // cards e superfícies
  elevated: '#111D35',    // elementos elevados
  cyan: {
    DEFAULT: '#00C8E8',   // cor de destaque principal
  },
  'red-news': '#FF3B5C',  // breaking news
  'amber-news': '#F5A100', // destaques secundários
}
```

E em `src/app/globals.css`, atualize as variáveis CSS correspondentes.

---

## 10. Adicionar Nova Categoria

### 10.1 No arquivo local

Em `src/data/categories.ts`, adicione:

```typescript
{
  id: '13',
  name: 'Minha Categoria',
  slug: 'minha-categoria',
  color: '#FF6B35',
  icon: '🔥',
  description: 'Descrição da categoria.',
  articleCount: 0,
},
```

### 10.2 No WordPress

1. Vá em **Posts > Categorias**
2. Adicione com o **mesmo slug** que você usou no arquivo TypeScript
3. Publique artigos nessa categoria — eles aparecerão automaticamente

---

## 11. Fluxo Diário de Publicação

```
1. Acesse o WordPress  →  https://live-seusite.pantheonsite.io/wp-admin
2. Clique em Posts > Adicionar novo
3. Escreva o título e o conteúdo usando o editor Gutenberg
4. Adicione imagem destacada (preferencialmente 1200×630px)
5. Selecione a categoria correta
6. Preencha os campos ACF (tempo de leitura, featured, breaking)
7. Clique em Publicar
8. O webhook dispara → Vercel revalida as páginas em ~5 segundos
9. O artigo aparece no site automaticamente
```

### Dicas de qualidade

- **Imagens**: Use 1200×630px (proporção 16:9) para melhor aparência no hero
- **Tempo de leitura**: ~200 palavras por minuto (ex.: 800 palavras = 4 min)
- **Breaking news**: Use com moderação — só para notícias urgentes e verificadas
- **Destaque (featured)**: Máximo 1-2 artigos por vez — são os que aparecem no hero
- **Tags**: Use 3-5 tags relevantes separadas por vírgula

---

*Tutorial — São Luís em Foco · Stack: Next.js 14 + WordPress + Vercel + Pantheon.io*
