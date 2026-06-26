# DATABASE.md

## MySQL 8 via Prisma

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## Entidades MVP (por contexto)

### Identity

- `User`, `Role`

### Sports

- `League`, `Championship`, `Team`, `Fixture`

### Betting

- `Pool`, `PoolUser`, `Invitation`
- `Prediction`, `PhaseRule`, `PointRule`, `PointHistory`

## Regras

| Regra | Implementação |
|-------|---------------|
| Ranking não é tabela | Query agregada em `PointHistory` |
| Fixtures compartilhados | `Pool.championshipId` → `Fixture.championshipId` |
| Só temporada atual em bolão novo | `Championship.allowNewPools` |
| PointHistory imutável | Insert only; correções via ajuste admin (V2) |

## Índices sugeridos

- `Fixture(championshipId, round, status)`
- `Prediction(poolId, userId, fixtureId)` — unique
- `PointHistory(poolId, userId, fixtureId)`
- `PoolUser(poolId, userId)` — unique
- `Invitation(code)` — unique

## Migrations

- Versionadas via `prisma migrate`
- Seeds apenas para desenvolvimento

## Docker local (Semana 2)

```yaml
services:
  mysql:
    image: mysql:8
  redis:
    image: redis:7
```

## Relacionamentos chave

```text
Championship 1──N Fixture
Championship 1──N Pool
Pool         1──N PoolUser ──N User
Pool         1──N PhaseRule ──N PointRule
Pool         1──N Prediction
Fixture      1──N Prediction
Fixture      1──N PointHistory
```
