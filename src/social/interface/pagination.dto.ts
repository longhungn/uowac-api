import {
  IsUUID,
  IsOptional,
  IsNumberString,
  IsInt,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

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
