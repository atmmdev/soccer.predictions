# UI Guidelines

## Identidade Visual

- **Nome:** Soccer Predictions — Bolões de Futebol
- **Logo:** `.ai/08-ui/logomarca.png` → copiar para `apps/web/public/logomarca.png` (já existe)
- **Layout mockup:** `.ai/08-ui/layout.png` — **referência principal de UI**
- **Design System:** Shadcn/UI + Tailwind 4
- **Estilo:** Flat, sidebar escura + conteúdo claro, verde esmeralda como accent

## Paleta (extraída do layout.png)

| Token | Uso | Valor sugerido |
|-------|-----|----------------|
| `--sidebar` | Fundo sidebar | `oklch(0.17 0.02 160)` — verde-escuro/quase preto |
| `--sidebar-foreground` | Texto sidebar | branco / zinc-100 |
| `--sidebar-primary` | Item ativo + CTAs | `#10b981` emerald-500 |
| `--background` | Área principal | `oklch(0.98 0.005 260)` — cinza muito claro |
| `--card` | Header, cards | branco |
| `--primary` | Botões, badges, ícones ativos | emerald-500 |

> Conteúdo principal **claro** (acessível para idosos); sidebar **escura** conforme mockup.

## Layout — AppShell (layout.png)

```text
┌─────────────────┬──────────────────────────────────────────┐
│ [Logo]          │ Header: Título + subtítulo | 🔔 👤      │
│                 ├──────────────────────────────────────────┤
│ ■ Dashboard     │                                          │
│   Campeonatos   │              Main (children)             │
│   Bolões        │                                          │
│   ...           │                                          │
│                 ├──────────────────────────────────────────┤
│ OUTROS          │ Footer: barra verde clara com dica 💡    │
│   Config...     │                                          │
│ [👤 User]       │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

### Sidebar

- Logo `logomarca.png` no topo
- Menu principal (sem label)
- Seção **"Outros"** — Configurações, Ajuda, Sair
- `NavUser` no rodapé (avatar + nome + cargo)
- Item ativo: fundo verde (`SidebarMenuButton isActive`)
- Altura dos itens: `h-11` (44px toque)

### Header

- Esquerda: **título** + **subtítulo** da página (não só breadcrumb simples)
- Direita: notificações (badge verde) + usuário compacto
- `SidebarTrigger` visível só em mobile

### Main

- Fundo cinza claro (`bg-background`)
- Padding `px-6 py-6`

### Footer

- Barra `bg-primary/10` com ícone 💡 e texto de dica
- Componente: `app-footer.tsx`

## Arquivos a criar/alterar (checklist implementação)

| Arquivo | Ação |
|---------|------|
| `globals.css` | Paleta emerald + sidebar escura |
| `config/page-meta.ts` | Título + subtítulo por rota |
| `app-breadcrumb.tsx` | Exibir title + subtitle de `page-meta` |
| `app-header.tsx` | Layout header conforme mockup |
| `app-header-user.tsx` | Avatar compacto no header |
| `notification-button.tsx` | Badge verde, `size-11` |
| `app-footer/app-footer.tsx` | Barra de dica |
| `app-shell.tsx` | Footer + `flex-col` + main flex-1 |
| `app-sidebar.tsx` | Grupo "Outros", bordas |
| `nav-main.tsx` | `'use client'` + `isActive` via `usePathname` |
| `nav-user.tsx` | Cores `sidebar-foreground` |
| `app-logo.tsx` | Altura fixa da logomarca |
| `app/layout.tsx` | `lang="pt-BR"`, metadata Soccer Predictions |

## Componentes por feature

- Page (Server) → conteúdo; título da página fica no **header global** (não duplicar h1 na page quando possível)
- Championships: pode remover h1 duplicado do `championship-header` ou manter só ações à direita

## Formulários

- Zod + RHF + Shadcn Form
- CTAs: `Button size="lg"` cor primary verde
- Labels acima dos campos

## PWA (Semana 4)

- manifest + service worker

## Referências visuais

- Mockup: [layout.png](./layout.png)
- Logo: [logomarca.png](./logomarca.png)
