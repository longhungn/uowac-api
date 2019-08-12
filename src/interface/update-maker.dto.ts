import {
  IsAlphanumeric,
  IsString,
  IsOptional,
  IsInt,
  IsAlpha,
} from 'class-validator';

export class DtoUpdateMaker {
  @IsAlphanumeric()
  code: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsInt()
  birthYear?: number;

  @IsOptional()
  @IsInt()
  deathYear?: number;

  @IsOptional()
  @IsString()
  info?: string; //short description

  @IsOptional()
  @IsAlpha()
  nationality?: string;
}
