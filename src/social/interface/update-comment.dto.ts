import { IsNotEmpty, IsString } from 'class-validator';
/**
 * DTO class for the request body of the update comment endpoint
 *
 * Created by: Quang Minh Nguyen (qmn1312)
 */
export class DtoUpdateComment {
  @IsNotEmpty()
  @IsString()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
