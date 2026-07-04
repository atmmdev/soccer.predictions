import type { ApiFootballFixtureEvent } from '../../infrastructure/integrations/api-football.types.js';

export interface FixtureGoalScorer {
  playerId: number;
  goals: number;
}

export function mapEventsToGoalScorers(
  events: ApiFootballFixtureEvent[],
): FixtureGoalScorer[] {
  const counts = new Map<number, number>();

  for (const event of events) {
    if (event.type !== 'Goal' || !event.player?.id) {
      continue;
    }

    counts.set(event.player.id, (counts.get(event.player.id) ?? 0) + 1);
  }

  return [...counts.entries()].map(([playerId, goals]) => ({
    playerId,
    goals,
  }));
}

export function parseGoalScorers(value: unknown): FixtureGoalScorer[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap(entry => {
    if (!entry || typeof entry !== 'object') {
      return [];
    }

    const record = entry as { playerId?: unknown; goals?: unknown };

    if (
      typeof record.playerId !== 'number' ||
      typeof record.goals !== 'number'
    ) {
      return [];
    }

    return [{ playerId: record.playerId, goals: record.goals }];
  });
}

export function getPlayerGoalCount(
  goalScorers: FixtureGoalScorer[],
  playerId: number | null,
): number {
  if (playerId === null) {
    return 0;
  }

  return goalScorers.find(scorer => scorer.playerId === playerId)?.goals ?? 0;
}
