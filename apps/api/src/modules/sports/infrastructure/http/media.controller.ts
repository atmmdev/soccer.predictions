import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { TeamLogoStorage } from '../storage/team-logo.storage.js';

@Controller('media')
export class MediaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly teamLogoStorage: TeamLogoStorage,
  ) {}

  @Get('teams/:externalId')
  async getTeamLogo(
    @Param('externalId', ParseIntPipe) externalId: number,
    @Res() response: Response,
  ) {
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
      throw new NotFoundException('Logo do time não encontrado');
    }

    response.setHeader('Content-Type', file.contentType);
    response.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    response.send(file.buffer);
  }
}
