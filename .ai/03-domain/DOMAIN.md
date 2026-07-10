# DOMAIN.md — Modelo de Domínio

## Visão

Três subdomínios. Ranking **não é entidade** — derivado de `PointHistory`.

## Sports Domain

| Entidade | Descrição |
|----------|-----------|
| `League` | Liga na football-data.org (Brasileirão, Champions…) |
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
  type: 'LEAGUE' | 'CUP';  // influencia PoolScoringConfig no bolão
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
| `Prediction` | Palpite: pool + user + fixture + placar + **1 jogador** para marcar gol (opcional) |
| `PoolScoringConfig` | Regras de pontuação do bolão (base + multiplicadores por fase) |
| `PointHistory` | Registro imutável de pontos — base do ranking |

### Pool é o coração

```text
Brasileirão 2026 (catálogo)
├── Bolão Família
├── Bolão Trabalho
└── Bolão Amigos
```

Todos compartilham fixtures; pontuação pode diferir por bolão.

### PoolScoringConfig

Configuração persistida em `Pool.scoring`. O admin confirma ou edita os valores no dialog **Criar Bolão** antes de salvar.

```typescript
interface BaseScoringRules {
  exactScore: number;              // Placar exato
  winnerScore: number;             // Placar do time vencedor (gols do lado que venceu)
  loserScore: number;              // Placar do time perdedor (gols do lado que perdeu)
  correctWinner: number;           // Vencedor correto, sem placar exato
  drawWithoutExactScore: number;   // Empate no resultado, sem placar exato
  playerGoal: number;              // Jogador escolhido marcou gol na partida
  playerHatTrickMultiplier: number; // Multiplicador se o jogador fizer hat-trick (3 gols)
}

type CupPhase =
  | 'GROUP'
  | 'ROUND_OF_32'    // 1/16 de final
  | 'ROUND_OF_16'    // Oitavas
  | 'QUARTER_FINAL'
  | 'SEMI_FINAL'
  | 'THIRD_PLACE'
  | 'FINAL';

interface CupPhaseRule {
  phase: CupPhase;
  label: string;
  multiplier: number;
}

interface PoolScoringConfig {
  base: BaseScoringRules;
  cupPhases: CupPhaseRule[] | null;  // null para LEAGUE
}
```

### Defaults — pontuação base (liga e fase de grupos)

| Campo | Valor padrão |
|-------|--------------|
| `exactScore` | 10 |
| `winnerScore` | 6 |
| `loserScore` | 4 |
| `correctWinner` | 3 |
| `drawWithoutExactScore` | 3 |
| `playerGoal` | 10 |
| `playerHatTrickMultiplier` | 2 |

### Defaults — multiplicadores por fase (CUP)

| Fase | `CupPhase` | Multiplicador |
|------|------------|---------------|
| Fase de grupos | `GROUP` | ×1 (mesmas regras da liga) |
| 1/16 de final | `ROUND_OF_32` | ×2 |
| Oitavas de final | `ROUND_OF_16` | ×3 |
| Quartas de final | `QUARTER_FINAL` | ×4 |
| Semi-final | `SEMI_FINAL` | ×5 |
| Terceiro lugar | `THIRD_PLACE` | ×6 |
| Final | `FINAL` | ×6 |

### Escopo por tipo de campeonato

| `Championship.type` | Comportamento |
|---------------------|---------------|
| `LEAGUE` | Apenas `base`; pontuação por `Fixture.round` |
| `CUP` | `base` na fase de grupos; fases eliminatórias aplicam `cupPhases[].multiplier` sobre o total da partida |

### Ordem de avaliação (Scoring Engine)

1. Placar exato — se acertou, não soma vencedor/empate parcial
2. Placar do vencedor e do perdedor — quando não é placar exato, mas os gols de cada lado batem
3. Vencedor ou empate sem placar exato
4. Bônus de jogador (`playerGoal`); hat-trick aplica `playerHatTrickMultiplier`
5. Em copas, multiplicador da fase (`cupPhases`) sobre o total da partida

**Implementação frontend (mock):** `apps/web/src/features/pools/types/scoring-rules.ts`, templates em `mocks/scoring-templates.ts`, UI em `components/dialogs/pool-scoring-rules.tsx`.

### Prediction — palpite do participante

```typescript
interface Prediction {
  id: number;
  poolId: number;
  userId: number;
  fixtureId: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  selectedPlayerId: number | null;  // no máximo 1 jogador por palpite
}
```

**Regra de negócio (MVP):** o participante escolhe **no máximo 1 jogador** para marcar gol na partida. Não é permitido palpitar em dois ou mais jogadores no mesmo fixture.

**Regra de UI:** após selecionar um jogador, os demais ficam desabilitados. Para alterar, o usuário usa **Trocar** (reabilita a lista) ou **Remover** (limpa a seleção).

**Prazo do palpite:** envio e edição permitidos apenas até **10 minutos antes** do horário de início (`Fixture.date`). Após o prazo, o palpite fica bloqueado.

**Sem palpite:** se o participante não registrou palpite antes do prazo, **não pontua** na partida (o `ScoringService` ignora — não gera `PointHistory`).

**Implementação:** `constants/prediction-cutoff.ts`, `utils/prediction-window.ts`, validação em `services/prediction.service.ts`.

**Lineup por time:** `FixtureLineup` — `home` / `away` com `team.flag`, `team.name` e `players[]`. Mock em `mocks/fixture-lineups.ts`.

**API:** `GET /fixtures/:id/lineup` retorna 503 nesta versão (lineups fora do plano free). Palpite de jogador volta em v2.

**Tela (mock MVP):** `/predictions` — lista de jogos, dialog de palpite com placar + `PlayerGoalPicker`.

## Identity Domain

| Entidade | Descrição |
|----------|-----------|
| `User` | Usuário com `role`: `SUPER_ADMIN`, `ADMIN`, `PARTICIPANT` |
| `Pool.ownerId` | Único administrador do bolão (também é `PoolUser` ACTIVE) |
| `Notification` | V2 |

### Papéis

- **PARTICIPANT:** cadastro; acesso restrito (sem Campeonatos, Participantes globais, Notificações, Configurações).
- **ADMIN:** promovido ao criar o 1º bolão; irreversível; gerencia só bolões próprios.
- **SUPER_ADMIN:** seed padrão; override de plataforma.

### PoolStatus

- `ACTIVE` — aceita palpites e convites
- `INACTIVE` — pausado
- `CLOSED` — encerrado; libera histórico de palpites entre participantes

## Fluxo principal

```text
1. Admin importa Championship (temporada atual) → Fixtures no catálogo
2. Admin cria Pool + `PoolScoringConfig` + convites
3. Participante ACTIVE palpita Prediction
4. Fixture encerra → ScoringService → PointHistory
5. Ranking = query sobre PointHistory (geral, rodada, fase, mês…)
```

## Integração football-data.org

```text
Área/país → Competition → Temporada → Import (league + teams + all matches)
```

Dados dos selects do dialog: **NestJS proxy** — nunca no React.

Palpite de jogador / lineups: desativado no plano free (v2 futura).
