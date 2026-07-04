"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRoundToCupPhase = mapRoundToCupPhase;
function mapRoundToCupPhase(round) {
    if (!round) {
        return null;
    }
    const normalized = round.toLowerCase();
    if (normalized.includes('group')) {
        return 'GROUP';
    }
    if (normalized.includes('round of 32') ||
        normalized.includes('1/16') ||
        normalized.includes('round of 64')) {
        return 'ROUND_OF_32';
    }
    if (normalized.includes('round of 16') ||
        normalized.includes('1/8') ||
        normalized.includes('8th finals')) {
        return 'ROUND_OF_16';
    }
    if (normalized.includes('quarter')) {
        return 'QUARTER_FINAL';
    }
    if (normalized.includes('semi')) {
        return 'SEMI_FINAL';
    }
    if (normalized.includes('3rd') || normalized.includes('third')) {
        return 'THIRD_PLACE';
    }
    if (normalized === 'final' || normalized.endsWith(' - final')) {
        return 'FINAL';
    }
    return null;
}
//# sourceMappingURL=cup-phase.mapper.js.map