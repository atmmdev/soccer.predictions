import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { FixtureService } from '../../application/services/fixture.service.js';
export declare class FixturesController {
    private readonly fixtureService;
    constructor(fixtureService: FixtureService);
    list(user: AuthUser): Promise<import("../../application/services/fixture.service.js").FixtureListItem[]>;
}
