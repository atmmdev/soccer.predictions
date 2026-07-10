import type { FixtureStatus } from '../../../../../generated/prisma/client.js';
import type { FootballDataMatchStatus } from '../../infrastructure/integrations/football-data.types.js';
export declare function mapFootballDataFixtureStatus(status: FootballDataMatchStatus | string): FixtureStatus;
export declare function isFinishedFootballDataStatus(status: FootballDataMatchStatus | string): boolean;
export declare function parseFixtureRound(round: string | null): number | null;
