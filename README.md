# Henrique Rodrigues — Portfólio

React, Vite, TypeScript e CSS. Identidade Graphite & Sage, com DM Sans para títulos, textos e interface e Newsreader no nome e na assinatura. Inclui Home, estudos de caso de ALGORIX e Barbearia Elite e página 404.

## Executar

Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
```

O Vite informa o endereço local. Para produção:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

## Atualizar conteúdo

- `src/data/site.ts`: e-mail, LinkedIn, currículo e domínio definitivo. Campos vazios ficam ocultos. A adição de e-mail habilita o link direto de contato.
- `src/data/projects.ts`: catálogo público, conteúdo e links de ALGORIX e Barbearia Elite. Novos projetos podem ser adicionados à mesma estrutura.
- `src/styles.css`: identidade, componentes compartilhados e estudos de caso.
- `src/home.css`: composição editorial da Home e adaptações para tablet e celular.
- `src/pages/CaseStudy.tsx`: estrutura reutilizável dos estudos de caso.

A foto fornecida foi apenas redimensionada e comprimida em WebP. A captura real do ALGORIX veio do [repositório do projeto](https://github.com/Henri-7/ALGORIX/blob/main/docs/identidade-evidencias/home-desktop.jpg).

A captura da Barbearia Elite foi obtida do site publicado. Seu estudo de caso usa informações do [repositório público](https://github.com/Henri-7/site-barbeiro), sem expor links do GitHub na interface do portfólio.

O LinkedIn está configurado como link de contato. E-mail, currículo e domínio ainda precisam ser fornecidos. Preencha `site.url` e substitua o `og:image` de `index.html` por uma URL absoluta ao publicar, para que o compartilhamento social funcione também sem execução de JavaScript. Os metadados específicos dos estudos de caso são atualizados no cliente.

`dist/` contém a entrega estática. O host precisa redirecionar rotas da aplicação para `index.html`; configurações para Vercel e hosts compatíveis com `_redirects` estão incluídas.

Os testes verificam navegação, menu, conteúdo condicional e acessibilidade estrutural com axe. O ambiente DOM não verifica layout nem contraste visual.
