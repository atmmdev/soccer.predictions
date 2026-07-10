import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

export interface FixtureLineupResponse {
  home: {
    team: {
      id: number;
      name: string;
      flag: string;
    };
    players: Array<{
      id: number;
      name: string;
      teamId: number;
    }>;
  };
  away: {
    team: {
      id: number;
      name: string;
      flag: string;
    };
    players: Array<{
      id: number;
      name: string;
      teamId: number;
    }>;
  };
}

@Injectable()
export class LineupService {
  async getFixtureLineup(_fixtureId: number): Promise<FixtureLineupResponse> {
    throw new ServiceUnavailableException(
      'Palpite de jogador indisponível nesta versão. Escalações e artilheiros voltam em uma atualização futura.',
    );
  }
}
