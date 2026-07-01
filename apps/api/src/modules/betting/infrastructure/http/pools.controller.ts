import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PoolAccessGuard } from '../../../../shared/auth/pool-access.guard.js';
import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CreatePoolDto } from '../../application/dtos/create-pool.dto.js';
import { JoinPoolDto } from '../../application/dtos/join-pool.dto.js';
import { PoolService } from '../../application/services/pool.service.js';

@Controller('pools')
@UseGuards(JwtAuthGuard)
export class PoolsController {
  constructor(private readonly poolService: PoolService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.poolService.listForUser(user);
  }

  @Post('join')
  join(@Body() dto: JoinPoolDto, @CurrentUser() user: AuthUser) {
    return this.poolService.join(dto, user);
  }

  @Get(':id')
  @UseGuards(PoolAccessGuard)
  getById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.getByIdForUser(id, user);
  }

  @Post()
  create(@Body() dto: CreatePoolDto, @CurrentUser() user: AuthUser) {
    return this.poolService.create(dto, user);
  }
}
