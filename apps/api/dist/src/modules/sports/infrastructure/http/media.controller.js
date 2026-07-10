"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const team_logo_storage_js_1 = require("../storage/team-logo.storage.js");
let MediaController = class MediaController {
    prisma;
    teamLogoStorage;
    constructor(prisma, teamLogoStorage) {
        this.prisma = prisma;
        this.teamLogoStorage = teamLogoStorage;
    }
    async getTeamLogo(externalId, response) {
        let file = await this.teamLogoStorage.readLocalFile(externalId);
        if (!file) {
            const team = await this.prisma.team.findUnique({
                where: { externalId },
                select: { logo: true },
            });
            await this.teamLogoStorage.ensureLogo(externalId, team?.logo);
            file = await this.teamLogoStorage.readLocalFile(externalId);
        }
        if (!file) {
            throw new common_1.NotFoundException('Logo do time não encontrado');
        }
        response.setHeader('Content-Type', file.contentType);
        response.setHeader('Cache-Control', 'public, max-age=604800, immutable');
        response.send(file.buffer);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Get)('teams/:externalId'),
    __param(0, (0, common_1.Param)('externalId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getTeamLogo", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        team_logo_storage_js_1.TeamLogoStorage])
], MediaController);
//# sourceMappingURL=media.controller.js.map