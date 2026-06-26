# SCORING ENGINE — Motor de Pontuação

> Arquivo legado: `ANALYSIS_ENGINE.md`. Neste projeto o motor central de negócio pós-jogo é o **Scoring Engine**, não análise de apostas/EV.

## Visão Geral

O `ScoringService` (backend, contexto Betting) compara palpites com resultados reais e grava `PointHistory`. O ranking é **sempre derivado** desses registros.

## Fluxo

```text
Fixture status → FT
  → buscar Predictions do pool
  → resolver PhaseRule (rodada ou fase do jogo)
  → aplicar PointRules do pool
  → gravar PointHistory (imutável)
```

## Entrada

| Dado | Origem |
|------|--------|
| `Prediction` | Placar palpitado pelo usuário |
| `Fixture` | Placar real, rodada/fase, status |
| `PhaseRule[]` | Configuração do bolão |
| `PointRule[]` | Pontos por tipo de acerto |

## Tipos de ponto (MVP)

| Tipo | Lógica |
|------|--------|
| `EXACT_SCORE` | `home === predHome && away === predAway` |
| `CORRECT_WINNER` | Acertou vencedor, sem placar exato |
| `CORRECT_DRAW` | Empate correto, sem placar exato |
| `MULTIPLIER` | Multiplica total da rodada/fase |

**Ordem de avaliação:** placar exato tem prioridade; vencedor/empate só se não for exato.

## Escopo da regra

| `Championship.type` | Resolver por |
|---------------------|--------------|
| `LEAGUE` | `Fixture.round` |
| `CUP` | `Fixture.phase` (GROUP, R16, QF, SF, FINAL) |

## Defaults ao criar bolão

Templates pré-preenchidos por `LEAGUE` vs `CUP` — admin edita antes de salvar.

## Ranking derivado

Queries sobre `PointHistory`:

- Ranking geral do bolão
- Por rodada / fase
- Por mês
- Maior número de acertos (V2)

**Nunca** persistir tabela `Ranking`.

## V2

- `PLAYER_SCORED` — bônus se jogador escolhido marcou
- Regras dinâmicas por fase com multiplicadores compostos
- Ajuste manual de pontos (admin)

## Localização no código

| Camada | Caminho (futuro) |
|--------|------------------|
| Domain | `modules/betting/domain/scoring/` |
| Application | `modules/betting/application/services/scoring.service.ts` |
| Trigger | Cron pós-sync + job quando `Fixture` → FT |
