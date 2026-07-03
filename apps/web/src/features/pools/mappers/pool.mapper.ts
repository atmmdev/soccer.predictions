import type { Pool } from '../types/pool';
import type { PoolResponse } from '../services/pool-api.service';

export function mapPoolResponse(pool: PoolResponse): Pool {
  return {
    id: pool.id,
    name: pool.name,
    championshipId: pool.championshipId,
    championshipName: pool.championshipName,
    championshipType: pool.championshipType,
    season: pool.season,
    participantsCount: pool.participantsCount,
    predictionsCount: pool.predictionsCount,
    inviteCode: pool.inviteCode,
    status: pool.status === 'CLOSED' ? 'INACTIVE' : pool.status,
    scoring: pool.scoring,
  };
}
