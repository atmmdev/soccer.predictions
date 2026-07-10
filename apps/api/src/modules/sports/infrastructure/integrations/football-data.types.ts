export type FootballDataMatchStatus =
  | 'SCHEDULED'
  | 'TIMED'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'SUSPENDED'
  | 'POSTPONED'
  | 'CANCELLED'
  | 'AWARDED';

export interface FootballDataArea {
  id: number;
  name: string;
  code: string | null;
  flag: string | null;
}

export interface FootballDataSeason {
  id: number;
  startDate: string | null;
  endDate: string | null;
  currentMatchday: number | null;
  winner: unknown;
}

export interface FootballDataCompetition {
  id: number;
  name: string;
  code: string | null;
  type: string | null;
  emblem: string | null;
  area?: FootballDataArea;
  currentSeason?: FootballDataSeason | null;
  seasons?: FootballDataSeason[];
}

export interface FootballDataTeam {
  id: number;
  name: string;
  shortName?: string | null;
  tla?: string | null;
  crest?: string | null;
}

export interface FootballDataScorePair {
  home: number | null;
  away: number | null;
}

export interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: FootballDataMatchStatus;
  matchday: number | null;
  stage: string | null;
  group: string | null;
  homeTeam: FootballDataTeam;
  awayTeam: FootballDataTeam;
  score: {
    winner: string | null;
    duration: string | null;
    fullTime: FootballDataScorePair;
    halfTime?: FootballDataScorePair;
  };
  competition?: {
    id: number;
    name: string;
    code: string | null;
  };
}

export interface FootballDataCompetitionsResponse {
  count: number;
  competitions: FootballDataCompetition[];
}

export interface FootballDataMatchesResponse {
  count: number;
  matches: FootballDataMatch[];
}
