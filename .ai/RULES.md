# RULES.md — Regras de Código

## Geral

1. TypeScript strict em todo o projeto
2. Nomes em **inglês** no código; UI e docs podem ser **PT-BR**
3. Commits apenas quando solicitado
4. Não adicionar dependências desnecessárias
5. **DDD + SOLID + DRY** — ver checklist na revisão
6. TODOs no código devem ter escopo claro (feature/semana)

## Arquivos

| Extensão | Uso |
|----------|-----|
| `.ts` | hooks, schemas, services, types, mocks |
| `.tsx` | componentes com JSX |

## Backend (NestJS) — desde Semana 2

### Estrutura por bounded context

```text
modules/{context}/
├── domain/
├── application/
└── infrastructure/
```

### Convenções

- Controllers **apenas roteiam** — chamam use cases
- Use cases contêm orquestração
- Regra de negócio no **domain** e **application**
- Prisma só em `infrastructure/persistence`
- DTOs com `class-validator`
- `JwtAuthGuard` em rotas protegidas
- Domínio **nunca** importa NestJS ou Prisma

### API Football

- Cliente HTTP em `infrastructure/integrations`
- Rate limit: meta < 50 req/dia
- Cache Redis para respostas repetidas

## Frontend (Next.js)

### Estrutura feature-first

```text
features/{name}/
├── components/
├── hooks/
├── mocks/
├── schemas/
├── services/
├── types/
└── index.ts
```

### Convenções

- **App Router** (não Pages Router)
- **Server Components** por padrão (`page.tsx` sem `'use client'`)
- Client Components só para interatividade
- **Lifting state** — estado compartilhado no pai (`*List` wrappers)
- Componentes **controlados**: `value` + `onChange` via props
- Um componente = uma responsabilidade (Table → Row → Badge → Actions)
- Dialog: `DialogTrigger` **dentro** do Dialog — sem botão separado
- TanStack Query para API (Semana 3+) — não importar mocks em produção
- Zustand: **não no MVP** — Query + Context auth bastam

### Implementação por feature (ordem)

```text
types → mocks → table → row → badge → actions → filters
→ header → dialog → schema → hook → service → page
```

### UI (acessibilidade)

- Flat, legível, mobile-first
- Ícone + texto em ações
- Toque ≥ 44px
- Tema claro default
- Ver `08-ui/UI_GUIDELINES.md`

## Testes

- Priorizar testes de `ScoringService` e use cases
- Frontend: testes sob demanda no MVP

## Segurança

- JWT access token
- Validação Zod (frontend) + class-validator (backend)
- Frontend nunca chama API Football
- CORS restrito em produção

## Performance

- Redis cache
- `useMemo` para filtros/listas derivadas no cliente
- Cron agendado para sync — não polling contínuo

## Revisão (modo guiado)

Checklist do agente:

1. SRP — componente/hook com uma responsabilidade?
2. Tipos corretos — sem `any`?
3. Props conectadas — sem `value=''` fixo?
4. Import circular?
5. Domínio fora do JSX?
6. UX — legível em 375px?
