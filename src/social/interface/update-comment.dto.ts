import { IsNotEmpty, IsString } from 'class-validator';

export class DtoUpdateComment {
  @IsNotEmpty()
  @IsString()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
