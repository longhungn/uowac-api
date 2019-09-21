import { IsNotEmpty, IsString } from 'class-validator';

export class DtoCreateVisit {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;
}
