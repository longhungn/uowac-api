import {
  IsAlphanumeric,
  IsString,
  IsOptional,
  IsInt,
  IsAlpha,
  IsNotEmpty,
} from 'class-validator';
/**
 * DTO class for the body of a request to the update maker endpoint
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
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
