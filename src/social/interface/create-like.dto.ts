import { IsNotEmpty, IsString } from 'class-validator';

export class DtoCreateLike {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;
}
