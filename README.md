# NEXUX — Plataforma de Ensino UX/UI Design

Projeto acadêmico. Monorepo com dois projetos independentes.

```
nexux/
├── frontend/   React + Vite (JavaScript), Axios, React Router
└── backend/    Node + Express (ES Modules), Prisma, PostgreSQL (Supabase), JWT, Zod
```

## Pré-requisitos
- Node.js 20 ou superior
- Projeto criado no Supabase (para as etapas de banco)

## Instalação

```bash
# Back-end
cd backend
cp .env.example .env      # preencha as variáveis
npm install
npm run dev               # http://localhost:3333/api/health

# Front-end (outro terminal)
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

## Scripts
| Projeto  | Script              | Função                         |
|----------|---------------------|--------------------------------|
| backend  | `npm run dev`       | API com recarga automática     |
| backend  | `npm start`         | API em produção                |
| backend  | `npm run prisma:*`  | generate / migrate / seed      |
| frontend | `npm run dev`       | servidor de desenvolvimento    |
| frontend | `npm run build`     | build de produção              |

## Arquitetura
- **Back-end:** routes → controllers → services (regras de negócio) → Prisma. Middlewares para autenticação, autorização e erros; validators com Zod; config valida o `.env`.
- **Front-end:** components, pages, services (API), contexts (auth e tema), hooks, routes, styles.

## Status
Etapa 1 de 13 concluída: estrutura do repositório e dependências.
