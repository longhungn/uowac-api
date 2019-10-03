import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DtoUpdateUser {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nickname: string;
}
