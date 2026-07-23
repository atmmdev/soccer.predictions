# Stack

## Frontend

- Next.js
- React 19
- TypeScript
- Shadcn/UI
- Tailwind

## Backend

- NestJS (`apps/api`)
- Prisma 7 + MySQL 8
- Redis 7

## Architecture

- Domain-Driven Design (DDD)
- Clean Architecture
- S.O.L.I.D.

## Local development

```bash
# Infra (MySQL + Redis)
docker compose up -d

# API
cd apps/api
cp .env.example .env
npm install
npm run prisma:migrate
npm run start:dev
```

API: `http://localhost:3001/api/health`  
Swagger: `http://localhost:3001/api/docs`

### Seed (SUPER_ADMIN)

Credenciais ficam apenas em `senhas.txt` (local, fora do Git). Defina no `apps/api/.env`:

- `SEED_SUPER_ADMIN_EMAIL`
- `SEED_SUPER_ADMIN_PASSWORD`
- `SEED_SUPER_ADMIN_NAME` (opcional)

```bash
cd apps/api && npm run prisma:seed
```

Demais usuários: cadastro em `/register` (sempre PARTICIPANT; vira ADMIN ao criar o 1º bolão).

## Documentation football-data.org

URL: https://www.football-data.org/documentation/quickstart

Provider: football-data.org v4 (free plan — fixtures, scores, crests).  
Env: `FOOTBALL_DATA_TOKEN`, `FOOTBALL_DATA_BASE_URL`.

## Deploy (Hostinger — soccer.atmm.dev)

Front e API sobem juntos: Next.js na porta pública (`$PORT`) e NestJS interno na `3001`, com proxy de `/api` para o backend.

### hPanel

1. Crie um banco MySQL e anote usuário, senha e nome do banco.
2. **Websites → Add Website → Node.js web app** e conecte este repositório (raiz).
3. Aponte o domínio **`soccer.atmm.dev`** (subdomínio em DNS/registros).
4. Build settings:

| Campo | Valor |
| ----- | ----- |
| Node.js | 22 |
| Install | `npm ci` |
| Build | `npm run build` |
| Start | `npm run start` |
| Arquivo de entrada | `scripts/hostinger-server.mjs` |
| Output directory | `apps/web/.next` |

5. Copie as variáveis de `deploy/hostinger.env.example` para **Environment Variables** no hPanel (ajuste credenciais e secrets).

### URLs em produção

| Recurso | URL |
| ------- | --- |
| App | `https://soccer.atmm.dev` |
| API (browser) | `https://soccer.atmm.dev/api` |
| Health | `https://soccer.atmm.dev/api/health` |
| Swagger | `https://soccer.atmm.dev/api/docs` |

### Desenvolvimento local

Continue usando dois terminais (`apps/api` e `apps/web`) como acima. O proxy `/api` só é usado no deploy unificado.
