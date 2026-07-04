import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../../../shared/auth/roles.decorator.js';
import { RolesGuard } from '../../../../shared/auth/roles.guard.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import { ImportChampionshipDto } from '../../application/dtos/import-championship.dto.js';
import { CatalogService } from '../../application/services/catalog.service.js';
import { ChampionshipService } from '../../application/services/championship.service.js';
import { ImportChampionshipService } from '../../application/services/import-championship.service.js';
import { SyncFixturesService } from '../../application/services/sync-fixtures.service.js';

@Controller('championships')
@UseGuards(JwtAuthGuard)
export class ChampionshipsController {
  constructor(
    private readonly championshipService: ChampionshipService,
    private readonly catalogService: CatalogService,
    private readonly importChampionshipService: ImportChampionshipService,
    private readonly syncFixturesService: SyncFixturesService,
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  list() {
    return this.championshipService.listAll();
  }

  @Get('active')
  listActive() {
    return this.championshipService.listActive();
  }

  @Get('catalog/countries')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  listCountries() {
    return this.catalogService.listCountries();
  }

  @Get('catalog/leagues')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  listLeagues(
    @Query('country') country: string,
    @Query('season') season?: string,
  ) {
    return this.catalogService.listLeagues(
      country,
      season ? Number.parseInt(season, 10) : undefined,
    );
  }

  @Post('import')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  import(@Body() dto: ImportChampionshipDto) {
    return this.importChampionshipService.import(dto);
  }

  @Post(':id/sync')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  sync(@Param('id', ParseIntPipe) id: number) {
    return this.syncFixturesService.syncChampionship(id);
  }
}
