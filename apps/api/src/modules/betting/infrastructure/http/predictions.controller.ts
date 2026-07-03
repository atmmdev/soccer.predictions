import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { SubmitPredictionDto } from '../../application/dtos/submit-prediction.dto.js';
import { PredictionService } from '../../application/services/prediction.service.js';

@Controller('predictions')
@UseGuards(JwtAuthGuard)
export class PredictionsController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.predictionService.listForUser(user);
  }

  @Post()
  submit(@Body() dto: SubmitPredictionDto, @CurrentUser() user: AuthUser) {
    return this.predictionService.submit(dto, user);
  }
}
