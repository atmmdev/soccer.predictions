# ROADMAP.md

## Meta MVP

**21 de julho de 2026** — bolão testável com amigos (auth, import real, palpites, ranking).

**Ritmo:** 15–20h/semana | **Modo:** guiado (autor implementa, agente revisa)

**Progresso atual (4 jul):** ~**78%** — scoring completo; falta deploy e polish.

---

## Fase 0 — Fundação ✅

- [x] AppShell, sidebar config-driven, Shadcn
- [x] Dashboard (widgets via API)
- [x] Championships: tabela, filtros, dialog parcial
- [x] Documentação `.ai/`
- [x] Tema emerald + sidebar escura (`globals.css`)

## Fase 1 — Championships completo — ~65%

- [~] Dialog import: país → liga → temporada (UI parcial; dados mock)
- [~] UX baseline + polish Championships (footer/header OK; empty states e layout.png pendentes)
- [ ] Conectar listagem admin à API (substituir `useChampionships` mock)

## Fase 2 — Pools + Backend ✅ ~90%

- [x] NestJS + MySQL + Prisma + Redis + Docker Compose
- [x] Auth JWT (+ forgot/reset, OAuth scaffold)
- [x] Pools: criar, listar, join por código, `PoolScoringConfig`
- [x] Frontend Pools conectado à API
- [x] Seed demo (Brasileirão, fixtures, bolão, palpites)

## Fase 3 — Dados reais + Palpites ✅ ~95%

- [x] API Football sync (`ApiFootballClient`, import, cron)
- [x] Matches + Predictions (UI + API)
- [x] Auth middleware frontend
- [x] Lineups reais para palpite de jogador
- [x] Scoring completo (jogador, hat-trick, fases de copa)

## Fase 4 — Ranking + Go-live — ~50%

- [x] Scoring Engine + `PointHistory` (regras base + jogador + copa)
- [x] Rankings derivados
- [x] Convites por link (`/join/:code`)
- [ ] PWA + deploy

---

## Pós-MVP (V2)

| Item | Prioridade | Status |
|------|------------|--------|
| Perfil, Estatísticas, Configurações, Participantes, Notificações | Média | Rotas no menu; páginas ausentes |
| Ajuda | Média | ✅ Página implementada |
| CTA Import no Dashboard | Baixa | Pendente |
| Múltiplos jogadores por palpite | Média | Pendente |
| WebSocket / notificações | Média | Pendente |
| PWA offline (fila palpites) | Média | Pendente |
| Standings dedicado | Média | Pendente |
| DDD avançado (events, CQRS) | Baixa | Pendente |
| Layout polish + animações | Baixa | Pendente |
| TanStack Query nos hooks | Baixa | Pendente |

---

## Prioridade de features (ordem acordada)

```text
✅ Pools → ✅ Matches → ✅ Predictions → ✅ Rankings
→ 🔴 API Football + Import → 🔴 Scoring completo → Deploy
→ Notifications → Profile → Settings → WebSocket → PWA avançado
```

---

## Decisões fechadas

| Tema | Decisão |
|------|---------|
| Banco | MySQL 8 + Prisma |
| Arquitetura | DDD + Clean Architecture progressivo |
| API Football | Só via NestJS |
| Import UI | `/championships` (Dashboard CTA adiado) |
| Temporada | Só atual permite novos bolões |
| Pontuação | Dinâmica por rodada/fase por bolão |
| UX | Flat, responsivo, acessível, PWA básico no MVP |
| Tema | Claro como default |

---

## Cronograma visual

```text
Jun 23 ─── Semana 1: Championships + React/TS     ✅
Jun 30 ─── Semana 2: Pools + Backend scaffold     ✅ ~85%
Jul 07 ─── Semana 3: API Football + Palpites      🔴 em andamento
Jul 14 ─── Semana 4: Ranking + Deploy             ~50%
Jul 21 ─── 🎯 MVP com amigos
```

---

## O que falta para o MVP fechar

1. **ApiFootballClient** — import de campeonato e sync de resultados
2. **Cron** — atualização automática (06h, LIVE, 23:59)
3. **Lineups** — endpoint + UI sem mock
4. **Scoring** — jogador marcador, hat-trick, multiplicadores de copa
5. **Championships admin** — sair dos mocks locais
6. **Deploy** — Vercel (web) + Railway/Render (api) + PWA básico
