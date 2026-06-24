import { CreateChampionshipFormData } from '../schemas/create-championship.schema';

export class ChampionshipService {
  static create(data: CreateChampionshipFormData) {
    console.log('Creating championship with data:', data);
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
