import { ImportChampionshipDto } from '../../application/dtos/import-championship.dto.js';
import { UpdateChampionshipStatusDto } from '../../application/dtos/update-championship-status.dto.js';
import { CatalogService } from '../../application/services/catalog.service.js';
import { ChampionshipService } from '../../application/services/championship.service.js';
import { ImportChampionshipService } from '../../application/services/import-championship.service.js';
import { SyncFixturesService } from '../../application/services/sync-fixtures.service.js';
export declare class ChampionshipsController {
    private readonly championshipService;
    private readonly catalogService;
    private readonly importChampionshipService;
    private readonly syncFixturesService;
    constructor(championshipService: ChampionshipService, catalogService: CatalogService, importChampionshipService: ImportChampionshipService, syncFixturesService: SyncFixturesService);
    list(): Promise<import("../../application/services/championship.service.js").ChampionshipListItem[]>;
    listActive(): Promise<import("../../application/services/championship.service.js").ChampionshipListItem[]>;
    listCountries(): Promise<import("../../application/services/catalog.service.js").CatalogCountry[]>;
    listLeagues(country: string, season?: string): Promise<import("../../application/services/catalog.service.js").CatalogLeague[]>;
    import(dto: ImportChampionshipDto): Promise<import("../../application/services/import-championship.service.js").ChampionshipListItem>;
    sync(id: number): Promise<number>;
    updateStatus(id: number, dto: UpdateChampionshipStatusDto): Promise<import("../../application/services/championship.service.js").ChampionshipListItem>;
}
