export type ChampionshipStatus = 'ACTIVE' | 'INACTIVE';

export interface Championship {
  id: number;
  leagueId: number;
  season: number;
  name: string;
  country: string;
  flags: string;
  type: 'LEAGUE' | 'CUP'; // TODO: Atenção na hora de montar o bolão, pois o tipo de campeonato pode influenciar na forma como os jogos são organizados e exibidos. Por exemplo, campeonatos do tipo "LEAGUE" geralmente seguem um formato de pontos corridos, enquanto campeonatos do tipo "CUP" podem ter fases eliminatórias.
  status: ChampionshipStatus;
}
