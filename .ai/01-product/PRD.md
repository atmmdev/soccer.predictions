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

1. Admin importa campeonato (país → liga → temporada atual) via football-data.org
2. Sistema persiste times, confrontos e atualiza resultados (cron)
3. Admin cria bolão vinculado ao campeonato ativo
4. Participantes entram por convite (link ou manual)
5. Palpitam placares antes do jogo fechar
6. Sistema calcula pontos (`PointHistory`) e exibe ranking derivado

Palpite de jogador / hat-trick: adiado para v2 (plano free sem lineups/events).

## Usuários e papéis

| Papel | Como obtém | Escopo |
|-------|------------|--------|
| **PARTICIPANT** | Cadastro (`/register`) | Bolões inscritos; palpites, ranking, jogos e estatísticas próprias |
| **ADMIN** | Ao criar o **1º bolão** (irreversível) | Gestão dos **bolões que criou** (`Pool.ownerId`); import de campeonato no fluxo de criar bolão; menus Campeonatos, Participantes (dos seus bolões), Notificações e Configurações |
| **SUPER_ADMIN** | Seed `admin@admin` / `admin123` | Acesso total à plataforma |

Regras:

- Cada bolão tem **um único proprietário** (`ownerId`); o dono também participa (palpite, ranking).
- ADMIN **não gerencia** bolões de outros admins; se convidado, entra como participante.
- Participante importa campeonato **apenas no wizard Criar bolão** (sem menu `/championships`).
- Promoção PARTICIPANT → ADMIN **não reverte** ao apagar bolões.
- Palpites de outros participantes ficam visíveis após jogo **FINISHED** e bolão **CLOSED** (histórico).

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

- Configurável **por bolão** — admin confirma ou edita no dialog de criação
- **Liga (`LEAGUE`):** regras base por rodada
- **Copa (`CUP`):** mesmas regras base na fase de grupos; fases eliminatórias com multiplicadores (×2 a ×6)
- Regras base MVP: placar exato, gols do vencedor/perdedor, vencedor/empate sem exato
- Ranking **derivado** de `PointHistory` — não é tabela

### Convites

- Manual e por link: `https://dominio.com/join/ABC123`

### Palpite de jogador (V2)

- Desativado no plano free da football-data.org (sem lineups/events)
- Campos `selectedPlayerId` / `playerGoal` / hat-trick permanecem no schema para reativação futura

### Prazo do palpite

- Envio/edição até **10 minutos antes** do início do jogo
- Depois do prazo: bloqueado
- **Sem palpite no prazo = 0 pontos** na partida

## Fora do MVP (V2+)

- Palpite de jogador / hat-trick (lineups + goal events)
- Múltiplos jogadores por palpite
- WebSocket / push notifications
- PWA offline (fila de palpites)
- Perfil, Estatísticas, Ajuda, layout polish avançado
- CTA "Importar" no Dashboard
- Standings (tabela de classificação) dedicada

## football-data.org — rate limit

- Plano free: ~10 req/minuto — throttle no `FootballDataClient`
- Sync: 06:00 geral, LIVE durante o dia, 23:59 final
