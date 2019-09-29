import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DtoUpdateUser {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  givenName: string;

  @IsOptional()
  @IsString()
  familyName: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nickname: string;
}
