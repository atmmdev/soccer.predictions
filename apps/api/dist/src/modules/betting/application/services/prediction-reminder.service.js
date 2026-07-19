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
var PredictionReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionReminderService = void 0;
const common_1 = require("@nestjs/common");
const auth_mail_service_js_1 = require("../../../identity/application/services/auth-mail.service.js");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const SEND_GAP_MS = 600;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let PredictionReminderService = PredictionReminderService_1 = class PredictionReminderService {
    prisma;
    authMailService;
    logger = new common_1.Logger(PredictionReminderService_1.name);
    constructor(prisma, authMailService) {
        this.prisma = prisma;
        this.authMailService = authMailService;
    }
    async sendDailyReminders() {
        const now = new Date();
        const windowEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const memberships = await this.prisma.poolUser.findMany({
            where: {
                status: 'ACTIVE',
                pool: { status: 'ACTIVE' },
                user: {
                    email: { not: { endsWith: '@oauth.soccer.local' } },
                },
            },
            include: {
                user: true,
                pool: {
                    include: {
                        championship: {
                            include: {
                                fixtures: {
                                    where: {
                                        status: 'SCHEDULED',
                                        date: {
                                            gte: now,
                                            lte: windowEnd,
                                        },
                                    },
                                    include: {
                                        homeTeam: true,
                                        awayTeam: true,
                                    },
                                    orderBy: { date: 'asc' },
                                },
                            },
                        },
                    },
                },
            },
        });
        const byUser = new Map();
        for (const membership of memberships) {
            const fixtures = membership.pool.championship.fixtures;
            if (fixtures.length === 0) {
                continue;
            }
            const fixtureIds = fixtures.map((fixture) => fixture.id);
            const existing = await this.prisma.prediction.findMany({
                where: {
                    poolId: membership.poolId,
                    userId: membership.userId,
                    fixtureId: { in: fixtureIds },
                },
                select: { fixtureId: true },
            });
            const predicted = new Set(existing.map((row) => row.fixtureId));
            const pending = fixtures
                .filter((fixture) => !predicted.has(fixture.id))
                .map((fixture) => ({
                homeTeam: fixture.homeTeam.name,
                awayTeam: fixture.awayTeam.name,
                kickoffLabel: this.formatKickoff(fixture.date),
                poolName: membership.pool.name,
            }));
            if (pending.length === 0) {
                continue;
            }
            const current = byUser.get(membership.userId) ?? {
                email: membership.user.email,
                name: membership.user.name,
                fixtures: [],
            };
            current.fixtures.push(...pending);
            byUser.set(membership.userId, current);
        }
        let sent = 0;
        let failed = 0;
        const recipients = [...byUser.entries()];
        for (let index = 0; index < recipients.length; index += 1) {
            const [userId, payload] = recipients[index];
            try {
                const ok = await this.authMailService.sendPredictionReminder({
                    userId,
                    email: payload.email,
                    name: payload.name,
                    fixtures: payload.fixtures,
                });
                if (ok) {
                    sent += 1;
                }
            }
            catch (error) {
                failed += 1;
                this.logger.warn(`Falha ao enviar lembrete para ${payload.email} (user=${userId}): ${String(error)}`);
            }
            if (index < recipients.length - 1) {
                await sleep(SEND_GAP_MS);
            }
        }
        this.logger.log(`Lembretes de palpite: ${sent} enviados de ${byUser.size} candidatos (falhas: ${failed})`);
    }
    formatKickoff(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }
};
exports.PredictionReminderService = PredictionReminderService;
exports.PredictionReminderService = PredictionReminderService = PredictionReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        auth_mail_service_js_1.AuthMailService])
], PredictionReminderService);
//# sourceMappingURL=prediction-reminder.service.js.map