import { getCountryFlag } from '../mocks/countries';
import { leagues } from '../mocks/leagues';
import { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import { Championship } from '../types/championship';

let nextId = 100;

export class ChampionshipService {
  static create(data: CreateChampionshipFormData): Championship {
    const league = leagues.find(item => item.id === data.leagueId);

    if (!league) {
      throw new Error('Liga não encontrada');
    }

    const championship: Championship = {
      id: nextId++,
      leagueId: data.leagueId,
      name: league.name,
      country: data.country,
      season: data.season,
      flags: getCountryFlag(data.country),
      type: league.type,
      status: data.active ? 'ACTIVE' : 'INACTIVE',
    };

    return championship;
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
