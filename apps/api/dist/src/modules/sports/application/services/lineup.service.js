"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineupService = void 0;
const common_1 = require("@nestjs/common");
let LineupService = class LineupService {
    async getFixtureLineup(_fixtureId) {
        throw new common_1.ServiceUnavailableException('Palpite de jogador indisponível nesta versão. Escalações e artilheiros voltam em uma atualização futura.');
    }
};
exports.LineupService = LineupService;
exports.LineupService = LineupService = __decorate([
    (0, common_1.Injectable)()
], LineupService);
//# sourceMappingURL=lineup.service.js.map