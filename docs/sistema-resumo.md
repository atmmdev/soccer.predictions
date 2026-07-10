# Soccer Predictions — Resumo do sistema

## O que é o produto

O Soccer Predictions é uma plataforma de bolões de futebol.

Não é site de apostas nem de odds. A ideia é reunir amigos, família ou colegas de trabalho em um bolão, palpitar o placar dos jogos e disputar o ranking com base nos pontos.

O site em produção fica em: https://soccer.atmm.dev

## Como funciona na prática

1. Um administrador importa um campeonato (ex.: Brasileirão 2026) com os jogos da temporada.
2. Alguém cria um bolão ligado a esse campeonato e define as regras de pontuação.
3. Os participantes entram no bolão por convite ou código.
4. Antes de cada jogo, cada um dá o palpite de placar.
5. Depois do jogo, o sistema calcula os pontos e atualiza o ranking.

(Palpite de jogador / hat-trick fica para uma versão futura.)

Um mesmo campeonato pode ter vários bolões ao mesmo tempo. Exemplo: Bolão da Família, Bolão do Trabalho e Bolão dos Amigos, todos usando os mesmos jogos, mas com regras de pontuação que podem ser diferentes.

## Quem usa e o que cada um pode fazer

Participante: entra em bolões, dá palpites e acompanha ranking, jogos e dashboard.

Admin: nasce quando a pessoa cria o primeiro bolão. Pode criar e gerenciar bolões, importar campeonatos e acompanhar participantes.

Super Admin: perfil de gestão da plataforma (uso interno / seed).

Cadastro normal sempre começa como Participante.

## Regras principais do jogo

O palpite precisa ser feito até 10 minutos antes do início da partida. Quem não palpitar não pontua naquele jogo.

Cada palpite tem placar previsto (obrigatório).

A pontuação depende das regras do bolão. Em geral, o sistema considera coisas como:
- placar exato
- acertar o vencedor
- acertar parte do placar

Em copas, a pontuação pode mudar conforme a fase (grupos, oitavas, final, etc.).

O ranking não é uma “lista inventada”: ele nasce do histórico de pontos de cada participante no bolão.

## O que o usuário vê no site

Área pública / autenticação:
- login
- cadastro
- esqueci minha senha
- login social (Google e Instagram — em breve / conforme configuração)

Área logada:
- Dashboard
- Bolões
- Jogos
- Meus Palpites
- Ranking
- Estatísticas
- Perfil
- Ajuda

Para admin, aparecem também opções como Campeonatos, Participantes, Notificações e Configurações.

Notificações ainda estão previstas para uma próxima versão.

## Como o sistema está montado por dentro

O projeto é um monorepo com duas partes principais:

apps/web — o site que a pessoa usa (Next.js + React).

apps/api — a API que processa login, bolões, jogos, palpites, pontuação e ranking (NestJS).

O banco de dados é MySQL. Localmente também usamos Redis e Docker para desenvolvimento.

A lógica de negócio está organizada em três áreas:
- Identity: usuários, login, convites
- Sports: campeonatos, times, jogos e sincronização com a API de futebol
- Betting: bolões, palpites, pontuação e ranking

## De onde vêm os jogos

Os dados de campeonatos e partidas vêm da [football-data.org](https://www.football-data.org/) (API v4, plano free).

Só o backend fala com essa API (`FOOTBALL_DATA_TOKEN`). O frontend nunca acessa a API diretamente.

No plano free: competitions, fixtures, placares e escudos (crests). Sem escalações / eventos de gol — por isso o palpite de jogador está desativado até uma versão futura.

Isso permite importar ligas/temporadas e manter os jogos atualizados (status e placar). Rate limit free: ~10 requisições/minuto.

## Como sobe em produção (Hostinger)

Em produção, front e API sobem juntos no mesmo app Node.js.

O Next.js atende o site na porta pública. A API NestJS sobe por dentro, na porta 3001. Quando o navegador chama /api, o Next encaminha a requisição para a API.

Banco MySQL fica na Hostinger. No servidor, a conexão deve usar localhost (não o host externo tipo srv*.hstgr.io, que serve para acessar de fora, por exemplo no DBeaver).

Migrations do banco devem ser rodadas do computador de desenvolvimento. Em produção, a migração automática no boot fica desligada de propósito, para não travar a subida do site.

Node.js na Hostinger precisa ser versão 22 ou superior, por causa do Prisma atual.

Arquivo de entrada do app: scripts/hostinger-server.mjs (ou scripts/start-production.mjs, que aponta para o mesmo lugar).

## Status atual (visão de negócio)

O fluxo principal já existe: login, bolão, palpite, jogos, ranking e dashboard.

Ainda há pontos em evolução, como login social com badge “Em breve”, notificações e algumas telas/estatísticas de versões futuras.

O deploy na Hostinger foi o ponto mais sensível recentemente: versão do Node, arquivo de entrada e conexão com o MySQL.
