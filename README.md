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
