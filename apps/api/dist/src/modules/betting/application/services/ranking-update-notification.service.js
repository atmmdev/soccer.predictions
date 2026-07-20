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
var RankingUpdateNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingUpdateNotificationService = void 0;
const common_1 = require("@nestjs/common");
const auth_mail_service_js_1 = require("../../../identity/application/services/auth-mail.service.js");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const compare_ranking_standings_js_1 = require("../utils/compare-ranking-standings.js");
const scoring_service_js_1 = require("./scoring.service.js");
const TOP_STANDINGS_LIMIT = 10;
const SEND_GAP_MS = 600;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let RankingUpdateNotificationService = RankingUpdateNotificationService_1 = class RankingUpdateNotificationService {
    prisma;
    authMailService;
    logger = new common_1.Logger(RankingUpdateNotificationService_1.name);
    constructor(prisma, authMailService) {
        this.prisma = prisma;
        this.authMailService = authMailService;
    }
    async notifyForChampionship(championshipId) {
        const pools = await this.prisma.pool.findMany({
            where: {
                championshipId,
                status: 'ACTIVE',
            },
            include: {
                championship: {
                    select: { name: true },
                },
            },
        });
        if (pools.length === 0) {
            this.logger.log(`Nenhum pool ACTIVE para championship=${championshipId} — e-mails de ranking ignorados`);
            return;
        }
        this.logger.log(`Notificando ranking de ${pools.length} pool(s) do championship=${championshipId}`);
        for (const pool of pools) {
            try {
                await this.notifyForPool({
                    poolId: pool.id,
                    poolName: pool.name,
                    championshipName: pool.championship.name,
                });
            }
            catch (error) {
                this.logger.warn(`Falha ao notificar ranking do pool=${pool.id}: ${String(error)}`);
            }
        }
    }
    async notifyForPool(params) {
        const members = await this.prisma.poolUser.findMany({
            where: {
                poolId: params.poolId,
                status: 'ACTIVE',
                user: {
                    role: { not: 'SUPER_ADMIN' },
                    email: { not: { endsWith: '@oauth.soccer.local' } },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (members.length === 0) {
            this.logger.warn(`Pool=${params.poolId} sem membros elegíveis para e-mail de ranking`);
            return;
        }
        this.logger.log(`Preparando ranking update pool=${params.poolId} (${members.length} destinatários)`);
        const ranked = [];
        for (const member of members) {
            const pointHistory = await this.prisma.pointHistory.findMany({
                where: {
                    poolId: params.poolId,
                    userId: member.userId,
                },
                select: {
                    points: true,
                    breakdown: true,
                },
            });
            const aggregated = scoring_service_js_1.ScoringService.aggregateBreakdown(pointHistory);
            ranked.push({
                userId: member.userId,
                email: member.user.email,
                name: member.user.name,
                points: aggregated.points,
                exactScore: aggregated.achievements.exactScore,
                position: 0,
            });
        }
        ranked.sort((left, right) => (0, compare_ranking_standings_js_1.compareRankingStandings)(left, right));
        ranked.forEach((entry, index) => {
            entry.position = index + 1;
        });
        const topStandings = ranked.slice(0, TOP_STANDINGS_LIMIT);
        let sent = 0;
        let failed = 0;
        let skipped = 0;
        for (let index = 0; index < ranked.length; index += 1) {
            const entry = ranked[index];
            const standingsForRecipient = topStandings.map(row => ({
                position: row.position,
                name: row.name,
                points: row.points,
                isRecipient: row.userId === entry.userId,
            }));
            const recipientInTop = standingsForRecipient.some(row => row.isRecipient);
            if (!recipientInTop) {
                standingsForRecipient.push({
                    position: entry.position,
                    name: entry.name,
                    points: entry.points,
                    isRecipient: true,
                });
            }
            try {
                const ok = await this.authMailService.sendRankingUpdated({
                    userId: entry.userId,
                    email: entry.email,
                    name: entry.name,
                    poolId: params.poolId,
                    poolName: params.poolName,
                    championshipName: params.championshipName,
                    recipientPosition: entry.position,
                    recipientPoints: entry.points,
                    standings: standingsForRecipient,
                });
                if (ok) {
                    sent += 1;
                }
                else {
                    skipped += 1;
                }
            }
            catch (error) {
                failed += 1;
                this.logger.warn(`Falha ao enviar ranking para ${entry.email} (pool=${params.poolId}): ${String(error)}`);
            }
            if (index < ranked.length - 1) {
                await sleep(SEND_GAP_MS);
            }
        }
        this.logger.log(`Ranking update emails pool=${params.poolId}: ${sent}/${ranked.length} enviados, ${skipped} ignorados, ${failed} falhas`);
    }
};
exports.RankingUpdateNotificationService = RankingUpdateNotificationService;
exports.RankingUpdateNotificationService = RankingUpdateNotificationService = RankingUpdateNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        auth_mail_service_js_1.AuthMailService])
], RankingUpdateNotificationService);
//# sourceMappingURL=ranking-update-notification.service.js.map