import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PoolAccessGuard } from '../../../../shared/auth/pool-access.guard.js';
import { PoolOwnerGuard } from '../../../../shared/auth/pool-owner.guard.js';
import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CreatePoolDto } from '../../application/dtos/create-pool.dto.js';
import { JoinPoolDto } from '../../application/dtos/join-pool.dto.js';
import { UpdatePoolDto } from '../../application/dtos/update-pool.dto.js';
import { UpdatePoolStatusDto } from '../../application/dtos/update-pool-status.dto.js';
import { PoolService } from '../../application/services/pool.service.js';

@Controller('pools')
@UseGuards(JwtAuthGuard)
export class PoolsController {
  constructor(private readonly poolService: PoolService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.poolService.listForUser(user);
  }

  @Get('discover')
  discover(@CurrentUser() user: AuthUser) {
    return this.poolService.discoverForUser(user);
  }

  @Post('join')
  join(@Body() dto: JoinPoolDto, @CurrentUser() user: AuthUser) {
    return this.poolService.join(dto, user);
  }

  @Post(':id/request-access')
  requestAccess(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.requestAccess(id, user);
  }

  @Post(':id/members/:userId/approve')
  @UseGuards(PoolOwnerGuard)
  approveMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.approveMember(id, userId, user);
  }

  @Post(':id/members/:userId/reject')
  @UseGuards(PoolOwnerGuard)
  rejectMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.rejectMember(id, userId, user);
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

  @Patch(':id/status')
  @UseGuards(PoolAccessGuard, PoolOwnerGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePoolStatusDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.updateStatus(id, dto, user);
  }

  @Patch(':id')
  @UseGuards(PoolAccessGuard, PoolOwnerGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePoolDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.poolService.update(id, dto, user);
  }
}
