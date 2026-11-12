# NEXUX — Curso de UX/UI Design

Landing page acadêmica para apresentar um curso introdutório de UX/UI e demonstrar uma matrícula. Use dados fictícios no formulário. A simulação roda no navegador, sem cobrança e sem envio ou armazenamento dos campos pela aplicação.

## Executar

Com Node.js 20 ou superior, execute na pasta `frontend`:

```sh
npm.cmd ci
npm.cmd run dev
```

Para gerar a versão de produção, use `npm run build`. O Vercel deve usar `frontend` como diretório raiz e `dist` como saída do Vite. O backend Express/Prisma permanece no repositório e é independente desta demonstração.

## Duplo Diamante

- **Descobrir** — O público-alvo são iniciantes em UX/UI, incluindo estudantes e pessoas explorando uma transição de carreira. As hipóteses de projeto são que esse público precisa saber se pode começar do zero, o que vai praticar e quanto custaria o curso.
- **Definir** — A proposta é sair dos fundamentos e chegar a um projeto para o portfólio. A abertura apresenta o público, os pré-requisitos e o objetivo. O conteúdo organiza a aprendizagem em oito módulos e a seção de preço mostra um valor único.
- **Desenvolver** — A página permite consultar os módulos antes de tomar a decisão. O formulário separado mantém o resumo do curso visível e pede somente nome e e-mail para a simulação.
- **Entregar** — O fluxo permite abrir o formulário, corrigir campos inválidos, confirmar a simulação e voltar ao curso. A demonstração pode ser apresentada em telas móveis e desktop.

## Heurísticas de Nielsen

- **Visibilidade do status do sistema** — O formulário identifica a simulação e apresenta uma tela de confirmação após o envio válido.
- **Correspondência com o mundo real** — Os botões usam ações diretas, como “Ver conteúdo” e “Simular matrícula”. O preço aparece em reais e a página explica o objetivo do curso.
- **Consistência e padrões** — A página e o formulário compartilham componentes, tipografia, cores e indicadores de foco.
- **Prevenção de erros e controle do usuário** — Os campos obrigatórios e o formato de e-mail são validados antes da confirmação. O formulário informa que a operação é simulada e oferece retorno ao curso.
