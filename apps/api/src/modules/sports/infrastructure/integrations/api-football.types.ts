export interface ApiFootballPaging {
  current: number;
  total: number;
}

export interface ApiFootballResponse<T> {
  response: T[];
  paging?: ApiFootballPaging;
  errors?: Record<string, string>;
}

export interface ApiFootballCountry {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface ApiFootballLeagueItem {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  seasons: Array<{
    year: number;
    current?: boolean;
  }>;
}

export interface ApiFootballFixtureItem {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  league: {
    round: string | null;
  };
  teams: {
    home: ApiFootballTeam;
    away: ApiFootballTeam;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

export interface ApiFootballTeam {
  id: number;
  name: string;
  logo: string;
  winner?: boolean | null;
}

export interface ApiFootballLineupPlayer {
  player: {
    id: number;
    name: string;
  };
}

export interface ApiFootballLineupItem {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  startXI: ApiFootballLineupPlayer[];
  substitutes: ApiFootballLineupPlayer[];
}
