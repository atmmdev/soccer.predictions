import type { Prisma } from '../../../../../generated/prisma/client.js';
import type { FootballDataMatch } from '../../infrastructure/integrations/football-data.types.js';
export declare function buildFixtureUpdateData(remote: FootballDataMatch): Prisma.FixtureUpdateInput;
