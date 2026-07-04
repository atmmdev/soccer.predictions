import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { FixtureService } from '../../application/services/fixture.service.js';
import { LineupService } from '../../application/services/lineup.service.js';
export declare class FixturesController {
    private readonly fixtureService;
    private readonly lineupService;
    constructor(fixtureService: FixtureService, lineupService: LineupService);
    list(user: AuthUser): Promise<import("../../application/services/fixture.service.js").FixtureListItem[]>;
    getLineup(id: number): Promise<import("../../application/services/lineup.service.js").FixtureLineupResponse>;
}
