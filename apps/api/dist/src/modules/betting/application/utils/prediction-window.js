"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canEditPrediction = canEditPrediction;
exports.getPredictionLockMessage = getPredictionLockMessage;
const prediction_cutoff_js_1 = require("../constants/prediction-cutoff.js");
function getPredictionDeadline(kickoffAt) {
    return new Date(kickoffAt.getTime() - prediction_cutoff_js_1.PREDICTION_CUTOFF_MINUTES * 60_000);
}
function canEditPrediction(fixture, now = new Date()) {
    if (fixture.status !== 'SCHEDULED') {
        return false;
    }
    return now < getPredictionDeadline(fixture.date);
}
function getPredictionLockMessage(fixture, now = new Date()) {
    if (fixture.status === 'LIVE') {
        return 'Partida em andamento. Não é possível alterar o palpite.';
    }
    if (fixture.status === 'FINISHED') {
        return 'Partida encerrada. Não é possível alterar o palpite.';
    }
    if (!canEditPrediction(fixture, now)) {
        return `Prazo encerrado. Palpites só podem ser enviados até ${prediction_cutoff_js_1.PREDICTION_CUTOFF_MINUTES} minutos antes do jogo.`;
    }
    return '';
}
//# sourceMappingURL=prediction-window.js.map