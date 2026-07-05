"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canViewMemberPrediction = canViewMemberPrediction;
function canViewMemberPrediction(viewer, pool, fixture, memberId) {
    if (viewer.role === 'SUPER_ADMIN') {
        return true;
    }
    if (memberId === viewer.id) {
        return true;
    }
    return fixture.status === 'FINISHED' && pool.status === 'CLOSED';
}
//# sourceMappingURL=prediction-visibility.js.map