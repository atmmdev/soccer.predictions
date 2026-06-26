# DOMAIN.md — Modelo de Domínio

## Visão

Três subdomínios. Ranking **não é entidade** — derivado de `PointHistory`.

## Sports Domain

| Entidade | Descrição |
|----------|-----------|
| `League` | Liga na API Football (Brasileirão, Champions…) |
| `Championship` | Instância importada: liga + temporada + status |
| `Team` | Time |
| `Fixture` | Confronto (data, placar, status, rodada/fase) |
| `Standing` | Classificação (V2 — tela dedicada) |
| `Statistic` | Estatísticas agregadas (V2) |

### Championship

```typescript
interface Championship {
  id: number;
  leagueId: number;
  season: number;
  name: string;
  country: string;
  flags: string;
  type: 'LEAGUE' | 'CUP';  // influencia PhaseRule no bolão
  status: 'ACTIVE' | 'INACTIVE';
  isCurrentSeason: boolean;  // backend
  allowNewPools: boolean;    // isCurrentSeason && ACTIVE
}
```

### Regra: temporada

- **Temporada atual** → import + ativar → permite novos bolões
- **Temporadas passadas** → somente histórico (sem novos bolões)

## Betting Domain

| Entidade | Descrição |
|----------|-----------|
| `Pool` | Bolão — referencia `championshipId` |
| `PoolUser` | Participante — status ACTIVE para palpitar |
| `Invitation` | Convite manual ou link (`/join/:code`) |
| `Prediction` | Palpite: pool + user + fixture + placar |
| `PhaseRule` | Escopo: `round` (LEAGUE) ou `phase` (CUP) |
| `PointRule` | Tipo + pontos: EXACT_SCORE, CORRECT_WINNER, CORRECT_DRAW, MULTIPLIER |
| `PointHistory` | Registro imutável de pontos — base do ranking |

### Pool é o coração

```text
Brasileirão 2026 (catálogo)
├── Bolão Família
├── Bolão Trabalho
└── Bolão Amigos
```

Todos compartilham fixtures; pontuação pode diferir por bolão.

### PhaseRule — escopo

| Tipo campeonato | Campo | Exemplos |
|-----------------|-------|----------|
| `LEAGUE` | `round: number` | Rodada 1, 2, 3… |
| `CUP` | `phase: enum` | GROUP, R16, QF, SF, FINAL |

### PointRule — tipos MVP

| Tipo | Descrição |
|------|-----------|
| `EXACT_SCORE` | Placar exato |
| `CORRECT_WINNER` | Vencedor (sem placar exato) |
| `CORRECT_DRAW` | Empate (sem placar exato) |
| `MULTIPLIER` | Multiplicador na rodada/fase |

**V2:** `PLAYER_SCORED` — jogador escolhido marcou gol

## Identity Domain

| Entidade | Descrição |
|----------|-----------|
| `User` | Usuário |
| `Role` | ADMIN, PARTICIPANT (futuro) |
| `Notification` | V2 |

## Fluxo principal

```text
1. Admin importa Championship (temporada atual) → Fixtures no catálogo
2. Admin cria Pool + PhaseRules/PointRules + convites
3. Participante ACTIVE palpita Prediction
4. Fixture encerra → ScoringService → PointHistory
5. Ranking = query sobre PointHistory (geral, rodada, fase, mês…)
```

## Integração API Football

```text
País → Liga → Temporada → Import (league + teams + all fixtures)
```

Dados dos selects do dialog: **NestJS proxy** — nunca no React.
