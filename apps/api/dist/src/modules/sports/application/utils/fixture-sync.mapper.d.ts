import type { Prisma } from '../../../../../generated/prisma/client.js';
import type { ApiFootballFixtureItem } from '../../infrastructure/integrations/api-football.types.js';
import type { FixtureGoalScorer } from '../utils/fixture-goal-scorers.js';
export declare function buildFixtureUpdateData(remote: ApiFootballFixtureItem, goalScorers?: FixtureGoalScorer[]): Prisma.FixtureUpdateInput;
export declare function isFinishedFixtureStatus(shortStatus: string): boolean;
