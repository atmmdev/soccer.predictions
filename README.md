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

### Credenciais padrão (seed)

| E-mail                    | Senha         | Papel       |
| ------------------------- | ------------- | ----------- |
| `admin@admin.com`         | `admin123`    | SUPER_ADMIN |
| `atmm.rj@gmail.com`       | `admin123456` | ADMIN       |
| `participante@gmail.com ` | `senha123`    | PARTICIPANT |

Rodar seed: `cd apps/api && npm run prisma:seed`

## Documentation API Football

URL: https://www.api-football.com/documentation-v3

Credenciais de Teste (seed):

- `admin@admin` / `admin123` (SUPER_ADMIN)

Demais usuários: cadastro em `/register` (sempre PARTICIPANT; vira ADMIN ao criar o 1º bolão).

## Deploy (Hostinger — soccer.atmm.dev)

Front e API sobem juntos: Next.js na porta pública (`$PORT`) e NestJS interno na `3001`, com proxy de `/api` para o backend.

### hPanel

1. Crie um banco MySQL e anote usuário, senha e nome do banco.
2. **Websites → Add Website → Node.js web app** e conecte este repositório (raiz).
3. Aponte o domínio **`soccer.atmm.dev`** (subdomínio em DNS/registros).
4. Build settings:

| Campo | Valor |
| ----- | ----- |
| Node.js | 20 |
| Install | `npm ci` |
| Build | `npm run build:deploy` |
| Start | `npm run start` |

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
