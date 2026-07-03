"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canParticipateInPools = canParticipateInPools;
exports.assertCanParticipateInPools = assertCanParticipateInPools;
const common_1 = require("@nestjs/common");
function canParticipateInPools(user) {
    return user.role !== 'SUPER_ADMIN';
}
function assertCanParticipateInPools(user) {
    if (!canParticipateInPools(user)) {
        throw new common_1.ForbiddenException('Super administradores não participam de bolões. Você pode criar bolões para outros participantes.');
    }
}
//# sourceMappingURL=pool-participation.js.map