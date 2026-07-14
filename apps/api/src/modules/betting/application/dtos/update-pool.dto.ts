import { IsObject, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePoolDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @IsObject()
  scoring!: Record<string, unknown>;
}
