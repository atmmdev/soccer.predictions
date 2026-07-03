import { IsInt, IsOptional, Min } from 'class-validator';

export class SubmitPredictionDto {
  @IsInt()
  poolId!: number;

  @IsInt()
  fixtureId!: number;

  @IsInt()
  @Min(0)
  predictedHomeScore!: number;

  @IsInt()
  @Min(0)
  predictedAwayScore!: number;

  @IsOptional()
  @IsInt()
  selectedPlayerId?: number | null;
}
