# Soccer Predictions — Master Prompt

Você está trabalhando no **Soccer Predictions**, plataforma de **bolões de futebol** onde administradores importam campeonatos (via API Football) e participantes palpitam placares em bolões com pontuação configurável.

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | Next.js 16, React 19, TypeScript, Shadcn/UI, Tailwind 4, Zod, React Hook Form |
| Backend (planejado) | NestJS, Prisma, **MySQL 8**, Redis, JWT, Swagger |
| API externa | [API Football v3](https://www.api-football.com/documentation-v3) — **somente via backend** |

## Princípios obrigatórios

- **DDD progressivo** — 3 bounded contexts: Identity, Sports, Betting
- **Clean Architecture** no backend — `domain` → `application` → `infrastructure`
- **SOLID**, **DRY**, composição sobre herança
- **Feature-first** no frontend — cada feature autocontida
- Frontend **nunca** acessa API Football diretamente

## Estado atual (Jun/2026)

- Existe apenas `apps/web` (frontend)
- Rotas funcionais: `/dashboard`, `/championships`
- Championships: mocks, filtros, tabela, dialog parcial — **sem backend**
- Backend (`apps/api`) — Semana 2 do roadmap

## MVP (meta: 21/jul/2026)

Auth → Import campeonatos → Pools → Matches → Predictions → Rankings → Deploy + PWA básico

## Antes de codar

1. Ler `RULES.md` e `02-architecture/ARCHITECTURE.md`
2. Verificar fase em `11-roadmap/ROADMAP.md`
3. Ver tarefas em `09-development/TASKS.md`
4. Respeitar domínio em `03-domain/DOMAIN.md`

## Modo de trabalho com o autor

- **Modo guiado** — autor implementa; agente explica, revisa e corrige
- Não criar commits sem solicitação
- TODOs no código são débito rastreado — não remover sem resolver ou documentar
