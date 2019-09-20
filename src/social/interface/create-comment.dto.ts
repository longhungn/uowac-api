import { IsNotEmpty, IsString } from 'class-validator';

export class DtoCreateComment {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
