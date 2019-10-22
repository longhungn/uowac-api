import {
  IsUUID,
  IsOptional,
  IsNumberString,
  IsInt,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
/**
 * DTO class for the query parameters used for pagination
 *
 * Created by: Long Hung Nguyen (longhungn)
 */
export class DtoPagination {
  @IsOptional()
  @IsString()
  after?: string;

  @IsOptional()
  @IsString()
  before?: string;

  @IsOptional()
  @Transform(parseInt)
  @IsInt()
  limit?: number;
}
