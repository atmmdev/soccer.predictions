import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import type { Pool } from '../types/pool';
import { findChampionshipById } from './championship-catalog.service';
import { mapFormToScoringConfig } from './scoring-rules.mapper';

export function getNextPoolId(pools: Pool[]): number {
  const maxId = pools.reduce(
    (currentMax, pool) => Math.max(currentMax, pool.id),
    0,
  );

  return Math.max(maxId, 99) + 1;
}

function generateInviteCode(name: string): string {
  const prefix =
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z]/g, '')
      .slice(0, 3)
      .toUpperCase() || 'BOL';

  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${prefix}${suffix}`;
}

export class PoolService {
  static create(data: CreatePoolFormData, nextId: number): Pool {
    const championship = findChampionshipById(data.championshipId);

    if (!championship) {
      throw new Error('Campeonato não encontrado');
    }

    return {
      id: nextId,
      name: data.name.trim(),
      championshipId: championship.id,
      championshipName: championship.name,
      championshipType: championship.type,
      season: championship.season,
      participantsCount: 0,
      predictionsCount: 0,
      inviteCode: generateInviteCode(data.name),
      status: data.active ? 'ACTIVE' : 'INACTIVE',
      scoring: mapFormToScoringConfig(data),
    };
  }
}
