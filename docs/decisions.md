# Decisions

## AppShell - é a estrutura principal da aplicação.

Visualmente:

```
┌────────────┬─────────────────────────────┐
│            │ Header                      │
│            ├─────────────────────────────┤
│ Sidebar    │                             │
│            │          Main               │
│            │                             │
│            ├─────────────────────────────┤
│            │ Footer                      │
└────────────┴─────────────────────────────┘
```

Arquivos:

```
└── 📁layout
  ├── app-breadcrumbs.tsx
  ├── app-container.tsx
  ├── app-footer.tsx
  ├── app-header.tsx
  ├── app-shell.tsx
  ├── app-sidebar.tsx
  └── app-title.tsx
```

Irei começar a montar por ela, pois todas as páginas irão reutilizar esse layout. Se iniciasse pelo Login ou Dashboard, teria que refatorá-las.

### Sidebar própria ou Sidebar do Shadcn?

Porque é mais profissional e escalável.

### Links Iniciais - Menu Navigation

- Dashboard
- Campeonatos / Championships
- Bolões / Championships Pools
- Jogos / Matches
- Meus Palpites / Matches Predictions
- Ranking
- Estatísticas / Statistics
- Ligas / Leagues
- Notificações / Notifications
- Perfil / Profiles
- Configurações / Settings
- Ajuda / Helps
- Sair / Logout

# AppSidebar

Eu não quero isso: POrque é muito rígido.

```
<Sidebar>
  <Link>Dashboard</Link>
  <Link>Jogos</Link>
  <Link>Ranking</Link>
  <Link>Perfil</Link>
</Sidebar>
```

Caso eu tenha:

```
Usuário
-------------
- Dashboard
- Jogos

Admin
-------------
- Usuários
- Configurações
- Logs
```

Teríamos que ficar alterando JSX. E escala muito ruim.

Solução:

Criarmos um arquivo de configuração, `sidebar.ts`.
Esse arquivo é responsável, por nos informarar: Nome, Ícone, URL, Permisões. Chamamos isso de `Separation od Concerns`, porque o component `Sidebar`, não sabe o que é: Dashboard, Jogos, ou Ranking, ele apenas renderiza.

### Onde guardar o estado da Sidebar?

Alternativas: useState

```
const [open, setOpen] = useState(true);
```

Problema: Prop drilling

Soluções possíveis:

1. ContextAPI, melhora mas exige muito código.
2. SidebarProvider do Shadcn.

Escolha: SidebarProvider.

## Objetivo: Modelar um item da Sidebar.

Visualmente:

```
🏠 Dashboard

Título: Dashboard
URL: /dashboard
Ícone: Home
```

O que é um tipo? Queremos garantir que todo item da sidebar possua essa estrutura. Isso é um contrato.

No TypeScript, temos duas opções: interface ou type.
Nossa escolha:

```
interface SidebarItem
```

Por quê? Porque estamos descrevendo um objeto.

Eu costumo usar:
`interface`, Para:

- Props
- DTOs
- Objetos
- Contratos

`type`, Para:

- Union Types
- Utility Types
- Tipos compostos

### Diferença entre Client Component e Server Component

Server Components: Porque apenas renderizam.
Client Components: Porque possuem interação. TEndo que usar "use client".

Regra que seguiremos no projeto:

- Server por padrão.
- Client apenas quando necessário.

### O que é Composition?

Montar componentes maiores usando componentes menores.
