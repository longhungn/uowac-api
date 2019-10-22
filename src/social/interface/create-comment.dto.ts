import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO class for the body of the request sent to the create comment endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoCreateComment {
  @IsNotEmpty()
  @IsString()
  sculptureId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
