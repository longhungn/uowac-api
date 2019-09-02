import {
  IsAlphanumeric,
  IsString,
  IsOptional,
  IsInt,
  IsAlpha,
  IsNotEmpty,
} from 'class-validator';

export class DtoUpdateMaker {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsAlphanumeric()
  @IsOptional()
  code?: string;

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
