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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
let FixtureService = class FixtureService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(user) {
        const championshipIds = await this.resolveAccessibleChampionshipIds(user);
        if (championshipIds.length === 0) {
            return [];
        }
        const fixtures = await this.prisma.fixture.findMany({
            where: {
                championshipId: { in: championshipIds },
                status: { in: ['SCHEDULED', 'LIVE', 'FINISHED'] },
            },
            include: {
                homeTeam: true,
                awayTeam: true,
                championship: true,
            },
            orderBy: { date: 'asc' },
        });
        return fixtures.map(fixture => ({
            id: fixture.id,
            championshipName: fixture.championship.name,
            round: fixture.round,
            phase: fixture.phase,
            homeTeam: fixture.homeTeam.name,
            awayTeam: fixture.awayTeam.name,
            homeTeamLogo: fixture.homeTeam.logo ?? '',
            awayTeamLogo: fixture.awayTeam.logo ?? '',
            date: fixture.date.toISOString(),
            status: this.toMatchStatus(fixture.status),
            officialHomeScore: fixture.homeScore,
            officialAwayScore: fixture.awayScore,
        }));
    }
    async resolveAccessibleChampionshipIds(user) {
        if (user.role === 'SUPER_ADMIN') {
            const championships = await this.prisma.championship.findMany({
                select: { id: true },
            });
            return championships.map(championship => championship.id);
        }
        const pools = await this.prisma.pool.findMany({
            where: {
                OR: [
                    { ownerId: user.id },
                    {
                        poolUsers: {
                            some: {
                                userId: user.id,
                                status: 'ACTIVE',
                            },
                        },
                    },
                ],
            },
            select: { championshipId: true },
        });
        return [...new Set(pools.map(pool => pool.championshipId))];
    }
    toMatchStatus(status) {
        if (status === 'LIVE') {
            return 'LIVE';
        }
        if (status === 'FINISHED') {
            return 'FINISHED';
        }
        return 'SCHEDULED';
    }
};
exports.FixtureService = FixtureService;
exports.FixtureService = FixtureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], FixtureService);
//# sourceMappingURL=fixture.service.js.map