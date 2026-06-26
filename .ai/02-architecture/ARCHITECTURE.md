# ARCHITECTURE.md

## Visão Geral

Monorepo com frontend Next.js e backend NestJS (a criar). Arquitetura **DDD progressiva** + **Clean Architecture** no backend; **feature-first** no frontend.

```text
API Football → NestJS → MySQL → REST → Next.js (React)
                    ↘ Redis (cache)
```

## Monorepo

```text
soccer.predictions/
├── .ai/                 # Documentação para agentes
├── apps/
│   ├── web/             # Next.js — EXISTE
│   └── api/             # NestJS — Semana 2+
├── docker-compose.yml   # MySQL 8 + Redis 7 (Semana 2)
└── docs/decisions.md    # Decisões de UI/layout
```

## Bounded Contexts (DDD)

| Contexto | Responsabilidade | Módulo backend |
|----------|------------------|----------------|
| **Identity** | Auth, usuários, roles, convites | `modules/identity/` |
| **Sports** | Campeonatos, ligas, times, fixtures, sync API Football | `modules/sports/` |
| **Betting** | Bolões, palpites, regras de pontuação, ranking | `modules/betting/` |

```text
Betting ──referencia──► Sports (championshipId)
Betting ──referencia──► Identity (PoolUser)
Sports  ──sync───────► API Football
```

## Backend — Clean Architecture

Por bounded context:

```text
modules/{context}/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── repositories/      # interfaces (DIP)
├── application/
│   ├── use-cases/
│   ├── dtos/
│   └── services/          # ex.: ScoringService
└── infrastructure/
    ├── persistence/       # Prisma repositories
    ├── http/              # Controllers
    └── integrations/      # ApiFootballClient
```

**Regra:** `domain` nunca importa NestJS, Prisma ou HTTP.

### Use cases principais (MVP)

| Use case | Contexto |
|----------|----------|
| `RegisterUser`, `LoginUser` | Identity |
| `ImportChampionship`, `SyncFixtures` | Sports |
| `CreatePool`, `JoinPool`, `SubmitPrediction` | Betting |
| `CalculatePoints` (ScoringService) | Betting |

## Frontend — Feature First

```text
apps/web/src/
├── app/                   # App Router (Server Components)
├── components/
│   ├── layout/            # AppShell, sidebar, header
│   └── ui/                # Shadcn
├── config/                # sidebar, breadcrumbs
├── features/
│   ├── championships/     # types → mocks → components → hooks → schemas → services
│   ├── dashboard/
│   ├── pools/             # (a criar)
│   └── ...
├── hooks/
└── lib/
```

### Padrões frontend

| Padrão | Uso |
|--------|-----|
| Server Component | `page.tsx` — sem hooks |
| Client Component | `'use client'` — forms, filtros, dialogs |
| Custom hooks | Lógica reutilizável (`useChampionshipFilters`) |
| Lifting state | Estado no pai (`ChampionshipList`) |
| Barrel exports | `features/*/index.ts` |
| Zod + RHF | Formulários |
| TanStack Query | Data fetching (Semana 3+) |

### Ordem por feature

```text
types → mocks → table/row/badge/actions → filters → header → dialog(s)
→ schema → hook → service → page.tsx
→ (backend) conectar service → useQuery
```

## Autenticação

- JWT no header `Authorization: Bearer`
- `middleware.ts` no Next.js protege rotas `(protected)`
- `JwtAuthGuard` no NestJS

## Cache Strategy

- Redis: cache de respostas API Football, queries frequentes
- TanStack Query: cache no cliente

## Jobs assíncronos

- `@nestjs/schedule`: sync 06:00, LIVE, 23:59
- Pós-jogo: `ScoringService` → `PointHistory`

## Deploy (MVP)

- Frontend: Vercel
- API + MySQL: Railway ou Render
- PWA: manifest + service worker (Semana 4)
