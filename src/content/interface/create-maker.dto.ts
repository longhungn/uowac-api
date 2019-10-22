import {
  IsAlphanumeric,
  IsString,
  IsOptional,
  IsInt,
  IsAlpha,
  IsUrl,
} from 'class-validator';
/**
 * DTO class for the body of a request sent to the create sculpture maker
 * endpoint
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class DtoCreateMaker {
  @IsOptional()
  @IsAlphanumeric()
  code?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

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

  @IsOptional()
  @IsUrl()
  wikiUrl?: string;
}
