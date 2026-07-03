import { UserService } from '../../application/services/user.service.js';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    listPoolDelegates(): Promise<import("../../application/services/user.service.js").PoolDelegateCandidate[]>;
}
