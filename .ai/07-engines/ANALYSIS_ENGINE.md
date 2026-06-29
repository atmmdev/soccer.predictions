# SCORING ENGINE — Motor de Pontuação

> Arquivo legado: `ANALYSIS_ENGINE.md`. Neste projeto o motor central de negócio pós-jogo é o **Scoring Engine**, não análise de apostas/EV.

## Visão Geral

O `ScoringService` (backend, contexto Betting) compara palpites com resultados reais e grava `PointHistory`. O ranking é **sempre derivado** desses registros.

## Fluxo

```text
Fixture status → FT
  → buscar Predictions do pool
  → carregar Pool.scoring (BaseScoringRules + cupPhases se CUP)
  → resolver fase/rodada do Fixture
  → calcular pontos por palpite
  → aplicar multiplicador de fase (CUP, se fase eliminatória)
  → gravar PointHistory (imutável)
```

## Entrada

| Dado | Origem |
|------|--------|
| `Prediction` | Placar palpitado + `selectedPlayerId` (0 ou 1 jogador) |
| `Fixture` | Placar real, rodada/fase, status, gols por jogador |
| `Pool.scoring` | `PoolScoringConfig` — regras base e multiplicadores por fase |

## PoolScoringConfig

Ver tipos completos em `DOMAIN.md`. Resumo:

- **`base`** — regras de pontuação por partida (liga e fase de grupos)
- **`cupPhases`** — multiplicadores por fase do mata-mata (`null` em ligas)

## Regras base — pontos por partida

| Campo | Lógica | Default |
|-------|--------|---------|
| `exactScore` | `home === predHome && away === predAway` | 10 |
| `winnerScore` | Gols do time vencedor batem (sem placar exato) | 6 |
| `loserScore` | Gols do time perdedor batem (sem placar exato) | 4 |
| `correctWinner` | Acertou vencedor, sem placar exato nem gols parciais | 3 |
| `correctDraw` | Empate correto, sem placar exato nem gols parciais | 3 |
| `playerGoal` | Jogador escolhido (`selectedPlayerId`) marcou pelo menos 1 gol | 10 |
| `playerHatTrickMultiplier` | Jogador escolhido fez 3+ gols — multiplica bônus do jogador | ×2 |

**Ordem de avaliação do placar:**

1. Placar exato — exclusivo; não soma vencedor/empate parcial
2. Gols do vencedor + gols do perdedor — quando aplicável
3. Vencedor ou empate sem placar exato
4. Bônus de jogador (independente ou cumulativo conforme implementação do use case)

## Multiplicadores por fase (CUP)

A **fase de grupos** (`GROUP`, ×1) usa apenas as regras base.

Fases eliminatórias multiplicam o **total de pontos da partida**:

| Fase | `CupPhase` | Default |
|------|------------|---------|
| Fase de grupos | `GROUP` | ×1 |
| 1/16 de final | `ROUND_OF_32` | ×2 |
| Oitavas de final | `ROUND_OF_16` | ×3 |
| Quartas de final | `QUARTER_FINAL` | ×4 |
| Semi-final | `SEMI_FINAL` | ×5 |
| Terceiro lugar | `THIRD_PLACE` | ×6 |
| Final | `FINAL` | ×6 |

## Escopo por tipo de campeonato

| `Championship.type` | Resolver por |
|---------------------|--------------|
| `LEAGUE` | `Fixture.round` — só `base` |
| `CUP` | `Fixture.phase` → `cupPhases` + `base` |

## Defaults ao criar bolão

Templates pré-preenchidos por `LEAGUE` vs `CUP`. O admin confirma ou edita todos os valores no formulário antes de salvar.

**Frontend (implementado):**

| Arquivo | Responsabilidade |
|---------|------------------|
| `features/pools/mocks/scoring-templates.ts` | Valores padrão |
| `features/pools/schemas/create-pool.schema.ts` | Validação Zod |
| `features/pools/components/dialogs/pool-scoring-rules.tsx` | UI de confirmação/edição |

## Ranking derivado

Queries sobre `PointHistory`:

- Ranking geral do bolão
- Por rodada / fase
- Por mês
- Maior número de acertos (V2)

**Nunca** persistir tabela `Ranking`.

## V2

- Múltiplos jogadores por palpite
- Ajuste manual de pontos (admin)
- Regras compostas por fase com pontuação base diferente (hoje: base única + multiplicador)

## Localização no código

| Camada | Caminho |
|--------|---------|
| Domain (futuro) | `modules/betting/domain/scoring/` |
| Application (futuro) | `modules/betting/application/services/scoring.service.ts` |
| Frontend (mock MVP) | `apps/web/src/features/pools/types/scoring-rules.ts` |
| Trigger (futuro) | Cron pós-sync + job quando `Fixture` → FT |
