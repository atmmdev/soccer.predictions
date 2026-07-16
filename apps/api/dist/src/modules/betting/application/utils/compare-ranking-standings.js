"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareRankingStandings = compareRankingStandings;
function compareRankingStandings(left, right) {
    if (right.points !== left.points) {
        return right.points - left.points;
    }
    if (right.exactScore !== left.exactScore) {
        return right.exactScore - left.exactScore;
    }
    return left.name.localeCompare(right.name, 'pt-BR');
}
//# sourceMappingURL=compare-ranking-standings.js.map