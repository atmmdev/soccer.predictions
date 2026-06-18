# Decisions

## AppShell - é a estrutura principal da aplicação.

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
- Jogos / Matches
- Meus Palpites / Predictions
- Ranking
- Estatísticas / Statistics
- Ligas / Leagues
- Notificações / Notifications
- Perfil / Profiles
- Configurações / Settings
- Ajuda / Helps
- Sair / Logout