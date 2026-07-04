import type { ApiFootballFixtureEvent } from '../../infrastructure/integrations/api-football.types.js';
export interface FixtureGoalScorer {
    playerId: number;
    goals: number;
}
export declare function mapEventsToGoalScorers(events: ApiFootballFixtureEvent[]): FixtureGoalScorer[];
export declare function parseGoalScorers(value: unknown): FixtureGoalScorer[];
export declare function getPlayerGoalCount(goalScorers: FixtureGoalScorer[], playerId: number | null): number;
