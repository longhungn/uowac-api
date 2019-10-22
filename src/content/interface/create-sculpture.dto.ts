import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

/**
 * DTO class for the body of a request to the create sculpture endpoint
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class DtoCreateSculpture {
  @IsString()
  @IsNotEmpty()
  accessionId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsString()
  primaryMakerId?: string;

  @IsOptional()
  @IsString()
  productionDate?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsString()
  creditLine?: string;

  @IsOptional()
  @IsString()
  currentLocation?: string;

  @IsOptional()
  @IsString()
  locationNotes?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
