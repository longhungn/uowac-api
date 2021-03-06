import { IsNotEmpty, IsOptional, IsIn, IsString } from 'class-validator';
/**
 * DTO class for the request body of the create user endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoCreateUser {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  givenName?: string;

  @IsOptional()
  @IsString()
  familyName?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  role?: string[];

  @IsOptional()
  @IsString()
  provider?: string;
}
