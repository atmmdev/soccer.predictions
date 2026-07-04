# AGENTS.md — Instruções para Agentes IA

## Antes de Qualquer Código

1. Ler `MASTER_PROMPT.md`
2. Verificar fase em `11-roadmap/ROADMAP.md`
3. Consultar tarefas em `09-development/TASKS.md`
4. Seguir `RULES.md`, `03-domain/DOMAIN.md`, `02-architecture/ARCHITECTURE.md`

## Projeto

**Soccer Predictions** — plataforma de bolões de futebol (não é analytics de apostas).

## Estrutura do Repositório

```text
soccer.predictions/
├── .ai/                    # Esta documentação
├── apps/
│   ├── web/                # Next.js 16 + React 19
│   └── api/                # NestJS + Prisma 7 + MySQL 8
├── docs/decisions.md       # Decisões de layout
└── docker-compose.yml      # MySQL + Redis
```

## Bounded Contexts

| Contexto | Frontend | Backend |
|----------|----------|---------|
| Sports | `features/championships`, `features/matches` | `modules/sports/` |
| Betting | `features/pools`, `predictions`, `rankings` | `modules/betting/` |
| Identity | `features/auth` | `modules/identity/` |

## Backend (apps/api)

### Módulos

- `identity` — auth, users, invitations
- `sports` — championships, fixtures, API Football sync
- `betting` — pools, predictions, scoring, rankings

### Motor de negócio pós-jogo

**Scoring Engine** (`ScoringService`) — ver `07-engines/ANALYSIS_ENGINE.md`

Não existem engines de EV/mercados neste projeto.

## Frontend (apps/web)

### Estrutura atual

```text
src/
├── app/
│   ├── (auth)/             # login, register, forgot/reset, logout, oauth callback
│   └── (protected)/        # dashboard, championships, pools, matches,
│                           # predictions, rankings, join, help
├── components/layout/      # AppShell, sidebar, header, footer
├── components/ui/          # Shadcn
├── config/                 # sidebar, breadcrumbs
├── features/
│   ├── auth/               # sessão, guards, forms
│   ├── championships/      # REFERÊNCIA — lista ainda usa mocks locais
│   ├── pools/              # conectado à API
│   ├── matches/            # conectado à API
│   ├── predictions/        # conectado à API (lineups mock)
│   ├── rankings/           # conectado à API
│   ├── dashboard/          # conectado à API
│   ├── help/               # conteúdo estático (V2 no PRD)
│   └── users/              # delegates para super admin
├── middleware.ts           # auth + roles
└── lib/                    # api-client
```

### Padrão Championships (replicar)

`ChampionshipList` = client wrapper com hook + filtros + tabela.

### Regras críticas

- Zero acesso direto à API Football
- Server Components nas pages; client nos forms/filtros
- Feature barrel exports em `index.ts`

## Fluxo de trabalho

```text
Especificação (.ai) → TASKS.md → Implementação → Revisão → Atualizar TASKS/ROADMAP
```

## Modo guiado (autor)

- Autor implementa; agente explica e revisa
- Não fazer grandes refatorações não solicitadas
- Escopo mínimo — diff focado

## Ao finalizar tarefa

1. Atualizar `09-development/TASKS.md`
2. Atualizar `11-roadmap/ROADMAP.md` se mudou fase
3. Não commitar sem solicitação
