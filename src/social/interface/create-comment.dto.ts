import { IsNotEmpty, IsString } from 'class-validator';

export class DtoCreateComment {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  sculptureId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
