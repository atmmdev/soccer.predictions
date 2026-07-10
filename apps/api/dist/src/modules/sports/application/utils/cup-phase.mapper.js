"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStageToCupPhase = mapStageToCupPhase;
exports.mapRoundToCupPhase = mapRoundToCupPhase;
function mapStageToCupPhase(stage) {
    if (!stage) {
        return null;
    }
    const normalized = stage.toUpperCase();
    if (normalized.includes('GROUP')) {
        return 'GROUP';
    }
    if (normalized.includes('LAST_32') ||
        normalized.includes('ROUND_OF_32') ||
        normalized.includes('1/16')) {
        return 'ROUND_OF_32';
    }
    if (normalized.includes('LAST_16') ||
        normalized.includes('ROUND_OF_16') ||
        normalized.includes('1/8')) {
        return 'ROUND_OF_16';
    }
    if (normalized.includes('QUARTER')) {
        return 'QUARTER_FINAL';
    }
    if (normalized.includes('SEMI')) {
        return 'SEMI_FINAL';
    }
    if (normalized.includes('THIRD') || normalized.includes('PLAYOFF')) {
        return 'THIRD_PLACE';
    }
    if (normalized === 'FINAL' || normalized.endsWith('_FINAL')) {
        return 'FINAL';
    }
    return null;
}
function mapRoundToCupPhase(round) {
    return mapStageToCupPhase(round);
}
//# sourceMappingURL=cup-phase.mapper.js.map