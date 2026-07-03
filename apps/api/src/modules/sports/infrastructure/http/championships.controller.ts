import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import { ChampionshipService } from '../../application/services/championship.service.js';

@Controller('championships')
@UseGuards(JwtAuthGuard)
export class ChampionshipsController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Get()
  listActive() {
    return this.championshipService.listActive();
  }
}
