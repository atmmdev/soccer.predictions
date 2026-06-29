import { championships } from '@/features/championships/mocks/championships';
import type { Championship } from '@/features/championships/types/championship';

export function getActiveChampionships(): Championship[] {
  return championships.filter(championship => championship.status === 'ACTIVE');
}

export function findChampionshipById(
  championshipId: number,
): Championship | undefined {
  return championships.find(championship => championship.id === championshipId);
}
