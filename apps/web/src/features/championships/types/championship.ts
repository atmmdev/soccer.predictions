export type ChampionshipStatus =  | 'ACTIVE' | 'INACTIVE';

export interface Championship {
  id: number;
  name: string;
  country: string;
  season: number;
  status: ChampionshipStatus;
  logoUrl: string;
}