import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
/**
 * DTO class for the update user endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoUpdateUser {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nickname: string;
}
