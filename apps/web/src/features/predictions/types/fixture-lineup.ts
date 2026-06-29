export interface LineupTeam {
  id: number;
  name: string;
  /** Emoji no mock; na API, URL do logo (`team.logo` da API Football). */
  flag: string;
}

export interface MatchPlayer {
  id: number;
  name: string;
  teamId: number;
}

export interface FixtureLineup {
  home: {
    team: LineupTeam;
    players: MatchPlayer[];
  };
  away: {
    team: LineupTeam;
    players: MatchPlayer[];
  };
}

export function findPlayerInLineup(
  lineup: FixtureLineup,
  playerId: number | null,
): { player: MatchPlayer; team: LineupTeam } | null {
  if (playerId === null) {
    return null;
  }

  for (const side of [lineup.home, lineup.away]) {
    const player = side.players.find(item => item.id === playerId);

    if (player) {
      return { player, team: side.team };
    }
  }

  return null;
}
