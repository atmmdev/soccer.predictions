# TASKS.md — Tarefas de Desenvolvimento

> **Última revisão:** 4 jul 2026 — alinhado ao código em `apps/web` e `apps/api`.

## Legenda

- `[x]` Concluído
- `[ ]` Pendente
- `[~]` Em andamento / parcial

## Progresso MVP estimado: **~72%**

Fluxo funcional com **seed** (login → bolão → palpite → ranking). Bloqueadores: API Football, import real, cron sync, scoring de jogador/copa, deploy.

---

## Semana 1 — Championships + fundamentos (23–29 jun) ✅

### Checkpoint 1 — Lista e filtros

- [x] Alinhar mocks com `Championship` type
- [x] `useChampionshipFilters` + `useMemo`
- [x] `ChampionshipList` (lifting state)
- [x] `ChampionshipStatusBadge` + `ChampionshipActions` na row
- [x] Corrigir import `match-table-row` → `../types/match`
- [x] Breadcrumb dinâmico (`breadcrumbs.ts` + `usePathname`)

### Dialog e polish

- [~] Completar `CreateChampionshipDialog` — cascata país → liga → temporada (ainda mocks; API de import inexistente)
- [ ] **Aplicar layout** de `.ai/08-ui/layout.png` (ver `08-ui/UI_GUIDELINES.md`)
- [x] `globals.css` — paleta emerald + sidebar escura
- [x] AppFooter, page-meta no header, nav ativo verde
- [~] Componentes: `championship-country-select`, `league-select`, `season-select` (parcial no dialog)
- [x] UX baseline: `text-base` no body, botões `lg` nos CTAs
- [ ] Estado vazio na tabela ("Nenhum campeonato encontrado")
- [x] Emojis em `flags` nos mocks / seed

### Adiado (V2 ou depois)

- [ ] CTA "Importar Campeonato" no Dashboard
- [ ] Link tabela de classificação na row (TODO em `championship-row.tsx`)

---

## Semana 2 — Pools + Backend (30 jun – 6 jul) ✅ ~85%

- [x] Feature `pools/` — lista, filtros, criar, join por link (`/join/:code`)
- [x] Formulário `PoolScoringConfig` — regras base + templates LEAGUE/CUP
- [x] `apps/api` NestJS + Prisma + MySQL + Docker Compose + Redis
- [x] Clean Architecture: `identity/` + `betting/` + `sports/` (parcial)
- [x] Auth: register/login JWT + forgot/reset password + OAuth scaffold (Google/Instagram)
- [x] `CreatePool` + validação `allowNewPools`
- [x] Conectar Pools frontend → API (`pool-api.service`, hooks sem TanStack Query)
- [x] `useActiveChampionships` → `GET /championships` (campeonatos ativos para criar bolão)
- [~] Feature `predictions/` — lista + dialog + `PlayerGoalPicker` (lineups mock)
- [x] Feature `matches/` — lista + filtros conectados à API

---

## Semana 3 — Sync + Dados reais (7–13 jul) 🔴 Em andamento ~70%

- [x] Módulo `sports/integrations/` + `ApiFootballClient`
- [x] Endpoints proxy: countries, leagues (+ seasons na resposta)
- [x] `ImportChampionshipService` — fixtures temporada inteira
- [x] Cron sync (`@nestjs/schedule`: 06h, LIVE a cada 5min, 23:59)
- [x] `GET /fixtures/:id/lineup` — escalações reais
- [x] `middleware.ts` auth Next.js (cookies + roles)
- [x] Migrar `/championships` de mocks para API (list + import + sync)
- [x] Features `matches/`, `predictions/` com cards mobile-friendly
- [x] Palpites: `PlayerGoalPicker` via API (dialog)
- [ ] Pontuação de jogador + hat-trick no `ScoringService`
- [ ] Multiplicadores de copa (`cupPhases`) no `scoring-calculator`

---

## Semana 4 — Ranking + Go-live (14–21 jul)

- [~] `ScoringService` + `PointHistory` (regras base OK; jogador/copa pendentes)
- [x] Feature `rankings/` — query derivada, tabela ordenável, legenda
- [x] Convite `/join/:code`
- [x] Dashboard alimentado por API (pools, palpites, ranking)
- [ ] PWA: manifest + service worker
- [ ] Deploy Vercel + Railway/Render
- [ ] Swagger endpoints principais

---

## V2 — Fora do MVP

- [ ] Páginas: `/participants`, `/statistics`, `/notifications`, `/profile`, `/settings`
- [x] `/help` — página implementada (conteúdo estático)
- [ ] WebSocket / notificações push
- [ ] PWA offline (fila de palpites)
- [ ] Standings dedicado
- [ ] TanStack Query nos hooks de dados

---

## TODOs rastreados no código

| Arquivo | TODO | Quando |
|---------|------|--------|
| `championship-row.tsx` | Link classificação | V2 |

---

## Próximas 5 tarefas (ordem sugerida)

1. `ApiFootballClient` + variáveis de ambiente
2. `ImportChampionshipUseCase` + endpoint `POST /championships/import`
3. Cron de sync de fixtures
4. `GET /fixtures/:id/lineup` + remover mocks de `fixture-lineups.ts`
5. Completar `ScoringService` (jogador, hat-trick, `cupPhases`)
