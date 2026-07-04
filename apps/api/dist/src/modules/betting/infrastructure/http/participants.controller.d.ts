import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ParticipantService } from '../../application/services/participant.service.js';
export declare class ParticipantsController {
    private readonly participantService;
    constructor(participantService: ParticipantService);
    list(user: AuthUser): Promise<import("../../application/services/participant.service.js").PoolParticipantItem[]>;
}
