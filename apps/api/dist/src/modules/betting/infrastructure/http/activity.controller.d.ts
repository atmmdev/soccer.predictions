import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ActivityService } from '../../application/services/activity.service.js';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    list(user: AuthUser, limit?: string): Promise<import("../../application/services/activity.service.js").ActivityItem[]>;
}
