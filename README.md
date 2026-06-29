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

## Documentation API Football

URL: https://www.api-football.com/documentation-v3
