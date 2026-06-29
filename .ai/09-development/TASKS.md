# TASKS.md — Tarefas de Desenvolvimento

## Legenda

- `[x]` Concluído
- `[ ]` Pendente
- `[~]` Em andamento

---

## Semana 1 — Championships + fundamentos (23–29 jun)

### Checkpoint 1 — Lista e filtros

- [x] Alinhar mocks com `Championship` type
- [x] `useChampionshipFilters` + `useMemo`
- [x] `ChampionshipList` (lifting state)
- [x] `ChampionshipStatusBadge` + `ChampionshipActions` na row
- [x] Corrigir import `match-table-row` → `../types/match`
- [x] Breadcrumb dinâmico (`breadcrumbs.ts` + `usePathname`)

### Dialog e polish

- [~] Completar `CreateChampionshipDialog` — cascata país → liga → temporada (mocks)
- [ ] **Aplicar layout** de `.ai/08-ui/layout.png` (ver `08-ui/UI_GUIDELINES.md`)
- [ ] `globals.css` — paleta emerald + sidebar escura
- [ ] AppFooter, page-meta no header, nav ativo verde
- [ ] Componentes: `championship-country-select`, `league-select`, `season-select`
- [ ] UX baseline: `text-base` no body, botões `lg` nos CTAs
- [ ] Estado vazio na tabela ("Nenhum campeonato encontrado")
- [ ] Emojis em `flags` nos mocks

### Adiado (V2 ou depois)

- [ ] CTA "Importar Campeonato" no Dashboard
- [ ] Link tabela de classificação na row (TODO existente)

---

## Semana 2 — Pools + Backend (30 jun – 6 jul)

- [~] Feature `pools/` completa (padrão Championships)
- [x] Formulário `PoolScoringConfig` — regras base + multiplicadores CUP (templates LEAGUE/CUP)
- [~] Feature `predictions/` — lista + dialog palpite + `PlayerGoalPicker` (mock)
- [~] Feature `matches/` — lista de jogos + filtros (mock)
- [ ] `apps/api` NestJS + Prisma + MySQL + Docker Compose
- [ ] Clean Architecture: `identity/` + `betting/`
- [ ] Auth: register/login JWT
- [ ] `CreatePool` use case + `allowNewPools` validation
- [ ] Conectar Pools frontend → API (TanStack Query)

---

## Semana 3 — Sync + Matches + Predictions (7–13 jul)

- [ ] Módulo `sports/` + `ApiFootballClient`
- [ ] Endpoints proxy: countries, leagues, seasons
- [ ] `ImportChampionshipUseCase` — fixtures temporada inteira
- [ ] Cron sync (06h, LIVE, 23:59)
- [ ] Features `matches/`, `predictions/` (cards mobile-friendly)
- [ ] `middleware.ts` auth Next.js
- [ ] Trocar mocks Championships por `useQuery`

---

## Semana 4 — Ranking + Deploy (14–21 jul)

- [ ] `ScoringService` + `PointHistory`
- [ ] Feature `rankings/` (query derivada)
- [ ] Convite `/join/:code`
- [ ] PWA: manifest + service worker
- [ ] Deploy Vercel + Railway/Render
- [ ] Swagger endpoints principais

---

## TODOs rastreados no código

| Arquivo | TODO | Quando |
|---------|------|--------|
| `championship-row.tsx` | Link classificação | V2 |
| `ranking-row.tsx` | Top 10 | Semana 4 |
| `match-table-row.tsx` | Bandeiras times | Semana 3 |
