# PRD — Product Requirements Document

## Visão do Produto

**Soccer Predictions** é uma plataforma de bolões de campeonatos de futebol. Administradores importam campeonatos reais; participantes entram em bolões, palpitam jogos e competem em rankings com regras de pontuação customizáveis por rodada ou fase.

## Problema

Grupos de amigos, família ou trabalho querem organizar bolões de futebol sem planilhas, WhatsApp confuso ou regras inconsistentes. Precisam de:

- Campeonatos e jogos reais atualizados
- Vários bolões no mesmo campeonato (ex.: Bolão Família, Bolão Trabalho)
- Pontuação justa e configurável
- Ranking automático
- Interface simples (incluindo usuários idosos)

## Solução

1. Admin importa campeonato (país → liga → temporada atual) via API Football
2. Sistema persiste times, confrontos e atualiza resultados (cron)
3. Admin cria bolão vinculado ao campeonato ativo
4. Participantes entram por convite (link ou manual)
5. Palpitam placares antes do jogo fechar
6. Sistema calcula pontos (`PointHistory`) e exibe ranking derivado

## Usuários

| Papel | Ações principais |
|-------|------------------|
| **Admin** | Importar campeonatos, criar bolões, configurar regras, convidar |
| **Participante** | Entrar no bolão, palpitar, ver ranking e jogos |

**Futuro:** potencial SaaS multi-tenant.

## Autenticação (MVP)

- Cadastro + login (email/senha)
- JWT access token (refresh token — pós-MVP se necessário)

## Módulos da aplicação

| Rota | Módulo | MVP |
|------|--------|-----|
| `/dashboard` | Dashboard | Sim |
| `/championships` | Campeonatos | Sim |
| `/pools` | Bolões | Sim |
| `/matches` | Jogos | Sim |
| `/predictions` | Meus Palpites | Sim |
| `/rankings` | Ranking | Sim |
| `/participants` | Participantes | Não (convite por link) |
| `/statistics` | Estatísticas | V2 |
| `/notifications` | Notificações | V2 |
| `/profile` | Perfil | V2 |
| `/settings` | Configurações | V2 |
| `/help` | Ajuda | V2 |

## Regras de negócio críticas

### Campeonato = catálogo global

- Import persiste **todos os fixtures** da temporada
- Fixtures **compartilhados** entre bolões — sem duplicação
- Bolão referencia `championshipId`

### Temporada atual vs histórico

| Temporada | Novo bolão? |
|-----------|-------------|
| **Atual** | Sim |
| **Passadas** | Não — apenas histórico (participantes, vitórias, rankings antigos) |

### Pontuação

- Configurável **por bolão**, por **rodada** (liga) ou **fase** (copa)
- Tipos MVP: placar exato, vencedor, empate, multiplicador
- Ranking **derivado** de `PointHistory` — não é tabela

### Convites

- Manual e por link: `https://dominio.com/join/ABC123`

## Fora do MVP (V2+)

- Palpite de jogador que marcou gol (`PLAYER_SCORED`)
- WebSocket / push notifications
- PWA offline (fila de palpites)
- Perfil, Estatísticas, Ajuda, layout polish avançado
- CTA "Importar" no Dashboard
- Standings (tabela de classificação) dedicada

## API Football — rate limit

- Plano gratuito: 100 req/dia — meta operacional: **< 50/dia**
- Sync: 06:00 geral, LIVE durante o dia, 23:59 final
