import { SyncFixturesService } from '../../application/services/sync-fixtures.service.js';
export declare class FixtureSyncScheduler {
    private readonly syncFixturesService;
    private readonly logger;
    constructor(syncFixturesService: SyncFixturesService);
    syncMorning(): Promise<void>;
    syncLive(): Promise<void>;
    syncNightly(): Promise<void>;
}
