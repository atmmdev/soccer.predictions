import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePoolDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsInt()
  championshipId!: number;

  @IsObject()
  scoring!: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  delegateUserId?: number;
}
