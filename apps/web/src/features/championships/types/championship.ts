export type ChampionshipStatus = 'ACTIVE' | 'INACTIVE';

export interface Championship {
  id: number;
  leagueId: number;
  season: number;
  name: string;
  country: string;
  flags: string;
  type: 'LEAGUE' | 'CUP'; // LEAGUE = pontos corridos; CUP = grupos + mata-mata com multiplicadores por fase
  status: ChampionshipStatus;
}
