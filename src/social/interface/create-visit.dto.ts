import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO class for the request body of the create visit endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoCreateVisit {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;
}
