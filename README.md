# Portfólio — Nicolas Marrai

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · next-intl · shadcn/ui

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000 → redireciona para /pt
npm run build    # build de produção + checagem de tipos
npm run lint
npm run typecheck
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Links de contato, currículo PDF, foto, URL do site, seções do menu | `src/data/site.ts` |
| Projetos (cards + modal de detalhes) | `src/data/projects.ts` |
| Experiência | `src/data/experience.ts` |
| Graduação | `src/data/education.ts` |
| Certificados (PDF em `public/certificados/<id>.pdf`, miniatura em `public/certificados/thumbs/<id>.jpg`) | `src/data/certificates.ts` |
| Skills (categorias + origem: profissional/projeto/estudo) | `src/data/skills.ts` |
| Textos da interface (botões, títulos, sobre) | `messages/pt.json` e `messages/en.json` |

- O conteúdo em `src/data` já vem nos dois idiomas (`{ pt: "...", en: "..." }`). Para adicionar um projeto, basta incluir um item na lista, sem mexer em componente.
- Campos vazios em `site.ts` não aparecem no site.
- **Imagens dos projetos:** coloque em `public/projects/<id>.png` (ou .jpg/.webp), por exemplo `public/projects/cognull.png`. O site detecta no build, sem precisar editar código. Sem imagem, aparece um placeholder com o ícone e o nome.
- Foto e PDF do currículo: coloque em `public/` e informe o caminho em `src/data/site.ts`.
- **Fluxo de arquitetura no card** (ex.: Baja): preencha o campo opcional `pipeline` do projeto.
- **SEO:** `site.url` define o canonical, o Open Graph, o `sitemap.xml` e o `robots.txt`. Vazio, usa o domínio de produção da Vercel. A imagem de prévia é gerada em `src/app/[locale]/opengraph-image.tsx`.

## Estrutura

```
messages/            textos da interface (pt/en)
src/app/[locale]/    layout raiz, página única (/pt e /en) e imagem de prévia
src/app/             sitemap.ts e robots.ts
src/i18n/            configuração do next-intl (routing, request, navigation)
src/proxy.ts         redireciona / → /pt (Next 16 chama o middleware de "proxy")
src/components/      seções, cards de projeto e peças do site
src/data/            conteúdo
```

## Deploy

Vercel: importe o repositório do GitHub. Não precisa de variáveis de ambiente.

O GitHub Actions (`.github/workflows/ci.yml`) roda lint, checagem de tipos e build a cada push na `main` e em pull requests.

## Privacidade

- `CLAUDE.local.md` (contexto pessoal) e `Certificados/` (originais com CPF) estão no `.gitignore`. Nunca publicar.
