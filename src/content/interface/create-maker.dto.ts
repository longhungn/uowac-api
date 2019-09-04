import {
  IsAlphanumeric,
  IsString,
  IsOptional,
  IsInt,
  IsAlpha,
} from 'class-validator';

export class DtoCreateMaker {
  @IsAlphanumeric()
  code: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsInt()
  birthYear: number;

  @IsOptional()
  @IsInt()
  deathYear: number;

  @IsOptional()
  @IsString()
  info: string; //short description

  @IsOptional()
  @IsAlpha()
  nationality: string;
}
