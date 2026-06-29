# ROADMAP.md

## Meta MVP

**21 de julho de 2026** — bolão testável com amigos (auth, import real, palpites, ranking).

**Ritmo:** 15–20h/semana | **Modo:** guiado (autor implementa, agente revisa)

---

## Fase 0 — Fundação ✅ (em curso)

- [x] AppShell, sidebar config-driven, Shadcn
- [x] Dashboard (widgets mock)
- [x] Championships: tabela, filtros, dialog parcial
- [x] Documentação `.ai/`

## Fase 1 — Championships completo (Semana 1)

- [~] Dialog import: país → liga → temporada (mocks)
- [ ] UX baseline + polish Championships

## Fase 2 — Pools + Backend (Semana 2)

- [ ] NestJS + MySQL + Prisma + Redis
- [ ] Auth JWT
- [~] Pools CRUD + scoring rules (UI mock: lista + criar com `PoolScoringConfig`)
- [~] Frontend Pools

## Fase 3 — Dados reais + Palpites (Semana 3)

- [ ] API Football sync
- [ ] Matches + Predictions
- [ ] Auth middleware frontend

## Fase 4 — Ranking + Go-live (Semana 4)

- [ ] Scoring Engine + PointHistory
- [ ] Rankings derivados
- [ ] Convites por link
- [ ] PWA + deploy

---

## Pós-MVP (V2)

| Item | Prioridade |
|------|------------|
| Perfil, Estatísticas, Ajuda | Média |
| CTA Import no Dashboard | Baixa |
| Múltiplos jogadores por palpite | Média |
| WebSocket / notificações | Média |
| PWA offline (fila palpites) | Média |
| Standings dedicado | Média |
| DDD avançado (events, CQRS) | Baixa |
| Layout polish + animações | Baixa |

---

## Prioridade de features (ordem acordada)

```text
Pools → Matches → Predictions → Rankings → Notifications
→ Profile → Settings → Backend refinado → WebSocket → PWA avançado
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
Jun 23 ─── Semana 1: Championships + React/TS
Jun 30 ─── Semana 2: Pools + Backend scaffold
Jul 07 ─── Semana 3: API Football + Palpites
Jul 14 ─── Semana 4: Ranking + Deploy
Jul 21 ─── 🎯 MVP com amigos
```
