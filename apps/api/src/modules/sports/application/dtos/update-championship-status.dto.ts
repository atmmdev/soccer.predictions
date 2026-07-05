import { IsBoolean } from 'class-validator';

export class UpdateChampionshipStatusDto {
  @IsBoolean()
  active!: boolean;
}
