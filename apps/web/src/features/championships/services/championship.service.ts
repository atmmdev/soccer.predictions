import { getCountryFlag } from '../mocks/countries';
import { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import { Championship } from '../types/championship';
import { findLeagueById } from './league.service';

export class ChampionshipService {
  static create(
    data: CreateChampionshipFormData,
    nextId: number,
  ): Championship {
    const league = findLeagueById(data.leagueId);

    if (!league) {
      throw new Error('Liga não encontrada');
    }

    return {
      id: nextId,
      leagueId: data.leagueId,
      name: league.name,
      country: data.country,
      season: data.season,
      flags: getCountryFlag(data.country),
      type: league.type,
      status: data.active ? 'ACTIVE' : 'INACTIVE',
    };
  }

  static activate(id: string) {
    console.log('Activating championship with id:', id);
  }

  static deactivate(id: string) {
    console.log('Deactivating championship with id:', id);
  }

  static sync(id: string) {
    console.log('Syncing championship with id:', id);
  }
}

export function getNextChampionshipId(championships: Championship[]): number {
  const maxId = championships.reduce(
    (currentMax, championship) => Math.max(currentMax, championship.id),
    0,
  );

  return Math.max(maxId, 99) + 1;
}
