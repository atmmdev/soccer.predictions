import { IsBoolean, IsInt, Min } from 'class-validator';

export class ImportChampionshipDto {
  @IsInt()
  @Min(1)
  leagueId!: number;

  @IsInt()
  @Min(1900)
  season!: number;

  @IsBoolean()
  active!: boolean;
}
