import { IsNotEmpty, IsString } from 'class-validator';

export class DtoCreateVisit {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  sculptureId: string;
}
