import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO class for the request body of the create like endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoCreateLike {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;
}
